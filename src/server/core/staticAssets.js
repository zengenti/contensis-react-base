import express from 'express';
import { CacheDuration } from '../cacheDuration.schema';
import { bundleManipulationMiddleware } from '../middleware/bundleManipulation';
import { resolveStartupMiddleware } from '../middleware/resolveStartup';

// Serving static assets
const staticAssets = (
  app,
  {
    appRootPath = require('app-root-path').path,
    startupScriptFilename = 'startup.js',
    staticFolderPath = 'static',
    staticRoutePath = 'static',
    staticRoutePaths = [],
  }
) => {
  app.use(
    [
      `/${staticRoutePath}`,
      ...staticRoutePaths.map(p => `/${p}`),
      `/${staticFolderPath}`,
    ],
    bundleManipulationMiddleware({
      appRootPath,
      // these maxage values are different in config but the same in runtime,
      // this one is the true value in seconds
      maxage: CacheDuration.static,
      staticRoutePath,
    }),
    resolveStartupMiddleware({
      appRootPath,
      maxage: CacheDuration.static,
      startupScriptFilename,
      staticFolderPath,
    }),
    express.static(`dist/${staticFolderPath}`, {
      // these maxage values are different in config but the same in runtime,
      // this one is somehow converted and should end up being the same as CacheDuration.static
      maxage: CacheDuration.expressStatic,
    })
  );
};

export default staticAssets;
