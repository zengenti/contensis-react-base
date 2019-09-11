import { takeEvery, put, select } from 'redux-saga/effects';
import {
  CHECK_USER_LOGGED_IN,
  SET_USER_DETAILS,
  TOGGLE_USER_DETAILS_ARE_HIDDEN,
  SET_SHOW_USER_DETAILS,
} from 'app/redux/types/user';
import { getUserDetails } from 'app/util/user';
import { selectUserDetailsAreHidden } from 'app/redux/selectors/user';

export const userSagas = [
  takeEvery(CHECK_USER_LOGGED_IN, checkUserLoggedInSaga),
  takeEvery(TOGGLE_USER_DETAILS_ARE_HIDDEN, toggleUserDetailsAreHiddenSaga),
];

function* checkUserLoggedInSaga() {
  // const userDetails = {
  //   name: 'Hannibal Barca',
  //   email: 'hannibal@carthage.com',
  //   image: 'base64stuff',
  // };

  try {
    const userDetails = yield getUserDetails();
    yield put({ type: SET_USER_DETAILS, userDetails });
  } catch (e) {
    console.info('Error Calling user Service');
  }
}

function* toggleUserDetailsAreHiddenSaga() {
  const current = yield select(selectUserDetailsAreHidden);
  yield put({
    type: SET_SHOW_USER_DETAILS,
    userDetailsAreHidden: !current,
  });
}
