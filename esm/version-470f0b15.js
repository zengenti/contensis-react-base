import { g as getImmutableOrJS, t as action } from './selectors-337be432.js';
import { all } from '@redux-saga/core/effects';
import { compose, applyMiddleware, createStore as createStore$1, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import { createInjectorsEnhancer } from 'redux-injectors';
import { produce } from 'immer';
import merge from 'deepmerge';
import { h as SET_TARGET_PROJECT, i as SET_SURROGATE_KEYS, e as SET_SIBLINGS, b as SET_ROUTE, S as SET_NAVIGATION_PATH, U as UPDATE_LOADING_STATE, c as SET_ENTRY, d as SET_ANCESTORS } from './actions-fcfc8704.js';
import { U as UserReducer } from './reducers-8e5d6232.js';

const ACTION_PREFIX = '@NAVIGATION/';
const GET_NODE_TREE = `${ACTION_PREFIX}_GET_NODE_TREE`;
const SET_NODE_TREE = `${ACTION_PREFIX}_SET_NODE_TREE`;
const GET_NODE_TREE_ERROR = `${ACTION_PREFIX}_GET_NODE_TREE_ERROR`;

var navigation$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_NODE_TREE: GET_NODE_TREE,
  SET_NODE_TREE: SET_NODE_TREE,
  GET_NODE_TREE_ERROR: GET_NODE_TREE_ERROR
});

const initialState$2 = {
  root: null,
  isError: false,
  isReady: false
};
var NavigationReducer = produce((state, action) => {
  switch (action.type) {
    case SET_NODE_TREE:
      {
        state.root = action.nodes;
        state.isReady = true;
        return;
      }

    case GET_NODE_TREE_ERROR:
      {
        state.isError = true;
        return;
      }

    default:
      return;
  }
}, initialState$2);

const combineMerge = (target, source, options) => {
  const destination = target.slice();
  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
};

const initialState$1 = {
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
  statusCode: 200
};
var RoutingReducer = produce((state, action) => {
  switch (action.type) {
    case SET_ANCESTORS:
      {
        state.currentNodeAncestors = action.ancestors;
        return;
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

        if (!entry) {
          state.entryID = null;
          state.entry = null;
          state.error = error;
          state.mappedEntry = null;
          state.isError = isError;
          state.isLoading = isLoading;
          state.notFound = notFound;
          state.statusCode = statusCode || defaultStatus;
        } else {
          state.entryID = action.id;
          state.entry = entry;
          state.error = error;
          state.isError = isError;
          state.isLoading = isLoading;
          state.notFound = notFound;
          state.statusCode = statusCode || defaultStatus;

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
          state.currentNode = node; // eslint-disable-next-line @typescript-eslint/no-unused-vars

          const {
            entry,
            ...nodeWithoutEntry
          } = node; // We have the entry stored elsewhere, so lets not keep it twice.

          state.currentNode = nodeWithoutEntry;
        }

        return;
      }

    case UPDATE_LOADING_STATE:
      {
        state.isLoading = action.isLoading;
        return;
      }

    case SET_NAVIGATION_PATH:
      {
        let staticRoute = {};

        if (action.staticRoute) {
          staticRoute = { ...action.staticRoute
          };
        }

        if (action.path) {
          var _state$entry, _state$entry$sys;

          // Don't run a path update on initial load as we allready should have it in redux
          const entryUri = state === null || state === void 0 ? void 0 : (_state$entry = state.entry) === null || _state$entry === void 0 ? void 0 : (_state$entry$sys = _state$entry.sys) === null || _state$entry$sys === void 0 ? void 0 : _state$entry$sys.uri;

          if (entryUri !== action.path) {
            state.currentPath = action.path;
            state.location = action.location;
            state.staticRoute = { ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            };
            state.isLoading = typeof window !== 'undefined';
          } else {
            state.location = action.location;
            state.staticRoute = { ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            };
          }
        }

        return;
      }

    case SET_ROUTE:
      {
        state.nextPath = action.path;
        return;
      }

    case SET_SIBLINGS:
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

    case SET_SURROGATE_KEYS:
      {
        // console.info(`SET_SURROGATE_KEYS: '${action.url}' keys: ${action.keys}`);
        state.surrogateKeys = merge(state.surrogateKeys, (action.keys || '').split(' '), {
          arrayMerge: combineMerge
        });
        return;
      }

    case SET_TARGET_PROJECT:
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

var version$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SET_VERSION: SET_VERSION,
  SET_VERSION_STATUS: SET_VERSION_STATUS
});

const initialState = {
  commitRef: null,
  buildNo: null,
  contensisVersionStatus: 'published'
};
var VersionReducer = produce((state, action) => {
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

let reduxStore;
/* eslint-disable no-underscore-dangle */

var createStore = (async (featureReducers, initialState, history, stateType) => {
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
  }; // Reassign the combiner and fromJS functions when
  // stateType is 'immutable' with dynamic imports

  let combiner = combineReducers;

  let fromJS = obj => obj;

  globalThis.STATE_TYPE = stateType;

  if (stateType === 'immutable') {
    globalThis.immutable = await import(
    /* webpackChunkName: "immutable" */
    'immutable');
    fromJS = (await import(
    /* webpackChunkName: "from-js" */
    './fromJSLeaveImmer-0114ffcf.js')).default;
    combiner = (await import(
    /* webpackChunkName: "redux-immutable" */
    'redux-immutable')).combineReducers;
  }

  const createReducer = (injectedReducers = {}) => {
    const rootReducer = combiner({ ...injectedReducers,
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

  reduxStore = store(fromJS(initialState));
  return reduxStore;
});

const hasNavigationTree = state => getImmutableOrJS(state, ['navigation', 'isReady']);
const selectNavigationRoot = state => getImmutableOrJS(state, ['navigation', 'root']);
const selectNavigationChildren = state => getImmutableOrJS(state, ['navigation', 'root', 'children']);
const selectNavigationDepends = () => [];

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasNavigationTree: hasNavigationTree,
  selectNavigationRoot: selectNavigationRoot,
  selectNavigationChildren: selectNavigationChildren,
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

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setVersion: setVersion,
  setVersionStatus: setVersionStatus
});

export { GET_NODE_TREE as G, SET_NODE_TREE as S, setVersion as a, GET_NODE_TREE_ERROR as b, createStore as c, version as d, navigation as e, convertSagaArray as f, injectReducer as g, hasNavigationTree as h, injectRedux as i, injectSaga as j, navigation$1 as n, reduxStore as r, setVersionStatus as s, useInjectRedux as u, version$1 as v };
//# sourceMappingURL=version-470f0b15.js.map
