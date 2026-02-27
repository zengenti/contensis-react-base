import React, { useMemo, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { t as toJS } from './ToJs-BnRRHk6f.js';
import { w as withMappers, g as getTotalCount, a as getTabsAndFacets, b as getQueryParameter, c as getSelectedFilters, d as getSearchTotalCount, e as getSearchTerm, f as getResultsInfo, h as getResults, i as getPageIsLoading, j as getPaging, k as getIsLoading, l as getRenderableFilters, m as getFeaturedResults, n as getFacetTitles, o as getFacetsTotalCount, p as getTabFacets, q as getFacet, r as getCurrentTab, s as getPageIndex, t as getCurrentFacet, u as updateSortOrder, v as updateSelectedFilters, x as updateSearchTerm, y as updatePageSize, z as updatePageIndex, A as updateCurrentTab, B as updateCurrentFacet, C as clearFilters, D as selectListing, E as triggerSearch, F as Context$1, G as getFilters, U as UPDATE_SORT_ORDER, H as UPDATE_SELECTED_FILTERS, I as UPDATE_SEARCH_TERM, J as UPDATE_PAGE_SIZE, K as UPDATE_PAGE_INDEX, S as SET_SEARCH_FILTERS, L as SET_SEARCH_ENTRIES, M as SET_ROUTE_FILTERS, N as LOAD_FILTERS_COMPLETE, O as LOAD_FILTERS_ERROR, P as LOAD_FILTERS, Q as EXECUTE_SEARCH_ERROR, R as EXECUTE_SEARCH, T as CLEAR_FILTERS, V as APPLY_CONFIG } from './sagas-BZWjx5by.js';
export { W as actions, a1 as doSearch, Z as expressions, _ as queries, a3 as sagas, X as selectors, a2 as setRouteFilters, a4 as triggerListingSsr, a5 as triggerMinilistSsr, a6 as triggerSearchSsr, Y as types, $ as useFacets, a0 as useListing } from './sagas-BZWjx5by.js';
import { createSelector } from 'reselect';
import { produce, current } from 'immer';
import equals from 'deep-equal';
import merge from 'deepmerge';
import { t as toArray } from './util-BafFLYzn.js';
export { r as routeParams } from './util-BafFLYzn.js';
import 'loglevel';
import '@redux-saga/core/effects';
import './version-BQAL8sQO.js';
import './selectors-8ROQrTd7.js';
import 'jsonpath-mapper';
import 'query-string';
import './ContensisDeliveryApi-CvEoOLCl.js';
import 'contensis-delivery-api';
import './store-DSjRYsM2.js';
import 'redux';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors-19';
import './slice-C6JLQik8.js';
import '@reduxjs/toolkit';
import './CookieConstants-DEmbwzYr.js';
import './selectors-DcmvOeX2.js';
import 'contensis-core-api';
import './_commonjsHelpers-BFTU3MAI.js';

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
      resultsInfo: (mappers === null || mappers === void 0 ? void 0 : mappers.resultsInfo) && mappers.resultsInfo(state) || getResultsInfo(state),
      searchTerm: getSearchTerm(state),
      searchTotalCount: getSearchTotalCount(state),
      selectedFilters: getSelectedFilters(state),
      sortOrder: getQueryParameter({
        state
      }, 'dynamicOrderBy', []),
      tabsAndFacets: getTabsAndFacets(state),
      totalCount: getTotalCount(state)
    };
  };
  const mapDispatchToProps = {
    clearFilters: filterKey => withMappers(clearFilters(filterKey), mappers),
    updateCurrentFacet: facet => withMappers(updateCurrentFacet(facet), mappers),
    updateCurrentTab: id => withMappers(updateCurrentTab(id), mappers),
    updatePageIndex: (pageIndex, scrollToElement) => withMappers(updatePageIndex(pageIndex, scrollToElement), mappers),
    updatePageSize: (pageSize, scrollToElement) => withMappers(updatePageSize(pageSize, scrollToElement), mappers),
    updateSearchTerm: term => withMappers(updateSearchTerm(term), mappers),
    updateSelectedFilters: (filter, key, isUnknownItem = false, scrollToElement) => withMappers(updateSelectedFilters(filter, key, isUnknownItem, scrollToElement), mappers),
    updateSortOrder: orderBy => withMappers(updateSortOrder(orderBy), mappers)
  };
  const connector = connect(mapStateToProps, mapDispatchToProps);
  return connector(toJS(Wrapper));
};

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
    getSearchTerm,
    getSelectedFilters
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
      resultsInfo: typeof (mappers === null || mappers === void 0 ? void 0 : mappers.resultsInfo) === 'function' && mappers.resultsInfo(state) || getResultsInfo(state),
      searchTerm: getSearchTerm(state),
      selectedFilters: getSelectedFilters(state),
      sortOrder: getQueryParameter({
        state
      }, 'dynamicOrderBy', [])
    };
  };
  const mapDispatchToProps = {
    clearFilters: filterKey => withMappers(clearFilters(filterKey), mappers),
    updateCurrentFacet: facet => withMappers(updateCurrentFacet(facet), mappers),
    updatePageIndex: (pageIndex, scrollToElement) => withMappers(updatePageIndex(pageIndex, scrollToElement), mappers),
    updatePageSize: (pageSize, scrollToElement) => withMappers(updatePageSize(pageSize, scrollToElement), mappers),
    updateSearchTerm: term => withMappers(updateSearchTerm(term), mappers),
    updateSelectedFilters: (filter, key, isUnknownItem = false, scrollToElement) => withMappers(updateSelectedFilters(filter, key, isUnknownItem, scrollToElement), mappers),
    updateSortOrder: orderBy => withMappers(updateSortOrder(orderBy), mappers)
  };
  return connect(mapStateToProps, mapDispatchToProps)(toJS(Wrapper));
};

const makeSelectMinilistProps = () => createSelector(state => state, (_, id) => id, (state, id) => id ? {
  facet: getFacet(state, id, Context$1.minilist, 'js'),
  filters: getFilters(state, id, Context$1.minilist, 'js'),
  isLoading: getIsLoading(state, Context$1.minilist, id),
  pagingInfo: getPaging(state, id, Context$1.minilist, 'js'),
  results: getResults(state, id, Context$1.minilist, 'js'),
  searchTerm: getSearchTerm(state)
} : null);
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
  const selectMinilistProps = useMemo(makeSelectMinilistProps, [id]);
  const {
    facet,
    filters,
    isLoading,
    pagingInfo,
    results,
    searchTerm
  } = useSelector(state => selectMinilistProps(state, id)) || {
    facet: {},
    filters: {},
    isLoading: false,
    pagingInfo: {},
    results: [],
    searchTerm: ''
  };
  // useSelector((state: AppState) => ({
  //   facet: getFacet(state, id, Context.minilist).toJS(),
  //   filters: getFilters(state, id, Context.minilist).toJS(),
  //   isLoading: getIsLoading(state, Context.minilist, id),
  //   pagingInfo: getPaging(state, id, Context.minilist).toJS(),
  //   results: getResults(state, id, Context.minilist).toJS(),
  //   searchTerm: getSearchTerm(state),
  // }));

  useEffect(() => {
    if (id && (mapper || mappers !== null && mappers !== void 0 && mappers.results)) {
      dispatch(triggerSearch({
        config,
        context: Context$1.minilist,
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
    paging: pagingInfo,
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
  compositions: {},
  context: 'facets',
  currentFacet: '',
  currentListing: '',
  currentComposition: '',
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
  filterItem: filterItem,
  filtering: filtering,
  initialState: initialState,
  pagingInfo: pagingInfo,
  searchFacet: searchFacet,
  searchTab: searchTab
});

const addConfigToState = (state, action) => {
  const {
    context,
    facet,
    config
  } = action;
  // Adding or changing the config of a single facet, listing or minilist
  if (context && facet && config) {
    state[context][facet] = {
      ...searchFacet,
      ...config
    };
  } else if (config) {
    // Changing the entire search config
    state = {
      ...config,
      config: initialState.config
    };
  }
  return state;
};
const generateSearchFacets = (context, config) => {
  const facets = {};
  if (config) {
    const thisConfig = config[context] || {};
    if (Object.keys(thisConfig).length > 0) {
      Object.entries(thisConfig).map(([facetName, facet]) => {
        const newFacet = merge(searchFacet, facet);
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
  const filterParams = {
    ...params,
    facet: undefined,
    orderBy: undefined,
    pageIndex: undefined,
    term: undefined
  };

  // Get any existing filters and normalise the items[]
  // so we can start off with isSelected is false
  let filters = Object.entries(state[context][facet].filters || []).map(([key, filter]) => {
    if (isCurrentFacet || filter.isGrouped) {
      var _filter$items;
      return [key, {
        ...filter,
        items: (_filter$items = filter.items) === null || _filter$items === void 0 ? void 0 : _filter$items.map(item => ({
          ...item,
          isSelected: false
        }))
      }];
    }
    return [key, filter];
  });
  const addFilterItem = (filters, paramKey, paramValue) =>
  // Iterate through all filters within the facet,
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
        items.push({
          ...filterItem,
          key: paramValue,
          isSelected: true
        });
      }
      return [key, {
        ...filter,
        items
      }];
    }
  });

  // For each value found in filterParams
  // we are looking to split that value into multiple by any comma
  // and then either set isSelected for an existing filterItem
  // or push an item to the filters.{ key }.items[] array
  // giving it only the key (entry guid) that can be taken to filter
  // the search results during SSR without needing to fetch the filters first
  Object.entries(filterParams).map(([paramName = '', paramValue]) => {
    if (typeof paramValue === 'string') return paramValue.split(',').map(pVal => filters = addFilterItem(filters, paramName, pVal));
    if (typeof paramValue === 'boolean') filters = addFilterItem(filters, paramName, paramValue);
  });
  return Object.fromEntries(filters);
};
const resetFacets = (state, context) => Object.fromEntries(Object.entries(state[context]).map(([k, v]) => [k, resetFacet(v)]));
const resetFacet = facet => {
  facet.pagingInfo.pagesLoaded = [];
  facet.pagingInfo.pageIndex = 0;
  facet.queryDuration = 0;
  return facet;
};
var reducers = config => {
  // Add facets from SearchConfig to initialState
  const initState = {
    ...initialState,
    tabs: config.tabs,
    compositions: config.compositions || {},
    facets: generateSearchFacets(Context$1.facets, config),
    listings: generateSearchFacets(Context$1.listings, config),
    minilist: generateSearchFacets(Context$1.minilist, config)
  };
  return produce((state = initState, action) => {
    const context = state.context;
    const current$1 = context !== 'listings' ? state.currentFacet : state.currentListing;
    switch (action.type) {
      case APPLY_CONFIG:
        {
          state = addConfigToState(state, action);
          return state;
        }
      case CLEAR_FILTERS:
        {
          var _action$clear, _action$clear2;
          const currentFilters = state[context][current$1].filters;
          const filterKeys = ((_action$clear = action.clear) === null || _action$clear === void 0 ? void 0 : _action$clear.keys) || [];
          state[context][current$1].filters = Object.fromEntries(Object.entries(currentFilters).map(([filterKey, filter]) => {
            if (filterKeys.length === 0 || filterKeys.includes(filterKey)) {
              const filterItems = filter.items || [];
              filter.items = filterItems.map(item => ({
                ...item,
                isSelected: false
              }));
            }
            return [filterKey, filter];
          }));
          state[context][current$1].queryDuration = 0;
          state[context][current$1].pagingInfo.pagesLoaded = [];

          // also clone UPDATE_SEARCH_TERM behavior if clearing term also
          if (((_action$clear2 = action.clear) === null || _action$clear2 === void 0 ? void 0 : _action$clear2.term) === true) {
            state.term = '';
            state[context] = resetFacets(state, context);
          }
          return;
        }
      case EXECUTE_SEARCH:
        {
          state[action.context][action.facet].entries = {
            ...(state[action.context][action.facet].entries || entries),
            isLoading: true
          };
          return;
        }
      case EXECUTE_SEARCH_ERROR:
        {
          state[action.context][action.facet].entries = {
            ...entries,
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
            if (filtersToLoad.find(f => f === filterKey)) return {
              ...filter,
              isLoading: true
            };
            return filter;
          });
          state[action.context][facetKey].filters = Object.fromEntries(Object.entries(filters).map(([filterKey, filter]) => {
            if (filtersToLoad.find(f => f === filterKey)) return [filterKey, {
              ...filter,
              isLoading: true
            }];
            return [filterKey, filter];
          }));
          return;
        }
      case LOAD_FILTERS_ERROR:
      case LOAD_FILTERS_COMPLETE:
        {
          var _nextFilter$items;
          const {
            facetKey,
            filterKey,
            nextFilter
          } = action;
          const stateFilter = state[action.context][facetKey].filters[filterKey];
          if (!((_nextFilter$items = nextFilter.items) !== null && _nextFilter$items !== void 0 && _nextFilter$items.length) && (stateFilter.items || []).length >= nextFilter.items.length) {
            // Preserve items already in state
            state[action.context][facetKey].filters[filterKey] = {
              ...stateFilter,
              isLoading: false,
              isError: nextFilter.isError
            };
            return;
          }
          state[action.context][facetKey].filters[filterKey] = merge(stateFilter, nextFilter, {
            arrayMerge: (source, inbound) => inbound
          });
          return;
        }
      case SET_ROUTE_FILTERS:
        {
          var _state$context$facet, _state$tabs, _state$context$facet$;
          const {
            facet,
            params,
            context,
            languages
          } = action;
          const {
            term = '',
            pageIndex,
            pageSize,
            orderBy
          } = params;
          const stateTerm = state.term;
          const tabId = ((_state$context$facet = state[context][facet]) === null || _state$context$facet === void 0 ? void 0 : _state$context$facet.tabId) || 0;

          // Reset the facet if the search term has changed, or if the any of
          // the filters have changed
          const resetAllFacets = stateTerm && term !== stateTerm;
          let resetCurrentFacet = false;

          // Add filter values in params to the matched filters in state for the current facet
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
            resetCurrentFacet = state.config.isLoaded === true && !equals(nextFilters, stateFacet.filters);
            stateFacet = resetCurrentFacet ? resetFacet(stateFacet) : stateFacet;
            stateFacet.filters = nextFilters;
            stateFacet.queryParams.dynamicOrderBy = toArray(orderBy) || [];
            stateFacet.queryParams.languages = languages;
            return [facetName, stateFacet];
          }));
          state.context = context;
          state[context] = nextFacets;
          state[action.context === Context$1.facets ? 'currentFacet' : 'currentListing'] = facet;
          state.currentComposition = action.composition;
          state.term = term;
          if ((_state$tabs = state.tabs) !== null && _state$tabs !== void 0 && _state$tabs[tabId]) state.tabs[tabId].currentFacet = facet;
          if (state[context][facet]) state[context][facet].pagingInfo = {
            ...(state[context][facet].pagingInfo || pagingInfo),
            pageIndex: Number(pageIndex) - 1 || (state[context][facet].queryParams.loadMorePaging ? ((_state$context$facet$ = state[context][facet].pagingInfo) === null || _state$context$facet$ === void 0 ? void 0 : _state$context$facet$.pageIndex) || 0 : 0),
            pageSize: Number(pageSize) || state[context][facet].queryParams.pageSize
          };
          state.config.isLoaded = true;
          state.config.ssr = typeof window === 'undefined';
          if (resetAllFacets) state[context] = resetFacets(state, context);
          return;
        }
      case SET_SEARCH_ENTRIES:
        {
          var _action$mappers;
          const thisContext = action.context || context;
          const currentFacet = state[thisContext][action.facet];

          // // Handle aggregations client-side where the filter items have loaded before the results containing the aggregations
          // for (const [filterKey, filter] of Object.entries(
          //   currentFacet.filters
          // )) {
          //   const aggregation = (action.nextFacet as Partial<Facet>)
          //     .aggregations?.[convertKeyForAggregation(filterKey)];

          //   for (const filterItem of filter.items || []) {
          //     if (!aggregation) delete filterItem.aggregate;
          //     else {
          //       const aggregate = aggregation[filterItem.key.toLowerCase()];
          //       if (typeof aggregate === 'number')
          //         filterItem.aggregate = aggregate;
          //       else delete filterItem.aggregate;
          //     }
          //   }
          // }

          state[thisContext][action.facet] = merge(currentFacet, action.nextFacet, {
            arrayMerge: (source, inbound) => inbound
          });
          if ((_action$mappers = action.mappers) !== null && _action$mappers !== void 0 && _action$mappers.resultsInfo && typeof action.mappers.resultsInfo === 'function') {
            // Likely an anti-pattern but we need to provide the whole state
            // to the resultsInfo mapper, including the latest search state
            // which is not yet committed outside of this produce() call
            state[thisContext][action.facet].resultsInfo = action.mappers.resultsInfo({
              ...action.state,
              search: current(state)
            });
          }
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
          const filters = generateFiltersState({
            ...action,
            isCurrentFacet: true
          }, state);
          const term = action === null || action === void 0 || (_action$params = action.params) === null || _action$params === void 0 ? void 0 : _action$params.term;
          const useSearchTerm = state[action.context || Context$1.minilist][action.facet].queryParams.useSearchTerm || false;
          state[action.context || Context$1.minilist][action.facet].filters = filters;
          state[action.context || Context$1.minilist][action.facet].queryParams.excludeIds = action.excludeIds;
          state.term = useSearchTerm ? term : state.term;
          state.config.ssr = typeof window === 'undefined';
          return;
        }
      case UPDATE_PAGE_INDEX:
        {
          const {
            pageIndex
          } = action;
          const internalPaging = state[context][current$1].queryParams.internalPaging || false;
          const currentPageIndex = state[context][current$1].pagingInfo.pageIndex || 0;
          state[context][current$1].pagingInfo.pageIndex = Number(pageIndex) || 0;
          state[context][current$1].pagingInfo.prevPageIndex = currentPageIndex;
          state[context][current$1].pagingInfo.isLoading = true;
          if (internalPaging) return;
          state[context][current$1].queryDuration = 0;
          return;
        }
      case UPDATE_PAGE_SIZE:
        {
          const {
            pageSize
          } = action;
          state[context][current$1].pagingInfo.pageSize = pageSize;
          state[context][current$1].pagingInfo.pageIndex = 0;
          state[context][current$1].pagingInfo.isLoading = true;
          state[context][current$1].queryDuration = 0;
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
            key,
            isUnknownItem
          } = action;
          const isSingleSelect = state[context][current$1].filters[filter].isSingleSelect || false;
          const isGrouped = state[context][current$1].filters[filter].isGrouped || false;
          const currentItems = state[context][current$1].filters[filter].items;
          if (isGrouped) state[context] = resetFacets(state, context);
          state[context][current$1] = resetFacet(state[context][current$1]);
          if (isUnknownItem && (currentItems === null || currentItems === void 0 ? void 0 : currentItems.findIndex(item => (item === null || item === void 0 ? void 0 : item.key) === key)) === -1) {
            currentItems === null || currentItems === void 0 || currentItems.push({
              key,
              isSelected: false
            });
          }
          state[context][current$1].filters[filter].items = currentItems === null || currentItems === void 0 ? void 0 : currentItems.map(item => {
            if (item.key === key) {
              return {
                ...item,
                isSelected: !item.isSelected
              };
            }
            if (isSingleSelect) return {
              ...item,
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
          const currentFacet = facet || current$1;
          state[context][currentFacet].queryParams.dynamicOrderBy = orderBy ? toArray(orderBy) || [] : [];
          return;
        }
      default:
        return;
    }
  }, initState);
};

const Context = {
  facets: 'facets',
  listings: 'listings',
  minilist: 'minilist'
};

export { Context, reducers as reducer, schema, useMinilist, withListing, withSearch };
//# sourceMappingURL=search.js.map
