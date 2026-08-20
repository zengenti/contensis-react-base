import { Request } from 'express';
import { to } from 'await-to-js';
import Cookies from 'universal-cookie';

import { UserWithGroups } from '~/user/state';
import { logError } from '~/util/errors';
import { getManagementApiClient } from '~/user/util/ContensisManagementApi';
import { LoginHelper } from '~/user/util/LoginHelper.class';
import {
  BEARER_TOKEN_COOKIE,
  LOGIN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from '~/user/util/CookieConstants';

/** The credentials a request can be resolved with: a bearer token from the
 *  Authorization header or the login cookies, plus the refresh token cookie.
 *  `cookiesMiddleware()` is registered later by webApp, so read the header
 *  direct. */
export const getRequestCredentials = (req: Request) => {
  const cookies = new Cookies(req.headers.cookie || '').getAll();
  return {
    bearerToken:
      req.headers.authorization?.replace(/^Bearer /i, '') ||
      cookies[LOGIN_COOKIE] ||
      cookies[BEARER_TOKEN_COOKIE],
    refreshToken: cookies[REFRESH_TOKEN_COOKIE],
  };
};

/**
 * Resolve a user from the credentials supplied, so callers only need care
 * about the returned user (or `null` when nothing authenticates).
 *
 * The bearer token is tried first, falling back to the refresh token if it's
 * missing or stale. The resolved user carries their groups where they were
 * resolved, so callers can check group membership. Groups are only resolved
 * when `resolveGroups` is set.
 *
 * A failed bearer token is only reported when the request fails to
 * authenticate overall - a stale bearer that a refresh login recovers from
 * is the normal case and is not logged.
 */
export const authenticateRequest = async (
  bearerToken: string | undefined,
  refreshToken: string | undefined,
  resolveGroups = false
): Promise<UserWithGroups | null> => {
  // Remember why the bearer token (if any) didn't resolve a user, so it can
  // be reported only when the request fails to authenticate overall.
  let bearerError: unknown = null;

  if (bearerToken) {
    // TODO: `/api/security/users/@current` lifted from contensis-management-api,
    // could just use the management api?
    const [error, response] = await to(
      fetch(`${LoginHelper.CMS_URL}/api/security/users/@current`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          Accept: 'application/json',
        },
      })
    );

    if (error) {
      bearerError = error;
    } else if (!response?.ok) {
      // `statusText` is the HTTP/1 reason phrase, which is empty over HTTP/2
      // and when the server omits it (Node doesn't send one), so remember the
      // numeric status only.
      bearerError = `@current responded ${response.status}`;
    } else {
      const [parseError, user] = await to(response.json());
      if (parseError) {
        bearerError = parseError;
      } else if (!user?.id) {
        bearerError = '@current response has no user id';
      } else {
        // `@current` returns the user alone, so where the caller needs
        // checking against user groups, resolve them the same way the refresh
        // path does. A failure here leaves the user without groups, so
        // group-restricted tokens fail closed for them while plain
        // `requireLogin: true` tokens still release - log it so a surprise
        // 403 is traceable.
        if (resolveGroups) {
          const [groupsError, groupsResponse] = await to(
            fetch(
              `${LoginHelper.CMS_URL}/api/security/users/${user.id}/groups?includeInherited=true&pageSize=500`,
              {
                headers: {
                  Authorization: `Bearer ${bearerToken}`,
                  Accept: 'application/json',
                },
              }
            )
          );

          if (groupsError) {
            logError(
              '[accessTokenApi] user groups request failed',
              groupsError
            );
          } else if (!groupsResponse?.ok) {
            console.warn(
              `[accessTokenApi] user groups request responded ${groupsResponse.status}`
            );
          } else {
            const [parseGroupsError, groupsResult] = await to(
              groupsResponse.json()
            );
            if (parseGroupsError) {
              logError(
                '[accessTokenApi] user groups response parse error',
                parseGroupsError
              );
            } else if (groupsResult?.items) {
              (user as UserWithGroups).groups = groupsResult.items;
            }
          }
        }
        return user as UserWithGroups;
      }
    }
  }

  // No user from the bearer token. Only the refresh token can still
  // authenticate this request.
  if (refreshToken) {
    const client = await getManagementApiClient({ refreshToken });
    const [error, user] = resolveGroups
      ? await LoginHelper.GetUserDetails(client)
      : await to(client.security.users.getCurrent());

    if (error || !user) {
      // Both credentials failed to authenticate - report both so the failure
      // is diagnosable.
      if (bearerError)
        logError(
          '[accessTokenApi] bearer token authentication failed',
          bearerError
        );
      logError(
        '[accessTokenApi] refresh token authentication failed',
        error ?? 'no user returned'
      );
      return null;
    }

    // The refresh token authenticated the request; an earlier bearer failure
    // was the normal stale-bearer case, so it is deliberately not logged.
    return user as UserWithGroups;
  }

  // No refresh token to fall back to - a bearer failure here is the terminal
  // failure for this request.
  if (bearerError)
    logError('[accessTokenApi] bearer token authentication failed', bearerError);
  return null;
};

export default authenticateRequest;
