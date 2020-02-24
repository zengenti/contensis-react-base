const defineConfig = require('./webpack/define-config').build;

const { legacy, modern } = require('./webpack/babel-bundle.config');

module.exports = {
  env: {
    test: {
      presets: [...modern.presets],
      plugins: [
        ['transform-define', defineConfig],
        'babel-plugin-dynamic-import-node',
        ...legacy.plugins,
      ],
      sourceMaps: 'inline',
      retainLines: true,
      sourceType: 'unambiguous',
    },
  },
};
