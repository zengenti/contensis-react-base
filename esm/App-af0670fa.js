import { createBrowserHistory, createMemoryHistory } from 'history';
import { takeEvery, select, put, call, all } from '@redux-saga/core/effects';
import * as log from 'loglevel';
import { Client, Op, Query } from 'contensis-delivery-api';
import { a as setSurrogateKeys, S as SET_NAVIGATION_PATH, b as SET_ROUTE, U as UPDATE_LOADING_STATE, c as SET_ENTRY, d as SET_ANCESTORS, e as SET_SIBLINGS, f as setRoute } from './actions-fcfc8704.js';
import { r as reduxStore, G as GET_NODE_TREE, h as hasNavigationTree, S as SET_NODE_TREE, b as GET_NODE_TREE_ERROR, i as injectRedux } from './version-c7268214.js';
import { s as selectVersionStatus } from './version-6dd7b2cd.js';
import { b as selectCurrentProject, a as selectRouteEntry, c as selectCurrentNode, d as selectCurrentAncestors, e as selectCurrentSiblings, f as selectRouteEntryEntryId, h as selectRouteEntryLanguage, i as selectMappedEntry, q as queryParams, j as selectCurrentSearch } from './selectors-337be432.js';
import { f as findContentTypeMapping, h as handleRequiresLoginSaga, g as getManagementApiClient, l as loginSagas } from './login-ca2dc2f7.js';
import { to } from 'await-to-js';
import { R as REGISTER_USER, a as REGISTER_USER_SUCCESS, b as REGISTER_USER_FAILED, c as REQUEST_USER_PASSWORD_RESET, d as RESET_USER_PASSWORD, C as CHANGE_USER_PASSWORD, e as REQUEST_USER_PASSWORD_RESET_SENDING, f as REQUEST_USER_PASSWORD_RESET_SUCCESS, g as REQUEST_USER_PASSWORD_RESET_ERROR, h as RESET_USER_PASSWORD_SENDING, i as RESET_USER_PASSWORD_SUCCESS, j as RESET_USER_PASSWORD_ERROR, k as CHANGE_USER_PASSWORD_ERROR, l as CHANGE_USER_PASSWORD_SENDING, m as CHANGE_USER_PASSWORD_SUCCESS } from './reducers-8e5d6232.js';
import { s as selectClientCredentials } from './ToJs-affd73f1.js';
import React from 'react';
import 'react-hot-loader';
import 'jsonpath-mapper';
import 'query-string';
import { R as RouteLoader } from './RouteLoader-f96a61c1.js';

const storeSurrogateKeys = response => {
  const keys = response.headers.get ? response.headers.get('surrogate-key') : response.headers.map['surrogate-key'];
  if (keys) reduxStore === null || reduxStore === void 0 ? void 0 : reduxStore.dispatch(setSurrogateKeys(keys, response.url));
};

const getClientConfig = project => {
  let config = DELIVERY_API_CONFIG;
  /* global DELIVERY_API_CONFIG */

  config.responseHandler = {};

  if (project) {
    config.projectId = project;
  } // we only want the surrogate key header in a server context


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

  searchUsingPost(query, linkDepth = 0, project = '', env) {
    const client = Client.create(getClientConfig(project));
    return this.request(project + JSON.stringify(query) + linkDepth.toString(), () => client.entries.searchUsingPost(query, linkDepth));
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

}

const cachedSearch = new CachedSearch();

const selectedHistory = typeof window !== 'undefined' ? createBrowserHistory : createMemoryHistory;
const history = (options = {}) => selectedHistory(options);
const browserHistory = selectedHistory();

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
    log.error(...['Error running ensureNodeTreeSaga:', ex]);
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

const routeEntryByFieldsQuery = (id, language = 'en-GB', fields = [], versionStatus = 'published') => {
  const query = new Query(...[...fieldExpression('sys.id', id), ...fieldExpression('sys.language', language), ...defaultExpressions(versionStatus)]);
  query.fields = fields;
  return query;
};

const routingSagas = [takeEvery(SET_NAVIGATION_PATH, getRouteSaga), takeEvery(SET_ROUTE, setRouteSaga)];
/**
 * To navigate / push a specific route via redux middleware
 * @param {path, state} action
 */

function* setRouteSaga(action) {
  yield put({
    type: 'CALL_HISTORY_METHOD',
    payload: {
      method: 'push',
      args: [action.path, action.state]
    }
  });
}

function* getRouteSaga(action) {
  let entry = null;

  try {
    var _pathNode2, _pathNode2$entry, _pathNode2$entry$sys, _pathNode3, _pathNode3$entry, _pathNode3$entry$sys;

    const {
      withEvents,
      routes: {
        ContentTypeMappings = {}
      } = {},
      staticRoute
    } = action; // Inject redux { key, reducer, saga } provided by staticRoute

    if (staticRoute && staticRoute.route.injectRedux) yield call(reduxInjectorSaga, staticRoute.route.injectRedux); // Variables we will pass to setRouteEntry

    let pathNode = null,
        ancestors = null,
        children = [],
        siblings = null;
    let contentTypeMapping = {}; // These variables are the return values from
    // calls to withEvents.onRouteLoad and onRouteLoaded

    let appsays,
        requireLogin = false;

    if (withEvents && withEvents.onRouteLoad) {
      appsays = yield withEvents.onRouteLoad(action);
    }

    const entryLinkDepth = appsays && appsays.entryLinkDepth !== undefined ? appsays.entryLinkDepth : 2;
    const setContentTypeLimits = !!ContentTypeMappings.find(ct => ct.fields || ct.linkDepth || ct.nodeOptions);
    const state = yield select();
    const routeEntry = selectRouteEntry(state, 'js');
    const routeNode = selectCurrentNode(state, 'js');
    const currentPath = action.path; //selectCurrentPath(state);

    const deliveryApiStatus = selectVersionStatus(state);
    const project = selectCurrentProject(state); // const isHome = currentPath === '/';

    const isPreview = currentPath && currentPath.startsWith('/preview/');
    const defaultLang = appsays && appsays.defaultLang || 'en-GB';

    if (!isPreview && (appsays && appsays.customRouting || staticRoute && !staticRoute.route.fetchNode || routeEntry && action.statePath === action.path && (appsays && appsays.refetchNode) !== true)) {
      // To prevent erroneous 404s and wasted network calls, this covers
      // - appsays customRouting and does SET_ENTRY etc. via the consuming app
      // - all staticRoutes (where custom 'route.fetchNode' attribute is falsey)
      // - standard Contensis SiteView Routing where we already have that entry in state
      if (routeEntry && (!staticRoute || staticRoute.route && staticRoute.route.fetchNode)) {
        pathNode = { ...routeNode,
          entry: null
        };
        pathNode.entry = entry = routeEntry; //Do nothing, the entry is allready the right one.
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
      } else yield call(setRouteEntry, routeEntry, yield select(selectCurrentNode), yield select(selectCurrentAncestors), yield select(selectCurrentSiblings));
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
        var _pathNode, _pathNode$entry, _pathNode$entry$sys;

        // Handle all other routes
        pathNode = yield cachedSearch.getNode({
          depth: 0,
          path: currentPath,
          entryFields: setContentTypeLimits ? ['sys.contentTypeId', 'sys.id'] : '*',
          entryLinkDepth: setContentTypeLimits ? 0 : entryLinkDepth,
          language: defaultLang,
          versionStatus: deliveryApiStatus
        }, project);
        ({
          entry
        } = pathNode || {});

        if (setContentTypeLimits && (_pathNode = pathNode) !== null && _pathNode !== void 0 && (_pathNode$entry = _pathNode.entry) !== null && _pathNode$entry !== void 0 && (_pathNode$entry$sys = _pathNode$entry.sys) !== null && _pathNode$entry$sys !== void 0 && _pathNode$entry$sys.id) {
          var _payload$items;

          // Get fields[] and linkDepth from ContentTypeMapping to get the entry data
          // and current node's ordinates at a specified depth with specified fields
          contentTypeMapping = findContentTypeMapping(ContentTypeMappings, pathNode.entry.sys.contentTypeId) || {};
          const {
            fields,
            linkDepth
          } = contentTypeMapping;
          const query = routeEntryByFieldsQuery(pathNode.entry.sys.id, pathNode.entry.sys.language, fields, deliveryApiStatus);
          const payload = yield cachedSearch.search(query, typeof linkDepth !== 'undefined' ? linkDepth : entryLinkDepth || 0, project);

          if ((payload === null || payload === void 0 ? void 0 : (_payload$items = payload.items) === null || _payload$items === void 0 ? void 0 : _payload$items.length) > 0) {
            pathNode.entry = entry = payload.items[0];
          }
        }
      } // make calls to fetch node ancestors, children,
      // siblings or entire node tree


      [ancestors, children, siblings] = yield call(resolveCurrentNodeOrdinates, {
        appsays,
        contentTypeMapping,
        language: defaultLang,
        path: currentPath,
        pathNode,
        project,
        versionStatus: deliveryApiStatus
      });
      if (children) pathNode.children = children;
    }

    const {
      entryMapper,
      injectRedux
    } = findContentTypeMapping(ContentTypeMappings, (_pathNode2 = pathNode) === null || _pathNode2 === void 0 ? void 0 : (_pathNode2$entry = _pathNode2.entry) === null || _pathNode2$entry === void 0 ? void 0 : (_pathNode2$entry$sys = _pathNode2$entry.sys) === null || _pathNode2$entry$sys === void 0 ? void 0 : _pathNode2$entry$sys.contentTypeId) || {}; // Inject redux { key, reducer, saga } provided by ContentTypeMapping

    if (injectRedux) yield call(reduxInjectorSaga, injectRedux);

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

    if (!appsays || !appsays.preventScrollTop) {
      // Scroll into View
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    }

    if ((_pathNode3 = pathNode) !== null && _pathNode3 !== void 0 && (_pathNode3$entry = _pathNode3.entry) !== null && _pathNode3$entry !== void 0 && (_pathNode3$entry$sys = _pathNode3$entry.sys) !== null && _pathNode3$entry$sys !== void 0 && _pathNode3$entry$sys.id) {
      var _appsays;

      entry = pathNode.entry;
      yield call(setRouteEntry, entry, pathNode, ancestors, siblings, entryMapper, false, (_appsays = appsays) === null || _appsays === void 0 ? void 0 : _appsays.refetchNode);
    } else {
      if (staticRoute) yield call(setRouteEntry, null, pathNode, ancestors, siblings);else yield call(do404);
    }
  } catch (e) {
    log.error(...['Error running route saga:', e, e.stack]);
    yield call(do500, e);
  }
}

function* resolveCurrentNodeOrdinates({
  appsays,
  contentTypeMapping,
  language,
  path,
  pathNode,
  project,
  versionStatus
}) {
  const apiCall = [() => null, () => null, () => null, () => null]; // if appsays customNavigation: true, we will set doNavigation to false
  // if appsays customNavigation: { ... }, we will set doNavigation to the customNavigation object and check for child elements
  // if appsays nothing we will set doNavigation to true and continue to do navigation calls

  const doNavigation = !appsays || ((appsays === null || appsays === void 0 ? void 0 : appsays.customNavigation) === true ? false : (appsays === null || appsays === void 0 ? void 0 : appsays.customNavigation) || true);
  const {
    entryLinkDepth = 0,
    fields,
    linkDepth,
    nodeOptions = {}
  } = contentTypeMapping;

  if (pathNode && pathNode.id) {
    if (doNavigation === true || doNavigation.ancestors) {
      apiCall[0] = function* getAncestors() {
        try {
          return yield cachedSearch.getAncestors({
            id: pathNode.id,
            language,
            versionStatus
          }, project);
        } catch (ex) {
          log.info('Problem fetching ancestors', ex);
          return [];
        }
      };
    }

    const childrenDepth = doNavigation === true || doNavigation.children === true ? 1 : doNavigation && doNavigation.children || 0;

    if (typeof (nodeOptions === null || nodeOptions === void 0 ? void 0 : nodeOptions.children) === 'undefined' && childrenDepth > 0 || nodeOptions.children) {
      const childrenOptions = typeof nodeOptions.children === 'boolean' ? {} : nodeOptions.children;

      apiCall[1] = function* getChildren() {
        try {
          return yield cachedSearch.getNode({
            depth: childrenOptions.depth !== undefined ? childrenOptions.depth : childrenDepth,
            path,
            entryFields: childrenOptions.fields || fields || undefined,
            entryLinkDepth: typeof childrenOptions.linkDepth !== 'undefined' ? childrenOptions.linkDepth : typeof linkDepth !== 'undefined' ? linkDepth : entryLinkDepth,
            language,
            versionStatus
          }, project);
        } catch (ex) {
          log.info('Problem fetching children', ex);
          return [];
        }
      };
    }

    if (typeof (nodeOptions === null || nodeOptions === void 0 ? void 0 : nodeOptions.siblings) === 'undefined' && doNavigation.siblings || nodeOptions.siblings) {
      apiCall[2] = function* getSiblings() {
        try {
          var _nodeOptions$siblings, _nodeOptions$siblings2;

          return yield cachedSearch.getSiblings({
            id: pathNode.id,
            entryFields: (nodeOptions === null || nodeOptions === void 0 ? void 0 : (_nodeOptions$siblings = nodeOptions.siblings) === null || _nodeOptions$siblings === void 0 ? void 0 : _nodeOptions$siblings.fields) || fields || undefined,
            entryLinkDepth: typeof (nodeOptions === null || nodeOptions === void 0 ? void 0 : (_nodeOptions$siblings2 = nodeOptions.siblings) === null || _nodeOptions$siblings2 === void 0 ? void 0 : _nodeOptions$siblings2.linkDepth) !== 'undefined' ? nodeOptions.siblings.linkDepth : typeof linkDepth !== 'undefined' ? linkDepth : entryLinkDepth,
            includeInMenu: true,
            language,
            versionStatus
          }, project);
        } catch (ex) {
          log.info('Problem fetching siblings', ex);
          return [];
        }
      };
    }
  }

  const isTreeLoaded = yield select(hasNavigationTree);
  if (!isTreeLoaded && (doNavigation === true || doNavigation.tree)) apiCall[3] = function* getNodeTree() {
    const treeDepth = doNavigation === true || !doNavigation.tree || doNavigation.tree === true ? 2 : doNavigation.tree;

    if (typeof window !== 'undefined') {
      return yield put({
        type: GET_NODE_TREE,
        treeDepth
      });
    } else {
      return yield call(ensureNodeTreeSaga, {
        treeDepth
      });
    }
  };
  const [loadAncestors, loadChildren, loadSiblings, loadTree] = apiCall;
  const [ancestors, nodeWithChildren, siblings] = yield all([loadAncestors(), loadChildren(), loadSiblings(), loadTree()]);
  return [ancestors, nodeWithChildren === null || nodeWithChildren === void 0 ? void 0 : nodeWithChildren.children, siblings];
}

function* setRouteEntry(entry, node, ancestors, siblings, entryMapper, notFound = false, remapEntry = false) {
  const entrySys = entry && entry.sys || {};
  const currentEntryId = yield select(selectRouteEntryEntryId);
  const currentEntryLang = yield select(selectRouteEntryLanguage);
  const mappedEntry = currentEntryId === entrySys.id && currentEntryLang === entrySys.language && remapEntry === false ? (yield select(selectMappedEntry, 'js')) || {} : yield mapRouteEntry(entryMapper, { ...node,
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
    log.error(...['Error running entryMapper:', e, e.stack]);
  }

  return;
}

function* do404() {
  yield call(clientReloadHitServer);
  yield put({
    type: SET_ENTRY,
    id: null,
    entry: null,
    notFound: true
  });
}

function* clientReloadHitServer() {
  const stateEntry = yield select(selectRouteEntry); // If in client and there is a stateEntry.sys field reload the page,
  // on the 2nd load stateEntry.sys should be null at this point,
  // we do not wish to reload again and get stuck in an infinite reloading loop

  if (typeof window !== 'undefined' && (stateEntry !== null && stateEntry !== void 0 && stateEntry.sys || null)) {
    window.location.reload();
  }
}

function* do500(error) {
  yield put({
    type: SET_ENTRY,
    id: null,
    entry: null,
    notFound: true,
    isError: true,
    error,
    statusCode: error && error.status ? error.status : 500
  });
}

function* reduxInjectorSaga(injectorFn) {
  if (typeof injectorFn === 'function') {
    const {
      key,
      reducer,
      saga
    } = yield injectorFn();
    injectRedux({
      key,
      reducer,
      saga
    });
  }
}

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
  const currentQs = queryParams(yield select(selectCurrentSearch));
  const redirectUri = currentQs.redirect_uri || currentQs.redirect; // We must use redux based navigation to preserve the registration state

  if (redirectUri) yield put(setRoute(redirectUri));
}

const PAP_URL = 'https://pap.zengenti.com';
const USER_ENVS_URI = 'my-environments';
const USER_RESEND_VERIFICATION_URI = 'account/verify/resend';
const USER_REQUEST_PASSWORD_RESET_URI = 'account/reset';
const USER_RESET_PASSWORD_URI = 'account/reset/password';
const USER_ENVS_URL = `${PAP_URL}/${USER_ENVS_URI}`;
const BASE_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};
class UserHelper {
  static async GetUsersEnvironments(securityToken) {
    const options = { ...BASE_OPTIONS,
      headers: {
        'x-security-token': securityToken
      }
    };
    return await UserHelper.get(USER_ENVS_URL, options);
  }

  static async ResendUserVerification(userEmail) {
    const options = { ...BASE_OPTIONS
    };
    return await UserHelper.get(`/${USER_RESEND_VERIFICATION_URI}?user=${userEmail}`, options);
  }

  static async RequestPasswordReset(userEmailObject) {
    const options = { ...BASE_OPTIONS,
      body: JSON.stringify(userEmailObject)
    };
    options.method = 'POST';
    return await UserHelper.get(`/${USER_REQUEST_PASSWORD_RESET_URI}`, options);
  }

  static async ResetPassword(resetPasswordObject) {
    const options = { ...BASE_OPTIONS,
      body: JSON.stringify(resetPasswordObject)
    };
    options.method = 'POST';
    return await UserHelper.get(`/${USER_RESET_PASSWORD_URI}`, options);
  }

  static async get(url, options = BASE_OPTIONS) {
    try {
      const responseBody = await api(url, options);
      return responseBody;
    } catch (err) {
      return {
        error: {
          message: err.message
        }
      };
    }
  }

}

async function api(url, options) {
  return fetch(url, options).then(async response => {
    return response.json().then(data => data);
  }).catch(error => {
    throw error;
  });
}

const resetPasswordSagas = [takeEvery(REQUEST_USER_PASSWORD_RESET, requestPasswordResetSaga), takeEvery(RESET_USER_PASSWORD, resetPasswordSaga), takeEvery(CHANGE_USER_PASSWORD, changePasswordSaga)];

function* requestPasswordResetSaga(action) {
  const userEmailObject = action.userEmailObject;
  yield put({
    type: REQUEST_USER_PASSWORD_RESET_SENDING
  });

  if (userEmailObject && userEmailObject.userEmail) {
    try {
      const passwordResetRequestResponse = yield UserHelper.RequestPasswordReset(userEmailObject);

      if (passwordResetRequestResponse) {
        if (!passwordResetRequestResponse.error) {
          yield put({
            type: REQUEST_USER_PASSWORD_RESET_SUCCESS
          });
        } else {
          yield put({
            type: REQUEST_USER_PASSWORD_RESET_ERROR,
            error: passwordResetRequestResponse.error.message
          });
        }
      } else {
        yield put({
          type: REQUEST_USER_PASSWORD_RESET_ERROR,
          error: 'No response from server'
        });
      }
    } catch (error) {
      yield put({
        type: REQUEST_USER_PASSWORD_RESET_ERROR,
        error: error && error.toString()
      });
    }
  } else {
    yield put({
      type: REQUEST_USER_PASSWORD_RESET_ERROR,
      error: 'Invalid object'
    });
  }
}

function* resetPasswordSaga(action) {
  const resetPasswordObject = action.resetPasswordObject;
  yield put({
    type: RESET_USER_PASSWORD_SENDING
  });

  if (resetPasswordObject.token && resetPasswordObject.password) {
    try {
      const resetPasswordResponse = yield UserHelper.ResetPassword(resetPasswordObject);

      if (resetPasswordResponse) {
        if (!resetPasswordResponse.error) {
          yield put({
            type: RESET_USER_PASSWORD_SUCCESS
          });
        } else {
          const error = resetPasswordResponse.error.data && resetPasswordResponse.error.data.length > 0 && resetPasswordResponse.error.data[0].message || resetPasswordResponse.error.message;
          yield put({
            type: RESET_USER_PASSWORD_ERROR,
            error
          });
        }
      } else {
        yield put({
          type: RESET_USER_PASSWORD_ERROR,
          error: 'No response from server'
        });
      }
    } catch (error) {
      yield put({
        type: RESET_USER_PASSWORD_ERROR,
        error: error && error.toString()
      });
    }
  } else {
    yield put({
      type: RESET_USER_PASSWORD_ERROR,
      error: 'Invalid object'
    });
  }
} // userId
// existingPassword
// newPassword


function* changePasswordSaga(action) {
  if (!action || !action.userId || !action.currentPassword || !action.newPassword) {
    yield put({
      type: CHANGE_USER_PASSWORD_ERROR,
      error: 'Invalid action object sent to changePassword saga'
    });
    return;
  }

  try {
    const changePasswordObject = {
      userId: action.userId,
      existing: action.currentPassword,
      new: action.newPassword
    };
    yield put({
      type: CHANGE_USER_PASSWORD_SENDING
    });
    const clientCredentials = yield select(selectClientCredentials, 'js');
    const client = yield getManagementApiClient({ ...clientCredentials
    });
    const [err, res] = yield to(client.security.users.updatePassword(changePasswordObject));

    if (err) {
      var _err$data, _err$data$data, _err$data2;

      const error = (err === null || err === void 0 ? void 0 : (_err$data = err.data) === null || _err$data === void 0 ? void 0 : (_err$data$data = _err$data.data) === null || _err$data$data === void 0 ? void 0 : _err$data$data.length) > 0 && err.data.data[0].message || (err === null || err === void 0 ? void 0 : (_err$data2 = err.data) === null || _err$data2 === void 0 ? void 0 : _err$data2.message);
      yield put({
        type: CHANGE_USER_PASSWORD_ERROR,
        error
      });
      return;
    } // // eslint-disable-next-line no-console
    // console.log(changePasswordObject);
    // // eslint-disable-next-line no-console
    // console.log(userCredentialsObject);


    yield put({
      type: CHANGE_USER_PASSWORD_SUCCESS
    });
  } catch (error) {
    yield put({
      type: CHANGE_USER_PASSWORD_ERROR,
      error: error && error.toString()
    });
  }
}

const userSagas = [...loginSagas, ...registerSagas, ...resetPasswordSagas];

// index.js
function rootSaga (featureSagas = []) {
  return function* rootSaga() {
    const subSagas = [...routingSagas, ...navigationSagas, ...userSagas];
    yield all([...subSagas, ...featureSagas]);
  };
}

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

const AppRoot = props => {
  return /*#__PURE__*/React.createElement(RouteLoader, props);
};

export { AppRoot as A, browserHistory as b, cachedSearch as c, deliveryApi as d, history as h, pickProject as p, rootSaga as r };
//# sourceMappingURL=App-af0670fa.js.map
