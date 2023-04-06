'use strict';

var history$1 = require('history');
var effects = require('@redux-saga/core/effects');
var log = require('loglevel');
var contensisDeliveryApi = require('contensis-delivery-api');
var queryString = require('query-string');
var actions = require('./actions-8dc9e8de.js');
var version = require('./version-78dfc3bd.js');
var version$1 = require('./version-eba6d09b.js');
var selectors = require('./selectors-656da4b7.js');
var login = require('./login-840860bc.js');
var awaitToJs = require('await-to-js');
var reducers = require('./reducers-3a4f8971.js');
var ToJs = require('./ToJs-a9a8522b.js');
var React = require('react');
require('react-hot-loader');
require('jsonpath-mapper');
var RouteLoader = require('./RouteLoader-3aa6456e.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var log__namespace = /*#__PURE__*/_interopNamespace(log);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const storeSurrogateKeys = response => {
  const keys = response.headers.get ? response.headers.get('surrogate-key') : response.headers.map['surrogate-key'];
  if (keys) version.reduxStore === null || version.reduxStore === void 0 ? void 0 : version.reduxStore.dispatch(actions.setSurrogateKeys(keys, response.url));
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
      if (typeof window !== 'undefined') {
        // Allow overriding versionStatus with the querystring
        const {
          versionStatus
        } = queryString.parse(window.location.search);
        if (versionStatus) return versionStatus; // Client-side we will have a global variable set if rendered by SSR in production

        if (typeof window.versionStatus !== 'undefined') return window.versionStatus; // For localhost development we can only work out versionStatus from the current hostname

        const currentHostname = window.location.hostname;
        return this.getVersionStatusFromHostname(currentHostname);
      }

      return null;
    };

    this.getServerSideVersionStatus = request => request.query.versionStatus || deliveryApi.getVersionStatusFromHeaders(request.headers) || deliveryApi.getVersionStatusFromHostname(request.hostname);

    this.getVersionStatusFromHeaders = headers => {
      const versionStatusHeader = headers['x-entry-versionstatus'];
      if (typeof versionStatusHeader !== 'undefined') return versionStatusHeader;
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
      const client = contensisDeliveryApi.Client.create(getClientConfig(project));
      return client.entries.search(query, typeof linkDepth !== 'undefined' ? linkDepth : 1);
    };

    this.getClient = (deliveryApiStatus = 'published', project, env) => {
      const baseConfig = getClientConfig(project);
      baseConfig.versionStatus = deliveryApiStatus;
      return contensisDeliveryApi.Client.create(baseConfig);
    };

    this.getEntry = (id, linkDepth = 0, deliveryApiStatus = 'published', project, env) => {
      const baseConfig = getClientConfig(project);
      baseConfig.versionStatus = deliveryApiStatus;
      const client = contensisDeliveryApi.Client.create(baseConfig); // return client.entries.get(id, linkDepth);

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
    if (!node) return; // This is sometimes null and crashes the container without this check

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
    const client = contensisDeliveryApi.Client.create(getClientConfig(project));
    return this.request(project + JSON.stringify(query) + linkDepth.toString(), () => client.entries.search(query, linkDepth));
  }

  searchUsingPost(query, linkDepth = 0, project = '', env) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project));
    return this.request(project + JSON.stringify(query) + linkDepth.toString(), () => client.entries.searchUsingPost(query, linkDepth));
  }

  get(id, linkDepth, versionStatus, project, env) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project));
    client.clientConfig.versionStatus = versionStatus;
    return this.request(id, () => client.entries.get({
      id,
      linkDepth
    }));
  }

  getContentType(id, project, env) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project));
    return this.request(`[CONTENT TYPE] ${id} ${project}`, () => client.contentTypes.get(id));
  }

  getTaxonomyNode(key, project, env) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project));
    return this.request(`[TAXONOMY NODE] ${key}`, () => client.taxonomy.resolveChildren(key).then(node => this.extendTaxonomyNode(node)));
  }

  getRootNode(options, project, env) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project));
    return this.request(`${project} / ${JSON.stringify(options)}`, () => client.nodes.getRoot(options));
  }

  getNode(options, project, env) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project));
    return this.request(`${project} ${options && options.path || options} ${JSON.stringify(options)}`, () => client.nodes.get(options));
  }

  getAncestors(options, project, env) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project));
    return this.request(`${project} [A] ${options && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getAncestors(options));
  }

  getChildren(options, project, env) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project));
    return this.request(`${project} [C] ${options && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getChildren(options));
  }

  getSiblings(options, project, env) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project));
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

const selectedHistory = typeof window !== 'undefined' ? history$1.createBrowserHistory : history$1.createMemoryHistory;
const history = (options = {}) => selectedHistory(options);
const browserHistory = selectedHistory();

const navigationSagas = [effects.takeEvery(version.GET_NODE_TREE, ensureNodeTreeSaga)];
function* ensureNodeTreeSaga(action) {
  const state = yield effects.select();

  try {
    if (!version.hasNavigationTree(state)) {
      const deliveryApiVersionStatus = yield effects.select(version$1.selectVersionStatus);
      const project = yield effects.select(selectors.selectCurrentProject);
      const nodes = yield deliveryApi.getClient(deliveryApiVersionStatus, project).nodes.getRoot({
        depth: action.treeDepth || 0
      });

      if (nodes) {
        yield effects.put({
          type: version.SET_NODE_TREE,
          nodes
        });
      } else {
        yield effects.put({
          type: version.GET_NODE_TREE_ERROR
        });
      }
    }
  } catch (ex) {
    log__namespace.error(...['Error running ensureNodeTreeSaga:', ex]);
    yield effects.put({
      type: version.GET_NODE_TREE_ERROR,
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
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? [contensisDeliveryApi.Op[operator](field, value)] : [contensisDeliveryApi.Op[operator](field, value).weight(weight)];
};
const defaultExpressions = versionStatus => {
  return [contensisDeliveryApi.Op.equalTo(Fields.sys.versionStatus, versionStatus)];
};

const equalToOrIn = (field, arr, operator = 'equalTo') => arr.length === 0 ? [] : arr.length === 1 ? [contensisDeliveryApi.Op[operator](field, arr[0])] : [contensisDeliveryApi.Op.in(field, ...arr)];

const routeEntryByFieldsQuery = (id, language = 'en-GB', fields = [], versionStatus = 'published') => {
  const query = new contensisDeliveryApi.Query(...[...fieldExpression('sys.id', id), ...fieldExpression('sys.language', language), ...defaultExpressions(versionStatus)]);
  query.fields = fields;
  return query;
};

const routingSagas = [effects.takeEvery(actions.SET_NAVIGATION_PATH, getRouteSaga), effects.takeEvery(actions.SET_ROUTE, setRouteSaga)];
/**
 * To navigate / push a specific route via redux middleware
 * @param {path, state} action
 */

function* setRouteSaga(action) {
  yield effects.put({
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
    var _staticRoute$route, _staticRoute$route$pa, _staticRoute$route2, _staticRoute$route2$p, _pathNode2, _pathNode2$entry, _pathNode2$entry$sys, _pathNode3, _pathNode3$entry, _pathNode3$entry$sys;

    const {
      withEvents,
      routes: {
        ContentTypeMappings = {}
      } = {},
      staticRoute
    } = action; // Inject redux { key, reducer, saga } provided by staticRoute

    if (staticRoute && staticRoute.route.injectRedux) yield effects.call(reduxInjectorSaga, staticRoute.route.injectRedux); // Variables we will pass to setRouteEntry

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

    const staticRouteLinkDepth = staticRoute === null || staticRoute === void 0 ? void 0 : (_staticRoute$route = staticRoute.route) === null || _staticRoute$route === void 0 ? void 0 : (_staticRoute$route$pa = _staticRoute$route.params) === null || _staticRoute$route$pa === void 0 ? void 0 : _staticRoute$route$pa.linkDepth;
    const staticRouteFields = staticRoute === null || staticRoute === void 0 ? void 0 : (_staticRoute$route2 = staticRoute.route) === null || _staticRoute$route2 === void 0 ? void 0 : (_staticRoute$route2$p = _staticRoute$route2.params) === null || _staticRoute$route2$p === void 0 ? void 0 : _staticRoute$route2$p.fields;
    const entryLinkDepth = appsays && appsays.entryLinkDepth !== undefined ? appsays.entryLinkDepth : 2;
    const setContentTypeLimits = (typeof staticRouteLinkDepth === 'undefined' || !staticRouteFields) && !!ContentTypeMappings.find(ct => ct.fields || ct.linkDepth || ct.nodeOptions);
    const state = yield effects.select();
    const routeEntry = selectors.selectRouteEntry(state, 'js');
    const routeNode = selectors.selectCurrentNode(state, 'js');
    const currentPath = action.path; //selectCurrentPath(state);

    const deliveryApiStatus = version$1.selectVersionStatus(state);
    const project = selectors.selectCurrentProject(state); // const isHome = currentPath === '/';

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

        yield effects.put({
          type: actions.UPDATE_LOADING_STATE,
          isLoading: false
        });
      } else yield effects.call(setRouteEntry, routeEntry, yield effects.select(selectors.selectCurrentNode), yield effects.select(selectors.selectCurrentAncestors), yield effects.select(selectors.selectCurrentSiblings));
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
          entryFields: setContentTypeLimits ? ['sys.contentTypeId', 'sys.id'] : staticRouteFields || '*',
          entryLinkDepth: setContentTypeLimits ? 0 : typeof staticRouteLinkDepth !== 'undefined' ? staticRouteLinkDepth : entryLinkDepth,
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
          contentTypeMapping = login.findContentTypeMapping(ContentTypeMappings, pathNode.entry.sys.contentTypeId) || {};
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


      [ancestors, children, siblings] = yield effects.call(resolveCurrentNodeOrdinates, {
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

    const resolvedContentTypeMapping = login.findContentTypeMapping(ContentTypeMappings, (_pathNode2 = pathNode) === null || _pathNode2 === void 0 ? void 0 : (_pathNode2$entry = _pathNode2.entry) === null || _pathNode2$entry === void 0 ? void 0 : (_pathNode2$entry$sys = _pathNode2$entry.sys) === null || _pathNode2$entry$sys === void 0 ? void 0 : _pathNode2$entry$sys.contentTypeId) || {}; // Inject redux { key, reducer, saga } provided by ContentTypeMapping

    if (resolvedContentTypeMapping.injectRedux) yield effects.call(reduxInjectorSaga, resolvedContentTypeMapping.injectRedux);

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
      yield effects.call(login.handleRequiresLoginSaga, { ...action,
        entry,
        requireLogin
      });
    }

    if (!appsays || !appsays.preventScrollTop) {
      // Scroll into View
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    }

    if ((_pathNode3 = pathNode) !== null && _pathNode3 !== void 0 && (_pathNode3$entry = _pathNode3.entry) !== null && _pathNode3$entry !== void 0 && (_pathNode3$entry$sys = _pathNode3$entry.sys) !== null && _pathNode3$entry$sys !== void 0 && _pathNode3$entry$sys.id) {
      var _staticRoute$route3, _staticRoute$route3$f, _appsays;

      entry = pathNode.entry;
      yield effects.call(setRouteEntry, entry, pathNode, ancestors, siblings, (staticRoute === null || staticRoute === void 0 ? void 0 : (_staticRoute$route3 = staticRoute.route) === null || _staticRoute$route3 === void 0 ? void 0 : (_staticRoute$route3$f = _staticRoute$route3.fetchNode) === null || _staticRoute$route3$f === void 0 ? void 0 : _staticRoute$route3$f.entryMapper) || resolvedContentTypeMapping.entryMapper, false, (_appsays = appsays) === null || _appsays === void 0 ? void 0 : _appsays.refetchNode);
    } else {
      if (staticRoute) yield effects.call(setRouteEntry, null, pathNode, ancestors, siblings);else yield effects.call(do404);
    }
  } catch (e) {
    log__namespace.error(...['Error running route saga:', e, e.stack]);
    yield effects.call(do500, e);
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
          log__namespace.info('Problem fetching ancestors', ex);
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
          log__namespace.info('Problem fetching children', ex);
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
          log__namespace.info('Problem fetching siblings', ex);
          return [];
        }
      };
    }
  }

  const isTreeLoaded = yield effects.select(version.hasNavigationTree);
  if (!isTreeLoaded && (doNavigation === true || doNavigation.tree)) apiCall[3] = function* getNodeTree() {
    const treeDepth = doNavigation === true || !doNavigation.tree || doNavigation.tree === true ? 2 : doNavigation.tree;

    if (typeof window !== 'undefined') {
      return yield effects.put({
        type: version.GET_NODE_TREE,
        treeDepth
      });
    } else {
      return yield effects.call(ensureNodeTreeSaga, {
        treeDepth
      });
    }
  };
  const [loadAncestors, loadChildren, loadSiblings, loadTree] = apiCall;
  const [ancestors, nodeWithChildren, siblings] = yield effects.all([loadAncestors(), loadChildren(), loadSiblings(), loadTree()]);
  return [ancestors, nodeWithChildren === null || nodeWithChildren === void 0 ? void 0 : nodeWithChildren.children, siblings];
}

function* setRouteEntry(entry, node, ancestors, siblings, entryMapper, notFound = false, remapEntry = false) {
  const entrySys = entry && entry.sys || {}; // Update a window global to provide the preview toolbar
  // an updated entry id in client-side navigation

  if (typeof window !== 'undefined') window.ContensisEntryId = entrySys.id;
  const currentEntryId = yield effects.select(selectors.selectRouteEntryEntryId);
  const currentEntryLang = yield effects.select(selectors.selectRouteEntryLanguage);
  const mappedEntry = currentEntryId === entrySys.id && currentEntryLang === entrySys.language && remapEntry === false ? (yield effects.select(selectors.selectMappedEntry, 'js')) || {} : yield mapRouteEntry(entryMapper, { ...node,
    entry,
    ancestors,
    siblings
  });
  yield effects.all([effects.put({
    type: actions.SET_ENTRY,
    id: entrySys.id,
    entry,
    mappedEntry,
    node,
    notFound
  }), ancestors && effects.put({
    type: actions.SET_ANCESTORS,
    ancestors
  }), siblings && effects.put({
    type: actions.SET_SIBLINGS,
    siblings
  })]);
}

function* mapRouteEntry(entryMapper, node) {
  try {
    if (typeof entryMapper === 'function') {
      const state = yield effects.select();
      const mappedEntry = yield effects.call(entryMapper, node, state);
      return mappedEntry;
    }
  } catch (e) {
    log__namespace.error(...['Error running entryMapper:', e, e.stack]);
  }

  return;
}

function* do404() {
  yield effects.call(clientReloadHitServer);
  yield effects.put({
    type: actions.SET_ENTRY,
    id: null,
    entry: null,
    notFound: true
  });
}

function* clientReloadHitServer() {
  const stateEntry = yield effects.select(selectors.selectRouteEntry); // If in client and there is a stateEntry.sys field reload the page,
  // on the 2nd load stateEntry.sys should be null at this point,
  // we do not wish to reload again and get stuck in an infinite reloading loop

  if (typeof window !== 'undefined' && (stateEntry !== null && stateEntry !== void 0 && stateEntry.sys || null)) {
    window.location.reload();
  }
}

function* do500(error) {
  yield effects.put({
    type: actions.SET_ENTRY,
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
    version.injectRedux({
      key,
      reducer,
      saga
    });
  }
}

const registerSagas = [effects.takeEvery(reducers.REGISTER_USER, registerSaga), effects.takeEvery(reducers.REGISTER_USER_SUCCESS, redirectSaga)];

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
    const [, responseBody] = yield awaitToJs.to(response.json());

    if (responseBody) {
      // Allow use of response mapper to convert the successful user object
      // from the api response body into a user object of any format
      if (mappers && mappers.response && typeof mappers.response === 'function') {
        mappedResponse = yield mappers.response(responseBody);
      } // Update user object with mappedResponse or responseBody


      yield effects.put({
        type: reducers.REGISTER_USER_SUCCESS,
        user: mappedResponse || responseBody
      });
    } else {
      // OK response but unable to parse the response body
      yield effects.put({
        type: reducers.REGISTER_USER_FAILED,
        error: {
          message: 'Unable to parse the created user from the register service response'
        }
      });
    }
  } else {
    // Not OK responses, these can be due to service availability
    // or status codes echoed from the responses received from
    // management api when registering the user
    const [, errorResponse] = yield awaitToJs.to(response.json());
    const error = errorResponse && errorResponse.error || errorResponse || {}; // Get something meaningful from the response if there is no message in the body

    if (!error.message) {
      error.message = `Registration service: ${response.statusText}`;
      error.status = response.status;
    }

    yield effects.put({
      type: reducers.REGISTER_USER_FAILED,
      error
    });
  }
}

function* redirectSaga() {
  // Check if querystring contains a redirect_uri
  const currentQs = selectors.queryParams(yield effects.select(selectors.selectCurrentSearch));
  const redirectUri = currentQs.redirect_uri || currentQs.redirect; // We must use redux based navigation to preserve the registration state

  if (redirectUri) yield effects.put(actions.setRoute(redirectUri));
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

const resetPasswordSagas = [effects.takeEvery(reducers.REQUEST_USER_PASSWORD_RESET, requestPasswordResetSaga), effects.takeEvery(reducers.RESET_USER_PASSWORD, resetPasswordSaga), effects.takeEvery(reducers.CHANGE_USER_PASSWORD, changePasswordSaga)];

function* requestPasswordResetSaga(action) {
  const userEmailObject = action.userEmailObject;
  yield effects.put({
    type: reducers.REQUEST_USER_PASSWORD_RESET_SENDING
  });

  if (userEmailObject && userEmailObject.userEmail) {
    try {
      const passwordResetRequestResponse = yield UserHelper.RequestPasswordReset(userEmailObject);

      if (passwordResetRequestResponse) {
        if (!passwordResetRequestResponse.error) {
          yield effects.put({
            type: reducers.REQUEST_USER_PASSWORD_RESET_SUCCESS
          });
        } else {
          yield effects.put({
            type: reducers.REQUEST_USER_PASSWORD_RESET_ERROR,
            error: passwordResetRequestResponse.error.message
          });
        }
      } else {
        yield effects.put({
          type: reducers.REQUEST_USER_PASSWORD_RESET_ERROR,
          error: 'No response from server'
        });
      }
    } catch (error) {
      yield effects.put({
        type: reducers.REQUEST_USER_PASSWORD_RESET_ERROR,
        error: error && error.toString()
      });
    }
  } else {
    yield effects.put({
      type: reducers.REQUEST_USER_PASSWORD_RESET_ERROR,
      error: 'Invalid object'
    });
  }
}

function* resetPasswordSaga(action) {
  const resetPasswordObject = action.resetPasswordObject;
  yield effects.put({
    type: reducers.RESET_USER_PASSWORD_SENDING
  });

  if (resetPasswordObject.token && resetPasswordObject.password) {
    try {
      const resetPasswordResponse = yield UserHelper.ResetPassword(resetPasswordObject);

      if (resetPasswordResponse) {
        if (!resetPasswordResponse.error) {
          yield effects.put({
            type: reducers.RESET_USER_PASSWORD_SUCCESS
          });
        } else {
          const error = resetPasswordResponse.error.data && resetPasswordResponse.error.data.length > 0 && resetPasswordResponse.error.data[0].message || resetPasswordResponse.error.message;
          yield effects.put({
            type: reducers.RESET_USER_PASSWORD_ERROR,
            error
          });
        }
      } else {
        yield effects.put({
          type: reducers.RESET_USER_PASSWORD_ERROR,
          error: 'No response from server'
        });
      }
    } catch (error) {
      yield effects.put({
        type: reducers.RESET_USER_PASSWORD_ERROR,
        error: error && error.toString()
      });
    }
  } else {
    yield effects.put({
      type: reducers.RESET_USER_PASSWORD_ERROR,
      error: 'Invalid object'
    });
  }
} // userId
// existingPassword
// newPassword


function* changePasswordSaga(action) {
  if (!action || !action.userId || !action.currentPassword || !action.newPassword) {
    yield effects.put({
      type: reducers.CHANGE_USER_PASSWORD_ERROR,
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
    yield effects.put({
      type: reducers.CHANGE_USER_PASSWORD_SENDING
    });
    const clientCredentials = yield effects.select(ToJs.selectClientCredentials, 'js');
    const client = yield login.getManagementApiClient({ ...clientCredentials
    });
    const [err, res] = yield awaitToJs.to(client.security.users.updatePassword(changePasswordObject));

    if (err) {
      var _err$data, _err$data$data, _err$data2;

      const error = (err === null || err === void 0 ? void 0 : (_err$data = err.data) === null || _err$data === void 0 ? void 0 : (_err$data$data = _err$data.data) === null || _err$data$data === void 0 ? void 0 : _err$data$data.length) > 0 && err.data.data[0].message || (err === null || err === void 0 ? void 0 : (_err$data2 = err.data) === null || _err$data2 === void 0 ? void 0 : _err$data2.message);
      yield effects.put({
        type: reducers.CHANGE_USER_PASSWORD_ERROR,
        error
      });
      return;
    } // // eslint-disable-next-line no-console
    // console.log(changePasswordObject);
    // // eslint-disable-next-line no-console
    // console.log(userCredentialsObject);


    yield effects.put({
      type: reducers.CHANGE_USER_PASSWORD_SUCCESS
    });
  } catch (error) {
    yield effects.put({
      type: reducers.CHANGE_USER_PASSWORD_ERROR,
      error: error && error.toString()
    });
  }
}

const userSagas = [...login.loginSagas, ...registerSagas, ...resetPasswordSagas];

// index.js
function rootSaga (featureSagas = []) {
  return function* rootSaga() {
    const subSagas = [...routingSagas, ...navigationSagas, ...userSagas];
    yield effects.all([...subSagas, ...featureSagas]);
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
  return /*#__PURE__*/React__default["default"].createElement(RouteLoader.RouteLoader, props);
};

exports.AppRoot = AppRoot;
exports.browserHistory = browserHistory;
exports.cachedSearch = cachedSearch;
exports.deliveryApi = deliveryApi;
exports.history = history;
exports.pickProject = pickProject;
exports.rootSaga = rootSaga;
//# sourceMappingURL=App-5b34574e.js.map
