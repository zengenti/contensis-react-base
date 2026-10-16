import { Express } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';
import { isIdpEnabled } from '~/user/idp/setting';
import { shorten } from '~/util/errors';
import { urls } from '~/util/urls';

const servers = SERVERS; /* global SERVERS */
const project = PROJECT; /* global PROJECT */
const alias = ALIAS; /* global ALIAS */
const deliveryApiHostname = urls(alias, project).api;
const idpHostname = urls(alias, project).previewWeb;

const proxyTimeoutMs = 45_000;

export const assetProxy = httpProxy.createProxyServer();
export const deliveryProxy = httpProxy.createProxyServer();
export const idpProxy = httpProxy.createProxyServer();

const reverseProxies = (app: Express, reverseProxyPaths: string[] = []) => {
  deliveryApiProxy(deliveryProxy, app);
  if (isIdpEnabled()) contensisIdpProxy(idpProxy, app);

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
        req.hostname.includes('preview-') ||
        req.hostname.includes('preview.') ||
        req.hostname === 'localhost'
          ? servers.previewIis || servers.iis
          : servers.iis;

      assetProxy.web(req, res, {
        target,
        changeOrigin: true,
        proxyTimeout: proxyTimeoutMs,
        timeout: proxyTimeoutMs,
      });
    }
  );
  assetProxy.on('error', (e, req) => {
    console.log(
      `[assetProxy] "${req.method} ${req.url}" host: ${req.headers.host} failed with ${e}`
    );
  });
};

const deliveryApiProxy = (apiProxy: httpProxy<IncomingMessage, ServerResponse<IncomingMessage>>, app: Express) => {
  // This is just here to stop cors requests on localhost. In Production this is mapped using varnish.
  app.all(
    [
      '/api/delivery/{*splat}',
      '/api/forms/{*splat}',
      '/api/image/{*splat}',
      '/authenticate/{*splat}',
    ],
    (req, res) => {
      console.log(
        `[apiProxy] "${req.method} ${shorten(req.url)}" target: ${servers.alias}`
      );
      apiProxy.web(req, res, {
        target: deliveryApiHostname,
        changeOrigin: true,
        proxyTimeout: proxyTimeoutMs,
        timeout: proxyTimeoutMs,
      });
    }
  );
  apiProxy.on('error', (e, req) => {
    console.log(
      `[apiProxy] "${req.method} ${req.url}" host: ${req.headers.host} failed with ${e}`
    );
  });
};

const contensisIdpProxy = (
  idpProxy: httpProxy<IncomingMessage, ServerResponse<IncomingMessage>>,
  app: Express
) => {
  // This is just here to stop cors requests on localhost. In Production this is mapped using varnish.
  app.all(['/idp/{*splat}'], (req, res) => {
    console.log(
      `[idpProxy] "${req.method} ${shorten(req.url)}" target: ${servers.alias}`
    );
    idpProxy.web(req, res, {
      target: idpHostname,
      changeOrigin: true,
      cookieDomainRewrite: false,
      xfwd: true,
      proxyTimeout: proxyTimeoutMs,
      timeout: proxyTimeoutMs,
    });
  });
  idpProxy.on('error', (e, req) => {
    console.log(
      `[idpProxy] "${req.method} ${req.url}" host: ${req.headers.host} failed with ${e}`
    );
  });
};

export default reverseProxies;
