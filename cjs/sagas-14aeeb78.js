'use strict';

var immutable = require('immutable');
var routing = require('./routing-1b06bbe2.js');
var effects = require('redux-saga/effects');
var ToJs = require('./ToJs-8dd77129.js');
var contensisManagementApi = require('contensis-management-api');
var awaitToJs = require('await-to-js');
var Cookies = require('js-cookie');
var mapJson = require('jsonpath-mapper');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Cookies__default = /*#__PURE__*/_interopDefaultLegacy(Cookies);
var mapJson__default = /*#__PURE__*/_interopDefaultLegacy(mapJson);

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? immutable.Seq(js).map(fromJSOrdered).toList() : immutable.Seq(js).map(fromJSOrdered).toOrderedMap();
};

const ACTION_PREFIX = '@USER/';
const SET_USER_LOADING = `${ACTION_PREFIX}SET_USER_LOADING`;
const SET_AUTHENTICATION_STATE = `${ACTION_PREFIX}SET_AUTHENTICATION_STATE`;
const LOGIN_USER = `${ACTION_PREFIX}LOGIN_USER`;
const LOGIN_SUCCESSFUL = `${ACTION_PREFIX}LOGIN_SUCCESSFUL`;
const LOGIN_FAILED = `${ACTION_PREFIX}LOGIN_FAILED`;
const LOGOUT_USER = `${ACTION_PREFIX}LOGOUT_USER`;
const CREATE_USER_ACCOUNT = `${ACTION_PREFIX}CREATE_USER_ACCOUNT`;

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

const defaultAuthenticationState = immutable.Map({
  authenticated: false,
  authenticationError: false,
  clientCredentials: null,
  error: false,
  loading: false
});
const initialUserState = immutable.Map({
  authenticationState: defaultAuthenticationState,
  groups: new immutable.List([])
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

  const managementApiClient = contensisManagementApi.Client.create({
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

const _cookie = Cookies__default['default'].withConverter({
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
  bearerTokenExpiryDate: ({
    bearerTokenExpiryDate
  }) => bearerTokenExpiryDate.toISOString(),
  refreshToken: 'refreshToken',
  refreshTokenExpiryDate: ({
    refreshTokenExpiryDate
  }) => refreshTokenExpiryDate.toISOString(),
  contensisClassicToken: 'contensisClassicToken'
};
var mapClientCredentials = (obj => mapJson__default['default'](obj, clientCredentials));

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
      [clientErr, clientBearerToken] = await awaitToJs.to(transientClient.ensureBearerToken());

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
    if (originalPath === url) return;
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

  return contensisManagementApi.Client.create({
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
  [error, user] = await awaitToJs.to(client.security.users.getCurrent());

  if (user && user.id) {
    [error, groupsResult] = await awaitToJs.to(client.security.users.getUserGroups({
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

const userSagas = [effects.takeEvery(LOGIN_USER, loginUserSaga), effects.takeEvery(LOGOUT_USER, logoutUserSaga), effects.takeEvery(SET_AUTHENTICATION_STATE, redirectAfterSuccessfulLoginSaga)];
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
  } = entry && routing.findContentTypeMapping(ContentTypeMappings, entry.sys.contentTypeId) || {}; // if requireLogin, authRoute or authContentType has been specified as an
  // array of groups we can merge the arrays and accept
  // any matched group supplied from either approach

  const routeRequiresGroups = [...(Array.isArray(authContentType) && authContentType || []), ...(Array.isArray(authRoute) && authRoute || []), ...(Array.isArray(requireLogin) && requireLogin || [])];
  const routeRequiresLogin = !!authContentType || !!authRoute || !!requireLogin; // always validate and login user if cookies available on any route change

  yield effects.call(validateUserSaga);

  if (routeRequiresLogin) {
    const userLoggedIn = yield effects.select(ToJs.selectUserIsAuthenticated);

    if (!userLoggedIn) {
      // Because we are using the Client only redirects, they will not
      // take effect during SSR and will cause the page to render the content
      // (as expected)
      LoginHelper.ClientRedirectToSignInPage(action.location.pathname);
    } else if (routeRequiresGroups.length > 0) {
      const userGroups = (yield effects.select(ToJs.selectUserGroups)).toJS();
      const groupMatch = ToJs.matchUserGroup(userGroups, routeRequiresGroups);
      if (!groupMatch) LoginHelper.ClientRedirectToAccessDeniedPage(action.location.pathname);
    }
  }
}

function* redirectAfterSuccessfulLoginSaga() {
  const isLoggedIn = yield effects.select(ToJs.selectUserIsAuthenticated);
  const redirectPath = routing.queryParams((yield effects.select(routing.selectCurrentSearch))).redirect_uri;

  if (isLoggedIn && redirectPath) {
    yield effects.put(routing.setRoute(redirectPath));
  }
}

function* loginUserSaga(action = {}) {
  const {
    username,
    password
  } = action;

  if (username) {
    yield effects.put({
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
    yield effects.put({
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
  yield effects.put({
    type: SET_AUTHENTICATION_STATE,
    user: null
  });
  if (redirectPath) LoginHelper.ClientRedirectToPath(redirectPath);else LoginHelper.ClientRedirectToSignInPage();
}

function* validateUserSaga() {
  const userLoggedIn = yield effects.select(ToJs.selectUserIsAuthenticated);
  if (userLoggedIn) return;
  const credentials = LoginHelper.GetCachedCredentials();

  if (credentials && !userLoggedIn && credentials.refreshToken) {
    yield effects.call(loginUserSaga);
  }
}

function* refreshSecurityToken() {
  const clientCredentials = ((yield effects.select(ToJs.selectClientCredentials)) || immutable.Map()).toJS();

  if (Object.keys(clientCredentials).length > 0) {
    const client = getManagementAPIClient(clientCredentials);
    yield client.authenticate();
    const authenticationState = {};
    const newClientCredentials = mapClientCredentials(client);
    authenticationState.clientCredentials = newClientCredentials;
    yield effects.put({
      type: SET_AUTHENTICATION_STATE,
      authenticationState
    });
  }
}

exports.CREATE_USER_ACCOUNT = CREATE_USER_ACCOUNT;
exports.LOGIN_USER = LOGIN_USER;
exports.LOGOUT_USER = LOGOUT_USER;
exports.LoginHelper = LoginHelper;
exports.UserReducer = UserReducer;
exports.fromJSOrdered = fromJSOrdered;
exports.handleRequiresLoginSaga = handleRequiresLoginSaga;
exports.initialUserState = initialUserState;
exports.refreshSecurityToken = refreshSecurityToken;
exports.types = types;
exports.userSagas = userSagas;
//# sourceMappingURL=sagas-14aeeb78.js.map
