// eslint-disable-next-line no-underscore-dangle
declare const __isBrowser__: boolean;
declare const DELIVERY_API_CONFIG: {
  rootUrl: string;
  accessToken: string;
  projectId: string;
  livePublishingRootUrl: string;
};
declare const DISABLE_SSR_REDUX: boolean;
declare const PROJECTS: {
  id: string;
  publicUri: string;
}[];
declare const PROXY_DELIVERY_API: boolean;
declare const PUBLIC_URI: string;
declare const REVERSE_PROXY_PATHS: string[];
declare const SERVERS: {
  alias: string;
  api: string;
  internalVip?: string;
  cms: string;
  web: string;
  iis: string;
  previewIis: string;
};
declare const STATIC_PATH: string;
declare const VERSION: string;
declare const WSFED_LOGIN: false;
