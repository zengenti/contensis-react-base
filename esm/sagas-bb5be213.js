import { Seq, Map, List } from 'immutable';
import { j as findContentTypeMapping, r as queryParams, t as selectCurrentSearch, u as setRoute } from './routing-1f866fda.js';
import { takeEvery, call, select, put } from 'redux-saga/effects';
import { Client } from 'contensis-management-api';
import { to } from 'await-to-js';
import Cookies from 'js-cookie';
import mapJson from 'jsonpath-mapper';

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? Seq(js).map(fromJSOrdered).toList() : Seq(js).map(fromJSOrdered).toOrderedMap();
};

const ACTION_PREFIX = '@USER/';
const SET_USER_LOADING = `${ACTION_PREFIX}SET_USER_LOADING`;
const SET_AUTHENTICATION_STATE = `${ACTION_PREFIX}SET_AUTHENTICATION_STATE`; // export const UPDATE_USER = `${ACTION_PREFIX}UPDATE_USER`;

const LOGIN_USER = `${ACTION_PREFIX}LOGIN_USER`;
const LOGIN_SUCCESSFUL = `${ACTION_PREFIX}LOGIN_SUCCESSFUL`;
const LOGIN_FAILED = `${ACTION_PREFIX}LOGIN_FAILED`;
const LOGOUT_USER = `${ACTION_PREFIX}LOGOUT_USER`; // export const TOGGLE_LOGIN_MODE = `${ACTION_PREFIX}TOGGLE_LOGIN_MODE`;

const CREATE_USER_ACCOUNT = `${ACTION_PREFIX}CREATE_USER_ACCOUNT`; // export const VALIDATE_USER = `${ACTION_PREFIX}VALIDATE_USER`;
// export const SET_PRE_LOGIN_PATH = `${ACTION_PREFIX}SET_PRE_LOGIN_PATH`;
// export const SET_USER_ENVIRONMENTS = `${ACTION_PREFIX}SET_USER_ENVIRONMENTS`;

var types = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SET_USER_LOADING: SET_USER_LOADING,
  SET_AUTHENTICATION_STATE: SET_AUTHENTICATION_STATE,
  LOGIN_USER: LOGIN_USER,
  LOGIN_SUCCESSFUL: LOGIN_SUCCESSFUL,
  LOGIN_FAILED: LOGIN_FAILED,
  LOGOUT_USER: LOGOUT_USER,
  CREATE_USER_ACCOUNT: CREATE_USER_ACCOUNT
});

const defaultAuthenticationState = Map({
  authenticated: false,
  authenticationError: false,
  clientCredentials: null,
  error: false,
  loading: false
});
const initialUserState = Map({
  authenticationState: defaultAuthenticationState,
  groups: new List([])
});
var UserReducer = ((state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER_LOADING:
    case SET_AUTHENTICATION_STATE:
      {
        if (!action.authenticationState) {
          action.authenticationState = defaultAuthenticationState.toJS();
        }

        const loading = action.type === SET_USER_LOADING;
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
          ...user,
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

    default:
      return state;
  }
});

const selectUserIsLoading = state => {
  return state.getIn(['user', 'authenticationState', 'loading']);
};
const selectUserIsAuthenticated = state => {
  return state.getIn(['user', 'authenticationState', 'authenticated']) && state.getIn(['user']) != null;
};
const selectUserAuthenticationError = state => {
  return state.getIn(['user', 'authenticationState', 'authenticationError']);
};
const selectUserError = state => {
  return state.getIn(['user', 'authenticationState', 'error']);
};
const selectClientCredentials = state => {
  return state.getIn(['user', 'authenticationState', 'clientCredentials']);
};
const selectUser = state => {
  return state.getIn(['user']);
};
const selectUserIsZengentiStaff = state => {
  return state.getIn(['user', 'isZengentiStaff']);
};
const selectUserGuid = state => {
  return state.getIn(['user', 'id']);
};
const selectUsername = state => {
  return state.getIn(['user', 'userName']);
};
const selectUserEmail = state => {
  return state.getIn(['user', 'email']);
};
const selectUserGroups = state => {
  return state.getIn(['user', 'groups']);
};
const selectUserSecurityToken = state => {
  return state.getIn(['user', 'authenticationState', 'clientCredentials', 'contensisClassicToken']);
};
const selectUserMobile = state => {
  return state.getIn(['user', 'custom', 'mobile']);
};
const selectUserLandline = state => {
  return state.getIn(['user', 'custom', 'telephone']);
};
const selectUserCanCallMobileInEmergency = state => {
  return state.getIn(['user', 'custom', 'canCallMobileInEmergency']);
};

var selectors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectUserIsLoading: selectUserIsLoading,
  selectUserIsAuthenticated: selectUserIsAuthenticated,
  selectUserAuthenticationError: selectUserAuthenticationError,
  selectUserError: selectUserError,
  selectClientCredentials: selectClientCredentials,
  selectUser: selectUser,
  selectUserIsZengentiStaff: selectUserIsZengentiStaff,
  selectUserGuid: selectUserGuid,
  selectUsername: selectUsername,
  selectUserEmail: selectUserEmail,
  selectUserGroups: selectUserGroups,
  selectUserSecurityToken: selectUserSecurityToken,
  selectUserMobile: selectUserMobile,
  selectUserLandline: selectUserLandline,
  selectUserCanCallMobileInEmergency: selectUserCanCallMobileInEmergency
});

const getManagementAPIClient = ({
  bearerToken,
  bearerTokenExpiryDate,
  refreshToken,
  refreshTokenExpiryDate,
  contensisClassicToken
}) => {
  const CMS_URL = SERVERS.api;
  /* global SERVERS */

  const projectId = PROJECTS[0].id;
  /* global PROJECTS */

  const managementApiClient = Client.create({
    clientType: 'contensis_classic_refresh_token',
    clientDetails: {
      refreshToken
    },
    projectId: projectId,
    rootUrl: CMS_URL
  });
  if (bearerToken) managementApiClient.bearerToken = bearerToken;
  if (bearerTokenExpiryDate) managementApiClient.bearerTokenExpiryDate = bearerTokenExpiryDate;
  if (refreshToken) managementApiClient.refreshToken = refreshToken;
  if (refreshTokenExpiryDate) managementApiClient.refreshTokenExpiryDate = refreshTokenExpiryDate;
  if (contensisClassicToken) managementApiClient.contensisClassicToken = contensisClassicToken;
  return managementApiClient;
};

const COOKIE_VALID_DAYS = 1; // 0 = Session cookie
// Override the default js-cookie conversion / encoding
// methods so the written values work with Contensis sites

const _cookie = Cookies.withConverter({
  read: value => decodeURIComponent(value),
  write: value => encodeURIComponent(value)
});

class CookieHelper {
  static GetCookie(name) {
    let cookie = _cookie.get(name);

    if (typeof cookie == 'undefined') {
      return null;
    }

    return cookie;
  }

  static SetCookie(name, value, maxAgeDays = COOKIE_VALID_DAYS) {
    maxAgeDays === 0 ? _cookie.set(name, value) : _cookie.set(name, value, {
      expires: maxAgeDays
    });
  }

  static DeleteCookie(name) {
    _cookie.remove(name);
  }

}

const clientCredentials = {
  bearerToken: 'bearerToken',
  bearerTokenExpiryDate: 'bearerTokenExpiryDate',
  refreshToken: 'refreshToken',
  refreshTokenExpiryDate: 'refreshTokenExpiryDate',
  contensisClassicToken: 'contensisClassicToken'
};
var mapClientCredentials = (obj => mapJson(obj, clientCredentials));

/* eslint-disable require-atomic-updates */
const LOGIN_COOKIE = 'ContensisCMSUserName';
const REFRESH_TOKEN_COOKIE = 'RefreshToken';
class LoginHelper {
  static SetLoginCookies(apiClientCredentials) {
    if (apiClientCredentials) {
      CookieHelper.SetCookie(LOGIN_COOKIE, apiClientCredentials.contensisClassicToken);
      CookieHelper.SetCookie(REFRESH_TOKEN_COOKIE, apiClientCredentials.refreshToken);
    }
  }

  static GetCachedCredentials() {
    return {
      bearerToken: null,
      bearerTokenExpiryDate: null,
      refreshToken: CookieHelper.GetCookie(REFRESH_TOKEN_COOKIE),
      refreshTokenExpiryDate: null,
      contensisClassicToken: CookieHelper.GetCookie(LOGIN_COOKIE)
    };
  }

  static ClearCachedCredentials() {
    CookieHelper.DeleteCookie(LOGIN_COOKIE);
    CookieHelper.DeleteCookie(REFRESH_TOKEN_COOKIE);
  }

  static async LoginUser(username, password) {
    if (username && password) {
      // Call LogonUser API
      //const loginResponse = await SecurityApi.LogonUser(username, password);
      const transientClient = LoginHelper.GetClientForAuthentication(username, password); // any error at this point should be treated like a login error

      let clientErr, clientBearerToken;
      [clientErr, clientBearerToken] = await to(transientClient.ensureBearerToken());

      if (clientErr) {
        const authenticationError = clientErr.name.includes('ContensisAuthenticationError');
        return {
          authenticated: false,
          authenticationError: authenticationError,
          error: !authenticationError,
          clientCredentials: null
        };
      }

      if (clientBearerToken) {
        const clientCredentials = mapClientCredentials(transientClient);
        this.SetLoginCookies(clientCredentials);
        return {
          authenticated: true,
          authenticationError: false,
          error: false,
          clientCredentials
        };
      }
    } else {
      // Don't call API if username and/or password empty
      return {
        authenticated: false,
        authenticationError: false,
        error: false,
        clientCredentials: null
      };
    }
  }

  static LogoutUser() {
    LoginHelper.ClearCachedCredentials();
    return initialUserState.toJS();
  }

  static ClientRedirectToHome(location) {
    if (typeof window != 'undefined') {
      let url = '/';

      if (location) {
        const {
          search,
          hash
        } = location.toJS();
        url = search ? `${url}${search}` : url;
        url = hash ? `${url}${hash}` : url;
      }

      window.location.href = url;
    }
  }

  static ClientRedirectToSignInPage(redirectPath) {
    let url = LoginHelper.LOGIN_ROUTE;
    if (typeof redirectPath === 'string') url = `${url}?redirect_uri=${redirectPath}`;
    if (typeof location !== 'undefined' && redirectPath !== LoginHelper.LOGIN_ROUTE) location.href = url;
  }

  static ClientRedirectToAccessDeniedPage(originalPath) {
    let url = LoginHelper.ACCESS_DENIED_ROUTE;
    if (typeof originalPath === 'string') url = `${url}?original_uri=${originalPath}`;
    if (typeof location !== 'undefined') location.href = url;
  }

  static ClientRedirectToPath(redirectPath) {
    if (typeof redirectPath === 'string') {
      if (typeof location !== 'undefined') window.location.href = redirectPath;
    } else LoginHelper.ClientRedirectToHome();
  }

  static isZengentiStaff(email) {
    const emailRefs = ['@zengenti', '@contensis'];
    return emailRefs.some(emailRef => {
      if (email.includes(emailRef)) {
        return true;
      }
    });
  }

}
LoginHelper.CMS_URL = SERVERS.api || SERVERS.cms
/* global SERVERS */
;
LoginHelper.LOGIN_ROUTE = '/account/login';
LoginHelper.ACCESS_DENIED_ROUTE = '/account/access-denied';

LoginHelper.GetClientForAuthentication = (username, password) => {
  const projectId = PROJECTS[0].id;
  /* global PROJECTS */

  return Client.create({
    clientType: 'contensis_classic',
    clientDetails: {
      username,
      password
    },
    projectId: projectId,
    rootUrl: LoginHelper.CMS_URL
  });
};

LoginHelper.GetUserDetails = async clientCredentials => {
  const client = getManagementAPIClient(clientCredentials);
  let error,
      user = {},
      groupsResult;
  [error, user] = await to(client.security.users.getCurrent());

  if (user && user.id) {
    [error, groupsResult] = await to(client.security.users.getUserGroups({
      userId: user.id,
      includeInherited: true
    })); // Set groups attribute in user object to be the items
    // array from the getUserGroups result

    if (groupsResult && groupsResult.items) user.groups = groupsResult.items;
  }

  return {
    error,
    user,
    clientCredentials: mapClientCredentials(client)
  };
};

const userSagas = [takeEvery(LOGIN_USER, loginUserSaga), takeEvery(LOGOUT_USER, logoutUserSaga), takeEvery(SET_AUTHENTICATION_STATE, redirectAfterSuccessfulLoginSaga)];
function* handleRequiresLoginSaga(action) {
  const {
    entry,
    requireLogin,
    routes: {
      ContentTypeMappings
    },
    staticRoute
  } = action; // Check if any of the defined routes have "requireLogin" attribute

  const {
    requireLogin: authRoute
  } = staticRoute && staticRoute.route || {};
  const {
    requireLogin: authContentType
  } = entry && findContentTypeMapping(ContentTypeMappings, entry.sys.contentTypeId) || {}; // if requireLogin, authRoute or authContentType has been specified as an
  // array of groups we can merge the arrays and accept
  // any matched group supplied from either approach

  const routeRequiresGroups = [...(Array.isArray(authContentType) && authContentType || []), ...(Array.isArray(authRoute) && authRoute || []), ...(Array.isArray(requireLogin) && requireLogin || [])];
  const routeRequiresLogin = !!authContentType || !!authRoute || !!requireLogin; // always validate and login user if cookies available on any route change

  yield call(validateUserSaga);

  if (routeRequiresLogin) {
    const userLoggedIn = yield select(selectUserIsAuthenticated);

    if (routeRequiresGroups.length > 0) {
      const userGroups = (yield select(selectUserGroups)).toJS();
      const groupMatch = routeRequiresGroups.some(requiredGroup => {
        return userGroups.some(userGroup => {
          if (requiredGroup.id === userGroup.id) {
            return true;
          }

          if (requiredGroup.name === userGroup.name) {
            return true;
          }
        });
      });
      if (!groupMatch) LoginHelper.ClientRedirectToAccessDeniedPage(action.location.pathname);
    } else if (!userLoggedIn) {
      // Because we are using the Client only redirects, they will not
      // take effect during SSR and will cause the page to render the content
      // (as expected)
      LoginHelper.ClientRedirectToSignInPage(action.location.pathname);
    }
  }
}

function* redirectAfterSuccessfulLoginSaga() {
  const isLoggedIn = yield select(selectUserIsAuthenticated);
  const redirectPath = queryParams((yield select(selectCurrentSearch))).redirect_uri;

  if (isLoggedIn && redirectPath) {
    yield put(setRoute(redirectPath));
  }
}

function* loginUserSaga(action = {}) {
  const {
    username,
    password
  } = action;

  if (username) {
    yield put({
      type: SET_USER_LOADING
    });
  } // The elements we will eventually load into authenticationState


  let clientCredentials = LoginHelper.GetCachedCredentials(),
      error = false,
      authenticated = false,
      authenticationError = false,
      user = null,
      userError = false;

  try {
    if (!username) {
      authenticated = true;
    } else {
      // here we are getting credentials from input username and password
      // and destructuring the return object to our authenticationState elements
      ({
        error,
        authenticated,
        authenticationError,
        clientCredentials
      } = yield LoginHelper.LoginUser(username, password));
    } // If the authenticated variable is true, we should have some clientCredentials
    // continue getting the user's details with those credentials


    if (authenticated) {
      ({
        error: userError,
        user,
        clientCredentials
      } = yield LoginHelper.GetUserDetails(clientCredentials));

      if (userError) {
        error = userError;
        authenticated = false;
        clientCredentials = null;
      }
    }
  } catch (e) {
    error = e;
    authenticated = false;
    clientCredentials = null; // eslint-disable-next-line no-console

    console.log(e);
  } finally {
    yield put({
      type: SET_AUTHENTICATION_STATE,
      authenticationState: {
        clientCredentials,
        authenticated,
        authenticationError,
        error
      },
      user
    });

    if (!authenticated || error) {
      // Clear cookies if auth has failed in any way
      yield LoginHelper.ClearCachedCredentials();
    }
  }
}

function* logoutUserSaga({
  redirectPath
}) {
  yield LoginHelper.LogoutUser();
  yield put({
    type: SET_AUTHENTICATION_STATE,
    user: null
  });
  if (redirectPath) LoginHelper.ClientRedirectToPath(redirectPath);else LoginHelper.ClientRedirectToSignInPage();
}

function* validateUserSaga() {
  const userLoggedIn = yield select(selectUserIsAuthenticated);
  if (userLoggedIn) return;
  const credentials = LoginHelper.GetCachedCredentials();

  if (credentials && !userLoggedIn && credentials.refreshToken) {
    yield call(loginUserSaga);
  }
}

function* refreshSecurityToken() {
  const clientCredentials = yield select(selectClientCredentials).toJS();
  const client = getManagementAPIClient(clientCredentials);
  yield client.authenticate();
  const loginResultObject = {};
  const newClientCredentials = mapClientCredentials(client);
  loginResultObject.clientCredentials = newClientCredentials;
  yield put({
    type: SET_AUTHENTICATION_STATE,
    loginResultObject
  });
}

export { CREATE_USER_ACCOUNT as C, LOGIN_USER as L, UserReducer as U, LOGOUT_USER as a, selectUserError as b, selectUserIsAuthenticated as c, selectUserIsLoading as d, selectUser as e, fromJSOrdered as f, selectors as g, handleRequiresLoginSaga as h, initialUserState as i, LoginHelper as j, refreshSecurityToken as r, selectUserAuthenticationError as s, types as t, userSagas as u };
//# sourceMappingURL=sagas-bb5be213.js.map
