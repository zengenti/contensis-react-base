/**
 * The `fetch` every Contensis call in this library goes through.
 *
 * `enterprise-fetch` supplies the request timeout, so no call site has to write
 * the `AbortController` dance again.
 *
 * It retries nothing, and that is deliberate rather than an oversight. The
 * wrapper *throws whatever it is told to retry*, so a retried status arrives as
 * a thrown `Response` instead of the SDK error our callers classify, and a
 * retried stall multiplies a route's worst-case latency past the budget KTD4 and
 * KTD5 set for it. Every call here is either a definitive answer — a 401 from
 * `/idp/refresh` ends a session — or already has its own retry (the quiet retry
 * on a protected route, the 401 refresh-and-retry in `withManagementClient`).
 * Retry is a policy decision for those budgets, not a tidy-up.
 */
import { fetchWithDefaults } from 'enterprise-fetch';

/** One timeout for the short calls made inside a route change, so a hung
 *  dependency cannot stall a route twice as long as another (KTD4, KTD5). */
export const FETCH_TIMEOUT_MS = 5000;

/** One attempt, aborted after `FETCH_TIMEOUT_MS` (or a `timeout` on the call). */
export const fetchOnce = fetchWithDefaults({
  timeout: FETCH_TIMEOUT_MS,
  retry: { retries: 0, minTimeout: 0, factor: 1 },
  doRetry: async () => false,
});
