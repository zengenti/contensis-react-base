'use strict';

var selectors = require('./selectors-d5cd6b19.js');

const selectCommitRef = state => selectors.getImmutableOrJS(state, ['version', 'commitRef']);
const selectBuildNumber = state => selectors.getImmutableOrJS(state, ['version', 'buildNo']);
const selectVersionStatus = state => selectors.getImmutableOrJS(state, ['version', 'contensisVersionStatus']);

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
//# sourceMappingURL=version-0cb648de.js.map
