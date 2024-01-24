import { useLocation } from 'react-router-dom';
import { action } from '~/redux/util';
import {
  SET_ENTRY,
  SET_NAVIGATION_PATH,
  SET_TARGET_PROJECT,
  SET_ROUTE,
  SET_SURROGATE_KEYS,
} from './types';

import { Entry } from 'contensis-delivery-api/lib/models';
import { AppRoutes, MatchedRoute, StaticRoute, WithEvents } from '../routes';
import { CookieHelper } from '~/user/util/CookieHelper.class';

export const setNavigationPath = (
  path: string,
  location: ReturnType<typeof useLocation>,
  staticRoute: MatchedRoute<string, StaticRoute> | undefined,
  withEvents: WithEvents,
  statePath: string,
  routes: AppRoutes,
  cookies: CookieHelper
) =>
  action(SET_NAVIGATION_PATH, {
    path,
    location,
    staticRoute,
    withEvents,
    statePath,
    routes,
    cookies,
  });

export const setCurrentProject = (
  project: string,
  allowedGroups: any,
  hostname: string
) => action(SET_TARGET_PROJECT, { project, allowedGroups, hostname });

export const setRoute = (path: string, state?: any) =>
  action(SET_ROUTE, { path, state });

export const setRouteEntry = (entry: Entry) => action(SET_ENTRY, { entry });

export const setSurrogateKeys = (keys: string, url: string) =>
  action(SET_SURROGATE_KEYS, { keys, url });
