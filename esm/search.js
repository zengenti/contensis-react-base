import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import mapJson from 'jsonpath-mapper';
import { OrderedMap, Map, List, Set, fromJS } from 'immutable';
import { takeEvery, select, put, call, all } from '@redux-saga/core/effects';
import { Client } from 'contensis-delivery-api';
import queryString from 'query-string';
import { error } from 'loglevel';
import { Op, OrderBy, Query } from 'contensis-core-api';

/* eslint-disable @typescript-eslint/ban-types */
const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    newProps[wrappedComponentProp[KEY]] = 'toJS' in wrappedComponentProp[VALUE] ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
    return newProps;
  }, {});
  return /*#__PURE__*/React.createElement(WrappedComponent, propsJS);
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

const getSearchContext = state => state.getIn(['search', 'context'], Context.facets);
const getCurrent = (state, context = Context.facets) => context === Context.facets ? getCurrentFacet(state) : getCurrentListing(state);
const getCurrentFacet = state => state.getIn(['search', 'currentFacet']);
const getCurrentListing = state => state.getIn(['search', 'currentListing']);
const getCurrentTab = state => state.getIn(['search', Context.facets, getCurrentFacet(state), 'tabId'], 0);
const getFacets = state => state.getIn(['search', Context.facets], OrderedMap());
const getTabFacets = state => getFacets(state).filter((v, key) => getFacets(state).getIn([key, 'tabId'], 0) === getCurrentTab(state));
const getFacetTitles = state => getFacets(state).map((facet = Map(), key) => ({
  key,
  title: facet.get('title'),
  totalCount: facet.getIn(['pagingInfo', 'totalCount'])
})).toIndexedSeq().toArray();
const getFacet = (state, facetName = '', context = Context.facets) => {
  const currentFacet = facetName || getCurrentFacet(state);
  return state.getIn(['search', context, currentFacet], Map());
};
const getListing = (state, listing = '') => {
  const currentListing = listing || getCurrentListing(state);
  return state.getIn(['search', Context.listings, currentListing], Map());
};
const getFilters = (state, facet, context = Context.facets) => {
  return state.getIn(['search', context, facet || getCurrent(state, context), 'filters'], Map());
};
const getRenderableFilters = (state, facet = '', context = Context.facets) => getFilters(state, facet, context).filter((f = Map()) => f.get('renderable', true));
const getFiltersToLoad = (state, facet, context = Context.facets) => {
  const filters = getFilters(state, facet, context);
  const loadedFilters = filters.map((f = Map()) => (f.get('items') || List()).filter(i => {
    const title = i === null || i === void 0 ? void 0 : i.get('title');
    return typeof title !== 'undefined' && !!title;
  }).size > 0 && f.get('isError', false) === false);
  return loadedFilters.map((isLoaded, filterKey) => !isLoaded ? filterKey : null).toList().filter(f => !!f);
}; // We lowercase the filter key unless it's an ISO date string where the T must be uppercase

const getSelectedFilters = (state, facet = '', context = Context.facets) => {
  const filters = getFilters(state, facet, context);
  const isoDateRegex = RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d/);
  const selectedFilters = filters.map((filter = Map()) => (filter.get('items') || List()).filter(item => !!(item !== null && item !== void 0 && item.get('isSelected', false))).map(item => {
    const key = item === null || item === void 0 ? void 0 : item.get('key', '');
    const isIsoDate = isoDateRegex.test(key);
    return isIsoDate ? key : key.toLowerCase();
  }));
  return selectedFilters;
};
const getResults = (state, current = '', context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'results'], List());
};
const getIsInternalPaging = (state, current, context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'queryParams', 'internalPaging'], false);
};
const getIsLoaded = (state, context = Context.facets, facet) => {
  return !!state.getIn(['search', context, facet || getCurrent(state, context), 'queryDuration'], 0);
};
const getIsLoading = (state, context = Context.facets, facet) => {
  return state.getIn(['search', context, facet || getCurrent(state, context), 'entries', 'isLoading']);
};
const getIsSsr = state => {
  return state.getIn(['search', 'config', 'ssr'], false);
};
const getFeaturedResults = (state, current = '', context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'featuredResults'], List());
};
const getPaging = (state, current = '', context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo'], Map());
};
const getPageIndex = (state, current = '', context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo', 'pageIndex']);
};
const getPrevPageIndex = (state, current = '', context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo', 'prevPageIndex']);
};
const getPageIsLoading = (state, current = '', context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo', 'isLoading']);
};
const getPagesLoaded = (state, current = '', context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo', 'pagesLoaded'], Set());
};
const getTotalCount = (state, current = '', context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo', 'totalCount']);
};
const getFacetAuthentication = (state, facet) => state.getIn(['search', Context.facets, facet, 'authentication']);
const getFeaturedEntryIds = state => {
  const currentFacet = getCurrentFacet(state);
  const entryIds = state.getIn(['search', Context.facets, currentFacet, 'featuredEntries', 'items']).map(entry => entry.getIn(['sys', 'id']));
  return entryIds;
};
const getSearchTerm = state => state.getIn(['search', 'term']);
const getSearchTabs = state => state.getIn(['search', 'tabs']);
const getQueryParams = (state, current = '', context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'queryParams'], Map());
};
const getQueryParameter = ({
  state,
  facet,
  context = Context.facets
}, key, ifnull = null) => {
  return getQueryParams(state, facet, context).get(key, ifnull) || ifnull;
};
const getCustomApi = (state, current, context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'customApi']);
};
const getCustomEnv = (state, current, context = Context.facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'env']);
};
const getTabsAndFacets = state => {
  const tabs = getSearchTabs(state);
  const facets = getFacets(state);
  return (tabs || List()).map((tab = Map()) => {
    const fieldsToCount = tab.get('totalCount');
    let countFields;
    if (typeof fieldsToCount === 'string') countFields = List([List([fieldsToCount])]);
    const thisTabFacets = facets.filter((v, key) => facets.getIn([key, 'tabId'], 0) === tab.get('id'));
    const thisTabTotal = thisTabFacets.map((facet = Map(), facetName) => {
      if (!countFields || countFields.find((f = List()) => f.first() === facetName)) return facet.getIn(['pagingInfo', 'totalCount']);
      return 0;
    }).reduce((a, b) => a + b, 0);
    return tab.set(Context.facets, thisTabFacets).set('totalCount', thisTabTotal);
  });
};
const getSearchTotalCount = state => {
  const tabsAndFacets = getTabsAndFacets(state);
  const wholeSearchTotal = tabsAndFacets.map((t = Map()) => t.get('totalCount')).reduce((a, b) => a + b, 0);
  return wholeSearchTotal;
};
const getFacetsTotalCount = state => {
  const facets = getFacets(state);
  const wholeSearchTotal = facets.map((t = Map()) => t.getIn(['pagingInfo', 'totalCount'])).reduce((a, b) => a + b, 0);
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
const selectCurrentPath = state => state.getIn(['routing', 'currentPath']);
const selectVersionStatus = state => state.getIn(['version', 'contensisVersionStatus']);

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
  getFacetAuthentication: getFacetAuthentication,
  getFeaturedEntryIds: getFeaturedEntryIds,
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

/* eslint-disable @typescript-eslint/naming-convention */
const withSearch = mappers => SearchComponent => {
  const Wrapper = props => {
    return /*#__PURE__*/React.createElement(SearchComponent, props);
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
  const connector = connect(mapStateToProps, mapDispatchToProps);
  return connector(toJS(Wrapper));
};

/* eslint-disable @typescript-eslint/naming-convention */

const withListing = mappers => ListingComponent => {
  const Wrapper = props => {
    return /*#__PURE__*/React.createElement(ListingComponent, props);
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
  return connect(mapStateToProps, mapDispatchToProps)(toJS(Wrapper));
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
  const qs = queryString.stringify(params);
  const path = qs ? `${route}?${qs}` : route;
  return path;
};
const callCustomApi = async (customApi, filters) => {
  const apiUri = customApi.get('uri', '');
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
    return [Op.or(...field.map(fieldId => fieldExpression(fieldId, value, operator, weight)).flat())];
  if (operator === 'between') return between(field, value);
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? [Op[operator](field, value, undefined, undefined)] : [Op[operator](field, value, undefined, undefined).weight(weight)];
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
    const andExpr = Op.and();
    const dataFormatExpr = fieldExpression(Fields.sys.dataFormat, dataFormat)[0];
    const withExpr = fieldExpression(Fields.sys.contentTypeId, withContentTypeIds)[0];
    const notExpr = Op.not(fieldExpression(Fields.sys.contentTypeId, notContentTypeIds)[0]);
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

  if (Array.isArray(includeInSearchFields)) expressions.push(...includeInSearchFields.map(includeInSearchField => Op.or(Op.and(Op.exists(includeInSearchField, true), Op.equalTo(includeInSearchField, true)), Op.exists(includeInSearchField, false)))); // If webpageTemplates have been specified, include this expression
  // with the default includeInSearch field from classic Contensis.

  if (Array.isArray(webpageTemplates) && webpageTemplates.length > 0) expressions.push(Op.or(Op.and(Op.exists(Fields.sys.includeInSearch, true), Op.equalTo(Fields.sys.includeInSearch, true)), Op.exists(Fields.sys.includeInSearch, false)));
  return expressions;
};
const defaultExpressions = versionStatus => {
  return [Op.equalTo(Fields.sys.versionStatus, versionStatus)];
};
const excludeIdsExpression = excludeIds => {
  if (Array.isArray(excludeIds) && excludeIds.length > 0) {
    const [expr] = fieldExpression(Fields.sys.id, excludeIds);
    return [Op.not(expr)];
  } else return [];
};
const orderByExpression = orderBy => {
  let expression = OrderBy;

  if (orderBy && orderBy.length > 0) {
    orderBy.map(ob => expression = ob.startsWith('-') ? expression.desc(ob.substring(1)) : expression.asc(ob));
  }

  return expression;
};

const equalToOrIn = (field, value, operator = 'equalTo') => {
  if (value.length === 0) return [];

  if (Array.isArray(value)) {
    if (value.length === 1) return [Op[operator](field, value[0], undefined, undefined)];
    return [Op.in(field, ...value)];
  }

  return [];
};

const between = (field, value) => {
  const handle = betweenValue => {
    const valArr = betweenValue.split('-');

    if (valArr.length > 1) {
      const [minimum, maximum = null] = betweenValue.split('-');
      return Op.between(field, minimum, maximum);
    } else {
      // eslint-disable-next-line no-console
      console.log(`[search] You have supplied only one value to a "between" operator which must have two values. Your supplied value "${valArr.length && valArr[0]}" has been discarded.`);
      return false;
    }
  };

  if (value.length === 0) return [];
  if (Array.isArray(value)) return [Op.or(...value.map(handle).filter(bc => bc !== false))]; // const valArr = value.split('-');

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
          expression = Op[operator](...recurseExpr);
        }

        if (['not'].includes(operator)) {
          // A 'not' expression is an object with only one inner field and inner operator
          Object.keys(value).map((notKey, notIdx) => {
            const innerOperator = notKey;
            const innerValue = value[notKey];
            const innerField = value.field; // Map the expression when we've looped and scoped to
            // the second property inside the clause

            if (notIdx === 1) {
              expression = Op.not(Op[innerOperator](innerField, innerValue));
            }
          });
        }
      } // Map the expression when we've looped and scoped to
      // the second property inside the clause


      operator = Object.keys(clause).find(clauseKey => !['field', 'weight'].includes(clauseKey));

      if (idx === 1 && // operator !== 'and' &&
      // operator !== 'or' &&
      operator !== 'between' && operator !== 'distanceWithin') {
        expression = operator === 'freeText' || operator === 'contains' ? Op[operator](field, value) : operator === 'in' ? Op[operator](field, ...value) : Op[operator](field, value);
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
            fieldOperators.push(Op.or(...containsOp(wsf, modifiedSearchTerm), ...freeTextOp(wsf, modifiedSearchTerm)));
          } else {
            fieldOperators.push(...freeTextOp(wsf, modifiedSearchTerm));
          }
        }
      } // Add operator expressions for any quoted phrases


      quotedPhrases.forEach(qp => fieldOperators.push(...containsOp(wsf, qp))); // If we are using multiple operators for a field we will
      // wrap each field inside an And operator so we will match
      // all terms/phrases rather than any terms/phrases

      if (fieldOperators.length > 1) {
        operators.push(Op.and(...fieldOperators));
      } else {
        operators.push(...fieldOperators);
      }
    }); // Wrap operators in an Or operator

    return [Op.or().addRange(operators).add(Op.freeText(Fields.searchContent, searchTerm))];
  } else if (searchTerm) {
    // Searching without weightedSearchFields defined will fall back
    // to a default set of search fields with arbritary weights set.
    return [Op.or(Op.equalTo(Fields.entryTitle, searchTerm).weight(10), Op.freeText(Fields.entryTitle, searchTerm).weight(2), Op.freeText(Fields.entryDescription, searchTerm).weight(2), Op.contains(Fields.keywords, searchTerm).weight(2), Op.contains(Fields.sys.uri, searchTerm).weight(2), Op.contains(Fields.sys.allUris, searchTerm), Op.freeText(Fields.searchContent, searchTerm))];
  } else {
    return [];
  }
};

const filterQuery = (contentTypeIds, versionStatus, customWhere) => {
  const query = new Query(...[...contentTypeIdExpression(contentTypeIds), ...defaultExpressions(versionStatus), ...customWhereExpressions(customWhere)]);
  query.orderBy = OrderBy.asc(Fields.entryTitle);
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
  const query = new Query(...expressions);
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

    const stateFilters = term ? List() : getSelectedFilters(state, facet, searchContext).map(f => f.join(','));
    const currentSearch = !term && state.getIn(['routing', 'location', 'search']);
    const currentQs = removeEmptyAttributes(queryString.parse(currentSearch));
    if (orderBy) currentQs.orderBy = orderBy;
    const searchTerm = getSearchTerm(state); // Use Immutable's merge to merge the stateFilters with any current Qs
    // to build the new Qs.

    const mergedSearch = removeEmptyAttributes(fromJS(currentQs).merge(stateFilters).set('term', searchTerm).toJS());
    return queryString.stringify(mergedSearch);
  },
  hash: {
    $path: 'state',
    $formatting: state => state.getIn(['routing', 'location', 'hash'], '').replace('#', '')
  }
};

const mapStateToSearchUri = params => mapJson(params, searchUriTemplate);

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
          const loaded = List(pagesLoaded || []);
          const pages = isNaN(loaded.find(l => l === pageIndex)) ? loaded.push(pageIndex) : loaded;
          return pages.toList().sort((a, b) => a - b);
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
      const loadedPages = List(pagesLoaded); // if pageIndex is found in loadedPages, we have already loaded this page

      if (!isNaN(loadedPages.find(l => l === pageIndex))) return prevResults; // Determine where we put the results depending on if we
      // are paging forwards, backwards, or doing a new search

      const firstResultSet = pageIndex > prevPageIndex ? prevResults || [] : nextResults;
      const secondResultSet = pageIndex > prevPageIndex ? nextResults : prevResults || [];
      const onlyResultSet = loadedPages.size === 0 ? nextResults : false;
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

const mapFilterToFilterExpression = filter => mapJson(filter, filterExpressionMapper);

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
  assetTypes: root => getQueryParameter(root, 'assetTypes', List()),
  contentTypeIds: root => getQueryParameter(root, 'contentTypeIds', List()),
  customWhere: root => getQueryParameter(root, 'customWhere', List()),
  dynamicOrderBy: root => getQueryParameter(root, 'dynamicOrderBy', List()),
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
  fields: root => getQueryParameter(root, 'fields', List()),
  filters: ({
    state,
    facet,
    context
  }) => {
    const stateFilters = getFilters(state, facet, context).toJS();
    const selectedFilters = getSelectedFilters(state, facet, context).toJS(); // Use another mapping function to map the filter parameters for the query

    const filterParams = mapFiltersToFilterExpression(stateFilters, selectedFilters);
    return filterParams;
  },
  includeInSearchFields: root => getQueryParameter(root, 'includeInSearch', List()),
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
  orderBy: root => getQueryParameter(root, 'orderBy', List()),
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
  }) => getFacet(state, facet, context).get('projectId'),
  searchTerm: root => root.context !== Context.minilist || getQueryParameter(root, 'useSearchTerm', false) ? getSearchTerm(root.state) : '',
  selectedFilters: ({
    state,
    facet,
    context
  }) => getSelectedFilters(state, facet, context).map(f => f.join(',')),
  versionStatus: ({
    state
  }) => selectVersionStatus(state),
  weightedSearchFields: root => {
    const wsf = getQueryParameter(root, 'weightedSearchFields', List());
    const deduped = wsf.groupBy((v = Map()) => v.get('fieldId')).map((v = Map()) => v.first()).toList();
    return deduped; // return wsf;
  },
  webpageTemplates: root => getQueryParameter(root, 'webpageTemplates', List())
};

const mapStateToQueryParams = sourceJson => fromJS(mapJson(sourceJson, queryParamsTemplate)).toJS();

/**
 * 1, Generates all the parameters required to run the search query.
 * 2, Tells us if we should run the search.
 * @param {object} action
 * @param {ImmutableMap} state
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
  const stateParams = getQueryParams(ogState, facet, context).toJS();
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
  const selectedFilters = getSelectedFilters(ogState, facet, context).toJS();
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
  const stateParams = getQueryParams(action.ogState || state, action.facet, action.context).toJS();
  stateParams.pageIndex = getPageIndex(action.ogState || state, action.facet, action.context);
  stateParams.searchTerm = getSearchTerm(action.ogState || state);
  console.log(stateParams, queryParams);
  console.log('getSelectedFilters', getSelectedFilters(action.ogState || state, action.facet, action.context).toJS(), 'params', action.params);
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
      return mapJson(entry, template);
    }

    return entry;
  });
};

const searchSagas = [takeEvery(CLEAR_FILTERS, clearFilters$1), takeEvery(DO_SEARCH, doSearch), takeEvery(SET_ROUTE_FILTERS, loadFilters), takeEvery(SET_SEARCH_ENTRIES, preloadOtherFacets), takeEvery(UPDATE_CURRENT_FACET, updateCurrentFacet$1), takeEvery(UPDATE_CURRENT_TAB, updateCurrentTab$1), takeEvery(UPDATE_PAGE_INDEX, updatePageIndex$1), takeEvery(UPDATE_SEARCH_TERM, updateSearchTerm$1), takeEvery(UPDATE_SORT_ORDER, updateSortOrder$1), takeEvery(UPDATE_SELECTED_FILTERS, applySearchFilter)];
function* setRouteFilters(action) {
  const {
    mappers,
    params,
    listingType,
    defaultLang,
    debug
  } = action;
  const context = listingType ? Context.listings : Context.facets;
  const state = yield select();
  const ssr = getIsSsr(state); // Get current facet from params or state

  let currentFacet = params && params.facet || listingType; // Pick the default facet from initialState

  if (!currentFacet) {
    const tabs = getSearchTabs(state);
    currentFacet = tabs.getIn([0, 'defaultFacet'], '') || getFacets(state).keySeq().first();
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
  yield put(nextAction); // Using call instead of triggering from the put
  // to allow this exported saga to continue during SSR

  yield call(ensureSearch, { ...nextAction,
    ogState: state
  });
}
function* doSearch(action) {
  const state = yield select();

  if (action.config) {
    // If the action contains a config object, we can add this to the
    // state at runtime
    yield put({ ...action,
      type: APPLY_CONFIG
    });
  }

  const nextAction = { ...action,
    type: SET_SEARCH_FILTERS,
    ssr: getIsSsr(state)
  };
  yield put(nextAction);
  yield call(ensureSearch, { ...nextAction,
    ogState: state
  });
}

function* loadFilters(action) {
  const {
    facet: facetKey,
    context,
    mappers = {}
  } = action;
  const filtersToLoad = yield select(getFiltersToLoad, facetKey, context);

  if (filtersToLoad.size > 0) {
    yield put({
      type: LOAD_FILTERS,
      filtersToLoad,
      facetKey,
      context
    });
    const selectedKeys = yield select(getSelectedFilters, facetKey, context);
    const facet = yield select(getFacet, facetKey, context);
    const filters = facet.get('filters', Map());
    const projectId = facet.get('projectId', '');
    const filtersToLoadSagas = filters && filtersToLoad.map((filterKey = '') => {
      return call(loadFilter, {
        facetKey,
        filterKey,
        filter: filters.get(filterKey),
        projectId,
        selectedKeys: selectedKeys.get(filterKey),
        context,
        mapper: 'filterItems' in mappers && mappers.filterItems || mapEntriesToFilterItems
      });
    }).toJS();
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
  } = 'toJS' in filter ? filter.toJS() : filter;
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
    const nextAction = { ...action,
      ogState: action.ogState || state
    };
    const [queryParams, runSearch] = generateQueryParams(nextAction, state);
    if (debug && (debug === true || debug.executeSearch)) debugExecuteSearch(nextAction, state);

    if (runSearch) {
      yield put({
        type: EXECUTE_SEARCH,
        facet,
        context
      });
      yield call(executeSearch, { ...nextAction,
        context,
        facet,
        queryParams,
        debug
      });
    }
  } catch (error$1) {
    error(...['Error running search saga:', error$1, error$1.stack]);
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
    const customApi = getCustomApi(state, facet, context);

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
      prevResults: getResults(state, facet, action.context),
      result,
      state
    };
    const nextAction = mapJson(createStateFrom, facetTemplate);
    yield put(nextAction);
  } catch (error$1) {
    error(...['Error running search saga:', error$1, error$1.stack]);
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
    const allFacets = getFacets(state).toJS();
    const otherFacets = Object.keys(allFacets).filter(f => f !== currentFacet);
    yield all(otherFacets.map((preloadFacet = '') => {
      const preloadAction = { ...action,
        facet: preloadFacet,
        preload: true
      };
      const [queryParams, runSearch] = generateQueryParams(preloadAction, state);
      if (debug && (debug === true || debug.preloadOtherFacets)) debugExecuteSearch(preloadAction, state);
      return runSearch && call(executeSearch, { ...action,
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
  const state = yield select();
  const facets = getFacets(state);
  const tabs = getSearchTabs(state);
  let nextFacet = tabs.getIn([id, 'currentFacet']);

  if (!nextFacet) {
    facets.map((facet = Map(), facetName) => {
      if (facet.get('tabId') === id && tabs.getIn([id, 'defaultFacet']) === facetName) nextFacet = facetName;
    });
  } // If the next Tab does not have a defaultFacet,
  // take the first facet for that tab


  if (!nextFacet) nextFacet = facets.filter((f = Map()) => f.get('tabId') === id).keySeq().first();
  yield put(withMappers(updateCurrentFacet(nextFacet), mappers));
}

function* clearFilters$1(action) {
  const {
    mappers
  } = action;
  const uri = yield buildUri({}, mappers);
  yield put(navigate(uri));
}

function* updateCurrentFacet$1(action) {
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

function* updateSearchTerm$1(action) {
  const {
    term,
    mappers
  } = action;
  const uri = yield buildUri({
    term
  }, mappers);
  yield put(navigate(uri));
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
  yield put(navigate(uri));
}

function* updatePageIndex$1(action) {
  const {
    pageIndex,
    mappers
  } = action;
  const uri = yield buildUri({
    pageIndex
  }, mappers);
  yield put(navigate(uri));
}

function* applySearchFilter(action) {
  const {
    mappers
  } = action;
  const uri = yield buildUri({}, mappers);
  yield put(navigate(uri));
}

function* buildUri({
  facet,
  orderBy,
  pageIndex = 0,
  term
}, mappers) {
  const state = yield select();
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
  const dispatch = useDispatch();
  const {
    facet,
    filters,
    isLoading,
    pagingInfo,
    results,
    searchTerm
  } = useSelector(state => ({
    facet: getFacet(state, id, Context.minilist).toJS(),
    filters: getFilters(state, id, Context.minilist).toJS(),
    isLoading: getIsLoading(state, Context.minilist, id),
    pagingInfo: getPaging(state, id, Context.minilist).toJS(),
    results: getResults(state, id, Context.minilist).toJS(),
    searchTerm: getSearchTerm(state)
  }));
  useEffect(() => {
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

const entries = Map({
  isLoading: false,
  isError: false,
  items: List()
});
const pagingInfo = Map({
  isLoading: false,
  pageCount: 0,
  pageIndex: 0,
  pageSize: 0,
  pagesLoaded: List(),
  prevPageIndex: 0,
  totalCount: 0
});
const searchFacet = OrderedMap({
  title: null,
  featuredEntries: entries,
  featuredResults: List(),
  entries,
  results: List(),
  queryParams: Map(),
  filters: Map(),
  queryDuration: 0,
  pagingInfo,
  projectId: ''
});
const searchTab = Map({
  currentFacet: undefined,
  facets: OrderedMap(),
  id: 0,
  label: undefined,
  totalCount: ''
});
const filtering = Map({
  isLoading: false,
  isError: false,
  isGrouped: false,
  title: undefined,
  contentTypeId: undefined,
  customWhere: List(),
  fieldId: undefined,
  items: List()
});
const filterItem = Map({
  key: '',
  type: undefined,
  title: undefined,
  path: undefined,
  isSelected: false
});
const config = Map({
  isLoaded: false,
  isError: false
});
const searchState = {
  currentFacet: '',
  term: '',
  facets: OrderedMap(),
  tabs: List(),
  config
};
const initialState = OrderedMap(searchState);

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

// eslint-disable no-console

const addConfigToState = (state, action) => {
  const {
    context,
    facet,
    config
  } = action; // Adding or changing the config of a single facet, listing or minilist

  if (context && facet && config) {
    return state.setIn([context, facet], fromJS(config));
  } else if (config) {
    // Changing the entire search config
    const newState = fromJS(config);
    return newState;
  }

  return state;
};

const generateSearchFacets = (context, config) => {
  let facets = OrderedMap();

  if (config) {
    const thisConfig = config[context] || {};

    if (Object.keys(thisConfig).length > 0) {
      Object.entries(thisConfig).map(([facetName, facet]) => {
        const newFacet = searchFacet.merge(fromJS(facet));
        if (!('isDisabled' in facet) || facet.isDisabled !== true) facets = facets.set(facetName, newFacet);
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
  const filterParams = fromJS({ ...params,
    facet: undefined,
    orderBy: undefined,
    pageIndex: undefined,
    term: undefined
  }); // Get any existing filters and normalise the items[]
  // so we can start off with isSelected is false

  let filters = state.getIn([context, facet, 'filters'], Map({})).map(filter => isCurrentFacet || filter.get('isGrouped') ? filter.set('items', filter.get('items').map(item => item === null || item === void 0 ? void 0 : item.set('isSelected', false))) : filter);

  const addFilterItem = (filters, paramKey, paramValue) => // Iterate through all filters within the facet,
  // if the paramKey matches the filter key
  // get the existing items list, and see if that filter
  // already exists, if so set isSelected to true,
  // if not create a new filterItem, setting the key only
  // so we can match this key later on when we load the filters
  filters.map((filter = Map(), key) => {
    if (paramKey !== key || !isCurrentFacet && !filter.get('isGrouped')) {
      return filter;
    } else {
      const items = filter.get('items') || List();
      const itemIndex = items.findIndex(item => (item === null || item === void 0 ? void 0 : item.get('key')) === paramValue);
      if (items.size > 0 && itemIndex !== -1) return filter.setIn(['items', itemIndex, 'isSelected'], true);
      return filter.set('items', (filter.get('items') || List()).push(filterItem.set('key', paramValue).set('isSelected', true)));
    }
  }); // For each value found in filterParams
  // we are looking to split that value into multiple by any comma
  // and then either set isSelected for an existing filterItem
  // or push an item to the filters.{ key }.items[] array
  // giving it only the key (entry guid) that can be taken to filter
  // the search results during SSR without needing to fetch the filters first


  filterParams.map((paramValue, paramName = '') => paramValue && paramValue.split(',').map(pVal => filters = addFilterItem(filters, paramName, pVal)));
  return filters;
};

const resetFacets = (state, context) => OrderedMap(state.get(context).map((v = OrderedMap()) => resetFacet(v)));

const resetFacet = facet => facet.setIn(['pagingInfo', 'pagesLoaded'], fromJS([])).setIn(['pagingInfo', 'pageIndex'], 0).setIn(['queryDuration'], 0);

var reducers = (config => {
  // Add facets from SearchConfig to initialState
  const initState = initialState.set('tabs', fromJS(config.tabs)).set('facets', generateSearchFacets(Context.facets, config)).set('listings', generateSearchFacets(Context.listings, config)).set('minilist', generateSearchFacets(Context.minilist, config));
  return (state = initState, action) => {
    const context = state.get('context');
    const current = state.get(context !== 'listings' ? 'currentFacet' : 'currentListing');

    switch (action.type) {
      case APPLY_CONFIG:
        {
          return addConfigToState(state, action);
        }

      case CLEAR_FILTERS:
        {
          const currentFilters = state.getIn([context, current, 'filters']);
          return state.setIn([context, current, 'filters'], currentFilters.map(filter => {
            const filterItems = filter && filter.get('items') || [];
            return filter === null || filter === void 0 ? void 0 : filter.set('items', filterItems.map(item => item === null || item === void 0 ? void 0 : item.set('isSelected', false)));
          })).setIn([context, current, 'queryDuration'], 0).setIn([context, current, 'pagingInfo', 'pagesLoaded'], fromJS([]));
        }

      case EXECUTE_SEARCH:
        {
          return state.setIn([action.context, action.facet, 'entries', 'isLoading'], true);
        }

      case EXECUTE_SEARCH_ERROR:
        {
          return state.setIn([action.context, action.facet, 'entries'], entries.set('isError', true).set('error', fromJS(action.error)));
        }

      case LOAD_FILTERS:
        {
          const {
            facetKey,
            filtersToLoad
          } = action;
          const filters = state.getIn([action.context, facetKey, 'filters']);
          return state.setIn([action.context, facetKey, 'filters'], filters.map((filter = Map(), filterKey) => filtersToLoad.find(f => f === filterKey) ? filter.set('isLoading', true) : filter));
        }

      case LOAD_FILTERS_ERROR:
      case LOAD_FILTERS_COMPLETE:
        {
          const {
            facetKey,
            filterKey,
            nextFilter
          } = action;
          const filter = state.getIn([action.context, facetKey, 'filters', filterKey]);
          if (!(nextFilter.items && nextFilter.items.length > 0) && filter.get('items').size >= nextFilter.items.length) // Preserve items already in state
            return state.setIn([action.context, facetKey, 'filters', filterKey], filter.set('isLoading', false).set('isError', nextFilter.isError));
          return state.setIn([action.context, facetKey, 'filters', filterKey], filter.merge(fromJS(nextFilter)));
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
          const stateTerm = state.get('term');
          const tabId = state.getIn([context, facet, 'tabId'], 0); // Reset the facet if the search term has changed, or if the any of
          // the filters have changed

          const resetAllFacets = stateTerm && term !== stateTerm;
          let resetCurrentFacet = false; // Add filter values in params to the matched filters in state for the current facet
          // causing unfetched filter items to be generated with isSelected: true
          // or existing filter items to be tagged with isSelected: true

          const nextFacets = state.get(context).map((stateFacet = Map(), facetName = '') => {
            const isCurrentFacet = facetName === facet;
            const nextFilters = generateFiltersState({
              facet: facetName,
              params,
              context,
              isCurrentFacet
            }, state);
            resetCurrentFacet = state.getIn(['config', 'isLoaded'], false) === true && !nextFilters.equals(stateFacet.get('filters'));
            return (resetCurrentFacet ? resetFacet(stateFacet) : stateFacet).set('filters', nextFilters).setIn(['queryParams', 'dynamicOrderBy'], toArray(orderBy));
          });
          const nextState = state.set('context', context).set(context, nextFacets).set(action.context === Context.facets ? 'currentFacet' : 'currentListing', facet).set('term', term).setIn(['tabs', tabId, 'currentFacet'], facet).setIn([context, facet, 'pagingInfo', 'pageIndex'], Number(pageIndex) - 1 || (state.getIn([context, facet, 'queryParams', 'loadMorePaging']) ? state.getIn([context, facet, 'pagingInfo', 'pageIndex'], 0) : 0)).setIn(['config', 'isLoaded'], true).setIn(['config', 'ssr'], typeof window === 'undefined');
          return resetAllFacets ? nextState.set(context, resetFacets(nextState, context)) : nextState;
        }

      case SET_SEARCH_ENTRIES:
        {
          const thisContext = action.context || context;
          const currentFacet = state.getIn([thisContext, action.facet]);
          return state.setIn([thisContext, action.facet], currentFacet.merge(fromJS(action.nextFacet)));
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
          const useSearchTerm = state.getIn([action.context || Context.minilist, action.facet, 'queryParams', 'useSearchTerm'], false);
          return state.setIn([action.context || Context.minilist, action.facet, 'filters'], filters).setIn([action.context || Context.minilist, action.facet, 'queryParams', 'excludeIds'], fromJS(action.excludeIds)).set('term', useSearchTerm ? term : state.get('term')).setIn(['config', 'ssr'], typeof window === 'undefined');
        }

      case UPDATE_PAGE_INDEX:
        {
          const {
            pageIndex
          } = action;
          const internalPaging = state.getIn([context, current, 'queryParams', 'internalPaging'], false);
          const currentPageIndex = state.getIn([context, current, 'pagingInfo', 'pageIndex'], 0);
          const nextState = state.setIn([context, current, 'pagingInfo', 'pageIndex'], Number(pageIndex) || 0).setIn([context, current, 'pagingInfo', 'prevPageIndex'], currentPageIndex).setIn([context, current, 'pagingInfo', 'isLoading'], true);
          if (internalPaging) return nextState;
          return nextState.setIn([context, current, 'queryDuration'], 0);
        }

      case UPDATE_SEARCH_TERM:
        {
          return state.set('term', action.term).set(context, resetFacets(state, context));
        }

      case UPDATE_SELECTED_FILTERS:
        {
          const {
            filter,
            key
          } = action;
          const isSingleSelect = state.getIn([context, current, 'filters', filter, 'isSingleSelect'], false);
          const isGrouped = state.getIn([context, current, 'filters', filter, 'isGrouped'], false);
          const currentItems = state.getIn([context, current, 'filters', filter, 'items']);
          return state.set(context, isGrouped ? resetFacets(state, context) : state.get(context)).setIn([context, current], resetFacet(state.getIn([context, current]))).setIn([context, current, 'filters', filter, 'items'], currentItems.map((item = Map()) => {
            if (item.get('key') === key) {
              return item.set('isSelected', !item.get('isSelected'));
            }

            return isSingleSelect ? item.set('isSelected', false) : item;
          }));
        }

      case UPDATE_SORT_ORDER:
        {
          const {
            orderBy,
            facet
          } = action;
          return state.set(context, resetFacets(state, context)).setIn([context, facet || current, 'queryParams', 'dynamicOrderBy'], orderBy ? fromJS(toArray(orderBy)) : '');
        }

      default:
        return state;
    }
  };
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Context$1 = {
  facets: 'facets',
  listings: 'listings',
  minilist: 'minilist'
};

export { Context$1 as Context, actions, doSearch, queries, reducers as reducer, searchSagas as sagas, schema, selectors, setRouteFilters, types, useMinilist, withListing, withSearch };
//# sourceMappingURL=search.js.map
