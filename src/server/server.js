import ZengentiAppServer from '../../lib/zengenti-appserver-package';

import createStore from '~/core/redux/store';
import rootSaga from '~/core/redux/sagas';
import ReactApp from '~/App';
import ServerFeatures from './features/configure';

const packagejson = require('../../package.json');

const globals = {
  servers: SERVERS /* global SERVERS */,
  projects: PROJECTS /* global PROJECTS */,
  reverseProxyPaths: REVERSE_PROXY_PATHS /* global REVERSE_PROXY_PATHS */,
};

ZengentiAppServer.start(
  ReactApp,
  // Configure any server-side features such as sitemap or REST api's
  ServerFeatures,
  {
    store: createStore(),
    rootSaga,
    // The HTML templates we will render the app into
    templates: {
      html: 'dist/index.html',
      static: 'dist/index_static.html',
      fragment: 'dist/index_fragment.html',
    },
    dynamicPaths: [],
    // Some information about the project and the build to pass to the start config
    packagejson,
    stats: 'dist/static/react-loadable.json',
    versionData: 'dist/static/version.json',
  },
  globals
);

ZengentiAppServer.app.emit('ready');
