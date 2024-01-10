import { VersionStatus } from 'contensis-core-api';
import { Client, Query } from 'contensis-delivery-api';
import { Config } from 'contensis-delivery-api/lib/models';
import { parse } from 'query-string';
import { setSurrogateKeys } from '~/routing/redux/actions';
import { reduxStore } from '~/redux/store/store';
import {
  selectCurrentHostname,
  selectCurrentPath,
  selectCurrentSearch,
} from '~/routing/redux/selectors';
import { CookieObject, findLoginCookies } from '~/user/util/CookieConstants';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

const mapCookieHeader = (cookies: CookieObject | string) =>
  typeof cookies === 'object'
    ? Object.entries(cookies)
        .map(([name, value]) => `${name}=${value}`)
        .join('; ')
    : cookies;

const getSsrReferer = () => {
  if (typeof window === 'undefined') {
    const state = reduxStore.getState();
    const referer = `${selectCurrentHostname(state)}${selectCurrentPath(
      state
    )}${selectCurrentSearch(state)}`;

    return referer;
  }
  return '';
};

const storeSurrogateKeys = (response: any) => {
  const keys = response.headers.get
    ? response.headers.get('surrogate-key')
    : response.headers.map['surrogate-key'];
  if (keys) reduxStore?.dispatch(setSurrogateKeys(keys, response.url));
};

export const getClientConfig = (project?: string, cookies?: CookieObject) => {
  const config: Config = DELIVERY_API_CONFIG; /* global DELIVERY_API_CONFIG */
  config.responseHandler = {};

  if (project) {
    config.projectId = project;
  }

  // we only want the surrogate key header in a server context
  if (typeof window === 'undefined') {
    config.defaultHeaders = Object.assign(config.defaultHeaders || {}, {
      referer: getSsrReferer(),
      'x-require-surrogate-key': true,
      'x-crb-ssr': true, // add this for support tracing
    });
    config.responseHandler[200] = storeSurrogateKeys;
  }

  if (
    typeof window !== 'undefined' &&
    PROXY_DELIVERY_API /* global PROXY_DELIVERY_API */
  ) {
    // ensure a relative url is used to bypass the need for CORS (separate OPTIONS calls)
    config.rootUrl = '';
    config.responseHandler[404] = () => null;
  }

  if (cookies) {
    const cookieHeader = mapCookieHeader(findLoginCookies(cookies));
    if (cookieHeader) {
      config.defaultHeaders = Object.assign(config.defaultHeaders || {}, {
        Cookie: cookieHeader,
      });
    }
  }

  return config;
};

// export * from 'contensis-delivery-api';

declare let window: Window &
  typeof globalThis & {
    versionStatus?: VersionStatus;
  };

export class DeliveryApi {
  cookies?: CookieObject;

  constructor(cookies?: CookieObject) {
    this.cookies = cookies;
  }

  getClientSideVersionStatus = () => {
    if (typeof window !== 'undefined') {
      // Allow overriding versionStatus with the querystring
      const { versionStatus } = parse(window.location.search);
      if (versionStatus) return versionStatus;
      // Client-side we will have a global variable set if rendered by SSR in production
      if (typeof window.versionStatus !== 'undefined')
        return window.versionStatus;
      // For localhost development we can only work out versionStatus from the current hostname
      const currentHostname = window.location.hostname;
      return this.getVersionStatusFromHostname(currentHostname);
    }
    return null;
  };

  getServerSideVersionStatus = (request: Request) =>
    request.query.versionStatus ||
    deliveryApi.getVersionStatusFromHeaders(request.headers) ||
    deliveryApi.getVersionStatusFromHostname(request.hostname);

  getVersionStatusFromHeaders = (headers: IncomingHttpHeaders) => {
    const versionStatusHeader = headers['x-entry-versionstatus'];
    if (typeof versionStatusHeader !== 'undefined') return versionStatusHeader;
    return null;
  };

  getVersionStatusFromHostname = (currentHostname: string) => {
    if (currentHostname.indexOf('localhost') > -1) return 'latest';

    if (currentHostname.endsWith('contensis.cloud')) {
      if (currentHostname.indexOf('preview.') > -1) {
        return 'latest';
      } else {
        return 'published';
      }
    }

    if (currentHostname.endsWith('cloud.contensis.com')) {
      if (currentHostname.indexOf('preview-') > -1) {
        return 'latest';
      } else {
        return 'published';
      }
    }

    return 'published';
  };

  search = (query: Query, linkDepth = 0, project?: string) => {
    const client = Client.create(getClientConfig(project, this.cookies));
    return client.entries.search(
      query,
      typeof linkDepth !== 'undefined' ? linkDepth : 1
    );
  };

  getClient = (versionStatus: VersionStatus = 'published', project) => {
    const baseConfig = getClientConfig(project, this.cookies);
    baseConfig.versionStatus = versionStatus;
    return Client.create(baseConfig);
  };

  getEntry = (
    id: string,
    linkDepth = 0,
    versionStatus: VersionStatus = 'published',
    project?: string
  ) => {
    const baseConfig = getClientConfig(project, this.cookies);
    baseConfig.versionStatus = versionStatus;
    const client = Client.create(baseConfig);
    // return client.entries.get(id, linkDepth);
    return client.entries.get({ id, linkDepth });
  };
}

export const deliveryApi = new DeliveryApi();

export const deliveryApiWithCookies = (cookies?: CookieObject) =>
  new DeliveryApi(cookies);

export * from './CachedDeliveryApi';
