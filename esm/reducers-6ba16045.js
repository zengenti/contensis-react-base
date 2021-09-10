import { produce } from 'immer';

const ACTION_PREFIX = '@USER/';
const VALIDATE_USER = `${ACTION_PREFIX}VALIDATE_USER`;
const SET_AUTHENTICATION_STATE = `${ACTION_PREFIX}SET_AUTHENTICATION_STATE`;
const LOGIN_USER = `${ACTION_PREFIX}LOGIN_USER`;
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
  authenticated: false,
  authenticationError: false,
  authenticationErrorMessage: null,
  clientCredentials: null,
  error: false,
  errorMessage: null,
  loading: false
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
const initialUserState = {
  authenticationState: defaultAuthenticationState,
  passwordResetRequest: defaultPasswordResetRequestValues,
  resetPassword: defaultResetPasswordValues,
  changePassword: defaultChangePasswordValues,
  groups: []
};
var UserReducer = produce((state, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case LOGOUT_USER:
    case SET_AUTHENTICATION_STATE:
      {
        var _state, _state$authentication;

        if (!action.authenticationState) {
          action.authenticationState = defaultAuthenticationState;
        }

        const loading = action.type === LOGIN_USER;
        const {
          authenticationState: {
            error = false,
            errorMessage = null,
            authenticated,
            authenticationError = false,
            authenticationErrorMessage = null,
            clientCredentials = null
          },
          user
        } = action;

        if (user) {
          user.name = `${user.firstName} ${user.lastName}`;
          user.isZengentiStaff = user.email.includes('@zengenti.com');
        }

        state = { ...initialUserState,
          ...(user || state),
          authenticationState: {
            authenticated: authenticated || ((_state = state) === null || _state === void 0 ? void 0 : (_state$authentication = _state.authenticationState) === null || _state$authentication === void 0 ? void 0 : _state$authentication.authenticated),
            authenticationError,
            authenticationErrorMessage,
            clientCredentials,
            error,
            errorMessage,
            loading
          }
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
    case REGISTER_USER_SUCCESS:
      {
        const {
          error,
          user
        } = action; // Set registration object from the supplied action.user
        // so we can call these values back later

        state.registration = user || state.registration || {}; // Set registration flags so the UI can track the status

        state.registration.success = action.type === REGISTER_USER_SUCCESS;
        state.registration.error = error || false;
        state.registration.loading = action.type === REGISTER_USER;
        return;
      }

    case REQUEST_USER_PASSWORD_RESET_SENDING:
      return state.setIn(['passwordResetRequest', 'isSending'], true);

    case REQUEST_USER_PASSWORD_RESET_SUCCESS:
      return state.setIn(['passwordResetRequest', 'isSending'], false).setIn(['passwordResetRequest', 'sent'], true);

    case REQUEST_USER_PASSWORD_RESET_ERROR:
      return state.setIn(['passwordResetRequest', 'isSending'], false).setIn(['passwordResetRequest', 'error'], action.error);

    case RESET_USER_PASSWORD_SENDING:
      return state.setIn(['resetPassword', 'isSending'], true);

    case RESET_USER_PASSWORD_SUCCESS:
      return state.setIn(['resetPassword', 'isSending'], false).setIn(['resetPassword', 'sent'], true);

    case RESET_USER_PASSWORD_ERROR:
      return state.setIn(['changePassword', 'isSending'], false).setIn(['changePassword', 'error'], action.error);

    case CHANGE_USER_PASSWORD_SENDING:
      return state.setIn(['changePassword', 'isSending'], true);

    case CHANGE_USER_PASSWORD_SUCCESS:
      return state.setIn(['changePassword', 'isSending'], false).setIn(['changePassword', 'sent'], true);

    case CHANGE_USER_PASSWORD_ERROR:
      return state.setIn(['changePassword', 'isSending'], false).setIn(['changePassword', 'error'], action.error);

    default:
      return state;
  }
}, initialUserState);

export { CHANGE_USER_PASSWORD as C, LOGIN_USER as L, REGISTER_USER as R, SET_AUTHENTICATION_STATE as S, UserReducer as U, VALIDATE_USER as V, REGISTER_USER_SUCCESS as a, REGISTER_USER_FAILED as b, REQUEST_USER_PASSWORD_RESET as c, RESET_USER_PASSWORD as d, REQUEST_USER_PASSWORD_RESET_SENDING as e, REQUEST_USER_PASSWORD_RESET_SUCCESS as f, REQUEST_USER_PASSWORD_RESET_ERROR as g, RESET_USER_PASSWORD_SENDING as h, RESET_USER_PASSWORD_SUCCESS as i, RESET_USER_PASSWORD_ERROR as j, CHANGE_USER_PASSWORD_ERROR as k, CHANGE_USER_PASSWORD_SENDING as l, CHANGE_USER_PASSWORD_SUCCESS as m, LOGOUT_USER as n, initialUserState as o, types as t };
//# sourceMappingURL=reducers-6ba16045.js.map
