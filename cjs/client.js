'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('isomorphic-fetch');
var Loadable = require('react-loadable');
var React = require('react');
var reactRouterDom = require('react-router-dom');
var reactRedux = require('react-redux');
require('react-router-config');
require('jsonpath-mapper');
require('immutable');
<<<<<<< HEAD
=======
require('history');
var App = require('./App-a3a3c76c.js');
require('contensis-delivery-api');
var routing = require('./routing-a4d7b382.js');
>>>>>>> contensis-14-forgot-change-password
require('redux');
require('redux-immutable');
require('redux-thunk');
require('redux-saga');
<<<<<<< HEAD
require('redux-injectors');
var version = require('./version-d8f5b436.js');
var actions = require('./actions-e22726ed.js');
var reducers = require('./reducers-c42035ab.js');
require('history');
var App = require('./App-07b8a25d.js');
=======
var navigation = require('./navigation-8c90cb78.js');
var reducers = require('./reducers-0b34eca8.js');
var queryString = require('query-string');
require('./routing-5db2c867.js');
>>>>>>> contensis-14-forgot-change-password
require('@redux-saga/core/effects');
require('contensis-delivery-api');
require('./version-2193b4a2.js');
var queryString = require('query-string');
require('./selectors-69c3d37c.js');
require('loglevel');
<<<<<<< HEAD
require('./ToJs-ca9bea03.js');
require('./login-6eb5e46d.js');
=======
require('./ToJs-5091048a.js');
require('./login-93c36858.js');
require('jsonpath-mapper');
>>>>>>> contensis-14-forgot-change-password
require('await-to-js');
require('js-cookie');
var reactHotLoader = require('react-hot-loader');
require('prop-types');
<<<<<<< HEAD
require('./RouteLoader-5c44f039.js');
=======
require('./RouteLoader-ee532d78.js');
>>>>>>> contensis-14-forgot-change-password
var reactDom = require('react-dom');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

<<<<<<< HEAD
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
=======
var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
var queryString__default = /*#__PURE__*/ _interopDefaultLegacy(queryString);
>>>>>>> contensis-14-forgot-change-password

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
    const { routes, withReducers, withSagas, withEvents } = config;

    const GetClientJSX = store => {
<<<<<<< HEAD
      const ClientJsx = /*#__PURE__*/React__default['default'].createElement(reactHotLoader.AppContainer, null, /*#__PURE__*/React__default['default'].createElement(reactRedux.Provider, {
        store: store
      }, /*#__PURE__*/React__default['default'].createElement(reactRouterDom.Router, {
        history: App.browserHistory
      }, /*#__PURE__*/React__default['default'].createElement(ReactApp, {
        routes: routes,
        withEvents: withEvents
      }))));
=======
      const ClientJsx = React__default['default'].createElement(
        reactHotLoader.AppContainer,
        null,
        React__default['default'].createElement(
          reactRedux.Provider,
          {
            store: store,
          },
          React__default['default'].createElement(
            reactRouterDom.Router,
            {
              history: App.browserHistory,
            },
            React__default['default'].createElement(ReactApp, {
              routes: routes,
              withEvents: withEvents,
            })
          )
        )
      );
>>>>>>> contensis-14-forgot-change-password
      return ClientJsx;
    };

    const isProduction = !(process.env.NODE_ENV !== 'production');
    /**
     * Webpack HMR Setup.
     */

    const HMRRenderer = Component => {
      Loadable.preloadReady().then(() => {
<<<<<<< HEAD
        if (isProduction) reactDom.hydrate(Component, documentRoot);else reactDom.render(Component, documentRoot);
=======
        isProduction
          ? reactDom.hydrate(Component, documentRoot)
          : reactDom.render(Component, documentRoot);
>>>>>>> contensis-14-forgot-change-password
      });
    };

    let store = null;
    const qs = queryString.parse(window.location.search);
    const versionStatusFromHostname = App.deliveryApi.getClientSideVersionStatus();

<<<<<<< HEAD
    if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
      store = version.createStore(withReducers, fromJSLeaveImmer(window.REDUX_DATA), App.browserHistory);
      store.dispatch(version.setVersionStatus(qs.versionStatus || versionStatusFromHostname));
=======
    if (
      window.isDynamic ||
      window.REDUX_DATA ||
      process.env.NODE_ENV !== 'production'
    ) {
      store = navigation.createStore(
        withReducers,
        fromJSLeaveImmer(window.REDUX_DATA),
        App.browserHistory
      );
      store.dispatch(
        navigation.setVersionStatus(
          qs.versionStatus || versionStatusFromHostname
        )
      );
>>>>>>> contensis-14-forgot-change-password
      /* eslint-disable no-console */

      console.log('Hydrating from inline Redux');
      /* eslint-enable no-console */

      store.runSaga(App.rootSaga(withSagas));
<<<<<<< HEAD
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
        store.dispatch(actions.setCurrentProject(App.pickProject(window.location.hostname, queryString.parse(window.location.search)), [], window.location.hostname)); // if (typeof window != 'undefined') {
        //   store.dispatch(checkUserLoggedIn());
        // }

        HMRRenderer(GetClientJSX(store));
      });
=======
      store.dispatch(
        routing.setCurrentProject(
          App.pickProject(window.location.hostname, qs),
          [],
          window.location.hostname
        )
      );
      delete window.REDUX_DATA;
      HMRRenderer(GetClientJSX(store));
    } else {
      fetch(`${window.location.pathname}?redux=true`)
        .then(response => response.json())
        .then(data => {
          /* eslint-disable no-console */
          //console.log('Got Data Back');
          // console.log(data);

          /* eslint-enable no-console */
          const ssRedux = JSON.parse(data);
          store = navigation.createStore(
            withReducers,
            fromJSLeaveImmer(ssRedux),
            App.browserHistory
          ); // store.dispatch(setVersionStatus(versionStatusFromHostname));

          store.runSaga(App.rootSaga(withSagas));
          store.dispatch(
            routing.setCurrentProject(
              App.pickProject(
                window.location.hostname,
                queryString__default['default'].parse(window.location.search)
              ),
              [],
              window.location.hostname
            )
          ); // if (typeof window != 'undefined') {
          //   store.dispatch(checkUserLoggedIn());
          // }

          HMRRenderer(GetClientJSX(store));
        });
>>>>>>> contensis-14-forgot-change-password
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
