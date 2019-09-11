const NODE_TARGET = 9;

// const presetEnv = {
//   "targets": {
//     "node": NODE_TARGET
//   }
// }
const presetEnv = {
  targets: {
    browsers: ['last 2 versions', 'IE >= 11'],
  },
  //useBuiltIns: 'usage',
};

// if (process.env.NODE_ENV !== 'test') {
//   presetEnv.modules = false;
// }

module.exports = {
  presets: [['@babel/preset-env', presetEnv], '@babel/preset-react'],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        ssr: true,
      },
    ],
    'react-hot-loader/babel',
    'react-loadable/babel',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-export-default-from',
    '@babel/plugin-proposal-export-default-from',
  ],
  env: {
    test: {
      plugins: ['babel-plugin-dynamic-import-node'],
    },
  },
};
