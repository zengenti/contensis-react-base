import loadPolyfills from './loadPolyFills';
import ClientApp from './client'; // the entry point for the rest of the app
// import ClientApp from '../../client';

import routes from '~/core/routes';
import withReducers from '~/core/redux/reducers.js';
import withSagas from '~/core/redux/sagas.js';

const config = {
  routes,
  withReducers,
  withSagas,
};

if (process.env.NODE_ENV == 'development') {
  new ClientApp(config);
} else {
  loadPolyfills().then(new ClientApp(config));
}
