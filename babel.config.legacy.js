module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        useBuiltIns: false,
      },
    ],
    '@babel/preset-react',
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
    [
      '@babel/plugin-transform-regenerator',
      {
        asyncGenerators: true,
        generators: true,
        async: true,
      },
    ],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-export-default-from',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-classes',
  ],
};
