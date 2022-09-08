import type { RouteObject, RouteMatch } from 'react-router';
import { Entry, Node } from 'contensis-delivery-api/lib/models';
import React from 'react';
import { AppState } from "../redux/appstate";
declare type RouteComponent<Props> = React.ComponentType<Props>;
export declare type RouteNode = Node & {
    ancestors: Node[];
    children: Node[];
};
export declare type MatchedRoute<ParamKey extends string = string, TRouteObject extends RouteObject = RouteObject> = Omit<RouteMatch<ParamKey>, 'route'> & {
    route: TRouteObject;
};
export declare type AppRoutes = {
    ContentTypeMappings: ContentTypeMapping[];
    StaticRoutes: StaticRoute[];
};
export declare type AppRootProps = {
    routes: AppRoutes;
    withEvents: WithEvents;
};
export declare type RouteComponentProps<P = any> = {
    [key: string]: any;
    projectId?: string;
    contentTypeId?: string;
    entry?: Entry | null;
    mappedEntry?: P;
    isLoggedIn?: boolean;
};
export declare type RouteLoaderProps = {
    loadingComponent?: React.ComponentType;
    notFoundComponent?: React.ComponentType;
    trailingSlashRedirectCode?: 301 | 302;
};
export declare type EntryMapper = (<MappedProps>(node: RouteNode, state?: AppState) => MappedProps | unknown) | (<MappedProps>(node: RouteNode, state?: AppState) => Promise<MappedProps | unknown>);
export declare type ReduxInjector = () => Promise<{
    key: string;
    reducer: any;
    saga: any;
}>;
declare type UserGroupRequisite = {
    id?: string;
    name?: string;
};
export declare type RequireLogin = boolean | UserGroupRequisite[];
export declare type ContentTypeMapping = {
    contentTypeID: string;
    component: RouteComponent<RouteComponentProps>;
    entryMapper?: EntryMapper;
    fields?: string[];
    injectRedux?: ReduxInjector;
    linkDepth?: number;
    nodeOptions?: {
        children?: {
            depth: number;
            fields?: string[];
            linkDepth?: number;
        } | boolean;
        siblings?: {
            fields?: string[];
            linkDepth?: number;
        } | boolean;
    };
    requireLogin?: RequireLogin;
};
export declare type StaticRoute = Omit<RouteObject, 'children'> & {
    component?: RouteComponent<RouteComponentProps>;
    children?: StaticRoute[];
    fetchNode?: boolean;
    fetchNodeLevel?: number;
    injectRedux?: ReduxInjector;
    requireLogin?: RequireLogin;
    ssr?: boolean;
    ssrOnly?: boolean;
    fullPath?: string;
};
export declare type OnRouteLoadArgs = {
    location: {
        pathname: string;
        search: string;
        hash: string;
        key?: string;
    };
    path: string;
    staticRoute: MatchedRoute<string, StaticRoute>;
    statePath: string;
};
export declare type OnRouteLoadedArgs = {
    entry: Entry | any;
    location: {
        pathname: string;
        search: string;
        hash: string;
        key?: string;
    };
    path: string;
    staticRoute: MatchedRoute<string, StaticRoute>;
};
export declare type RouteLoadOptions = {
    customNavigation?: boolean | {
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
export declare type RouteLoadedOptions = {
    requireLogin?: RequireLogin;
};
export declare type WithEvents = {
    onRouteLoad: (args: OnRouteLoadArgs) => Generator<void | RouteLoadOptions>;
    onRouteLoaded: (args: OnRouteLoadedArgs) => Generator<void | RouteLoadedOptions>;
};
export {};
