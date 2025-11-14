import { Effect } from 'redux-saga/effects';
import { navigationSagas } from './navigation';
import { routingSagas } from '~/routing/redux/sagas';
import { userSagas } from '~/user/redux/sagas';

export default (featureSagas: Effect[] = []) => {
  return [...routingSagas, ...navigationSagas, ...userSagas, ...featureSagas];
};

// export default function (featureSagas: Effect[] = []) {
//   return function* rootSaga() {
//     const subSagas = [...routingSagas, ...navigationSagas, ...userSagas];
//     yield all([...subSagas, ...featureSagas]);
//   };
// }
