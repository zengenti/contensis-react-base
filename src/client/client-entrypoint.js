import loadPolyfills from './loadPolyFills';
import ClientApp from './client'; // the entry point for the rest of the app
import ReactApp from '~/App';
// import ClientApp, { ReactApp } from '../../client';

import routes from '~/core/routes';
import withReducers from '~/core/redux/reducers.js';
import withSagas from '~/core/redux/sagas.js';
import withEvents from '~/core/redux/withEvents';

const config = {
  routes,
  withReducers,
  withSagas,
  withEvents,
};

if (process.env.NODE_ENV == 'development') {
  new ClientApp(ReactApp, config);
} else {
  loadPolyfills().then(new ClientApp(ReactApp, config));
}
