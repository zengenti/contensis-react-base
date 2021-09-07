'use strict';

var immutable = require('immutable');

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? immutable.Seq(js).map(fromJSOrdered).toList() : immutable.Seq(js).map(fromJSOrdered).toOrderedMap();
};

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

const defaultAuthenticationState = immutable.Map({
  authenticated: false,
  authenticationError: false,
  authenticationErrorMessage: null,
  clientCredentials: null,
  error: false,
  errorMessage: null,
  loading: false
});
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
const initialUserState = immutable.Map({
  authenticationState: defaultAuthenticationState,
  passwordResetRequest: defaultPasswordResetRequestValues,
  resetPassword: defaultResetPasswordValues,
  changePassword: defaultChangePasswordValues,
  groups: new immutable.List([])
});
var UserReducer = ((state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case LOGOUT_USER:
    case SET_AUTHENTICATION_STATE:
      {
        if (!action.authenticationState) {
          action.authenticationState = defaultAuthenticationState.toJS();
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

        const nextState = { ...initialUserState.toJS(),
          ...(user || state.toJS()),
          authenticationState: {
            authenticated: authenticated || state.getIn(['authenticationState', 'authenticated']),
            authenticationError,
            authenticationErrorMessage,
            clientCredentials,
            error,
            errorMessage,
            loading
          }
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
    case REGISTER_USER_SUCCESS:
      {
        const {
          error,
          user
        } = action; // Set registration object from the supplied action.user
        // so we can call these values back later

        const nextState = state.set('registration', user ? fromJSOrdered(user) : state.get('registration', immutable.Map())); // Set registration flags so the UI can track the status

        return nextState.setIn(['registration', 'success'], action.type === REGISTER_USER_SUCCESS).setIn(['registration', 'error'], error || false).setIn(['registration', 'loading'], action.type === REGISTER_USER);
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
});

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
exports.fromJSOrdered = fromJSOrdered;
exports.initialUserState = initialUserState;
exports.types = types;
//# sourceMappingURL=reducers-0ea95da5.js.map
