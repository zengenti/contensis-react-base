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

export const IDP_CHECK_PATH = '/idp/check';
export const IDP_LOGOUT_PATH = '/idp/logout';
export const ACCESS_DENIED_ROUTE = '/account/access-denied';

const withReturnPath = (path: string, returnPath?: string) =>
  returnPath
    ? `${path}?returnPath=${encodeURIComponent(returnPath)}`
    : path;

/** identity-client sends a member with no session on to Keycloak. */
export const getIdpCheckUrl = (returnPath: string) =>
  withReturnPath(IDP_CHECK_PATH, returnPath);

/** identity-client clears its cookies and ends the Keycloak session. */
export const getIdpLogoutUrl = (returnPath: string) =>
  withReturnPath(IDP_LOGOUT_PATH, returnPath);

export const getAccessDeniedRoute = (originalPath?: string) => {
  if (typeof originalPath !== 'string' || originalPath === ACCESS_DENIED_ROUTE)
    return ACCESS_DENIED_ROUTE;
  return `${ACCESS_DENIED_ROUTE}?original_uri=${originalPath}`;
};

const navigate = (url: string, replace = false) => {
  // Server rendering never navigates.
  if (typeof window === 'undefined') return;
  if (replace) window.location.replace(url);
  else window.location.href = url;
};

/** The address the browser is actually on. The routing action's location is the
 *  route React is rendering, which during a navigation can lag the URL a
 *  `returnPath` should be taken from. */
export const currentHref = () =>
  typeof window === 'undefined' ? '' : window.location.href;

/** `replace` so the logged-out view of a protected page is not left in history
 *  behind the Keycloak round trip. */
export const goToIdpCheck = (returnPath: string) =>
  navigate(getIdpCheckUrl(returnPath), true);

export const goToIdpLogout = (returnPath: string) =>
  navigate(getIdpLogoutUrl(returnPath));

export const goToAccessDenied = (originalPath?: string) =>
  navigate(getAccessDeniedRoute(originalPath));
