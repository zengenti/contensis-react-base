import fs from 'fs';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Loadable from 'react-loadable';
import { renderToString } from 'react-dom/server';
import { getBundles } from 'react-loadable/webpack';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';
import { matchesUA } from 'browserslist-useragent';
import serialize from 'serialize-javascript';
import minifyCssString from 'minify-css-string';
import { fromJS } from 'immutable';

import { history } from '~/core/redux/history';

import { AccessMethods } from '../util/types';
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

const addStandardHeaders = (state, response, packagejson) => {
  if (state) {
    /* eslint-disable no-console */
    try {
      console.log('About to add header');
      let entryDepends = selectEntryDepends(state);
      entryDepends = entryDepends.toJS();
      console.log(`entryDepends count: ${entryDepends.length}`);

      let nodeDepends = selectNodeDepends(state).toJS();
      let currentTreeId = selectCurrentTreeID(state);
      let nodeDependsKeys = nodeDepends.map(nodeKey => {
        return `${currentTreeId}_${nodeKey}`;
      });
      const allDepends = [...entryDepends, ...nodeDependsKeys];

      const allDependsHashed = hashKeys(allDepends);

      response.header(
        'surrogate-key',
        ` ${packagejson.name}-app ${allDependsHashed.join(' ')}`
      );
      console.log(`depends hashed: ${allDependsHashed.join(' ')}`);
      console.log(`depends hashed: ${allDepends.join(' ')}`);

      addVarnishAuthenticationHeaders(state, response);
    } catch (e) {
      console.log('Error Adding headers');
      console.log(e);
    }
  }
  response.setHeader('Surrogate-Control', 'max-age=3600');
};

const addVarnishAuthenticationHeaders = (state, response, allowedGroups) => {
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
          allowedGroups[project].join('|')
        );
      }
    } catch (e) {
      console.log('Error adding authentication header');
      console.log(e);
    }
  }
};

const readFileSync = path => fs.readFileSync(path, 'utf8');

const loadBundleData = ({ stats, templates }, build) => {
  try {
    const bundle = {};
    bundle.stats = JSON.parse(
      readFileSync(stats.replace('/target', build ? `/${build}` : ''))
    );
    bundle.templates = {
      templateHTML: readFileSync(
        templates.html.replace('/target', build ? `/${build}` : '')
      ),
      templateHTMLStatic: readFileSync(
        templates.static.replace('/target', build ? `/${build}` : '')
      ),
      templateHTMLFragment: readFileSync(
        templates.fragment.replace('/target', build ? `/${build}` : '')
      ),
    };
    return bundle;
  } catch {
    //console.log(ex);
  }
};

const webApp = (app, ReactApp, config) => {
  const {
    routes,
    withReducers,
    withSagas,
    withEvents,
    packagejson,
    versionData,
    dynamicPaths,
    allowedGroups,
    disableSsrRedux,
  } = config;

  const bundles = {
    default: loadBundleData(config),
    legacy: loadBundleData(config, 'legacy'),
    modern: loadBundleData(config, 'modern'),
  };
  if (!bundles.default) bundles.default = bundles.legacy || bundles.modern;

  const versionInfo = JSON.parse(fs.readFileSync(versionData, 'utf8'));

  app.get('/*', (request, response, next) => {
    if (request.originalUrl.startsWith('/static/')) return next();
    const useragent = request.headers['user-agent'];
    const isModernUser = matchesUA(useragent, {
      env: 'modern',
      allowHigherVersions: true,
    });

    const { url } = request;

    // Determine functional params and set access methods
    let accessMethod = {};

    const isDynamicNormalised = request.query.dynamic
      ? request.query.dynamic.toLowerCase()
      : 'false';

    // Hack for certain pages to avoid SSR
    const onlyDynamic = dynamicPaths.includes(request.path);

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

    const context = {};
    let status = 200;

    // Create a store (with a memory history) from our current url
    const store = createStore(
      withReducers,
      fromJS({}),
      history({ initialEntries: [url] })
    );
    //const store = createStore(withReducers);

    // dispatch any global and non-saga related actions before calling our JSX
    const versionStatusFromHostname = GetDeliveryApiStatusFromHostname(
      request.hostname
    );

    store.dispatch(setVersionStatus(versionStatusFromHostname));
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

    /* eslint-disable no-console */
    console.log(
      `Request for ${request.path} hostname: ${request.hostname} versionStatus: ${versionStatusFromHostname}`
    );
    /* eslint-enable no-console */

    const target = isModernUser ? bundles.modern : bundles.legacy;

    const { templates, stats } = target || bundles.default;

    const {
      templateHTML,
      templateHTMLFragment,
      templateHTMLStatic,
    } = templates;

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
        .runSaga(rootSaga(withSagas))
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
            if (accessMethod.REDUX) {
              serialisedReduxData = serialize(reduxState);
              addStandardHeaders(
                reduxState,
                response,
                packagejson,
                allowedGroups
              );
              response.status(status).json(serialisedReduxData);
              return true;
            }
            if (!disableSsrRedux) {
              serialisedReduxData = serialize(reduxState);
              serialisedReduxData = `<script>window.REDUX_DATA = ${serialisedReduxData}</script>`;
            }
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
              packagejson,
              allowedGroups
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
          addStandardHeaders(reduxState, response, packagejson, allowedGroups);
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
