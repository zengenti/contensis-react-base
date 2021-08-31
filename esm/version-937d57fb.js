import { b as SET_VERSION, d as SET_VERSION_STATUS } from './injectors-3cbe3981.js';
import { j as action } from './actions-fda5e103.js';

const setVersion = (commitRef, buildNo) => action(SET_VERSION, {
  commitRef,
  buildNo
});
const setVersionStatus = status => action(SET_VERSION_STATUS, {
  status
});

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setVersion: setVersion,
  setVersionStatus: setVersionStatus
});

export { setVersion as a, setVersionStatus as s, version as v };
//# sourceMappingURL=version-937d57fb.js.map
