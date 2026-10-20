/**
 * IDP session auth: everything that talks to `/idp/*` or reads identity-client's
 * cookies. The existing auth code hands over to it with a one-line
 * `if (isIdpEnabled())`.
 *
 * Nothing here imports `LoginHelper`, `CookieHelper`, `ContensisManagementApi`,
 * `mapClientCredentials` or `CookieConstants`, so when classic and WSFED login
 * are deleted at v5 the switches collapse into direct calls and this folder does
 * not change. It never writes or deletes a cookie, never reads the session
 * during server rendering, and never requests a classic grant.
 */
export { activeLoginMethod, isIdpEnabled, isWsFedLoginEnabled, LoginMethod, } from './setting';
export { IDP_ACCESS_TOKEN_COOKIE, IDP_CLASSIC_TOKEN_COOKIE, hasIdpSessionCookies, readIdpAccessToken, readIdpClassicToken, } from './cookies';
export { IDP_REFRESH_PATH, IDP_REFRESH_TIMEOUT_MS, RefreshOutcome, refreshSession, } from './refresh';
export { getLoginReturnPath, getLogoutReturnPath, sanitiseLocalPath, } from './returnPath';
export { ACCESS_DENIED_ROUTE, IDP_CHECK_PATH, IDP_LOGOUT_PATH, getAccessDeniedRoute, getIdpCheckUrl, getIdpLogoutUrl, goToAccessDenied, goToIdpCheck, goToIdpLogout, } from './navigation';
export { LOGIN_GUARD_TTL_MS, armLoginGuard, clearLoginGuard, isLoginGuardArmed, } from './loginGuard';
export { IdpSession, SessionResult, buildSession, identityHasChanged, resolveSession, } from './session';
export { IdpResult, withManagementClient } from './managementClient';
export { idpChangePasswordSaga, idpInitialUserStateSaga, idpLoginUserSaga, idpLogoutUserSaga, idpRefreshSecurityTokenSaga, idpValidateUserSaga, } from './sagas/userActions';
export { idpAnonymousRouteSaga, idpHandleRequiresLoginSaga, } from './sagas/requireLogin';
export { idpRouteSessionSaga } from './sagas/routeSession';
export { idpDeliveryAuthErrorSaga } from './sagas/deliveryAuthError';
