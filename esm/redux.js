import 'immutable';
import 'redux';
import 'redux-immutable';
import 'redux-thunk';
import 'redux-saga';
<<<<<<< HEAD
import 'redux-injectors';
import { n as navigation$2, v as version$1, G as GET_NODE_TREE, d as version$2, e as navigation$3 } from './version-8d757fb4.js';
export { f as convertSagaArray, g as injectReducer, i as injectRedux, j as injectSaga, r as store, u as useInjectRedux } from './version-8d757fb4.js';
import { r as routing$1, j as action, k as routing$2 } from './actions-fda5e103.js';
import './reducers-b426d14a.js';
import '@redux-saga/core/effects';
import { v as version$3 } from './version-7fdbd2d5.js';
=======
<<<<<<< HEAD
import { n as navigation$2, v as version$1, G as GET_NODE_TREE, d as version$2, e as navigation$3 } from './navigation-7e82dea2.js';
export { r as store } from './navigation-7e82dea2.js';
=======
import { n as navigation$2, v as version$1, G as GET_NODE_TREE, e as version$2, f as navigation$3, g as version$3 } from './version-048f97a8.js';
export { r as store } from './version-048f97a8.js';
>>>>>>> 8f6a0bd8ed1dfcb4a74b6d35685352d4189a5b5c
import './reducers-7c4796b0.js';
>>>>>>> contensis-14-forgot-change-password
import 'query-string';
import { r as routing$3 } from './selectors-170581d2.js';

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
