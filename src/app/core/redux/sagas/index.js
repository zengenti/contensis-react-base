// index.js
import { all } from 'redux-saga/effects';
import { navigationSagas } from './navigation';
import { routingSagas } from './routing';
import { userSagas } from '~/features/login/redux/sagas/index.js';

export default function (featureSagas = []) {
  return function* rootSaga() {
    const subSagas = [...routingSagas, ...navigationSagas, ...userSagas];
    yield all([...subSagas, ...featureSagas]);
  };
}
