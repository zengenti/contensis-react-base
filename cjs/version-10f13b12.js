'use strict';

var immutable = require('immutable');
var redux = require('redux');
var reduxImmutable = require('redux-immutable');
var thunkMiddleware = require('redux-thunk');
var createSagaMiddleware = require('redux-saga');
var reduxInjectors = require('redux-injectors');
var actions = require('./actions-e22726ed.js');
var reducers = require('./reducers-0ea95da5.js');
var effects = require('@redux-saga/core/effects');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var thunkMiddleware__default = /*#__PURE__*/_interopDefaultLegacy(thunkMiddleware);
var createSagaMiddleware__default = /*#__PURE__*/_interopDefaultLegacy(createSagaMiddleware);

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

const initialState = immutable.Map({
  root: null,
  treeDepends: new immutable.List([]),
  isError: false,
  isReady: false
});
var NavigationReducer = ((state = initialState, action) => {
  switch (action.type) {
    case SET_NODE_TREE:
      {
        return state.set('root', immutable.fromJS(action.nodes)).set('isReady', true);
      }

    case GET_NODE_TREE_ERROR:
      {
        return state.set('isError', true);
      }

    default:
      return state;
  }
});

let initialState$1 = immutable.OrderedMap({
  currentHostname: null,
  contentTypeId: null,
  currentPath: '/',
  currentNode: immutable.OrderedMap(),
  currentNodeAncestors: immutable.List(),
  currentProject: 'unknown',
  entryID: null,
  entry: null,
  currentTreeId: null,
  entryDepends: immutable.List(),
  error: undefined,
  isError: false,
  isLoading: false,
  location: immutable.OrderedMap(),
  mappedEntry: null,
  nodeDepends: immutable.List(),
  notFound: false,
  staticRoute: null,
  statusCode: 200
});
var RoutingReducer = ((state = initialState$1, action) => {
  switch (action.type) {
    case actions.SET_ANCESTORS:
      {
        if (action.ancestors) {
          return state.set('currentNodeAncestors', immutable.fromJS(action.ancestors));
        }

        return state.set('currentNodeAncestors', immutable.fromJS(action.ancestors));
      }

    case actions.SET_ENTRY:
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
          nextState = state.set('entryID', null).set('entry', null).set('error', immutable.fromJS(error)).set('mappedEntry', null).set('isError', isError).set('isLoading', isLoading).set('notFound', notFound).set('statusCode', statusCode || defaultStatus);
        } else {
          nextState = state.set('entryID', action.id).set('entry', immutable.fromJS(entry)).set('error', immutable.fromJS(error)).set('isError', isError).set('isLoading', isLoading).set('notFound', notFound).set('statusCode', statusCode || defaultStatus);
          if (mappedEntry && Object.keys(mappedEntry).length > 0) nextState = nextState.set('mappedEntry', immutable.fromJS(mappedEntry)).set('entry', immutable.fromJS({
            sys: entry.sys
          }));
        }

        if (!node) {
          return nextState.set('nodeDepends', null).set('currentNode', null);
        } else {
          // On Set Node, we reset all dependants.
          return nextState.set('currentNode', immutable.fromJS(node)).removeIn(['currentNode', 'entry']); // We have the entry stored elsewhere, so lets not keep it twice.
        }
      }

    case actions.UPDATE_LOADING_STATE:
      {
        return state.set('isLoading', action.isLoading);
      }

    case actions.SET_NAVIGATION_PATH:
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
            return state.set('currentPath', immutable.fromJS(action.path)).set('location', immutable.fromJS(action.location)).set('staticRoute', immutable.fromJS({ ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            })).set('isLoading', typeof window !== 'undefined');
          } else {
            return state.set('location', immutable.fromJS(action.location)).set('staticRoute', immutable.fromJS({ ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            }));
          }
        }

        return state;
      }

    case actions.SET_ROUTE:
      {
        return state.set('nextPath', action.path);
      }

    case actions.SET_SIBLINGS:
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
        const allNodeDepends = immutable.Set.union([immutable.Set(siblingIDs), currentNodeDepends]);
        return state.set('nodeDepends', allNodeDepends).set('currentNodeSiblings', immutable.fromJS(action.siblings)).set('currentNodeSiblingsParent', currentNodeSiblingParent);
      }

    case actions.SET_SURROGATE_KEYS:
      {
        return state.set('surrogateKeys', action.keys);
      }

    case actions.SET_TARGET_PROJECT:
      {
        return state.set('currentProject', action.project).set('currentTreeId', '') //getTreeID(action.project))
        .set('allowedGroups', immutable.fromJS(action.allowedGroups)).set('currentHostname', action.hostname);
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

let initialState$2 = immutable.Map({
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

exports.reduxStore = null;
var createStore = ((featureReducers, initialState, history) => {
  let reduxDevToolsMiddleware = f => f;

  if (typeof window != 'undefined') {
    reduxDevToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
  }

  const sagaMiddleware = createSagaMiddleware__default['default']();
  const reducers$1 = {
    navigation: NavigationReducer,
    routing: RoutingReducer,
    user: reducers.UserReducer,
    version: VersionReducer,
    ...featureReducers
  };

  const createReducer = (injectedReducers = {}) => {
    const rootReducer = reduxImmutable.combineReducers({ ...injectedReducers,
      // other non-injected reducers go here
      ...reducers$1
    });
    return rootReducer;
  };

  const store = initialState => {
    const runSaga = sagaMiddleware.run;
    const middleware = redux.compose(redux.applyMiddleware(thunkMiddleware__default['default'], sagaMiddleware, routerMiddleware(history)), reduxInjectors.createInjectorsEnhancer({
      createReducer,
      runSaga
    }), reduxDevToolsMiddleware);
    const store = redux.createStore(createReducer(), initialState, middleware);
    store.runSaga = runSaga;

    store.close = () => store.dispatch(createSagaMiddleware.END);

    return store;
  };

  exports.reduxStore = store(initialState);
  return exports.reduxStore;
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
    yield effects.all(sagas);
  };
  return sagas;
};
const injectReducer = ({
  key,
  reducer
}, store = exports.reduxStore) => {
  if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;
  store.injectedReducers[key] = reducer;
  store.replaceReducer(store.createReducer(store.injectedReducers));
};
const injectSaga = ({
  key,
  saga
}, store = exports.reduxStore) => {
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
}, store = exports.reduxStore) => {
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

const setVersion = (commitRef, buildNo) => actions.action(SET_VERSION, {
  commitRef,
  buildNo
});
const setVersionStatus = status => actions.action(SET_VERSION_STATUS, {
  status
});

var version$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setVersion: setVersion,
  setVersionStatus: setVersionStatus
});

exports.GET_NODE_TREE = GET_NODE_TREE;
exports.GET_NODE_TREE_ERROR = GET_NODE_TREE_ERROR;
exports.SET_NODE_TREE = SET_NODE_TREE;
exports.convertSagaArray = convertSagaArray;
exports.createStore = createStore;
exports.hasNavigationTree = hasNavigationTree;
exports.injectReducer = injectReducer;
exports.injectRedux = injectRedux;
exports.injectSaga = injectSaga;
exports.navigation = navigation;
exports.navigation$1 = navigation$1;
exports.setVersion = setVersion;
exports.setVersionStatus = setVersionStatus;
exports.useInjectRedux = useInjectRedux;
exports.version = version;
exports.version$1 = version$1;
//# sourceMappingURL=version-10f13b12.js.map
