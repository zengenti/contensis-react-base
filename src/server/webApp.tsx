import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import serialize from 'serialize-javascript';
import minifyCssString from 'minify-css-string';
import mapJson from 'jsonpath-mapper';
import { Express } from 'express';
import { StaticRouterContext } from 'react-router';
import { ChunkExtractorManager } from '@loadable/server';
import { identity, noop } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { buildCleaner } from 'lodash-clean';

import createStore from '~/redux/store/store';
import { history } from '~/redux/store/history';
import rootSaga from '~/redux/sagas';

import { setVersion, setVersionStatus } from '~/redux/actions/version';
import { setCurrentProject } from '~/routing/redux/actions';

import { deliveryApi } from '~/util/ContensisDeliveryApi';
import pickProject from '~/util/pickProject';
import stringifyAttributes from './util/stringifyAttributes';

import { getCacheDuration } from './features/caching/cacheDuration.schema';
import handleResponse from './features/response-handler';

import {
  getBundleData,
  getBundleTags,
  loadableChunkExtractors,
} from './util/bundles';
import { addStandardHeaders } from './util/headers';

import { ServerConfig } from '~/config';
import { AppState } from '~/redux/appstate';

const webApp = (
  app: Express,
  ReactApp: React.ComponentType<any>,
  config: ServerConfig & {
    allowedGroups?: string[];
    globalGroups?: string[];
    startupScriptFilename?: string;
  }
) => {
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
    handleResponses,
  } = config;
  const staticRoutePath = config.staticRoutePath || staticFolderPath;

  const bundleData = getBundleData(config, staticRoutePath);

  const attributes = stringifyAttributes(scripts.attributes);
  scripts.startup = scripts.startup || startupScriptFilename;

  const responseHandler =
    typeof handleResponses === 'function' ? handleResponses : handleResponse;

  const versionInfo = JSON.parse(
    fs.readFileSync(`dist/${staticFolderPath}/version.json`, 'utf8')
  );

  app.get('/*', async (request, response) => {
    const { url } = request;

    const matchedStaticRoute = () =>
      matchRoutes(routes.StaticRoutes, request.path);
    const isStaticRoute = () => matchedStaticRoute().length > 0;
    const staticRoute = isStaticRoute() && matchedStaticRoute()[0];

    // Allow certain routes to avoid SSR
    const onlyDynamic = staticRoute && staticRoute.route.ssr === false;
    const onlySSR = staticRoute && staticRoute.route.ssrOnly === true;

    const normaliseQs = q => (q && q.toLowerCase() === 'true' ? true : false);

    // Determine functional params from QueryString and set access methods
    const accessMethod = mapJson<
      any,
      { DYNAMIC: boolean; REDUX: boolean; FRAGMENT: boolean; STATIC: boolean }
    >(request.query, {
      DYNAMIC: ({ dynamic }) => normaliseQs(dynamic) || onlyDynamic,
      REDUX: ({ redux }) => normaliseQs(redux),
      FRAGMENT: ({ fragment }) => normaliseQs(fragment),
      STATIC: ({ static: value }) => normaliseQs(value) || onlySSR,
    });

    const context: StaticRouterContext = {};
    // Track the current statusCode via the response object
    response.status(200);

    // Create a store (with a memory history) from our current url
    const store = await createStore(
      withReducers,
      {} as AppState,
      history({
        initialEntries: [url],
      }),
      stateType
    );

    // dispatch any global and non-saga related actions before calling our JSX
    const versionStatusFromHostname = deliveryApi.getVersionStatusFromHostname(
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
    store.dispatch(setCurrentProject(project, groups, request.hostname));

    const loadableExtractor = loadableChunkExtractors();

    const jsx = (
      <ChunkExtractorManager
        extractor={loadableExtractor?.commonLoadableExtractor}
      >
        <ReduxProvider store={store}>
          <StaticRouter context={context} location={url}>
            <ReactApp routes={routes} withEvents={withEvents} />
          </StaticRouter>
        </ReduxProvider>
      </ChunkExtractorManager>
    );

    const { templateHTML, templateHTMLFragment, templateHTMLStatic } =
      bundleData.default.templates || bundleData.legacy.templates || {};

    // Serve a blank HTML page with client scripts to load the app in the browser
    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      renderToString(jsx);

      // Dynamic page render has only the necessary bundles to start up the app
      // and does not include any react-loadable code-split bundles
      const bundleTags = getBundleTags(
        loadableExtractor,
        scripts,
        staticRoutePath
      );

      const isDynamicHint = `<script ${attributes}>window.isDynamic = true;</script>`;

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
          const metadata = helmet.meta
            .toString()
            .concat(helmet.link.toString());

          if (context.url) {
            return response.redirect(302, context.url);
          }

          const reduxState = store.getState();

          const styleTags = sheet.getStyleTags();

          // After running rootSaga there should be an additional react-loadable
          // code-split bundles for any page components as well as core app bundles
          const bundleTags = getBundleTags(
            loadableExtractor,
            scripts,
            staticRoutePath
          );

          let serialisedReduxData = serialize(
            buildCleaner({
              isArray: identity,
              isBoolean: identity,
              isDate: identity,
              isFunction: noop,
              isNull: identity,
              isPlainObject: identity,
              isString: identity,
              isUndefined: noop,
            })(cloneDeep(reduxState))
          );
          if (context.statusCode !== 404) {
            // For a request that returns a redux state object as a response
            if (accessMethod.REDUX) {
              addStandardHeaders(reduxState, response, packagejson, {
                allowedGroups,
                globalGroups,
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
          }

          // Responses
          let responseHTML = '';

          if (context.statusCode === 404)
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
          if (typeof context.statusCode === 'number')
            response.status(context.statusCode);

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
          } catch (err: any) {
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
