import { Express } from 'express';
import httpProxy from 'http-proxy';
export declare const apiProxy: httpProxy;
declare const reverseProxies: (app: Express, reverseProxyPaths?: string[]) => void;
export default reverseProxies;
