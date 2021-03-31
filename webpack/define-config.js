const packagejson = require('../package.json');
const urls = require('../src/app/core/util/urls');
//const { urls } = require('../util');

require('custom-env').env(process.env.env || process.env.npm_config_env);

const {
  PUBLIC_URL,
  ALIAS,
  INTERNAL_VIP,
  ACCESS_TOKEN,
  PROJECT,
  CONTENSIS_VERSION,
  STATIC_PATH = 'static',
} = process.env;

const PROJECTS = env => [
  {
    id: env.PROJECT,
    publicUri: env.PUBLIC_URL,
  },
  {
    id: 'mock',
    publicUri: 'mock.ludlow.ac.uk',
  },
];

// any paths to proxy back to the classic IIS servers?
const REVERSE_PROXY_PATHS = [
  '/image-library/*',
  '/video-library/*',
  '/asset-library/*',
];

const ALLOWED_GROUPS = {
  // 1 is Everyone, -1 is false (no security)
  website: [-1],
  mock: [-1],
  intranet: [1],
};

// --------------------
// End of configuration
// --------------------

const url = urls(ALIAS, PROJECT);

const SERVERS = {
  alias: ALIAS,
  internalVip: INTERNAL_VIP,
  cms: url.cms,
  web: url.liveWeb,
  previewWeb: url.previewWeb,
  iis: url.iisWeb,
  previewIis: url.iisPreviewWeb,
};

const DELIVERY_API_CONFIG = {
  rootUrl: url.cms,
  accessToken: ACCESS_TOKEN,
  projectId: PROJECTS(process.env)[0].id,
  livePublishingRootUrl: url.previewWeb,
};

const development = {
  __isBrowser__: true,
  CONTENSIS_VERSION,
  DELIVERY_API_CONFIG,
  DISABLE_SSR_REDUX: false,
  PROJECTS: PROJECTS(process.env),
  ALLOWED_GROUPS,
  PROXY_DELIVERY_API: false,
  PUBLIC_URI: PUBLIC_URL,
  REVERSE_PROXY_PATHS,
  SERVERS,
  STATIC_PATH: 'static',
  STATIC_ROUTE_PATH: 'static',
  VERSION: packagejson.version,
};

const production = {
  __isBrowser__: false,
  DISABLE_SSR_REDUX: false,
  ALLOWED_GROUPS,
  PROXY_DELIVERY_API: false,
  REVERSE_PROXY_PATHS,
  STATIC_PATH,
  STATIC_ROUTE_PATH: 'static',
  VERSION: packagejson.version,
};

module.exports = {
  build: process.env.NODE_ENV == 'production' ? production : development,
  development,
  production,
  projects: PROJECTS,
};
