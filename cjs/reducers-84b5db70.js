'use strict';

var immer = require('immer');

const ACTION_PREFIX = '@USER/';
const VALIDATE_USER = `${ACTION_PREFIX}VALIDATE_USER`;
const SET_AUTHENTICATION_STATE = `${ACTION_PREFIX}SET_AUTHENTICATION_STATE`;
const LOGIN_USER = `${ACTION_PREFIX}LOGIN_USER`;
const VERIFY_TWO_FA_TOKEN = `${ACTION_PREFIX}VERIFY_TWO_FA_TOKEN`;
const LOGIN_SUCCESSFUL = `${ACTION_PREFIX}LOGIN_SUCCESSFUL`;
const LOGIN_FAILED = `${ACTION_PREFIX}LOGIN_FAILED`;
const LOGOUT_USER = `${ACTION_PREFIX}LOGOUT_USER`;
const REGISTER_USER = `${ACTION_PREFIX}REGISTER_USER`;
const REGISTER_USER_SUCCESS = `${ACTION_PREFIX}REGISTER_USER_SUCCESS`;
const REGISTER_USER_FAILED = `${ACTION_PREFIX}REGISTER_USER_FAILED`;
const REQUEST_USER_PASSWORD_RESET = `${ACTION_PREFIX}REQUEST_USER_PASSWORD_RESET`;
const RESET_USER_PASSWORD = `${ACTION_PREFIX}RESET_USER_PASSWORD`;
const REQUEST_USER_PASSWORD_RESET_SENDING = `${ACTION_PREFIX}REQUEST_USER_PASSWORD_RESET_SENDING`;
const REQUEST_USER_PASSWORD_RESET_SUCCESS = `${ACTION_PREFIX}REQUEST_USER_PASSWORD_RESET_SUCCESS`;
const REQUEST_USER_PASSWORD_RESET_ERROR = `${ACTION_PREFIX}REQUEST_USER_PASSWORD_RESET_ERROR`;
const RESET_USER_PASSWORD_SENDING = `${ACTION_PREFIX}RESET_USER_PASSWORD_SENDING`;
const RESET_USER_PASSWORD_SUCCESS = `${ACTION_PREFIX}RESET_USER_PASSWORD_SUCCESS`;
const RESET_USER_PASSWORD_ERROR = `${ACTION_PREFIX}RESET_USER_PASSWORD_ERROR`;
const CHANGE_USER_PASSWORD = `${ACTION_PREFIX}CHANGE_USER_PASSWORD`;
const CHANGE_USER_PASSWORD_SENDING = `${ACTION_PREFIX}CHANGE_USER_PASSWORD_SENDING`;
const CHANGE_USER_PASSWORD_SUCCESS = `${ACTION_PREFIX}CHANGE_USER_PASSWORD_SUCCESS`;
const CHANGE_USER_PASSWORD_ERROR = `${ACTION_PREFIX}CHANGE_USER_PASSWORD_ERROR`;

var types = /*#__PURE__*/Object.freeze({
  __proto__: null,
  VALIDATE_USER: VALIDATE_USER,
  SET_AUTHENTICATION_STATE: SET_AUTHENTICATION_STATE,
  LOGIN_USER: LOGIN_USER,
  VERIFY_TWO_FA_TOKEN: VERIFY_TWO_FA_TOKEN,
  LOGIN_SUCCESSFUL: LOGIN_SUCCESSFUL,
  LOGIN_FAILED: LOGIN_FAILED,
  LOGOUT_USER: LOGOUT_USER,
  REGISTER_USER: REGISTER_USER,
  REGISTER_USER_SUCCESS: REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED: REGISTER_USER_FAILED,
  REQUEST_USER_PASSWORD_RESET: REQUEST_USER_PASSWORD_RESET,
  RESET_USER_PASSWORD: RESET_USER_PASSWORD,
  REQUEST_USER_PASSWORD_RESET_SENDING: REQUEST_USER_PASSWORD_RESET_SENDING,
  REQUEST_USER_PASSWORD_RESET_SUCCESS: REQUEST_USER_PASSWORD_RESET_SUCCESS,
  REQUEST_USER_PASSWORD_RESET_ERROR: REQUEST_USER_PASSWORD_RESET_ERROR,
  RESET_USER_PASSWORD_SENDING: RESET_USER_PASSWORD_SENDING,
  RESET_USER_PASSWORD_SUCCESS: RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_ERROR: RESET_USER_PASSWORD_ERROR,
  CHANGE_USER_PASSWORD: CHANGE_USER_PASSWORD,
  CHANGE_USER_PASSWORD_SENDING: CHANGE_USER_PASSWORD_SENDING,
  CHANGE_USER_PASSWORD_SUCCESS: CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_ERROR: CHANGE_USER_PASSWORD_ERROR
});

const defaultAuthenticationState = {
  requiresTwoFa: false,
  clientCredentials: null,
  errorMessage: null,
  isAuthenticated: false,
  isAuthenticationError: false,
  isError: false,
  isLoading: false
};
const defaultPasswordResetRequestValues = {
  isSending: false,
  sent: false,
  error: null
};
const defaultResetPasswordValues = {
  isSending: false,
  sent: false,
  error: null
};
const defaultChangePasswordValues = {
  isSending: false,
  sent: false,
  error: null
};
const defaultRegistrationValues = {
  isLoading: false,
  success: false,
  error: null
};
const initialUserState = {
  authenticationState: defaultAuthenticationState,
  passwordResetRequest: defaultPasswordResetRequestValues,
  resetPassword: defaultResetPasswordValues,
  changePassword: defaultChangePasswordValues,
  groups: []
};
var UserReducer = immer.produce((state, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      {
        return initialUserState;
      }
    case LOGIN_USER:
    case SET_AUTHENTICATION_STATE:
      {
        var _state, _state$authentication;
        if (!action.authenticationState) {
          action.authenticationState = defaultAuthenticationState;
        }
        const {
          authenticationState: {
            requiresTwoFa = false,
            clientCredentials = null,
            errorMessage = null,
            isAuthenticated,
            isAuthenticationError = false,
            isError = false,
            isLoading = action.type === LOGIN_USER
          },
          user
        } = action;

        // userObj is so we aren't trying to modify user prop directly, as it can be immutable
        const userObj = {};
        if (user) {
          userObj.name = `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}` || null;
          userObj.isZengentiStaff = user.email.includes('@zengenti.com');
        }
        state = {
          ...initialUserState,
          ...(user || state),
          ...userObj,
          authenticationState: {
            requiresTwoFa,
            clientCredentials,
            errorMessage,
            isAuthenticated: isAuthenticated || ((_state = state) === null || _state === void 0 ? void 0 : (_state$authentication = _state.authenticationState) === null || _state$authentication === void 0 ? void 0 : _state$authentication.isAuthenticated),
            isAuthenticationError,
            isError,
            isLoading
          }
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
    case REGISTER_USER_SUCCESS:
      {
        const {
          error,
          user
        } = action;

        // Set registration object from the supplied action.user
        // so we can call these values back later
        state.registration = user || state.registration || defaultRegistrationValues;

        // Set registration flags so the UI can track the status
        state.registration.success = action.type === REGISTER_USER_SUCCESS;
        state.registration.error = error || false;
        state.registration.isLoading = action.type === REGISTER_USER;
        return;
      }
    case REQUEST_USER_PASSWORD_RESET_SENDING:
      if (state.passwordResetRequest) {
        state.passwordResetRequest = {
          ...defaultPasswordResetRequestValues
        };
        state.passwordResetRequest.isSending = true;
      }
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

exports.CHANGE_USER_PASSWORD = CHANGE_USER_PASSWORD;
exports.CHANGE_USER_PASSWORD_ERROR = CHANGE_USER_PASSWORD_ERROR;
exports.CHANGE_USER_PASSWORD_SENDING = CHANGE_USER_PASSWORD_SENDING;
exports.CHANGE_USER_PASSWORD_SUCCESS = CHANGE_USER_PASSWORD_SUCCESS;
exports.LOGIN_USER = LOGIN_USER;
exports.LOGOUT_USER = LOGOUT_USER;
exports.REGISTER_USER = REGISTER_USER;
exports.REGISTER_USER_FAILED = REGISTER_USER_FAILED;
exports.REGISTER_USER_SUCCESS = REGISTER_USER_SUCCESS;
exports.REQUEST_USER_PASSWORD_RESET = REQUEST_USER_PASSWORD_RESET;
exports.REQUEST_USER_PASSWORD_RESET_ERROR = REQUEST_USER_PASSWORD_RESET_ERROR;
exports.REQUEST_USER_PASSWORD_RESET_SENDING = REQUEST_USER_PASSWORD_RESET_SENDING;
exports.REQUEST_USER_PASSWORD_RESET_SUCCESS = REQUEST_USER_PASSWORD_RESET_SUCCESS;
exports.RESET_USER_PASSWORD = RESET_USER_PASSWORD;
exports.RESET_USER_PASSWORD_ERROR = RESET_USER_PASSWORD_ERROR;
exports.RESET_USER_PASSWORD_SENDING = RESET_USER_PASSWORD_SENDING;
exports.RESET_USER_PASSWORD_SUCCESS = RESET_USER_PASSWORD_SUCCESS;
exports.SET_AUTHENTICATION_STATE = SET_AUTHENTICATION_STATE;
exports.UserReducer = UserReducer;
exports.VALIDATE_USER = VALIDATE_USER;
exports.VERIFY_TWO_FA_TOKEN = VERIFY_TWO_FA_TOKEN;
exports.initialUserState = initialUserState;
exports.types = types;
//# sourceMappingURL=reducers-84b5db70.js.map
