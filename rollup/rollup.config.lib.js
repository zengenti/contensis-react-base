import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import submoduleResolvePlugin from './submodule-resolve-plugin';

const babelConfig = require('../babel.config.js');
const packagejson = require('../package.json');
const formsPackageJson = require('../node_modules/zengenti-forms-package/package.json');
const searchPackageJson = require('../node_modules/zengenti-search-package/package.json');

export default {
  input: {
    'contensis-react-base': './src/server',
    client: './src/client/client.js',
    forms: 'zengenti-forms-package',
    redux: './src/redux/exports.js',
    routing: './src/routing',
    search: 'zengenti-search-package',
    user: './src/user',
    util: './src/util/exports.js',
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
    babel({
      exclude: 'node_modules/**',
      presets: babelConfig.env.modern.presets,
      plugins: babelConfig.env.modern.plugins,
    }),
    resolve(),
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
