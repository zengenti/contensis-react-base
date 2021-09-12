'use strict';

var selectors = require('./selectors-d96c128c.js');

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
  UPDATE_LOADING_STATE: UPDATE_LOADING_STATE
});

const setNotFound = notFound => selectors.action(SET_NAVIGATION_NOT_FOUND, {
  notFound
});
const setNavigationPath = (path, location, staticRoute, withEvents, statePath, routes) => selectors.action(SET_NAVIGATION_PATH, {
  path,
  location,
  staticRoute,
  withEvents,
  statePath,
  routes
});
const setCurrentProject = (project, allowedGroups, hostname) => selectors.action(SET_TARGET_PROJECT, {
  project,
  allowedGroups,
  hostname
});
const setRoute = (path, state) => selectors.action(SET_ROUTE, {
  path,
  state
});
const setRouteEntry = entry => selectors.action(SET_ENTRY, {
  entry
});
const setSurrogateKeys = keys => selectors.action(SET_SURROGATE_KEYS, {
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

exports.SET_ANCESTORS = SET_ANCESTORS;
exports.SET_ENTRY = SET_ENTRY;
exports.SET_NAVIGATION_PATH = SET_NAVIGATION_PATH;
exports.SET_ROUTE = SET_ROUTE;
exports.SET_SIBLINGS = SET_SIBLINGS;
exports.SET_SURROGATE_KEYS = SET_SURROGATE_KEYS;
exports.SET_TARGET_PROJECT = SET_TARGET_PROJECT;
exports.UPDATE_LOADING_STATE = UPDATE_LOADING_STATE;
exports.routing = routing;
exports.routing$1 = routing$1;
exports.setCurrentProject = setCurrentProject;
exports.setNavigationPath = setNavigationPath;
exports.setRoute = setRoute;
exports.setSurrogateKeys = setSurrogateKeys;
//# sourceMappingURL=actions-24b4aaea.js.map
