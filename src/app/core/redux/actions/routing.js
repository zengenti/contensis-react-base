import { action } from '~/core/util/helpers';
import {
  SET_ENTRY,
  SET_NAVIGATION_NOT_FOUND,
  SET_NAVIGATION_PATH,
  SET_TARGET_PROJECT,
  SET_ROUTE,
} from '~/core/redux/types/routing';

export const setNotFound = notFound =>
  action(SET_NAVIGATION_NOT_FOUND, { notFound });
export const setNavigationPath = (path, routeParams, withEvents, isStatic) =>
  action(SET_NAVIGATION_PATH, {
    path,
    routeParams,
    withEvents,
    isStatic,
  });
export const setCurrentProject = (project, allowedGroups) =>
  action(SET_TARGET_PROJECT, { project, allowedGroups });
export const setRoute = (path, state) => action(SET_ROUTE, { path, state });
export const setRouteEntry = entry => action(SET_ENTRY, { entry });
