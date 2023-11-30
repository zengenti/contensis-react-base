import { takeEvery, put, call, select } from '@redux-saga/core/effects';
import { L as LOGIN_USER, n as LOGOUT_USER, V as VALIDATE_USER, S as SET_AUTHENTICATION_STATE } from './reducers-3d5c37d1.js';
import { a as selectUserIsAuthenticated, b as selectUserGroups, m as matchUserGroup, s as selectClientCredentials } from './ToJs-7233c038.js';
import { q as queryParams, o as selectCurrentSearch, p as setRoute } from './selectors-ff21e98a.js';
import mapJson from 'jsonpath-mapper';
import { to } from 'await-to-js';
import JSCookie from 'js-cookie';

const findContentTypeMapping = (ContentTypeMappings, contentTypeId) => ContentTypeMappings.find(ct => ct.contentTypeID === contentTypeId);

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

// import { Client } from 'contensis-management-api';

const getManagementApiClient = async ({
  bearerToken,
  bearerTokenExpiryDate,
  refreshToken,
  refreshTokenExpiryDate,
  contensisClassicToken,
  username,
  password
}) => {
  const rootUrl = SERVERS.api || SERVERS.cms; /* global SERVERS */
  const projectId = PROJECTS[0].id; /* global PROJECTS */

  let config = {};
  if (refreshToken) {
    config = {
      clientType: 'contensis_classic_refresh_token',
      clientDetails: {
        refreshToken
      }
    };
  } else {
    config = {
      clientType: 'contensis_classic',
      clientDetails: {
        username,
        password
      }
    };
  }
  const {
    Client
  } = await import('contensis-management-api');
  const client = Client.create({
    ...config,
    projectId,
    rootUrl
  });
  if (bearerToken) client.bearerToken = bearerToken;
  if (bearerTokenExpiryDate) client.bearerTokenExpiryDate = bearerTokenExpiryDate;
  if (refreshToken) client.refreshToken = refreshToken;
  if (refreshTokenExpiryDate) client.refreshTokenExpiryDate = refreshTokenExpiryDate;
  if (contensisClassicToken) client.contensisClassicToken = contensisClassicToken;
  return client;
};

const COOKIE_VALID_DAYS = 1; // 0 = Session cookie

// Override the default js-cookie conversion / encoding
// methods so the written values work with Contensis sites
const Cookies = JSCookie.withConverter({
  read: value => decodeURIComponent(value),
  write: value => encodeURIComponent(value)
});
class CookieHelper {
  static GetCookie(name) {
    const cookie = Cookies.get(name);
    if (typeof cookie === 'undefined') {
      return null;
    }
    return cookie;
  }
  static SetCookie(name, value, maxAgeDays = COOKIE_VALID_DAYS) {
    if (maxAgeDays === 0) Cookies.set(name, value);else Cookies.set(name, value, {
      expires: maxAgeDays
    });
  }
  static DeleteCookie(name) {
    Cookies.remove(name);
  }
}

const context$1 = typeof window != 'undefined' ? window : global;
const requireOidc = process.env.NODE_ENV === 'development' ? WSFED_LOGIN === 'true' /* global WSFED_LOGIN */ : context$1.WSFED_LOGIN === 'true';
const servers = SERVERS; /* global SERVERS */

const userManagerConfig = typeof window !== 'undefined' ? {
  authority: `${servers.cms}/authenticate/`,
  client_id: 'WebsiteAdfsClient',
  redirect_uri: window.location.toString(),
  post_logout_redirect_uri: window.location.toString(),
  response_type: 'id_token',
  scope: 'openid',
  filterProtocolClaims: false
} : {};
const createUserManager = async config => {
  if (typeof window !== 'undefined' && requireOidc) {
    try {
      const {
        UserManager
      } = await import( /* webpackChunkName: "oidcclient" */'oidc-client');
      return new UserManager(config);
    } catch (e) {
      console.error('Exception in createUserManager: ', e);
    }
  } else return {};
};

/* eslint-disable require-atomic-updates */
const LOGIN_COOKIE = 'ContensisCMSUserName';
const REFRESH_TOKEN_COOKIE = 'RefreshToken';
const context = typeof window != 'undefined' ? window : global;
class LoginHelper {
  static SetLoginCookies({
    contensisClassicToken,
    refreshToken
  }) {
    console.info('SetLoginCookies:', LOGIN_COOKIE, contensisClassicToken, REFRESH_TOKEN_COOKIE, refreshToken);
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
    if (LoginHelper.WSFED_LOGIN && typeof window !== 'undefined') {
      // remove any oidc keys left over in localStorage
      const {
        localStorage
      } = window;
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (typeof key === 'string' && key.startsWith('oidc.')) keys.push(localStorage.key(i));
      }
      keys.forEach(key => localStorage.removeItem(key));
    }
  }
  static async LoginUser({
    username,
    password,
    clientCredentials
  }) {
    let credentials = clientCredentials;
    let authenticationState = {
      clientCredentials: null,
      isAuthenticated: false,
      isAuthenticationError: false,
      isError: false
    };
    let transientClient;
    let user;
    if (username && password) {
      // Get a management client with username and password
      transientClient = await getManagementApiClient({
        username,
        password
      });

      // Ensure the client has requested a bearer token
      const [loginError, clientBearerToken] = await to(transientClient.ensureBearerToken());

      // Problem getting token with username and password
      if (loginError) {
        authenticationState = {
          clientCredentials: null,
          errorMessage: loginError.message || null,
          isAuthenticated: false,
          isAuthenticationError: loginError.name.includes('ContensisAuthenticationError'),
          isError: true
        };
        LoginHelper.ClearCachedCredentials();
      }

      // Got a token using username and password
      if (clientBearerToken) {
        // Set credentials so we can continue to GetUserDetails
        credentials = mapClientCredentials(transientClient);
        LoginHelper.SetLoginCookies(credentials);
        authenticationState = {
          clientCredentials: credentials,
          isAuthenticated: true,
          isAuthenticationError: false,
          isError: false
        };
      }
    }

    // If we have credentials supplied by a successful username and password login
    // or clientCredentials supplied in the options argument we can continue to
    // fetch the user's details
    if (credentials) {
      const client = transientClient || (await getManagementApiClient(credentials));
      const [error, userDetails] = await LoginHelper.GetUserDetails(client);
      if (error) {
        authenticationState = {
          clientCredentials: null,
          errorMessage: error.message,
          isAuthenticated: false,
          isAuthenticationError: false,
          isError: true
        };
        LoginHelper.ClearCachedCredentials();
      } else {
        // Ensure we get latest refreshToken and contensisClassicToken from the latest client
        const latestCredentials = mapClientCredentials(client);
        LoginHelper.SetLoginCookies(latestCredentials);
        user = userDetails;
        authenticationState = {
          clientCredentials: latestCredentials,
          isAuthenticated: true,
          isAuthenticationError: false,
          isError: false
        };
      }
    }
    return {
      authenticationState,
      user
    };
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
        } = location;
        url = search ? `${url}${search}` : url;
        url = hash ? `${url}${hash}` : url;
      }
      window.location.href = url;
    }
  }
  static async ClientRedirectToSignInPage(redirectPath) {
    if (LoginHelper.WSFED_LOGIN) {
      await LoginHelper.WsFedLogout();
      await LoginHelper.WsFedLogin();
    } else {
      // Standard Contensis Login
      let url = LoginHelper.LOGIN_ROUTE;
      if (typeof redirectPath === 'string') url = `${url}?redirect_uri=${redirectPath}`;
      if (typeof location !== 'undefined' && redirectPath !== LoginHelper.LOGIN_ROUTE) location.replace(url);
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
  static async WsFedLogin(redirectUri) {
    const userManager = await createUserManager(userManagerConfig);
    userManager.signinRedirect({
      scope: 'openid',
      response_type: 'id_token',
      redirect_uri: redirectUri || window.location.toString()
    });
  }
  static RemoveSecurityTokenQuery() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('securitytoken') || params.has('securityToken')) {
      params.delete('securitytoken');
      params.delete('securityToken');
      window.location = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`;
    }
  }
  static async WsFedLogout(redirectPath) {
    await fetch(`${LoginHelper.CMS_URL}/authenticate/logout?jsonResponseRequired=true`, {
      credentials: 'include'
    });
    if (redirectPath) {
      window.location = redirectPath;
    } else {
      // Explicitly check and remove any stale
      // security token that may be in the query string
      LoginHelper.RemoveSecurityTokenQuery();
    }
  }
  static async GetCredentialsForSecurityToken(securityToken) {
    const [error, response] = await to(fetch(`${LoginHelper.CMS_URL}/REST/Contensis/Security/IsAuthenticated`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        securityToken: encodeURIComponent(securityToken)
      })
    }));
    if (error) return [{
      message: 'Failed to fetch credentials'
    }];
    if (response.ok) {
      const [parseError, body] = await to(response.json());
      if (parseError) return [parseError];
      const {
        LogonResult,
        ApplicationData = []
      } = body;
      if (LogonResult !== 0) {
        return [{
          message: 'Security token is invalid',
          data: ApplicationData
        }];
      }
      if (ApplicationData.length > 0) {
        let refreshToken;
        ApplicationData.forEach(item => {
          if (item.Key === 'ContensisSecurityRefreshToken') refreshToken = item.Value;
        });
        if (!refreshToken) {
          return [{
            message: 'Fetch credentials: Unable to find ContensisSecurityRefreshToken'
          }];
        }
        return [undefined, refreshToken];
      } else {
        return [{
          message: 'Fetch credentials: Unable to find ContensisSecurityRefreshToken'
        }];
      }
    } else {
      return [{
        message: `Fetch credentials error: ${response.status} ${response.statusText}`
      }];
    }
  }

  // static isZengentiStaff(email) {
  //   const emailRefs = ['@zengenti', '@contensis'];

  //   return emailRefs.some(emailRef => {
  //     if (email.includes(emailRef)) {
  //       return true;
  //     }
  //   });
  // }
}
LoginHelper.CMS_URL = SERVERS.cms /* global SERVERS */;
LoginHelper.WSFED_LOGIN = process.env.NODE_ENV === 'development' ? WSFED_LOGIN === 'true' /* global WSFED_LOGIN */ : context.WSFED_LOGIN === 'true';
LoginHelper.LOGIN_ROUTE = '/account/login';
LoginHelper.ACCESS_DENIED_ROUTE = '/account/access-denied';
LoginHelper.GetUserDetails = async client => {
  let userError,
    groupsError,
    user = {},
    groupsResult;
  [userError, user] = await to(client.security.users.getCurrent());
  if (user && user.id) {
    [groupsError, groupsResult] = await to(client.security.users.getUserGroups({
      userId: user.id,
      includeInherited: true,
      pageOptions: {
        pageSize: 100
      }
    }));
    // Set groups attribute in user object to be the items
    // array from the getUserGroups result
    if (groupsResult && groupsResult.items) user.groups = groupsResult.items;

    //If groups call fails then log the error but allow the user to login still
    // eslint-disable-next-line no-console
    if (groupsError) console.log(groupsError);
  }
  return [userError, user];
};

const loginSagas = [takeEvery(LOGIN_USER, loginUserSaga), takeEvery(LOGOUT_USER, logoutUserSaga), takeEvery(VALIDATE_USER, validateUserSaga), takeEvery(SET_AUTHENTICATION_STATE, redirectAfterSuccessfulLoginSaga)];
function* handleRequiresLoginSaga(action) {
  var _entry$sys;
  const {
    entry,
    requireLogin,
    routes: {
      ContentTypeMappings
    },
    staticRoute
  } = action;
  let userLoggedIn = yield select(selectUserIsAuthenticated);

  // Check for a securityToken in querystring
  const currentQs = queryParams(yield select(selectCurrentSearch));
  const securityToken = currentQs.securityToken || currentQs.securitytoken;

  // Check if any of the defined routes have "requireLogin" attribute
  const {
    requireLogin: authRoute
  } = staticRoute && staticRoute.route || {};
  const {
    requireLogin: authContentType
  } = entry && findContentTypeMapping(ContentTypeMappings, entry === null || entry === void 0 ? void 0 : (_entry$sys = entry.sys) === null || _entry$sys === void 0 ? void 0 : _entry$sys.contentTypeId) || {};

  // If requireLogin, authRoute or authContentType has been specified as an
  // array of groups we can merge all the arrays and match on any group supplied
  const routeRequiresGroups = [...(Array.isArray(authContentType) && authContentType || []), ...(Array.isArray(authRoute) && authRoute || []), ...(Array.isArray(requireLogin) && requireLogin || [])];
  const routeRequiresLogin = !!authContentType || !!authRoute || !!requireLogin;
  if (!userLoggedIn) {
    // If cookies or securityToken are found on any route change
    // always validate and login the user
    if (routeRequiresLogin) {
      // If routeRequiresLogin do a blocking call that returns userLoggedIn
      userLoggedIn = yield call(validateUserSaga, {
        securityToken
      });
    }
    // otherwise do a non blocking put to handle validation in the background
    else yield put({
      type: VALIDATE_USER,
      securityToken
    });
  }
  if (routeRequiresLogin) {
    // If a security token is in the querystring and we are not already
    // logged in something is wrong and we won't bother going on another redirect loop
    if (!userLoggedIn && !securityToken) {
      LoginHelper.ClientRedirectToSignInPage(action.location.pathname);
    } else if (routeRequiresGroups.length > 0) {
      const userGroups = yield select(selectUserGroups, 'js');
      const groupMatch = matchUserGroup(userGroups, routeRequiresGroups);
      if (!groupMatch) LoginHelper.ClientRedirectToAccessDeniedPage(action.location.pathname);
    }
  }
}
function* validateUserSaga({
  securityToken
}) {
  // Check for refreshToken in cookies
  let clientCredentials = LoginHelper.GetCachedCredentials();
  if (securityToken || clientCredentials.refreshToken) {
    // We only attempt to validate the user if one of the stored
    // tokens are found, in this case we set loading state manually
    // so we don't need to set and unset loading if there are no stored
    yield put({
      type: SET_AUTHENTICATION_STATE,
      authenticationState: {
        isLoading: true
      }
    });
    // If we have just a security token we will call a CMS endpoint
    // and provide us with a RefreshToken cookie we can use during login
    const [error, refreshToken] = yield LoginHelper.GetCredentialsForSecurityToken(securityToken);
    if (refreshToken) {
      // Set cookies and reload values
      LoginHelper.SetLoginCookies({
        contensisClassicToken: securityToken,
        refreshToken
      });
      clientCredentials = LoginHelper.GetCachedCredentials();
    }

    // Log the user in if a refreshToken is found
    if (clientCredentials.refreshToken) yield call(loginUserSaga, {
      clientCredentials
    });else if (error) yield put({
      type: SET_AUTHENTICATION_STATE,
      authenticationState: {
        isError: true,
        errorMessage: (error === null || error === void 0 ? void 0 : error.message) || error && 'toString' in error && error.toString()
      }
    });
  }

  // Tell any callers have we successfully logged in?
  return yield select(selectUserIsAuthenticated);
}
function* loginUserSaga(action = {}) {
  const {
    username,
    password,
    clientCredentials
  } = action;

  // If a WSFED_LOGIN site has dispatched the loginUser action
  // just redirect them to the Identity Provider sign in
  if (action.type === LOGIN_USER && LoginHelper.WSFED_LOGIN) LoginHelper.ClientRedirectToSignInPage();
  const {
    authenticationState,
    user
  } = yield LoginHelper.LoginUser({
    username,
    password,
    clientCredentials
  });
  yield put({
    type: SET_AUTHENTICATION_STATE,
    authenticationState,
    user
  });
}
const removeHostnamePart = path => {
  // eslint-disable-next-line no-console
  console.log(path);
  const relativePath = '/' + path.split('/').splice(3).join('/');
  // eslint-disable-next-line no-console
  console.log(relativePath);
  return relativePath;
};
function* redirectAfterSuccessfulLoginSaga() {
  const isLoggedIn = yield select(selectUserIsAuthenticated);
  const {
    redirect_uri: redirectPath,
    ReturnURL: assetRedirectPath
  } = queryParams(yield select(selectCurrentSearch));
  if (isLoggedIn && assetRedirectPath && typeof window != 'undefined') {
    const path = removeHostnamePart(assetRedirectPath);
    // This has to be a hard href to get the app to
    // leave React and hit the server for the IIS hosted assets
    window.location.href = path;
    // yield put(setRoute(path)); // does not work in this scenario
  } else if (isLoggedIn && redirectPath) {
    yield put(setRoute(redirectPath));
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
function* refreshSecurityToken() {
  const clientCredentials = yield select(selectClientCredentials, 'js');
  if (Object.keys(clientCredentials).length > 0) {
    const client = yield getManagementApiClient(clientCredentials);
    yield client.authenticate();
    yield put({
      type: SET_AUTHENTICATION_STATE,
      authenticationState: {
        clientCredentials: mapClientCredentials(client)
      }
    });
  }
}

export { LoginHelper as L, findContentTypeMapping as f, getManagementApiClient as g, handleRequiresLoginSaga as h, loginSagas as l, refreshSecurityToken as r };
//# sourceMappingURL=login-c3cfb5ad.js.map
