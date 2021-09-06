import { Map, List } from 'immutable';
import queryString from 'query-string';

function queryParams(search) {
  return queryString.parse(typeof window != 'undefined' ? window.location.search : search);
}

const selectRouteEntry = state => {
  return state.getIn(['routing', 'entry'], Map());
};
const selectMappedEntry = state => {
  return state.getIn(['routing', 'mappedEntry'], null);
};
const selectNodeDepends = state => {
  return state.getIn(['routing', 'nodeDepends'], List());
};
const selectCurrentHostname = state => {
  return state.getIn(['routing', 'currentHostname']);
};
const selectCurrentTreeID = state => {
  return state.getIn(['routing', 'currentTreeId']);
};
const selectRouteEntryEntryId = state => {
  return state.getIn(['routing', 'entry', 'sys', 'id'], null);
};
const selectRouteEntryContentTypeId = state => {
  const entry = selectRouteEntry(state);
  return entry && entry.getIn(['sys', 'contentTypeId'], null);
};
const selectRouteEntryLanguage = state => {
  return state.getIn(['routing', 'entry', 'sys', 'language'], null);
};
const selectRouteEntrySlug = state => {
  return state.getIn(['routing', 'entry', 'sys', 'slug'], null);
};
const selectRouteEntryID = state => {
  return state.getIn(['routing', 'entryID']);
};
const selectCurrentPath = state => {
  return state.getIn(['routing', 'currentPath']);
};
const selectCurrentSearch = state => {
  return state.getIn(['routing', 'location', 'search']);
};
const selectCurrentHash = state => {
  return state.getIn(['routing', 'location', 'hash']);
};
const selectQueryStringAsObject = state => queryParams(selectCurrentSearch(state));
const selectCurrentProject = state => {
  return state.getIn(['routing', 'currentProject']);
};
const selectIsNotFound = state => {
  return state.getIn(['routing', 'notFound']);
};
const selectCurrentAncestors = state => {
  return state.getIn(['routing', 'currentNodeAncestors'], List());
};
const selectCurrentSiblings = state => {
  return state.getIn(['routing', 'currentNodeSiblings'], List());
};
const selectCurrentNode = state => {
  return state.getIn(['routing', 'currentNode']);
};
const selectCurrentChildren = state => {
  return state.getIn(['routing', 'currentNode', 'children'], List());
};
const selectBreadcrumb = state => {
  return (selectCurrentAncestors(state) || List()).push(selectCurrentNode(state));
};
const selectRouteErrorMessage = state => {
  const error = state.getIn(['routing', 'error']);

  if (error && 'toJS' in error) {
    return error.getIn(['data', 'message']) || error.get('statusText');
  }
};
const selectRouteIsError = state => {
  return state.getIn(['routing', 'isError']);
};
const selectRouteLoading = state => {
  return state.getIn(['routing', 'isLoading']);
};
const selectRouteStatusCode = state => {
  return state.getIn(['routing', 'statusCode']);
};

var routing = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectRouteEntry: selectRouteEntry,
  selectMappedEntry: selectMappedEntry,
  selectNodeDepends: selectNodeDepends,
  selectCurrentHostname: selectCurrentHostname,
  selectCurrentTreeID: selectCurrentTreeID,
  selectRouteEntryEntryId: selectRouteEntryEntryId,
  selectRouteEntryContentTypeId: selectRouteEntryContentTypeId,
  selectRouteEntryLanguage: selectRouteEntryLanguage,
  selectRouteEntrySlug: selectRouteEntrySlug,
  selectRouteEntryID: selectRouteEntryID,
  selectCurrentPath: selectCurrentPath,
  selectCurrentSearch: selectCurrentSearch,
  selectCurrentHash: selectCurrentHash,
  selectQueryStringAsObject: selectQueryStringAsObject,
  selectCurrentProject: selectCurrentProject,
  selectIsNotFound: selectIsNotFound,
  selectCurrentAncestors: selectCurrentAncestors,
  selectCurrentSiblings: selectCurrentSiblings,
  selectCurrentNode: selectCurrentNode,
  selectCurrentChildren: selectCurrentChildren,
  selectBreadcrumb: selectBreadcrumb,
  selectRouteErrorMessage: selectRouteErrorMessage,
  selectRouteIsError: selectRouteIsError,
  selectRouteLoading: selectRouteLoading,
  selectRouteStatusCode: selectRouteStatusCode
});

export { selectCurrentProject as a, selectCurrentNode as b, selectCurrentAncestors as c, selectRouteEntryEntryId as d, selectRouteEntryLanguage as e, selectMappedEntry as f, selectCurrentSearch as g, selectRouteEntryContentTypeId as h, selectRouteIsError as i, selectIsNotFound as j, selectRouteLoading as k, selectCurrentPath as l, selectRouteStatusCode as m, selectRouteErrorMessage as n, queryParams as q, routing as r, selectRouteEntry as s };
//# sourceMappingURL=selectors-68799788.js.map
