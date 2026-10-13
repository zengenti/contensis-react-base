/**
 * Building a member's session from identity-client's cookies alone (KTD7,
 * KTD12, R23).
 *
 * There is no classic grant anywhere in here: current user and groups are
 * fetched with the access token in `Authorization` (R11). A leftover react-base
 * `RefreshToken` cookie for somebody else is never read, so the site shows the
 * member identity-client actually has (AE5).
 *
 * Three outcomes, mapped from the refresh and Management API results:
 *
 * - `session`    — user and groups, plus the classic token for
 *                  `selectUserSecurityToken` (R12).
 * - `no-session` — a 401 survived one refresh and one retry (R10).
 * - `unknown`    — a timeout, a network error or a 5xx, including a groups
 *                  call that fails for any reason other than 401. A member is
 *                  never handed back with an empty group list (R23, AE13).
 */
import to from 'await-to-js';
import type { Client } from 'contensis-management-api';
import type { Group, User } from 'contensis-management-api/lib/models';

import { isApiError } from '~/util/errors';
import { LOGOUT_USER, SET_AUTHENTICATION_STATE } from '../redux/types';
import { UserWithGroups } from '../state';
import { hasIdpSessionCookies, readIdpClassicToken } from './cookies';
import { IdpResult, withManagementClient } from './managementClient';
import { refreshSession } from './refresh';

export type IdpSession = {
  user: UserWithGroups;
  classicToken?: string;
};

export type SessionResult =
  | { outcome: 'session'; session: IdpSession }
  | { outcome: 'no-session' }
  | { outcome: 'unknown' };

/** Returned by the build callback when the session cannot be built and the
 *  wrapper should not refresh-and-retry. */
const UNBUILDABLE = { unbuildable: true } as const;

type BuiltSession = { user: User; groups: Group[] } | typeof UNBUILDABLE;

const isBuildable = (value: BuiltSession): value is { user: User; groups: Group[] } =>
  !('unbuildable' in value);

const statusOf = (e: unknown) => (isApiError(e) ? e.status : undefined);

/** The same call shape as `LoginHelper.GetUserDetails` — read, not imported
 *  (KTD9): current user, then their groups, inherited included. */
const buildUserAndGroups = async (client: Client): Promise<BuiltSession> => {
  const [userError, user] = await to(client.security.users.getCurrent());

  // A 401 has to reach `withManagementClient` so it can refresh and retry.
  if (userError) {
    if (statusOf(userError) === 401) throw userError;
    return UNBUILDABLE;
  }
  if (!user?.id) return UNBUILDABLE;

  const [groupsError, groupsResult] = await to(
    client.security.users.getUserGroups({
      userId: user.id,
      includeInherited: true,
      pageOptions: { pageSize: 100 },
    })
  );

  if (groupsError) {
    if (statusOf(groupsError) === 401) throw groupsError;
    // R23: a member with no groups would fail group-restricted routes with
    // access-denied. Not knowing is not the same as having none.
    return UNBUILDABLE;
  }

  return { user, groups: groupsResult?.items || [] };
};

/**
 * The user object the reducer can hold. It reads `user.email` unguarded when
 * working out `isZengentiStaff`, so a member without an email address gets an
 * empty one rather than throwing on the way into state (KTD7).
 */
const toStateUser = (user: User, groups: Group[]): UserWithGroups => ({
  ...user,
  email: typeof user.email === 'string' ? user.email : '',
  groups,
});

const mapBuildResult = (result: IdpResult<BuiltSession>): SessionResult => {
  if (result.outcome === 'no-session') return { outcome: 'no-session' };
  if (result.outcome === 'unknown') return { outcome: 'unknown' };
  if (!isBuildable(result.value)) return { outcome: 'unknown' };

  return {
    outcome: 'session',
    session: {
      user: toStateUser(result.value.user, result.value.groups),
      // Read after the calls, not before: a refresh rewrites this cookie.
      classicToken: readIdpClassicToken(),
    },
  };
};

/** Fetch current user and groups with a cookie-backed client, with the 401
 *  refresh-and-retry applied around both calls. */
export const buildSession = async (): Promise<SessionResult> =>
  mapBuildResult(await withManagementClient(buildUserAndGroups));

/**
 * Resolve who, if anybody, is logged in — the only place a session comes from
 * while `USE_IDP` is on (R6).
 *
 * Cookie presence alone never proves a session, but when both the access token
 * and classic token are readable there is something to build from and no
 * refresh is needed. Otherwise the shared refresh decides.
 */
export const resolveSession = async (): Promise<SessionResult> => {
  if (!hasIdpSessionCookies()) {
    const outcome = await refreshSession();
    if (outcome === 'no-session') return { outcome: 'no-session' };
    if (outcome !== 'session') return { outcome: 'unknown' };
  }

  return buildSession();
};

/**
 * Has another tab changed who we are? (KTD12, R27)
 *
 * The classic token cookie is the identity we last put in state. If the cookie
 * is gone, or is a different token, this tab's view is stale: without this
 * check tab B would show user B while its API calls act as user C.
 */
export const identityHasChanged = (classicTokenInState?: string | null) => {
  const classicToken = readIdpClassicToken();
  if (!classicToken) return true;
  return classicToken !== classicTokenInState;
};

/**
 * ## Mapping a session onto the existing reducer (KTD7)
 *
 * The reducer is not edited, so these actions are written around its three
 * quirks:
 *
 * - `isAuthenticated` can never be reset by `SET_AUTHENTICATION_STATE`
 *   (`isAuthenticated || state.isAuthenticated`), so ending a session goes
 *   through `LOGOUT_USER` instead — with an IDP-only `clearOnly` flag so the
 *   IDP logout saga knows not to navigate.
 * - A `SET_AUTHENTICATION_STATE` that does not carry `clientCredentials` nulls
 *   them, so every resolving put carries the current value forward.
 * - A user without `email` throws, which `toStateUser` prevents.
 *
 * Redux holds the classic token and nothing else: no access token, no refresh
 * token, no expiry.
 */

/** What `selectClientCredentials` holds while `USE_IDP` is on (R12). */
export type IdpClientCredentials = { contensisClassicToken?: string } | null;

/** The session is being worked out: loading, and the existing credentials kept. */
export const idpResolvingUserAction = (
  clientCredentials?: IdpClientCredentials
) => ({
  type: SET_AUTHENTICATION_STATE,
  authenticationState: {
    clientCredentials: clientCredentials || null,
    isLoading: true,
  },
});

/** The check has settled without a member: stop reporting loading. Nobody was
 *  shown, so there is nothing to reset, and `clientCredentials` is carried
 *  forward because the reducer nulls them otherwise. */
export const idpSettledUserAction = (
  clientCredentials?: IdpClientCredentials
) => ({
  type: SET_AUTHENTICATION_STATE,
  authenticationState: {
    clientCredentials: clientCredentials || null,
    isLoading: false,
  },
});

/** A member is signed in: identity-client's classic token is the only
 *  credential we keep. */
export const idpSessionUserAction = (session: IdpSession) => ({
  type: SET_AUTHENTICATION_STATE,
  authenticationState: {
    clientCredentials: { contensisClassicToken: session.classicToken },
    errorMessage: null,
    isAuthenticated: true,
    isAuthenticationError: false,
    isError: false,
    isLoading: false,
  },
  user: session.user,
});

/** The classic token moved (another tab signed in as somebody else): update
 *  the credential without disturbing anything else the site is holding. */
export const idpClassicTokenUserAction = (
  classicToken?: string,
  clientCredentials?: IdpClientCredentials
) => ({
  type: SET_AUTHENTICATION_STATE,
  authenticationState: {
    clientCredentials: {
      ...(clientCredentials || {}),
      contensisClassicToken:
        classicToken || clientCredentials?.contensisClassicToken,
    },
    isLoading: false,
  },
});

/**
 * End the session in state only. `clearOnly` is the IDP logout saga's signal
 * not to navigate: this is us noticing that another tab ended the session, not
 * the member asking to log out (R27).
 */
export const idpClearSessionAction = () => ({
  type: LOGOUT_USER,
  clearOnly: true,
});

/** A failure we must show without ever implying the member logged themselves
 *  out. `clientCredentials` is carried forward so a transient error does not
 *  drop a session that may still be good. */
export const idpErrorUserAction = (
  errorMessage: string,
  clientCredentials?: IdpClientCredentials
) => ({
  type: SET_AUTHENTICATION_STATE,
  authenticationState: {
    clientCredentials: clientCredentials || null,
    errorMessage,
    isError: true,
    isLoading: false,
  },
});
