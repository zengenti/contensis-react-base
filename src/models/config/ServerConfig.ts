import { AppConfig } from './AppConfig';
import handleResponse from '~/server/features/response-handler';

export type ServerConfig = AppConfig & {
  appRootPath?: string;
  disableSsrRedux?: boolean;
  enableSsrCookies?: boolean;
  handleResponses?: typeof handleResponse;
  handleExceptions?: boolean | string[];
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
