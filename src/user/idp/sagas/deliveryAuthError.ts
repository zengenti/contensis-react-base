/**
 * A Delivery API 401 or 403 for route content (R24, switch 6).
 *
 * The classic branch responds by running the login saga and, if it reports the
 * member logged in, reloading the route — which on a Keycloak site repeats the
 * same failure forever, because nothing refreshed the access token.
 *
 * Under `USE_IDP` the response is: one shared refresh, one reload of the route,
 * and never a second of either.
 *
 * - 401, not yet reloaded for this path → refresh. `session` reloads the route
 *   once (AE10). `no-session` goes to the guarded `/idp/check`. `unknown`
 *   throws 503: a 5xx must not log anyone out (R9).
 * - 401 again after a reload → the guarded `/idp/check`, and when that guard is
 *   already armed the 401 error state. Never another reload (R16).
 * - 403 with a session → access-denied, as today.
 * - 403 without a session → the anonymous path.
 * - On the server the error is rethrown so `do500` behaves exactly as it does
 *   now.
 *
 * The reload marker lives with the route-change session check
 * (`hasDeliveryReloadFor`), which is what clears it when the member moves on.
 */
import { call, put, select } from 'redux-saga/effects';

import { setRoute } from '~/routing/redux/actions';
import { isSSR } from '~/util/env';
import { selectUserIsAuthenticated } from '../../redux/selectors';
import { currentHref, getAccessDeniedRoute } from '../navigation';
import { getLoginReturnPath } from '../returnPath';
import { refreshSession } from '../refresh';
import {
  hasDeliveryReloadFor,
  rememberDeliveryReload,
} from './routeSession';
import { idpAnonymousRouteSaga } from './requireLogin';

const GENERIC_ERROR_MESSAGE =
  'We could not reach the service that signs you in. Please try again.';

const idpRouteError = (status: number, statusText: string, message: string) => ({
  status,
  statusText,
  data: { message },
});

/**
 * Switch 6. `deliveryError` is the error the Delivery fetch threw; the return
 * value is whatever should end `getRouteSaga` for this run, so the caller does
 * `return yield call(idpDeliveryAuthErrorSaga, action, nodeError)`.
 */
export function* idpDeliveryAuthErrorSaga(action: any, deliveryError: any) {
  // The server cannot refresh a browser's cookies; `do500` handles it as today.
  if (isSSR) throw deliveryError;

  const path = action?.path;
  const status = deliveryError?.status;
  const returnPath = getLoginReturnPath(currentHref());
  const isAuthenticated = yield select(selectUserIsAuthenticated);

  if (status === 403) {
    // A member who is not allowed to see this. Same destination as today,
    // without the loop the classic path can get into on the access-denied page.
    if (isAuthenticated) {
      const accessDeniedRoute = getAccessDeniedRoute(path);
      if (path === accessDeniedRoute) throw deliveryError;
      return yield put(setRoute(accessDeniedRoute));
    }
    // No session at all: the anonymous path, not access-denied.
    return yield* idpAnonymousRouteSaga({ returnPath });
  }

  // A second 401 for a path we already reloaded once: stop reloading.
  if (hasDeliveryReloadFor(path))
    return yield* idpAnonymousRouteSaga({ returnPath });

  const outcome = yield call(refreshSession);

  if (outcome === 'session') {
    rememberDeliveryReload(path);
    // A new route change, so the whole check runs again with the fresh token.
    return yield put(setRoute(path));
  }

  if (outcome === 'no-session')
    return yield* idpAnonymousRouteSaga({ returnPath });

  // `unknown`: a hiccup at the identity service is not the member's session
  // ending, and reloading would only hit the same wall (R9).
  throw idpRouteError(503, 'Service Unavailable', GENERIC_ERROR_MESSAGE);
}
