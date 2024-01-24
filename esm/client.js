import 'isomorphic-fetch';
import React from 'react';
import require$$0 from 'react-dom';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { parse } from 'query-string';
import { CookiesProvider } from 'react-cookie';
import { c as createStore, s as selectVersionStatus } from './version-3d9911e2.js';
import { s as setVersionStatus } from './version-9f29becb.js';
import { b as browserHistory, r as rootSaga, p as pickProject } from './App-83107d7e.js';
export { A as ReactApp } from './App-83107d7e.js';
import { c as setCurrentProject } from './selectors-691caf02.js';
import { d as deliveryApi } from './ContensisDeliveryApi-fe57a037.js';
import 'redux';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors';
import 'immer';
import './reducers-aa8cef1e.js';
import '@redux-saga/core/effects';
import 'history';
import 'loglevel';
import 'await-to-js';
import './ChangePassword.container-76fd5e9b.js';
import './ToJs-df57f31d.js';
import 'jsonpath-mapper';
import './CookieConstants-3d3b6531.js';
import 'contensis-delivery-api';
import './RouteLoader-29fd689a.js';
import 'reselect';

var hydrateRoot;
var createRoot;

var m = require$$0;
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
      const ClientJsx = /*#__PURE__*/React.createElement(CookiesProvider, null, /*#__PURE__*/React.createElement(Provider, {
        store: store
      }, /*#__PURE__*/React.createElement(unstable_HistoryRouter, {
        history: browserHistory
      }, /*#__PURE__*/React.createElement(ReactApp, {
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
      if (isProduction) loadableReady(() => {
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

    const qs = parse(window.location.search);
    const versionStatus = deliveryApi.getClientSideVersionStatus();

    if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
      createStore(withReducers, window.REDUX_DATA, browserHistory, stateType).then(store => {
        const state = store.getState();
        const ssrVersionStatus = selectVersionStatus(state);
        if (!ssrVersionStatus) store.dispatch(setVersionStatus(versionStatus));
        /* eslint-disable no-console */

        console.log('Hydrating from inline Redux');
        /* eslint-enable no-console */

        store.runSaga(rootSaga(withSagas));
        store.dispatch(setCurrentProject(pickProject(window.location.hostname, qs), [], window.location.hostname));
        delete window.REDUX_DATA;
        HMRRenderer(GetClientJSX(store));
        hmr(store);
      });
    } else {
      fetch(`${window.location.pathname}?redux=true`).then(response => response.json()).then(data => {
        const ssRedux = JSON.parse(data);
        createStore(withReducers, ssRedux, browserHistory, stateType).then(store => {
          store.dispatch(setVersionStatus(versionStatus));
          store.runSaga(rootSaga(withSagas));
          store.dispatch(setCurrentProject(pickProject(window.location.hostname, qs), [], window.location.hostname));
          HMRRenderer(GetClientJSX(store));
          hmr(store);
        });
      });
    }
  }

}

export { ClientApp as default };
//# sourceMappingURL=client.js.map
