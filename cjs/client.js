'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('isomorphic-fetch');
var React = require('react');
var reactDom = require('react-dom');
var reactRouterDom = require('react-router-dom');
var Loadable = require('react-loadable');
var reactHotLoader = require('react-hot-loader');
var reactRedux = require('react-redux');
var queryString = require('query-string');
var version = require('./version-10dcc7ba.js');
var App = require('./App-3e6d10af.js');
var actions = require('./actions-c701de06.js');
var reducers = require('./reducers-0ea95da5.js');
require('@redux-saga/core/effects');
require('redux');
require('redux-immutable');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
require('immutable');
require('history');
require('contensis-delivery-api');
require('./version-2193b4a2.js');
require('./selectors-1295124a.js');
require('loglevel');
require('./login-b46b6903.js');
require('./ToJs-22e646c5.js');
require('jsonpath-mapper');
require('await-to-js');
require('js-cookie');
require('./RouteLoader-6356c667.js');
require('react-router-config');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var queryString__namespace = /*#__PURE__*/_interopNamespace(queryString);

const fromJSLeaveImmer = js => {
  // console.info(js);
  // if (typeof js !== 'object' || js === null) return js;
  // // console.info(`from js - here is js ${JSON.stringify(js)}`);
  // const convertedObject = isOrdered ? OrderedMap() : fromJS({});
  // const keys = Object.keys(js);
  // keys.forEach(key => {
  //   if (key === 'immer') {
  //     convertedObject.set(key, js[key]);
  //     // console.info(`LOOK! - immer untouched bar root key "${key}"`);
  //   } else {
  //     // console.info(`LOOK! - normal immutable feature "${key}"`);
  //     convertedObject.set(key, isOrdered ? fromJSOrdered(js) : fromJS(js));
  //   }
  // });
  const immutableObj = reducers.fromJSOrdered(js);

  if (immutableObj && !!immutableObj.get('immer')) {
    immutableObj.set('immer', immutableObj.get('immer').toJS());
  }

  return immutableObj;
};

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
      const ClientJsx = /*#__PURE__*/React__default['default'].createElement(reactHotLoader.AppContainer, null, /*#__PURE__*/React__default['default'].createElement(reactRedux.Provider, {
        store: store
      }, /*#__PURE__*/React__default['default'].createElement(reactRouterDom.Router, {
        history: App.browserHistory
      }, /*#__PURE__*/React__default['default'].createElement(ReactApp, {
        routes: routes,
        withEvents: withEvents
      }))));
      return ClientJsx;
    };

    const isProduction = !(process.env.NODE_ENV !== 'production');
    /**
     * Webpack HMR Setup.
     */

    const HMRRenderer = Component => {
      Loadable.preloadReady().then(() => {
        if (isProduction) reactDom.hydrate(Component, documentRoot);else reactDom.render(Component, documentRoot);
      });
    };

    let store = null;
    const qs = queryString__namespace.parse(window.location.search);
    const versionStatusFromHostname = App.deliveryApi.getClientSideVersionStatus();

    if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
      store = version.createStore(withReducers, fromJSLeaveImmer(window.REDUX_DATA), App.browserHistory);
      store.dispatch(version.setVersionStatus(qs.versionStatus || versionStatusFromHostname));
      /* eslint-disable no-console */

      console.log('Hydrating from inline Redux');
      /* eslint-enable no-console */

      store.runSaga(App.rootSaga(withSagas));
      store.dispatch(actions.setCurrentProject(App.pickProject(window.location.hostname, qs), [], window.location.hostname));
      delete window.REDUX_DATA;
      HMRRenderer(GetClientJSX(store));
    } else {
      fetch(`${window.location.pathname}?redux=true`).then(response => response.json()).then(data => {
        /* eslint-disable no-console */
        // console.log('Got Data Back');
        // console.log(data);

        /* eslint-enable no-console */
        const ssRedux = JSON.parse(data);
        store = version.createStore(withReducers, fromJSLeaveImmer(ssRedux), App.browserHistory); // store.dispatch(setVersionStatus(versionStatusFromHostname));

        store.runSaga(App.rootSaga(withSagas));
        store.dispatch(actions.setCurrentProject(App.pickProject(window.location.hostname, queryString__namespace.parse(window.location.search)), [], window.location.hostname)); // if (typeof window != 'undefined') {
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
exports['default'] = ClientApp;
//# sourceMappingURL=client.js.map
