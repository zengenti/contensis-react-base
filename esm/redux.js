import 'react';
import 'react-redux';
import 'immutable';
import { v as routing$1, p as action, w as routing$3, x as user$3 } from './selectors-99d4c59c.js';
import { r as routing$2 } from './routing-35ccdb5f.js';
import { n as navigation$2, v as version$1, e as GET_NODE_TREE, f as version$2, g as navigation$3, i as version$3 } from './navigation-c5883096.js';
import 'query-string';
import { a as user$1 } from './sagas-9eaded2b.js';
import { u as user$2 } from './actions-e961f7ca.js';
import 'redux-saga/effects';
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
