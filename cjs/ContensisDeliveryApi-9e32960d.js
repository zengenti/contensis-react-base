'use strict';

var contensisDeliveryApi = require('contensis-delivery-api');
var queryString = require('query-string');
var selectors = require('./selectors-46b689d0.js');
var version = require('./version-79a027cb.js');
var CookieConstants = require('./CookieConstants-000427db.js');

class CacheNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
class LruCache {
  constructor(limit = 100) {
    this.map = {};
    this.head = null;
    this.tail = null;
    this.limit = limit || 100;
    this.size = 0;
  }
  get(key) {
    if (this.map[key]) {
      let value = this.map[key].value;
      let node = new CacheNode(key, value);
      this.remove(key);
      this.setHead(node);
      return value;
    }
  }
  set(key, value) {
    let node = new CacheNode(key, value);
    if (this.map[key]) {
      this.remove(key);
    } else {
      if (this.size >= this.limit) {
        delete this.map[this.tail.key];
        this.size--;
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
    }
    this.setHead(node);
  }
  setHead(node) {
    node.next = this.head;
    node.prev = null;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.size++;
    this.map[node.key] = node;
  }
  remove(key) {
    let node = this.map[key];
    if (!node) return; // This is sometimes null and crashes the container without this check

    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    delete this.map[key];
    this.size--;
  }
}

// CachedSearch does not cache results in SSR by design
class CachedSearch {
  constructor(cookies) {
    this.cache = new LruCache();
    this.cookies = void 0;
    this.cookies = cookies;
  }
  getClient(...args) {
    return new DeliveryApi(this.cookies).getClient(...args);
  }
  search(query, linkDepth = 0, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.cookies));
    return this.request(`${project}+${JSON.stringify(query)}+${linkDepth}`, () => client.entries.search(query, linkDepth));
  }
  searchUsingPost(query, linkDepth = 0, project = '') {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.cookies));
    return this.request(`${project}+${JSON.stringify(query)}+${linkDepth}`, () => client.entries.searchUsingPost(query, linkDepth));
  }
  get(id, linkDepth = 0, versionStatus = 'published', project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.cookies));
    client.clientConfig.versionStatus = versionStatus;
    return this.request(id, () => client.entries.get({
      id,
      linkDepth
    }));
  }
  getContentType(id, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.cookies));
    return this.request(`[CONTENT TYPE] ${id} ${project}`, () => client.contentTypes.get(id));
  }
  getRootNode(options, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.cookies));
    return this.request(`${project} / ${JSON.stringify(options)}`, () => client.nodes.getRoot(options));
  }
  getNode(options, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.cookies));
    return this.request(`${project} ${options && typeof options !== 'string' ? 'path' in options ? options.path : options.id : options} ${JSON.stringify(options)}`, () => client.nodes.get(options));
  }
  getAncestors(options, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.cookies));
    return this.request(`${project} [A] ${options && typeof options !== 'string' && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getAncestors(options));
  }
  getChildren(options, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.cookies));
    return this.request(`${project} [C] ${options && typeof options !== 'string' && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getChildren(options));
  }
  getSiblings(options, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.cookies));
    return this.request(`${project} [S] ${options && typeof options !== 'string' && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getSiblings(options));
  }
  request(key, execute) {
    // do not cache results in SSR
    if (!this.cache.get(key) || typeof window == 'undefined') {
      const promise = execute();
      this.cache.set(key, promise);
      promise.catch(() => {
        this.cache.remove(key);
      });
    }
    return this.cache.get(key);
  }
}
const cachedSearch = new CachedSearch();
const cachedSearchWithCookies = cookies => new CachedSearch(cookies);

const mapCookieHeader = cookies => typeof cookies === 'object' ? Object.entries(cookies).map(([name, value]) => `${name}=${value}`).join('; ') : cookies;
const getSsrReferer = () => {
  if (typeof window === 'undefined') {
    const state = version.reduxStore.getState();
    const referer = `${selectors.selectCurrentHostname(state)}${selectors.selectCurrentPath(state)}${selectors.selectCurrentSearch(state)}`;
    return referer;
  }
  return '';
};
const storeSurrogateKeys = response => {
  const keys = response.headers.get ? response.headers.get('surrogate-key') : response.headers.map['surrogate-key'];
  if (keys) version.reduxStore === null || version.reduxStore === void 0 ? void 0 : version.reduxStore.dispatch(selectors.setSurrogateKeys(keys, response.url));
};
const getClientConfig = (project, cookies) => {
  const config = DELIVERY_API_CONFIG; /* global DELIVERY_API_CONFIG */
  config.responseHandler = {};
  if (project) {
    config.projectId = project;
  }

  // we only want the surrogate key header in a server context
  if (typeof window === 'undefined') {
    config.defaultHeaders = Object.assign(config.defaultHeaders || {}, {
      referer: getSsrReferer(),
      'x-require-surrogate-key': true,
      'x-crb-ssr': true // add this for support tracing
    });

    config.responseHandler[200] = storeSurrogateKeys;
  }
  if (typeof window !== 'undefined' && PROXY_DELIVERY_API /* global PROXY_DELIVERY_API */) {
    // ensure a relative url is used to bypass the need for CORS (separate OPTIONS calls)
    config.rootUrl = '';
    config.responseHandler[404] = () => null;
  }
  if (cookies) {
    const cookieHeader = mapCookieHeader(CookieConstants.findLoginCookies(cookies));
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
  constructor(cookies) {
    this.cookies = void 0;
    this.getClientSideVersionStatus = () => {
      if (typeof window !== 'undefined') {
        // Allow overriding versionStatus with the querystring
        const {
          versionStatus
        } = queryString.parse(window.location.search);
        if (versionStatus) return versionStatus;
        // Client-side we will have a global variable set if rendered by SSR in production
        if (typeof window.versionStatus !== 'undefined') return window.versionStatus;
        // For localhost development we can only work out versionStatus from the current hostname
        const currentHostname = window.location.hostname;
        return this.getVersionStatusFromHostname(currentHostname);
      }
      return null;
    };
    this.getServerSideVersionStatus = request => request.query.versionStatus || deliveryApi.getVersionStatusFromHeaders(request.headers) || deliveryApi.getVersionStatusFromHostname(request.hostname);
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
    this.search = (query, linkDepth = 0, project) => {
      const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.cookies));
      return client.entries.search(query, typeof linkDepth !== 'undefined' ? linkDepth : 1);
    };
    this.getClient = (versionStatus = 'published', project) => {
      const baseConfig = getClientConfig(project, this.cookies);
      baseConfig.versionStatus = versionStatus;
      return contensisDeliveryApi.Client.create(baseConfig);
    };
    this.getEntry = (id, linkDepth = 0, versionStatus = 'published', project) => {
      const baseConfig = getClientConfig(project, this.cookies);
      baseConfig.versionStatus = versionStatus;
      const client = contensisDeliveryApi.Client.create(baseConfig);
      // return client.entries.get(id, linkDepth);
      return client.entries.get({
        id,
        linkDepth
      });
    };
    this.cookies = cookies;
  }
}
const deliveryApi = new DeliveryApi();
const deliveryApiWithCookies = cookies => new DeliveryApi(cookies);

exports.cachedSearch = cachedSearch;
exports.cachedSearchWithCookies = cachedSearchWithCookies;
exports.deliveryApi = deliveryApi;
exports.deliveryApiWithCookies = deliveryApiWithCookies;
exports.getClientConfig = getClientConfig;
//# sourceMappingURL=ContensisDeliveryApi-9e32960d.js.map
