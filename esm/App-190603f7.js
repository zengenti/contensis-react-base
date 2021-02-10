import React from 'react';
import { Map, List, fromJS, OrderedMap, Set } from 'immutable';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { Client, Op, Query } from 'contensis-delivery-api';
import { S as SET_TARGET_PROJECT, c as SET_SURROGATE_KEYS, d as SET_SIBLINGS, e as SET_ROUTE, f as SET_NAVIGATION_PATH, U as UPDATE_LOADING_STATE, g as SET_ENTRY, h as SET_ANCESTORS, C as CALL_HISTORY_METHOD, i as setSurrogateKeys, b as selectCurrentProject, a as selectRouteEntry, j as selectCurrentNode, k as selectCurrentAncestors, l as findContentTypeMapping, m as selectRouteEntryEntryId, n as selectRouteEntryLanguage, o as selectMappedEntry, q as queryParams, p as selectCurrentSearch, r as setRoute } from './routing-64807af8.js';
import { compose, applyMiddleware, createStore as createStore$1 } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import { G as GET_NODE_TREE_ERROR, S as SET_NODE_TREE, b as SET_VERSION, c as SET_VERSION_STATUS, d as GET_NODE_TREE, h as hasNavigationTree, e as selectVersionStatus } from './version-41f7c83e.js';
import { U as UserReducer, h as handleRequiresLoginSaga, R as REGISTER_USER, a as REGISTER_USER_SUCCESS, b as REGISTER_USER_FAILED, l as loginSagas } from './login-417f3f96.js';
import { takeEvery, select, put, call, all } from '@redux-saga/core/effects';
import { info, error } from 'loglevel';
import { to } from 'await-to-js';
import 'react-hot-loader';
import { R as RouteLoader } from './RouteLoader-fc78472d.js';

const selectedHistory = typeof window !== 'undefined' ? createBrowserHistory : createMemoryHistory;
const history = (options = {}) => selectedHistory(options);
const browserHistory = selectedHistory();

const servers = SERVERS;
/* global SERVERS */

const alias = servers.alias.toLowerCase();
const publicUri = PUBLIC_URI;
/* global PUBLIC_URI */

const projects = PROJECTS;
/* global PROJECTS */
// return a projectId via the request hostname

const pickProject = (hostname, query) => {
  // if localhost we can only infer via a querystring, and take your word for it
  if (hostname == 'localhost') {
    return query && query.p || projects[0].id;
  } // if hostname is the actual public uri we can return the first project from the list


  if (hostname == publicUri) {
    return projects[0].id;
  }

  let project = 'unknown'; // // go through all the defined projects
  // Object.entries(projects).map(([, p]) => {

  const p = projects[0]; // check if we're accessing via the project's public uri

  if (hostname.includes(p.publicUri)) project = p.id; // the url structure is different for website (we don't prefix)

  if (p.id.startsWith('website')) {
    // check for internal and external hostnames
    // we check live and preview distinctly so our rule does not clash with
    // hostnames that use a project prefix
    if (hostname.includes(`live-${alias}.cloud.contensis.com`) || hostname.includes(`live.${alias}.contensis.cloud`) || hostname.includes(`preview-${alias}.cloud.contensis.com`) || hostname.includes(`preview.${alias}.contensis.cloud`)) project = p.id;
  } else {
    // check for internal and external hostnames, prefixed with the projectId
    if (hostname.includes(`${p.id.toLowerCase()}-${alias}.cloud.contensis.com`) || hostname.includes(`${p.id.toLowerCase()}.${alias}.contensis.cloud`)) project = p.id;
  } // });


  return project === 'unknown' ? p.id : project;
};

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
  currentNode: [],
  currentNodeAncestors: List(),
  currentProject: 'unknown',
  entryID: null,
  entry: null,
  currentTreeId: null,
  entryDepends: List(),
  isLoading: false,
  location: null,
  mappedEntry: OrderedMap(),
  nodeDepends: List(),
  notFound: false,
  staticRoute: null
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
          mappedEntry,
          node = {},
          isLoading = false,
          notFound = false
        } = action;
        let nextState;

        if (!entry) {
          nextState = state.set('entryID', null).set('entry', null).set('mappedEntry', OrderedMap()).set('isLoading', isLoading).set('notFound', notFound);
        } else {
          nextState = state.set('entryID', action.id).set('entry', fromJS(entry)).set('isLoading', isLoading).set('notFound', notFound);
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

const storeSurrogateKeys = response => {
  const keys = response.headers.get ? response.headers.get('surrogate-key') : response.headers.map['surrogate-key'];
  if (keys) reduxStore.dispatch(setSurrogateKeys(keys));
};

const getClientConfig = project => {
  let config = DELIVERY_API_CONFIG;
  /* global DELIVERY_API_CONFIG */

  config.responseHandler = {};

  if (project) {
    config.projectId = project;
  } // // we only want the surrogate key header in a server context


  if (typeof window === 'undefined') {
    config.defaultHeaders = {
      'x-require-surrogate-key': true
    };
    config.responseHandler[200] = storeSurrogateKeys;
  }

  if (typeof window !== 'undefined' && PROXY_DELIVERY_API
  /* global PROXY_DELIVERY_API */
  ) {
      // ensure a relative url is used to bypass the need for CORS (separate OPTIONS calls)
      config.rootUrl = '';

      config.responseHandler[404] = () => null;
    }

  return config;
};

class DeliveryApi {
  constructor() {
    this.getClientSideVersionStatus = () => {
      if (typeof window != 'undefined') {
        const currentHostname = window.location.hostname;
        return this.getVersionStatusFromHostname(currentHostname);
      }

      return null;
    };

    this.getVersionStatusFromHostname = currentHostname => {
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

    this.search = (query, linkDepth, project, env) => {
      const client = Client.create(getClientConfig(project));
      return client.entries.search(query, typeof linkDepth !== 'undefined' ? linkDepth : 1);
    };

    this.getClient = (deliveryApiStatus = 'published', project, env) => {
      const baseConfig = getClientConfig(project);
      baseConfig.versionStatus = deliveryApiStatus;
      return Client.create(baseConfig);
    };

    this.getEntry = (id, linkDepth = 0, deliveryApiStatus = 'published', project, env) => {
      const baseConfig = getClientConfig(project);
      baseConfig.versionStatus = deliveryApiStatus;
      const client = Client.create(baseConfig); // return client.entries.get(id, linkDepth);

      return client.entries.get({
        id,
        linkDepth
      });
    };
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

const navigationSagas = [takeEvery(GET_NODE_TREE, ensureNodeTreeSaga)];
function* ensureNodeTreeSaga(action) {
  const state = yield select();

  try {
    if (!hasNavigationTree(state)) {
      const deliveryApiVersionStatus = yield select(selectVersionStatus);
      const project = yield select(selectCurrentProject);
      const nodes = yield deliveryApi.getClient(deliveryApiVersionStatus, project).nodes.getRoot({
        depth: action.treeDepth || 0
      });

      if (nodes) {
        yield put({
          type: SET_NODE_TREE,
          nodes
        });
      } else {
        yield put({
          type: GET_NODE_TREE_ERROR
        });
      }
    }
  } catch (ex) {
    yield put({
      type: GET_NODE_TREE_ERROR,
      error: ex.toString()
    });
  }
}

const sys = {
  contentTypeId: 'sys.contentTypeId',
  dataFormat: 'sys.dataFormat',
  filename: 'sys.properties.filename',
  id: 'sys.id',
  includeInSearch: 'sys.metadata.includeInSearch',
  slug: 'sys.slug',
  uri: 'sys.uri',
  versionStatus: 'sys.versionStatus'
};
const Fields = {
  entryTitle: 'entryTitle',
  entryDescription: 'entryDescription',
  keywords: 'keywords',
  sys,
  contentTypeId: 'sys.contentTypeId',
  wildcard: '*'
};

const fieldExpression = (field, value, operator = 'equalTo', weight = null) => {
  if (!field || !value) return [];
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? [Op[operator](field, value)] : [Op[operator](field, value).weight(weight)];
};
const defaultExpressions = versionStatus => {
  return [Op.equalTo(Fields.sys.versionStatus, versionStatus)];
};

const equalToOrIn = (field, arr, operator = 'equalTo') => arr.length === 0 ? [] : arr.length === 1 ? [Op[operator](field, arr[0])] : [Op.in(field, ...arr)];

// eslint-disable-next-line import/named
const routeEntryByFieldsQuery = (id, fields = [], versionStatus = 'published') => {
  const query = new Query(...[...fieldExpression('sys.id', id), ...defaultExpressions(versionStatus)]);
  query.fields = fields;
  return query;
};

// load-entries.js
const routingSagas = [takeEvery(SET_NAVIGATION_PATH, getRouteSaga), takeEvery(SET_ROUTE, setRouteSaga)];
/**
 * To navigate / push a specific route via redux middleware
 * @param {path, state} action
 */

function* setRouteSaga(action) {
  yield put({
    type: CALL_HISTORY_METHOD,
    payload: {
      method: 'push',
      args: [action.path, action.state]
    }
  });
}

function* getRouteSaga(action) {
  let entry = null;

  try {
    const {
      withEvents,
      routes: {
        ContentTypeMappings = {}
      } = {},
      staticRoute
    } = action; // Variables we will pass to setRouteEntry

    let pathNode = null,
        ancestors = null,
        siblings = null; // These variables are the return values from
    // calls to withEvents.onRouteLoad and onRouteLoaded

    let appsays,
        requireLogin = false;

    if (withEvents && withEvents.onRouteLoad) {
      appsays = yield withEvents.onRouteLoad(action);
    } // if appsays customNavigation: true, we will set doNavigation to false
    // if appsays customNavigation: { ... }, we will set doNavigation to the customNavigation object and check for child elements
    // if appsays nothing we will set doNavigation to true and continue to do navigation calls


    const doNavigation = !appsays || (appsays && appsays.customNavigation === true ? false : appsays && appsays.customNavigation || true);
    const entryLinkDepth = appsays && appsays.entryLinkDepth || 3;
    const setContentTypeLimits = !!ContentTypeMappings.find(ct => ct.fields || ct.linkDepth);
    const state = yield select();
    const routeEntry = selectRouteEntry(state); // const routeNode = selectCurrentNode(state);

    const currentPath = action.path; //selectCurrentPath(state);

    const deliveryApiStatus = selectVersionStatus(state);
    const project = selectCurrentProject(state);
    const isHome = currentPath === '/';
    const isPreview = currentPath && currentPath.startsWith('/preview/');
    const defaultLang = appsays && appsays.defaultLang || 'en-GB'; // debugger;
    // routeEntry = Map({
    //   entryTitle: 'fake entry',
    //   title: 'fakey entry',
    //   sys: { id: 'abcd', contentTypeId: 'zenbaseHomePage' },
    // });

    if (!isPreview && (appsays && appsays.customRouting || staticRoute && !staticRoute.route.fetchNode || routeEntry && action.statePath === action.path)) {
      // To prevent erroneous 404s and wasted network calls, this covers
      // - appsays customRouting and does SET_ENTRY etc. via the consuming app
      // - all staticRoutes (where custom 'route.fetchNode' attribute is falsey)
      // - standard Contensis SiteView Routing where we already have that entry in state
      if (routeEntry && (!staticRoute || staticRoute.route && staticRoute.route.fetchNode)) {
        pathNode = {};
        pathNode.entry = entry = routeEntry.toJS(); //Do nothing, the entry is allready the right one.
        // yield put({
        //   type: SET_ENTRY,
        //   entry,
        //   node: routeNode,
        //   isLoading: false,
        // });

        yield put({
          type: UPDATE_LOADING_STATE,
          isLoading: false
        });
      } else yield call(setRouteEntry, routeEntry && routeEntry.toJS(), (yield select(selectCurrentNode)), (yield select(selectCurrentAncestors)));
    } else {
      // Handle homepage
      if (isHome) {
        pathNode = yield cachedSearch.getRootNode({
          depth: 0,
          entryFields: '*',
          entryLinkDepth,
          language: defaultLang,
          versionStatus: deliveryApiStatus
        }, project);
        ({
          entry
        } = pathNode || {});
      } else {
        // Handle preview routes
        if (isPreview) {
          let splitPath = currentPath.split('/');
          let entryGuid = splitPath[2];
          let language = defaultLang;

          if (splitPath.length >= 3) {
            //set lang key if available in the path, else use default lang
            //assumes preview url on content type is: http://preview.ALIAS.contensis.cloud/preview/{GUID}/{LANG}
            if (splitPath.length == 4) language = splitPath[3]; // According to product dev we cannot use Node API
            // for previewing entries as it gives a response of []
            // -- apparently it is not correct to request latest content
            // with Node API

            let previewEntry = yield deliveryApi.getClient(deliveryApiStatus, project).entries.get({
              id: entryGuid,
              language,
              linkDepth: entryLinkDepth
            });

            if (previewEntry) {
              pathNode = {
                entry: previewEntry
              };
              ({
                entry
              } = pathNode || {});
            }
          }
        } else {
          // Handle all other routes
          pathNode = yield cachedSearch.getNode({
            depth: doNavigation === true || doNavigation.children === true ? 3 : doNavigation && doNavigation.children || 0,
            path: currentPath,
            entryFields: setContentTypeLimits ? ['sys.contentTypeId', 'sys.id'] : '*',
            entryLinkDepth: setContentTypeLimits ? 0 : entryLinkDepth,
            versionStatus: deliveryApiStatus
          }, project);
          ({
            entry
          } = pathNode || {});

          if (setContentTypeLimits && pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id) {
            const {
              fields,
              linkDepth
            } = findContentTypeMapping(ContentTypeMappings, pathNode.entry.sys.id) || {};
            const query = routeEntryByFieldsQuery(pathNode.entry.sys.id, fields, deliveryApiStatus);
            const payload = yield cachedSearch.search(query, typeof linkDepth !== 'undefined' ? linkDepth : 3, project);

            if (payload && payload.items && payload.items.length > 0) {
              pathNode.entry = payload.items[0];
            }
          }
        }

        if (pathNode && pathNode.id) {
          if (doNavigation === true || doNavigation.ancestors) {
            try {
              ancestors = yield cachedSearch.getAncestors({
                id: pathNode.id,
                versionStatus: deliveryApiStatus
              }, project);
            } catch (ex) {
              info('Problem fetching ancestors', ex);
            }
          }

          if (doNavigation === true || doNavigation.siblings) {
            try {
              siblings = yield cachedSearch.getSiblings({
                id: pathNode.id,
                versionStatus: deliveryApiStatus
              }, project);
            } catch (ex) {
              info('Problem fetching siblings', ex);
            }
          }
        }
      }
    }

    if (withEvents && withEvents.onRouteLoaded) {
      // Check if the app has provided a requireLogin boolean flag or groups array
      // in addition to checking if requireLogin is set in the route definition
      ({
        requireLogin
      } = (yield withEvents.onRouteLoaded({ ...action,
        entry
      })) || {});
    }

    if (requireLogin !== false) {
      // Do not call the login feature saga if requireLogin is false
      yield call(handleRequiresLoginSaga, { ...action,
        entry,
        requireLogin
      });
    }

    if (pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id) {
      entry = pathNode.entry;
      const {
        entryMapper
      } = findContentTypeMapping(ContentTypeMappings, entry.sys.contentTypeId) || {};
      yield call(setRouteEntry, entry, pathNode, ancestors, siblings, entryMapper);
    } else {
      if (pathNode) yield call(setRouteEntry, null, pathNode, ancestors, siblings);else if (!staticRoute) yield call(do404);
    }

    if (!appsays || !appsays.preventScrollTop) {
      // Scroll into View
      if (typeof window !== 'undefined') {
        window.scroll({
          top: 0
        });
      }
    }

    if (!hasNavigationTree(state) && (doNavigation === true || doNavigation.tree)) if (typeof window !== 'undefined') {
      yield put({
        type: GET_NODE_TREE,
        treeDepth: doNavigation === true || !doNavigation.tree || doNavigation.tree === true ? 2 : doNavigation.tree
      });
    } else {
      yield call(ensureNodeTreeSaga);
    }
  } catch (e) {
    error(...['Error running route saga:', e, e.stack]);
    yield call(do404);
  }
}

function* setRouteEntry(entry, node, ancestors, siblings, entryMapper, notFound = false) {
  const entrySys = entry && entry.sys || {};
  const currentEntryId = yield select(selectRouteEntryEntryId);
  const currentEntryLang = yield select(selectRouteEntryLanguage);
  const mappedEntry = currentEntryId === entrySys.id && currentEntryLang === entrySys.language ? (yield select(selectMappedEntry) || Map()).toJS() : yield mapRouteEntry(entryMapper, { ...node,
    entry,
    ancestors,
    siblings
  });
  yield all([put({
    type: SET_ENTRY,
    id: entrySys.id,
    entry,
    mappedEntry,
    node,
    notFound
  }), ancestors && put({
    type: SET_ANCESTORS,
    ancestors
  }), siblings && put({
    type: SET_SIBLINGS,
    siblings
  })]);
}

function* mapRouteEntry(entryMapper, node) {
  try {
    if (typeof entryMapper === 'function') {
      const state = yield select();
      const mappedEntry = yield call(entryMapper, node, state);
      return mappedEntry;
    }
  } catch (e) {
    error(...['Error running entryMapper:', e, e.stack]);
  }

  return;
}

function* do404() {
  //yield call(clientReloadHitServer);
  yield put({
    type: SET_ENTRY,
    id: null,
    entry: null,
    notFound: true
  });
} // function* clientReloadHitServer() {
//   const stateEntry = yield select(selectRouteEntry);
//   // If in client and there is a stateEntry.sys field reload the page,
//   // on the 2nd load stateEntry.sys should be null at this point,
//   // we do not wish to reload again and get stuck in an infinite reloading loop
//   if (
//     typeof window !== 'undefined' &&
//     stateEntry &&
//     stateEntry.get('sys', null)
//   ) {
//     // debugger;
//     window.location.reload();
//   }
// }

const registerSagas = [takeEvery(REGISTER_USER, registerSaga), takeEvery(REGISTER_USER_SUCCESS, redirectSaga)];

function* registerSaga({
  user,
  mappers
}) {
  let requestBody = user; // Allow use of request mapper to take a user object
  // of any format and return the payload for the api request

  if (mappers && mappers.request && typeof mappers.request === 'function') {
    requestBody = yield mappers.request(user);
  } // Make POST call to register API


  const response = yield fetch('/account/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (response.ok) {
    let mappedResponse;
    const [, responseBody] = yield to(response.json());

    if (responseBody) {
      // Allow use of response mapper to convert the successful user object
      // from the api response body into a user object of any format
      if (mappers && mappers.response && typeof mappers.response === 'function') {
        mappedResponse = yield mappers.response(responseBody);
      } // Update user object with mappedResponse or responseBody


      yield put({
        type: REGISTER_USER_SUCCESS,
        user: mappedResponse || responseBody
      });
    } else {
      // OK response but unable to parse the response body
      yield put({
        type: REGISTER_USER_FAILED,
        error: {
          message: 'Unable to parse the created user from the register service response'
        }
      });
    }
  } else {
    // Not OK responses, these can be due to service availability
    // or status codes echoed from the responses received from
    // management api when registering the user
    const [, errorResponse] = yield to(response.json());
    const error = errorResponse && errorResponse.error || errorResponse || {}; // Get something meaningful from the response if there is no message in the body

    if (!error.message) {
      error.message = `Registration service: ${response.statusText}`;
      error.status = response.status;
    }

    yield put({
      type: REGISTER_USER_FAILED,
      error
    });
  }
}

function* redirectSaga() {
  // Check if querystring contains a redirect_uri
  const currentQs = queryParams((yield select(selectCurrentSearch)));
  const redirectUri = currentQs.redirect_uri || currentQs.redirect; // We must use redux based navigation to preserve the registration state

  if (redirectUri) yield put(setRoute(redirectUri));
}

const userSagas = [...loginSagas, ...registerSagas];

// index.js
function rootSaga (featureSagas = []) {
  return function* rootSaga() {
    const subSagas = [...routingSagas, ...navigationSagas, ...userSagas];
    yield all([...subSagas, ...featureSagas]);
  };
}

const AppRoot = props => {
  return React.createElement(RouteLoader, props);
};

export { AppRoot as A, browserHistory as b, createStore as c, deliveryApi as d, history as h, pickProject as p, rootSaga as r };
//# sourceMappingURL=App-190603f7.js.map
