const types = require('~/core/redux/types').default;
const actions = require('~/core/redux/actions').default;
const selectors = require('~/core/redux/selectors').default;

// Remap the objects so they are presented in "feature" hierarchy
// e.g. { routing: { types, actions }, navigation: { types, actions } }
// instead of { types: { routing, navigation }, actions: { routing, navigation } }

// Object.entries(types).map(([key, v]) => {
//   exports[key] = {
//     types: v,
//     actions: actions[key],
//     selectors: selectors[key],
//   };
// });

exports.navigation = {
  types: types.navigation,
  actions: actions.navigation,
  selectors: selectors.navigation,
};
exports.routing = {
  types: types.routing,
  actions: actions.routing,
  selectors: selectors.routing,
};
exports.user = {
  types: types.user,
  actions: actions.user,
  selectors: selectors.user,
};
exports.version = {
  types: types.version,
  actions: actions.version,
  selectors: selectors.version,
};
