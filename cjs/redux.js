'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('immutable');
var routing$1 = require('./routing-82e00e38.js');
var version$1 = require('./version-ff987c76.js');
require('query-string');

var types = {
  navigation: version$1.navigation,
  routing: routing$1.routing,
  version: version$1.version
};

const loadNavigationTree = () => routing$1.action(version$1.GET_NODE_TREE);

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree
});

var actions = {
  navigation,
  routing: routing$1.routing$1,
  version: version$1.version$1
};

var selectors = {
  navigation: version$1.navigation$1,
  routing: routing$1.routing$2,
  version: version$1.version$2
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

exports.navigation = navigation$1;
exports.routing = routing;
exports.user = user;
exports.version = version;
//# sourceMappingURL=redux.js.map
