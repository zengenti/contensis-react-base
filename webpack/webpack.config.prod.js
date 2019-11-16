const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ReactLoadablePlugin = require('react-loadable/webpack')
  .ReactLoadablePlugin;
const webpackNodeExternals = require('webpack-node-externals');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const WebpackShellPlugin = require('webpack-shell-plugin');

const BASE_CONFIG = require('./webpack.config.base');
const defineConfigProd = require('./define-config-webpack').prod;

const CLIENT_PROD_CONFIG = {
  name: 'webpack-client-prod-config',
  target: 'web',
  mode: 'production',
  stats: 'errors-only',
  entry: {
    app: path.resolve(__dirname, '../src/client/client-entrypoint.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      name: false,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
    runtimeChunk: 'single',
  },
  plugins: [
    new CleanWebpackPlugin('dist/*', {
      root: path.resolve(__dirname, '..'),
    }),
    new webpack.DefinePlugin(defineConfigProd),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index.ejs'),
      filename: './index.html',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        xhtml: true,
      },
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index_fragment.ejs'),
      filename: './index_fragment.html',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        xhtml: true,
      },
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index_static.ejs'),
      filename: './index_static.html',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        xhtml: true,
      },
    }),
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, '../dist/static/react-loadable.json'),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Production bundle has been created.'],
        notes: ['Start production server with command ``npm run server``'],
      },
    }),
    new CopyWebpackPlugin([
      {
        ignore: ['index.html', 'index.ejs'],
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist/static'),
      },
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: {
        optimizationLevel: 9,
      },
    }),
  ],
};

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
    new WebpackShellPlugin({
      onBuildEnd: [
        'echo "Executing Webpack post build scripts..."',
        'node node_modules/zengenti-buildstartup-package',
      ],
    }),
  ],
};

module.exports = [
  merge(BASE_CONFIG, CLIENT_PROD_CONFIG),
  merge(BASE_CONFIG, SERVER_PROD_CONFIG),
];
