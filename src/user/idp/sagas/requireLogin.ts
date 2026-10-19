/**
 * What a protected route does with the session. Routing already calls this after
 * `onRouteLoaded`, so it sees the matched static route, the entry, and whatever
 * the app returned from its own hook — the same inputs and the same
 * `userLoggedIn` return contract as the classic `handleRequiresLoginSaga`, which
 * it replaces one-for-one under `USE_IDP`.
 *
 * A public route always renders: anonymous if nobody is signed in, with no
 * redirect and nothing deleted, whatever the outcome. On a protected route a
 * missing session goes to `/idp/check` once per `returnPath` and to an error
 * state the second time; an `unknown` outcome gets one quiet retry, then a 503.
 *
 * Errors are thrown, not put: these sagas run inside `getRouteSaga`'s `try`, so a
 * thrown `{ status, statusText, data }` reaches `do500` and renders the site's
 * `notFoundComponent` with that status, whereas a `put` would be overwritten by
 * the later `SET_ENTRY`.
 */
import { call, delay, put, select } from 'redux-saga/effects';

import { selectRouteEntry } from '~/routing/redux/selectors';
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
  GENERIC_ERROR_MESSAGE,
  LOOP_GUARD_MESSAGE,
  idpRouteError,
} from './errors';
import {
  idpRouteSessionSaga,
  RouteSessionOutcome,
  takeRouteSessionOutcome,
} from './routeSession';
import { entryForPath, routeRequirements } from './routeRequirements';

/** One more try, a second later, before telling the member anything. */
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
 *  requirement exactly as the classic saga does. */
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
 * Nobody is signed in on a route that needs somebody to be: go to `/idp/check`,
 * but only once per `returnPath` — coming straight back and failing again is an
 * error state, not another redirect.
 *
 * `scope` separates the guard a Delivery auth error arms from the one a missing
 * session arms; see `DELIVERY_GUARD`. Exported for that saga, whose 401 a refresh
 * did not fix ends up here too.
 */
export function* idpAnonymousRouteSaga({
  returnPath,
  scope,
}: {
  returnPath: string;
  scope?: string;
}) {
  // A redirect armed by this page load is under way, not spent: a concurrent
  // route saga leaves it to land.
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

/** The IDP replacement for `handleRequiresLoginSaga`. */
export function* idpHandleRequiresLoginSaga(action: any) {
  // The server never decides this. Routing treats a falsy return as
  // "not logged in", which on the server is always true: nobody is.
  if (isSSR) return false;

  const { entry: actionEntry, path } = action || {};

  // Routing passes the entry it resolved; when it does not (the release-token
  // path calls with only `requireLogin`), the entry in state counts only if
  // it belongs to this path — between a navigation and its `SET_ENTRY` the
  // routing state still holds the previous route's entry, and its content
  // type would borrow group requirements from a page we have left.
  const entry =
    actionEntry ||
    entryForPath(selectRouteEntry(yield select(), 'js'), path);

  // Merge route, content type and app-provided requirements exactly as the
  // classic saga does, so groups from all three sources count.
  const { requiresLogin: routeRequiresLogin, requiresGroups: routeRequiresGroups } =
    routeRequirements(action, entry);

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
  // redirect and nothing deleted, whatever the outcome.
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
    // No redirect, nothing deleted.
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
