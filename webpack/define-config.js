const packagejson = require('../package.json');
require('custom-env').env(process.env.CMS_ENV);

const { PUBLIC_URL, ALIAS, INTERNAL_VIP, ACCESS_TOKEN, PROJECT } = process.env;

const PROJECTS = [
  {
    id: PROJECT,
    publicUri: PUBLIC_URL,
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

const url = alias => ({
  cms: `https://cms-${alias}.cloud.contensis.com`,
  previewWeb: `https://preview-${alias}.cloud.contensis.com`,
  liveWeb: `https://live-${alias}.cloud.contensis.com`,
  iisWeb: `https://iis-live-${alias}.cloud.contensis.com`,
});

const SERVERS = {
  alias: ALIAS,
  internalVip: INTERNAL_VIP,
  web: url(ALIAS).liveWeb,
  cms: url(ALIAS).cms,
  iis: url(ALIAS).iisWeb,
};

const DELIVERY_API_CONFIG = {
  rootUrl: url(ALIAS).cms,
  accessToken: ACCESS_TOKEN,
  projectId: PROJECTS[0].id,
  livePublishingRootUrl: url(ALIAS).previewWeb,
};

const development = {
  __isBrowser__: true,
  DELIVERY_API_CONFIG,
  DISABLE_SSR_REDUX: false,
  PROJECTS,
  ALLOWED_GROUPS,
  PROXY_DELIVERY_API: false,
  PUBLIC_URI: PUBLIC_URL,
  REVERSE_PROXY_PATHS,
  SERVERS,
  VERSION: packagejson.version,
};

const production = {
  __isBrowser__: false,
  DISABLE_SSR_REDUX: false,
  PROJECTS,
  ALLOWED_GROUPS,
  PROXY_DELIVERY_API: false,
  REVERSE_PROXY_PATHS,
  VERSION: packagejson.version,
};

module.exports =
  process.env.NODE_ENV == 'production' ? production : development;
