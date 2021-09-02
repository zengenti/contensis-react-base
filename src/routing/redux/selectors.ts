import { queryParams } from '~/util/navigation';

export const selectRouteEntry = (state: any) =>
  state?.routing?.entry === null ? null : state?.routing?.entry || {};

export const selectMappedEntry = (state: any) =>
  state?.routing?.mappedEntry || null;

export const selectNodeDepends = (state: any) =>
  state?.routing?.nodeDepends || [];

export const selectCurrentHostname = (state: any) =>
  state?.routing?.currentHostname;

export const selectCurrentTreeID = (state: any) =>
  state?.routing?.currentHostname;

export const selectRouteEntryEntryId = (state: any) =>
  state?.routing?.entry?.sys?.id || null;

export const selectRouteEntryContentTypeId = (state: any) => {
  const entry = selectRouteEntry(state);
  return entry?.sys?.contentTypeId || null;
};

export const selectRouteEntryLanguage = (state: any) => {
  const entry = selectRouteEntry(state);
  return entry?.sys?.language || null;
};

export const selectRouteEntrySlug = (state: any) => {
  const entry = selectRouteEntry(state);
  return entry?.sys?.slug || null;
};

export const selectRouteEntryID = (state: any) => state?.routing?.entryID;

export const selectCurrentPath = (state: any) => state?.routing?.currentPath;
export const selectCurrentSearch = (state: any) =>
  state?.routing?.location?.search;
export const selectCurrentHash = (state: any) => state?.routing?.location?.hash;
export const selectQueryStringAsObject = (state: any) =>
  queryParams(selectCurrentSearch(state));
export const selectCurrentProject = (state: any) =>
  state?.routing?.currentProject;
export const selectIsNotFound = (state: any) => state?.routing?.notFound;
export const selectCurrentAncestors = (state: any) =>
  state?.routing?.currentNodeAncestors || [];
export const selectCurrentSiblings = (state: any) =>
  state?.routing?.currentNodeSiblings || [];
export const selectCurrentNode = (state: any) => state?.routing?.currentNode;
export const selectCurrentChildren = state =>
  state?.routing?.currentNode?.children || [];

export const selectBreadcrumb = (state: any) => {
  return selectCurrentAncestors(state).push(selectCurrentNode(state));
};
export const selectRouteErrorMessage = (state: any) => {
  const error = state?.routing?.error;
  if (error && 'data' in error) {
    return error?.data?.message || error?.statusText;
  }
};
export const selectRouteIsError = (state: any) => state?.routing?.isError;
export const selectRouteLoading = (state: any) => state?.routing?.isLoading;
export const selectRouteStatusCode = (state: any) => state?.routing?.statusCode;
