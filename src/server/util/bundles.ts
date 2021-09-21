import fs from 'fs';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import { replaceStaticPath } from './staticPaths';

const readFileSync = path => fs.readFileSync(path, 'utf8');

export const loadableBundleData = (
  { stats, templates },
  staticRoutePath: string,
  build?: string
) => {
  const bundle: {
    stats?: string | null;
    templates?: {
      templateHTML;
      templateHTMLStatic;
      templateHTMLFragment;
    } | null;
  } = {};
  try {
    bundle.stats = JSON.parse(
      readFileSync(stats.replace('/target', build ? `/${build}` : ''))
    );
  } catch (ex) {
    // console.info(ex);
    bundle.stats = null;
  }
  try {
    bundle.templates = {
      templateHTML: replaceStaticPath(
        readFileSync(
          templates.html.replace('/target', build ? `/${build}` : '')
        ),
        staticRoutePath
      ),
      templateHTMLStatic: replaceStaticPath(
        readFileSync(
          templates.static.replace('/target', build ? `/${build}` : '')
        ),
        staticRoutePath
      ),
      templateHTMLFragment: replaceStaticPath(
        readFileSync(
          templates.fragment.replace('/target', build ? `/${build}` : '')
        ),
        staticRoutePath
      ),
    };
  } catch (ex) {
    // console.info(ex);
    bundle.templates = null;
  }
  return bundle;
};

export const loadableChunkExtractors = () => {
  try {
    const modern = new ChunkExtractor({
      entrypoints: ['app'],
      namespace: 'modern',
      statsFile: path.resolve('dist/modern/loadable-stats.json'),
    });
    const legacy = new ChunkExtractor({
      entrypoints: ['app'],
      namespace: 'legacy',
      statsFile: path.resolve('dist/legacy/loadable-stats.json'),
    });
    const commonLoadableExtractor = {
      addChunk(chunk) {
        modern.addChunk(chunk);
        if (typeof legacy.stats.assetsByChunkName[chunk] !== 'undefined')
          legacy.addChunk(chunk);
      },
    };

    return { commonLoadableExtractor, modern, legacy };
  } catch (e) {
    console.info('@loadable/server ChunkExtractor not available');
  }
};

export const getBundleData = (config, staticRoutePath) => {
  const bundleData = {
    default: loadableBundleData(config, staticRoutePath),
    legacy: loadableBundleData(config, staticRoutePath, 'legacy'),
    modern: loadableBundleData(config, staticRoutePath, 'modern'),
  };
  if (!bundleData.default || bundleData.default === {})
    bundleData.default = bundleData.legacy || bundleData.modern;
  return bundleData;
};

export const buildBundleTags = (
  bundles,
  differentialBundles = false,
  staticRoutePath = 'static',
  attributes = ''
) => {
  // Take the bundles returned from Loadable.Capture
  const bundleTags = bundles
    .filter(b => b)
    .map(bundle => {
      if (bundle.publicPath.includes('/modern/'))
        return differentialBundles
          ? `<script ${attributes} type="module" src="${replaceStaticPath(
              bundle.publicPath,
              staticRoutePath
            )}"></script>`
          : null;
      return `<script ${attributes}${
        differentialBundles ? ' nomodule' : ''
      } src="${replaceStaticPath(
        bundle.publicPath,
        staticRoutePath
      )}"></script>`;
    })
    .filter(f => f);

  return bundleTags;
};

export const getBundleTags = loadableExtractor => {
  if (loadableExtractor) {
    const legacyScriptTags = loadableExtractor?.legacy.getScriptTags({
      noModule: true,
    });
    const modernScriptTags = loadableExtractor?.modern.getScriptTags({
      type: 'module',
    });
    return `${legacyScriptTags || ''}${modernScriptTags || ''}`;
  }
  return '';
};
