import { useLocation } from 'react-router-dom';
import { action } from '~/redux/util';
import {
  SET_API_METRICS,
  SET_ENTRY,
  SET_NAVIGATION_PATH,
  SET_TARGET_PROJECT,
  SET_ROUTE,
} from './types';

import { Entry } from 'contensis-delivery-api/lib/models';
import {
  AppRoutes,
  MatchedRoute,
  StaticRoute,
  SSRContext,
  WithEvents,
} from '~/models';

export const setNavigationPath = (
  path: string,
  contentPath: string,
  location: ReturnType<typeof useLocation>,
  staticRoute: MatchedRoute<string, StaticRoute> | undefined,
  withEvents: WithEvents,
  statePath: string,
  routes: AppRoutes,
  ssr: SSRContext
) =>
  action(SET_NAVIGATION_PATH, {
    path,
    contentPath,
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

/**
 * Represents a single API call record stored in Redux state.
 * Used for SSR surrogate key tracking and performance metrics.
 */
export interface ApiMetrics {
  context: 'ssr' | 'client';
  statusCode: number;
  contentLength?: number;
  duration?: number;
  url: string;
  /** Only populated during SSR — meaningless client-side. */
  surrogateKeys?: string[];
}

/**
 * Record API call metrics. Surrogate keys are only included during SSR.
 */
export const setApiMetrics = (metrics: ApiMetrics) =>
  action(SET_API_METRICS, metrics);
