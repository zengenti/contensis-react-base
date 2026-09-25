import { D as getImmutableOrJS } from './selectors-DIKsu8SE.js';

const selectCommitRef = state => getImmutableOrJS(state, ['version', 'commitRef']);
const selectBuildNumber = state => getImmutableOrJS(state, ['version', 'buildNo']);
const selectVersionStatus = state => getImmutableOrJS(state, ['version', 'contensisVersionStatus']);

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectBuildNumber: selectBuildNumber,
  selectCommitRef: selectCommitRef,
  selectVersionStatus: selectVersionStatus
});

export { selectCommitRef as a, selectVersionStatus as b, selectBuildNumber as s, version as v };
//# sourceMappingURL=version-7tjXt-WE.js.map
