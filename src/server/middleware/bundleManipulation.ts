import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { replaceStaticPath } from '../util/staticPaths';

export const bundleManipulationMiddleware =
  ({
    appRootPath,
    maxage,
    staticFolderPath,
    staticRoutePath,
  }: {
    appRootPath: string;
    maxage: string;
    staticFolderPath: string;
    staticRoutePath: string;
  }): RequestHandler =>
  (req, res, next) => {
    const filename = path.basename(encodeURI(req.path));
    const modernBundle = filename.endsWith('.mjs');
    const legacyBundle = filename.endsWith('.js');
    if ((legacyBundle || modernBundle) && filename.startsWith('runtime.')) {
      const jsRuntimeLocation = path.resolve(
        appRootPath,
        `dist/${staticFolderPath}/${
          modernBundle ? 'modern/js' : 'legacy/js'
        }/${filename}`
      );
      try {
        const jsRuntimeBundle = fs.readFileSync(jsRuntimeLocation, 'utf8');
        const modifiedBundle = replaceStaticPath(
          jsRuntimeBundle,
          staticRoutePath
        );
        if (maxage) res.set('Cache-Control', `public, max-age=${maxage}`);
        res.type('.js').send(modifiedBundle);
        return;
      } catch (readError) {
        console.log(
          `Unable to find js runtime bundle at '${jsRuntimeLocation}'`,
          readError
        );
        next();
      }
    } else {
      next();
    }
  };
