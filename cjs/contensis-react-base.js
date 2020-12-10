'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('isomorphic-fetch');
var express = require('express');
var Loadable = require('react-loadable');
var httpProxy = require('http-proxy');
var fs = require('fs');
var React = require('react');
var reactRouterDom = require('react-router-dom');
var reactRedux = require('react-redux');
var server = require('react-dom/server');
var webpack = require('react-loadable/webpack');
var styledComponents = require('styled-components');
var Helmet = require('react-helmet');
var serialize = require('serialize-javascript');
var minifyCssString = require('minify-css-string');
var immutable = require('immutable');
var fromEntries = require('fromentries');
require('history');
<<<<<<< HEAD
var App = require('./App-9f6b6951.js');
require('contensis-delivery-api');
var routing = require('./routing-37e4f287.js');
=======
var App = require('./App-ff873a10.js');
require('contensis-delivery-api');
var selectors = require('./selectors-1a2d998b.js');
var routing = require('./routing-2b3d824a.js');
var navigation = require('./navigation-37bfd5e7.js');
require('query-string');
>>>>>>> isomorphic-base
require('redux');
require('redux-immutable');
require('redux-thunk');
require('redux-saga');
<<<<<<< HEAD
var version = require('./version-e5fb1848.js');
require('./login-fa833d9c.js');
require('query-string');
=======
require('./sagas-ac3c2bc5.js');
>>>>>>> isomorphic-base
require('redux-saga/effects');
require('loglevel');
require('./ToJs-8f6b21c9.js');
require('contensis-management-api');
require('jsonpath-mapper');
require('await-to-js');
require('js-cookie');
var reactRouterConfig = require('react-router-config');
require('react-hot-loader');
require('prop-types');
<<<<<<< HEAD
require('./RouteLoader-e332e4fb.js');
=======
require('./RouteLoader-21a3f199.js');
>>>>>>> isomorphic-base

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var Loadable__default = /*#__PURE__*/_interopDefaultLegacy(Loadable);
var httpProxy__default = /*#__PURE__*/_interopDefaultLegacy(httpProxy);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Helmet__default = /*#__PURE__*/_interopDefaultLegacy(Helmet);
var serialize__default = /*#__PURE__*/_interopDefaultLegacy(serialize);
var minifyCssString__default = /*#__PURE__*/_interopDefaultLegacy(minifyCssString);
var fromEntries__default = /*#__PURE__*/_interopDefaultLegacy(fromEntries);

const servers = SERVERS;
/* global SERVERS */

const projects = PROJECTS;
/* global PROJECTS */

const DisplayStartupConfiguration = config => {
  /* eslint-disable no-console */
  console.log();
  console.log(`Configured servers:
`, JSON.stringify(servers, null, 2));
  console.log();
  console.log(`Configured projects:
`, JSON.stringify(projects, null, 2));
  console.log();
  console.log('Reverse proxy paths: ', JSON.stringify(config.reverseProxyPaths, null, 2));
  console.log();
  /* eslint-enable no-console */
};

const servers$1 = SERVERS;
/* global SERVERS */

const apiProxy = httpProxy__default['default'].createProxyServer();

const reverseProxies = (app, reverseProxyPaths) => {
  deliveryApiProxy(apiProxy, app);
  app.all(reverseProxyPaths, (req, res) => {
    const target = req.hostname.indexOf('preview-') || req.hostname.indexOf('preview.') || req.hostname === 'localhost' ? servers$1.previewIis || servers$1.iis : servers$1.iis;
    apiProxy.web(req, res, {
      target,
      changeOrigin: true
    });
    apiProxy.on('error', e => {
      /* eslint-disable no-console */
      console.log(`Proxy Request for ${req.path} HostName:${req.hostname} failed with ${e}`);
      /* eslint-enable no-console */
    });
  });
};

const deliveryApiProxy = (apiProxy, app) => {
  // This is just here to stop cors requests on localhost. In Production this is mapped using varnish.
  app.all(['/api/delivery/*', '/api/image/*'], (req, res) => {
    /* eslint-disable no-console */
    const target = servers$1.cms;
    console.log(`Proxying api request to ${servers$1.alias}`);
    apiProxy.web(req, res, {
      target,
      changeOrigin: true
    });
    apiProxy.on('error', e => {
      /* eslint-disable no-console */
      console.log(`Proxy request for ${req.path} HostName:${req.hostname} failed with ${e}`);
      /* eslint-enable no-console */
    });
  });
};

const AccessMethods = {
  DYNAMIC: 'dynamic',
  STATIC: 'static',
  FRAGMENT: 'fragment',
  REDUX: 'redux'
};
const ResponseMethod = {
  send: 'send',
  json: 'json',
  end: 'end'
};

/* eslint-disable no-console */
/**
 * Web Application Response handler, sends a prepared express js response
 * with the supplied content sending in the specified manner
 * @param {response} request express js request object
 * @param {response} response express js response object
 * @param {string | object} content the content to send in the response body
 * @param {function} send the response function to call e.g res.send() res.json() res.end()
 */

const handleResponse = (request, response, content, send = ResponseMethod.send) => {
  // console.log('---', response.statusCode, '---');
  response[send](content);
};

<<<<<<< HEAD
=======
const hashKeys = keys => {
  const XXHash = require('xxhashjs');

  const returnKeys = [];
  keys.forEach(cacheKey => {
    const inputBuffer = Buffer.from(cacheKey.toLowerCase(), 'utf-8');
    const hashed = XXHash.h32(inputBuffer, 0x0).toString(16);
    const reversedhex = hashed.match(/[a-fA-F0-9]{2}/g).reverse().join('');
    const outputBuffer = Buffer.from(reversedhex, 'hex');
    returnKeys.push(outputBuffer.toString('base64').substring(0, 6));
  });
  return returnKeys;
};

const moduleBundles = fs__default['default'].readdirSync('./dist/static/modern/js', 'utf8');
const coreModules = moduleBundles.filter(m => m.startsWith('app.') || m.startsWith('vendor.') || m.startsWith('runtime.'));

>>>>>>> isomorphic-base
const addStandardHeaders = (state, response, packagejson, groups) => {
  if (state) {
    /* eslint-disable no-console */
    try {
      console.log('About to add headers');
      const routingSurrogateKeys = state.getIn(['routing', 'surrogateKeys'], '');
      const surrogateKeyHeader = ` ${packagejson.name}-app ${routingSurrogateKeys}`;
      response.header('surrogate-key', surrogateKeyHeader);
      addVarnishAuthenticationHeaders(state, response, groups);
      response.setHeader('Surrogate-Control', 'max-age=3600');
    } catch (e) {
      console.log('Error Adding headers', e.message); // console.log(e);
    }
  }
};

const addVarnishAuthenticationHeaders = (state, response, groups = {}) => {
  if (state) {
    try {
      const stateEntry = routing.selectRouteEntry(state);
      const project = routing.selectCurrentProject(state);
      const {
        globalGroups,
        allowedGroups
      } = groups; // console.log(globalGroups, allowedGroups);

      let allGroups = Array.from(globalGroups && globalGroups[project] || {});

      if (stateEntry && stateEntry.getIn(['authentication', 'isLoginRequired']) && allowedGroups && allowedGroups[project]) {
        allGroups = [...allGroups, ...allowedGroups[project]];
      }

      response.header('x-contensis-viewer-groups', allGroups.join('|'));
    } catch (e) {
      console.log('Error adding authentication header');
      console.log(e);
    }
  }
};

const readFileSync = path => fs__default['default'].readFileSync(path, 'utf8');

const loadBundleData = ({
  stats,
  templates
}, build) => {
  const bundle = {};

  try {
    bundle.stats = JSON.parse(readFileSync(stats.replace('/target', build ? `/${build}` : '')));
  } catch (ex) {
    //console.log(ex);
    bundle.stats = null;
  }

  try {
    bundle.templates = {
      templateHTML: readFileSync(templates.html.replace('/target', build ? `/${build}` : '')),
      templateHTMLStatic: readFileSync(templates.static.replace('/target', build ? `/${build}` : '')),
      templateHTMLFragment: readFileSync(templates.fragment.replace('/target', build ? `/${build}` : ''))
    };
  } catch (ex) {
    //console.log(ex);
    bundle.templates = null;
  }

  return bundle;
};

const webApp = (app, ReactApp, config) => {
  const {
    routes,
    withReducers,
    withSagas,
    withEvents,
    packagejson,
    versionData,
    differentialBundles,
    dynamicPaths,
    allowedGroups,
    globalGroups,
    disableSsrRedux,
    handleResponses
  } = config;
  const bundles = {
    default: loadBundleData(config),
    legacy: loadBundleData(config, 'legacy'),
    modern: loadBundleData(config, 'modern')
  };
  if (!bundles.default || bundles.default === {}) bundles.default = bundles.legacy || bundles.modern;
  const versionInfo = JSON.parse(fs__default['default'].readFileSync(versionData, 'utf8'));
  const responseHandler = typeof handleResponses === 'function' ? handleResponses : handleResponse;
  app.get('/*', (request, response, next) => {
    if (request.originalUrl.startsWith('/static/')) return next();
    const {
      url
    } = request;

    const matchedStaticRoute = () => reactRouterConfig.matchRoutes(routes.StaticRoutes, request.path);

    const isStaticRoute = () => matchedStaticRoute().length > 0;

    const staticRoute = isStaticRoute() && matchedStaticRoute()[0]; // Determine functional params and set access methods

    let accessMethod = {};
    const isDynamicNormalised = request.query.dynamic ? request.query.dynamic.toLowerCase() : 'false'; // Hack for certain pages to avoid SSR

    const onlyDynamic = dynamicPaths.includes(request.path) || staticRoute && staticRoute.route.ssr === false;
    const isReduxRequestNormalised = request.query.redux ? request.query.redux.toLowerCase() : 'false';
    const isFragmentNormalised = request.query.fragment ? request.query.fragment.toLowerCase() : 'false';
    const isStaticNormalised = request.query.static ? request.query.static.toLowerCase() : 'false';
    if (onlyDynamic || isDynamicNormalised === 'true') accessMethod.DYNAMIC = AccessMethods.DYNAMIC;
    if (isReduxRequestNormalised === 'true') accessMethod.REDUX = AccessMethods.REDUX;
    if (isFragmentNormalised === 'true') accessMethod.FRAGMENT = AccessMethods.FRAGMENT;
    if (isStaticNormalised === 'true') accessMethod.STATIC = AccessMethods.STATIC;
    const context = {};
    let status = 200; // Create a store (with a memory history) from our current url

    const store = App.createStore(withReducers, immutable.fromJS({}), App.history({
      initialEntries: [url]
    })); //const store = createStore(withReducers);
    // dispatch any global and non-saga related actions before calling our JSX

    const versionStatusFromHostname = App.deliveryApi.getVersionStatusFromHostname(request.hostname);
    store.dispatch(version.setVersionStatus(request.query.versionStatus || versionStatusFromHostname));
    store.dispatch(version.setVersion(versionInfo.commitRef, versionInfo.buildNo));
    const project = App.pickProject(request.hostname, request.query);
    const groups = allowedGroups && allowedGroups[project];
    store.dispatch(routing.setCurrentProject(project, groups));
    const modules = [];
    const jsx = React__default['default'].createElement(Loadable__default['default'].Capture, {
      report: moduleName => modules.push(moduleName)
    }, React__default['default'].createElement(reactRedux.Provider, {
      store: store
    }, React__default['default'].createElement(reactRouterDom.StaticRouter, {
      context: context,
      location: url
    }, React__default['default'].createElement(ReactApp, {
      routes: routes,
      withEvents: withEvents
    }))));
    /* eslint-disable no-console */

    console.log(`Request for ${request.path} hostname: ${request.hostname} versionStatus: ${versionStatusFromHostname}`);
    /* eslint-enable no-console */

    const templates = bundles.default.templates || bundles.legacy.templates;
    const stats = bundles.modern.stats && bundles.legacy.stats ? fromEntries__default['default'](Object.entries(bundles.modern.stats).map(([lib, paths]) => [lib, bundles.legacy.stats[lib] ? [...paths, ...bundles.legacy.stats[lib]] : paths])) : bundles.default.stats;
    const {
      templateHTML,
      templateHTMLFragment,
      templateHTMLStatic
    } = templates; // Serve a blank HTML page with client scripts to load the app in the browser

    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      server.renderToString(jsx);
      const isDynamicHint = `<script>window.isDynamic = true;</script>`;
      const dynamicBundles = webpack.getBundles(stats, modules);
      const dynamicBundleScripts = dynamicBundles.map(bundle => {
        if (bundle.publicPath.includes('/modern/')) return differentialBundles ? `<script type="module" src="${bundle.publicPath}"></script>` : null;
        return `<script nomodule src="${bundle.publicPath}"></script>`;
      }).filter(f => f).join('');
      const responseHtmlDynamic = templateHTML.replace('{{TITLE}}', '').replace('{{SEO_CRITICAL_METADATA}}', '').replace('{{CRITICAL_CSS}}', '').replace('{{APP}}', '').replace('{{LOADABLE_CHUNKS}}', dynamicBundleScripts).replace('{{REDUX_DATA}}', isDynamicHint);
      response.setHeader('Surrogate-Control', 'max-age=3600');
      response.status(status); //.send(responseHtmlDynamic);

      responseHandler(request, response, responseHtmlDynamic);
    } // Render the JSX server side and send response as per access method options


    if (!accessMethod.DYNAMIC) {
      store.runSaga(App.rootSaga(withSagas)).toPromise().then(() => {
        const sheet = new styledComponents.ServerStyleSheet();
        const html = server.renderToString(sheet.collectStyles(jsx));
        const helmet = Helmet__default['default'].renderStatic();
        Helmet__default['default'].rewind();
        let title = helmet.title.toString();
        const metadata = helmet.meta.toString();

        if (context.status === 404) {
          status = 404;
          title = '<title>404 page not found</title>';
        }

        if (context.url) {
          return response.redirect(302, context.url);
        }

        const reduxState = store.getState();
        const styleTags = sheet.getStyleTags();
        const bundles = webpack.getBundles(stats, modules);
        const bundleScripts = bundles.map(bundle => {
          if (bundle.publicPath.includes('/modern/')) return differentialBundles ? `<script type="module" src="${bundle.publicPath}"></script>` : null;
          return `<script nomodule src="${bundle.publicPath}"></script>`;
        }).filter(f => f).join('');
        let serialisedReduxData = '';

        if (context.status !== 404) {
          if (accessMethod.REDUX) {
            serialisedReduxData = serialize__default['default'](reduxState, {
              ignoreFunction: true
            });
            addStandardHeaders(reduxState, response, packagejson, {
              allowedGroups,
              globalGroups
            });
            response.status(status); //.json(serialisedReduxData);

            responseHandler(request, response, serialisedReduxData, 'json');
            return true;
          }

          if (!disableSsrRedux) {
            serialisedReduxData = serialize__default['default'](reduxState, {
              ignoreFunction: true
            });
            serialisedReduxData = `<script>window.REDUX_DATA = ${serialisedReduxData}</script>`;
          }
        }

        if (context.status === 404) {
          accessMethod.STATIC = AccessMethods.STATIC;
        } // Responses


        let responseHTML = ''; // Static page served as a fragment

        if (accessMethod.FRAGMENT && accessMethod.STATIC) {
          addStandardHeaders(reduxState, response, packagejson, {
            allowedGroups,
            globalGroups
          });
          responseHTML = minifyCssString__default['default'](styleTags) + html;
        } // Page fragment served with client scripts and redux data that hydrate the app client side


        if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTMLFragment.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString__default['default'](styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleScripts).replace('{{REDUX_DATA}}', serialisedReduxData);
        } // Full HTML page served statically


        if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = templateHTMLStatic.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString__default['default'](styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', '');
        } // Full HTML page served with client scripts and redux data that hydrate the app client side


        if (!accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTML.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', styleTags).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleScripts).replace('{{REDUX_DATA}}', serialisedReduxData);
        }

        addStandardHeaders(reduxState, response, packagejson, {
          allowedGroups,
          globalGroups
        });

        try {
          response.status(status); //.send(responseHTML);

          responseHandler(request, response, responseHTML);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err.message);
        }
      }).catch(err => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.

        /* eslint-disable no-console */
        console.log(err);
        /* eslint-enable no-console */

        response.status(500);
        responseHandler(request, response, `Error occurred: <br />${err.stack} <br />${JSON.stringify(err)}`); // .send(
        //   `Error occurred: <br />${err.stack} <br />${JSON.stringify(err)}`
        // );
      });
      server.renderToString(jsx);
      store.close();
    }
  });
};

const app = express__default['default']();

const start = (ReactApp, config, ServerFeatures) => {
  app.disable('x-powered-by'); // Output some information about the used build/startup configuration

  DisplayStartupConfiguration(config); // Set-up local proxy for images from cms, to save doing rewrites and extra code

  ServerFeatures(app);
  reverseProxies(app, config.reverseProxyPaths);
  webApp(app, ReactApp, config);
  app.use('/static', express__default['default'].static('dist/static', {
    maxage: '31557600h'
  }));
  app.on('ready', async () => {
    // Configure DNS to make life easier
    //await ConfigureLocalDNS();
    Loadable__default['default'].preloadAll().then(() => {
      var server = app.listen(3001, () => {
        console.info(`HTTP server is listening @ port 3001`);
        setTimeout(function () {
          app.emit('app_started');
        }, 500);
      });
      app.on('stop', () => {
        server.close(function () {
          console.info('GoodBye :(');
        });
      });
    });
  });
};

var internalServer = {
  app,
  apiProxy,
  start
};

exports.ReactApp = App.AppRoot;
exports.default = internalServer;
//# sourceMappingURL=contensis-react-base.js.map
