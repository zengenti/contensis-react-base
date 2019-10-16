/* eslint-disable no-undef */

var context = typeof window != 'undefined' ? window : global;

function url() {
  let alias = _ALIAS_;
  let project = _PROJECT_;
  let projectAndAlias =
    project && project != 'website' ? `${project}-${alias}` : alias;
  return Object({
    cms: 'https://cms-' + projectAndAlias + '.cloud.contensis.com',
    previewWeb: 'https://preview-' + projectAndAlias + '.cloud.contensis.com',
    liveWeb: 'https://live-' + projectAndAlias + '.cloud.contensis.com',
    iisWeb: 'https://iis-live-' + projectAndAlias + '.cloud.contensis.com',
  });
}

context.PUBLIC_URI = _PUBLIC_URL_;

context.SERVERS = Object({
  alias: _ALIAS_,
  internalVip: _INTERNAL_VIP_,
  web: url().liveWeb,
  cms: url().cms,
  iis: url().iisWeb,
});

context.DELIVERY_API_CONFIG = Object({
  rootUrl: url().cms,
  accessToken: _ACCESS_TOKEN_,
  projectId: _PROJECT_,
  livePublishingRootUrl: url().previewWeb,
});

context.PROJECTS = Object(_PROJECTS_);

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
