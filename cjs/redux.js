'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('immutable');
require('redux');
require('redux-immutable');
require('redux-thunk');
require('redux-saga');
<<<<<<< HEAD
require('redux-injectors');
var version$1 = require('./version-d8f5b436.js');
var actions$1 = require('./actions-e22726ed.js');
require('./reducers-c42035ab.js');
require('@redux-saga/core/effects');
var version$2 = require('./version-2193b4a2.js');
=======
var navigation$2 = require('./navigation-8c90cb78.js');
require('./reducers-0b34eca8.js');
>>>>>>> contensis-14-forgot-change-password
require('query-string');
var selectors$1 = require('./selectors-69c3d37c.js');

var types = {
<<<<<<< HEAD
  navigation: version$1.navigation,
  routing: actions$1.routing,
  version: version$1.version
=======
  navigation: navigation$2.navigation,
  routing: routing$1.routing,
  version: navigation$2.version,
>>>>>>> contensis-14-forgot-change-password
};

const loadNavigationTree = () => actions$1.action(version$1.GET_NODE_TREE);

var navigation = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree,
});

var actions = {
  navigation,
<<<<<<< HEAD
  routing: actions$1.routing$1,
  version: version$1.version$1
};

var selectors = {
  navigation: version$1.navigation$1,
  routing: selectors$1.routing,
  version: version$2.version
=======
  routing: routing$1.routing$1,
  version: navigation$2.version$1,
};

var selectors = {
  navigation: navigation$2.navigation$1,
  routing: routing$2.routing,
  version: version$1.version,
>>>>>>> contensis-14-forgot-change-password
};

// e.g. { routing: { types, actions }, navigation: { types, actions } }
// instead of { types: { routing, navigation }, actions: { routing, navigation } }

const navigation$1 = {
  types: types.navigation,
  actions: actions.navigation,
  selectors: selectors.navigation,
};
const routing = {
  types: types.routing,
  actions: actions.routing,
  selectors: selectors.routing,
};
<<<<<<< HEAD
=======
const user = {
  types: types.user,
  actions: actions.user,
  selectors: selectors.user,
};
>>>>>>> contensis-14-forgot-change-password
const version = {
  types: types.version,
  actions: actions.version,
  selectors: selectors.version,
};

exports.convertSagaArray = version$1.convertSagaArray;
exports.injectReducer = version$1.injectReducer;
exports.injectRedux = version$1.injectRedux;
exports.injectSaga = version$1.injectSaga;
Object.defineProperty(exports, 'store', {
  enumerable: true,
<<<<<<< HEAD
  get: function () {
    return version$1.reduxStore;
  }
=======
  get: function() {
    return navigation$2.reduxStore;
  },
>>>>>>> contensis-14-forgot-change-password
});
exports.useInjectRedux = version$1.useInjectRedux;
exports.navigation = navigation$1;
exports.routing = routing;
exports.version = version;
//# sourceMappingURL=redux.js.map
