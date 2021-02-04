import 'isomorphic-fetch';
import express from 'express';
import Loadable from 'react-loadable';

import DisplayStartupConfiguration from './util/displayStartupConfiguration';
import ConfigureReverseProxies, { apiProxy } from './core/reverseProxies';
import ServeStaticAssets from './core/staticAssets';
import ConfigureWebApp from './core/webApp';

const app = express();

const start = (ReactApp, config, ServerFeatures) => {
  app.disable('x-powered-by');

  // Output some information about the used build/startup configuration
  DisplayStartupConfiguration(config);

  // Set-up local proxy for images from cms, to save doing rewrites and extra code
  ServerFeatures(app);
  ConfigureReverseProxies(app, config.reverseProxyPaths);
  ServeStaticAssets(app, config);
  ConfigureWebApp(app, ReactApp, config);

  app.on('ready', async () => {
    // Configure DNS to make life easier
    //await ConfigureLocalDNS();

    Loadable.preloadAll().then(() => {
      var server = app.listen(3001, () => {
        console.info(`HTTP server is listening @ port 3001`);
        setTimeout(function() {
          app.emit('app_started');
        }, 500);
      });
      app.on('stop', () => {
        server.close(function() {
          console.info('GoodBye :(');
        });
      });
    });
  });
};

export default { app, apiProxy, start };
