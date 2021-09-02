import 'isomorphic-fetch';
import express from 'express';
import React from 'react';
import { ServerConfig } from "../config";
declare const _default: {
    app: import("express-serve-static-core").Express;
    apiProxy: any;
    start: (ReactApp: React.ComponentType<{}>, config: ServerConfig, ServerFeatures: (app: express.Express) => void) => void;
};
export default _default;
