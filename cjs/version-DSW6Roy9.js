'use strict';

var selectors = require('./selectors-wCs5fHD4.js');
var effects = require('@redux-saga/core/effects');
var store = require('./store-D8dJBaFw.js');

const hasNavigationTree = state => selectors.getImmutableOrJS(state, ['navigation', 'isReady']);
const selectNavigationRoot = state => selectors.getImmutableOrJS(state, ['navigation', 'root']);
const selectNavigationChildren = state => selectors.getImmutableOrJS(state, ['navigation', 'root', 'children']);
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
    yield effects.all(sagas);
  };
  return sagas;
};
const injectReducer = ({
  key,
  reducer
}, store$1 = store.reduxStore) => {
  if (Reflect.has(store$1.injectedReducers, key) && store$1.injectedReducers[key] === reducer) return;
  store$1.injectedReducers[key] = reducer;
  store$1.replaceReducer(store$1.createReducer(store$1.injectedReducers));
};
const injectSaga = ({
  key,
  saga
}, store$1 = store.reduxStore) => {
  const rootSaga = convertSagaArray(saga);
  let hasSaga = Reflect.has(store$1.injectedSagas, key);
  if (process.env.NODE_ENV !== 'production') {
    const oldDescriptor = store$1.injectedSagas[key]; // enable hot reloading of daemon and once-till-unmount sagas

    if (hasSaga && oldDescriptor.saga !== rootSaga) {
      oldDescriptor.task.cancel();
      hasSaga = false;
    }
  }
  console.info('injectSaga, key: ', key, 'hasSaga: ', hasSaga);
  if (!hasSaga) {
    store$1.injectedSagas[key] = {
      key,
      saga: rootSaga,
      task: store$1.runSaga(rootSaga)
    };
  }
};
const injectRedux = ({
  key,
  reducer,
  saga
}, store$1 = store.reduxStore) => {
  console.info('injectRedux, key: ', key);
  if (reducer) injectReducer({
    key,
    reducer
  }, store$1);
  if (saga) injectSaga({
    key,
    saga
  }, store$1);
};
const useInjectRedux = injectRedux;

const setVersion = (commitRef, buildNo) => selectors.action(store.SET_VERSION, {
  commitRef,
  buildNo
});
const setVersionStatus = status => selectors.action(store.SET_VERSION_STATUS, {
  status
});

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setVersion: setVersion,
  setVersionStatus: setVersionStatus
});

exports.convertSagaArray = convertSagaArray;
exports.hasNavigationTree = hasNavigationTree;
exports.injectReducer = injectReducer;
exports.injectRedux = injectRedux;
exports.injectSaga = injectSaga;
exports.navigation = navigation;
exports.setVersion = setVersion;
exports.setVersionStatus = setVersionStatus;
exports.useInjectRedux = useInjectRedux;
exports.version = version;
//# sourceMappingURL=version-DSW6Roy9.js.map
