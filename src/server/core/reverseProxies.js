import httpProxy from 'http-proxy';

const servers = SERVERS; /* global SERVERS */
var apiProxy = httpProxy.createProxyServer();

const reverseProxies = app => {
  deliveryApiProxy(apiProxy, app);

  app.all(REVERSE_PROXY_PATHS /* global REVERSE_PROXY_PATHS */, (req, res) => {
    const target = servers.iis;

    apiProxy.web(req, res, { target, changeOrigin: true });
    apiProxy.on('error', e => {
      /* eslint-disable no-console */
      console.log(
        `Proxy Request for ${req.path} HostName:${req.hostname} failed with ${e}`
      );
      /* eslint-enable no-console */
    });
  });
};

const deliveryApiProxy = (apiProxy, app) => {
  // This is just here to stop cors requests on localhost. In Production this is mapped using varnish.
  app.all(['/api/delivery/*'], (req, res) => {
    /* eslint-disable no-console */
    const target = servers.cms;
    console.log(`Proxying api request to ${servers.alias}`);
    apiProxy.web(req, res, {
      target,
      changeOrigin: true,
    });
    apiProxy.on('error', e => {
      /* eslint-disable no-console */
      console.log(
        `Proxy request for ${req.path} HostName:${req.hostname} failed with ${e}`
      );
      /* eslint-enable no-console */
    });
  });
};

export default reverseProxies;
