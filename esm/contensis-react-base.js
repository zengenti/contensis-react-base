import 'isomorphic-fetch';
import express from 'express';
import Loadable from 'react-loadable';
import httpProxy from 'http-proxy';
import fs from 'fs';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { getBundles } from 'react-loadable/webpack';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import minifyCssString from 'minify-css-string';
import { fromJS } from 'immutable';
import fromEntries from 'fromentries';
import 'history';
import { c as createStore, h as history, d as deliveryApi, p as pickProject, r as rootSaga } from './App-231c3bb8.js';
export { A as ReactApp } from './App-231c3bb8.js';
import 'contensis-delivery-api';
import { s as setCurrentProject, a as selectRouteEntry, b as selectCurrentProject } from './routing-8265aea1.js';
import 'redux';
import 'redux-immutable';
import 'redux-thunk';
import 'redux-saga';
import { s as setVersionStatus, a as setVersion } from './version-9c4c6e0e.js';
import './login-59d83e30.js';
import 'query-string';
import 'redux-saga/effects';
import 'loglevel';
import './ToJs-1c73b10a.js';
import 'contensis-management-api';
import 'jsonpath-mapper';
import 'await-to-js';
import 'js-cookie';
import { matchRoutes } from 'react-router-config';
import 'react-hot-loader';
import 'prop-types';
import './RouteLoader-b1969ecd.js';

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

const path = require('path');

const moduleAlias = require('module-alias'); // The module alias code fixes an issue with server side rendered components
// from an ecternal library using styled components


moduleAlias.addAlias('styled-components', path.join(__dirname, '../../styled-components')); // const moduleBundles = fs.readdirSync('./dist/static/modern/js', 'utf8');
// const coreModules = moduleBundles.filter(
//   m =>
//     m.startsWith('app.') || m.startsWith('vendor.') || m.startsWith('runtime.')
// );

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
      const stateEntry = selectRouteEntry(state);
      const project = selectCurrentProject(state);
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

const readFileSync = path => fs.readFileSync(path, 'utf8');

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
  const versionInfo = JSON.parse(fs.readFileSync(versionData, 'utf8'));
  const responseHandler = typeof handleResponses === 'function' ? handleResponses : handleResponse;
  app.get('/*', (request, response, next) => {
    if (request.originalUrl.startsWith('/static/')) return next();
    const {
      url
    } = request;

    const matchedStaticRoute = () => matchRoutes(routes.StaticRoutes, request.path);

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

    const store = createStore(withReducers, fromJS({}), history({
      initialEntries: [url]
    })); //const store = createStore(withReducers);
    // dispatch any global and non-saga related actions before calling our JSX

    const versionStatusFromHostname = deliveryApi.getVersionStatusFromHostname(request.hostname);
    store.dispatch(setVersionStatus(request.query.versionStatus || versionStatusFromHostname));
    store.dispatch(setVersion(versionInfo.commitRef, versionInfo.buildNo));
    const project = pickProject(request.hostname, request.query);
    const groups = allowedGroups && allowedGroups[project];
    store.dispatch(setCurrentProject(project, groups));
    const modules = [];
    const jsx = React.createElement(Loadable.Capture, {
      report: moduleName => modules.push(moduleName)
    }, React.createElement(Provider, {
      store: store
    }, React.createElement(StaticRouter, {
      context: context,
      location: url
    }, React.createElement(ReactApp, {
      routes: routes,
      withEvents: withEvents
    }))));
    /* eslint-disable no-console */

    console.log(`Request for ${request.path} hostname: ${request.hostname} versionStatus: ${versionStatusFromHostname}`);
    /* eslint-enable no-console */

    const templates = bundles.default.templates || bundles.legacy.templates;
    const stats = bundles.modern.stats && bundles.legacy.stats ? fromEntries(Object.entries(bundles.modern.stats).map(([lib, paths]) => [lib, bundles.legacy.stats[lib] ? [...paths, ...bundles.legacy.stats[lib]] : paths])) : bundles.default.stats;
    const {
      templateHTML,
      templateHTMLFragment,
      templateHTMLStatic
    } = templates; // Serve a blank HTML page with client scripts to load the app in the browser

    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      renderToString(jsx);
      const isDynamicHint = `<script>window.isDynamic = true;</script>`;
      const dynamicBundles = getBundles(stats, modules);
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
      store.runSaga(rootSaga(withSagas)).toPromise().then(() => {
        const sheet = new ServerStyleSheet();
        const html = renderToString(sheet.collectStyles(jsx));
        const helmet = Helmet.renderStatic();
        Helmet.rewind();
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
        const bundles = getBundles(stats, modules);
        const bundleScripts = bundles.map(bundle => {
          if (bundle.publicPath.includes('/modern/')) return differentialBundles ? `<script type="module" src="${bundle.publicPath}"></script>` : null;
          return `<script nomodule src="${bundle.publicPath}"></script>`;
        }).filter(f => f).join('');
        let serialisedReduxData = '';

        if (context.status !== 404) {
          if (accessMethod.REDUX) {
            serialisedReduxData = serialize(reduxState, {
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
            serialisedReduxData = serialize(reduxState, {
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
          responseHTML = minifyCssString(styleTags) + html;
        } // Page fragment served with client scripts and redux data that hydrate the app client side


        if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTMLFragment.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString(styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleScripts).replace('{{REDUX_DATA}}', serialisedReduxData);
        } // Full HTML page served statically


        if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = templateHTMLStatic.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString(styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', '');
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
      renderToString(jsx);
      store.close();
    }
  });
};

const app = express();

const start = (ReactApp, config, ServerFeatures) => {
  app.disable('x-powered-by'); // Output some information about the used build/startup configuration

  DisplayStartupConfiguration(config); // Set-up local proxy for images from cms, to save doing rewrites and extra code

  ServerFeatures(app);
  reverseProxies(app, config.reverseProxyPaths);
  webApp(app, ReactApp, config);
  app.use('/static', express.static('dist/static', {
    maxage: '31557600h'
  }));
  app.on('ready', async () => {
    // Configure DNS to make life easier
    //await ConfigureLocalDNS();
    Loadable.preloadAll().then(() => {
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

export default internalServer;
//# sourceMappingURL=contensis-react-base.js.map
