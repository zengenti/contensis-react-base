import type { RouteObject, RouteMatch } from 'react-router';

// Mimic the type behaviour permitted in react-router v5 and react-router-config (CRBv3)
type RouteObjectAllowingExtraProps = RouteObject & {
  [propName: string]: any;
};

export type MatchedRoute<
  ParamKey extends string = string,
  TRouteObject extends
    RouteObjectAllowingExtraProps = RouteObjectAllowingExtraProps,
> = Omit<RouteMatch<ParamKey>, 'route'> & {
  route: TRouteObject;
};
