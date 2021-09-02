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
  REGISTER_USER_FAILED: REGISTER_USER_FAILED
});

const defaultAuthenticationState = {
  authenticated: false,
  authenticationError: false,
  clientCredentials: null,
  error: false,
  loading: false
};
const initialUserState = {
  authenticationState: defaultAuthenticationState,
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

        state = { ...initialUserState,
          ...(user || state),
          authenticationState: {
            authenticated: authenticated || ((_state = state) === null || _state === void 0 ? void 0 : (_state$authentication = _state.authenticationState) === null || _state$authentication === void 0 ? void 0 : _state$authentication.authenticated),
            authenticationError,
            clientCredentials,
            error,
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

    default:
      return state;
  }
}, initialUserState);

export { LOGIN_USER as L, REGISTER_USER as R, SET_AUTHENTICATION_STATE as S, UserReducer as U, VALIDATE_USER as V, REGISTER_USER_SUCCESS as a, REGISTER_USER_FAILED as b, LOGOUT_USER as c, initialUserState as i, types as t };
//# sourceMappingURL=reducers-42abcaf3.js.map
