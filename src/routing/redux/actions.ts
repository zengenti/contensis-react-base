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
import { MatchedRoute, RouteConfig } from 'react-router-config';
import { AppRoutes, SSRContext, WithEvents } from '~/models';

export const setNavigationPath = (
  path: string,
  location: ReturnType<typeof useLocation>,
  staticRoute: MatchedRoute<any, RouteConfig> | undefined,
  withEvents: WithEvents,
  statePath: string,
  routes: AppRoutes,
  ssr: SSRContext
) =>
  action(SET_NAVIGATION_PATH, {
    path,
    location,
    staticRoute,
    withEvents,
    statePath,
    routes,
    ssr,
  });

export const setCurrentProject = (
  project: string,
  allowedGroups: any,
  hostname: string
) => action(SET_TARGET_PROJECT, { project, allowedGroups, hostname });

export const setRoute = (path: string, state?: any) =>
  action(SET_ROUTE, { path, state });

export const setRouteEntry = (entry: Entry) => action(SET_ENTRY, { entry });

export const setSurrogateKeys = (keys: string, url: string, status: number) =>
  action(SET_SURROGATE_KEYS, { keys, url, status });
