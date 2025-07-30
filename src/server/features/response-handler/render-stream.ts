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
 */
export const renderStream = (
  getContextHtml: () => string,
  jsx: ReactNode,
  response: Response,
  stream: Writable
) => {
  let header = '';
  let footer = '';
  const { abort, pipe } = renderToPipeableStream(jsx, {
    onShellReady() {
      const html = getContextHtml();
      if (!html) {
        // this means we have finished with the response already
        abort();
      } else {
        [header, footer] = html.split('{{APP}}');

        stream.write(header);
        pipe(stream);
      }
    },
    onAllReady() {
      stream.write(footer);
    },
    onShellError(error: unknown) {
      response.statusCode = 500;
      response.send('<h1>Something went wrong</h1>');
      console.error(`[renderToPipeableStream:onShellError]`, error);
    },
    onError(error) {
      console.error(`[renderToPipeableStream:onError]`, error);
    },
  });

  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  setTimeout(() => abort(), 30 * 1000);

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
