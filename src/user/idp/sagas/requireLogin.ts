/**
 * What a protected route does with the session (KTD6, switch 2).
 *
 * Routing already calls this after `onRouteLoaded`, so it sees the matched
 * static route, the entry, and whatever the app returned from its own hook —
 * the same inputs and the same `userLoggedIn` return contract as the classic
 * `handleRequiresLoginSaga`, which it replaces one-for-one under `USE_IDP`.
 *
 * ## The decision table (checked against the plan's per-route diagram)
 *
 * | Session outcome | State      | Route                    | Result |
 * | --------------- | ---------- | ------------------------ | ------ |
 * | session         | member     | public                   | render, clear guard |
 * | session         | member     | protected, groups match  | render, clear guard |
 * | session         | member     | protected, groups lack   | `/account/access-denied?original_uri=…` (R18) |
 * | session         | member     | protected, no groups req | render, clear guard |
 * | no-session      | anonymous  | public                   | render anonymous, no redirect (R9, AE4) |
 * | no-session      | member     | public                   | reset to anonymous, render |
 * | no-session      | anonymous  | protected, guard unset   | arm guard, `/idp/check?returnPath=…` (R13) |
 * | no-session      | member     | protected, guard unset   | reset, arm guard, `/idp/check` |
 * | no-session      | any        | protected, guard armed   | throw 401 → generic error state, no second redirect (R16, AE6) |
 * | unknown         | any        | public                   | render anonymous for this load, no redirect, nothing deleted (R9) |
 * | unknown         | any        | protected                | one quiet retry after 1s, then throw 503 (KTD4, AE3) |
 * | unknown (retry) | any        | protected, retry 401     | falls through to the no-session rows |
 *
 * Errors are thrown, not put: the IDP sagas run inside `getRouteSaga`'s `try`,
 * so a thrown `{ status, statusText, data }` reaches `do500` and renders the
 * site's `notFoundComponent` with that status. A `put` would be overwritten by
 * the later `SET_ENTRY` (KTD6). `useLogin().isError` is set as well, so
 * component-level guards can tell.
 */
import { call, delay, put, select } from 'redux-saga/effects';

import { selectRouteEntry } from '~/routing/redux/selectors';
import { findContentTypeMapping } from '~/routing/util/find-contenttype-mapping';
import { isSSR } from '~/util/env';
import { matchUserGroup } from '~/user/util/matchGroups';
import {
  selectClientCredentials,
  selectUserGroups,
  selectUserIsAuthenticated,
} from '../../redux/selectors';
import {
  armLoginGuard,
  clearLoginGuard,
  isLoginGuardArmed,
  isRedirectPending,
} from '../loginGuard';
import { currentHref, goToAccessDenied, goToIdpCheck } from '../navigation';
import { getLoginReturnPath } from '../returnPath';
import {
  idpErrorUserAction,
  idpSessionUserAction,
  resolveSession,
  SessionResult,
} from '../session';
import {
  idpRouteSessionSaga,
  RouteSessionOutcome,
  takeRouteSessionOutcome,
} from './routeSession';

/** What we could not reach. Says nothing about the member, and nothing about
 *  how they sign in (R22). */
const GENERIC_ERROR_MESSAGE =
  'We could not reach the service that signs you in. Please try again.';

/** We already sent the member to sign in for this page and it did not work. */
const LOOP_GUARD_MESSAGE = 'We could not sign you in. Please try again.';

/** The shape `do500` reports through `SET_ENTRY`, so the site's
 *  `notFoundComponent` renders with this status (KTD6). */
const idpRouteError = (
  status: number,
  statusText: string,
  message: string
) => ({ status, statusText, data: { message } });

const asArray = (value: unknown) => (Array.isArray(value) ? value : []);

/** One more try, a second later, before telling the member anything (KTD4). */
function* quietRetrySession() {
  yield delay(1000);

  const result: SessionResult = yield call(resolveSession);

  if (result.outcome === 'session') {
    yield put(idpSessionUserAction(result.session));
    return 'session' as RouteSessionOutcome;
  }
  if (result.outcome === 'no-session') return 'no-session' as RouteSessionOutcome;
  return 'unknown' as RouteSessionOutcome;
}

/** The member is in. Clear the loop guard for this path, then honour any group
 *  requirement exactly as the classic saga does (R18). */
function* memberRoute({
  returnPath,
  routeRequiresGroups,
  action,
}: {
  returnPath: string;
  routeRequiresGroups: any[];
  action: any;
}) {
  clearLoginGuard(returnPath);

  if (routeRequiresGroups.length > 0) {
    const userGroups = yield select(selectUserGroups, 'js');
    if (!matchUserGroup(userGroups, routeRequiresGroups))
      goToAccessDenied(action?.location?.pathname);
  }

  return true;
}

/**
 * Nobody is signed in on a route that needs somebody to be: `/idp/check`, but
 * only once per `returnPath` (R16). Coming straight back and failing again is
 * an error state, not another redirect.
 *
 * `scope` separates the guard a Delivery auth error arms from the one a missing
 * session arms; see `DELIVERY_GUARD`.
 *
 * Exported for the Delivery auth-error saga: a Delivery 401 that a refresh did
 * not fix ends up here too.
 */
export function* idpAnonymousRouteSaga({
  returnPath,
  scope,
}: {
  returnPath: string;
  scope?: string;
}) {
  // A redirect armed by this page load is under way, not spent: a concurrent
  // route saga leaves it to land (R16).
  if (isRedirectPending(returnPath, scope)) return false;

  if (isLoginGuardArmed(returnPath, scope)) {
    yield put(
      idpErrorUserAction(
        LOOP_GUARD_MESSAGE,
        yield select(selectClientCredentials, 'js')
      )
    );
    throw idpRouteError(401, 'Unauthorized', LOOP_GUARD_MESSAGE);
  }

  armLoginGuard(returnPath, scope);
  goToIdpCheck(returnPath);
  return false;
}

/** Switch 2: the IDP replacement for `handleRequiresLoginSaga`. */
export function* idpHandleRequiresLoginSaga(action: any) {
  // The server never decides this (R19). Routing treats a falsy return as
  // "not logged in", which on the server is always true: nobody is.
  if (isSSR) return false;

  const {
    entry: actionEntry,
    path,
    requireLogin,
    routes,
    staticRoute,
  } = action || {};

  // Routing passes the entry it resolved; when it does not (the release-token
  // path calls with only `requireLogin`), fall back to the entry in state.
  const entry = actionEntry || selectRouteEntry(yield select(), 'js');
  const { ContentTypeMappings } = routes || {};

  // Merge route, content type and app-provided requirements exactly as the
  // classic saga does, so groups from all three sources count (R18).
  const { requireLogin: authRoute } = (staticRoute && staticRoute.route) || {};
  const { requireLogin: authContentType } =
    (entry &&
      findContentTypeMapping(ContentTypeMappings, entry?.sys?.contentTypeId)) ||
    {};

  const routeRequiresGroups = [
    ...asArray(authContentType),
    ...asArray(authRoute),
    ...asArray(requireLogin),
  ];
  const routeRequiresLogin = !!authContentType || !!authRoute || !!requireLogin;

  // The session check at the top of the route change usually settled this
  // already. If it has not (a call from `ensureAccessTokenSaga`, say), settle
  // it now — that call is free when the cookies are current.
  let outcome = takeRouteSessionOutcome(path);
  if (!outcome) {
    yield call(idpRouteSessionSaga, action);
    outcome = takeRouteSessionOutcome(path);
  }

  const isAuthenticated = yield select(selectUserIsAuthenticated);

  // A public route renders. Anonymous, or as a member if there is one; no
  // redirect and nothing deleted, whatever the outcome (R9).
  if (!routeRequiresLogin) return isAuthenticated;

  const returnPath = getLoginReturnPath(currentHref());

  if (outcome === 'session' || (isAuthenticated && outcome !== 'no-session'))
    return yield* memberRoute({ returnPath, routeRequiresGroups, action });

  if (outcome === 'unknown') {
    const retry = yield* quietRetrySession();

    if (retry === 'session')
      return yield* memberRoute({ returnPath, routeRequiresGroups, action });
    if (retry === 'no-session')
      return yield* idpAnonymousRouteSaga({ returnPath });

    // Still no answer: a generic error, and the next navigation tries again.
    // No redirect, nothing deleted (AE3).
    yield put(
      idpErrorUserAction(
        GENERIC_ERROR_MESSAGE,
        yield select(selectClientCredentials, 'js')
      )
    );
    throw idpRouteError(503, 'Service Unavailable', GENERIC_ERROR_MESSAGE);
  }

  // `no-session`, and this route needs a member.
  return yield* idpAnonymousRouteSaga({ returnPath });
}
