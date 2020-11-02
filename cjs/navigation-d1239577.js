'use strict';

<<<<<<< HEAD:cjs/navigation-8a94ff72.js
var routing = require('./routing-b229b3c4.js');
=======
var selectors = require('./selectors-0fe2c691.js');
>>>>>>> isomorphic-base:cjs/navigation-d1239577.js

const VERSION_PREFIX = '@VERSION/';
const SET_VERSION = `${VERSION_PREFIX}SET_VERSION`;
const SET_VERSION_STATUS = `${VERSION_PREFIX}SET_VERSION_STATUS`;

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SET_VERSION: SET_VERSION,
  SET_VERSION_STATUS: SET_VERSION_STATUS
});

const ACTION_PREFIX = '@NAVIGATION/';
const GET_NODE_TREE = `${ACTION_PREFIX}_GET_NODE_TREE`;
const SET_NODE_TREE = `${ACTION_PREFIX}_SET_NODE_TREE`;
const GET_NODE_TREE_ERROR = `${ACTION_PREFIX}_GET_NODE_TREE_ERROR`;

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_NODE_TREE: GET_NODE_TREE,
  SET_NODE_TREE: SET_NODE_TREE,
  GET_NODE_TREE_ERROR: GET_NODE_TREE_ERROR
});

const setVersion = (commitRef, buildNo) => routing.action(SET_VERSION, {
  commitRef,
  buildNo
});
const setVersionStatus = status => routing.action(SET_VERSION_STATUS, {
  status
});

var version$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setVersion: setVersion,
  setVersionStatus: setVersionStatus
});

const selectCommitRef = state => {
  return state.getIn(['version', 'commitRef']);
};
const selectBuildNumber = state => {
  return state.getIn(['version', 'buildNo']);
};
const selectVersionStatus = state => {
  return state.getIn(['version', 'contensisVersionStatus']);
};

var version$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectCommitRef: selectCommitRef,
  selectBuildNumber: selectBuildNumber,
  selectVersionStatus: selectVersionStatus
});

const hasNavigationTree = state => {
  return state.getIn(['navigation', 'isReady']);
};
const selectNavigationRoot = state => {
  return state.getIn(['navigation', 'root']);
};
const selectNavigationDepends = state => {
  return state.getIn(['navigation', 'treeDepends']);
};

var navigation$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasNavigationTree: hasNavigationTree,
  selectNavigationRoot: selectNavigationRoot,
  selectNavigationDepends: selectNavigationDepends
});

exports.GET_NODE_TREE = GET_NODE_TREE;
exports.GET_NODE_TREE_ERROR = GET_NODE_TREE_ERROR;
exports.SET_NODE_TREE = SET_NODE_TREE;
exports.SET_VERSION = SET_VERSION;
exports.SET_VERSION_STATUS = SET_VERSION_STATUS;
exports.hasNavigationTree = hasNavigationTree;
exports.navigation = navigation;
exports.navigation$1 = navigation$1;
exports.selectVersionStatus = selectVersionStatus;
exports.setVersion = setVersion;
exports.setVersionStatus = setVersionStatus;
exports.version = version;
exports.version$1 = version$1;
exports.version$2 = version$2;
<<<<<<< HEAD:cjs/navigation-8a94ff72.js
//# sourceMappingURL=navigation-8a94ff72.js.map
=======
//# sourceMappingURL=navigation-d1239577.js.map
>>>>>>> isomorphic-base:cjs/navigation-d1239577.js
