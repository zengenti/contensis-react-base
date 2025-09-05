import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Action,
  Store,
  StoreEnhancer,
} from 'redux';
import { thunk as thunkMiddleware } from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import { createInjectorsEnhancer } from 'redux-injectors-19';

// Core reducers
import NavigationReducer from '../reducers/navigation';
import RoutingReducer from '~/routing/redux/reducers';
import UserReducer from '~/user/redux/reducers';
import VersionReducer from '../reducers/version';
import routerMiddleware from './routerMiddleware';
import { AppState, StateType } from '~/models';
import { History, MemoryHistory } from 'history';

declare let window: Window &
  typeof globalThis & {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  };

type ReduxAppStore = Store<AppState, Action>;

type ReduxSagaAppStore = ReduxAppStore & {
  runSaga: ReturnType<typeof createSagaMiddleware>['run'];
  close: () => void;
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

    // Assign stub reducers for any missing reducers that have been
    // injected server-side and will be re-injected client-side
    const injectReducers = {};
    for (const key of Object.keys(initialState)) {
      if (!(key in reducers)) injectReducers[key] = stubReducer;
    }

    const middleware: StoreEnhancer<{
      runSaga: ReturnType<typeof createSagaMiddleware>['run'];
      close: () => void;
    }> = compose(
      applyMiddleware(
        thunkMiddleware,
        sagaMiddleware,
        routerMiddleware(history)
      ),
      createInjectorsEnhancer({
        createReducer,
        runSaga,
      }),
      reduxDevToolsMiddleware
    );

    const store = createStore(
      createReducer(injectReducers),
      initialState,
      middleware
    );

    store.runSaga = runSaga;
    store.close = () => store.dispatch(END);
    return store;
  };

  reduxStore = store(fromJS(initialState)) as ReduxSagaAppStore;
  return reduxStore;
};
