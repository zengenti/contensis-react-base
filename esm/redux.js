import 'react';
import 'react-redux';
import 'immutable';
import { v as routing$1, p as action, w as routing$3, x as user$3 } from './selectors-19e46385.js';
import { r as routing$2 } from './routing-8a773443.js';
import { n as navigation$2, v as version$1, e as GET_NODE_TREE, f as version$2, g as navigation$3, i as version$3 } from './navigation-a6d0c98f.js';
import 'query-string';
import { a as user$1 } from './sagas-4f97f9e8.js';
import { u as user$2 } from './actions-37430b30.js';
import '@redux-saga/core/effects';
import 'js-cookie';

var types = {
  navigation: navigation$2,
  routing: routing$1,
  user: user$1,
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
  user: user$2,
  version: version$2
};

var selectors = {
  navigation: navigation$3,
  routing: routing$3,
  user: user$3,
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
