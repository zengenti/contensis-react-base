/** A guard older than this no longer suppresses a retry. */
export declare const LOGIN_GUARD_TTL_MS: number;
/** Delivery 401s escalate under their own key, which establishing a session must
 *  not disarm: a member whose Delivery access keeps failing would otherwise be
 *  redirected to `/idp/check` on every load. */
export declare const DELIVERY_GUARD = "delivery";
/** Has an automatic redirect to `/idp/check` already been made for this path? */
export declare const isLoginGuardArmed: (returnPath: string, scope?: string) => boolean;
/** Was that redirect made by this page load? Then it is under way, not spent: a
 *  concurrent route saga must not read it as a failed attempt. */
export declare const isRedirectPending: (returnPath: string, scope?: string) => boolean;
/** Arm the guard for this path. Automatic redirects only. */
export declare const armLoginGuard: (returnPath: string, scope?: string) => void;
/** Disarm the guard: when a member is shown on the path, and on logout — where
 *  passing no path clears every guarded path. */
export declare const clearLoginGuard: (returnPath?: string, scope?: string) => void;
