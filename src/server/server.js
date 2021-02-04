import ZengentiAppServer from './internalServer';
import App from '~/App';
// import ZengentiAppServer from '../../zengenti-isomorphic-base';

import routes from '~/core/routes';
import withReducers from '~/core/redux/reducers';
import withSagas from '~/core/redux/sagas';
import withEvents from '~/core/redux/withEvents';

import ServerFeatures from './features/configure';

ZengentiAppServer.start(
  ZengentiAppServer.ReactApp || App,
  {
    routes,
    withReducers,
    withSagas,
    withEvents,
    // The HTML templates we will render the app into
    templates: {
      html: 'dist/index.html',
      static: 'dist/index_static.html',
      fragment: 'dist/index_fragment.html',
    },
    differentialBundles: true,
    dynamicPaths: [],
    reverseProxyPaths: Object.values(
      REVERSE_PROXY_PATHS /* global REVERSE_PROXY_PATHS */
    ),
    allowedGroups: ALLOWED_GROUPS /* global ALLOWED_GROUPS */,
    globalGroups: ALLOWED_GROUPS,
    disableSsrRedux: DISABLE_SSR_REDUX /* global DISABLE_SSR_REDUX */,
    // Some information about the project and the build to pass to the start config
    packagejson: require('../../package.json'),
    staticFolderPath: STATIC_PATH /* global STATIC_PATH */,
    staticRoutePath: STATIC_ROUTE_PATH /* global STATIC_ROUTE_PATH */,
    staticRoutePaths: [],
    startupScriptFilename: 'startup.js',
    stats: 'dist/target/react-loadable.json',
    // versionData: 'dist/static-new/version.json',
  },
  // Configure any server-side features such as sitemap or REST api's
  ServerFeatures
);

const app = ZengentiAppServer.app;

app.emit('ready');

export { app };
