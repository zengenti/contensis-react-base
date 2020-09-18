import { Map, List } from 'immutable';
import queryString from 'query-string';

function action(type, payload = {}) {
  return {
    type,
    ...payload
  };
}

const ROUTING_PREFIX = '@ROUTING/';
const GET_ENTRY = `${ROUTING_PREFIX}_GET_ENTRY`;
const SET_ENTRY = `${ROUTING_PREFIX}_SET_ENTRY`;
const MAP_ENTRY = `${ROUTING_PREFIX}_MAP_ENTRY`;
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

var routing = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_ENTRY: GET_ENTRY,
  SET_ENTRY: SET_ENTRY,
  MAP_ENTRY: MAP_ENTRY,
  SET_NODE: SET_NODE,
  SET_ANCESTORS: SET_ANCESTORS,
  SET_SIBLINGS: SET_SIBLINGS,
  SET_ENTRY_ID: SET_ENTRY_ID,
  SET_SURROGATE_KEYS: SET_SURROGATE_KEYS,
  SET_NAVIGATION_NOT_FOUND: SET_NAVIGATION_NOT_FOUND,
  SET_NAVIGATION_PATH: SET_NAVIGATION_PATH,
  SET_TARGET_PROJECT: SET_TARGET_PROJECT,
  SET_ROUTE: SET_ROUTE,
  CALL_HISTORY_METHOD: CALL_HISTORY_METHOD
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
const selectEntryDepends = state => {
  return state.getIn(['routing', 'entryDepends']);
};
const selectRouteEntryEntryId = state => {
  return state.getIn(['routing', 'entry', 'sys', 'id'], null);
};
const selectRouteEntryContentTypeId = state => {
  const entry = selectRouteEntry(state);
  return entry && entry.getIn(['sys', 'contentTypeId'], null);
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
const selectRouteLoading = state => {
  return state.getIn(['routing', 'isLoading']);
};

var routing$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectRouteEntry: selectRouteEntry,
  selectMappedEntry: selectMappedEntry,
  selectNodeDepends: selectNodeDepends,
  selectCurrentTreeID: selectCurrentTreeID,
  selectEntryDepends: selectEntryDepends,
  selectRouteEntryEntryId: selectRouteEntryEntryId,
  selectRouteEntryContentTypeId: selectRouteEntryContentTypeId,
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
  selectRouteLoading: selectRouteLoading
});

export { CALL_HISTORY_METHOD as C, MAP_ENTRY as M, SET_TARGET_PROJECT as S, selectEntryDepends as a, selectNodeDepends as b, selectCurrentTreeID as c, selectRouteEntry as d, selectCurrentProject as e, SET_SURROGATE_KEYS as f, SET_SIBLINGS as g, SET_ROUTE as h, SET_NAVIGATION_PATH as i, SET_ENTRY as j, SET_ANCESTORS as k, setSurrogateKeys as l, selectCurrentPath as m, selectRouteEntryContentTypeId as n, selectIsNotFound as o, selectRouteLoading as p, selectMappedEntry as q, setNavigationPath as r, setCurrentProject as s, action as t, routing as u, routing$1 as v, routing$2 as w };
//# sourceMappingURL=routing-cd189bd3.js.map
