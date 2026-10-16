/**
 * IDP session auth (KTD1).
 *
 * Everything that talks to `/idp/*` or reads identity-client's cookies lives in
 * this folder and is reached from the existing auth code through a one-line
 * `if (isIdpEnabled())` hand-over. Nothing here imports `LoginHelper`,
 * `CookieHelper`, `ContensisManagementApi`, `mapClientCredentials` or
 * `CookieConstants`, so when classic and WSFED login are deleted at v5 the
 * switches collapse into direct calls and this module does not change (R4, R5,
 * KTD9).
 *
 * The module never writes or deletes a cookie (R7), never reads the session
 * during server rendering (R19), and never requests a classic grant (R11).
 */

// Setting
export {
  activeLoginMethod,
  isIdpEnabled,
  isWsFedLoginEnabled,
  LoginMethod,
} from './setting';

// identity-client primitives
export {
  IDP_ACCESS_TOKEN_COOKIE,
  IDP_CLASSIC_TOKEN_COOKIE,
  hasIdpSessionCookies,
  readIdpAccessToken,
  readIdpClassicToken,
} from './cookies';
export {
  IDP_REFRESH_PATH,
  IDP_REFRESH_TIMEOUT_MS,
  RefreshOutcome,
  refreshSession,
} from './refresh';
export {
  getLoginReturnPath,
  getLogoutReturnPath,
  sanitiseLocalPath,
} from './returnPath';
export {
  ACCESS_DENIED_ROUTE,
  IDP_CHECK_PATH,
  IDP_LOGOUT_PATH,
  getAccessDeniedRoute,
  getIdpCheckUrl,
  getIdpLogoutUrl,
  goToAccessDenied,
  goToIdpCheck,
  goToIdpLogout,
} from './navigation';
export {
  LOGIN_GUARD_TTL_MS,
  armLoginGuard,
  clearLoginGuard,
  isLoginGuardArmed,
} from './loginGuard';

// session
export {
  IdpSession,
  SessionResult,
  buildSession,
  identityHasChanged,
  resolveSession,
} from './session';
export { IdpResult, withManagementClient } from './managementClient';

// sagas — the functions the KTD1 switches hand over to
export {
  idpChangePasswordSaga,
  idpInitialUserStateSaga,
  idpLoginUserSaga,
  idpLogoutUserSaga,
  idpRefreshSecurityTokenSaga,
  idpValidateUserSaga,
} from './sagas/userActions';
export {
  idpAnonymousRouteSaga,
  idpHandleRequiresLoginSaga,
} from './sagas/requireLogin';
export { idpRouteSessionSaga } from './sagas/routeSession';
export { idpDeliveryAuthErrorSaga } from './sagas/deliveryAuthError';
