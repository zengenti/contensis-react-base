import { FieldLinkDepths } from 'contensis-core-api';
import { EntryMapper } from './EntryMapper';
import { ReduxInjector } from './ReduxInjector';
import { RouteComponent } from './RouteComponent';
import { RouteComponentProps } from './RouteComponentProps';
import { RequireLogin } from './RequireLogin';
export type ContentTypeMapping = {
    /** The unique identifier for the content type to map. */
    contentTypeID: string;
    /**
     * The React component that should be rendered for this content type.
     */
    component: RouteComponent<RouteComponentProps>;
    /**
     * Optional entry mapper to transform entry data before passing it to the component.
     */
    entryMapper?: EntryMapper;
    /**
     * An array of field IDs used to restrict the fields returned for an entry.
     */
    fields?: string[];
    /**
     * Injects Redux dependencies or actions into the route if needed.
     */
    injectRedux?: ReduxInjector;
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
    /**
     * Options for configuring how Site View Node data is handled, including children and siblings.
     */
    nodeOptions?: {
        children?: {
            /** The depth of descendants to include for the node. */
            depth: number;
            /**
             * An array of field IDs used to restrict the fields returned for each entry.
             */
            fields?: string[];
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
        } | boolean;
        siblings?: {
            /** The depth of descendants to include for the node. */
            fields?: string[];
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
        } | boolean;
    };
    /**
     * Specifies whether login is required to access the content for this type.
     */
    requireLogin?: RequireLogin;
};
