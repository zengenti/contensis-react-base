const defineConfig = require('./define-config').build;
const stringifyStrings = require('../src/app/core/util/stringifyStrings');

module.exports = {
  base: stringifyStrings(defineConfig),
  dev: {
    __isBrowser__: 'true',
  },
  prod: {
    __isBrowser__: 'false',
  },
};
