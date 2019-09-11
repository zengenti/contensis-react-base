import loadPolyfills from './loadPolyFills';
import client from './client'; // the entry point for the rest of the app

loadPolyfills().then(client);
