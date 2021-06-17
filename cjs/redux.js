'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('immutable');
var routing$1 = require('./routing-a4d7b382.js');
require('redux');
require('redux-immutable');
require('redux-thunk');
require('redux-saga');
var navigation$2 = require('./navigation-8c90cb78.js');
require('./reducers-0b34eca8.js');
require('query-string');
var routing$2 = require('./routing-5db2c867.js');
var version$1 = require('./version-2f3078fa.js');

var types = {
  navigation: navigation$2.navigation,
  routing: routing$1.routing,
  version: navigation$2.version
};

const loadNavigationTree = () => routing$1.action(navigation$2.GET_NODE_TREE);

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree
});

var actions = {
  navigation,
  routing: routing$1.routing$1,
  version: navigation$2.version$1
};

var selectors = {
  navigation: navigation$2.navigation$1,
  routing: routing$2.routing,
  version: version$1.version
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
const user = {
  types: types.user,
  actions: actions.user,
  selectors: selectors.user
};
const version = {
  types: types.version,
  actions: actions.version,
  selectors: selectors.version
};

Object.defineProperty(exports, 'store', {
  enumerable: true,
  get: function () {
    return navigation$2.reduxStore;
  }
});
exports.navigation = navigation$1;
exports.routing = routing;
exports.user = user;
exports.version = version;
//# sourceMappingURL=redux.js.map
