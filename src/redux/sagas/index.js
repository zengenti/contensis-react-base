// index.js
import { all } from 'redux-saga/effects';
import { navigationSagas } from './navigation';
import { routingSagas } from '~/routing/redux/sagas';
import { userSagas } from '~/user/redux/sagas';

export default function (featureSagas = []) {
  return function* rootSaga() {
    const subSagas = [...routingSagas, ...navigationSagas, ...userSagas];
    yield all([...subSagas, ...featureSagas]);
  };
}
