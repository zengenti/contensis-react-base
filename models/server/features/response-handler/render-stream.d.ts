/// <reference types="node" />
import { Response } from 'express';
import { ReactNode } from 'react';
import { Transform, Writable } from 'stream';
import { ServerStyleSheet } from 'styled-components';
export declare const renderStream: (getContextHtml: () => string, jsx: ReactNode, response: Response, stream: Writable) => void;
export declare const styledComponentsStream: (sheet: ServerStyleSheet) => Transform;
export declare const renderToString: () => void;
