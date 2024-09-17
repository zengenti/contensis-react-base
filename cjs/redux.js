'use strict';

var store = require('./store-D8dJBaFw.js');
var selectors$1 = require('./selectors-wCs5fHD4.js');
var version$1 = require('./version-DSW6Roy9.js');
var version$2 = require('./version-CM-bJ62L.js');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
require('immer');
require('jsonpath-mapper');
require('query-string');
require('@redux-saga/core/effects');

var types = {
  navigation: store.navigation,
  routing: selectors$1.routing,
  version: store.version
};

const loadNavigationTree = () => selectors$1.action(store.GET_NODE_TREE);

var navigation$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree
});

var actions = {
  navigation: navigation$1,
  routing: selectors$1.routing$1,
  version: version$1.version
};

var selectors = {
  navigation: version$1.navigation,
  routing: selectors$1.routing$2,
  version: version$2.version
};

// Remap the objects so they are presented in "feature" hierarchy
// e.g. { routing: { types, actions }, navigation: { types, actions } }
// instead of { types: { routing, navigation }, actions: { routing, navigation } }

const navigation = {
  types: types.navigation,
  actions: actions.navigation,
  selectors: selectors.navigation
};
const routing = {
  types: types.routing,
  actions: actions.routing,
  selectors: selectors.routing
};
const version = {
  types: types.version,
  actions: actions.version,
  selectors: selectors.version
};

Object.defineProperty(exports, "store", {
  enumerable: true,
  get: function () { return store.reduxStore; }
});
exports.action = selectors$1.action;
exports.getIn = selectors$1.getImmutableOrJS;
exports.getJS = selectors$1.getJS;
exports.convertSagaArray = version$1.convertSagaArray;
exports.injectReducer = version$1.injectReducer;
exports.injectRedux = version$1.injectRedux;
exports.injectSaga = version$1.injectSaga;
exports.useInjectRedux = version$1.useInjectRedux;
exports.navigation = navigation;
exports.routing = routing;
exports.version = version;
//# sourceMappingURL=redux.js.map
