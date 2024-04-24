import { Entry } from 'contensis-delivery-api/lib/models';
import { AppState, StateType } from '~/models';
import { getImmutableOrJS as getIn } from '~/redux/util';
import { queryParams } from '~/util/navigation';

export const selectRouteEntry = (state: AppState, returnType?: StateType) =>
  getIn(state, ['routing', 'entry'], {} as Entry, returnType);

export const selectMappedEntry = (state: AppState, returnType?: StateType) =>
  getIn(state, ['routing', 'mappedEntry'], null, returnType);

export const selectSurrogateKeys = (state: AppState) => {
  const keys = getIn(state, ['routing', 'surrogateKeys'], [], 'js');
  return keys;
};
export const selectSsrApiCalls = (state: AppState) => {
  return getIn(state, ['routing', 'apiCalls'], [], 'js');
};
export const selectCurrentHostname = (state: AppState) =>
  getIn(state, ['routing', 'currentHostname']);

export const selectCurrentTreeID = (state: AppState) =>
  getIn(state, ['routing', 'currentHostname']);

export const selectRouteEntryEntryId = (state: AppState) =>
  getIn(state, ['routing', 'entry', 'sys', 'id'], null);

export const selectRouteEntryContentTypeId = (state: AppState) => {
  const entry = selectRouteEntry(state);
  return getIn(entry, ['sys', 'contentTypeId'], null);
};

export const selectRouteEntryLanguage = (state: AppState) => {
  const entry = selectRouteEntry(state);
  return getIn(entry, ['sys', 'language'], null);
};

export const selectRouteEntrySlug = (state: AppState) => {
  const entry = selectRouteEntry(state);
  return getIn(entry, ['sys', 'slug'], null);
};

export const selectRouteEntryID = (state: AppState) =>
  getIn(state, ['routing', 'entryID']);

export const selectCanonicalPath = (state: AppState) => {
  return getIn(state, ['routing', 'canonicalPath']);
};

export const selectCurrentPath = (state: AppState) =>
  getIn(state, ['routing', 'currentPath']);

export const selectCurrentLocation = (state: AppState) =>
  getIn(state, ['routing', 'location']);
export const selectCurrentSearch = (state: AppState) =>
  getIn(state, ['routing', 'location', 'search']);
export const selectCurrentHash = (state: AppState) =>
  getIn(state, ['routing', 'location', 'hash']);
export const selectQueryStringAsObject = (state: AppState) =>
  queryParams(selectCurrentSearch(state));
export const selectCurrentProject = (state: AppState) =>
  getIn(state, ['routing', 'currentProject']);
export const selectIsNotFound = (state: AppState) =>
  getIn(state, ['routing', 'notFound']);
export const selectCurrentAncestors = (state: AppState) =>
  getIn(state, ['routing', 'currentNodeAncestors'], []);
export const selectCurrentSiblings = (state: AppState) =>
  getIn(state, ['routing', 'currentNodeSiblings'], []);
export const selectCurrentNode = (state: AppState, returnType?: StateType) =>
  getIn(state, ['routing', 'currentNode'], null, returnType);
export const selectCurrentChildren = state =>
  getIn(state, ['routing', 'currentNode', 'children'], []);

export const selectBreadcrumb = (state: AppState) => {
  return [...selectCurrentAncestors(state), selectCurrentNode(state)];
};
export const selectRouteErrorMessage = (state: AppState) => {
  const error = getIn(state, ['routing', 'error']);
  return getIn(error, ['data', 'message'], getIn(error, 'statusText'));
};
export const selectRouteIsError = (state: AppState) =>
  getIn(state, ['routing', 'isError']);
export const selectRouteLoading = (state: AppState) =>
  getIn(state, ['routing', 'isLoading']);
export const selectRouteStatusCode = (state: AppState) =>
  getIn(state, ['routing', 'statusCode']);
export const selectStaticRoute = (state: AppState) =>
  getIn(state, ['routing', 'staticRoute']);
