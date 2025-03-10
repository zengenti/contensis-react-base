import { g as getImmutableOrJS, c as action } from './selectors-BRzliwbK.js';
import { all } from '@redux-saga/core/effects';
import { r as reduxStore, S as SET_VERSION, a as SET_VERSION_STATUS } from './store-f0WxNWUu.js';

const hasNavigationTree = state => getImmutableOrJS(state, ['navigation', 'isReady']);
const selectNavigationRoot = state => getImmutableOrJS(state, ['navigation', 'root']);
const selectNavigationChildren = state => getImmutableOrJS(state, ['navigation', 'root', 'children']);
const selectNavigationDepends = () => [];

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasNavigationTree: hasNavigationTree,
  selectNavigationChildren: selectNavigationChildren,
  selectNavigationDepends: selectNavigationDepends,
  selectNavigationRoot: selectNavigationRoot
});

const convertSagaArray = sagas => {
  if (Array.isArray(sagas)) return function* rootSaga() {
    yield all(sagas);
  };
  return sagas;
};
const injectReducer = ({
  key,
  reducer
}, store = reduxStore) => {
  if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;
  store.injectedReducers[key] = reducer;
  store.replaceReducer(store.createReducer(store.injectedReducers));
};
const injectSaga = ({
  key,
  saga
}, store = reduxStore) => {
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
      task: store.runSaga(rootSaga)
    };
  }
};
const injectRedux = ({
  key,
  reducer,
  saga
}, store = reduxStore) => {
  console.info('injectRedux, key: ', key);
  if (reducer) injectReducer({
    key,
    reducer
  }, store);
  if (saga) injectSaga({
    key,
    saga
  }, store);
};
const useInjectRedux = injectRedux;

const setVersion = (commitRef, buildNo) => action(SET_VERSION, {
  commitRef,
  buildNo
});
const setVersionStatus = status => action(SET_VERSION_STATUS, {
  status
});

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setVersion: setVersion,
  setVersionStatus: setVersionStatus
});

export { injectReducer as a, injectSaga as b, convertSagaArray as c, setVersion as d, hasNavigationTree as h, injectRedux as i, navigation as n, setVersionStatus as s, useInjectRedux as u, version as v };
//# sourceMappingURL=version-BnnERhzW.js.map
