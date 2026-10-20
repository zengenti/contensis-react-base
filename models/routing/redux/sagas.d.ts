export const routingSagas: import("redux-saga/effects").ForkEffect<never>[];
/** A hung release would otherwise sit in `releasesInFlight` and block every
 *  later navigation on it, so one attempt gets a timeout and then the normal
 *  failure path. Longer than the short calls a route change makes: this one
 *  waits on the CMS. */
export const RELEASE_TIMEOUT_MS: 15000;
export function releaseAccessTokenShared(releaseUri: any, timeoutMs?: number): any;
