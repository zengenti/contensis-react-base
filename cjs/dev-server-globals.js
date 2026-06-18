'use strict';

var path = require('path');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var path__default = /*#__PURE__*/_interopDefault(path);

/**
 * This file is emitted as a standalone `cjs/dev-server-globals.js` by rollup.
 * It is loaded by nodemon via the `-r` flag in the SSR server child process.
 * It resolves the consumer's `webpack/define-config` at runtime (using
 * `process.cwd()` = consumer project root) and injects the development
 * defines as global variables.
 */
const defineConfigPath = process.env.CRB_GLOBALS_PATH || path__default.default.resolve(process.cwd(), 'webpack', 'define-config');
const defineConfig = require(defineConfigPath).development;
Object.entries(defineConfig).forEach(([key, value]) => {
  global[key] = value;
});
//# sourceMappingURL=dev-server-globals.js.map
