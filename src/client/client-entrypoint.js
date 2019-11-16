import loadPolyfills from './loadPolyFills';
// import ClientApp from './client'; // the entry point for the rest of the app
import ClientApp from '../../lib/zengenti-clientapp-package';

import ContentTypeMappings from '~/core/routes/ContentTypeMappings';
import StaticRoutes from '~/core/routes/StaticRoutes';

const config = {
  routes: { ContentTypeMappings, StaticRoutes },
  withReducers: {},
  withSagas: [],
};

if (process.env.NODE_ENV == 'development') {
  new ClientApp(config);
} else {
  loadPolyfills().then(new ClientApp(config));
}
