import loadPolyfills from './loadPolyFills';
import ClientApp from './client'; // the entry point for the rest of the app

if (process.env.NODE_ENV == 'development') {
  new ClientApp();
} else {
  loadPolyfills().then(new ClientApp());
}
