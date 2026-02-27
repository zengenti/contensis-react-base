import { RequestHandler } from 'express';

/**
 * Development proxy for Subsite PoC
 * Catch all routes before they hit CRB handlers
 * and rewrite them to include the subsite base path,
 * this allows us to run the subsite in a subfolder in development
 * In production we will handle this with a path rewrite in the Cloud Dashboard site configuration,
 * @param subsitePath the content base path we will rewrite to
 * @param exceptions an array of path prefixes to ignore when rewriting, useful for ignoring assets that do not live in the subsite base path
 */
export const subsiteDebugMiddleware =
  (subsitePath: string, exceptions: string[] = []): RequestHandler =>
  (req, res, next) => {
    if (
      !subsitePath ||
      req.hostname !== 'localhost' ||
      req.path.startsWith('/api/') ||
      exceptions.some(exception => req.path.startsWith(exception))
    )
      return next();

    if (!req.path.startsWith(`${subsitePath}/`)) {
      console.warn(
        `[subsite-debug-middleware] Rewriting (${subsitePath})${req.url}`
      );
      if (req.path === '/' || req.path === subsitePath) req.url = subsitePath;
      else req.url = `${subsitePath}${req.url}`;

      res.setHeader('x-crb-subsite-content-path', req.url);

      // Important to set the subsite_path header as this drives the subsite-scoped routing logic
      req.headers['subsite_path'] = subsitePath;
    }
    next();
  };
