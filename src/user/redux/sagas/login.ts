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

import { setRoute } from '~/routing/redux/actions';
import { selectCurrentSearch } from '~/routing/redux/selectors';
import { findContentTypeMapping } from '~/routing/util/find-contenttype-mapping';

import mapClientCredentials from '~/user/transformations/mapClientCredentials';

import { getManagementApiClient } from '~/user/util/ContensisManagementApi';
import { LoginHelper } from '~/user/util/LoginHelper.class';
import { matchUserGroup } from '~/user/util/matchGroups';
import { queryParams } from '~/util/navigation';

export const loginSagas = [
  takeEvery(LOGIN_USER, loginUserSaga),
  takeEvery(LOGOUT_USER, logoutUserSaga),
  takeEvery(VALIDATE_USER, validateUserSaga),
  takeEvery(SET_AUTHENTICATION_STATE, redirectAfterSuccessfulLoginSaga),
];

export function* handleRequiresLoginSaga(action: any) {
  const {
    cookies,
    entry,
    path,
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
      findContentTypeMapping(ContentTypeMappings, entry?.sys?.contentTypeId)) ||
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
      console.info(`Route requires login: ${path}`);
      // If routeRequiresLogin do a blocking call that returns userLoggedIn
      userLoggedIn = yield call(validateUserSaga, {
        cookies,
        securityToken,
      });
      console.info(`User logged in: ${userLoggedIn}`);
    }
    // otherwise do a non blocking put to handle validation in the background
    else yield put({ type: VALIDATE_USER, cookies, securityToken });
  }

  if (routeRequiresLogin) {
    // If a security token is in the querystring and we are not already
    // logged in something is wrong and we won't bother going on another redirect loop
    if (!userLoggedIn && !securityToken) {
      LoginHelper.ClientRedirectToSignInPage(action.location.pathname);
    } else if (routeRequiresGroups.length > 0) {
      const userGroups = yield select(selectUserGroups, 'js');
      const groupMatch = matchUserGroup(userGroups, routeRequiresGroups);

      if (!groupMatch)
        LoginHelper.ClientRedirectToAccessDeniedPage(action.location.pathname);
    }
  }

  return userLoggedIn;
}

function* validateUserSaga({ cookies, securityToken }: any) {
  const login = LoginHelper.withCookies(cookies);
  // Check for refreshToken in cookies
  let clientCredentials = login.GetCachedCredentials();

  if (
    securityToken ||
    clientCredentials.securityToken ||
    clientCredentials.refreshToken
  ) {
    // We only attempt to validate the user if one of the stored
    // tokens are found, in this case we set loading state manually
    // so we don't need to set and unset loading if there are no stored
    yield put({
      type: SET_AUTHENTICATION_STATE,
      authenticationState: {
        isLoading: true,
      },
    });
    // If we have just a security token we will call a CMS endpoint
    // and provide us with a RefreshToken cookie we can use during login
    if (
      securityToken ||
      (clientCredentials.securityToken && !clientCredentials.refreshToken)
    ) {
      const [error, refreshToken] =
        yield LoginHelper.GetCredentialsForSecurityToken(
          securityToken || clientCredentials.securityToken
        );
      if (refreshToken) {
        // Set cookies and reload values
        login.SetLoginCookies({
          contensisClassicToken: securityToken,
          refreshToken,
        });
        clientCredentials = login.GetCachedCredentials();
      }
      if (error) {
        login.ClearCachedCredentials();
        yield put({
          type: SET_AUTHENTICATION_STATE,
          authenticationState: {
            isError: true,
            errorMessage:
              error?.message ||
              (error && 'toString' in error && error.toString()),
          },
        });
      }
    }

    // Log the user in if a refreshToken is found
    if (clientCredentials.refreshToken) {
      console.info(
        `Login user with refreshToken ${clientCredentials.refreshToken}`
      );
      yield call(loginUserSaga, {
        clientCredentials,
        cookies: login.cookies,
      });
    }
  }

  // Tell any callers have we successfully logged in?
  return yield select(selectUserIsAuthenticated);
}

function* loginUserSaga(action: any = {}) {
  const { username, password, clientCredentials, cookies } = action;
  const login = LoginHelper.withCookies(cookies);

  // If a WSFED_LOGIN site has dispatched the loginUser action
  // just redirect them to the Identity Provider sign in
  if (action.type === LOGIN_USER && LoginHelper.WSFED_LOGIN)
    LoginHelper.ClientRedirectToSignInPage();

  const { authenticationState, user } = yield login.LoginUser({
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
  const relativePath = '/' + path.split('/').splice(3).join('/');
  // eslint-disable-next-line no-console
  console.log(relativePath);
  return relativePath;
};

function* redirectAfterSuccessfulLoginSaga() {
  const isLoggedIn = yield select(selectUserIsAuthenticated);
  const { redirect_uri: redirectPath, ReturnURL: assetRedirectPath } =
    queryParams(yield select(selectCurrentSearch));

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

function* logoutUserSaga({ redirectPath, cookies }: any) {
  yield put({
    type: SET_AUTHENTICATION_STATE,
    user: null,
  });
  yield LoginHelper.withCookies(cookies).LogoutUser(redirectPath);
}

export function* refreshSecurityToken() {
  const clientCredentials = yield select(selectClientCredentials, 'js');
  if (Object.keys(clientCredentials).length > 0) {
    const client = yield getManagementApiClient(clientCredentials);
    yield client.authenticate();

    yield put({
      type: SET_AUTHENTICATION_STATE,
      authenticationState: {
        clientCredentials: mapClientCredentials(client),
      },
    });
  }
}
