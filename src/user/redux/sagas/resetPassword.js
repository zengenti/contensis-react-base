import { put, takeEvery, select } from 'redux-saga/effects';
import { to } from 'await-to-js';
import { getManagementApiClient } from '~/user/util/ContensisManagementApi';
import { UserHelper } from '~/user/util/userHelper';
import { selectClientCredentials } from '../selectors';
import {
  REQUEST_USER_PASSWORD_RESET,
  RESET_USER_PASSWORD,
  REQUEST_USER_PASSWORD_RESET_ERROR,
  REQUEST_USER_PASSWORD_RESET_SENDING,
  REQUEST_USER_PASSWORD_RESET_SUCCESS,
  RESET_USER_PASSWORD_ERROR,
  RESET_USER_PASSWORD_SENDING,
  RESET_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD,
  CHANGE_USER_PASSWORD_SENDING,
  CHANGE_USER_PASSWORD_SUCCESS,
  CHANGE_USER_PASSWORD_ERROR,
} from '../types';

export const resetPasswordSagas = [
  takeEvery(REQUEST_USER_PASSWORD_RESET, requestPasswordResetSaga),
  takeEvery(RESET_USER_PASSWORD, resetPasswordSaga),
  takeEvery(CHANGE_USER_PASSWORD, changePasswordSaga),
];

function* requestPasswordResetSaga(action) {
  const userEmailObject = action.userEmailObject;
  yield put({
    type: REQUEST_USER_PASSWORD_RESET_SENDING,
  });
  if (userEmailObject && userEmailObject.userEmail) {
    try {
      const passwordResetRequestResponse = yield UserHelper.RequestPasswordReset(
        userEmailObject
      );

      if (passwordResetRequestResponse) {
        if (!passwordResetRequestResponse.error) {
          yield put({
            type: REQUEST_USER_PASSWORD_RESET_SUCCESS,
          });
        } else {
          yield put({
            type: REQUEST_USER_PASSWORD_RESET_ERROR,
            error: passwordResetRequestResponse.error.message,
          });
        }
      } else {
        yield put({
          type: REQUEST_USER_PASSWORD_RESET_ERROR,
          error: 'No response from server',
        });
      }
    } catch (error) {
      yield put({
        type: REQUEST_USER_PASSWORD_RESET_ERROR,
        error: error && error.toString(),
      });
    }
  } else {
    yield put({
      type: REQUEST_USER_PASSWORD_RESET_ERROR,
      error: 'Invalid object',
    });
  }
}

function* resetPasswordSaga(action) {
  const resetPasswordObject = action.resetPasswordObject;

  yield put({
    type: RESET_USER_PASSWORD_SENDING,
  });
  if (resetPasswordObject.token && resetPasswordObject.password) {
    try {
      const resetPasswordResponse = yield UserHelper.ResetPassword(
        resetPasswordObject
      );

      if (resetPasswordResponse) {
        if (!resetPasswordResponse.error) {
          yield put({
            type: RESET_USER_PASSWORD_SUCCESS,
          });
        } else {
          const error =
            (resetPasswordResponse.error.data &&
              resetPasswordResponse.error.data.length > 0 &&
              resetPasswordResponse.error.data[0].message) ||
            resetPasswordResponse.error.message;
          yield put({
            type: RESET_USER_PASSWORD_ERROR,
            error,
          });
        }
      } else {
        yield put({
          type: RESET_USER_PASSWORD_ERROR,
          error: 'No response from server',
        });
      }
    } catch (error) {
      yield put({
        type: RESET_USER_PASSWORD_ERROR,
        error: error && error.toString(),
      });
    }
  } else {
    yield put({
      type: RESET_USER_PASSWORD_ERROR,
      error: 'Invalid object',
    });
  }
}

// userId
// existingPassword
// newPassword
function* changePasswordSaga(action) {
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

  try {
    const changePasswordObject = {
      userId: action.userId,
      existing: action.currentPassword,
      new: action.newPassword,
    };

    yield put({
      type: CHANGE_USER_PASSWORD_SENDING,
    });
    const clientCredentials = (yield select(selectClientCredentials)).toJS();
    const client = yield getManagementApiClient({ ...clientCredentials });

    const [err, res] = yield to(
      client.security.users.updatePassword(changePasswordObject)
    );

    if (err) {
      console.log('ERR: ', err);
      yield put({
        type: CHANGE_USER_PASSWORD_ERROR,
        error: err,
      });
      return;
    }

    // // eslint-disable-next-line no-console
    // console.log(changePasswordObject);
    // // eslint-disable-next-line no-console
    // console.log(userCredentialsObject);
    yield put({
      type: CHANGE_USER_PASSWORD_SUCCESS,
    });
  } catch (error) {
    console.log('ERROR: ', error);
    yield put({
      type: CHANGE_USER_PASSWORD_ERROR,
      error: error && error.toString(),
    });
  }
}
