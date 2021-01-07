'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('isomorphic-fetch');
var Loadable = require('react-loadable');
var React = require('react');
var reactRouterDom = require('react-router-dom');
var reactRedux = require('react-redux');
var immutable = require('immutable');
require('history');
var App = require('./App-6ddd48f6.js');
require('contensis-delivery-api');
var routing = require('./routing-6197a03e.js');
require('redux');
require('redux-immutable');
require('redux-thunk');
require('redux-saga');
var version = require('./version-7fdcc2c0.js');
var login = require('./login-8b061a53.js');
var queryString = require('query-string');
require('redux-saga/effects');
require('loglevel');
require('./ToJs-8f6b21c9.js');
require('contensis-management-api');
require('jsonpath-mapper');
require('await-to-js');
require('js-cookie');
require('react-router-config');
var reactHotLoader = require('react-hot-loader');
require('prop-types');
require('./RouteLoader-72de4da1.js');
var reactDom = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var queryString__default = /*#__PURE__*/_interopDefaultLegacy(queryString);

class ClientApp {
  constructor(ReactApp, config) {
    const documentRoot = document.getElementById('root');
    const {
      routes,
      withReducers,
      withSagas,
      withEvents
    } = config;

    const GetClientJSX = store => {
      const ClientJsx = React__default['default'].createElement(reactHotLoader.AppContainer, null, React__default['default'].createElement(reactRedux.Provider, {
        store: store
      }, React__default['default'].createElement(reactRouterDom.Router, {
        history: App.browserHistory
      }, React__default['default'].createElement(ReactApp, {
        routes: routes,
        withEvents: withEvents
      }))));
      return ClientJsx;
    };

    const isProduction = !(process.env.NODE_ENV != 'production');
    /**
     * Webpack HMR Setup.
     */

    const HMRRenderer = Component => {
      Loadable.preloadReady().then(() => {
        isProduction ? reactDom.hydrate(Component, documentRoot) : reactDom.render(Component, documentRoot);
      });
    };

    let store = null;
    const qs = queryString__default['default'].parse(window.location.search);
    const versionStatusFromHostname = App.deliveryApi.getClientSideVersionStatus();

    if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
      store = App.createStore(withReducers, login.fromJSOrdered(window.REDUX_DATA), App.browserHistory);
      store.dispatch(version.setVersionStatus(qs.versionStatus || versionStatusFromHostname));
      /* eslint-disable no-console */

      console.log('Hydrating from inline Redux');
      /* eslint-enable no-console */

      store.runSaga(App.rootSaga(withSagas));
      store.dispatch(routing.setCurrentProject(App.pickProject(window.location.hostname, qs)));
      delete window.REDUX_DATA;
      HMRRenderer(GetClientJSX(store));
    } else {
      fetch(`${window.location.pathname}?redux=true`).then(response => response.json()).then(data => {
        /* eslint-disable no-console */
        //console.log('Got Data Back');
        // console.log(data);

        /* eslint-enable no-console */
        const ssRedux = JSON.parse(data);
        store = App.createStore(withReducers, immutable.fromJS(ssRedux), App.browserHistory); // store.dispatch(setVersionStatus(versionStatusFromHostname));

        store.runSaga(App.rootSaga(withSagas));
        store.dispatch(routing.setCurrentProject(App.pickProject(window.location.hostname, queryString__default['default'].parse(window.location.search)))); // if (typeof window != 'undefined') {
        //   store.dispatch(checkUserLoggedIn());
        // }

        HMRRenderer(GetClientJSX(store));
      });
    } // webpack Hot Module Replacement API


    if (module.hot) {
      module.hot.accept(ReactApp, () => {
        // if you are using harmony modules ({modules:false})
        HMRRenderer(GetClientJSX(store));
      });
    }
  }

}

exports.ReactApp = App.AppRoot;
exports.default = ClientApp;
//# sourceMappingURL=client.js.map
