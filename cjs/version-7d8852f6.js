'use strict';

var injectors = require('./injectors-72d5b989.js');
var actions = require('./actions-e22726ed.js');

const setVersion = (commitRef, buildNo) => actions.action(injectors.SET_VERSION, {
  commitRef,
  buildNo
});
const setVersionStatus = status => actions.action(injectors.SET_VERSION_STATUS, {
  status
});

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setVersion: setVersion,
  setVersionStatus: setVersionStatus
});

exports.setVersion = setVersion;
exports.setVersionStatus = setVersionStatus;
exports.version = version;
//# sourceMappingURL=version-7d8852f6.js.map
