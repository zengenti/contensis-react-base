/// <reference types="node" />
import { Response } from 'express';
import { ReactNode } from 'react';
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
export declare const renderStream: (getContextHtml: (isFinal?: boolean) => string, jsx: ReactNode, response: Response, stream: Writable) => void;
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
export declare const styledComponentsStream: (sheet: ServerStyleSheet) => Transform;
export declare const renderToString: () => void;
