import fs from 'fs';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Loadable from 'react-loadable';
import { renderToString } from 'react-dom/server';
import { getBundles } from 'react-loadable/webpack';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import minifyCssString from 'minify-css-string';
import { fromJS } from 'immutable';
import fromEntries from 'fromentries';

import { history } from '~/core/redux/history';

import handleResponse from '../util/handleResponse';
import { hashKeys } from '../util/cacheHashing';

import pickProject from '~/core/util/pickProject';
import { GetDeliveryApiStatusFromHostname } from '~/core/util/ContensisDeliveryApi';

import { setCurrentProject } from '~/core/redux/actions/routing';
import { setVersion, setVersionStatus } from '~/core/redux/actions/version';

import {
  selectCurrentProject,
  selectCurrentTreeID,
  selectEntryDepends,
  selectNodeDepends,
  selectRouteEntry,
} from '~/core/redux/selectors/routing';

import createStore from '~/core/redux/store';
import rootSaga from '~/core/redux/sagas/index.js';
import { matchRoutes } from 'react-router-config';
import mapJson from 'jsonpath-mapper';
import { replaceStaticPath } from '../util/staticPaths';
import { getCacheDuration } from '../cacheDuration.schema';

const addStandardHeaders = (state, response, packagejson, groups) => {
  if (state) {
    try {
      console.info('About to add header');
      let entryDepends = selectEntryDepends(state);
      entryDepends = Array.from(entryDepends || {});
      console.info(`entryDepends count: ${entryDepends.length}`);

      let nodeDepends = selectNodeDepends(state).toJS();
      let currentTreeId = selectCurrentTreeID(state);
      let nodeDependsKeys = nodeDepends.map(nodeKey => {
        return `${currentTreeId}_${nodeKey}`;
      });
      const allDepends = [...entryDepends, ...nodeDependsKeys];
      const allDependsHashed = hashKeys(allDepends);

      const surrogateKeyHeader =
        packagejson.name == 'os-main'
          ? ` ${packagejson.name}-app ${allDependsHashed.join(
              ' '
            )} ${allDepends.join(' ')}`
          : ` ${packagejson.name}-app ${allDependsHashed.join(' ')}`;

      response.header('surrogate-key', surrogateKeyHeader);

      console.info(`depends hashed: ${allDependsHashed.join(' ')}`);
      console.info(`depends hashed: ${allDepends.join(' ')}`);

      addVarnishAuthenticationHeaders(state, response, groups);

      response.setHeader(
        'Surrogate-Control',
        `max-age=${getCacheDuration(response.statusCode)}`
      );
    } catch (e) {
      console.info('Error Adding headers', e.message);
    }
  }
};

const addVarnishAuthenticationHeaders = (state, response, groups = {}) => {
  if (state) {
    try {
      const stateEntry = selectRouteEntry(state);
      const project = selectCurrentProject(state);
      const { globalGroups, allowedGroups } = groups;
      // console.info(globalGroups, allowedGroups);
      let allGroups = Array.from((globalGroups && globalGroups[project]) || {});
      if (
        stateEntry &&
        stateEntry.getIn(['authentication', 'isLoginRequired']) &&
        allowedGroups &&
        allowedGroups[project]
      ) {
        allGroups = [...allGroups, ...allowedGroups[project]];
      }
      response.header('x-contensis-viewer-groups', allGroups.join('|'));
    } catch (e) {
      console.info('Error adding authentication header', e);
    }
  }
};

const readFileSync = path => fs.readFileSync(path, 'utf8');

const loadableBundleData = ({ stats, templates }, staticRoutePath, build) => {
  const bundle = {};
  try {
    bundle.stats = JSON.parse(
      readFileSync(stats.replace('/target', build ? `/${build}` : ''))
    );
  } catch (ex) {
    //console.info(ex);
    bundle.stats = null;
  }
  try {
    bundle.templates = {
      templateHTML: replaceStaticPath(
        readFileSync(
          templates.html.replace('/target', build ? `/${build}` : '')
        ),
        staticRoutePath
      ),
      templateHTMLStatic: replaceStaticPath(
        readFileSync(
          templates.static.replace('/target', build ? `/${build}` : '')
        ),
        staticRoutePath
      ),
      templateHTMLFragment: replaceStaticPath(
        readFileSync(
          templates.fragment.replace('/target', build ? `/${build}` : '')
        ),
        staticRoutePath
      ),
    };
  } catch (ex) {
    //console.info(ex);
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
    handleResponses,
  } = config;
  const staticRoutePath = config.staticRoutePath || staticFolderPath;

  const bundleData = {
    default: loadableBundleData(config, staticRoutePath),
    legacy: loadableBundleData(config, staticRoutePath, 'legacy'),
    modern: loadableBundleData(config, staticRoutePath, 'modern'),
  };
  if (!bundleData.default || bundleData.default === {})
    bundleData.default = bundleData.legacy || bundleData.modern;

  const responseHandler =
    typeof handleResponses === 'function' ? handleResponses : handleResponse;

  const versionInfo = JSON.parse(
    fs.readFileSync(`dist/${staticFolderPath}/version.json`, 'utf8')
  );

  app.get('/*', (request, response) => {
    const { url } = request;

    const matchedStaticRoute = () =>
      matchRoutes(routes.StaticRoutes, request.path);
    const isStaticRoute = () => matchedStaticRoute().length > 0;
    const staticRoute = isStaticRoute() && matchedStaticRoute()[0];

    // Allow certain routes to avoid SSR
    const onlyDynamic = staticRoute && staticRoute.route.ssr === false;

    const normaliseQs = q => (q && q.toLowerCase() === 'true' ? true : false);

    // Determine functional params from QueryString and set access methods
    const accessMethod = mapJson(request.query, {
      DYNAMIC: ({ dynamic }) => normaliseQs(dynamic) || onlyDynamic,
      REDUX: ({ redux }) => normaliseQs(redux),
      FRAGMENT: ({ fragment }) => normaliseQs(fragment),
      STATIC: ({ static: value }) => normaliseQs(value),
    });

    const context = {};
    // Track the current statusCode via the response object
    response.status(200);

    // Create a store (with a memory history) from our current url
    const store = createStore(
      withReducers,
      fromJS({}),
      history({
        initialEntries: [url],
      })
    );

    // dispatch any global and non-saga related actions before calling our JSX
    const versionStatusFromHostname = GetDeliveryApiStatusFromHostname(
      request.hostname
    );

    console.info(
      `Request for ${request.path} hostname: ${request.hostname} versionStatus: ${versionStatusFromHostname}`
    );

    store.dispatch(
      setVersionStatus(request.query.versionStatus || versionStatusFromHostname)
    );
    store.dispatch(setVersion(versionInfo.commitRef, versionInfo.buildNo));

    const project = pickProject(request.hostname, request.query);

    const groups = allowedGroups && allowedGroups[project];
    store.dispatch(setCurrentProject(project, groups));

    const modules = [];

    const jsx = (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <ReduxProvider store={store}>
          <StaticRouter context={context} location={url}>
            <ReactApp routes={routes} withEvents={withEvents} />
          </StaticRouter>
        </ReduxProvider>
      </Loadable.Capture>
    );

    const buildBundleTags = bundles => {
      // Take the bundles returned from Loadable.Capture
      const bundleTags = bundles
        .map(bundle => {
          if (bundle.publicPath.includes('/modern/'))
            return differentialBundles
              ? `<script type="module" src="${replaceStaticPath(
                  bundle.publicPath,
                  staticRoutePath
                )}"></script>`
              : null;
          return `<script nomodule src="${replaceStaticPath(
            bundle.publicPath,
            staticRoutePath
          )}"></script>`;
        })
        .filter(f => f);

      // Add the static startup script to the bundleTags
      startupScriptFilename &&
        bundleTags.push(
          `<script src="/${staticRoutePath}/${startupScriptFilename}"></script>`
        );

      return bundleTags;
    };

    const templates =
      bundleData.default.templates || bundleData.legacy.templates;

    const stats =
      bundleData.modern.stats && bundleData.legacy.stats
        ? fromEntries(
            Object.entries(bundleData.modern.stats).map(([lib, paths]) => [
              lib,
              bundleData.legacy.stats[lib]
                ? [...paths, ...bundleData.legacy.stats[lib]]
                : paths,
            ])
          )
        : bundleData.default.stats;

    const {
      templateHTML,
      templateHTMLFragment,
      templateHTMLStatic,
    } = templates;

    // Serve a blank HTML page with client scripts to load the app in the browser
    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      renderToString(jsx);

      // Dynamic page render has only the necessary bundles to start up the app
      // and does not include any react-loadable code-split bundles
      const loadableBundles = getBundles(stats, modules);
      const bundleTags = buildBundleTags(loadableBundles).join('');

      const isDynamicHint = `<script>window.isDynamic = true;</script>`;

      const responseHtmlDynamic = templateHTML
        .replace('{{TITLE}}', '')
        .replace('{{SEO_CRITICAL_METADATA}}', '')
        .replace('{{CRITICAL_CSS}}', '')
        .replace('{{APP}}', '')
        .replace('{{LOADABLE_CHUNKS}}', bundleTags)
        .replace('{{REDUX_DATA}}', isDynamicHint);
      // Dynamic pages always return a 200 so we can run
      // the app and serve up all errors inside the client
      response.setHeader(
        'Surrogate-Control',
        `max-age=${getCacheDuration(200)}`
      );
      responseHandler(request, response, responseHtmlDynamic);
    }

    // Render the JSX server side and send response as per access method options
    if (!accessMethod.DYNAMIC) {
      store
        .runSaga(rootSaga(withSagas))
        .toPromise()
        .then(() => {
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

          const styleTags = sheet.getStyleTags();

          // After running rootSaga there should be an additional react-loadable
          // code-split bundle for a page component as well as core app bundles
          const loadableBundles = getBundles(stats, modules);
          const bundleTags = buildBundleTags(loadableBundles).join('');

          let serialisedReduxData = '';
          if (context.status !== 404) {
            // For a request that returns a redux state object as a response
            if (accessMethod.REDUX) {
              serialisedReduxData = serialize(reduxState);
              addStandardHeaders(reduxState, response, packagejson, {
                allowedGroups,
                globalGroups,
              });
              responseHandler(request, response, serialisedReduxData, 'json');
              return true;
            }
            if (!disableSsrRedux) {
              serialisedReduxData = serialize(reduxState);
              serialisedReduxData = `<script>window.REDUX_DATA = ${serialisedReduxData}</script>`;
            }
          }
          if (context.status > 400) {
            accessMethod.STATIC = true;
          }

          // Responses
          let responseHTML = '';

          if (context.status === 404)
            title = '<title>404 page not found</title>';

          // Static page served as a fragment
          if (accessMethod.FRAGMENT && accessMethod.STATIC) {
            responseHTML = minifyCssString(styleTags) + html;
          }

          // Page fragment served with client scripts and redux data that hydrate the app client side
          if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
            responseHTML = templateHTMLFragment
              .replace('{{TITLE}}', title)
              .replace('{{SEO_CRITICAL_METADATA}}', metadata)
              .replace('{{CRITICAL_CSS}}', minifyCssString(styleTags))
              .replace('{{APP}}', html)
              .replace('{{LOADABLE_CHUNKS}}', bundleTags)
              .replace('{{REDUX_DATA}}', serialisedReduxData);
          }

          // Full HTML page served statically
          if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
            responseHTML = templateHTMLStatic
              .replace('{{TITLE}}', title)
              .replace('{{SEO_CRITICAL_METADATA}}', metadata)
              .replace('{{CRITICAL_CSS}}', minifyCssString(styleTags))
              .replace('{{APP}}', html)
              .replace('{{LOADABLE_CHUNKS}}', '');
          }

          // Full HTML page served with client scripts and redux data that hydrate the app client side
          if (!accessMethod.FRAGMENT && !accessMethod.STATIC) {
            responseHTML = templateHTML
              .replace('{{TITLE}}', title)
              .replace('{{SEO_CRITICAL_METADATA}}', metadata)
              .replace('{{CRITICAL_CSS}}', styleTags)
              .replace('{{APP}}', html)
              .replace('{{LOADABLE_CHUNKS}}', bundleTags)
              .replace('{{REDUX_DATA}}', serialisedReduxData);
          }

          // Set response.status from React StaticRouter
          if (typeof context.status === 'number')
            response.status(context.status);

          addStandardHeaders(reduxState, response, packagejson, {
            allowedGroups,
            globalGroups,
          });
          try {
            // If react-helmet htmlAttributes are being used,
            // replace the html tag with those attributes sepcified
            // e.g. (lang, dir etc.)
            if (htmlAttributes) {
              responseHTML = responseHTML.replace(
                /<html?.+?>/,
                `<html ${htmlAttributes}>`
              );
            }
            responseHandler(request, response, responseHTML);
          } catch (err) {
            console.info(err.message);
          }
        })
        .catch(err => {
          // Handle any error that occurred in any of the previous
          // promises in the chain.
          console.info(err);
          response.status(500);
          responseHandler(
            request,
            response,
            `Error occurred: <br />${err.stack} <br />${JSON.stringify(err)}`
          );
        });
      renderToString(jsx);

      store.close();
    }
  });
};

export default webApp;
