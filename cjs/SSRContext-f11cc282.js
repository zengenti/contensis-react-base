'use strict';

var React = require('react');
var reactCookie = require('react-cookie');
var reactRedux = require('react-redux');
var contensisDeliveryApi = require('contensis-delivery-api');
var queryString = require('query-string');
var selectors = require('./selectors-d5cd6b19.js');
var store = require('./store-0ef9b570.js');
var CookieHelper_class = require('./CookieHelper.class-34994aa1.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  constructor(ssr) {
    var _this$ssr;
    this.cache = new LruCache();
    this.cookies = void 0;
    this.ssr = void 0;
    this.ssr = ssr;
    this.cookies = (_this$ssr = this.ssr) === null || _this$ssr === void 0 ? void 0 : _this$ssr.cookies.raw;
  }
  getClient(...args) {
    return new DeliveryApi(this.ssr).getClient(...args);
  }
  search(query, linkDepth = 0, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.ssr));
    return this.request(`${project}+${JSON.stringify(query)}+${linkDepth}`, () => client.entries.search(query, linkDepth));
  }
  searchUsingPost(query, linkDepth = 0, project = '') {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.ssr));
    return this.request(`${project}+${JSON.stringify(query)}+${linkDepth}`, () => client.entries.searchUsingPost(query, linkDepth));
  }
  get(id, linkDepth = 0, versionStatus = 'published', project, fields) {
    const client = contensisDeliveryApi.Client.create({
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
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.ssr));
    return this.request(`[CONTENT TYPE] ${id} ${project}`, () => client.contentTypes.get(id));
  }
  getRootNode(options, versionStatus = 'published', project) {
    const client = contensisDeliveryApi.Client.create({
      ...getClientConfig(project, this.ssr),
      versionStatus
    });
    return this.request(`${project} / ${JSON.stringify(options)}`, () => client.nodes.getRoot(options));
  }
  getNode(options, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.ssr));
    return this.request(`${project} ${options && typeof options !== 'string' ? 'path' in options ? options.path : options.id : options} ${JSON.stringify(options)}`, () => client.nodes.get(options));
  }
  getAncestors(options, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.ssr));
    return this.request(`${project} [A] ${options && typeof options !== 'string' && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getAncestors(options));
  }
  getChildren(options, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.ssr));
    return this.request(`${project} [C] ${options && typeof options !== 'string' && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getChildren(options));
  }
  getSiblings(options, project) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.ssr));
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
const cachedSearchWithCookies = ssr => new CachedSearch(ssr);

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
 * Store the surrogate-key header contents in redux state to output in SSR response
 */
const storeSurrogateKeys = ssr => response => {
  let keys = '';
  if (response.status === 200) {
    keys = response.headers.get ? response.headers.get('surrogate-key') : response.headers.map['surrogate-key'];
    if (!keys) console.info(`[storeSurrogateKeys] No keys in ${response.url}`);
  }
  // Using imported reduxStore in SSR is unreliable during high
  // concurrent loads and exists here as a best effort fallback
  // in case the SSRContext is not provided
  const put = (ssr === null || ssr === void 0 ? void 0 : ssr.dispatch) || (store.reduxStore === null || store.reduxStore === void 0 ? void 0 : store.reduxStore.dispatch);
  put === null || put === void 0 ? void 0 : put(selectors.setSurrogateKeys(keys, response.url, response.status));
};

/**
 * Create a new Config object to create a DeliveryAPI Client
 */
const deliveryApiConfig = ssr => {
  const config = {
    ...DELIVERY_API_CONFIG /* global DELIVERY_API_CONFIG */
  };

  // Add SSR headers and handlers
  if (typeof window === 'undefined') {
    config.defaultHeaders = {
      'x-require-surrogate-key': 'true',
      // request surrogate-key response header
      'x-crb-ssr': 'true' // add this for support tracing
    };

    if (ssr) config.defaultHeaders.referer = getSsrReferer(ssr); // add this for support tracing

    config.responseHandler = {
      [200]: storeSurrogateKeys(ssr)
    }; // for handling page cache invalidation
  }

  if (typeof window !== 'undefined' && PROXY_DELIVERY_API /* global PROXY_DELIVERY_API */) {
    // ensure a relative url is used to bypass the need for CORS (separate OPTIONS calls)
    config.rootUrl = '';
    config.responseHandler = {
      [404]: () => null
    };
  }
  return config;
};
const getClientConfig = (project, ssr) => {
  const config = deliveryApiConfig(ssr);
  if (project) {
    config.projectId = project;
  }
  if (ssr !== null && ssr !== void 0 && ssr.cookies) {
    const cookieHeader = mapCookieHeader(CookieHelper_class.findLoginCookies(ssr.cookies));
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
    this.cookies = void 0;
    this.ssr = void 0;
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
      const client = contensisDeliveryApi.Client.create(getClientConfig(project, this.ssr));
      return client.entries.search(query, typeof linkDepth !== 'undefined' ? linkDepth : 1);
    };
    this.getClient = (versionStatus = 'published', project) => contensisDeliveryApi.Client.create({
      ...getClientConfig(project, this.ssr),
      versionStatus
    });
    this.getEntry = (id, linkDepth = 0, versionStatus = 'published', project) => {
      const client = contensisDeliveryApi.Client.create({
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

const SSRContext = /*#__PURE__*/React.createContext(null);

/** SSRContextProvider allows us to hold and access request-scoped references
 *  throughout the component tree
 *
 *  adding this in client side allows consumers to write universal code and use
 *  the same helpers and refs as in SSR */
const SSRContextProvider = ({
  children,
  request,
  response
}) => {
  // In SSR pass references to things in backing sagas
  // we cannot access in a global scope
  const dispatch = reactRedux.useDispatch();
  const cookies = new CookieHelper_class.CookieHelper(...reactCookie.useCookies());
  const api = cachedSearchWithCookies({
    cookies,
    dispatch,
    request,
    response
  });
  const [context] = React.useState({
    api,
    cookies,
    dispatch,
    request,
    response
  });
  return /*#__PURE__*/React__default["default"].createElement(SSRContext.Provider, {
    value: {
      ...context
    }
  }, children);
};
const useSSRContext = () => React.useContext(SSRContext);
const useDeliveryApi = () => {
  const {
    api
  } = useSSRContext();
  return api;
};

exports.SSRContextProvider = SSRContextProvider;
exports.cachedSearch = cachedSearch;
exports.cachedSearchWithCookies = cachedSearchWithCookies;
exports.deliveryApi = deliveryApi;
exports.deliveryApiWithCookies = deliveryApiWithCookies;
exports.getClientConfig = getClientConfig;
exports.useDeliveryApi = useDeliveryApi;
exports.useSSRContext = useSSRContext;
//# sourceMappingURL=SSRContext-f11cc282.js.map
