import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import submoduleResolvePlugin from './submodule-resolve-plugin';

import path from 'path';

const packagejson = require('../package.json');

const projectRootDir = require('app-root-path').path;

export default {
  input: {
    'contensis-react-base': './src',
    client: './src/client',
    i18n: './src/i18n',
    redux: './src/redux',
    routing: './src/routing',
    search: './src/search',
    user: './src/user',
    util: './src/util',
  },
  output: [
    {
      //file: packageJson.main,
      dir: './cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      interop: 'auto',
    },
    {
      // file: packageJson.module,
      dir: './esm',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
      interop: 'auto',
    },
  ],
  strictDeprecations: true,
  external: [
    ...Object.keys(packagejson.dependencies),
    /^@babel*/,
    '@babel',
    'history',
    /^@redux-saga*/,
    'react-dom/client',
    'react-dom/server',
    'react-loadable/webpack',
    'react-router-dom/server',
    'prop-types',
    /^contensis-delivery-api*/,
    /^contensis-core-api*/,
  ],
  // context: 'this',
  onwarn: function (warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.error(warning.message);
  },
  plugins: [
    submoduleResolvePlugin(),
    peerDepsExternal(),
    alias({
      entries: [
        {
          find: '~',
          replacement: path.resolve(projectRootDir, 'src/app'),
        },
        {
          find: '-',
          replacement: path.resolve(projectRootDir, './'),
        },
      ],
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    babel({
      include: [
        'src/**',
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: [
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
      plugins: [
        [
          'module-resolver',
          {
            root: './src',
            alias: {
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
        '@loadable/babel-plugin',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-optional-chaining',
        '@babel/plugin-transform-export-namespace-from',
      ],
    }),
    json(),
    commonjs(),
    // postcss(),
  ],
  watch: {
    // include: 'src/**/*',
    exclude: [
      'cjs/*',
      'esm/*',
      'client/*',
      'redux/*',
      'routing/*',
      'search/*',
      'user/*',
      'util/*',
    ],
  },
};
