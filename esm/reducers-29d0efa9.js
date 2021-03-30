import { Seq, Map, List } from 'immutable';

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? Seq(js).map(fromJSOrdered).toList() : Seq(js).map(fromJSOrdered).toOrderedMap();
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
const SET_REQUEST_USER_PASSWORD_RESET_SENDING = `${ACTION_PREFIX}SET_REQUEST_USER_PASSWORD_RESET_SENDING`;
const SET_REQUEST_USER_PASSWORD_RESET_SUCCESS = `${ACTION_PREFIX}SET_REQUEST_USER_PASSWORD_RESET_SUCCESS`;
const SET_REQUEST_USER_PASSWORD_RESET_ERROR = `${ACTION_PREFIX}SET_REQUEST_USER_PASSWORD_RESET_ERROR`;
const SET_RESET_USER_PASSWORD_SENDING = `${ACTION_PREFIX}SET_RESET_USER_PASSWORD_SENDING`;
const SET_RESET_USER_PASSWORD_SUCCESS = `${ACTION_PREFIX}SET_RESET_USER_PASSWORD_SUCCESS`;
const SET_RESET_USER_PASSWORD_ERROR = `${ACTION_PREFIX}SET_RESET_USER_PASSWORD_ERROR`;

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
  SET_REQUEST_USER_PASSWORD_RESET_SENDING: SET_REQUEST_USER_PASSWORD_RESET_SENDING,
  SET_REQUEST_USER_PASSWORD_RESET_SUCCESS: SET_REQUEST_USER_PASSWORD_RESET_SUCCESS,
  SET_REQUEST_USER_PASSWORD_RESET_ERROR: SET_REQUEST_USER_PASSWORD_RESET_ERROR,
  SET_RESET_USER_PASSWORD_SENDING: SET_RESET_USER_PASSWORD_SENDING,
  SET_RESET_USER_PASSWORD_SUCCESS: SET_RESET_USER_PASSWORD_SUCCESS,
  SET_RESET_USER_PASSWORD_ERROR: SET_RESET_USER_PASSWORD_ERROR
});

const defaultAuthenticationState = Map({
  authenticated: false,
  authenticationError: false,
  clientCredentials: null,
  error: false,
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
const initialUserState = Map({
  authenticationState: defaultAuthenticationState,
  passwordResetRequest: defaultPasswordResetRequestValues,
  resetPassword: defaultResetPasswordValues,
  groups: new List([])
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
            authenticated,
            authenticationError = false,
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
            clientCredentials,
            error,
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

        const nextState = state.set('registration', user ? fromJSOrdered(user) : state.get('registration', Map())); // Set registration flags so the UI can track the status

        return nextState.setIn(['registration', 'success'], action.type === REGISTER_USER_SUCCESS).setIn(['registration', 'error'], error || false).setIn(['registration', 'loading'], action.type === REGISTER_USER);
      }

    case SET_REQUEST_USER_PASSWORD_RESET_SENDING:
      return state.setIn(['passwordResetRequest', 'isSending'], true);

    case SET_REQUEST_USER_PASSWORD_RESET_SUCCESS:
      return state.setIn(['passwordResetRequest', 'isSending'], false).setIn(['passwordResetRequest', 'sent'], true);

    case SET_REQUEST_USER_PASSWORD_RESET_ERROR:
      return state.setIn(['passwordResetRequest', 'isSending'], false).setIn(['passwordResetRequest', 'error'], action.error);

    case SET_RESET_USER_PASSWORD_SENDING:
      return state.setIn(['resetPassword', 'isSending'], true);

    case SET_RESET_USER_PASSWORD_SUCCESS:
      return state.setIn(['resetPassword', 'isSending'], false).setIn(['resetPassword', 'sent'], true);

    case SET_RESET_USER_PASSWORD_ERROR:
      return state.setIn(['resetPassword', 'isSending'], false).setIn(['resetPassword', 'error'], action.error);

    default:
      return state;
  }
});

export { LOGIN_USER as L, REGISTER_USER as R, SET_REQUEST_USER_PASSWORD_RESET_SENDING as S, UserReducer as U, VALIDATE_USER as V, REGISTER_USER_SUCCESS as a, REGISTER_USER_FAILED as b, REQUEST_USER_PASSWORD_RESET as c, RESET_USER_PASSWORD as d, SET_REQUEST_USER_PASSWORD_RESET_SUCCESS as e, SET_REQUEST_USER_PASSWORD_RESET_ERROR as f, SET_RESET_USER_PASSWORD_SENDING as g, SET_RESET_USER_PASSWORD_SUCCESS as h, SET_RESET_USER_PASSWORD_ERROR as i, LOGOUT_USER as j, SET_AUTHENTICATION_STATE as k, fromJSOrdered as l, initialUserState as m, types as t };
//# sourceMappingURL=reducers-29d0efa9.js.map
