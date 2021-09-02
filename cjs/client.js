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
var version = require('./version-3ca577be.js');
var App = require('./App-af2f2f50.js');
var actions = require('./actions-0e6615b5.js');
var immutable = require('immutable');
require('./RouteLoader-827f4468.js');
require('@redux-saga/core/effects');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
require('immer');
require('./reducers-3f2c29e6.js');
require('history');
require('contensis-delivery-api');
require('./version-89d6400c.js');
require('./selectors-5085f27f.js');
require('loglevel');
require('./login-f4ec010d.js');
require('./ToJs-f968ac6c.js');
require('jsonpath-mapper');
require('await-to-js');
require('js-cookie');
require('prop-types');
require('react-router-config');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var queryString__default = /*#__PURE__*/_interopDefaultLegacy(queryString);

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? immutable.Seq(js).map(fromJSOrdered).toList() : immutable.Seq(js).map(fromJSOrdered).toOrderedMap();
};

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
  const immutableObj = fromJSOrdered(js);

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
        //console.log('Got Data Back');
        // console.log(data);

        /* eslint-enable no-console */
        const ssRedux = JSON.parse(data);
        store = version.createStore(withReducers, fromJSLeaveImmer(ssRedux), App.browserHistory); // store.dispatch(setVersionStatus(versionStatusFromHostname));

        store.runSaga(App.rootSaga(withSagas));
        store.dispatch(actions.setCurrentProject(App.pickProject(window.location.hostname, queryString__default['default'].parse(window.location.search)), [], window.location.hostname)); // if (typeof window != 'undefined') {
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
