'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactRedux = require('react-redux');
var mapJson = require('jsonpath-mapper');
var immer = require('immer');
var effects = require('@redux-saga/core/effects');
var contensisDeliveryApi = require('contensis-delivery-api');
var queryString = require('query-string');
var log = require('loglevel');
var reselect = require('reselect');
var contensisCoreApi = require('contensis-core-api');
var merge = require('deepmerge');
var equals = require('deep-equal');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var mapJson__default = /*#__PURE__*/_interopDefaultLegacy(mapJson);
var queryString__default = /*#__PURE__*/_interopDefaultLegacy(queryString);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var equals__default = /*#__PURE__*/_interopDefaultLegacy(equals);

/* eslint-disable import/default */
const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    const propKey = wrappedComponentProp[KEY];
    const propValue = wrappedComponentProp[VALUE];
    newProps[propKey] = propValue && typeof propValue === 'object' && 'toJS' in propValue ? propValue.toJS() : propValue;
    return newProps;
  }, {});
  return /*#__PURE__*/React__default['default'].createElement(WrappedComponent, propsJS);
};

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
const clearFilters = () => {
  return {
    type: CLEAR_FILTERS
  };
};
const updatePageIndex = pageIndex => {
  return {
    type: UPDATE_PAGE_INDEX,
    pageIndex
  };
};
const updateCurrentFacet = facet => {
  return {
    type: UPDATE_CURRENT_FACET,
    facet
  };
};
const updateCurrentTab = id => {
  return {
    type: UPDATE_CURRENT_TAB,
    id
  };
};
const updateSearchTerm = term => {
  return {
    type: UPDATE_SEARCH_TERM,
    term
  };
};
const updateSelectedFilters = (filter, key) => {
  return {
    type: UPDATE_SELECTED_FILTERS,
    filter,
    key
  };
};
const updateSortOrder = (orderBy, facet) => {
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
  clearFilters: clearFilters,
  updatePageIndex: updatePageIndex,
  updateCurrentFacet: updateCurrentFacet,
  updateCurrentTab: updateCurrentTab,
  updateSearchTerm: updateSearchTerm,
  updateSelectedFilters: updateSelectedFilters,
  updateSortOrder: updateSortOrder
});

let Context; // export type Context = 'facets' | 'listings' | 'minilist';

(function (Context) {
  Context["facets"] = "facets";
  Context["listings"] = "listings";
  Context["minilist"] = "minilist";
})(Context || (Context = {}));

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

const getSearchContext = state => getImmutableOrJS(state, ['search', 'context'], Context.facets);
const getCurrent = (state, context = Context.facets) => context === Context.facets ? getCurrentFacet(state) : getCurrentListing(state);
const getCurrentFacet = state => getImmutableOrJS(state, ['search', 'currentFacet']);
const getCurrentListing = state => getImmutableOrJS(state, ['search', 'currentListing']);
const getCurrentTab = state => getImmutableOrJS(state, ['search', Context.facets, getCurrentFacet(state), 'tabId'], 0);
const getFacets = (state, returnType) => getImmutableOrJS(state, ['search', Context.facets], {}, returnType);
const getTabFacets = state => Object.fromEntries(Object.entries(getFacets(state)).filter(([key]) => getImmutableOrJS(getFacets(state), [key, 'tabId'], 0) === getCurrentTab(state)));
const getFacetTitles = state => Object.entries(getFacets(state)).map(([key, facet = {}]) => {
  var _facet$pagingInfo;

  return {
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
const getRenderableFilters = (state, facet = '', context = Context.facets) => Object.fromEntries(Object.entries(getFilters(state, facet, context)).filter(([, f = {}]) => typeof f.renderable !== 'boolean' ? true : f.renderable));
const getFiltersToLoad = (state, facet, context = Context.facets, returnType) => {
  const filters = getFilters(state, facet, context, returnType);
  const loadedFilters = Object.entries(filters).map(([key, f = {}]) => [key, (f.items || []).filter(i => {
    const title = i === null || i === void 0 ? void 0 : i.title;
    return typeof title !== 'undefined' && !!title;
  }).length > 0 && (f.isError || false) === false]);
  return loadedFilters.map(([filterKey, isLoaded]) => !isLoaded ? filterKey : null).filter(f => !!f);
}; // We lowercase the filter key unless it's an ISO date string where the T must be uppercase

const getSelectedFilters = (state, facet = '', context = Context.facets, returnType) => {
  const filters = getFilters(state, facet, context, returnType);
  const isoDateRegex = RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d/);
  const selectedFilters = Object.fromEntries(Object.entries(filters).map(([key, filter = {}]) => [key, (filter.items || []).filter(item => !!(item.isSelected || false)).map(item => {
    const key = (item === null || item === void 0 ? void 0 : item.key) || '';
    const isIsoDate = isoDateRegex.test(key);
    return isIsoDate ? key : key.toLowerCase();
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
const getFeaturedResults = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'featuredResults'], []);
};
const getPaging = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo'], {});
};
const getPageIndex = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'pageIndex']);
};
const getPrevPageIndex = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'prevPageIndex']);
};
const getPageIsLoading = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'isLoading']);
};
const getPagesLoaded = (state, current = '', context = Context.facets) => {
  return getImmutableOrJS(state, ['search', context, current || getCurrent(state, context), 'pagingInfo', 'pagesLoaded'], []);
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
    return { ...tab,
      [Context.facets]: Object.fromEntries(thisTabFacets),
      totalCount: thisTabTotal
    };
  });
  const fromJS = makeFromJS(returnType);
  return fromJS(tabsAndFacets);
};
const getSearchTotalCount = state => {
  const tabsAndFacets = getTabsAndFacets(state);
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
}; // An exported copy of the relevant selectors pre-scoped to a listing context

const selectListing = {
  getCurrent: getCurrentListing,
  getFeaturedResults: (state, listing = '') => getFeaturedResults(state, listing, Context.listings),
  getFilters: (state, listing = '') => getFilters(state, listing, Context.listings),
  getFiltersToLoad: (state, listing = '') => getFiltersToLoad(state, listing, Context.listings),
  getListing,
  getIsLoaded: state => getIsLoaded(state, Context.listings),
  getIsLoading: state => getIsLoading(state, Context.listings),
  getPageIndex: (state, listing = '') => getPageIndex(state, listing, Context.listings),
  getPaging: (state, listing = '') => getPaging(state, listing, Context.listings),
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
  getResults: (state, listing = '') => getResults(state, listing, Context.listings),
  getSearchTerm,
  getTotalCount: (state, listing = '') => getTotalCount(state, listing, Context.listings),
  getSelectedFilters: (state, listing = '') => getSelectedFilters(state, listing, Context.listings)
};
const selectCurrentPath = state => getImmutableOrJS(state, ['routing', 'currentPath']);
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
  selectVersionStatus: selectVersionStatus
});

// eslint-disable-next-line import/default

/* eslint-disable @typescript-eslint/naming-convention */
const withSearch = mappers => SearchComponent => {
  const Wrapper = props => {
    return /*#__PURE__*/React__default['default'].createElement(SearchComponent, props);
  };

  Wrapper.displayName = `withSearch(${SearchComponent.displayName || SearchComponent.name})`;

  const mapStateToProps = state => {
    return {
      currentFacet: getCurrentFacet(state),
      currentPageIndex: getPageIndex(state),
      currentTabIndex: getCurrentTab(state),
      facet: getFacet(state),
      facets: getTabFacets(state),
      facetsTotalCount: getFacetsTotalCount(state),
      facetTitles: getFacetTitles(state),
      featuredResults: getFeaturedResults(state),
      filters: getRenderableFilters(state),
      isLoading: getIsLoading(state),
      paging: getPaging(state),
      pageIsLoading: getPageIsLoading(state),
      results: getResults(state),
      resultsInfo: (mappers === null || mappers === void 0 ? void 0 : mappers.resultsInfo) && mappers.resultsInfo(state),
      searchTerm: getSearchTerm(state),
      searchTotalCount: getSearchTotalCount(state),
      sortOrder: getQueryParameter({
        state
      }, 'dynamicOrderBy', []),
      tabsAndFacets: getTabsAndFacets(state),
      totalCount: getTotalCount(state)
    };
  };

  const mapDispatchToProps = {
    clearFilters: () => withMappers(clearFilters(), mappers),
    updateCurrentFacet: facet => withMappers(updateCurrentFacet(facet), mappers),
    updateCurrentTab: id => withMappers(updateCurrentTab(id), mappers),
    updatePageIndex: pageIndex => withMappers(updatePageIndex(pageIndex), mappers),
    updateSearchTerm: term => withMappers(updateSearchTerm(term), mappers),
    updateSelectedFilters: (filter, key) => withMappers(updateSelectedFilters(filter, key), mappers),
    updateSortOrder: orderBy => withMappers(updateSortOrder(orderBy), mappers)
  };
  const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps);
  return connector(toJS(Wrapper));
};

/* eslint-disable @typescript-eslint/naming-convention */

const withListing = mappers => ListingComponent => {
  const Wrapper = props => {
    return /*#__PURE__*/React__default['default'].createElement(ListingComponent, props);
  };

  Wrapper.displayName = `withListing(${ListingComponent.displayName || ListingComponent.name})`;
  const {
    getCurrent,
    getFeaturedResults,
    getIsLoading,
    getListing,
    getPageIndex,
    getPaging,
    getQueryParameter,
    getRenderableFilters,
    getResults,
    getSearchTerm
  } = selectListing;

  const mapStateToProps = state => {
    return {
      currentListing: getCurrent(state),
      currentPageIndex: getPageIndex(state),
      listing: getListing(state),
      featured: getFeaturedResults(state),
      filters: getRenderableFilters(state),
      isLoading: getIsLoading(state),
      paging: getPaging(state),
      results: getResults(state),
      resultsInfo: mappers && typeof mappers.resultsInfo === 'function' && mappers.resultsInfo(state),
      searchTerm: getSearchTerm(state),
      sortOrder: getQueryParameter({
        state
      }, 'dynamicOrderBy', [])
    };
  };

  const mapDispatchToProps = {
    clearFilters: () => withMappers(clearFilters(), mappers),
    updateCurrentFacet: facet => withMappers(updateCurrentFacet(facet), mappers),
    updatePageIndex: pageIndex => withMappers(updatePageIndex(pageIndex), mappers),
    updateSearchTerm: term => withMappers(updateSearchTerm(term), mappers),
    updateSelectedFilters: (filter, key) => withMappers(updateSelectedFilters(filter, key), mappers),
    updateSortOrder: orderBy => withMappers(updateSortOrder(orderBy), mappers)
  };
  return reactRedux.connect(mapStateToProps, mapDispatchToProps)(toJS(Wrapper));
};

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
  }

  return [];
};
const extractQuotedPhrases = searchTerm => {
  const pattern = new RegExp(/(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/gm);
  return (searchTerm.match(pattern) || []).map(match => match.replace(/"/g, ''));
};
const buildUrl = (route, params) => {
  const qs = queryString__default['default'].stringify(params);
  const path = qs ? `${route}?${qs}` : route;
  return path;
};
const callCustomApi = async (customApi, filters) => {
  const apiUri = customApi.uri || '';
  let uri = buildUrl(apiUri, filters);
  if (!uri) throw new Error('uri is required to use customApi');
  if (typeof window == 'undefined' && uri.startsWith('/')) uri = `http://localhost:3001${uri}`;
  const response = await fetch(uri);
  return await response.json();
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
  if (!field || !value) return [];
  if (Array.isArray(field)) // If an array of fieldIds have been provided, call self for each fieldId
    // to generate expressions that are combined with an 'or' operator
    return [contensisCoreApi.Op.or(...field.map(fieldId => fieldExpression(fieldId, value, operator, weight)).flat())];
  if (operator === 'between') return between(field, value);
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? [contensisCoreApi.Op[operator](field, value, undefined, undefined)] : [contensisCoreApi.Op[operator](field, value, undefined, undefined).weight(weight)];
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
const filterExpressions = filters => {
  if (!filters) return [];
  const expressions = [];
  filters.map(param => {
    expressions.push(...fieldExpression(param.key, param.value, param.operator || 'in'));
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
    if (withContentTypeIds.length > 0) andExpr.add(withExpr);
    if (notContentTypeIds.length > 0) andExpr.add(notExpr);
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
    if (value.length === 1) return [contensisCoreApi.Op[operator](field, value[0], undefined, undefined)];
    return [contensisCoreApi.Op.in(field, ...value)];
  }

  return [];
};

const between = (field, value) => {
  const handle = betweenValue => {
    const valArr = betweenValue.split('-');

    if (valArr.length > 1) {
      const [minimum, maximum = null] = betweenValue.split('-');
      return contensisCoreApi.Op.between(field, minimum, maximum);
    } else {
      // eslint-disable-next-line no-console
      console.log(`[search] You have supplied only one value to a "between" operator which must have two values. Your supplied value "${valArr.length && valArr[0]}" has been discarded.`);
      return false;
    }
  };

  if (value.length === 0) return [];
  if (Array.isArray(value)) return [contensisCoreApi.Op.or(...value.map(handle).filter(bc => bc !== false))]; // const valArr = value.split('-');

  const op = handle(value);
  return op ? [op] : []; // valArr.length > 1 ? [Op.between(field, ...value.split('-'))] : [];
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

            if (notIdx === 1) {
              expression = contensisCoreApi.Op.not(contensisCoreApi.Op[innerOperator](innerField, innerValue));
            }
          });
        }
      } // Map the expression when we've looped and scoped to
      // the second property inside the clause


      operator = Object.keys(clause).find(clauseKey => !['field', 'weight'].includes(clauseKey));

      if (idx === 1 && // operator !== 'and' &&
      // operator !== 'or' &&
      operator !== 'between' && operator !== 'distanceWithin') {
        expression = operator === 'freeText' || operator === 'contains' ? contensisCoreApi.Op[operator](field, value) : operator === 'in' ? contensisCoreApi.Op[operator](field, ...value) : contensisCoreApi.Op[operator](field, value);
        if (typeof weight === 'number') expression = expression.weight(weight);
      }
    });
    return expression;
  });
};
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
    const currentFacet = getSearchContext(state) !== Context.listings && (facet || getCurrentFacet(state));
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
    const currentQs = removeEmptyAttributes(queryString__default['default'].parse(currentSearch));
    if (orderBy) currentQs.orderBy = orderBy;
    const searchTerm = getSearchTerm(state); // Use Immutable's merge to merge the stateFilters with any current Qs
    // to build the new Qs.

    const mergedSearch = removeEmptyAttributes({ ...merge__default['default'](currentQs, stateFilters),
      term: searchTerm
    });
    return queryString__default['default'].stringify(mergedSearch);
  },
  hash: {
    $path: 'state',
    $formatting: state => getImmutableOrJS(state, ['routing', 'location', 'hash'], '').replace('#', '')
  }
};

const mapStateToSearchUri = params => mapJson__default['default'](params, searchUriTemplate);

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
    filter
  }) => filter.contentTypeId ? FilterExpressionTypes.contentType : FilterExpressionTypes.field,
  // Key: so we can target the query to a specific field
  key: 'filter.fieldId',
  // Value: so we can filter a specific field by an array of values
  // e.g. taxonomy key or contentTypeId array
  value: 'selectedValue',
  operator: 'filter.fieldOperator'
};

const mapFilterToFilterExpression = filter => mapJson__default['default'](filter, filterExpressionMapper);

const mapFiltersToFilterExpression = (filters, selectedFilters) => {
  if (!selectedFilters || Object.keys(selectedFilters).length === 0) return [];
  const filterExpressions = []; // Iterate through the keys in selectedFilters and locate
  // the items that are selected and queryable

  Object.entries(selectedFilters).map(([fkey, selectedValue]) => {
    const filter = filters[fkey];

    if (selectedValue && filter) {
      const selectedItems = filter.items && filter.items.filter(itm => itm.isSelected) || []; // Where we have a value for a selectedFilter
      // and a filter is found for the current key
      // map the filter to a filterExpression object

      const expr = mapFilterToFilterExpression({
        filter,
        selectedItems,
        selectedValue
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
    return !action.preload ? getPageIndex(state, '', action.context) : 0;
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

    return (_getFacet = getFacet(state, facet, context)) === null || _getFacet === void 0 ? void 0 : _getFacet.projectId;
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
    return deduped; // return wsf;
  },
  webpageTemplates: root => getQueryParameter(root, 'webpageTemplates', [])
};

const mapStateToQueryParams = sourceJson => mapJson__default['default'](sourceJson, queryParamsTemplate);

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

  if (context === Context.facets && ssr || // context === Context.minilist ||
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
  const selectedFilters = getSelectedFilters(ogState, facet, context);
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
  const stateParams = getQueryParams(action.ogState || state, action.facet, action.context);
  stateParams.pageIndex = getPageIndex(action.ogState || state, action.facet, action.context);
  stateParams.searchTerm = getSearchTerm(action.ogState || state);
  console.log(stateParams, queryParams);
  console.log('getSelectedFilters', getSelectedFilters(action.ogState || state, action.facet, action.context), 'params', action.params);
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
      return mapJson__default['default'](entry, template);
    }

    return entry;
  });
};

const searchSagas = [effects.takeEvery(CLEAR_FILTERS, clearFilters$1), effects.takeEvery(DO_SEARCH, doSearch), effects.takeEvery(SET_ROUTE_FILTERS, loadFilters), effects.takeEvery(SET_SEARCH_ENTRIES, preloadOtherFacets), effects.takeEvery(UPDATE_CURRENT_FACET, updateCurrentFacet$1), effects.takeEvery(UPDATE_CURRENT_TAB, updateCurrentTab$1), effects.takeEvery(UPDATE_PAGE_INDEX, updatePageIndex$1), effects.takeEvery(UPDATE_SEARCH_TERM, updateSearchTerm$1), effects.takeEvery(UPDATE_SORT_ORDER, updateSortOrder$1), effects.takeEvery(UPDATE_SELECTED_FILTERS, applySearchFilter)];
function* setRouteFilters(action) {
  const {
    mappers,
    params,
    listingType,
    defaultLang,
    debug
  } = action;
  const context = listingType ? Context.listings : Context.facets;
  const state = yield effects.select();
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
  yield effects.put(nextAction); // Using call instead of triggering from the put
  // to allow this exported saga to continue during SSR

  yield effects.call(ensureSearch, { ...nextAction,
    ogState: state
  });
}
function* doSearch(action) {
  const state = yield effects.select();

  if (action.config) {
    // If the action contains a config object, we can add this to the
    // state at runtime
    yield effects.put({ ...action,
      type: APPLY_CONFIG
    });
  }

  const nextAction = { ...action,
    type: SET_SEARCH_FILTERS,
    ssr: getIsSsr(state)
  };
  yield effects.put(nextAction);
  yield effects.call(ensureSearch, { ...nextAction,
    ogState: state
  });
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

  const nextAction = mapJson__default['default'](createStateFrom, filterTemplate);
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
      ogState: action.ogState || state
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
    const state = yield effects.select();
    let result = {};
    let featuredResult;
    let featuredQuery;
    const customApi = getCustomApi(state, facet, context, 'js');

    if (customApi) {
      const apiParams = typeof mappers === 'object' && typeof mappers.customApi === 'function' && mappers.customApi(queryParams) || {};
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
    const nextAction = mapJson__default['default'](createStateFrom, facetTemplate);
    yield effects.put(nextAction);
  } catch (error) {
    // eslint-disable-next-line import/namespace
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
  const state = yield effects.select();
  const currentFacet = getCurrentFacet(state);

  if (!preload && facet === currentFacet && context !== Context.listings) {
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

function* updateCurrentTab$1(action) {
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
  yield effects.put(withMappers(updateCurrentFacet(nextFacet), mappers));
}

function* clearFilters$1(action) {
  const {
    mappers
  } = action;
  const uri = yield buildUri({}, mappers);
  yield effects.put(navigate(uri));
}

function* updateCurrentFacet$1(action) {
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

function* updateSearchTerm$1(action) {
  const {
    term,
    mappers
  } = action;
  const uri = yield buildUri({
    term
  }, mappers);
  yield effects.put(navigate(uri));
}

function* updateSortOrder$1(action) {
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

function* updatePageIndex$1(action) {
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
  const mapUri = mappers && mappers.navigate || mapStateToSearchUri;
  const uri = mapUri({
    state,
    facet,
    orderBy,
    pageIndex,
    term
  }); // return uri;

  return `${uri.path}${uri.search && `?${uri.search}` || ''}${uri.hash && `#${uri.hash}` || ''}`;
}

const makeSelectMinilistProps = () => reselect.createSelector(state => state, (_, id) => id, (state, id) => ({
  facet: getFacet(state, id, Context.minilist),
  filters: getFilters(state, id, Context.minilist),
  isLoading: getIsLoading(state, Context.minilist, id),
  pagingInfo: getPaging(state, id, Context.minilist),
  results: getResults(state, id, Context.minilist),
  searchTerm: getSearchTerm(state)
}));

const useMinilist = ({
  id,
  config,
  excludeIds,
  mapper,
  mappers,
  params,
  defaultLang,
  debug
} = {
  id: ''
}) => {
  const dispatch = reactRedux.useDispatch();
  const selectMinilistProps = React.useMemo(makeSelectMinilistProps, [id]);
  const {
    facet,
    filters,
    isLoading,
    pagingInfo,
    results,
    searchTerm
  } = reactRedux.useSelector(state => selectMinilistProps(state, id)); // useSelector((state: AppState) => ({
  //   facet: getFacet(state, id, Context.minilist).toJS(),
  //   filters: getFilters(state, id, Context.minilist).toJS(),
  //   isLoading: getIsLoading(state, Context.minilist, id),
  //   pagingInfo: getPaging(state, id, Context.minilist).toJS(),
  //   results: getResults(state, id, Context.minilist).toJS(),
  //   searchTerm: getSearchTerm(state),
  // }));

  React.useEffect(() => {
    if (id && (mapper || mappers && mappers.results)) {
      dispatch(triggerSearch({
        config,
        context: Context.minilist,
        defaultLang,
        facet: id,
        mapper,
        mappers,
        params,
        excludeIds,
        debug
      }));
    }
  }, [dispatch, excludeIds, id, defaultLang, params]);
  return {
    filters,
    isLoading,
    pagingInfo,
    results,
    searchTerm,
    title: facet.title
  };
};

const entries = {
  isLoading: false,
  isError: false,
  items: []
};
const pagingInfo = {
  isLoading: false,
  pageCount: 0,
  pageIndex: 0,
  pageSize: 0,
  pagesLoaded: [],
  prevPageIndex: 0,
  totalCount: 0
};
const searchFacet = {
  title: null,
  featuredEntries: entries,
  featuredResults: [],
  entries,
  results: [],
  queryParams: {},
  filters: {},
  queryDuration: 0,
  pagingInfo,
  projectId: ''
};
const searchTab = {
  currentFacet: undefined,
  facets: {},
  id: 0,
  label: undefined,
  totalCount: ''
};
const filtering = {
  isLoading: false,
  isError: false,
  isGrouped: false,
  title: undefined,
  contentTypeId: undefined,
  customWhere: [],
  fieldId: undefined,
  items: []
};
const filterItem = {
  key: '',
  type: undefined,
  title: undefined,
  path: undefined,
  isSelected: false
};
const config = {
  isLoaded: false,
  isError: false
};
const searchState = {
  context: 'facets',
  currentFacet: '',
  currentListing: '',
  facets: {},
  listings: {},
  minilist: {},
  term: '',
  tabs: [],
  config
};
const initialState = searchState;

var schema = /*#__PURE__*/Object.freeze({
  __proto__: null,
  entries: entries,
  pagingInfo: pagingInfo,
  searchFacet: searchFacet,
  searchTab: searchTab,
  filtering: filtering,
  filterItem: filterItem,
  initialState: initialState
});

const addConfigToState = (state, action) => {
  const {
    context,
    facet,
    config
  } = action; // Adding or changing the config of a single facet, listing or minilist

  if (context && facet && config) {
    state[context][facet] = config;
  } else if (config) {
    // Changing the entire search config
    state = config;
  }

  return state;
};

const generateSearchFacets = (context, config) => {
  const facets = {};

  if (config) {
    const thisConfig = config[context] || {};

    if (Object.keys(thisConfig).length > 0) {
      Object.entries(thisConfig).map(([facetName, facet]) => {
        const newFacet = merge__default['default'](searchFacet, facet);
        if (!('isDisabled' in facet) || facet.isDisabled !== true) facets[facetName] = newFacet;
      });
    }
  }

  return facets;
};

const generateFiltersState = ({
  facet,
  params,
  context,
  isCurrentFacet
}, state) => {
  // Remove filters we know about from params
  const filterParams = { ...params,
    facet: undefined,
    orderBy: undefined,
    pageIndex: undefined,
    term: undefined
  }; // Get any existing filters and normalise the items[]
  // so we can start off with isSelected is false

  let filters = Object.entries(state[context][facet].filters).map(([key, filter]) => {
    if (isCurrentFacet || filter.isGrouped) {
      var _filter$items;

      return [key, { ...filter,
        items: (_filter$items = filter.items) === null || _filter$items === void 0 ? void 0 : _filter$items.map(item => ({ ...item,
          isSelected: false
        }))
      }];
    }

    return [key, filter];
  });

  const addFilterItem = (filters, paramKey, paramValue) => // Iterate through all filters within the facet,
  // if the paramKey matches the filter key
  // get the existing items list, and see if that filter
  // already exists, if so set isSelected to true,
  // if not create a new filterItem, setting the key only
  // so we can match this key later on when we load the filters
  filters.map(([key, filter]) => {
    if (paramKey !== key || !isCurrentFacet && !filter.isGrouped) {
      return [key, filter];
    } else {
      const items = filter.items || [];
      const itemIndex = items.findIndex(item => (item === null || item === void 0 ? void 0 : item.key) === paramValue);

      if (items.length > 0 && itemIndex !== -1) {
        items[itemIndex].isSelected = true;
      } else {
        items.push({ ...filterItem,
          key: paramValue,
          isSelected: true
        });
      }

      return [key, { ...filter,
        items
      }];
    }
  }); // For each value found in filterParams
  // we are looking to split that value into multiple by any comma
  // and then either set isSelected for an existing filterItem
  // or push an item to the filters.{ key }.items[] array
  // giving it only the key (entry guid) that can be taken to filter
  // the search results during SSR without needing to fetch the filters first


  Object.entries(filterParams).map(([paramName = '', paramValue]) => typeof paramValue === 'string' && paramValue.split(',').map(pVal => filters = addFilterItem(filters, paramName, pVal)));
  return Object.fromEntries(filters);
};

const resetFacets = (state, context) => Object.fromEntries(Object.entries(state[context]).map(([k, v]) => [k, resetFacet(v)]));

const resetFacet = facet => {
  facet.pagingInfo.pagesLoaded = [];
  facet.pagingInfo.pageIndex = 0;
  facet.queryDuration = 0;
  return facet;
};

var reducers = (config => {
  // Add facets from SearchConfig to initialState
  const initState = { ...initialState,
    tabs: config.tabs,
    facets: generateSearchFacets(Context.facets, config),
    listings: generateSearchFacets(Context.listings, config),
    minilist: generateSearchFacets(Context.minilist, config)
  };
  return immer.produce((state = initState, action) => {
    const context = state.context;
    const current = context !== 'listings' ? state.currentFacet : state.currentListing;

    switch (action.type) {
      case APPLY_CONFIG:
        {
          state = addConfigToState(state, action);
          return;
        }

      case CLEAR_FILTERS:
        {
          const currentFilters = state[context][current].filters;
          state[context][current].filters = Object.fromEntries(Object.entries(currentFilters).map(([key, filter]) => {
            const filterItems = filter.items || [];
            filter.items = filterItems.map(item => ({ ...item,
              isSelected: false
            }));
            return [key, filter];
          }));
          state[context][current].queryDuration = 0;
          state[context][current].pagingInfo.pagesLoaded = [];
          return;
        }

      case EXECUTE_SEARCH:
        {
          state[action.context][action.facet].entries.isLoading = true;
          return;
        }

      case EXECUTE_SEARCH_ERROR:
        {
          state[action.context][action.facet].entries = { ...entries,
            isError: true,
            error: action.error
          };
          return;
        }

      case LOAD_FILTERS:
        {
          const {
            facetKey,
            filtersToLoad
          } = action;
          const filters = state[action.context][facetKey].filters;
          Object.entries(filters).map(([filterKey, filter]) => {
            if (filtersToLoad.find(f => f === filterKey)) return { ...filter,
              isLoading: true
            };
            return filter;
          });
          state[action.context][facetKey].filters = Object.fromEntries(Object.entries(filters).map(([filterKey, filter]) => {
            if (filtersToLoad.find(f => f === filterKey)) return [filterKey, { ...filter,
              isLoading: true
            }];
            return [filterKey, filter];
          }));
          return;
        }

      case LOAD_FILTERS_ERROR:
      case LOAD_FILTERS_COMPLETE:
        {
          const {
            facetKey,
            filterKey,
            nextFilter
          } = action;
          const filter = state[action.context][facetKey].filters[filterKey];

          if (!(nextFilter.items && nextFilter.items.length > 0) && (filter.items || []).length >= nextFilter.items.length) {
            // Preserve items already in state
            state[action.context][facetKey].filters[filterKey] = { ...filter,
              isLoading: false,
              isError: nextFilter.isError
            };
            return;
          }

          state[action.context][facetKey].filters[filterKey] = merge__default['default'](filter, nextFilter, {
            arrayMerge: (source, inbound) => inbound
          });
          return;
        }

      case SET_ROUTE_FILTERS:
        {
          const {
            facet,
            params,
            context
          } = action;
          const {
            term = '',
            pageIndex,
            orderBy
          } = params;
          const stateTerm = state.term;
          const tabId = state[context][facet].tabId || 0; // Reset the facet if the search term has changed, or if the any of
          // the filters have changed

          const resetAllFacets = stateTerm && term !== stateTerm;
          let resetCurrentFacet = false; // Add filter values in params to the matched filters in state for the current facet
          // causing unfetched filter items to be generated with isSelected: true
          // or existing filter items to be tagged with isSelected: true

          const nextFacets = Object.fromEntries(Object.entries(state[context]).map(([facetName = '', stateFacet]) => {
            const isCurrentFacet = facetName === facet;
            const nextFilters = generateFiltersState({
              facet: facetName,
              params,
              context,
              isCurrentFacet
            }, state);
            resetCurrentFacet = state.config.isLoaded === true && !equals__default['default'](nextFilters, stateFacet.filters);
            stateFacet = resetCurrentFacet ? resetFacet(stateFacet) : stateFacet;
            stateFacet.filters = nextFilters;
            stateFacet.queryParams.dynamicOrderBy = toArray(orderBy) || [];
            return [facetName, stateFacet];
          }));
          state.context = context;
          state[context] = nextFacets;
          state[action.context === Context.facets ? 'currentFacet' : 'currentListing'] = facet;
          state.term = term;
          state.tabs[tabId].currentFacet = facet;
          state[context][facet].pagingInfo.pageIndex = Number(pageIndex) - 1 || (state[context][facet].queryParams.loadMorePaging ? state[context][facet].pagingInfo.pageIndex || 0 : 0);
          state.config.isLoaded = true;
          state.config.ssr = typeof window === 'undefined';
          if (resetAllFacets) state[context] = resetFacets(state, context);
          return;
        }

      case SET_SEARCH_ENTRIES:
        {
          const thisContext = action.context || context;
          const currentFacet = state[thisContext][action.facet];
          state[thisContext][action.facet] = merge__default['default'](currentFacet, action.nextFacet, {
            arrayMerge: (source, inbound) => inbound
          });
          return;
        }

      case SET_SEARCH_FILTERS:
        {
          var _action$params;

          // DO SEARCH then SET_SEARCH_FILTERS is for when we cannot use SET_ROUTE_FILTERS
          // for example in a minilist scenario where the route filters
          // are used for the primary page / listing navigation
          // Add filter values in params to the matched filters in state
          // causing unfetched filter items to be generated with isSelected: true
          const filters = generateFiltersState({ ...action,
            isCurrentFacet: true
          }, state);
          const term = action === null || action === void 0 ? void 0 : (_action$params = action.params) === null || _action$params === void 0 ? void 0 : _action$params.term;
          const useSearchTerm = state[action.context || Context.minilist][action.facet].queryParams.useSearchTerm || false;
          state[action.context || Context.minilist][action.facet].filters = filters;
          state[action.context || Context.minilist][action.facet].queryParams.excludeIds = action.excludeIds;
          state.term = useSearchTerm ? term : state.term;
          state.config.ssr = typeof window === 'undefined';
          return;
        }

      case UPDATE_PAGE_INDEX:
        {
          const {
            pageIndex
          } = action;
          const internalPaging = state[context][current].queryParams.internalPaging || false;
          const currentPageIndex = state[context][current].pagingInfo.pageIndex || 0;
          state[context][current].pagingInfo.pageIndex = Number(pageIndex) || 0;
          state[context][current].pagingInfo.prevPageIndex = currentPageIndex;
          state[context][current].pagingInfo.isLoading = true;
          if (internalPaging) return;
          state[context][current].queryDuration = 0;
          return;
        }

      case UPDATE_SEARCH_TERM:
        {
          state.term = action.term;
          state[context] = resetFacets(state, context);
          return;
        }

      case UPDATE_SELECTED_FILTERS:
        {
          const {
            filter,
            key
          } = action;
          const isSingleSelect = state[context][current].filters[filter].isSingleSelect || false;
          const isGrouped = state[context][current].filters[filter].isGrouped || false;
          const currentItems = state[context][current].filters[filter].items;
          if (isGrouped) state[context] = resetFacets(state, context);
          state[context][current] = resetFacet(state[context][current]);
          state[context][current].filters[filter].items = currentItems === null || currentItems === void 0 ? void 0 : currentItems.map(item => {
            if (item.key === key) {
              return { ...item,
                isSelected: !item.isSelected
              };
            }

            if (isSingleSelect) return { ...item,
              isSelected: false
            };
            return item;
          });
          return;
        }

      case UPDATE_SORT_ORDER:
        {
          const {
            orderBy,
            facet
          } = action;
          state[context] = resetFacets(state, context);
          const currentFacet = facet || current;
          state[context][currentFacet].queryParams.dynamicOrderBy = orderBy ? toArray(orderBy) || [] : [];
          return;
        }

      default:
        return;
    }
  }, initState);
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Context$1 = {
  facets: 'facets',
  listings: 'listings',
  minilist: 'minilist'
};

exports.Context = Context$1;
exports.actions = actions;
exports.doSearch = doSearch;
exports.queries = queries;
exports.reducer = reducers;
exports.sagas = searchSagas;
exports.schema = schema;
exports.selectors = selectors;
exports.setRouteFilters = setRouteFilters;
exports.types = types;
exports.useMinilist = useMinilist;
exports.withListing = withListing;
exports.withSearch = withSearch;
//# sourceMappingURL=search.js.map
