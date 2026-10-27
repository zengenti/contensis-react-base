/**
 * A member's session is built from identity-client's cookies alone. No classic
 * grant is used: user and groups are fetched with the access token as
 * `Authorization`, and react-base's own `RefreshToken` cookie is never read — a
 * leftover one can belong to somebody else.
 *
 * Outcomes: `session`; `no-session` (a 401 survived one refresh and retry);
 * `unknown` (timeout, network error, or a 5xx). Never a member with an empty
 * group list.
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

/** Mirrors `LoginHelper.GetUserDetails` rather than importing it: nothing in
 *  here may depend on the classic login the v5 clean-up removes. */
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
    // Not knowing is not the same as having none: an empty group list would
    // send a real member to access-denied.
    return UNBUILDABLE;
  }

  return { user, groups: groupsResult?.items || [] };
};

/** The reducer reads `user.email` unguarded for `isZengentiStaff`, so a member
 *  without one gets an empty string instead of throwing into state. */
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
 * Who, if anybody, is logged in — the only source of a session while `USE_IDP`
 * is on. Two readable tokens are enough to try building one; otherwise the
 * shared refresh decides first.
 *
 * One resolution is shared by everything waiting on it (StrictMode doubles the
 * first dispatch, and navigations overlap), cleared when it settles so a later
 * check resolves afresh.
 */
let inFlight: Promise<SessionResult> | null = null;

export const resolveSession = (): Promise<SessionResult> => {
  if (inFlight) return inFlight;

  inFlight = (async (): Promise<SessionResult> => {
    if (!hasIdpSessionCookies()) {
      const outcome = await refreshSession();
      if (outcome === 'no-session') return { outcome: 'no-session' };
      if (outcome !== 'session') return { outcome: 'unknown' };
    }

    return buildSession();
  })().then(
    result => {
      inFlight = null;
      return result;
    },
    e => {
      inFlight = null;
      throw e;
    }
  );

  return inFlight;
};

/** Has another tab changed who we are? The classic token cookie is the identity
 *  last put in state; if it is gone or different, this tab's view is stale —
 *  without the check tab B shows user B while its API calls act as user C. */
export const identityHasChanged = (classicTokenInState?: string | null) => {
  const classicToken = readIdpClassicToken();
  if (!classicToken) return true;
  return classicToken !== classicTokenInState;
};

/**
 * Mapping a session onto the existing reducer, edited in one place only:
 * `LOGOUT_USER` holds the session under `USE_IDP` so nothing redirects while
 * `/idp/logout` is in flight. The actions below are written around three of its
 * quirks:
 *
 * - `SET_AUTHENTICATION_STATE` can never reset `isAuthenticated`
 *   (`isAuthenticated || state.isAuthenticated`), so ending a session goes
 *   through `LOGOUT_USER` instead — with an IDP-only `clearOnly` flag so the
 *   logout saga knows not to navigate.
 * - A `SET_AUTHENTICATION_STATE` that omits `clientCredentials` nulls them, so
 *   every resolving put carries the current value forward.
 * - A user without `email` throws, which `toStateUser` prevents.
 *
 * Redux holds the classic token and nothing else: no access token, no refresh
 * token, no expiry.
 */

/** What `selectClientCredentials` holds while `USE_IDP` is on. */
export type IdpClientCredentials = { contensisClassicToken?: string } | null;

const idpUserStateAction = (
  clientCredentials: IdpClientCredentials | undefined,
  isLoading: boolean
) => ({
  type: SET_AUTHENTICATION_STATE,
  authenticationState: {
    clientCredentials: clientCredentials || null,
    isLoading,
  },
});

export const idpResolvingUserAction = (clientCredentials?: IdpClientCredentials) =>
  idpUserStateAction(clientCredentials, true);

export const idpSettledUserAction = (clientCredentials?: IdpClientCredentials) =>
  idpUserStateAction(clientCredentials, false);

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
 * End the session in state only. `clearOnly` is the IDP logout saga's signal not
 * to navigate: this is us noticing that another tab ended the session, not the
 * member asking to log out.
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
