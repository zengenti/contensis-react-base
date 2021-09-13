import { Loadable } from 'react-loadable';
import { MatchedRoute, RouteConfig } from 'react-router-config';
import { Entry, Node } from 'contensis-delivery-api/lib/models';
import React from 'react';

type RouteComponent<Props> = Loadable | React.ComponentType<Props>;
type RouteNode = Node & { ancestors: Node[]; children: Node[] };

export type AppRoutes = {
  ContentTypeMappings: ContentTypeMapping[];
  StaticRoutes: StaticRoute[];
};

export type AppRootProps = {
  routes: AppRoutes;
  withEvents: WithEvents;
};

export type RouteLoaderProps = {
  loadingComponent?: React.ComponentType;
  notFoundComponent?: React.ComponentType;
};

export type EntryMapper =
  | (<MappedProps>(node: RouteNode, state?: any) => MappedProps | unknown)
  | (<MappedProps>(
      node: RouteNode,
      state?: any
    ) => Promise<MappedProps | unknown>);

export type ReduxInjector = () => Promise<{
  key: string;
  reducer: any;
  saga: any;
}>;

type UserGroupRequisite = { id?: string; name?: string };

export type RequireLogin = boolean | UserGroupRequisite[];

export type ContentTypeMapping = {
  contentTypeID: string;
  component: RouteComponent<any>;
  entryMapper?: EntryMapper;
  fields?: string[];
  injectRedux?: ReduxInjector;
  linkDepth?: number;
  nodeOptions?: {
    children?: {
      fields?: string[];
      linkDepth?: number;
    };
  };
  requireLogin?: RequireLogin;
};

export type StaticRoute = Omit<RouteConfig, 'component'> & {
  component: RouteComponent<any>;
  fetchNode?: boolean;
  fetchNodeLevel?: number;
  injectRedux?: ReduxInjector;
  requireLogin?: RequireLogin;
  ssr?: boolean;
  ssrOnly?: boolean;
};

export type OnRouteLoadArgs = {
  location: { pathname: string; search: string; hash: string; key?: string };
  path: string;
  staticRoute: MatchedRoute<any, StaticRoute>;
  statePath: string;
};

export type OnRouteLoadedArgs = {
  entry: Entry | any;
  location: { pathname: string; search: string; hash: string; key?: string };
  path: string;
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
