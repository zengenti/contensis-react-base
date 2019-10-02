import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { getBundles } from 'react-loadable/webpack';
import { ServerStyleSheet } from 'styled-components';
import Loadable from 'react-loadable';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import minifyCssString from 'minify-css-string';

import { isImmutable } from 'immutable';

import createStore from '~/core/redux/store';
import rootSaga from '~/core/redux/sagas';
import { setVersion, setVersionStatus } from '~/core/redux/actions/version';
import { selectNavigationDepends } from '~/core/redux/selectors/navigation';

import {
  setCurrentProject,
  setCurrentEnvironment,
} from '~/core/redux/actions/routing';
import {
  selectRouteEntryDepends,
  selectRouteEntry,
  selectCurrentProject,
} from '~/core/redux/selectors/routing';
import { GetDeliveryApiStatusFromHostname } from '~/core/util/ContensisDeliveryApi';

import App from '~/App';
// import { history } from '~/core/redux/history';

import { AccessMethods } from '../util/types';
import pickEnv from '../util/pickEnv';
import pickProject, { allowedGroups } from '~/core/util/pickProject';

const templateHTML = fs.readFileSync('dist/index.html', 'utf8');
const versionData = fs.readFileSync('dist/static/version.json', 'utf8');
const versionInfo = JSON.parse(versionData);
const templateHTMLFragment = fs.readFileSync(
  'dist/index_fragment.html',
  'utf8'
);
const templateHTMLStatic = fs.readFileSync('dist/index_static.html', 'utf8');
const stats = JSON.parse(fs.readFileSync('dist/static/react-loadable.json'));
const packagejson = require('../../../package.json');

const addStandardHeaders = (state, response) => {
  if (state) {
    /* eslint-disable no-console */
    try {
      console.log('About to add header');
      let navDepends = selectNavigationDepends(state);
      let recordDepends = selectRouteEntryDepends(state);
      navDepends =
        navDepends && isImmutable(navDepends) ? navDepends.toJS() : navDepends;
      recordDepends = recordDepends.toJS();
      console.log(`navDepends count: ${navDepends.length}`);
      console.log(`recordDepends count: ${recordDepends.length}`);
      const allDepends = [...navDepends, ...recordDepends];
      let allDependsHeaderValue = allDepends.join(' ');
      allDependsHeaderValue = ` ${packagejson.name}-app ${allDependsHeaderValue} ${packagejson.name}-app`;
      response.header('surrogate-key', allDependsHeaderValue);

      addVarnishAuthenticationHeaders(state, response);
    } catch (e) {
      console.log('Error Adding headers');
      console.log(e);
    }
  }
  response.setHeader('Surrogate-Control', 'max-age=3600');
};

const addVarnishAuthenticationHeaders = (state, response) => {
  if (state) {
    try {
      const stateEntry = selectRouteEntry(state);
      const project = selectCurrentProject(state);
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

const webApp = app => {
  app.get('/*', (request, response, next) => {
    if (request.originalUrl.startsWith('/static/')) return next();

    const { url } = request;

    // Determine functional params and set access methods
    let accessMethod = {};

    const isDynamicNormalised = request.query.dynamic
      ? request.query.dynamic.toLowerCase()
      : 'false';

    // Hack for certain pages to avoid SSR
    const onlyDynamic = [false].includes(request.path);

    const isDynamic =
      onlyDynamic || isDynamicNormalised === 'true' ? true : false;

    const isReduxRequestNormalised = request.query.redux
      ? request.query.redux.toLowerCase()
      : 'false';
    const isReduxRequest = isReduxRequestNormalised === 'true' ? true : false;

    const isFragmentNormalised = request.query.fragment
      ? request.query.fragment.toLowerCase()
      : 'false';
    const isStaticNormalised = request.query.static
      ? request.query.static.toLowerCase()
      : 'false';
    const isFragment = isFragmentNormalised === 'true' ? true : false;
    let isStatic = isStaticNormalised === 'true' ? true : false;

    if (isDynamic) accessMethod.DYNAMIC = AccessMethods.DYNAMIC;
    if (isReduxRequest) accessMethod.REDUX = AccessMethods.REDUX;
    if (isFragment) accessMethod.FRAGMENT = AccessMethods.FRAGMENT;
    if (isStatic) accessMethod.STATIC = AccessMethods.STATIC;

    const context = {};
    const store = createStore();
    let status = 200;

    // dispatch any global and non-saga related actions before calling our JSX
    const versionStatusFromHostname = GetDeliveryApiStatusFromHostname(
      request.hostname
    );
    store.dispatch(setVersionStatus(versionStatusFromHostname));
    store.dispatch(setVersion(versionInfo.commitRef, versionInfo.buildNo));

    const env = pickEnv(request.hostname, request.query);
    const project = pickProject(request.hostname, request.query);

    store.dispatch(setCurrentEnvironment(env));
    const groups = allowedGroups(project);
    store.dispatch(setCurrentProject(project, groups));

    const modules = [];
    const jsx = (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <ReduxProvider store={store}>
          <StaticRouter context={context} location={url}>
            <App />
          </StaticRouter>
        </ReduxProvider>
      </Loadable.Capture>
    );

    /* eslint-disable no-console */
    console.log(
      `Request for ${request.path} hostname: ${request.hostname} versionStatus: ${versionStatusFromHostname}`
    );
    /* eslint-enable no-console */

    // Serve a blank HTML page with client scripts to load the app in the browser
    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      renderToString(jsx);
      const isDynamicHint = `<script>window.isDynamic = true;</script>`;
      const dynamicBundles = getBundles(stats, modules);
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
        .runSaga(rootSaga)
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

          const bundles = getBundles(stats, modules);

          const bundleScripts = bundles
            .map(bundle => `<script src="${bundle.publicPath}"></script>`)
            .join('');

          let serialisedReduxData = '';
          if (context.status !== 404) {
            if (isReduxRequest) {
              serialisedReduxData = serialize(reduxState);
              addStandardHeaders(reduxState, response);
              response.status(status).json(serialisedReduxData);
              return true;
            }
            if (!DISABLE_SSR_REDUX) {
              serialisedReduxData = serialize(reduxState);
              serialisedReduxData = `<script>window.REDUX_DATA = ${serialisedReduxData}</script>`;
            } /* global DISABLE_SSR_REDUX */
          }
          if (context.status === 404) {
            isStatic = true;
            accessMethod.STATIC = AccessMethods.STATIC;
          }

          // Responses
          let responseHTML = '';

          // Static page served as a fragment
          if (accessMethod.FRAGMENT && accessMethod.STATIC) {
            addStandardHeaders(reduxState, response);
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
              .replace('{{CRITICAL_CSS}}', minifyCssString(styleTags))
              .replace('{{APP}}', html)
              .replace('{{LOADABLE_CHUNKS}}', bundleScripts)
              .replace('{{REDUX_DATA}}', serialisedReduxData);
          }
          addStandardHeaders(reduxState, response);
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
