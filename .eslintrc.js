const path = require('path');

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      modules: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['prettier', 'react', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    jest: true,
    mocha: true,
    es6: true,
  },
  globals: {},
  // Will look for webpack.config.js to resolve path
  settings: {
    react: {
      version: '^16.0.0',
    },
    'import/resolver': 'typescript',
  },

  rules: {
    'arrow-parens': 0,
    'react/require-default-props': 0,
    'no-debugger': 0,
    'no-alert': 0,
    'no-console': [
      'error',
      {
        allow: ['error', 'info'],
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
        endOfLine: 'auto',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: path.resolve(__dirname),
      },
      plugins: ['@typescript-eslint'],

      // If need to support jsx
      //     parserOptions: {
      //       ecmaFeatures: { jsx: true }
      //     },
      extends: [
        'eslint:recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      settings: {
        'import/resolver': 'typescript',
      },
      /**
       * Typescript Rules
       * https://github.com/bradzacher/eslint-plugin-typescript
       * Enable your own typescript rules.
       */
      rules: {
        // Prevent TypeScript-specific constructs from being erroneously flagged as unused
        '@typescript-eslint/no-unused-vars': 'error',
        // Require a specific member delimiter style for interfaces and type literals
        // Default Semicolon style
        '@typescript-eslint/member-delimiter-style': 'error',
        // Require a consistent member declaration order
        '@typescript-eslint/member-ordering': 'error',
        // Require consistent spacing around type annotations
        '@typescript-eslint/type-annotation-spacing': 'error',

        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array',
          },
        ],
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              Object: {
                message:
                  'Avoid using the `Object` type. Did you mean `object`?',
              },
              Function: {
                message:
                  'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
              },
              Boolean: {
                message:
                  'Avoid using the `Boolean` type. Did you mean `boolean`?',
              },
              Number: {
                message:
                  'Avoid using the `Number` type. Did you mean `number`?',
              },
              String: {
                message:
                  'Avoid using the `String` type. Did you mean `string`?',
              },
              Symbol: {
                message:
                  'Avoid using the `Symbol` type. Did you mean `symbol`?',
              },
            },
          },
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'function',
            format: ['PascalCase', 'camelCase'],
          },
        ],
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/quotes': [
          'error',
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: true,
          },
        ],
        '@typescript-eslint/triple-slash-reference': [
          'error',
          {
            path: 'always',
            types: 'prefer-import',
            lib: 'always',
          },
        ],
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-parens': 'off',
        'comma-dangle': 'off',
        complexity: 'off',
        'constructor-super': 'error',
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'id-blacklist': [
          'error',
          'any',
          'Number',
          'number',
          'String',
          'string',
          'Boolean',
          'boolean',
          'Undefined',
          'undefined',
        ],
        'id-match': 'error',
        'max-classes-per-file': ['error', 1],
        'new-parens': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': 'error',
        'no-debugger': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-fallthrough': 'off',
        'no-invalid-this': 'off',
        'no-new-wrappers': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': ['error', 'never'],
        // 'prefer-arrow/prefer-arrow-functions': 'error',
        'prefer-const': 'error',
        // 'prettier/prettier': [
        //   'error',
        //   {
        //     trailingComma: 'es5',
        //     singleQuote: true,
        //     printWidth: 80,
        //     endOfLine: 'auto',
        //     arrowParens: 'avoid',
        //   },
        // ],
        quotes: 'off',
        radix: 'error',
        'spaced-comment': [
          'error',
          'always',
          {
            markers: ['/'],
          },
        ],
        'use-isnan': 'error',
        'valid-typeof': 'off',
      },
    },
  ],
};
