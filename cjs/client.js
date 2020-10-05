'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('isomorphic-fetch');
var Loadable = require('react-loadable');
var React = require('react');
var require$$9 = require('react-router-dom');
var require$$4 = require('react-redux');
var require$$0 = require('immutable');
require('history');
var App = require('./App-29c48e39.js');
require('contensis-delivery-api');
var routing = require('./routing-b229b3c4.js');
require('redux');
require('redux-immutable');
require('redux-thunk');
require('redux-saga');
var navigation = require('./navigation-8a94ff72.js');
var queryString = require('query-string');
require('redux-saga/effects');
require('loglevel');
require('react-router-config');
var require$$10 = require('react-hot-loader');
require('prop-types');
require('./RouteLoader-5287f321.js');
var reactDom = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var queryString__default = /*#__PURE__*/_interopDefaultLegacy(queryString);

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? require$$0.Seq(js).map(fromJSOrdered).toList() : require$$0.Seq(js).map(fromJSOrdered).toOrderedMap();
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
      const ClientJsx = React__default['default'].createElement(require$$10.AppContainer, null, React__default['default'].createElement(require$$4.Provider, {
        store: store
      }, React__default['default'].createElement(require$$9.Router, {
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
      store = App.createStore(withReducers, fromJSOrdered(window.REDUX_DATA), App.browserHistory);
      store.dispatch(navigation.setVersionStatus(qs.versionStatus || versionStatusFromHostname));
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
        store = App.createStore(withReducers, require$$0.fromJS(ssRedux), App.browserHistory); // store.dispatch(setVersionStatus(versionStatusFromHostname));

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
