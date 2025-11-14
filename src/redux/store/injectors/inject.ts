import { Reducer } from 'redux';
import { Effect } from 'redux-saga/effects';
import { reduxStore as DefaultStore } from '../store';
import { wrapSagasInGenerator } from './util';

export const injectReducer = (
  { key, reducer }: { key: string; reducer: Reducer },
  store = DefaultStore
) => {
  if (
    Reflect.has(store.injectedReducers, key) &&
    store.injectedReducers[key] === reducer
  )
    return;
  store.injectedReducers[key] = reducer;

  store.replaceReducer(store.createReducer(store.injectedReducers));
};

export const injectSaga = (
  { key, saga }: { key: string; saga: Effect[] },
  store = DefaultStore
) => {
  // Proceed with the injection as usual if it's not a duplicate
  let hasSaga = Reflect.has(store.injectedSagas, key);

  if (process.env.NODE_ENV !== 'production') {
    const oldDescriptor = store.injectedSagas[key]; // enable hot reloading of daemon and once-till-unmount sagas

    if (hasSaga && oldDescriptor.saga !== saga) {
      oldDescriptor.task.cancel();
      hasSaga = false;
    }
  }

  if (!hasSaga) {
    // Check if the saga has already been added in the initial sagas
    const injectEffects: Effect[] = [];
    for (const effect of saga) {
      // Inject this saga effect if it's not already present
      if (!store.initialSagas.has(effect)) injectEffects.push(effect);
    }
    const rootSaga = wrapSagasInGenerator(injectEffects);
    store.injectedSagas[key] = {
      key,
      saga: saga,
      task: store.runSaga(rootSaga),
    };
  }
};
