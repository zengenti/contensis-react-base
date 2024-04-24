import { FieldLinkDepths } from 'contensis-core-api';
import { MatchedRoute } from 'react-router-config';
import { SSRContext } from './SSRContext';
import { StaticRoute } from './StaticRoute';
import { Entry } from 'contensis-delivery-api';
import { RequireLogin } from './RequireLogin';

export type OnRouteLoadArgs = {
  location: { pathname: string; search: string; hash: string; key?: string };
  path: string;
  ssr: SSRContext;
  staticRoute: MatchedRoute<any, StaticRoute>;
  statePath: string;
};

export type OnRouteLoadedArgs = {
  entry?: Entry | any;
  location: { pathname: string; search: string; hash: string; key?: string };
  path: string;
  ssr: SSRContext;
  staticRoute: MatchedRoute<any, StaticRoute>;
};

export type RouteLoadOptions = {
  customNavigation?:
    | boolean
    | {
        ancestors: boolean | number;
        children: boolean | number;
        siblings: boolean | number;
        tree: boolean | number;
      };
  customRouting?: boolean;
  defaultLang?: string;
  entryLinkDepth?: number;
  entryFieldLinkDepths?: FieldLinkDepths;
  preventScrollTop?: boolean;
  refetchNode?: true;
};

export type RouteLoadedOptions = { requireLogin?: RequireLogin };

export type WithEvents = {
  onRouteLoad: (args: OnRouteLoadArgs) => Generator<void | RouteLoadOptions>;
  onRouteLoaded: (
    args: OnRouteLoadedArgs
  ) => Generator<void | RouteLoadedOptions>;
};
