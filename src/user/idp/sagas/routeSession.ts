/**
 * The session check at the top of every client-side route change. Registered
 * before `ensureAccessTokenSaga`, so the token is refreshed before any content
 * fetch or release call.
 *
 * It costs nothing when both identity-client cookies are readable and the classic
 * token still matches what is in state. Otherwise it puts the resolving state,
 * resolves the session, and puts the session or the `clearOnly` reset. Nothing
 * happens on the server, and what a protected route does with the outcome is the
 * require-login saga's decision.
 *
 * A first page load, unlike a client navigation, is not inside the route's
 * loading state — the hydrated entry matches the path and the routing reducer
 * leaves `isLoading` false — so a protected route that has to go to the network
 * puts the route loading state first: the site's loading component rather than
 * the anonymous view.
 *
 * Resolving a session never disarms the redirect guard: only showing the member
 * on the path does.
 */
import { call, put, select } from 'redux-saga/effects';

import { UPDATE_LOADING_STATE } from '~/routing/redux/types';
import { selectRouteEntry } from '~/routing/redux/selectors';
import { isSSR } from '~/util/env';
import {
  selectClientCredentials,
  selectUserIsAuthenticated,
  selectUserSecurityToken,
} from '../../redux/selectors';
import { hasIdpSessionCookies } from '../cookies';
import {
  identityHasChanged,
  resolveSession,
  SessionResult,
} from '../session';
import {
  idpClearSessionAction,
  idpResolvingUserAction,
  idpSessionUserAction,
  idpSettledUserAction,
} from '../session';
import { resolveEntry, routeRequirements } from './routeRequirements';

export type RouteSessionOutcome = 'session' | 'no-session' | 'unknown';

/** What the last session check decided for this route change, so the
 *  require-login saga does not resolve the session a second time. */
let lastOutcome: {
  path?: string;
  outcome?: RouteSessionOutcome;
} | null = null;

/** The outcome recorded for this route change, if any. */
export const takeRouteSessionOutcome = (path?: string) =>
  path && lastOutcome && lastOutcome.path === path
    ? lastOutcome.outcome
    : undefined;

/** Start a fresh route change with nothing recorded: any earlier outcome belongs
 *  to a different load. */
const clearRouteOutcome = (path?: string) => {
  lastOutcome = { path };
};

const recordOutcome = (
  path: string | undefined,
  outcome: RouteSessionOutcome
) => {
  lastOutcome = { path, outcome };
};

/**
 * Which path was just reloaded after a Delivery 401. Kept in module memory by
 * path: a reload is a real route change, so nothing smaller survives it, and a
 * change to any other path ends it — which is also what lets the member revisit
 * the page later and get one reload again.
 */
let deliveryReloadPath: string | null = null;

export const clearDeliveryReloadIfNot = (path?: string) => {
  if (path && deliveryReloadPath && deliveryReloadPath !== path)
    deliveryReloadPath = null;
};

export const hasDeliveryReloadFor = (path?: string) =>
  !!path && deliveryReloadPath === path;

export const rememberDeliveryReload = (path?: string) => {
  deliveryReloadPath = path || null;
};

/**
 * Resolve the session for this route change and put the result in state.
 * Never redirects, never deletes a cookie: the decision belongs to the
 * require-login saga.
 */
export function* idpRouteSessionSaga(action: any) {
  // Server rendering stays session-blind.
  if (isSSR) return;

  const path = action?.path;

  // A route change to a different path ends the delivery-401 reload memory, so
  // the member can revisit a page later and get one reload again.
  clearDeliveryReloadIfNot(path);
  clearRouteOutcome(path);

  const state = yield select();
  const { requiresLogin } = routeRequirements(
    action,
    resolveEntry(action, selectRouteEntry(state, 'js'))
  );
  const isAuthenticated = yield select(selectUserIsAuthenticated);
  const classicToken = yield select(selectUserSecurityToken);

  // Cheap path: cookies readable, and the classic token is still the one we put
  // in state, so this tab still shows the right member.
  if (
    hasIdpSessionCookies() &&
    isAuthenticated &&
    !identityHasChanged(classicToken)
  ) {
    recordOutcome(path, 'session');
    return;
  }

  if (requiresLogin)
    yield put({ type: UPDATE_LOADING_STATE, isLoading: true });

  const clientCredentials = yield select(selectClientCredentials, 'js');
  yield put(idpResolvingUserAction(clientCredentials));

  const result: SessionResult = yield call(resolveSession);

  if (result.outcome === 'session') {
    yield put(idpSessionUserAction(result.session));
    recordOutcome(path, 'session');
    return;
  }

  // `no-session`: identity-client has already cleared its cookies.
  // `unknown`: we do not know, so we show anonymous for this load and let the
  // next navigation try again — but we never leave a member's face in the UI
  // when the cookies no longer support it.
  if (isAuthenticated) yield put(idpClearSessionAction());
  // Nobody was shown, so that is the answer for this load: stop reporting
  // loading, or the member never sees a "Log in" control. A protected
  // route keeps the *route* loading state while the require-login saga
  // navigates, retries or throws.
  else yield put(idpSettledUserAction(clientCredentials));

  recordOutcome(path, result.outcome);
}
