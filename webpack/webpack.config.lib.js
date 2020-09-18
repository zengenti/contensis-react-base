const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const Visualizer = require('webpack-visualizer-plugin');

const packagejson = require('../package.json');
const BASE_CONFIG = require('./webpack.config.base');

const LIB_CONFIG = {
  mode: 'production',
  devtool: 'source-map',
  target: 'node',
  entry: {
    'zengenti-isomorphic-base': './src/app/lib.js',
    client: './src/app/lib-client.js',
    redux: './src/app/lib-redux.js',
    routing: './src/app/lib-routing.js',
    search: './src/app/lib-search.js',
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
    /^@babel*/,
    '@babel',
    'history',
    /^@redux-saga*/,
    'react-dom/server',
    'react-loadable/webpack',
    'prop-types',
  ],
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packagejson.version),
      'process.env.NODE_ENV': 'process.env.NODE_ENV',
    }),
    new Visualizer({
      filename: `./client-stats.html`,
    }),
  ],
};
module.exports = merge({ ...BASE_CONFIG, plugins: null }, LIB_CONFIG);
