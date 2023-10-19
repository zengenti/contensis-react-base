import 'isomorphic-fetch';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { parse } from 'query-string';
import { CookiesProvider } from 'react-cookie';
import { c as createStore, s as selectVersionStatus } from './version-6cc0418c.js';
import { s as setVersionStatus } from './version-ec722079.js';
import { b as browserHistory, r as rootSaga, p as pickProject } from './App-cdcedf62.js';
export { A as ReactApp } from './App-cdcedf62.js';
import { c as setCurrentProject } from './selectors-1a3c1725.js';
import { d as deliveryApi } from './ContensisDeliveryApi-91398551.js';
import 'redux';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors';
import 'immer';
import 'deepmerge';
import './reducers-3d5c37d1.js';
import '@redux-saga/core/effects';
import 'history';
import 'loglevel';
import 'await-to-js';
import './login-950e0b92.js';
import './ToJs-e1af7030.js';
import 'jsonpath-mapper';
import './CookieConstants-3d3b6531.js';
import 'contensis-delivery-api';
import './RouteLoader-d36840dd.js';
import 'react-router-config';
import 'reselect';
import './CookieHelper.class-4d6ee27b.js';

// Fix TS2769 error No overload matches this call
const Container = AppContainer; // as typeof AppContainer;

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
      const ClientJsx = /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(CookiesProvider, null, /*#__PURE__*/React.createElement(Provider, {
        store: store
      }, /*#__PURE__*/React.createElement(Router, {
        history: browserHistory
      }, /*#__PURE__*/React.createElement(ReactApp, {
        routes: routes,
        withEvents: withEvents
      })))));
      return ClientJsx;
    };
    const isProduction = !(process.env.NODE_ENV !== 'production');

    /**
     * Webpack HMR Setup.
     */
    const HMRRenderer = Component => {
      if (isProduction) loadableReady(() => {
        hydrate(Component, documentRoot);
      }, {
        namespace: 'modern'
      });else render(Component, documentRoot);
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
