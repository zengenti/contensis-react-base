import { FieldLinkDepths } from 'contensis-core-api';
import { RouteComponentProps } from 'react-router-dom';
import { RouteComponent } from './RouteComponent';
import { EntryMapper } from './EntryMapper';
import { ReduxInjector } from './ReduxInjector';
import { RequireLogin } from './RequireLogin';
import { RouteConfig } from 'react-router-config';
export type StaticRoute = Omit<RouteConfig, 'component'> & {
    /**
     * The React component that should be rendered for this route.
     */
    component: RouteComponent<RouteComponentProps>;
    /**
     * Options for configuring how Site View Node data is handled.
     */
    fetchNode?: boolean | {
        /**
         * Params[] allows you pass parameters into the site view query on your static node fetch
         * If your route is `/authors/:author` and your params[] array has author
         * `{ params: [ 'author' ] }`, this will grab the route params and replace it with it's value
         * e.g `{` author: 'jane-doe' }`, your path would become `/authors/jane-doe`
         */
        params?: string[];
        /**
         * The depth at which to resolve the full entry data for a linked entry or asset.
         * Maximum depth is 10, with a recommended maximum of 4.
         *
         * A default depth of 2 is applied via `routeLoadOptions` in `onRouteLoad`.
         */
        linkDepth?: number;
        /**
         * Custom link depths for specific field paths to resolve full entry data for a linked entry or asset.
         * Maximum depth is 10, with a recommended maximum of 4.
         *
         * This option is available only in Contensis version 16+.
         */
        fieldLinkDepths?: FieldLinkDepths;
        /** The depth of descendants to include for the node. */
        fields?: string[];
        /**
         * Optional entry mapper to transform entry data before passing it to the component.
         */
        entryMapper?: EntryMapper;
    };
    /** The depth of descendants to include for the node. */
    fetchNodeLevel?: number;
    /**
     * Injects Redux dependencies or actions into the route if needed.
     */
    injectRedux?: ReduxInjector;
    /**
     * Specifies whether login is required to access the content for this type.
     */
    requireLogin?: RequireLogin;
    ssr?: boolean;
    ssrOnly?: boolean;
};
