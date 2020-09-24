import { q as action, g as SET_NAVIGATION_PATH, S as SET_TARGET_PROJECT, f as SET_ROUTE, h as SET_ENTRY, r as SET_NAVIGATION_NOT_FOUND } from './selectors-9caa4dc1.js';

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

var routing = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setNotFound: setNotFound,
  setNavigationPath: setNavigationPath,
  setCurrentProject: setCurrentProject,
  setRoute: setRoute,
  setRouteEntry: setRouteEntry
});

export { setNavigationPath as a, routing as r, setCurrentProject as s };
//# sourceMappingURL=routing-b4e1203d.js.map
