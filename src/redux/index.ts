import types from './types';
import actions from './actions';
import selectors from './selectors';

export { action, getJS, getImmutableOrJS as getIn } from './util';

export { reduxStore as store } from './store/store';

export {
  convertSagaArray,
  injectRedux,
  injectReducer,
  injectSaga,
  useInjectRedux,
} from './store/injectors';

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
export const version = {
  types: types.version,
  actions: actions.version,
  selectors: selectors.version,
};
