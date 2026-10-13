/**
 * The member-facing actions under `USE_IDP` (U5, switch 1, 3 and 4).
 *
 * The public surface does not change: `useLogin`, `withLogin`,
 * `refreshSecurityToken` and `useChangePassword` all keep working (R17), which
 * is the whole point of putting the switches on the setting rather than on the
 * hooks. What changes is what the site is signed in *with* — the member in
 * identity-client's cookies — and how a sign-in is performed: by navigating to
 * `/idp/check`, never by posting a password (R13).
 *
 * There is no MFA-specific behaviour, state or message anywhere in here (R22).
 * MFA is entirely behind `/idp/check`.
 */
import { warn } from 'loglevel';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { getImmutableOrJS as getIn } from '~/redux/util';
import { AppState } from '~/models';
import { readIdpClassicToken } from '../cookies';
import { clearLoginGuard } from '../loginGuard';
import { withManagementClient } from '../managementClient';
import { currentHref, goToIdpCheck, goToIdpLogout } from '../navigation';
import { getLoginReturnPath, getLogoutReturnPath } from '../returnPath';
import { refreshSession } from '../refresh';
import {
  idpClassicTokenUserAction,
  idpClearSessionAction,
  idpResolvingUserAction,
  idpSessionUserAction,
  idpSettledUserAction,
  resolveSession,
  SessionResult,
} from '../session';
import {
  selectClientCredentials,
  selectUserIsAuthenticated,
} from '../../redux/selectors';
import {
  CHANGE_USER_PASSWORD_ERROR,
  CHANGE_USER_PASSWORD_SENDING,
  CHANGE_USER_PASSWORD_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER,
  VALIDATE_USER,
} from '../../redux/types';

/** The classic saga set, replaced wholesale by these registrations at switch 1
 *  (`loginSagas`). The classic `redirectAfterSuccessfulLoginSaga` is not
 *  registered: `/idp/check` returns the member to `returnPath` itself. */
export const idpUserSagas = [
  // KTD7: from the moment the store exists, the member state reports loading.
  // Every visitor gets the same value, so server and client render the same
  // thing (R19), and a component guard never sees "not loading, not
  // authenticated" before the first check has settled (R26).
  put(idpResolvingUserAction(null)),
  takeEvery(LOGIN_USER, idpLoginUserSaga),
  takeEvery(LOGOUT_USER, idpLogoutUserSaga),
  takeEvery(VALIDATE_USER, idpValidateUserSaga),
];

const selectRouteRequiresLogin = (state: AppState) =>
  getIn(state, ['routing', 'staticRoute', 'route', 'requireLogin']);

/**
 * `loginUser()`: there are no credentials to post. The member is sent to
 * `/idp/check` for the page they were on (R13).
 *
 * Credentials passed in are ignored, with one warning, because a site that
 * still calls `loginUser(username, password)` needs to hear why nothing
 * happened. The once-per-path loop guard does not apply to an explicit login
 * click (R16).
 */
export function* idpLoginUserSaga(action: any = {}) {
  if (action.username || action.password)
    warn(
      '[idp] loginUser() ignores username and password: under USE_IDP the ' +
        'member signs in at /idp/check. Remove the credentials from this call.'
    );

  yield call(goToIdpCheck, getLoginReturnPath(currentHref()));
}

/**
 * `logoutUser(redirectPath)`: the reducer has already cleared the user (its
 * `LOGOUT_USER` branch resets state), so this saga's only job is the
 * navigation (F2). identity-client clears its own cookies and ends the Keycloak
 * session — we never touch a cookie (R7).
 *
 * With `clearOnly` this dispatch is our own notice that another tab ended the
 * session (KTD12, R27), so there is nothing to navigate to.
 */
export function* idpLogoutUserSaga(action: any = {}) {
  if (action.clearOnly) return;

  // A signed-out member starts over: no path keeps its loop guard.
  clearLoginGuard();

  const routeRequiresLogin = yield select(selectRouteRequiresLogin);

  yield call(
    goToIdpLogout,
    getLogoutReturnPath({
      redirectPath: action.redirectPath,
      currentHref: currentHref(),
      // From a members area, land somewhere public (R14).
      routeRequiresLogin: !!routeRequiresLogin,
    })
  );
}

/**
 * `VALIDATE_USER`: work out who is signed in, from the cookies and a refresh if
 * needed. Returns the logged-in boolean callers of the classic saga expected.
 */
export function* idpValidateUserSaga() {
  const clientCredentials = yield select(selectClientCredentials, 'js');
  yield put(idpResolvingUserAction(clientCredentials));

  const result: SessionResult = yield call(resolveSession);

  if (result.outcome === 'session') {
    yield put(idpSessionUserAction(result.session));
    return true;
  }

  // Only 401 ends a session, and ending it here means state only: this call
  // never navigates (R9). Otherwise stop reporting loading and leave the rest.
  const isAuthenticated = yield select(selectUserIsAuthenticated);
  if (result.outcome === 'no-session' && isAuthenticated)
    yield put(idpClearSessionAction());
  else yield put(idpSettledUserAction(clientCredentials));

  return yield select(selectUserIsAuthenticated);
}

/**
 * Switch 3: `refreshSecurityToken()`, same no-argument signature, now refreshing
 * through `/idp/refresh` (R17). It updates the classic token we hold and never
 * navigates — refreshing a token is not a decision to send anybody anywhere.
 */
export function* idpRefreshSecurityTokenSaga() {
  const outcome = yield call(refreshSession);

  if (outcome === 'session') {
    yield put(
      idpClassicTokenUserAction(
        readIdpClassicToken(),
        yield select(selectClientCredentials, 'js')
      )
    );
    return;
  }

  if (outcome === 'no-session') {
    const isAuthenticated = yield select(selectUserIsAuthenticated);
    if (isAuthenticated) yield put(idpClearSessionAction());
  }
}

/** The message `useChangePassword` shows, taken from the API response exactly
 *  as the classic saga reads it. */
const changePasswordErrorMessage = (error: any) =>
  (error?.data?.data?.length > 0 && error.data.data[0].message) ||
  error?.data?.message ||
  error?.message ||
  'We could not change your password. Please try again.';

type ChangePasswordResult = { ok: true } | { ok: false; error: unknown };

/** The call itself, outside the saga, so `withManagementClient` owns the
 *  refresh-and-retry and we keep the rejection for the error message. */
const changePassword = async (changePasswordObject: {
  userId: string;
  existing: string;
  new: string;
}): Promise<ChangePasswordResult> => {
  const result = await withManagementClient(client =>
    client.security.users.updatePassword(changePasswordObject)
  );

  return result.outcome === 'session'
    ? { ok: true }
    : { ok: false, error: result.error };
};

/** Switch 4: change password with the access token, through the same
 *  refresh-and-retry wrapper as everything else (R11, AE9). No classic grant. */
export function* idpChangePasswordSaga(action: any) {
  if (
    !action ||
    !action.userId ||
    !action.currentPassword ||
    !action.newPassword
  ) {
    yield put({
      type: CHANGE_USER_PASSWORD_ERROR,
      error: 'Invalid action object sent to changePassword saga',
    });
    return;
  }

  yield put({ type: CHANGE_USER_PASSWORD_SENDING });

  const result: ChangePasswordResult = yield call(changePassword, {
    userId: action.userId,
    existing: action.currentPassword,
    new: action.newPassword,
  });

  if (result.ok) {
    yield put({ type: CHANGE_USER_PASSWORD_SUCCESS });
    return;
  }

  yield put({
    type: CHANGE_USER_PASSWORD_ERROR,
    error: changePasswordErrorMessage(result.error),
  });
}
