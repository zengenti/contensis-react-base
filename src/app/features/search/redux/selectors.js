import { List } from 'immutable';

export const hasSearchConfig = state => {
  return state.getIn(['search', 'config', 'isLoaded']);
};

export const getCurrentFacet = state => state.getIn(['search', 'currentFacet']);

export const getFacets = state => state.getIn(['search', 'facets']);

export const getFacet = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn(['search', 'facets', currentFacet]);
};

export const getFilters = (state, facet) => {
  const currentFacet = facet || getCurrentFacet(state);
  return state.getIn(['search', 'facets', currentFacet, 'filters']);
};

export const getSelectedFilters = (state, facet) => {
  const filters = getFilters(state, facet);
  return filters.map(value =>
    value
      .get('items', new List([]))
      .filter(item => item.get('isSelected', false))
      .map(item => item.get('title', '').toLowerCase())
      .join(',')
  );
};

export const getFilteredRoute = state =>
  state.getIn(['search', 'filteredRoute']);

export const getListingResults = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn(['search', 'facets', currentFacet, 'entries']);
};

export const getFeaturedResults = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn([
    'search',
    'facets',
    currentFacet,
    'featuredEntries',
    'items',
  ]);
};

export const getPaging = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn(['search', 'facets', currentFacet, 'pagingInfo']);
};

export const getCurrentPageIndex = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn([
    'search',
    'facets',
    currentFacet,
    'pagingInfo',
    'pageIndex',
  ]);
};

export const getFacetPageIndex = (state, facet) =>
  state.getIn(['search', 'facets', facet, 'pagingInfo', 'pageIndex']);

export const getFacetAuthentication = (state, facet) =>
  state.getIn(['search', 'facets', facet, 'authentication']);

export const getFeaturedEntryIds = state => {
  const currentFacet = getCurrentFacet(state);
  const entryIds = state
    .getIn(['search', 'facets', currentFacet, 'featuredEntries', 'items'])
    .map(entry => entry.getIn(['sys', 'id']));
  return entryIds;
};

export const getSearchTerm = state => state.getIn(['search', 'term']);

export const getQueryParams = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn(['search', 'facets', currentFacet, 'queryParams']);
};

export const getSearchParams = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn(['search', 'facets', currentFacet, 'searchParams']);
};
