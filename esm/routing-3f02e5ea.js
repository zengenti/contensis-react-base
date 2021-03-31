import { t as action, S as SET_NAVIGATION_PATH, u as SET_TARGET_PROJECT, e as SET_ROUTE, g as SET_ENTRY, v as SET_NAVIGATION_NOT_FOUND } from './selectors-5b478abf.js';

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
//# sourceMappingURL=routing-3f02e5ea.js.map
