// index.js
import { all } from 'redux-saga/effects';
import { routingSagas } from './routing';
import { navigationSagas } from './navigation';
import { appSagas } from './app';
import { listingSagas } from './listing';
import { searchSagas } from './search';
import { countryEntryRequirementsSagas } from './countryEntryRequirements';
export default function* rootSaga() {
  const subSagas = [
    ...routingSagas,
    ...navigationSagas,
    ...appSagas,
    ...searchSagas,
    ...listingSagas,
    ...countryEntryRequirementsSagas,
  ];
  yield all([...subSagas]);
}
