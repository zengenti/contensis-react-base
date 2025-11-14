import { all, Effect } from 'redux-saga/effects';

export const wrapSagasInGenerator = function (
  sagas: Effect[] | (() => Generator)
) {
  if (Array.isArray(sagas))
    return function* rootSaga() {
      yield all(sagas);
    };
  return sagas;
};
