/** One timeout for the short calls made inside a route change, so a hung
 *  dependency cannot stall a route twice as long as another. */
export declare const FETCH_TIMEOUT_MS = 5000;
/** One attempt, aborted after `FETCH_TIMEOUT_MS` (or a `timeout` on the call). */
export declare const fetchOnce: import("enterprise-fetch").Fetch;
