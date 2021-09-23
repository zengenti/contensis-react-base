import 'isomorphic-fetch';
import express from 'express';
import React from 'react';
import { ServerConfig } from '~/config';
declare const _default: {
    app: express.Express;
    apiProxy: any;
    start: (ReactApp: React.ComponentType<any>, config: ServerConfig, ServerFeatures: (app: express.Express) => void) => void;
};
export default _default;
