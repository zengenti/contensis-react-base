import { Draft, produce } from 'immer';
import equals from 'deep-equal';
import merge from 'deepmerge';

import {
  entries,
  filterItem,
  pagingInfo,
  searchFacet,
  initialState,
} from './schema';
import {
  APPLY_CONFIG,
  CLEAR_FILTERS,
  EXECUTE_SEARCH,
  EXECUTE_SEARCH_ERROR,
  LOAD_FILTERS,
  LOAD_FILTERS_COMPLETE,
  LOAD_FILTERS_ERROR,
  SET_ROUTE_FILTERS,
  SET_SEARCH_FILTERS,
  SET_SEARCH_ENTRIES,
  UPDATE_SEARCH_TERM,
  UPDATE_SELECTED_FILTERS,
  UPDATE_SORT_ORDER,
  UPDATE_PAGE_INDEX,
  UPDATE_PAGE_SIZE,
} from './types';
import { toArray } from '../search/util';
import {
  ConfigTypes,
  SearchFacet,
  Listing,
  SearchConfig,
} from '../models/Search';
import { Context } from '../models/Enums';
import {
  Facet,
  Facets,
  SearchState,
  Filter,
  Filters,
  FilterItem,
} from '../models/SearchState';

const addConfigToState = (state: SearchState, action: any) => {
  const { context, facet, config } = action as {
    context: keyof typeof Context;
    facet: string;
    config: any;
  };
  // Adding or changing the config of a single facet, listing or minilist
  if (context && facet && config) {
    state[context][facet] = { ...searchFacet, ...config };
  } else if (config) {
    // Changing the entire search config
    state = { ...config, config: initialState.config };
  }
  return state;
};

const generateSearchFacets = (context: Context, config: SearchConfig) => {
  const facets = {} as Facets;
  if (config) {
    const thisConfig: ConfigTypes = config[context] || {};
    if (Object.keys(thisConfig).length > 0) {
      Object.entries(thisConfig).map(
        ([facetName, facet]: [string, SearchFacet | Listing]) => {
          const newFacet = merge(searchFacet, facet);
          if (!('isDisabled' in facet) || facet.isDisabled !== true)
            facets[facetName] = newFacet;
        }
      );
    }
  }
  return facets;
};

const generateFiltersState = (
  {
    facet,
    params,
    context,
    isCurrentFacet,
  }: {
    facet: string;
    params: { [k: string]: string };
    context: keyof typeof Context;
    isCurrentFacet: boolean;
  },
  state: SearchState
) => {
  // Remove filters we know about from params
  const filterParams = {
    ...params,
    facet: undefined,
    orderBy: undefined,
    pageIndex: undefined,
    term: undefined,
  } as { [k: string]: string | undefined };

  // Get any existing filters and normalise the items[]
  // so we can start off with isSelected is false
  let filters: [string, Filter][] = Object.entries(
    (state[context][facet].filters || []) as Filters
  ).map(([key, filter]: [string, Filter]) => {
    if (isCurrentFacet || filter.isGrouped) {
      return [
        key,
        {
          ...filter,
          items: filter.items?.map(item => ({ ...item, isSelected: false })),
        } as Filter,
      ];
    }
    return [key, filter];
  });

  const addFilterItem = (
    filters: [string, Filter][],
    paramKey: string,
    paramValue: string
  ) =>
    // Iterate through all filters within the facet,
    // if the paramKey matches the filter key
    // get the existing items list, and see if that filter
    // already exists, if so set isSelected to true,
    // if not create a new filterItem, setting the key only
    // so we can match this key later on when we load the filters
    filters.map<[string, Filter]>(([key, filter]) => {
      if (paramKey !== key || (!isCurrentFacet && !filter.isGrouped)) {
        return [key, filter];
      } else {
        const items = (filter.items || []) as FilterItem[];
        const itemIndex = items.findIndex(item => item?.key === paramValue);
        if (items.length > 0 && itemIndex !== -1) {
          items[itemIndex].isSelected = true;
        } else {
          items.push({
            ...filterItem,
            key: paramValue,
            isSelected: true,
          });
        }

        return [
          key,
          {
            ...filter,
            items,
          } as Filter,
        ];
      }
    });

  // For each value found in filterParams
  // we are looking to split that value into multiple by any comma
  // and then either set isSelected for an existing filterItem
  // or push an item to the filters.{ key }.items[] array
  // giving it only the key (entry guid) that can be taken to filter
  // the search results during SSR without needing to fetch the filters first
  Object.entries(filterParams).map(([paramName = '', paramValue]) => {
    if (typeof paramValue === 'string')
      return paramValue
        .split(',')
        .map(pVal => (filters = addFilterItem(filters, paramName, pVal)));
    if (typeof paramValue === 'boolean')
      filters = addFilterItem(filters, paramName, paramValue);
  });

  return Object.fromEntries(filters) as Filters;
};

const resetFacets = (state: SearchState, context: keyof typeof Context) =>
  Object.fromEntries(
    Object.entries(state[context] as Facets).map(([k, v]) => [k, resetFacet(v)])
  ) as Facets;

const resetFacet = (facet: Facet) => {
  facet.pagingInfo.pagesLoaded = [];
  facet.pagingInfo.pageIndex = 0;
  facet.queryDuration = 0;
  return facet;
};

export default (config: SearchConfig) => {
  // Add facets from SearchConfig to initialState
  const initState: SearchState = {
    ...initialState,
    tabs: config.tabs as any,
    facets: generateSearchFacets(Context.facets, config),
    listings: generateSearchFacets(Context.listings, config),
    minilist: generateSearchFacets(Context.minilist, config),
  };

  return produce(
    (
      state: Draft<SearchState> = initState,
      action: {
        [key: string]: any;
        context: keyof typeof Context;
        facet: string;
        params: { [key: string]: string };
      }
    ) => {
      const context = state.context as keyof typeof Context;
      const current =
        context !== 'listings' ? state.currentFacet : state.currentListing;

      switch (action.type) {
        case APPLY_CONFIG: {
          state = addConfigToState(state, action);
          return state;
        }
        case CLEAR_FILTERS: {
          const currentFilters = state[context][current].filters as Filters;

          state[context][current].filters = Object.fromEntries(
            Object.entries(currentFilters).map(([filterKey, filter]) => {
              if (
                typeof action.filterKey === 'undefined' ||
                action.filterKey === filterKey
              ) {
                const filterItems = (filter.items || []) as FilterItem[];

                filter.items = filterItems.map(item => ({
                  ...item,
                  isSelected: false,
                })) as FilterItem[];
              }

              return [filterKey, filter];
            })
          );
          state[context][current].queryDuration = 0;
          state[context][current].pagingInfo.pagesLoaded = [];

          return;
        }
        case EXECUTE_SEARCH: {
          state[action.context][action.facet].entries = {
            ...(state[action.context][action.facet].entries || entries),
            isLoading: true,
          };
          return;
        }
        case EXECUTE_SEARCH_ERROR: {
          state[action.context][action.facet].entries = {
            ...entries,
            isError: true,
            error: action.error,
          };
          return;
        }
        case LOAD_FILTERS: {
          const { facetKey, filtersToLoad } = action;
          const filters = state[action.context][facetKey].filters as Filters;

          Object.entries(filters).map(([filterKey, filter]) => {
            if (filtersToLoad.find((f: string) => f === filterKey))
              return { ...filter, isLoading: true } as Filter;
            return filter;
          });

          state[action.context][facetKey].filters = Object.fromEntries(
            Object.entries(filters).map(([filterKey, filter]) => {
              if (filtersToLoad.find((f: string) => f === filterKey))
                return [filterKey, { ...filter, isLoading: true }];
              return [filterKey, filter];
            })
          );

          return;
        }
        case LOAD_FILTERS_ERROR:
        case LOAD_FILTERS_COMPLETE: {
          const { facetKey, filterKey, nextFilter } = action;
          const filter = state[action.context][facetKey].filters[
            filterKey
          ] as Filter;

          if (
            !(nextFilter.items && nextFilter.items.length > 0) &&
            (filter.items || []).length >= nextFilter.items.length
          ) {
            // Preserve items already in state
            state[action.context][facetKey].filters[filterKey] = {
              ...filter,
              isLoading: false,
              isError: nextFilter.isError,
            };
            return;
          }

          state[action.context][facetKey].filters[filterKey] = merge(
            filter,
            nextFilter,
            {
              arrayMerge: (source, inbound) => inbound,
            }
          );

          return;
        }
        case SET_ROUTE_FILTERS: {
          const { facet, params, context } = action;
          const { term = '', pageIndex, pageSize, orderBy } = params;

          const stateTerm = state.term;
          const tabId = state[context][facet].tabId || 0;

          // Reset the facet if the search term has changed, or if the any of
          // the filters have changed
          const resetAllFacets = stateTerm && term !== stateTerm;
          let resetCurrentFacet = false;

          // Add filter values in params to the matched filters in state for the current facet
          // causing unfetched filter items to be generated with isSelected: true
          // or existing filter items to be tagged with isSelected: true
          const nextFacets = Object.fromEntries(
            Object.entries(state[context] as Facets).map(
              ([facetName = '', stateFacet]) => {
                const isCurrentFacet = facetName === facet;
                const nextFilters = generateFiltersState(
                  {
                    facet: facetName,
                    params,
                    context,
                    isCurrentFacet,
                  },
                  state
                );

                resetCurrentFacet =
                  state.config.isLoaded === true &&
                  !equals(nextFilters, stateFacet.filters);

                stateFacet = resetCurrentFacet
                  ? resetFacet(stateFacet)
                  : stateFacet;
                stateFacet.filters = nextFilters;
                stateFacet.queryParams.dynamicOrderBy = toArray(orderBy) || [];
                return [facetName, stateFacet];
              }
            )
          );

          state.context = context;
          state[context] = nextFacets;
          state[
            action.context === Context.facets
              ? 'currentFacet'
              : 'currentListing'
          ] = facet;
          state.term = term;
          state.tabs[tabId].currentFacet = facet;
          state[context][facet].pagingInfo = {
            ...(state[context][facet].pagingInfo || pagingInfo),
            pageIndex:
              Number(pageIndex) - 1 ||
              (state[context][facet].queryParams.loadMorePaging
                ? state[context][facet].pagingInfo?.pageIndex || 0
                : 0),
            pageSize:
              Number(pageSize) || state[context][facet].queryParams.pageSize,
          };
          state.config.isLoaded = true;
          state.config.ssr = typeof window === 'undefined';

          if (resetAllFacets) state[context] = resetFacets(state, context);

          return;
        }
        case SET_SEARCH_ENTRIES: {
          const thisContext = action.context || context;
          const currentFacet = state[thisContext][action.facet];

          for (const [filterKey, filter] of Object.entries(
            currentFacet.filters
          )) {
            const aggregation = (action.nextFacet as Partial<Facet>)
              .aggregations?.[filterKey];

            for (const filterItem of filter.items || []) {
              if (!aggregation) delete filterItem.aggregate;
              else {
                const aggregate = aggregation[filterItem.key.toLowerCase()];
                if (typeof aggregate === 'number')
                  filterItem.aggregate = aggregate;
                else delete filterItem.aggregate;
              }
            }
          }

          state[thisContext][action.facet] = merge(
            currentFacet,
            action.nextFacet,
            {
              arrayMerge: (source, inbound) => inbound,
            }
          );
          return;
        }
        case SET_SEARCH_FILTERS: {
          // DO SEARCH then SET_SEARCH_FILTERS is for when we cannot use SET_ROUTE_FILTERS
          // for example in a minilist scenario where the route filters
          // are used for the primary page / listing navigation

          // Add filter values in params to the matched filters in state
          // causing unfetched filter items to be generated with isSelected: true
          const filters = generateFiltersState(
            { ...action, isCurrentFacet: true },
            state
          );

          const term = action?.params?.term;
          const useSearchTerm =
            state[action.context || Context.minilist][action.facet].queryParams
              .useSearchTerm || false;
          state[action.context || Context.minilist][action.facet].filters =
            filters;
          state[action.context || Context.minilist][
            action.facet
          ].queryParams.excludeIds = action.excludeIds;
          state.term = useSearchTerm ? term : state.term;
          state.config.ssr = typeof window === 'undefined';

          return;
        }
        case UPDATE_PAGE_INDEX: {
          const { pageIndex } = action;
          const internalPaging =
            state[context][current].queryParams.internalPaging || false;

          const currentPageIndex =
            state[context][current].pagingInfo.pageIndex || 0;

          state[context][current].pagingInfo.pageIndex = Number(pageIndex) || 0;
          state[context][current].pagingInfo.prevPageIndex = currentPageIndex;
          state[context][current].pagingInfo.isLoading = true;

          if (internalPaging) return;

          state[context][current].queryDuration = 0;
          return;
        }
        case UPDATE_PAGE_SIZE: {
          const { pageSize } = action;

          state[context][current].pagingInfo.pageSize = pageSize;
          state[context][current].pagingInfo.pageIndex = 0;
          state[context][current].pagingInfo.isLoading = true;
          state[context][current].queryDuration = 0;
          return;
        }
        case UPDATE_SEARCH_TERM: {
          state.term = action.term;
          state[context] = resetFacets(state, context);

          return;
        }
        case UPDATE_SELECTED_FILTERS: {
          const { filter, key, isUnknownItem } = action;

          const isSingleSelect =
            state[context][current].filters[filter].isSingleSelect || false;
          const isGrouped =
            state[context][current].filters[filter].isGrouped || false;

          const currentItems = state[context][current].filters[filter].items;
          if (isGrouped) state[context] = resetFacets(state, context);
          state[context][current] = resetFacet(state[context][current]);

          if (
            isUnknownItem &&
            currentItems?.findIndex(item => item?.key === key) === -1
          ) {
            currentItems?.push({
              key,
              isSelected: false,
            });
          }
          state[context][current].filters[filter].items = currentItems?.map(
            item => {
              if (item.key === key) {
                return { ...item, isSelected: !item.isSelected };
              }
              if (isSingleSelect) return { ...item, isSelected: false };
              return item;
            }
          );

          return;
        }
        case UPDATE_SORT_ORDER: {
          const { orderBy, facet } = action;
          state[context] = resetFacets(state, context);
          const currentFacet = facet || current;
          state[context][currentFacet].queryParams.dynamicOrderBy = orderBy
            ? toArray(orderBy) || []
            : [];

          return;
        }
        default:
          return;
      }
    },
    initState
  );
};
