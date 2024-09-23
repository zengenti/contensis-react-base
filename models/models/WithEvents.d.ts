import { FieldLinkDepths } from 'contensis-core-api';
import { Entry } from 'contensis-delivery-api';
import { GetRouteActionArgs } from './GetRouteActionArgs';
import { RequireLogin } from './RequireLogin';
export type OnRouteLoadArgs = Omit<GetRouteActionArgs, 'withEvents'>;
export type OnRouteLoadedArgs = OnRouteLoadArgs & {
    entry?: Entry | any;
};
/**
 * Configuration options to customize the app state during route changes.
 * These options are evaluated on each route action, establishing the "default" behavior.
 */
export type RouteLoadOptions = {
    /**
     * Determines whether to query related Site View Nodes by default during routing.
     * Allows specifying the depth of query for ancestors, children, siblings, and the entire tree structure.
     */
    customNavigation?: boolean | {
        ancestors: boolean | number;
        children: boolean | number;
        siblings: boolean | number;
        tree: boolean | number;
    };
    customRouting?: boolean;
    /**
     * Sets the default language for the Site View during route changes.
     *
     * @default 'en-GB'
     */
    defaultLang?: string;
    /**
     * Defines the default depth for resolving full entry data for a linked entry or asset during route changes.
     * Maximum depth is 10, with a recommended maximum of 4.
     *
     * @default 2
     */
    entryLinkDepth?: number;
    /**
     * Specifies custom depths for resolving full entry data for specific field paths in linked entries or assets during route changes.
     * Maximum depth is 10, with a recommended maximum of 4.
  
     *
     * Available only in Contensis version 16+.
     */
    entryFieldLinkDepths?: FieldLinkDepths;
    /**
     * Disables the automatic scroll-to-top behavior when navigating to a new route.
     */
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
