import 'isomorphic-fetch';
import { preloadReady } from 'react-loadable';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-router-config';
import 'jsonpath-mapper';
import 'immutable';
<<<<<<< HEAD
=======
import 'history';
import {
  d as deliveryApi,
  r as rootSaga,
  p as pickProject,
  b as browserHistory,
} from './App-22e32eea.js';
export { A as ReactApp } from './App-22e32eea.js';
import 'contensis-delivery-api';
import { s as setCurrentProject } from './routing-3bbf9dde.js';
>>>>>>> contensis-14-forgot-change-password
import 'redux';
import 'redux-immutable';
import 'redux-thunk';
import 'redux-saga';
<<<<<<< HEAD
import 'redux-injectors';
import { c as createStore, s as setVersionStatus } from './version-8d757fb4.js';
import { s as setCurrentProject } from './actions-fda5e103.js';
import { f as fromJSOrdered } from './reducers-b426d14a.js';
import 'history';
import { d as deliveryApi, r as rootSaga, p as pickProject, b as browserHistory } from './App-6df89333.js';
export { A as ReactApp } from './App-6df89333.js';
=======
import {
  c as createStore,
  s as setVersionStatus,
} from './navigation-7e82dea2.js';
import { o as fromJSOrdered } from './reducers-7c4796b0.js';
import queryString from 'query-string';
import './routing-786c3bb0.js';
>>>>>>> contensis-14-forgot-change-password
import '@redux-saga/core/effects';
import 'contensis-delivery-api';
import './version-7fdbd2d5.js';
import { parse } from 'query-string';
import './selectors-170581d2.js';
import 'loglevel';
<<<<<<< HEAD
import './ToJs-19a3244a.js';
import './login-866fe64c.js';
=======
import './ToJs-bf49708e.js';
import './login-2701d3cb.js';
import 'jsonpath-mapper';
>>>>>>> contensis-14-forgot-change-password
import 'await-to-js';
import 'js-cookie';
import { AppContainer } from 'react-hot-loader';
import 'prop-types';
<<<<<<< HEAD
import './RouteLoader-2cfdfc5c.js';
=======
import './RouteLoader-b60ba6b7.js';
>>>>>>> contensis-14-forgot-change-password
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
    const { routes, withReducers, withSagas, withEvents } = config;

    const GetClientJSX = store => {
<<<<<<< HEAD
      const ClientJsx = /*#__PURE__*/React.createElement(AppContainer, null, /*#__PURE__*/React.createElement(Provider, {
        store: store
      }, /*#__PURE__*/React.createElement(Router, {
        history: browserHistory
      }, /*#__PURE__*/React.createElement(ReactApp, {
        routes: routes,
        withEvents: withEvents
      }))));
=======
      const ClientJsx = React.createElement(
        AppContainer,
        null,
        React.createElement(
          Provider,
          {
            store: store,
          },
          React.createElement(
            Router,
            {
              history: browserHistory,
            },
            React.createElement(ReactApp, {
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
      preloadReady().then(() => {
<<<<<<< HEAD
        if (isProduction) hydrate(Component, documentRoot);else render(Component, documentRoot);
=======
        isProduction
          ? hydrate(Component, documentRoot)
          : render(Component, documentRoot);
>>>>>>> contensis-14-forgot-change-password
      });
    };

    let store = null;
    const qs = parse(window.location.search);
    const versionStatusFromHostname = deliveryApi.getClientSideVersionStatus();

    if (
      window.isDynamic ||
      window.REDUX_DATA ||
      process.env.NODE_ENV !== 'production'
    ) {
      store = createStore(
        withReducers,
        fromJSLeaveImmer(window.REDUX_DATA),
        browserHistory
      );
      store.dispatch(
        setVersionStatus(qs.versionStatus || versionStatusFromHostname)
      );
      /* eslint-disable no-console */

      console.log('Hydrating from inline Redux');
      /* eslint-enable no-console */

      store.runSaga(rootSaga(withSagas));
      store.dispatch(
        setCurrentProject(
          pickProject(window.location.hostname, qs),
          [],
          window.location.hostname
        )
      );
      delete window.REDUX_DATA;
      HMRRenderer(GetClientJSX(store));
    } else {
<<<<<<< HEAD
      fetch(`${window.location.pathname}?redux=true`).then(response => response.json()).then(data => {
        /* eslint-disable no-console */
        // console.log('Got Data Back');
        // console.log(data);

        /* eslint-enable no-console */
        const ssRedux = JSON.parse(data);
        store = createStore(withReducers, fromJSLeaveImmer(ssRedux), browserHistory); // store.dispatch(setVersionStatus(versionStatusFromHostname));

        store.runSaga(rootSaga(withSagas));
        store.dispatch(setCurrentProject(pickProject(window.location.hostname, parse(window.location.search)), [], window.location.hostname)); // if (typeof window != 'undefined') {
        //   store.dispatch(checkUserLoggedIn());
        // }

        HMRRenderer(GetClientJSX(store));
      });
=======
      fetch(`${window.location.pathname}?redux=true`)
        .then(response => response.json())
        .then(data => {
          /* eslint-disable no-console */
          //console.log('Got Data Back');
          // console.log(data);

          /* eslint-enable no-console */
          const ssRedux = JSON.parse(data);
          store = createStore(
            withReducers,
            fromJSLeaveImmer(ssRedux),
            browserHistory
          ); // store.dispatch(setVersionStatus(versionStatusFromHostname));

          store.runSaga(rootSaga(withSagas));
          store.dispatch(
            setCurrentProject(
              pickProject(
                window.location.hostname,
                queryString.parse(window.location.search)
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

export default ClientApp;
//# sourceMappingURL=client.js.map
