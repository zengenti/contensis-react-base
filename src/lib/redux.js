import types from '~/core/redux/types';
import actions from '~/core/redux/actions';
import selectors from '~/core/redux/selectors';

export { reduxStore as store } from '~/core/redux/store';

// Remap the objects so they are presented in "feature" hierarchy
// e.g. { routing: { types, actions }, navigation: { types, actions } }
// instead of { types: { routing, navigation }, actions: { routing, navigation } }

export const navigation = {
  types: types.navigation,
  actions: actions.navigation,
  selectors: selectors.navigation,
};
export const routing = {
  types: types.routing,
  actions: actions.routing,
  selectors: selectors.routing,
};
export const user = {
  types: types.user,
  actions: actions.user,
  selectors: selectors.user,
};
export const version = {
  types: types.version,
  actions: actions.version,
  selectors: selectors.version,
};
