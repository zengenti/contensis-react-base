import { Response } from 'express';
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
 * @param onFinish optional cleanup callback invoked once the stream is done (for sealing styled-components sheets, etc.)
 */
export const renderStream = (
  getContextHtml: (isFinal?: boolean) => string,
  jsx: ReactNode,
  response: Response,
  stream: Writable,
  onFinish?: () => void
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let cleaned = false;

  const disposeTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    disposeTimeout();
    if (!stream.destroyed) stream.destroy();
    onFinish?.();
  };

  // Ensure cleanup when the response closes
  // (normal completion, client disconnect, etc.)
  response.on('close', cleanup);

  const { abort, pipe } = renderToPipeableStream(jsx, {
    onShellReady() {
      const html = getContextHtml(false);
      if (!html) {
        // Response already handled (e.g. redirect)
        abort();
        cleanup();
        return;
      }
      const header = html.split('{{APP}}')[0];

      response.setHeader('content-type', 'text/html; charset=utf-8');
      stream.write(header);
      pipe(stream);
    },
    onAllReady() {
      const footer = getContextHtml(true).split('{{APP}}')[1];
      stream.write(footer);
      disposeTimeout();
      // React's pipe will end the stream after all content is flushed,
      // which triggers response 'close' → cleanup
    },
    onShellError(error: unknown) {
      abort();
      cleanup();
      if (!response.headersSent) {
        response.statusCode = 500;
        response.setHeader('content-type', 'text/html; charset=utf-8');
        response.send('<h1>Something went wrong</h1>');
      }
      console.error(`[renderToPipeableStream:onShellError]`, error);
    },
    onError(error) {
      console.error(`[renderToPipeableStream:onError]`, error);
    },
  });

  // Abandon and switch to client rendering after 30s.
  timeoutId = setTimeout(() => {
    timeoutId = null;
    abort();
    cleanup();
  }, 30 * 1000);

  stream?.pipe(response);
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
  });
  return readerWriter;
};
export const renderToString = () => {};
