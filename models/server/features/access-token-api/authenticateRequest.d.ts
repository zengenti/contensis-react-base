import { Request } from 'express';
import { UserWithGroups } from "../../../user/state";
/** The credentials a request can be resolved with: a bearer token from the
 *  Authorization header or the login cookies, plus the refresh token cookie.
 *  `cookiesMiddleware()` is registered later by webApp, so read the header
 *  direct. */
export declare const getRequestCredentials: (req: Request) => {
    bearerToken: any;
    refreshToken: any;
};
/**
 * Resolve a user from the credentials supplied, so callers only need care
 * about the returned user (or `null` when nothing authenticates).
 *
 * The bearer token is tried first, falling back to the refresh token if it's
 * missing or stale. The resolved user carries their groups where they were
 * resolved, so callers can check group membership. Groups are only resolved
 * when `resolveGroups` is set.
 *
 * A failed bearer token is only reported when the request fails to
 * authenticate overall - a stale bearer that a refresh login recovers from
 * is the normal case and is not logged.
 */
export declare const authenticateRequest: (bearerToken: string | undefined, refreshToken: string | undefined, resolveGroups?: boolean) => Promise<UserWithGroups | null>;
export default authenticateRequest;
