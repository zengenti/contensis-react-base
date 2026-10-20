'use strict';

var effects = require('@redux-saga/core/effects');
var selectors = require('./selectors-PS7proOd.js');
var selectors$1 = require('./selectors-CmJN_5Rz.js');
var mapJson = require('jsonpath-mapper');
var CookieConstants = require('./CookieConstants-CN1e2I1R.js');
var log = require('loglevel');
var to = require('await-to-js');
var enterpriseFetch = require('enterprise-fetch');
var CookieHelper_class = require('./CookieHelper.class-Det3qfdU.js');
var reactCookie = require('react-cookie');
var reactRedux = require('react-redux');
var ToJs = require('./ToJs-BsWqWjdm.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var mapJson__default = /*#__PURE__*/_interopDefault(mapJson);
var to__default = /*#__PURE__*/_interopDefault(to);

/**
 * identity-client's cookies, read-only. The names are declared here rather than
 * imported from `CookieConstants`, so nothing in this folder can write one and
 * the module depends on no code the v5 clean-up deletes.
 *
 * Each read goes to `document.cookie` at the moment of the call: after
 * `POST /idp/refresh` the new access token must come from the browser, not from
 * a map captured earlier in the page. Two names are shared with react-base's
 * legacy cookies — under `USE_IDP` those legacy cookies are ignored, never
 * cleared.
 */

/** The Keycloak access token (a JWT) sent to Contensis APIs. */
const IDP_ACCESS_TOKEN_COOKIE = 'ContensisSecurityBearerToken';

/** The legacy encrypted CMS security token, kept in step with the Keycloak
 *  session. This is what `selectUserSecurityToken` reports under `USE_IDP`. */
const IDP_CLASSIC_TOKEN_COOKIE = 'ContensisClassicToken';
const readCookieValue = name => {
  // Server rendering never reads the session, and there is no document.
  if (typeof document === 'undefined' || !document.cookie) return undefined;
  const prefix = `${name}=`;
  for (const entry of document.cookie.split(';')) {
    const cookie = entry.trim();
    if (!cookie.startsWith(prefix)) continue;
    const value = cookie.slice(prefix.length);
    if (!value) return undefined;
    try {
      return decodeURIComponent(value);
    } catch {
      // A value we cannot decode is still the value the browser holds.
      return value;
    }
  }
  return undefined;
};
const readIdpAccessToken = () => readCookieValue(IDP_ACCESS_TOKEN_COOKIE);
const readIdpClassicToken = () => readCookieValue(IDP_CLASSIC_TOKEN_COOKIE);

/** Both readable means there is something to build a session from; it still
 *  does not prove one. */
const hasIdpSessionCookies = () => !!readIdpAccessToken() && !!readIdpClassicToken();

/**
 * The `USE_IDP` site setting, following the `WSFED_LOGIN` pattern exactly:
 *
 * - Defined at build time (webpack `DefinePlugin`, either mode): the value is
 *   baked into the bundle and wins. The read is `typeof`-guarded so consumers
 *   that never define it fall back to the runtime global instead of throwing a
 *   `ReferenceError`.
 * - Not defined: the setting arrives on `window` (browser) or `global` (server)
 *   from `startup.js` / `start.js` as the string `"true"`, which keeps a
 *   deployment that leaves it out of its bundle environment-agnostic.
 *
 * Read when the function is called and never cached at module load, so the
 * server and the client always agree on the same answer.
 *
 * `USE_IDP` takes precedence over every other login method: with the setting on,
 * no code path reaches the classic or WSFED implementations.
 */

const context$2 = typeof window != 'undefined' ? window : global;

/** Both the boolean `true` and the string `"true"` turn a setting on. */
const isOn = value => value === true || value === 'true';

/** A build-time definition wins; otherwise the runtime global decides. */
const readSetting = (buildValue, runtimeValue) => isOn(typeof buildValue === 'undefined' ? runtimeValue : buildValue);

/** Is this site opted in to IDP session auth (`/idp/*` + identity-client cookies)? */
const isIdpEnabled = () => readSetting(typeof USE_IDP !== 'undefined' ? /* global USE_IDP */USE_IDP : undefined, context$2.USE_IDP);

/**
 * Is the legacy WSFED/OIDC login configured? Read here rather than through
 * `LoginHelper`, so this module depends on nothing the v5 clean-up deletes.
 * Startup log only: precedence needs no code in the WSFED paths, because none
 * of them run under `USE_IDP`.
 */
const isWsFedLoginEnabled = () => readSetting(typeof WSFED_LOGIN !== 'undefined' ? /* global WSFED_LOGIN */WSFED_LOGIN : undefined, context$2.WSFED_LOGIN);
/** The login mechanism this app actually uses: `USE_IDP` over `WSFED_LOGIN`
 *  over the classic Contensis login. */
const activeLoginMethod = () => {
  if (isIdpEnabled()) return 'idp';
  if (isWsFedLoginEnabled()) return 'wsfed';
  return 'classic';
};

const isApiError = e => !!e && typeof e === 'object' && 'status' in e && 'statusText' in e;
const isPlainError = e => !!e && typeof e === 'object' && 'message' in e && typeof e.message === 'string';
const logError = (prefix, e) => {
  var _e$data;
  const message = isApiError(e) ? `${prefix} ${e.status} "${((_e$data = e.data) === null || _e$data === void 0 ? void 0 : _e$data.message) || ''}" url: ${e.url || ''}` : isPlainError(e) ? `${prefix} "${(e === null || e === void 0 ? void 0 : e.message) || e}"${e !== null && e !== void 0 && e.stack ? `\n${e.stack}` : ''}` : `${prefix} "${e}"`;
  log.error(message);
};
const shorten = (str, maxLength = 120, endWeight = 0.6) => {
  if (!str || str.length <= maxLength) return str;
  const charsToShow = maxLength - 3;
  const back = Math.floor(charsToShow * endWeight);
  const front = charsToShow - back;
  return `${str.slice(0, front)}...${str.slice(str.length - back)}`;
};

const getManagementApiClient = async ({
  bearerToken,
  bearerTokenExpiryDate,
  refreshToken,
  refreshTokenExpiryDate,
  contensisClassicToken,
  username,
  password
}) => {
  const rootUrl = SERVERS.cms || SERVERS.api; /* global SERVERS */
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
var mapClientCredentials = obj => mapJson__default.default(obj, clientCredentials);

const context$1 = typeof window != 'undefined' ? window : global;

// The `typeof` guard means a development build can leave `WSFED_LOGIN` out of
// DefinePlugin entirely: not defined is off, not a ReferenceError.
const requireOidc = process.env.NODE_ENV === 'development' ? typeof WSFED_LOGIN !== 'undefined' && WSFED_LOGIN === 'true' /* global WSFED_LOGIN */ : context$1.WSFED_LOGIN === 'true';
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
      } = await import(/* webpackChunkName: "oidcclient" */'oidc-client');
      return new UserManager(config);
    } catch (e) {
      console.error('Exception in createUserManager: ', e);
    }
  } else return;
};

var _LoginHelper;
const context = typeof window != 'undefined' ? window : global;
class LoginHelper {
  constructor(cookies) {
    this.cookies = cookies || new CookieHelper_class.CookieHelper();
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
    userManager === null || userManager === void 0 || userManager.signinRedirect({
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
      window.location.href = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`;
    }
  }
  static async WsFedLogout(redirectPath) {
    await fetch(`${LoginHelper.CMS_URL}/authenticate/logout?jsonResponseRequired=true`, {
      credentials: 'include'
    });
    if (redirectPath) {
      window.location.href = redirectPath;
    } else {
      // Explicitly check and remove any stale
      // security token that may be in the query string
      LoginHelper.RemoveSecurityTokenQuery();
    }
  }
  static async GetCredentialsForSecurityToken(securityToken) {
    const [error, response] = await to.to(fetch(`${LoginHelper.CMS_URL}/REST/Contensis/Security/IsAuthenticated`, {
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
      const [parseError, body] = await to.to(response.json());
      if (parseError) return [parseError];
      const {
        LogonResult,
        ApplicationData = []
      } = body;
      if (LogonResult !== 0) {
        // console.info(`Security token is invalid - LogonResult: ${LogonResult}`);
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

  SetLoginCookies({
    bearerToken,
    contensisClassicToken,
    refreshToken
  }) {
    if (bearerToken) this.cookies.SetCookie(CookieConstants.BEARER_TOKEN_COOKIE, bearerToken);
    if (contensisClassicToken) this.cookies.SetCookie(CookieConstants.LOGIN_COOKIE, contensisClassicToken);
    if (refreshToken) this.cookies.SetCookie(CookieConstants.REFRESH_TOKEN_COOKIE, refreshToken);
  }
  GetCachedCredentials() {
    return {
      bearerToken: null,
      bearerTokenExpiryDate: null,
      refreshToken: this.cookies.GetCookie(CookieConstants.REFRESH_TOKEN_COOKIE),
      refreshTokenExpiryDate: null,
      contensisClassicToken: this.cookies.GetCookie(CookieConstants.LOGIN_COOKIE),
      securityToken: null
    };
  }
  ClearCachedCredentials() {
    this.cookies.DeleteCookie(CookieConstants.LOGIN_COOKIE);
    this.cookies.DeleteCookie(CookieConstants.REFRESH_TOKEN_COOKIE);
    this.cookies.DeleteCookie(CookieConstants.BEARER_TOKEN_COOKIE); // additional cookie used by @contensis/forms package

    if (LoginHelper.WSFED_LOGIN && typeof window !== 'undefined') {
      // remove any oidc keys left over in localStorage
      const {
        localStorage
      } = window;
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (typeof key === 'string' && key.startsWith('oidc.')) keys.push(key);
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
    let transientClient = null;
    let user;
    if (username && password) {
      // Get a management client with username and password
      transientClient = await getManagementApiClient({
        username,
        password
      });

      // Ensure the client has requested a bearer token
      const [loginError, clientBearerToken] = await to.to(transientClient.ensureBearerToken());

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
        const clientCredentials = mapClientCredentials(transientClient);
        this.SetLoginCookies(clientCredentials);
        authenticationState = {
          clientCredentials,
          isAuthenticated: true,
          isAuthenticationError: false,
          isError: false
        };
        credentials = clientCredentials;
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
}
_LoginHelper = LoginHelper;
LoginHelper.CMS_URL = SERVERS.cms /* global SERVERS */;
// The `typeof` guard means a development build can leave `WSFED_LOGIN` out of
// DefinePlugin entirely: not defined is off, not a ReferenceError.
LoginHelper.WSFED_LOGIN = process.env.NODE_ENV === 'development' ? typeof WSFED_LOGIN !== 'undefined' && WSFED_LOGIN === 'true' /* global WSFED_LOGIN */ : context.WSFED_LOGIN === 'true';
LoginHelper.LOGIN_ROUTE = '/account/login';
LoginHelper.ACCESS_DENIED_ROUTE = '/account/access-denied';
LoginHelper.withCookies = cookieHelper => new _LoginHelper(cookieHelper);
LoginHelper.GetUserDetails = async client => {
  const [userError, user] = await to.to(client.security.users.getCurrent());
  if (user && user.id) {
    const [groupsError, groupsResult] = await to.to(client.security.users.getUserGroups({
      userId: user.id,
      includeInherited: true,
      pageOptions: {
        pageSize: 100
      }
    }));
    // Set groups attribute in user object to be the items
    // array from the getUserGroups result
    if (groupsResult && groupsResult.items) user.groups = groupsResult.items;

    // If groups call fails then log the error but allow the user to login still

    if (groupsError) console.log(groupsError);
  }
  return [userError, user];
};

/**
 * The three IDP navigations. All are full browser navigations, not router
 * pushes: `/idp/*` is served by identity-client outside the React app, and the
 * access-denied page has to survive a reload with the original path in the query
 * string.
 *
 * `returnPath` is URL-encoded (`/documents?page=2` travels as
 * `returnPath=%2Fdocuments%3Fpage%3D2`) and callers pass a value already through
 * `sanitiseLocalPath`.
 *
 * The access-denied URL is built here in the shape the classic login uses rather
 * than imported from `LoginHelper`, so nothing here depends on code the v5
 * clean-up deletes.
 */

const IDP_CHECK_PATH = '/idp/check';
const IDP_LOGOUT_PATH = '/idp/logout';
const ACCESS_DENIED_ROUTE = '/account/access-denied';
const withReturnPath = (path, returnPath) => returnPath ? `${path}?returnPath=${encodeURIComponent(returnPath)}` : path;

/** identity-client sends a member with no session on to Keycloak. */
const getIdpCheckUrl = returnPath => withReturnPath(IDP_CHECK_PATH, returnPath);

/** identity-client clears its cookies and ends the Keycloak session. */
const getIdpLogoutUrl = returnPath => withReturnPath(IDP_LOGOUT_PATH, returnPath);
const getAccessDeniedRoute = originalPath => {
  if (typeof originalPath !== 'string' || originalPath === ACCESS_DENIED_ROUTE) return ACCESS_DENIED_ROUTE;
  return `${ACCESS_DENIED_ROUTE}?original_uri=${originalPath}`;
};
const navigate = (url, replace = false) => {
  // Server rendering never navigates.
  if (typeof window === 'undefined') return;
  if (replace) window.location.replace(url);else window.location.href = url;
};

/** The address the browser is actually on. The routing action's location is the
 *  route React is rendering, which during a navigation can lag the URL a
 *  `returnPath` should be taken from. */
const currentHref = () => typeof window === 'undefined' ? '' : window.location.href;

/** `replace` so the logged-out view of a protected page is not left in history
 *  behind the Keycloak round trip. */
const goToIdpCheck = returnPath => navigate(getIdpCheckUrl(returnPath), true);
const goToIdpLogout = returnPath => navigate(getIdpLogoutUrl(returnPath));
const goToAccessDenied = originalPath => navigate(getAccessDeniedRoute(originalPath));

/**
 * The once-per-`returnPath` guard on automatic redirects to `/idp/check`: if the
 * member comes straight back with no session they see an error, not another
 * redirect.
 *
 * It lives in `sessionStorage` because the mark has to survive the round trip
 * through Keycloak, with a 5-minute TTL so a stale mark cannot strand anyone on
 * the error page. `loginUser()` neither checks nor sets it — an explicit login
 * click is never blocked.
 *
 * Where storage is blocked (private mode, some enterprise policy) every
 * operation fails closed to "not armed": we cannot remember across the
 * navigation, so we cannot suppress the redirect.
 */
const STORAGE_PREFIX = 'idp.loginGuard.';

/** A guard older than this no longer suppresses a retry. */
const LOGIN_GUARD_TTL_MS = 5 * 60 * 1000;

/** Delivery 401s escalate under their own key, which establishing a session must
 *  not disarm: a member whose Delivery access keeps failing would otherwise be
 *  redirected to `/idp/check` on every load. */
const DELIVERY_GUARD = 'delivery';
const getStorage = () => {
  try {
    if (typeof window === 'undefined') return null;
    return window.sessionStorage;
  } catch {
    return null;
  }
};
const keyFor = (returnPath, scope) => `${STORAGE_PREFIX}${scope ? `${scope}.` : ''}${returnPath}`;

/** Stamped into every guard this page load arms: armed by this load means the
 *  redirect is still in hand, armed by an earlier load means we sent the visitor
 *  and it did not work. */
const PAGE_LOAD_ID = Math.random().toString(36).slice(2);
const readGuard = (returnPath, scope) => {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(keyFor(returnPath, scope));
    if (!raw) return null;
    const [armedAtRaw, pageLoadId] = raw.split(':');
    const armedAt = Number(armedAtRaw);
    if (!Number.isFinite(armedAt)) return null;
    if (Date.now() - armedAt > LOGIN_GUARD_TTL_MS) {
      storage.removeItem(keyFor(returnPath, scope));
      return null;
    }
    return {
      armedAt,
      pageLoadId
    };
  } catch {
    log.error('[idp] sessionStorage is unreadable, login guard treated as unset');
    return null;
  }
};

/** Has an automatic redirect to `/idp/check` already been made for this path? */
const isLoginGuardArmed = (returnPath, scope) => !!readGuard(returnPath, scope);

/** Was that redirect made by this page load? Then it is under way, not spent: a
 *  concurrent route saga must not read it as a failed attempt. */
const isRedirectPending = (returnPath, scope) => {
  var _readGuard;
  return ((_readGuard = readGuard(returnPath, scope)) === null || _readGuard === void 0 ? void 0 : _readGuard.pageLoadId) === PAGE_LOAD_ID;
};

/** Arm the guard for this path. Automatic redirects only. */
const armLoginGuard = (returnPath, scope) => {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(keyFor(returnPath, scope), `${Date.now()}:${PAGE_LOAD_ID}`);
  } catch {
    // Unwritable storage: the redirect may repeat. Nothing else to do.
  }
};

/** Disarm the guard: when a member is shown on the path, and on logout — where
 *  passing no path clears every guarded path. */
const clearLoginGuard = (returnPath, scope) => {
  const storage = getStorage();
  if (!storage) return;
  try {
    if (returnPath) {
      storage.removeItem(keyFor(returnPath, scope));
      return;
    }
    const keys = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (typeof key === 'string' && key.startsWith(STORAGE_PREFIX)) keys.push(key);
    }
    keys.forEach(key => storage.removeItem(key));
  } catch {
    // Nothing to clear when storage is unavailable.
  }
};

/**
 * Choosing and sanitising the `returnPath` handed to `/idp/*`.
 *
 * It must be a local path: identity-client only checks "starts with `/`", so an
 * attacker-chosen `redirect_uri` on the login route could otherwise bounce the
 * visitor off site through a service we do not own. Every candidate is resolved
 * against the site's origin and accepted only when the origin matches; anything
 * else becomes `/`.
 *
 * `securityToken`, `credentials` and `password` (any case) are stripped last,
 * after any substitution, so a token cannot ride along inside another
 * parameter's value.
 */

/** The site's classic login route. Declared here rather than imported from
 *  `LoginHelper` so this module survives the v5 clean-up unchanged. */
const LOGIN_ROUTE = '/account/login';
const NEVER_IN_RETURN_PATH = ['securitytoken', 'credentials', 'password'];
const firstParam = (params, name) => {
  const value = params.get(name);
  return typeof value === 'string' && value !== '' ? value : undefined;
};
const stripNeverSentParams = url => {
  const names = [];
  url.searchParams.forEach((_value, name) => {
    if (NEVER_IN_RETURN_PATH.includes(name.toLowerCase())) names.push(name);
  });
  names.forEach(name => url.searchParams.delete(name));
  return url;
};
const safeHref = href => {
  try {
    return new URL(href);
  } catch {
    return null;
  }
};

/**
 * Resolve a candidate to a local path on this origin, or `/` when it is not
 * one. Keeps path, query and hash.
 */
const sanitiseLocalPath = (candidate, origin) => {
  if (typeof candidate !== 'string' || candidate.trim() === '') return '/';
  let resolved;
  try {
    resolved = new URL(candidate, origin);
  } catch {
    return '/';
  }

  // Covers an absolute URL to another host, a protocol-relative `//host`, a
  // `/\host` (parsed as an authority) and non-http schemes such as
  // `javascript:` (no origin at all).
  if (!origin || resolved.origin !== origin) return '/';

  // Origin match alone is not enough: `/.//evil.com` and `/a/..//evil.com`
  // resolve on site with a pathname of `//evil.com`, which the next hop treats
  // as protocol-relative. No path here legitimately opens that way; a double
  // slash anywhere later is left alone.
  if (/^[/\\]{2}/.test(resolved.pathname)) return '/';
  const cleaned = stripNeverSentParams(resolved);
  return `${cleaned.pathname}${cleaned.search}${cleaned.hash}` || '/';
};

/**
 * The `returnPath` for a trip to `/idp/check`: normally the current path. When
 * the current path *is* the site's login route, that page's own target is used
 * instead — `redirect_uri` (the react-base classic hand-off) or `ReturnURL` (the
 * asset/IIS one) — falling back to `/`.
 */
const getLoginReturnPath = currentHref => {
  const current = safeHref(currentHref);
  if (!current) return '/';
  const {
    origin,
    pathname,
    searchParams
  } = current;
  if (pathname === LOGIN_ROUTE) {
    var _firstParam;
    const target = (_firstParam = firstParam(searchParams, 'redirect_uri')) != null ? _firstParam : firstParam(searchParams, 'ReturnURL');
    return sanitiseLocalPath(target, origin);
  }
  return sanitiseLocalPath(currentHref, origin);
};

/** The `returnPath` for a trip to `/idp/logout`: the path the caller asked for,
 *  else the current path, else `/` when the current route requires login — so a
 *  logout from a members area lands somewhere public. */
const getLogoutReturnPath = ({
  redirectPath,
  currentHref,
  routeRequiresLogin = false
}) => {
  const current = safeHref(currentHref);
  const origin = (current === null || current === void 0 ? void 0 : current.origin) || '';
  if (redirectPath) return sanitiseLocalPath(redirectPath, origin);
  if (routeRequiresLogin) return '/';
  return sanitiseLocalPath(currentHref, origin);
};

/**
 * The `fetch` every Contensis call in this library goes through;
 * `enterprise-fetch` supplies the timeout, so no call site writes the
 * `AbortController` dance again.
 *
 * It retries nothing, deliberately. The wrapper throws whatever it is told to
 * retry, so a retried status arrives as a thrown `Response` rather than the SDK
 * error our callers classify — and a retried stall doubles a route's worst case.
 * Every call here is either a definitive answer or already retries itself.
 */

/** One timeout for the short calls made inside a route change, so a hung
 *  dependency cannot stall a route twice as long as another. */
const FETCH_TIMEOUT_MS = 5000;

/** One attempt, aborted after `FETCH_TIMEOUT_MS` (or a `timeout` on the call). */
const fetchOnce = enterpriseFetch.fetchWithDefaults({
  timeout: FETCH_TIMEOUT_MS,
  retry: {
    retries: 0,
    minTimeout: 0,
    factor: 1
  },
  doRetry: async () => false
});

/**
 * `POST /idp/refresh` — the one call that answers "is there a session?".
 * Same-origin, carrying the `X-Contensis-Refresh` header as the CSRF
 * protection: without it identity-client answers 403, which is also why a page
 * on another origin cannot force a refresh.
 *
 * Only a 401 ends a session. Everything else — timeout, network error, 5xx, a
 * 200 that left the access token cookie unreadable, and a 403 (our own
 * missing-header defect) — is `unknown`, and `unknown` never logs anyone out.
 *
 * Concurrent callers share one in-flight request.
 */
const IDP_REFRESH_PATH = '/idp/refresh';
let inFlight$1 = null;

/** Set when a refresh returns 200 without leaving a readable access token
 *  cookie. Asking again cannot fix that, so we stop and log it once. */
let cookielessRefreshSeen = false;
const performRefresh = async () => {
  let response;
  try {
    response = await fetchOnce(IDP_REFRESH_PATH, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-Contensis-Refresh': '1'
      }
    });
  } catch (e) {
    // Timeout (abort) or a network failure: we do not know, so we do nothing.
    logError('[idp] POST /idp/refresh request failed', e);
    return 'unknown';
  }
  if (response.status === 200) {
    // A 200 writes a new access token cookie. If it is still not readable the
    // refresh has not given us a session we can use.
    if (!readIdpAccessToken()) {
      if (!cookielessRefreshSeen) {
        cookielessRefreshSeen = true;
        log.error(`[idp] POST ${IDP_REFRESH_PATH} returned 200 but the ` + `"${IDP_ACCESS_TOKEN_COOKIE}" cookie is still not readable. No ` + "further refresh this page load. Check the cookie's Domain, Path, " + 'Secure and SameSite attributes against this host.');
      }
      return 'unknown';
    }
    cookielessRefreshSeen = false;
    return 'session';
  }
  if (response.status === 401) return 'no-session';
  if (response.status === 403) log.error(`[idp] POST ${IDP_REFRESH_PATH} returned 403 — the ` + 'X-Contensis-Refresh header is missing, which is a code defect. ' + 'Treating the outcome as unknown so no member is logged out.');else log.error(`[idp] POST ${IDP_REFRESH_PATH} responded ${response.status} ` + `${response.statusText} — treated as unknown`);
  return 'unknown';
};

/** Refresh the session, sharing one in-flight call between concurrent callers.
 *  Never rejects: an unreachable identity-client is `unknown`, not an exception. */
const refreshSession = () => {
  if (inFlight$1) return inFlight$1;

  // A refresh that succeeded without leaving a readable cookie will not do
  // better on a second attempt in the same page load.
  if (cookielessRefreshSeen && !readIdpAccessToken()) return Promise.resolve('unknown');
  inFlight$1 = performRefresh().then(outcome => {
    inFlight$1 = null;
    return outcome;
  }, e => {
    inFlight$1 = null;
    logError('[idp] POST /idp/refresh threw', e);
    return 'unknown';
  });
  return inFlight$1;
};

/**
 * The messages and the error shape the IDP route sagas raise. Both the
 * require-login saga and the Delivery auth-error saga throw them — thrown rather
 * than put, so `do500` renders them through the site's `notFoundComponent`.
 */

/** What we could not reach. Says nothing about the member, and nothing about
 *  how they sign in. */
const GENERIC_ERROR_MESSAGE = 'We could not reach the service that signs you in. Please try again.';

/** We already sent the member to sign in for this page and it did not work. */
const LOOP_GUARD_MESSAGE = 'We could not sign you in. Please try again.';

/** The shape `do500` reports through `SET_ENTRY`, so the site's
 *  `notFoundComponent` renders with this status. */
const idpRouteError = (status, statusText, message) => ({
  status,
  statusText,
  data: {
    message
  }
});

/**
 * A Management API client built from the access token cookie, at the moment of
 * the call. Nothing about it can start a classic grant:
 *
 * - `bearerTokenExpiryDate` is far in the future, so the SDK's
 *   `isBearerTokenExpired()` is false and `ensureBearerToken()` resolves without
 *   asking for a token.
 * - No `clientType` and no `clientDetails`, so anything that does reach
 *   `/authenticate/connect/token` posts `grant_type=null` and fails rather than
 *   firing a `contensis_classic` grant. `clientType: 'none'` is not an option:
 *   it throws without a Delivery access token.
 * - Every request carries the token in `Authorization`, read fresh each time.
 * - `fetchFn` aborts after the shared timeout, so a hung Management API becomes
 *   `unknown` instead of stalling the route.
 *
 * `withManagementClient` adds the one refresh-and-retry a 401 earns and
 * classifies everything else as `unknown`. This module deliberately avoids
 * `getManagementApiClient`, which is classic-shaped and deleted at v5.
 */

/** Far enough ahead that the SDK never treats our bearer as expiring. */
const BEARER_EXPIRY_FAR_FUTURE_MS = 1000 * 60 * 60 * 24 * 365 * 10;

/** The three-way outcome every IDP call reports. `error` carries the rejection
 *  behind a non-success so a caller can still report what the API said — a wrong
 *  current password, say, is a 400 we must show. */

const noSession = error => ({
  outcome: 'no-session',
  error
});
const unknownResult = error => ({
  outcome: 'unknown',
  error
});

/** The HTTP status of a rejection from the SDK's http client, if it has one. */
const statusOf$1 = e => isApiError(e) ? e.status : undefined;

/** A client that speaks for the member behind the access token cookie. A new one
 *  per attempt: after a refresh the token must be read from the browser, never
 *  reused from a value captured earlier. */
const createIdpManagementClient = async accessToken => {
  const rootUrl = SERVERS.cms || SERVERS.api; /* global SERVERS */
  const projectId = PROJECTS[0].id; /* global PROJECTS */

  let {
    Client: ManagementClient
  } = await import('contensis-management-api');
  if (typeof window === 'undefined') {
    const {
      UniversalClient
    } = await import('contensis-management-api');
    ManagementClient = UniversalClient;
  }
  const client = ManagementClient.create({
    projectId,
    rootUrl,
    fetchFn: fetchOnce
  });
  client.bearerToken = accessToken;
  client.bearerTokenExpiryDate = new Date(Date.now() + BEARER_EXPIRY_FAR_FUTURE_MS);
  return client;
};
const attempt = async (run, accessToken) => {
  const [clientError, client] = await to__default.default(createIdpManagementClient(accessToken));
  if (clientError || !client) return {
    ok: false,
    error: clientError
  };
  const [error, value] = await to__default.default(run(client));
  if (error) return {
    ok: false,
    status: statusOf$1(error),
    error
  };
  return {
    ok: true,
    value: value
  };
};

/** Run `run` against a cookie-backed Management API client. A missing access
 *  token refreshes first; a 401 refreshes once and retries once. The callback
 *  throwing is how a nested call (groups, say) reports a 401 it wants retried
 *  here. */
const withManagementClient = async run => {
  let accessToken = readIdpAccessToken();
  if (!accessToken) {
    const outcome = await refreshSession();
    if (outcome === 'no-session') return noSession();
    if (outcome !== 'session') return unknownResult();
    accessToken = readIdpAccessToken();
    if (!accessToken) return unknownResult();
  }
  const first = await attempt(run, accessToken);
  if (first.ok) return {
    outcome: 'session',
    value: first.value
  };
  if (first.status !== 401) return unknownResult(first.error);
  const refresh = await refreshSession();
  if (refresh === 'no-session') return noSession(first.error);
  if (refresh !== 'session') return unknownResult(first.error);
  const freshToken = readIdpAccessToken();
  if (!freshToken) return unknownResult(first.error);
  const retry = await attempt(run, freshToken);
  if (retry.ok) return {
    outcome: 'session',
    value: retry.value
  };

  // One refresh, one retry, still refused: the session is gone.
  return retry.status === 401 ? noSession(retry.error) : unknownResult(retry.error);
};

/**
 * A member's session is built from identity-client's cookies alone. No classic
 * grant is used: user and groups are fetched with the access token as
 * `Authorization`, and react-base's own `RefreshToken` cookie is never read — a
 * leftover one can belong to somebody else.
 *
 * Outcomes: `session`; `no-session` (a 401 survived one refresh and retry);
 * `unknown` (timeout, network error, or a 5xx). Never a member with an empty
 * group list.
 */
/** Returned by the build callback when the session cannot be built and the
 *  wrapper should not refresh-and-retry. */
const UNBUILDABLE = {
  unbuildable: true
};
const isBuildable = value => !('unbuildable' in value);
const statusOf = e => isApiError(e) ? e.status : undefined;

/** Mirrors `LoginHelper.GetUserDetails` rather than importing it: nothing in
 *  here may depend on the classic login the v5 clean-up removes. */
const buildUserAndGroups = async client => {
  const [userError, user] = await to__default.default(client.security.users.getCurrent());

  // A 401 has to reach `withManagementClient` so it can refresh and retry.
  if (userError) {
    if (statusOf(userError) === 401) throw userError;
    return UNBUILDABLE;
  }
  if (!(user !== null && user !== void 0 && user.id)) return UNBUILDABLE;
  const [groupsError, groupsResult] = await to__default.default(client.security.users.getUserGroups({
    userId: user.id,
    includeInherited: true,
    pageOptions: {
      pageSize: 100
    }
  }));
  if (groupsError) {
    if (statusOf(groupsError) === 401) throw groupsError;
    // Not knowing is not the same as having none: an empty group list would
    // send a real member to access-denied.
    return UNBUILDABLE;
  }
  return {
    user,
    groups: (groupsResult === null || groupsResult === void 0 ? void 0 : groupsResult.items) || []
  };
};

/** The reducer reads `user.email` unguarded for `isZengentiStaff`, so a member
 *  without one gets an empty string instead of throwing into state. */
const toStateUser = (user, groups) => ({
  ...user,
  email: typeof user.email === 'string' ? user.email : '',
  groups
});
const mapBuildResult = result => {
  if (result.outcome === 'no-session') return {
    outcome: 'no-session'
  };
  if (result.outcome === 'unknown') return {
    outcome: 'unknown'
  };
  if (!isBuildable(result.value)) return {
    outcome: 'unknown'
  };
  return {
    outcome: 'session',
    session: {
      user: toStateUser(result.value.user, result.value.groups),
      // Read after the calls, not before: a refresh rewrites this cookie.
      classicToken: readIdpClassicToken()
    }
  };
};

/** Fetch current user and groups with a cookie-backed client, with the 401
 *  refresh-and-retry applied around both calls. */
const buildSession = async () => mapBuildResult(await withManagementClient(buildUserAndGroups));

/**
 * Who, if anybody, is logged in — the only source of a session while `USE_IDP`
 * is on. Two readable tokens are enough to try building one; otherwise the
 * shared refresh decides first.
 *
 * One resolution is shared by everything waiting on it (StrictMode doubles the
 * first dispatch, and navigations overlap), cleared when it settles so a later
 * check resolves afresh.
 */
let inFlight = null;
const resolveSession = () => {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    if (!hasIdpSessionCookies()) {
      const outcome = await refreshSession();
      if (outcome === 'no-session') return {
        outcome: 'no-session'
      };
      if (outcome !== 'session') return {
        outcome: 'unknown'
      };
    }
    return buildSession();
  })().then(result => {
    inFlight = null;
    return result;
  }, e => {
    inFlight = null;
    throw e;
  });
  return inFlight;
};

/** Has another tab changed who we are? The classic token cookie is the identity
 *  last put in state; if it is gone or different, this tab's view is stale —
 *  without the check tab B shows user B while its API calls act as user C. */
const identityHasChanged = classicTokenInState => {
  const classicToken = readIdpClassicToken();
  if (!classicToken) return true;
  return classicToken !== classicTokenInState;
};

/**
 * Mapping a session onto the existing reducer, which is not edited. The actions
 * below are written around three of its quirks:
 *
 * - `SET_AUTHENTICATION_STATE` can never reset `isAuthenticated`
 *   (`isAuthenticated || state.isAuthenticated`), so ending a session goes
 *   through `LOGOUT_USER` instead — with an IDP-only `clearOnly` flag so the
 *   logout saga knows not to navigate.
 * - A `SET_AUTHENTICATION_STATE` that omits `clientCredentials` nulls them, so
 *   every resolving put carries the current value forward.
 * - A user without `email` throws, which `toStateUser` prevents.
 *
 * Redux holds the classic token and nothing else: no access token, no refresh
 * token, no expiry.
 */

/** What `selectClientCredentials` holds while `USE_IDP` is on. */

const idpUserStateAction = (clientCredentials, isLoading) => ({
  type: selectors.SET_AUTHENTICATION_STATE,
  authenticationState: {
    clientCredentials: clientCredentials || null,
    isLoading
  }
});
const idpResolvingUserAction = clientCredentials => idpUserStateAction(clientCredentials, true);
const idpSettledUserAction = clientCredentials => idpUserStateAction(clientCredentials, false);

/** A member is signed in: identity-client's classic token is the only
 *  credential we keep. */
const idpSessionUserAction = session => ({
  type: selectors.SET_AUTHENTICATION_STATE,
  authenticationState: {
    clientCredentials: {
      contensisClassicToken: session.classicToken
    },
    errorMessage: null,
    isAuthenticated: true,
    isAuthenticationError: false,
    isError: false,
    isLoading: false
  },
  user: session.user
});

/** The classic token moved (another tab signed in as somebody else): update
 *  the credential without disturbing anything else the site is holding. */
const idpClassicTokenUserAction = (classicToken, clientCredentials) => ({
  type: selectors.SET_AUTHENTICATION_STATE,
  authenticationState: {
    clientCredentials: {
      ...(clientCredentials || {}),
      contensisClassicToken: classicToken || (clientCredentials === null || clientCredentials === void 0 ? void 0 : clientCredentials.contensisClassicToken)
    },
    isLoading: false
  }
});

/**
 * End the session in state only. `clearOnly` is the IDP logout saga's signal not
 * to navigate: this is us noticing that another tab ended the session, not the
 * member asking to log out.
 */
const idpClearSessionAction = () => ({
  type: selectors.LOGOUT_USER,
  clearOnly: true
});

/** A failure we must show without ever implying the member logged themselves
 *  out. `clientCredentials` is carried forward so a transient error does not
 *  drop a session that may still be good. */
const idpErrorUserAction = (errorMessage, clientCredentials) => ({
  type: selectors.SET_AUTHENTICATION_STATE,
  authenticationState: {
    clientCredentials: clientCredentials || null,
    errorMessage,
    isError: true,
    isLoading: false
  }
});

const findContentTypeMapping = (ContentTypeMappings, contentTypeId) => ContentTypeMappings.find(ct => ct.contentTypeID === contentTypeId);

/** Find a searchOptions object in any of the current routes */
const getSearchOptions = (staticRoute, contentTypeRoute) => {
  var _staticRoute$route;
  return (staticRoute === null || staticRoute === void 0 || (_staticRoute$route = staticRoute.route) === null || _staticRoute$route === void 0 ? void 0 : _staticRoute$route.searchOptions) || (contentTypeRoute === null || contentTypeRoute === void 0 ? void 0 : contentTypeRoute.searchOptions);
};

/**
 * Does this route need a member, and which groups? Routing decides from three
 * sources — the matched static route, the entry's content type mapping, and
 * whatever the app returned from `onRouteLoaded` — and the IDP sagas have to
 * agree with all three. The session check asks before any content exists and the
 * require-login saga asks again afterwards, so it is answered once, here.
 */
const asArray = value => Array.isArray(value) ? value : [];
const routeRequirements = (action, entry) => {
  var _action$staticRoute, _action$routes, _entry$sys;
  const {
    requireLogin: authRoute
  } = (action === null || action === void 0 || (_action$staticRoute = action.staticRoute) === null || _action$staticRoute === void 0 ? void 0 : _action$staticRoute.route) || {};
  const mappings = action === null || action === void 0 || (_action$routes = action.routes) === null || _action$routes === void 0 ? void 0 : _action$routes.ContentTypeMappings;
  const {
    requireLogin: authContentType
  } = (Array.isArray(mappings) && entry !== null && entry !== void 0 && (_entry$sys = entry.sys) !== null && _entry$sys !== void 0 && _entry$sys.contentTypeId ? findContentTypeMapping(mappings, entry.sys.contentTypeId) : undefined) || {};
  return {
    requiresLogin: !!authContentType || !!authRoute || !!(action !== null && action !== void 0 && action.requireLogin),
    requiresGroups: [...asArray(authContentType), ...asArray(authRoute), ...asArray(action === null || action === void 0 ? void 0 : action.requireLogin)]
  };
};

/** Between a navigation and its `SET_ENTRY` the routing state still holds the
 *  *previous* route's entry, so a caller arriving without one (the release
 *  check, a Delivery auth error) may only trust the entry in state when it
 *  belongs to this path — the same membership test the routing reducer uses.
 *  Anything else counts as no entry, exactly as before an entry was loaded. */
const entryForPath = (entry, path) => {
  var _entry$sys2;
  const uri = entry === null || entry === void 0 || (_entry$sys2 = entry.sys) === null || _entry$sys2 === void 0 ? void 0 : _entry$sys2.uri;
  if (!uri || !path) return undefined;
  return uri === path || uri === path.split('?')[0] ? entry : undefined;
};

/** The entry that describes this route. Both IDP sagas resolve it the same way:
 *  the routing action's own entry wins, and the one in state counts only while
 *  it belongs to this path. */
const resolveEntry = (action, stateEntry) => (action === null || action === void 0 ? void 0 : action.entry) || entryForPath(stateEntry, action === null || action === void 0 ? void 0 : action.path);

/**
 * The session check at the top of every client-side route change. Registered
 * before `ensureAccessTokenSaga`, so the token is refreshed before any content
 * fetch or release call.
 *
 * It costs nothing when both identity-client cookies are readable and the classic
 * token still matches what is in state. Otherwise it puts the resolving state,
 * resolves the session, and puts the session or the `clearOnly` reset. Nothing
 * happens on the server, and what a protected route does with the outcome is the
 * require-login saga's decision.
 *
 * A first page load, unlike a client navigation, is not inside the route's
 * loading state — the hydrated entry matches the path and the routing reducer
 * leaves `isLoading` false — so a protected route that has to go to the network
 * puts the route loading state first: the site's loading component rather than
 * the anonymous view.
 *
 * Resolving a session never disarms the redirect guard: only showing the member
 * on the path does.
 */
/** What the last session check decided for this route change, so the
 *  require-login saga does not resolve the session a second time. */
let lastOutcome = null;

/** The outcome recorded for this route change, if any. */
const takeRouteSessionOutcome = path => path && lastOutcome && lastOutcome.path === path ? lastOutcome.outcome : undefined;

/** Start a fresh route change with nothing recorded: any earlier outcome belongs
 *  to a different load. */
const clearRouteOutcome = path => {
  lastOutcome = {
    path
  };
};
const recordOutcome = (path, outcome) => {
  lastOutcome = {
    path,
    outcome
  };
};

/**
 * Which path was just reloaded after a Delivery 401. Kept in module memory by
 * path: a reload is a real route change, so nothing smaller survives it, and a
 * change to any other path ends it — which is also what lets the member revisit
 * the page later and get one reload again.
 */
let deliveryReloadPath = null;
const clearDeliveryReloadIfNot = path => {
  if (path && deliveryReloadPath && deliveryReloadPath !== path) deliveryReloadPath = null;
};
const hasDeliveryReloadFor = path => !!path && deliveryReloadPath === path;
const rememberDeliveryReload = path => {
  deliveryReloadPath = path || null;
};

/**
 * Resolve the session for this route change and put the result in state.
 * Never redirects, never deletes a cookie: the decision belongs to the
 * require-login saga.
 */
function* idpRouteSessionSaga(action) {
  // Server rendering stays session-blind.
  if (CookieConstants.isSSR) return;
  const path = action === null || action === void 0 ? void 0 : action.path;

  // A route change to a different path ends the delivery-401 reload memory, so
  // the member can revisit a page later and get one reload again.
  clearDeliveryReloadIfNot(path);
  clearRouteOutcome(path);
  const state = yield effects.select();
  const {
    requiresLogin
  } = routeRequirements(action, resolveEntry(action, selectors.selectRouteEntry(state, 'js')));
  const isAuthenticated = yield effects.select(selectors$1.selectUserIsAuthenticated);
  const classicToken = yield effects.select(selectors$1.selectUserSecurityToken);

  // Cheap path: cookies readable, and the classic token is still the one we put
  // in state, so this tab still shows the right member.
  if (hasIdpSessionCookies() && isAuthenticated && !identityHasChanged(classicToken)) {
    recordOutcome(path, 'session');
    return;
  }
  if (requiresLogin) yield effects.put({
    type: selectors.UPDATE_LOADING_STATE,
    isLoading: true
  });
  const clientCredentials = yield effects.select(selectors$1.selectClientCredentials, 'js');
  yield effects.put(idpResolvingUserAction(clientCredentials));
  const result = yield effects.call(resolveSession);
  if (result.outcome === 'session') {
    yield effects.put(idpSessionUserAction(result.session));
    recordOutcome(path, 'session');
    return;
  }

  // `no-session`: identity-client has already cleared its cookies.
  // `unknown`: we do not know, so we show anonymous for this load and let the
  // next navigation try again — but we never leave a member's face in the UI
  // when the cookies no longer support it.
  if (isAuthenticated) yield effects.put(idpClearSessionAction());
  // Nobody was shown, so that is the answer for this load: stop reporting
  // loading, or the member never sees a "Log in" control. A protected
  // route keeps the *route* loading state while the require-login saga
  // navigates, retries or throws.
  else yield effects.put(idpSettledUserAction(clientCredentials));
  recordOutcome(path, result.outcome);
}

/**
 * What a protected route does with the session. Routing already calls this after
 * `onRouteLoaded`, so it sees the matched static route, the entry, and whatever
 * the app returned from its own hook — the same inputs and the same
 * `userLoggedIn` return contract as the classic `handleRequiresLoginSaga`, which
 * it replaces one-for-one under `USE_IDP`.
 *
 * A public route always renders: anonymous if nobody is signed in, with no
 * redirect and nothing deleted, whatever the outcome. On a protected route a
 * missing session goes to `/idp/check` once per `returnPath` and to an error
 * state the second time; an `unknown` outcome gets one quiet retry, then a 503.
 *
 * Errors are thrown, not put: these sagas run inside `getRouteSaga`'s `try`, so a
 * thrown `{ status, statusText, data }` reaches `do500` and renders the site's
 * `notFoundComponent` with that status, whereas a `put` would be overwritten by
 * the later `SET_ENTRY`.
 */

/** One more try, a second later, before telling the member anything. */
function* quietRetrySession() {
  yield effects.delay(1000);
  const result = yield effects.call(resolveSession);
  if (result.outcome === 'session') {
    yield effects.put(idpSessionUserAction(result.session));
    return 'session';
  }
  if (result.outcome === 'no-session') return 'no-session';
  return 'unknown';
}

/** The member is in. Clear the loop guard for this path, then honour any group
 *  requirement exactly as the classic saga does. */
function* memberRoute({
  returnPath,
  routeRequiresGroups,
  action
}) {
  clearLoginGuard(returnPath);
  if (routeRequiresGroups.length > 0) {
    var _action$location;
    const userGroups = yield effects.select(selectors$1.selectUserGroups, 'js');
    if (!selectors$1.matchUserGroup(userGroups, routeRequiresGroups)) goToAccessDenied(action === null || action === void 0 || (_action$location = action.location) === null || _action$location === void 0 ? void 0 : _action$location.pathname);
  }
  return true;
}

/**
 * Nobody is signed in on a route that needs somebody to be: go to `/idp/check`,
 * but only once per `returnPath` — coming straight back and failing again is an
 * error state, not another redirect.
 *
 * `scope` separates the guard a Delivery auth error arms from the one a missing
 * session arms; see `DELIVERY_GUARD`. Exported for that saga, whose 401 a refresh
 * did not fix ends up here too.
 */
function* idpAnonymousRouteSaga({
  returnPath,
  scope
}) {
  // A redirect armed by this page load is under way, not spent: a concurrent
  // route saga leaves it to land.
  if (isRedirectPending(returnPath, scope)) return false;
  if (isLoginGuardArmed(returnPath, scope)) {
    yield effects.put(idpErrorUserAction(LOOP_GUARD_MESSAGE, yield effects.select(selectors$1.selectClientCredentials, 'js')));
    throw idpRouteError(401, 'Unauthorized', LOOP_GUARD_MESSAGE);
  }
  armLoginGuard(returnPath, scope);
  goToIdpCheck(returnPath);
  return false;
}

/** The IDP replacement for `handleRequiresLoginSaga`. */
function* idpHandleRequiresLoginSaga(action) {
  // The server never decides this. Routing treats a falsy return as
  // "not logged in", which on the server is always true: nobody is.
  if (CookieConstants.isSSR) return false;
  const {
    path
  } = action || {};

  // Routing passes the entry it resolved; when it does not (the release-token
  // path calls with only `requireLogin`), the entry in state counts only if
  // it belongs to this path — between a navigation and its `SET_ENTRY` the
  // routing state still holds the previous route's entry, and its content
  // type would borrow group requirements from a page we have left.
  const entry = resolveEntry(action, selectors.selectRouteEntry(yield effects.select(), 'js'));

  // Merge route, content type and app-provided requirements exactly as the
  // classic saga does, so groups from all three sources count.
  const {
    requiresLogin: routeRequiresLogin,
    requiresGroups: routeRequiresGroups
  } = routeRequirements(action, entry);

  // The session check at the top of the route change usually settled this
  // already. If it has not (a call from `ensureAccessTokenSaga`, say), settle
  // it now — that call is free when the cookies are current.
  let outcome = takeRouteSessionOutcome(path);
  if (!outcome) {
    yield effects.call(idpRouteSessionSaga, action);
    outcome = takeRouteSessionOutcome(path);
  }
  const isAuthenticated = yield effects.select(selectors$1.selectUserIsAuthenticated);

  // A public route renders. Anonymous, or as a member if there is one; no
  // redirect and nothing deleted, whatever the outcome.
  if (!routeRequiresLogin) return isAuthenticated;
  const returnPath = getLoginReturnPath(currentHref());
  if (outcome === 'session' || isAuthenticated && outcome !== 'no-session') return yield* memberRoute({
    returnPath,
    routeRequiresGroups,
    action
  });
  if (outcome === 'unknown') {
    const retry = yield* quietRetrySession();
    if (retry === 'session') return yield* memberRoute({
      returnPath,
      routeRequiresGroups,
      action
    });
    if (retry === 'no-session') return yield* idpAnonymousRouteSaga({
      returnPath
    });

    // Still no answer: a generic error, and the next navigation tries again.
    // No redirect, nothing deleted.
    yield effects.put(idpErrorUserAction(GENERIC_ERROR_MESSAGE, yield effects.select(selectors$1.selectClientCredentials, 'js')));
    throw idpRouteError(503, 'Service Unavailable', GENERIC_ERROR_MESSAGE);
  }

  // `no-session`, and this route needs a member.
  return yield* idpAnonymousRouteSaga({
    returnPath
  });
}

/**
 * The member-facing actions under `USE_IDP`. The public surface does not change
 * — `useLogin`, `withLogin`, `refreshSecurityToken` and `useChangePassword` all
 * keep working — only what the site is signed in with (identity-client's
 * cookies) and how a sign-in happens: navigate to `/idp/check`, never post a
 * password. Nothing here is MFA-specific; MFA is entirely behind `/idp/check`.
 */

/** From the first moment the store exists the member state reports loading, so
 *  every visitor gets the same value: server and client render alike, and a
 *  guard never sees "not loading, not authenticated" before the first check has
 *  settled. */
function* idpInitialUserStateSaga() {
  yield effects.put(idpResolvingUserAction(null));
}
const selectRouteRequiresLogin = state => selectors.getImmutableOrJS(state, ['routing', 'staticRoute', 'route', 'requireLogin']);

/** `loginUser()`: there are no credentials to post — the member goes to
 *  `/idp/check` for the page they were on. Credentials passed in are ignored
 *  with one warning, so a site still posting them hears why nothing happened.
 *  The once-per-path loop guard does not apply to an explicit login click. */
function* idpLoginUserSaga(action = {}) {
  if (action.username || action.password) log.warn('[idp] loginUser() ignores username and password: under USE_IDP the ' + 'member signs in at /idp/check. Remove the credentials from this call.');
  yield effects.call(goToIdpCheck, getLoginReturnPath(currentHref()));
}

/** `logoutUser(redirectPath)`: the reducer has already cleared the user, so this
 *  saga's only job is the navigation. identity-client clears its own cookies and
 *  ends the Keycloak session — we never touch a cookie. With `clearOnly` the
 *  dispatch is our own notice that another tab ended the session, so there is
 *  nothing to navigate to. */
function* idpLogoutUserSaga(action = {}) {
  if (action.clearOnly) return;

  // A signed-out member starts over: no path keeps its loop guard.
  clearLoginGuard();
  const routeRequiresLogin = yield effects.select(selectRouteRequiresLogin);
  yield effects.call(goToIdpLogout, getLogoutReturnPath({
    redirectPath: action.redirectPath,
    currentHref: currentHref(),
    // From a members area, land somewhere public.
    routeRequiresLogin: !!routeRequiresLogin
  }));
}

/** `VALIDATE_USER`: work out who is signed in, from the cookies and a refresh if
 *  needed. Returns the logged-in boolean callers of the classic saga expected. */
function* idpValidateUserSaga() {
  const clientCredentials = yield effects.select(selectors$1.selectClientCredentials, 'js');
  yield effects.put(idpResolvingUserAction(clientCredentials));
  const result = yield effects.call(resolveSession);
  if (result.outcome === 'session') {
    yield effects.put(idpSessionUserAction(result.session));
    return true;
  }

  // Only 401 ends a session, and ending it here means state only: this call
  // never navigates. Otherwise stop reporting loading and leave the rest.
  const isAuthenticated = yield effects.select(selectors$1.selectUserIsAuthenticated);
  if (result.outcome === 'no-session' && isAuthenticated) yield effects.put(idpClearSessionAction());else yield effects.put(idpSettledUserAction(clientCredentials));
  return yield effects.select(selectors$1.selectUserIsAuthenticated);
}

/** `refreshSecurityToken`, same no-argument signature, now refreshing through
 *  `/idp/refresh`. It updates the classic token we hold and never navigates:
 *  refreshing a token is not a decision to send anybody anywhere. */
function* idpRefreshSecurityTokenSaga() {
  const outcome = yield effects.call(refreshSession);
  if (outcome === 'session') {
    yield effects.put(idpClassicTokenUserAction(readIdpClassicToken(), yield effects.select(selectors$1.selectClientCredentials, 'js')));
    return;
  }
  if (outcome === 'no-session') {
    const isAuthenticated = yield effects.select(selectors$1.selectUserIsAuthenticated);
    if (isAuthenticated) yield effects.put(idpClearSessionAction());
  }
}

/** The message `useChangePassword` shows, taken from the API response exactly
 *  as the classic saga reads it. */
const changePasswordErrorMessage = error => {
  var _error$data, _error$data2;
  return (error === null || error === void 0 || (_error$data = error.data) === null || _error$data === void 0 || (_error$data = _error$data.data) === null || _error$data === void 0 ? void 0 : _error$data.length) > 0 && error.data.data[0].message || (error === null || error === void 0 || (_error$data2 = error.data) === null || _error$data2 === void 0 ? void 0 : _error$data2.message) || (error === null || error === void 0 ? void 0 : error.message) || 'We could not change your password. Please try again.';
};
/** The call itself, outside the saga, so `withManagementClient` owns the
 *  refresh-and-retry and we keep the rejection for the error message. */
const changePassword$1 = async changePasswordObject => {
  const result = await withManagementClient(client => client.security.users.updatePassword(changePasswordObject));
  return result.outcome === 'session' ? {
    ok: true
  } : {
    ok: false,
    error: result.error
  };
};

/** Change password with the access token, through the same refresh-and-retry
 *  wrapper as everything else. No classic grant. */
function* idpChangePasswordSaga(action) {
  if (!action || !action.userId || !action.currentPassword || !action.newPassword) {
    yield effects.put({
      type: selectors.CHANGE_USER_PASSWORD_ERROR,
      error: 'Invalid action object sent to changePassword saga'
    });
    return;
  }
  yield effects.put({
    type: selectors.CHANGE_USER_PASSWORD_SENDING
  });
  const result = yield effects.call(changePassword$1, {
    userId: action.userId,
    existing: action.currentPassword,
    new: action.newPassword
  });
  if (result.ok) {
    yield effects.put({
      type: selectors.CHANGE_USER_PASSWORD_SUCCESS
    });
    return;
  }
  yield effects.put({
    type: selectors.CHANGE_USER_PASSWORD_ERROR,
    error: changePasswordErrorMessage(result.error)
  });
}

// Read when the action is handled: this module is imported before `start()`
// applies `config.useIdp`, so an import-time choice would run the classic sagas
// on a server serving an IDP site.
const loginSagas = [effects.call(handleInitialUserStateSaga), effects.takeEvery(selectors.LOGIN_USER, handleLoginUserSaga), effects.takeEvery(selectors.LOGOUT_USER, handleLogoutUserSaga), effects.takeEvery(selectors.VALIDATE_USER, handleValidateUserSaga), effects.takeEvery(selectors.SET_AUTHENTICATION_STATE, redirectAfterSuccessfulLoginSaga)];
function* handleInitialUserStateSaga() {
  if (isIdpEnabled()) yield effects.call(idpInitialUserStateSaga);
}
function* handleLoginUserSaga(action) {
  if (isIdpEnabled()) return yield effects.call(idpLoginUserSaga, action);
  return yield effects.call(loginUserSaga, action);
}
function* handleLogoutUserSaga(action) {
  if (isIdpEnabled()) return yield effects.call(idpLogoutUserSaga, action);
  return yield effects.call(logoutUserSaga, action);
}
function* handleValidateUserSaga(action) {
  if (isIdpEnabled()) return yield effects.call(idpValidateUserSaga);
  return yield effects.call(validateUserSaga, action);
}
function* handleRequiresLoginSaga(action) {
  var _entry$sys;
  // The protected-route decision under USE_IDP.
  if (isIdpEnabled()) return yield effects.call(idpHandleRequiresLoginSaga, action);
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
  let userLoggedIn = yield effects.select(selectors$1.selectUserIsAuthenticated);

  // Check for a securityToken in querystring
  const currentQs = selectors.queryParams(yield effects.select(selectors.selectCurrentSearch));
  const securityToken = currentQs.securityToken || currentQs.securitytoken;

  // Check if any of the defined routes have "requireLogin" attribute
  const {
    requireLogin: authRoute
  } = staticRoute && staticRoute.route || {};
  const {
    requireLogin: authContentType
  } = entry && findContentTypeMapping(ContentTypeMappings, entry === null || entry === void 0 || (_entry$sys = entry.sys) === null || _entry$sys === void 0 ? void 0 : _entry$sys.contentTypeId) || {};

  // If requireLogin, authRoute or authContentType has been specified as an
  // array of groups we can merge all the arrays and match on any group supplied
  const routeRequiresGroups = [...(Array.isArray(authContentType) && authContentType || []), ...(Array.isArray(authRoute) && authRoute || []), ...(Array.isArray(requireLogin) && requireLogin || [])];
  const routeRequiresLogin = !!authContentType || !!authRoute || !!requireLogin;
  if (!userLoggedIn) {
    // If cookies or securityToken are found on any route change
    // always validate and login the user
    if (routeRequiresLogin) {
      // console.info(`Route requires login: ${path}`);
      // If routeRequiresLogin do a blocking call that returns userLoggedIn
      userLoggedIn = yield effects.call(validateUserSaga, {
        cookies,
        securityToken
      });
      // console.info(`User logged in: ${userLoggedIn}`);
    }
    // otherwise do a non blocking put to handle validation in the background
    else yield effects.put({
      type: selectors.VALIDATE_USER,
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
      const userGroups = yield effects.select(selectors$1.selectUserGroups, 'js');
      const groupMatch = selectors$1.matchUserGroup(userGroups, routeRequiresGroups);
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
    yield effects.put({
      type: selectors.SET_AUTHENTICATION_STATE,
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
        yield effects.put({
          type: selectors.SET_AUTHENTICATION_STATE,
          authenticationState: {
            isError: true,
            errorMessage: (error === null || error === void 0 ? void 0 : error.message) || error && 'toString' in error && error.toString()
          }
        });
      }
    }

    // Log the user in if a refreshToken is found
    if (clientCredentials.refreshToken) {
      // console.info(
      //   `Login user with refreshToken ${clientCredentials.refreshToken}`
      // );
      yield effects.call(loginUserSaga, {
        clientCredentials,
        cookies: login.cookies
      });
    }
  }

  // Tell any callers have we successfully logged in?
  return yield effects.select(selectors$1.selectUserIsAuthenticated);
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
  if (action.type === selectors.LOGIN_USER && LoginHelper.WSFED_LOGIN) LoginHelper.ClientRedirectToSignInPage();
  const {
    authenticationState,
    user
  } = yield login.LoginUser({
    username,
    password,
    clientCredentials
  });
  yield effects.put({
    type: selectors.SET_AUTHENTICATION_STATE,
    authenticationState,
    user
  });
}
const removeHostnamePart = path => {
  const relativePath = '/' + path.split('/').splice(3).join('/');
  return relativePath;
};
function* redirectAfterSuccessfulLoginSaga() {
  // Under `USE_IDP`, `/idp/check` returns the member to `returnPath` itself.
  if (isIdpEnabled()) return;
  const isLoggedIn = yield effects.select(selectors$1.selectUserIsAuthenticated);
  const {
    redirect_uri,
    ReturnURL
  } = selectors.queryParams(yield effects.select(selectors.selectCurrentSearch));
  const redirectPath = Array.isArray(redirect_uri) ? redirect_uri[0] : redirect_uri;
  const assetRedirectPath = Array.isArray(ReturnURL) ? ReturnURL[0] : ReturnURL;
  if (isLoggedIn && assetRedirectPath && typeof window != 'undefined') {
    const path = removeHostnamePart(assetRedirectPath);
    // This has to be a hard href to get the app to
    // leave React and hit the server for the IIS hosted assets
    window.location.href = path;
    // yield put(setRoute(path)); // does not work in this scenario
  } else if (isLoggedIn && redirectPath) {
    yield effects.put(selectors.setRoute(redirectPath));
  }
}
function* logoutUserSaga({
  redirectPath,
  cookies
}) {
  yield effects.put({
    type: selectors.SET_AUTHENTICATION_STATE,
    user: null
  });
  yield LoginHelper.withCookies(cookies).LogoutUser(redirectPath);
}
function* refreshSecurityToken() {
  // Refresh through `/idp/refresh`, same signature.
  if (isIdpEnabled()) return yield effects.call(idpRefreshSecurityTokenSaga);
  const clientCredentials = yield effects.select(selectors$1.selectClientCredentials, 'js');
  if (Object.keys(clientCredentials).length > 0) {
    const client = yield getManagementApiClient(clientCredentials);
    yield client.authenticate();
    yield effects.put({
      type: selectors.SET_AUTHENTICATION_STATE,
      authenticationState: {
        clientCredentials: mapClientCredentials(client)
      }
    });
  }
}

/** Credentials are optional: a site on `USE_IDP` signs the member in at
 *  `/idp/check` and has nothing to pass, so `loginUser()` is the whole call.
 *  Classic sites carry on passing them. */
const loginUser = (username, password, cookies) => selectors.action(selectors.LOGIN_USER, {
  username,
  password,
  cookies
});
const logoutUser = (redirectPath, cookies) => selectors.action(selectors.LOGOUT_USER, {
  redirectPath,
  cookies
});
const registerUser = (user, mappers) => selectors.action(selectors.REGISTER_USER, {
  user,
  mappers
});
const requestPasswordReset = userEmailObject => selectors.action(selectors.REQUEST_USER_PASSWORD_RESET, {
  userEmailObject
});
const resetPassword = resetPasswordObject => selectors.action(selectors.RESET_USER_PASSWORD, {
  resetPasswordObject
});
const changePassword = (userId, currentPassword, newPassword) => selectors.action(selectors.CHANGE_USER_PASSWORD, {
  userId,
  currentPassword,
  newPassword
});

var actions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  changePassword: changePassword,
  loginUser: loginUser,
  logoutUser: logoutUser,
  registerUser: registerUser,
  requestPasswordReset: requestPasswordReset,
  resetPassword: resetPassword
});

const useLogin = () => {
  const cookies = new CookieHelper_class.CookieHelper(...reactCookie.useCookies());
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password, cookies)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath, cookies)),
    errorMessage: select(selectors$1.selectUserErrorMessage),
    isAuthenticated: select(selectors$1.selectUserIsAuthenticated),
    isAuthenticationError: select(selectors$1.selectUserIsAuthenticationError),
    isError: select(selectors$1.selectUserIsError),
    isLoading: select(selectors$1.selectUserIsLoading),
    user: select(selectors$1.selectUser),
    // DEPRECATED: authenticationError is deprecated use isAuthenticationError instead
    authenticationError: select(selectors$1.selectUserIsAuthenticationError),
    // DEPRECATED: authenticationErrorMessage is deprecated use errorMessage instead
    authenticationErrorMessage: select(selectors$1.selectUserErrorMessage),
    // DEPRECATED: error is deprecated use isError instead
    error: select(selectors$1.selectUserIsError)
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
var Login_container = ToJs.toJS(LoginContainer);

const useRegistration = () => {
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    registerUser: (user, mappers) => dispatch(registerUser(user, mappers)),
    error: select(selectors$1.selectUserRegistrationError),
    isLoading: select(selectors$1.selectUserRegistrationIsLoading),
    isSuccess: select(selectors$1.selectUserRegistrationIsSuccess),
    user: select(selectors$1.selectUserRegistration, reactRedux.shallowEqual)
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
var Registration_container = ToJs.toJS(RegistrationContainer);

const useForgotPassword = () => {
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    isLoading: select(selectors$1.selectPasswordResetRequestSending),
    isSuccess: select(selectors$1.selectPasswordResetRequestSent),
    error: select(selectors$1.selectPasswordResetRequestError),
    requestPasswordReset: userEmailObject => dispatch(requestPasswordReset(userEmailObject)),
    setNewPassword: {
      queryString: select(selectors.selectCurrentSearch),
      isLoading: select(selectors$1.selectResetPasswordSending),
      isSuccess: select(selectors$1.selectResetPasswordSent),
      error: select(selectors$1.selectResetPasswordError),
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
var ForgotPassword_container = ToJs.toJS(ForgotPasswordContainer);

const useChangePassword = () => {
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    isLoading: select(selectors$1.selectChangePasswordSending),
    isSuccess: select(selectors$1.selectChangePasswordSent),
    userId: select(selectors$1.selectUserGuid),
    isLoggedIn: select(selectors$1.selectUserIsAuthenticated),
    error: select(selectors$1.selectChangePasswordError),
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
var ChangePassword_container = ToJs.toJS(ChangePasswordContainer);

exports.ChangePassword_container = ChangePassword_container;
exports.DELIVERY_GUARD = DELIVERY_GUARD;
exports.ForgotPassword_container = ForgotPassword_container;
exports.GENERIC_ERROR_MESSAGE = GENERIC_ERROR_MESSAGE;
exports.IDP_ACCESS_TOKEN_COOKIE = IDP_ACCESS_TOKEN_COOKIE;
exports.LoginHelper = LoginHelper;
exports.Login_container = Login_container;
exports.Registration_container = Registration_container;
exports.actions = actions;
exports.activeLoginMethod = activeLoginMethod;
exports.currentHref = currentHref;
exports.fetchOnce = fetchOnce;
exports.findContentTypeMapping = findContentTypeMapping;
exports.getAccessDeniedRoute = getAccessDeniedRoute;
exports.getLoginReturnPath = getLoginReturnPath;
exports.getManagementApiClient = getManagementApiClient;
exports.getSearchOptions = getSearchOptions;
exports.handleRequiresLoginSaga = handleRequiresLoginSaga;
exports.hasDeliveryReloadFor = hasDeliveryReloadFor;
exports.idpAnonymousRouteSaga = idpAnonymousRouteSaga;
exports.idpChangePasswordSaga = idpChangePasswordSaga;
exports.idpRouteError = idpRouteError;
exports.idpRouteSessionSaga = idpRouteSessionSaga;
exports.isIdpEnabled = isIdpEnabled;
exports.logError = logError;
exports.loginSagas = loginSagas;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.refreshSecurityToken = refreshSecurityToken;
exports.refreshSession = refreshSession;
exports.registerUser = registerUser;
exports.rememberDeliveryReload = rememberDeliveryReload;
exports.shorten = shorten;
exports.useChangePassword = useChangePassword;
exports.useForgotPassword = useForgotPassword;
exports.useLogin = useLogin;
exports.useRegistration = useRegistration;
//# sourceMappingURL=ChangePassword.container-C5zYv_qd.js.map
