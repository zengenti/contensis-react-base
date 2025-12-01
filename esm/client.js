import 'isomorphic-fetch';
import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { parse } from 'query-string';
import { CookiesProvider } from 'react-cookie';
import { c as createLocaleRoutes, b as browserHistory, r as rootSaga, p as pickProject } from './App-D8L4sT6e.js';
export { A as ReactApp } from './App-D8L4sT6e.js';
import { a as actions } from './slice-BO-KB30v.js';
import { s as selectVersionStatus } from './version-CsMa2_lY.js';
import { s as setVersionStatus } from './version-Cin2m8K5.js';
import { c as createStore } from './store-KUjdLK3-.js';
import { s as setCurrentProject } from './selectors-C2gX5tLA.js';
import { d as deliveryApi } from './ContensisDeliveryApi-DHZ52vNg.js';
import { S as SSRContextProvider } from './SSRContext-CXYTpsVV.js';
import 'history';
import '@redux-saga/core/effects';
import 'loglevel';
import 'await-to-js';
import './ChangePassword.container-BS_ruqX8.js';
import './matchGroups-BkB1ERVS.js';
import 'jsonpath-mapper';
import './CookieConstants-DEmbwzYr.js';
import './CookieHelper.class-C6rTRl_1.js';
import './ToJs-BnRRHk6f.js';
import 'contensis-delivery-api';
import './sagas-AyubwCW8.js';
import 'reselect';
import './util-CnXqe4uK.js';
import './selectors-lvyF1LmZ.js';
import 'contensis-core-api';
import 'deepmerge';
import './_commonjsHelpers-BFTU3MAI.js';
import 'immer';
import 'deep-equal';
import './VersionInfo-fBaJIe2X.js';
import 'styled-components';
import './RouteLoader-D4a8D5FU.js';
import '@reduxjs/toolkit';
import 'redux';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors-19';

class ClientApp {
  constructor(ReactApp, config) {
    const documentRoot = document.getElementById('root');
    const {
      i18n,
      // stateType = 'immutable', // changed default in v4
      stateType = 'js',
      routes,
      withReducers,
      withSagas,
      withEvents
    } = config;

    // process locales in static routes for i18n
    const localeRoutes = createLocaleRoutes(routes);
    const GetClientJSX = store => {
      const ClientJsx = /*#__PURE__*/React.createElement(CookiesProvider, null, /*#__PURE__*/React.createElement(Provider, {
        store: store
      }, /*#__PURE__*/React.createElement(unstable_HistoryRouter, {
        history: browserHistory,
        future: {
          v7_relativeSplatPath: true,
          v7_startTransition: true
        }
      }, /*#__PURE__*/React.createElement(SSRContextProvider, null, /*#__PURE__*/React.createElement(ReactApp, {
        routes: routes,
        withEvents: withEvents
      })))));
      return ClientJsx;
    };
    const isDev = process.env.NODE_ENV !== 'production';
    // const isProduction = !isDev;
    const shouldHydrate = window.__USE_HYDRATE__ && !window.isDynamic;

    /**
     * Webpack HMR Setup.
     */
    const HMRRenderer = Component => {
      if (shouldHydrate) loadableReady(() => {
        hydrateRoot(documentRoot, Component, {
          onRecoverableError(error) {
            console.warn('Hydration warning:', error);
          }
        });
      }, {
        namespace: 'modern'
      });else createRoot(documentRoot).render(Component);
    };
    const hmr = store => {
      // webpack Hot Module Replacement API
      if (module.hot) {
        module.hot.accept(ReactApp, () => {
          // if you are using harmony modules ({modules:false})
          HMRRenderer(GetClientJSX(store));
        });
      }
    };
    const qs = parse(window.location.search);
    const versionStatus = deliveryApi.getClientSideVersionStatus();
    if (isDev || window.isDynamic || window.REDUX_DATA) {
      createStore(withReducers, window.REDUX_DATA, browserHistory, stateType).then(store => {
        const state = store.getState();
        const ssrVersionStatus = selectVersionStatus(state);
        if (!ssrVersionStatus) store.dispatch(setVersionStatus(versionStatus));
        if (isDev && window.REDUX_DATA) console.log('Hydrating from inline Redux');
        store.runSaga(rootSaga(withSagas));
        store.dispatch(setCurrentProject(pickProject(window.location.hostname, qs), [], window.location.hostname));
        if (i18n) {
          store.dispatch(actions.INIT_LOCALES({
            locales: {},
            ...i18n
          }));
        }
        if (Object.keys(localeRoutes).length > 0) {
          // Keep a record of the locale routes in Redux
          // so we can navigate between them when switching language
          store.dispatch(actions.SET_LOCALE_ROUTES({
            routes: localeRoutes
          }));
        }
        delete window.REDUX_DATA;
        HMRRenderer(GetClientJSX(store));
        hmr(store);
      });
    } else {
      fetch(`${window.location.pathname}?redux=true`).then(response => response.json()).then(data => {
        const ssRedux = JSON.parse(data);
        createStore(withReducers, ssRedux, browserHistory, stateType).then(store => {
          store.dispatch(setVersionStatus(versionStatus));
          store.runSaga(rootSaga(withSagas));
          store.dispatch(setCurrentProject(pickProject(window.location.hostname, qs), [], window.location.hostname));
          HMRRenderer(GetClientJSX(store));
          hmr(store);
        });
      });
    }
  }
}

export { ClientApp as default };
//# sourceMappingURL=client.js.map
