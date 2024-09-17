'use strict';

var redux = require('redux');
var thunkMiddleware = require('redux-thunk');
var createSagaMiddleware = require('redux-saga');
var reduxInjectors = require('redux-injectors');
var immer = require('immer');
var selectors = require('./selectors-VGpE6wyV.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var thunkMiddleware__default = /*#__PURE__*/_interopDefault(thunkMiddleware);
var createSagaMiddleware__default = /*#__PURE__*/_interopDefault(createSagaMiddleware);

const ACTION_PREFIX = '@NAVIGATION/';
const GET_NODE_TREE = `${ACTION_PREFIX}_GET_NODE_TREE`;
const SET_NODE_TREE = `${ACTION_PREFIX}_SET_NODE_TREE`;
const GET_NODE_TREE_ERROR = `${ACTION_PREFIX}_GET_NODE_TREE_ERROR`;

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_NODE_TREE: GET_NODE_TREE,
  GET_NODE_TREE_ERROR: GET_NODE_TREE_ERROR,
  SET_NODE_TREE: SET_NODE_TREE
});

const initialState$2 = {
  root: null,
  error: {
    isError: false,
    message: null
  },
  isReady: false
};
var NavigationReducer = immer.produce((state, action) => {
  switch (action.type) {
    case SET_NODE_TREE:
      {
        state.root = action.nodes;
        state.isReady = true;
        return;
      }
    case GET_NODE_TREE_ERROR:
      {
        state.error.isError = true;
        state.error.message = action.error || 'Unknown error occurred';
        return;
      }
    default:
      return;
  }
}, initialState$2);

const initialState$1 = {
  canonicalPath: null,
  currentHostname: null,
  currentPath: '/',
  currentNode: {},
  currentNodeAncestors: [],
  currentProject: 'unknown',
  entryID: null,
  entry: null,
  error: undefined,
  isError: false,
  isLoading: false,
  location: {},
  mappedEntry: null,
  notFound: false,
  staticRoute: null,
  statusCode: 200,
  surrogateKeys: [],
  apiCalls: []
};
var RoutingReducer = immer.produce((state, action) => {
  switch (action.type) {
    case selectors.SET_ANCESTORS:
      {
        state.currentNodeAncestors = action.ancestors;
        return;
      }
    case selectors.SET_ENTRY:
      {
        const {
          entry,
          error,
          mappedEntry,
          node = {},
          isError = false,
          isLoading = false,
          notFound = false,
          statusCode,
          currentPath
        } = action;
        let defaultStatus = 200;
        if (notFound === true && isError === false) defaultStatus = 404;else if (isError === true) defaultStatus = statusCode || 500;
        if (!entry) {
          state.entryID = null;
          state.entry = null;
          state.error = error;
          state.mappedEntry = null;
          state.isError = isError;
          state.isLoading = isLoading;
          state.notFound = notFound;
          state.statusCode = statusCode || defaultStatus;
          state.canonicalPath = currentPath;
        } else {
          state.entryID = action.id;
          state.entry = entry;
          state.error = error;
          state.isError = isError;
          state.isLoading = isLoading;
          state.notFound = notFound;
          state.statusCode = statusCode || defaultStatus;
          state.canonicalPath = entry.sys.uri || currentPath;
          if (mappedEntry && Object.keys(mappedEntry).length > 0) {
            state.mappedEntry = mappedEntry;
            state.entry = {
              sys: entry.sys
            };
          }
        }
        if (!node) {
          state.currentNode = null;
        } else {
          // On Set Node, we reset all dependants.
          state.currentNode = node;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const {
            entry,
            ...nodeWithoutEntry
          } = node; // We have the entry stored elsewhere, so lets not keep it twice.
          state.currentNode = nodeWithoutEntry;
        }
        return;
      }
    case selectors.UPDATE_LOADING_STATE:
      {
        state.isLoading = action.isLoading;
        return;
      }
    case selectors.SET_NAVIGATION_PATH:
      {
        let staticRoute = {};
        if (action.staticRoute) {
          staticRoute = {
            ...action.staticRoute
          };
        }
        if (action.path) {
          var _state$entry, _state$entry$sys;
          // Don't run a path update on initial load as we allready should have it in redux
          const entryUri = state === null || state === void 0 ? void 0 : (_state$entry = state.entry) === null || _state$entry === void 0 ? void 0 : (_state$entry$sys = _state$entry.sys) === null || _state$entry$sys === void 0 ? void 0 : _state$entry$sys.uri;
          if (entryUri !== action.path) {
            state.currentPath = action.path;
            state.location = action.location;
            state.staticRoute = {
              ...staticRoute,
              route: {
                ...staticRoute.route,
                component: null
              }
            };
            state.isLoading = typeof window !== 'undefined';
          } else {
            state.location = action.location;
            state.staticRoute = {
              ...staticRoute,
              route: {
                ...staticRoute.route,
                component: null
              }
            };
          }
        }
        return;
      }
    case selectors.SET_ROUTE:
      {
        state.nextPath = action.path;
        return;
      }
    case selectors.SET_SIBLINGS:
      {
        // Can be null in some cases like the homepage.
        let currentNodeSiblingParent = null;
        if (action.siblings && action.siblings.length > 0) {
          currentNodeSiblingParent = action.siblings[0].parentId;
        }
        state.currentNodeSiblings = action.siblings;
        state.currentNodeSiblingsParent = currentNodeSiblingParent;
        return;
      }
    case selectors.SET_SURROGATE_KEYS:
      {
        const newKeys = (action.keys || '').split(' ');
        const allKeys = [...immer.original(state.surrogateKeys), ...newKeys];
        const uniqueKeys = [...new Set(allKeys)];
        state.surrogateKeys = uniqueKeys;
        state.apiCalls = [...immer.original(state.apiCalls), [action.status, newKeys.length, action.url]];
        return;
      }
    case selectors.SET_TARGET_PROJECT:
      {
        state.currentProject = action.project;
        state.allowedGroups = action.allowedGroups;
        state.currentHostname = action.hostname;
        return;
      }
    default:
      return state;
  }
}, initialState$1);

const VERSION_PREFIX = '@VERSION/';
const SET_VERSION = `${VERSION_PREFIX}SET_VERSION`;
const SET_VERSION_STATUS = `${VERSION_PREFIX}SET_VERSION_STATUS`;

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SET_VERSION: SET_VERSION,
  SET_VERSION_STATUS: SET_VERSION_STATUS
});

const initialState = {
  commitRef: null,
  buildNo: null,
  contensisVersionStatus: null
};
var VersionReducer = immer.produce((state, action) => {
  switch (action.type) {
    case SET_VERSION_STATUS:
      {
        state.contensisVersionStatus = action.status;
        return;
      }
    case SET_VERSION:
      {
        state.commitRef = action.commitRef;
        state.buildNo = action.buildNo;
        return;
      }
    default:
      return;
  }
}, initialState);

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

exports.reduxStore = void 0;
var createStore = async (featureReducers, initialState, history, stateType) => {
  let reduxDevToolsMiddleware = f => f;
  if (typeof window != 'undefined') {
    reduxDevToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
  }
  const sagaMiddleware = createSagaMiddleware__default.default();
  const reducers = {
    navigation: NavigationReducer,
    routing: RoutingReducer,
    user: selectors.UserReducer,
    version: VersionReducer,
    ...featureReducers
  };

  // Reassign the combiner and fromJS functions when
  // stateType is 'immutable' with dynamic imports
  let combiner = redux.combineReducers;
  let fromJS = obj => obj;
  globalThis.STATE_TYPE = stateType;
  if (stateType === 'immutable') {
    globalThis.immutable = await import(/* webpackChunkName: "immutable" */'immutable');
    fromJS = (await Promise.resolve().then(function () { return require(/* webpackChunkName: "from-js" */'./fromJSLeaveImmer-Drk6JyYs.js'); })).default;
    combiner = (await import(/* webpackChunkName: "redux-immutable" */'redux-immutable')).combineReducers;
  }
  const createReducer = (injectedReducers = {}) => {
    const rootReducer = combiner({
      ...injectedReducers,
      // other non-injected reducers go here
      ...reducers
    });
    return rootReducer;
  };
  const store = initialState => {
    const runSaga = sagaMiddleware.run;
    const middleware = redux.compose(redux.applyMiddleware(thunkMiddleware__default.default, sagaMiddleware, routerMiddleware(history)), reduxInjectors.createInjectorsEnhancer({
      createReducer,
      runSaga
    }), reduxDevToolsMiddleware);
    const store = redux.createStore(createReducer(), initialState, middleware);
    store.runSaga = runSaga;
    store.close = () => store.dispatch(createSagaMiddleware.END);
    return store;
  };
  exports.reduxStore = store(fromJS(initialState));
  return exports.reduxStore;
};

exports.GET_NODE_TREE = GET_NODE_TREE;
exports.GET_NODE_TREE_ERROR = GET_NODE_TREE_ERROR;
exports.SET_NODE_TREE = SET_NODE_TREE;
exports.SET_VERSION = SET_VERSION;
exports.SET_VERSION_STATUS = SET_VERSION_STATUS;
exports.createStore = createStore;
exports.navigation = navigation;
exports.version = version;
//# sourceMappingURL=store-C7cLStZQ.js.map
