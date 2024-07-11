import { g as getImmutableOrJS } from './selectors-bb117d1b.js';

const selectCommitRef = state => getImmutableOrJS(state, ['version', 'commitRef']);
const selectBuildNumber = state => getImmutableOrJS(state, ['version', 'buildNo']);
const selectVersionStatus = state => getImmutableOrJS(state, ['version', 'contensisVersionStatus']);

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectCommitRef: selectCommitRef,
  selectBuildNumber: selectBuildNumber,
  selectVersionStatus: selectVersionStatus
});

export { selectCommitRef as a, selectBuildNumber as b, selectVersionStatus as s, version as v };
//# sourceMappingURL=version-df7f7154.js.map
