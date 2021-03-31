import { Map, List } from 'immutable';
import queryString from 'query-string';

function action(type, payload = {}) {
  return {
    type,
    ...payload
  };
}
const findContentTypeMapping = (ContentTypeMappings, contentTypeId) => ContentTypeMappings.find(ct => ct.contentTypeID === contentTypeId);

const ROUTING_PREFIX = '@ROUTING/';
const GET_ENTRY = `${ROUTING_PREFIX}_GET_ENTRY`;
const SET_ENTRY = `${ROUTING_PREFIX}_SET_ENTRY`;
const SET_NODE = `${ROUTING_PREFIX}_SET_NODE`;
const SET_ANCESTORS = `${ROUTING_PREFIX}_SET_ANCESTORS`;
const SET_SIBLINGS = `${ROUTING_PREFIX}_SET_SIBLINGS`;
const SET_ENTRY_ID = `${ROUTING_PREFIX}_SET_ENTRY_ID`;
const SET_SURROGATE_KEYS = `${ROUTING_PREFIX}_SET_SURROGATE_KEYS`;
const SET_NAVIGATION_NOT_FOUND = `${ROUTING_PREFIX}_SET_NOT_FOUND`;
const SET_NAVIGATION_PATH = `${ROUTING_PREFIX}_SET_NAVIGATION_PATH`;
const SET_TARGET_PROJECT = `${ROUTING_PREFIX}_SET_TARGET_PROJECT`;
const SET_ROUTE = `${ROUTING_PREFIX}_SET_ROUTE`;
const CALL_HISTORY_METHOD = `${ROUTING_PREFIX}_CALL_HISTORY_METHOD`;
const UPDATE_LOADING_STATE = `${ROUTING_PREFIX}_UPDATE_LOADING_STATE`;

var routing = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_ENTRY: GET_ENTRY,
  SET_ENTRY: SET_ENTRY,
  SET_NODE: SET_NODE,
  SET_ANCESTORS: SET_ANCESTORS,
  SET_SIBLINGS: SET_SIBLINGS,
  SET_ENTRY_ID: SET_ENTRY_ID,
  SET_SURROGATE_KEYS: SET_SURROGATE_KEYS,
  SET_NAVIGATION_NOT_FOUND: SET_NAVIGATION_NOT_FOUND,
  SET_NAVIGATION_PATH: SET_NAVIGATION_PATH,
  SET_TARGET_PROJECT: SET_TARGET_PROJECT,
  SET_ROUTE: SET_ROUTE,
  CALL_HISTORY_METHOD: CALL_HISTORY_METHOD,
  UPDATE_LOADING_STATE: UPDATE_LOADING_STATE
});

const setNotFound = notFound => action(SET_NAVIGATION_NOT_FOUND, {
  notFound
});
const setNavigationPath = (path, location, staticRoute, withEvents, statePath, routes) => action(SET_NAVIGATION_PATH, {
  path,
  location,
  staticRoute,
  withEvents,
  statePath,
  routes
});
const setCurrentProject = (project, allowedGroups) => action(SET_TARGET_PROJECT, {
  project,
  allowedGroups
});
const setRoute = (path, state) => action(SET_ROUTE, {
  path,
  state
});
const setRouteEntry = entry => action(SET_ENTRY, {
  entry
});
const setSurrogateKeys = keys => action(SET_SURROGATE_KEYS, {
  keys
});

var routing$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setNotFound: setNotFound,
  setNavigationPath: setNavigationPath,
  setCurrentProject: setCurrentProject,
  setRoute: setRoute,
  setRouteEntry: setRouteEntry,
  setSurrogateKeys: setSurrogateKeys
});

function queryParams(search) {
  return queryString.parse(typeof window != 'undefined' ? window.location.search : search);
}
const clientHostname = () => `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const addHostname = typeof window == 'undefined' || window.location.host == 'localhost:3000' ? `https://${PUBLIC_URI
/* global PUBLIC_URI */
}` : clientHostname();

const selectRouteEntry = state => {
  return state.getIn(['routing', 'entry'], Map());
};
const selectMappedEntry = state => {
  return state.getIn(['routing', 'mappedEntry'], null);
};
const selectNodeDepends = state => {
  return state.getIn(['routing', 'nodeDepends'], List());
};
const selectCurrentTreeID = state => {
  return state.getIn(['routing', 'currentTreeId']);
};
const selectRouteEntryEntryId = state => {
  return state.getIn(['routing', 'entry', 'sys', 'id'], null);
};
const selectRouteEntryContentTypeId = state => {
  const entry = selectRouteEntry(state);
  return entry && entry.getIn(['sys', 'contentTypeId'], null);
};
const selectRouteEntryLanguage = state => {
  return state.getIn(['routing', 'entry', 'sys', 'language'], null);
};
const selectRouteEntrySlug = state => {
  return state.getIn(['routing', 'entry', 'sys', 'slug'], null);
};
const selectRouteEntryID = state => {
  return state.getIn(['routing', 'entryID']);
};
const selectCurrentPath = state => {
  return state.getIn(['routing', 'currentPath']);
};
const selectCurrentSearch = state => {
  return state.getIn(['routing', 'location', 'search']);
};
const selectCurrentHash = state => {
  return state.getIn(['routing', 'location', 'hash']);
};
const selectQueryStringAsObject = state => queryParams(selectCurrentSearch(state));
const selectCurrentProject = state => {
  return state.getIn(['routing', 'currentProject']);
};
const selectIsNotFound = state => {
  return state.getIn(['routing', 'notFound']);
};
const selectCurrentAncestors = state => {
  return state.getIn(['routing', 'currentNodeAncestors'], List());
};
const selectCurrentNode = state => {
  return state.getIn(['routing', 'currentNode']);
};
const selectBreadcrumb = state => {
  return (selectCurrentAncestors(state) || List()).push(selectCurrentNode(state));
};
const selectRouteErrorMessage = state => {
  const error = state.getIn(['routing', 'error']);

  if (error && 'toJS' in error) {
    return error.getIn(['data', 'message']) || error.get('statusText');
  }
};
const selectRouteIsError = state => {
  return state.getIn(['routing', 'isError']);
};
const selectRouteLoading = state => {
  return state.getIn(['routing', 'isLoading']);
};
const selectRouteStatusCode = state => {
  return state.getIn(['routing', 'statusCode']);
};

var routing$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectRouteEntry: selectRouteEntry,
  selectMappedEntry: selectMappedEntry,
  selectNodeDepends: selectNodeDepends,
  selectCurrentTreeID: selectCurrentTreeID,
  selectRouteEntryEntryId: selectRouteEntryEntryId,
  selectRouteEntryContentTypeId: selectRouteEntryContentTypeId,
  selectRouteEntryLanguage: selectRouteEntryLanguage,
  selectRouteEntrySlug: selectRouteEntrySlug,
  selectRouteEntryID: selectRouteEntryID,
  selectCurrentPath: selectCurrentPath,
  selectCurrentSearch: selectCurrentSearch,
  selectCurrentHash: selectCurrentHash,
  selectQueryStringAsObject: selectQueryStringAsObject,
  selectCurrentProject: selectCurrentProject,
  selectIsNotFound: selectIsNotFound,
  selectCurrentAncestors: selectCurrentAncestors,
  selectCurrentNode: selectCurrentNode,
  selectBreadcrumb: selectBreadcrumb,
  selectRouteErrorMessage: selectRouteErrorMessage,
  selectRouteIsError: selectRouteIsError,
  selectRouteLoading: selectRouteLoading,
  selectRouteStatusCode: selectRouteStatusCode
});

export { SET_SURROGATE_KEYS as A, action as B, CALL_HISTORY_METHOD as C, routing as D, routing$1 as E, routing$2 as F, SET_NAVIGATION_PATH as S, UPDATE_LOADING_STATE as U, selectRouteEntry as a, selectCurrentProject as b, setSurrogateKeys as c, SET_ROUTE as d, selectCurrentNode as e, selectCurrentAncestors as f, findContentTypeMapping as g, selectRouteEntryEntryId as h, selectRouteEntryLanguage as i, selectMappedEntry as j, SET_ENTRY as k, SET_ANCESTORS as l, SET_SIBLINGS as m, selectCurrentSearch as n, setRoute as o, selectRouteEntryContentTypeId as p, queryParams as q, selectRouteIsError as r, setCurrentProject as s, selectIsNotFound as t, selectRouteLoading as u, selectCurrentPath as v, selectRouteStatusCode as w, selectRouteErrorMessage as x, setNavigationPath as y, SET_TARGET_PROJECT as z };
//# sourceMappingURL=routing-2c78fa4d.js.map
