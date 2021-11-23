'use strict';

var selectors = require('./selectors-2c1b1183.js');

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
//# sourceMappingURL=version-dcfdafd9.js.map
