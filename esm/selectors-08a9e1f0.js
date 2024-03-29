import { jpath } from 'jsonpath-mapper';
import queryString from 'query-string';

const action = (type, payload = {}) => ({
  type,
  ...payload
});
const getJS = (state, stateKey) => {
  if ('get' in state && typeof state.get === 'function' && 'toJS' in state && typeof state.toJS === 'function') {
    return state.get(stateKey);
  }
  return state[stateKey];
};
const getImmutableOrJS = (state, stateKey, fallbackValue, returnType = globalThis.STATE_TYPE) => {
  var _globalThis$immutable, _globalThis$immutable2;
  // Find a fromJS function from global that is dynamically loaded in createStore
  // or replace with a stub function for non-immutable gets
  const fromJS = returnType === 'immutable' ? ((_globalThis$immutable = globalThis.immutable) === null || _globalThis$immutable === void 0 ? void 0 : _globalThis$immutable.fromJSOrdered) || ((_globalThis$immutable2 = globalThis.immutable) === null || _globalThis$immutable2 === void 0 ? void 0 : _globalThis$immutable2.fromJS) : v => v;
  if (state && 'get' in state && typeof state.get === 'function' && 'getIn' in state && typeof state.getIn === 'function' && 'toJS' in state && typeof state.toJS === 'function') {
    if (Array.isArray(stateKey)) return fromJS(state.getIn(stateKey, fallbackValue));
    return fromJS(state.get(stateKey, fallbackValue));
  }
  if (Array.isArray(stateKey) && state && typeof state === 'object') {
    const result = jpath(stateKey.join('.'), state);
    if (typeof result === 'undefined') return fallbackValue;
    return result;
  }
  const result = state && typeof state === 'object' ? state[stateKey] : undefined;
  if (typeof result === 'undefined') return fallbackValue;
  return result;
};

const ROUTING_PREFIX = '@ROUTING/';
const GET_ENTRY = `${ROUTING_PREFIX}_GET_ENTRY`;
const SET_ENTRY = `${ROUTING_PREFIX}_SET_ENTRY`;
const SET_NODE = `${ROUTING_PREFIX}_SET_NODE`;
const SET_ANCESTORS = `${ROUTING_PREFIX}_SET_ANCESTORS`;
const SET_SIBLINGS = `${ROUTING_PREFIX}_SET_SIBLINGS`;
const SET_ENTRY_ID = `${ROUTING_PREFIX}_SET_ENTRY_ID`;
const SET_SURROGATE_KEYS = `${ROUTING_PREFIX}_SET_SURROGATE_KEYS`;
const SET_NAVIGATION_PATH = `${ROUTING_PREFIX}_SET_NAVIGATION_PATH`;
const SET_TARGET_PROJECT = `${ROUTING_PREFIX}_SET_TARGET_PROJECT`;
const SET_ROUTE = `${ROUTING_PREFIX}_SET_ROUTE`;
const UPDATE_LOADING_STATE = `${ROUTING_PREFIX}_UPDATE_LOADING_STATE`;

var routing$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_ENTRY: GET_ENTRY,
  SET_ENTRY: SET_ENTRY,
  SET_NODE: SET_NODE,
  SET_ANCESTORS: SET_ANCESTORS,
  SET_SIBLINGS: SET_SIBLINGS,
  SET_ENTRY_ID: SET_ENTRY_ID,
  SET_SURROGATE_KEYS: SET_SURROGATE_KEYS,
  SET_NAVIGATION_PATH: SET_NAVIGATION_PATH,
  SET_TARGET_PROJECT: SET_TARGET_PROJECT,
  SET_ROUTE: SET_ROUTE,
  UPDATE_LOADING_STATE: UPDATE_LOADING_STATE
});

const setNavigationPath = (path, location, staticRoute, withEvents, statePath, routes, cookies) => action(SET_NAVIGATION_PATH, {
  path,
  location,
  staticRoute,
  withEvents,
  statePath,
  routes,
  cookies
});
const setCurrentProject = (project, allowedGroups, hostname) => action(SET_TARGET_PROJECT, {
  project,
  allowedGroups,
  hostname
});
const setRoute = (path, state) => action(SET_ROUTE, {
  path,
  state
});
const setRouteEntry = entry => action(SET_ENTRY, {
  entry
});
const setSurrogateKeys = (keys, url, status) => action(SET_SURROGATE_KEYS, {
  keys,
  url,
  status
});

var routing$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setNavigationPath: setNavigationPath,
  setCurrentProject: setCurrentProject,
  setRoute: setRoute,
  setRouteEntry: setRouteEntry,
  setSurrogateKeys: setSurrogateKeys
});

function queryParams(search) {
  return queryString.parse(typeof window != 'undefined' ? window.location.search : search);
}

const selectRouteEntry = (state, returnType) => getImmutableOrJS(state, ['routing', 'entry'], {}, returnType);
const selectMappedEntry = (state, returnType) => getImmutableOrJS(state, ['routing', 'mappedEntry'], null, returnType);
const selectSurrogateKeys = state => {
  const keys = getImmutableOrJS(state, ['routing', 'surrogateKeys'], [], 'js');
  return keys;
};
const selectSsrApiCalls = state => {
  return getImmutableOrJS(state, ['routing', 'apiCalls'], [], 'js');
};
const selectCurrentHostname = state => getImmutableOrJS(state, ['routing', 'currentHostname']);
const selectCurrentTreeID = state => getImmutableOrJS(state, ['routing', 'currentHostname']);
const selectRouteEntryEntryId = state => getImmutableOrJS(state, ['routing', 'entry', 'sys', 'id'], null);
const selectRouteEntryContentTypeId = state => {
  const entry = selectRouteEntry(state);
  return getImmutableOrJS(entry, ['sys', 'contentTypeId'], null);
};
const selectRouteEntryLanguage = state => {
  const entry = selectRouteEntry(state);
  return getImmutableOrJS(entry, ['sys', 'language'], null);
};
const selectRouteEntrySlug = state => {
  const entry = selectRouteEntry(state);
  return getImmutableOrJS(entry, ['sys', 'slug'], null);
};
const selectRouteEntryID = state => getImmutableOrJS(state, ['routing', 'entryID']);
const selectCanonicalPath = state => {
  return getImmutableOrJS(state, ['routing', 'canonicalPath']);
};
const selectCurrentPath = state => getImmutableOrJS(state, ['routing', 'currentPath']);
const selectCurrentLocation = state => getImmutableOrJS(state, ['routing', 'location']);
const selectCurrentSearch = state => getImmutableOrJS(state, ['routing', 'location', 'search']);
const selectCurrentHash = state => getImmutableOrJS(state, ['routing', 'location', 'hash']);
const selectQueryStringAsObject = state => queryParams(selectCurrentSearch(state));
const selectCurrentProject = state => getImmutableOrJS(state, ['routing', 'currentProject']);
const selectIsNotFound = state => getImmutableOrJS(state, ['routing', 'notFound']);
const selectCurrentAncestors = state => getImmutableOrJS(state, ['routing', 'currentNodeAncestors'], []);
const selectCurrentSiblings = state => getImmutableOrJS(state, ['routing', 'currentNodeSiblings'], []);
const selectCurrentNode = (state, returnType) => getImmutableOrJS(state, ['routing', 'currentNode'], null, returnType);
const selectCurrentChildren = state => getImmutableOrJS(state, ['routing', 'currentNode', 'children'], []);
const selectBreadcrumb = state => {
  return [...selectCurrentAncestors(state), selectCurrentNode(state)];
};
const selectRouteErrorMessage = state => {
  const error = getImmutableOrJS(state, ['routing', 'error']);
  return getImmutableOrJS(error, ['data', 'message'], getImmutableOrJS(error, 'statusText'));
};
const selectRouteIsError = state => getImmutableOrJS(state, ['routing', 'isError']);
const selectRouteLoading = state => getImmutableOrJS(state, ['routing', 'isLoading']);
const selectRouteStatusCode = state => getImmutableOrJS(state, ['routing', 'statusCode']);
const selectStaticRoute = state => getImmutableOrJS(state, ['routing', 'staticRoute']);

var routing = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectRouteEntry: selectRouteEntry,
  selectMappedEntry: selectMappedEntry,
  selectSurrogateKeys: selectSurrogateKeys,
  selectSsrApiCalls: selectSsrApiCalls,
  selectCurrentHostname: selectCurrentHostname,
  selectCurrentTreeID: selectCurrentTreeID,
  selectRouteEntryEntryId: selectRouteEntryEntryId,
  selectRouteEntryContentTypeId: selectRouteEntryContentTypeId,
  selectRouteEntryLanguage: selectRouteEntryLanguage,
  selectRouteEntrySlug: selectRouteEntrySlug,
  selectRouteEntryID: selectRouteEntryID,
  selectCanonicalPath: selectCanonicalPath,
  selectCurrentPath: selectCurrentPath,
  selectCurrentLocation: selectCurrentLocation,
  selectCurrentSearch: selectCurrentSearch,
  selectCurrentHash: selectCurrentHash,
  selectQueryStringAsObject: selectQueryStringAsObject,
  selectCurrentProject: selectCurrentProject,
  selectIsNotFound: selectIsNotFound,
  selectCurrentAncestors: selectCurrentAncestors,
  selectCurrentSiblings: selectCurrentSiblings,
  selectCurrentNode: selectCurrentNode,
  selectCurrentChildren: selectCurrentChildren,
  selectBreadcrumb: selectBreadcrumb,
  selectRouteErrorMessage: selectRouteErrorMessage,
  selectRouteIsError: selectRouteIsError,
  selectRouteLoading: selectRouteLoading,
  selectRouteStatusCode: selectRouteStatusCode,
  selectStaticRoute: selectStaticRoute
});

export { setNavigationPath as A, selectCurrentHostname as B, setSurrogateKeys as C, SET_TARGET_PROJECT as D, SET_SURROGATE_KEYS as E, action as F, routing$2 as G, routing$1 as H, routing as I, getJS as J, SET_NAVIGATION_PATH as S, UPDATE_LOADING_STATE as U, selectSsrApiCalls as a, selectRouteEntry as b, selectCurrentProject as c, setCurrentProject as d, selectCurrentSearch as e, SET_ROUTE as f, getImmutableOrJS as g, selectCurrentNode as h, selectCurrentAncestors as i, selectCurrentSiblings as j, selectRouteEntryEntryId as k, selectRouteEntryLanguage as l, selectMappedEntry as m, SET_ENTRY as n, SET_ANCESTORS as o, SET_SIBLINGS as p, queryParams as q, setRoute as r, selectSurrogateKeys as s, selectRouteEntryContentTypeId as t, selectRouteIsError as u, selectIsNotFound as v, selectRouteLoading as w, selectCurrentPath as x, selectRouteStatusCode as y, selectRouteErrorMessage as z };
//# sourceMappingURL=selectors-08a9e1f0.js.map
