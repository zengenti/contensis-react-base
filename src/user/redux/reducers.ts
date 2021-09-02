import { Draft, produce } from 'immer';
import {
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  SET_AUTHENTICATION_STATE,
  LOGIN_USER,
  LOGOUT_USER,
} from './types';

const defaultAuthenticationState = {
  authenticated: false,
  authenticationError: false,
  clientCredentials: null,
  error: false,
  loading: false,
};

export const initialUserState = {
  authenticationState: defaultAuthenticationState,
  groups: [],
};

export default produce((state: Draft<any>, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case LOGOUT_USER:
    case SET_AUTHENTICATION_STATE: {
      if (!action.authenticationState) {
        action.authenticationState = defaultAuthenticationState;
      }

      const loading = action.type === LOGIN_USER;

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

      state = {
        ...initialUserState,
        ...(user || state),
        authenticationState: {
          authenticated:
            authenticated || state?.authenticationState?.authenticated,
          authenticationError,
          clientCredentials,
          error,
          loading,
        },
      };
      return;
    }
    // REGISTER_USER is the trigger to set the user.registration initial state
    // and will set user.registration.loading to true
    // REGISTER_USER_FAILED will unset user.registration.loading and will set
    // the value in user.registration.error
    // REGISTER_USER_SUCCESS will unset user.registration.loading and will
    // set user.registration to the created user from the api response
    case REGISTER_USER:
    case REGISTER_USER_FAILED:
    case REGISTER_USER_SUCCESS: {
      const { error, user } = action;

      // Set registration object from the supplied action.user
      // so we can call these values back later
      state.registration = user || state.registration || {};

      // Set registration flags so the UI can track the status
      state.registration.success = action.type === REGISTER_USER_SUCCESS;
      state.registration.error = error || false;
      state.registration.loading = action.type === REGISTER_USER;
      return;
    }
    default:
      return state;
  }
}, initialUserState);
