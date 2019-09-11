import { compose, createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';

import RoutingReducer from './reducers/routing';
import VersionReducer from './reducers/version';
import AppReducer from './reducers/app';
import ListingReducer from './reducers/listing';
import CountryEntryRequirementsReducer from './reducers/countryEntryRequirements';
import DefaultMessageReducer from './reducers/defaultMessages';
import SearchReducer from './reducers/search';
import NavigationReducer from './reducers/navigation';
// import UserReducer from './reducers/user';

const thunkMiddleware = [thunk];

let reduxDevToolsMiddleware = f => f;
// let __isBrowser__ = false;
if (__isBrowser__) {
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
  search: SearchReducer,
  navigation: NavigationReducer,
  routing: RoutingReducer,
  version: VersionReducer,
  listing: ListingReducer,
  app: AppReducer,
  defaultMessages: DefaultMessageReducer,
  countries: CountryEntryRequirementsReducer,
};

const combinedReducers = combineReducers(reducers);

const store = initialState => {
  const store = createStore(combinedReducers, initialState, middleware);
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default store;
