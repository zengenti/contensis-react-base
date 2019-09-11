export const getSearchEntries = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn(['search', 'facets', currentFacet, 'entries']);
};
export const getPagerStats = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn(['search', 'facets', currentFacet, 'pagingInfo']);
};
export const getPagerPageIndex = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn([
    'search',
    'facets',
    currentFacet,
    'pagingInfo',
    'pageIndex',
  ]);
};
export const getPagerTotalCount = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn([
    'search',
    'facets',
    currentFacet,
    'pagingInfo',
    'totalCount',
  ]);
};
export const getPagerPageCount = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn([
    'search',
    'facets',
    currentFacet,
    'pagingInfo',
    'pageCount',
  ]);
};
export const getPagerPageSize = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn([
    'search',
    'facets',
    currentFacet,
    'pagingInfo',
    'pageSize',
  ]);
};
export const getPagerCurrentPageItemCount = state => {
  const currentFacet = getCurrentFacet(state);
  let curentEntrys = state.getIn(['search', 'facets', currentFacet, 'entries']);
  if (curentEntrys && curentEntrys.size) {
    return curentEntrys.size;
  }
  return 0;
};

export const getFirstSearchPromoEntry = state => {
  const item = state.getIn(['search', 'facets', 'searchPromo', 'entries', 0]);
  if (typeof item === 'undefined') {
    return null;
  }
  return item;
};
export const getPagerCurrentPageQueryDuration = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn(['search', 'facets', currentFacet, 'queryDuration']);
};
export const getCurrentKeyword = state =>
  state.getIn(['search', 'currentKeyword']);
export const getCurrentFacet = state => state.getIn(['search', 'currentFacet']);
export const isSingleFacetMode = state =>
  state.getIn(['search', 'singleFacetMode']);
export const getLatestKeyword = state =>
  state.getIn(['search', 'latestKeyword']);

export const getSearchFacetNames = state =>
  state.getIn(['search', 'facetNames']);

export const getFacetTypes = state => {
  const currentFacet = getCurrentFacet(state);
  return state.getIn(['search', 'facets', currentFacet, 'entries']);
};

export const getCourseLevels = state => {
  return state.getIn(['search', 'courseFilters', 'levels']);
};

export const getStudyModes = state => {
  return state.getIn(['search', 'courseFilters', 'studyModes']);
};
export const getStartMonths = state => {
  return state.getIn(['search', 'courseFilters', 'startMonths']);
};
export const getSubjectAreas = state => {
  return state.getIn(['search', 'courseFilters', 'subjectAreas']);
};
export const getJointHonors = state =>
  state.getIn(['search', 'courseFilters', 'jointHonours']);

export const getDistanceLearning = state =>
  state.getIn(['search', 'courseFilters', 'distanceLearning']);

export const getClearingFilter = state =>
  state.getIn(['search', 'courseFilters', 'clearing']);
