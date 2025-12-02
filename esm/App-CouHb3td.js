import { createBrowserHistory, createMemoryHistory } from 'history';
import { takeEvery, select, put, call, all } from '@redux-saga/core/effects';
import * as log from 'loglevel';
import { G as GET_NODE_TREE, b as SET_NODE_TREE, d as GET_NODE_TREE_ERROR } from './store-B-qb8-74.js';
import { h as hasNavigationTree, b as injectRedux } from './version-dOMNg_RS.js';
import to, { to as to$1 } from 'await-to-js';
import { Query, Op } from 'contensis-delivery-api';
import { a as actions } from './slice-0pK5h4wi.js';
import { o as selectCurrentPath, G as setRoute, K as selectRouteEntryAvailableLanguages, M as selectRouteEntryID, N as selectStaticRoute, y as SET_NAVIGATION_PATH, x as SET_ROUTE, j as selectRouteEntry, O as selectCurrentNode, f as selectCurrentProject, z as UPDATE_LOADING_STATE, P as selectCurrentAncestors, Q as selectCurrentSiblings, T as selectRouteEntryEntryId, W as selectRouteEntryLanguage, n as selectMappedEntry, A as SET_ENTRY, B as SET_ANCESTORS, w as SET_SIBLINGS, R as REGISTER_USER, X as REGISTER_USER_SUCCESS, Y as REGISTER_USER_FAILED, E as queryParams, F as selectCurrentSearch, H as REQUEST_USER_PASSWORD_RESET, I as RESET_USER_PASSWORD, J as CHANGE_USER_PASSWORD, Z as REQUEST_USER_PASSWORD_RESET_SENDING, _ as REQUEST_USER_PASSWORD_RESET_SUCCESS, $ as REQUEST_USER_PASSWORD_RESET_ERROR, a0 as RESET_USER_PASSWORD_SENDING, a1 as RESET_USER_PASSWORD_SUCCESS, a2 as RESET_USER_PASSWORD_ERROR, a3 as CHANGE_USER_PASSWORD_ERROR, a4 as CHANGE_USER_PASSWORD_SENDING, a5 as CHANGE_USER_PASSWORD_SUCCESS } from './selectors-PJo8AWy0.js';
import { s as selectVersionStatus } from './version-DlaBPQ7d.js';
import { a as cachedSearch } from './ContensisDeliveryApi-hzItw6r1.js';
import React from 'react';
import 'react-cookie';
import 'react-redux';
import './VersionInfo-BMAAda1K.js';
import 'jsonpath-mapper';
import 'react-router-dom';
import { s as selectCurrentLanguage, a as selectDictionary, c as selectLocaleRoutes, b as selectLocales, f as selectDictionaryResolver, d as selectPrimaryLanguage } from './selectors-DcmvOeX2.js';
import { h as handleRequiresLoginSaga, L as LoginHelper, i as findContentTypeMapping, j as getSearchOptions, k as getManagementApiClient, m as loginSagas } from './ChangePassword.container-giznBLAf.js';
import './sagas-ByIZH08V.js';
import 'reselect';
import 'immer';
import 'deep-equal';
import 'deepmerge';
import { r as routeParams } from './util-yOnc97Qr.js';
import 'contensis-core-api';
import { l as selectClientCredentials } from './matchGroups-DT-RunAc.js';
import { a as RouteLoader } from './RouteLoader-CirZWXW6.js';
import 'query-string';

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
const selectedHistory = typeof window !== 'undefined' ? createBrowserHistory : createMemoryHistory;
const history = (options = {}) => selectedHistory(options);
const browserHistory = selectedHistory();

const navigationSagas = [takeEvery(GET_NODE_TREE, ensureNodeTreeSaga)];
function* ensureNodeTreeSaga(action) {
  const {
    api,
    language,
    project,
    versionStatus,
    treeDepth
  } = action;
  const state = yield select();
  try {
    if (!hasNavigationTree(state)) {
      const nodes = yield api.getRootNode({
        depth: treeDepth || 0,
        language
      }, versionStatus, project);
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

const i18nSagas = [takeEvery(actions.INIT_LOCALES.type, getProjectLanguages), takeEvery(actions.UPDATE_LANGUAGE.type, updateLanguage)];
function* resolveCurrentRouteLanguage({
  entry,
  node
}) {
  var _entry$sys, _staticRoute$route;
  const currentLanguage = yield select(selectCurrentLanguage);
  const staticRoute = yield select(selectStaticRoute);
  let nextLanguage = currentLanguage;
  if (entry !== null && entry !== void 0 && (_entry$sys = entry.sys) !== null && _entry$sys !== void 0 && _entry$sys.language) nextLanguage = entry.sys.language;else if (node !== null && node !== void 0 && node.language) nextLanguage = node.language;else if (staticRoute !== null && staticRoute !== void 0 && (_staticRoute$route = staticRoute.route) !== null && _staticRoute$route !== void 0 && _staticRoute$route.language) nextLanguage = staticRoute.route.language;else nextLanguage = yield select(selectPrimaryLanguage);
  if (nextLanguage && nextLanguage !== currentLanguage) {
    const dictionary = yield call(resolveDictionaryForLanguage, nextLanguage);
    yield put(actions.SET_LANGUAGE({
      language: nextLanguage,
      dictionary
    }));
  }
}
function* resolveDictionaryForLanguage(language) {
  let dictionary = yield select(selectDictionary);
  // try and resolve a dictionary for this language
  const resolver = yield select(selectDictionaryResolver);
  if (typeof resolver === 'function') {
    try {
      // dynamic import of dictionary file
      const loadedDictionary = yield call(resolver, language);
      dictionary = loadedDictionary;
    } catch (error) {
      console.error(`No dictionary resolved for language ${language}`, error);
    }
  } else {
    // Load dictionary from locales in state
    const locales = yield select(selectLocales);
    if (locales && locales[language]) {
      dictionary = locales[language];
    }
  }
  return dictionary;
}
function* updateLanguage({
  payload: {
    language,
    redirect,
    fallbackPath
  }
}) {
  const currentLanguage = yield select(selectCurrentLanguage);
  if (language === currentLanguage) {
    // no change needed
    return;
  } else {
    const dictionary = language !== currentLanguage ? yield call(resolveDictionaryForLanguage, language) : yield select(selectDictionary);
    const uri = yield call(navigateToLanguageRoute, {
      language,
      redirect,
      fallbackPath
    });
    const currentPath = yield select(selectCurrentPath);
    if (uri === currentPath || redirect === false) {
      // already on the correct path, no need to redirect
      if (dictionary) yield put(actions.SET_LANGUAGE({
        language,
        dictionary
      }));
      return;
    }
    yield put(setRoute(uri));
  }
}
function* navigateToLanguageRoute({
  language,
  redirect,
  fallbackPath
}) {
  // have they supplied the route to go to?
  if (typeof redirect === 'string') {
    return redirect;
  }

  // is this an entry or a static route?
  const availableLanguages = yield select(selectRouteEntryAvailableLanguages);
  if (availableLanguages.find(l => l.toLowerCase() === language.toLowerCase())) {
    // if entry, get the uri for this language variation from the api
    const entryUri = yield call(getEntryUriForLanguage, {
      entryId: yield select(selectRouteEntryID),
      language
    });
    if (entryUri) {
      return entryUri;
    }
  }

  // if static route, get the uri from the routes config
  const staticRouteUri = yield call(getStaticRouteUri, {
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
  const staticRoute = yield select(selectStaticRoute);
  if (staticRoute !== null && staticRoute !== void 0 && staticRoute.route.path) {
    var _Object$entries$find;
    // Routes can have parameters such as `/:facet?` we need to deparameterise
    // so we can check against our stored locale routes
    const deparameterisedPath = deparameterise(staticRoute.route.path);
    const localeRoutes = yield select(selectLocaleRoutes);
    const originalPath = (_Object$entries$find = Object.entries(localeRoutes || {}).find(([, locales]) => Object.values(locales).includes(deparameterisedPath))) === null || _Object$entries$find === void 0 ? void 0 : _Object$entries$find[0];
    const routeLocales = localeRoutes[deparameterisedPath] || localeRoutes[originalPath || ''];
    const routeUri = routeLocales === null || routeLocales === void 0 ? void 0 : routeLocales[language];
    return routeUri;
  }
}
function* getProjectLanguages({
  payload
}) {
  const stateLocales = yield select(selectLocales);
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
    const [error, project] = yield to(cachedSearch.getClient().project.get());
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
  if (Object.keys(locales).length) yield put(actions.SET_LOCALES({
    ...payload,
    primaryLanguage,
    supportedLanguages,
    locales
  }));
}

/** Run a Delivery API query to get all language variations for this entryId */
function* getEntryUriForLanguage({
  entryId,
  language
}) {
  try {
    const versionStatus = yield select(selectVersionStatus);
    const query = new Query(Op.equalTo('sys.id', entryId), Op.equalTo('sys.language', language), Op.equalTo('sys.versionStatus', versionStatus));
    query.fields = ['sys.uri'];
    query.pageSize = 1;
    const result = yield cachedSearch.search(query);
    return result.items.length ? result.items[0].sys.uri : null;
  } catch (error) {
    console.error('Error fetching language variations:', error);
    yield put(actions.GET_ENTRY_URI_ERROR(error));
  }
}

const sys = {
  versionStatus: 'sys.versionStatus'
};
const Fields = {
  sys};

const fieldExpression = (field, value, operator = 'equalTo', weight = null) => {
  if (!field || !value) return [];
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? [Op[operator](field, value)] : [Op[operator](field, value).weight(weight)];
};
const defaultExpressions = versionStatus => {
  return [Op.equalTo(Fields.sys.versionStatus, versionStatus)];
};
const equalToOrIn = (field, arr, operator = 'equalTo') => arr.length === 0 ? [] : arr.length === 1 ? [Op[operator](field, arr[0])] : [Op.in(field, ...arr)];

const routeEntryByFieldsQuery = (id, language = 'en-GB', contentTypeId = '', fields = [], fieldLinkDepths, versionStatus = 'published') => {
  const query = new Query(...[...fieldExpression('sys.id', id), ...fieldExpression('sys.language', language), ...(contentTypeId ? fieldExpression('sys.contentTypeId', contentTypeId) : fieldExpression('sys.dataFormat', 'entry')), ...defaultExpressions(versionStatus)]);
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
    injectRedux({
      key,
      reducer,
      saga
    });
  }
}

/**
 * @description Asynchronously load and inject assets related to Search
 */
const importSearchAssets = () => import('./search.js');

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
    yield call(reduxInjectorSaga, async () => ({
      key: 'search',
      reducer: searchOpts.config && reducer(searchOpts.config),
      saga: sagas
    }));
    if (invokeSearch) yield call(setRouteFilters, {
      params,
      ssr,
      ...searchOpts,
      mappers
    });
  }
}

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
    if (staticRoute && staticRoute.route.injectRedux) yield call(reduxInjectorSaga, staticRoute.route.injectRedux);

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
    const state = yield select();
    const routeEntry = selectRouteEntry(state, 'js');
    const routeNode = selectCurrentNode(state, 'js');
    const currentPath = action.path; //selectCurrentPath(state);
    const deliveryApiStatus = selectVersionStatus(state);
    const project = selectCurrentProject(state);
    // const isHome = currentPath === '/';
    const isPreview = currentPath && currentPath.startsWith('/preview/');
    const defaultLang = appsays && appsays.defaultLang || 'en-GB';
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
        yield put({
          type: UPDATE_LOADING_STATE,
          isLoading: false
        });
      } else yield call(setRouteEntry, currentPath, routeEntry, yield select(selectCurrentNode), yield select(selectCurrentAncestors), yield select(selectCurrentSiblings));
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
        [nodeError, pathNode] = yield to(api.getNode({
          depth: 0,
          path: currentPath,
          entryFields: setStaticRouteLimits ? fields || '*' : setContentTypeLimits ? ['sys.contentTypeId', 'sys.id'] : '*',
          entryLinkDepth: setStaticRouteLimits && typeof linkDepth !== 'undefined' ? linkDepth : entryLinkDepth || 0,
          entryFieldLinkDepths: setStaticRouteLimits ? fieldLinkDepths : setContentTypeLimits ? undefined : entryFieldLinkDepths,
          language: defaultLang,
          versionStatus: deliveryApiStatus
        }, project));
        if (nodeError) {
          if ([401, 403].includes(nodeError.status)) {
            // Capture specific auth errors with the delivery api
            // and fire the user down the handleRequiresLoginSaga
            // If auth was successful via a refreshToken we need to reload the page
            // to run this getRouteSaga again with the security token cookie
            const userLoggedIn = yield call(handleRequiresLoginSaga, {
              ...action,
              requireLogin: true
            });
            if (userLoggedIn && nodeError.status === 401) {
              // Reload the route so we can re-run the routing request now the
              // authentication cookies are written
              return yield call(setRouteSaga, {
                path: currentPath
              });
            } else if (userLoggedIn && nodeError.status === 403) {
              return yield call(setRouteSaga, {
                path: LoginHelper.GetAccessDeniedRoute(currentPath)
              });
            } else {
              return yield call(do500, nodeError);
            }
          } else throw nodeError;
        } else ({
          entry
        } = pathNode || {});

        // Try resolve a content type mapping
        if ((_pathNode = pathNode) !== null && _pathNode !== void 0 && (_pathNode = _pathNode.entry) !== null && _pathNode !== void 0 && (_pathNode = _pathNode.sys) !== null && _pathNode !== void 0 && _pathNode.id && pathNode.entry.sys.contentTypeId) {
          // Get fields[] and linkDepth from ContentTypeMapping to get the entry data
          // and current node's ordinates at a specified depth with specified fields
          contentTypeMapping = findContentTypeMapping(ContentTypeMappings, pathNode.entry.sys.contentTypeId);
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
      [ancestors, children, siblings] = yield call(resolveCurrentNodeOrdinates, {
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
    yield call(resolveCurrentRouteLanguage, {
      entry: (_pathNode3 = pathNode) === null || _pathNode3 === void 0 ? void 0 : _pathNode3.entry,
      node: pathNode
    });
    const contentTypeRoute = findContentTypeMapping(ContentTypeMappings, (_pathNode4 = pathNode) === null || _pathNode4 === void 0 || (_pathNode4 = _pathNode4.entry) === null || _pathNode4 === void 0 || (_pathNode4 = _pathNode4.sys) === null || _pathNode4 === void 0 ? void 0 : _pathNode4.contentTypeId);

    // Inject redux { key, reducer, saga } provided by ContentTypeMapping
    if (contentTypeRoute !== null && contentTypeRoute !== void 0 && contentTypeRoute.injectRedux) yield call(reduxInjectorSaga, contentTypeRoute.injectRedux);

    // Have we defined search options in the route configuration (for triggering search)
    const routeSearchOptions = getSearchOptions(staticRoute, contentTypeRoute);
    const params = routeParams(staticRoute, action.location);
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
      yield call(handleRequiresLoginSaga, {
        ...action,
        entry,
        requireLogin
      });
    }
    if (searchOptions || routeSearchOptions) yield call(handleSearchSaga, {
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
      yield call(setRouteEntry, currentPath, entry, pathNode, ancestors, siblings, entryMapper || (contentTypeRoute === null || contentTypeRoute === void 0 ? void 0 : contentTypeRoute.entryMapper), false, (_appsays4 = appsays) === null || _appsays4 === void 0 ? void 0 : _appsays4.refetchNode);
    } else {
      if (staticRoute) yield call(setRouteEntry, currentPath, null, pathNode, ancestors, siblings);else yield call(do404);
    }
  } catch (e) {
    log.error(...['Error running route saga:', e, e.stack]);
    yield call(do500, e);
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
          log.info('Problem fetching ancestors', ex);
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
          log.info('Problem fetching children', ex);
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
        ...action,
        treeDepth
      });
    } else {
      return yield call(ensureNodeTreeSaga, {
        ...action,
        treeDepth
      });
    }
  };
  const [loadAncestors, loadChildren, loadSiblings, loadTree] = apiCall;
  const [ancestors, nodeWithChildren, siblings] = yield all([loadAncestors(), loadChildren(), loadSiblings(), loadTree()]);
  return [ancestors, nodeWithChildren === null || nodeWithChildren === void 0 ? void 0 : nodeWithChildren.children, siblings];
}
function* setRouteEntry(currentPath, entry, node, ancestors, siblings, entryMapper, notFound = false, remapEntry = false) {
  const entrySys = entry && entry.sys || {};

  // Update a window global to provide the preview toolbar
  // an updated entry id in client-side navigation
  if (typeof window !== 'undefined') window.ContensisEntryId = entrySys.id;
  const currentEntryId = yield select(selectRouteEntryEntryId);
  const currentEntryLang = yield select(selectRouteEntryLanguage);
  const mappedEntry = !entryMapper ? null : currentEntryId === entrySys.id && currentEntryLang === entrySys.language && remapEntry === false ? (yield select(selectMappedEntry, 'js')) || {} : yield mapRouteEntry(entryMapper, {
    ...node,
    entry,
    ancestors,
    siblings
  });
  yield all([put({
    type: SET_ENTRY,
    id: entrySys.id,
    currentPath,
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
    throw e;
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
  const stateEntry = yield select(selectRouteEntry);

  // If in client and there is a stateEntry.sys field reload the page,
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

const registerSagas = [takeEvery(REGISTER_USER, registerSaga), takeEvery(REGISTER_USER_SUCCESS, redirectSaga)];
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
    const [, responseBody] = yield to$1(response.json());
    if (responseBody) {
      // Allow use of response mapper to convert the successful user object
      // from the api response body into a user object of any format
      if (mappers && mappers.response && typeof mappers.response === 'function') {
        mappedResponse = yield mappers.response(responseBody);
      }
      // Update user object with mappedResponse or responseBody
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
    const [, errorResponse] = yield to$1(response.json());
    const error = errorResponse && errorResponse.error || errorResponse || {};
    // Get something meaningful from the response if there is no message in the body
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
  const redirectUri = currentQs.redirect_uri || currentQs.redirect;

  // We must use redux based navigation to preserve the registration state
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
}

// userId
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
    const client = yield getManagementApiClient({
      ...clientCredentials
    });
    const [err, res] = yield to$1(client.security.users.updatePassword(changePasswordObject));
    if (err) {
      var _err$data, _err$data2;
      const error = (err === null || err === void 0 || (_err$data = err.data) === null || _err$data === void 0 || (_err$data = _err$data.data) === null || _err$data === void 0 ? void 0 : _err$data.length) > 0 && err.data.data[0].message || (err === null || err === void 0 || (_err$data2 = err.data) === null || _err$data2 === void 0 ? void 0 : _err$data2.message);
      yield put({
        type: CHANGE_USER_PASSWORD_ERROR,
        error
      });
      return;
    }
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
  return /*#__PURE__*/React.createElement(RouteLoader, props);
};

export { AppRoot as A, browserHistory as b, createLocaleRoutes as c, history as h, pickProject as p, rootSaga as r };
//# sourceMappingURL=App-CouHb3td.js.map
