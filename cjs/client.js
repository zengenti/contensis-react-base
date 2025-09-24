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
var version = require('./version-BolvQdgT.js');
var version$1 = require('./version-V6MVKCeD.js');
var App = require('./App-8caq5ze4.js');
var store = require('./store-Bm0URUih.js');
var selectors = require('./selectors-Bp_TrwG5.js');
var ContensisDeliveryApi = require('./ContensisDeliveryApi-DmwFulAI.js');
var SSRContext = require('./SSRContext-Bs4y-Prq.js');
require('@redux-saga/core/effects');
require('history');
require('loglevel');
require('await-to-js');
require('./ChangePassword.container-Bg9VCs8H.js');
require('./matchGroups-CNt2aNoC.js');
require('jsonpath-mapper');
require('./CookieConstants-DfPiWCRZ.js');
require('./CookieHelper.class-Det3qfdU.js');
require('./ToJs-BsWqWjdm.js');
require('contensis-delivery-api');
require('./sagas-Bzc_kZoN.js');
require('reselect');
require('./util-r0CzJGhK.js');
require('contensis-core-api');
require('deepmerge');
require('./_commonjsHelpers-BJu3ubxk.js');
require('immer');
require('deep-equal');
require('./RouteLoader-BiwyvbQ8.js');
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
      // stateType = 'immutable', // changed default in v4
      stateType = 'js',
      routes,
      withReducers,
      withSagas,
      withEvents
    } = config;
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
