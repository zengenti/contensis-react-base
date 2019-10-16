const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const appConfig = require('./define-config').build;
const defineConfigDev = require('./define-config-webpack').dev;

const BASE_CONFIG = require('./webpack.config.base');

const { SERVERS, REVERSE_PROXY_PATHS, PROXY_DELIVERY_API } = appConfig;

const apiProxy = PROXY_DELIVERY_API
  ? {
      '/api/*': {
        target: SERVERS.cms,
        changeOrigin: true,
      },
    }
  : {};
const reverseProxies = {};

REVERSE_PROXY_PATHS.forEach(path => {
  reverseProxies[path] = {
    target: SERVERS.iis || SERVERS.web,
    changeOrigin: true,
  };
});

const CLIENT_DEV_CONFIG = {
  name: 'webpack-dev-config',
  target: 'web',
  stats: 'errors-only',
  mode: 'development',
  entry: path.resolve(__dirname, '../src/client/client.js'),
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'stylelint-custom-processor-loader',
            options: {
              emitWarning: true,
            },
          },
          { loader: 'eslint-loader' },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
              name: 'static/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(defineConfigDev),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin(
      {
        server: false,
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:3001',
        open: 'local',
      },
      { reload: false }
    ),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Application is now running at http://localhost:3000'],
      },
    }),
    new CopyWebpackPlugin([
      {
        ignore: ['index.html', 'index.ejs'],
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist/static'),
      },
    ]),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    hot: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    quiet: false,
    watchOptions: {
      ignored: ['node_modules'],
      // aggregateTimeout: 300,
      // poll: 1000,
    },
    proxy: {
      ...apiProxy,
      ...reverseProxies,
    },
  },
};

// This is a hack because I can't get the file-loader to work in production, so I have included in the base and then delete and override here for dev.
// Locally I want images as 34234234234324.png, in prod i want /static/img/[name].[ext]?[hash]
delete BASE_CONFIG.module;

module.exports = merge(BASE_CONFIG, CLIENT_DEV_CONFIG);
