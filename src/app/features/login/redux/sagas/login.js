import { Map } from 'immutable';
import { takeEvery, select, put, call } from 'redux-saga/effects';
import {
  SET_USER_LOADING,
  SET_AUTHENTICATION_STATE,
  LOGIN_USER,
  LOGOUT_USER,
} from '../types';
import {
  selectUserIsAuthenticated,
  selectClientCredentials,
  selectUserGroups,
} from '../selectors';

import { setRoute } from '~/core/redux/actions/routing';
import { selectCurrentSearch } from '~/core/redux/selectors/routing';
import { getManagementAPIClient } from '~/core/util/ContensisManagementApi';
import { findContentTypeMapping } from '~/core/util/helpers';
import { queryParams } from '~/core/util/navigation';
import mapClientCredentials from '../../transformations/mapClientCredentials';
import { LoginHelper } from '../../util/LoginHelper.class';
import { matchUserGroup } from '../../util/matchGroups';

export const loginSagas = [
  takeEvery(LOGIN_USER, loginUserSaga),
  takeEvery(LOGOUT_USER, logoutUserSaga),
  takeEvery(SET_AUTHENTICATION_STATE, redirectAfterSuccessfulLoginSaga),
];

export function* handleRequiresLoginSaga(action) {
  const {
    entry,
    requireLogin,
    routes: { ContentTypeMappings },
    staticRoute,
  } = action;

  // Check if any of the defined routes have "requireLogin" attribute
  const { requireLogin: authRoute } = (staticRoute && staticRoute.route) || {};
  const { requireLogin: authContentType } =
    (entry &&
      findContentTypeMapping(ContentTypeMappings, entry.sys.contentTypeId)) ||
    {};

  // if requireLogin, authRoute or authContentType has been specified as an
  // array of groups we can merge the arrays and accept
  // any matched group supplied from either approach
  const routeRequiresGroups = [
    ...((Array.isArray(authContentType) && authContentType) || []),
    ...((Array.isArray(authRoute) && authRoute) || []),
    ...((Array.isArray(requireLogin) && requireLogin) || []),
  ];
  const routeRequiresLogin = !!authContentType || !!authRoute || !!requireLogin;

  // always validate and login user if cookies available on any route change
  yield call(validateUserSaga);

  if (routeRequiresLogin) {
    const userLoggedIn = yield select(selectUserIsAuthenticated);
    if (!userLoggedIn) {
      // Because we are using the Client only redirects, they will not
      // take effect during SSR
      LoginHelper.ClientRedirectToSignInPage(action.location.pathname);
    } else if (routeRequiresGroups.length > 0) {
      const userGroups = (yield select(selectUserGroups)).toJS();
      const groupMatch = matchUserGroup(userGroups, routeRequiresGroups);

      if (!groupMatch)
        LoginHelper.ClientRedirectToAccessDeniedPage(action.location.pathname);
    }
  }
}

function* redirectAfterSuccessfulLoginSaga() {
  const isLoggedIn = yield select(selectUserIsAuthenticated);
  const redirectPath = queryParams(yield select(selectCurrentSearch))
    .redirect_uri;

  if (isLoggedIn && redirectPath) {
    yield put(setRoute(redirectPath));
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
  yield put({
    type: SET_AUTHENTICATION_STATE,
    user: null,
  });
  yield LoginHelper.LogoutUser(redirectPath);
}

function* validateUserSaga() {
  // Check if querystring contains a securityToken
  const currentQs = queryParams(yield select(selectCurrentSearch));
  const securityToken = currentQs.securityToken || currentQs.securitytoken;
  if (securityToken) {
    LoginHelper.SetLoginCookies({ contensisClassicToken: securityToken });
    if (LoginHelper.WSFED_LOGIN) {
      const response = yield fetch(
        `${LoginHelper.CMS_URL}/REST/Contensis/Security/IsAuthenticated`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            securityToken: encodeURIComponent(securityToken),
          }),
        }
      );
      if (response.ok) {
        const responseBody = yield response.json();
        if (responseBody.LogonResult !== 0) {
          // TODO : security token invalid
        }
        if (
          !!responseBody.ApplicationData &&
          !!responseBody.ApplicationData.length &&
          responseBody.ApplicationData.length > 1 &&
          // eslint-disable-next-line prettier/prettier
          responseBody.ApplicationData[1].Key ===
            'ContensisSecurityRefreshToken'
        ) {
          const refreshToken = responseBody.ApplicationData[1].Value;
          LoginHelper.SetLoginCookies({
            contensisClassicToken: securityToken,
            refreshToken,
          });
        }
      }
    }
  }

  const userLoggedIn = yield select(selectUserIsAuthenticated);
  if (userLoggedIn) return;

  const credentials = LoginHelper.GetCachedCredentials();

  if (
    securityToken ||
    (credentials && !userLoggedIn && credentials.refreshToken)
  ) {
    yield call(loginUserSaga);
  }
}

export function* refreshSecurityToken() {
  const clientCredentials = (
    (yield select(selectClientCredentials)) || Map()
  ).toJS();
  if (Object.keys(clientCredentials).length > 0) {
    const client = getManagementAPIClient(clientCredentials);
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
