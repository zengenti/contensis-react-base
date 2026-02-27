import express from 'express';
import { CacheDuration } from '~/server/features/caching/cacheDuration.schema';
import { bundleManipulationMiddleware } from '~/server/middleware/bundleManipulation';
import { resolveStartupMiddleware } from '~/server/middleware/resolveStartup';

import appRootPath from 'app-root-path';
import { ServerConfig } from '~/models';

// Serving static assets
const { path: appPath } = appRootPath;
const staticAssets = (
  app: express.Express,
  {
    appRootPath = appPath,
    microsites = [] as NonNullable<ServerConfig['microsites']>,
    scripts = {} as NonNullable<ServerConfig['scripts']>,
    startupScriptFilename = 'startup.js',
    staticFolderPath = 'static',
    staticRoutePath = 'static',
    staticRoutePaths = [] as string[],
  }
) => {
  const paths = [
    `/${staticRoutePath}`,
    ...microsites.map(m => `${m.basePath}/${staticRoutePath}`),
    ...staticRoutePaths.map(p => `/${p}`),
    `/${staticFolderPath}`,
  ]; 
  app.use(
    paths,
    bundleManipulationMiddleware({
      appRootPath,
      // these maxage values are different in config but the same in runtime,
      // this one is the true value in seconds
      maxage: CacheDuration.static,
      staticFolderPath,
      staticRoutePath,
    }),
    resolveStartupMiddleware({
      appRootPath,
      maxage: CacheDuration.static,
      startupScriptFilename: scripts.startup || startupScriptFilename,
      staticFolderPath,
    }),
    express.static(`dist/${staticFolderPath}`, {
      // these maxage values are different in config but the same in runtime,
      // this one is somehow converted and should end up being the same as CacheDuration.static
      maxAge: CacheDuration.expressStatic,
    })
  );
};

export default staticAssets;
