import { AppConfig } from './AppConfig';
import handleResponse from "../../server/features/response-handler";
export type ServerConfig = AppConfig & {
    appRootPath?: string;
    disableSsrRedux?: boolean;
    enableSsrCookies?: boolean;
    handleResponses?: typeof handleResponse;
    handleExceptions?: boolean | string[];
    reverseProxyPaths?: string[];
    packagejson: any;
    proxyDeliveryApi?: boolean;
    /**
     * `renderToString: true` is recommended for deployments with very
     * high concurrency while running with limited memory (e.g. <512MB).
     *
     * Defaults to `false` to take advantage of streaming mode in React 18,
     * which offers improved TTFB and overall performance in typical scenarios,
     * but may lead to increased memory usage under high concurrency due to
     * the need for a synchronous pre-render to collect Helmet metadata.
     *
     * This nuance will likely be removed in the React 19 migration.
     */
    renderToString?: boolean;
    scripts?: {
        /** Custom attributes to include with rendered script tags */
        attributes?: {
            [key: string]: string;
        };
        /** Serve the "startup.js" script from a versioned alias
         *  - avoids caching issues when environment variables have changed
         *  - Example: `startup-${packagejson.version}.js`
         */
        startup?: string;
    };
    staticFolderPath?: string;
    /** The default static route path */
    staticRoutePath?: string;
    /** Additional static route paths */
    staticRoutePaths?: string[];
    styles?: {
        /** Render inline style tags for CSS Modules in SSR (default: false) */
        inline?: boolean;
    };
    stats?: string;
    templates: {
        html: string;
        static: string;
        fragment: string;
    };
};
