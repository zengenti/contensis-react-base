'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('isomorphic-fetch');
var React = require('react');
var client = require('react-dom/client');
var reactRedux = require('react-redux');
var reactRouterDom = require('react-router-dom');
var component = require('@loadable/component');
var queryString = require('query-string');
var reactCookie = require('react-cookie');
var App = require('./App-CFT_UyKL.js');
var slice = require('./slice-5xJMH24n.js');
var version = require('./version-CukCz8zL.js');
var version$1 = require('./version-B9moFk8k.js');
var store = require('./store-DxuhGQ7p.js');
var selectors = require('./selectors-C1CqEUmL.js');
var ContensisDeliveryApi = require('./ContensisDeliveryApi-DBaziPG9.js');
var SSRContext = require('./SSRContext-Cayonmg4.js');
require('history');
require('@redux-saga/core/effects');
require('loglevel');
require('await-to-js');
require('contensis-delivery-api');
require('./VersionInfo-CTPtw_Xd.js');
require('./_commonjsHelpers-BJu3ubxk.js');
require('jsonpath-mapper');
require('styled-components');
require('./selectors-DAQR0uZa.js');
require('./ChangePassword.container-BWh4R32r.js');
require('./matchGroups-CxRa9Ej9.js');
require('./CookieConstants-DfPiWCRZ.js');
require('./CookieHelper.class-Det3qfdU.js');
require('./ToJs-BsWqWjdm.js');
require('./sagas-D07lHYaB.js');
require('reselect');
require('./util-CFAjDCA0.js');
require('contensis-core-api');
require('deepmerge');
require('immer');
require('deep-equal');
require('./RouteLoader-B-sjh6ha.js');
require('@reduxjs/toolkit');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors-19');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

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
    const localeRoutes = App.createLocaleRoutes(routes);
    const GetClientJSX = store => {
      const ClientJsx = /*#__PURE__*/React__default.default.createElement(reactCookie.CookiesProvider, null, /*#__PURE__*/React__default.default.createElement(reactRedux.Provider, {
        store: store
      }, /*#__PURE__*/React__default.default.createElement(reactRouterDom.unstable_HistoryRouter, {
        history: App.browserHistory,
        future: {
          v7_relativeSplatPath: true,
          v7_startTransition: true
        }
      }, /*#__PURE__*/React__default.default.createElement(SSRContext.SSRContextProvider, null, /*#__PURE__*/React__default.default.createElement(ReactApp, {
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
      if (shouldHydrate) component.loadableReady(() => {
        client.hydrateRoot(documentRoot, Component, {
          onRecoverableError(error) {
            console.warn('Hydration warning:', error);
          }
        });
      }, {
        namespace: 'modern'
      });else client.createRoot(documentRoot).render(Component);
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
    const qs = queryString.parse(window.location.search);
    const versionStatus = ContensisDeliveryApi.deliveryApi.getClientSideVersionStatus();
    if (isDev || window.isDynamic || window.REDUX_DATA) {
      store.createStore(withReducers, window.REDUX_DATA, App.browserHistory, stateType).then(store => {
        const state = store.getState();
        const ssrVersionStatus = version.selectVersionStatus(state);
        if (!ssrVersionStatus) store.dispatch(version$1.setVersionStatus(versionStatus));
        if (isDev && window.REDUX_DATA) console.log('Hydrating from inline Redux');
        store.runSaga(App.rootSaga(withSagas));
        store.dispatch(selectors.setCurrentProject(App.pickProject(window.location.hostname, qs), [], window.location.hostname));
        if (i18n) {
          store.dispatch(slice.actions.INIT_LOCALES({
            locales: {},
            // Keep a record of the locale routes in Redux
            // so we can navigate between them when switching language
            routes: localeRoutes,
            ...i18n
          }));
        }
        delete window.REDUX_DATA;
        HMRRenderer(GetClientJSX(store));
        hmr(store);
      });
    } else {
      fetch(`${window.location.pathname}?redux=true`).then(response => response.json()).then(data => {
        const ssRedux = JSON.parse(data);
        store.createStore(withReducers, ssRedux, App.browserHistory, stateType).then(store => {
          store.dispatch(version$1.setVersionStatus(versionStatus));
          store.runSaga(App.rootSaga(withSagas));
          store.dispatch(selectors.setCurrentProject(App.pickProject(window.location.hostname, qs), [], window.location.hostname));
          HMRRenderer(GetClientJSX(store));
          hmr(store);
        });
      });
    }
  }
}

exports.ReactApp = App.AppRoot;
exports.default = ClientApp;
//# sourceMappingURL=client.js.map
