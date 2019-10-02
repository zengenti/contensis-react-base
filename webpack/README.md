# Configuration and Build :gear: :building_construction:

## Configuration

### .env files :lizard:

A file called `.env` is required in the project root, this contains the core pieces of information to connect to your CMS environment. The project is started and built as normal for these variables to apply to the build/startup.

You may create other files for example `.env.development` that contains the same core information but for another CMS environment e.g. a DEV CMS (if available).

To activate an alternative build/startup config you need to set environment variable `CMS_ENV` to the same value as your .env file's .{suffix}, you can do this in CLI e.g. `npx cross-env CMS_ENV=development npm start` or `npx cross-env CMS_ENV=development npm run build`, or you can add additional npm scripts to `package.json` to do the same.

Setting the `CMS_ENV` variable will decide which environment config is used for that build. If you have built while passing this variable as development, your bundles will be built for that environment only. i.e. you need to do separate builds for live / dev deployments.

### Project config (Babel) :space_invader:

We define the primary project configuration in a format that can be used by Babel (`babel-loader` and `babel-node`). The config is defined in `define-config.js`. This should be the only place to add configuration to your project.

The variables exported from here are available in the project as global variables and are accessed using the global variable name (with a comment/hint added to keep es-lint happy e.g. `const uri = PUBLIC_URI /* global PUBLIC_URI */;`).

During build phase these global variables are replaced with their actual values defined in `define-config.js`.

### Project config (Webpack) :construction_worker:

Webpack uses an addon called `DefineConfig` where global variables can be defined. They get switched out during webpack builds in a similar way to above. Webpack's DefineConfig plugin requires string values to be wrapped in `JSON.stringify('my value')` otherwise the build will not add 'my value' as a string but an expression e.g. `const uri = my value;` which is invalid syntax.

Previously we would define any config twice, once in `define-config.js`, and then the decorated values in `define-config-webpack.js`. We no longer need to do this as there is a utility funtion in `define-config-webpack.js` which imports the values defined in `define-config.js` and will analyse and decorate any string values for us as needed.

## Delivery API project selection

So we can develop new features in a mock project, or support a skinned or localised instance of a site (e.g. improbable.com / improbable.cn) we might wish to scope our delivery api requests to either a development instance (running on localhost) or a deployed instance of a site/container to a different CMS project.

We can do this without rebuilding or stop/start-ing as the project supports setting the delivery api projectId dynamically at runtime.

In a deployed instance, the project selection is inferred from the hostname, or if it matches the defined PUBLIC_URI for that project. e.g. `dev.live.zen-base.contensis.cloud` or `live-zen-base.cloud.contensis.com` would resolve to the "primary" project, this is the project defined in the `.env` file, and is usually called "website". `dev.preview.mock.zen-base.contensis.cloud` or `*-mock-zen-base.cloud.contensis.com` would set the projectId to be "mock".

In development / local server we cannot infer the project from hostname (unless you set your HOSTS file to point one of the deployed urls to 127.0.0.1). By default requests will use the "primary" projectId. We can override this by adding querystring `?p=mock` to any address to set the projectId in the application state
