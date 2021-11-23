import { action } from '~/redux/util';
import {
  SET_ENTRY,
  SET_NAVIGATION_NOT_FOUND,
  SET_NAVIGATION_PATH,
  SET_TARGET_PROJECT,
  SET_ROUTE,
  SET_SURROGATE_KEYS,
} from './types';

export const setNotFound = notFound =>
  action(SET_NAVIGATION_NOT_FOUND, { notFound });
export const setNavigationPath = (
  path,
  location,
  staticRoute,
  withEvents,
  statePath,
  routes
) =>
  action(SET_NAVIGATION_PATH, {
    path,
    location,
    staticRoute,
    withEvents,
    statePath,
    routes,
  });
export const setCurrentProject = (project, allowedGroups, hostname) =>
  action(SET_TARGET_PROJECT, { project, allowedGroups, hostname });
export const setRoute = (path, state) => action(SET_ROUTE, { path, state });
export const setRouteEntry = entry => action(SET_ENTRY, { entry });
export const setSurrogateKeys = (keys, url) =>
  action(SET_SURROGATE_KEYS, { keys, url });
