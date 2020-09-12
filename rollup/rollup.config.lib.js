import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import submoduleResolvePlugin from './submodule-resolve-plugin';
import path from 'path';

const babelConfig = require('../babel.config.js');
const packagejson = require('../package.json');

const projectRootDir = path.resolve(__dirname);

export default {
  input: {
    'contensis-react-base': './src/lib/contensis-react-base.js',
    client: './src/client/client.js',
    redux: './src/lib/redux.js',
    routing: './src/lib/routing.js',
    search: 'zengenti-search-package',
    user: './src/lib/user.js',
    util: './src/lib/util.js',
  },
  output: [
    {
      //file: packageJson.main,
      dir: './cjs',
      format: 'cjs',
      sourcemap: true,
    },
    {
      // file: packageJson.module,
      dir: './esm',
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(packagejson.dependencies),
    /^@babel*/,
    '@babel',
    'history',
    /^@redux-saga*/,
    'react-dom/server',
    'react-loadable/webpack',
    'prop-types',
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
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: babelConfig.env.modern.presets,
      plugins: babelConfig.env.modern.plugins,
    }),
    commonjs(),
    postcss(),
  ],
};
