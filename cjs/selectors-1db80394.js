'use strict';

var queryString = require('query-string');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var queryString__default = /*#__PURE__*/_interopDefaultLegacy(queryString);

const action = (type, payload = {}) => ({
  type,
  ...payload
});
const getJS = (state, stateKey) => {
  if ('get' in state && typeof state.get === 'function') {
    const result = state.get(stateKey);
    if ('toJS' in result && typeof result.toJS === 'function') return result.toJS();
    return result;
  }

  return state[stateKey];
};

function queryParams(search) {
  return queryString__default['default'].parse(typeof window != 'undefined' ? window.location.search : search);
}

const select = state => getJS(state, 'routing');

const selectRouteEntry = state => {
  var _select, _select2;

  return ((_select = select(state)) === null || _select === void 0 ? void 0 : _select.entry) === null ? null : ((_select2 = select(state)) === null || _select2 === void 0 ? void 0 : _select2.entry) || {};
};
const selectMappedEntry = state => {
  var _select3;

  return ((_select3 = select(state)) === null || _select3 === void 0 ? void 0 : _select3.mappedEntry) || null;
};
const selectNodeDepends = state => {
  var _select4;

  return ((_select4 = select(state)) === null || _select4 === void 0 ? void 0 : _select4.nodeDepends) || [];
};
const selectCurrentHostname = state => {
  var _select5;

  return (_select5 = select(state)) === null || _select5 === void 0 ? void 0 : _select5.currentHostname;
};
const selectCurrentTreeID = state => {
  var _select6;

  return (_select6 = select(state)) === null || _select6 === void 0 ? void 0 : _select6.currentHostname;
};
const selectRouteEntryEntryId = state => {
  var _select7, _select7$entry, _select7$entry$sys;

  return ((_select7 = select(state)) === null || _select7 === void 0 ? void 0 : (_select7$entry = _select7.entry) === null || _select7$entry === void 0 ? void 0 : (_select7$entry$sys = _select7$entry.sys) === null || _select7$entry$sys === void 0 ? void 0 : _select7$entry$sys.id) || null;
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
  var _select8;

  return (_select8 = select(state)) === null || _select8 === void 0 ? void 0 : _select8.entryID;
};
const selectCurrentPath = state => {
  var _select9;

  return (_select9 = select(state)) === null || _select9 === void 0 ? void 0 : _select9.currentPath;
};
const selectCurrentSearch = state => {
  var _select10, _select10$location;

  return (_select10 = select(state)) === null || _select10 === void 0 ? void 0 : (_select10$location = _select10.location) === null || _select10$location === void 0 ? void 0 : _select10$location.search;
};
const selectCurrentHash = state => {
  var _select11, _select11$location;

  return (_select11 = select(state)) === null || _select11 === void 0 ? void 0 : (_select11$location = _select11.location) === null || _select11$location === void 0 ? void 0 : _select11$location.hash;
};
const selectQueryStringAsObject = state => queryParams(selectCurrentSearch(state));
const selectCurrentProject = state => {
  var _select12;

  return (_select12 = select(state)) === null || _select12 === void 0 ? void 0 : _select12.currentProject;
};
const selectIsNotFound = state => {
  var _select13;

  return (_select13 = select(state)) === null || _select13 === void 0 ? void 0 : _select13.notFound;
};
const selectCurrentAncestors = state => {
  var _select14;

  return ((_select14 = select(state)) === null || _select14 === void 0 ? void 0 : _select14.currentNodeAncestors) || [];
};
const selectCurrentSiblings = state => {
  var _select15;

  return ((_select15 = select(state)) === null || _select15 === void 0 ? void 0 : _select15.currentNodeSiblings) || [];
};
const selectCurrentNode = state => {
  var _select16;

  return (_select16 = select(state)) === null || _select16 === void 0 ? void 0 : _select16.currentNode;
};
const selectCurrentChildren = state => {
  var _select17, _select17$currentNode;

  return ((_select17 = select(state)) === null || _select17 === void 0 ? void 0 : (_select17$currentNode = _select17.currentNode) === null || _select17$currentNode === void 0 ? void 0 : _select17$currentNode.children) || [];
};
const selectBreadcrumb = state => {
  return selectCurrentAncestors(state).push(selectCurrentNode(state));
};
const selectRouteErrorMessage = state => {
  var _select18;

  const error = (_select18 = select(state)) === null || _select18 === void 0 ? void 0 : _select18.error;

  if (error && 'data' in error) {
    var _error$data;

    return (error === null || error === void 0 ? void 0 : (_error$data = error.data) === null || _error$data === void 0 ? void 0 : _error$data.message) || (error === null || error === void 0 ? void 0 : error.statusText);
  }
};
const selectRouteIsError = state => {
  var _select19;

  return (_select19 = select(state)) === null || _select19 === void 0 ? void 0 : _select19.isError;
};
const selectRouteLoading = state => {
  var _select20;

  return (_select20 = select(state)) === null || _select20 === void 0 ? void 0 : _select20.isLoading;
};
const selectRouteStatusCode = state => {
  var _select21;

  return (_select21 = select(state)) === null || _select21 === void 0 ? void 0 : _select21.statusCode;
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

exports.action = action;
exports.getJS = getJS;
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
//# sourceMappingURL=selectors-1db80394.js.map
