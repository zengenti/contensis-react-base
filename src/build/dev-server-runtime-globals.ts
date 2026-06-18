/**
 * This file is emitted as a standalone `cjs/dev-server-globals.js` by rollup.
 * It is loaded by nodemon via the `-r` flag in the SSR server child process.
 * It resolves the consumer's `webpack/define-config` at runtime (using
 * `process.cwd()` = consumer project root) and injects the development
 * defines as global variables.
 */
import path from 'path';

const defineConfigPath =
  process.env.CRB_GLOBALS_PATH ||
  path.resolve(process.cwd(), 'webpack', 'define-config');

const defineConfig = require(defineConfigPath).development as Record<string, string>;

Object.entries(defineConfig).forEach(([key, value]) => {
  global[key] = value;
});
