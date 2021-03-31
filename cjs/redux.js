'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
require('react-redux');
require('immutable');
require('contensis-delivery-api');
var navigation$2 = require('./navigation-6866ec72.js');
var selectors$1 = require('./selectors-ac6b55d5.js');
var routing$1 = require('./routing-53ca382e.js');
require('query-string');
require('redux');
require('redux-immutable');
require('redux-thunk');
require('redux-saga');
var sagas = require('./sagas-b4a2a9b4.js');
var actions$1 = require('./actions-5f6fcc8c.js');
require('@redux-saga/core/effects');
require('js-cookie');

var types = {
  navigation: navigation$2.navigation,
  routing: selectors$1.routing,
  user: sagas.user,
  version: navigation$2.version
};

const loadNavigationTree = () => selectors$1.action(navigation$2.GET_NODE_TREE);

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree
});

var actions = {
  navigation,
  routing: routing$1.routing,
  user: actions$1.user,
  version: navigation$2.version$1
};

var selectors = {
  navigation: navigation$2.navigation$1,
  routing: selectors$1.routing$1,
  user: selectors$1.user,
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
