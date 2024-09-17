import 'isomorphic-fetch';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { parse } from 'query-string';
import { CookiesProvider } from 'react-cookie';
import { s as selectVersionStatus } from './version-DtJjY5QT.js';
import { s as setVersionStatus } from './version-cetMyLmp.js';
import { b as browserHistory, r as rootSaga, p as pickProject } from './App-BpGG43cE.js';
export { A as ReactApp } from './App-BpGG43cE.js';
import { c as createStore } from './store-BX4iG2-k.js';
import { s as setCurrentProject } from './selectors-CAjGfIyu.js';
import { d as deliveryApi, S as SSRContextProvider } from './SSRContext-aOrFy6DJ.js';
import '@redux-saga/core/effects';
import 'history';
import 'loglevel';
import 'await-to-js';
import './ChangePassword.container-6SpIHof-.js';
import './ToJs-8AwNF3Q4.js';
import 'jsonpath-mapper';
import './CookieHelper.class-DqJ_o1jL.js';
import 'contensis-delivery-api';
import './RouteLoader-CYib224B.js';
import 'react-router-config';
import 'reselect';
import 'redux';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors';
import 'immer';

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
      }, /*#__PURE__*/React.createElement(SSRContextProvider, null, /*#__PURE__*/React.createElement(ReactApp, {
        routes: routes,
        withEvents: withEvents
      }))))));
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
