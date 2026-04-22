import type { Location } from 'history';
import type { RouteObject } from 'react-router';
import { MatchedRoute, StaticRoute } from '~/models';

declare module 'react-router' {
  export function matchRoutes(
    routes: RouteObject[],
    locationArg: Partial<Location> | string,
    basename = '/'
  ): MatchedRoute<string, StaticRoute>[] | null;
}
