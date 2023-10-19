'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var version$1 = require('./version-153ec9ef.js');
var selectors$1 = require('./selectors-bb991331.js');
var version$2 = require('./version-963a7634.js');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
require('immer');
require('deepmerge');
require('./reducers-9afb5f89.js');
require('jsonpath-mapper');
require('query-string');
require('@redux-saga/core/effects');

var types = {
  navigation: version$1.navigation,
  routing: selectors$1.routing,
  version: version$1.version
};

const loadNavigationTree = () => selectors$1.action(version$1.GET_NODE_TREE);

var navigation$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree
});

var actions = {
  navigation: navigation$1,
  routing: selectors$1.routing$1,
  version: version$2.version
};

var selectors = {
  navigation: version$2.navigation,
  routing: selectors$1.routing$2,
  version: version$1.version$1
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

Object.defineProperty(exports, 'store', {
  enumerable: true,
  get: function () { return version$1.reduxStore; }
});
exports.action = selectors$1.action;
exports.getIn = selectors$1.getImmutableOrJS;
exports.getJS = selectors$1.getJS;
exports.convertSagaArray = version$2.convertSagaArray;
exports.injectReducer = version$2.injectReducer;
exports.injectRedux = version$2.injectRedux;
exports.injectSaga = version$2.injectSaga;
exports.useInjectRedux = version$2.useInjectRedux;
exports.navigation = navigation;
exports.routing = routing;
exports.version = version;
//# sourceMappingURL=redux.js.map
