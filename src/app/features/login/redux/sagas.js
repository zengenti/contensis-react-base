import { takeEvery, select, put, fork, call } from 'redux-saga/effects';
import queryString from 'query-string';
import {
  LOGIN_USER,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT_USER,
  CREATE_USER_ACCOUNT,
  VALIDATE_USER,
  VALIDATE_USER_SUCCESS,
  VALIDATE_USER_FAILED,
  UPDATE_USER,
  FORGOT_USER_PASSWORD,
  CHANGE_USER_PASSWORD,
} from './types';
import { initialUserState } from './reducers';
import { SET_ROUTE } from '~/core/redux/types/routing';
import { selectCurrentSearch } from '~/core/redux/selectors/routing';
import { selectUser } from './selectors';
import { LoginHelper } from '../util/LoginHelper.class';
import { SecurityApi } from '../util/SecurityApi.class';

export const userSagas = [
  takeEvery(LOGIN_USER, loginUserSaga),
  takeEvery(LOGOUT_USER, logoutUserSaga),

  takeEvery(VALIDATE_USER, validateUserSaga),

  takeEvery(CREATE_USER_ACCOUNT, createUserAccountSaga),
  takeEvery(FORGOT_USER_PASSWORD, forgotPassword),
  takeEvery(CHANGE_USER_PASSWORD, changePassword),
];

function* loginUserSaga(action) {
  const getGroups = true;

  const { username, password } = action;
  if (username && password) {
    const user = yield LoginHelper.LoginUser(username, password, getGroups);

    yield call(updateUserSaga, {
      type: user.failedLogin ? LOGIN_FAILED : LOGIN_SUCCESSFUL,
      user,
      redirect: !user.failedLogin,
    });
  } else {
    yield LoginHelper.ClientRedirectToLogin();
  }
}

function* logoutUserSaga() {
  const user = LoginHelper.LogoutUser();
  yield fork(updateUserSaga, { user });
  const state = yield select();

  yield LoginHelper.ClientRedirectToHome(state.getIn(['router', 'location']));
}

export function* validateUserSaga(action) {
  const getGroups = true;

  const state = yield select();
  const currentQs = queryString.parse(
    state.getIn(['router', 'location', 'search'])
  );

  const qsToken = currentQs.securityToken || currentQs.securitytoken;

  if (qsToken) {
    LoginHelper.SetLoginCookies({ securityToken: qsToken });
  }

  const cookies = !qsToken
    ? action.cookies
    : {
        ContensisCMSUserName: encodeURIComponent(qsToken),
        ...action.cookies,
      };
  const user = yield LoginHelper.ValidateUser(getGroups, cookies);

  const type =
    user && user.loggedIn ? VALIDATE_USER_SUCCESS : VALIDATE_USER_FAILED;

  yield call(updateUserSaga, {
    type,
    user: user && !user.loggedIn ? initialUserState : user,
  });
}

function* updateUserSaga(action) {
  const userState = yield select(selectUser);
  yield put({
    type: UPDATE_USER,
    from: action.type,
    user: { ...userState.toJS(), ...action.user },
  });
  if (action.redirect) {
    const currentSearch = yield select(selectCurrentSearch);
    const qs = queryString.parse(currentSearch);
    const redirectUri = qs.redirect_uri;
    if (redirectUri) {
      yield put({ type: SET_ROUTE, path: redirectUri });
    }
  }
}

function* forgotPassword(action) {
  const message = yield LoginHelper.ForgotPassword(action.username);
  yield put({
    type: UPDATE_USER,
    user: {
      passwordReset: true,
      passwordResetMessage: message,
    },
    history,
  });
}

function* changePassword(action) {
  const state = yield select();
  const userState = yield state.get('user');
  let message = '';
  if (action.token) {
    message = yield LoginHelper.ChangePasswordWithToken(
      action.token,
      action.newPassword,
      action.newPasswordConfirm
    );
  } else {
    message = yield LoginHelper.ChangePassword(
      userState.username,
      action.oldPassword,
      action.newPassword,
      action.newPasswordConfirm
    );
  }
  yield put({
    type: UPDATE_USER,
    user: {
      logonResultMessage: message,
    },
    history,
  });
}

function* createUserAccountSaga() {
  const userState = yield select(selectUser);
  if (userState.username && userState.password) {
    // Call RegisterUser API
    const registerResponse = yield SecurityApi.RegisterUser(
      userState.username,
      userState.password
    );

    if (registerResponse) {
      const { securityToken, registrationResult, id } = registerResponse;

      if (securityToken) {
        const user = {
          ...userState,
          id,
          securityToken,
          password: null,
          loggedIn: true,
          verifiedEmail: false,
          failedLogin: false,
          failedToCreateAccount: false,
          registrationResult,
        };
        yield put({ type: UPDATE_USER, user });
      } else {
        const user = {
          ...userState,
          securityToken: null,
          loggedIn: false,
          verifiedEmail: false,
          failedLogin: true,
          failedToCreateAccount: true,
          registrationResult,
        };
        yield put({ type: UPDATE_USER, user });
      }
    } else {
      yield put({
        type: UPDATE_USER,
        user: { ...userState, registrationResult: 'ServiceFault' },
      });
    }
  }
}
