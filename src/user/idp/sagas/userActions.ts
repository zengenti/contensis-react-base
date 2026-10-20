/**
 * The member-facing actions under `USE_IDP`. The public surface does not change
 * — `useLogin`, `withLogin`, `refreshSecurityToken` and `useChangePassword` all
 * keep working — only what the site is signed in with (identity-client's
 * cookies) and how a sign-in happens: navigate to `/idp/check`, never post a
 * password. Nothing here is MFA-specific; MFA is entirely behind `/idp/check`.
 */
import { warn } from 'loglevel';
import { call, put, select } from 'redux-saga/effects';

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
} from '../../redux/types';

/** From the first moment the store exists the member state reports loading, so
 *  every visitor gets the same value: server and client render alike, and a
 *  guard never sees "not loading, not authenticated" before the first check has
 *  settled. */
export function* idpInitialUserStateSaga() {
  yield put(idpResolvingUserAction(null));
}

const selectRouteRequiresLogin = (state: AppState) =>
  getIn(state, ['routing', 'staticRoute', 'route', 'requireLogin']);

/** `loginUser()`: there are no credentials to post — the member goes to
 *  `/idp/check` for the page they were on. Credentials passed in are ignored
 *  with one warning, so a site still posting them hears why nothing happened.
 *  The once-per-path loop guard does not apply to an explicit login click. */
export function* idpLoginUserSaga(action: any = {}) {
  if (action.username || action.password)
    warn(
      '[idp] loginUser() ignores username and password: under USE_IDP the ' +
        'member signs in at /idp/check. Remove the credentials from this call.'
    );

  yield call(goToIdpCheck, getLoginReturnPath(currentHref()));
}

/** `logoutUser(redirectPath)`: the reducer has already cleared the user, so this
 *  saga's only job is the navigation. identity-client clears its own cookies and
 *  ends the Keycloak session — we never touch a cookie. With `clearOnly` the
 *  dispatch is our own notice that another tab ended the session, so there is
 *  nothing to navigate to. */
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
      // From a members area, land somewhere public.
      routeRequiresLogin: !!routeRequiresLogin,
    })
  );
}

/** `VALIDATE_USER`: work out who is signed in, from the cookies and a refresh if
 *  needed. Returns the logged-in boolean callers of the classic saga expected. */
export function* idpValidateUserSaga() {
  const clientCredentials = yield select(selectClientCredentials, 'js');
  yield put(idpResolvingUserAction(clientCredentials));

  const result: SessionResult = yield call(resolveSession);

  if (result.outcome === 'session') {
    yield put(idpSessionUserAction(result.session));
    return true;
  }

  // Only 401 ends a session, and ending it here means state only: this call
  // never navigates. Otherwise stop reporting loading and leave the rest.
  const isAuthenticated = yield select(selectUserIsAuthenticated);
  if (result.outcome === 'no-session' && isAuthenticated)
    yield put(idpClearSessionAction());
  else yield put(idpSettledUserAction(clientCredentials));

  return yield select(selectUserIsAuthenticated);
}

/** `refreshSecurityToken`, same no-argument signature, now refreshing through
 *  `/idp/refresh`. It updates the classic token we hold and never navigates:
 *  refreshing a token is not a decision to send anybody anywhere. */
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

/** Change password with the access token, through the same refresh-and-retry
 *  wrapper as everything else. No classic grant. */
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
