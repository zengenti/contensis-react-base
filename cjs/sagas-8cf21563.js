'use strict';

var log = require('loglevel');
var effects = require('@redux-saga/core/effects');
var contensisDeliveryApi = require('contensis-delivery-api');
var queryString = require('query-string');
var mapJson = require('jsonpath-mapper');
var contensisCoreApi = require('contensis-core-api');
var merge = require('deepmerge');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var log__namespace = /*#__PURE__*/_interopNamespace(log);
var mapJson__default = /*#__PURE__*/_interopDefaultLegacy(mapJson);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);

const ACTION_PREFIX = '@SEARCH/';
const APPLY_CONFIG = `${ACTION_PREFIX}APPLY_CONFIG`;
const CLEAR_FILTERS = `${ACTION_PREFIX}CLEAR_FILTERS`;
const DO_SEARCH = `${ACTION_PREFIX}DO_SEARCH`;
const EXECUTE_SEARCH = `${ACTION_PREFIX}EXECUTE_SEARCH`;
const EXECUTE_SEARCH_ERROR = `${ACTION_PREFIX}EXECUTE_SEARCH_ERROR`;
const EXECUTE_SEARCH_PRELOAD = `${ACTION_PREFIX}EXECUTE_SEARCH_PRELOAD`;
const LOAD_FILTERS = `${ACTION_PREFIX}LOAD_FILTERS`;
const LOAD_FILTERS_COMPLETE = `${ACTION_PREFIX}LOAD_FILTERS_COMPLETE`;
const LOAD_FILTERS_ERROR = `${ACTION_PREFIX}LOAD_FILTERS_ERROR`;
const SET_FEATURED_ENTRIES = `${ACTION_PREFIX}SET_FEATURED_ENTRIES`;
const SET_ROUTE_FILTERS = `${ACTION_PREFIX}SET_ROUTE_FILTERS`;
const SET_SEARCH_FILTERS = `${ACTION_PREFIX}SET_SEARCH_FILTERS`;
const SET_SEARCH_ENTRIES = `${ACTION_PREFIX}SET_SEARCH_ENTRIES`;
const SET_SELECTED_FILTER = `${ACTION_PREFIX}SET_SELECTED_FILTER`;
const UPDATE_CURRENT_FACET = `${ACTION_PREFIX}UPDATE_CURRENT_FACET`;
const UPDATE_CURRENT_TAB = `${ACTION_PREFIX}UPDATE_CURRENT_TAB`;
const UPDATE_SORT_ORDER = `${ACTION_PREFIX}UPDATE_SORT_ORDER`;
const UPDATE_PAGE_INDEX = `${ACTION_PREFIX}UPDATE_PAGE_INDEX`;
const UPDATE_SEARCH_TERM = `${ACTION_PREFIX}UPDATE_SEARCH_TERM`;
const UPDATE_SELECTED_FILTERS = `${ACTION_PREFIX}UPDATE_SELECTED_FILTERS`;

var types = /*#__PURE__*/Object.freeze({
  __proto__: null,
  APPLY_CONFIG: APPLY_CONFIG,
  CLEAR_FILTERS: CLEAR_FILTERS,
  DO_SEARCH: DO_SEARCH,
  EXECUTE_SEARCH: EXECUTE_SEARCH,
  EXECUTE_SEARCH_ERROR: EXECUTE_SEARCH_ERROR,
  EXECUTE_SEARCH_PRELOAD: EXECUTE_SEARCH_PRELOAD,
  LOAD_FILTERS: LOAD_FILTERS,
  LOAD_FILTERS_COMPLETE: LOAD_FILTERS_COMPLETE,
  LOAD_FILTERS_ERROR: LOAD_FILTERS_ERROR,
  SET_FEATURED_ENTRIES: SET_FEATURED_ENTRIES,
  SET_ROUTE_FILTERS: SET_ROUTE_FILTERS,
  SET_SEARCH_FILTERS: SET_SEARCH_FILTERS,
  SET_SEARCH_ENTRIES: SET_SEARCH_ENTRIES,
  SET_SELECTED_FILTER: SET_SELECTED_FILTER,
  UPDATE_CURRENT_FACET: UPDATE_CURRENT_FACET,
  UPDATE_CURRENT_TAB: UPDATE_CURRENT_TAB,
  UPDATE_SORT_ORDER: UPDATE_SORT_ORDER,
  UPDATE_PAGE_INDEX: UPDATE_PAGE_INDEX,
  UPDATE_SEARCH_TERM: UPDATE_SEARCH_TERM,
  UPDATE_SELECTED_FILTERS: UPDATE_SELECTED_FILTERS
});

const withMappers = (action, mappers) => {
  return { ...action,
    mappers
  };
}; // export const withMappers2 = (actionFunc, args, mappers) => {
//   return () => ({ ...actionFunc(args), mappers });
// };

const triggerSearch = ({
  config,
  context,
  debug,
  defaultLang,
  excludeIds,
  facet,
  mapper,
  params
}) => {
  return {
    type: DO_SEARCH,
    config,
    context,
    debug,
    defaultLang,
    excludeIds,
    facet,
    mapper,
    params
  };
};
const initListing = ({
  context,
  facet,
  mapper,
  params
}) => {
  return {
    type: SET_ROUTE_FILTERS,
    context,
    facet,
    mapper,
    params
  };
};
const navigate = (path, state) => {
  return {
    type: '@ROUTING/_SET_ROUTE',
    path,
    state
  };
};
const clearFilters$1 = () => {
  return {
    type: CLEAR_FILTERS
  };
};
const updatePageIndex$1 = pageIndex => {
  return {
    type: UPDATE_PAGE_INDEX,
    pageIndex
  };
};
const updateCurrentFacet$1 = facet => {
  return {
    type: UPDATE_CURRENT_FACET,
    facet
  };
};
const updateCurrentTab$1 = id => {
  return {
    type: UPDATE_CURRENT_TAB,
    id
  };
};
const updateSearchTerm$1 = term => {
  return {
    type: UPDATE_SEARCH_TERM,
    term
  };
};
const updateSelectedFilters = (filter, key, isUnknownItem = false) => {
  return {
    type: UPDATE_SELECTED_FILTERS,
    filter,
    key,
    isUnknownItem
  };
};
const updateSortOrder$1 = (orderBy, facet) => {
  return {
    type: UPDATE_SORT_ORDER,
    orderBy,
    facet
  };
};

var actions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  withMappers: withMappers,
  triggerSearch: triggerSearch,
  initListing: initListing,
  navigate: navigate,
  clearFilters: clearFilters$1,
  updatePageIndex: updatePageIndex$1,
  updateCurrentFacet: updateCurrentFacet$1,
  updateCurrentTab: updateCurrentTab$1,
  updateSearchTerm: updateSearchTerm$1,
  updateSelectedFilters: updateSelectedFilters,
  updateSortOrder: updateSortOrder$1
});

exports.Context = void 0; // export type Context = 'facets' | 'listings' | 'minilist';

(function (Context) {
  Context["facets"] = "facets";
  Context["listings"] = "listings";
  Context["minilist"] = "minilist";
})(exports.Context || (exports.Context = {}));

// or replace with a stub function for non-immutable gets

const makeFromJS = (returnType = globalThis.STATE_TYPE || 'immutable') => {
  var _immutable, _immutable2;

  return returnType === 'immutable' ? ((_immutable = globalThis.immutable) === null || _immutable === void 0 ? void 0 : _immutable.fromJSOrdered) || ((_immutable2 = globalThis.immutable) === null || _immutable2 === void 0 ? void 0 : _immutable2.fromJS) || (v => v) : v => v;
};

const getImmutableOrJS = (state, stateKey, fallbackValue, returnType = globalThis.STATE_TYPE || 'immutable') => {
  // Find a fromJS function from global that is dynamically loaded in createStore
  // or replace with a stub function for non-immutable gets
  const fromJS = makeFromJS(returnType);

  if (state && 'get' in state && typeof state.get === 'function' && 'getIn' in state && typeof state.getIn === 'function' && 'toJS' in state && typeof state.toJS === 'function') {
    if (Array.isArray(stateKey)) return fromJS(state.getIn(stateKey, fallbackValue));
    return fromJS(state.get(stateKey, fallbackValue));
  }

  if (Array.isArray(stateKey) && state && typeof state === 'object') {
    const result = mapJson.jpath(stateKey.join('.'), state);
    if (typeof result === 'undefined') return fallbackValue;
    return result;
  }

  const result = state && typeof state === 'object' ? state[stateKey] : undefined;
  if (typeof result === 'undefined') return fallbackValue;
  return result;
};

const getSearchContext = state => getImmutableOrJS(state, ['search', 'context'], exports.Context.facets);
const getCurrent = (state, context = exports.Context.facets) => context === exports.Context.facets ? getCurrentFacet(state) : getCurrentListing(state);
const getCurrentFacet = state => getImmutableOrJS(state, ['search', 'currentFacet']);
const getCurrentListing = state => getImmutableOrJS(state, ['search', 'currentListing']);
const getCurrentTab = state => getImmutableOrJS(state, ['search', exports.Context.facets, getCurrentFacet(state), 'tabId'], 0);
const getFacets = (state, returnType) => getImmutableOrJS(state, ['search', exports.Context.facets], {}, returnType);
const getTabFacets = state => Object.fromEntries(Object.entries(getFacets(state, 'js')).filter(([key]) => getImmutableOrJS(getFacets(state), [key, 'tabId'], 0) === getCurrentTab(state)));
const getFacetTitles = state => Object.entries(getFacets(state, 'js')).map(([key, facet = {}]) => {
  var _facet$pagingInfo;

  return {
    isSelected: getCurrentFacet(state) === key,
    key,
    title: facet.title,
    totalCount: (_facet$pagingInfo = facet.pagingInfo) === null || _facet$pagingInfo === void 0 ? void 0 : _facet$pagingInfo.totalCount
  };
});
const getFacet = (state, facetName = '', context = exports.Context.facets, returnType) => {
  const currentFacet = facetName || getCurrentFacet(state);
  return getImmutableOrJS(state, ['search', context, currentFacet], {}, returnType);
};
const getListing = (state, listing = '') => {
  const currentListing = listing || getCurrentListing(state);
  return getImmutableOrJS(state, ['search', exports.Context.listings, currentListing], {});
};
const getFilters = (state, facet, context = exports.Context.facets, returnType) => {
  return getImmutableOrJS(state, ['search', context, facet || getCurrent(state, context), 'filters'], {}, returnType);
};
const getRenderableFilters = (state, facet = '', context = exports.Context.facets) => Object.fromEntries(Object.entries(getFilters(state, facet, context, 'js')).filter(([, f = {}]) => typeof f.renderable !== 'boolean' ? true : f.renderable));
const getFiltersToLoad = (state, facet, context = exports.Context.facets, returnType) => {
  const filters = getFilters(state, facet, context, returnType);
  const loadedFilters = Object.entries(filters).map(([key, f = {}]) => [key, (f.items || []).filter(i => {
    const title = i === null || i === void 0 ? void 0 : i.title;
    return typeof title !== 'undefined' && !!title;
  }).length > 0 && (f.isError || false) === false]);
  return loadedFilters.map(([filterKey, isLoaded]) => !isLoaded ? filterKey : null).filter(f => !!f);
}; // We lowercase the filter key unless it's an ISO date string where the T must be uppercase

const getSelectedFilters = (state, facet = '', context = exports.Context.facets, returnType) => {
  const filters = getFilters(state, facet, context, 'js');
  const isoDateRegex = RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d/);
  const selectedFilters = Object.fromEntries(Object.entries(filters).map(([key, filter = {}]) => [key, (filter.items || []).filter(item => !!(item.isSelected || false)).map(item => {
    const key = (item === null || item === void 0 ? void 0 : item.key) || '';
    const isIsoDate = isoDateRegex.test(key);
    return isIsoDate ? key : typeof key.toLowerCase !== 'undefined' ? key.toLowerCase() : key;
  })]));
  const fromJS = makeFromJS(returnType);
  return fromJS(selectedFilters);
};
const getResults = (state, current = '', context = exports.Context.facets, returnType) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'results'], [], returnType);
};
const getIsInternalPaging = (state, current, context = exports.Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'queryParams', 'internalPaging'], false);
};
const getIsLoaded = (state, context = exports.Context.facets, facet) => {
  return !!getImmutableOrJS(state, ['search', context, facet || getCurrent(state, context), 'queryDuration'], 0);
};
const getIsLoading = (state, context = exports.Context.facets, facet) => {
  return getImmutableOrJS(state, ['search', context, facet || getCurrent(state, context), 'entries', 'isLoading']);
};
const getIsSsr = state => getImmutableOrJS(state, ['search', 'config', 'ssr'], false);
const getFeaturedResults = (state, current = '', context = exports.Context.facets, returnType) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'featuredResults'], [], returnType);
};
const getPaging = (state, current = '', context = exports.Context.facets, returnType) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo'], {}, returnType);
};
const getPageIndex = (state, current = '', context = exports.Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'pageIndex']);
};
const getPrevPageIndex = (state, current = '', context = exports.Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'prevPageIndex']);
};
const getPageIsLoading = (state, current = '', context = exports.Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'isLoading']);
};
const getPagesLoaded = (state, current = '', context = exports.Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'pagesLoaded'], [], 'js');
};
const getTotalCount = (state, current = '', context = exports.Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'totalCount']);
};
const getSearchTerm = state => getImmutableOrJS(state, ['search', 'term']);
const getSearchTabs = (state, returnType) => getImmutableOrJS(state, ['search', 'tabs'], [], returnType);
const getQueryParams = (state, current = '', context = exports.Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'queryParams'], {}, 'js');
};
const getQueryParameter = ({
  state,
  facet,
  context = exports.Context.facets
}, key, ifnull = null) => {
  return getImmutableOrJS(getQueryParams(state, facet, context), key, ifnull, 'js');
};
const getCustomApi = (state, current, context = exports.Context.facets, returnType) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'customApi'], null, returnType);
};
const getCustomEnv = (state, current, context = exports.Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'env']);
};
const getTabsAndFacets = (state, returnType) => {
  const tabs = getSearchTabs(state, 'js');
  const facets = getFacets(state, 'js');
  const tabsAndFacets = (tabs || []).map((tab = {}) => {
    const fieldsToCount = tab.totalCount;
    let countFields;
    if (typeof fieldsToCount === 'string') countFields = [[fieldsToCount]];
    const thisTabFacets = Object.entries(facets).filter(([key]) => getImmutableOrJS(facets, [key, 'tabId'], 0) === tab.id);
    const thisTabTotal = thisTabFacets.map(([facetName, facet = {}]) => {
      if (!countFields || countFields.find((f = []) => (f === null || f === void 0 ? void 0 : f[0]) === facetName)) return getImmutableOrJS(facet, ['pagingInfo', 'totalCount']);
      return 0;
    }).reduce((a, b) => a + b, 0);
    return { ...tab,
      [exports.Context.facets]: Object.fromEntries(thisTabFacets),
      totalCount: thisTabTotal
    };
  });
  const fromJS = makeFromJS(returnType);
  return fromJS(tabsAndFacets);
};
const getSearchTotalCount = state => {
  const tabsAndFacets = getTabsAndFacets(state, 'js');
  const wholeSearchTotal = tabsAndFacets.map((t = {}) => t.totalCount).reduce((a, b) => a + b, 0);
  return wholeSearchTotal;
};
const getFacetsTotalCount = state => {
  const facets = getFacets(state);
  const wholeSearchTotal = Object.entries(facets).map(([, t = {}]) => {
    var _t$pagingInfo;

    return ((_t$pagingInfo = t.pagingInfo) === null || _t$pagingInfo === void 0 ? void 0 : _t$pagingInfo.totalCount) || 0;
  }).reduce((a, b) => a + b, 0);
  return wholeSearchTotal;
}; // An exported copy of the relevant selectors scoped by default to a facets context

const selectFacets = {
  getCurrent: getCurrentFacet,
  getCurrentTab,
  getCustomApi,
  getCustomEnv,
  getFacet,
  getFacetTitles,
  getFacets,
  getFacetsTotalCount,
  getFeaturedResults,
  getFilters,
  getFiltersToLoad,
  getIsLoaded,
  getIsLoading,
  getPageIndex,
  getPageIsLoading,
  getPagesLoaded,
  getPaging,
  getQueryParams: (state, facet) => getQueryParams(state, facet, exports.Context.facets),
  getQueryParameter: ({
    state,
    facet
  }, key, ifnull) => getQueryParameter({
    state,
    facet,
    context: exports.Context.facets
  }, key, ifnull),
  getRenderableFilters,
  getResults,
  getTabFacets,
  getTabsAndFacets,
  getTotalCount,
  getSearchTabs,
  getSearchTerm,
  getSearchTotalCount,
  getSelectedFilters
}; // An exported copy of the relevant selectors pre-scoped to a listing context

const selectListing = {
  getCurrent: getCurrentListing,
  getFeaturedResults: (state, listing = '') => getFeaturedResults(state, listing, exports.Context.listings, 'js'),
  getFilters: (state, listing = '') => getFilters(state, listing, exports.Context.listings, 'js'),
  getFiltersToLoad: (state, listing = '') => getFiltersToLoad(state, listing, exports.Context.listings),
  getListing,
  getIsLoaded: state => getIsLoaded(state, exports.Context.listings),
  getIsLoading: state => getIsLoading(state, exports.Context.listings),
  getPageIndex: (state, listing = '') => getPageIndex(state, listing, exports.Context.listings),
  getPaging: (state, listing = '') => getPaging(state, listing, exports.Context.listings, 'js'),
  getPageIsLoading: (state, listing = '') => getPageIsLoading(state, listing, exports.Context.listings),
  getPagesLoaded: (state, listing = '') => getPagesLoaded(state, listing, exports.Context.listings),
  getQueryParams: (state, listing = '') => getQueryParams(state, listing, exports.Context.listings),
  getQueryParameter: ({
    state,
    facet
  }, key, ifnull) => getQueryParameter({
    state,
    facet,
    context: exports.Context.listings
  }, key, ifnull),
  getRenderableFilters: (state, listing = '') => getRenderableFilters(state, listing, exports.Context.listings),
  getResults: (state, listing = '') => getResults(state, listing, exports.Context.listings, 'js'),
  getSearchTerm,
  getTotalCount: (state, listing = '') => getTotalCount(state, listing, exports.Context.listings),
  getSelectedFilters: (state, listing = '') => getSelectedFilters(state, listing, exports.Context.listings, 'js')
};
const selectCurrentPath = state => getImmutableOrJS(state, ['routing', 'currentPath']);
const selectCurrentProject = state => getImmutableOrJS(state, ['routing', 'currentProject']);
const selectVersionStatus = state => getImmutableOrJS(state, ['version', 'contensisVersionStatus']);

var selectors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getSearchContext: getSearchContext,
  getCurrent: getCurrent,
  getCurrentFacet: getCurrentFacet,
  getCurrentListing: getCurrentListing,
  getCurrentTab: getCurrentTab,
  getFacets: getFacets,
  getTabFacets: getTabFacets,
  getFacetTitles: getFacetTitles,
  getFacet: getFacet,
  getListing: getListing,
  getFilters: getFilters,
  getRenderableFilters: getRenderableFilters,
  getFiltersToLoad: getFiltersToLoad,
  getSelectedFilters: getSelectedFilters,
  getResults: getResults,
  getIsInternalPaging: getIsInternalPaging,
  getIsLoaded: getIsLoaded,
  getIsLoading: getIsLoading,
  getIsSsr: getIsSsr,
  getFeaturedResults: getFeaturedResults,
  getPaging: getPaging,
  getPageIndex: getPageIndex,
  getPrevPageIndex: getPrevPageIndex,
  getPageIsLoading: getPageIsLoading,
  getPagesLoaded: getPagesLoaded,
  getTotalCount: getTotalCount,
  getSearchTerm: getSearchTerm,
  getSearchTabs: getSearchTabs,
  getQueryParams: getQueryParams,
  getQueryParameter: getQueryParameter,
  getCustomApi: getCustomApi,
  getCustomEnv: getCustomEnv,
  getTabsAndFacets: getTabsAndFacets,
  getSearchTotalCount: getSearchTotalCount,
  getFacetsTotalCount: getFacetsTotalCount,
  selectFacets: selectFacets,
  selectListing: selectListing,
  selectCurrentPath: selectCurrentPath,
  selectCurrentProject: selectCurrentProject,
  selectVersionStatus: selectVersionStatus
});

const getClientConfig = (project, env) => {
  let config = DELIVERY_API_CONFIG;
  /* global DELIVERY_API_CONFIG */

  if (project) {
    config.projectId = project;
  }

  if (typeof window != 'undefined' && PROXY_DELIVERY_API
  /* global PROXY_DELIVERY_API */
  ) {
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
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, env));
    return this.request(project + JSON.stringify(query) + linkDepth.toString(), () => client.entries.search(query, linkDepth));
  }

  getTaxonomyNodeByPath(path, project, env) {
    const client = contensisDeliveryApi.Client.create(getClientConfig(project, env));
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
    return { ...node,
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

const now = () => {
  if (typeof window == 'undefined') {
    return Date.now();
  }

  return window.performance.now();
};

// eslint-disable-next-line import/default
function fixFreeTextForElastic(s) {
  const illegalChars = ['>', '<', '=', '|', '!', '{', '}', '[', ']', '^', '~', '*', '?', ':', '\\', '/'];
  const illegalRegEx = new RegExp(illegalChars.map(c => '\\' + c).join('|'), 'g');
  s = s.replace(illegalRegEx, ''); // s = s.replace(encodedRegEx, ''); // (m) => '\\\\' + m);

  return s;
}
const timedSearch = async (query, linkDepth = 0, projectId, env) => {
  if (!query) return null;
  let duration = 0;
  const start = now();
  const payload = await cachedSearch.search(query, linkDepth, projectId, env);
  const end = now();
  duration = end - start;
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
  const qs = queryString.stringify(params);
  const path = qs ? `${route}?${qs}` : route;
  return path;
};
const callCustomApi = async (customApi, filters) => {
  const apiUri = customApi.uri || '';
  let uri = buildUrl(apiUri, filters);
  if (!uri) throw new Error('uri is required to use customApi');
  if (typeof window == 'undefined' && uri.startsWith('/')) uri = `http://localhost:3001${uri}`;
  const response = await cachedSearch.fetch(uri);
  return await response.clone().json();
};
const removeEmptyAttributes = obj => {
  Object.entries(obj).forEach(([key, val]) => val && typeof val === 'object' && removeEmptyAttributes(val) || (typeof val === 'undefined' || val === null || val === '') && delete obj[key]);
  return obj;
};
const toArray = (obj, seperator = ',') => typeof obj === 'undefined' || obj === null ? obj : Array.isArray(obj) ? obj : obj.split(seperator); // assumes array elements are primitive types

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

const DataFormats = {
  asset: 'asset',
  entry: 'entry',
  webpage: 'webpage'
};
const FilterExpressionTypes = {
  contentType: 'contentType',
  field: 'field'
};
const sys = {
  allUris: 'sys.allUris',
  contentTypeId: 'sys.contentTypeId',
  dataFormat: 'sys.dataFormat',
  filename: 'sys.properties.filename',
  id: 'sys.id',
  includeInSearch: 'sys.metadata.includeInSearch',
  language: 'sys.language',
  uri: 'sys.uri',
  versionStatus: 'sys.versionStatus'
};
const Fields = {
  entryDescription: 'entryDescription',
  entryTitle: 'entryTitle',
  keywords: 'keywords',
  searchContent: 'searchContent',
  sys,
  contentTypeId: 'sys.contentTypeId',
  wildcard: '*'
};

const fieldExpression = (field, value, operator = 'equalTo', weight) => {
  if (!field || !value || Array.isArray(value) && value.length === 0) return [];
  if (Array.isArray(field)) // If an array of fieldIds have been provided, call self for each fieldId
    // to generate expressions that are combined with an 'or' operator
    return [contensisCoreApi.Op.or(...field.map(fieldId => fieldExpression(fieldId, value, operator, weight)).flat())];
  if (operator === 'between') return between(field, value);
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? equalToOrIn(field, value, operator) : [equalToOrIn(field, value, operator)[0].weight(weight)];
};
const contentTypeIdExpression = (contentTypeIds, webpageTemplates, assetTypes) => {
  const expressions = [];
  if (!contentTypeIds && !webpageTemplates && !assetTypes) return expressions;

  if (contentTypeIds && contentTypeIds.length > 0) {
    expressions.push(...dataFormatExpression(contentTypeIds, DataFormats.entry));
  }

  if (webpageTemplates && webpageTemplates.length > 0) {
    expressions.push(...dataFormatExpression(webpageTemplates, DataFormats.webpage));
  }

  if (assetTypes && assetTypes.length > 0) {
    expressions.push(...dataFormatExpression(assetTypes, DataFormats.asset));
  }

  if (expressions.length > 1) return [contensisCoreApi.Op.or(...expressions)];
  return expressions;
};
const filterExpressions = (filters, isOptional = false) => {
  if (!filters) return [];
  const expressions = [];
  filters.map(selectedFilter => {
    if (selectedFilter.logicOperator === 'and') // using 'and' logic operator we loop through each filter
      // and loop through all values to add an expression for each filter value
      selectedFilter.values.forEach(value => expressions.push(...fieldExpression(selectedFilter.key, value, selectedFilter.fieldOperator || 'equalTo')));else if (selectedFilter.logicOperator === 'not') {
      const fieldExpressions = fieldExpression(selectedFilter.key, selectedFilter.values, selectedFilter.fieldOperator || 'in');
      fieldExpressions.forEach(expr => {
        expressions.push(contensisCoreApi.Op.not(expr));
      });
    } // using 'or' logic operator we loop over each filter
    // and simply add the array of values to an expression with an 'in' operator
    else expressions.push(...fieldExpression(selectedFilter.key, selectedFilter.values, selectedFilter.fieldOperator || 'in'));
    if (isOptional) expressions.push(contensisCoreApi.Op.not(fieldExpression(selectedFilter.key, true, 'exists')[0]));
  });
  return expressions;
};
const dataFormatExpression = (contentTypeIds, dataFormat = DataFormats.entry) => {
  if (contentTypeIds && contentTypeIds.length > 0) {
    /**
     * We have an array of contentTypeIds some may be prefixed with a "!"
     * to indicate this is a "not" expression
     */
    const withContentTypeIds = contentTypeIds.filter(c => !c.startsWith('!'));
    const notContentTypeIds = contentTypeIds.filter(c => c.startsWith('!')).map(id => id.substring(1));
    const andExpr = contensisCoreApi.Op.and();
    const dataFormatExpr = fieldExpression(Fields.sys.dataFormat, dataFormat)[0];
    const withExpr = fieldExpression(Fields.sys.contentTypeId, withContentTypeIds)[0];
    const notExpr = contensisCoreApi.Op.not(fieldExpression(Fields.sys.contentTypeId, notContentTypeIds)[0]);
    andExpr.add(dataFormatExpr);
    if (withContentTypeIds.length > 0 && withExpr) andExpr.add(withExpr);
    if (notContentTypeIds.length > 0 && notExpr) andExpr.add(notExpr);
    return [andExpr];
  }

  return [];
};
const featuredResultsExpression = ({
  contentTypeId,
  fieldId,
  fieldValue = true
} = {}) => {
  const expressions = [];

  if (contentTypeId) {
    expressions.push(...contentTypeIdExpression(Array.isArray(contentTypeId) ? contentTypeId : [contentTypeId]));
  }

  if (fieldId && fieldValue) {
    expressions.push(...fieldExpression(fieldId, fieldValue));
  }

  return expressions;
};
const languagesExpression = languages => fieldExpression(Fields.sys.language, languages);
const includeInSearchExpressions = (webpageTemplates, includeInSearchFields) => {
  const expressions = []; // Or include this expression if we have explicity specified non-default includeInSearch fields

  if (Array.isArray(includeInSearchFields)) expressions.push(...includeInSearchFields.map(includeInSearchField => contensisCoreApi.Op.or(contensisCoreApi.Op.and(contensisCoreApi.Op.exists(includeInSearchField, true), contensisCoreApi.Op.equalTo(includeInSearchField, true)), contensisCoreApi.Op.exists(includeInSearchField, false)))); // If webpageTemplates have been specified, include this expression
  // with the default includeInSearch field from classic Contensis.

  if (Array.isArray(webpageTemplates) && webpageTemplates.length > 0) expressions.push(contensisCoreApi.Op.or(contensisCoreApi.Op.and(contensisCoreApi.Op.exists(Fields.sys.includeInSearch, true), contensisCoreApi.Op.equalTo(Fields.sys.includeInSearch, true)), contensisCoreApi.Op.exists(Fields.sys.includeInSearch, false)));
  return expressions;
};
const defaultExpressions = versionStatus => {
  return [contensisCoreApi.Op.equalTo(Fields.sys.versionStatus, versionStatus)];
};
const includeIdsExpression = includeIds => {
  if (Array.isArray(includeIds) && includeIds.length > 0) {
    return fieldExpression(Fields.sys.id, includeIds);
  } else return [];
};
const excludeIdsExpression = excludeIds => {
  if (Array.isArray(excludeIds) && excludeIds.length > 0) {
    const [expr] = fieldExpression(Fields.sys.id, excludeIds);
    return [contensisCoreApi.Op.not(expr)];
  } else return [];
};
const orderByExpression = orderBy => {
  let expression = contensisCoreApi.OrderBy;

  if (orderBy && orderBy.length > 0) {
    orderBy.map(ob => expression = ob.startsWith('-') ? expression.desc(ob.substring(1)) : expression.asc(ob));
  }

  return expression;
};

const equalToOrIn = (field, value, operator = 'equalTo') => {
  if (value.length === 0) return [];

  if (Array.isArray(value)) {
    if (operator === 'equalTo' || operator === 'in') return [contensisCoreApi.Op.in(field, ...value)];
    const expressions = value.map(innerValue => {
      var _between, _distanceWithin;

      switch (operator) {
        case 'between':
          return (_between = between(field, innerValue)) === null || _between === void 0 ? void 0 : _between[0];

        case 'distanceWithin':
          return (_distanceWithin = distanceWithin(field, innerValue)) === null || _distanceWithin === void 0 ? void 0 : _distanceWithin[0];

        case 'exists':
          return contensisCoreApi.Op.exists(field, innerValue);

        case 'freeText':
          // TODO: Potentially needs further implementation of new options
          return contensisCoreApi.Op[operator](field, innerValue, false, undefined);

        default:
          return contensisCoreApi.Op[operator](field, innerValue);
      }
    });
    return (expressions === null || expressions === void 0 ? void 0 : expressions.length) > 1 ? [contensisCoreApi.Op.or(...expressions)] : expressions || [];
  }

  switch (operator) {
    case 'between':
      return between(field, value);

    case 'distanceWithin':
      return distanceWithin(field, value);

    case 'freeText':
      // TODO: Potentially needs further implementation of new options
      return [contensisCoreApi.Op.freeText(field, value, false, undefined)];

    default:
      return [contensisCoreApi.Op[operator](field, value)];
  }
};

const between = (field, value) => {
  const handle = betweenValue => {
    const valArr = betweenValue.split('--');

    if (valArr.length > 1) {
      const [minimum, maximum] = valArr;
      return contensisCoreApi.Op.between(field, minimum, maximum);
    } else {
      // eslint-disable-next-line no-console
      console.log(`[search] You have supplied only one value to a "between" operator which must have two values. Your supplied value "${valArr.length && valArr[0]}" has been discarded.`);
      return false;
    }
  };

  if (value.length === 0) return [];
  if (Array.isArray(value)) return [contensisCoreApi.Op.or(...value.map(handle).filter(bc => bc !== false))];
  const op = handle(value);
  return op ? [op] : [];
};

const distanceWithin = (field, value) => {
  const handle = distanceValue => {
    const valArr = distanceValue.split(' ');

    if (valArr.length > 1) {
      const [lat, lon] = valArr;
      return contensisCoreApi.Op.distanceWithin(field, Number(lat), Number(lon), (valArr === null || valArr === void 0 ? void 0 : valArr[2]) || '10mi');
    } else {
      // eslint-disable-next-line no-console
      console.log(`[search] You have supplied only one value to a "distanceWithin" operator which must be made up of "lat,lon,distance". Your supplied value "${valArr.length && valArr[0]}" has been discarded.`);
      return false;
    }
  };

  if (value.length === 0) return [];
  if (Array.isArray(value)) return [contensisCoreApi.Op.or(...value.map(handle).filter(bc => bc !== false))];
  const op = handle(value);
  return op ? [op] : [];
};
/**
 * Accept HTTP style objects and map them to
 * their equivalent JS client "Op" expressions
 * @param {array} where the where array as you'd provide it to the HTTP API
 * @returns {array} array of constructed Delivery API Operators
 */


const customWhereExpressions = where => {
  if (!where || !Array.isArray(where)) return []; // Map each clause inside the where array

  return where.map(clause => {
    let expression; // Map through each property in the clause so we can
    // capture the values required and reconstruct them as
    // a Delivery API expression

    let operator;
    Object.keys(clause).map((key, idx) => {
      // The clause may contain only one key
      if (idx === 0) operator = key;
      const field = clause.field;
      const value = clause[Object.keys(clause).find(k => !['field', 'weight'].includes(k)) || ''];
      const weight = clause.weight;

      if (idx === 0) {
        if (operator === 'and' || operator === 'or') {
          // These are array expressions so we can call ourself recursively
          // to map these inner values to expressions
          const recurseExpr = customWhereExpressions(clause[operator]);
          expression = contensisCoreApi.Op[operator](...recurseExpr);
        }

        if (['not'].includes(operator)) {
          // A 'not' expression is an object with only one inner field and inner operator
          Object.keys(value).map((notKey, notIdx) => {
            const innerOperator = notKey;
            const innerValue = value[notKey];
            const innerField = value.field; // Map the expression when we've looped and scoped to
            // the second property inside the clause

            if (notIdx === 1) expression = contensisCoreApi.Op.not(makeJsExpression(innerOperator, innerField, innerValue));
          });
        }
      } // Map the expression when we've looped and scoped to
      // the second property inside the clause


      operator = Object.keys(clause).find(clauseKey => !['field', 'weight'].includes(clauseKey));

      if (idx === 1) {
        expression = makeJsExpression(operator, field, value);
        if (typeof weight === 'number') expression = expression.weight(weight);
      }
    });
    return expression;
  });
};

const makeJsExpression = (operator, field, value) => operator === 'freeText' || operator === 'contains' ? contensisCoreApi.Op[operator](field, value) : operator === 'in' ? contensisCoreApi.Op[operator](field, ...value) : operator === 'exists' ? contensisCoreApi.Op[operator](field, value) : operator === 'between' ? contensisCoreApi.Op[operator](field, value[0], value[1]) : operator === 'distanceWithin' ? contensisCoreApi.Op[operator](field, value === null || value === void 0 ? void 0 : value.lat, value === null || value === void 0 ? void 0 : value.lon, value === null || value === void 0 ? void 0 : value.distance) : contensisCoreApi.Op[operator](field, value);

const termExpressions = (searchTerm, weightedSearchFields) => {
  if (searchTerm && weightedSearchFields && weightedSearchFields.length > 0) {
    // Extract any phrases in quotes to array
    const quotedPhrases = extractQuotedPhrases(searchTerm); // Modify the search term to remove any quoted phrases to leave any remaining terms

    let modifiedSearchTerm = searchTerm;
    quotedPhrases.forEach(qp => modifiedSearchTerm = modifiedSearchTerm.replace(qp, '').replace('""', '').trim()); // Push to the operators array to include in the query

    const operators = []; // Helper functions to generate Op expressions

    const containsOp = (f, term) => fieldExpression(f.fieldId, fixFreeTextForElastic(term), 'contains', f.weight);

    const freeTextOp = (f, term) => fieldExpression(f.fieldId, fixFreeTextForElastic(term), 'freeText', f.weight); // For each weighted search field


    weightedSearchFields.forEach(wsf => {
      // Push to field operators
      const fieldOperators = []; // Add operator expressions for modified search term

      if (modifiedSearchTerm) {
        if ([Fields.keywords, Fields.sys.filename, Fields.sys.uri].includes(wsf.fieldId)) {
          fieldOperators.push(...containsOp(wsf, modifiedSearchTerm));
        } else {
          if ([Fields.entryTitle].includes(wsf.fieldId)) {
            fieldOperators.push(contensisCoreApi.Op.or(...containsOp(wsf, modifiedSearchTerm), ...freeTextOp(wsf, modifiedSearchTerm)));
          } else {
            fieldOperators.push(...freeTextOp(wsf, modifiedSearchTerm));
          }
        }
      } // Add operator expressions for any quoted phrases


      quotedPhrases.forEach(qp => fieldOperators.push(...containsOp(wsf, qp))); // If we are using multiple operators for a field we will
      // wrap each field inside an And operator so we will match
      // all terms/phrases rather than any terms/phrases

      if (fieldOperators.length > 1) {
        operators.push(contensisCoreApi.Op.and(...fieldOperators));
      } else {
        operators.push(...fieldOperators);
      }
    }); // Wrap operators in an Or operator

    return [contensisCoreApi.Op.or().addRange(operators).add(contensisCoreApi.Op.freeText(Fields.searchContent, searchTerm))];
  } else if (searchTerm) {
    // Searching without weightedSearchFields defined will fall back
    // to a default set of search fields with arbritary weights set.
    return [contensisCoreApi.Op.or(contensisCoreApi.Op.equalTo(Fields.entryTitle, searchTerm).weight(10), contensisCoreApi.Op.freeText(Fields.entryTitle, searchTerm).weight(2), contensisCoreApi.Op.freeText(Fields.entryDescription, searchTerm).weight(2), contensisCoreApi.Op.contains(Fields.keywords, searchTerm).weight(2), contensisCoreApi.Op.contains(Fields.sys.uri, searchTerm).weight(2), contensisCoreApi.Op.contains(Fields.sys.allUris, searchTerm), contensisCoreApi.Op.freeText(Fields.searchContent, searchTerm))];
  } else {
    return [];
  }
};

var expressions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  fieldExpression: fieldExpression,
  contentTypeIdExpression: contentTypeIdExpression,
  filterExpressions: filterExpressions,
  dataFormatExpression: dataFormatExpression,
  featuredResultsExpression: featuredResultsExpression,
  languagesExpression: languagesExpression,
  includeInSearchExpressions: includeInSearchExpressions,
  defaultExpressions: defaultExpressions,
  includeIdsExpression: includeIdsExpression,
  excludeIdsExpression: excludeIdsExpression,
  orderByExpression: orderByExpression,
  customWhereExpressions: customWhereExpressions,
  termExpressions: termExpressions
});

const filterQuery = (contentTypeIds, versionStatus, customWhere) => {
  const query = new contensisCoreApi.Query(...[...contentTypeIdExpression(contentTypeIds), ...defaultExpressions(versionStatus), ...customWhereExpressions(customWhere)]);
  query.orderBy = contensisCoreApi.OrderBy.asc(Fields.entryTitle);
  query.pageSize = 100;
  return query;
};
const searchQuery = ({
  assetTypes,
  contentTypeIds,
  customWhere,
  dynamicOrderBy,
  excludeIds,
  featuredResults,
  fields,
  filters,
  includeInSearchFields,
  languages,
  pageSize,
  pageIndex,
  orderBy,
  searchTerm,
  versionStatus,
  webpageTemplates,
  weightedSearchFields
}, isFeatured = false) => {
  let expressions = [...termExpressions(searchTerm, weightedSearchFields), ...defaultExpressions(versionStatus), ...includeInSearchExpressions(webpageTemplates, includeInSearchFields), ...languagesExpression(languages), ...customWhereExpressions(customWhere), ...excludeIdsExpression(excludeIds)];
  if (isFeatured) expressions = [...expressions, ...featuredResultsExpression(featuredResults)];
  if (!isFeatured || featuredResults && !featuredResults.contentTypeId) expressions = [...expressions, ...filterExpressions(filters), ...contentTypeIdExpression(contentTypeIds, webpageTemplates, assetTypes)];
  const query = new contensisCoreApi.Query(...expressions);
  if (!searchTerm) query.orderBy = orderByExpression(orderBy);
  if (dynamicOrderBy && dynamicOrderBy.length) query.orderBy = orderByExpression(dynamicOrderBy);

  if (fields && fields.length > 0 && !isFeatured) {
    query.fields = fields;
  }

  query.pageIndex = isFeatured ? 0 : pageIndex;
  query.pageSize = isFeatured && typeof featuredResults.count === 'number' ? featuredResults.count : pageSize;
  return query;
};

var queries = /*#__PURE__*/Object.freeze({
  __proto__: null,
  filterQuery: filterQuery,
  searchQuery: searchQuery
});

const searchUriTemplate = {
  path: ({
    state,
    facet,
    pageIndex
  }) => {
    const currentFacet = getSearchContext(state) !== exports.Context.listings && (facet || getCurrentFacet(state));
    const currentPath = selectCurrentPath(state) || '/search';
    const newPath = currentFacet ? `${currentPath}/${currentFacet}` : currentPath;
    if (pageIndex) return `${newPath}/${pageIndex + 1}`;
    return newPath;
  },
  search: ({
    state,
    facet,
    orderBy,
    term
  }) => {
    const searchContext = getSearchContext(state); // Lose stateFilters and currentSearch if a new
    // term is passed via an argument

    const stateFilters = term ? {} : Object.fromEntries(Object.entries(getSelectedFilters(state, facet, searchContext, 'js')).map(([key, f]) => [key, f === null || f === void 0 ? void 0 : f.join(',')]));
    const currentSearch = !term && getImmutableOrJS(state, ['routing', 'location', 'search']);
    const currentQs = removeEmptyAttributes(queryString.parse(currentSearch));
    if (orderBy) currentQs.orderBy = orderBy;
    const searchTerm = getSearchTerm(state); // Merge the stateFilters with any current qs to build the new qs

    const mergedSearch = removeEmptyAttributes({ ...merge__default["default"](currentQs, stateFilters),
      term: searchTerm
    });
    return queryString.stringify(mergedSearch);
  },
  hash: state => getImmutableOrJS(state, ['routing', 'location', 'hash'], '').replace('#', '')
};

const mapStateToSearchUri = params => mapJson__default["default"](params, searchUriTemplate);

const mapEntriesToSearchResults = ({
  mappers,
  mapper,
  context,
  facet
}, items, state) => {
  const mapperFunc = mapper || mappers && mappers.results;
  return items && typeof mapperFunc === 'function' ? mapperFunc(items, facet, context, state) : [];
};

const facetTemplate = {
  type: () => SET_SEARCH_ENTRIES,
  context: 'action.context',
  facet: 'action.facet',
  mappers: 'action.mappers',
  nextFacet: {
    entries: {
      isLoading: () => false,
      isError: () => false
    },
    featuredEntries: {
      isLoading: () => false,
      isError: () => false
    },
    featuredResults: ({
      action,
      featuredResult,
      state
    }) => mapEntriesToSearchResults(action, getItemsFromResult(featuredResult), state),
    queryDuration: 'result.duration',
    pagingInfo: {
      isLoading: () => false,
      pageCount: {
        $path: 'result.payload.pageCount',
        $default: 0
      },
      totalCount: {
        $path: 'result.payload.totalCount',
        $default: 0
      },
      pageSize: {
        $path: 'result.payload.pageSize',
        $default: 0
      },
      pageIndex: 'pageIndex',
      pagesLoaded: {
        $path: 'action.queryParams',
        $formatting: ({
          pageIndex,
          pagesLoaded
        }) => {
          const loaded = [...(pagesLoaded || [])];

          if (isNaN(loaded.find(l => l === pageIndex))) {
            loaded.push(pageIndex);
          }

          return loaded.sort((a, b) => a - b);
        }
      },
      prevPageIndex: 'action.queryParams.prevPageIndex'
    },
    preloaded: {
      $path: 'preload',
      $default: false
    },
    results: ({
      action,
      pageIndex,
      result,
      prevResults,
      state
    }) => {
      const {
        loadMorePaging,
        pagesLoaded,
        prevPageIndex
      } = action.queryParams;
      const results = mapEntriesToSearchResults(action, getItemsFromResult(result), state);
      if (!loadMorePaging) return results; // add a _pageIndex property to the returned results to help us later

      const nextResults = results.map((r, idx) => ({
        _pageIndex: pageIndex,
        _pagePosition: idx,
        ...r
      }));
      const loadedPages = pagesLoaded || []; // if pageIndex is found in loadedPages, we have already loaded this page

      if (!isNaN(loadedPages.find(l => l === pageIndex))) return prevResults; // Determine where we put the results depending on if we
      // are paging forwards, backwards, or doing a new search

      const firstResultSet = pageIndex > prevPageIndex ? prevResults || [] : nextResults;
      const secondResultSet = pageIndex > prevPageIndex ? nextResults : prevResults || [];
      const onlyResultSet = loadedPages.length === 0 ? nextResults : false;
      return onlyResultSet || [...firstResultSet, ...secondResultSet];
    }
  },
  preload: 'action.preload',
  ogState: 'action.ogState',
  debug: 'action.debug'
};
const filterTemplate = {
  type: ({
    type
  }) => type || LOAD_FILTERS_COMPLETE,
  context: 'context',
  facetKey: 'facetKey',
  filterKey: 'filterKey',
  nextFilter: {
    isLoading: () => false,
    isError: ({
      type
    }) => type === LOAD_FILTERS_ERROR,
    items: ({
      payload,
      selectedKeys,
      mapper
    }) => {
      if (payload && (payload.items || payload.children)) {
        const items = (payload.items || payload.children).map(item => {
          var _item$sys;

          item.isSelected = selectedKeys === null || selectedKeys === void 0 ? void 0 : selectedKeys.includes((item === null || item === void 0 ? void 0 : (_item$sys = item.sys) === null || _item$sys === void 0 ? void 0 : _item$sys.id) || item.key);
          return item;
        });
        return mapper(items);
      }

      return [];
    }
  },
  error: {
    $path: 'error',
    $disable: e => !e
  }
};

const filterExpressionMapper = {
  // Expression type: so we can identify how to build the query
  expressionType: ({
    contentTypeId
  }) => contentTypeId ? FilterExpressionTypes.contentType : FilterExpressionTypes.field,
  // Key: so we can target the query to a specific field
  key: 'fieldId',
  // Value: so we can filter a specific field by an array of values
  // e.g. taxonomy key or contentTypeId array
  values: 'selectedValues',
  fieldOperator: 'fieldOperator',
  logicOperator: 'logicOperator'
};

const mapFilterToFilterExpression = filter => mapJson__default["default"](filter, filterExpressionMapper);

const mapFiltersToFilterExpression = (filters, selectedFilters) => {
  if (!selectedFilters || Object.keys(selectedFilters).length === 0) return [];
  const filterExpressions = []; // Iterate through the keys in selectedFilters and locate
  // the items that are selected and queryable

  Object.entries(selectedFilters).map(([fkey, selectedValues]) => {
    const filter = filters[fkey];

    if (selectedValues && filter) {
      // Where we have a value for a selectedFilter
      // and a filter is found for the current key
      // map the filter to a filterExpression object
      const expr = mapFilterToFilterExpression({ ...filter,
        selectedValues
      });
      filterExpressions.push(expr);
    }
  });
  return filterExpressions;
};

const queryParamsTemplate = {
  assetTypes: root => getQueryParameter(root, 'assetTypes', []),
  contentTypeIds: root => getQueryParameter(root, 'contentTypeIds', []),
  customWhere: root => getQueryParameter(root, 'customWhere', []),
  dynamicOrderBy: root => getQueryParameter(root, 'dynamicOrderBy', []),
  env: ({
    state,
    facet,
    context
  }) => getCustomEnv(state, facet, context),
  excludeIds: ({
    action: {
      excludeIds
    }
  }) => {
    // Exclude current route entry id from minilist searches or any supplied ids
    if (excludeIds) return Array.isArray(excludeIds) ? excludeIds : excludeIds.split(',').map(id => id.trim());
    return null;
  },
  featuredResults: root => getQueryParameter(root, 'featuredResults', null),
  fields: root => getQueryParameter(root, 'fields', []),
  filters: ({
    state,
    facet,
    context
  }) => {
    const stateFilters = getFilters(state, facet, context, 'js');
    const selectedFilters = getSelectedFilters(state, facet, context, 'js'); // Use another mapping function to map the filter parameters for the query

    const filterParams = mapFiltersToFilterExpression(stateFilters, selectedFilters);
    return filterParams;
  },
  includeInSearchFields: root => getQueryParameter(root, 'includeInSearch', []),
  internalPageIndex: ({
    action,
    state
  }) => getPageIndex(state, '', action.context),
  internalPaging: root => getQueryParameter(root, 'internalPaging', false),
  languages: ({
    action
  }) => action.defaultLang ? [action.defaultLang] : [],
  linkDepth: root => getQueryParameter(root, 'linkDepth', 0),
  loadMorePaging: root => getQueryParameter(root, 'loadMorePaging', false),
  orderBy: root => getQueryParameter(root, 'orderBy', []),
  pageIndex: root => {
    const {
      action,
      state
    } = root;
    if (getQueryParameter(root, 'internalPaging', false)) return 0;
    if (action.type === UPDATE_PAGE_INDEX) return action.params.pageIndex;
    return !action.preload ? getPageIndex(state, action.facet, action.context) : 0;
  },
  pageSize: root => getQueryParameter(root, 'pageSize'),
  pagesLoaded: ({
    state,
    facet,
    context
  }) => getPagesLoaded(state, facet, context),
  prevPageIndex: ({
    state,
    facet,
    context
  }) => getPrevPageIndex(state, facet, context),
  projectId: ({
    state,
    facet,
    context
  }) => {
    var _getFacet;

    return ((_getFacet = getFacet(state, facet, context)) === null || _getFacet === void 0 ? void 0 : _getFacet.projectId) || selectCurrentProject(state);
  },
  searchTerm: root => root.context !== exports.Context.minilist || getQueryParameter(root, 'useSearchTerm', false) ? getSearchTerm(root.state) : '',
  selectedFilters: ({
    state,
    facet,
    context
  }) => Object.fromEntries(Object.entries(getSelectedFilters(state, facet, context, 'js')).map(([key, f]) => [key, f === null || f === void 0 ? void 0 : f.join(',')])),
  versionStatus: ({
    state
  }) => selectVersionStatus(state),
  weightedSearchFields: root => {
    const wsf = getQueryParameter(root, 'weightedSearchFields', []);
    const deduped = wsf.filter((v, i, a) => a.findIndex(t => t.fieldId === v.fieldId) === i);
    return deduped; // return wsf;
  },
  webpageTemplates: root => getQueryParameter(root, 'webpageTemplates', [])
};

const mapStateToQueryParams = sourceJson => mapJson__default["default"](sourceJson, queryParamsTemplate);

/**
 * 1, Generates all the parameters required to run the search query.
 * 2, Tells us if we should run the search.
 * @param {object} action
 * @param {AppState} state
 * @returns [queryParams, runSearch]
 */
const generateQueryParams = (action, state) => {
  const {
    context,
    facet
  } = action; // Map parameters using state and some additional
  // inputs from the action

  const queryParams = mapStateToQueryParams({
    context,
    facet,
    action,
    state
  });
  return [queryParams, runSearch(action, state, queryParams)];
};
/**
 * Checks if we have already loaded everything we're asking for and tells us to run the search or not
 * @param action
 * @param state
 */

const runSearch = (action, state, queryParams) => {
  const {
    context,
    defaultLang,
    facet,
    ogState = state,
    preload,
    ssr
  } = action;
  let willRun = false;
  const facetIsLoaded = defaultLang ? false : getIsLoaded(state, context, facet);
  const stateParams = { ...getQueryParams(ogState, facet, context)
  };
  stateParams.pageIndex = getPageIndex(ogState, facet, context);
  stateParams.searchTerm = getSearchTerm(ogState);

  if (context === exports.Context.facets && ssr || // context === Context.minilist ||
  preload || !facetIsLoaded || filterParamsChanged(action) || defaultLang) {
    willRun = true;
  } else {
    // Don't execute the search if the inbound query params
    // are the same as what we already have in state
    Object.entries(stateParams).forEach(([param, value]) => {
      const queryParam = queryParams[param];

      if (JSON.stringify(value) !== JSON.stringify(queryParam)) {
        willRun = true;
      }
    });
  }

  const internalPaging = getIsInternalPaging(ogState, facet, context);

  if (internalPaging && facetIsLoaded) {
    willRun = false;
  }

  return willRun;
};
/**
 * This will tell us if filter parameters have been
 * changed by some external event such as a route change
 * @param action
 * @returns true or false
 */

const filterParamsChanged = (action, state) => {
  const {
    context,
    facet,
    params,
    ogState = state
  } = action;
  const selectedFilters = getSelectedFilters(ogState, facet, context, 'js');
  const paramsChanged = Object.entries(selectedFilters).map(([filterKey, selectedValues]) => {
    const inboundValues = params && params[filterKey] && params[filterKey].split(',') || [];
    if (!areArraysEqualSets(selectedValues, inboundValues)) return true;
  });
  return paramsChanged.filter(f => f === true).length > 0;
};
/* eslint-disable no-console */

const debugExecuteSearch = (action, state) => {
  const [queryParams, runSearch] = generateQueryParams(action, state);
  console.log('runSearch', runSearch, 'action', action, 'filterParamsChanged', filterParamsChanged(action, state), 'getIsLoaded(state, context, facet)', getIsLoaded(state, action.context, action.facet));
  const stateParams = { ...getQueryParams(action.ogState || state, action.facet, action.context),
    pageIndex: getPageIndex(action.ogState || state, action.facet, action.context),
    searchTerm: getSearchTerm(action.ogState || state)
  };
  console.log(stateParams, queryParams);
  console.log('getSelectedFilters', getSelectedFilters(action.ogState || state, action.facet, action.context, 'js'), 'params', action.params);
};

// Base mapping, fields that are the same across all mappings
// to save repeating these elements in every mapper, spread this
// into your discrete mappings

const base = {
  contentTypeId: Fields.sys.contentTypeId,
  title: 'entryTitle',
  key: 'sys.id',
  path: 'sys.slug',
  isSelected: 'isSelected'
};

const mapEntriesToFilterItems = entries => {
  if (!entries) return [];
  return entries.map(entry => {
    const template = base;

    if (template) {
      return mapJson__default["default"](entry, template);
    }

    return entry;
  });
};

const mapQueryParamsToCustomApi = queryParams => {
  const customApiMapping = {
    fields: ({
      fields
    }) => JSON.stringify(fields),
    orderBy: 'orderBy',
    linkDepth: 'linkDepth',
    pageSize: 'pageSize',
    pageIndex: 'pageIndex',
    term: {
      $path: 'searchTerm',
      $disable: t => !t
    },
    versionStatus: 'versionStatus'
  };
  Object.keys(queryParams.selectedFilters).forEach(k => {
    customApiMapping[k] = {
      $path: `selectedFilters.${k}`,
      $disable: f => !f
    };
  });
  return mapJson__default["default"](queryParams, customApiMapping);
};

const searchSagas = [effects.takeEvery(CLEAR_FILTERS, clearFilters), effects.takeEvery(DO_SEARCH, doSearch), effects.takeEvery(SET_ROUTE_FILTERS, loadFilters), effects.takeEvery(SET_SEARCH_ENTRIES, preloadOtherFacets), effects.takeEvery(UPDATE_CURRENT_FACET, updateCurrentFacet), effects.takeEvery(UPDATE_CURRENT_TAB, updateCurrentTab), effects.takeEvery(UPDATE_PAGE_INDEX, updatePageIndex), effects.takeEvery(UPDATE_SEARCH_TERM, updateSearchTerm), effects.takeEvery(UPDATE_SORT_ORDER, updateSortOrder), effects.takeEvery(UPDATE_SELECTED_FILTERS, applySearchFilter)];

const toJS = obj => obj && 'toJS' in obj && typeof obj.toJS === 'function' ? obj.toJS() : obj;

function* setRouteFilters(action) {
  const {
    mappers,
    params,
    listingType,
    defaultLang,
    debug
  } = action;
  const context = listingType ? exports.Context.listings : exports.Context.facets;
  const state = toJS(yield effects.select());
  const ssr = getIsSsr(state); // Get current facet from params or state

  let currentFacet = params && params.facet || listingType; // Pick the default facet from initialState

  if (!currentFacet) {
    var _Object$keys;

    const tabs = getSearchTabs(state, 'js');
    currentFacet = (tabs === null || tabs === void 0 ? void 0 : tabs[0].defaultFacet) || ((_Object$keys = Object.keys(getFacets(state, 'js'))) === null || _Object$keys === void 0 ? void 0 : _Object$keys[0]) || '';
  }

  const nextAction = {
    type: SET_ROUTE_FILTERS,
    context,
    facet: currentFacet,
    mappers,
    params,
    defaultLang,
    ssr,
    debug
  };
  yield effects.put(nextAction); // keep track of this state ref for comparing changes to params later

  const ogState = {
    search: state.search
  }; // Using call instead of triggering from the put
  // to allow this exported saga to continue during SSR

  yield effects.call(ensureSearch, { ...nextAction,
    ogState
  });
}
function* doSearch(action) {
  var _action$params;

  const state = toJS(yield effects.select());

  if (action.config) {
    // If the action contains a config object, we can add this to the
    // state at runtime
    yield effects.put({ ...action,
      type: APPLY_CONFIG
    });
  }

  const nextAction = { ...action,
    type: SET_SEARCH_FILTERS,
    ssr: getIsSsr(state),
    facet: action.facet || ((_action$params = action.params) === null || _action$params === void 0 ? void 0 : _action$params.facet)
  };

  if (nextAction.facet && (action.config || Object.keys(getFacet(state, nextAction.facet, action.context, 'js')).length > 0)) {
    yield effects.put(nextAction); // keep track of this state ref for comparing changes to params later

    const ogState = {
      search: state.search
    };
    yield effects.call(ensureSearch, { ...nextAction,
      ogState
    });
  }
}

function* loadFilters(action) {
  const {
    facet: facetKey,
    context,
    mappers = {}
  } = action;
  const filtersToLoad = yield effects.select(getFiltersToLoad, facetKey, context, 'js');

  if (filtersToLoad.length > 0) {
    yield effects.put({
      type: LOAD_FILTERS,
      filtersToLoad,
      facetKey,
      context
    });
    const selectedKeys = yield effects.select(getSelectedFilters, facetKey, context, 'js');
    const facet = yield effects.select(getFacet, facetKey, context, 'js');
    const filters = facet.filters || {};
    const projectId = facet.projectId;
    const filtersToLoadSagas = filters && filtersToLoad.map((filterKey = '') => {
      return effects.call(loadFilter, {
        facetKey,
        filterKey,
        filter: filters[filterKey],
        projectId,
        selectedKeys: selectedKeys[filterKey],
        context,
        mapper: 'filterItems' in mappers && mappers.filterItems || mapEntriesToFilterItems
      });
    });
    if (filtersToLoadSagas) yield effects.all(filtersToLoadSagas);
  }
}

function* loadFilter(action) {
  const {
    facetKey,
    filterKey,
    filter,
    projectId,
    selectedKeys,
    context,
    mapper
  } = action;
  const {
    contentTypeId,
    customWhere,
    path
  } = filter;
  const createStateFrom = {
    type: LOAD_FILTERS_COMPLETE,
    context,
    error: undefined,
    facetKey,
    filterKey,
    payload: {},
    selectedKeys,
    mapper
  };

  try {
    if (contentTypeId) {
      const versionStatus = yield effects.select(selectVersionStatus);
      const query = filterQuery(Array.isArray(contentTypeId) ? contentTypeId : [contentTypeId], versionStatus, customWhere);
      const payload = yield cachedSearch.search(query, 0, projectId);
      if (!payload) throw new Error('No payload returned by search');
      if (payload.type === 'error') throw payload;
      createStateFrom.payload = payload;
    }

    if (path) {
      const payload = yield cachedSearch.getTaxonomyNodeByPath(path, projectId);
      if (!payload) throw new Error(`No payload returned for taxonomy path: '${path}'`);
      if (payload.type === 'error') throw payload;
      createStateFrom.payload = payload;
    }
  } catch (error) {
    createStateFrom.type = LOAD_FILTERS_ERROR;
    createStateFrom.error = error;
  }

  const nextAction = mapJson__default["default"](createStateFrom, filterTemplate);
  yield effects.put(nextAction);
}

function* ensureSearch(action) {
  const {
    context,
    facet,
    debug
  } = action;

  try {
    const state = yield effects.select();
    const nextAction = { ...action,
      ogState: action.ogState || {
        search: state.search
      }
    };
    const [queryParams, runSearch] = generateQueryParams(nextAction, state);
    if (debug && (debug === true || debug.executeSearch)) debugExecuteSearch(nextAction, state);

    if (runSearch) {
      yield effects.put({
        type: EXECUTE_SEARCH,
        facet,
        context
      });
      yield effects.call(executeSearch, { ...nextAction,
        context,
        facet,
        queryParams,
        debug
      });
    }
  } catch (error) {
    // eslint-disable-next-line import/namespace
    log__namespace.error(...['Error running search saga:', error, error.stack]);
  }
}

function* executeSearch(action) {
  const {
    context,
    facet,
    queryParams,
    mappers
  } = action;

  try {
    const state = yield effects.select();
    let result = {};
    let featuredResult;
    let featuredQuery;
    const customApi = getCustomApi(state, facet, context, 'js');

    if (customApi) {
      const apiParams = typeof mappers === 'object' && typeof mappers.customApi === 'function' && mappers.customApi(queryParams) || mapQueryParamsToCustomApi(queryParams);
      result.payload = yield callCustomApi(customApi, apiParams);
      result.duration = 1;
    } else {
      if (queryParams.featuredResults) {
        featuredQuery = searchQuery(queryParams, true);
        featuredResult = yield timedSearch(featuredQuery, queryParams.linkDepth, queryParams.projectId, queryParams.env); // eslint-disable-next-line require-atomic-updates

        queryParams.excludeIds = getItemsFromResult(featuredResult).map(fi => {
          var _fi$sys;

          return fi === null || fi === void 0 ? void 0 : (_fi$sys = fi.sys) === null || _fi$sys === void 0 ? void 0 : _fi$sys.id;
        }).filter(fi => typeof fi === 'string');
      }

      const query = searchQuery(queryParams);
      result = yield timedSearch(query, queryParams.linkDepth, queryParams.projectId, queryParams.env);
    }

    const createStateFrom = {
      action,
      featuredResult,
      pageIndex: queryParams.internalPaging && queryParams.internalPageIndex || queryParams.pageIndex,
      prevResults: getResults(state, facet, action.context, 'js'),
      result,
      state
    };
    const nextAction = mapJson__default["default"](createStateFrom, facetTemplate);
    yield effects.put(nextAction);
  } catch (error) {
    // eslint-disable-next-line import/namespace
    log__namespace.error(...['Error running search saga:', error, error.stack]);
  }
}

function* preloadOtherFacets(action) {
  const {
    preload,
    context,
    facet,
    debug
  } = action;
  const state = yield effects.select();
  const currentFacet = getCurrentFacet(state);

  if (!preload && facet === currentFacet && context !== exports.Context.listings) {
    const allFacets = getFacets(state, 'js');
    const otherFacets = Object.keys(allFacets).filter(f => f !== currentFacet);
    yield effects.all(otherFacets.map((preloadFacet = '') => {
      const preloadAction = { ...action,
        facet: preloadFacet,
        preload: true
      };
      const [queryParams, runSearch] = generateQueryParams(preloadAction, state);
      if (debug && (debug === true || debug.preloadOtherFacets)) debugExecuteSearch(preloadAction, state);
      return runSearch && effects.call(executeSearch, { ...action,
        type: EXECUTE_SEARCH_PRELOAD,
        preload: true,
        facet: preloadFacet,
        queryParams
      });
    }));
  }
}

function* updateCurrentTab(action) {
  const {
    id,
    mappers
  } = action;
  const state = yield effects.select();
  const facets = getFacets(state, 'js');
  const tabs = getSearchTabs(state, 'js');
  let nextFacet = tabs === null || tabs === void 0 ? void 0 : tabs[id].currentFacet;

  if (!nextFacet) {
    Object.entries(facets).map(([facetName, facet]) => {
      if (facet.tabId === id && (tabs === null || tabs === void 0 ? void 0 : tabs[id].defaultFacet) === facetName) nextFacet = facetName;
    });
  } // If the next Tab does not have a defaultFacet,
  // take the first facet for that tab


  if (!nextFacet) nextFacet = Object.entries(facets).filter(([, f]) => f.tabId === id)[0][0];
  yield effects.put(withMappers(updateCurrentFacet$1(nextFacet), mappers));
}

function* clearFilters(action) {
  const {
    mappers
  } = action;
  const uri = yield buildUri({}, mappers);
  yield effects.put(navigate(uri));
}

function* updateCurrentFacet(action) {
  const {
    facet,
    mappers
  } = action;
  const pageIndex = yield effects.select(getPageIndex, facet);
  const uri = yield buildUri({
    facet,
    pageIndex
  }, mappers);
  yield effects.put(navigate(uri));
}

function* updateSearchTerm(action) {
  const {
    term,
    mappers
  } = action;
  const uri = yield buildUri({
    term
  }, mappers);
  yield effects.put(navigate(uri));
}

function* updateSortOrder(action) {
  const {
    orderBy,
    facet,
    mappers
  } = action;
  const uri = yield buildUri({
    orderBy,
    facet
  }, mappers);
  yield effects.put(navigate(uri));
}

function* updatePageIndex(action) {
  const {
    pageIndex,
    mappers
  } = action;
  const uri = yield buildUri({
    pageIndex
  }, mappers);
  yield effects.put(navigate(uri));
}

function* applySearchFilter(action) {
  const {
    mappers
  } = action;
  const uri = yield buildUri({}, mappers);
  yield effects.put(navigate(uri));
}

function* buildUri({
  facet,
  orderBy,
  pageIndex = 0,
  term
}, mappers) {
  const state = yield effects.select();
  const mapUri = (mappers === null || mappers === void 0 ? void 0 : mappers.navigate) || mapStateToSearchUri;
  const uri = mapUri({
    state,
    facet,
    orderBy,
    pageIndex,
    term
  }); // return uri;

  return `${uri.path}${uri.search && `?${uri.search}` || ''}${uri.hash && `#${uri.hash}` || ''}`;
}

exports.APPLY_CONFIG = APPLY_CONFIG;
exports.CLEAR_FILTERS = CLEAR_FILTERS;
exports.EXECUTE_SEARCH = EXECUTE_SEARCH;
exports.EXECUTE_SEARCH_ERROR = EXECUTE_SEARCH_ERROR;
exports.LOAD_FILTERS = LOAD_FILTERS;
exports.LOAD_FILTERS_COMPLETE = LOAD_FILTERS_COMPLETE;
exports.LOAD_FILTERS_ERROR = LOAD_FILTERS_ERROR;
exports.SET_ROUTE_FILTERS = SET_ROUTE_FILTERS;
exports.SET_SEARCH_ENTRIES = SET_SEARCH_ENTRIES;
exports.SET_SEARCH_FILTERS = SET_SEARCH_FILTERS;
exports.UPDATE_PAGE_INDEX = UPDATE_PAGE_INDEX;
exports.UPDATE_SEARCH_TERM = UPDATE_SEARCH_TERM;
exports.UPDATE_SELECTED_FILTERS = UPDATE_SELECTED_FILTERS;
exports.UPDATE_SORT_ORDER = UPDATE_SORT_ORDER;
exports.actions = actions;
exports.clearFilters = clearFilters$1;
exports.contentTypeIdExpression = contentTypeIdExpression;
exports.customWhereExpressions = customWhereExpressions;
exports.defaultExpressions = defaultExpressions;
exports.doSearch = doSearch;
exports.expressions = expressions;
exports.filterExpressions = filterExpressions;
exports.getCurrentFacet = getCurrentFacet;
exports.getCurrentTab = getCurrentTab;
exports.getFacet = getFacet;
exports.getFacetTitles = getFacetTitles;
exports.getFacetsTotalCount = getFacetsTotalCount;
exports.getFeaturedResults = getFeaturedResults;
exports.getFilters = getFilters;
exports.getIsLoading = getIsLoading;
exports.getPageIndex = getPageIndex;
exports.getPageIsLoading = getPageIsLoading;
exports.getPaging = getPaging;
exports.getQueryParameter = getQueryParameter;
exports.getRenderableFilters = getRenderableFilters;
exports.getResults = getResults;
exports.getSearchTerm = getSearchTerm;
exports.getSearchTotalCount = getSearchTotalCount;
exports.getSelectedFilters = getSelectedFilters;
exports.getTabFacets = getTabFacets;
exports.getTabsAndFacets = getTabsAndFacets;
exports.getTotalCount = getTotalCount;
exports.mapStateToSearchUri = mapStateToSearchUri;
exports.orderByExpression = orderByExpression;
exports.queries = queries;
exports.searchSagas = searchSagas;
exports.selectFacets = selectFacets;
exports.selectListing = selectListing;
exports.selectors = selectors;
exports.setRouteFilters = setRouteFilters;
exports.termExpressions = termExpressions;
exports.toArray = toArray;
exports.triggerSearch = triggerSearch;
exports.types = types;
exports.updateCurrentFacet = updateCurrentFacet$1;
exports.updateCurrentTab = updateCurrentTab$1;
exports.updatePageIndex = updatePageIndex$1;
exports.updateSearchTerm = updateSearchTerm$1;
exports.updateSelectedFilters = updateSelectedFilters;
exports.updateSortOrder = updateSortOrder$1;
exports.withMappers = withMappers;
//# sourceMappingURL=sagas-8cf21563.js.map
