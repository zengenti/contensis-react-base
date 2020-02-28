const types = require('~/core/redux/types').default;
const actions = require('~/core/redux/actions').default;
const selectors = require('~/core/redux/selectors').default;

const reduxExports = {};

// Remap the objects so they are presented in "feature" hierarchy
// e.g. { routing: { types, actions }, navigation: { types, actions } }
// instead of { types: { routing, navigation }, actions: { routing, navigation } }

Object.entries(types).map(([key, v]) => {
  reduxExports[key] = {
    types: v,
    actions: actions[key],
    selectors: selectors[key],
  };
});

module.exports = reduxExports;
