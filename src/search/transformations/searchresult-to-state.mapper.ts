import {
  default as mapSearchResultToState,
  MappingTemplate,
} from 'jsonpath-mapper';
import cloneDeep from 'lodash/cloneDeep';

import { Context } from '../models/Enums';
import { QueryParams } from '../models/Queries';
import { Mappers } from '../models/Search';
import {
  LoadFiltersSearchResults,
  SearchResults,
} from '../models/SearchActions';
import { AppState, Filters } from '../models/SearchState';
import { getFilters } from '../redux/selectors';
import {
  SET_SEARCH_ENTRIES,
  LOAD_FILTERS_COMPLETE,
  LOAD_FILTERS_ERROR,
} from '../redux/types';
import { convertKeyForAggregation, getItemsFromResult } from '../search/util';

const mapEntriesToSearchResults = (
  {
    mappers,
    mapper,
    context,
    facet,
  }: {
    mappers?: Mappers;
    mapper?: Mappers['results'];
    context: Context;
    facet: string;
  },
  items: any[],
  state: AppState
) => {
  const mapperFunc = mapper || (mappers && mappers.results);
  return items && typeof mapperFunc === 'function'
    ? mapperFunc(items, facet, context, state)
    : [];
};

export const facetTemplate = {
  type: () => SET_SEARCH_ENTRIES,
  context: 'action.context',
  facet: 'action.facet',
  mappers: 'action.mappers',
  nextFacet: {
    aggregations: 'result.payload.aggregations',
    entries: {
      isLoading: () => false,
      isError: () => false,
    },
    featuredEntries: {
      isLoading: () => false,
      isError: () => false,
    },
    featuredResults: ({ action, featuredResult, state }: SearchResults) =>
      mapEntriesToSearchResults(
        action,
        getItemsFromResult(featuredResult),
        state
      ),
    filters: ({ result, state, action }: SearchResults) => {
      const aggregations =
        'aggregations' in result.payload
          ? result.payload.aggregations
          : undefined;
      if (!aggregations) return {};

      // Handle aggregations client-side where the filter items have loaded before the results containing the aggregations
      const filters = cloneDeep(
        getFilters(state, action.facet, action.context, 'js')
      ) as Filters;
      for (const [filterKey, filter] of Object.entries(filters)) {
        const aggregation = aggregations[convertKeyForAggregation(filterKey)];

        for (const filterItem of filter.items || []) {
          if (!aggregation) delete filterItem.aggregate;
          else {
            const aggregate = aggregation[filterItem.key.toLowerCase()];
            if (typeof aggregate === 'number') filterItem.aggregate = aggregate;
            else delete filterItem.aggregate;
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
        $default: 0,
      },
      totalCount: {
        $path: 'result.payload.totalCount',
        $default: 0,
      },
      pageSize: {
        $path: 'result.payload.pageSize',
        $default: 0,
      },
      pageIndex: 'pageIndex',
      pagesLoaded: {
        $path: 'action.queryParams',
        $formatting: ({ pageIndex, pagesLoaded }: QueryParams) => {
          const loaded = [...(pagesLoaded || [])];
          if (isNaN(loaded.find(l => l === pageIndex) as any)) {
            loaded.push(pageIndex);
          }
          return loaded.sort((a, b) => a - b);
        },
      },
      prevPageIndex: 'action.queryParams.prevPageIndex',
    },
    preloaded: { $path: 'preload', $default: false },
    results: ({
      action,
      pageIndex,
      result,
      prevResults,
      state,
    }: SearchResults) => {
      const { loadMorePaging, pagesLoaded, prevPageIndex } = action.queryParams;

      const results = mapEntriesToSearchResults(
        action,
        getItemsFromResult(result),
        state
      );

      if (!loadMorePaging) return results;

      // add a _pageIndex property to the returned results to help us later
      const nextResults = results.map((r, idx) => ({
        _pageIndex: pageIndex,
        _pagePosition: idx,
        ...r,
      }));

      const loadedPages = pagesLoaded || [];

      // if pageIndex is found in loadedPages, we have already loaded this page
      if (!isNaN(loadedPages.find(l => l === pageIndex) as any))
        return prevResults;

      // Determine where we put the results depending on if we
      // are paging forwards, backwards, or doing a new search
      const firstResultSet = (
        pageIndex > prevPageIndex ? prevResults || [] : nextResults
      ) as any[];
      const secondResultSet = (
        pageIndex > prevPageIndex ? nextResults : prevResults || []
      ) as any[];
      const onlyResultSet = loadedPages.length === 0 ? nextResults : false;
      return onlyResultSet || [...firstResultSet, ...secondResultSet];
    },
  },
  preload: 'action.preload',
  ogState: 'action.ogState',
  debug: 'action.debug',
} as any;

export const filterTemplate = {
  type: ({ type }) => type || LOAD_FILTERS_COMPLETE,
  context: 'context',
  facetKey: 'facetKey',
  filterKey: 'filterKey',
  nextFilter: {
    isLoading: () => false,
    isError: ({ type }) => type === LOAD_FILTERS_ERROR,
    items: ({
      payload,
      selectedKeys,
      mapper,
      facet,
      filterKey,
    }: LoadFiltersSearchResults) => {
      // Handle taxonomy filter items
      if (payload && 'children' in payload) {
        const items = payload.children?.map((item: any) => {
          item.isSelected = selectedKeys?.includes(item.key);
          return item;
        });
        return mapper?.(items || []) || [];
      }

      // Handle entries-based filter items
      if (payload && 'items' in payload) {
        // Handle aggregations from SSR where the results containing the aggregations have loaded before the filter items
        const aggregation =
          facet.aggregations?.[convertKeyForAggregation(filterKey)];
        const items = payload.items.map((item: any) => {
          item.isSelected = selectedKeys?.includes(item?.sys?.id);
          const aggregate = aggregation?.[item?.sys?.id.toLowerCase()];
          if (typeof aggregate === 'number') item.aggregate = aggregate;
          return item;
        });
        return mapper?.(items);
      }
      return [];
    },
  },
  error: { $path: 'error', $disable: e => !e },
} as MappingTemplate<LoadFiltersSearchResults>;

export default mapSearchResultToState;
