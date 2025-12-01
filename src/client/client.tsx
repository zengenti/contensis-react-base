import 'isomorphic-fetch';
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { parse } from 'query-string';
import { CookiesProvider } from 'react-cookie';

import { createLocaleRoutes } from '~/i18n/routes';
import { actions } from '~/i18n/redux/slice';
import { selectVersionStatus } from '~/redux/selectors/version';
import { setVersionStatus } from '~/redux/actions/version';
import rootSaga from '~/redux/sagas';
import { browserHistory as history } from '~/redux/store/history';
import createStore from '~/redux/store/store';

import { setCurrentProject } from '~/routing/redux/actions';

import { deliveryApi } from '~/util/ContensisDeliveryApi';
import pickProject from '~/util/pickProject';
import { SSRContextProvider } from '~/util/SSRContext';

import { AppConfig, AppState } from '~/models';

declare let window: typeof globalThis & {
  isDynamic: boolean;
  REDUX_DATA: AppState;
  __USE_HYDRATE__: boolean;
};

type ReactAppProps = { routes: any; withEvents: any };

class ClientApp {
  constructor(ReactApp: React.ComponentType<ReactAppProps>, config: AppConfig) {
    const documentRoot = document.getElementById('root') as HTMLElement;

    const {
      i18n,
      // stateType = 'immutable', // changed default in v4
      stateType = 'js',
      routes,
      withReducers,
      withSagas,
      withEvents,
    } = config;

    // process locales in static routes for i18n
    const localeRoutes = createLocaleRoutes(routes);

    const GetClientJSX = store => {
      const ClientJsx = (
        <CookiesProvider>
          <ReduxProvider store={store}>
            <HistoryRouter
              history={history as any}
              future={{
                v7_relativeSplatPath: true,
                v7_startTransition: true,
              }}
            >
              <SSRContextProvider>
                <ReactApp routes={routes} withEvents={withEvents} />
              </SSRContextProvider>
            </HistoryRouter>
          </ReduxProvider>
        </CookiesProvider>
      );
      return ClientJsx;
    };

    const isDev = process.env.NODE_ENV !== 'production';
    // const isProduction = !isDev;
    const shouldHydrate = window.__USE_HYDRATE__ && !window.isDynamic;

    /**
     * Webpack HMR Setup.
     */
    const HMRRenderer = Component => {
      if (shouldHydrate)
        loadableReady(
          () => {
            hydrateRoot(documentRoot, Component, {
              onRecoverableError(error) {
                console.warn('Hydration warning:', error);
              },
            });
          },
          { namespace: 'modern' }
        );
      else createRoot(documentRoot).render(Component);
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

    if (isDev || window.isDynamic || window.REDUX_DATA) {
      createStore(withReducers, window.REDUX_DATA, history, stateType).then(
        store => {
          const state = store.getState();
          const ssrVersionStatus = selectVersionStatus(state);
          if (!ssrVersionStatus)
            store.dispatch(setVersionStatus(versionStatus));

          if (isDev && window.REDUX_DATA)
            console.log('Hydrating from inline Redux');

          store.runSaga(rootSaga(withSagas));
          store.dispatch(
            setCurrentProject(
              pickProject(window.location.hostname, qs),
              [],
              window.location.hostname
            )
          );
          if (i18n) {
            store.dispatch(
              actions.INIT_LOCALES({
                locales: {},
                ...i18n,
              })
            );
          }
          if (Object.keys(localeRoutes).length > 0) {
            // Keep a record of the locale routes in Redux
            // so we can navigate between them when switching language
            store.dispatch(actions.SET_LOCALE_ROUTES({ routes: localeRoutes }));
          }

          delete (window as any).REDUX_DATA;
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
