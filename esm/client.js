import 'isomorphic-fetch';
import { preloadReady } from 'react-loadable';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import 'history';
<<<<<<< HEAD
import { d as deliveryApi, c as createStore, r as rootSaga, p as pickProject, b as browserHistory } from './App-5f6ef07c.js';
export { A as ReactApp } from './App-5f6ef07c.js';
import 'contensis-delivery-api';
import { s as setCurrentProject } from './routing-8265aea1.js';
=======
import { a as GetClientSideDeliveryApiStatus, c as createStore, r as rootSaga, p as pickProject, b as browserHistory } from './App-8928dd94.js';
export { A as ReactApp } from './App-8928dd94.js';
import 'contensis-delivery-api';
import './selectors-19e46385.js';
import { s as setCurrentProject } from './routing-8a773443.js';
import { s as setVersionStatus } from './navigation-a6d0c98f.js';
import queryString from 'query-string';
>>>>>>> isomorphic-base
import 'redux';
import 'redux-immutable';
import 'redux-thunk';
import 'redux-saga';
<<<<<<< HEAD
import { s as setVersionStatus } from './version-9c4c6e0e.js';
import { f as fromJSOrdered } from './login-a6f157c3.js';
import queryString from 'query-string';
=======
import './sagas-30af639f.js';
>>>>>>> isomorphic-base
import 'redux-saga/effects';
import 'loglevel';
import './ToJs-1c73b10a.js';
import 'contensis-management-api';
import 'jsonpath-mapper';
import 'await-to-js';
import 'js-cookie';
import 'react-router-config';
import { AppContainer } from 'react-hot-loader';
import 'prop-types';
<<<<<<< HEAD
import './RouteLoader-b1969ecd.js';
=======
import './RouteLoader-888c3c9e.js';
>>>>>>> isomorphic-base
import { hydrate, render } from 'react-dom';

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
      const ClientJsx = React.createElement(AppContainer, null, React.createElement(Provider, {
        store: store
      }, React.createElement(Router, {
        history: browserHistory
      }, React.createElement(ReactApp, {
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
      preloadReady().then(() => {
        isProduction ? hydrate(Component, documentRoot) : render(Component, documentRoot);
      });
    };

    let store = null;
    const qs = queryString.parse(window.location.search);
    const versionStatusFromHostname = deliveryApi.getClientSideVersionStatus();

    if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
      store = createStore(withReducers, fromJSOrdered(window.REDUX_DATA), browserHistory);
      store.dispatch(setVersionStatus(qs.versionStatus || versionStatusFromHostname));
      /* eslint-disable no-console */

      console.log('Hydrating from inline Redux');
      /* eslint-enable no-console */

      store.runSaga(rootSaga(withSagas));
      store.dispatch(setCurrentProject(pickProject(window.location.hostname, qs)));
      delete window.REDUX_DATA;
      HMRRenderer(GetClientJSX(store));
    } else {
      fetch(`${window.location.pathname}?redux=true`).then(response => response.json()).then(data => {
        /* eslint-disable no-console */
        //console.log('Got Data Back');
        // console.log(data);

        /* eslint-enable no-console */
        const ssRedux = JSON.parse(data);
        store = createStore(withReducers, fromJS(ssRedux), browserHistory); // store.dispatch(setVersionStatus(versionStatusFromHostname));

        store.runSaga(rootSaga(withSagas));
        store.dispatch(setCurrentProject(pickProject(window.location.hostname, queryString.parse(window.location.search)))); // if (typeof window != 'undefined') {
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

export default ClientApp;
//# sourceMappingURL=client.js.map
