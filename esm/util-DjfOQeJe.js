import { stringify, parse } from 'query-string';
import { Client } from 'contensis-delivery-api';

const now = () => {
  if (typeof window == 'undefined') {
    return Date.now();
  }
  return window.performance.now();
};

const getClientConfig = (project, env) => {
  let config = DELIVERY_API_CONFIG; /* global DELIVERY_API_CONFIG */
  if (project) {
    config.projectId = project;
  }
  if (typeof window != 'undefined' && PROXY_DELIVERY_API /* global PROXY_DELIVERY_API */) {
    // ensure a relative url is used to bypass the need for CORS (separate OPTIONS calls)
    config.rootUrl = env || '';
    config.responseHandler = {
      404: () => null
    };
  }
  return config;
};
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
class CachedSearch {
  constructor() {
    this.cache = new LruCache();
    this.taxonomyLookup = {};
  }
  search(query, linkDepth, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(project + JSON.stringify(query) + linkDepth.toString(), () => client.entries.search(query, linkDepth));
  }
  getTaxonomyNodeByPath(path, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(`[TAXONOMY NODE] ${path}`, () => client.taxonomy.getNodeByPath({
      path: path,
      order: 'defined',
      childDepth: 2
    }).then(node => this.extendTaxonomyNode(node)));
  }
  request(key, execute) {
    if (!this.cache.get(key) || typeof window == 'undefined') {
      let promise = execute();
      this.cache.set(key, promise);
      promise.catch(() => {
        this.cache.remove(key);
      });
    }
    return this.cache.get(key);
  }
  extendTaxonomyNode(node) {
    let id = this.getTaxonomyId(node);
    this.taxonomyLookup[id] = node.key;
    return {
      ...node,
      id,
      children: node.children ? node.children.map(n => this.extendTaxonomyNode(n)) : null
    };
  }
  getTaxonomyId(node) {
    if (node.key) {
      let parts = node.key.split('/');
      return parts[parts.length - 1];
    }
    return '';
  }
  fetch(uri, opts = {}) {
    return this.request(`[FETCH] ${uri} ${JSON.stringify(opts)}`, () => fetch(uri, opts));
  }
}
const cachedSearch = new CachedSearch();

function fixFreeTextForElastic(s) {
  const illegalChars = ['>', '<', '=', '|', '!', '{', '}', '[', ']', '^', '~', '*', '?', ':', '\\', '/'];
  const illegalRegEx = new RegExp(illegalChars.map(c => '\\' + c).join('|'), 'g');
  s = s.replace(illegalRegEx, '');
  // s = s.replace(encodedRegEx, ''); // (m) => '\\\\' + m);

  return s;
}
/** `convertKeyForAggregation` and `parseKeyForAggregation` exists to prevent an
 *  auto-generated aggregation using a reserved keyword because Elasticsearch has a list of
 *  reserved keywords when it parses the response:
 *  `'location' is one of the reserved aggregation keywords we use a heuristics based
 *  response parser and using these reserved keywords could throw its heuristics off
 *  course. We are working on a solution in Elasticsearch itself to make the response
 *  parseable. For now these are all the reserved keywords: after_key, _as_string,
 *  bg_count, bottom_right, bounds, buckets, count, doc_count, doc_count_error_upper_bound,
 *  fields, from, top, type, from_as_string, hits, key, key_as_string, keys, location,
 *  max_score, meta, min, min_length, score, sum_other_doc_count, to, to_as_string, top_left,
 *  total, value, value_as_string, values, geometry, properties`
 */
const convertKeyForAggregation = key => `sf_${key}`;
const convertFieldIdForAggregation = fieldId => fieldId.replaceAll('[]', '');
const timedSearch = async (query, linkDepth = 0, projectId, env) => {
  if (!query) return null;
  let duration = 0;
  const start = now();
  const payload = await cachedSearch.search(query, linkDepth, projectId, env);
  const end = now();
  duration = Number((end - start).toFixed(2));
  return {
    duration,
    payload
  };
};
const getItemsFromResult = result => {
  const {
    payload
  } = result || {};
  if (payload) {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.items)) return payload.items;
    return payload;
  }
  return [];
};
const extractQuotedPhrases = searchTerm => {
  const pattern = new RegExp(/(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/gm);
  return (searchTerm.match(pattern) || []).map(match => match.replace(/"/g, ''));
};
const buildUrl = (route, params) => {
  const qs = stringify(params);
  const path = qs ? `${route}${route.includes('?') ? '&' : '?'}${qs}` : route;
  return path;
};

/**
 * Returns all params from the current route query string or static route
 * Supply static route argument if reading parameters from the route path
 * Supply location argument for the params to be read in SSR
 * @param staticRoute Matched static route from react-router 5 or 6
 * @param location location object containing at least pathname and search
 * @returns Keyed params object
 */
const routeParams = (staticRoute, location) => {
  var _staticRoute$match;
  // match.params is react-router-config/react-router@5 style
  // params is supplied with RouteObject in react-router@6
  const pathParams = (staticRoute === null || staticRoute === void 0 || (_staticRoute$match = staticRoute.match) === null || _staticRoute$match === void 0 ? void 0 : _staticRoute$match.params) || (staticRoute === null || staticRoute === void 0 ? void 0 : staticRoute.params) || {};
  const queryParams = parse(typeof window !== 'undefined' ? window.location.search : (location === null || location === void 0 ? void 0 : location.search) || '');
  return {
    ...pathParams,
    ...queryParams
  };
};
const callCustomApi = async (customApi, filters) => {
  const apiUri = customApi.uri || '';
  let uri = buildUrl(apiUri, filters);
  if (!uri) throw new Error('uri is required to use customApi');
  if (typeof window == 'undefined') {
    if (!uri.startsWith('http')) uri = `http://localhost:3001${uri}`;
    const response = await fetch(uri);
    return await response.json();
  }
  const response = await cachedSearch.fetch(uri);
  return await response.clone().json();
};
const removeEmptyAttributes = obj => {
  Object.entries(obj).forEach(([key, val]) => val && typeof val === 'object' && removeEmptyAttributes(val) || (typeof val === 'undefined' || val === null || val === '') && delete obj[key]);
  return obj;
};
const toArray = (obj, seperator = ',') => typeof obj === 'undefined' || obj === null ? obj : Array.isArray(obj) ? obj : obj.split(seperator);

// assumes array elements are primitive types
const areArraysEqualSets = (a1, a2) => {
  const superSet = {};
  for (const ai of a1) {
    const e = ai + typeof ai;
    superSet[e] = 1;
  }
  for (const ai of a2) {
    const e = ai + typeof ai;
    if (!superSet[e]) {
      return false;
    }
    superSet[e] = 2;
  }
  for (const e in superSet) {
    if (superSet[e] === 1) {
      return false;
    }
  }
  return true;
};

export { removeEmptyAttributes as a, convertFieldIdForAggregation as b, convertKeyForAggregation as c, areArraysEqualSets as d, extractQuotedPhrases as e, fixFreeTextForElastic as f, getItemsFromResult as g, cachedSearch as h, callCustomApi as i, timedSearch as j, routeParams as r, toArray as t };
//# sourceMappingURL=util-DjfOQeJe.js.map
