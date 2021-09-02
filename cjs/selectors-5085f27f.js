'use strict';

var queryString = require('query-string');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var queryString__default = /*#__PURE__*/_interopDefaultLegacy(queryString);

function queryParams(search) {
  return queryString__default['default'].parse(typeof window != 'undefined' ? window.location.search : search);
}

const selectRouteEntry = state => {
  var _state$routing, _state$routing2;

  return (state === null || state === void 0 ? void 0 : (_state$routing = state.routing) === null || _state$routing === void 0 ? void 0 : _state$routing.entry) === null ? null : (state === null || state === void 0 ? void 0 : (_state$routing2 = state.routing) === null || _state$routing2 === void 0 ? void 0 : _state$routing2.entry) || {};
};
const selectMappedEntry = state => {
  var _state$routing3;

  return (state === null || state === void 0 ? void 0 : (_state$routing3 = state.routing) === null || _state$routing3 === void 0 ? void 0 : _state$routing3.mappedEntry) || null;
};
const selectNodeDepends = state => {
  var _state$routing4;

  return (state === null || state === void 0 ? void 0 : (_state$routing4 = state.routing) === null || _state$routing4 === void 0 ? void 0 : _state$routing4.nodeDepends) || [];
};
const selectCurrentHostname = state => {
  var _state$routing5;

  return state === null || state === void 0 ? void 0 : (_state$routing5 = state.routing) === null || _state$routing5 === void 0 ? void 0 : _state$routing5.currentHostname;
};
const selectCurrentTreeID = state => {
  var _state$routing6;

  return state === null || state === void 0 ? void 0 : (_state$routing6 = state.routing) === null || _state$routing6 === void 0 ? void 0 : _state$routing6.currentHostname;
};
const selectRouteEntryEntryId = state => {
  var _state$routing7, _state$routing7$entry, _state$routing7$entry2;

  return (state === null || state === void 0 ? void 0 : (_state$routing7 = state.routing) === null || _state$routing7 === void 0 ? void 0 : (_state$routing7$entry = _state$routing7.entry) === null || _state$routing7$entry === void 0 ? void 0 : (_state$routing7$entry2 = _state$routing7$entry.sys) === null || _state$routing7$entry2 === void 0 ? void 0 : _state$routing7$entry2.id) || null;
};
const selectRouteEntryContentTypeId = state => {
  var _entry$sys;

  const entry = selectRouteEntry(state);
  return (entry === null || entry === void 0 ? void 0 : (_entry$sys = entry.sys) === null || _entry$sys === void 0 ? void 0 : _entry$sys.contentTypeId) || null;
};
const selectRouteEntryLanguage = state => {
  var _entry$sys2;

  const entry = selectRouteEntry(state);
  return (entry === null || entry === void 0 ? void 0 : (_entry$sys2 = entry.sys) === null || _entry$sys2 === void 0 ? void 0 : _entry$sys2.language) || null;
};
const selectRouteEntrySlug = state => {
  var _entry$sys3;

  const entry = selectRouteEntry(state);
  return (entry === null || entry === void 0 ? void 0 : (_entry$sys3 = entry.sys) === null || _entry$sys3 === void 0 ? void 0 : _entry$sys3.slug) || null;
};
const selectRouteEntryID = state => {
  var _state$routing8;

  return state === null || state === void 0 ? void 0 : (_state$routing8 = state.routing) === null || _state$routing8 === void 0 ? void 0 : _state$routing8.entryID;
};
const selectCurrentPath = state => {
  var _state$routing9;

  return state === null || state === void 0 ? void 0 : (_state$routing9 = state.routing) === null || _state$routing9 === void 0 ? void 0 : _state$routing9.currentPath;
};
const selectCurrentSearch = state => {
  var _state$routing10, _state$routing10$loca;

  return state === null || state === void 0 ? void 0 : (_state$routing10 = state.routing) === null || _state$routing10 === void 0 ? void 0 : (_state$routing10$loca = _state$routing10.location) === null || _state$routing10$loca === void 0 ? void 0 : _state$routing10$loca.search;
};
const selectCurrentHash = state => {
  var _state$routing11, _state$routing11$loca;

  return state === null || state === void 0 ? void 0 : (_state$routing11 = state.routing) === null || _state$routing11 === void 0 ? void 0 : (_state$routing11$loca = _state$routing11.location) === null || _state$routing11$loca === void 0 ? void 0 : _state$routing11$loca.hash;
};
const selectQueryStringAsObject = state => queryParams(selectCurrentSearch(state));
const selectCurrentProject = state => {
  var _state$routing12;

  return state === null || state === void 0 ? void 0 : (_state$routing12 = state.routing) === null || _state$routing12 === void 0 ? void 0 : _state$routing12.currentProject;
};
const selectIsNotFound = state => {
  var _state$routing13;

  return state === null || state === void 0 ? void 0 : (_state$routing13 = state.routing) === null || _state$routing13 === void 0 ? void 0 : _state$routing13.notFound;
};
const selectCurrentAncestors = state => {
  var _state$routing14;

  return (state === null || state === void 0 ? void 0 : (_state$routing14 = state.routing) === null || _state$routing14 === void 0 ? void 0 : _state$routing14.currentNodeAncestors) || [];
};
const selectCurrentSiblings = state => {
  var _state$routing15;

  return (state === null || state === void 0 ? void 0 : (_state$routing15 = state.routing) === null || _state$routing15 === void 0 ? void 0 : _state$routing15.currentNodeSiblings) || [];
};
const selectCurrentNode = state => {
  var _state$routing16;

  return state === null || state === void 0 ? void 0 : (_state$routing16 = state.routing) === null || _state$routing16 === void 0 ? void 0 : _state$routing16.currentNode;
};
const selectCurrentChildren = state => {
  var _state$routing17, _state$routing17$curr;

  return (state === null || state === void 0 ? void 0 : (_state$routing17 = state.routing) === null || _state$routing17 === void 0 ? void 0 : (_state$routing17$curr = _state$routing17.currentNode) === null || _state$routing17$curr === void 0 ? void 0 : _state$routing17$curr.children) || [];
};
const selectBreadcrumb = state => {
  return selectCurrentAncestors(state).push(selectCurrentNode(state));
};
const selectRouteErrorMessage = state => {
  var _state$routing18;

  const error = state === null || state === void 0 ? void 0 : (_state$routing18 = state.routing) === null || _state$routing18 === void 0 ? void 0 : _state$routing18.error;

  if (error && 'data' in error) {
    var _error$data;

    return (error === null || error === void 0 ? void 0 : (_error$data = error.data) === null || _error$data === void 0 ? void 0 : _error$data.message) || (error === null || error === void 0 ? void 0 : error.statusText);
  }
};
const selectRouteIsError = state => {
  var _state$routing19;

  return state === null || state === void 0 ? void 0 : (_state$routing19 = state.routing) === null || _state$routing19 === void 0 ? void 0 : _state$routing19.isError;
};
const selectRouteLoading = state => {
  var _state$routing20;

  return state === null || state === void 0 ? void 0 : (_state$routing20 = state.routing) === null || _state$routing20 === void 0 ? void 0 : _state$routing20.isLoading;
};
const selectRouteStatusCode = state => {
  var _state$routing21;

  return state === null || state === void 0 ? void 0 : (_state$routing21 = state.routing) === null || _state$routing21 === void 0 ? void 0 : _state$routing21.statusCode;
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

exports.queryParams = queryParams;
exports.routing = routing;
exports.selectCurrentAncestors = selectCurrentAncestors;
exports.selectCurrentNode = selectCurrentNode;
exports.selectCurrentPath = selectCurrentPath;
exports.selectCurrentProject = selectCurrentProject;
exports.selectCurrentSearch = selectCurrentSearch;
exports.selectIsNotFound = selectIsNotFound;
exports.selectMappedEntry = selectMappedEntry;
exports.selectRouteEntry = selectRouteEntry;
exports.selectRouteEntryContentTypeId = selectRouteEntryContentTypeId;
exports.selectRouteEntryEntryId = selectRouteEntryEntryId;
exports.selectRouteEntryLanguage = selectRouteEntryLanguage;
exports.selectRouteErrorMessage = selectRouteErrorMessage;
exports.selectRouteIsError = selectRouteIsError;
exports.selectRouteLoading = selectRouteLoading;
exports.selectRouteStatusCode = selectRouteStatusCode;
//# sourceMappingURL=selectors-5085f27f.js.map
