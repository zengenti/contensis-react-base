import ZengentiAppServer from '../../zengenti-isomorphic-base';
import ContentTypeMappings from '~/core/routes/ContentTypeMappings';
import StaticRoutes from '~/core/routes/StaticRoutes';
import ServerFeatures from './features/configure';

// Feature reducers
// import { reducer as FormsReducer } from 'zengenti-forms-package';
// import { reducer as AlertReducer } from '~/features/siteAlert';

ZengentiAppServer.start(
  ZengentiAppServer.ReactApp,
  {
    routes: { ContentTypeMappings, StaticRoutes },
    withReducers: {},
    withSagas: [],
    // The HTML templates we will render the app into
    templates: {
      html: 'dist/index.html',
      static: 'dist/index_static.html',
      fragment: 'dist/index_fragment.html',
    },
    dynamicPaths: [],
    reverseProxyPaths: REVERSE_PROXY_PATHS /* global REVERSE_PROXY_PATHS */,
    allowedGroups: ALLOWED_GROUPS /* global ALLOWED_GROUPS */,
    disableSsrRedux: DISABLE_SSR_REDUX /* global DISABLE_SSR_REDUX */,
    // Some information about the project and the build to pass to the start config
    packagejson: require('../../package.json'),
    stats: 'dist/static/react-loadable.json',
    versionData: 'dist/static/version.json',
  },
  // Configure any server-side features such as sitemap or REST api's
  ServerFeatures
);

const app = ZengentiAppServer.app;

app.emit('ready');

export { app };
