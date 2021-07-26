import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Iterable, OrderedMap, Map, List, fromJS, Set } from 'immutable';
import { Client } from 'contensis-delivery-api';
import queryString from 'query-string';
import { takeEvery, select, put, call, all } from '@redux-saga/core/effects';
import { error } from 'loglevel';
import mapJson from 'jsonpath-mapper';
import PropTypes from 'prop-types';
import { navigation, routing, version } from '@zengenti/contensis-react-base/redux';

const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(wrappedComponentProp[VALUE]) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
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
const getRenderableFilters = (state, facet = '', context = Context.facets) => getFilters(state, facet, context).filter((f = Map()) => f.get('renderable') || true);
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
  return tabs.map((tab = Map()) => {
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
  selectListing: selectListing
});

/* eslint-disable @typescript-eslint/naming-convention */
const withSearch = mappers => SearchComponent => {
  const Wrapper = props => {
    return /*#__PURE__*/React.createElement(SearchComponent, props);
  };

  Wrapper.displayName = `withSearch(${SearchComponent.displayName || SearchComponent.name})`; // Wrapper.propTypes = {
  //   className: PropTypes.string,
  //   clearFilters: PropTypes.func,
  //   currentFacet: PropTypes.string,
  //   currentPageIndex: PropTypes.number,
  //   currentTabIndex: PropTypes.number,
  //   facet: PropTypes.object,
  //   facets: PropTypes.object,
  //   featuredResults: PropTypes.array,
  //   filters: PropTypes.object,
  //   isLoading: PropTypes.bool,
  //   paging: PropTypes.object,
  //   pageIsLoading: PropTypes.bool,
  //   results: PropTypes.array,
  //   resultsInfo: PropTypes.object,
  //   searchTerm: PropTypes.string,
  //   sortOrder: PropTypes.array,
  //   tabsAndFacets: PropTypes.array,
  //   updateCurrentFacet: PropTypes.func,
  //   updateCurrentTab: PropTypes.func,
  //   updateSearchTerm: PropTypes.func,
  //   updateSelectedFilters: PropTypes.func,
  //   updateSortOrder: PropTypes.func,
  // };

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
  return connect(mapStateToProps, mapDispatchToProps)(toJS(Wrapper));
};

/* eslint-disable @typescript-eslint/naming-convention */

const withListing = mappers => ListingComponent => {
  const Wrapper = props => {
    return /*#__PURE__*/React.createElement(ListingComponent, props);
  };

  Wrapper.displayName = `withListing(${ListingComponent.displayName || ListingComponent.name})`;
  Wrapper.propTypes = {
    className: PropTypes.string,
    clearFilters: PropTypes.func,
    currentListing: PropTypes.string,
    currentPageIndex: PropTypes.number,
    entry: PropTypes.object,
    featured: PropTypes.array,
    filters: PropTypes.object,
    isLoading: PropTypes.bool,
    listing: PropTypes.object,
    paging: PropTypes.object,
    pagesLoaded: PropTypes.array,
    results: PropTypes.array,
    resultsInfo: PropTypes.object,
    searchTerm: PropTypes.string,
    sortOrder: PropTypes.array,
    updatePageIndex: PropTypes.func,
    updateSearchTerm: PropTypes.func,
    updateSelectedFilters: PropTypes.func,
    updateSortOrder: PropTypes.func
  };
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

const {
  hasNavigationTree,
  selectNavigationRoot,
  selectNavigationDepends
} = navigation.selectors;
const {
  selectBreadcrumb,
  selectCurrentAncestors,
  selectCurrentNode,
  selectCurrentPath,
  selectCurrentProject,
  selectCurrentSearch,
  selectIsNotFound,
  selectQueryStringAsObject,
  selectRouteEntry,
  selectRouteEntryContentTypeId,
  selectRouteEntryDepends,
  selectRouteEntryEntryId,
  selectRouteEntryID,
  selectRouteEntrySlug,
  selectRouteLoading
} = routing.selectors;
const {
  selectCommitRef,
  selectBuildNumber,
  selectVersionStatus
} = version.selectors;

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

  get(id, linkDepth, versionStatus, project, env) {
    const client = Client.create(getClientConfig(project, env));
    client.clientConfig.versionStatus = versionStatus;
    return this.request(id, () => client.entries.get({
      id,
      linkDepth
    }));
  }

  getContentType(id, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(`[CONTENT TYPE] ${id} ${project}`, () => client.contentTypes.get(id));
  }

  getTaxonomyNode(key, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(`[TAXONOMY NODE] ${key}`, () => client.taxonomy.resolveChildren(key).then(node => this.extendTaxonomyNode(node)));
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

  getTaxonomyKey(id) {
    return this.taxonomyLookup[id];
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

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

var tslib_es6 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  __extends: __extends,
  get __assign () { return __assign; },
  __rest: __rest,
  __decorate: __decorate,
  __param: __param,
  __metadata: __metadata,
  __awaiter: __awaiter,
  __generator: __generator,
  __exportStar: __exportStar,
  __values: __values,
  __read: __read,
  __spread: __spread,
  __spreadArrays: __spreadArrays,
  __await: __await,
  __asyncGenerator: __asyncGenerator,
  __asyncDelegator: __asyncDelegator,
  __asyncValues: __asyncValues,
  __makeTemplateObject: __makeTemplateObject,
  __importStar: __importStar,
  __importDefault: __importDefault
});

// Only Node.JS has a process variable that is of [[Class]] process
var detectNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

var utils = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

function hasProp(o, key) {
    return !!o && typeof o[key] !== 'undefined';
}
exports.hasProp = hasProp;
function toQuery(values) {
    var keys = Object.keys(values)
        .filter(function (key) { return key && (values[key] !== null) && (values[key] !== ''); });
    keys.sort(); // sort keys for easier testing
    var query = keys
        .map(function (key) { return encodeURIComponent(key) + '=' + encodeURIComponent(values[key]); });
    return (query.length > 0)
        ? '?' + query.join('&')
        : '';
}
exports.toQuery = toQuery;
function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}
exports.isString = isString;
/** Checks if the runtime context is a browser */
function isBrowser() {
    return typeof window !== 'undefined';
}
exports.isBrowser = isBrowser;
/**
 * Checks if the current browser is IE.
 *
 * Support: IE 9-11 only
 * documentMode is an IE-only property
 * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
 */
function isIE() {
    var msie; // holds major version number for IE, or NaN if UA is not IE.
    msie = (window && window.document && window.document.documentMode) ? window.document.documentMode : null;
    return !!msie && msie <= 11;
}
exports.isIE = isIE;
/** Checks if the runtime context is Node.js */
function isNodejs() {
    return detectNode;
}
exports.isNodejs = isNodejs;
exports.defaultMapperForLanguage = function (value, options, params) {
    return !value && !!params ? params.language : value;
};
exports.defaultMapperForPublishedVersionStatus = function (value, options, params) {
    return (value === 'published') ? null : value;
};
exports.defaultMapperForLatestVersionStatus = function (value, options, params) {
    return (value === 'latest') ? null : value;
};
});

var httpClient = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var HttpClient = /** @class */ (function () {
    function HttpClient(paramsProvider, fetchFn) {
        this.paramsProvider = paramsProvider;
        this.fetchFn = fetchFn;
    }
    HttpClient.prototype.request = function (url, request) {
        if (request === void 0) { request = {}; }
        var params = this.paramsProvider.getParams();
        var isRelativeRequestUrl = !params.rootUrl || params.rootUrl === '/';
        if (!utils.isBrowser() && isRelativeRequestUrl) {
            throw new Error('You cannot specify a relative root url if not in a browser context.');
        }
        request.method = request.method || (!!request.body ? 'POST' : 'GET');
        if (!isRelativeRequestUrl) {
            request.mode = 'cors';
        }
        request.headers = request.headers || {};
        var headers = request.headers;
        if (!headers.accessToken && !!params.accessToken) {
            headers.accessToken = params.accessToken;
        }
        if (params.clientType === 'none' && !headers.accessToken) {
            throw new Error("If the property clientType is set to \"" + params.clientType + "\" then the property accessToken must be provided.");
        }
        if (params.clientType === 'client_credentials' && !params.clientDetails) {
            throw new Error("If the property client type is set to \"" + params.clientType + "\" then the property clientDetails must be set to a ClientCredentialsGrant value.");
        }
        if (!!params.defaultHeaders) {
            var keys = Object.keys(params.defaultHeaders);
            keys.forEach(function (key) {
                if (!headers[key] && !!params.defaultHeaders[key]) {
                    headers[key] = params.defaultHeaders[key];
                }
            });
        }
        var requestUrl = isRelativeRequestUrl ? "" + url : "" + params.rootUrl + url;
        return this.fetchFn(requestUrl, request)
            .then(function (response) {
            var responseHandlerFunction = null;
            if (!!params.responseHandler) {
                if (!!params.responseHandler['*']) {
                    responseHandlerFunction = params.responseHandler['*'];
                }
                if (!!params.responseHandler[response.status]) {
                    responseHandlerFunction = params.responseHandler[response.status];
                }
            }
            var responseContext = {
                status: response.status,
                statusText: response.statusText,
                url: response.url,
                data: null
            };
            return response
                .text()
                .then(function (text) {
                return !!text && text.length && text.length > 0 ? JSON.parse(text) : {};
            })
                .then(function (result) {
                responseContext.data = result;
                if (response.ok) {
                    if (!!responseHandlerFunction) {
                        responseHandlerFunction(response, responseContext);
                    }
                    return result;
                }
                return !!responseHandlerFunction ?
                    responseHandlerFunction(response, responseContext)
                    : Promise.reject(responseContext);
            }, function (reason) {
                responseContext.data = reason;
                return !!responseHandlerFunction ?
                    responseHandlerFunction(response, responseContext)
                    : Promise.reject(responseContext);
            });
        })
            .then(function (result) { return result; });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
});

var urlBuilder = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


var UrlBuilder = /** @class */ (function () {
    function UrlBuilder(url, query) {
        this.url = url;
        this.query = query;
        this.paramMatcher = /(:\b\D\w*)/g;
        this.options = {};
        this.mappers = {};
    }
    UrlBuilder.create = function (url, query) {
        if (query === void 0) { query = null; }
        return new UrlBuilder(url, query);
    };
    UrlBuilder.prototype.addOptions = function (options, defaultParamName) {
        if (defaultParamName === void 0) { defaultParamName = null; }
        if (utils.isString(options) && !!defaultParamName) {
            this.options[defaultParamName] = options;
        }
        else {
            this.options = tslib_es6.__assign({}, this.options, options);
        }
        return this;
    };
    UrlBuilder.prototype.setParams = function (clientParams) {
        this.clientParams = clientParams;
        return this;
    };
    UrlBuilder.prototype.addMappers = function (mappers) {
        var _this = this;
        if (mappers) {
            Object.keys(mappers).forEach(function (key) {
                _this.mappers[key] = mappers[key];
            });
        }
        return this;
    };
    UrlBuilder.prototype.toUrl = function () {
        var _this = this;
        var namedParams = {};
        var urlTemplate = typeof this.url === 'function' ? this.url(this.options, this.clientParams) : this.url;
        var paramNames = urlTemplate.match(this.paramMatcher);
        if (paramNames) {
            paramNames.forEach(function (paramName) {
                var key = paramName.substring(1);
                var value = null;
                if (utils.hasProp(_this.options, key)
                    && _this.options[key] !== null) {
                    value = _this.options[key];
                }
                else if (utils.hasProp(_this.clientParams, key)
                    && _this.clientParams[key] !== null) {
                    value = _this.clientParams[key];
                }
                var mapperValue = null;
                if (_this.mappers[paramName]) {
                    mapperValue = _this.mappers[paramName](value, _this.options, _this.clientParams);
                }
                namedParams[paramName] = mapperValue !== null ? mapperValue : value;
            });
        }
        var query = {};
        if (this.query) {
            query = tslib_es6.__assign({}, this.query);
            Object.keys(this.query).forEach(function (paramName) {
                var value = query[paramName];
                if (utils.hasProp(_this.options, paramName)
                    && _this.options[paramName] !== null) {
                    value = _this.options[paramName];
                }
                else if (utils.hasProp(_this.clientParams, paramName)
                    && _this.clientParams[paramName] !== null) {
                    value = _this.clientParams[paramName];
                }
                query[paramName] = _this.mappers[paramName] ?
                    _this.mappers[paramName](value, _this.options, _this.clientParams) : value;
            });
        }
        var url = Object.keys(namedParams)
            .reduce(function (url, key) { return url.replace(key, namedParams[key]); }, urlTemplate);
        var queryString = utils.toQuery(query);
        return "" + url + queryString;
    };
    return UrlBuilder;
}());
exports.UrlBuilder = UrlBuilder;
});

var http = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_es6.__exportStar(httpClient, exports);
tslib_es6.__exportStar(urlBuilder, exports);
});

var errors = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var ContensisApplicationError = /** @class */ (function (_super) {
    tslib_es6.__extends(ContensisApplicationError, _super);
    function ContensisApplicationError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = 'ContensisApplicationError';
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return ContensisApplicationError;
}(Error));
exports.ContensisApplicationError = ContensisApplicationError;
var ContensisAuthenticationError = /** @class */ (function (_super) {
    tslib_es6.__extends(ContensisAuthenticationError, _super);
    function ContensisAuthenticationError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = 'ContensisAuthenticationError';
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return ContensisAuthenticationError;
}(Error));
exports.ContensisAuthenticationError = ContensisAuthenticationError;
});

var query = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var ExpressionValueTypeEnum = {
    Single: 'single',
    Array: 'array',
    Unknown: 'unknown'
};
var OperatorTypeEnum = {
    And: 'and',
    Between: 'between',
    Contains: 'contains',
    EndsWith: 'endsWith',
    EqualTo: 'equalTo',
    Exists: 'exists',
    FreeText: 'freeText',
    GreaterThan: 'greaterThan',
    GreaterThanOrEqualTo: 'greaterThanOrEqualTo',
    In: 'in',
    LessThan: 'lessThan',
    LessThanOrEqualTo: 'lessThanOrEqualTo',
    Not: 'not',
    Or: 'or',
    StartsWith: 'startsWith',
    Where: 'where',
    DistanceWithin: 'distanceWithin'
};
var ExpressionBase = /** @class */ (function () {
    function ExpressionBase(fieldName, values, operatorName, valueType) {
        if (values === void 0) { values = []; }
        this.fieldName = fieldName;
        this.values = values;
        this.operatorName = operatorName;
        this.valueType = valueType;
        this._weight = 0;
    }
    ExpressionBase.prototype.addValue = function (value) {
        this.values[this.values.length] = value;
        return this;
    };
    ExpressionBase.prototype.weight = function (weight) {
        this._weight = weight;
        return this;
    };
    ExpressionBase.prototype.toJSON = function () {
        var result = {};
        if (this.fieldName) {
            result.field = this.fieldName;
        }
        if (this.valueType === ExpressionValueTypeEnum.Single) {
            result[this.operatorName] = this.values[0];
        }
        else if (this.valueType === ExpressionValueTypeEnum.Array) {
            result[this.operatorName] = this.values;
        }
        else if (this.values && (this.values.length === 1)) {
            result[this.operatorName] = this.values[0];
        }
        else {
            result[this.operatorName] = this.values;
        }
        if (this._weight && (this._weight > 1)) {
            result.weight = this._weight;
        }
        return result;
    };
    return ExpressionBase;
}());
exports.ExpressionBase = ExpressionBase;
var LogicalExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(LogicalExpression, _super);
    function LogicalExpression(values, operatorName, valueType) {
        if (values === void 0) { values = []; }
        return _super.call(this, null, values, operatorName, ExpressionValueTypeEnum.Array) || this;
    }
    LogicalExpression.prototype.getItem = function (index) {
        return this.values[index];
    };
    LogicalExpression.prototype.setItem = function (index, item) {
        this.values[index] = item;
        return this;
    };
    LogicalExpression.prototype.add = function (item) {
        this.values[this.values.length] = item;
        return this;
    };
    LogicalExpression.prototype.addRange = function (items) {
        Array.prototype.push.apply(this.values, items);
        return this;
    };
    LogicalExpression.prototype.indexOf = function (item) {
        return this.values.indexOf(item);
    };
    LogicalExpression.prototype.insert = function (index, item) {
        this.values.splice(index, 0, item);
        return this;
    };
    LogicalExpression.prototype.remove = function (item) {
        var index = this.indexOf(item);
        if (index >= 0) {
            this.removeAt(index);
            return true;
        }
        return false;
    };
    LogicalExpression.prototype.removeAt = function (index) {
        this.values.splice(index, 1);
        return this;
    };
    LogicalExpression.prototype.clear = function () {
        this.values.length = 0;
        return this;
    };
    LogicalExpression.prototype.contains = function (item) {
        return (this.indexOf(item) >= 0);
    };
    LogicalExpression.prototype.count = function () {
        return this.values.length;
    };
    return LogicalExpression;
}(ExpressionBase));
exports.LogicalExpression = LogicalExpression;
var AndExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(AndExpression, _super);
    function AndExpression(values) {
        return _super.call(this, values, OperatorTypeEnum.And, ExpressionValueTypeEnum.Array) || this;
    }
    return AndExpression;
}(LogicalExpression));
var BetweenExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(BetweenExpression, _super);
    function BetweenExpression(fieldName, minimum, maximum) {
        return _super.call(this, fieldName, [minimum, maximum], OperatorTypeEnum.Between, ExpressionValueTypeEnum.Array) || this;
    }
    return BetweenExpression;
}(ExpressionBase));
var NotExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(NotExpression, _super);
    function NotExpression(value) {
        return _super.call(this, [value], OperatorTypeEnum.Not, ExpressionValueTypeEnum.Single) || this;
    }
    return NotExpression;
}(LogicalExpression));
var OrExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(OrExpression, _super);
    function OrExpression(values) {
        return _super.call(this, values, OperatorTypeEnum.Or, ExpressionValueTypeEnum.Array) || this;
    }
    return OrExpression;
}(LogicalExpression));
var ContainsExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(ContainsExpression, _super);
    function ContainsExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.Contains, ExpressionValueTypeEnum.Single) || this;
    }
    return ContainsExpression;
}(ExpressionBase));
var EndsWithExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(EndsWithExpression, _super);
    function EndsWithExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.EndsWith, ExpressionValueTypeEnum.Single) || this;
    }
    return EndsWithExpression;
}(ExpressionBase));
var EqualToExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(EqualToExpression, _super);
    function EqualToExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.EqualTo, ExpressionValueTypeEnum.Single) || this;
    }
    return EqualToExpression;
}(ExpressionBase));
var ExistsExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(ExistsExpression, _super);
    function ExistsExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.Exists, ExpressionValueTypeEnum.Single) || this;
    }
    return ExistsExpression;
}(ExpressionBase));
var FreeTextExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(FreeTextExpression, _super);
    function FreeTextExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.FreeText, ExpressionValueTypeEnum.Single) || this;
    }
    return FreeTextExpression;
}(ExpressionBase));
var GreaterThanExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(GreaterThanExpression, _super);
    function GreaterThanExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.GreaterThan, ExpressionValueTypeEnum.Single) || this;
    }
    return GreaterThanExpression;
}(ExpressionBase));
var GreaterThanOrEqualToExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(GreaterThanOrEqualToExpression, _super);
    function GreaterThanOrEqualToExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.GreaterThanOrEqualTo, ExpressionValueTypeEnum.Single) || this;
    }
    return GreaterThanOrEqualToExpression;
}(ExpressionBase));
var LessThanExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(LessThanExpression, _super);
    function LessThanExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.LessThan, ExpressionValueTypeEnum.Single) || this;
    }
    return LessThanExpression;
}(ExpressionBase));
var InExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(InExpression, _super);
    function InExpression(fieldName, values) {
        return _super.call(this, fieldName, values, OperatorTypeEnum.In, ExpressionValueTypeEnum.Array) || this;
    }
    return InExpression;
}(ExpressionBase));
var LessThanOrEqualToExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(LessThanOrEqualToExpression, _super);
    function LessThanOrEqualToExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.LessThanOrEqualTo, ExpressionValueTypeEnum.Single) || this;
    }
    return LessThanOrEqualToExpression;
}(ExpressionBase));
var StartsWithExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(StartsWithExpression, _super);
    function StartsWithExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.StartsWith, ExpressionValueTypeEnum.Single) || this;
    }
    return StartsWithExpression;
}(ExpressionBase));
var WhereExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(WhereExpression, _super);
    function WhereExpression(values) {
        if (values === void 0) { values = []; }
        return _super.call(this, values, OperatorTypeEnum.Where, ExpressionValueTypeEnum.Array) || this;
    }
    WhereExpression.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        return result[OperatorTypeEnum.Where];
    };
    return WhereExpression;
}(LogicalExpression));
exports.WhereExpression = WhereExpression;
var DistanceWithinExpression = /** @class */ (function (_super) {
    tslib_es6.__extends(DistanceWithinExpression, _super);
    function DistanceWithinExpression(fieldName, value) {
        return _super.call(this, fieldName, [value], OperatorTypeEnum.DistanceWithin, ExpressionValueTypeEnum.Single) || this;
    }
    return DistanceWithinExpression;
}(ExpressionBase));
var Operators = /** @class */ (function () {
    function Operators() {
    }
    Operators.prototype.and = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new AndExpression(values);
    };
    Operators.prototype.between = function (name, minimum, maximum) {
        return new BetweenExpression(name, minimum, maximum);
    };
    Operators.prototype.not = function (expression) {
        return new NotExpression(expression);
    };
    Operators.prototype.or = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return new OrExpression(values);
    };
    Operators.prototype.contains = function (name, value) {
        return new ContainsExpression(name, value);
    };
    Operators.prototype.endsWith = function (name, value) {
        return new EndsWithExpression(name, value);
    };
    Operators.prototype.equalTo = function (name, value) {
        return new EqualToExpression(name, value);
    };
    Operators.prototype.exists = function (name, value) {
        return new ExistsExpression(name, value);
    };
    Operators.prototype.freeText = function (name, value) {
        return new FreeTextExpression(name, value);
    };
    Operators.prototype.greaterThan = function (name, value) {
        return new GreaterThanExpression(name, value);
    };
    Operators.prototype.greaterThanOrEqualTo = function (name, value) {
        return new GreaterThanOrEqualToExpression(name, value);
    };
    Operators.prototype.lessThan = function (name, value) {
        return new LessThanExpression(name, value);
    };
    Operators.prototype.lessThanOrEqualTo = function (name, value) {
        return new LessThanOrEqualToExpression(name, value);
    };
    Operators.prototype.startsWith = function (name, value) {
        return new StartsWithExpression(name, value);
    };
    Operators.prototype.in = function (name) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return new InExpression(name, values);
    };
    Operators.prototype.distanceWithin = function (name, lat, lon, distance) {
        return new DistanceWithinExpression(name, { lat: lat, lon: lon, distance: distance });
    };
    return Operators;
}());
exports.Operators = Operators;
exports.Op = new Operators();
var Ordering = /** @class */ (function () {
    function Ordering() {
        this._items = [];
    }
    Ordering.prototype.asc = function (fieldName) {
        this._items.push({ 'asc': fieldName });
        return this;
    };
    Ordering.prototype.desc = function (fieldName) {
        this._items.push({ 'desc': fieldName });
        return this;
    };
    Ordering.prototype.toArray = function () {
        return this._items;
    };
    return Ordering;
}());
var OrderByFactory = /** @class */ (function () {
    function OrderByFactory() {
    }
    OrderByFactory.prototype.asc = function (fieldName) {
        return (new Ordering()).asc(fieldName);
    };
    OrderByFactory.prototype.desc = function (fieldName) {
        return (new Ordering()).desc(fieldName);
    };
    return OrderByFactory;
}());
exports.OrderBy = new OrderByFactory();
function toOrderBy(value) {
    var _a;
    if (!value) {
        return null;
    }
    var firstChar = value.substr(0, 1);
    if (firstChar === '+' || firstChar === '-') {
        var direction = (firstChar === '-') ? 'desc' : 'asc';
        return _a = {}, _a[direction] = value.substring(1), _a;
    }
    return { 'asc': value };
}
function serializeOrder(orderBy) {
    if (!orderBy) {
        return [];
    }
    var o;
    if (typeof orderBy === 'string') {
        o = toOrderBy(orderBy);
        return !!o ? [o] : [];
    }
    if (Array.isArray(orderBy)) {
        return orderBy.map(toOrderBy).filter(function (o) { return !!o; });
    }
    return (orderBy.toArray) ? orderBy.toArray() : null;
}
var Query = /** @class */ (function () {
    function Query() {
        var whereExpressions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            whereExpressions[_i] = arguments[_i];
        }
        this.where = new WhereExpression();
        this.orderBy = [];
        this.pageIndex = 0;
        this.pageSize = 20;
        this.fields = [];
        if (whereExpressions) {
            this.where.addRange(whereExpressions);
        }
    }
    Query.prototype.toJSON = function () {
        var result = {};
        result.pageIndex = this.pageIndex;
        result.pageSize = this.pageSize;
        var orderByDtos = serializeOrder(this.orderBy);
        if (orderByDtos && orderByDtos.length > 0) {
            result.orderBy = orderByDtos;
        }
        result.where = this.where;
        if (this.fields && this.fields.length > 0) {
            result.fields = this.fields;
        }
        return result;
    };
    return Query;
}());
exports.Query = Query;
});

var models = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_es6.__exportStar(errors, exports);
tslib_es6.__exportStar(query, exports);
});

var lib = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

tslib_es6.__exportStar(http, exports);
tslib_es6.__exportStar(models, exports);
tslib_es6.__exportStar(utils, exports);
});

const DataFormats = {
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
    return [lib.Op.or(...field.map(fieldId => fieldExpression(fieldId, value, operator, weight)).flat())];
  if (operator === 'between') return between(field, value);
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? [lib.Op[operator](field, value, undefined, undefined)] : [lib.Op[operator](field, value, undefined, undefined).weight(weight)];
};
const contentTypeIdExpression = (contentTypeIds, webpageTemplates) => {
  const expressions = [];
  if (!contentTypeIds && !webpageTemplates) return expressions;

  if (contentTypeIds && contentTypeIds.length > 0) {
    expressions.push(...dataFormatExpression(contentTypeIds, DataFormats.entry));
  }

  if (webpageTemplates && webpageTemplates.length > 0) {
    expressions.push(...dataFormatExpression(webpageTemplates, DataFormats.webpage));
  }

  if (expressions.length > 1) return [lib.Op.or(...expressions)];
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
    const andExpr = lib.Op.and();
    const dataFormatExpr = fieldExpression(Fields.sys.dataFormat, dataFormat)[0];
    const withExpr = fieldExpression(Fields.sys.contentTypeId, withContentTypeIds)[0];
    const notExpr = lib.Op.not(fieldExpression(Fields.sys.contentTypeId, notContentTypeIds)[0]);
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
const defaultExpressions = versionStatus => {
  return [lib.Op.equalTo(Fields.sys.versionStatus, versionStatus), lib.Op.or(lib.Op.and(lib.Op.exists(Fields.sys.includeInSearch, true), lib.Op.equalTo(Fields.sys.includeInSearch, true)), lib.Op.exists(Fields.sys.includeInSearch, false))];
};
const excludeIdsExpression = excludeIds => {
  if (Array.isArray(excludeIds) && excludeIds.length > 0) {
    const [expr] = fieldExpression(Fields.sys.id, excludeIds);
    return [lib.Op.not(expr)];
  } else return [];
};
const orderByExpression = orderBy => {
  let expression = lib.OrderBy;

  if (orderBy && orderBy.length > 0) {
    orderBy.map(ob => expression = ob.startsWith('-') ? expression.desc(ob.substring(1)) : expression.asc(ob));
  }

  return expression;
};

const equalToOrIn = (field, value, operator = 'equalTo') => {
  if (value.length === 0) return [];

  if (Array.isArray(value)) {
    if (value.length === 1) return [lib.Op[operator](field, value[0], undefined, undefined)];
    return [lib.Op.in(field, ...value)];
  }

  return [];
};

const between = (field, value) => {
  const handle = betweenValue => {
    const valArr = betweenValue.split('-');

    if (valArr.length > 1) {
      const [minimum, maximum = null] = betweenValue.split('-');
      return lib.Op.between(field, minimum, maximum);
    } else {
      // eslint-disable-next-line no-console
      console.log(`[search] You have supplied only one value to a "between" operator which must have two values. Your supplied value "${valArr.length && valArr[0]}" has been discarded.`);
      return false;
    }
  };

  if (value.length === 0) return [];
  if (Array.isArray(value)) return [lib.Op.or(...value.map(handle).filter(bc => bc !== false))]; // const valArr = value.split('-');

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
      const value = clause[operator]; // const weight: number = (clause as any).weight;

      if (idx === 0) {
        if (operator === 'and' || operator === 'or') {
          // These are array expressions so we can call ourself recursively
          // to map these inner values to expressions
          const recurseExpr = customWhereExpressions(clause[operator]);
          expression = lib.Op[operator](...recurseExpr);
        }

        if (['not'].includes(operator)) {
          // A 'not' expression is an object with only one inner field and inner operator
          Object.keys(value).map((notKey, notIdx) => {
            const innerOperator = notKey;
            const innerValue = value[notKey];
            const innerField = value.field; // Map the expression when we've looped and scoped to
            // the second property inside the clause

            if (notIdx === 1) {
              expression = lib.Op.not(lib.Op[innerOperator](innerField, innerValue));
            }
          });
        }
      } // Map the expression when we've looped and scoped to
      // the second property inside the clause


      operator = Object.keys(clause).find(clauseKey => !['field', 'weight'].includes(clauseKey));

      if (idx === 1 && // operator !== 'and' &&
      // operator !== 'or' &&
      operator !== 'between' && operator !== 'distanceWithin') {
        expression = operator === 'freeText' || operator === 'contains' ? lib.Op[operator](field, value) : operator === 'in' ? lib.Op[operator](field, ...value) : lib.Op[operator](field, value);
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
            fieldOperators.push(lib.Op.or(...containsOp(wsf, modifiedSearchTerm), ...freeTextOp(wsf, modifiedSearchTerm)));
          } else {
            fieldOperators.push(...freeTextOp(wsf, modifiedSearchTerm));
          }
        }
      } // Add operator expressions for any quoted phrases


      quotedPhrases.forEach(qp => fieldOperators.push(...containsOp(wsf, qp))); // If we are using multiple operators for a field we will
      // wrap each field inside an And operator so we will match
      // all terms/phrases rather than any terms/phrases

      if (fieldOperators.length > 1) {
        operators.push(lib.Op.and(...fieldOperators));
      } else {
        operators.push(...fieldOperators);
      }
    }); // Wrap operators in an Or operator

    return [lib.Op.or().addRange(operators).add(lib.Op.freeText(Fields.searchContent, searchTerm))];
  } else if (searchTerm) {
    // Searching without weightedSearchFields defined will fall back
    // to a default set of search fields with arbritary weights set.
    return [lib.Op.or(lib.Op.equalTo(Fields.entryTitle, searchTerm).weight(10), lib.Op.freeText(Fields.entryTitle, searchTerm).weight(2), lib.Op.freeText(Fields.entryDescription, searchTerm).weight(2), lib.Op.contains(Fields.keywords, searchTerm).weight(2), lib.Op.contains(Fields.sys.uri, searchTerm).weight(2), lib.Op.contains(Fields.sys.allUris, searchTerm), lib.Op.freeText(Fields.searchContent, searchTerm))];
  } else {
    return [];
  }
};

const filterQuery = (contentTypeIds, versionStatus, customWhere) => {
  const query = new lib.Query(...[...contentTypeIdExpression(contentTypeIds), ...defaultExpressions(versionStatus), ...customWhereExpressions(customWhere)]);
  query.orderBy = lib.OrderBy.asc(Fields.entryTitle);
  query.pageSize = 100;
  return query;
};
const searchQuery = ({
  contentTypeIds,
  customWhere,
  dynamicOrderBy,
  excludeIds,
  featuredResults,
  fields,
  filters,
  languages,
  pageSize,
  pageIndex,
  orderBy,
  searchTerm,
  versionStatus,
  webpageTemplates,
  weightedSearchFields
}, isFeatured = false) => {
  let expressions = [...termExpressions(searchTerm, weightedSearchFields), ...defaultExpressions(versionStatus), ...languagesExpression(languages), ...customWhereExpressions(customWhere), ...excludeIdsExpression(excludeIds)];
  if (isFeatured) expressions = [...expressions, ...featuredResultsExpression(featuredResults)];
  if (!isFeatured || featuredResults && !featuredResults.contentTypeId) expressions = [...expressions, ...filterExpressions(filters), ...contentTypeIdExpression(contentTypeIds, webpageTemplates)];
  const query = new lib.Query(...expressions);
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

const removeEmptyAttributes = obj => {
  Object.entries(obj).forEach(([key, val]) => val && typeof val === 'object' && removeEmptyAttributes(val) || (typeof val === 'undefined' || val === null || val === '') && delete obj[key]);
  return obj;
}; //Returns index position from array with matching property
const toArray = (obj, seperator = ',') => typeof obj === 'undefined' || obj === null ? obj : Array.isArray(obj) ? obj : obj.split(seperator); // assumes array elements are primitive types

const areArraysEqualSets = (a1, a2) => {
  let superSet = {};

  for (let i = 0; i < a1.length; i++) {
    const e = a1[i] + typeof a1[i];
    superSet[e] = 1;
  }

  for (let i = 0; i < a2.length; i++) {
    const e = a2[i] + typeof a2[i];

    if (!superSet[e]) {
      return false;
    }

    superSet[e] = 2;
  }

  for (let e in superSet) {
    if (superSet[e] === 1) {
      return false;
    }
  }

  return true;
};

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

/* eslint-disable no-console */

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
    facet
  }) => getFacet(state, facet).get('projectId'),
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
