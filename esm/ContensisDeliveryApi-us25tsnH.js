import { Client } from 'contensis-delivery-api';
import { parse } from 'query-string';
import { ab as setApiMetrics } from './selectors-B0OTKlis.js';
import { r as reduxStore } from './store-BheQrGTj.js';
import { f as findLoginCookies, i as isSSR } from './CookieConstants-YLzXsjzH.js';

/**
 * Map order is the LRU policy: re-insert on read, evict the first key. A linked list
 * kept beside the lookup map could desync from it, and removals then crashed.
 */
class LruCache {
  constructor(limit = 100) {
    this.map = new Map();
    this.limit = limit > 0 ? limit : 100;
  }
  get size() {
    return this.map.size;
  }
  get(key) {
    if (!this.map.has(key)) {
      return undefined;
    }
    const value = this.map.get(key);
    // Re-inserting moves the entry to the end, which is the most-recently-used slot.
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  set(key, value) {
    this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.limit) {
      this.remove(this.map.keys().next().value);
    }
  }
  remove(key) {
    this.map.delete(key);
  }
}

// CachedSearch does not cache results in SSR by design
class CachedSearch {
  constructor(ssr) {
    var _this$ssr;
    this.cache = new LruCache();
    this.ssr = ssr;
    this.cookies = (_this$ssr = this.ssr) === null || _this$ssr === void 0 ? void 0 : _this$ssr.cookies.raw;
  }
  getClient(...args) {
    return new DeliveryApi(this.ssr).getClient(...args);
  }
  search(query, linkDepth = 0, project) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(`${project}+${JSON.stringify(query)}+${linkDepth}`, () => client.entries.search(query, linkDepth));
  }
  searchUsingPost(query, linkDepth = 0, project = '') {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(`${project}+${JSON.stringify(query)}+${linkDepth}`, () => client.entries.searchUsingPost(query, linkDepth));
  }
  get(id, linkDepth = 0, versionStatus = 'published', project, fields) {
    const client = Client.create({
      ...getClientConfig(project, this.ssr),
      versionStatus
    });
    return this.request(id, () => client.entries.get({
      id,
      linkDepth,
      fields
    }));
  }
  getContentType(id, project) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(`[CONTENT TYPE] ${id} ${project}`, () => client.contentTypes.get(id));
  }
  getRootNode(options, versionStatus = 'published', project) {
    const client = Client.create({
      ...getClientConfig(project, this.ssr),
      versionStatus
    });
    return this.request(`${project} / ${JSON.stringify(options)}`, () => client.nodes.getRoot(options));
  }
  getNode(options, project) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(`${project} ${options && typeof options !== 'string' ? 'path' in options ? options.path : options.id : options} ${JSON.stringify(options)}`, () => client.nodes.get(options));
  }
  getAncestors(options, project) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(`${project} [A] ${options && typeof options !== 'string' && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getAncestors(options));
  }
  getChildren(options, project) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(`${project} [C] ${options && typeof options !== 'string' && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getChildren(options));
  }
  getSiblings(options, project) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(`${project} [S] ${options && typeof options !== 'string' && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getSiblings(options));
  }
  request(key, execute) {
    // A server process cannot invalidate what it holds, so SSR does not cache.
    if (typeof window === 'undefined') {
      return execute();
    }
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }
    const promise = execute();
    this.cache.set(key, promise);
    promise.catch(() => {
      // Only drop the entry if this promise still owns the key.
      if (this.cache.get(key) === promise) {
        this.cache.remove(key);
      }
    });
    return promise;
  }

  /** Use the cached API for fetch requests */
  fetch(uri, opts = {}) {
    return this.request(`[FETCH] ${uri} ${JSON.stringify(opts)}`, () => fetch(uri, opts));
  }
}
const cachedSearch = new CachedSearch();

/** Create a cached search instance attached to the current environment
 * SSR context and connected to your environment via global variable
 * `DELIVERY_API_CONFIG`  */
const cachedSearchWithContext = ssr => new CachedSearch(ssr);

/** @deprecated Use cachedSearchWithContext instead */
const cachedSearchWithCookies = cachedSearchWithContext;

const mapCookieHeader = cookies => typeof cookies === 'object' ? Object.entries(cookies).map(([name, value]) => `${name}=${value}`).join('; ') : cookies;
const getSsrReferer = ({
  request
}) => {
  if (request) {
    try {
      const url = new URL(request.url, `${request.protocol || `http`}://${request.headers.host}`);
      return url.href;
    } catch (ex) {
      console.error(`getSsrReferer cannot parse url ${request.url} and host ${request.headers.host}`);
      return request.url;
    }
  }

  // if (typeof window === 'undefined') {
  //   const state = reduxStore.getState();
  //   const referer = `${selectCurrentHostname(state)}${selectCurrentPath(
  //     state
  //   )}${selectCurrentSearch(state)}`;

  //   return referer;
  // }
  return '';
};

/**
 * Record API call metrics in Redux state.
 * Metrics are collected on both SSR and client-side.
 * Surrogate keys are only included during SSR.
 */
const recordApiResponse = (ssr, startTime = Date.now()) => response => {
  var _performance$getEntri;
  // Duration: Performance API client-side, closure timestamp best-effort fallback for SSR
  const duration = Math.round(((_performance$getEntri = performance.getEntriesByName(response.url, 'resource')) === null || _performance$getEntri === void 0 || (_performance$getEntri = _performance$getEntri[0]) === null || _performance$getEntri === void 0 ? void 0 : _performance$getEntri.duration) || Date.now() - startTime);
  const contentLength = Number(response.headers.get('Content-Length'));
  if (contentLength > 100_000)
    // > 100 KB
    console.warn(`[crb] 🚛 Large response (${contentLength} bytes) from ${response.url}`);
  if (duration > 5_000_000)
    // > 5 seconds
    console.warn(`[crb] 🐌 Slow response (${duration} ms) from ${response.url}`);
  const metrics = {
    context: isSSR ? 'ssr' : 'client',
    statusCode: response.status,
    contentLength,
    duration,
    url: response.url
  };

  // Surrogate keys are only meaningful during SSR
  if (isSSR) {
    const surrogateKeyHeader = response.headers.get('surrogate-key');
    if (surrogateKeyHeader) {
      metrics.surrogateKeys = surrogateKeyHeader.split(' ').filter(Boolean);
    } else if (response.status === 200) {
      console.info(`[recordApiResponse] No surrogate-key header in ${response.url}`);
    }
  }

  // Using imported reduxStore in SSR is unreliable during high
  // concurrent loads and exists here as a best effort fallback
  // in case the SSRContext is not provided
  const put = (ssr === null || ssr === void 0 ? void 0 : ssr.dispatch) || (reduxStore === null || reduxStore === void 0 ? void 0 : reduxStore.dispatch);
  put === null || put === void 0 || put(setApiMetrics(metrics));
};

/**
 * Create a new Config object to create a DeliveryAPI Client
 */
const deliveryApiConfig = ssr => {
  var _ssr$config;
  const config = (_ssr$config = ssr === null || ssr === void 0 ? void 0 : ssr.config) != null ? _ssr$config : {
    // Fallback to plain global when SSRContext is not provided
    ...DELIVERY_API_CONFIG /* global DELIVERY_API_CONFIG */,

    // Grab any further config written by SSR
    ...(!isSSR ? window.DELIVERY_API_CONFIG || {} : {})
  };
  config.responseHandler = {
    // Record metrics on both SSR and client-side;
    // surrogate keys are only captured during SSR.
    [200]: recordApiResponse(ssr)
  };

  // Add SSR headers and handlers
  if (isSSR) {
    config.defaultHeaders = {
      'x-require-surrogate-key': 'true',
      // request surrogate-key response header
      'x-crb-ssr': 'true' // add this for support tracing
    };
    if (ssr) config.defaultHeaders.referer = getSsrReferer(ssr); // add this for support tracing
  } else if (PROXY_DELIVERY_API /* global PROXY_DELIVERY_API */) {
    // ensure a relative url is used client-side to bypass the need for CORS (separate OPTIONS calls)
    config.rootUrl = '';
    config.responseHandler[404] = () => null;
  }
  return config;
};
const getClientConfig = (project, ssr) => {
  const config = deliveryApiConfig(ssr);
  if (project) {
    config.projectId = project;
  }
  if (ssr !== null && ssr !== void 0 && ssr.cookies) {
    const cookieHeader = mapCookieHeader(findLoginCookies(ssr.cookies));
    if (cookieHeader) {
      config.defaultHeaders = Object.assign(config.defaultHeaders || {}, {
        Cookie: cookieHeader
      });
    }
  }
  return config;
};

// export * from 'contensis-delivery-api';

class DeliveryApi {
  constructor(ssr) {
    this.getClientSideVersionStatus = () => {
      if (typeof window !== 'undefined') {
        // Allow overriding versionStatus with the querystring
        const {
          versionStatus
        } = parse(window.location.search);
        if (versionStatus) return versionStatus;
        // Client-side we will have a global variable set if rendered by SSR in production
        if (typeof window.versionStatus !== 'undefined') return window.versionStatus;
        // For localhost development we can only work out versionStatus from the current hostname
        const currentHostname = window.location.hostname;
        return this.getVersionStatusFromHostname(currentHostname);
      }
      return null;
    };
    this.getServerSideVersionStatus = request => {
      var _ref, _request$query$versio;
      const status = (_ref = (_request$query$versio = request.query.versionStatus) != null ? _request$query$versio : deliveryApi.getVersionStatusFromHeaders(request.headers)) != null ? _ref : deliveryApi.getVersionStatusFromHostname(request.hostname);
      return this.normalizeVersionStatus(status);
    };
    this.getVersionStatusFromHeaders = headers => {
      const versionStatusHeader = headers['x-entry-versionstatus'];
      if (typeof versionStatusHeader !== 'undefined') return versionStatusHeader;
      return null;
    };
    this.getVersionStatusFromHostname = currentHostname => {
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
    /* Normalize the version status to only allow known values and fallback to published content */
    this.normalizeVersionStatus = versionStatus => typeof versionStatus === 'string' && versionStatus.trim().toLowerCase() === 'latest' ? 'latest' : 'published';
    this.search = (query, linkDepth = 0, project) => {
      const client = Client.create(getClientConfig(project, this.ssr));
      return client.entries.search(query, typeof linkDepth !== 'undefined' ? linkDepth : 1);
    };
    this.getClient = (versionStatus = 'published', project) => Client.create({
      ...getClientConfig(project, this.ssr),
      versionStatus
    });
    this.getEntry = (id, linkDepth = 0, versionStatus = 'published', project) => {
      const client = Client.create({
        ...getClientConfig(project, this.ssr),
        versionStatus
      });
      return client.entries.get({
        id,
        linkDepth
      });
    };
    this.ssr = ssr;
    this.cookies = ssr === null || ssr === void 0 ? void 0 : ssr.cookies.raw;
  }
}
const deliveryApi = new DeliveryApi();
const deliveryApiWithCookies = ssr => new DeliveryApi(ssr);

export { LruCache as L, cachedSearchWithContext as a, cachedSearchWithCookies as b, cachedSearch as c, deliveryApi as d, deliveryApiWithCookies as e, getClientConfig as g };
//# sourceMappingURL=ContensisDeliveryApi-us25tsnH.js.map
