import {
  CLEAR_FILTERS,
  SET_ROUTE_FILTERS,
  UPDATE_PAGE_INDEX,
  UPDATE_SELECTED_FILTERS,
  UPDATE_CURRENT_FACET,
  UPDATE_SEARCH_TERM,
} from './types';

export const initListing = (config, filteredRoute) => {
  return {
    type: SET_ROUTE_FILTERS,
    ...config,
    filteredRoute,
  };
};

export const updateSelectedFilters = (filter, key) => {
  return {
    type: UPDATE_SELECTED_FILTERS,
    filter,
    key,
  };
};

export const clearFilters = () => {
  return {
    type: CLEAR_FILTERS,
  };
};

export const updatePageIndex = pageIndex => {
  return {
    type: UPDATE_PAGE_INDEX,
    pageIndex,
  };
};

export const updateCurrentFacet = facet => {
  return {
    type: UPDATE_CURRENT_FACET,
    facet,
  };
};

export const updateSearchTerm = term => {
  return {
    type: UPDATE_SEARCH_TERM,
    term,
  };
};
