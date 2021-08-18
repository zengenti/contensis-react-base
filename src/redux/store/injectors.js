import { all } from 'redux-saga/effects';
import { reduxStore as DefaultStore } from './store';

export const convertSagaArray = sagas => {
  if (Array.isArray(sagas))
    return function* rootSaga() {
      yield all(sagas);
    };
  return sagas;
};

export const injectReducer = ({ key, reducer }, store = DefaultStore) => {
  if (
    Reflect.has(store.injectedReducers, key) &&
    store.injectedReducers[key] === reducer
  )
    return;
  store.injectedReducers[key] = reducer;

  store.replaceReducer(store.createReducer(store.injectedReducers));
};

export const injectSaga = ({ key, saga }, store = DefaultStore) => {
  const rootSaga = convertSagaArray(saga);
  let hasSaga = Reflect.has(store.injectedSagas, key);

  if (process.env.NODE_ENV !== 'production') {
    const oldDescriptor = store.injectedSagas[key]; // enable hot reloading of daemon and once-till-unmount sagas

    if (hasSaga && oldDescriptor.saga !== rootSaga) {
      oldDescriptor.task.cancel();
      hasSaga = false;
    }
  }
  console.info('injectSaga, key: ', key, 'hasSaga: ', hasSaga);

  if (!hasSaga) {
    store.injectedSagas[key] = {
      key,
      saga: rootSaga,
      task: store.runSaga(rootSaga),
    };
  }
};

export const injectRedux = ({ key, reducer, saga }, store = DefaultStore) => {
  console.info('injectRedux, key: ', key);
  if (reducer) injectReducer({ key, reducer }, store);
  if (saga) injectSaga({ key, saga }, store);
};

export const useInjectRedux = injectRedux;
