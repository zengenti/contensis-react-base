import 'isomorphic-fetch';
import express from 'express';
import Loadable from 'react-loadable';
import httpProxy from 'http-proxy';
import fs from 'fs';
import path from 'path';
import { path as path$1 } from 'app-root-path';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';
import { getBundles } from 'react-loadable/webpack';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import minifyCssString from 'minify-css-string';
import mapJson from 'jsonpath-mapper';
import 'redux';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors';
import 'immer';
import { c as createStore, s as setVersionStatus, a as setVersion } from './version-71bee707.js';
import { s as setCurrentProject } from './actions-ecbd2cba.js';
import './reducers-d6c0edb1.js';
import 'history';
import { h as history, d as deliveryApi, p as pickProject, r as rootSaga } from './App-774c81ac.js';
export { A as ReactApp } from './App-774c81ac.js';
import '@redux-saga/core/effects';
import 'contensis-delivery-api';
import { s as selectRouteEntry, a as selectCurrentProject } from './selectors-65c6026e.js';
import './version-c35979ba.js';
import 'query-string';
import 'loglevel';
import './ToJs-d558fbc4.js';
import './login-c070eb03.js';
import 'await-to-js';
import 'js-cookie';
import 'react-hot-loader';
import './RouteLoader-d5429246.js';

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

const apiProxy = httpProxy.createProxyServer();

const reverseProxies = (app, reverseProxyPaths = []) => {
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
  const filename = path.basename(req.path);
  const modernBundle = filename.endsWith('.mjs');
  const legacyBundle = filename.endsWith('.js');

  if ((legacyBundle || modernBundle) && filename.startsWith('runtime.')) {
    const jsRuntimeLocation = path.resolve(appRootPath, `dist/static/${modernBundle ? 'modern/js' : 'legacy/js'}/${filename}`);

    try {
      const jsRuntimeBundle = fs.readFileSync(jsRuntimeLocation, 'utf8');
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
    const startupFileLocation = path.resolve(appRootPath, startupFilePath);
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
  appRootPath = path$1,
  scripts = {},
  startupScriptFilename = 'startup.js',
  staticFolderPath = 'static',
  staticRoutePath = 'static',
  staticRoutePaths = []
}) => {
  app.use([`/${staticRoutePath}`, ...staticRoutePaths.map(p => `/${p}`), `/${staticFolderPath}`], bundleManipulationMiddleware({
    appRootPath,
    // these maxage values are different in config but the same in runtime,
    // this one is the true value in seconds
    maxage: CacheDuration.static,
    staticRoutePath
  }), resolveStartupMiddleware({
    appRootPath,
    maxage: CacheDuration.static,
    startupScriptFilename: scripts.startup || startupScriptFilename,
    staticFolderPath
  }), // eslint-disable-next-line import/no-named-as-default-member
  express.static(`dist/${staticFolderPath}`, {
    // these maxage values are different in config but the same in runtime,
    // this one is somehow converted and should end up being the same as CacheDuration.static
    maxAge: CacheDuration.expressStatic
  }));
};

/*! fromentries. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var fromentries = function fromEntries (iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj
  }, {})
};

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

var stringifyAttributes = ((attributes = {}) => Object.entries(attributes).map(([key, value], idx) => `${idx !== 0 ? ' ' : ''}${key}${value ? `="${value}"` : ''}`).join(' '));

const addStandardHeaders = (state, response, packagejson, groups) => {
  if (state) {
    try {
      var _state$routing;

      console.info('About to add headers');
      const routingSurrogateKeys = (state === null || state === void 0 ? void 0 : (_state$routing = state.routing) === null || _state$routing === void 0 ? void 0 : _state$routing.surrogateKeys) || '';
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
      var _stateEntry$authentic;

      const stateEntry = selectRouteEntry(state);
      const project = selectCurrentProject(state);
      const {
        globalGroups,
        allowedGroups
      } = groups; // console.info(globalGroups, allowedGroups);

      let allGroups = Array.from(globalGroups && globalGroups[project] || {});

      if (stateEntry !== null && stateEntry !== void 0 && (_stateEntry$authentic = stateEntry.authentication) !== null && _stateEntry$authentic !== void 0 && _stateEntry$authentic.isLoginRequired && allowedGroups !== null && allowedGroups !== void 0 && allowedGroups[project]) {
        allGroups = [...allGroups, ...allowedGroups[project]];
      }

      response.header('x-contensis-viewer-groups', allGroups.join('|'));
    } catch (e) {
      console.info('Error adding authentication header', e);
    }
  }
};

const readFileSync = path => fs.readFileSync(path, 'utf8');

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
    differentialBundles,
    allowedGroups,
    globalGroups,
    disableSsrRedux,
    handleResponses
  } = config;
  const staticRoutePath = config.staticRoutePath || staticFolderPath;
  const bundleData = {
    default: loadableBundleData(config, staticRoutePath),
    legacy: loadableBundleData(config, staticRoutePath, 'legacy'),
    modern: loadableBundleData(config, staticRoutePath, 'modern')
  };
  if (!bundleData.default || bundleData.default === {}) bundleData.default = bundleData.legacy || bundleData.modern;
  const attributes = stringifyAttributes(scripts.attributes);
  scripts.startup = scripts.startup || startupScriptFilename;
  const responseHandler = typeof handleResponses === 'function' ? handleResponses : handleResponse;
  const versionInfo = JSON.parse(fs.readFileSync(`dist/${staticFolderPath}/version.json`, 'utf8'));
  app.get('/*', async (request, response) => {
    const {
      url
    } = request;

    const matchedStaticRoute = () => matchRoutes(routes.StaticRoutes, request.path);

    const isStaticRoute = () => matchedStaticRoute().length > 0;

    const staticRoute = isStaticRoute() && matchedStaticRoute()[0]; // Allow certain routes to avoid SSR

    const onlyDynamic = staticRoute && staticRoute.route.ssr === false;
    const onlySSR = staticRoute && staticRoute.route.ssrOnly === true;

    const normaliseQs = q => q && q.toLowerCase() === 'true' ? true : false; // Determine functional params from QueryString and set access methods


    const accessMethod = mapJson(request.query, {
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

    const store = await createStore(withReducers, {}, history({
      initialEntries: [url]
    }), stateType); // dispatch any global and non-saga related actions before calling our JSX

    const versionStatusFromHostname = deliveryApi.getVersionStatusFromHostname(request.hostname);
    console.info(`Request for ${request.path} hostname: ${request.hostname} versionStatus: ${versionStatusFromHostname}`);
    store.dispatch(setVersionStatus(request.query.versionStatus || versionStatusFromHostname));
    store.dispatch(setVersion(versionInfo.commitRef, versionInfo.buildNo));
    const project = pickProject(request.hostname, request.query);
    const groups = allowedGroups && allowedGroups[project];
    store.dispatch(setCurrentProject(project, groups, request.hostname));
    const modules = [];
    const jsx = /*#__PURE__*/React.createElement(Loadable.Capture, {
      report: moduleName => modules.push(moduleName)
    }, /*#__PURE__*/React.createElement(Provider, {
      store: store
    }, /*#__PURE__*/React.createElement(StaticRouter, {
      context: context,
      location: url
    }, /*#__PURE__*/React.createElement(ReactApp, {
      routes: routes,
      withEvents: withEvents
    }))));

    const buildBundleTags = bundles => {
      // Take the bundles returned from Loadable.Capture
      const bundleTags = bundles.filter(b => b).map(bundle => {
        if (bundle.publicPath.includes('/modern/')) return differentialBundles ? `<script ${attributes} type="module" src="${replaceStaticPath(bundle.publicPath, staticRoutePath)}"></script>` : null;
        return `<script ${attributes} nomodule src="${replaceStaticPath(bundle.publicPath, staticRoutePath)}"></script>`;
      }).filter(f => f); // Add the static startup script to the bundleTags

      if (scripts.startup) bundleTags.push(`<script ${attributes} src="/${staticRoutePath}/${scripts.startup}"></script>`);
      return bundleTags;
    };

    const templates = bundleData.default.templates || bundleData.legacy.templates;
    const stats = bundleData.modern.stats && bundleData.legacy.stats ? fromentries(Object.entries(bundleData.modern.stats).map(([lib, paths]) => {
      var _bundleData$legacy, _bundleData$legacy$st;

      return [lib, bundleData !== null && bundleData !== void 0 && (_bundleData$legacy = bundleData.legacy) !== null && _bundleData$legacy !== void 0 && (_bundleData$legacy$st = _bundleData$legacy.stats) !== null && _bundleData$legacy$st !== void 0 && _bundleData$legacy$st[lib] ? [...paths, ...bundleData.legacy.stats[lib]] : paths];
    })) : bundleData.default.stats;
    const {
      templateHTML,
      templateHTMLFragment,
      templateHTMLStatic
    } = templates || {}; // Serve a blank HTML page with client scripts to load the app in the browser

    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      renderToString(jsx); // Dynamic page render has only the necessary bundles to start up the app
      // and does not include any react-loadable code-split bundles

      const loadableBundles = getBundles(stats, modules);
      const bundleTags = buildBundleTags(loadableBundles).join('');
      const isDynamicHint = `<script ${attributes}>window.isDynamic = true;</script>`;
      const responseHtmlDynamic = templateHTML.replace('{{TITLE}}', '').replace('{{SEO_CRITICAL_METADATA}}', '').replace('{{CRITICAL_CSS}}', '').replace('{{APP}}', '').replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', isDynamicHint); // Dynamic pages always return a 200 so we can run
      // the app and serve up all errors inside the client

      response.setHeader('Surrogate-Control', `max-age=${getCacheDuration(200)}`);
      responseHandler(request, response, responseHtmlDynamic);
    } // Render the JSX server side and send response as per access method options


    if (!accessMethod.DYNAMIC) {
      store.runSaga(rootSaga(withSagas)).toPromise().then(() => {
        const sheet = new ServerStyleSheet();
        const html = renderToString(sheet.collectStyles(jsx));
        const helmet = Helmet.renderStatic();
        Helmet.rewind();
        const htmlAttributes = helmet.htmlAttributes.toString();
        let title = helmet.title.toString();
        const metadata = helmet.meta.toString();

        if (context.url) {
          return response.redirect(302, context.url);
        }

        const reduxState = store.getState();
        const styleTags = sheet.getStyleTags(); // After running rootSaga there should be an additional react-loadable
        // code-split bundle for a page component as well as core app bundles

        const loadableBundles = getBundles(stats, modules);
        const bundleTags = buildBundleTags(loadableBundles).join('');
        let serialisedReduxData = '';

        if (context.statusCode !== 404) {
          // For a request that returns a redux state object as a response
          if (accessMethod.REDUX) {
            serialisedReduxData = serialize(reduxState, {
              ignoreFunction: true
            });
            addStandardHeaders(reduxState, response, packagejson, {
              allowedGroups,
              globalGroups
            });
            responseHandler(request, response, serialisedReduxData, 'json');
            return true;
          }

          if (!disableSsrRedux) {
            serialisedReduxData = serialize(reduxState, {
              ignoreFunction: true
            });
            serialisedReduxData = `<script ${attributes}>window.REDUX_DATA = ${serialisedReduxData}</script>`;
          }
        }

        if ((context.statusCode || 200) > 400) {
          accessMethod.STATIC = true;
        } // Responses


        let responseHTML = '';
        if (context.statusCode === 404) title = '<title>404 page not found</title>'; // Static page served as a fragment

        if (accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = minifyCssString(styleTags) + html;
        } // Page fragment served with client scripts and redux data that hydrate the app client side


        if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTMLFragment.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString(styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', serialisedReduxData);
        } // Full HTML page served statically


        if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = templateHTMLStatic.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString(styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', '');
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
      renderToString(jsx);
      store.close();
    }
  });
};

const app = express();

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
    Loadable.preloadAll().then(() => {
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
  });
};

var internalServer = {
  app,
  apiProxy,
  start
};

export default internalServer;
//# sourceMappingURL=contensis-react-base.js.map
