import type { RouteObject, RouteMatch } from 'react-router';
type RouteObjectAllowingExtraProps = RouteObject & {
    [propName: string]: any;
};
export type MatchedRoute<ParamKey extends string = string, TRouteObject extends RouteObjectAllowingExtraProps = RouteObjectAllowingExtraProps> = Omit<RouteMatch<ParamKey>, 'route'> & {
    route: TRouteObject;
};
export {};
