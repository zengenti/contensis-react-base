import 'react';
import 'react-redux';
import { OrderedMap, List, fromJS, Set as Set$1, Map } from 'immutable';
import { Client } from 'contensis-delivery-api';
import { t as action, u as SET_TARGET_PROJECT, i as SET_SIBLINGS, e as SET_ROUTE, S as SET_NAVIGATION_PATH, U as UPDATE_LOADING_STATE, g as SET_ENTRY, h as SET_ANCESTORS, C as CALL_HISTORY_METHOD } from './selectors-5b478abf.js';
import { compose, applyMiddleware, createStore as createStore$1 } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import { U as UserReducer } from './sagas-bb225af4.js';

const getClientConfig = project => {
  let config = DELIVERY_API_CONFIG;
  /* global DELIVERY_API_CONFIG */

  if (project) {
    config.projectId = project;
  }

  if (typeof window != 'undefined' && PROXY_DELIVERY_API
  /* global PROXY_DELIVERY_API */
  ) {
      // ensure a relative url is used to bypass the need for CORS (separate OPTIONS calls)
      config.rootUrl = '';
      config.responseHandler = {
        404: () => null
      };
    }

  return config;
};

const GetClientSideDeliveryApiStatus = () => {
  if (typeof window != 'undefined') {
    const currentHostname = window.location.hostname;
    return GetDeliveryApiStatusFromHostname(currentHostname);
  }

  return null;
};
const GetDeliveryApiStatusFromHostname = currentHostname => {
  if (currentHostname.indexOf('localhost') > -1) return 'latest';

  if (currentHostname.endsWith('contensis.cloud')) {
    if (currentHostname.indexOf('preview.') > -1) {
      return 'latest';
    } else {
      return 'published';
    }
  }

  if (currentHostname.endsWith('cloud.contensis.com')) {
    if (currentHostname.indexOf('preview-') > -1) {
      return 'latest';
    } else {
      return 'published';
    }
  }

  return 'published';
};
const GetResponseGuids = object => {
  let Ids = [];
  Object.keys(object).some(function (k) {
    if (k === 'sys') {
      //Should always have an ID, but lets check...
      if (object[k].id && object[k].language) {
        // We can exclude assets here i think... ?
        if (object[k].dataFormat) {
          if (object[k].dataFormat !== 'asset') {
            Ids.push(`${object[k].id}_${object[k].language.toLowerCase()}`);
          }
        } else {
          // If we don't have a dataformat add it anyhow, for safety
          Ids.push(`${object[k].id}_${object[k].language.toLowerCase()}`);
        }
      }

      return false;
    }

    if (object[k] && typeof object[k] === 'object') {
      let subIds = GetResponseGuids(object[k]);

      if (subIds.length > 0) {
        Ids.push(...subIds);
      }

      return false;
    }
  });
  return Ids;
};
const GetAllResponseGuids = object => {
  if (!object) return [];
  let returnItems = GetResponseGuids(object);
  let unique = new Set(returnItems);
  return unique;
};

class DeliveryApi {
  search(query, linkDepth, project, env) {
    const client = Client.create(getClientConfig(project));
    return client.entries.search(query, typeof linkDepth !== 'undefined' ? linkDepth : 1);
  }

  getClient(deliveryApiStatus = 'published', project, env) {
    const baseConfig = getClientConfig(project);
    baseConfig.versionStatus = deliveryApiStatus;
    return Client.create(baseConfig);
  }

  getEntry(id, linkDepth = 0, deliveryApiStatus = 'published', project, env) {
    const baseConfig = getClientConfig(project);
    baseConfig.versionStatus = deliveryApiStatus;
    const client = Client.create(baseConfig); // return client.entries.get(id, linkDepth);

    return client.entries.get({
      id,
      linkDepth
    });
  }

}

const deliveryApi = new DeliveryApi();

class CacheNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }

}

class LruCache {
  constructor(limit = 100) {
    this.map = {};
    this.head = null;
    this.tail = null;
    this.limit = limit || 100;
    this.size = 0;
  }

  get(key) {
    if (this.map[key]) {
      let value = this.map[key].value;
      let node = new CacheNode(key, value);
      this.remove(key);
      this.setHead(node);
      return value;
    }
  }

  set(key, value) {
    let node = new CacheNode(key, value);

    if (this.map[key]) {
      this.remove(key);
    } else {
      if (this.size >= this.limit) {
        delete this.map[this.tail.key];
        this.size--;
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
    }

    this.setHead(node);
  }

  setHead(node) {
    node.next = this.head;
    node.prev = null;

    if (this.head) {
      this.head.prev = node;
    }

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    this.size++;
    this.map[node.key] = node;
  }

  remove(key) {
    let node = this.map[key];

    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    delete this.map[key];
    this.size--;
  }

}

class CachedSearch {
  constructor() {
    this.cache = new LruCache();
    this.taxonomyLookup = {};
  }

  search(query, linkDepth, project, env) {
    const client = Client.create(getClientConfig(project));
    return this.request(project + JSON.stringify(query) + linkDepth.toString(), () => client.entries.search(query, linkDepth));
  }

  get(id, linkDepth, versionStatus, project, env) {
    const client = Client.create(getClientConfig(project));
    client.clientConfig.versionStatus = versionStatus;
    return this.request(id, () => client.entries.get({
      id,
      linkDepth
    }));
  }

  getContentType(id, project, env) {
    const client = Client.create(getClientConfig(project));
    return this.request(`[CONTENT TYPE] ${id} ${project}`, () => client.contentTypes.get(id));
  }

  getTaxonomyNode(key, project, env) {
    const client = Client.create(getClientConfig(project));
    return this.request(`[TAXONOMY NODE] ${key}`, () => client.taxonomy.resolveChildren(key).then(node => this.extendTaxonomyNode(node)));
  }

  getRootNode(options, project, env) {
    const client = Client.create(getClientConfig(project));
    return this.request(`${project} / ${JSON.stringify(options)}`, () => client.nodes.getRoot(options));
  }

  getNode(options, project, env) {
    const client = Client.create(getClientConfig(project));
    return this.request(`${project} ${options && options.path || options} ${JSON.stringify(options)}`, () => client.nodes.get(options));
  }

  getAncestors(options, project, env) {
    const client = Client.create(getClientConfig(project));
    return this.request(`${project} [A] ${options && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getAncestors(options));
  }

  getChildren(options, project, env) {
    const client = Client.create(getClientConfig(project));
    return this.request(`${project} [C] ${options && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getChildren(options));
  }

  getSiblings(options, project, env) {
    const client = Client.create(getClientConfig(project));
    return this.request(`${project} [S] ${options && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getSiblings(options));
  }

  request(key, execute) {
    if (!this.cache.get(key) || typeof window == 'undefined') {
      let promise = execute();
      this.cache.set(key, promise);
      promise.catch(() => {
        this.cache.remove(key);
      });
    }

    return this.cache.get(key);
  }

  extendTaxonomyNode(node) {
    let id = this.getTaxonomyId(node);
    this.taxonomyLookup[id] = node.key;
    return { ...node,
      id,
      children: node.children ? node.children.map(n => this.extendTaxonomyNode(n)) : null
    };
  }

  getTaxonomyId(node) {
    if (node.key) {
      let parts = node.key.split('/');
      return parts[parts.length - 1];
    }

    return '';
  }

  getTaxonomyKey(id) {
    return this.taxonomyLookup[id];
  }

}

const cachedSearch = new CachedSearch();

const VERSION_PREFIX = '@VERSION/';
const SET_VERSION = `${VERSION_PREFIX}SET_VERSION`;
const SET_VERSION_STATUS = `${VERSION_PREFIX}SET_VERSION_STATUS`;

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SET_VERSION: SET_VERSION,
  SET_VERSION_STATUS: SET_VERSION_STATUS
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

let initialState = OrderedMap({
  contentTypeId: null,
  currentPath: '/',
  currentNode: OrderedMap(),
  currentNodeAncestors: List(),
  currentProject: 'unknown',
  currentTreeId: null,
  entry: null,
  entryDepends: List(),
  entryID: null,
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
var RoutingReducer = ((state = initialState, action) => {
  switch (action.type) {
    case SET_ANCESTORS:
      {
        if (action.ancestors) {
          let ancestorIDs = action.ancestors.map(node => {
            return node.id;
          });
          let currentNodeDepends = state.get('nodeDepends');
          const allNodeDepends = Set$1.union([Set$1(ancestorIDs), currentNodeDepends]);
          return state.set('nodeDepends', allNodeDepends).set('currentNodeAncestors', fromJS(action.ancestors));
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
          nextState = state.set('entryID', null).set('entryDepends', List()).set('entry', null).set('error', fromJS(error)).set('mappedEntry', null).set('isError', isError).set('isLoading', isLoading).set('notFound', notFound).set('statusCode', statusCode || defaultStatus);
        } else {
          const entryDepends = GetAllResponseGuids(entry);
          nextState = state.set('entryID', action.id).set('entryDepends', fromJS(entryDepends)).set('entry', fromJS(entry)).set('error', fromJS(error)).set('isError', isError).set('isLoading', isLoading).set('notFound', notFound).set('statusCode', statusCode || defaultStatus);
          if (mappedEntry) nextState = nextState.set('mappedEntry', fromJS(mappedEntry)).set('entry', fromJS({
            sys: entry.sys
          }));
        }

        if (!node) {
          return nextState.set('nodeDepends', null).set('currentNode', null);
        } else {
          // On Set Node, we reset all dependants.
          const nodeDepends = Set$1([node.id]);
          return nextState.set('nodeDepends', nodeDepends).set('currentNode', fromJS(node)).removeIn(['currentNode', 'entry']); // We have the entry stored elsewhere, so lets not keep it twice.
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
          // Don't run a path update on iniutial load as we allready should have it in redux
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
        const allNodeDepends = Set$1.union([Set$1(siblingIDs), currentNodeDepends]);
        return state.set('nodeDepends', allNodeDepends).set('currentNodeSiblings', fromJS(action.siblings)).set('currentNodeSiblingsParent', currentNodeSiblingParent);
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

let initialState$1 = Map({
  commitRef: null,
  buildNo: null,
  contensisVersionStatus: 'published'
});
var VersionReducer = ((state = initialState$1, action) => {
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

const initialState$2 = Map({
  root: null,
  treeDepends: new List([]),
  isError: false,
  isReady: false
});
var NavigationReducer = ((state = initialState$2, action) => {
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

export { GetDeliveryApiStatusFromHostname as G, SET_NODE_TREE as S, setVersion as a, selectVersionStatus as b, createStore as c, cachedSearch as d, deliveryApi as e, GET_NODE_TREE as f, GET_NODE_TREE_ERROR as g, hasNavigationTree as h, GetClientSideDeliveryApiStatus as i, version$1 as j, navigation$1 as k, version$2 as l, navigation as n, reduxStore as r, setVersionStatus as s, version as v };
//# sourceMappingURL=navigation-55ccfe56.js.map
