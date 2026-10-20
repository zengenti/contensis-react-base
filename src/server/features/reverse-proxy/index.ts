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
  // Opt-in sites only: a flag-off site must not forward `/idp/*`. Reading the
  // setting here is safe because `start()` has already applied it to the global.
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

/** The `/idp/*` paths a browser actually visits. Exact routes rather than a
 *  wildcard: express matches the pathname, so a traversal attempt
 *  (`/idp/../../anything`) never reaches the relay at all, while the query
 *  each path carries (`returnPath`, `code`) passes through untouched. */
const IDP_PROXY_ROUTES = [
  '/idp/check',
  '/idp/login',
  '/idp/callback',
  '/idp/logout',
  '/idp/refresh',
  '/idp/error',
];

const contensisIdpProxy = (
  idpProxy: httpProxy<IncomingMessage, ServerResponse<IncomingMessage>>,
  app: Express
) => {
  // This is just here to stop cors requests on localhost. In Production this is mapped using varnish.
  app.all(IDP_PROXY_ROUTES, (req, res) => {
    // `xfwd` rebuilds X-Forwarded-Host from the real Host header, which is
    // how identity-client builds the callback back to localhost. It honours
    // an inbound header first, though, so drop whatever the client sent —
    // only this server's view of the request may decide the host.
    delete req.headers['x-forwarded-host'];
    delete req.headers['x-forwarded-proto'];

    // The path only: the callback query carries an authorization code.
    console.log(
      `[idpProxy] "${req.method} ${req.url.split('?')[0]}" target: ${servers.alias}`
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
      `[idpProxy] "${req.method} ${req.url?.split('?')[0] ?? req.url}" host: ${req.headers.host} failed with ${e}`
    );
  });
};

export default reverseProxies;
