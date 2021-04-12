import { Map } from 'immutable';
import { takeEvery, select, put, call } from 'redux-saga/effects';
import {
  SET_AUTHENTICATION_STATE,
  LOGIN_USER,
  LOGOUT_USER,
  VALIDATE_USER,
} from '../types';
import {
  selectUserIsAuthenticated,
  selectClientCredentials,
  selectUserGroups,
} from '../selectors';

import { setRoute } from '~/core/redux/actions/routing';
import { selectCurrentSearch } from '~/core/redux/selectors/routing';
import { getManagementApiClient } from '~/core/util/ContensisManagementApi';
import { findContentTypeMapping } from '~/core/util/helpers';
import { queryParams } from '~/core/util/navigation';
import mapClientCredentials from '../../transformations/mapClientCredentials';
import { LoginHelper } from '../../util/LoginHelper.class';
import { matchUserGroup } from '../../util/matchGroups';

export const loginSagas = [
  takeEvery(LOGIN_USER, loginUserSaga),
  takeEvery(LOGOUT_USER, logoutUserSaga),
  takeEvery(VALIDATE_USER, validateUserSaga),
  takeEvery(SET_AUTHENTICATION_STATE, redirectAfterSuccessfulLoginSaga),
];

export function* handleRequiresLoginSaga(action) {
  const {
    entry,
    requireLogin,
    routes: { ContentTypeMappings },
    staticRoute,
  } = action;
  let userLoggedIn = yield select(selectUserIsAuthenticated);

  // Check for a securityToken in querystring
  const currentQs = queryParams(yield select(selectCurrentSearch));
  const securityToken = currentQs.securityToken || currentQs.securitytoken;

  // Check if any of the defined routes have "requireLogin" attribute
  const { requireLogin: authRoute } = (staticRoute && staticRoute.route) || {};
  const { requireLogin: authContentType } =
    (entry &&
      findContentTypeMapping(ContentTypeMappings, entry.sys.contentTypeId)) ||
    {};

  // If requireLogin, authRoute or authContentType has been specified as an
  // array of groups we can merge all the arrays and match on any group supplied
  const routeRequiresGroups = [
    ...((Array.isArray(authContentType) && authContentType) || []),
    ...((Array.isArray(authRoute) && authRoute) || []),
    ...((Array.isArray(requireLogin) && requireLogin) || []),
  ];
  const routeRequiresLogin = !!authContentType || !!authRoute || !!requireLogin;

  if (!userLoggedIn) {
    // If cookies or securityToken are found on any route change
    // always validate and login the user
    if (routeRequiresLogin) {
      // If routeRequiresLogin do a blocking call that returns userLoggedIn
      userLoggedIn = yield call(validateUserSaga, { securityToken });
    }
    // otherwise do a non blocking put to handle validation in the background
    else yield put({ type: VALIDATE_USER, securityToken });
  }

  if (routeRequiresLogin) {
    // If a security token is in the querystring and we are not already
    // logged in something is wrong and we won't bother going on another redirect loop
    if (!userLoggedIn && !securityToken) {
      LoginHelper.ClientRedirectToSignInPage(action.location.pathname);
    } else if (routeRequiresGroups.length > 0) {
      const userGroups = (yield select(selectUserGroups)).toJS();
      const groupMatch = matchUserGroup(userGroups, routeRequiresGroups);

      if (!groupMatch)
        LoginHelper.ClientRedirectToAccessDeniedPage(action.location.pathname);
    }
  }
}

function* validateUserSaga({ securityToken }) {
  if (securityToken) {
    // If we have just a security token we will call a CMS endpoint
    // and provide us with a RefreshToken cookie we can use during login
    const [
      error,
      refreshToken,
    ] = yield LoginHelper.GetCredentialsForSecurityToken(securityToken);
    if (refreshToken)
      LoginHelper.SetLoginCookies({
        contensisClassicToken: securityToken,
        refreshToken,
      });
    if (error)
      yield put({
        type: SET_AUTHENTICATION_STATE,
        authenticationState: {
          error: { message: error.message, stack: error.stack },
        },
      });
  }

  // Check for refreshToken in cookies
  const clientCredentials = LoginHelper.GetCachedCredentials();

  // Log the user in if a refreshToken is found
  if (clientCredentials.refreshToken)
    yield call(loginUserSaga, { clientCredentials });

  // Tell any callers have we successfully logged in?
  return yield select(selectUserIsAuthenticated);
}

function* loginUserSaga(action = {}) {
  const { username, password, clientCredentials } = action;

  // If a WSFED_LOGIN site has dispatched the loginUser action
  // just redirect them to the Identity Provider sign in
  if (action.type === LOGIN_USER && LoginHelper.WSFED_LOGIN)
    LoginHelper.ClientRedirectToSignInPage();

  const { authenticationState, user } = yield LoginHelper.LoginUser({
    username,
    password,
    clientCredentials,
  });

  yield put({
    type: SET_AUTHENTICATION_STATE,
    authenticationState,
    user,
  });
}
const removeHostnamePart = path => {
  // eslint-disable-next-line no-console
  console.log(path);
  const relativePath =
    '/' +
    path
      .split('/')
      .splice(3)
      .join('/');
  // eslint-disable-next-line no-console
  console.log(relativePath);
  return relativePath;
};

function* redirectAfterSuccessfulLoginSaga() {
  const isLoggedIn = yield select(selectUserIsAuthenticated);
  const {
    redirect_uri: redirectPath,
    ReturnURL: assetRedirectPath,
  } = queryParams(yield select(selectCurrentSearch));

  if (isLoggedIn && assetRedirectPath && typeof window != 'undefined') {
    const path = removeHostnamePart(assetRedirectPath);
    // This has to be a hard href to get the app to
    // leave React and hit the server for the IIS hosted assets
    window.location.href = path;
    // yield put(setRoute(path)); // does not work in this scenario
  } else if (isLoggedIn && redirectPath) {
    yield put(setRoute(redirectPath));
  }
}

function* logoutUserSaga({ redirectPath }) {
  yield put({
    type: SET_AUTHENTICATION_STATE,
    user: null,
  });
  yield LoginHelper.LogoutUser(redirectPath);
}

export function* refreshSecurityToken() {
  const clientCredentials = (
    (yield select(selectClientCredentials)) || Map()
  ).toJS();
  if (Object.keys(clientCredentials).length > 0) {
    const client = yield getManagementApiClient(clientCredentials);
    yield client.authenticate();

    const authenticationState = {};

    const newClientCredentials = mapClientCredentials(client);

    authenticationState.clientCredentials = newClientCredentials;

    yield put({
      type: SET_AUTHENTICATION_STATE,
      authenticationState,
    });
  }
}
