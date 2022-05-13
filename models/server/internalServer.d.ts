/// <reference types="http-proxy" />
import 'isomorphic-fetch';
import express from 'express';
import React from 'react';
import { ServerConfig } from "../config";
declare const _default: {
    app: express.Express;
    apiProxy: import("http-proxy");
    start: (ReactApp: React.ComponentType<any>, config: ServerConfig, ServerFeatures: (app: express.Express) => void) => void;
};
export default _default;
