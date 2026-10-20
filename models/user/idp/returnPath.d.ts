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
export declare const LOGIN_ROUTE = "/account/login";
/**
 * Resolve a candidate to a local path on this origin, or `/` when it is not
 * one. Keeps path, query and hash.
 */
export declare const sanitiseLocalPath: (candidate: string | null | undefined, origin: string) => string;
/**
 * The `returnPath` for a trip to `/idp/check`: normally the current path. When
 * the current path *is* the site's login route, that page's own target is used
 * instead — `redirect_uri` (the react-base classic hand-off) or `ReturnURL` (the
 * asset/IIS one) — falling back to `/`.
 */
export declare const getLoginReturnPath: (currentHref: string) => string;
/** The `returnPath` for a trip to `/idp/logout`: the path the caller asked for,
 *  else the current path, else `/` when the current route requires login — so a
 *  logout from a members area lands somewhere public. */
export declare const getLogoutReturnPath: ({ redirectPath, currentHref, routeRequiresLogin, }: {
    redirectPath?: string;
    currentHref: string;
    routeRequiresLogin?: boolean;
}) => string;
