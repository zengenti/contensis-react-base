import 'isomorphic-fetch';
import React from 'react';
import { render, hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import { preloadReady } from 'react-loadable';
import { AppContainer } from 'react-hot-loader';
import { Provider as ReduxProvider } from 'react-redux';
import * as queryString from 'query-string';
// import { fromJS } from 'immutable';

import createStore from '~/redux/store/store';
import { browserHistory as history } from '~/redux/store/history';
import rootSaga from '~/redux/sagas';

import { setVersionStatus } from '~/redux/actions/version';
import { deliveryApi } from '~/util/ContensisDeliveryApi';
import { setCurrentProject } from '~/routing/redux/actions';
import pickProject from '~/util/pickProject';
// import fromJSOrdered from '~/util/fromJSOrdered';
import fromJSLeaveImmer from '~/util/fromJSLeaveImmer';

import { AppConfig } from '~/config';

declare let window: typeof globalThis & {
  isDynamic;
  REDUX_DATA;
};

type ReactAppProps = { routes: any; withEvents: any };

class ClientApp {
  constructor(ReactApp: React.ComponentType<ReactAppProps>, config: AppConfig) {
    const documentRoot = document.getElementById('root');

    const { routes, withReducers, withSagas, withEvents } = config;

    const GetClientJSX = store => {
      const ClientJsx = (
        <AppContainer>
          <ReduxProvider store={store}>
            <Router history={history}>
              <ReactApp routes={routes} withEvents={withEvents} />
            </Router>
          </ReduxProvider>
        </AppContainer>
      );
      return ClientJsx;
    };

    const isProduction = !(process.env.NODE_ENV !== 'production');

    /**
     * Webpack HMR Setup.
     */
    const HMRRenderer = Component => {
      preloadReady().then(() => {
        if (isProduction) hydrate(Component, documentRoot);
        else render(Component, documentRoot);
      });
    };
    let store: any = null;
    const qs = queryString.parse(window.location.search);

    const versionStatusFromHostname = deliveryApi.getClientSideVersionStatus();
    if (
      window.isDynamic ||
      window.REDUX_DATA ||
      process.env.NODE_ENV !== 'production'
    ) {
      store = createStore(
        withReducers,
        fromJSLeaveImmer(window.REDUX_DATA),
        history
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
      fetch(`${window.location.pathname}?redux=true`)
        .then(response => response.json())
        .then(data => {
          /* eslint-disable no-console */
          // console.log('Got Data Back');
          // console.log(data);
          /* eslint-enable no-console */
          const ssRedux = JSON.parse(data);
          store = createStore(withReducers, fromJSLeaveImmer(ssRedux), history);
          // store.dispatch(setVersionStatus(versionStatusFromHostname));

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
          );
          // if (typeof window != 'undefined') {
          //   store.dispatch(checkUserLoggedIn());
          // }
          HMRRenderer(GetClientJSX(store));
        });
    }

    // webpack Hot Module Replacement API
    if (module.hot) {
      module.hot.accept(ReactApp as unknown as string, () => {
        // if you are using harmony modules ({modules:false})
        HMRRenderer(GetClientJSX(store));
      });
    }
  }
}

export default ClientApp;
