/**
 * A Management API client built from the access token cookie, at the moment of
 * the call. Nothing about it can start a classic grant:
 *
 * - `bearerTokenExpiryDate` is far in the future, so the SDK's
 *   `isBearerTokenExpired()` is false and `ensureBearerToken()` resolves without
 *   asking for a token.
 * - No `clientType` and no `clientDetails`, so anything that does reach
 *   `/authenticate/connect/token` posts `grant_type=null` and fails rather than
 *   firing a `contensis_classic` grant. `clientType: 'none'` is not an option:
 *   it throws without a Delivery access token.
 * - Every request carries the token in `Authorization`, read fresh each time.
 * - `fetchFn` aborts after the shared timeout, so a hung Management API becomes
 *   `unknown` instead of stalling the route.
 *
 * `withManagementClient` adds the one refresh-and-retry a 401 earns and
 * classifies everything else as `unknown`. This module deliberately avoids
 * `getManagementApiClient`, which is classic-shaped and deleted at v5.
 */
import to from 'await-to-js';
import type { Client } from 'contensis-management-api';

import { isApiError } from '~/util/errors';
import { fetchOnce } from '~/util/fetch';
import { readIdpAccessToken } from './cookies';
import { refreshSession } from './refresh';

/** Far enough ahead that the SDK never treats our bearer as expiring. */
const BEARER_EXPIRY_FAR_FUTURE_MS = 1000 * 60 * 60 * 24 * 365 * 10;

/** The three-way outcome every IDP call reports. `error` carries the rejection
 *  behind a non-success so a caller can still report what the API said — a wrong
 *  current password, say, is a 400 we must show. */
export type IdpResult<T> =
  | { outcome: 'session'; value: T }
  | { outcome: 'no-session'; error?: unknown }
  | { outcome: 'unknown'; error?: unknown };

export const noSession = (error?: unknown): IdpResult<never> => ({
  outcome: 'no-session',
  error,
});
export const unknownResult = (error?: unknown): IdpResult<never> => ({
  outcome: 'unknown',
  error,
});

/** The HTTP status of a rejection from the SDK's http client, if it has one. */
const statusOf = (e: unknown): number | undefined =>
  isApiError(e) ? e.status : undefined;

/** A client that speaks for the member behind the access token cookie. A new one
 *  per attempt: after a refresh the token must be read from the browser, never
 *  reused from a value captured earlier. */
export const createIdpManagementClient = async (
  accessToken: string
): Promise<Client> => {
  const rootUrl = SERVERS.cms || SERVERS.api; /* global SERVERS */
  const projectId = PROJECTS[0].id; /* global PROJECTS */

  let { Client: ManagementClient } = await import('contensis-management-api');

  if (typeof window === 'undefined') {
    const { UniversalClient } = await import('contensis-management-api');
    ManagementClient = UniversalClient as unknown as typeof ManagementClient;
  }

  const client = ManagementClient.create({
    projectId,
    rootUrl,
    fetchFn: fetchOnce,
  });

  client.bearerToken = accessToken;
  client.bearerTokenExpiryDate = new Date(
    Date.now() + BEARER_EXPIRY_FAR_FUTURE_MS
  );

  return client;
};

type Attempt<T> =
  | { ok: true; value: T }
  | { ok: false; status?: number; error: unknown };

const attempt = async <T>(
  run: (client: Client) => Promise<T>,
  accessToken: string
): Promise<Attempt<T>> => {
  const [clientError, client] = await to(createIdpManagementClient(accessToken));
  if (clientError || !client) return { ok: false, error: clientError };

  const [error, value] = await to(run(client));
  if (error)
    return { ok: false, status: statusOf(error), error };

  return { ok: true, value: value as T };
};

/** Run `run` against a cookie-backed Management API client. A missing access
 *  token refreshes first; a 401 refreshes once and retries once. The callback
 *  throwing is how a nested call (groups, say) reports a 401 it wants retried
 *  here. */
export const withManagementClient = async <T>(
  run: (client: Client) => Promise<T>
): Promise<IdpResult<T>> => {
  let accessToken = readIdpAccessToken();

  if (!accessToken) {
    const outcome = await refreshSession();
    if (outcome === 'no-session') return noSession();
    if (outcome !== 'session') return unknownResult();

    accessToken = readIdpAccessToken();
    if (!accessToken) return unknownResult();
  }

  const first = await attempt(run, accessToken);
  if (first.ok) return { outcome: 'session', value: first.value };
  if (first.status !== 401) return unknownResult(first.error);

  const refresh = await refreshSession();
  if (refresh === 'no-session') return noSession(first.error);
  if (refresh !== 'session') return unknownResult(first.error);

  const freshToken = readIdpAccessToken();
  if (!freshToken) return unknownResult(first.error);

  const retry = await attempt(run, freshToken);
  if (retry.ok) return { outcome: 'session', value: retry.value };

  // One refresh, one retry, still refused: the session is gone.
  return retry.status === 401
    ? noSession(retry.error)
    : unknownResult(retry.error);
};
