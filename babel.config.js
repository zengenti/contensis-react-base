const defineConfig = require('./webpack/define-config').build;

module.exports = {
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { corejs: '3', useBuiltIns: 'entry' }],
        '@babel/preset-react',
      ],
      plugins: [
        ['transform-define', defineConfig],
        'babel-plugin-dynamic-import-node',
        [
          'module-resolver',
          {
            root: './src',
            alias: {
              '~': './src/app',
            },
            cwd: 'packagejson',
          },
        ],
        [
          'babel-plugin-styled-components',
          {
            displayName: true,
            ssr: true,
          },
        ],
        'react-hot-loader/babel',
        'react-loadable/babel',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-export-default-from',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-transform-classes',
      ],
      sourceMaps: 'inline',
      retainLines: true,
      sourceType: 'unambiguous',
    },
  },
};
