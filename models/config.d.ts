import handleResponse from './server/features/response-handler';
export declare type AppConfig = {
    routes: any;
    withReducers: any;
    withSagas: any;
    withEvents: any;
};
export declare type ServerConfig = AppConfig & {
    appRootPath?: string;
    differentialBundles?: boolean;
    disableSsrRedux?: boolean;
    handleResponses?: typeof handleResponse;
    reverseProxyPaths?: string[];
    packagejson: any;
    proxyDeliveryApi?: boolean;
    scripts?: {
        attributes?: {
            [key: string]: string;
        };
        startup?: string;
    };
    staticFolderPath?: string;
    staticRoutePath?: string;
    stats: string;
    templates: {
        html: string;
        static: string;
        fragment: string;
    };
};
