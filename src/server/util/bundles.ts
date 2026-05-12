import fs from 'fs';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import { replaceStaticPath } from './staticPaths';
import { ServerConfig } from '~/models';
import stringifyAttributes from './stringifyAttributes';

const readFileSync = (path: string) => fs.readFileSync(path, 'utf8');

export const loadableBundleData = (
  { stats, templates }: ServerConfig,
  staticRoutePath: string,
  build?: string
) => {
  const bundle: {
    stats?: string | null;
    templates?: {
      templateHTML: string;
      templateHTMLStatic: string;
      templateHTMLFragment: string;
    } | null;
  } = {};
  try {
    bundle.stats = stats
      ? JSON.parse(
          readFileSync(stats.replace('/target', build ? `/${build}` : ''))
        )
      : null;
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

type LoadableChunkExtractors = {
  legacy?: ChunkExtractor;
  modern?: ChunkExtractor;
  commonLoadableExtractor: ChunkExtractor;
};

// Single-slot module cache for inlined chunk CSS. Chunk CSS files are
// immutable per build, so we key on the sorted main-asset filename list and
// invalidate implicitly when a new build deploys with new content hashes.
let _inlineStyleCache: { key: string; html: string } | undefined;

export const getCachedInlineStyleTags = async (
  loadableExtractor: LoadableChunkExtractors
): Promise<string> => {
  // Prefer the modern extractor; fall back to legacy when only the nomodule
  // build is present (e.g. legacy-only deploys, some test fixtures) so the
  // streaming shell still ships chunk CSS rather than a bare <head>.
  const extractor = loadableExtractor?.modern ?? loadableExtractor?.legacy;
  if (!extractor) return '';
  const assets = extractor.getMainAssets('style') || [];
  const key = assets
    .map((a: { filename: string }) => a.filename)
    .sort()
    .join('|');
  if (_inlineStyleCache?.key === key) return _inlineStyleCache.html;
  try {
    const html = await extractor.getInlineStyleTags();
    _inlineStyleCache = { key, html };
    return html;
  } catch (err) {
    // Stale loadable-stats.json during rolling deploys, pruned *.css in
    // serverless images, or EACCES will land here. Falling back to linked
    // stylesheets is preferable to 500-ing every SSR request.
    console.error(
      '[ssr] getInlineStyleTags failed; falling back to getStyleTags()',
      err
    );
    return extractor.getStyleTags();
  }
};

export const loadableChunkExtractors = () => {
  const commonLoadableExtractor = new ChunkExtractor({ stats: {} });
  try {
    let modern: ChunkExtractor | undefined;
    let legacy: ChunkExtractor | undefined;
    try {
      modern = new ChunkExtractor({
        entrypoints: ['app'],
        namespace: 'modern',
        statsFile: path.resolve('dist/modern/loadable-stats.json'),
      });
    } catch (e) {
      console.info('@loadable/server modern ChunkExtractor not available');
    }
    try {
      legacy = new ChunkExtractor({
        entrypoints: ['app'],
        namespace: 'legacy',
        statsFile: path.resolve('dist/legacy/loadable-stats.json'),
      });
    } catch (e) {
      // legacy bundling deprecated in v4
      // console.info('@loadable/server legacy ChunkExtractor not available');
    }

    (commonLoadableExtractor as any).addChunk = (chunk: any) => {
      (modern as any)?.addChunk(chunk);
      if (
        typeof (legacy as any)?.stats.assetsByChunkName[chunk] !== 'undefined'
      )
        (legacy as any)?.addChunk(chunk);
    };

    return {
      commonLoadableExtractor,
      modern,
      legacy,
    } as LoadableChunkExtractors;
  } catch (e) {
    console.info('@loadable/server no ChunkExtractor available');
    return { commonLoadableExtractor };
  }
};

export const getBundleData = (
  config: ServerConfig,
  staticRoutePath: string
) => {
  const bundleData = {
    default: loadableBundleData(config, staticRoutePath),
    legacy: loadableBundleData(config, staticRoutePath, 'legacy'),
    modern: loadableBundleData(config, staticRoutePath, 'modern'),
  };
  if (!bundleData.default || Object.keys(bundleData.default || {}).length === 0)
    bundleData.default = bundleData.legacy || bundleData.modern;
  return bundleData;
};

// export const buildBundleTags = (
//   bundles,
//   differentialBundles = false,
//   staticRoutePath = 'static',
//   attributes = ''
// ) => {
//   // Take the bundles returned from Loadable.Capture
//   const bundleTags = bundles
//     .filter(b => b)
//     .map(bundle => {
//       if (bundle.publicPath.includes('/modern/'))
//         return differentialBundles
//           ? `<script ${attributes} type="module" src="${replaceStaticPath(
//               bundle.publicPath,
//               staticRoutePath
//             )}"></script>`
//           : null;
//       return `<script ${attributes}${
//         differentialBundles ? ' nomodule' : ''
//       } src="${replaceStaticPath(
//         bundle.publicPath,
//         staticRoutePath
//       )}"></script>`;
//     })
//     .filter(f => f);

//   return bundleTags;
// };

export const getBundleTags = (
  loadableExtractor: LoadableChunkExtractors,
  scripts: ServerConfig['scripts'],
  staticRoutePath = 'static'
) => {
  let startupTag = '';
  // Add the static startup script to the bundleTags
  if (scripts?.startup)
    startupTag = `<script ${stringifyAttributes(
      scripts.attributes
    )} src="/${staticRoutePath}/${scripts.startup}"></script>`;

  // Get the script tags from their respective extractor instances
  if (loadableExtractor) {
    const legacyScriptTags = loadableExtractor.legacy?.getScriptTags({
      nomodule: 'nomodule',
    });
    const modernScriptTags = loadableExtractor.modern?.getScriptTags({
      type: 'module',
    });
    const scriptTags = `${startupTag}${legacyScriptTags || ''}${
      modernScriptTags || ''
    }`.replace(/"\/static\//g, `"/${staticRoutePath}/`);
    return scriptTags;
  }
  return startupTag;
};
