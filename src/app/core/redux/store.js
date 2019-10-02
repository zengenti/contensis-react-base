import { compose, createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';

// Core reducers
import RoutingReducer from './reducers/routing';
import VersionReducer from './reducers/version';
import NavigationReducer from './reducers/navigation';

// Feature reducers
// import { reducer as FormsReducer } from 'zengenti-forms-package';
// import { reducer as ListingReducer } from '~/features/listings';
// import { reducer as SearchReducer } from '~/features/search';
// import { reducer as AlertReducer } from '~/features/siteAlert';

const featureReducers = {};

const thunkMiddleware = [thunk];

let reduxDevToolsMiddleware = f => f;

if (typeof window != 'undefined') {
  reduxDevToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;
}

const sagaMiddleware = createSagaMiddleware();
const middleware = compose(
  applyMiddleware(...thunkMiddleware, sagaMiddleware),
  reduxDevToolsMiddleware
);

let reducers = {
  navigation: NavigationReducer,
  routing: RoutingReducer,
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

export default store;
