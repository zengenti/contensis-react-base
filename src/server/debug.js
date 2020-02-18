var context = typeof window != 'undefined' ? window : global;

var defineConfig = require('../../webpack/define-config').build;

Object.entries(defineConfig).map(([key, value]) => {
  context[key] = value;
});

require('./server');
