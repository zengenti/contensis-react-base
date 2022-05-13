// import { MatchedRoute, RouteConfig } from 'react-router-config';
import { Entry, Node } from 'contensis-delivery-api/lib/models';
import React from 'react';
import { AppState } from '~/redux/appstate';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MatchedRoute<T, U> = any;
type RouteConfig = any;

type RouteComponent<Props> = React.ComponentType<Props>;

export type RouteNode = Node & { ancestors: Node[]; children: Node[] };

export type AppRoutes = {
  ContentTypeMappings: ContentTypeMapping[];
  StaticRoutes: StaticRoute[];
};

export type AppRootProps = {
  routes: AppRoutes;
  withEvents: WithEvents;
};

export type RouteComponentProps<P = any> = {
  [key: string]: any;
  projectId?: string;
  contentTypeId?: string;
  entry?: Entry | null;
  mappedEntry?: P;
  isLoggedIn?: boolean;
};

export type RouteLoaderProps = {
  loadingComponent?: React.ComponentType;
  notFoundComponent?: React.ComponentType;
  reactRouterContext?: React.ContextType<any>;
};

export type EntryMapper =
  | (<MappedProps>(node: RouteNode, state?: AppState) => MappedProps | unknown)
  | (<MappedProps>(
      node: RouteNode,
      state?: AppState
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
  component: RouteComponent<RouteComponentProps>;
  entryMapper?: EntryMapper;
  fields?: string[];
  injectRedux?: ReduxInjector;
  linkDepth?: number;
  nodeOptions?: {
    children?:
      | {
          depth: number;
          fields?: string[];
          linkDepth?: number;
        }
      | boolean;
    siblings?:
      | {
          fields?: string[];
          linkDepth?: number;
        }
      | boolean;
  };
  requireLogin?: RequireLogin;
};

export type StaticRoute = Omit<RouteConfig, 'component'> & {
  component?: RouteComponent<RouteComponentProps>;
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
