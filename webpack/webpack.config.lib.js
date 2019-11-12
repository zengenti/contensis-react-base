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
    'zengenti-appserver-package': './src/app/lib.js',
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    libraryTarget: 'umd',
  },
  externals: Object.keys(packagejson.dependencies),
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packagejson.version),
    }),
  ],
};
module.exports = merge({ ...BASE_CONFIG, plugins: null }, LIB_CONFIG);
