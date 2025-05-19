import { Context } from '../models/Enums';
import { QueryParams as QueryParams2 } from '../models/Queries';
import { CustomApi, SearchQueryParams } from '../models/Search';
import {
  AppState,
  Facet,
  Facets,
  Filters,
  Paging,
  SelectedFilters,
  Tab,
  TabAndFacets,
} from '../models/SearchState';
import getIn, { makeFromJS } from './getIn';

type StateType = 'immutable' | 'js';

export const getSearchContext = (state: AppState): Context =>
  getIn(state, ['search', 'context'], Context.facets);

export const getCurrent = (state: AppState, context = Context.facets) =>
  context === Context.facets
    ? getCurrentFacet(state)
    : getCurrentListing(state);

export const getCurrentFacet = (state: AppState): string =>
  getIn(state, ['search', 'currentFacet']);

export const getCurrentListing = (state: AppState): string =>
  getIn(state, ['search', 'currentListing']);

export const getCurrentTab = (state: AppState): number =>
  getIn(state, ['search', Context.facets, getCurrentFacet(state), 'tabId'], 0);

export const getFacets = (state: AppState, returnType?: StateType): Facets =>
  getIn(state, ['search', Context.facets], {}, returnType);

export const getTabFacets = (state: AppState) =>
  Object.fromEntries(
    Object.entries(getFacets(state, 'js')).filter(
      ([key]) =>
        getIn(getFacets(state), [key, 'tabId'], 0) === getCurrentTab(state)
    )
  );

export const getFacetTitles = (state: AppState) =>
  Object.entries(getFacets(state, 'js')).map(([key, facet = {}]) => ({
    isSelected: getCurrentFacet(state) === key,
    key,
    title: facet.title as string | undefined,
    totalCount: facet.pagingInfo?.totalCount as number,
  }));

export const getFacet = (
  state: AppState,
  facetName = '',
  context: Context | string = Context.facets,
  returnType?: StateType
) => {
  const currentFacet = facetName || getCurrentFacet(state);
  return getIn(
    state,
    ['search', context, currentFacet],
    {},
    returnType
  ) as Facet;
};

export const getListing = (state: AppState, listing = '') => {
  const currentListing = listing || getCurrentListing(state);
  return getIn(
    state,
    ['search', Context.listings, currentListing],
    {}
  ) as Facet;
};

export const getFilters = (
  state: AppState,
  facet: string,
  context = Context.facets,
  returnType?: StateType
): Filters => {
  return getIn(
    state,
    ['search', context, facet || getCurrent(state, context), 'filters'],
    {},
    returnType
  );
};

export const getRenderableFilters = (
  state: AppState,
  facet = '',
  context = Context.facets
): Filters =>
  Object.fromEntries(
    Object.entries(getFilters(state, facet, context, 'js')).filter(
      ([, f = {}]) => (typeof f.renderable !== 'boolean' ? true : f.renderable)
    )
  );

export const getFiltersToLoad = (
  state: AppState,
  facet: string,
  context = Context.facets,
  returnType?: StateType
) => {
  const filters = getFilters(state, facet, context, returnType);
  const loadedFilters = Object.entries(filters).map(([key, f = {}]) => [
    key,
    (f.items || []).filter(i => {
      const title = i?.title;
      return typeof title !== 'undefined' && !!title;
    }).length > 0 && (f.isError || false) === false,
  ]);
  return loadedFilters
    .map(([filterKey, isLoaded]) => (!isLoaded ? filterKey : null))
    .filter(f => !!f) as string[];
};

// We lowercase the filter key unless it's an ISO date string where the T must be uppercase
export const getSelectedFilters = (
  state: AppState,
  facet = '',
  context = Context.facets,
  returnType?: StateType
): SelectedFilters => {
  const filters = getFilters(state, facet, context, 'js');

  const selectedFilters = Object.fromEntries(
    Object.entries(filters).map(([key, filter = {}]) => [
      key,
      (filter.items || [])
        .filter(item => !!(item.isSelected || false))
        .map(item => {
          const key = item?.key || '';
          return key;
        }),
    ])
  );
  const fromJS = makeFromJS(returnType);
  return fromJS(selectedFilters);
};

export const getResults = (
  state: AppState,
  current = '',
  context = Context.facets,
  returnType?: StateType
) => {
  return getIn(
    state,
    ['search', context, current || getCurrent(state, context), 'results'],
    [],
    returnType
  ) as any[];
};

export const getIsInternalPaging = (
  state: AppState,
  current: string,
  context = Context.facets
): boolean => {
  return getIn(
    state,
    [
      'search',
      context,
      current || getCurrent(state, context),
      'queryParams',
      'internalPaging',
    ],
    false
  );
};

export const getIsLoaded = (
  state: AppState,
  context = Context.facets,
  facet?: string
) => {
  return !!getIn(
    state,
    ['search', context, facet || getCurrent(state, context), 'queryDuration'],
    0
  );
};

export const getIsLoading = (
  state: AppState,
  context = Context.facets,
  facet?: string
): boolean => {
  return getIn(state, [
    'search',
    context,
    facet || getCurrent(state, context),
    'entries',
    'isLoading',
  ]);
};

export const getIsSsr = (state: AppState): boolean =>
  getIn(state, ['search', 'config', 'ssr'], false);

export const getFeaturedResults = (
  state: AppState,
  current = '',
  context = Context.facets,
  returnType?: StateType
) => {
  return getIn(
    state,
    [
      'search',
      context,
      current || getCurrent(state, context),
      'featuredResults',
    ],
    [],
    returnType
  ) as any[];
};

export const getPaging = (
  state: AppState,
  current = '',
  context = Context.facets,
  returnType?: StateType
): Paging => {
  return getIn(
    state,
    ['search', context, current || getCurrent(state, context), 'pagingInfo'],
    {},
    returnType
  );
};

export const getPageIndex = (
  state: AppState,
  current = '',
  context = Context.facets
): number => {
  return getIn(state, [
    'search',
    context,
    current || getCurrent(state, context),
    'pagingInfo',
    'pageIndex',
  ]);
};

export const getPageSize = (
  state: AppState,
  current = '',
  context = Context.facets
): number => {
  return getIn(
    state,
    [
      'search',
      context,
      current || getCurrent(state, context),
      'pagingInfo',
      'pageSize',
    ],
    0 // Defaults to 0 because we want it to fall back to a query param if not defined
  );
};

export const getPrevPageIndex = (
  state: AppState,
  current = '',
  context = Context.facets
): number => {
  return getIn(state, [
    'search',
    context,
    current || getCurrent(state, context),
    'pagingInfo',
    'prevPageIndex',
  ]);
};
export const getPageIsLoading = (
  state: AppState,
  current = '',
  context = Context.facets
): boolean => {
  return getIn(state, [
    'search',
    context,
    current || getCurrent(state, context),
    'pagingInfo',
    'isLoading',
  ]);
};

export const getPagesLoaded = (
  state: AppState,
  current = '',
  context = Context.facets
): number[] => {
  return getIn(
    state,
    [
      'search',
      context,
      current || getCurrent(state, context),
      'pagingInfo',
      'pagesLoaded',
    ],
    [],
    'js'
  );
};

export const getTotalCount = (
  state: AppState,
  current = '',
  context = Context.facets
): number => {
  return getIn(state, [
    'search',
    context,
    current || getCurrent(state, context),
    'pagingInfo',
    'totalCount',
  ]);
};

export const getSearchTerm = (state: AppState): string =>
  getIn(state, ['search', 'term']);

export const getSearchTabs = (state: AppState, returnType?: StateType): Tab[] =>
  getIn(state, ['search', 'tabs'], [], returnType);

export const getQueryParams = (
  state: AppState,
  current = '',
  context = Context.facets
) => {
  return getIn(
    state,
    ['search', context, current || getCurrent(state, context), 'queryParams'],
    {},
    'js'
  ) as Record<string, any>;
};

export const getQueryParameter = <
  K extends keyof SearchQueryParams,
  K2 extends keyof QueryParams2,
>(
  {
    state,
    facet,
    context = Context.facets,
  }: { state: AppState; facet?: string; context?: Context },
  key: K | K2,
  ifnull: any = null
): SearchQueryParams[K] | QueryParams2[K2] => {
  return getIn(getQueryParams(state, facet, context), key, ifnull, 'js');
};

export const getCustomApi = (
  state: AppState,
  current: string,
  context = Context.facets,
  returnType?: StateType
): CustomApi => {
  return getIn(
    state,
    ['search', context, current || getCurrent(state, context), 'customApi'],
    null,
    returnType
  );
};

export const getCustomEnv = (
  state: AppState,
  current: string,
  context = Context.facets
) => {
  return getIn(state, [
    'search',
    context,
    current || getCurrent(state, context),
    'env',
  ]);
};

export const getTabsAndFacets = (state: AppState, returnType?: StateType) => {
  const tabs = getSearchTabs(state, 'js');
  const facets = getFacets(state, 'js');

  const tabsAndFacets = (tabs || []).map((tab = {} as Tab) => {
    const fieldsToCount = tab.totalCount;
    let countFields: string[][];

    if (typeof fieldsToCount === 'string') countFields = [[fieldsToCount]];

    const thisTabFacets = Object.entries(facets).filter(
      ([key]) => getIn(facets, [key, 'tabId'], 0) === tab.id
    ) as [string, Facet][];

    const thisTabTotal = thisTabFacets
      .map(([facetName, facet = {}]) => {
        if (!countFields || countFields.find((f = []) => f?.[0] === facetName))
          return getIn(facet, ['pagingInfo', 'totalCount']);
        return 0;
      })
      .reduce((a, b) => a + b, 0);

    return {
      ...tab,
      [Context.facets]: Object.fromEntries(thisTabFacets),
      totalCount: thisTabTotal,
    } as TabAndFacets;
  });

  const fromJS = makeFromJS(returnType);
  return fromJS(tabsAndFacets);
};

export const getSearchTotalCount = (state: AppState): number => {
  const tabsAndFacets = getTabsAndFacets(state, 'js');
  const wholeSearchTotal = tabsAndFacets
    .map((t = {} as TabAndFacets) => t.totalCount)
    .reduce((a: number, b: number) => a + b, 0);
  return wholeSearchTotal;
};

export const getFacetsTotalCount = (state: AppState) => {
  const facets = getFacets(state);
  const wholeSearchTotal = Object.entries(facets)
    .map(([, t = {}]) => t.pagingInfo?.totalCount || 0)
    .reduce((a, b) => a + b, 0);
  return wholeSearchTotal;
};

// An exported copy of the relevant selectors scoped by default to a facets context
export const selectFacets = {
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
  getQueryParams: (state: AppState, facet: string) =>
    getQueryParams(state, facet, Context.facets),
  getQueryParameter: (
    { state, facet }: { state: AppState; facet?: string },
    key: keyof SearchQueryParams | keyof QueryParams2,
    ifnull: any
  ) =>
    getQueryParameter({ state, facet, context: Context.facets }, key, ifnull),
  getRenderableFilters,
  getResults,
  getTabFacets,
  getTabsAndFacets,
  getTotalCount,
  getSearchTabs,
  getSearchTerm,
  getSearchTotalCount,
  getSelectedFilters,
};

// An exported copy of the relevant selectors pre-scoped to a listing context
export const selectListing = {
  getCurrent: getCurrentListing,
  getFeaturedResults: (state: AppState, listing = '') =>
    getFeaturedResults(state, listing, Context.listings, 'js'),
  getFilters: (state: AppState, listing = '') =>
    getFilters(state, listing, Context.listings, 'js'),
  getFiltersToLoad: (state: AppState, listing = '') =>
    getFiltersToLoad(state, listing, Context.listings),
  getListing,
  getIsLoaded: (state: AppState) => getIsLoaded(state, Context.listings),
  getIsLoading: (state: AppState) => getIsLoading(state, Context.listings),
  getPageIndex: (state: AppState, listing = '') =>
    getPageIndex(state, listing, Context.listings),
  getPaging: (state: AppState, listing = '') =>
    getPaging(state, listing, Context.listings, 'js'),
  getPageIsLoading: (state: AppState, listing = '') =>
    getPageIsLoading(state, listing, Context.listings),
  getPagesLoaded: (state: AppState, listing = '') =>
    getPagesLoaded(state, listing, Context.listings),
  getQueryParams: (state: AppState, listing = '') =>
    getQueryParams(state, listing, Context.listings),
  getQueryParameter: (
    { state, facet }: { state: AppState; facet?: string },
    key: keyof SearchQueryParams | keyof QueryParams2,
    ifnull: any
  ) =>
    getQueryParameter({ state, facet, context: Context.listings }, key, ifnull),
  getRenderableFilters: (state: AppState, listing = '') =>
    getRenderableFilters(state, listing, Context.listings),
  getResults: (state: AppState, listing = '') =>
    getResults(state, listing, Context.listings, 'js'),
  getSearchTerm,
  getTotalCount: (state: AppState, listing = '') =>
    getTotalCount(state, listing, Context.listings),
  getSelectedFilters: (state: AppState, listing = '') =>
    getSelectedFilters(state, listing, Context.listings, 'js'),
};

export const selectCurrentPath = (state: AppState) =>
  getIn(state, ['routing', 'currentPath']);

export const selectCurrentProject = (state: AppState) =>
  getIn(state, ['routing', 'currentProject']);

export const selectVersionStatus = (state: AppState) =>
  getIn(state, ['version', 'contensisVersionStatus']);
