/**
 * `POST /idp/refresh` — the one network call that answers "is there a session?"
 * (KTD4).
 *
 * The request is same-origin with the `X-Contensis-Refresh` header, which is
 * the CSRF protection: without it identity-client answers 403. The header is
 * the reason a page on another origin cannot force a refresh.
 *
 * Three outcomes, and only one of them ends a session (R8, R9):
 *
 * - `session`     — 200 with a readable access token cookie.
 * - `no-session`  — 401. identity-client has already cleared its cookies.
 * - `unknown`     — timeout, network error, 5xx, or a 200 that left the access
 *                   token cookie unreadable (R23). Never a logout.
 *
 * A 403 means we forgot the header, i.e. a code defect. It is logged as one and
 * classified `unknown`, so a defect in our code cannot log a member out.
 *
 * One call is shared by everything waiting at that moment: concurrent callers
 * get the same in-flight promise.
 */
import { error } from 'loglevel';

import { logError } from '~/util/errors';
import { IDP_ACCESS_TOKEN_COOKIE, readIdpAccessToken } from './cookies';

export const IDP_REFRESH_PATH = '/idp/refresh';

/** Matches the admin UI's refresh timeout (KTD4). */
export const IDP_REFRESH_TIMEOUT_MS = 5000;

export type RefreshOutcome = 'session' | 'no-session' | 'unknown';

let inFlight: Promise<RefreshOutcome> | null = null;

/** Set once when a refresh returns 200 without leaving a readable access token
 *  cookie. Retrying the same call on the same page load cannot fix that, so we
 *  stop asking and report one console error. */
let cookielessRefreshSeen = false;

const performRefresh = async (): Promise<RefreshOutcome> => {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    IDP_REFRESH_TIMEOUT_MS
  );

  let response: Response | undefined;
  try {
    response = await fetch(IDP_REFRESH_PATH, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'X-Contensis-Refresh': '1' },
      signal: controller.signal,
    });
  } catch (e) {
    // Timeout (abort) or a network failure: we do not know, so we do nothing.
    logError('[idp] POST /idp/refresh request failed', e);
    return 'unknown';
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 200) {
    // A 200 writes a new access token cookie. If it is still not readable the
    // refresh has not given us a session we can use (R23).
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

/**
 * Refresh the session, sharing one in-flight call between concurrent callers.
 * Never rejects: an unreachable identity-client is `unknown`, not an exception.
 */
export const refreshSession = (): Promise<RefreshOutcome> => {
  if (inFlight) return inFlight;

  // A refresh that succeeded without leaving a readable cookie will not do
  // better on a second attempt in the same page load (R23).
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
