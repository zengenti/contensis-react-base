'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('isomorphic-fetch');
var express = require('express');
var httpProxy = require('http-proxy');
var fs = require('fs');
var path = require('path');
var appRootPath = require('app-root-path');
var React = require('react');
var server$1 = require('react-dom/server');
var reactRouterDom = require('react-router-dom');
var reactRedux = require('react-redux');
var reactRouterConfig = require('react-router-config');
var reactHelmet = require('react-helmet');
var styled = require('styled-components');
var serialize = require('serialize-javascript');
var minifyCssString = require('minify-css-string');
var mapJson = require('jsonpath-mapper');
var server = require('@loadable/server');
var version = require('./version-12e166d2.js');
var App = require('./App-9792d455.js');
var actions = require('./actions-a24bf46e.js');
var selectors = require('./selectors-0ec95076.js');
require('@redux-saga/core/effects');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
require('immer');
require('./reducers-60dafd94.js');
require('history');
require('contensis-delivery-api');
require('./version-be0c7b7a.js');
require('loglevel');
require('./login-c9f4fcfa.js');
require('./ToJs-6fdfaed6.js');
require('await-to-js');
require('js-cookie');
require('react-hot-loader');
require('query-string');
require('./RouteLoader-2d908c75.js');
require('reselect');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var httpProxy__default = /*#__PURE__*/_interopDefaultLegacy(httpProxy);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var serialize__default = /*#__PURE__*/_interopDefaultLegacy(serialize);
var minifyCssString__default = /*#__PURE__*/_interopDefaultLegacy(minifyCssString);
var mapJson__default = /*#__PURE__*/_interopDefaultLegacy(mapJson);

const servers$1 = SERVERS;
/* global SERVERS */

const projects = PROJECTS;
/* global PROJECTS */

const DisplayStartupConfiguration = config => {
  /* eslint-disable no-console */
  console.log();
  console.log(`Configured servers:
`, JSON.stringify(servers$1, null, 2));
  console.log();
  console.log(`Configured projects:
`, JSON.stringify(projects, null, 2));
  console.log();
  console.log('Reverse proxy paths: ', JSON.stringify(config.reverseProxyPaths, null, 2));
  console.log();
  /* eslint-enable no-console */
};

const servers = SERVERS;
/* global SERVERS */

const apiProxy = httpProxy__default["default"].createProxyServer();

const reverseProxies = (app, reverseProxyPaths = []) => {
  deliveryApiProxy(apiProxy, app);
  app.all(reverseProxyPaths, (req, res) => {
    const target = req.hostname.indexOf('preview-') || req.hostname.indexOf('preview.') || req.hostname === 'localhost' ? servers.previewIis || servers.iis : servers.iis;
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
    const target = servers.cms;
    console.log(`Proxying api request to ${servers.alias}`);
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

const CacheDuration = {
  200: '3600',
  404: '5',
  static: '31536000',
  // Believe it or not these two max ages are the same in runtime
  expressStatic: '31557600h' // Believe it or not these two max ages are the same in runtime

};
const getCacheDuration = (status = 200) => {
  if (status > 400) return CacheDuration[404];
  return CacheDuration[200];
};

const replaceStaticPath = (str, staticFolderPath = 'static') => str.replace(/static\//g, `${staticFolderPath}/`);

const bundleManipulationMiddleware = ({
  appRootPath,
  maxage,
  staticRoutePath
}) => (req, res, next) => {
  const filename = path__default["default"].basename(req.path);
  const modernBundle = filename.endsWith('.mjs');
  const legacyBundle = filename.endsWith('.js');

  if ((legacyBundle || modernBundle) && filename.startsWith('runtime.')) {
    const jsRuntimeLocation = path__default["default"].resolve(appRootPath, `dist/static/${modernBundle ? 'modern/js' : 'legacy/js'}/${filename}`);

    try {
      const jsRuntimeBundle = fs__default["default"].readFileSync(jsRuntimeLocation, 'utf8');
      const modifiedBundle = replaceStaticPath(jsRuntimeBundle, staticRoutePath);
      if (maxage) res.set('Cache-Control', `public, max-age=${maxage}`);
      res.type('.js').send(modifiedBundle);
      return;
    } catch (readError) {
      // eslint-disable-next-line no-console
      console.log(`Unable to find js runtime bundle at '${jsRuntimeLocation}'`, readError);
      next();
    }
  } else {
    next();
  }
};

/**
 *
 * @param { appRootPath: string; maxage: number; staticFolderPath: string, startupScriptFilename: string } args
 * @returns Response | next()
 * A middleware function to resolve /dist/static/startup.js under a supplied startupScriptFilename variable
 */

const resolveStartupMiddleware = ({
  appRootPath,
  maxage,
  staticFolderPath,
  startupScriptFilename
}) => (req, res, next) => {
  if (startupScriptFilename !== 'startup.js' && req.path === `/${startupScriptFilename}`) {
    const startupFilePath = `dist/${staticFolderPath}/startup.js`;
    const startupFileLocation = path__default["default"].resolve(appRootPath, startupFilePath);
    if (maxage) res.set('Cache-Control', `public, max-age=${maxage}`);

    try {
      res.sendFile(startupFileLocation);
    } catch (sendFileError) {
      // eslint-disable-next-line no-console
      console.log(`Unable to send file startup.js at '${startupFileLocation}'`, sendFileError);
      next();
    }
  } else {
    next();
  }
};

// Serving static assets
const staticAssets = (app, {
  appRootPath: appRootPath$1 = appRootPath.path,
  scripts = {},
  startupScriptFilename = 'startup.js',
  staticFolderPath = 'static',
  staticRoutePath = 'static',
  staticRoutePaths = []
}) => {
  app.use([`/${staticRoutePath}`, ...staticRoutePaths.map(p => `/${p}`), `/${staticFolderPath}`], bundleManipulationMiddleware({
    appRootPath: appRootPath$1,
    // these maxage values are different in config but the same in runtime,
    // this one is the true value in seconds
    maxage: CacheDuration.static,
    staticRoutePath
  }), resolveStartupMiddleware({
    appRootPath: appRootPath$1,
    maxage: CacheDuration.static,
    startupScriptFilename: scripts.startup || startupScriptFilename,
    staticFolderPath
  }), // eslint-disable-next-line import/no-named-as-default-member
  express__default["default"].static(`dist/${staticFolderPath}`, {
    // these maxage values are different in config but the same in runtime,
    // this one is somehow converted and should end up being the same as CacheDuration.static
    maxAge: CacheDuration.expressStatic
  }));
};

var stringifyAttributes = ((attributes = {}) => Object.entries(attributes).map(([key, value], idx) => `${idx !== 0 ? ' ' : ''}${key}${value ? `="${value}"` : ''}`).join(' '));

/* eslint-disable no-console */

/**
 * Web Application Response handler, sends a prepared express js response
 * with the supplied content sending in the specified manner
 * @param {response} request express js request object
 * @param {response} response express js response object
 * @param {string | object} content the content to send in the response body
 * @param {"send" | "json" | "end"} send the response function to call e.g res.send() res.json() res.end()
 */
const handleResponse = (request, response, content, send = 'send') => {
  // console.log('---', response.statusCode, '---');
  response[send](content);
};

const readFileSync = path => fs__default["default"].readFileSync(path, 'utf8');

const loadableBundleData = ({
  stats,
  templates
}, staticRoutePath, build) => {
  const bundle = {};

  try {
    bundle.stats = JSON.parse(readFileSync(stats.replace('/target', build ? `/${build}` : '')));
  } catch (ex) {
    // console.info(ex);
    bundle.stats = null;
  }

  try {
    bundle.templates = {
      templateHTML: replaceStaticPath(readFileSync(templates.html.replace('/target', build ? `/${build}` : '')), staticRoutePath),
      templateHTMLStatic: replaceStaticPath(readFileSync(templates.static.replace('/target', build ? `/${build}` : '')), staticRoutePath),
      templateHTMLFragment: replaceStaticPath(readFileSync(templates.fragment.replace('/target', build ? `/${build}` : '')), staticRoutePath)
    };
  } catch (ex) {
    // console.info(ex);
    bundle.templates = null;
  }

  return bundle;
};
const loadableChunkExtractors = () => {
  try {
    const modern = new server.ChunkExtractor({
      entrypoints: ['app'],
      namespace: 'modern',
      statsFile: path__default["default"].resolve('dist/modern/loadable-stats.json')
    });
    const legacy = new server.ChunkExtractor({
      entrypoints: ['app'],
      namespace: 'legacy',
      statsFile: path__default["default"].resolve('dist/legacy/loadable-stats.json')
    });
    const commonLoadableExtractor = {
      addChunk(chunk) {
        modern.addChunk(chunk);
        if (typeof legacy.stats.assetsByChunkName[chunk] !== 'undefined') legacy.addChunk(chunk);
      }

    };
    return {
      commonLoadableExtractor,
      modern,
      legacy
    };
  } catch (e) {
    console.info('@loadable/server ChunkExtractor not available');
  }
};
const getBundleData = (config, staticRoutePath) => {
  const bundleData = {
    default: loadableBundleData(config, staticRoutePath),
    legacy: loadableBundleData(config, staticRoutePath, 'legacy'),
    modern: loadableBundleData(config, staticRoutePath, 'modern')
  };
  if (!bundleData.default || bundleData.default === {}) bundleData.default = bundleData.legacy || bundleData.modern;
  return bundleData;
};
const getBundleTags = (loadableExtractor, scripts, staticRoutePath = 'static') => {
  let startupTag = ''; // Add the static startup script to the bundleTags

  if (scripts !== null && scripts !== void 0 && scripts.startup) startupTag = `<script ${stringifyAttributes(scripts.attributes)} src="/${staticRoutePath}/${scripts.startup}"></script>`; // Get the script tags from their respective extractor instances

  if (loadableExtractor) {
    const legacyScriptTags = loadableExtractor === null || loadableExtractor === void 0 ? void 0 : loadableExtractor.legacy.getScriptTags({
      noModule: true
    });
    const modernScriptTags = loadableExtractor === null || loadableExtractor === void 0 ? void 0 : loadableExtractor.modern.getScriptTags({
      type: 'module'
    });
    return `${startupTag}${legacyScriptTags || ''}${modernScriptTags || ''}`;
  }

  return startupTag;
};

const addStandardHeaders = (state, response, packagejson, groups) => {
  if (state) {
    try {
      console.info('About to add headers');
      const routingSurrogateKeys = selectors.getImmutableOrJS(state, ['routing', 'surrogateKeys'], '');
      const surrogateKeyHeader = ` ${packagejson.name}-app ${routingSurrogateKeys}`;
      response.header('surrogate-key', surrogateKeyHeader);
      addVarnishAuthenticationHeaders(state, response, groups);
      response.setHeader('Surrogate-Control', `max-age=${getCacheDuration(response.statusCode)}`);
    } catch (e) {
      console.info('Error Adding headers', e.message);
    }
  }
};
const addVarnishAuthenticationHeaders = (state, response, groups = {}) => {
  if (state) {
    try {
      const stateEntry = selectors.selectRouteEntry(state);
      const project = selectors.selectCurrentProject(state);
      const {
        globalGroups,
        allowedGroups
      } = groups; // console.info(globalGroups, allowedGroups);

      let allGroups = Array.from(globalGroups && globalGroups[project] || {});

      if (stateEntry && selectors.getImmutableOrJS(stateEntry, ['authentication', 'isLoginRequired']) && allowedGroups && allowedGroups[project]) {
        allGroups = [...allGroups, ...allowedGroups[project]];
      }

      response.header('x-contensis-viewer-groups', allGroups.join('|'));
    } catch (e) {
      console.info('Error adding authentication header', e);
    }
  }
};

const webApp = (app, ReactApp, config) => {
  const {
    stateType = 'immutable',
    routes,
    withReducers,
    withSagas,
    withEvents,
    packagejson,
    scripts = {},
    staticFolderPath = 'static',
    startupScriptFilename,
    allowedGroups,
    globalGroups,
    disableSsrRedux,
    handleResponses
  } = config;
  const staticRoutePath = config.staticRoutePath || staticFolderPath;
  const bundleData = getBundleData(config, staticRoutePath);
  const attributes = stringifyAttributes(scripts.attributes);
  scripts.startup = scripts.startup || startupScriptFilename;
  const responseHandler = typeof handleResponses === 'function' ? handleResponses : handleResponse;
  const versionInfo = JSON.parse(fs__default["default"].readFileSync(`dist/${staticFolderPath}/version.json`, 'utf8'));
  app.get('/*', async (request, response) => {
    const {
      url
    } = request;

    const matchedStaticRoute = () => reactRouterConfig.matchRoutes(routes.StaticRoutes, request.path);

    const isStaticRoute = () => matchedStaticRoute().length > 0;

    const staticRoute = isStaticRoute() && matchedStaticRoute()[0]; // Allow certain routes to avoid SSR

    const onlyDynamic = staticRoute && staticRoute.route.ssr === false;
    const onlySSR = staticRoute && staticRoute.route.ssrOnly === true;

    const normaliseQs = q => q && q.toLowerCase() === 'true' ? true : false; // Determine functional params from QueryString and set access methods


    const accessMethod = mapJson__default["default"](request.query, {
      DYNAMIC: ({
        dynamic
      }) => normaliseQs(dynamic) || onlyDynamic,
      REDUX: ({
        redux
      }) => normaliseQs(redux),
      FRAGMENT: ({
        fragment
      }) => normaliseQs(fragment),
      STATIC: ({
        static: value
      }) => normaliseQs(value) || onlySSR
    });
    const context = {}; // Track the current statusCode via the response object

    response.status(200); // Create a store (with a memory history) from our current url

    const store = await version.createStore(withReducers, {}, App.history({
      initialEntries: [url]
    }), stateType); // dispatch any global and non-saga related actions before calling our JSX

    const versionStatusFromHostname = App.deliveryApi.getVersionStatusFromHostname(request.hostname);
    console.info(`Request for ${request.path} hostname: ${request.hostname} versionStatus: ${versionStatusFromHostname}`);
    store.dispatch(version.setVersionStatus(request.query.versionStatus || versionStatusFromHostname));
    store.dispatch(version.setVersion(versionInfo.commitRef, versionInfo.buildNo));
    const project = App.pickProject(request.hostname, request.query);
    const groups = allowedGroups && allowedGroups[project];
    store.dispatch(actions.setCurrentProject(project, groups, request.hostname));
    const loadableExtractor = loadableChunkExtractors();
    const jsx = /*#__PURE__*/React__default["default"].createElement(server.ChunkExtractorManager, {
      extractor: loadableExtractor === null || loadableExtractor === void 0 ? void 0 : loadableExtractor.commonLoadableExtractor
    }, /*#__PURE__*/React__default["default"].createElement(reactRedux.Provider, {
      store: store
    }, /*#__PURE__*/React__default["default"].createElement(reactRouterDom.StaticRouter, {
      context: context,
      location: url
    }, /*#__PURE__*/React__default["default"].createElement(ReactApp, {
      routes: routes,
      withEvents: withEvents
    }))));
    const {
      templateHTML,
      templateHTMLFragment,
      templateHTMLStatic
    } = bundleData.default.templates || bundleData.legacy.templates || {}; // Serve a blank HTML page with client scripts to load the app in the browser

    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      server$1.renderToString(jsx); // Dynamic page render has only the necessary bundles to start up the app
      // and does not include any react-loadable code-split bundles

      const bundleTags = getBundleTags(loadableExtractor, scripts);
      const isDynamicHint = `<script ${attributes}>window.isDynamic = true;</script>`;
      const responseHtmlDynamic = templateHTML.replace('{{TITLE}}', '').replace('{{SEO_CRITICAL_METADATA}}', '').replace('{{CRITICAL_CSS}}', '').replace('{{APP}}', '').replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', isDynamicHint); // Dynamic pages always return a 200 so we can run
      // the app and serve up all errors inside the client

      response.setHeader('Surrogate-Control', `max-age=${getCacheDuration(200)}`);
      responseHandler(request, response, responseHtmlDynamic);
    } // Render the JSX server side and send response as per access method options


    if (!accessMethod.DYNAMIC) {
      store.runSaga(App.rootSaga(withSagas)).toPromise().then(() => {
        const sheet = new styled.ServerStyleSheet();
        const html = server$1.renderToString(sheet.collectStyles(jsx));
        const helmet = reactHelmet.Helmet.renderStatic();
        reactHelmet.Helmet.rewind();
        const htmlAttributes = helmet.htmlAttributes.toString();
        let title = helmet.title.toString();
        const metadata = helmet.meta.toString().concat(helmet.link.toString());

        if (context.url) {
          return response.redirect(302, context.url);
        }

        const reduxState = store.getState();
        const styleTags = sheet.getStyleTags(); // After running rootSaga there should be an additional react-loadable
        // code-split bundles for any page components as well as core app bundles

        const bundleTags = getBundleTags(loadableExtractor, scripts);
        let serialisedReduxData = serialize__default["default"](reduxState);

        if (context.statusCode !== 404) {
          // For a request that returns a redux state object as a response
          if (accessMethod.REDUX) {
            addStandardHeaders(reduxState, response, packagejson, {
              allowedGroups,
              globalGroups
            });
            responseHandler(request, response, serialisedReduxData, 'json');
            return true;
          }

          if (!disableSsrRedux) {
            serialisedReduxData = `<script ${attributes}>window.REDUX_DATA = ${serialisedReduxData}</script>`;
          }
        }

        if ((context.statusCode || 200) > 400) {
          accessMethod.STATIC = true;
        } // Responses


        let responseHTML = '';
        if (context.statusCode === 404) title = '<title>404 page not found</title>'; // Static page served as a fragment

        if (accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = minifyCssString__default["default"](styleTags) + html;
        } // Page fragment served with client scripts and redux data that hydrate the app client side


        if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTMLFragment.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString__default["default"](styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', serialisedReduxData);
        } // Full HTML page served statically


        if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = templateHTMLStatic.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString__default["default"](styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', '');
        } // Full HTML page served with client scripts and redux data that hydrate the app client side


        if (!accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTML.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', styleTags).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', serialisedReduxData);
        } // Set response.status from React StaticRouter


        if (typeof context.statusCode === 'number') response.status(context.statusCode);
        addStandardHeaders(reduxState, response, packagejson, {
          allowedGroups,
          globalGroups
        });

        try {
          // If react-helmet htmlAttributes are being used,
          // replace the html tag with those attributes sepcified
          // e.g. (lang, dir etc.)
          if (htmlAttributes) {
            responseHTML = responseHTML.replace(/<html?.+?>/, `<html ${htmlAttributes}>`);
          }

          responseHandler(request, response, responseHTML);
        } catch (err) {
          console.info(err.message);
        }
      }).catch(err => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
        console.info(err);
        response.status(500);
        responseHandler(request, response, `Error occurred: <br />${err.stack} <br />${JSON.stringify(err)}`);
      });
      server$1.renderToString(jsx);
      store.close();
    }
  });
};

const app = express__default["default"]();

const start = (ReactApp, config, ServerFeatures) => {
  global.PACKAGE_JSON = config.packagejson;
  global.DISABLE_SSR_REDUX = config.disableSsrRedux;
  global.PROXY_DELIVERY_API = config.proxyDeliveryApi;
  global.REVERSE_PROXY_PATHS = Object(config.reverseProxyPaths);
  app.disable('x-powered-by'); // Output some information about the used build/startup configuration

  DisplayStartupConfiguration(config);
  ServerFeatures(app); // Set-up local proxy for images from cms, and delivery api requests
  // to save doing rewrites and extra code

  reverseProxies(app, config.reverseProxyPaths);
  staticAssets(app, config);
  webApp(app, ReactApp, config);
  app.on('ready', async () => {
    // Configure DNS to make life easier
    // await ConfigureLocalDNS();
    const server = app.listen(3001, () => {
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
};

var internalServer = {
  app,
  apiProxy,
  start
};

exports.ReactApp = App.AppRoot;
exports["default"] = internalServer;
//# sourceMappingURL=contensis-react-base.js.map
