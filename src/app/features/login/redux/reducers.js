import { List, Map } from 'immutable';
import fromJSOrdered from '~/core/util/fromJSOrdered';
import {
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  SET_AUTHENTICATION_STATE,
  LOGIN_USER,
  LOGOUT_USER,
  SET_REQUEST_USER_PASSWORD_RESET_SENDING,
  SET_REQUEST_USER_PASSWORD_RESET_SUCCESS,
  SET_REQUEST_USER_PASSWORD_RESET_ERROR,
  SET_RESET_USER_PASSWORD_SENDING,
  SET_RESET_USER_PASSWORD_SUCCESS,
  SET_RESET_USER_PASSWORD_ERROR,
} from './types';

const defaultAuthenticationState = Map({
  authenticated: false,
  authenticationError: false,
  clientCredentials: null,
  error: false,
  loading: false,
});

const defaultPasswordResetRequestValues = {
  isSending: false,
  sent: false,
  error: null,
};

const defaultResetPasswordValues = {
  isSending: false,
  sent: false,
  error: null,
};

export const initialUserState = Map({
  authenticationState: defaultAuthenticationState,
  passwordResetRequest: defaultPasswordResetRequestValues,
  resetPassword: defaultResetPasswordValues,
  groups: new List([]),
});

export default (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case LOGOUT_USER:
    case SET_AUTHENTICATION_STATE: {
      if (!action.authenticationState) {
        action.authenticationState = defaultAuthenticationState.toJS();
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
      const nextState = state.set(
        'registration',
        user ? fromJSOrdered(user) : state.get('registration', Map())
      );

      // Set registration flags so the UI can track the status
      return nextState
        .setIn(
          ['registration', 'success'],
          action.type === REGISTER_USER_SUCCESS
        )
        .setIn(['registration', 'error'], error || false)
        .setIn(['registration', 'loading'], action.type === REGISTER_USER);
    }
    case SET_REQUEST_USER_PASSWORD_RESET_SENDING:
      return state.setIn(['passwordResetRequest', 'isSending'], true);
    case SET_REQUEST_USER_PASSWORD_RESET_SUCCESS:
      return state
        .setIn(['passwordResetRequest', 'isSending'], false)
        .setIn(['passwordResetRequest', 'sent'], true);
    case SET_REQUEST_USER_PASSWORD_RESET_ERROR:
      return state
        .setIn(['passwordResetRequest', 'isSending'], false)
        .setIn(['passwordResetRequest', 'error'], action.error);
    case SET_RESET_USER_PASSWORD_SENDING:
      return state.setIn(['resetPassword', 'isSending'], true);
    case SET_RESET_USER_PASSWORD_SUCCESS:
      return state
        .setIn(['resetPassword', 'isSending'], false)
        .setIn(['resetPassword', 'sent'], true);
    case SET_RESET_USER_PASSWORD_ERROR:
      return state
        .setIn(['resetPassword', 'isSending'], false)
        .setIn(['resetPassword', 'error'], action.error);
    default:
      return state;
  }
};
