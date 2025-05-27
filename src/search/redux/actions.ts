import {
  CLEAR_FILTERS,
  SET_ROUTE_FILTERS,
  UPDATE_PAGE_INDEX,
  UPDATE_SELECTED_FILTERS,
  UPDATE_CURRENT_FACET,
  UPDATE_CURRENT_TAB,
  UPDATE_SEARCH_TERM,
  UPDATE_SORT_ORDER,
  DO_SEARCH,
  UPDATE_PAGE_SIZE,
} from './types';
import { Mappers } from '../models/Search';
import {
  ClearFiltersActionCreator,
  InitListingActionCreator,
  TriggerSearchActionCreator,
} from '../models/SearchActions';

export const withMappers = <T>(action: T, mappers: Mappers) => {
  return { ...action, mappers };
};

export const triggerSearch: TriggerSearchActionCreator = ({
  config,
  context,
  debug,
  defaultLang,
  excludeIds,
  facet,
  mapper,
  mappers,
  params,
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
    mappers,
    params,
  };
};

export const initListing: InitListingActionCreator = ({
  context,
  facet,
  mapper,
  params,
}) => {
  return {
    type: SET_ROUTE_FILTERS,
    context,
    facet,
    mapper,
    params,
  };
};

export const navigate = (path: string, state?: any) => {
  return {
    type: '@ROUTING/_SET_ROUTE',
    path,
    state,
  };
};

export const clearFilters: ClearFiltersActionCreator = filterKey => {
  return {
    type: CLEAR_FILTERS,
    filterKey,
  };
};

export const updatePageIndex = (
  pageIndex: number,
  scrollToElement?: string
) => {
  return {
    type: UPDATE_PAGE_INDEX,
    pageIndex,
    scrollToElement,
  };
};

export const updatePageSize = (pageSize: number, scrollToElement?: string) => {
  return {
    type: UPDATE_PAGE_SIZE,
    pageSize,
    scrollToElement,
  };
};

export const updateCurrentFacet = (facet: string) => {
  return {
    type: UPDATE_CURRENT_FACET,
    facet,
  };
};

export const updateCurrentTab = (id: number) => {
  return {
    type: UPDATE_CURRENT_TAB,
    id,
  };
};

export const updateSearchTerm = (term: string) => {
  return {
    type: UPDATE_SEARCH_TERM,
    term,
  };
};

export const updateSelectedFilters = (
  filter: string,
  key: string,
  isUnknownItem = false,
  scrollToElement?: string
) => {
  return {
    type: UPDATE_SELECTED_FILTERS,
    filter,
    key,
    isUnknownItem,
    scrollToElement,
  };
};

export const updateSortOrder = (orderBy: string, facet?: string) => {
  return {
    type: UPDATE_SORT_ORDER,
    orderBy,
    facet,
  };
};
