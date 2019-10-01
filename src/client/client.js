import 'isomorphic-fetch';
import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { preloadReady } from 'react-loadable';
import { AppContainer } from 'react-hot-loader';
import { Provider as ReduxProvider } from 'react-redux';
import queryString from 'query-string';

import createStore from '~/core/redux/store';
import rootSaga from '~/core/redux/sagas';

import App from '~/App';
import { fromJS } from 'immutable';
import { setVersionStatus } from '~/core/redux/actions/version';
import { GetClientSideDeliveryApiStatus } from '~/core/util/ContensisDeliveryApi';
import { initialiseApp } from '~/core/redux/actions/app';
import { setCurrentProject } from '~/core/redux/actions/routing';
import pickProject from '~/core/util/pickProject';

const documentRoot = document.getElementById('root');

const GetClientJSX = store => {
  const ClientJsx = (
    <AppContainer>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </AppContainer>
  );
  return ClientJsx;
};

/**
 * Webpack HMR Setup.
 */
const HMRRenderer = Component => {
  preloadReady().then(() => {
    module.hot
      ? render(Component, documentRoot)
      : hydrate(Component, documentRoot);
  });
};
let store = null;
const versionStatusFromHostname = GetClientSideDeliveryApiStatus();
if (
  window.isDynamic ||
  window.REDUX_DATA ||
  process.env.NODE_ENV !== 'production'
) {
  store = createStore(fromJS(window.REDUX_DATA));
  store.dispatch(setVersionStatus(versionStatusFromHostname));

  /* eslint-disable no-console */
  console.log('Hydrating from inline Redux');
  /* eslint-enable no-console */
  store.runSaga(rootSaga);
  store.dispatch(
    setCurrentProject(
      pickProject(
        window.location.hostname,
        queryString.parse(window.location.search)
      )
    )
  );
  store.dispatch(initialiseApp());

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
      store = createStore(fromJS(ssRedux));
      // store.dispatch(setVersionStatus(versionStatusFromHostname));

      store.runSaga(rootSaga);
      store.dispatch(initialiseApp());
      store.dispatch(
        setCurrentProject(
          pickProject(
            window.location.hostname,
            queryString.parse(window.location.search)
          )
        )
      );
      // if (typeof window != 'undefined') {
      //   store.dispatch(checkUserLoggedIn());
      // }
      HMRRenderer(GetClientJSX(store));
    });
}

// webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('~/App', () => {
    // if you are using harmony modules ({modules:false})
    HMRRenderer(GetClientJSX(store));
  });
}
