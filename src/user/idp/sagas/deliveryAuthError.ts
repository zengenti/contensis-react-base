/**
 * A Delivery API 401 or 403 for route content. The classic branch responds by
 * running the login saga and, if it reports a member, reloading the route — on a
 * Keycloak site that repeats the same failure forever, because nothing
 * refreshed the access token.
 *
 * Under `USE_IDP` the response is one shared refresh, one reload of the route,
 * and never a second of either. The reload marker lives with the route-change
 * session check (`hasDeliveryReloadFor`), which is what clears it when the
 * member moves on.
 */
import { call, put, select } from 'redux-saga/effects';

import { setRoute } from '~/routing/redux/actions';
import { isSSR } from '~/util/env';
import { selectUserIsAuthenticated } from '../../redux/selectors';
import { currentHref, getAccessDeniedRoute } from '../navigation';
import { DELIVERY_GUARD } from '../loginGuard';
import { getLoginReturnPath } from '../returnPath';
import { refreshSession } from '../refresh';
import { GENERIC_ERROR_MESSAGE, idpRouteError } from './errors';
import {
  hasDeliveryReloadFor,
  rememberDeliveryReload,
} from './routeSession';
import { idpAnonymousRouteSaga } from './requireLogin';

/** `deliveryError` is the error the Delivery fetch threw; the return value is
 *  whatever should end `getRouteSaga` for this run, so the caller does
 *  `return yield call(idpDeliveryAuthErrorSaga, action, nodeError)`. */
export function* idpDeliveryAuthErrorSaga(action: any, deliveryError: any) {
  // The server cannot refresh a browser's cookies; `do500` handles it as today.
  if (isSSR) throw deliveryError;

  const path = action?.path;
  const status = deliveryError?.status;
  const returnPath = getLoginReturnPath(currentHref());
  const isAuthenticated = yield select(selectUserIsAuthenticated);
  // Under its own guard key: establishing a session must not disarm a Delivery
  // escalation, or a member who persistently 401s is redirected on every load.
  const escalate = () =>
    idpAnonymousRouteSaga({ returnPath, scope: DELIVERY_GUARD });

  if (status === 403) {
    // A member not allowed to see this: same destination as today, without the
    // loop the classic path can get into on the access-denied page.
    if (isAuthenticated) {
      const accessDeniedRoute = getAccessDeniedRoute(path);
      if (path === accessDeniedRoute) throw deliveryError;
      return yield put(setRoute(accessDeniedRoute));
    }
    // No session at all: the anonymous path, not access-denied.
    return yield* escalate();
  }

  // A second 401 for a path we already reloaded once: stop reloading.
  if (hasDeliveryReloadFor(path)) return yield* escalate();

  const outcome = yield call(refreshSession);

  if (outcome === 'session') {
    rememberDeliveryReload(path);
    // A new route change, so the whole check runs again with the fresh token.
    return yield put(setRoute(path));
  }

  if (outcome === 'no-session') return yield* escalate();

  // `unknown`: a hiccup at the identity service is not the member's session
  // ending, and reloading would only hit the same wall.
  throw idpRouteError(503, 'Service Unavailable', GENERIC_ERROR_MESSAGE);
}
