import { applyMiddleware, compose, createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import { createInjectorsEnhancer } from 'redux-injectors';

// Core reducers
import NavigationReducer from '../reducers/navigation';
import RoutingReducer from '~/routing/redux/reducers';
import UserReducer from '~/user/redux/reducers';
import VersionReducer from '../reducers/version';
import routerMiddleware from './routerMiddleware';

export let reduxStore = null;

export default (featureReducers, initialState, history) => {
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

  const createReducer = (injectedReducers = {}) => {
    const rootReducer = combineReducers({
      ...injectedReducers,
      // other non-injected reducers go here
      ...reducers,
    });

    return rootReducer;
  };

  const store = initialState => {
    const runSaga = sagaMiddleware.run;

    const middleware = compose(
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

    const store = createStore(createReducer(), initialState, middleware);

    store.runSaga = runSaga;
    store.close = () => store.dispatch(END);

    return store;
  };

  reduxStore = store(initialState);
  return reduxStore;
};
