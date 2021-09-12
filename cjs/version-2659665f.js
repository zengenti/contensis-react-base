'use strict';

var selectors = require('./selectors-0da0f962.js');

const selectCommitRef = state => selectors.getImmutableOrJS(state, ['routing', 'commitRef']);
const selectBuildNumber = state => selectors.getImmutableOrJS(state, ['routing', 'buildNo']);
const selectVersionStatus = state => selectors.getImmutableOrJS(state, ['routing', 'contensisVersionStatus']);

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectCommitRef: selectCommitRef,
  selectBuildNumber: selectBuildNumber,
  selectVersionStatus: selectVersionStatus
});

exports.selectBuildNumber = selectBuildNumber;
exports.selectCommitRef = selectCommitRef;
exports.selectVersionStatus = selectVersionStatus;
exports.version = version;
//# sourceMappingURL=version-2659665f.js.map
