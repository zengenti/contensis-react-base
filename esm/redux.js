import 'jsonpath-mapper';
import 'redux';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors';
import 'immer';
import { n as navigation$2, v as version$1, G as GET_NODE_TREE, d as version$2, e as navigation$3 } from './version-e3443e3b.js';
export { f as convertSagaArray, g as injectReducer, i as injectRedux, j as injectSaga, r as store, u as useInjectRedux } from './version-e3443e3b.js';
import { r as routing$1, j as routing$2 } from './actions-eb013a50.js';
import './reducers-d6c0edb1.js';
import '@redux-saga/core/effects';
import { p as action, t as routing$3 } from './selectors-60ba96ae.js';
export { p as action, g as getIn, r as getJS } from './selectors-60ba96ae.js';
import { v as version$3 } from './version-3baf33be.js';
import 'query-string';

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
