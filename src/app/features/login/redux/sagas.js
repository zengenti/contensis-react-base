import { takeEvery, select, put, call } from 'redux-saga/effects';
import {
  SET_USER_LOADING,
  SET_AUTHENTICATION_STATE,
  LOGIN_USER,
  LOGOUT_USER,
  // SET_USER_ENVIRONMENTS,
} from './types';
import {
  selectUserIsAuthenticated,
  selectClientCredentials,
} from './selectors';

import { LoginHelper } from '../util/LoginHelper.class';
import { setRoute as navigate } from '~/core/redux/actions/routing';
import { getManagementAPIClient } from '~/core/util/ContensisManagementApi';
import { queryParams } from '~/core/util/navigation';
import { selectCurrentSearch } from '~/core/redux/selectors/routing';
import mapClientCredentials from '../transformations/mapClientCredentials';

export const userSagas = [
  takeEvery(LOGIN_USER, loginUserSaga),
  takeEvery(LOGOUT_USER, logoutUserSaga),
  takeEvery(SET_AUTHENTICATION_STATE, redirectAfterSuccessfulLoginSaga),
  // takeEvery(LOGIN_SUCCESSFUL, getUserEnvironmentsSaga),
];

export function* handleRequiresLoginSaga(action) {
  const { staticRoute, routes, entry } = action;
  // debugger;

  // always validate and login user if cookies available on any route change
  yield call(validateUserSaga);

  // is route listed as needing a login?
  const routeRequiresLogin =
    (staticRoute && staticRoute.route.authRequired) ||
    (routes &&
      entry &&
      (
        routes.ContentTypeMappings.find(
          item => item.contentTypeID == entry.sys.contentTypeId
        ) || {}
      ).authRequired);

  if (routeRequiresLogin) {
    const userLoggedIn = yield select(selectUserIsAuthenticated);
    if (!userLoggedIn) {
      LoginHelper.ClientRedirectToSignInPage(action.location.pathname);
      // yield put(
      //   navigate(`${LOGIN_ROUTE}?redirect_uri=${action.location.pathname}`)
      // );
    }
  }
}

function* redirectAfterSuccessfulLoginSaga() {
  const isLoggedIn = yield select(selectUserIsAuthenticated);
  const redirectPath = queryParams(yield select(selectCurrentSearch))
    .redirect_uri;

  if (isLoggedIn && redirectPath) {
    yield put(navigate(redirectPath));
  }
}

function* loginUserSaga(action = {}) {
  const { username, password } = action;
  if (username) {
    yield put({
      type: SET_USER_LOADING,
    });
  }

  // The elements we will eventually load into authenticationState
  let clientCredentials = LoginHelper.GetCachedCredentials(),
    error = false,
    authenticated = false,
    authenticationError = false,
    user = null,
    userError = false;

  try {
    if (!username) {
      authenticated = true;
    } else {
      // here we are getting credentials from input username and password
      // and destructuring the return object to our authenticationState elements
      ({
        error,
        authenticated,
        authenticationError,
        clientCredentials,
      } = yield LoginHelper.LoginUser(username, password));
    }

    // If the authenticated variable is true, we should have some clientCredentials
    // continue getting the user's details with those credentials
    if (authenticated) {
      ({
        error: userError,
        user,
        clientCredentials,
      } = yield LoginHelper.GetUserDetails(clientCredentials));
      if (userError) {
        error = userError;
        authenticated = false;
        clientCredentials = null;
      }
    }
  } catch (e) {
    error = e;
    authenticated = false;
    clientCredentials = null;

    // eslint-disable-next-line no-console
    console.log(e);
  } finally {
    yield put({
      type: SET_AUTHENTICATION_STATE,
      authenticationState: {
        clientCredentials,
        authenticated,
        authenticationError,
        error,
      },
      user,
    });
    if (!authenticated || error) {
      // Clear cookies if auth has failed in any way
      yield LoginHelper.ClearCachedCredentials();
    }
  }
}
function* logoutUserSaga({ redirectPath }) {
  yield LoginHelper.LogoutUser();
  yield put({
    type: SET_AUTHENTICATION_STATE,
    user: null,
  });
  // yield put({
  //   type: SET_USER_ENVIRONMENTS,
  // });
  if (redirectPath) LoginHelper.ClientRedirectToPath(redirectPath);
  else LoginHelper.ClientRedirectToSignInPage();
}

// function* getUserEnvironmentsSaga() {
//   yield delay(6000);
//   const securityToken = yield select(selectUserSecurityToken);
//   const environments = yield SecurityApi.GetUsersEnvironments(securityToken);
//   if (!environments.error) {
//     environments.map((env, idx) => {
//       if (env.alias.indexOf('-dr') > -1) {
//         return [...environments.splice(idx, 1)];
//       }
//       return [...environments];
//     });
//     yield put({
//       type: SET_USER_ENVIRONMENTS,
//       environments,
//     });
//   }
// }

function* validateUserSaga() {
  const userLoggedIn = yield select(selectUserIsAuthenticated);
  if (userLoggedIn) return;

  const credentials = LoginHelper.GetCachedCredentials();
  if (credentials && !userLoggedIn && credentials.refreshToken) {
    yield call(loginUserSaga);
  }
}

export function* refreshSecurityToken() {
  const clientCredentials = yield select(selectClientCredentials).toJS();
  const client = getManagementAPIClient(clientCredentials);
  yield client.authenticate();

  const loginResultObject = {};

  const newClientCredentials = mapClientCredentials(client);

  loginResultObject.clientCredentials = newClientCredentials;

  yield put({
    type: SET_AUTHENTICATION_STATE,
    loginResultObject,
  });
}
