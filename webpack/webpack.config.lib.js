const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const packagejson = require('../package.json');
const BASE_CONFIG = require('./webpack.config.base');

const LIB_CONFIG = {
  mode: 'production',
  devtool: 'source-map',
  target: 'node',
  entry: {
    'zengenti-isomorphic-base': './src/app/lib.js',
    client: './src/app/lib-client.js',
    util: './src/app/lib-util.js',
  },
  output: {
    path: path.resolve(__dirname, '../'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    libraryTarget: 'umd',
  },
  externals: [
    ...Object.keys(packagejson.dependencies),
    '@babel',
    /^@redux-saga*/,
    'react-dom/server',
    'react-loadable/webpack',
  ],
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packagejson.version),
      'process.env.NODE_ENV': 'process.env.NODE_ENV',
    }),
  ],
};
module.exports = merge({ ...BASE_CONFIG, plugins: null }, LIB_CONFIG);
