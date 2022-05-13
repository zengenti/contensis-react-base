import 'isomorphic-fetch';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import * as queryString from 'query-string';
import { CookiesProvider } from 'react-cookie';
import { c as createStore, s as setVersionStatus } from './version-38ccf374.js';
import { d as deliveryApi, b as browserHistory, r as rootSaga, p as pickProject } from './App-e8b3aa57.js';
export { A as ReactApp } from './App-e8b3aa57.js';
import { s as setCurrentProject } from './actions-fcfc8704.js';
import './selectors-337be432.js';
import 'jsonpath-mapper';
import '@redux-saga/core/effects';
import 'redux';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors';
import 'immer';
import 'deepmerge';
import './reducers-8e5d6232.js';
import 'history';
import 'contensis-delivery-api';
import './version-6dd7b2cd.js';
import 'loglevel';
import './login-d00da7b6.js';
import './ToJs-fcfaca09.js';
import 'await-to-js';
import 'js-cookie';
import './RouteLoader-d6cace78.js';
import 'reselect';

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
      const ClientJsx = /*#__PURE__*/React.createElement(AppContainer, null, /*#__PURE__*/React.createElement(CookiesProvider, null, /*#__PURE__*/React.createElement(Provider, {
        store: store
      }, /*#__PURE__*/React.createElement(BrowserRouter, null, /*#__PURE__*/React.createElement(ReactApp, {
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

    const qs = queryString.parse(window.location.search);
    const versionStatusFromHostname = deliveryApi.getClientSideVersionStatus();

    if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
      createStore(withReducers, window.REDUX_DATA, browserHistory, stateType).then(store => {
        store.dispatch(setVersionStatus(qs.versionStatus || versionStatusFromHostname));
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
          store.dispatch(setVersionStatus(qs.versionStatus || versionStatusFromHostname));
          store.runSaga(rootSaga(withSagas));
          store.dispatch(setCurrentProject(pickProject(window.location.hostname, queryString.parse(window.location.search)), [], window.location.hostname));
          HMRRenderer(GetClientJSX(store));
          hmr(store);
        });
      });
    }
  }

}

export { ClientApp as default };
//# sourceMappingURL=client.js.map
