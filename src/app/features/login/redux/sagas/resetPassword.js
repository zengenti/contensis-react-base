import { put, takeEvery } from 'redux-saga/effects';
import { UserHelper } from '~/core/util/userHelper';
import {
  REQUEST_USER_PASSWORD_RESET,
  RESET_USER_PASSWORD,
  SET_REQUEST_USER_PASSWORD_RESET_ERROR,
  SET_REQUEST_USER_PASSWORD_RESET_SENDING,
  SET_REQUEST_USER_PASSWORD_RESET_SUCCESS,
  SET_RESET_USER_PASSWORD_ERROR,
  SET_RESET_USER_PASSWORD_SENDING,
  SET_RESET_USER_PASSWORD_SUCCESS,
} from '../types';

export const resetPasswordSagas = [
  takeEvery(REQUEST_USER_PASSWORD_RESET, requestPasswordResetSaga),
  takeEvery(RESET_USER_PASSWORD, resetPasswordSaga),
];

function* requestPasswordResetSaga(action) {
  const userEmailObject = action.userEmailObject;
  yield put({
    type: SET_REQUEST_USER_PASSWORD_RESET_SENDING,
  });
  if (userEmailObject && userEmailObject.userEmail) {
    try {
      const passwordResetRequestResponse = yield UserHelper.RequestPasswordReset(
        userEmailObject
      );

      if (passwordResetRequestResponse) {
        yield put({
          type: SET_REQUEST_USER_PASSWORD_RESET_SUCCESS,
        });
      } else {
        yield put({
          type: SET_REQUEST_USER_PASSWORD_RESET_ERROR,
          error: 'There was an error.',
        });
      }
    } catch (error) {
      yield put({
        type: SET_REQUEST_USER_PASSWORD_RESET_ERROR,
        error: error && error.toString(),
      });
    }
  } else {
    yield put({
      type: SET_REQUEST_USER_PASSWORD_RESET_ERROR,
      error: 'Invalid object',
    });
  }
}

function* resetPasswordSaga(action) {
  const resetPasswordObject = action.resetPasswordObject;

  yield put({
    type: SET_RESET_USER_PASSWORD_SENDING,
  });
  if (resetPasswordObject.token && resetPasswordObject.password) {
    try {
      const resetPasswordResponse = yield UserHelper.ResetPassword(
        resetPasswordObject
      );

      if (resetPasswordResponse) {
        yield put({
          type: SET_RESET_USER_PASSWORD_SUCCESS,
        });
      } else {
        yield put({
          type: SET_RESET_USER_PASSWORD_ERROR,
          error: 'There was an error.',
        });
      }
    } catch (error) {
      yield put({
        type: SET_RESET_USER_PASSWORD_ERROR,
        error: error && error.toString(),
      });
    }
  } else {
    yield put({
      type: SET_RESET_USER_PASSWORD_ERROR,
      error: 'Invalid object',
    });
  }
}
