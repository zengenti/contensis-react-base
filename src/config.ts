import { ContentTypeMapping, StaticRoute, WithEvents } from './routing/routes';
import handleResponse from './server/features/response-handler';

export type AppConfig = {
  routes: {
    ContentTypeMappings: ContentTypeMapping[];
    StaticRoutes: StaticRoute[];
  };
  withReducers: { [key: string]: any };
  withSagas: any[];
  withEvents: WithEvents;
};

export type ServerConfig = AppConfig & {
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
