const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const Visualizer = require('webpack-visualizer-plugin');

const BASE_CONFIG = require('./webpack.config.base');

const SERVER_PROD_CONFIG = {
  name: 'webpack-server-prod-config',
  target: 'node',
  mode: 'production',
  stats: 'errors-only',
  entry: {
    server: path.resolve(__dirname, '../src/server/server.js'),
    test: path.resolve(__dirname, '../src/server/test.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  externals: [webpackNodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new Visualizer({
      filename: './server/server-stats.html',
    }),
  ],
};

module.exports = [merge(BASE_CONFIG, SERVER_PROD_CONFIG)];
