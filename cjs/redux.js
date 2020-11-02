'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('immutable');
<<<<<<< HEAD
var routing$1 = require('./routing-b229b3c4.js');
var navigation$2 = require('./navigation-8a94ff72.js');
require('query-string');
=======
var selectors$1 = require('./selectors-0fe2c691.js');
var routing$1 = require('./routing-1f9fac1b.js');
var navigation$2 = require('./navigation-d1239577.js');
require('query-string');
var sagas = require('./sagas-6cbd425c.js');
var actions$1 = require('./actions-f35631ea.js');
require('redux-saga/effects');
require('js-cookie');
>>>>>>> isomorphic-base

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
  routing: routing$1.routing$2,
  version: navigation$2.version$2
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
