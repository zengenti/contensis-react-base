/**
 * The `fetch` every Contensis call in this library goes through;
 * `enterprise-fetch` supplies the timeout, so no call site writes the
 * `AbortController` dance again.
 *
 * It retries nothing, deliberately. The wrapper throws whatever it is told to
 * retry, so a retried status arrives as a thrown `Response` rather than the SDK
 * error our callers classify — and a retried stall doubles a route's worst case.
 * Every call here is either a definitive answer or already retries itself.
 */
import { fetchWithDefaults } from 'enterprise-fetch';

/** One timeout for the short calls made inside a route change, so a hung
 *  dependency cannot stall a route twice as long as another. */
export const FETCH_TIMEOUT_MS = 5000;

/** One attempt, aborted after `FETCH_TIMEOUT_MS` (or a `timeout` on the call). */
export const fetchOnce = fetchWithDefaults({
  timeout: FETCH_TIMEOUT_MS,
  retry: { retries: 0, minTimeout: 0, factor: 1 },
  doRetry: async () => false,
});
