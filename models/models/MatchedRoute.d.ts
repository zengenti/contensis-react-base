import type { RouteObject, RouteMatch } from 'react-router';
export type MatchedRoute<ParamKey extends string = string, TRouteObject extends RouteObject = RouteObject> = Omit<RouteMatch<ParamKey>, 'route'> & {
    route: TRouteObject;
};
