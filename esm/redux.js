import 'immutable';
import { r as routing$1, k as action, l as routing$2 } from './routing-3bbf9dde.js';
import 'redux';
import 'redux-immutable';
import 'redux-thunk';
import 'redux-saga';
import { n as navigation$2, v as version$1, G as GET_NODE_TREE, d as version$2, e as navigation$3 } from './navigation-7e82dea2.js';
export { r as store } from './navigation-7e82dea2.js';
import './reducers-7c4796b0.js';
import 'query-string';
import { r as routing$3 } from './routing-786c3bb0.js';
import { v as version$3 } from './version-924cf045.js';

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

export { navigation$1 as navigation, routing, user, version };
//# sourceMappingURL=redux.js.map
