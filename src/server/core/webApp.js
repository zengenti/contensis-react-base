import { renderToString } from 'react-dom/server';
import { getBundles } from 'react-loadable/webpack';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import minifyCssString from 'minify-css-string';
// import { history } from '~/core/redux/history';

import { AccessMethods } from '../util/types';
import pickProject, { allowedGroups } from '~/core/util/pickProject';

const addStandardHeaders = (state, response, selectors, packagejson) => {
  if (state) {
    /* eslint-disable no-console */
    try {
      console.log('About to add header');
      let navDepends = selectors.selectNavigationDepends(state);
      let recordDepends = selectors.selectRouteEntryDepends(state);
      navDepends = navDepends.toJS();
      recordDepends = recordDepends.toJS();
      console.log(`navDepends count: ${navDepends.length}`);
      console.log(`recordDepends count: ${recordDepends.length}`);
      const allDepends = [...navDepends, ...recordDepends];
      let allDependsHeaderValue = allDepends.join(' ');
      allDependsHeaderValue = ` ${packagejson.name}-app ${allDependsHeaderValue} ${packagejson.name}-app`;
      response.header('surrogate-key', allDependsHeaderValue);

      addVarnishAuthenticationHeaders(state, response, selectors);
    } catch (e) {
      console.log('Error Adding headers');
      console.log(e);
    }
  }
  response.setHeader('Surrogate-Control', 'max-age=3600');
};

const addVarnishAuthenticationHeaders = (state, response, selectors) => {
  if (state) {
    try {
      const stateEntry = selectors.selectRouteEntry(state);
      const project = selectors.selectCurrentProject(state);
      if (
        stateEntry &&
        stateEntry.getIn(['authentication', 'isLoginRequired'])
      ) {
        response.header(
          'x-contensis-viewer-groups',
          allowedGroups(project).join('|')
        );
      }
    } catch (e) {
      console.log('Error adding authentication header');
      console.log(e);
    }
  }
};

const webApp = (app, options) => {
  app.get('/*', (request, response, next) => {
    if (request.originalUrl.startsWith('/static/')) return next();

    const { url } = request;

    // Determine functional params and set access methods
    let accessMethod = {};

    const isDynamicNormalised = request.query.dynamic
      ? request.query.dynamic.toLowerCase()
      : 'false';

    // Hack for certain pages to avoid SSR
    const onlyDynamic = options.dynamicPaths.includes(request.path);

    const isReduxRequestNormalised = request.query.redux
      ? request.query.redux.toLowerCase()
      : 'false';

    const isFragmentNormalised = request.query.fragment
      ? request.query.fragment.toLowerCase()
      : 'false';

    const isStaticNormalised = request.query.static
      ? request.query.static.toLowerCase()
      : 'false';

    if (onlyDynamic || isDynamicNormalised === 'true')
      accessMethod.DYNAMIC = AccessMethods.DYNAMIC;
    if (isReduxRequestNormalised === 'true')
      accessMethod.REDUX = AccessMethods.REDUX;
    if (isFragmentNormalised === 'true')
      accessMethod.FRAGMENT = AccessMethods.FRAGMENT;
    if (isStaticNormalised === 'true')
      accessMethod.STATIC = AccessMethods.STATIC;

    const context = options.context; //{};
    const store = options.createStore();

    let status = 200;

    // dispatch any global and non-saga related actions before calling our JSX
    const versionStatusFromHostname = options.helpers.GetDeliveryApiStatusFromHostname(
      request.hostname
    );
    const { versionInfo } = options.version;

    store.dispatch(options.actions.setVersionStatus(versionStatusFromHostname));
    store.dispatch(
      options.actions.setVersion(versionInfo.commitRef, versionInfo.buildNo)
    );

    const project = pickProject(request.hostname, request.query);

    const groups = allowedGroups(project);
    store.dispatch(options.actions.setCurrentProject(project, groups));

    const modules = [];

    const jsx = options.jsx({ store, modules, url, context });

    /* eslint-disable no-console */
    console.log(
      `Request for ${request.path} hostname: ${request.hostname} versionStatus: ${versionStatusFromHostname}`
    );
    /* eslint-enable no-console */

    const {
      templateHTML,
      templateHTMLFragment,
      templateHTMLStatic,
    } = options.templates;

    // Serve a blank HTML page with client scripts to load the app in the browser
    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      renderToString(jsx);

      const isDynamicHint = `<script>window.isDynamic = true;</script>`;
      const dynamicBundles = getBundles(options.stats, modules);
      const dynamicBundleScripts = dynamicBundles
        .map(bundle => `<script src="${bundle.publicPath}"></script>`)
        .join('');
      const responseHtmlDynamic = templateHTML
        .replace('{{TITLE}}', '')
        .replace('{{SEO_CRITICAL_METADATA}}', '')
        .replace('{{CRITICAL_CSS}}', '')
        .replace('{{APP}}', '')
        .replace('{{LOADABLE_CHUNKS}}', dynamicBundleScripts)
        .replace('{{REDUX_DATA}}', isDynamicHint);
      response.setHeader('Surrogate-Control', 'max-age=3600');
      response.status(status).send(responseHtmlDynamic);
    }

    // Render the JSX server side and send response as per access method options
    if (!accessMethod.DYNAMIC) {
      store
        .runSaga(options.rootSaga)
        .toPromise()
        .then(() => {
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

          const bundles = getBundles(options.stats, modules);

          const bundleScripts = bundles
            .map(bundle => `<script src="${bundle.publicPath}"></script>`)
            .join('');

          let serialisedReduxData = '';
          if (context.status !== 404) {
            if (accessMethod.REDUX) {
              serialisedReduxData = serialize(reduxState);
              addStandardHeaders(
                reduxState,
                response,
                options.selectors,
                options.packagejson
              );
              response.status(status).json(serialisedReduxData);
              return true;
            }
            if (!DISABLE_SSR_REDUX) {
              serialisedReduxData = serialize(reduxState);
              serialisedReduxData = `<script>window.REDUX_DATA = ${serialisedReduxData}</script>`;
            } /* global DISABLE_SSR_REDUX */
          }
          if (context.status === 404) {
            accessMethod.STATIC = AccessMethods.STATIC;
          }

          // Responses
          let responseHTML = '';

          // Static page served as a fragment
          if (accessMethod.FRAGMENT && accessMethod.STATIC) {
            addStandardHeaders(
              reduxState,
              response,
              options.selectors,
              options.packagejson
            );
            responseHTML = minifyCssString(styleTags) + html;
          }

          // Page fragment served with client scripts and redux data that hydrate the app client side
          if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
            responseHTML = templateHTMLFragment
              .replace('{{TITLE}}', title)
              .replace('{{SEO_CRITICAL_METADATA}}', metadata)
              .replace('{{CRITICAL_CSS}}', minifyCssString(styleTags))
              .replace('{{APP}}', html)
              .replace('{{LOADABLE_CHUNKS}}', bundleScripts)
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
              .replace('{{LOADABLE_CHUNKS}}', bundleScripts)
              .replace('{{REDUX_DATA}}', serialisedReduxData);
          }
          addStandardHeaders(
            reduxState,
            response,
            options.selectors,
            options.packagejson
          );
          response.status(status).send(responseHTML);
        })
        .catch(err => {
          // Handle any error that occurred in any of the previous
          // promises in the chain.
          /* eslint-disable no-console */
          console.log(err);
          /* eslint-enable no-console */
          response
            .status(500)
            .send(
              `Error occurred: <br />${err.stack} <br />${JSON.stringify(err)}`
            );
        });
      renderToString(jsx);

      store.close();
    }
  });
};

export default webApp;
