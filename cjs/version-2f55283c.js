'use strict';

var selectors = require('./selectors-aececbf8.js');

const select = state => selectors.getJS(state, 'version');

const selectCommitRef = state => {
  var _select;

  return (_select = select(state)) === null || _select === void 0 ? void 0 : _select.commitRef;
};
const selectBuildNumber = state => {
  var _select2;

  return (_select2 = select(state)) === null || _select2 === void 0 ? void 0 : _select2.buildNo;
};
const selectVersionStatus = state => {
  var _select3;

  return (_select3 = select(state)) === null || _select3 === void 0 ? void 0 : _select3.contensisVersionStatus;
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
//# sourceMappingURL=version-2f55283c.js.map
