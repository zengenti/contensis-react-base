'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('isomorphic-fetch');
var React = require('react');
var require$$0 = require('react-dom');
var reactRedux = require('react-redux');
var require$$2 = require('react-router-dom');
var component = require('@loadable/component');
var queryString = require('query-string');
var reactCookie = require('react-cookie');
<<<<<<< HEAD
var version = require('./version-34d91f68.js');
var version$1 = require('./version-a410c88e.js');
var App = require('./App-b56aca04.js');
var selectors = require('./selectors-14caa813.js');
var ContensisDeliveryApi = require('./ContensisDeliveryApi-4fcf049d.js');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
require('immer');
require('./reducers-73a03ef4.js');
=======
var version = require('./version-CM-bJ62L.js');
var version$1 = require('./version-Cg79mdPg.js');
var App = require('./App-B2ohFzUt.js');
var store = require('./store-BihH67lI.js');
var selectors = require('./selectors-wCs5fHD4.js');
var SSRContext = require('./SSRContext-DpnwQ2te.js');
>>>>>>> master
require('@redux-saga/core/effects');
require('history');
require('loglevel');
require('await-to-js');
<<<<<<< HEAD
require('./ChangePassword.container-ae35785e.js');
require('./ToJs-a8d8f3f0.js');
=======
require('./ChangePassword.container-Dup9_na7.js');
require('./ToJs-C9jwV7YB.js');
>>>>>>> master
require('jsonpath-mapper');
require('./CookieHelper.class-CxeVo9EP.js');
require('contensis-delivery-api');
<<<<<<< HEAD
require('./RouteLoader-c06dccd5.js');
=======
require('./RouteLoader-De-dhkg-.js');
require('react-router-config');
>>>>>>> master
require('reselect');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
require('immer');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

<<<<<<< HEAD
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
=======
var React__default = /*#__PURE__*/_interopDefault(React);
>>>>>>> master

var hydrateRoot;
var createRoot;

var m = require$$0__default["default"];
if (process.env.NODE_ENV === 'production') {
  createRoot = m.createRoot;
  hydrateRoot = m.hydrateRoot;
} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}

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
<<<<<<< HEAD
      const ClientJsx = /*#__PURE__*/React__default["default"].createElement(reactCookie.CookiesProvider, null, /*#__PURE__*/React__default["default"].createElement(reactRedux.Provider, {
        store: store
      }, /*#__PURE__*/React__default["default"].createElement(require$$2.unstable_HistoryRouter, {
=======
      const ClientJsx = /*#__PURE__*/React__default.default.createElement(Container, null, /*#__PURE__*/React__default.default.createElement(reactCookie.CookiesProvider, null, /*#__PURE__*/React__default.default.createElement(reactRedux.Provider, {
        store: store
      }, /*#__PURE__*/React__default.default.createElement(reactRouterDom.Router, {
>>>>>>> master
        history: App.browserHistory
      }, /*#__PURE__*/React__default.default.createElement(SSRContext.SSRContextProvider, null, /*#__PURE__*/React__default.default.createElement(ReactApp, {
        routes: routes,
        withEvents: withEvents
<<<<<<< HEAD
      }))));
=======
      }))))));
>>>>>>> master
      return ClientJsx;
    };

    const isProduction = !(process.env.NODE_ENV !== 'production');
    /**
     * Webpack HMR Setup.
     */

    const HMRRenderer = Component => {
      if (isProduction) component.loadableReady(() => {
        hydrateRoot(documentRoot, Component);
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

    const qs = queryString.parse(window.location.search);
<<<<<<< HEAD
    const versionStatus = ContensisDeliveryApi.deliveryApi.getClientSideVersionStatus();

=======
    const versionStatus = SSRContext.deliveryApi.getClientSideVersionStatus();
>>>>>>> master
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
exports.default = ClientApp;
//# sourceMappingURL=client.js.map
