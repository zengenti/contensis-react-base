import { Draft, produce } from 'immer';
import { AppState } from '~/redux/appstate';
import {
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  SET_AUTHENTICATION_STATE,
  LOGIN_USER,
  LOGOUT_USER,
  REQUEST_USER_PASSWORD_RESET_SENDING,
  REQUEST_USER_PASSWORD_RESET_SUCCESS,
  REQUEST_USER_PASSWORD_RESET_ERROR,
  RESET_USER_PASSWORD_SENDING,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_ERROR,
  CHANGE_USER_PASSWORD_SENDING,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_ERROR,
} from './types';

const defaultAuthenticationState = {
  clientCredentials: null,
  errorMessage: null,
  isAuthenticated: false,
  isAuthenticationError: false,
  isError: false,
  isLoading: false,
};

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

const defaultChangePasswordValues = {
  isSending: false,
  sent: false,
  error: null,
};

const defaultRegistrationValues = {
  isLoading: false,
  success: false,
  error: null,
};

export const initialUserState = {
  authenticationState: defaultAuthenticationState,
  passwordResetRequest: defaultPasswordResetRequestValues,
  resetPassword: defaultResetPasswordValues,
  changePassword: defaultChangePasswordValues,
  groups: [],
};

export default produce((state: Draft<AppState['user']>, action) => {
  switch (action.type) {
    case LOGOUT_USER: {
      return initialUserState;
    }
    case LOGIN_USER:
    case SET_AUTHENTICATION_STATE: {
      if (!action.authenticationState) {
        action.authenticationState = defaultAuthenticationState;
      }

      const {
        authenticationState: {
          clientCredentials = null,
          errorMessage = null,
          isAuthenticated,
          isAuthenticationError = false,
          isError = false,
          isLoading = action.type === LOGIN_USER,
        },
        user,
      } = action;

      if (user) {
        user.name =
          `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}` ||
          null;
        user.isZengentiStaff = user.email.includes('@zengenti.com');
      }

      state = {
        ...initialUserState,
        ...(user || state),
        authenticationState: {
          clientCredentials,
          errorMessage,
          isAuthenticated:
            isAuthenticated || state?.authenticationState?.isAuthenticated,
          isAuthenticationError,
          isError,
          isLoading,
        },
      };
      return state;
    }
    // REGISTER_USER is the trigger to set the user.registration initial state
    // and will set user.registration.isLoading to true
    // REGISTER_USER_FAILED will unset user.registration.isLoading and will set
    // the value in user.registration.error
    // REGISTER_USER_SUCCESS will unset user.registration.isLoading and will
    // set user.registration to the created user from the api response
    case REGISTER_USER:
    case REGISTER_USER_FAILED:
    case REGISTER_USER_SUCCESS: {
      const { error, user } = action;

      // Set registration object from the supplied action.user
      // so we can call these values back later
      state.registration = (user ||
        state.registration ||
        defaultRegistrationValues) as typeof defaultRegistrationValues;

      // Set registration flags so the UI can track the status
      state.registration.success = action.type === REGISTER_USER_SUCCESS;
      state.registration.error = error || false;
      state.registration.isLoading = action.type === REGISTER_USER;
      return;
    }
    case REQUEST_USER_PASSWORD_RESET_SENDING:
      state.passwordResetRequest = defaultPasswordResetRequestValues;
      state.passwordResetRequest.isSending = true;
      return;
    case REQUEST_USER_PASSWORD_RESET_SUCCESS:
      if (state.passwordResetRequest) {
        state.passwordResetRequest.isSending = false;
        state.passwordResetRequest.sent = true;
      }
      return;
    case REQUEST_USER_PASSWORD_RESET_ERROR:
      if (state.passwordResetRequest) {
        state.passwordResetRequest.isSending = false;
        state.passwordResetRequest.error = action.error;
      }
      return;
    case RESET_USER_PASSWORD_SENDING:
      if (state.resetPassword) {
        state.resetPassword.isSending = true;
      }
      return;
    case RESET_USER_PASSWORD_SUCCESS:
      if (state.resetPassword) {
        state.resetPassword.isSending = false;
        state.resetPassword.sent = true;
      }
      return;
    case RESET_USER_PASSWORD_ERROR:
      if (state.resetPassword) {
        state.resetPassword.isSending = false;
        state.resetPassword.error = action.error;
      }
      return;
    case CHANGE_USER_PASSWORD_SENDING:
      if (state.changePassword) {
        state.changePassword.isSending = true;
      }
      return;
    case CHANGE_USER_PASSWORD_SUCCESS:
      if (state.changePassword) {
        state.changePassword.isSending = false;
        state.changePassword.sent = true;
      }
      return;
    case CHANGE_USER_PASSWORD_ERROR:
      if (state.changePassword) {
        state.changePassword.isSending = false;
        state.changePassword.error = action.error;
      }
      return;
    default:
      return;
  }
}, initialUserState);
