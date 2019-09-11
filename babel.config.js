const defineConfig = require('./webpack/define-config');
const NODE_TARGET = 10;

// const presetEnv = {
//   "targets": {
//     "node": NODE_TARGET
//   }
// }
const presetEnv = {
  targets: {
    browsers: ['last 2 versions', 'IE >= 11'],
    node: NODE_TARGET,
  },
  //useBuiltIns: 'usage',
};

// if (process.env.NODE_ENV !== 'test') {
//   presetEnv.modules = false;
// }

module.exports = {
  presets: [['@babel/preset-env', presetEnv], '@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        root: './src',
        alias: {
          app: './src/app',
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
    [
      '@babel/plugin-transform-regenerator',
      {
        asyncGenerators: true,
        generators: true,
        async: true,
      },
    ],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-export-default-from',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-classes',
  ],
  env: {
    test: {
      plugins: [
        ['transform-define', defineConfig],
        'babel-plugin-dynamic-import-node',
      ],
      sourceMaps: 'inline',
      retainLines: true,
      sourceType: 'unambiguous',
    },
  },
};
