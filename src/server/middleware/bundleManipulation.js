import fs from 'fs';
import path from 'path';
import { replaceStaticPath } from '../util/staticPaths';
import { resolve } from 'app-root-path';

export const bundleManipulationMiddleware = (
  staticRoutePath,
  { maxage } = {}
) => (req, res, next) => {
  const filename = path.basename(req.path);
  const modernBundle = filename.endsWith('.mjs');
  const legacyBundle = filename.endsWith('.js');
  if ((legacyBundle || modernBundle) && filename.startsWith('runtime.')) {
    const jsRuntimeLocation = resolve(
      `/dist/static/${modernBundle ? 'modern/js' : 'legacy/js'}/${filename}`
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
      // eslint-disable-next-line no-console
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
