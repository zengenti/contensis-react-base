import { g as getImmutableOrJS, d as action } from './selectors-PJo8AWy0.js';
import { r as reduxStore, w as wrapSagasInGenerator, S as SET_VERSION, a as SET_VERSION_STATUS } from './store-DvfUmDcY.js';

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
    const injectEffects = [];
    for (const effect of saga) {
      // Inject this saga effect if it's not already present
      if (!store.initialSagas.has(effect)) injectEffects.push(effect);
    }
    const rootSaga = wrapSagasInGenerator(injectEffects);
    store.injectedSagas[key] = {
      key,
      saga: saga,
      task: store.runSaga(rootSaga)
    };
  }
};

const injectRedux = ({
  key,
  reducer,
  saga
}, store = reduxStore) => {
  // console.info('injectRedux, key: ', key);
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

export { injectSaga as a, injectRedux as b, setVersion as c, hasNavigationTree as h, injectReducer as i, navigation as n, setVersionStatus as s, useInjectRedux as u, version as v };
//# sourceMappingURL=version-CG6KA6Mv.js.map
