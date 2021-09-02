import { Loadable } from 'react-loadable';
import { RouteConfig } from 'react-router-config';
import { Entry, Node } from 'contensis-delivery-api/lib/models';
import React from 'react';

type RouteComponent = Loadable | React.ComponentType;
type RouteNode = Node & { ancestors: Node[]; children: Node[] };

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

export type ContentTypeMapping = {
  contentTypeID: string;
  component: RouteComponent;
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
  requireLogin?: boolean;
};

export type StaticRoute = RouteConfig & {
  component: RouteComponent;
  fetchNode?: boolean;
  fetchNodeLevel?: number;
  injectRedux?: ReduxInjector;
  ssr?: boolean;
  ssrOnly?: boolean;
};

export type OnRouteLoadArgs = {
  location: { pathname: string; search: string; hash: string; key?: string };
  path: string;
  staticRoute: StaticRoute;
  statePath: string;
};

export type OnRouteLoadedArgs = {
  entry: Entry | any;
  location: { pathname: string; search: string; hash: string; key?: string };
  path: string;
  staticRoute: StaticRoute;
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

export type RouteLoadedOptions = { requireLogin?: boolean };

export type WithEvents = {
  onRouteLoad: (args: OnRouteLoadArgs) => Generator<void | RouteLoadOptions>;
  onRouteLoaded: (
    args: OnRouteLoadedArgs
  ) => Generator<void | RouteLoadedOptions>;
};
