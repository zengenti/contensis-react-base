import { List, Map } from 'immutable';
import fromJSOrdered from '~/core/util/fromJSOrdered';
import { SET_USER_LOADING, SET_AUTHENTICATION_STATE } from './types';

const defaultAuthenticationState = Map({
  authenticated: false,
  authenticationError: false,
  clientCredentials: null,
  error: false,
  loading: false,
});

export const initialUserState = Map({
  authenticationState: defaultAuthenticationState,
  groups: new List([]),
});

export default (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER_LOADING:
    case SET_AUTHENTICATION_STATE: {
      if (!action.authenticationState) {
        action.authenticationState = defaultAuthenticationState.toJS();
      }

      const loading = action.type === SET_USER_LOADING;

      const {
        authenticationState: {
          error = false,
          authenticated,
          authenticationError = false,
          clientCredentials = null,
        },
        user,
      } = action;

      if (user) {
        user.name = `${user.firstName} ${user.lastName}`;
        user.isZengentiStaff = user.email.includes('@zengenti.com');
      }

      const nextState = {
        ...initialUserState.toJS(),
        ...(user || state.toJS()),
        authenticationState: {
          authenticated:
            authenticated ||
            state.getIn(['authenticationState', 'authenticated']),
          authenticationError,
          clientCredentials,
          error,
          loading,
        },
      };
      return fromJSOrdered(nextState);
    }
    default:
      return state;
  }
};
