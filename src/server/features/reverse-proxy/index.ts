import { Express } from 'express';
import httpProxy from 'http-proxy';
import url from '~/util/urls';

const servers = SERVERS; /* global SERVERS */
const project = PROJECT; /* global PROJECT */
const alias = ALIAS; /* global ALIAS */
const deliveryApiHostname = url(alias, project).api;

export const assetProxy = httpProxy.createProxyServer();
export const deliveryProxy = httpProxy.createProxyServer();

const reverseProxies = (app: Express, reverseProxyPaths: string[] = []) => {
  deliveryApiProxy(deliveryProxy, app);

  app.all(reverseProxyPaths, (req, res) => {
    const target =
      req.hostname.indexOf('preview-') ||
      req.hostname.indexOf('preview.') ||
      req.hostname === 'localhost'
        ? servers.previewIis || servers.iis
        : servers.iis;

    assetProxy.web(req, res, { target, changeOrigin: true });
    assetProxy.on('error', e => {
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
  app.all(['/api/delivery/*', '/api/forms/*', '/api/image/*'], (req, res) => {
    /* eslint-disable no-console */
    console.log(`Proxying api request to ${servers.alias}`);
    apiProxy.web(req, res, {
      target: deliveryApiHostname,
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
