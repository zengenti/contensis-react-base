/// <reference types="node" />
import 'isomorphic-fetch';
import { Express } from 'express';
import http from 'http';
import React from 'react';
import { deliveryProxy } from './features/reverse-proxy';
import { ServerConfig } from "../config";
type Exporting = {
    app: Express;
    apiProxy: typeof deliveryProxy;
    server: http.Server;
    start: (ReactApp: React.ComponentType<any>, config: ServerConfig, ServerFeatures: (app: Express) => void) => void;
};
declare const _default: Exporting;
export default _default;
