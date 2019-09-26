const packagejson = require('../package.json');
require('custom-env').env(process.env.CMS_ENV);

const { PUBLIC_URI, ALIAS, INTERNAL_VIP, ACCESS_TOKEN } = process.env;

const PROJECTS = [
  {
    id: 'website',
    publicUri: 'ludlow.ac.uk',
    homeEntry: '33479a87-7069-4220-9b0c-220318bd3345',
  },
  {
    id: 'mock',
    publicUri: 'mock.ludlow.ac.uk',
    homeEntry: 'abcd-efgh-ijkl-mnop',
  },
];

// any paths to proxy back to the classic IIS servers?
const REVERSE_PROXY_PATHS = [
  '/image-library/*',
  '/video-library/*',
  '/asset-library/*',
];

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

module.exports = {
  __isBrowser__: false,
  DELIVERY_API_CONFIG,
  DISABLE_SSR_REDUX: false,
  SERVERS,
  PROJECTS,
  PROXY_DELIVERY_API: true,
  PUBLIC_URI,
  REVERSE_PROXY_PATHS,
  VERSION: packagejson.version,
};
