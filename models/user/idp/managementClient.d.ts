import type { Client } from 'contensis-management-api';
/** The three-way outcome every IDP call reports. `error` carries the rejection
 *  behind a non-success so a caller can still report what the API said — a wrong
 *  current password, say, is a 400 we must show. */
export type IdpResult<T> = {
    outcome: 'session';
    value: T;
} | {
    outcome: 'no-session';
    error?: unknown;
} | {
    outcome: 'unknown';
    error?: unknown;
};
export declare const noSession: (error?: unknown) => IdpResult<never>;
export declare const unknownResult: (error?: unknown) => IdpResult<never>;
/** A client that speaks for the member behind the access token cookie. A new one
 *  per attempt: after a refresh the token must be read from the browser, never
 *  reused from a value captured earlier. */
export declare const createIdpManagementClient: (accessToken: string) => Promise<Client>;
/** Run `run` against a cookie-backed Management API client. A missing access
 *  token refreshes first; a 401 refreshes once and retries once. The callback
 *  throwing is how a nested call (groups, say) reports a 401 it wants retried
 *  here. */
export declare const withManagementClient: <T>(run: (client: Client) => Promise<T>) => Promise<IdpResult<T>>;
