/**
 * `POST /idp/refresh` — the one call that answers "is there a session?".
 * Same-origin, carrying the `X-Contensis-Refresh` header as the CSRF
 * protection: without it identity-client answers 403, which is also why a page
 * on another origin cannot force a refresh.
 *
 * Only a 401 ends a session. Everything else — timeout, network error, 5xx, a
 * 200 that left the access token cookie unreadable, and a 403 (our own
 * missing-header defect) — is `unknown`, and `unknown` never logs anyone out.
 *
 * Concurrent callers share one in-flight request.
 */
import { error } from 'loglevel';

import { FETCH_TIMEOUT_MS, fetchOnce } from '~/util/fetch';
import { logError } from '~/util/errors';
import { IDP_ACCESS_TOKEN_COOKIE, readIdpAccessToken } from './cookies';

export const IDP_REFRESH_PATH = '/idp/refresh';

/** Matches the admin UI's refresh timeout. */
export const IDP_REFRESH_TIMEOUT_MS = FETCH_TIMEOUT_MS;

export type RefreshOutcome = 'session' | 'no-session' | 'unknown';

let inFlight: Promise<RefreshOutcome> | null = null;

/** Set when a refresh returns 200 without leaving a readable access token
 *  cookie. Asking again cannot fix that, so we stop and log it once. */
let cookielessRefreshSeen = false;

const performRefresh = async (): Promise<RefreshOutcome> => {
  let response: Response | undefined;
  try {
    response = await fetchOnce(IDP_REFRESH_PATH, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'X-Contensis-Refresh': '1' },
    });
  } catch (e) {
    // Timeout (abort) or a network failure: we do not know, so we do nothing.
    logError('[idp] POST /idp/refresh request failed', e);
    return 'unknown';
  }

  if (response.status === 200) {
    // A 200 writes a new access token cookie. If it is still not readable the
    // refresh has not given us a session we can use.
    if (!readIdpAccessToken()) {
      if (!cookielessRefreshSeen) {
        cookielessRefreshSeen = true;
        error(
          `[idp] POST ${IDP_REFRESH_PATH} returned 200 but the ` +
            `"${IDP_ACCESS_TOKEN_COOKIE}" cookie is still not readable. No ` +
            "further refresh this page load. Check the cookie's Domain, Path, " +
            'Secure and SameSite attributes against this host.'
        );
      }
      return 'unknown';
    }
    cookielessRefreshSeen = false;
    return 'session';
  }

  if (response.status === 401) return 'no-session';

  if (response.status === 403)
    error(
      `[idp] POST ${IDP_REFRESH_PATH} returned 403 — the ` +
        'X-Contensis-Refresh header is missing, which is a code defect. ' +
        'Treating the outcome as unknown so no member is logged out.'
    );
  else
    error(
      `[idp] POST ${IDP_REFRESH_PATH} responded ${response.status} ` +
        `${response.statusText} — treated as unknown`
    );

  return 'unknown';
};

/** Refresh the session, sharing one in-flight call between concurrent callers.
 *  Never rejects: an unreachable identity-client is `unknown`, not an exception. */
export const refreshSession = (): Promise<RefreshOutcome> => {
  if (inFlight) return inFlight;

  // A refresh that succeeded without leaving a readable cookie will not do
  // better on a second attempt in the same page load.
  if (cookielessRefreshSeen && !readIdpAccessToken())
    return Promise.resolve('unknown');

  inFlight = performRefresh().then(
    outcome => {
      inFlight = null;
      return outcome;
    },
    e => {
      inFlight = null;
      logError('[idp] POST /idp/refresh threw', e);
      return 'unknown' as RefreshOutcome;
    }
  );

  return inFlight;
};
