export declare const IDP_REFRESH_PATH = "/idp/refresh";
/** Matches the admin UI's refresh timeout. */
export declare const IDP_REFRESH_TIMEOUT_MS = 5000;
export type RefreshOutcome = 'session' | 'no-session' | 'unknown';
/** Refresh the session, sharing one in-flight call between concurrent callers.
 *  Never rejects: an unreachable identity-client is `unknown`, not an exception. */
export declare const refreshSession: () => Promise<RefreshOutcome>;
