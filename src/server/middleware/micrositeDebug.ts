import { RequestHandler } from 'express';
import { ServerConfig } from '~/models';

/**
 * Development proxy for Microsite PoC
 * Catch all routes before they hit CRB handlers
 * and rewrite them to include the microsite base path,
 * this allows us to run the microsite in a subfolder in development
 * without needing to change the CRB routing logic which is based on
 * the content path rather than the URL path.
 * In production we will handle this with a rewrite in the web server configuration,
 *  but this allows us to keep the CRB routing logic consistent between environments.
 * @param microsite the microsite configuration from the server config, used to determine which content base paths we will rewrite to
 * @param exceptions an array of path prefixes to ignore when rewriting, useful for ignoring api routes and assets that do not live in the microsite base paths
 */
export const micrositeDebugMiddleware =
  (
    microsite: NonNullable<ServerConfig['microsites']>[0] = {} as NonNullable<
      ServerConfig['microsites']
    >[0],
    exceptions: string[] = []
  ): RequestHandler =>
  (req, res, next) => {
    if (
      !microsite?.basePath ||
      req.hostname !== 'localhost' ||
      req.path.startsWith('/api/') ||
      exceptions.some(exception => req.path.startsWith(exception))
    )
      return next();

    if (!req.path.startsWith(`${microsite.basePath}/`)) {
      console.warn(
        `[microsite-debug-middleware] Rewriting (${microsite.basePath})${req.url}`
      );
      if (req.path === '/' || req.path === microsite.basePath)
        req.url = microsite.basePath;
      else req.url = `${microsite.basePath}${req.url}`;

      res.setHeader('x-crb-microsite-content-path', req.url);

      // Important to set the host header that ends up in redux routing.currentHostname
      // so we know which microsite we are resolving content from and erase it from the
      // client-side routing
      req.headers['x-orig-host'] = microsite.domains[0];
    }
    next();
  };
