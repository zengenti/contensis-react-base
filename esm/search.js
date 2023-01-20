import React, { useMemo, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { g as getCurrentFacet, b as getPageIndex$2, e as getCurrentTab$1, h as getFacet$1, i as getTabFacets$1, j as getFacetsTotalCount$1, k as getFacetTitles$1, l as getFeaturedResults$2, m as getRenderableFilters$2, n as getIsLoading$2, p as getPaging, q as getPageIsLoading$2, r as getResults, s as getSearchTerm$2, u as getSearchTotalCount$1, v as getSelectedFilters, w as getQueryParameter$2, x as getTabsAndFacets$1, y as getTotalCount$1, z as withMappers, A as clearFilters, B as updateCurrentFacet, C as updateCurrentTab, D as updatePageIndex, E as updateSearchTerm, F as updateSelectedFilters, G as updateSortOrder, H as selectListing, I as mapStateToSearchUri, J as Context$1, K as selectFacets, L as triggerSearch, M as getFilters, U as UPDATE_SORT_ORDER, N as toArray, O as UPDATE_SELECTED_FILTERS, P as UPDATE_SEARCH_TERM, Q as UPDATE_PAGE_INDEX, S as SET_SEARCH_FILTERS, R as SET_SEARCH_ENTRIES, T as SET_ROUTE_FILTERS, V as LOAD_FILTERS_COMPLETE, W as LOAD_FILTERS_ERROR, X as LOAD_FILTERS, Y as EXECUTE_SEARCH_ERROR, Z as EXECUTE_SEARCH, _ as CLEAR_FILTERS, $ as APPLY_CONFIG } from './sagas-023783fd.js';
export { a0 as actions, a5 as doSearch, a3 as expressions, a4 as queries, ab as routeParams, a7 as sagas, a1 as selectors, a6 as setRouteFilters, a8 as triggerListingSsr, a9 as triggerMinilistSsr, aa as triggerSearchSsr, a2 as types } from './sagas-023783fd.js';
import 'jsonpath-mapper';
import { createSelector } from 'reselect';
import merge from 'deepmerge';
import 'query-string';
import { produce } from 'immer';
import equals from 'deep-equal';
import 'contensis-core-api';
import 'loglevel';
import '@redux-saga/core/effects';
import 'contensis-delivery-api';

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
  return /*#__PURE__*/React.createElement(WrappedComponent, propsJS);
};

// eslint-disable-next-line import/default

const withSearch = mappers => SearchComponent => {
  const Wrapper = props => {
    return /*#__PURE__*/React.createElement(SearchComponent, props);
  };

  Wrapper.displayName = `withSearch(${SearchComponent.displayName || SearchComponent.name})`;

  const mapStateToProps = state => {
    return {
      currentFacet: getCurrentFacet(state),
      currentPageIndex: getPageIndex$2(state),
      currentTabIndex: getCurrentTab$1(state),
      facet: getFacet$1(state),
      facets: getTabFacets$1(state),
      facetsTotalCount: getFacetsTotalCount$1(state),
      facetTitles: getFacetTitles$1(state),
      featuredResults: getFeaturedResults$2(state),
      filters: getRenderableFilters$2(state),
      isLoading: getIsLoading$2(state),
      paging: getPaging(state),
      pageIsLoading: getPageIsLoading$2(state),
      results: getResults(state),
      resultsInfo: (mappers === null || mappers === void 0 ? void 0 : mappers.resultsInfo) && mappers.resultsInfo(state),
      searchTerm: getSearchTerm$2(state),
      searchTotalCount: getSearchTotalCount$1(state),
      selectedFilters: getSelectedFilters(state),
      sortOrder: getQueryParameter$2({
        state
      }, 'dynamicOrderBy', []),
      tabsAndFacets: getTabsAndFacets$1(state),
      totalCount: getTotalCount$1(state)
    };
  };

  const mapDispatchToProps = {
    clearFilters: filterKey => withMappers(clearFilters(filterKey), mappers),
    updateCurrentFacet: facet => withMappers(updateCurrentFacet(facet), mappers),
    updateCurrentTab: id => withMappers(updateCurrentTab(id), mappers),
    updatePageIndex: (pageIndex, scrollYPos) => withMappers(updatePageIndex(pageIndex, scrollYPos), mappers),
    updateSearchTerm: term => withMappers(updateSearchTerm(term), mappers),
    updateSelectedFilters: (filter, key, isUnknownItem = false, scrollYPos) => withMappers(updateSelectedFilters(filter, key, isUnknownItem, scrollYPos), mappers),
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
      resultsInfo: mappers && typeof mappers.resultsInfo === 'function' && mappers.resultsInfo(state),
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
    updatePageIndex: (pageIndex, scrollYPos) => withMappers(updatePageIndex(pageIndex, scrollYPos), mappers),
    updateSearchTerm: term => withMappers(updateSearchTerm(term), mappers),
    updateSelectedFilters: (filter, key, isUnknownItem = false, scrollYPos) => withMappers(updateSelectedFilters(filter, key, isUnknownItem, scrollYPos), mappers),
    updateSortOrder: orderBy => withMappers(updateSortOrder(orderBy), mappers)
  };
  return connect(mapStateToProps, mapDispatchToProps)(toJS(Wrapper));
};

var defaultMappers = {
  results: entries => entries,
  navigate: mapStateToSearchUri
};

const {
  getCurrent: getCurrent$1,
  getCurrentTab,
  getFacet,
  getFacetsTotalCount,
  getFacetTitles,
  getFeaturedResults: getFeaturedResults$1,
  getIsLoading: getIsLoading$1,
  getPageIndex: getPageIndex$1,
  getPageIsLoading: getPageIsLoading$1,
  getQueryParameter: getQueryParameter$1,
  getRenderableFilters: getRenderableFilters$1,
  getSearchTerm: getSearchTerm$1,
  getSearchTotalCount,
  getTabFacets,
  getTabsAndFacets,
  getTotalCount
} = selectFacets;

const makeSelectFacetsProps = () => createSelector(state => state, (_, mappers) => mappers, (state, mappers) => ({
  currentFacet: getCurrent$1(state),
  currentPageIndex: getPageIndex$1(state),
  currentTabIndex: getCurrentTab(state),
  facet: getFacet(state),
  facetTitles: getFacetTitles(state),
  facets: getTabFacets(state),
  facetsTotalCount: getFacetsTotalCount(state),
  featured: getFeaturedResults$1(state),
  filters: getRenderableFilters$1(state),
  isLoading: getIsLoading$1(state),
  pageIsLoading: getPageIsLoading$1(state),
  paging: getPaging(state, '', Context$1.facets, 'js'),
  results: getResults(state, '', Context$1.facets, 'js'),
  resultsInfo: mappers && typeof mappers.resultsInfo === 'function' && mappers.resultsInfo(state),
  searchTerm: getSearchTerm$1(state),
  searchTotalCount: getSearchTotalCount(state),
  selectedFilters: getSelectedFilters(state, '', Context$1.facets, 'js'),
  sortOrder: getQueryParameter$1({
    state
  }, 'dynamicOrderBy', []),
  tabsAndFacets: getTabsAndFacets(state),
  totalCount: getTotalCount(state)
}));

const useFacets = ({
  mappers
} = {
  id: ''
}) => {
  const dispatch = useDispatch();
  const m = mappers || defaultMappers;
  const selectListingProps = useMemo(makeSelectFacetsProps, [m]);
  const dispatchProps = {
    clearFilters: filterKey => dispatch(withMappers(clearFilters(filterKey), m)),
    updateCurrentFacet: facet => dispatch(withMappers(updateCurrentFacet(facet), m)),
    updateCurrentTab: id => withMappers(updateCurrentTab(id), m),
    updatePageIndex: (pageIndex, scrollYPos) => dispatch(withMappers(updatePageIndex(pageIndex, scrollYPos), m)),
    updateSearchTerm: term => dispatch(withMappers(updateSearchTerm(term), m)),
    updateSelectedFilters: (filter, key, isUnknownItem = false, scrollYPos) => dispatch(withMappers(updateSelectedFilters(filter, key, isUnknownItem, scrollYPos), m)),
    updateSortOrder: orderBy => dispatch(withMappers(updateSortOrder(orderBy), m))
  };
  const {
    currentFacet,
    currentPageIndex,
    currentTabIndex,
    facet,
    facets,
    facetsTotalCount,
    facetTitles,
    featured,
    filters,
    isLoading,
    paging,
    pageIsLoading,
    results,
    resultsInfo,
    searchTerm,
    searchTotalCount,
    selectedFilters,
    sortOrder,
    tabsAndFacets,
    totalCount
  } = useSelector(state => selectListingProps(state, m));
  return {
    currentFacet,
    currentPageIndex,
    currentTabIndex,
    facet,
    facets,
    facetsTotalCount,
    facetTitles,
    featured,
    filters,
    isLoading,
    paging,
    pageIsLoading,
    results,
    resultsInfo,
    searchTerm,
    searchTotalCount,
    selectedFilters,
    sortOrder,
    tabsAndFacets,
    totalCount,
    ...dispatchProps
  };
};

const {
  getCurrent,
  getFeaturedResults,
  getIsLoading,
  getListing,
  getPageIndex,
  getPageIsLoading,
  getQueryParameter,
  getRenderableFilters,
  getSearchTerm
} = selectListing;

const makeSelectListingProps = () => createSelector(state => state, (_, mappers) => mappers, (state, mappers) => ({
  currentListing: getCurrent(state),
  currentPageIndex: getPageIndex(state),
  listing: getListing(state),
  featured: getFeaturedResults(state),
  filters: getRenderableFilters(state),
  isLoading: getIsLoading(state),
  pageIsLoading: getPageIsLoading(state),
  paging: getPaging(state, '', Context$1.listings, 'js'),
  results: getResults(state, '', Context$1.listings, 'js'),
  resultsInfo: mappers && typeof mappers.resultsInfo === 'function' && mappers.resultsInfo(state),
  searchTerm: getSearchTerm(state),
  selectedFilters: getSelectedFilters(state, '', Context$1.listings, 'js'),
  sortOrder: getQueryParameter({
    state
  }, 'dynamicOrderBy', [])
}));

const useListing = ({
  mappers
} = {
  id: ''
}) => {
  const dispatch = useDispatch();
  const m = mappers || defaultMappers;
  const selectListingProps = useMemo(makeSelectListingProps, [m]);
  const dispatchProps = {
    clearFilters: filterKey => dispatch(withMappers(clearFilters(filterKey), m)),
    updateCurrentFacet: facet => dispatch(withMappers(updateCurrentFacet(facet), m)),
    updatePageIndex: (pageIndex, scrollYPos) => dispatch(withMappers(updatePageIndex(pageIndex, scrollYPos), m)),
    updateSearchTerm: term => dispatch(withMappers(updateSearchTerm(term), m)),
    updateSelectedFilters: (filter, key, isUnknownItem = false, scrollYPos) => dispatch(withMappers(updateSelectedFilters(filter, key, isUnknownItem, scrollYPos), m)),
    updateSortOrder: orderBy => dispatch(withMappers(updateSortOrder(orderBy), m))
  };
  const {
    currentListing,
    currentPageIndex,
    featured,
    filters,
    isLoading,
    listing,
    paging,
    pageIsLoading,
    results,
    resultsInfo,
    searchTerm,
    selectedFilters,
    sortOrder
  } = useSelector(state => selectListingProps(state, m));
  return {
    currentListing,
    currentPageIndex,
    featured,
    filters,
    isLoading,
    listing,
    pageIsLoading,
    paging,
    results,
    resultsInfo,
    searchTerm,
    selectedFilters,
    sortOrder,
    title: listing.title,
    ...dispatchProps
  };
};

const makeSelectMinilistProps = () => createSelector(state => state, (_, id) => id, (state, id) => id ? {
  facet: getFacet$1(state, id, Context$1.minilist, 'js'),
  filters: getFilters(state, id, Context$1.minilist, 'js'),
  isLoading: getIsLoading$2(state, Context$1.minilist, id),
  pagingInfo: getPaging(state, id, Context$1.minilist, 'js'),
  results: getResults(state, id, Context$1.minilist, 'js'),
  searchTerm: getSearchTerm$2(state)
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
  }; // useSelector((state: AppState) => ({
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
    state[context][facet] = { ...searchFacet,
      ...config
    };
  } else if (config) {
    // Changing the entire search config
    state = { ...config,
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
  const filterParams = { ...params,
    facet: undefined,
    orderBy: undefined,
    pageIndex: undefined,
    term: undefined
  }; // Get any existing filters and normalise the items[]
  // so we can start off with isSelected is false

  let filters = Object.entries(state[context][facet].filters || []).map(([key, filter]) => {
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

var reducers = (config => {
  // Add facets from SearchConfig to initialState
  const initState = { ...initialState,
    tabs: config.tabs,
    facets: generateSearchFacets(Context$1.facets, config),
    listings: generateSearchFacets(Context$1.listings, config),
    minilist: generateSearchFacets(Context$1.minilist, config)
  };
  return produce((state = initState, action) => {
    const context = state.context;
    const current = context !== 'listings' ? state.currentFacet : state.currentListing;

    switch (action.type) {
      case APPLY_CONFIG:
        {
          state = addConfigToState(state, action);
          return state;
        }

      case CLEAR_FILTERS:
        {
          const currentFilters = state[context][current].filters;
          state[context][current].filters = Object.fromEntries(Object.entries(currentFilters).map(([filterKey, filter]) => {
            if (typeof action.filterKey === 'undefined' || action.filterKey === filterKey) {
              const filterItems = filter.items || [];
              filter.items = filterItems.map(item => ({ ...item,
                isSelected: false
              }));
            }

            return [filterKey, filter];
          }));
          state[context][current].queryDuration = 0;
          state[context][current].pagingInfo.pagesLoaded = [];
          return;
        }

      case EXECUTE_SEARCH:
        {
          state[action.context][action.facet].entries = { ...(state[action.context][action.facet].entries || entries),
            isLoading: true
          };
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

          state[action.context][facetKey].filters[filterKey] = merge(filter, nextFilter, {
            arrayMerge: (source, inbound) => inbound
          });
          return;
        }

      case SET_ROUTE_FILTERS:
        {
          var _state$context$facet$;

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
            resetCurrentFacet = state.config.isLoaded === true && !equals(nextFilters, stateFacet.filters);
            stateFacet = resetCurrentFacet ? resetFacet(stateFacet) : stateFacet;
            stateFacet.filters = nextFilters;
            stateFacet.queryParams.dynamicOrderBy = toArray(orderBy) || [];
            return [facetName, stateFacet];
          }));
          state.context = context;
          state[context] = nextFacets;
          state[action.context === Context$1.facets ? 'currentFacet' : 'currentListing'] = facet;
          state.term = term;
          state.tabs[tabId].currentFacet = facet;
          state[context][facet].pagingInfo = { ...(state[context][facet].pagingInfo || pagingInfo),
            pageIndex: Number(pageIndex) - 1 || (state[context][facet].queryParams.loadMorePaging ? ((_state$context$facet$ = state[context][facet].pagingInfo) === null || _state$context$facet$ === void 0 ? void 0 : _state$context$facet$.pageIndex) || 0 : 0)
          };
          state.config.isLoaded = true;
          state.config.ssr = typeof window === 'undefined';
          if (resetAllFacets) state[context] = resetFacets(state, context);
          return;
        }

      case SET_SEARCH_ENTRIES:
        {
          const thisContext = action.context || context;
          const currentFacet = state[thisContext][action.facet];
          state[thisContext][action.facet] = merge(currentFacet, action.nextFacet, {
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
            key,
            isUnknownItem
          } = action;
          const isSingleSelect = state[context][current].filters[filter].isSingleSelect || false;
          const isGrouped = state[context][current].filters[filter].isGrouped || false;
          const currentItems = state[context][current].filters[filter].items;
          if (isGrouped) state[context] = resetFacets(state, context);
          state[context][current] = resetFacet(state[context][current]);

          if (isUnknownItem && (currentItems === null || currentItems === void 0 ? void 0 : currentItems.findIndex(item => (item === null || item === void 0 ? void 0 : item.key) === key)) === -1) {
            currentItems === null || currentItems === void 0 ? void 0 : currentItems.push({
              key,
              isSelected: false
            });
          }

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

const Context = {
  facets: 'facets',
  listings: 'listings',
  minilist: 'minilist'
};

export { Context, reducers as reducer, schema, useFacets, useListing, useMinilist, withListing, withSearch };
//# sourceMappingURL=search.js.map
