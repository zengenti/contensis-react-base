import fs from 'fs';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import { replaceStaticPath } from './staticPaths';
import { ServerConfig } from '~/config';
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
      console.info('@loadable/server legacy ChunkExtractor not available');
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
  if (!bundleData.default)
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
