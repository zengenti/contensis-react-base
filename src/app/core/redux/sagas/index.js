// index.js
import { all } from 'redux-saga/effects';
import { routingSagas } from './routing';
import { navigationSagas } from './navigation';
import { searchSagas } from './search';
export default function* rootSaga() {
  const subSagas = [...routingSagas, ...navigationSagas, ...searchSagas];
  yield all([...subSagas]);
}
