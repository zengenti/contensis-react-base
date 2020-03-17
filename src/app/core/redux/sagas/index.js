// index.js
import { all } from 'redux-saga/effects';
import { routingSagas } from './routing';
import { sagas as userSagas } from '~/features/login';
import { navigationSagas } from './navigation';
import { validateUserSaga } from '~/features/login/redux/sagas';

export default function(featureSagas = []) {
  return function* rootSaga() {
    const subSagas = [...routingSagas, ...navigationSagas, ...userSagas];
    yield all([validateUserSaga({}), ...subSagas, ...featureSagas]);
  };
}
