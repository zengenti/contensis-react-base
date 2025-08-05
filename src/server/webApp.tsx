import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchRoutes, RouteObject } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import serialize from 'serialize-javascript';
import mapJson from 'jsonpath-mapper';
import { Express, Request, Response } from 'express';
import { identity, noop } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { buildCleaner } from 'lodash-clean';
import Cookies from 'universal-cookie';
import cookiesMiddleware from 'universal-cookie-express';

import createStore from '~/redux/store/store';
import { history } from '~/redux/store/history';
import rootSaga from '~/redux/sagas';

import { setVersion, setVersionStatus } from '~/redux/actions/version';
import { HttpContextValues } from '~/routing/httpContext';
import { setCurrentProject } from '~/routing/redux/actions';
import { selectCurrentSearch } from '~/routing/redux/selectors';

import { deliveryApi } from '~/util/ContensisDeliveryApi';
import { mergeStaticRoutes } from '~/util/mergeStaticRoutes';
import pickProject from '~/util/pickProject';
import stringifyAttributes from './util/stringifyAttributes';

import { getCacheDuration } from './features/caching/cacheDuration.schema';
import handleResponse from './features/response-handler';
import {
  renderStream,
  styledComponentsStream,
} from './features/response-handler/render-stream';

import {
  getBundleData,
  getBundleTags,
  loadableChunkExtractors,
} from './util/bundles';
import { getVersionInfo } from './util/getVersionInfo';
import { unhandledExceptionHandler } from './util/handleExceptions';
import { addStandardHeaders } from './util/headers';
import { replaceHtml } from './util/html';

import { AppState, ServerConfig, MatchedRoute, StaticRoute } from '~/models';
import { ssrJsxProducer } from './util/jsx';

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
    stateType = 'js',
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
    enableSsrCookies,
    handleResponses,
    handleExceptions = true,
  } = config;
  const staticRoutePath = config.staticRoutePath || staticFolderPath;

  let isRenderingJsxToString = config.renderToString || false;

  const bundleData = getBundleData(config, staticRoutePath);

  const attributes = stringifyAttributes(scripts.attributes);
  scripts.startup = scripts.startup || startupScriptFilename;

  let responseHandler = handleResponse;
  if (typeof handleResponses === 'function') {
    responseHandler = handleResponses;
    isRenderingJsxToString = true;
  }

  if (handleExceptions !== false) unhandledExceptionHandler(handleExceptions); // Create `process.on` event handlers for unhandled exceptions (Node v15+)

  const versionInfo = getVersionInfo(staticFolderPath);

  app.get(
    '/{*splat}',
    cookiesMiddleware(),
    async (
      request: Request & {
        universalCookies?: Cookies;
      },
      response: Response
    ) => {
      const url = encodeURI(request.url);

      const matchedStaticRoute = matchRoutes(
        routes.StaticRoutes as RouteObject[],
        request.path
      );
      const isStaticRoute = matchedStaticRoute && matchedStaticRoute.length > 0;

      if (isStaticRoute) {
        mergeStaticRoutes(matchedStaticRoute);
      }

      const staticRoute: MatchedRoute<string, StaticRoute> | null =
        isStaticRoute ? matchedStaticRoute.pop() || null : null;

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
      const versionStatus = deliveryApi.getServerSideVersionStatus(request);

      // In server-side blocks world, the hostname requested by the client resides in the x-orig-host header
      // Because of this, we prioritize x-orig-host when setting our hostname
      const hostname = (request.headers['x-orig-host'] ||
        request.hostname) as string;

      console.info(
        `Request for ${request.path} hostname: ${hostname} versionStatus: ${versionStatus}`
      );

      store.dispatch(setVersionStatus(versionStatus));
      store.dispatch(setVersion(versionInfo.commitRef, versionInfo.buildNo));

      const project = pickProject(hostname, request.query);

      const groups = allowedGroups && allowedGroups[project];
      store.dispatch(setCurrentProject(project, groups, hostname));

      const loadableExtractor = loadableChunkExtractors();

      const ssrCookies = enableSsrCookies
        ? // these cookies are managed by the cookiesMiddleware and contain listeners
          // when cookies are read or written in ssr can be added to the `set-cookie` response header
          request.universalCookies
        : // this is a stub cookie collection so cookie methods can be used in code
          new Cookies();

      // Track the current statusCode via the response object
      response.status(200);

      // Create the context we will pass to JSX HttpContext.Provider
      // and read back any context props set by the ReactApp
      const context: HttpContextValues = {};

      // Amalgamate all props for the various Providers we wrap the ReactApp with
      const jsxProviderProps = {
        loadable: { extractor: loadableExtractor.commonLoadableExtractor },
        cookies: ssrCookies,
        redux: store,
        httpContext: context,
        router: { url },
        ssrContext: { accessMethod, request, response },
      };
      // These are the props we will pass to the ReactApp itself
      const jsxReactAppProps = { routes, withEvents };

      // Get the configured HTML templates provided by the consumer
      const {
        templateHTML = '',
        templateHTMLFragment = '',
        templateHTMLStatic = '',
      } = bundleData.default.templates || bundleData.legacy.templates || {};

      // Serve a blank HTML page with client scripts to load the app in the browser
      if (accessMethod.DYNAMIC) {
        // Dynamic doesn't need sagas
        // or styles, or any split component bundles
        // nor are we streaming responses
        const isDynamicHints = `<script ${attributes}>window.versionStatus = "${versionStatus}"; window.isDynamic = true;</script>`;

        const jsx = ssrJsxProducer(ReactApp, {
          providers: jsxProviderProps,
          props: jsxReactAppProps,
          ssrAssets: {
            serializedState: isDynamicHints,
          },
        });
        renderToString(jsx);

        // Dynamic page render has only the necessary bundles to start up the app
        // and does not include any react-loadable code-split bundles
        const bundleTags = getBundleTags(
          loadableExtractor,
          scripts,
          staticRoutePath
        );
        const responseHtmlDynamic = replaceHtml(
          {
            bundleTags,
            state: isDynamicHints,
            templateHTML,
            templateHTMLFragment,
          },
          accessMethod
        );

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
            const reduxState = store.getState();
            let clonedState = buildCleaner({
              isArray: identity,
              isBoolean: identity,
              isDate: identity,
              isFunction: noop,
              isNull: identity,
              isPlainObject: identity,
              isString: identity,
              isUndefined: noop,
            })(cloneDeep(reduxState));
            // These keys are used for preparing server-side response headers only
            // and are not required in the client at all except for debugging ssr
            if (!selectCurrentSearch(reduxState)?.includes('includeApiCalls')) {
              if (stateType === 'immutable')
                clonedState = clonedState
                  .deleteIn(['routing', 'apiCalls'])
                  .deleteIn(['routing', 'surrogateKeys']);
              else {
                delete clonedState.routing.apiCalls;
                delete clonedState.routing.surrogateKeys;
              }
            }
            // Reset user state to prevent user details from being cached in SSR
            if (stateType === 'immutable') {
              clonedState = clonedState.delete('user');
            } else delete clonedState.user;

            let serialisedReduxData = serialize(clonedState);
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
                // window.versionStatus is not strictly required here and is added to support cases
                // where a consumer may not be using the contensisVersionStatus in redux and calling
                // the `getClientSideVersionStatus()` method directly
                serialisedReduxData = `<script ${attributes}>window.__USE_HYDRATE__ = true; window.versionStatus = "${versionStatus}"; window.REDUX_DATA = ${serialisedReduxData}</script>`;
              }
            }

            // Responses
            addStandardHeaders(reduxState, response, packagejson, {
              allowedGroups,
              globalGroups,
            });

            // // Produce the ssr jsx one time so we can get any style tags to pass back in
            // ssrJsxProducer(ReactApp, {
            //   providers: { ...jsxProviderProps, styledComponents: { sheet } },
            //   props: jsxReactAppProps,
            // });

            // // After running rootSaga (and rendering subsquent children)
            // // there should be additional react-loadable
            // // code-split bundles for any page components as well as core app bundles
            // const bundleTags = getBundleTags(
            //   loadableExtractor,
            //   scripts,
            //   staticRoutePath
            // );

            const sheet = new ServerStyleSheet();
            const styledJsx = ssrJsxProducer(ReactApp, {
              providers: { ...jsxProviderProps, styledComponents: { sheet } },
              props: jsxReactAppProps,
              ssrAssets: {
                // bundleTags,
                // htmlAttributes,
                // metadata,
                // title,
              },
            });

            // We have to call renderToString() in order for all components to have
            // had chance to set the helmet metadata
            const html = renderToString(styledJsx);
            // Helmet.renderStatic() has to be called synchronously immediately after calling renderToString()
            // as it is not thread-safe (or specifically scoped to only this request)
            const helmet = Helmet.renderStatic();

            // Because we have had to call renderToString() here to reliably gather all helmet metadata
            // We could potentially call sheet.getStyleTags() here too and avoid piping a react-rendered
            // stream to a second stream to inject styled-components CSS

            const htmlAttributes = helmet.htmlAttributes.toString();
            let title = helmet.title.toString();
            const metadata = helmet.meta
              .toString()
              .concat(helmet.base.toString())
              .concat(helmet.link.toString())
              .concat(helmet.script.toString())
              .concat(helmet.noscript.toString());

            try {
              /**
               * Loads all page assets into the provided templateHTML
               *
               * Is callable after the JSX has been rendered, as
               * JSX components may update the context via the
               * HttpContext.Provider which can influence whether
               * we render the page as STATIC or render nothing
               * if the context has requested a redirect
               * */
              const getContextHtml = (
                isFinal = false,
                styleTags?: string,
                renderedJsxMarkup?: string
              ) => {
                if (context.url) {
                  response.redirect(context.statusCode || 302, context.url);
                  return '';
                }

                // Make the page render statically if there is an error status code
                if ((context.statusCode || 200) >= 404) {
                  accessMethod.STATIC = true;
                }

                if (context.statusCode === 404)
                  title = '<title>404 page not found</title>';

                // Set response.status from React StaticRouter
                if (typeof context.statusCode === 'number')
                  response.status(context.statusCode);

                const bundleTags = isFinal
                  ? getBundleTags(loadableExtractor, scripts, staticRoutePath)
                  : '';

                const html = replaceHtml(
                  {
                    bundleTags,
                    html: renderedJsxMarkup,
                    htmlAttributes,
                    metadata,
                    state: serialisedReduxData,
                    styleTags,
                    title,
                    templateHTML,
                    templateHTMLFragment,
                    templateHTMLStatic,
                  },
                  accessMethod
                );
                return html;
              };

              if (isRenderingJsxToString) {
                // We have already (begrudgingly) rendered the JSX to a string above
                // so we can get all of the Helmet metadata out from any rendered component
                // const html = renderToString(styledJsx);
                const styleTags = sheet.getStyleTags();
                const responseHTML = getContextHtml(true, styleTags, html);
                responseHandler(request, response, responseHTML);
              } else {
                renderStream(
                  getContextHtml,
                  styledJsx,
                  response,
                  styledComponentsStream(sheet)
                );
              }
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

        // If this is removed we don't get the redux state populated
        // with the result of the actions RouteLoader component has dispatched
        renderToString(
          ssrJsxProducer(ReactApp, {
            providers: jsxProviderProps,
            props: jsxReactAppProps,
          })
        );

        store.close();
      }
    }
  );
};

export default webApp;
