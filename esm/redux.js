import { n as navigation$2, v as version$1, G as GET_NODE_TREE, d as version$2, e as navigation$3 } from './version-06472931.js';
export { f as convertSagaArray, g as injectReducer, i as injectRedux, j as injectSaga, r as store, u as useInjectRedux } from './version-06472931.js';
import { r as routing$1, j as action, k as routing$2 } from './actions-12324830.js';
import { r as routing$3 } from './selectors-ec8355ae.js';
import { v as version$3 } from './version-7fdbd2d5.js';
import '@redux-saga/core/effects';
import 'redux';
import 'redux-immutable';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors';
import 'immutable';
import './reducers-a2b095a1.js';
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

export { navigation, routing, version };
//# sourceMappingURL=redux.js.map
