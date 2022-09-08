import { AppRoutes, WithEvents } from './routing/routes';
import handleResponse from './server/features/response-handler';
export declare type StateType = 'immutable' | 'js';
export declare type AppConfig = {
    stateType?: StateType;
    routes: AppRoutes;
    withReducers: {
        [key: string]: any;
    };
    withSagas: any[];
    withEvents: WithEvents;
};
export declare type ServerConfig = AppConfig & {
    appRootPath?: string;
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
    stats?: string;
    templates: {
        html: string;
        static: string;
        fragment: string;
    };
};
