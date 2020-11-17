import { Seq, Map, List } from 'immutable';
import { j as findContentTypeMapping, q as queryParams, k as selectCurrentSearch, l as setRoute } from './routing-2e22904d.js';
import { takeEvery, call, select, put } from 'redux-saga/effects';
import { s as selectUserIsAuthenticated, a as selectUserGroups, m as matchUserGroup, b as selectClientCredentials } from './ToJs-1c73b10a.js';
import { Client } from 'contensis-management-api';
import mapJson from 'jsonpath-mapper';
import { to } from 'await-to-js';
import Cookies from 'js-cookie';

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? Seq(js).map(fromJSOrdered).toList() : Seq(js).map(fromJSOrdered).toOrderedMap();
};

const ACTION_PREFIX = '@USER/';
const SET_USER_LOADING = `${ACTION_PREFIX}SET_USER_LOADING`;
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
  SET_USER_LOADING: SET_USER_LOADING,
  SET_AUTHENTICATION_STATE: SET_AUTHENTICATION_STATE,
  LOGIN_USER: LOGIN_USER,
  LOGIN_SUCCESSFUL: LOGIN_SUCCESSFUL,
  LOGIN_FAILED: LOGIN_FAILED,
  LOGOUT_USER: LOGOUT_USER,
  REGISTER_USER: REGISTER_USER,
  REGISTER_USER_SUCCESS: REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED: REGISTER_USER_FAILED
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

    default:
      return state;
  }
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

const clientCredentials = {
  bearerToken: 'bearerToken',
  bearerTokenExpiryDate: ({
    bearerTokenExpiryDate
  }) => bearerTokenExpiryDate.toISOString(),
  refreshToken: 'refreshToken',
  refreshTokenExpiryDate: ({
    refreshTokenExpiryDate
  }) => refreshTokenExpiryDate.toISOString(),
  contensisClassicToken: 'contensisClassicToken'
};
var mapClientCredentials = (obj => mapJson(obj, clientCredentials));

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

const context = typeof window != 'undefined' ? window : global;
const requireOidc = process.env.NODE_ENV === 'development' ? WSFED_LOGIN === 'true'
/* global WSFED_LOGIN */
: context.WSFED_LOGIN === 'true';
const servers = SERVERS;
/* global SERVERS */

const userManagerConfig = typeof window !== 'undefined' ? {
  authority: `${servers.cms}/authenticate/`,
  client_id: 'WebsiteAdfsClient',
  redirect_uri: window.location.toString(),
  post_logout_redirect_uri: window.location.toString(),
  response_type: 'id_token',
  scope: 'openid',
  filterProtocolClaims: false
} : {};

const createUserManager = config => {
  if (typeof window !== 'undefined' && requireOidc) {
    try {
      const UserManager = require('oidc-client').UserManager;

      return new UserManager(config);
    } catch (e) {//
    }
  } else return {};
};

const userManager = createUserManager(userManagerConfig);

/* eslint-disable require-atomic-updates */
const LOGIN_COOKIE = 'ContensisCMSUserName';
const REFRESH_TOKEN_COOKIE = 'RefreshToken';
const context$1 = typeof window != 'undefined' ? window : global;
class LoginHelper {
  static SetLoginCookies({
    contensisClassicToken,
    refreshToken
  }) {
    if (contensisClassicToken) CookieHelper.SetCookie(LOGIN_COOKIE, contensisClassicToken);
    if (refreshToken) CookieHelper.SetCookie(REFRESH_TOKEN_COOKIE, refreshToken);
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

  static LogoutUser(redirectPath) {
    LoginHelper.ClearCachedCredentials();

    if (LoginHelper.WSFED_LOGIN) {
      LoginHelper.WsFedLogout(redirectPath);
    } else {
      if (redirectPath) LoginHelper.ClientRedirectToPath(redirectPath);else LoginHelper.ClientRedirectToSignInPage();
    }
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

  static async ClientRedirectToSignInPage(redirectPath) {
    if (LoginHelper.WSFED_LOGIN) {
      await LoginHelper.WsFedLogout();
      LoginHelper.WsFedLogin();
    } else {
      // Standard Contensis Login
      let url = LoginHelper.LOGIN_ROUTE;
      if (typeof redirectPath === 'string') url = `${url}?redirect_uri=${redirectPath}`;
      if (typeof location !== 'undefined' && redirectPath !== LoginHelper.LOGIN_ROUTE) location.href = url;
    }
  }

  static ClientRedirectToAccessDeniedPage(originalPath) {
    let url = LoginHelper.ACCESS_DENIED_ROUTE;
    if (originalPath === url) return;
    if (typeof originalPath === 'string') url = `${url}?original_uri=${originalPath}`;
    if (typeof location !== 'undefined') location.href = url;
  }

  static ClientRedirectToPath(redirectPath) {
    if (typeof redirectPath === 'string') {
      if (typeof location !== 'undefined') window.location.href = redirectPath;
    } else LoginHelper.ClientRedirectToHome();
  }

  static WsFedLogin(redirectUri) {
    userManager.signinRedirect({
      scope: 'openid',
      response_type: 'id_token',
      redirect_uri: redirectUri || window.location.toString()
    });
  }

  static async WsFedLogout(redirectPath) {
    await fetch(`${LoginHelper.CMS_URL}/authenticate/logout?jsonResponseRequired=true`, {
      credentials: 'include'
    });

    if (redirectPath) {
      window.location = redirectPath;
    }
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
LoginHelper.CMS_URL = SERVERS.cms
/* global SERVERS */
;
LoginHelper.WSFED_LOGIN = process.env.NODE_ENV === 'development' ? WSFED_LOGIN === 'true'
/* global WSFED_LOGIN */
: context$1.WSFED_LOGIN === 'true';
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

const loginSagas = [takeEvery(LOGIN_USER, loginUserSaga), takeEvery(LOGOUT_USER, logoutUserSaga), takeEvery(SET_AUTHENTICATION_STATE, redirectAfterSuccessfulLoginSaga)];
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

    if (!userLoggedIn) {
      // Because we are using the Client only redirects, they will not
      // take effect during SSR
      LoginHelper.ClientRedirectToSignInPage(action.location.pathname);
    } else if (routeRequiresGroups.length > 0) {
      const userGroups = (yield select(selectUserGroups)).toJS();
      const groupMatch = matchUserGroup(userGroups, routeRequiresGroups);
      if (!groupMatch) LoginHelper.ClientRedirectToAccessDeniedPage(action.location.pathname);
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
  yield put({
    type: SET_AUTHENTICATION_STATE,
    user: null
  });
  yield LoginHelper.LogoutUser(redirectPath);
}

function* validateUserSaga() {
  // Check if querystring contains a securityToken
  const currentQs = queryParams((yield select(selectCurrentSearch)));
  const securityToken = currentQs.securityToken || currentQs.securitytoken;

  if (securityToken) {
    LoginHelper.SetLoginCookies({
      contensisClassicToken: securityToken
    });

    if (LoginHelper.WSFED_LOGIN) {
      const response = yield fetch(`${LoginHelper.CMS_URL}/REST/Contensis/Security/IsAuthenticated`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          securityToken: encodeURIComponent(securityToken)
        })
      });

      if (response.ok) {
        const responseBody = yield response.json();

        if (responseBody.LogonResult !== 0) ;

        if (!!responseBody.ApplicationData && !!responseBody.ApplicationData.length && responseBody.ApplicationData.length > 1 && // eslint-disable-next-line prettier/prettier
        responseBody.ApplicationData[1].Key === 'ContensisSecurityRefreshToken') {
          const refreshToken = responseBody.ApplicationData[1].Value;
          LoginHelper.SetLoginCookies({
            contensisClassicToken: securityToken,
            refreshToken
          });
        }
      }
    }
  }

  const userLoggedIn = yield select(selectUserIsAuthenticated);
  if (userLoggedIn) return;
  const credentials = LoginHelper.GetCachedCredentials();

  if (securityToken || credentials && !userLoggedIn && credentials.refreshToken) {
    yield call(loginUserSaga);
  }
}

function* refreshSecurityToken() {
  const clientCredentials = ((yield select(selectClientCredentials)) || Map()).toJS();

  if (Object.keys(clientCredentials).length > 0) {
    const client = getManagementAPIClient(clientCredentials);
    yield client.authenticate();
    const authenticationState = {};
    const newClientCredentials = mapClientCredentials(client);
    authenticationState.clientCredentials = newClientCredentials;
    yield put({
      type: SET_AUTHENTICATION_STATE,
      authenticationState
    });
  }
}

export { LOGIN_USER as L, REGISTER_USER as R, UserReducer as U, REGISTER_USER_SUCCESS as a, REGISTER_USER_FAILED as b, LOGOUT_USER as c, LoginHelper as d, fromJSOrdered as f, handleRequiresLoginSaga as h, initialUserState as i, loginSagas as l, refreshSecurityToken as r, types as t };
//# sourceMappingURL=login-1493fdd5.js.map
