import { FieldLinkDepths } from 'contensis-core-api';
import { Entry } from 'contensis-delivery-api';
import { GetRouteActionArgs } from './GetRouteActionArgs';
import { RequireLogin } from './RequireLogin';
export type OnRouteLoadArgs = Omit<GetRouteActionArgs, 'withEvents'>;
export type OnRouteLoadedArgs = OnRouteLoadArgs & {
    entry?: Entry | any;
};
export type RouteLoadOptions = {
    customNavigation?: boolean | {
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
export type RouteLoadedOptions = {
    requireLogin?: RequireLogin;
};
export type WithEvents = {
    onRouteLoad: (args: OnRouteLoadArgs) => Generator<void | RouteLoadOptions>;
    onRouteLoaded: (args: OnRouteLoadedArgs) => Generator<void | RouteLoadedOptions>;
};
