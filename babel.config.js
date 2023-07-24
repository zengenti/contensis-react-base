// const defineConfig = require('./webpack/define-config').build;
const path = require('path');
const projectRootDir = require('app-root-path').path;

const presets = {
  base: [],
  legacy: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        useBuiltIns: false,
        targets: ['node 8', 'IE >= 11', '> 1%'],
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  modern: [
    [
      '@babel/preset-env',
      {
        corejs: '3',
        loose: true,
        targets: ['chrome 78', 'firefox 70'],
        useBuiltIns: 'entry',
      },
    ],
    ['@babel/preset-react', { loose: true }],
    '@babel/preset-typescript',
  ],
};

const plugins = {
  base: [
    [
      'module-resolver',
      {
        root: './src',
        alias: {
          '~': path.resolve(
            projectRootDir,
            'node_modules/zengenti-forms-package/src/app'
          ),
          '~': './src',
          '-': './',
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
    '@loadable/babel-plugin',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-export-namespace-from',
  ],
  legacy: [
    [
      '@babel/plugin-transform-regenerator',
      {
        asyncGenerators: true,
        generators: true,
        async: true,
      },
    ],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-export-default-from',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-classes',
  ],
  modern: [['@babel/plugin-proposal-class-properties', { loose: true }]],
};

module.exports = {
  env: {
    legacy: {
      presets: [...presets.base, ...presets.legacy],
      plugins: [...plugins.base, ...plugins.legacy],
    },
    modern: {
      presets: [...presets.base, ...presets.modern],
      plugins: [...plugins.base, ...plugins.modern],
    },
  },
  presets: [...presets.base, ...presets.modern],
  plugins: [...plugins.base, ...plugins.modern],
};
