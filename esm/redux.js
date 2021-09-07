import 'immutable';
import 'redux';
import 'redux-immutable';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors';
import { n as navigation$2, v as version$1, G as GET_NODE_TREE, d as version$2, e as navigation$3 } from './version-6e0d55c7.js';
export { f as convertSagaArray, g as injectReducer, i as injectRedux, j as injectSaga, r as store, u as useInjectRedux } from './version-6e0d55c7.js';
import { r as routing$1, j as action, k as routing$2 } from './actions-ddd9c623.js';
import './reducers-a2b095a1.js';
import '@redux-saga/core/effects';
import { v as version$3 } from './version-7fdbd2d5.js';
import 'query-string';
import { r as routing$3 } from './selectors-68799788.js';

var types = {
  navigation: navigation$2,
  routing: routing$1,
  version: version$1
};

const loadNavigationTree = () => action(GET_NODE_TREE);

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree
});

var actions = {
  navigation,
  routing: routing$2,
  version: version$2
};

var selectors = {
  navigation: navigation$3,
  routing: routing$3,
  version: version$3
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

export { navigation$1 as navigation, routing, version };
//# sourceMappingURL=redux.js.map
