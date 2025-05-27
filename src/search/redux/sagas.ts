import * as log from 'loglevel';
import { takeEvery, put, select, call, all } from 'redux-saga/effects';
import { PagedList, Query, VersionStatus } from 'contensis-core-api/lib/models';
import { Entry, TaxonomyNode } from 'contensis-delivery-api/lib/models';

import { cachedSearch } from '../search/ContensisDeliveryApi';
import { callCustomApi, timedSearch, getItemsFromResult } from '../search/util';

import {
  CLEAR_FILTERS,
  DO_SEARCH,
  EXECUTE_SEARCH,
  EXECUTE_SEARCH_PRELOAD,
  LOAD_FILTERS,
  LOAD_FILTERS_COMPLETE,
  LOAD_FILTERS_ERROR,
  SET_ROUTE_FILTERS,
  SET_SEARCH_ENTRIES,
  UPDATE_SEARCH_TERM,
  UPDATE_PAGE_INDEX,
  UPDATE_CURRENT_FACET,
  UPDATE_SELECTED_FILTERS,
  UPDATE_CURRENT_TAB,
  UPDATE_SORT_ORDER,
  SET_SEARCH_FILTERS,
  APPLY_CONFIG,
  UPDATE_PAGE_SIZE,
} from './types';
import {
  navigate,
  updateCurrentFacet as updateCurrentFacetAction,
  withMappers,
} from './actions';
import {
  getCurrentFacet,
  getPageIndex,
  getFacets,
  getSearchTabs,
  getCustomApi,
  getSelectedFilters,
  getFacet,
  getIsSsr,
  getFiltersToLoad,
  getResults,
  selectVersionStatus,
} from './selectors';
import { searchQuery, filterQuery } from '../search/queries';
import mapStateToSearchUri from '../transformations/state-to-searchuri';
import mapSearchResultToState, {
  facetTemplate,
  filterTemplate,
} from '../transformations/searchresult-to-state.mapper';
import { generateQueryParams, debugExecuteSearch, scrollTo } from './util';
import mapEntriesToFilterItems from '../transformations/entry-to-filteritem.mapper';
import { AppState, Facet, Filter } from '../models/SearchState';
import {
  ApplySearchFilterAction,
  ClearFiltersAction,
  EnsureSearchAction,
  ExecuteSearchAction,
  InitListingAction,
  LoadFiltersCompleteAction,
  LoadFiltersSearchResults,
  SearchResults,
  SetRouteFiltersOptions,
  SetSearchEntriesAction,
  SetSearchEntriesParams,
  TriggerSearchAction,
  TriggerSearchParams,
  UpdateCurrentFacetAction,
  UpdateCurrentTabAction,
  UpdatePageIndexAction,
  UpdatePageSizeAction,
  UpdateSearchTermAction,
  UpdateSortOrderAction,
  WithMappers,
} from '../models/SearchActions';
import { Mappers } from '../models/Search';
import { Context } from '../models/Enums';
import { TimedSearchResponse } from '../models/SearchUtil';
import mapQueryParamsToCustomApi from '../transformations/queryParams-to-customapi.mapper';

export const searchSagas = [
  takeEvery(CLEAR_FILTERS, clearFilters),
  takeEvery(DO_SEARCH, doSearch),
  takeEvery(SET_ROUTE_FILTERS, loadFilters),
  takeEvery(SET_SEARCH_ENTRIES, preloadOtherFacets),
  takeEvery(UPDATE_CURRENT_FACET, updateCurrentFacet),
  takeEvery(UPDATE_CURRENT_TAB, updateCurrentTab),
  takeEvery(UPDATE_PAGE_INDEX, updatePageIndex),
  takeEvery(UPDATE_PAGE_SIZE, updatePageSize),
  takeEvery(UPDATE_SEARCH_TERM, updateSearchTerm),
  takeEvery(UPDATE_SORT_ORDER, updateSortOrder),
  takeEvery(UPDATE_SELECTED_FILTERS, applySearchFilter),
];

const toJS = (obj: any) =>
  obj && 'toJS' in obj && typeof obj.toJS === 'function' ? obj.toJS() : obj;

export function* setRouteFilters(
  action: InitListingAction | SetRouteFiltersOptions
) {
  const { mappers, params, listingType, defaultLang, debug } = action;
  const context = listingType ? Context.listings : Context.facets;
  const state: AppState = toJS(yield select());
  const ssr = getIsSsr(state);

  // Get current facet from params or state
  let currentFacet = (params && params.facet) || listingType;

  // If Listing use listing type (ignore params.facet)
  if (context === Context.listings) {
    currentFacet = listingType;
  }

  // Pick the default facet from initialState
  if (!currentFacet) {
    const tabs = getSearchTabs(state, 'js');
    currentFacet =
      tabs?.[0].defaultFacet || Object.keys(getFacets(state, 'js'))?.[0] || '';
  }

  const nextAction = {
    type: SET_ROUTE_FILTERS,
    context,
    facet: currentFacet,
    mappers,
    params,
    defaultLang,
    ssr,
    debug,
  } as InitListingAction;
  yield put(nextAction);

  // keep track of this state ref for comparing changes to params later
  const ogState = { search: state.search };

  // Using call instead of triggering from the put
  // to allow this exported saga to continue during SSR
  yield call(ensureSearch, { ...nextAction, ogState });
}

export function* doSearch(action: TriggerSearchAction) {
  const state: AppState = toJS(yield select());
  if (action.config) {
    // If the action contains a config object, we can add this to the
    // state at runtime
    yield put({ ...action, type: APPLY_CONFIG });
  }

  const nextAction = {
    ...action,
    type: SET_SEARCH_FILTERS,
    ssr: getIsSsr(state),
    facet: action.facet || action.params?.facet,
  } as InitListingAction;

  if (
    nextAction.facet &&
    (action.config ||
      Object.keys(getFacet(state, nextAction.facet, action.context, 'js'))
        .length > 0)
  ) {
    yield put(nextAction);

    // keep track of this state ref for comparing changes to params later
    const ogState = { search: state.search };

    yield call(ensureSearch, { ...nextAction, ogState });
  }
}

function* loadFilters(action: InitListingAction) {
  const { facet: facetKey, context, mappers = {} as Mappers } = action;
  const filtersToLoad = (yield select(
    getFiltersToLoad,
    facetKey,
    context,
    'js'
  )) as string[];
  if (filtersToLoad.length > 0) {
    yield put({
      type: LOAD_FILTERS,
      filtersToLoad,
      facetKey,
      context,
    });
    const selectedKeys = (yield select(
      getSelectedFilters,
      facetKey,
      context,
      'js'
    )) as {
      [k: string]: string[];
    };
    const facet = (yield select(getFacet, facetKey, context, 'js')) as Facet;
    const filters = facet.filters || {};
    const projectId = facet.projectId;

    const filtersToLoadSagas =
      filters &&
      filtersToLoad.map((filterKey = '') => {
        return call(loadFilter, {
          facetKey,
          filterKey,
          filter: filters[filterKey],
          projectId,
          selectedKeys: selectedKeys[filterKey],
          context,
          mapper:
            ('filterItems' in mappers && mappers.filterItems) ||
            mapEntriesToFilterItems,
        } as LoadFilterAction);
      });
    if (filtersToLoadSagas) yield all(filtersToLoadSagas);
  }
}

type LoadFilterAction = {
  facetKey: string;
  filterKey: string;
  filter: Filter;
  projectId: string;
  selectedKeys: string[];
  context: Context;
  mapper: Mappers['filterItems'];
};

function* loadFilter(action: LoadFilterAction) {
  const {
    facetKey,
    filterKey,
    filter,
    projectId,
    selectedKeys,
    context,
    mapper,
  } = action;
  const { contentTypeId, customWhere, path } = filter as Filter;
  const createStateFrom = {
    type: LOAD_FILTERS_COMPLETE,
    context,
    error: undefined,
    facetKey,
    filterKey,
    payload: {} as TaxonomyNode | PagedList<Entry>,
    selectedKeys,
    mapper,
  } as LoadFiltersSearchResults;

  try {
    if (contentTypeId) {
      const versionStatus = (yield select(
        selectVersionStatus
      )) as VersionStatus;
      const query = filterQuery(
        Array.isArray(contentTypeId) ? contentTypeId : [contentTypeId],
        versionStatus,
        customWhere
      );
      const payload = (yield cachedSearch.search(
        query,
        0,
        projectId
      )) as PagedList<Entry>;

      if (!payload) throw new Error('No payload returned by search');
      if ((payload as any).type === 'error') throw payload;

      createStateFrom.payload = payload;
    }
    if (path) {
      const payload = (yield cachedSearch.getTaxonomyNodeByPath(
        path,
        projectId
      )) as TaxonomyNode;

      if (!payload)
        throw new Error(`No payload returned for taxonomy path: '${path}'`);
      if ((payload as any).type === 'error') throw payload;

      createStateFrom.payload = payload;
    }
  } catch (error) {
    createStateFrom.type = LOAD_FILTERS_ERROR;
    createStateFrom.error = error;
  }
  createStateFrom.facet = (yield select(
    getFacet,
    facetKey,
    context,
    'js'
  )) as Facet;

  const nextAction = mapSearchResultToState<
    LoadFiltersSearchResults,
    LoadFiltersCompleteAction
  >(createStateFrom, filterTemplate);
  yield put(nextAction);
}

function* ensureSearch(action: EnsureSearchAction) {
  const { context, facet, debug } = action;
  try {
    const state = (yield select()) as AppState;
    const nextAction = {
      ...action,
      ogState: action.ogState || { search: state.search },
    };

    const [queryParams, runSearch] = generateQueryParams(nextAction, state);

    if (debug && (debug === true || debug.executeSearch))
      debugExecuteSearch(nextAction, state);

    if (runSearch) {
      yield put({ type: EXECUTE_SEARCH, facet, context });
      yield call(executeSearch, {
        ...nextAction,
        context,
        facet,
        queryParams,
        debug,
      } as ExecuteSearchAction);
    }
  } catch (error: any) {
    log.error(...['Error running search saga:', error, error.stack]);
  }
}

function* executeSearch(action: ExecuteSearchAction) {
  const { context, facet, queryParams, mappers } = action;
  try {
    const state = (yield select()) as AppState;
    let result = {} as TimedSearchResponse;
    let featuredResult: TimedSearchResponse | undefined;
    let featuredQuery: Query;
    const customApi = getCustomApi(state, facet, context, 'js');

    if (customApi) {
      const apiParams =
        (typeof mappers === 'object' &&
          typeof mappers.customApi === 'function' &&
          mappers.customApi(queryParams)) ||
        (mapQueryParamsToCustomApi(queryParams) as { [key: string]: string });

      result.payload = (yield callCustomApi<any>(
        customApi,
        apiParams
      )) as any[];
      result.duration = 1;
    } else {
      if (queryParams.featuredResults) {
        featuredQuery = searchQuery(queryParams, true);
        featuredResult = (yield timedSearch(
          featuredQuery,
          queryParams.linkDepth,
          queryParams.projectId,
          queryParams.env
        )) as TimedSearchResponse;

        queryParams.excludeIds = getItemsFromResult(featuredResult)
          .map(fi => fi?.sys?.id)
          .filter(fi => typeof fi === 'string') as string[];
      }
      const query = searchQuery(queryParams);

      result = yield timedSearch(
        query,
        queryParams.linkDepth,
        queryParams.projectId,
        queryParams.env
      );
    }

    const createStateFrom: SearchResults = {
      action,
      featuredResult,
      pageIndex:
        (queryParams.internalPaging && queryParams.internalPageIndex) ||
        queryParams.pageIndex,
      prevResults: getResults(state, facet, action.context, 'js'),
      result,
      state: (yield select()) as AppState,
    };

    const nextAction = mapSearchResultToState<
      SearchResults,
      SetSearchEntriesParams
    >(createStateFrom, facetTemplate);
    yield put(nextAction);
  } catch (error: any) {
    log.error(...['Error running search saga:', error, error.stack]);
  }
}

function* preloadOtherFacets(action: SetSearchEntriesAction) {
  const { preload, context, facet, debug } = action;
  const state = (yield select()) as AppState;
  const currentFacet = getCurrentFacet(state);

  if (!preload && facet === currentFacet && context !== Context.listings) {
    const allFacets = getFacets(state, 'js');
    const otherFacets = Object.keys(allFacets).filter(f => f !== currentFacet);

    yield all(
      otherFacets.map((preloadFacet = '') => {
        const preloadAction = {
          ...action,
          facet: preloadFacet,
          preload: true,
        };
        const [queryParams, runSearch] = generateQueryParams(
          preloadAction,
          state
        );

        if (debug && (debug === true || debug.preloadOtherFacets))
          debugExecuteSearch(preloadAction, state);

        return (
          runSearch &&
          call(executeSearch, {
            ...action,
            type: EXECUTE_SEARCH_PRELOAD,
            preload: true,
            facet: preloadFacet,
            queryParams,
          } as ExecuteSearchAction & SetSearchEntriesParams)
        );
      })
    );
  }
}

function* updateCurrentTab(action: WithMappers<UpdateCurrentTabAction>) {
  const { id, mappers } = action;
  const state = (yield select()) as AppState;
  const facets = getFacets(state, 'js');
  const tabs = getSearchTabs(state, 'js');
  let nextFacet = tabs?.[id].currentFacet;
  if (!nextFacet) {
    Object.entries(facets).map(([facetName, facet]) => {
      if (facet.tabId === id && tabs?.[id].defaultFacet === facetName)
        nextFacet = facetName;
    });
  }
  // If the next Tab does not have a defaultFacet,
  // take the first facet for that tab
  if (!nextFacet)
    nextFacet = Object.entries(facets).filter(([, f]) => f.tabId === id)[0][0];

  yield put(withMappers(updateCurrentFacetAction(nextFacet), mappers));
}

function* clearFilters(action: WithMappers<ClearFiltersAction>) {
  const { mappers } = action;
  const uri = (yield buildUri({}, mappers)) as string;
  yield put(navigate(uri));
}

function* updateCurrentFacet(action: WithMappers<UpdateCurrentFacetAction>) {
  const { facet, mappers } = action;
  const pageIndex = (yield select(getPageIndex, facet)) as number;
  const uri = (yield buildUri({ facet, pageIndex }, mappers)) as string;
  yield put(navigate(uri));
}

function* updateSearchTerm(action: WithMappers<UpdateSearchTermAction>) {
  const { term, mappers } = action;
  const uri = (yield buildUri({ term }, mappers)) as string;
  yield put(navigate(uri));
}

function* updateSortOrder(action: WithMappers<UpdateSortOrderAction>) {
  const { orderBy, facet, mappers } = action;
  const uri = (yield buildUri({ orderBy, facet }, mappers)) as string;
  yield put(navigate(uri));
}

function* updatePageIndex(action: WithMappers<UpdatePageIndexAction>) {
  const { pageIndex, mappers, scrollToElement } = action;
  const uri = (yield buildUri({ pageIndex }, mappers)) as string;
  yield put(navigate(uri));
  if (typeof scrollToElement !== 'undefined') scrollTo(scrollToElement);
}

function* updatePageSize(action: WithMappers<UpdatePageSizeAction>) {
  const { pageSize, mappers, scrollToElement } = action;
  const uri = (yield buildUri({ pageSize }, mappers)) as string;
  yield put(navigate(uri));
  if (typeof scrollToElement !== 'undefined') scrollTo(scrollToElement);
}

function* applySearchFilter(action: WithMappers<ApplySearchFilterAction>) {
  const { mappers, scrollToElement } = action;
  const uri = (yield buildUri({}, mappers)) as string;
  yield put(navigate(uri));
  if (typeof scrollToElement !== 'undefined') scrollTo(scrollToElement);
}

function* buildUri(
  {
    facet,
    orderBy,
    pageIndex = 0,
    pageSize,
    term,
  }: {
    facet?: string;
    orderBy?: string;
    pageIndex?: number;
    pageSize?: number;
    term?: string;
  },
  mappers: Mappers
) {
  const state = (yield select()) as AppState;
  const mapUri = mappers?.navigate || mapStateToSearchUri;
  const uri = mapUri({ state, facet, orderBy, pageIndex, pageSize, term });
  // return uri;
  return `${uri.path}${(uri.search && `?${uri.search}`) || ''}${
    (uri.hash && `#${uri.hash}`) || ''
  }`;
}

export function* triggerMinilistSsr(options: TriggerSearchParams) {
  yield call(doSearch, { type: DO_SEARCH, ...options });
}
export function* triggerListingSsr(
  options: SetRouteFiltersOptions & { listingType: string }
) {
  yield call(setRouteFilters, options);
}
export function* triggerSearchSsr(options: SetRouteFiltersOptions) {
  yield call(setRouteFilters, options);
}
