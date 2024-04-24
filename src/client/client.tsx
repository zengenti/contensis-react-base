import 'isomorphic-fetch';
import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { parse } from 'query-string';
import { CookiesProvider } from 'react-cookie';

import { selectVersionStatus } from '~/redux/selectors/version';
import { setVersionStatus } from '~/redux/actions/version';
import rootSaga from '~/redux/sagas';
import { browserHistory as history } from '~/redux/store/history';
import createStore from '~/redux/store/store';

import { setCurrentProject } from '~/routing/redux/actions';

import { deliveryApi } from '~/util/ContensisDeliveryApi';
import pickProject from '~/util/pickProject';

import { AppConfig } from '~/models';

declare let window: typeof globalThis & {
  isDynamic;
  REDUX_DATA;
};

type ReactAppProps = { routes: any; withEvents: any };

// Fix TS2769 error No overload matches this call
const Container = AppContainer as any; // as typeof AppContainer;

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
        <Container>
          <CookiesProvider>
            <ReduxProvider store={store}>
              <Router history={history}>
                <ReactApp routes={routes} withEvents={withEvents} />
              </Router>
            </ReduxProvider>
          </CookiesProvider>
        </Container>
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

    const qs = parse(window.location.search);
    const versionStatus = deliveryApi.getClientSideVersionStatus();

    if (
      window.isDynamic ||
      window.REDUX_DATA ||
      process.env.NODE_ENV !== 'production'
    ) {
      createStore(withReducers, window.REDUX_DATA, history, stateType).then(
        store => {
          const state = store.getState();
          const ssrVersionStatus = selectVersionStatus(state);
          if (!ssrVersionStatus)
            store.dispatch(setVersionStatus(versionStatus));

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
          const ssRedux = JSON.parse(data);
          createStore(withReducers, ssRedux, history, stateType).then(store => {
            store.dispatch(setVersionStatus(versionStatus));

            store.runSaga(rootSaga(withSagas));
            store.dispatch(
              setCurrentProject(
                pickProject(window.location.hostname, qs),
                [],
                window.location.hostname
              )
            );

            HMRRenderer(GetClientJSX(store));

            hmr(store);
          });
        });
    }
  }
}

export default ClientApp;
