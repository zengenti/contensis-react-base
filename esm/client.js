import 'isomorphic-fetch';
import { preloadReady } from 'react-loadable';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'immutable';
import 'history';
<<<<<<< HEAD
<<<<<<< HEAD
import { d as deliveryApi, r as rootSaga, p as pickProject, b as browserHistory } from './App-fe3cbef7.js';
export { A as ReactApp } from './App-fe3cbef7.js';
=======
import { d as deliveryApi, r as rootSaga, p as pickProject, b as browserHistory } from './App-8fb39c30.js';
export { A as ReactApp } from './App-8fb39c30.js';
>>>>>>> 10419d5... commit bundles
=======
import { d as deliveryApi, r as rootSaga, p as pickProject, b as browserHistory } from './App-f18514f6.js';
export { A as ReactApp } from './App-f18514f6.js';
>>>>>>> bf47c62... chore: Commit bundles
import 'contensis-delivery-api';
import { s as setCurrentProject } from './routing-3bbf9dde.js';
import 'redux';
import 'redux-immutable';
import 'redux-thunk';
import 'redux-saga';
<<<<<<< HEAD
<<<<<<< HEAD
import { c as createStore, s as setVersionStatus } from './navigation-ec4d9a28.js';
import { f as fromJSOrdered } from './reducers-ed7581c0.js';
=======
import { c as createStore, s as setVersionStatus } from './version-c359e3cb.js';
import { l as fromJSOrdered } from './reducers-29d0efa9.js';
>>>>>>> 10419d5... commit bundles
=======
import { c as createStore, s as setVersionStatus } from './version-c113fd8d.js';
import { l as fromJSOrdered } from './reducers-6d9b6c51.js';
>>>>>>> bf47c62... chore: Commit bundles
import queryString from 'query-string';
import './routing-786c3bb0.js';
import '@redux-saga/core/effects';
import './version-924cf045.js';
import 'loglevel';
<<<<<<< HEAD
<<<<<<< HEAD
import './ToJs-020d9abb.js';
import './login-4324e2fc.js';
=======
import './ToJs-7da4413c.js';
import './login-96837dda.js';
>>>>>>> 10419d5... commit bundles
=======
import './ToJs-dea75c6f.js';
import './login-125acea2.js';
>>>>>>> bf47c62... chore: Commit bundles
import 'jsonpath-mapper';
import 'await-to-js';
import 'js-cookie';
import 'react-router-config';
import { AppContainer } from 'react-hot-loader';
import 'prop-types';
<<<<<<< HEAD
<<<<<<< HEAD
import './RouteLoader-66a2c27f.js';
=======
import './RouteLoader-f026dc83.js';
>>>>>>> 10419d5... commit bundles
=======
import './RouteLoader-7a4e8463.js';
>>>>>>> bf47c62... chore: Commit bundles
import { hydrate, render } from 'react-dom';

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
      store = createStore(withReducers, fromJSLeaveImmer(window.REDUX_DATA), browserHistory);
      store.dispatch(setVersionStatus(qs.versionStatus || versionStatusFromHostname));
      /* eslint-disable no-console */

      console.log('Hydrating from inline Redux');
      /* eslint-enable no-console */

      store.runSaga(rootSaga(withSagas));
      store.dispatch(setCurrentProject(pickProject(window.location.hostname, qs), [], window.location.hostname));
      delete window.REDUX_DATA;
      HMRRenderer(GetClientJSX(store));
    } else {
      fetch(`${window.location.pathname}?redux=true`).then(response => response.json()).then(data => {
        /* eslint-disable no-console */
        //console.log('Got Data Back');
        // console.log(data);

        /* eslint-enable no-console */
        const ssRedux = JSON.parse(data);
        store = createStore(withReducers, fromJSLeaveImmer(ssRedux), browserHistory); // store.dispatch(setVersionStatus(versionStatusFromHostname));

        store.runSaga(rootSaga(withSagas));
        store.dispatch(setCurrentProject(pickProject(window.location.hostname, queryString.parse(window.location.search)), [], window.location.hostname)); // if (typeof window != 'undefined') {
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
