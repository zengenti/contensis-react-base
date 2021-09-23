import 'isomorphic-fetch';
import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import * as queryString from 'query-string';

import { setVersionStatus } from '~/redux/actions/version';
import rootSaga from '~/redux/sagas';
import { browserHistory as history } from '~/redux/store/history';
import createStore from '~/redux/store/store';

import { setCurrentProject } from '~/routing/redux/actions';

import { deliveryApi } from '~/util/ContensisDeliveryApi';
import pickProject from '~/util/pickProject';

import { AppConfig } from '~/config';

declare let window: typeof globalThis & {
  isDynamic;
  REDUX_DATA;
};

type ReactAppProps = { routes: any; withEvents: any };

class ClientApp {
  constructor(ReactApp: React.ComponentType<ReactAppProps>, config: AppConfig) {
    const documentRoot = document.getElementById('root');

    const {
      stateType = 'immutable',
      routes,
      withReducers,
      withSagas,
      withEvents,
    } = config;

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
      if (isProduction)
        loadableReady(
          () => {
            hydrate(Component, documentRoot);
          },
          { namespace: 'modern' }
        );
      else render(Component, documentRoot);
    };

    const hmr = store => {
      // webpack Hot Module Replacement API
      if (module.hot) {
        module.hot.accept(ReactApp as unknown as string, () => {
          // if you are using harmony modules ({modules:false})
          HMRRenderer(GetClientJSX(store));
        });
      }
    };

    const qs = queryString.parse(window.location.search);
    const versionStatusFromHostname = deliveryApi.getClientSideVersionStatus();

    if (
      window.isDynamic ||
      window.REDUX_DATA ||
      process.env.NODE_ENV !== 'production'
    ) {
      createStore(withReducers, window.REDUX_DATA, history, stateType).then(
        store => {
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

          hmr(store);
        }
      );
    } else {
      fetch(`${window.location.pathname}?redux=true`)
        .then(response => response.json())
        .then(data => {
          /* eslint-disable no-console */
          // console.log('Got Data Back');
          // console.log(data);
          /* eslint-enable no-console */
          const ssRedux = JSON.parse(data);
          createStore(withReducers, ssRedux, history, stateType).then(store => {
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

            hmr(store);
          });
        });
    }
  }
}

export default ClientApp;
