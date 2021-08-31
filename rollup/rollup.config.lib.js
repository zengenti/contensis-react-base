import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import submoduleResolvePlugin from './submodule-resolve-plugin';

const path = require('path');

const babelConfig = require('../babel.config.js');
const packagejson = require('../package.json');
const formsPackageJson = require('zengenti-forms-package/package.json');
const searchPackageJson = require('zengenti-search-package/package.json');

const projectRootDir = path.resolve(__dirname);

export default {
  input: {
    'contensis-react-base': './src/server',
    client: './src/client',
    forms: './src/forms',
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
    },
    {
      // file: packageJson.module,
      dir: './esm',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
  external: [
    ...Object.keys(packagejson.dependencies),
    ...Object.keys(formsPackageJson.dependencies),
    ...Object.keys(searchPackageJson.dependencies),
    /^@babel*/,
    '@babel',
    'history',
    /^@redux-saga*/,
    'react-dom/server',
    'react-loadable/webpack',
    'prop-types',
    /^contensis-delivery-api*/,
    /^contensis-core-api*/,
  ],
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
        'node_modules/zengenti-search-package/**',
        '../../node_modules/zengenti-search-package/**',
        '../search/**',
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: babelConfig.env.modern.presets,
      plugins: babelConfig.env.modern.plugins,
    }),
    commonjs(),
    postcss(),
  ],
  watch: {
    // include: 'src/**/*',
    exclude: [
      'cjs/*',
      'esm/*',
      'client/*',
      'forms/*',
      'redux/*',
      'routing/*',
      'search/*',
      'user/*',
      'util/*',
    ],
  },
};
