import { compose, createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';

// Core reducers
import RoutingReducer from './reducers/routing';
import { reducer as UserReducer } from '~/features/login';
import VersionReducer from './reducers/version';
import NavigationReducer from './reducers/navigation';
import routerMiddleware from './routerMiddleware';

export let reduxStore = null;

export default (featureReducers, initialState, history) => {
  const thunkMiddleware = [thunk];

  let reduxDevToolsMiddleware = f => f;

  if (typeof window != 'undefined') {
    reduxDevToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f;
  }

  const sagaMiddleware = createSagaMiddleware();
  const middleware = compose(
    applyMiddleware(
      ...thunkMiddleware,
      sagaMiddleware,
      routerMiddleware(history)
    ),
    reduxDevToolsMiddleware
  );

  let reducers = {
    navigation: NavigationReducer,
    routing: RoutingReducer,
    user: UserReducer,
    version: VersionReducer,
    ...featureReducers,
  };

  const combinedReducers = combineReducers(reducers);

  const store = initialState => {
    const store = createStore(combinedReducers, initialState, middleware);
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
  };

  reduxStore = store(initialState);
  return reduxStore;
};
