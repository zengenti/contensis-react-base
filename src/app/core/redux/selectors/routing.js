import { List } from 'immutable';

export const selectRouteEntry = state => {
  return state.getIn(['routing', 'entry']);
};
export const selectRouteEntryDepends = state => {
  return state.getIn(['routing', 'entryDepends'], new List());
};
export const selectRouteEntryEntryId = state => {
  return state.getIn(['routing', 'entry', 'sys', 'id'], null);
};
export const selectRouteEntryContentTypeId = state => {
  return state.getIn(['routing', 'entry', 'sys', 'contentTypeId'], null);
};
export const selectRouteEntrySlug = state => {
  return state.getIn(['routing', 'entry', 'sys', 'slug'], null);
};
export const selectRouteEntryID = state => {
  return state.getIn(['routing', 'entryID']);
};
export const selectCurrentPath = state => {
  return state.getIn(['routing', 'currentPath']);
};
export const selectCurrentProject = state => {
  return state.getIn(['routing', 'currentProject']);
};
export const selectIsNotFound = state => {
  return state.getIn(['routing', 'notFound']);
};
export const selectCurrentAncestors = state => {
  return state.getIn(['routing', 'currentNodeAncestors']);
};

export const selectRouteLoading = state => {
  return state.getIn(['routing', 'routeLoading']);
};

export const selectRouteEntryRelatedArticles = state => {
  return state.getIn(['routing', 'relatedArticles']);
};
