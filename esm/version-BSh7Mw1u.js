import { D as getImmutableOrJS } from './selectors-2glWqc_z.js';

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
//# sourceMappingURL=version-BSh7Mw1u.js.map
