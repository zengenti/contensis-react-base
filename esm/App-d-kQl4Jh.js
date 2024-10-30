import { createBrowserHistory, createMemoryHistory } from 'history';
import { takeEvery, select, put, call, all } from '@redux-saga/core/effects';
import * as log from 'loglevel';
import { G as GET_NODE_TREE, b as SET_NODE_TREE, d as GET_NODE_TREE_ERROR } from './store-f0WxNWUu.js';
import { h as hasNavigationTree, i as injectRedux } from './version-BnnERhzW.js';
import to, { to as to$1 } from 'await-to-js';
import { y as SET_NAVIGATION_PATH, x as SET_ROUTE, e as selectRouteEntry, C as selectCurrentNode, l as selectCurrentProject, z as UPDATE_LOADING_STATE, D as selectCurrentAncestors, E as selectCurrentSiblings, F as selectRouteEntryEntryId, G as selectRouteEntryLanguage, k as selectMappedEntry, A as SET_ENTRY, B as SET_ANCESTORS, w as SET_SIBLINGS, R as REGISTER_USER, H as REGISTER_USER_SUCCESS, I as REGISTER_USER_FAILED, J as queryParams, K as selectCurrentSearch, L as setRoute, M as REQUEST_USER_PASSWORD_RESET, N as RESET_USER_PASSWORD, O as CHANGE_USER_PASSWORD, P as REQUEST_USER_PASSWORD_RESET_SENDING, Q as REQUEST_USER_PASSWORD_RESET_SUCCESS, T as REQUEST_USER_PASSWORD_RESET_ERROR, V as RESET_USER_PASSWORD_SENDING, W as RESET_USER_PASSWORD_SUCCESS, X as RESET_USER_PASSWORD_ERROR, Y as CHANGE_USER_PASSWORD_ERROR, Z as CHANGE_USER_PASSWORD_SENDING, _ as CHANGE_USER_PASSWORD_SUCCESS } from './selectors-BRzliwbK.js';
import { s as selectVersionStatus } from './version-78jjDnHU.js';
import { h as handleRequiresLoginSaga, L as LoginHelper, i as findContentTypeMapping, j as getManagementApiClient, k as loginSagas } from './ChangePassword.container-6fQXhkzW.js';
import React from 'react';
import 'react-cookie';
import 'react-redux';
import 'jsonpath-mapper';
import { Op, Query } from 'contensis-delivery-api';
import { l as selectClientCredentials } from './ToJs-B4MH53fx.js';
import 'react-hot-loader';
import 'query-string';
import { R as RouteLoader } from './RouteLoader-DdHjeMGI.js';

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

const routeEntryByFieldsQuery = (id, language = 'en-GB', contentTypeId = '', fields = [], fieldLinkDepths, versionStatus = 'published') => {
  const query = new Query(...[...fieldExpression('sys.id', id), ...fieldExpression('sys.language', language), ...(contentTypeId ? fieldExpression('sys.contentTypeId', contentTypeId) : fieldExpression('sys.dataFormat', 'entry')), ...defaultExpressions(versionStatus)]);
  query.fields = fields;
  query.fieldLinkDepths = fieldLinkDepths;
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
    var _staticRoute$route, _staticRoute$route2, _staticRoute$route3, _staticRoute$route4, _appsays, _appsays2, _appsays3, _pathNode3, _pathNode4;
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
      requireLogin = false;
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
        //Do nothing, the entry is allready the right one.
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
    const resolvedContentTypeMapping = findContentTypeMapping(ContentTypeMappings, (_pathNode3 = pathNode) === null || _pathNode3 === void 0 || (_pathNode3 = _pathNode3.entry) === null || _pathNode3 === void 0 || (_pathNode3 = _pathNode3.sys) === null || _pathNode3 === void 0 ? void 0 : _pathNode3.contentTypeId) || {};

    // Inject redux { key, reducer, saga } provided by ContentTypeMapping
    if (resolvedContentTypeMapping.injectRedux) yield call(reduxInjectorSaga, resolvedContentTypeMapping.injectRedux);
    if (withEvents && withEvents.onRouteLoaded) {
      // Check if the app has provided a requireLogin boolean flag or groups array
      // in addition to checking if requireLogin is set in the route definition
      ({
        requireLogin
      } = (yield withEvents.onRouteLoaded({
        ...action,
        entry
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
    if (!appsays || !appsays.preventScrollTop) {
      // Scroll into View
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    }
    if ((_pathNode4 = pathNode) !== null && _pathNode4 !== void 0 && (_pathNode4 = _pathNode4.entry) !== null && _pathNode4 !== void 0 && (_pathNode4 = _pathNode4.sys) !== null && _pathNode4 !== void 0 && _pathNode4.id) {
      var _appsays4;
      entry = pathNode.entry;
      yield call(setRouteEntry, currentPath, entry, pathNode, ancestors, siblings, entryMapper || resolvedContentTypeMapping.entryMapper, false, (_appsays4 = appsays) === null || _appsays4 === void 0 ? void 0 : _appsays4.refetchNode);
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

    // // eslint-disable-next-line no-console
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

export { AppRoot as A, browserHistory as b, history as h, pickProject as p, rootSaga as r };
//# sourceMappingURL=App-d-kQl4Jh.js.map
