import { takeEvery, put, call, select } from '@redux-saga/core/effects';
import { L as LOGIN_USER, n as LOGOUT_USER, V as VALIDATE_USER, S as SET_AUTHENTICATION_STATE, R as REGISTER_USER, c as REQUEST_USER_PASSWORD_RESET, d as RESET_USER_PASSWORD, C as CHANGE_USER_PASSWORD } from './reducers-3d5c37d1.js';
import { a as selectUserIsAuthenticated, b as selectUserGroups, m as matchUserGroup, s as selectClientCredentials, C as CookieHelper, c as selectUserErrorMessage, d as selectUserIsAuthenticationError, e as selectUserIsError, f as selectUserIsLoading, g as selectUser, t as toJS, h as selectUserRegistrationError, i as selectUserRegistrationIsLoading, j as selectUserRegistrationIsSuccess, k as selectUserRegistration, l as selectPasswordResetRequestSending, n as selectPasswordResetRequestSent, o as selectPasswordResetRequestError, p as selectResetPasswordSending, q as selectResetPasswordSent, r as selectResetPasswordError, u as selectChangePasswordSending, v as selectChangePasswordSent, w as selectUserGuid, x as selectChangePasswordError } from './ToJs-e50a9380.js';
import { q as queryParams, o as selectCurrentSearch, p as setRoute, E as action } from './selectors-5ed5ae70.js';
import mapJson from 'jsonpath-mapper';
import { to } from 'await-to-js';
import { L as LOGIN_COOKIE, R as REFRESH_TOKEN_COOKIE } from './CookieConstants-3d3b6531.js';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

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
  let {
    Client
  } = await import('contensis-management-api');
  if (typeof window === 'undefined') {
    const {
      UniversalClient
    } = await import('contensis-management-api');
    Client = UniversalClient;
  }
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
const context = typeof window != 'undefined' ? window : global;
class LoginHelper {
  constructor(cookies) {
    this.cookies = void 0;
    this.cookies = cookies;
  }
  SetLoginCookies({
    contensisClassicToken,
    refreshToken
  }) {
    console.info('SetLoginCookies:', LOGIN_COOKIE, contensisClassicToken, REFRESH_TOKEN_COOKIE, refreshToken);
    if (contensisClassicToken) this.cookies.SetCookie(LOGIN_COOKIE, contensisClassicToken);
    if (refreshToken) this.cookies.SetCookie(REFRESH_TOKEN_COOKIE, refreshToken);
  }
  GetCachedCredentials() {
    return {
      bearerToken: null,
      bearerTokenExpiryDate: null,
      refreshToken: this.cookies.GetCookie(REFRESH_TOKEN_COOKIE),
      refreshTokenExpiryDate: null,
      contensisClassicToken: this.cookies.GetCookie(LOGIN_COOKIE)
    };
  }
  ClearCachedCredentials() {
    this.cookies.DeleteCookie(LOGIN_COOKIE);
    this.cookies.DeleteCookie(REFRESH_TOKEN_COOKIE);
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
  async LoginUser({
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
        this.ClearCachedCredentials();
      }

      // Got a token using username and password
      if (clientBearerToken) {
        // Set credentials so we can continue to GetUserDetails
        credentials = mapClientCredentials(transientClient);
        this.SetLoginCookies(credentials);
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
        this.ClearCachedCredentials();
      } else {
        // Ensure we get latest refreshToken and contensisClassicToken from the latest client
        const latestCredentials = mapClientCredentials(client);
        this.SetLoginCookies(latestCredentials);
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
  LogoutUser(redirectPath) {
    this.ClearCachedCredentials();
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
    if (typeof location === 'undefined') return;
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
  static GetAccessDeniedRoute(originalPath) {
    let url = LoginHelper.ACCESS_DENIED_ROUTE;
    if (originalPath !== url && typeof originalPath === 'string') url = `${url}?original_uri=${originalPath}`;
    return url;
  }
  static ClientRedirectToAccessDeniedPage(originalPath) {
    if (typeof location !== 'undefined') location.href = LoginHelper.GetAccessDeniedRoute(originalPath);
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
        console.info(`Security token is invalid - LogonResult: ${LogonResult}`);
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
LoginHelper.withCookies = cookieHelper => new LoginHelper(cookieHelper);
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
    cookies,
    entry,
    path,
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
      console.info(`Route requires login: ${path}`);
      // If routeRequiresLogin do a blocking call that returns userLoggedIn
      userLoggedIn = yield call(validateUserSaga, {
        cookies,
        securityToken
      });
      console.info(`User logged in: ${userLoggedIn}`);
    }
    // otherwise do a non blocking put to handle validation in the background
    else yield put({
      type: VALIDATE_USER,
      cookies,
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
  return userLoggedIn;
}
function* validateUserSaga({
  cookies,
  securityToken
}) {
  const login = LoginHelper.withCookies(cookies);
  // Check for refreshToken in cookies
  let clientCredentials = login.GetCachedCredentials();
  if (securityToken || clientCredentials.securityToken || clientCredentials.refreshToken) {
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
    if (securityToken || clientCredentials.securityToken && !clientCredentials.refreshToken) {
      const [error, refreshToken] = yield LoginHelper.GetCredentialsForSecurityToken(securityToken || clientCredentials.securityToken);
      if (refreshToken) {
        // Set cookies and reload values
        login.SetLoginCookies({
          contensisClassicToken: securityToken,
          refreshToken
        });
        clientCredentials = login.GetCachedCredentials();
      }
      if (error) {
        login.ClearCachedCredentials();
        yield put({
          type: SET_AUTHENTICATION_STATE,
          authenticationState: {
            isError: true,
            errorMessage: (error === null || error === void 0 ? void 0 : error.message) || error && 'toString' in error && error.toString()
          }
        });
      }
    }

    // Log the user in if a refreshToken is found
    if (clientCredentials.refreshToken) {
      console.info(`Login user with refreshToken ${clientCredentials.refreshToken}`);
      yield call(loginUserSaga, {
        clientCredentials,
        cookies: login.cookies
      });
    }
  }

  // Tell any callers have we successfully logged in?
  return yield select(selectUserIsAuthenticated);
}
function* loginUserSaga(action = {}) {
  const {
    username,
    password,
    clientCredentials,
    cookies
  } = action;
  const login = LoginHelper.withCookies(cookies);

  // If a WSFED_LOGIN site has dispatched the loginUser action
  // just redirect them to the Identity Provider sign in
  if (action.type === LOGIN_USER && LoginHelper.WSFED_LOGIN) LoginHelper.ClientRedirectToSignInPage();
  const {
    authenticationState,
    user
  } = yield login.LoginUser({
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
  redirectPath,
  cookies
}) {
  yield put({
    type: SET_AUTHENTICATION_STATE,
    user: null
  });
  yield LoginHelper.withCookies(cookies).LogoutUser(redirectPath);
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

const loginUser = (username, password, cookies) => action(LOGIN_USER, {
  username,
  password,
  cookies
});
const logoutUser = (redirectPath, cookies) => action(LOGOUT_USER, {
  redirectPath,
  cookies
});
const registerUser = (user, mappers) => action(REGISTER_USER, {
  user,
  mappers
});
const requestPasswordReset = userEmailObject => action(REQUEST_USER_PASSWORD_RESET, {
  userEmailObject
});
const resetPassword = resetPasswordObject => action(RESET_USER_PASSWORD, {
  resetPasswordObject
});
const changePassword = (userId, currentPassword, newPassword) => action(CHANGE_USER_PASSWORD, {
  userId,
  currentPassword,
  newPassword
});

var actions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loginUser: loginUser,
  logoutUser: logoutUser,
  registerUser: registerUser,
  requestPasswordReset: requestPasswordReset,
  resetPassword: resetPassword,
  changePassword: changePassword
});

const useLogin = () => {
  const cookies = new CookieHelper(...useCookies());
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password, cookies)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath, cookies)),
    errorMessage: select(selectUserErrorMessage),
    isAuthenticated: select(selectUserIsAuthenticated),
    isAuthenticationError: select(selectUserIsAuthenticationError),
    isError: select(selectUserIsError),
    isLoading: select(selectUserIsLoading),
    user: select(selectUser),
    // DEPRECATED: authenticationError is deprecated use isAuthenticationError instead
    authenticationError: select(selectUserIsAuthenticationError),
    // DEPRECATED: authenticationErrorMessage is deprecated use errorMessage instead
    authenticationErrorMessage: select(selectUserErrorMessage),
    // DEPRECATED: error is deprecated use isError instead
    error: select(selectUserIsError)
  };
};

const LoginContainer = ({
  children,
  ...props
}) => {
  const userProps = useLogin();
  return children(userProps);
};
LoginContainer.propTypes = {};
var Login_container = toJS(LoginContainer);

const useRegistration = () => {
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    registerUser: (user, mappers) => dispatch(registerUser(user, mappers)),
    error: select(selectUserRegistrationError),
    isLoading: select(selectUserRegistrationIsLoading),
    isSuccess: select(selectUserRegistrationIsSuccess),
    user: select(selectUserRegistration)
  };
};

const RegistrationContainer = ({
  children,
  ...props
}) => {
  const userProps = useRegistration();
  return children(userProps);
};
RegistrationContainer.propTypes = {};
var Registration_container = toJS(RegistrationContainer);

const useForgotPassword = () => {
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    isLoading: select(selectPasswordResetRequestSending),
    isSuccess: select(selectPasswordResetRequestSent),
    error: select(selectPasswordResetRequestError),
    requestPasswordReset: userEmailObject => dispatch(requestPasswordReset(userEmailObject)),
    setNewPassword: {
      queryString: select(selectCurrentSearch),
      isLoading: select(selectResetPasswordSending),
      isSuccess: select(selectResetPasswordSent),
      error: select(selectResetPasswordError),
      submit: resetPasswordObject => dispatch(resetPassword(resetPasswordObject))
    }
  };
};

const ForgotPasswordContainer = ({
  children,
  ...props
}) => {
  const userProps = useForgotPassword();
  return children(userProps);
};
ForgotPasswordContainer.propTypes = {};
var ForgotPassword_container = toJS(ForgotPasswordContainer);

const useChangePassword = () => {
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    isLoading: select(selectChangePasswordSending),
    isSuccess: select(selectChangePasswordSent),
    userId: select(selectUserGuid),
    isLoggedIn: select(selectUserIsAuthenticated),
    error: select(selectChangePasswordError),
    changePassword: (userId, currentPassword, newPassword) => dispatch(changePassword(userId, currentPassword, newPassword))
  };
};

const ChangePasswordContainer = ({
  children,
  ...props
}) => {
  const userProps = useChangePassword();
  return children(userProps);
};
ChangePasswordContainer.propTypes = {};
var ChangePassword_container = toJS(ChangePasswordContainer);

export { ChangePassword_container as C, ForgotPassword_container as F, LoginHelper as L, Registration_container as R, loginUser as a, logoutUser as b, actions as c, Login_container as d, useRegistration as e, findContentTypeMapping as f, getManagementApiClient as g, handleRequiresLoginSaga as h, useForgotPassword as i, useChangePassword as j, refreshSecurityToken as k, loginSagas as l, registerUser as r, useLogin as u };
//# sourceMappingURL=ChangePassword.container-6cb4994d.js.map
