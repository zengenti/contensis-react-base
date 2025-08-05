'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('isomorphic-fetch');
var React = require('react');
var require$$0 = require('react-dom');
var reactRedux = require('react-redux');
var reactRouterDom = require('react-router-dom');
var component = require('@loadable/component');
var queryString = require('query-string');
var reactCookie = require('react-cookie');
var version = require('./version-BolvQdgT.js');
var version$1 = require('./version-DabwEeLw.js');
var App = require('./App-DVS2q_Pq.js');
var store = require('./store-CO5xslDu.js');
var selectors = require('./selectors-Bp_TrwG5.js');
var SSRContext = require('./SSRContext-CWFBN3dJ.js');
require('@redux-saga/core/effects');
require('history');
require('loglevel');
require('await-to-js');
require('./ChangePassword.container-D0wZ05E-.js');
require('./ToJs-CAVkiz9f.js');
require('jsonpath-mapper');
require('./CookieHelper.class-C3Eqoze9.js');
require('contensis-delivery-api');
require('./RouteLoader-TsLMOQxl.js');
require('reselect');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors-19');
require('immer');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var require$$0__default = /*#__PURE__*/_interopDefault(require$$0);

var client = {};

var hasRequiredClient;

function requireClient () {
	if (hasRequiredClient) return client;
	hasRequiredClient = 1;

	var m = require$$0__default.default;
	if (process.env.NODE_ENV === 'production') {
	  client.createRoot = m.createRoot;
	  client.hydrateRoot = m.hydrateRoot;
	} else {
	  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
	  client.createRoot = function(c, o) {
	    i.usingClientEntryPoint = true;
	    try {
	      return m.createRoot(c, o);
	    } finally {
	      i.usingClientEntryPoint = false;
	    }
	  };
	  client.hydrateRoot = function(c, h, o) {
	    i.usingClientEntryPoint = true;
	    try {
	      return m.hydrateRoot(c, h, o);
	    } finally {
	      i.usingClientEntryPoint = false;
	    }
	  };
	}
	return client;
}

var clientExports = requireClient();

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
        clientExports.hydrateRoot(documentRoot, Component, {
          onRecoverableError(error) {
            console.warn('Hydration warning:', error);
          }
        });
      }, {
        namespace: 'modern'
      });else clientExports.createRoot(documentRoot).render(Component);
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
    if (isDev || window.isDynamic || window.REDUX_DATA) {
      store.createStore(withReducers, window.REDUX_DATA, App.browserHistory, stateType).then(store => {
        const state = store.getState();
        const ssrVersionStatus = version.selectVersionStatus(state);
        if (!ssrVersionStatus) store.dispatch(version$1.setVersionStatus(versionStatus));
        console.log('Hydrating from inline Redux');
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
