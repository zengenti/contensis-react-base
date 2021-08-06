import { to } from 'await-to-js';
import { put, select, takeEvery } from 'redux-saga/effects';
import { setRoute } from '~/routing/redux/actions';
import { selectCurrentSearch } from '~/routing/redux/selectors';
import { queryParams } from '~/util/navigation';
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
} from '../types';

export const registerSagas = [
  takeEvery(REGISTER_USER, registerSaga),
  takeEvery(REGISTER_USER_SUCCESS, redirectSaga),
];

function* registerSaga({ user, mappers }) {
  let requestBody = user;
  // Allow use of request mapper to take a user object
  // of any format and return the payload for the api request
  if (mappers && mappers.request && typeof mappers.request === 'function') {
    requestBody = yield mappers.request(user);
  }

  // Make POST call to register API
  const response = yield fetch('/account/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    let mappedResponse;
    const [, responseBody] = yield to(response.json());
    if (responseBody) {
      // Allow use of response mapper to convert the successful user object
      // from the api response body into a user object of any format
      if (
        mappers &&
        mappers.response &&
        typeof mappers.response === 'function'
      ) {
        mappedResponse = yield mappers.response(responseBody);
      }
      // Update user object with mappedResponse or responseBody
      yield put({
        type: REGISTER_USER_SUCCESS,
        user: mappedResponse || responseBody,
      });
    } else {
      // OK response but unable to parse the response body
      yield put({
        type: REGISTER_USER_FAILED,
        error: {
          message:
            'Unable to parse the created user from the register service response',
        },
      });
    }
  } else {
    // Not OK responses, these can be due to service availability
    // or status codes echoed from the responses received from
    // management api when registering the user
    const [, errorResponse] = yield to(response.json());
    const error = (errorResponse && errorResponse.error) || errorResponse || {};
    // Get something meaningful from the response if there is no message in the body
    if (!error.message) {
      error.message = `Registration service: ${response.statusText}`;
      error.status = response.status;
    }
    yield put({
      type: REGISTER_USER_FAILED,
      error,
    });
  }
}

function* redirectSaga() {
  // Check if querystring contains a redirect_uri
  const currentQs = queryParams(yield select(selectCurrentSearch));
  const redirectUri = currentQs.redirect_uri || currentQs.redirect;

  // We must use redux based navigation to preserve the registration state
  if (redirectUri) yield put(setRoute(redirectUri));
}
