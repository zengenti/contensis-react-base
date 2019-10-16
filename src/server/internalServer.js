import 'isomorphic-fetch';
import express from 'express';
import Loadable from 'react-loadable';

import DisplayStartupConfiguration from './util/displayStartupConfiguration';
import ConfigureLocalDNS from './core/localDns';
import ConfigureReverseProxies from './core/reverseProxies';
import ConfigureFeatures from './features/configure';
import ConfigureWebApp from './core/webApp';

export const app = express();
app.disable('x-powered-by');

// Output some information about the used build/startup configuration
DisplayStartupConfiguration();

// Configure DNS to make life easier
ConfigureLocalDNS();

// Set-up local proxy for images from cms, to save doing rewrites and extra code
ConfigureReverseProxies(app);
ConfigureFeatures(app);
ConfigureWebApp(app);

app.use('/static', express.static('dist/static', { maxage: '31557600h' }));

app.on('ready', () => {
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
