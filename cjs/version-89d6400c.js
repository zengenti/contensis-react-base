'use strict';

const selectCommitRef = state => {
  var _state$version;

  return state === null || state === void 0 ? void 0 : (_state$version = state.version) === null || _state$version === void 0 ? void 0 : _state$version.commitRef;
};
const selectBuildNumber = state => {
  var _state$version2;

  return state === null || state === void 0 ? void 0 : (_state$version2 = state.version) === null || _state$version2 === void 0 ? void 0 : _state$version2.buildNo;
};
const selectVersionStatus = state => {
  var _state$version3;

  return state === null || state === void 0 ? void 0 : (_state$version3 = state.version) === null || _state$version3 === void 0 ? void 0 : _state$version3.contensisVersionStatus;
};

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
//# sourceMappingURL=version-89d6400c.js.map
