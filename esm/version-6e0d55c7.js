import { Map, List, fromJS, OrderedMap, Set } from 'immutable';
import { compose, applyMiddleware, createStore as createStore$1 } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import { createInjectorsEnhancer } from 'redux-injectors';
import { h as SET_TARGET_PROJECT, i as SET_SURROGATE_KEYS, e as SET_SIBLINGS, b as SET_ROUTE, S as SET_NAVIGATION_PATH, U as UPDATE_LOADING_STATE, c as SET_ENTRY, d as SET_ANCESTORS, j as action } from './actions-ddd9c623.js';
import { U as UserReducer } from './reducers-a2b095a1.js';
import { all } from '@redux-saga/core/effects';

const ACTION_PREFIX = '@NAVIGATION/';
const GET_NODE_TREE = `${ACTION_PREFIX}_GET_NODE_TREE`;
const SET_NODE_TREE = `${ACTION_PREFIX}_SET_NODE_TREE`;
const GET_NODE_TREE_ERROR = `${ACTION_PREFIX}_GET_NODE_TREE_ERROR`;

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_NODE_TREE: GET_NODE_TREE,
  SET_NODE_TREE: SET_NODE_TREE,
  GET_NODE_TREE_ERROR: GET_NODE_TREE_ERROR
});

const initialState = Map({
  root: null,
  treeDepends: new List([]),
  isError: false,
  isReady: false
});
var NavigationReducer = ((state = initialState, action) => {
  switch (action.type) {
    case SET_NODE_TREE:
      {
        return state.set('root', fromJS(action.nodes)).set('isReady', true);
      }

    case GET_NODE_TREE_ERROR:
      {
        return state.set('isError', true);
      }

    default:
      return state;
  }
});

let initialState$1 = OrderedMap({
  currentHostname: null,
  contentTypeId: null,
  currentPath: '/',
  currentNode: OrderedMap(),
  currentNodeAncestors: List(),
  currentProject: 'unknown',
  entryID: null,
  entry: null,
  currentTreeId: null,
  entryDepends: List(),
  error: undefined,
  isError: false,
  isLoading: false,
  location: OrderedMap(),
  mappedEntry: null,
  nodeDepends: List(),
  notFound: false,
  staticRoute: null,
  statusCode: 200
});
var RoutingReducer = ((state = initialState$1, action) => {
  switch (action.type) {
    case SET_ANCESTORS:
      {
        if (action.ancestors) {
          return state.set('currentNodeAncestors', fromJS(action.ancestors));
        }

        return state.set('currentNodeAncestors', fromJS(action.ancestors));
      }

    case SET_ENTRY:
      {
        const {
          entry,
          error,
          mappedEntry,
          node = {},
          isError = false,
          isLoading = false,
          notFound = false,
          statusCode
        } = action;
        let defaultStatus = 200;
        if (notFound === true && isError === false) defaultStatus = 404;else if (isError === true) defaultStatus = statusCode || 500;
        let nextState;

        if (!entry) {
          nextState = state.set('entryID', null).set('entry', null).set('error', fromJS(error)).set('mappedEntry', null).set('isError', isError).set('isLoading', isLoading).set('notFound', notFound).set('statusCode', statusCode || defaultStatus);
        } else {
          nextState = state.set('entryID', action.id).set('entry', fromJS(entry)).set('error', fromJS(error)).set('isError', isError).set('isLoading', isLoading).set('notFound', notFound).set('statusCode', statusCode || defaultStatus);
          if (mappedEntry && Object.keys(mappedEntry).length > 0) nextState = nextState.set('mappedEntry', fromJS(mappedEntry)).set('entry', fromJS({
            sys: entry.sys
          }));
        }

        if (!node) {
          return nextState.set('nodeDepends', null).set('currentNode', null);
        } else {
          // On Set Node, we reset all dependants.
          return nextState.set('currentNode', fromJS(node)).removeIn(['currentNode', 'entry']); // We have the entry stored elsewhere, so lets not keep it twice.
        }
      }

    case UPDATE_LOADING_STATE:
      {
        return state.set('isLoading', action.isLoading);
      }

    case SET_NAVIGATION_PATH:
      {
        let staticRoute = false;

        if (action.staticRoute) {
          staticRoute = { ...action.staticRoute
          };
        }

        if (action.path) {
          // Don't run a path update on initial load as we allready should have it in redux
          const entryUri = state.getIn(['entry', 'sys', 'uri']);

          if (entryUri != action.path) {
            return state.set('currentPath', fromJS(action.path)).set('location', fromJS(action.location)).set('staticRoute', fromJS({ ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            })).set('isLoading', typeof window !== 'undefined');
          } else {
            return state.set('location', fromJS(action.location)).set('staticRoute', fromJS({ ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            }));
          }
        }

        return state;
      }

    case SET_ROUTE:
      {
        return state.set('nextPath', action.path);
      }

    case SET_SIBLINGS:
      {
        // Can be null in some cases like the homepage.
        let currentNodeSiblingParent = null;
        let siblingIDs = [];

        if (action.siblings && action.siblings.length > 0) {
          currentNodeSiblingParent = action.siblings[0].parentId;
          siblingIDs = action.siblings.map(node => {
            return node.id;
          });
        }

        let currentNodeDepends = state.get('nodeDepends');
        const allNodeDepends = Set.union([Set(siblingIDs), currentNodeDepends]);
        return state.set('nodeDepends', allNodeDepends).set('currentNodeSiblings', fromJS(action.siblings)).set('currentNodeSiblingsParent', currentNodeSiblingParent);
      }

    case SET_SURROGATE_KEYS:
      {
        return state.set('surrogateKeys', action.keys);
      }

    case SET_TARGET_PROJECT:
      {
        return state.set('currentProject', action.project).set('currentTreeId', '') //getTreeID(action.project))
        .set('allowedGroups', fromJS(action.allowedGroups)).set('currentHostname', action.hostname);
      }

    default:
      return state;
  }
});

const VERSION_PREFIX = '@VERSION/';
const SET_VERSION = `${VERSION_PREFIX}SET_VERSION`;
const SET_VERSION_STATUS = `${VERSION_PREFIX}SET_VERSION_STATUS`;

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SET_VERSION: SET_VERSION,
  SET_VERSION_STATUS: SET_VERSION_STATUS
});

let initialState$2 = Map({
  commitRef: null,
  buildNo: null,
  contensisVersionStatus: 'published'
});
var VersionReducer = ((state = initialState$2, action) => {
  switch (action.type) {
    case SET_VERSION_STATUS:
      {
        return state.set('contensisVersionStatus', action.status);
      }

    case SET_VERSION:
      {
        return state.set('commitRef', action.commitRef).set('buildNo', action.buildNo);
      }

    default:
      return state;
  }
});

/**
 * This middleware captures 'CALL_HISTORY_METHOD' actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */

/* eslint-disable no-unused-vars */
const routerMiddleware = history => store => next => action => {
  if (action.type !== 'CALL_HISTORY_METHOD') {
    return next(action);
  }

  const {
    payload: {
      method,
      args
    }
  } = action;
  history[method](...args);
};

/* eslint-disable no-underscore-dangle */
let reduxStore;
var createStore = ((featureReducers, initialState, history) => {
  let reduxDevToolsMiddleware = f => f;

  if (typeof window != 'undefined') {
    reduxDevToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
  }

  const sagaMiddleware = createSagaMiddleware();
  const reducers = {
    navigation: NavigationReducer,
    routing: RoutingReducer,
    user: UserReducer,
    version: VersionReducer,
    ...featureReducers
  };

  const createReducer = (injectedReducers = {}) => {
    const rootReducer = combineReducers({ ...injectedReducers,
      // other non-injected reducers go here
      ...reducers
    });
    return rootReducer;
  };

  const store = initialState => {
    const runSaga = sagaMiddleware.run;
    const middleware = compose(applyMiddleware(thunkMiddleware, sagaMiddleware, routerMiddleware(history)), createInjectorsEnhancer({
      createReducer,
      runSaga
    }), reduxDevToolsMiddleware);
    const store = createStore$1(createReducer(), initialState, middleware);
    store.runSaga = runSaga;

    store.close = () => store.dispatch(END);

    return store;
  };

  reduxStore = store(initialState);
  return reduxStore;
});

const hasNavigationTree = state => {
  return state.getIn(['navigation', 'isReady']);
};
const selectNavigationRoot = state => {
  return state.getIn(['navigation', 'root']);
};
const selectNavigationDepends = state => {
  return state.getIn(['navigation', 'treeDepends']);
};

var navigation$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasNavigationTree: hasNavigationTree,
  selectNavigationRoot: selectNavigationRoot,
  selectNavigationDepends: selectNavigationDepends
});

const convertSagaArray = sagas => {
  if (Array.isArray(sagas)) return function* rootSaga() {
    yield all(sagas);
  };
  return sagas;
};
const injectReducer = ({
  key,
  reducer
}, store = reduxStore) => {
  if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;
  store.injectedReducers[key] = reducer;
  store.replaceReducer(store.createReducer(store.injectedReducers));
};
const injectSaga = ({
  key,
  saga
}, store = reduxStore) => {
  const rootSaga = convertSagaArray(saga);
  let hasSaga = Reflect.has(store.injectedSagas, key);

  if (process.env.NODE_ENV !== 'production') {
    const oldDescriptor = store.injectedSagas[key]; // enable hot reloading of daemon and once-till-unmount sagas

    if (hasSaga && oldDescriptor.saga !== rootSaga) {
      oldDescriptor.task.cancel();
      hasSaga = false;
    }
  }

  console.info('injectSaga, key: ', key, 'hasSaga: ', hasSaga);

  if (!hasSaga) {
    store.injectedSagas[key] = {
      key,
      saga: rootSaga,
      task: store.runSaga(rootSaga)
    };
  }
};
const injectRedux = ({
  key,
  reducer,
  saga
}, store = reduxStore) => {
  console.info('injectRedux, key: ', key);
  if (reducer) injectReducer({
    key,
    reducer
  }, store);
  if (saga) injectSaga({
    key,
    saga
  }, store);
};
const useInjectRedux = injectRedux;

const setVersion = (commitRef, buildNo) => action(SET_VERSION, {
  commitRef,
  buildNo
});
const setVersionStatus = status => action(SET_VERSION_STATUS, {
  status
});

var version$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setVersion: setVersion,
  setVersionStatus: setVersionStatus
});

export { GET_NODE_TREE as G, SET_NODE_TREE as S, setVersion as a, GET_NODE_TREE_ERROR as b, createStore as c, version$1 as d, navigation$1 as e, convertSagaArray as f, injectReducer as g, hasNavigationTree as h, injectRedux as i, injectSaga as j, navigation as n, reduxStore as r, setVersionStatus as s, useInjectRedux as u, version as v };
//# sourceMappingURL=version-6e0d55c7.js.map
