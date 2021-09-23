import { g as getImmutableOrJS } from './selectors-b98d5c76.js';

const selectCommitRef = state => getImmutableOrJS(state, ['routing', 'commitRef']);
const selectBuildNumber = state => getImmutableOrJS(state, ['routing', 'buildNo']);
const selectVersionStatus = state => getImmutableOrJS(state, ['routing', 'contensisVersionStatus']);

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectCommitRef: selectCommitRef,
  selectBuildNumber: selectBuildNumber,
  selectVersionStatus: selectVersionStatus
});

export { selectCommitRef as a, selectBuildNumber as b, selectVersionStatus as s, version as v };
//# sourceMappingURL=version-3833e8b5.js.map
