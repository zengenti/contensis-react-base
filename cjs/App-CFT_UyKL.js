'use strict';

var history$1 = require('history');
var effects = require('@redux-saga/core/effects');
var log = require('loglevel');
var store = require('./store-DxuhGQ7p.js');
var version = require('./version-B9moFk8k.js');
var to = require('await-to-js');
var contensisDeliveryApi = require('contensis-delivery-api');
var slice = require('./slice-5xJMH24n.js');
var selectors$1 = require('./selectors-C1CqEUmL.js');
var version$1 = require('./version-CukCz8zL.js');
var ContensisDeliveryApi = require('./ContensisDeliveryApi-DBaziPG9.js');
var React = require('react');
require('react-cookie');
require('react-redux');
require('./VersionInfo-CTPtw_Xd.js');
require('jsonpath-mapper');
require('react-router-dom');
var selectors = require('./selectors-DAQR0uZa.js');
var ChangePassword_container = require('./ChangePassword.container-BWh4R32r.js');
require('./sagas-D07lHYaB.js');
require('reselect');
require('immer');
require('deep-equal');
require('deepmerge');
var util = require('./util-CFAjDCA0.js');
require('contensis-core-api');
var matchGroups = require('./matchGroups-CxRa9Ej9.js');
var RouteLoader = require('./RouteLoader-B-sjh6ha.js');
require('query-string');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

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
  n.default = e;
  return Object.freeze(n);
}

var log__namespace = /*#__PURE__*/_interopNamespace(log);
var to__default = /*#__PURE__*/_interopDefault(to);
var React__default = /*#__PURE__*/_interopDefault(React);

const deparameterise = path => {
  return path.replace(/\/:\w+\??/g, '');
};

/** Create static routes for routes with specified locales */
const createLocaleRoutes = routes => {
  const localeRoutes = {};
  for (const route of routes.StaticRoutes) {
    // If the route has defined locales, create entries for each locale
    if (route.i18n && route.path) {
      for (const [language, path] of Object.entries(route.i18n)) {
        // We already have a locale route, so just append the language and path
        const deparameterisedPath = deparameterise(route.path);
        const deparameterisedLocalePath = deparameterise(path);
        if (localeRoutes[deparameterisedPath]) localeRoutes[deparameterisedPath][language] = deparameterisedLocalePath;
        // Otherwise, create a new entry for this route path
        else localeRoutes[deparameterisedPath] = {
          [language]: deparameterisedLocalePath
        };
        if (deparameterise(route.path) !== deparameterisedLocalePath) {
          // I think we are OK to mutate here as this is only run once on app init
          // we can change this if needed later
          routes.StaticRoutes.push({
            ...route,
            path,
            // Add the path with any parameters included
            language,
            i18n: undefined
          });
        } else {
          // Just set the language on the existing route instead of creating a duplicate
          route.language = language;
        }
      }
    }
  }
  return localeRoutes;
};

// Create a history depending on the environment
const selectedHistory = typeof window !== 'undefined' ? history$1.createBrowserHistory : history$1.createMemoryHistory;
const history = (options = {}) => selectedHistory(options);
const browserHistory = selectedHistory();

const navigationSagas = [effects.takeEvery(store.GET_NODE_TREE, ensureNodeTreeSaga)];
function* ensureNodeTreeSaga(action) {
  const {
    api,
    language,
    project,
    versionStatus,
    treeDepth
  } = action;
  const state = yield effects.select();
  try {
    if (!version.hasNavigationTree(state)) {
      const nodes = yield api.getRootNode({
        depth: treeDepth || 0,
        language
      }, versionStatus, project);
      if (nodes) {
        yield effects.put({
          type: store.SET_NODE_TREE,
          nodes
        });
      } else {
        yield effects.put({
          type: store.GET_NODE_TREE_ERROR
        });
      }
    }
  } catch (ex) {
    log__namespace.error(...['Error running ensureNodeTreeSaga:', ex]);
    yield effects.put({
      type: store.GET_NODE_TREE_ERROR,
      error: ex.toString()
    });
  }
}

const i18nSagas = [effects.takeEvery(slice.actions.INIT_LOCALES.type, getProjectLanguages), effects.takeEvery(slice.actions.UPDATE_LANGUAGE.type, updateLanguage), effects.takeEvery(slice.actions.SET_LANGUAGE.type, setLanguageRoute)];

/**
 * Resolve the current route language based on the entry, node, static route or path
 * Is called directly from the routing saga as soon as an entry or node has been fetched
 */
function* resolveCurrentRouteLanguage({
  entry,
  node
}) {
  var _entry$sys, _staticRoute$route;
  const currentLanguage = yield effects.select(selectors.selectCurrentLanguage);
  const staticRoute = yield effects.select(selectors$1.selectStaticRoute);
  let nextLanguage = currentLanguage;
  if (entry !== null && entry !== void 0 && (_entry$sys = entry.sys) !== null && _entry$sys !== void 0 && _entry$sys.language) nextLanguage = entry.sys.language;else if (node !== null && node !== void 0 && node.language) nextLanguage = node.language;else if (staticRoute !== null && staticRoute !== void 0 && (_staticRoute$route = staticRoute.route) !== null && _staticRoute$route !== void 0 && _staticRoute$route.language) nextLanguage = staticRoute.route.language;else {
    var _currentPath$split$fi;
    // attempt to infer language from the path
    const currentPath = yield effects.select(selectors$1.selectCurrentPath);

    // path is normally lowercase
    const firstPathSegment = (_currentPath$split$fi = currentPath.split('/').find(segment => segment.length)) === null || _currentPath$split$fi === void 0 ? void 0 : _currentPath$split$fi.toLowerCase();
    const locales = yield effects.select(selectors.selectLocales);
    const matchedLanguage = Object.keys(locales).find(lang => lang.toLowerCase() === firstPathSegment);
    // matched a supported language in the path
    if (matchedLanguage) nextLanguage = matchedLanguage;else
      // falling back to primary language
      nextLanguage = yield effects.select(selectors.selectPrimaryLanguage);
  }
  if (nextLanguage && nextLanguage !== currentLanguage) {
    const dictionary = yield effects.call(resolveDictionaryForLanguage, nextLanguage);
    yield effects.put(slice.actions.SET_LANGUAGE({
      language: nextLanguage,
      dictionary
    }));
  }
}

/**
 * Resolve the current dictionary for route language either using a supplied resolver
 * function or directly derive from the locales stored in state
 * Is called directly any time the language is changed
 */
function* resolveDictionaryForLanguage(language) {
  let dictionary = yield effects.select(selectors.selectDictionary);
  // try and resolve a dictionary for this language
  const resolver = yield effects.select(selectors.selectDictionaryResolver);
  if (typeof resolver === 'function') {
    try {
      // dynamic import of dictionary file
      const loadedDictionary = yield effects.call(resolver, language);
      dictionary = loadedDictionary;
    } catch (error) {
      console.error(`No dictionary resolved for language ${language}`, error);
    }
  } else {
    // Load dictionary from locales in state
    const locales = yield effects.select(selectors.selectLocales);
    if (locales && locales[language]) {
      dictionary = locales[language];
    }
  }
  return dictionary;
}

/**
 * Side effects triggered from updating the language via dispatched action
 * in language switching components, including resolving the next route,
 * update the dictionary and subsequently redirect if needed
 */
function* updateLanguage({
  payload: {
    language,
    redirect,
    fallbackPath
  }
}) {
  const currentLanguage = yield effects.select(selectors.selectCurrentLanguage);
  if (language === currentLanguage) {
    // no change needed
    return;
  } else {
    const dictionary = language !== currentLanguage ? yield effects.call(resolveDictionaryForLanguage, language) : yield effects.select(selectors.selectDictionary);
    const uri = yield effects.call(resolveNextLanguageRoute, {
      language,
      redirect,
      fallbackPath
    });
    yield effects.put(slice.actions.SET_LANGUAGE({
      language,
      dictionary: dictionary != null ? dictionary : undefined,
      redirect: redirect !== false ? uri : undefined
    }));
  }
}

/** Handle any route redirection after we have set the language */
function* setLanguageRoute({
  payload
}) {
  if (payload !== null && payload !== void 0 && payload.redirect) {
    const currentPath = yield effects.select(selectors$1.selectCurrentPath);
    if (payload.redirect === currentPath) {
      // already on the correct path, no need to redirect
      return;
    }
    yield effects.put(selectors$1.setRoute(payload.redirect));
  }
}

/** Determine the correct route uri when the language changes */
function* resolveNextLanguageRoute({
  language,
  redirect,
  fallbackPath
}) {
  // have they supplied the route to go to?
  if (typeof redirect === 'string') {
    return redirect;
  }

  // is this an entry or a static route?
  const availableLanguages = yield effects.select(selectors$1.selectRouteEntryAvailableLanguages);
  if (availableLanguages.find(l => l.toLowerCase() === language.toLowerCase())) {
    // if entry, get the uri for this language variation from the api
    const entryUri = yield effects.call(getEntryUriForLanguage, {
      entryId: yield effects.select(selectors$1.selectRouteEntryID),
      language
    });
    if (entryUri) {
      return entryUri;
    }
  }

  // if static route, get the uri from the routes config
  const staticRouteUri = yield effects.call(getStaticRouteUri, {
    language
  });
  if (staticRouteUri) {
    return staticRouteUri;
  }

  // if all else fails, fallback to the supplied fallback path or homepage
  return fallbackPath || `/${language.toLowerCase()}`;
}

/** Check any current static route for a language variation we have stored in i18n.routes */
function* getStaticRouteUri({
  language
}) {
  const staticRoute = yield effects.select(selectors$1.selectStaticRoute);
  if (staticRoute !== null && staticRoute !== void 0 && staticRoute.route.path) {
    var _Object$entries$find;
    // Routes can have parameters such as `/:facet?` we need to deparameterise
    // so we can check against our stored locale routes
    const deparameterisedPath = deparameterise(staticRoute.route.path);
    const localeRoutes = yield effects.select(selectors.selectLocaleRoutes);
    const originalPath = (_Object$entries$find = Object.entries(localeRoutes || {}).find(([, locales]) => Object.values(locales).includes(deparameterisedPath))) === null || _Object$entries$find === void 0 ? void 0 : _Object$entries$find[0];
    const routeLocales = localeRoutes[deparameterisedPath] || localeRoutes[originalPath || ''];
    const routeUri = routeLocales === null || routeLocales === void 0 ? void 0 : routeLocales[language];
    return routeUri;
  }
}

/**
 * Run when the app initiates locales, populating supported languages from the config
 * or fetching from the project if not provided
 */
function* getProjectLanguages({
  payload
}) {
  const stateLocales = yield effects.select(selectors.selectLocales);
  if (stateLocales && Object.keys(stateLocales).length > 0)
    // Locales already set in state, no need to fetch again
    return;
  const locales = {};
  let primaryLanguage = payload.primaryLanguage;
  const supportedLanguages = [...(payload.supportedLanguages || [])];
  if (supportedLanguages !== null && supportedLanguages !== void 0 && supportedLanguages.length) {
    // If supported languages are provided in config, use these
    for (const supportedLanguage of supportedLanguages) {
      locales[supportedLanguage] = {};
    }
  } else {
    // Fallback to getting languages from the project
    const [error, project] = yield to__default.default(ContensisDeliveryApi.cachedSearch.getClient().project.get());
    if (error) {
      console.error('Problem fetching project languages:', error);
    } else if (project) {
      var _project$primaryLangu;
      for (const supportedLanguage of project.supportedLanguages || []) {
        locales[supportedLanguage] = {};
        supportedLanguages.push(supportedLanguage);
      }
      // Set primary language from project if we have it
      primaryLanguage = (_project$primaryLangu = project.primaryLanguage) != null ? _project$primaryLangu : primaryLanguage;
    }
  }
  if (Object.keys(locales).length === 0) {
    // Ensure at least the primary language is included
    locales[payload.primaryLanguage] = {};
    supportedLanguages.push(payload.primaryLanguage);
  }

  // Only commit if we have locales to set or we will end up in an infinite loop
  if (Object.keys(locales).length) yield effects.put(slice.actions.SET_LOCALES({
    ...payload,
    primaryLanguage,
    supportedLanguages,
    locales
  }));
}

/**
 * Run a Delivery API query to get the uri for the chosen language variation of this entryId
 * */
function* getEntryUriForLanguage({
  entryId,
  language
}) {
  try {
    const versionStatus = yield effects.select(version$1.selectVersionStatus);
    const query = new contensisDeliveryApi.Query(contensisDeliveryApi.Op.equalTo('sys.id', entryId), contensisDeliveryApi.Op.equalTo('sys.language', language), contensisDeliveryApi.Op.equalTo('sys.versionStatus', versionStatus));
    query.fields = ['sys.uri'];
    query.pageSize = 1;
    const result = yield ContensisDeliveryApi.cachedSearch.search(query);
    return result.items.length ? result.items[0].sys.uri : null;
  } catch (error) {
    console.error('Error fetching language variations:', error);
    yield effects.put(slice.actions.GET_ENTRY_URI_ERROR(error));
  }
}

const sys = {
  versionStatus: 'sys.versionStatus'
};
const Fields = {
  sys};

const fieldExpression = (field, value, operator = 'equalTo', weight = null) => {
  if (!field || !value) return [];
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? [contensisDeliveryApi.Op[operator](field, value)] : [contensisDeliveryApi.Op[operator](field, value).weight(weight)];
};
const defaultExpressions = versionStatus => {
  return [contensisDeliveryApi.Op.equalTo(Fields.sys.versionStatus, versionStatus)];
};
const equalToOrIn = (field, arr, operator = 'equalTo') => arr.length === 0 ? [] : arr.length === 1 ? [contensisDeliveryApi.Op[operator](field, arr[0])] : [contensisDeliveryApi.Op.in(field, ...arr)];

const routeEntryByFieldsQuery = (id, language = 'en-GB', contentTypeId = '', fields = [], fieldLinkDepths, versionStatus = 'published') => {
  const query = new contensisDeliveryApi.Query(...[...fieldExpression('sys.id', id), ...fieldExpression('sys.language', language), ...(contentTypeId ? fieldExpression('sys.contentTypeId', contentTypeId) : fieldExpression('sys.dataFormat', 'entry')), ...defaultExpressions(versionStatus)]);
  query.fields = fields;
  query.fieldLinkDepths = fieldLinkDepths;
  return query;
};

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

/**
 * @description Asynchronously load and inject assets related to Search
 */
const importSearchAssets = () => Promise.resolve().then(function () { return require('./search.js'); });

/**
 * Invokes the Search saga if:
 * - `searchOptions` is present on `staticRoute` or `contentTypeRoute`
 * - `searchOptions` is provided by the consumer app
 *   - and path starts with one of `onPaths: ['/search']`
 *   - or a `facet` or `listingType` is present in provided `searchOptions`
 *
 * A `config` is required if we want to inject the redux reducer here, sagas are injected automatically
 */
function* handleSearchSaga({
  location,
  params,
  routeSearchOptions,
  searchOptions,
  ssr
}) {
  // Merge supplied mappers with route-supplied mappers taking precedence
  const mappers = {
    results: e => e,
    ...((searchOptions === null || searchOptions === void 0 ? void 0 : searchOptions.mappers) || {}),
    ...((routeSearchOptions === null || routeSearchOptions === void 0 ? void 0 : routeSearchOptions.mappers) || {})
  };

  // Merge all other search options with route-supplied options taking precedence
  const {
    onPaths = ['/search'],
    ...searchOpts
  } = {
    ...(routeSearchOptions || {}),
    ...(searchOptions || {})
  };

  // Check do we meet conditions to run the search saga
  const invokeSearch = onPaths.find(p => location.pathname.startsWith(p)) || searchOpts.composition || searchOpts.facet || searchOpts.listingType;

  // An empty routeSearchOptions object can be used to import assets and load config for a minilist
  const importAssets = routeSearchOptions;
  if (importAssets || invokeSearch) {
    // Async load search assets
    const {
      reducer,
      sagas,
      setRouteFilters
    } = yield importSearchAssets();

    // Inject search reducer and sagas
    yield effects.call(reduxInjectorSaga, async () => ({
      key: 'search',
      reducer: searchOpts.config && reducer(searchOpts.config),
      saga: sagas
    }));
    if (invokeSearch) yield effects.call(setRouteFilters, {
      params,
      ssr,
      ...searchOpts,
      mappers
    });
  }
}

const routingSagas = [effects.takeEvery(selectors$1.SET_NAVIGATION_PATH, getRouteSaga), effects.takeEvery(selectors$1.SET_ROUTE, setRouteSaga)];

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
    var _staticRoute$route, _staticRoute$route2, _staticRoute$route3, _staticRoute$route4, _appsays, _appsays2, _appsays3, _pathNode3, _pathNode4, _pathNode5;
    const {
      withEvents,
      routes: {
        ContentTypeMappings = {}
      } = {},
      staticRoute,
      // get api instance from ssr context that is connected to the specific request in ssr
      ssr: {
        api
      }
    } = action;

    // Inject redux { key, reducer, saga } provided by staticRoute
    if (staticRoute && staticRoute.route.injectRedux) yield effects.call(reduxInjectorSaga, staticRoute.route.injectRedux);

    // Variables we will pass to setRouteEntry
    let pathNode = null,
      ancestors = null,
      children = [],
      siblings = null;
    let contentTypeMapping = {};

    // These variables are the return values from
    // calls to withEvents.onRouteLoad and onRouteLoaded
    let appsays,
      requireLogin = false,
      searchOptions = false;
    if (withEvents && withEvents.onRouteLoad) {
      appsays = yield withEvents.onRouteLoad(action);
    }

    // We could improve this further with a reusable mapper
    // function to return these params given a static route
    // or matching a content type mapping we could call at various points
    // enabling us to mix and match and prioritise inputs if there are multiple
    let linkDepth = staticRoute === null || staticRoute === void 0 || (_staticRoute$route = staticRoute.route) === null || _staticRoute$route === void 0 || (_staticRoute$route = _staticRoute$route.fetchNode) === null || _staticRoute$route === void 0 ? void 0 : _staticRoute$route.linkDepth;
    let fields = staticRoute === null || staticRoute === void 0 || (_staticRoute$route2 = staticRoute.route) === null || _staticRoute$route2 === void 0 || (_staticRoute$route2 = _staticRoute$route2.fetchNode) === null || _staticRoute$route2 === void 0 ? void 0 : _staticRoute$route2.fields;
    let fieldLinkDepths = staticRoute === null || staticRoute === void 0 || (_staticRoute$route3 = staticRoute.route) === null || _staticRoute$route3 === void 0 || (_staticRoute$route3 = _staticRoute$route3.fetchNode) === null || _staticRoute$route3 === void 0 ? void 0 : _staticRoute$route3.fieldLinkDepths;
    let entryMapper = staticRoute === null || staticRoute === void 0 || (_staticRoute$route4 = staticRoute.route) === null || _staticRoute$route4 === void 0 || (_staticRoute$route4 = _staticRoute$route4.fetchNode) === null || _staticRoute$route4 === void 0 ? void 0 : _staticRoute$route4.entryMapper;
    const entryLinkDepth = appsays && appsays.entryLinkDepth !== undefined ? appsays.entryLinkDepth : 2;
    const entryFieldLinkDepths = (_appsays = appsays) === null || _appsays === void 0 ? void 0 : _appsays.entryFieldLinkDepths;
    const setStaticRouteLimits = typeof linkDepth !== 'undefined' || fields || fieldLinkDepths;
    const setContentTypeLimits = !!ContentTypeMappings.find(ct => ct.fields || ct.linkDepth || ct.nodeOptions || ct.fieldLinkDepths);
    const state = yield effects.select();
    const routeEntry = selectors$1.selectRouteEntry(state, 'js');
    const routeNode = selectors$1.selectCurrentNode(state, 'js');
    const currentPath = action.path; //selectCurrentPath(state);
    const deliveryApiStatus = version$1.selectVersionStatus(state);
    const project = selectors$1.selectCurrentProject(state);
    // const isHome = currentPath === '/';
    const isPreview = currentPath && currentPath.startsWith('/preview/');
    const currentLanguage = selectors.selectCurrentLanguage(state);
    const defaultLang = appsays && appsays.defaultLang || currentLanguage || 'en-GB';
    if (!isPreview && ((_appsays2 = appsays) !== null && _appsays2 !== void 0 && _appsays2.customRouting || staticRoute && !staticRoute.route.fetchNode || routeEntry && action.statePath === action.path && ((_appsays3 = appsays) === null || _appsays3 === void 0 ? void 0 : _appsays3.refetchNode) !== true)) {
      var _staticRoute$route5;
      // To prevent erroneous 404s and wasted network calls, this covers
      // - appsays customRouting and does SET_ENTRY etc. via the consuming app
      // - all staticRoutes (where custom 'route.fetchNode' attribute is falsey)
      // - standard Contensis SiteView Routing where we already have that entry in state
      if (routeEntry && (!staticRoute || staticRoute !== null && staticRoute !== void 0 && (_staticRoute$route5 = staticRoute.route) !== null && _staticRoute$route5 !== void 0 && _staticRoute$route5.fetchNode)) {
        pathNode = {
          ...routeNode,
          entry: null
        };
        pathNode.entry = entry = routeEntry;
        yield effects.put({
          type: selectors$1.UPDATE_LOADING_STATE,
          isLoading: false
        });
      } else yield effects.call(setRouteEntry, currentPath, routeEntry, yield effects.select(selectors$1.selectCurrentNode), yield effects.select(selectors$1.selectCurrentAncestors), yield effects.select(selectors$1.selectCurrentSiblings));
    } else {
      var _staticRoute$route6;
      // Handle preview routes
      if (isPreview) {
        let splitPath = currentPath.split('/');
        let entryGuid = splitPath[2];
        let language = defaultLang;
        if (splitPath.length >= 3) {
          //set lang key if available in the path, else use default lang
          //assumes preview url on content type is: http://preview.ALIAS.contensis.cloud/preview/{GUID}/{LANG}
          if (splitPath.length == 4) language = splitPath[3];
          // According to product dev we cannot use Node API
          // for previewing entries as it gives a response of []
          // -- apparently it is not correct to request latest content
          // with Node API
          let previewEntry = yield api.getClient(deliveryApiStatus, project).entries.get({
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
        var _pathNode, _pathNode2;
        // Handle all other routes
        let nodeError = undefined;
        // Resolve a stub of route node if we are setting limits in content type mappings
        // Resolve the complete entry with the node if we are setting limits in a static route
        [nodeError, pathNode] = yield to__default.default(api.getNode({
          depth: 0,
          path: currentPath,
          entryFields: setStaticRouteLimits ? fields || '*' : setContentTypeLimits ? ['sys.contentTypeId', 'sys.id'] : '*',
          entryLinkDepth: setStaticRouteLimits && typeof linkDepth !== 'undefined' ? linkDepth : entryLinkDepth || 0,
          entryFieldLinkDepths: setStaticRouteLimits ? fieldLinkDepths : setContentTypeLimits ? undefined : entryFieldLinkDepths,
          // language parameter is not used when resolving a node by path
          // https://www.contensis.com/help-and-docs/apis/delivery-http/navigation/nodes/get-a-node-by-path
          // language: defaultLang,
          versionStatus: deliveryApiStatus
        }, project));
        if (nodeError) {
          if ([401, 403].includes(nodeError.status)) {
            // Capture specific auth errors with the delivery api
            // and fire the user down the handleRequiresLoginSaga
            // If auth was successful via a refreshToken we need to reload the page
            // to run this getRouteSaga again with the security token cookie
            const userLoggedIn = yield effects.call(ChangePassword_container.handleRequiresLoginSaga, {
              ...action,
              requireLogin: true
            });
            if (userLoggedIn && nodeError.status === 401) {
              // Reload the route so we can re-run the routing request now the
              // authentication cookies are written
              return yield effects.call(setRouteSaga, {
                path: currentPath
              });
            } else if (userLoggedIn && nodeError.status === 403) {
              return yield effects.call(setRouteSaga, {
                path: ChangePassword_container.LoginHelper.GetAccessDeniedRoute(currentPath)
              });
            } else {
              return yield effects.call(do500, nodeError);
            }
          } else throw nodeError;
        } else ({
          entry
        } = pathNode || {});

        // Try resolve a content type mapping
        if ((_pathNode = pathNode) !== null && _pathNode !== void 0 && (_pathNode = _pathNode.entry) !== null && _pathNode !== void 0 && (_pathNode = _pathNode.sys) !== null && _pathNode !== void 0 && _pathNode.id && pathNode.entry.sys.contentTypeId) {
          // Get fields[] and linkDepth from ContentTypeMapping to get the entry data
          // and current node's ordinates at a specified depth with specified fields
          contentTypeMapping = ChangePassword_container.findContentTypeMapping(ContentTypeMappings, pathNode.entry.sys.contentTypeId);
        }

        // Run a second search query if we aren't setting limits from a static route
        // but we are setting limits from a content type mapping, now we have a handle
        // on a contentTypeId from the resolve node, we can apply the right limits when
        // fetching the entry
        if (!setStaticRouteLimits && setContentTypeLimits && (_pathNode2 = pathNode) !== null && _pathNode2 !== void 0 && (_pathNode2 = _pathNode2.entry) !== null && _pathNode2 !== void 0 && (_pathNode2 = _pathNode2.sys) !== null && _pathNode2 !== void 0 && _pathNode2.id) {
          var _payload$items;
          // Now we have a handle on a content type mapping we can
          // reassign the query limiting variables if we haven't
          // already set them in a static route
          if (!setStaticRouteLimits) ({
            fieldLinkDepths,
            fields,
            linkDepth
          } = contentTypeMapping || {});
          const query = routeEntryByFieldsQuery(pathNode.entry.sys.id, pathNode.entry.sys.language, pathNode.entry.sys.contentTypeId, fields, fieldLinkDepths, deliveryApiStatus);
          const payload = yield api.search(query, typeof linkDepth !== 'undefined' ? linkDepth : entryLinkDepth || 0, project);
          if ((payload === null || payload === void 0 || (_payload$items = payload.items) === null || _payload$items === void 0 ? void 0 : _payload$items.length) > 0) {
            pathNode.entry = entry = payload.items[0];
          }
        }
      }

      // make calls to fetch node ancestors, children,
      // siblings or entire node tree
      [ancestors, children, siblings] = yield effects.call(resolveCurrentNodeOrdinates, {
        api,
        appsays,
        contentTypeMapping: contentTypeMapping || (staticRoute === null || staticRoute === void 0 || (_staticRoute$route6 = staticRoute.route) === null || _staticRoute$route6 === void 0 ? void 0 : _staticRoute$route6.fetchNode) || {},
        language: defaultLang,
        path: currentPath,
        pathNode,
        project,
        versionStatus: deliveryApiStatus
      });
      if (children) pathNode.children = children;
    }

    // We initially listened for SET_ENTRY to complete before
    // resolving the current route language, but this meant
    // that the language change was not captured in time for the SSR response
    yield effects.call(resolveCurrentRouteLanguage, {
      entry: (_pathNode3 = pathNode) === null || _pathNode3 === void 0 ? void 0 : _pathNode3.entry,
      node: pathNode
    });
    const contentTypeRoute = ChangePassword_container.findContentTypeMapping(ContentTypeMappings, (_pathNode4 = pathNode) === null || _pathNode4 === void 0 || (_pathNode4 = _pathNode4.entry) === null || _pathNode4 === void 0 || (_pathNode4 = _pathNode4.sys) === null || _pathNode4 === void 0 ? void 0 : _pathNode4.contentTypeId);

    // Inject redux { key, reducer, saga } provided by ContentTypeMapping
    if (contentTypeRoute !== null && contentTypeRoute !== void 0 && contentTypeRoute.injectRedux) yield effects.call(reduxInjectorSaga, contentTypeRoute.injectRedux);

    // Have we defined search options in the route configuration (for triggering search)
    const routeSearchOptions = ChangePassword_container.getSearchOptions(staticRoute, contentTypeRoute);
    const params = util.routeParams(staticRoute, action.location);
    if (withEvents && withEvents.onRouteLoaded) {
      // Check if the app has provided a requireLogin boolean flag or groups array
      // in addition to checking if requireLogin is set in the route definition
      // The app can provide an object to invoke the search saga
      ({
        requireLogin,
        searchOptions
      } = (yield withEvents.onRouteLoaded({
        ...action,
        contentTypeRoute,
        entry,
        params,
        searchOptions: routeSearchOptions
      })) || {});
    }
    if (requireLogin !== false) {
      // Do not call the login feature saga if requireLogin is false
      yield effects.call(ChangePassword_container.handleRequiresLoginSaga, {
        ...action,
        entry,
        requireLogin
      });
    }
    if (searchOptions || routeSearchOptions) yield effects.call(handleSearchSaga, {
      ...action,
      params,
      routeSearchOptions,
      searchOptions
    });
    if (!appsays || !appsays.preventScrollTop) {
      // Scroll into View
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    }
    if ((_pathNode5 = pathNode) !== null && _pathNode5 !== void 0 && (_pathNode5 = _pathNode5.entry) !== null && _pathNode5 !== void 0 && (_pathNode5 = _pathNode5.sys) !== null && _pathNode5 !== void 0 && _pathNode5.id) {
      var _appsays4;
      entry = pathNode.entry;
      yield effects.call(setRouteEntry, currentPath, entry, pathNode, ancestors, siblings, entryMapper || (contentTypeRoute === null || contentTypeRoute === void 0 ? void 0 : contentTypeRoute.entryMapper), false, (_appsays4 = appsays) === null || _appsays4 === void 0 ? void 0 : _appsays4.refetchNode);
    } else {
      if (staticRoute) yield effects.call(setRouteEntry, currentPath, null, pathNode, ancestors, siblings);else yield effects.call(do404);
    }
  } catch (e) {
    log__namespace.error(...['Error running route saga:', e, e.stack]);
    yield effects.call(do500, e);
  }
}
function* resolveCurrentNodeOrdinates(action) {
  const {
    api,
    appsays,
    contentTypeMapping,
    language,
    path,
    pathNode,
    project,
    versionStatus
  } = action;
  const apiCall = [() => null, () => null, () => null, () => null];

  // if appsays customNavigation: true, we will set doNavigation to false
  // if appsays customNavigation: { ... }, we will set doNavigation to the customNavigation object and check for child elements
  // if appsays nothing we will set doNavigation to true and continue to do navigation calls
  const doNavigation = !appsays || ((appsays === null || appsays === void 0 ? void 0 : appsays.customNavigation) === true ? false : (appsays === null || appsays === void 0 ? void 0 : appsays.customNavigation) || true);
  const {
    entryLinkDepth = 0,
    fieldLinkDepths,
    fields,
    linkDepth,
    nodeOptions = {}
  } = contentTypeMapping;
  if (pathNode && pathNode.id) {
    if (doNavigation === true || doNavigation.ancestors) {
      apiCall[0] = function* getAncestors() {
        try {
          return yield api.getAncestors({
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
      const childrenOptions = !nodeOptions.children || typeof nodeOptions.children === 'boolean' ? {} : nodeOptions.children;
      apiCall[1] = function* getChildren() {
        try {
          return yield api.getNode({
            depth: childrenOptions.depth !== undefined ? childrenOptions.depth : childrenDepth,
            path,
            entryFieldLinkDepths: childrenOptions.fieldLinkDepths || fieldLinkDepths,
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
          var _nodeOptions$siblings, _nodeOptions$siblings2, _nodeOptions$siblings3;
          return yield api.getSiblings({
            id: pathNode.id,
            entryFieldLinkDepths: (nodeOptions === null || nodeOptions === void 0 || (_nodeOptions$siblings = nodeOptions.siblings) === null || _nodeOptions$siblings === void 0 ? void 0 : _nodeOptions$siblings.fieldLinkDepths) || fieldLinkDepths,
            entryFields: (nodeOptions === null || nodeOptions === void 0 || (_nodeOptions$siblings2 = nodeOptions.siblings) === null || _nodeOptions$siblings2 === void 0 ? void 0 : _nodeOptions$siblings2.fields) || fields || undefined,
            entryLinkDepth: typeof (nodeOptions === null || nodeOptions === void 0 || (_nodeOptions$siblings3 = nodeOptions.siblings) === null || _nodeOptions$siblings3 === void 0 ? void 0 : _nodeOptions$siblings3.linkDepth) !== 'undefined' ? nodeOptions.siblings.linkDepth : typeof linkDepth !== 'undefined' ? linkDepth : entryLinkDepth,
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
        type: store.GET_NODE_TREE,
        ...action,
        treeDepth
      });
    } else {
      return yield effects.call(ensureNodeTreeSaga, {
        ...action,
        treeDepth
      });
    }
  };
  const [loadAncestors, loadChildren, loadSiblings, loadTree] = apiCall;
  const [ancestors, nodeWithChildren, siblings] = yield effects.all([loadAncestors(), loadChildren(), loadSiblings(), loadTree()]);
  return [ancestors, nodeWithChildren === null || nodeWithChildren === void 0 ? void 0 : nodeWithChildren.children, siblings];
}
function* setRouteEntry(currentPath, entry, node, ancestors, siblings, entryMapper, notFound = false, remapEntry = false) {
  const entrySys = entry && entry.sys || {};

  // Update a window global to provide the preview toolbar
  // an updated entry id in client-side navigation
  if (typeof window !== 'undefined') window.ContensisEntryId = entrySys.id;
  const currentEntryId = yield effects.select(selectors$1.selectRouteEntryEntryId);
  const currentEntryLang = yield effects.select(selectors$1.selectRouteEntryLanguage);
  const mappedEntry = !entryMapper ? null : currentEntryId === entrySys.id && currentEntryLang === entrySys.language && remapEntry === false ? (yield effects.select(selectors$1.selectMappedEntry, 'js')) || {} : yield mapRouteEntry(entryMapper, {
    ...node,
    entry,
    ancestors,
    siblings
  });
  yield effects.all([effects.put({
    type: selectors$1.SET_ENTRY,
    id: entrySys.id,
    currentPath,
    entry,
    mappedEntry,
    node,
    notFound
  }), ancestors && effects.put({
    type: selectors$1.SET_ANCESTORS,
    ancestors
  }), siblings && effects.put({
    type: selectors$1.SET_SIBLINGS,
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
    throw e;
  }
  return;
}
function* do404() {
  yield effects.call(clientReloadHitServer);
  yield effects.put({
    type: selectors$1.SET_ENTRY,
    id: null,
    entry: null,
    notFound: true
  });
}
function* clientReloadHitServer() {
  const stateEntry = yield effects.select(selectors$1.selectRouteEntry);

  // If in client and there is a stateEntry.sys field reload the page,
  // on the 2nd load stateEntry.sys should be null at this point,
  // we do not wish to reload again and get stuck in an infinite reloading loop
  if (typeof window !== 'undefined' && (stateEntry !== null && stateEntry !== void 0 && stateEntry.sys || null)) {
    window.location.reload();
  }
}
function* do500(error) {
  yield effects.put({
    type: selectors$1.SET_ENTRY,
    id: null,
    entry: null,
    notFound: true,
    isError: true,
    error,
    statusCode: error && error.status ? error.status : 500
  });
}

const registerSagas = [effects.takeEvery(selectors$1.REGISTER_USER, registerSaga), effects.takeEvery(selectors$1.REGISTER_USER_SUCCESS, redirectSaga)];
function* registerSaga({
  user,
  mappers
}) {
  let requestBody = user;
  // Allow use of request mapper to take a user object
  // of any format and return the payload for the api request
  if (mappers && mappers.request && typeof mappers.request === 'function') {
    requestBody = yield mappers.request(user);
  }

  // Make POST call to register API
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
    const [, responseBody] = yield to.to(response.json());
    if (responseBody) {
      // Allow use of response mapper to convert the successful user object
      // from the api response body into a user object of any format
      if (mappers && mappers.response && typeof mappers.response === 'function') {
        mappedResponse = yield mappers.response(responseBody);
      }
      // Update user object with mappedResponse or responseBody
      yield effects.put({
        type: selectors$1.REGISTER_USER_SUCCESS,
        user: mappedResponse || responseBody
      });
    } else {
      // OK response but unable to parse the response body
      yield effects.put({
        type: selectors$1.REGISTER_USER_FAILED,
        error: {
          message: 'Unable to parse the created user from the register service response'
        }
      });
    }
  } else {
    // Not OK responses, these can be due to service availability
    // or status codes echoed from the responses received from
    // management api when registering the user
    const [, errorResponse] = yield to.to(response.json());
    const error = errorResponse && errorResponse.error || errorResponse || {};
    // Get something meaningful from the response if there is no message in the body
    if (!error.message) {
      error.message = `Registration service: ${response.statusText}`;
      error.status = response.status;
    }
    yield effects.put({
      type: selectors$1.REGISTER_USER_FAILED,
      error
    });
  }
}
function* redirectSaga() {
  // Check if querystring contains a redirect_uri
  const currentQs = selectors$1.queryParams(yield effects.select(selectors$1.selectCurrentSearch));
  const redirectUri = currentQs.redirect_uri || currentQs.redirect;

  // We must use redux based navigation to preserve the registration state
  if (redirectUri) yield effects.put(selectors$1.setRoute(redirectUri));
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
    const options = {
      ...BASE_OPTIONS,
      headers: {
        'x-security-token': securityToken
      }
    };
    return await UserHelper.get(USER_ENVS_URL, options);
  }
  static async ResendUserVerification(userEmail) {
    const options = {
      ...BASE_OPTIONS
    };
    return await UserHelper.get(`/${USER_RESEND_VERIFICATION_URI}?user=${userEmail}`, options);
  }
  static async RequestPasswordReset(userEmailObject) {
    const options = {
      ...BASE_OPTIONS,
      body: JSON.stringify(userEmailObject)
    };
    options.method = 'POST';
    return await UserHelper.get(`/${USER_REQUEST_PASSWORD_RESET_URI}`, options);
  }
  static async ResetPassword(resetPasswordObject) {
    const options = {
      ...BASE_OPTIONS,
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

const resetPasswordSagas = [effects.takeEvery(selectors$1.REQUEST_USER_PASSWORD_RESET, requestPasswordResetSaga), effects.takeEvery(selectors$1.RESET_USER_PASSWORD, resetPasswordSaga), effects.takeEvery(selectors$1.CHANGE_USER_PASSWORD, changePasswordSaga)];
function* requestPasswordResetSaga(action) {
  const userEmailObject = action.userEmailObject;
  yield effects.put({
    type: selectors$1.REQUEST_USER_PASSWORD_RESET_SENDING
  });
  if (userEmailObject && userEmailObject.userEmail) {
    try {
      const passwordResetRequestResponse = yield UserHelper.RequestPasswordReset(userEmailObject);
      if (passwordResetRequestResponse) {
        if (!passwordResetRequestResponse.error) {
          yield effects.put({
            type: selectors$1.REQUEST_USER_PASSWORD_RESET_SUCCESS
          });
        } else {
          yield effects.put({
            type: selectors$1.REQUEST_USER_PASSWORD_RESET_ERROR,
            error: passwordResetRequestResponse.error.message
          });
        }
      } else {
        yield effects.put({
          type: selectors$1.REQUEST_USER_PASSWORD_RESET_ERROR,
          error: 'No response from server'
        });
      }
    } catch (error) {
      yield effects.put({
        type: selectors$1.REQUEST_USER_PASSWORD_RESET_ERROR,
        error: error && error.toString()
      });
    }
  } else {
    yield effects.put({
      type: selectors$1.REQUEST_USER_PASSWORD_RESET_ERROR,
      error: 'Invalid object'
    });
  }
}
function* resetPasswordSaga(action) {
  const resetPasswordObject = action.resetPasswordObject;
  yield effects.put({
    type: selectors$1.RESET_USER_PASSWORD_SENDING
  });
  if (resetPasswordObject.token && resetPasswordObject.password) {
    try {
      const resetPasswordResponse = yield UserHelper.ResetPassword(resetPasswordObject);
      if (resetPasswordResponse) {
        if (!resetPasswordResponse.error) {
          yield effects.put({
            type: selectors$1.RESET_USER_PASSWORD_SUCCESS
          });
        } else {
          const error = resetPasswordResponse.error.data && resetPasswordResponse.error.data.length > 0 && resetPasswordResponse.error.data[0].message || resetPasswordResponse.error.message;
          yield effects.put({
            type: selectors$1.RESET_USER_PASSWORD_ERROR,
            error
          });
        }
      } else {
        yield effects.put({
          type: selectors$1.RESET_USER_PASSWORD_ERROR,
          error: 'No response from server'
        });
      }
    } catch (error) {
      yield effects.put({
        type: selectors$1.RESET_USER_PASSWORD_ERROR,
        error: error && error.toString()
      });
    }
  } else {
    yield effects.put({
      type: selectors$1.RESET_USER_PASSWORD_ERROR,
      error: 'Invalid object'
    });
  }
}

// userId
// existingPassword
// newPassword
function* changePasswordSaga(action) {
  if (!action || !action.userId || !action.currentPassword || !action.newPassword) {
    yield effects.put({
      type: selectors$1.CHANGE_USER_PASSWORD_ERROR,
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
      type: selectors$1.CHANGE_USER_PASSWORD_SENDING
    });
    const clientCredentials = yield effects.select(matchGroups.selectClientCredentials, 'js');
    const client = yield ChangePassword_container.getManagementApiClient({
      ...clientCredentials
    });
    const [err, res] = yield to.to(client.security.users.updatePassword(changePasswordObject));
    if (err) {
      var _err$data, _err$data2;
      const error = (err === null || err === void 0 || (_err$data = err.data) === null || _err$data === void 0 || (_err$data = _err$data.data) === null || _err$data === void 0 ? void 0 : _err$data.length) > 0 && err.data.data[0].message || (err === null || err === void 0 || (_err$data2 = err.data) === null || _err$data2 === void 0 ? void 0 : _err$data2.message);
      yield effects.put({
        type: selectors$1.CHANGE_USER_PASSWORD_ERROR,
        error
      });
      return;
    }
    yield effects.put({
      type: selectors$1.CHANGE_USER_PASSWORD_SUCCESS
    });
  } catch (error) {
    yield effects.put({
      type: selectors$1.CHANGE_USER_PASSWORD_ERROR,
      error: error && error.toString()
    });
  }
}

const userSagas = [...ChangePassword_container.loginSagas, ...registerSagas, ...resetPasswordSagas];

var rootSaga = (featureSagas = []) => {
  return [...i18nSagas, ...routingSagas, ...navigationSagas, ...userSagas, ...featureSagas];
};

// export default function (featureSagas: Effect[] = []) {
//   return function* rootSaga() {
//     const subSagas = [...routingSagas, ...navigationSagas, ...userSagas];
//     yield all([...subSagas, ...featureSagas]);
//   };
// }

const servers = SERVERS; /* global SERVERS */
const alias = servers.alias.toLowerCase();
const publicUri = PUBLIC_URI; /* global PUBLIC_URI */
const projects = PROJECTS; /* global PROJECTS */

// return a projectId via the request hostname
const pickProject = (hostname, query) => {
  // if localhost we can only infer via a querystring, and take your word for it
  if (hostname == 'localhost') {
    return query && query.p || projects[0].id;
  }

  // if hostname is the actual public uri we can return the first project from the list
  if (hostname == publicUri) {
    return projects[0].id;
  }
  let project = 'unknown';

  // // go through all the defined projects
  // Object.entries(projects).map(([, p]) => {
  const p = projects[0];

  // check if we're accessing via the project's public uri
  if (hostname.includes(p.publicUri)) project = p.id;

  // the url structure is different for website (we don't prefix)
  if (p.id.startsWith('website')) {
    // check for internal and external hostnames
    // we check live and preview distinctly so our rule does not clash with
    // hostnames that use a project prefix
    if (hostname.includes(`live-${alias}.cloud.contensis.com`) || hostname.includes(`live.${alias}.contensis.cloud`) || hostname.includes(`preview-${alias}.cloud.contensis.com`) || hostname.includes(`preview.${alias}.contensis.cloud`)) project = p.id;
  } else {
    // check for internal and external hostnames, prefixed with the projectId
    if (hostname.includes(`${p.id.toLowerCase()}-${alias}.cloud.contensis.com`) || hostname.includes(`${p.id.toLowerCase()}.${alias}.contensis.cloud`)) project = p.id;
  }
  // });
  return project === 'unknown' ? p.id : project;
};

const AppRoot = props => {
  return /*#__PURE__*/React__default.default.createElement(RouteLoader.RouteLoader, props);
};

exports.AppRoot = AppRoot;
exports.browserHistory = browserHistory;
exports.createLocaleRoutes = createLocaleRoutes;
exports.history = history;
exports.pickProject = pickProject;
exports.rootSaga = rootSaga;
//# sourceMappingURL=App-CFT_UyKL.js.map
