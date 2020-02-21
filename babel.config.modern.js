module.exports = {
  presets: [
    ['@babel/preset-env', { corejs: '3', loose: true, useBuiltIns: 'entry' }],
    ['@babel/preset-react', { loose: true }],
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: './src',
        alias: {
          '~': './src/app',
        },
        cwd: 'packagejson',
      },
    ],
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        ssr: true,
      },
    ],
    'react-hot-loader/babel',
    'react-loadable/babel',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
