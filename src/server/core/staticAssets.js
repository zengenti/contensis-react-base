import express from 'express';
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
      maxage: '31557600',
    }),
    express.static(`dist/${staticFolderPath}`, {
      maxage: '31557600',
    })
  );
};

export default staticAssets;
