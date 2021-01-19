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
require('history');
var App = require('./App-9c96696d.js');
require('contensis-delivery-api');
var routing = require('./routing-6197a03e.js');
require('redux');
require('redux-immutable');
require('redux-thunk');
require('redux-saga');
var version = require('./version-7fdcc2c0.js');
require('./login-359afcb0.js');
require('query-string');
require('@redux-saga/core/effects');
require('loglevel');
require('./ToJs-8f6b21c9.js');
require('contensis-management-api');
var mapJson = require('jsonpath-mapper');
require('await-to-js');
require('js-cookie');
var reactRouterConfig = require('react-router-config');
require('react-hot-loader');
require('prop-types');
require('./RouteLoader-72de4da1.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var Loadable__default = /*#__PURE__*/_interopDefaultLegacy(Loadable);
var httpProxy__default = /*#__PURE__*/_interopDefaultLegacy(httpProxy);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Helmet__default = /*#__PURE__*/_interopDefaultLegacy(Helmet);
var serialize__default = /*#__PURE__*/_interopDefaultLegacy(serialize);
var minifyCssString__default = /*#__PURE__*/_interopDefaultLegacy(minifyCssString);
var mapJson__default = /*#__PURE__*/_interopDefaultLegacy(mapJson);

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

/*! fromentries. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var fromentries = function fromEntries (iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj
  }, {})
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
    /* eslint-enable no-console */

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
      // eslint-disable-next-line no-console
      console.log('Error adding authentication header', e);
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
    staticFolderPath = 'static',
    startupScriptFilename,
    differentialBundles,
    allowedGroups,
    globalGroups,
    disableSsrRedux,
    handleResponses
  } = config;
  const bundleData = {
    default: loadBundleData(config),
    legacy: loadBundleData(config, 'legacy'),
    modern: loadBundleData(config, 'modern')
  };
  if (!bundleData.default || bundleData.default === {}) bundleData.default = bundleData.legacy || bundleData.modern;
  const versionInfo = JSON.parse(fs__default['default'].readFileSync(`dist/${staticFolderPath}/version.json`, 'utf8'));
  const responseHandler = typeof handleResponses === 'function' ? handleResponses : handleResponse;
  app.get('/*', (request, response, next) => {
    if (request.originalUrl.startsWith(`/${staticFolderPath}/`)) return next();
    const {
      url
    } = request;

    const matchedStaticRoute = () => reactRouterConfig.matchRoutes(routes.StaticRoutes, request.path);

    const isStaticRoute = () => matchedStaticRoute().length > 0;

    const staticRoute = isStaticRoute() && matchedStaticRoute()[0]; // Allow certain routes to avoid SSR

    const onlyDynamic = staticRoute && staticRoute.route.ssr === false;

    const normaliseQs = q => q && q.toLowerCase() === 'true' ? true : false; // Determine functional params from QueryString and set access methods


    const accessMethod = mapJson__default['default'](request.query, {
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
      }) => normaliseQs(value)
    });
    const context = {};
    let status = 200; // Create a store (with a memory history) from our current url

    const store = App.createStore(withReducers, immutable.fromJS({}), App.history({
      initialEntries: [url]
    })); // dispatch any global and non-saga related actions before calling our JSX

    const versionStatusFromHostname = App.deliveryApi.getVersionStatusFromHostname(request.hostname); // eslint-disable-next-line no-console

    console.log(`Request for ${request.path} hostname: ${request.hostname} versionStatus: ${versionStatusFromHostname}`);
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

    const buildBundleTags = bundles => {
      // Take the bundles returned from Loadable.Capture
      const bundleTags = bundles.map(bundle => {
        if (bundle.publicPath.includes('/modern/')) return differentialBundles ? `<script type="module" src="${bundle.publicPath}"></script>` : null;
        return `<script nomodule src="${bundle.publicPath}"></script>`;
      }).filter(f => f); // Add the static startup script to the bundleTags

      startupScriptFilename && bundleTags.push(`<script src="/${staticFolderPath}/${startupScriptFilename}"></script>`);
      return bundleTags;
    };

    const templates = bundleData.default.templates || bundleData.legacy.templates;
    const stats = bundleData.modern.stats && bundleData.legacy.stats ? fromentries(Object.entries(bundleData.modern.stats).map(([lib, paths]) => [lib, bundleData.legacy.stats[lib] ? [...paths, ...bundleData.legacy.stats[lib]] : paths])) : bundleData.default.stats;
    const {
      templateHTML,
      templateHTMLFragment,
      templateHTMLStatic
    } = templates; // Serve a blank HTML page with client scripts to load the app in the browser

    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      server.renderToString(jsx); // Dynamic page render has only the necessary bundles to start up the app
      // and does not include any react-loadable code-split bundles

      const loadableBundles = webpack.getBundles(stats, modules);
      const bundleTags = buildBundleTags(loadableBundles).join('');
      const isDynamicHint = `<script>window.isDynamic = true;</script>`;
      const responseHtmlDynamic = templateHTML.replace('{{TITLE}}', '').replace('{{SEO_CRITICAL_METADATA}}', '').replace('{{CRITICAL_CSS}}', '').replace('{{APP}}', '').replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', isDynamicHint);
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
        const htmlAttributes = helmet.htmlAttributes.toString();
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
        const styleTags = sheet.getStyleTags(); // After running rootSaga there should be an additional react-loadable
        // code-split bundle for a page component as well as core app bundles

        const loadableBundles = webpack.getBundles(stats, modules);
        const bundleTags = buildBundleTags(loadableBundles).join('');
        let serialisedReduxData = '';

        if (context.status !== 404) {
          // For a request that returns a redux state object as a response
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
          accessMethod.STATIC = true;
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
          responseHTML = templateHTMLFragment.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString__default['default'](styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', serialisedReduxData);
        } // Full HTML page served statically


        if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = templateHTMLStatic.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString__default['default'](styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', '');
        } // Full HTML page served with client scripts and redux data that hydrate the app client side


        if (!accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTML.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', styleTags).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', serialisedReduxData);
        }

        addStandardHeaders(reduxState, response, packagejson, {
          allowedGroups,
          globalGroups
        });

        try {
          // If react-helmet htmlAttributes are being used, replace the html tag with those attributes sepcified e.g (lang, dir etc.)
          if (htmlAttributes) {
            responseHTML = responseHTML.replace(/<html?.+?>/, `<html ${htmlAttributes}>`);
          }

          response.status(status); //.send(responseHTML);

          responseHandler(request, response, responseHTML);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err.message);
        }
      }).catch(err => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
        // eslint-disable-next-line no-console
        console.log(err);
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
  const {
    staticFolderPath = 'static'
  } = config;
  app.disable('x-powered-by'); // Output some information about the used build/startup configuration

  DisplayStartupConfiguration(config); // Set-up local proxy for images from cms, to save doing rewrites and extra code

  ServerFeatures(app);
  reverseProxies(app, config.reverseProxyPaths);
  webApp(app, ReactApp, config);
  app.use(`/${staticFolderPath}`, express__default['default'].static(`dist/${staticFolderPath}`, {
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
