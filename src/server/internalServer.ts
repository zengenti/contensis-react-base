import 'isomorphic-fetch';
import express, { Express } from 'express';
import { Server } from 'http';
import React from 'react';

import ConfigureReverseProxies, {
  deliveryProxy,
} from './features/reverse-proxy';
import ServeStaticAssets from './features/static-assets';
import DisplayStartupConfiguration from './util/displayStartupConfiguration';
import ConfigureWebApp from './webApp';

import { ServerConfig } from '~/config';

declare let global: typeof globalThis & {
  DISABLE_SSR_REDUX: boolean | undefined;
  PACKAGE_JSON: any;
  PROXY_DELIVERY_API: boolean | undefined;
  REVERSE_PROXY_PATHS: string[];
};

const app = express();

let server = new Server(); // new Server() is just a stub to assert the type for the export

const start = (
  ReactApp: React.ComponentType<any>,
  config: ServerConfig,
  ServerFeatures: (app: Express) => void
) => {
  global.PACKAGE_JSON = config.packagejson;
  global.DISABLE_SSR_REDUX = config.disableSsrRedux;
  global.PROXY_DELIVERY_API = config.proxyDeliveryApi;
  global.REVERSE_PROXY_PATHS = Object(config.reverseProxyPaths);

  app.disable('x-powered-by');

  // Output some information about the used build/startup configuration
  DisplayStartupConfiguration(config);

  ServerFeatures(app);
  // Set-up local proxy for images from cms, and delivery api requests
  // to save doing rewrites and extra code
  ConfigureReverseProxies(app, config.reverseProxyPaths);
  ServeStaticAssets(app, config);
  ConfigureWebApp(app, ReactApp, config);

  app.on('ready', async () => {
    server = app.listen(3001, () => {
      console.info(`HTTP server is listening @ port 3001`);
      setTimeout(function () {
        app.emit('app_started');
      }, 500);
    });
    app.on('stop', () => {
      server.close(function () {
        console.info('GoodBye :(');
      });
    });
  });
};

export default { app, apiProxy: deliveryProxy, server, start };
