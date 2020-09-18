// index.js
import { all } from 'redux-saga/effects';
import { routingSagas } from './routing';
import { navigationSagas } from './navigation';

export default function(featureSagas = []) {
  return function* rootSaga() {
    const subSagas = [...routingSagas, ...navigationSagas];
    yield all([...subSagas, ...featureSagas]);
  };
}
