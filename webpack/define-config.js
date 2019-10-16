const packagejson = require('../package.json');
require('custom-env').env(process.env.env || process.env.npm_config_env);

const { PUBLIC_URL, ALIAS, INTERNAL_VIP, ACCESS_TOKEN } = process.env;

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

const url = (alias, project) => {
  let projectAndAlias =
    project && project != 'website' ? `${project}-${alias}` : alias;
  return {
    cms: `https://cms-${alias}.cloud.contensis.com`,
    previewWeb: `https://preview-${projectAndAlias}.cloud.contensis.com`,
    liveWeb: `https://live-${projectAndAlias}.cloud.contensis.com`,
    iisWeb: `https://iis-live-${projectAndAlias}.cloud.contensis.com`,
  };
};

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
  projectId: PROJECTS(process.env)[0].id,
  livePublishingRootUrl: url(ALIAS).previewWeb,
};

const development = {
  __isBrowser__: true,
  DELIVERY_API_CONFIG,
  DISABLE_SSR_REDUX: false,
  PROJECTS: PROJECTS(process.env),
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
  //PROJECTS,
  ALLOWED_GROUPS,
  PROXY_DELIVERY_API: false,
  REVERSE_PROXY_PATHS,
  VERSION: packagejson.version,
};

module.exports.build =
  process.env.NODE_ENV == 'production' ? production : development;

module.exports.PROJECTS = PROJECTS;
