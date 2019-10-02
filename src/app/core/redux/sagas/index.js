// index.js
import { all } from 'redux-saga/effects';
import { routingSagas } from './routing';
import { navigationSagas } from './navigation';
import { appSagas } from './app';
import { searchSagas } from './search';
export default function* rootSaga() {
  const subSagas = [
    ...routingSagas,
    ...navigationSagas,
    ...appSagas,
    ...searchSagas,
  ];
  yield all([...subSagas]);
}
