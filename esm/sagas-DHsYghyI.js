import * as log from 'loglevel';
import { takeEvery, select, put, call, all } from '@redux-saga/core/effects';
import { Client } from 'contensis-delivery-api';
import { parse, stringify } from 'query-string';
import mapJson, { jpath } from 'jsonpath-mapper';
import { Op, OrderBy, Query } from 'contensis-core-api';
import merge from 'deepmerge';
import { c as commonjsGlobal, g as getDefaultExportFromCjs } from './_commonjsHelpers-BFTU3MAI.js';

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
const UPDATE_PAGE_SIZE = `${ACTION_PREFIX}UPDATE_PAGE_SIZE`;
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
  SET_SEARCH_ENTRIES: SET_SEARCH_ENTRIES,
  SET_SEARCH_FILTERS: SET_SEARCH_FILTERS,
  SET_SELECTED_FILTER: SET_SELECTED_FILTER,
  UPDATE_CURRENT_FACET: UPDATE_CURRENT_FACET,
  UPDATE_CURRENT_TAB: UPDATE_CURRENT_TAB,
  UPDATE_PAGE_INDEX: UPDATE_PAGE_INDEX,
  UPDATE_PAGE_SIZE: UPDATE_PAGE_SIZE,
  UPDATE_SEARCH_TERM: UPDATE_SEARCH_TERM,
  UPDATE_SELECTED_FILTERS: UPDATE_SELECTED_FILTERS,
  UPDATE_SORT_ORDER: UPDATE_SORT_ORDER
});

const withMappers = (action, mappers) => {
  return {
    ...action,
    mappers
  };
};
const triggerSearch = ({
  config,
  context,
  debug,
  defaultLang,
  excludeIds,
  facet,
  mapper,
  mappers,
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
    mappers,
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
const clearFilters$1 = filterKey => {
  return {
    type: CLEAR_FILTERS,
    filterKey
  };
};
const updatePageIndex$1 = (pageIndex, scrollToElement) => {
  return {
    type: UPDATE_PAGE_INDEX,
    pageIndex,
    scrollToElement
  };
};
const updatePageSize$1 = (pageSize, scrollToElement) => {
  return {
    type: UPDATE_PAGE_SIZE,
    pageSize,
    scrollToElement
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
const updateSelectedFilters = (filter, key, isUnknownItem = false, scrollToElement) => {
  return {
    type: UPDATE_SELECTED_FILTERS,
    filter,
    key,
    isUnknownItem,
    scrollToElement
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
  clearFilters: clearFilters$1,
  initListing: initListing,
  navigate: navigate,
  triggerSearch: triggerSearch,
  updateCurrentFacet: updateCurrentFacet$1,
  updateCurrentTab: updateCurrentTab$1,
  updatePageIndex: updatePageIndex$1,
  updatePageSize: updatePageSize$1,
  updateSearchTerm: updateSearchTerm$1,
  updateSelectedFilters: updateSelectedFilters,
  updateSortOrder: updateSortOrder$1,
  withMappers: withMappers
});

let Context = /*#__PURE__*/function (Context) {
  Context["facets"] = "facets";
  Context["listings"] = "listings";
  Context["minilist"] = "minilist";
  return Context;
}({});
// export type Context = 'facets' | 'listings' | 'minilist';

// Find a fromJS function from global that is dynamically loaded in createStore
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
    const result = jpath(stateKey.join('.'), state);
    if (typeof result === 'undefined') return fallbackValue;
    return result;
  }
  const result = state && typeof state === 'object' ? state[stateKey] : undefined;
  if (typeof result === 'undefined') return fallbackValue;
  return result;
};

const getSearchContext = state => getImmutableOrJS(state, ['search', 'context'], Context.facets);
const getCurrent = (state, context = Context.facets) => context === Context.facets ? getCurrentFacet(state) : getCurrentListing(state);
const getCurrentFacet = state => getImmutableOrJS(state, ['search', 'currentFacet']);
const getCurrentListing = state => getImmutableOrJS(state, ['search', 'currentListing']);
const getCurrentTab = state => getImmutableOrJS(state, ['search', Context.facets, getCurrentFacet(state), 'tabId'], 0);
const getFacets = (state, returnType) => getImmutableOrJS(state, ['search', Context.facets], {}, returnType);
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
const getFacet = (state, facetName = '', context = Context.facets, returnType) => {
  const currentFacet = facetName || getCurrentFacet(state);
  return getImmutableOrJS(state, ['search', context, currentFacet], {}, returnType);
};
const getListing = (state, listing = '') => {
  const currentListing = listing || getCurrentListing(state);
  return getImmutableOrJS(state, ['search', Context.listings, currentListing], {});
};
const getFilters = (state, facet, context = Context.facets, returnType) => {
  return getImmutableOrJS(state, ['search', context, facet || getCurrent(state, context), 'filters'], {}, returnType);
};
const getRenderableFilters = (state, facet = '', context = Context.facets) => Object.fromEntries(Object.entries(getFilters(state, facet, context, 'js')).filter(([, f = {}]) => typeof f.renderable !== 'boolean' ? true : f.renderable));
const getFiltersToLoad = (state, facet, context = Context.facets, returnType) => {
  const filters = getFilters(state, facet, context, returnType);
  const loadedFilters = Object.entries(filters).map(([key, f = {}]) => [key, (f.items || []).filter(i => {
    const title = i === null || i === void 0 ? void 0 : i.title;
    return typeof title !== 'undefined' && !!title;
  }).length > 0 && (f.isError || false) === false]);
  return loadedFilters.map(([filterKey, isLoaded]) => !isLoaded ? filterKey : null).filter(f => !!f);
};

// We lowercase the filter key unless it's an ISO date string where the T must be uppercase
const getSelectedFilters = (state, facet = '', context = Context.facets, returnType) => {
  const filters = getFilters(state, facet, context, 'js');
  const selectedFilters = Object.fromEntries(Object.entries(filters).map(([key, filter = {}]) => [key, (filter.items || []).filter(item => !!(item.isSelected || false)).map(item => {
    const key = (item === null || item === void 0 ? void 0 : item.key) || '';
    return key;
  })]));
  const fromJS = makeFromJS(returnType);
  return fromJS(selectedFilters);
};
const getResults = (state, current = '', context = Context.facets, returnType) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'results'], [], returnType);
};
const getIsInternalPaging = (state, current, context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'queryParams', 'internalPaging'], false);
};
const getIsLoaded = (state, context = Context.facets, facet) => {
  return !!getImmutableOrJS(state, ['search', context, facet || getCurrent(state, context), 'queryDuration'], 0);
};
const getIsLoading = (state, context = Context.facets, facet) => {
  return getImmutableOrJS(state, ['search', context, facet || getCurrent(state, context), 'entries', 'isLoading']);
};
const getIsSsr = state => getImmutableOrJS(state, ['search', 'config', 'ssr'], false);
const getFeaturedResults = (state, current = '', context = Context.facets, returnType) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'featuredResults'], [], returnType);
};
const getPaging = (state, current = '', context = Context.facets, returnType) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo'], {}, returnType);
};
const getPageIndex = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'pageIndex']);
};
const getPageSize = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'pageSize'], 0 // Defaults to 0 because we want it to fall back to a query param if not defined
  );
};
const getPrevPageIndex = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'prevPageIndex']);
};
const getPageIsLoading = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'isLoading']);
};
const getPagesLoaded = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'pagesLoaded'], [], 'js');
};
const getTotalCount = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'totalCount']);
};
const getSearchTerm = state => getImmutableOrJS(state, ['search', 'term']);
const getSearchTabs = (state, returnType) => getImmutableOrJS(state, ['search', 'tabs'], [], returnType);
const getQueryParams = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'queryParams'], {}, 'js');
};
const getQueryParameter = ({
  state,
  facet,
  context = Context.facets
}, key, ifnull = null) => {
  return getImmutableOrJS(getQueryParams(state, facet, context), key, ifnull, 'js');
};
const getCustomApi = (state, current, context = Context.facets, returnType) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'customApi'], null, returnType);
};
const getCustomEnv = (state, current, context = Context.facets) => {
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
    return {
      ...tab,
      [Context.facets]: Object.fromEntries(thisTabFacets),
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
};

// An exported copy of the relevant selectors scoped by default to a facets context
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
  getQueryParams: (state, facet) => getQueryParams(state, facet, Context.facets),
  getQueryParameter: ({
    state,
    facet
  }, key, ifnull) => getQueryParameter({
    state,
    facet,
    context: Context.facets
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
};

// An exported copy of the relevant selectors pre-scoped to a listing context
const selectListing = {
  getCurrent: getCurrentListing,
  getFeaturedResults: (state, listing = '') => getFeaturedResults(state, listing, Context.listings, 'js'),
  getFilters: (state, listing = '') => getFilters(state, listing, Context.listings, 'js'),
  getFiltersToLoad: (state, listing = '') => getFiltersToLoad(state, listing, Context.listings),
  getListing,
  getIsLoaded: state => getIsLoaded(state, Context.listings),
  getIsLoading: state => getIsLoading(state, Context.listings),
  getPageIndex: (state, listing = '') => getPageIndex(state, listing, Context.listings),
  getPaging: (state, listing = '') => getPaging(state, listing, Context.listings, 'js'),
  getPageIsLoading: (state, listing = '') => getPageIsLoading(state, listing, Context.listings),
  getPagesLoaded: (state, listing = '') => getPagesLoaded(state, listing, Context.listings),
  getQueryParams: (state, listing = '') => getQueryParams(state, listing, Context.listings),
  getQueryParameter: ({
    state,
    facet
  }, key, ifnull) => getQueryParameter({
    state,
    facet,
    context: Context.listings
  }, key, ifnull),
  getRenderableFilters: (state, listing = '') => getRenderableFilters(state, listing, Context.listings),
  getResults: (state, listing = '') => getResults(state, listing, Context.listings, 'js'),
  getSearchTerm,
  getTotalCount: (state, listing = '') => getTotalCount(state, listing, Context.listings),
  getSelectedFilters: (state, listing = '') => getSelectedFilters(state, listing, Context.listings, 'js')
};
const selectCurrentPath = state => getImmutableOrJS(state, ['routing', 'currentPath']);
const selectCurrentProject = state => getImmutableOrJS(state, ['routing', 'currentProject']);
const selectVersionStatus = state => getImmutableOrJS(state, ['version', 'contensisVersionStatus']);

var selectors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getCurrent: getCurrent,
  getCurrentFacet: getCurrentFacet,
  getCurrentListing: getCurrentListing,
  getCurrentTab: getCurrentTab,
  getCustomApi: getCustomApi,
  getCustomEnv: getCustomEnv,
  getFacet: getFacet,
  getFacetTitles: getFacetTitles,
  getFacets: getFacets,
  getFacetsTotalCount: getFacetsTotalCount,
  getFeaturedResults: getFeaturedResults,
  getFilters: getFilters,
  getFiltersToLoad: getFiltersToLoad,
  getIsInternalPaging: getIsInternalPaging,
  getIsLoaded: getIsLoaded,
  getIsLoading: getIsLoading,
  getIsSsr: getIsSsr,
  getListing: getListing,
  getPageIndex: getPageIndex,
  getPageIsLoading: getPageIsLoading,
  getPageSize: getPageSize,
  getPagesLoaded: getPagesLoaded,
  getPaging: getPaging,
  getPrevPageIndex: getPrevPageIndex,
  getQueryParameter: getQueryParameter,
  getQueryParams: getQueryParams,
  getRenderableFilters: getRenderableFilters,
  getResults: getResults,
  getSearchContext: getSearchContext,
  getSearchTabs: getSearchTabs,
  getSearchTerm: getSearchTerm,
  getSearchTotalCount: getSearchTotalCount,
  getSelectedFilters: getSelectedFilters,
  getTabFacets: getTabFacets,
  getTabsAndFacets: getTabsAndFacets,
  getTotalCount: getTotalCount,
  selectCurrentPath: selectCurrentPath,
  selectCurrentProject: selectCurrentProject,
  selectFacets: selectFacets,
  selectListing: selectListing,
  selectVersionStatus: selectVersionStatus
});

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

const searchUriTemplate = {
  path: ({
    state,
    facet
  }) => {
    const context = getSearchContext(state);
    const currentPath = selectCurrentPath(state) || '/search';
    if (context !== 'listings') {
      const currentFacet = facet || getCurrentFacet(state);
      const filters = getSelectedFilters(state, facet, context);
      const currentFilter = filters.contentTypeId;

      // Check if we have a filter first
      const newPath = (currentFilter === null || currentFilter === void 0 ? void 0 : currentFilter.length) > 0 && currentFacet ? `${currentPath}/${currentFacet}/${currentFilter}` : currentFacet ? `${currentPath}/${currentFacet}` : currentPath;
      return newPath;
    } else {
      return currentPath;
    }
  },
  search: ({
    state,
    facet,
    orderBy,
    term,
    pageIndex,
    pageSize
  }) => {
    const searchContext = getSearchContext(state);
    // Lose stateFilters and currentSearch if a new
    // term is passed via an argument
    const stateFilters = term ? {} : Object.fromEntries(Object.entries(getSelectedFilters(state, facet, searchContext, 'js')).map(([k, f]) => [k, f === null || f === void 0 ? void 0 : f.join(',')]));
    const currentSearch = !term && getImmutableOrJS(state, ['routing', 'location', 'search']);
    const currentQs = removeEmptyAttributes(parse(currentSearch));
    if (orderBy) currentQs.orderBy = orderBy;
    const searchTerm = getSearchTerm(state);
    // Use Immutable's merge to merge the stateFilters with any current Qs
    // to build the new Qs.
    const mergedSearch = removeEmptyAttributes(merge(currentQs, stateFilters));

    // We must handle term === '' separately, because this means the user has cleared the search term
    // If this is true, we don't want to fall back to the existing search term. We only want to do that if the
    // incoming term is explicitly undefined.
    if (typeof term != 'undefined') {
      if (term) mergedSearch.term = term;else if (term === '') delete mergedSearch.term;
    } else {
      if (searchTerm) mergedSearch.term = searchTerm;
    }
    if (pageIndex) mergedSearch.pageIndex = pageIndex + 1;
    if (pageIndex === 0) mergedSearch.pageIndex = undefined;
    if (pageSize) mergedSearch.pageSize = pageSize;

    // We don't want these as search params in the url, we just need the search package to see them
    return stringify(mergedSearch);
  },
  hash: ({
    state
  }) => getImmutableOrJS(state, ['routing', 'location', 'hash'], '').replace('#', '')
};
const mapStateToSearchUri = state => mapJson(state, searchUriTemplate);

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

const fieldExpression = (field, value, operator = 'equalTo', weight, fuzzySearch = false) => {
  if (!field || !value || Array.isArray(value) && value.length === 0) return [];
  if (Array.isArray(field))
    // If an array of fieldIds have been provided, call self for each fieldId
    // to generate expressions that are combined with an 'or' operator
    return [Op.or(...field.map(fieldId => fieldExpression(fieldId, value, operator, weight, fuzzySearch)).flat())];
  if (operator === 'between') return between(field, value);
  if (Array.isArray(value)) return equalToOrIn(field, value, operator, fuzzySearch);else return !weight ? equalToOrIn(field, value, operator, fuzzySearch) : [equalToOrIn(field, value, operator, fuzzySearch)[0].weight(weight)];
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
  if (expressions.length > 1) return [Op.or(...expressions)];
  return expressions;
};
const filterExpressions = (filters, isOptional = false) => {
  if (!filters) return [];
  const expressions = [];
  filters.map(selectedFilter => {
    if (selectedFilter.logicOperator === 'and')
      // using 'and' logic operator we loop through each filter
      // and loop through all values to add an expression for each filter value
      selectedFilter.values.forEach(value => expressions.push(...fieldExpression(selectedFilter.key, value, selectedFilter.fieldOperator || 'equalTo')));else if (selectedFilter.logicOperator === 'not') {
      const fieldExpressions = fieldExpression(selectedFilter.key, selectedFilter.values, selectedFilter.fieldOperator || 'in');
      fieldExpressions.forEach(expr => {
        expressions.push(Op.not(expr));
      });
    }
    // using 'or' logic operator we loop over each filter
    // and simply add the array of values to an expression with an 'in' operator
    else expressions.push(...fieldExpression(selectedFilter.key, selectedFilter.values, selectedFilter.fieldOperator || 'in'));
    if (isOptional) expressions.push(Op.not(fieldExpression(selectedFilter.key, true, 'exists')[0]));
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
    const andExpr = Op.and();
    const dataFormatExpr = fieldExpression(Fields.sys.dataFormat, dataFormat)[0];
    const withExpr = fieldExpression(Fields.sys.contentTypeId, withContentTypeIds)[0];
    const notExpr = Op.not(fieldExpression(Fields.sys.contentTypeId, notContentTypeIds)[0]);
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
  const expressions = [];
  // Or include this expression if we have explicity specified non-default includeInSearch fields
  if (Array.isArray(includeInSearchFields)) expressions.push(...includeInSearchFields.map(includeInSearchField => Op.or(Op.and(Op.exists(includeInSearchField, true), Op.equalTo(includeInSearchField, true)), Op.exists(includeInSearchField, false))));

  // If webpageTemplates have been specified, include this expression
  // with the default includeInSearch field from classic Contensis.
  if (Array.isArray(webpageTemplates) && webpageTemplates.length > 0) expressions.push(Op.or(Op.and(Op.exists(Fields.sys.includeInSearch, true), Op.equalTo(Fields.sys.includeInSearch, true)), Op.exists(Fields.sys.includeInSearch, false)));
  return expressions;
};
const defaultExpressions = versionStatus => {
  return [Op.equalTo(Fields.sys.versionStatus, versionStatus)];
};
const includeIdsExpression = includeIds => {
  if (Array.isArray(includeIds) && includeIds.length > 0) {
    return fieldExpression(Fields.sys.id, includeIds);
  } else return [];
};
const excludeIdsExpression = excludeIds => {
  if (Array.isArray(excludeIds) && excludeIds.length > 0) {
    const [expr] = fieldExpression(Fields.sys.id, excludeIds);
    return [Op.not(expr)];
  } else return [];
};
const orderByExpression = orderBy => {
  let expression;
  if (orderBy && orderBy.length > 0) {
    expression = OrderBy;
    for (const ob of orderBy) {
      var _expression, _expression2;
      expression = ob.startsWith('-') ? (_expression = expression) === null || _expression === void 0 ? void 0 : _expression.desc(ob.substring(1)) : (_expression2 = expression) === null || _expression2 === void 0 ? void 0 : _expression2.asc(ob);
    }
  }
  return expression;
};
const equalToOrIn = (field, value, operator = 'equalTo', fuzzySearch = false) => {
  if (value.length === 0) return [];
  if (Array.isArray(value)) {
    if (operator === 'equalTo' || operator === 'in') return [Op.in(field, ...value)];
    const expressions = value.map(innerValue => {
      var _between, _distanceWithin;
      switch (operator) {
        case 'between':
          return (_between = between(field, innerValue)) === null || _between === void 0 ? void 0 : _between[0];
        case 'distanceWithin':
          return (_distanceWithin = distanceWithin(field, innerValue)) === null || _distanceWithin === void 0 ? void 0 : _distanceWithin[0];
        case 'exists':
          return Op.exists(field, innerValue);
        case 'freeText':
          // TODO: Potentially needs further implementation of new options
          return Op[operator](field, innerValue, fuzzySearch, undefined);
        default:
          return Op[operator](field, innerValue);
      }
    });
    return (expressions === null || expressions === void 0 ? void 0 : expressions.length) > 1 ? [Op.or(...expressions)] : expressions || [];
  }
  switch (operator) {
    case 'between':
      return between(field, value);
    case 'distanceWithin':
      return distanceWithin(field, value);
    case 'freeText':
      // TODO: Potentially needs further implementation of new options
      return [Op.freeText(field, value, fuzzySearch, undefined)];
    default:
      return [Op[operator](field, value)];
  }
};
const between = (field, value) => {
  const handle = betweenValue => {
    const valArr = betweenValue.split('--');
    if (valArr.length > 1) {
      const [minimum, maximum] = valArr;
      return Op.between(field, minimum, maximum);
    } else {
      // eslint-disable-next-line no-console
      console.log(`[search] You have supplied only one value to a "between" operator which must have two values. Your supplied value "${valArr.length && valArr[0]}" has been discarded.`);
      return false;
    }
  };
  if (value.length === 0) return [];
  if (Array.isArray(value)) return [Op.or(...value.map(handle).filter(bc => bc !== false))];
  const op = handle(value);
  return op ? [op] : [];
};
const distanceWithin = (field, value) => {
  const handle = distanceValue => {
    const valArr = distanceValue.split(' ');
    if (valArr.length > 1) {
      const [lat, lon] = valArr;
      return Op.distanceWithin(field, Number(lat), Number(lon), (valArr === null || valArr === void 0 ? void 0 : valArr[2]) || '10mi');
    } else {
      // eslint-disable-next-line no-console
      console.log(`[search] You have supplied only one value to a "distanceWithin" operator which must be made up of "lat,lon,distance". Your supplied value "${valArr.length && valArr[0]}" has been discarded.`);
      return false;
    }
  };
  if (value.length === 0) return [];
  if (Array.isArray(value)) return [Op.or(...value.map(handle).filter(bc => bc !== false))];
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
  if (!where || !Array.isArray(where)) return [];

  // Map each clause inside the where array
  return where.map(clause => {
    let expression;
    // Map through each property in the clause so we can
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
          expression = Op[operator](...recurseExpr);
        }
        if (['not'].includes(operator)) {
          // A 'not' expression is an object with only one inner field and inner operator
          Object.keys(value).map((notKey, notIdx) => {
            const innerOperator = notKey;
            const innerValue = value[notKey];
            const innerField = value.field;
            // Map the expression when we've looped and scoped to
            // the second property inside the clause
            if (notIdx === 1) expression = Op.not(makeJsExpression(innerOperator, innerField, innerValue));
          });
        }
      }
      // Map the expression when we've looped and scoped to
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
const makeJsExpression = (operator, field, value) => operator === 'freeText' || operator === 'contains' ? Op[operator](field, value) : operator === 'in' ? Op[operator](field, ...value) : operator === 'exists' ? Op[operator](field, value) : operator === 'between' ? Op[operator](field, value[0], value[1]) : operator === 'distanceWithin' ? Op[operator](field, value === null || value === void 0 ? void 0 : value.lat, value === null || value === void 0 ? void 0 : value.lon, value === null || value === void 0 ? void 0 : value.distance) : Op[operator](field, value);
const termExpressions = (searchTerm, weightedSearchFields, fuzzySearch, omitSearchFields = []) => {
  if (searchTerm && weightedSearchFields && weightedSearchFields.length > 0) {
    // Extract any phrases in quotes to array
    const quotedPhrases = extractQuotedPhrases(searchTerm);

    // Modify the search term to remove any quoted phrases to leave any remaining terms
    let modifiedSearchTerm = searchTerm;
    quotedPhrases.forEach(qp => modifiedSearchTerm = modifiedSearchTerm.replace(qp, '').replace('""', '').trim());

    // Push to the operators array to include in the query
    const operators = [];

    // Helper functions to generate Op expressions
    const containsOp = (f, term) => fieldExpression(f.fieldId, fixFreeTextForElastic(term), 'contains', f.weight);
    const freeTextOp = (f, term) => fieldExpression(f.fieldId, fixFreeTextForElastic(term), 'freeText', f.weight, fuzzySearch);

    // For each weighted search field
    weightedSearchFields.forEach(wsf => {
      // Push to field operators
      const fieldOperators = [];

      // Add operator expressions for modified search term
      if (modifiedSearchTerm) {
        if ([Fields.keywords, Fields.sys.filename, Fields.sys.uri].includes(wsf.fieldId)) {
          fieldOperators.push(...containsOp(wsf, modifiedSearchTerm));
        } else {
          if ([Fields.entryTitle].includes(wsf.fieldId)) {
            fieldOperators.push(Op.or(...containsOp(wsf, modifiedSearchTerm), ...freeTextOp(wsf, modifiedSearchTerm)));
          } else {
            fieldOperators.push(...freeTextOp(wsf, modifiedSearchTerm));
          }
        }
      }

      // Add operator expressions for any quoted phrases
      quotedPhrases.forEach(qp => fieldOperators.push(...containsOp(wsf, qp)));

      // If we are using multiple operators for a field we will
      // wrap each field inside an And operator so we will match
      // all terms/phrases rather than any terms/phrases
      if (fieldOperators.length > 1) {
        operators.push(Op.and(...fieldOperators));
      } else {
        operators.push(...fieldOperators);
      }
    });

    // Wrap operators in an Or operator
    const expressions = Op.or().addRange(operators);
    if (!omitSearchFields.find(sf => sf === Fields.searchContent))
      // include "searchContent" field by default unless omitted
      return [expressions.add(Op.freeText(Fields.searchContent, searchTerm, fuzzySearch))];else return [expressions];
  } else if (searchTerm) {
    // Searching without weightedSearchFields defined will fall back
    // to a default set of search fields with arbritary weights set.

    const exp = [];
    if (!omitSearchFields.find(sf => sf === Fields.entryTitle)) {
      exp.push(Op.equalTo(Fields.entryTitle, searchTerm).weight(10));
      exp.push(Op.freeText(Fields.entryTitle, searchTerm, fuzzySearch).weight(2));
    }
    if (!omitSearchFields.find(sf => sf === Fields.entryDescription)) exp.push(Op.freeText(Fields.entryDescription, searchTerm, fuzzySearch).weight(2));
    if (!omitSearchFields.find(sf => sf === Fields.keywords)) exp.push(Op.contains(Fields.keywords, searchTerm).weight(2));
    if (!omitSearchFields.find(sf => sf === Fields.sys.uri)) exp.push(Op.contains(Fields.sys.uri, searchTerm).weight(2));
    if (!omitSearchFields.find(sf => sf === Fields.sys.allUris)) exp.push(Op.contains(Fields.sys.allUris, searchTerm));
    if (!omitSearchFields.find(sf => sf === Fields.searchContent)) exp.push(Op.freeText(Fields.searchContent, searchTerm, fuzzySearch));
    return [Op.or(...exp)];
  } else {
    return [];
  }
};

var expressions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  contentTypeIdExpression: contentTypeIdExpression,
  customWhereExpressions: customWhereExpressions,
  dataFormatExpression: dataFormatExpression,
  defaultExpressions: defaultExpressions,
  excludeIdsExpression: excludeIdsExpression,
  featuredResultsExpression: featuredResultsExpression,
  fieldExpression: fieldExpression,
  filterExpressions: filterExpressions,
  includeIdsExpression: includeIdsExpression,
  includeInSearchExpressions: includeInSearchExpressions,
  languagesExpression: languagesExpression,
  orderByExpression: orderByExpression,
  termExpressions: termExpressions
});

const filterQuery = (contentTypeIds, versionStatus, customWhere) => {
  const query = new Query(...[...contentTypeIdExpression(contentTypeIds), ...defaultExpressions(versionStatus), ...customWhereExpressions(customWhere)]);
  query.orderBy = OrderBy.asc(Fields.entryTitle);
  query.pageSize = 100;
  return query;
};
const searchQuery = ({
  aggregations,
  assetTypes,
  contentTypeIds,
  customWhere,
  dynamicOrderBy,
  excludeIds,
  featuredResults,
  fieldLinkDepths,
  fields,
  filters,
  fuzzySearch,
  includeInSearchFields,
  languages,
  pageSize,
  pageIndex,
  omitDefaultSearchFields,
  orderBy,
  searchTerm,
  versionStatus,
  webpageTemplates,
  weightedSearchFields
}, isFeatured = false) => {
  let expressions = [...termExpressions(searchTerm, weightedSearchFields, fuzzySearch, omitDefaultSearchFields), ...defaultExpressions(versionStatus), ...includeInSearchExpressions(webpageTemplates, includeInSearchFields), ...languagesExpression(languages), ...customWhereExpressions(customWhere), ...excludeIdsExpression(excludeIds)];
  if (isFeatured) expressions = [...expressions, ...featuredResultsExpression(featuredResults)];
  if (!isFeatured || featuredResults && !featuredResults.contentTypeId) expressions = [...expressions, ...filterExpressions(filters), ...contentTypeIdExpression(contentTypeIds, webpageTemplates, assetTypes)];
  const query = new Query(...expressions);
  if (!searchTerm) query.orderBy = orderByExpression(orderBy);
  if (dynamicOrderBy && dynamicOrderBy.length) query.orderBy = orderByExpression(dynamicOrderBy);
  if (Object.keys(fieldLinkDepths || {}).length && !isFeatured) query.fieldLinkDepths = fieldLinkDepths;
  if (fields !== null && fields !== void 0 && fields.length && !isFeatured) query.fields = fields;
  if (Object.keys(aggregations || {}).length && !isFeatured) query.aggregations = aggregations;
  query.pageIndex = isFeatured ? 0 : pageIndex;
  query.pageSize = isFeatured && typeof featuredResults.count === 'number' ? featuredResults.count : pageSize;
  return query;
};

var queries = /*#__PURE__*/Object.freeze({
  __proto__: null,
  filterQuery: filterQuery,
  searchQuery: searchQuery
});

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

var _listCacheClear;
var hasRequired_listCacheClear;

function require_listCacheClear () {
	if (hasRequired_listCacheClear) return _listCacheClear;
	hasRequired_listCacheClear = 1;
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	_listCacheClear = listCacheClear;
	return _listCacheClear;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

var eq_1;
var hasRequiredEq;

function requireEq () {
	if (hasRequiredEq) return eq_1;
	hasRequiredEq = 1;
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	eq_1 = eq;
	return eq_1;
}

var _assocIndexOf;
var hasRequired_assocIndexOf;

function require_assocIndexOf () {
	if (hasRequired_assocIndexOf) return _assocIndexOf;
	hasRequired_assocIndexOf = 1;
	var eq = requireEq();

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	_assocIndexOf = assocIndexOf;
	return _assocIndexOf;
}

var _listCacheDelete;
var hasRequired_listCacheDelete;

function require_listCacheDelete () {
	if (hasRequired_listCacheDelete) return _listCacheDelete;
	hasRequired_listCacheDelete = 1;
	var assocIndexOf = require_assocIndexOf();

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	_listCacheDelete = listCacheDelete;
	return _listCacheDelete;
}

var _listCacheGet;
var hasRequired_listCacheGet;

function require_listCacheGet () {
	if (hasRequired_listCacheGet) return _listCacheGet;
	hasRequired_listCacheGet = 1;
	var assocIndexOf = require_assocIndexOf();

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	_listCacheGet = listCacheGet;
	return _listCacheGet;
}

var _listCacheHas;
var hasRequired_listCacheHas;

function require_listCacheHas () {
	if (hasRequired_listCacheHas) return _listCacheHas;
	hasRequired_listCacheHas = 1;
	var assocIndexOf = require_assocIndexOf();

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	_listCacheHas = listCacheHas;
	return _listCacheHas;
}

var _listCacheSet;
var hasRequired_listCacheSet;

function require_listCacheSet () {
	if (hasRequired_listCacheSet) return _listCacheSet;
	hasRequired_listCacheSet = 1;
	var assocIndexOf = require_assocIndexOf();

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	_listCacheSet = listCacheSet;
	return _listCacheSet;
}

var _ListCache;
var hasRequired_ListCache;

function require_ListCache () {
	if (hasRequired_ListCache) return _ListCache;
	hasRequired_ListCache = 1;
	var listCacheClear = require_listCacheClear(),
	    listCacheDelete = require_listCacheDelete(),
	    listCacheGet = require_listCacheGet(),
	    listCacheHas = require_listCacheHas(),
	    listCacheSet = require_listCacheSet();

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	_ListCache = ListCache;
	return _ListCache;
}

var _stackClear;
var hasRequired_stackClear;

function require_stackClear () {
	if (hasRequired_stackClear) return _stackClear;
	hasRequired_stackClear = 1;
	var ListCache = require_ListCache();

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	_stackClear = stackClear;
	return _stackClear;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

var _stackDelete;
var hasRequired_stackDelete;

function require_stackDelete () {
	if (hasRequired_stackDelete) return _stackDelete;
	hasRequired_stackDelete = 1;
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	_stackDelete = stackDelete;
	return _stackDelete;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

var _stackGet;
var hasRequired_stackGet;

function require_stackGet () {
	if (hasRequired_stackGet) return _stackGet;
	hasRequired_stackGet = 1;
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	_stackGet = stackGet;
	return _stackGet;
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

var _stackHas;
var hasRequired_stackHas;

function require_stackHas () {
	if (hasRequired_stackHas) return _stackHas;
	hasRequired_stackHas = 1;
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	_stackHas = stackHas;
	return _stackHas;
}

/** Detect free variable `global` from Node.js. */

var _freeGlobal;
var hasRequired_freeGlobal;

function require_freeGlobal () {
	if (hasRequired_freeGlobal) return _freeGlobal;
	hasRequired_freeGlobal = 1;
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	_freeGlobal = freeGlobal;
	return _freeGlobal;
}

var _root;
var hasRequired_root;

function require_root () {
	if (hasRequired_root) return _root;
	hasRequired_root = 1;
	var freeGlobal = require_freeGlobal();

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	_root = root;
	return _root;
}

var _Symbol;
var hasRequired_Symbol;

function require_Symbol () {
	if (hasRequired_Symbol) return _Symbol;
	hasRequired_Symbol = 1;
	var root = require_root();

	/** Built-in value references. */
	var Symbol = root.Symbol;

	_Symbol = Symbol;
	return _Symbol;
}

var _getRawTag;
var hasRequired_getRawTag;

function require_getRawTag () {
	if (hasRequired_getRawTag) return _getRawTag;
	hasRequired_getRawTag = 1;
	var Symbol = require_Symbol();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	_getRawTag = getRawTag;
	return _getRawTag;
}

/** Used for built-in method references. */

var _objectToString;
var hasRequired_objectToString;

function require_objectToString () {
	if (hasRequired_objectToString) return _objectToString;
	hasRequired_objectToString = 1;
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	_objectToString = objectToString;
	return _objectToString;
}

var _baseGetTag;
var hasRequired_baseGetTag;

function require_baseGetTag () {
	if (hasRequired_baseGetTag) return _baseGetTag;
	hasRequired_baseGetTag = 1;
	var Symbol = require_Symbol(),
	    getRawTag = require_getRawTag(),
	    objectToString = require_objectToString();

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	_baseGetTag = baseGetTag;
	return _baseGetTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

var isObject_1;
var hasRequiredIsObject;

function requireIsObject () {
	if (hasRequiredIsObject) return isObject_1;
	hasRequiredIsObject = 1;
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	isObject_1 = isObject;
	return isObject_1;
}

var isFunction_1;
var hasRequiredIsFunction;

function requireIsFunction () {
	if (hasRequiredIsFunction) return isFunction_1;
	hasRequiredIsFunction = 1;
	var baseGetTag = require_baseGetTag(),
	    isObject = requireIsObject();

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	isFunction_1 = isFunction;
	return isFunction_1;
}

var _coreJsData;
var hasRequired_coreJsData;

function require_coreJsData () {
	if (hasRequired_coreJsData) return _coreJsData;
	hasRequired_coreJsData = 1;
	var root = require_root();

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	_coreJsData = coreJsData;
	return _coreJsData;
}

var _isMasked;
var hasRequired_isMasked;

function require_isMasked () {
	if (hasRequired_isMasked) return _isMasked;
	hasRequired_isMasked = 1;
	var coreJsData = require_coreJsData();

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	_isMasked = isMasked;
	return _isMasked;
}

/** Used for built-in method references. */

var _toSource;
var hasRequired_toSource;

function require_toSource () {
	if (hasRequired_toSource) return _toSource;
	hasRequired_toSource = 1;
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	_toSource = toSource;
	return _toSource;
}

var _baseIsNative;
var hasRequired_baseIsNative;

function require_baseIsNative () {
	if (hasRequired_baseIsNative) return _baseIsNative;
	hasRequired_baseIsNative = 1;
	var isFunction = requireIsFunction(),
	    isMasked = require_isMasked(),
	    isObject = requireIsObject(),
	    toSource = require_toSource();

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	_baseIsNative = baseIsNative;
	return _baseIsNative;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

var _getValue;
var hasRequired_getValue;

function require_getValue () {
	if (hasRequired_getValue) return _getValue;
	hasRequired_getValue = 1;
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	_getValue = getValue;
	return _getValue;
}

var _getNative;
var hasRequired_getNative;

function require_getNative () {
	if (hasRequired_getNative) return _getNative;
	hasRequired_getNative = 1;
	var baseIsNative = require_baseIsNative(),
	    getValue = require_getValue();

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	_getNative = getNative;
	return _getNative;
}

var _Map;
var hasRequired_Map;

function require_Map () {
	if (hasRequired_Map) return _Map;
	hasRequired_Map = 1;
	var getNative = require_getNative(),
	    root = require_root();

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	_Map = Map;
	return _Map;
}

var _nativeCreate;
var hasRequired_nativeCreate;

function require_nativeCreate () {
	if (hasRequired_nativeCreate) return _nativeCreate;
	hasRequired_nativeCreate = 1;
	var getNative = require_getNative();

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	_nativeCreate = nativeCreate;
	return _nativeCreate;
}

var _hashClear;
var hasRequired_hashClear;

function require_hashClear () {
	if (hasRequired_hashClear) return _hashClear;
	hasRequired_hashClear = 1;
	var nativeCreate = require_nativeCreate();

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	_hashClear = hashClear;
	return _hashClear;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

var _hashDelete;
var hasRequired_hashDelete;

function require_hashDelete () {
	if (hasRequired_hashDelete) return _hashDelete;
	hasRequired_hashDelete = 1;
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	_hashDelete = hashDelete;
	return _hashDelete;
}

var _hashGet;
var hasRequired_hashGet;

function require_hashGet () {
	if (hasRequired_hashGet) return _hashGet;
	hasRequired_hashGet = 1;
	var nativeCreate = require_nativeCreate();

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	_hashGet = hashGet;
	return _hashGet;
}

var _hashHas;
var hasRequired_hashHas;

function require_hashHas () {
	if (hasRequired_hashHas) return _hashHas;
	hasRequired_hashHas = 1;
	var nativeCreate = require_nativeCreate();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	_hashHas = hashHas;
	return _hashHas;
}

var _hashSet;
var hasRequired_hashSet;

function require_hashSet () {
	if (hasRequired_hashSet) return _hashSet;
	hasRequired_hashSet = 1;
	var nativeCreate = require_nativeCreate();

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	_hashSet = hashSet;
	return _hashSet;
}

var _Hash;
var hasRequired_Hash;

function require_Hash () {
	if (hasRequired_Hash) return _Hash;
	hasRequired_Hash = 1;
	var hashClear = require_hashClear(),
	    hashDelete = require_hashDelete(),
	    hashGet = require_hashGet(),
	    hashHas = require_hashHas(),
	    hashSet = require_hashSet();

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	_Hash = Hash;
	return _Hash;
}

var _mapCacheClear;
var hasRequired_mapCacheClear;

function require_mapCacheClear () {
	if (hasRequired_mapCacheClear) return _mapCacheClear;
	hasRequired_mapCacheClear = 1;
	var Hash = require_Hash(),
	    ListCache = require_ListCache(),
	    Map = require_Map();

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	_mapCacheClear = mapCacheClear;
	return _mapCacheClear;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

var _isKeyable;
var hasRequired_isKeyable;

function require_isKeyable () {
	if (hasRequired_isKeyable) return _isKeyable;
	hasRequired_isKeyable = 1;
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	_isKeyable = isKeyable;
	return _isKeyable;
}

var _getMapData;
var hasRequired_getMapData;

function require_getMapData () {
	if (hasRequired_getMapData) return _getMapData;
	hasRequired_getMapData = 1;
	var isKeyable = require_isKeyable();

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	_getMapData = getMapData;
	return _getMapData;
}

var _mapCacheDelete;
var hasRequired_mapCacheDelete;

function require_mapCacheDelete () {
	if (hasRequired_mapCacheDelete) return _mapCacheDelete;
	hasRequired_mapCacheDelete = 1;
	var getMapData = require_getMapData();

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	_mapCacheDelete = mapCacheDelete;
	return _mapCacheDelete;
}

var _mapCacheGet;
var hasRequired_mapCacheGet;

function require_mapCacheGet () {
	if (hasRequired_mapCacheGet) return _mapCacheGet;
	hasRequired_mapCacheGet = 1;
	var getMapData = require_getMapData();

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	_mapCacheGet = mapCacheGet;
	return _mapCacheGet;
}

var _mapCacheHas;
var hasRequired_mapCacheHas;

function require_mapCacheHas () {
	if (hasRequired_mapCacheHas) return _mapCacheHas;
	hasRequired_mapCacheHas = 1;
	var getMapData = require_getMapData();

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	_mapCacheHas = mapCacheHas;
	return _mapCacheHas;
}

var _mapCacheSet;
var hasRequired_mapCacheSet;

function require_mapCacheSet () {
	if (hasRequired_mapCacheSet) return _mapCacheSet;
	hasRequired_mapCacheSet = 1;
	var getMapData = require_getMapData();

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	_mapCacheSet = mapCacheSet;
	return _mapCacheSet;
}

var _MapCache;
var hasRequired_MapCache;

function require_MapCache () {
	if (hasRequired_MapCache) return _MapCache;
	hasRequired_MapCache = 1;
	var mapCacheClear = require_mapCacheClear(),
	    mapCacheDelete = require_mapCacheDelete(),
	    mapCacheGet = require_mapCacheGet(),
	    mapCacheHas = require_mapCacheHas(),
	    mapCacheSet = require_mapCacheSet();

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	_MapCache = MapCache;
	return _MapCache;
}

var _stackSet;
var hasRequired_stackSet;

function require_stackSet () {
	if (hasRequired_stackSet) return _stackSet;
	hasRequired_stackSet = 1;
	var ListCache = require_ListCache(),
	    Map = require_Map(),
	    MapCache = require_MapCache();

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	_stackSet = stackSet;
	return _stackSet;
}

var _Stack;
var hasRequired_Stack;

function require_Stack () {
	if (hasRequired_Stack) return _Stack;
	hasRequired_Stack = 1;
	var ListCache = require_ListCache(),
	    stackClear = require_stackClear(),
	    stackDelete = require_stackDelete(),
	    stackGet = require_stackGet(),
	    stackHas = require_stackHas(),
	    stackSet = require_stackSet();

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	_Stack = Stack;
	return _Stack;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */

var _arrayEach;
var hasRequired_arrayEach;

function require_arrayEach () {
	if (hasRequired_arrayEach) return _arrayEach;
	hasRequired_arrayEach = 1;
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	_arrayEach = arrayEach;
	return _arrayEach;
}

var _defineProperty;
var hasRequired_defineProperty;

function require_defineProperty () {
	if (hasRequired_defineProperty) return _defineProperty;
	hasRequired_defineProperty = 1;
	var getNative = require_getNative();

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	_defineProperty = defineProperty;
	return _defineProperty;
}

var _baseAssignValue;
var hasRequired_baseAssignValue;

function require_baseAssignValue () {
	if (hasRequired_baseAssignValue) return _baseAssignValue;
	hasRequired_baseAssignValue = 1;
	var defineProperty = require_defineProperty();

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	_baseAssignValue = baseAssignValue;
	return _baseAssignValue;
}

var _assignValue;
var hasRequired_assignValue;

function require_assignValue () {
	if (hasRequired_assignValue) return _assignValue;
	hasRequired_assignValue = 1;
	var baseAssignValue = require_baseAssignValue(),
	    eq = requireEq();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	_assignValue = assignValue;
	return _assignValue;
}

var _copyObject;
var hasRequired_copyObject;

function require_copyObject () {
	if (hasRequired_copyObject) return _copyObject;
	hasRequired_copyObject = 1;
	var assignValue = require_assignValue(),
	    baseAssignValue = require_baseAssignValue();

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	_copyObject = copyObject;
	return _copyObject;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

var _baseTimes;
var hasRequired_baseTimes;

function require_baseTimes () {
	if (hasRequired_baseTimes) return _baseTimes;
	hasRequired_baseTimes = 1;
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	_baseTimes = baseTimes;
	return _baseTimes;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

var isObjectLike_1;
var hasRequiredIsObjectLike;

function requireIsObjectLike () {
	if (hasRequiredIsObjectLike) return isObjectLike_1;
	hasRequiredIsObjectLike = 1;
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	isObjectLike_1 = isObjectLike;
	return isObjectLike_1;
}

var _baseIsArguments;
var hasRequired_baseIsArguments;

function require_baseIsArguments () {
	if (hasRequired_baseIsArguments) return _baseIsArguments;
	hasRequired_baseIsArguments = 1;
	var baseGetTag = require_baseGetTag(),
	    isObjectLike = requireIsObjectLike();

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	_baseIsArguments = baseIsArguments;
	return _baseIsArguments;
}

var isArguments_1;
var hasRequiredIsArguments;

function requireIsArguments () {
	if (hasRequiredIsArguments) return isArguments_1;
	hasRequiredIsArguments = 1;
	var baseIsArguments = require_baseIsArguments(),
	    isObjectLike = requireIsObjectLike();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	isArguments_1 = isArguments;
	return isArguments_1;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray_1;
var hasRequiredIsArray;

function requireIsArray () {
	if (hasRequiredIsArray) return isArray_1;
	hasRequiredIsArray = 1;
	var isArray = Array.isArray;

	isArray_1 = isArray;
	return isArray_1;
}

var isBuffer = {exports: {}};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */

var stubFalse_1;
var hasRequiredStubFalse;

function requireStubFalse () {
	if (hasRequiredStubFalse) return stubFalse_1;
	hasRequiredStubFalse = 1;
	function stubFalse() {
	  return false;
	}

	stubFalse_1 = stubFalse;
	return stubFalse_1;
}

isBuffer.exports;

var hasRequiredIsBuffer;

function requireIsBuffer () {
	if (hasRequiredIsBuffer) return isBuffer.exports;
	hasRequiredIsBuffer = 1;
	(function (module, exports) {
		var root = require_root(),
		    stubFalse = requireStubFalse();

		/** Detect free variable `exports`. */
		var freeExports = exports && !exports.nodeType && exports;

		/** Detect free variable `module`. */
		var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

		/** Detect the popular CommonJS extension `module.exports`. */
		var moduleExports = freeModule && freeModule.exports === freeExports;

		/** Built-in value references. */
		var Buffer = moduleExports ? root.Buffer : undefined;

		/* Built-in method references for those with the same name as other `lodash` methods. */
		var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

		/**
		 * Checks if `value` is a buffer.
		 *
		 * @static
		 * @memberOf _
		 * @since 4.3.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
		 * @example
		 *
		 * _.isBuffer(new Buffer(2));
		 * // => true
		 *
		 * _.isBuffer(new Uint8Array(2));
		 * // => false
		 */
		var isBuffer = nativeIsBuffer || stubFalse;

		module.exports = isBuffer; 
	} (isBuffer, isBuffer.exports));
	return isBuffer.exports;
}

/** Used as references for various `Number` constants. */

var _isIndex;
var hasRequired_isIndex;

function require_isIndex () {
	if (hasRequired_isIndex) return _isIndex;
	hasRequired_isIndex = 1;
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	_isIndex = isIndex;
	return _isIndex;
}

/** Used as references for various `Number` constants. */

var isLength_1;
var hasRequiredIsLength;

function requireIsLength () {
	if (hasRequiredIsLength) return isLength_1;
	hasRequiredIsLength = 1;
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	isLength_1 = isLength;
	return isLength_1;
}

var _baseIsTypedArray;
var hasRequired_baseIsTypedArray;

function require_baseIsTypedArray () {
	if (hasRequired_baseIsTypedArray) return _baseIsTypedArray;
	hasRequired_baseIsTypedArray = 1;
	var baseGetTag = require_baseGetTag(),
	    isLength = requireIsLength(),
	    isObjectLike = requireIsObjectLike();

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	_baseIsTypedArray = baseIsTypedArray;
	return _baseIsTypedArray;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

var _baseUnary;
var hasRequired_baseUnary;

function require_baseUnary () {
	if (hasRequired_baseUnary) return _baseUnary;
	hasRequired_baseUnary = 1;
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	_baseUnary = baseUnary;
	return _baseUnary;
}

var _nodeUtil = {exports: {}};

_nodeUtil.exports;

var hasRequired_nodeUtil;

function require_nodeUtil () {
	if (hasRequired_nodeUtil) return _nodeUtil.exports;
	hasRequired_nodeUtil = 1;
	(function (module, exports) {
		var freeGlobal = require_freeGlobal();

		/** Detect free variable `exports`. */
		var freeExports = exports && !exports.nodeType && exports;

		/** Detect free variable `module`. */
		var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

		/** Detect the popular CommonJS extension `module.exports`. */
		var moduleExports = freeModule && freeModule.exports === freeExports;

		/** Detect free variable `process` from Node.js. */
		var freeProcess = moduleExports && freeGlobal.process;

		/** Used to access faster Node.js helpers. */
		var nodeUtil = (function() {
		  try {
		    // Use `util.types` for Node.js 10+.
		    var types = freeModule && freeModule.require && freeModule.require('util').types;

		    if (types) {
		      return types;
		    }

		    // Legacy `process.binding('util')` for Node.js < 10.
		    return freeProcess && freeProcess.binding && freeProcess.binding('util');
		  } catch (e) {}
		}());

		module.exports = nodeUtil; 
	} (_nodeUtil, _nodeUtil.exports));
	return _nodeUtil.exports;
}

var isTypedArray_1;
var hasRequiredIsTypedArray;

function requireIsTypedArray () {
	if (hasRequiredIsTypedArray) return isTypedArray_1;
	hasRequiredIsTypedArray = 1;
	var baseIsTypedArray = require_baseIsTypedArray(),
	    baseUnary = require_baseUnary(),
	    nodeUtil = require_nodeUtil();

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	isTypedArray_1 = isTypedArray;
	return isTypedArray_1;
}

var _arrayLikeKeys;
var hasRequired_arrayLikeKeys;

function require_arrayLikeKeys () {
	if (hasRequired_arrayLikeKeys) return _arrayLikeKeys;
	hasRequired_arrayLikeKeys = 1;
	var baseTimes = require_baseTimes(),
	    isArguments = requireIsArguments(),
	    isArray = requireIsArray(),
	    isBuffer = requireIsBuffer(),
	    isIndex = require_isIndex(),
	    isTypedArray = requireIsTypedArray();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	_arrayLikeKeys = arrayLikeKeys;
	return _arrayLikeKeys;
}

/** Used for built-in method references. */

var _isPrototype;
var hasRequired_isPrototype;

function require_isPrototype () {
	if (hasRequired_isPrototype) return _isPrototype;
	hasRequired_isPrototype = 1;
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	_isPrototype = isPrototype;
	return _isPrototype;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */

var _overArg;
var hasRequired_overArg;

function require_overArg () {
	if (hasRequired_overArg) return _overArg;
	hasRequired_overArg = 1;
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	_overArg = overArg;
	return _overArg;
}

var _nativeKeys;
var hasRequired_nativeKeys;

function require_nativeKeys () {
	if (hasRequired_nativeKeys) return _nativeKeys;
	hasRequired_nativeKeys = 1;
	var overArg = require_overArg();

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	_nativeKeys = nativeKeys;
	return _nativeKeys;
}

var _baseKeys;
var hasRequired_baseKeys;

function require_baseKeys () {
	if (hasRequired_baseKeys) return _baseKeys;
	hasRequired_baseKeys = 1;
	var isPrototype = require_isPrototype(),
	    nativeKeys = require_nativeKeys();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	_baseKeys = baseKeys;
	return _baseKeys;
}

var isArrayLike_1;
var hasRequiredIsArrayLike;

function requireIsArrayLike () {
	if (hasRequiredIsArrayLike) return isArrayLike_1;
	hasRequiredIsArrayLike = 1;
	var isFunction = requireIsFunction(),
	    isLength = requireIsLength();

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	isArrayLike_1 = isArrayLike;
	return isArrayLike_1;
}

var keys_1;
var hasRequiredKeys;

function requireKeys () {
	if (hasRequiredKeys) return keys_1;
	hasRequiredKeys = 1;
	var arrayLikeKeys = require_arrayLikeKeys(),
	    baseKeys = require_baseKeys(),
	    isArrayLike = requireIsArrayLike();

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	keys_1 = keys;
	return keys_1;
}

var _baseAssign;
var hasRequired_baseAssign;

function require_baseAssign () {
	if (hasRequired_baseAssign) return _baseAssign;
	hasRequired_baseAssign = 1;
	var copyObject = require_copyObject(),
	    keys = requireKeys();

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	_baseAssign = baseAssign;
	return _baseAssign;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

var _nativeKeysIn;
var hasRequired_nativeKeysIn;

function require_nativeKeysIn () {
	if (hasRequired_nativeKeysIn) return _nativeKeysIn;
	hasRequired_nativeKeysIn = 1;
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	_nativeKeysIn = nativeKeysIn;
	return _nativeKeysIn;
}

var _baseKeysIn;
var hasRequired_baseKeysIn;

function require_baseKeysIn () {
	if (hasRequired_baseKeysIn) return _baseKeysIn;
	hasRequired_baseKeysIn = 1;
	var isObject = requireIsObject(),
	    isPrototype = require_isPrototype(),
	    nativeKeysIn = require_nativeKeysIn();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	_baseKeysIn = baseKeysIn;
	return _baseKeysIn;
}

var keysIn_1;
var hasRequiredKeysIn;

function requireKeysIn () {
	if (hasRequiredKeysIn) return keysIn_1;
	hasRequiredKeysIn = 1;
	var arrayLikeKeys = require_arrayLikeKeys(),
	    baseKeysIn = require_baseKeysIn(),
	    isArrayLike = requireIsArrayLike();

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	keysIn_1 = keysIn;
	return keysIn_1;
}

var _baseAssignIn;
var hasRequired_baseAssignIn;

function require_baseAssignIn () {
	if (hasRequired_baseAssignIn) return _baseAssignIn;
	hasRequired_baseAssignIn = 1;
	var copyObject = require_copyObject(),
	    keysIn = requireKeysIn();

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && copyObject(source, keysIn(source), object);
	}

	_baseAssignIn = baseAssignIn;
	return _baseAssignIn;
}

var _cloneBuffer = {exports: {}};

_cloneBuffer.exports;

var hasRequired_cloneBuffer;

function require_cloneBuffer () {
	if (hasRequired_cloneBuffer) return _cloneBuffer.exports;
	hasRequired_cloneBuffer = 1;
	(function (module, exports) {
		var root = require_root();

		/** Detect free variable `exports`. */
		var freeExports = exports && !exports.nodeType && exports;

		/** Detect free variable `module`. */
		var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

		/** Detect the popular CommonJS extension `module.exports`. */
		var moduleExports = freeModule && freeModule.exports === freeExports;

		/** Built-in value references. */
		var Buffer = moduleExports ? root.Buffer : undefined,
		    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

		/**
		 * Creates a clone of  `buffer`.
		 *
		 * @private
		 * @param {Buffer} buffer The buffer to clone.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @returns {Buffer} Returns the cloned buffer.
		 */
		function cloneBuffer(buffer, isDeep) {
		  if (isDeep) {
		    return buffer.slice();
		  }
		  var length = buffer.length,
		      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

		  buffer.copy(result);
		  return result;
		}

		module.exports = cloneBuffer; 
	} (_cloneBuffer, _cloneBuffer.exports));
	return _cloneBuffer.exports;
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */

var _copyArray;
var hasRequired_copyArray;

function require_copyArray () {
	if (hasRequired_copyArray) return _copyArray;
	hasRequired_copyArray = 1;
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	_copyArray = copyArray;
	return _copyArray;
}

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

var _arrayFilter;
var hasRequired_arrayFilter;

function require_arrayFilter () {
	if (hasRequired_arrayFilter) return _arrayFilter;
	hasRequired_arrayFilter = 1;
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	_arrayFilter = arrayFilter;
	return _arrayFilter;
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */

var stubArray_1;
var hasRequiredStubArray;

function requireStubArray () {
	if (hasRequiredStubArray) return stubArray_1;
	hasRequiredStubArray = 1;
	function stubArray() {
	  return [];
	}

	stubArray_1 = stubArray;
	return stubArray_1;
}

var _getSymbols;
var hasRequired_getSymbols;

function require_getSymbols () {
	if (hasRequired_getSymbols) return _getSymbols;
	hasRequired_getSymbols = 1;
	var arrayFilter = require_arrayFilter(),
	    stubArray = requireStubArray();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	_getSymbols = getSymbols;
	return _getSymbols;
}

var _copySymbols;
var hasRequired_copySymbols;

function require_copySymbols () {
	if (hasRequired_copySymbols) return _copySymbols;
	hasRequired_copySymbols = 1;
	var copyObject = require_copyObject(),
	    getSymbols = require_getSymbols();

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	_copySymbols = copySymbols;
	return _copySymbols;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */

var _arrayPush;
var hasRequired_arrayPush;

function require_arrayPush () {
	if (hasRequired_arrayPush) return _arrayPush;
	hasRequired_arrayPush = 1;
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	_arrayPush = arrayPush;
	return _arrayPush;
}

var _getPrototype;
var hasRequired_getPrototype;

function require_getPrototype () {
	if (hasRequired_getPrototype) return _getPrototype;
	hasRequired_getPrototype = 1;
	var overArg = require_overArg();

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	_getPrototype = getPrototype;
	return _getPrototype;
}

var _getSymbolsIn;
var hasRequired_getSymbolsIn;

function require_getSymbolsIn () {
	if (hasRequired_getSymbolsIn) return _getSymbolsIn;
	hasRequired_getSymbolsIn = 1;
	var arrayPush = require_arrayPush(),
	    getPrototype = require_getPrototype(),
	    getSymbols = require_getSymbols(),
	    stubArray = requireStubArray();

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};

	_getSymbolsIn = getSymbolsIn;
	return _getSymbolsIn;
}

var _copySymbolsIn;
var hasRequired_copySymbolsIn;

function require_copySymbolsIn () {
	if (hasRequired_copySymbolsIn) return _copySymbolsIn;
	hasRequired_copySymbolsIn = 1;
	var copyObject = require_copyObject(),
	    getSymbolsIn = require_getSymbolsIn();

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}

	_copySymbolsIn = copySymbolsIn;
	return _copySymbolsIn;
}

var _baseGetAllKeys;
var hasRequired_baseGetAllKeys;

function require_baseGetAllKeys () {
	if (hasRequired_baseGetAllKeys) return _baseGetAllKeys;
	hasRequired_baseGetAllKeys = 1;
	var arrayPush = require_arrayPush(),
	    isArray = requireIsArray();

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	_baseGetAllKeys = baseGetAllKeys;
	return _baseGetAllKeys;
}

var _getAllKeys;
var hasRequired_getAllKeys;

function require_getAllKeys () {
	if (hasRequired_getAllKeys) return _getAllKeys;
	hasRequired_getAllKeys = 1;
	var baseGetAllKeys = require_baseGetAllKeys(),
	    getSymbols = require_getSymbols(),
	    keys = requireKeys();

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	_getAllKeys = getAllKeys;
	return _getAllKeys;
}

var _getAllKeysIn;
var hasRequired_getAllKeysIn;

function require_getAllKeysIn () {
	if (hasRequired_getAllKeysIn) return _getAllKeysIn;
	hasRequired_getAllKeysIn = 1;
	var baseGetAllKeys = require_baseGetAllKeys(),
	    getSymbolsIn = require_getSymbolsIn(),
	    keysIn = requireKeysIn();

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}

	_getAllKeysIn = getAllKeysIn;
	return _getAllKeysIn;
}

var _DataView;
var hasRequired_DataView;

function require_DataView () {
	if (hasRequired_DataView) return _DataView;
	hasRequired_DataView = 1;
	var getNative = require_getNative(),
	    root = require_root();

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	_DataView = DataView;
	return _DataView;
}

var _Promise;
var hasRequired_Promise;

function require_Promise () {
	if (hasRequired_Promise) return _Promise;
	hasRequired_Promise = 1;
	var getNative = require_getNative(),
	    root = require_root();

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	_Promise = Promise;
	return _Promise;
}

var _Set;
var hasRequired_Set;

function require_Set () {
	if (hasRequired_Set) return _Set;
	hasRequired_Set = 1;
	var getNative = require_getNative(),
	    root = require_root();

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	_Set = Set;
	return _Set;
}

var _WeakMap;
var hasRequired_WeakMap;

function require_WeakMap () {
	if (hasRequired_WeakMap) return _WeakMap;
	hasRequired_WeakMap = 1;
	var getNative = require_getNative(),
	    root = require_root();

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	_WeakMap = WeakMap;
	return _WeakMap;
}

var _getTag;
var hasRequired_getTag;

function require_getTag () {
	if (hasRequired_getTag) return _getTag;
	hasRequired_getTag = 1;
	var DataView = require_DataView(),
	    Map = require_Map(),
	    Promise = require_Promise(),
	    Set = require_Set(),
	    WeakMap = require_WeakMap(),
	    baseGetTag = require_baseGetTag(),
	    toSource = require_toSource();

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	_getTag = getTag;
	return _getTag;
}

/** Used for built-in method references. */

var _initCloneArray;
var hasRequired_initCloneArray;

function require_initCloneArray () {
	if (hasRequired_initCloneArray) return _initCloneArray;
	hasRequired_initCloneArray = 1;
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	_initCloneArray = initCloneArray;
	return _initCloneArray;
}

var _Uint8Array;
var hasRequired_Uint8Array;

function require_Uint8Array () {
	if (hasRequired_Uint8Array) return _Uint8Array;
	hasRequired_Uint8Array = 1;
	var root = require_root();

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	_Uint8Array = Uint8Array;
	return _Uint8Array;
}

var _cloneArrayBuffer;
var hasRequired_cloneArrayBuffer;

function require_cloneArrayBuffer () {
	if (hasRequired_cloneArrayBuffer) return _cloneArrayBuffer;
	hasRequired_cloneArrayBuffer = 1;
	var Uint8Array = require_Uint8Array();

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	_cloneArrayBuffer = cloneArrayBuffer;
	return _cloneArrayBuffer;
}

var _cloneDataView;
var hasRequired_cloneDataView;

function require_cloneDataView () {
	if (hasRequired_cloneDataView) return _cloneDataView;
	hasRequired_cloneDataView = 1;
	var cloneArrayBuffer = require_cloneArrayBuffer();

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	_cloneDataView = cloneDataView;
	return _cloneDataView;
}

/** Used to match `RegExp` flags from their coerced string values. */

var _cloneRegExp;
var hasRequired_cloneRegExp;

function require_cloneRegExp () {
	if (hasRequired_cloneRegExp) return _cloneRegExp;
	hasRequired_cloneRegExp = 1;
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	_cloneRegExp = cloneRegExp;
	return _cloneRegExp;
}

var _cloneSymbol;
var hasRequired_cloneSymbol;

function require_cloneSymbol () {
	if (hasRequired_cloneSymbol) return _cloneSymbol;
	hasRequired_cloneSymbol = 1;
	var Symbol = require_Symbol();

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	_cloneSymbol = cloneSymbol;
	return _cloneSymbol;
}

var _cloneTypedArray;
var hasRequired_cloneTypedArray;

function require_cloneTypedArray () {
	if (hasRequired_cloneTypedArray) return _cloneTypedArray;
	hasRequired_cloneTypedArray = 1;
	var cloneArrayBuffer = require_cloneArrayBuffer();

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	_cloneTypedArray = cloneTypedArray;
	return _cloneTypedArray;
}

var _initCloneByTag;
var hasRequired_initCloneByTag;

function require_initCloneByTag () {
	if (hasRequired_initCloneByTag) return _initCloneByTag;
	hasRequired_initCloneByTag = 1;
	var cloneArrayBuffer = require_cloneArrayBuffer(),
	    cloneDataView = require_cloneDataView(),
	    cloneRegExp = require_cloneRegExp(),
	    cloneSymbol = require_cloneSymbol(),
	    cloneTypedArray = require_cloneTypedArray();

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return new Ctor;

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return new Ctor;

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	_initCloneByTag = initCloneByTag;
	return _initCloneByTag;
}

var _baseCreate;
var hasRequired_baseCreate;

function require_baseCreate () {
	if (hasRequired_baseCreate) return _baseCreate;
	hasRequired_baseCreate = 1;
	var isObject = requireIsObject();

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	_baseCreate = baseCreate;
	return _baseCreate;
}

var _initCloneObject;
var hasRequired_initCloneObject;

function require_initCloneObject () {
	if (hasRequired_initCloneObject) return _initCloneObject;
	hasRequired_initCloneObject = 1;
	var baseCreate = require_baseCreate(),
	    getPrototype = require_getPrototype(),
	    isPrototype = require_isPrototype();

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	_initCloneObject = initCloneObject;
	return _initCloneObject;
}

var _baseIsMap;
var hasRequired_baseIsMap;

function require_baseIsMap () {
	if (hasRequired_baseIsMap) return _baseIsMap;
	hasRequired_baseIsMap = 1;
	var getTag = require_getTag(),
	    isObjectLike = requireIsObjectLike();

	/** `Object#toString` result references. */
	var mapTag = '[object Map]';

	/**
	 * The base implementation of `_.isMap` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 */
	function baseIsMap(value) {
	  return isObjectLike(value) && getTag(value) == mapTag;
	}

	_baseIsMap = baseIsMap;
	return _baseIsMap;
}

var isMap_1;
var hasRequiredIsMap;

function requireIsMap () {
	if (hasRequiredIsMap) return isMap_1;
	hasRequiredIsMap = 1;
	var baseIsMap = require_baseIsMap(),
	    baseUnary = require_baseUnary(),
	    nodeUtil = require_nodeUtil();

	/* Node.js helper references. */
	var nodeIsMap = nodeUtil && nodeUtil.isMap;

	/**
	 * Checks if `value` is classified as a `Map` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 * @example
	 *
	 * _.isMap(new Map);
	 * // => true
	 *
	 * _.isMap(new WeakMap);
	 * // => false
	 */
	var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

	isMap_1 = isMap;
	return isMap_1;
}

var _baseIsSet;
var hasRequired_baseIsSet;

function require_baseIsSet () {
	if (hasRequired_baseIsSet) return _baseIsSet;
	hasRequired_baseIsSet = 1;
	var getTag = require_getTag(),
	    isObjectLike = requireIsObjectLike();

	/** `Object#toString` result references. */
	var setTag = '[object Set]';

	/**
	 * The base implementation of `_.isSet` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 */
	function baseIsSet(value) {
	  return isObjectLike(value) && getTag(value) == setTag;
	}

	_baseIsSet = baseIsSet;
	return _baseIsSet;
}

var isSet_1;
var hasRequiredIsSet;

function requireIsSet () {
	if (hasRequiredIsSet) return isSet_1;
	hasRequiredIsSet = 1;
	var baseIsSet = require_baseIsSet(),
	    baseUnary = require_baseUnary(),
	    nodeUtil = require_nodeUtil();

	/* Node.js helper references. */
	var nodeIsSet = nodeUtil && nodeUtil.isSet;

	/**
	 * Checks if `value` is classified as a `Set` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 * @example
	 *
	 * _.isSet(new Set);
	 * // => true
	 *
	 * _.isSet(new WeakSet);
	 * // => false
	 */
	var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

	isSet_1 = isSet;
	return isSet_1;
}

var _baseClone;
var hasRequired_baseClone;

function require_baseClone () {
	if (hasRequired_baseClone) return _baseClone;
	hasRequired_baseClone = 1;
	var Stack = require_Stack(),
	    arrayEach = require_arrayEach(),
	    assignValue = require_assignValue(),
	    baseAssign = require_baseAssign(),
	    baseAssignIn = require_baseAssignIn(),
	    cloneBuffer = require_cloneBuffer(),
	    copyArray = require_copyArray(),
	    copySymbols = require_copySymbols(),
	    copySymbolsIn = require_copySymbolsIn(),
	    getAllKeys = require_getAllKeys(),
	    getAllKeysIn = require_getAllKeysIn(),
	    getTag = require_getTag(),
	    initCloneArray = require_initCloneArray(),
	    initCloneByTag = require_initCloneByTag(),
	    initCloneObject = require_initCloneObject(),
	    isArray = requireIsArray(),
	    isBuffer = requireIsBuffer(),
	    isMap = requireIsMap(),
	    isObject = requireIsObject(),
	    isSet = requireIsSet(),
	    keys = requireKeys(),
	    keysIn = requireKeysIn();

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? copySymbolsIn(value, baseAssignIn(result, value))
	          : copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (isSet(value)) {
	    value.forEach(function(subValue) {
	      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	    });
	  } else if (isMap(value)) {
	    value.forEach(function(subValue, key) {
	      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	    });
	  }

	  var keysFunc = isFull
	    ? (isFlat ? getAllKeysIn : getAllKeys)
	    : (isFlat ? keysIn : keys);

	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	_baseClone = baseClone;
	return _baseClone;
}

var cloneDeep_1;
var hasRequiredCloneDeep;

function requireCloneDeep () {
	if (hasRequiredCloneDeep) return cloneDeep_1;
	hasRequiredCloneDeep = 1;
	var baseClone = require_baseClone();

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_SYMBOLS_FLAG = 4;

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
	}

	cloneDeep_1 = cloneDeep;
	return cloneDeep_1;
}

var cloneDeepExports = requireCloneDeep();
var cloneDeep = /*@__PURE__*/getDefaultExportFromCjs(cloneDeepExports);

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
    aggregations: 'result.payload.aggregations',
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
    filters: ({
      result,
      state,
      action
    }) => {
      const aggregations = 'aggregations' in result.payload ? result.payload.aggregations : undefined;
      if (!aggregations) return {};

      // Handle aggregations client-side where the filter items have loaded before the results containing the aggregations
      const filters = cloneDeep(getFilters(state, action.facet, action.context, 'js'));
      for (const [filterKey, filter] of Object.entries(filters)) {
        const aggregation = aggregations[convertKeyForAggregation(filterKey)];
        for (const filterItem of filter.items || []) {
          if (!aggregation) delete filterItem.aggregate;else {
            const aggregate = aggregation[filterItem.key.toLowerCase()];
            if (typeof aggregate === 'number') filterItem.aggregate = aggregate;else delete filterItem.aggregate;
          }
        }
      }
      return filters;
    },
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
      if (!loadMorePaging) return results;

      // add a _pageIndex property to the returned results to help us later
      const nextResults = results.map((r, idx) => ({
        _pageIndex: pageIndex,
        _pagePosition: idx,
        ...r
      }));
      const loadedPages = pagesLoaded || [];

      // if pageIndex is found in loadedPages, we have already loaded this page
      if (!isNaN(loadedPages.find(l => l === pageIndex))) return prevResults;

      // Determine where we put the results depending on if we
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
      mapper,
      facet,
      filterKey
    }) => {
      // Handle taxonomy filter items
      if (payload && 'children' in payload) {
        var _payload$children;
        const items = (_payload$children = payload.children) === null || _payload$children === void 0 ? void 0 : _payload$children.map(item => {
          item.isSelected = selectedKeys === null || selectedKeys === void 0 ? void 0 : selectedKeys.includes(item.key);
          return item;
        });
        return (mapper === null || mapper === void 0 ? void 0 : mapper(items || [])) || [];
      }

      // Handle entries-based filter items
      if (payload && 'items' in payload) {
        var _facet$aggregations;
        // Handle aggregations from SSR where the results containing the aggregations have loaded before the filter items
        const aggregation = (_facet$aggregations = facet.aggregations) === null || _facet$aggregations === void 0 ? void 0 : _facet$aggregations[convertKeyForAggregation(filterKey)];
        const items = payload.items.map(item => {
          var _item$sys, _item$sys2;
          item.isSelected = selectedKeys === null || selectedKeys === void 0 ? void 0 : selectedKeys.includes(item === null || item === void 0 || (_item$sys = item.sys) === null || _item$sys === void 0 ? void 0 : _item$sys.id);
          const aggregate = aggregation === null || aggregation === void 0 ? void 0 : aggregation[item === null || item === void 0 || (_item$sys2 = item.sys) === null || _item$sys2 === void 0 ? void 0 : _item$sys2.id.toLowerCase()];
          if (typeof aggregate === 'number') item.aggregate = aggregate;
          return item;
        });
        return mapper === null || mapper === void 0 ? void 0 : mapper(items);
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
const mapFilterToFilterExpression = filter => mapJson(filter, filterExpressionMapper);

const mapFiltersToFilterExpression = (filters, selectedFilters) => {
  if (!selectedFilters || Object.keys(selectedFilters).length === 0) return [];
  const filterExpressions = [];

  // Iterate through the keys in selectedFilters and locate
  // the items that are selected and queryable
  Object.entries(selectedFilters).map(([fkey, selectedValues]) => {
    const filter = filters[fkey];
    if (selectedValues && filter) {
      // Where we have a value for a selectedFilter
      // and a filter is found for the current key
      // map the filter to a filterExpression object
      const expr = mapFilterToFilterExpression({
        ...filter,
        selectedValues
      });
      filterExpressions.push(expr);
    }
  });
  return filterExpressions;
};

const queryParamsTemplate = {
  aggregations: root => {
    const {
      context,
      facet,
      state
    } = root;
    const stateFilters = getFilters(state, facet, context, 'js');
    const aggregations = {};
    for (const [filterKey, filter] of Object.entries(stateFilters)) {
      if (filter.fieldId && !Array.isArray(filter.fieldId)) {
        aggregations[convertKeyForAggregation(filterKey)] = {
          field: convertFieldIdForAggregation(filter.fieldId),
          size: 100
        };
      }
    }
    return {
      ...aggregations,
      ...getQueryParameter(root, 'customAggregations', {})
    };
  },
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
  fieldLinkDepths: root => getQueryParameter(root, 'fieldLinkDepths', []),
  fields: root => getQueryParameter(root, 'fields', []),
  filters: ({
    state,
    facet,
    context
  }) => {
    const stateFilters = getFilters(state, facet, context, 'js');
    const selectedFilters = getSelectedFilters(state, facet, context, 'js');
    // Use another mapping function to map the filter parameters for the query
    const filterParams = mapFiltersToFilterExpression(stateFilters, selectedFilters);
    return filterParams;
  },
  fuzzySearch: root => getQueryParameter(root, 'fuzzySearch', false),
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
  omitDefaultSearchFields: root => getQueryParameter(root, 'omitDefaultSearchFields', []),
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
  pageSize: root => {
    const {
      action,
      state
    } = root;
    return getPageSize(state, action.facet, action.context) || getQueryParameter(root, 'pageSize');
  },
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
    return ((_getFacet = getFacet(state, facet, context, 'js')) === null || _getFacet === void 0 ? void 0 : _getFacet.projectId) || selectCurrentProject(state);
  },
  searchTerm: root => root.context !== Context.minilist || getQueryParameter(root, 'useSearchTerm', false) ? getSearchTerm(root.state) : '',
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
    return deduped;
    // return wsf;
  },
  webpageTemplates: root => getQueryParameter(root, 'webpageTemplates', [])
};
const mapStateToQueryParams = sourceJson => mapJson(sourceJson, queryParamsTemplate);

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
  } = action;
  // Map parameters using state and some additional
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
  const stateParams = {
    ...getQueryParams(ogState, facet, context)
  };
  stateParams.pageIndex = getPageIndex(ogState, facet, context);
  stateParams.searchTerm = getSearchTerm(ogState);
  stateParams.pageSize = getPageSize(ogState, facet, context);
  if (context === Context.facets && ssr ||
  // context === Context.minilist ||
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
  const stateParams = {
    ...getQueryParams(action.ogState || state, action.facet, action.context),
    pageIndex: getPageIndex(action.ogState || state, action.facet, action.context),
    searchTerm: getSearchTerm(action.ogState || state)
  };
  console.log(stateParams, queryParams);
  console.log('getSelectedFilters', getSelectedFilters(action.ogState || state, action.facet, action.context, 'js'), 'params', action.params);
};
const scrollTo = scrollToElement => {
  if (typeof window !== 'undefined') {
    if (typeof scrollToElement === 'number')
      // Used to be Y coordinate, deprecated, because it's not accessible
      console.warn('updatePageIndex arg2 needs string');else if (typeof scrollToElement === 'string') {
      /* Effectively simulates an anchor link. Needed for accessibility, as window.scrollTo
         does not change focus, only scrolls the screen */
      window.location.href = `${location.pathname}${location.search}#${scrollToElement}`;
    }
  }
};

// *** FILTER ITEM MAPPING ***

// Base mapping, fields that are the same across all mappings
// to save repeating these elements in every mapper, spread this
// into your discrete mappings
const base = {
  contentTypeId: Fields.sys.contentTypeId,
  title: 'entryTitle',
  key: 'sys.id',
  path: 'sys.slug',
  isSelected: 'isSelected',
  aggregate: 'aggregate'
};
const mapEntriesToFilterItems = entries => {
  if (!entries) return [];
  return entries.map(entry => {
    const template = base;
    if (template) {
      return mapJson(entry, template);
    }
    return entry;
  });
};

const mapQueryParamsToCustomApi = queryParams => {
  const customApiMapping = {
    fieldLinkDepths: ({
      fieldLinkDepths
    }) => JSON.stringify(fieldLinkDepths),
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
  return mapJson(queryParams, customApiMapping);
};

const searchSagas = [takeEvery(CLEAR_FILTERS, clearFilters), takeEvery(DO_SEARCH, doSearch), takeEvery(SET_ROUTE_FILTERS, loadFilters), takeEvery(SET_SEARCH_ENTRIES, preloadOtherFacets), takeEvery(UPDATE_CURRENT_FACET, updateCurrentFacet), takeEvery(UPDATE_CURRENT_TAB, updateCurrentTab), takeEvery(UPDATE_PAGE_INDEX, updatePageIndex), takeEvery(UPDATE_PAGE_SIZE, updatePageSize), takeEvery(UPDATE_SEARCH_TERM, updateSearchTerm), takeEvery(UPDATE_SORT_ORDER, updateSortOrder), takeEvery(UPDATE_SELECTED_FILTERS, applySearchFilter)];
const toJS = obj => obj && 'toJS' in obj && typeof obj.toJS === 'function' ? obj.toJS() : obj;
function* setRouteFilters(action) {
  const {
    mappers,
    params,
    listingType,
    defaultLang,
    debug
  } = action;
  const context = listingType ? Context.listings : Context.facets;
  const state = toJS(yield select());
  const ssr = getIsSsr(state);

  // Get current facet from params or state
  let currentFacet = params && params.facet || listingType;

  // If Listing use listing type (ignore params.facet)
  if (context === Context.listings) {
    currentFacet = listingType;
  }

  // Pick the default facet from initialState
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
  yield put(nextAction);

  // keep track of this state ref for comparing changes to params later
  const ogState = {
    search: state.search
  };

  // Using call instead of triggering from the put
  // to allow this exported saga to continue during SSR
  yield call(ensureSearch, {
    ...nextAction,
    ogState
  });
}
function* doSearch(action) {
  var _action$params;
  const state = toJS(yield select());
  if (action.config) {
    // If the action contains a config object, we can add this to the
    // state at runtime
    yield put({
      ...action,
      type: APPLY_CONFIG
    });
  }
  const nextAction = {
    ...action,
    type: SET_SEARCH_FILTERS,
    ssr: getIsSsr(state),
    facet: action.facet || ((_action$params = action.params) === null || _action$params === void 0 ? void 0 : _action$params.facet)
  };
  if (nextAction.facet && (action.config || Object.keys(getFacet(state, nextAction.facet, action.context, 'js')).length > 0)) {
    yield put(nextAction);

    // keep track of this state ref for comparing changes to params later
    const ogState = {
      search: state.search
    };
    yield call(ensureSearch, {
      ...nextAction,
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
  const filtersToLoad = yield select(getFiltersToLoad, facetKey, context, 'js');
  if (filtersToLoad.length > 0) {
    yield put({
      type: LOAD_FILTERS,
      filtersToLoad,
      facetKey,
      context
    });
    const selectedKeys = yield select(getSelectedFilters, facetKey, context, 'js');
    const facet = yield select(getFacet, facetKey, context, 'js');
    const filters = facet.filters || {};
    const projectId = facet.projectId;
    const filtersToLoadSagas = filters && filtersToLoad.map((filterKey = '') => {
      return call(loadFilter, {
        facetKey,
        filterKey,
        filter: filters[filterKey],
        projectId,
        selectedKeys: selectedKeys[filterKey],
        context,
        mapper: 'filterItems' in mappers && mappers.filterItems || mapEntriesToFilterItems
      });
    });
    if (filtersToLoadSagas) yield all(filtersToLoadSagas);
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
      const versionStatus = yield select(selectVersionStatus);
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
  createStateFrom.facet = yield select(getFacet, facetKey, context, 'js');
  const nextAction = mapJson(createStateFrom, filterTemplate);
  yield put(nextAction);
}
function* ensureSearch(action) {
  const {
    context,
    facet,
    debug
  } = action;
  try {
    const state = yield select();
    const nextAction = {
      ...action,
      ogState: action.ogState || {
        search: state.search
      }
    };
    const [queryParams, runSearch] = generateQueryParams(nextAction, state);
    if (debug && (debug === true || debug.executeSearch)) debugExecuteSearch(nextAction, state);
    if (runSearch) {
      yield put({
        type: EXECUTE_SEARCH,
        facet,
        context
      });
      yield call(executeSearch, {
        ...nextAction,
        context,
        facet,
        queryParams,
        debug
      });
    }
  } catch (error) {
    log.error(...['Error running search saga:', error, error.stack]);
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
    const state = yield select();
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
        featuredResult = yield timedSearch(featuredQuery, queryParams.linkDepth, queryParams.projectId, queryParams.env);
        queryParams.excludeIds = getItemsFromResult(featuredResult).map(fi => {
          var _fi$sys;
          return fi === null || fi === void 0 || (_fi$sys = fi.sys) === null || _fi$sys === void 0 ? void 0 : _fi$sys.id;
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
      state: yield select()
    };
    const nextAction = mapJson(createStateFrom, facetTemplate);
    yield put(nextAction);
  } catch (error) {
    log.error(...['Error running search saga:', error, error.stack]);
  }
}
function* preloadOtherFacets(action) {
  const {
    preload,
    context,
    facet,
    debug
  } = action;
  const state = yield select();
  const currentFacet = getCurrentFacet(state);
  if (!preload && facet === currentFacet && context !== Context.listings) {
    const allFacets = getFacets(state, 'js');
    const otherFacets = Object.keys(allFacets).filter(f => f !== currentFacet);
    yield all(otherFacets.map((preloadFacet = '') => {
      const preloadAction = {
        ...action,
        facet: preloadFacet,
        preload: true
      };
      const [queryParams, runSearch] = generateQueryParams(preloadAction, state);
      if (debug && (debug === true || debug.preloadOtherFacets)) debugExecuteSearch(preloadAction, state);
      return runSearch && call(executeSearch, {
        ...action,
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
  const state = yield select();
  const facets = getFacets(state, 'js');
  const tabs = getSearchTabs(state, 'js');
  let nextFacet = tabs === null || tabs === void 0 ? void 0 : tabs[id].currentFacet;
  if (!nextFacet) {
    Object.entries(facets).map(([facetName, facet]) => {
      if (facet.tabId === id && (tabs === null || tabs === void 0 ? void 0 : tabs[id].defaultFacet) === facetName) nextFacet = facetName;
    });
  }
  // If the next Tab does not have a defaultFacet,
  // take the first facet for that tab
  if (!nextFacet) nextFacet = Object.entries(facets).filter(([, f]) => f.tabId === id)[0][0];
  yield put(withMappers(updateCurrentFacet$1(nextFacet), mappers));
}
function* clearFilters(action) {
  const {
    mappers
  } = action;
  const uri = yield buildUri({}, mappers);
  yield put(navigate(uri));
}
function* updateCurrentFacet(action) {
  const {
    facet,
    mappers
  } = action;
  const pageIndex = yield select(getPageIndex, facet);
  const uri = yield buildUri({
    facet,
    pageIndex
  }, mappers);
  yield put(navigate(uri));
}
function* updateSearchTerm(action) {
  const {
    term,
    mappers
  } = action;
  const uri = yield buildUri({
    term
  }, mappers);
  yield put(navigate(uri));
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
  yield put(navigate(uri));
}
function* updatePageIndex(action) {
  const {
    pageIndex,
    mappers,
    scrollToElement
  } = action;
  const uri = yield buildUri({
    pageIndex
  }, mappers);
  yield put(navigate(uri));
  if (typeof scrollToElement !== 'undefined') scrollTo(scrollToElement);
}
function* updatePageSize(action) {
  const {
    pageSize,
    mappers,
    scrollToElement
  } = action;
  const uri = yield buildUri({
    pageSize
  }, mappers);
  yield put(navigate(uri));
  if (typeof scrollToElement !== 'undefined') scrollTo(scrollToElement);
}
function* applySearchFilter(action) {
  const {
    mappers,
    scrollToElement
  } = action;
  const uri = yield buildUri({}, mappers);
  yield put(navigate(uri));
  if (typeof scrollToElement !== 'undefined') scrollTo(scrollToElement);
}
function* buildUri({
  facet,
  orderBy,
  pageIndex = 0,
  pageSize,
  term
}, mappers) {
  const state = yield select();
  const mapUri = (mappers === null || mappers === void 0 ? void 0 : mappers.navigate) || mapStateToSearchUri;
  const uri = mapUri({
    state,
    facet,
    orderBy,
    pageIndex,
    pageSize,
    term
  });
  // return uri;
  return `${uri.path}${uri.search && `?${uri.search}` || ''}${uri.hash && `#${uri.hash}` || ''}`;
}
function* triggerMinilistSsr(options) {
  yield call(doSearch, {
    type: DO_SEARCH,
    ...options
  });
}
function* triggerListingSsr(options) {
  yield call(setRouteFilters, options);
}
function* triggerSearchSsr(options) {
  yield call(setRouteFilters, options);
}

export { expressions as $, updateSelectedFilters as A, updateSortOrder$1 as B, selectListing as C, mapStateToSearchUri as D, Context as E, selectFacets as F, triggerSearch as G, getFilters as H, toArray as I, UPDATE_SELECTED_FILTERS as J, UPDATE_SEARCH_TERM as K, UPDATE_PAGE_SIZE as L, UPDATE_PAGE_INDEX as M, SET_SEARCH_ENTRIES as N, SET_ROUTE_FILTERS as O, LOAD_FILTERS_COMPLETE as P, LOAD_FILTERS_ERROR as Q, LOAD_FILTERS as R, SET_SEARCH_FILTERS as S, EXECUTE_SEARCH_ERROR as T, UPDATE_SORT_ORDER as U, EXECUTE_SEARCH as V, CLEAR_FILTERS as W, APPLY_CONFIG as X, actions as Y, selectors as Z, types as _, getPageIndex as a, queries as a0, doSearch as a1, setRouteFilters as a2, searchSagas as a3, triggerListingSsr as a4, triggerMinilistSsr as a5, triggerSearchSsr as a6, routeParams as a7, defaultExpressions as a8, contentTypeIdExpression as a9, filterExpressions as aa, termExpressions as ab, orderByExpression as ac, customWhereExpressions as ad, cloneDeep as ae, getCurrentTab as b, getFacet as c, getTabFacets as d, getFacetsTotalCount as e, getFacetTitles as f, getCurrentFacet as g, getFeaturedResults as h, getRenderableFilters as i, getIsLoading as j, getPaging as k, getPageIsLoading as l, getResults as m, getSearchTerm as n, getSearchTotalCount as o, getSelectedFilters as p, getQueryParameter as q, getTabsAndFacets as r, getTotalCount as s, clearFilters$1 as t, updateCurrentFacet$1 as u, updateCurrentTab$1 as v, withMappers as w, updatePageIndex$1 as x, updatePageSize$1 as y, updateSearchTerm$1 as z };
//# sourceMappingURL=sagas-DHsYghyI.js.map
