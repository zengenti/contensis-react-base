'use strict';

var selectors = require('./selectors-d96c128c.js');

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
//# sourceMappingURL=version-5178583d.js.map
