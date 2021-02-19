const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactLoadablePlugin = require('react-loadable/webpack')
  .ReactLoadablePlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const WebpackModules = require('webpack-modules');
const WebpackModuleNomodulePlugin = require('webpack-module-nomodule-plugin');
const webpackNodeExternals = require('webpack-node-externals');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const BASE_CONFIG = require('./webpack.config.base');
const { WEBPACK_DEFINE_CONFIG, DEFINE_CONFIG } = require('./bundle-info');
const staticFolderPath = DEFINE_CONFIG.production.STATIC_PATH;

const minify = {
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
};

const CLIENT_MODERN_CONFIG = {
  name: `webpack-client-prod-config [modern]`,
  entry: {
    app: [
      path.resolve(__dirname, '../src/client/polyfills.modern.js'),
      path.resolve(__dirname, '../src/client/client-entrypoint.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, `../dist`),
    filename: `${staticFolderPath}/modern/js/[name].[chunkhash].mjs`,
    chunkFilename: `${staticFolderPath}/modern/js/[name].[chunkhash].mjs`,
  },
  plugins: [
    new WebpackModules(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index.ejs'),
      filename: path.resolve(__dirname, `../dist/index.html`),
      inject: true,
      minify,
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index_fragment.ejs'),
      filename: path.resolve(__dirname, `../dist/index_fragment.html`),
      inject: true,
      minify,
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index_static.ejs'),
      filename: path.resolve(__dirname, `../dist/index_static.html`),
      inject: false,
      minify,
    }),
    new WebpackModuleNomodulePlugin('modern', 'minimal'),
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, `../dist/modern/react-loadable.json`),
    }),
  ],
};

const CLIENT_LEGACY_CONFIG = {
  name: `webpack-client-prod-config [legacy]`,
  entry: {
    app: [
      path.resolve(__dirname, '../src/client/polyfills.legacy.js'),
      path.resolve(__dirname, '../src/client/client-entrypoint.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, `../dist`),
    filename: `${staticFolderPath}/legacy/js/[name].[chunkhash].js`,
    chunkFilename: `${staticFolderPath}/legacy/js/[name].[chunkhash].js`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve('src'),
          // These dependencies have es6 syntax which ie11 doesn't like.
          path.resolve('node_modules/contensis-delivery-api'),
          path.resolve('node_modules/fromentries'),
        ],
        use: {
          loader: 'babel-loader',
          options: { envName: 'legacy' },
        },
      },
    ],
  },
  plugins: [
    new WebpackModules(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index.ejs'),
      filename: path.resolve(__dirname, `../dist/index.html`),
      inject: true,
      minify,
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index_fragment.ejs'),
      filename: path.resolve(__dirname, `../dist/index_fragment.html`),
      inject: true,
      minify,
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index_static.ejs'),
      filename: path.resolve(__dirname, `../dist/index_static.html`),
      inject: false,
      minify,
    }),
    new WebpackModuleNomodulePlugin('legacy', 'minimal'),
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, `../dist/legacy/react-loadable.json`),
    }),
  ],
};

const CLIENT_PROD_CONFIG = {
  target: 'web',
  mode: 'production',
  stats: 'errors-only',
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
    new webpack.DefinePlugin(WEBPACK_DEFINE_CONFIG.prod),
    // Do these plugins only once per build so we'll do it here instead of base
    new CopyWebpackPlugin({
      patterns: [
        {
          globOptions: { ignore: ['index.html', 'index.ejs'] },
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, `../dist/${staticFolderPath}`),
        },
      ],
    }),
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
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve('src'),
          // These dependencies have es6 syntax which ie11 doesn't like.
          path.resolve('node_modules/contensis-delivery-api'),
          path.resolve('node_modules/fromentries'),
        ],
        use: {
          loader: 'babel-loader',
          options: { envName: 'legacy' },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};

const ANALYZE_CONFIG = {
  plugins: [new BundleAnalyzerPlugin({ analyzerMode: 'static' })],
};

if (process.env.ANALYZE) {
  module.exports = merge(
    BASE_CONFIG,
    CLIENT_PROD_CONFIG,
    CLIENT_MODERN_CONFIG,
    ANALYZE_CONFIG
  );
} else {
  module.exports = [
    merge(BASE_CONFIG, CLIENT_PROD_CONFIG, CLIENT_MODERN_CONFIG),
    // merge(BASE_CONFIG, CLIENT_PROD_CONFIG, CLIENT_LEGACY_CONFIG),
    merge(BASE_CONFIG, SERVER_PROD_CONFIG),
  ];
}
