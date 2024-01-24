'use strict';

var selectors = require('./selectors-14caa813.js');
var effects = require('@redux-saga/core/effects');
var version$1 = require('./version-34d91f68.js');

const hasNavigationTree = state => selectors.getImmutableOrJS(state, ['navigation', 'isReady']);
const selectNavigationRoot = state => selectors.getImmutableOrJS(state, ['navigation', 'root']);
const selectNavigationChildren = state => selectors.getImmutableOrJS(state, ['navigation', 'root', 'children']);
const selectNavigationDepends = () => [];

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasNavigationTree: hasNavigationTree,
  selectNavigationRoot: selectNavigationRoot,
  selectNavigationChildren: selectNavigationChildren,
  selectNavigationDepends: selectNavigationDepends
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
}, store = version$1.reduxStore) => {
  if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;
  store.injectedReducers[key] = reducer;
  store.replaceReducer(store.createReducer(store.injectedReducers));
};
const injectSaga = ({
  key,
  saga
}, store = version$1.reduxStore) => {
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
}, store = version$1.reduxStore) => {
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

const setVersion = (commitRef, buildNo) => selectors.action(version$1.SET_VERSION, {
  commitRef,
  buildNo
});
const setVersionStatus = status => selectors.action(version$1.SET_VERSION_STATUS, {
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
//# sourceMappingURL=version-a410c88e.js.map
