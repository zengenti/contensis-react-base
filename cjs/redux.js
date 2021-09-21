'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var version$1 = require('./version-62bb5b34.js');
var actions$1 = require('./actions-4998a95b.js');
var selectors$1 = require('./selectors-d96c128c.js');
var version$2 = require('./version-5178583d.js');
require('@redux-saga/core/effects');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
require('immer');
require('./reducers-fde41d6b.js');
require('jsonpath-mapper');
require('query-string');

var types = {
  navigation: version$1.navigation,
  routing: actions$1.routing,
  version: version$1.version
};

const loadNavigationTree = () => selectors$1.action(version$1.GET_NODE_TREE);

var navigation$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree
});

var actions = {
  navigation: navigation$1,
  routing: actions$1.routing$1,
  version: version$1.version$1
};

var selectors = {
  navigation: version$1.navigation$1,
  routing: selectors$1.routing,
  version: version$2.version
};

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

exports.convertSagaArray = version$1.convertSagaArray;
exports.injectReducer = version$1.injectReducer;
exports.injectRedux = version$1.injectRedux;
exports.injectSaga = version$1.injectSaga;
Object.defineProperty(exports, 'store', {
  enumerable: true,
  get: function () {
    return version$1.reduxStore;
  }
});
exports.useInjectRedux = version$1.useInjectRedux;
exports.action = selectors$1.action;
exports.getIn = selectors$1.getImmutableOrJS;
exports.getJS = selectors$1.getJS;
exports.navigation = navigation;
exports.routing = routing;
exports.version = version;
//# sourceMappingURL=redux.js.map
