import loadPolyfills from './loadPolyFills';
import ClientApp from './client'; // the entry point for the rest of the app

loadPolyfills().then(new ClientApp());
