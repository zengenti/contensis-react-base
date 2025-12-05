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

  app.all(
    reverseProxyPaths.map(proxyPath =>
      // Patch to update paths for express v5
      proxyPath.endsWith('/*')
        ? `${proxyPath.slice(0, -2)}/{*splat}`
        : proxyPath.endsWith('/**')
          ? `${proxyPath.slice(0, -3)}/{*splat}`
          : proxyPath
    ),
    (req, res) => {
      const target =
        req.hostname.indexOf('preview-') ||
        req.hostname.indexOf('preview.') ||
        req.hostname === 'localhost'
          ? servers.previewIis || servers.iis
          : servers.iis;

      assetProxy.web(req, res, { target, changeOrigin: true });
      assetProxy.on('error', e => {
        console.log(
          `Proxy Request for ${req.path} HostName:${req.hostname} failed with ${e}`
        );
      });
    }
  );
};

const deliveryApiProxy = (apiProxy, app) => {
  // This is just here to stop cors requests on localhost. In Production this is mapped using varnish.
  app.all(
    [
      '/api/delivery/{*splat}',
      '/api/forms/{*splat}',
      '/api/image/{*splat}',
      '/authenticate/{*splat}',
    ],
    (req, res) => {
      console.log(`Proxying api request to ${servers.alias}`);
      apiProxy.web(req, res, {
        target: deliveryApiHostname,
        changeOrigin: true,
      });
      apiProxy.on('error', e => {
        console.log(
          `Proxy request for ${req.path} HostName:${req.hostname} failed with ${e}`
        );
      });
    }
  );
};

export default reverseProxies;
