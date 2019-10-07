/* eslint-disable no-undef */
/* eslint-disable no-console */

var context = typeof window != 'undefined' ? window : global;

function url(alias) {
  return Object({
    cms: 'https://cms-' + alias + '.cloud.contensis.com',
    previewWeb: 'https://preview-' + alias + '.cloud.contensis.com',
    liveWeb: 'https://live-' + alias + '.cloud.contensis.com',
    iisWeb: 'https://iis-live-' + alias + '.cloud.contensis.com',
  });
}

context.PUBLIC_URI = PUBLIC_URL;

context.SERVERS = Object({
  alias: ALIAS,
  internalVip: INTERNAL_VIP,
  web: url(ALIAS).liveWeb,
  cms: url(ALIAS).cms,
  iis: url(ALIAS).iisWeb,
});

context.DELIVERY_API_CONFIG = Object({
  rootUrl: url(ALIAS).cms,
  accessToken: ACCESS_TOKEN,
  projectId: PROJECT,
  livePublishingRootUrl: url(ALIAS).previewWeb,
});

if (typeof window == 'undefined') {
  // in a server context we need to set default
  // scripts and bundles, then start the server
  var utils = require('./startup.utils.js');
  utils.setDefaults(__filename);
  if (process.argv.includes('-tests')) {
    utils.runTests();
  } else {
    utils.startServer();
  }
}
