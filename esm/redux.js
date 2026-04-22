import { n as navigation$2, v as version$1, G as GET_NODE_TREE } from './store-B4IrBYHm.js';
export { r as store } from './store-B4IrBYHm.js';
import { r as routing$1, d as action, a as routing$2, b as routing$3 } from './selectors-8ROQrTd7.js';
export { g as getIn, e as getJS } from './selectors-8ROQrTd7.js';
import { v as version$2, n as navigation$3 } from './version-CA9Mdm3A.js';
export { i as injectReducer, b as injectRedux, a as injectSaga, u as useInjectRedux } from './version-CA9Mdm3A.js';
import { v as version$3 } from './version-BQAL8sQO.js';
import 'redux';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors-19';
import './slice-C6JLQik8.js';
import '@reduxjs/toolkit';
import 'immer';
import '@redux-saga/core/effects';
import 'reselect';
import 'jsonpath-mapper';
import 'query-string';

var types = {
  navigation: navigation$2,
  routing: routing$1,
  version: version$1
};

const loadNavigationTree = () => action(GET_NODE_TREE);

var navigation$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree
});

var actions = {
  navigation: navigation$1,
  routing: routing$2,
  version: version$2
};

var selectors = {
  navigation: navigation$3,
  routing: routing$3,
  version: version$3
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

export { action, navigation, routing, version };
//# sourceMappingURL=redux.js.map
