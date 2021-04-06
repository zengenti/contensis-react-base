import { Map, List, fromJS, OrderedMap, Set } from 'immutable';
import { z as SET_TARGET_PROJECT, A as SET_SURROGATE_KEYS, m as SET_SIBLINGS, d as SET_ROUTE, S as SET_NAVIGATION_PATH, U as UPDATE_LOADING_STATE, k as SET_ENTRY, l as SET_ANCESTORS, C as CALL_HISTORY_METHOD, B as action } from './routing-2c78fa4d.js';
import { compose, applyMiddleware, createStore as createStore$1 } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import { U as UserReducer } from './reducers-0ef43b76.js';

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
        .set('allowedGroups', fromJS(action.allowedGroups));
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
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */

/* eslint-disable no-unused-vars */

const routerMiddleware = history => store => next => action => {
  if (action.type !== CALL_HISTORY_METHOD) {
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

let reduxStore = null;
var createStore = ((featureReducers, initialState, history) => {
  const thunkMiddleware = [thunk];

  let reduxDevToolsMiddleware = f => f;

  if (typeof window != 'undefined') {
    reduxDevToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
  }

  const sagaMiddleware = createSagaMiddleware();
  const middleware = compose(applyMiddleware(...thunkMiddleware, sagaMiddleware, routerMiddleware(history)), reduxDevToolsMiddleware);
  let reducers = {
    navigation: NavigationReducer,
    routing: RoutingReducer,
    user: UserReducer,
    version: VersionReducer,
    ...featureReducers
  };
  const combinedReducers = combineReducers(reducers);

  const store = initialState => {
    const store = createStore$1(combinedReducers, initialState, middleware);
    store.runSaga = sagaMiddleware.run;

    store.close = () => store.dispatch(END);

    return store;
  };

  reduxStore = store(initialState);
  return reduxStore;
});

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

const selectCommitRef = state => {
  return state.getIn(['version', 'commitRef']);
};
const selectBuildNumber = state => {
  return state.getIn(['version', 'buildNo']);
};
const selectVersionStatus = state => {
  return state.getIn(['version', 'contensisVersionStatus']);
};

var version$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectCommitRef: selectCommitRef,
  selectBuildNumber: selectBuildNumber,
  selectVersionStatus: selectVersionStatus
});

export { GET_NODE_TREE as G, SET_NODE_TREE as S, setVersion as a, selectVersionStatus as b, createStore as c, GET_NODE_TREE_ERROR as d, version$1 as e, navigation$1 as f, version$2 as g, hasNavigationTree as h, navigation as n, reduxStore as r, setVersionStatus as s, version as v };
//# sourceMappingURL=version-5fdabc60.js.map
