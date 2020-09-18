/**
 * Consolidate build imports and save repetition in the webpack.config.* files
 */
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
      '/api/*': {
        // target: 'http://localhost:3001',
        target: SERVERS.cms,
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

const DEVSERVER_PROXIES = { ...apiProxies, ...reverseProxies };

module.exports = {
  DEFINE_CONFIG,
  DEVSERVER_PROXIES,
  WEBPACK_DEFINE_CONFIG,
};
