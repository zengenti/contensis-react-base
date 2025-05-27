import { areArraysEqualSets } from '../search/util';
import {
  getSelectedFilters,
  getIsLoaded,
  getQueryParams,
  getPageIndex,
  getIsInternalPaging,
  getSearchTerm,
  getPageSize,
} from './selectors';
import { Context } from '../models/Enums';
import mapStateToQueryParams from '../transformations/state-to-queryparams.mapper';
import { QueryParams, SearchQueryOptions } from '../models/Queries';
import { AppState } from '../models/SearchState';
import {
  EnsureSearchAction,
  SetSearchEntriesAction,
} from '../models/SearchActions';

/**
 * 1, Generates all the parameters required to run the search query.
 * 2, Tells us if we should run the search.
 * @param {object} action
 * @param {AppState} state
 * @returns [queryParams, runSearch]
 */
export const generateQueryParams = (
  action: EnsureSearchAction | SetSearchEntriesAction,
  state: AppState
): [SearchQueryOptions, boolean] => {
  const { context, facet } = action;
  // Map parameters using state and some additional
  // inputs from the action
  const queryParams = mapStateToQueryParams({
    context,
    facet,
    action,
    state,
  });

  return [queryParams, runSearch(action, state, queryParams)];
};

/**
 * Checks if we have already loaded everything we're asking for and tells us to run the search or not
 * @param action
 * @param state
 */
export const runSearch = (
  action: EnsureSearchAction | SetSearchEntriesAction,
  state: AppState,
  queryParams: SearchQueryOptions
) => {
  const {
    context,
    defaultLang,
    facet,
    ogState = state,
    preload,
    ssr,
  } = action as EnsureSearchAction & SetSearchEntriesAction;

  let willRun = false;

  const facetIsLoaded = defaultLang
    ? false
    : getIsLoaded(state, context, facet);
  const stateParams = {
    ...getQueryParams(ogState, facet, context),
  } as QueryParams;
  stateParams.pageIndex = getPageIndex(ogState, facet, context);
  stateParams.searchTerm = getSearchTerm(ogState);
  stateParams.pageSize = getPageSize(ogState, facet, context);

  if (
    (context === Context.facets && ssr) ||
    // context === Context.minilist ||
    preload ||
    !facetIsLoaded ||
    filterParamsChanged(action) ||
    defaultLang
  ) {
    willRun = true;
  } else {
    // Don't execute the search if the inbound query params
    // are the same as what we already have in state
    Object.entries(stateParams).forEach(([param, value]) => {
      const queryParam = queryParams[param as keyof SearchQueryOptions];
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
export const filterParamsChanged = (
  action: EnsureSearchAction | SetSearchEntriesAction,
  state?: AppState
) => {
  const {
    context,
    facet,
    params,
    ogState = state,
  } = action as EnsureSearchAction & SetSearchEntriesAction;
  const selectedFilters = getSelectedFilters(
    ogState as AppState,
    facet,
    context,
    'js'
  ) as { [key: string]: string[] };

  const paramsChanged = Object.entries(selectedFilters).map(
    ([filterKey, selectedValues]) => {
      const inboundValues =
        (params && params[filterKey] && params[filterKey].split(',')) || [];

      if (!areArraysEqualSets(selectedValues, inboundValues)) return true;
    }
  );

  return paramsChanged.filter(f => f === true).length > 0;
};

/* eslint-disable no-console */
export const debugExecuteSearch = (
  action: EnsureSearchAction | SetSearchEntriesAction,
  state: AppState
) => {
  const [queryParams, runSearch] = generateQueryParams(action, state);

  console.log(
    'runSearch',
    runSearch,
    'action',
    action,
    'filterParamsChanged',
    filterParamsChanged(action, state),
    'getIsLoaded(state, context, facet)',
    getIsLoaded(state, action.context, action.facet)
  );
  const stateParams = {
    ...getQueryParams(action.ogState || state, action.facet, action.context),
    pageIndex: getPageIndex(
      action.ogState || state,
      action.facet,
      action.context
    ),
    searchTerm: getSearchTerm(action.ogState || state),
  } as QueryParams;
  console.log(stateParams, queryParams);

  console.log(
    'getSelectedFilters',
    getSelectedFilters(
      action.ogState || state,
      action.facet,
      action.context,
      'js'
    ),
    'params',
    action.params
  );
};

export const scrollTo = (scrollToElement: string) => {
  if (typeof window !== 'undefined') {
    if (typeof scrollToElement === 'number')
      // Used to be Y coordinate, deprecated, because it's not accessible
      console.warn('updatePageIndex arg2 needs string');
    else if (typeof scrollToElement === 'string') {
      /* Effectively simulates an anchor link. Needed for accessibility, as window.scrollTo
         does not change focus, only scrolls the screen */
      window.location.href = `${location.pathname}${location.search}#${scrollToElement}`;
    }
  }
};
