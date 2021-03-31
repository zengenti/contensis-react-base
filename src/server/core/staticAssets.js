import express from 'express';
import { CacheDuration } from '../cacheDuration.schema';
import { bundleManipulationMiddleware } from '../middleware/bundleManipulation';

// Serving static assets
const staticAssets = (
  app,
  { staticRoutePath, staticRoutePaths = [], staticFolderPath = 'static' }
) => {
  app.use(
    [
      `/${staticRoutePath}`,
      ...staticRoutePaths.map(p => `/${p}`),
      `/${staticFolderPath}`,
    ],
    bundleManipulationMiddleware(staticRoutePath, {
      // these maxage values are different in config but the same in runtime,
      // this one is the true value in seconds
      maxage: CacheDuration.static,
    }),
    express.static(`dist/${staticFolderPath}`, {
      // these maxage values are different in config but the same in runtime,
      // this one is somehow converted and should end up being the same as CacheDuration.static
      maxage: CacheDuration.expressStatic,
    })
  );
};

export default staticAssets;
