import { List, Map } from 'immutable';
import { queryParams } from '~/core/util/navigation';

export const selectRouteEntry = state => {
  return state.getIn(['routing', 'entry'], Map());
};
export const selectMappedEntry = state => {
  return state.getIn(['routing', 'mappedEntry'], null);
};
export const selectNodeDepends = state => {
  return state.getIn(['routing', 'nodeDepends'], List());
};
export const selectCurrentTreeID = state => {
  return state.getIn(['routing', 'currentTreeId']);
};
export const selectEntryDepends = state => {
  return state.getIn(['routing', 'entryDepends']);
};
export const selectRouteEntryEntryId = state => {
  return state.getIn(['routing', 'entry', 'sys', 'id'], null);
};
export const selectRouteEntryContentTypeId = state => {
  const entry = selectRouteEntry(state);
  return entry && entry.getIn(['sys', 'contentTypeId'], null);
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
export const selectCurrentSearch = state => {
  return state.getIn(['routing', 'location', 'search']);
};
export const selectCurrentHash = state => {
  return state.getIn(['routing', 'location', 'hash']);
};
export const selectQueryStringAsObject = state =>
  queryParams(selectCurrentSearch(state));
export const selectCurrentProject = state => {
  return state.getIn(['routing', 'currentProject']);
};
export const selectIsNotFound = state => {
  return state.getIn(['routing', 'notFound']);
};
export const selectCurrentAncestors = state => {
  return state.getIn(['routing', 'currentNodeAncestors'], List());
};
export const selectCurrentNode = state => {
  return state.getIn(['routing', 'currentNode']);
};
export const selectBreadcrumb = state => {
  return (selectCurrentAncestors(state) || List()).push(
    selectCurrentNode(state)
  );
};
export const selectRouteLoading = state => {
  return state.getIn(['routing', 'isLoading']);
};
