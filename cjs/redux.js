'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('immutable');
require('redux');
require('redux-immutable');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
var injectors = require('./injectors-72d5b989.js');
var actions$1 = require('./actions-e22726ed.js');
require('./reducers-91e3e239.js');
require('@redux-saga/core/effects');
var version$2 = require('./version-2193b4a2.js');
require('query-string');
var selectors$1 = require('./selectors-69c3d37c.js');
var version$1 = require('./version-7d8852f6.js');

var types = {
  navigation: injectors.navigation,
  routing: actions$1.routing,
  version: injectors.version
};

const loadNavigationTree = () => actions$1.action(injectors.GET_NODE_TREE);

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree
});

var actions = {
  navigation,
  routing: actions$1.routing$1,
  version: version$1.version
};

var selectors = {
  navigation: injectors.navigation$1,
  routing: selectors$1.routing,
  version: version$2.version
};

// e.g. { routing: { types, actions }, navigation: { types, actions } }
// instead of { types: { routing, navigation }, actions: { routing, navigation } }

const navigation$1 = {
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

exports.convertSagaArray = injectors.convertSagaArray;
exports.injectReducer = injectors.injectReducer;
exports.injectRedux = injectors.injectRedux;
exports.injectSaga = injectors.injectSaga;
Object.defineProperty(exports, 'store', {
  enumerable: true,
  get: function () {
    return injectors.reduxStore;
  }
});
exports.useInjectRedux = injectors.useInjectRedux;
exports.navigation = navigation$1;
exports.routing = routing;
exports.version = version;
//# sourceMappingURL=redux.js.map
