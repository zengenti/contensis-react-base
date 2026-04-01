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
        attributes?: {
            [key: string]: string;
        };
        startup?: string;
    };
    staticFolderPath?: string;
    /** The default static route path */
    staticRoutePath?: string;
    /** Additional static route paths */
    staticRoutePaths?: string[];
    stats?: string;
    templates: {
        html: string;
        static: string;
        fragment: string;
    };
};
