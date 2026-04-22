import { History, MemoryHistory } from 'history';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Action,
  Store,
  StoreEnhancer,
  Reducer,
} from 'redux';
import { thunk as thunkMiddleware } from 'redux-thunk';
import createSagaMiddleware, { END, Task } from 'redux-saga';
import { Effect } from 'redux-saga/effects';
import { createInjectorsEnhancer } from 'redux-injectors-19';

// Core reducers
import i18nSlice from '~/i18n/redux/slice';
import NavigationReducer from '../reducers/navigation';
import RoutingReducer from '~/routing/redux/reducers';
import UserReducer from '~/user/redux/reducers';
import VersionReducer from '../reducers/version';

import { wrapSagasInGenerator } from './injectors/util';
import routerMiddleware from './routerMiddleware';

import { AppState, StateType } from '~/models';

declare let window: Window &
  typeof globalThis & {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  };

type ReduxAppStore = Store<AppState, Action>;
type PatchedRunSaga = (sagas: Effect[] | (() => Generator)) => Task;

type ReduxSagaAppStore = ReduxAppStore & {
  runSaga: PatchedRunSaga;
  close: () => void;
  initialSagas: Set<any>; // Track initial sagas
  injectedReducers: any;
  injectedSagas: any;
  createReducer: (injectedReducers?: any) => Reducer<AppState>;
};

/** A no-op reducer to serve for server-rendered reducers
 * that are re-injected client-side */
export const stubReducer = (state = null) => state;

export let reduxStore: ReduxSagaAppStore;

export default async (
  featureReducers: any,
  initialState: AppState,
  history: History | MemoryHistory,
  stateType: StateType
) => {
  let reduxDevToolsMiddleware = f => f;

  if (typeof window != 'undefined') {
    reduxDevToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f;
  }

  const sagaMiddleware = createSagaMiddleware();

  const reducers = {
    i18n: i18nSlice.reducer,
    navigation: NavigationReducer,
    routing: RoutingReducer,
    user: UserReducer,
    version: VersionReducer,
    ...featureReducers,
  };

  // Reassign the combiner and fromJS functions when
  // stateType is 'immutable' with dynamic imports
  let combiner = combineReducers;
  let fromJS = <T = any>(obj: T) => obj;
  globalThis.STATE_TYPE = stateType;

  if (stateType === 'immutable') {
    globalThis.immutable = await import(
      /* webpackChunkName: "immutable" */ 'immutable'
    );

    fromJS = (
      await import(/* webpackChunkName: "from-js" */ '~/util/fromJSLeaveImmer')
    ).default;

    combiner = (
      await import(/* webpackChunkName: "redux-immutable" */ 'redux-immutable')
    ).combineReducers;
  }

  const createReducer = (injectedReducers = {}) => {
    const rootReducer = combiner<AppState>({
      ...injectedReducers,
      // other non-injected reducers go here
      ...reducers,
    });

    return rootReducer;
  };

  const store = (initialState: AppState) => {
    const runSaga = sagaMiddleware.run;

    // Track the initial set of sagas here
    const initialSagas = new Set();

    // Patch the runSaga function to capture and track the sagas
    // passed as a raw array of effects
    const patchedRunSaga = (sagas: Effect[] | (() => Generator)) => {
      // Only track the saga the first time it is run
      if (Array.isArray(sagas)) {
        for (const saga of sagas)
          if (!initialSagas.has(saga)) {
            initialSagas.add(saga);
          }
      } else {
        if (!initialSagas.has(sagas)) {
          initialSagas.add(sagas);
        }
      }

      const rootSaga = wrapSagasInGenerator(sagas);

      // Run the saga as usual
      return runSaga(rootSaga);
    };

    // Assign stub reducers for any missing reducers that have been
    // injected server-side and will be re-injected client-side
    const injectReducers = {};
    for (const key of Object.keys(initialState || {})) {
      if (!(key in reducers)) injectReducers[key] = stubReducer;
    }

    const middleware: StoreEnhancer<{
      runSaga: PatchedRunSaga;
      close: () => void;
      initialSagas: Set<any>;
      injectedReducers: any;
      injectedSagas: any;
    }> = compose(
      applyMiddleware(
        thunkMiddleware,
        sagaMiddleware,
        routerMiddleware(history)
      ),
      createInjectorsEnhancer({
        createReducer,
        // Assign patched runSaga to store
        runSaga,
      }),
      reduxDevToolsMiddleware
    );

    const store = createStore(
      createReducer(injectReducers),
      initialState,
      middleware
    );

    store.runSaga = patchedRunSaga; // Assign patched runSaga to the store
    store.close = () => store.dispatch(END);
    store.initialSagas = initialSagas; // Store the initial sagas set

    return store;
  };

  reduxStore = store(fromJS(initialState)) as ReduxSagaAppStore;
  return reduxStore;
};
