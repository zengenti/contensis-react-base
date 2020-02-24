/**
 * Consolidate build imports and save repetition in the webpack.config.* files
 */
const path = require('path');

// Check BROWSERSLIST_ENV arg and set bundle build mode
const env = process.env.BROWSERSLIST_ENV;
const isModern = env === 'modern';

const POLYFILLS_PATH = isModern
  ? path.resolve(__dirname, '../src/client/polyfills.modern.js')
  : path.resolve(__dirname, '../src/client/polyfills.legacy.js');

const BABEL_CONFIG = isModern
  ? require('./babel-bundle.config').modern
  : require('./babel-bundle.config').legacy;

const DEFINE_CONFIG = require('./define-config');
const WEBPACK_DEFINE_CONFIG = require('./define-config-webpack');

// Configure devServer reverse proxying
const {
  SERVERS,
  REVERSE_PROXY_PATHS,
  PROXY_DELIVERY_API,
} = DEFINE_CONFIG.development;

const apiProxies = PROXY_DELIVERY_API
  ? {
      '/api/image/*': {
        target: 'https://live-canterbury.cloud.contensis.com/',
        changeOrigin: true,
      },
      '/api/*': {
        target: 'http://preview.canterbury.contensis.cloud/', // Run development mode with api requests forwarded to a deployed server-side proxy here
        // target: 'http://localhost:3001/', // Uncomment this line to run development mode against a local running dev:server instance
        changeOrigin: true,
      },
    }
  : {};

const reverseProxies = {};

REVERSE_PROXY_PATHS.forEach(path => {
  reverseProxies[path] = {
    // Change your devServer proxy target here
    target: SERVERS.iis || SERVERS.web,
    changeOrigin: true,
  };
});

const DEVSERVER_PROXIES = { ...apiProxies, reverseProxies };

module.exports = {
  BABEL_CONFIG,
  BROWSERSLIST_ENV: env,
  DEFINE_CONFIG,
  DEVSERVER_PROXIES,
  isModern,
  POLYFILLS_PATH,
  WEBPACK_DEFINE_CONFIG,
};
