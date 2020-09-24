'use strict';

var selectors = require('./selectors-0fe2c691.js');

const setNotFound = notFound => selectors.action(selectors.SET_NAVIGATION_NOT_FOUND, {
  notFound
});
const setNavigationPath = (path, location, staticRoute, withEvents, statePath, routes) => selectors.action(selectors.SET_NAVIGATION_PATH, {
  path,
  location,
  staticRoute,
  withEvents,
  statePath,
  routes
});
const setCurrentProject = (project, allowedGroups) => selectors.action(selectors.SET_TARGET_PROJECT, {
  project,
  allowedGroups
});
const setRoute = (path, state) => selectors.action(selectors.SET_ROUTE, {
  path,
  state
});
const setRouteEntry = entry => selectors.action(selectors.SET_ENTRY, {
  entry
});

var routing = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setNotFound: setNotFound,
  setNavigationPath: setNavigationPath,
  setCurrentProject: setCurrentProject,
  setRoute: setRoute,
  setRouteEntry: setRouteEntry
});

exports.routing = routing;
exports.setCurrentProject = setCurrentProject;
exports.setNavigationPath = setNavigationPath;
//# sourceMappingURL=routing-1f9fac1b.js.map
