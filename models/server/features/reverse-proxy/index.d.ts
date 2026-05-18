import { Express } from 'express';
import httpProxy from 'http-proxy';
export declare const assetProxy: httpProxy<import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>>;
export declare const deliveryProxy: httpProxy<import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>>;
declare const reverseProxies: (app: Express, reverseProxyPaths?: string[]) => void;
export default reverseProxies;
