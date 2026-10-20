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
export declare const IDP_CHECK_PATH = "/idp/check";
export declare const IDP_LOGOUT_PATH = "/idp/logout";
export declare const ACCESS_DENIED_ROUTE = "/account/access-denied";
/** identity-client sends a member with no session on to Keycloak. */
export declare const getIdpCheckUrl: (returnPath: string) => string;
/** identity-client clears its cookies and ends the Keycloak session. */
export declare const getIdpLogoutUrl: (returnPath: string) => string;
export declare const getAccessDeniedRoute: (originalPath?: string) => string;
/** The address the browser is actually on. The routing action's location is the
 *  route React is rendering, which during a navigation can lag the URL a
 *  `returnPath` should be taken from. */
export declare const currentHref: () => string;
/** `replace` so the logged-out view of a protected page is not left in history
 *  behind the Keycloak round trip. */
export declare const goToIdpCheck: (returnPath: string) => void;
export declare const goToIdpLogout: (returnPath: string) => void;
export declare const goToAccessDenied: (originalPath?: string) => void;
