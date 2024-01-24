import { n as navigation$2, v as version$1, G as GET_NODE_TREE, e as version$3 } from './version-3d9911e2.js';
export { r as store } from './version-3d9911e2.js';
import { F as routing$1, E as action, G as routing$2, H as routing$3 } from './selectors-691caf02.js';
export { E as action, g as getIn, I as getJS } from './selectors-691caf02.js';
import { v as version$2, n as navigation$3 } from './version-9f29becb.js';
export { c as convertSagaArray, b as injectReducer, i as injectRedux, d as injectSaga, u as useInjectRedux } from './version-9f29becb.js';
import 'redux';
import 'redux-thunk';
import 'redux-saga';
import 'redux-injectors';
import 'immer';
import './reducers-aa8cef1e.js';
import 'jsonpath-mapper';
import 'query-string';
import '@redux-saga/core/effects';

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
