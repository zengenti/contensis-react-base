import { Express } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';
export declare const assetProxy: httpProxy<IncomingMessage, ServerResponse<IncomingMessage>>;
export declare const deliveryProxy: httpProxy<IncomingMessage, ServerResponse<IncomingMessage>>;
export declare const idpProxy: httpProxy<IncomingMessage, ServerResponse<IncomingMessage>>;
declare const reverseProxies: (app: Express, reverseProxyPaths?: string[]) => void;
export default reverseProxies;
