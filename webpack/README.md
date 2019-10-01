# Configuration and Build :gear: :building_construction:

## Configuration

### .env files :lizard:

A file called `.env` is required in the project root, this contains the core pieces of information to connect to your CMS environment. The project is started and built as normal for these variables to apply to the build/startup.

You may create other files for example `.env.development` to contains the same core information but for another CMS environment e.g. a DEV CMS (if available).

To activate an alternative build/startup config you need to set environment variable `CMS_ENV` to the same value as your .env file's .{suffix}, you can do this in CLI e.g. `npx cross-env CMS_ENV=development npm start` or `npx cross-env CMS_ENV=development npm run build` or `npx cross-env CMS_ENV=development npm run server`, or you can add additional npm scripts to `package.json` to do the same.

### Project config (Babel) :space_invader:

We define the primary project configuration in a format that can be used by Babel (`babel-loader` and `babel-node`). The config is defined in `define-config.js`. This should be the only place to add configuration to your project.

The variables exported from here are available in the project as global variables and are accessed using the global variable name (with a comment/hint added to keep es-lint happy e.g. `const uri = PUBLIC_URI /* global PUBLIC_URI */;`).

During build phase these global variables are replaced with their actual values defined in `define-config.js`.

### Project config (Webpack) :construction_worker:

Webpack uses an addon called `DefineConfig` where global variables can be defined. They get switched out during webpack builds in a similar way to above. Webpack's DefineConfig plugin requires string values to be wrapped in `JSON.stringify('my value')` otherwise the build will not add 'my value' as a string but an expression e.g. `const uri = my value;` which is invalid syntax.

Previously we would define any config twice, once in `define-config.js`, and then the decorated values in `define-config-webpack.js`. We no longer need to do this as there is a utility funtion in `define-config-webpack.js` which imports the values defined in `define-config.js` and will analyse and decorate any string values for us as needed.
