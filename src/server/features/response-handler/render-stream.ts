import { Request, Response } from 'express';
import { ReactNode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { Transform, Writable } from 'stream';
import { ServerStyleSheet } from 'styled-components';

/**
 * Render React JSX (and surrounding HTML document) via React's
 * renderToPipeableStream method
 * @param getContextHtml a function to produce the correct HTML template that surrounds the JSX "App" with all available document assets injected
 * @param jsx the JSX to render via a streamed response
 * @param response the express Response object
 * @param stream all chunks are piped to this stream to add additional style elements to each streamed chunk
 */
export const renderStream = (
  getContextHtml: (isFinal?: boolean) => string,
  jsx: ReactNode,
  request: Request,
  response: Response,
  stream: Writable
) => {
  // Store timeout reference for cleanup on normal or abnormal termination
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const disposeTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  // Only used for abnormal termination
  const abortCleanup = (err?: unknown) => {
    disposeTimeout();
    stream.destroy(err instanceof Error ? err : undefined);
    abort();
  };

  // Guard against client disconnect
  request.on('close', () => abortCleanup());

  // Guard against transform errors
  stream.on('error', err => {
    abortCleanup(err);
    if (!response.headersSent) response.destroy(err);
  });

  const { abort, pipe } = renderToPipeableStream(jsx, {
    onShellReady() {
      const html = getContextHtml(false);
      if (!html) {
        // this means we have finished with the response already
        abortCleanup();
      } else {
        const header = html.split('{{APP}}')[0];
        response.setHeader('content-type', 'text/html; charset=utf-8');
        stream.write(header);
        pipe(stream);
      }
    },
    onAllReady() {
      const footer = getContextHtml(true).split('{{APP}}')[1];
      stream.write(footer);
      disposeTimeout(); // Clear the timeout, let stream end naturally
    },
    onShellError(error: unknown) {
      abortCleanup(error); // Abnormal - destroy everything
      response.statusCode = 500;
      response.setHeader('content-type', 'text/html; charset=utf-8');
      response.send('<h1>Something went wrong</h1>');
      console.error(`[renderToPipeableStream:onShellError]`, error);
    },
    onError(error) {
      console.error(`[renderToPipeableStream:onError]`, error);
    },
  });

  // Abandon and switch to client rendering after 30s.
  // Try lowering this to see the client recover.
  timeoutId = setTimeout(() => {
    timeoutId = null;
    abortCleanup();
  }, 30_000);

  stream.pipe(response);
};

/**
 * Generate and add styled-components CSS to the streamed
 * chunks of rendered HTML via renderToPipeableStream
 *
 * Workaround for Styled Components issue: React 18 Streaming SSR #3658
 * https://github.com/styled-components/styled-components/issues/3658#issuecomment-2480721193
 * credit: https://github.com/rurquia/styled-components-ssr-3658/blob/main/server/render.js
 * @param sheet styled-components ServerStyleSheet
 * @returns Transform Stream
 */
export const styledComponentsStream = (sheet: ServerStyleSheet) => {
  const readerWriter = new Transform({
    objectMode: true,
    transform(
      chunk,
      /* encoding */
      _,
      callback
    ) {
      // Get the chunk and retrieve the sheet's CSS as an HTML chunk,
      // then reset its rules so we get only new ones for the next chunk
      const renderedHtml =
        typeof chunk === 'string' ? chunk : new TextDecoder().decode(chunk);
      const styledCSS = sheet._emitSheetCSS();
      const CLOSING_TAG_R = /<\/[a-z]*>/i;

      sheet.instance.clearTag();

      // prepend style html to chunk, unless the start of the chunk is a
      // closing tag in which case append right after that
      if (/<\/head>/.test(renderedHtml)) {
        const replacedHtml = renderedHtml.replace(
          '</head>',
          `${styledCSS}</head>`
        );
        this.push(replacedHtml);
      } else if (CLOSING_TAG_R.test(renderedHtml)) {
        const execResult = CLOSING_TAG_R.exec(renderedHtml) as RegExpExecArray;
        const endOfClosingTag = execResult.index + execResult.flat().length - 1;
        const before = renderedHtml.slice(0, endOfClosingTag);
        const after = renderedHtml.slice(endOfClosingTag);
        this.push(before + styledCSS + after);
      } else {
        this.push(styledCSS + renderedHtml);
      }
      callback();
    },
    destroy(err, callback) {
      // Called on both stream.destroy() and natural end
      // Stops the sheet intercepting styles & releases its references

      // try/catch is required if sheet.seal() throws for any reason,
      // callback(err) must still be called, as Node.js stream internals depend
      // on it to complete teardown. Omitting it causes the stream to hang.
      try {
        sheet.seal();
      } catch (sealErr) {
        // Catch any errors from sealing the sheet, we MUST always call the
        // callback to prevent hanging the stream

        console.error(
          '[styledComponentsStream] sheet.seal() failed - styles may leak:',
          sealErr
        );
      }
      callback(err);
    },
  });
  return readerWriter;
};
