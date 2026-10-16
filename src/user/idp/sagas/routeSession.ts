/**
 * The session check at the top of every client-side route change (KTD3).
 *
 * Registered at switch 5, before `ensureAccessTokenSaga`, so it runs before any
 * content is requested and before a release call. Being before the Delivery
 * fetch is what keeps the access token fresh after an idle period (AE10);
 * being before the release call is what makes a release succeed on an expired
 * cookie.
 *
 * It is free when both identity-client cookies are readable and the classic
 * token still matches what is in state — no network at all. Otherwise it puts
 * the resolving state, resolves the session, and puts the session or the
 * `clearOnly` reset.
 *
 * Client navigations already run inside the route's loading state. A first page
 * load does not, because the hydrated entry matches the path and the routing
 * reducer leaves `isLoading` false — so when the check has to go to the network
 * on a route that requires login, the route loading state is put first and a
 * protected route shows the site's loading component rather than the anonymous
 * view (R26).
 *
 * Nothing here happens on the server (R19). The decision about what a protected
 * route does with the outcome stays in the require-login saga (switch 2).
 *
 * Resolving a session never disarms the redirect guard: only showing the member
 * on the path does. A session that still cannot load the route must not earn
 * itself another trip to `/idp/check` (R16).
 */
import { call, put, select } from 'redux-saga/effects';

import { UPDATE_LOADING_STATE } from '~/routing/redux/types';
import { selectRouteEntry } from '~/routing/redux/selectors';
import { findContentTypeMapping } from '~/routing/util/find-contenttype-mapping';
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

/** Start a fresh route change with nothing recorded (a new route change means
 *  any earlier outcome belongs to a different load). */
const clearRouteOutcome = (path?: string) => {
  lastOutcome = { path };
};

const recordOutcome = (path: string | undefined, outcome: RouteSessionOutcome) => {
  lastOutcome = { path, outcome };
};

/**
 * Which path has just been reloaded after a Delivery 401 (R24). Kept in module
 * memory by path: a reload is a real route change, so nothing smaller survives
 * it. A route change to any other path ends it, which is also what lets the
 * member revisit the page later and get one reload again.
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
 * Does this route need a member? Checked before any content exists, so it is
 * the matched static route plus, when we already have an entry in state (the
 * hydrated first load), that entry's content type mapping.
 */
const routeRequiresLogin = (action: any, state: any) => {
  const staticRequiresLogin = action?.staticRoute?.route?.requireLogin;
  if (staticRequiresLogin) return true;

  const contentTypeMappings = action?.routes?.ContentTypeMappings;
  const entry = selectRouteEntry(state, 'js');
  if (!contentTypeMappings || !entry?.sys?.contentTypeId) return false;

  const { requireLogin: authContentType } =
    findContentTypeMapping(contentTypeMappings, entry.sys.contentTypeId) || {};
  return !!authContentType;
};

/**
 * Resolve the session for this route change and put the result in state.
 * Never redirects, never deletes a cookie: the decision belongs to the
 * require-login saga (switch 2).
 */
export function* idpRouteSessionSaga(action: any) {
  // Server rendering stays session-blind (R19).
  if (isSSR) return;

  const path = action?.path;

  // A route change to a different path ends the delivery-401 reload memory, so
  // the member can revisit a page later and get one reload again (R24).
  clearDeliveryReloadIfNot(path);
  clearRouteOutcome(path);

  const state = yield select();
  const requiresLogin = routeRequiresLogin(action, state);
  const isAuthenticated = yield select(selectUserIsAuthenticated);
  const classicToken = yield select(selectUserSecurityToken);

  // Cheap path: cookies readable, and the classic token is still the one we put
  // in state, so this tab still shows the right member (KTD12).
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
  // when the cookies no longer support it (KTD12).
  if (isAuthenticated) yield put(idpClearSessionAction());
  // Nobody was shown. On a public route that is the answer, so stop reporting
  // loading or the member never sees a "Log in" control (R26). A protected
  // route stays loading: the require-login saga navigates, retries or throws.
  else if (!requiresLogin) yield put(idpSettledUserAction(clientCredentials));

  recordOutcome(path, result.outcome);
}
