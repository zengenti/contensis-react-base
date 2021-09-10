import { Entry } from 'contensis-delivery-api/lib/models';
import { AppState } from '~/redux/appstate';
import { getJS } from '~/redux/util';
import { queryParams } from '~/util/navigation';

const select = (state: AppState) => getJS(state, 'routing');

export const selectRouteEntry = (state: AppState) =>
  select(state)?.entry === null ? null : select(state)?.entry || ({} as Entry);

export const selectMappedEntry = (state: AppState) =>
  select(state)?.mappedEntry || null;

export const selectNodeDepends = (state: AppState) =>
  select(state)?.nodeDepends || [];

export const selectCurrentHostname = (state: AppState) =>
  select(state)?.currentHostname;

export const selectCurrentTreeID = (state: AppState) =>
  select(state)?.currentHostname;

export const selectRouteEntryEntryId = (state: AppState) =>
  select(state)?.entry?.sys?.id || null;

export const selectRouteEntryContentTypeId = (state: AppState) => {
  const entry = selectRouteEntry(state);
  return entry?.sys?.contentTypeId || null;
};

export const selectRouteEntryLanguage = (state: AppState) => {
  const entry = selectRouteEntry(state);
  return entry?.sys?.language || null;
};

export const selectRouteEntrySlug = (state: AppState) => {
  const entry = selectRouteEntry(state);
  return entry?.sys?.slug || null;
};

export const selectRouteEntryID = (state: AppState) => select(state)?.entryID;

export const selectCurrentPath = (state: AppState) =>
  select(state)?.currentPath;
export const selectCurrentSearch = (state: AppState) =>
  select(state)?.location?.search;
export const selectCurrentHash = (state: AppState) =>
  select(state)?.location?.hash;
export const selectQueryStringAsObject = (state: AppState) =>
  queryParams(selectCurrentSearch(state));
export const selectCurrentProject = (state: AppState) =>
  select(state)?.currentProject;
export const selectIsNotFound = (state: AppState) => select(state)?.notFound;
export const selectCurrentAncestors = (state: AppState) =>
  select(state)?.currentNodeAncestors || [];
export const selectCurrentSiblings = (state: AppState) =>
  select(state)?.currentNodeSiblings || [];
export const selectCurrentNode = (state: AppState) =>
  select(state)?.currentNode;
export const selectCurrentChildren = state =>
  select(state)?.currentNode?.children || [];

export const selectBreadcrumb = (state: AppState) => {
  return selectCurrentAncestors(state).push(selectCurrentNode(state));
};
export const selectRouteErrorMessage = (state: AppState) => {
  const error = select(state)?.error;
  if (error && 'data' in error) {
    return error?.data?.message || error?.statusText;
  }
};
export const selectRouteIsError = (state: AppState) => select(state)?.isError;
export const selectRouteLoading = (state: AppState) => select(state)?.isLoading;
export const selectRouteStatusCode = (state: AppState) =>
  select(state)?.statusCode;
