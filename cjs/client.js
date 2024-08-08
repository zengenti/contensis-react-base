'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('isomorphic-fetch');
var React = require('react');
var reactDom = require('react-dom');
var reactHotLoader = require('react-hot-loader');
var reactRedux = require('react-redux');
var reactRouterDom = require('react-router-dom');
var component = require('@loadable/component');
var queryString = require('query-string');
var reactCookie = require('react-cookie');
var version = require('./version-0cb648de.js');
var version$1 = require('./version-8072b62e.js');
var App = require('./App-17f37900.js');
var store = require('./store-0ef9b570.js');
var selectors = require('./selectors-d5cd6b19.js');
var SSRContext = require('./SSRContext-f11cc282.js');
require('@redux-saga/core/effects');
require('history');
require('loglevel');
require('await-to-js');
require('./ChangePassword.container-88aa9b51.js');
require('./ToJs-8fd54c8e.js');
require('jsonpath-mapper');
require('./CookieHelper.class-34994aa1.js');
require('contensis-delivery-api');
require('./RouteLoader-5e9215ea.js');
require('react-router-config');
require('reselect');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
require('immer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

// Fix TS2769 error No overload matches this call
const Container = reactHotLoader.AppContainer; // as typeof AppContainer;

class ClientApp {
  constructor(ReactApp, config) {
    const documentRoot = document.getElementById('root');
    const {
      stateType = 'immutable',
      routes,
      withReducers,
      withSagas,
      withEvents
    } = config;
    const GetClientJSX = store => {
      const ClientJsx = /*#__PURE__*/React__default["default"].createElement(Container, null, /*#__PURE__*/React__default["default"].createElement(reactCookie.CookiesProvider, null, /*#__PURE__*/React__default["default"].createElement(reactRedux.Provider, {
        store: store
      }, /*#__PURE__*/React__default["default"].createElement(reactRouterDom.Router, {
        history: App.browserHistory
      }, /*#__PURE__*/React__default["default"].createElement(SSRContext.SSRContextProvider, null, /*#__PURE__*/React__default["default"].createElement(ReactApp, {
        routes: routes,
        withEvents: withEvents
      }))))));
      return ClientJsx;
    };
    const isProduction = !(process.env.NODE_ENV !== 'production');

    /**
     * Webpack HMR Setup.
     */
    const HMRRenderer = Component => {
      if (isProduction) component.loadableReady(() => {
        reactDom.hydrate(Component, documentRoot);
      }, {
        namespace: 'modern'
      });else reactDom.render(Component, documentRoot);
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
    const versionStatus = SSRContext.deliveryApi.getClientSideVersionStatus();
    if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
      store.createStore(withReducers, window.REDUX_DATA, App.browserHistory, stateType).then(store => {
        const state = store.getState();
        const ssrVersionStatus = version.selectVersionStatus(state);
        if (!ssrVersionStatus) store.dispatch(version$1.setVersionStatus(versionStatus));

        /* eslint-disable no-console */
        console.log('Hydrating from inline Redux');
        /* eslint-enable no-console */
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
exports["default"] = ClientApp;
//# sourceMappingURL=client.js.map
