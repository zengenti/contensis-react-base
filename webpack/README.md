# Configuration and Build :gear: :building_construction:

## Configuration

### .env files :lizard:

A file called `.env` is required in the project root, this contains the core pieces of information to connect to your CMS environment. The project is started and built as normal for these variables to apply to the build/startup.

You may create other files for example `.env.development` that contain the same core information but for another CMS environment e.g. a DEV CMS (if available) or another project.

To activate an alternative build/startup config (`.env.whatever`) you need to set environment variable `env` to the same value as your .env file's .{suffix}, you can do this in CLI and combine this with an npm script that already exists e.g. `npm --env=development run-script start` or `npm --env=development run-script build`, or you can add additional npm scripts to `package.json` to do the same thing if you prefer.

Setting the `env` variable when starting your npm script will decide which environment config is used for that build. If you have built while passing this variable as development, your bundles will be built for that environment only. i.e. you need to do separate builds for live / dev deployments.

### Project config (Babel) :space_invader:

We define the primary project configuration in a format that can be used by Babel (`babel-loader` and `babel-node`). The config is defined in `define-config.js`. This should be the only place to add configuration to your project.

The variables exported from here are available in the project as global variables and are accessed using the global variable name (with a comment/hint added to keep es-lint happy e.g. `const uri = PUBLIC_URI /* global PUBLIC_URI */;`).

During build phase these global variables are replaced with their actual values defined in `define-config.js`.

A smaller subset of these variables are exported during a production build. This is so the excluded global variables are retained in the built bundles, allowing us to set those global variables at runtime when starting the built server app.

### Project config (Webpack) :construction_worker:

Webpack uses an addon called `DefineConfig` where global variables can be defined. They get switched out during webpack builds in a similar way to above. Webpack's DefineConfig plugin requires string values to be wrapped in `JSON.stringify('my value')` otherwise the build will not add 'my value' as a string but an expression e.g. `const uri = my value;` which is invalid syntax.

Previously we would define any config twice, once in `define-config.js`, and then the decorated values in `define-config-webpack.js`. We no longer need to do this as there is a utility funtion in `define-config-webpack.js` which imports the values defined in `define-config.js` and will analyse and decorate any string values for us as needed.

## Delivery API project selection

So we can develop new features in a mock project, or support a skinned or localised instance of a site (e.g. improbable.com / improbable.cn) we might wish to scope our delivery api requests to either a development instance (running on localhost) or a deployed instance of a site/container to a different CMS project.

### There are two ways we can achieve this:

#### Dynamic project selection at runtime

We can do this without rebuilding or stop/start-ing as the project supports setting the delivery api projectId dynamically at runtime.

In a deployed instance, the project selection is automatically inferred from the hostname, or if it matches the defined PUBLIC_URI for that project. e.g. `dev.live.zen-base.contensis.cloud` or `live-zen-base.cloud.contensis.com` would resolve to the "primary" project, this is the project defined in the `.env` file, and is usually called "website". `dev.preview.mock.zen-base.contensis.cloud` or `*-mock-zen-base.cloud.contensis.com` would set the projectId to be "mock". The projects we are allowed to switch and choose at runtime are defined in `define-config.js` in an array called `PROJECTS`, you are expected to define the first / primary project in your `.env*` file and subsequent projects are to be hard-coded into the `PROJECTS` array. We will see the defined projects when we start the server.

In development / local server we cannot infer the project from hostname (unless you set your HOSTS file to point one of the deployed urls to 127.0.0.1). By default all requests will use the "primary" projectId. We can override this by adding querystring `?p=mock` to any address to set the projectId in the application state.

In backend saga code you can also set the project in calls to the delivery api, if for example you need to fetch some data from a different project while keeping your primary project targeted to a default.

#### Another .env file

This is a better option if you are working in a project that will be deployed and hosted as separate websites but built up from the same code-base / git repo.

Simply define an additional `.env.project` file for each project you need to provide a build for (ensure these are committed) and you can start an instance of the built project targeted at a specific environment AND project.

## Project build and startup

If you are using a single environment and a single project then you do nothing different. Simply `npm run build && npm run server` will get you where you need to be. If that were the case you wouldn't be here reading this, right?

We can cover multiple scenarios when using `.env` files

### Connecting to a different CMS

If for example we need to provide a build for both a live and development environment. We will provide and commit a separate `.env` file for each CMS environment we wish to connect our project to. Naming is not important, you choose what is handy for you in development. e.g. supplying files called `.env.development` and `.env` will work fine.

We build the project as normal, however during a post-build phase we will check for all `.env*` files and write out a specific server startup script for all files found.

If my `.env.development` file contained `ALIAS=zen-base-dev` and `PROJECT=website`, we will get a start script written to `/dist/server/start.zen-base-dev.js` and the server can be started via CLI using the following command `npm --start=zen-base-dev run-script server`

For my `.env` file containing `ALIAS=zen-base` and `PROJECT=website` I can start the server by changing my `--start=` argument to match the CMS alias e.g. `npm --start=zen-base run-script server`

When we have started a sever in this way we are also setting our default target from now on. The startup process will write out new default start scripts targeted to that environment, this is so we can still serve everything up in a standard way for those who have not read this document!

### Multiple projects, same CMS

If we are working on a project that is using multiple CMS projects to serve up content for a skinned or localised variant of a site that is deployed and hosted as separate websites but built up from the same code-base / git repo. (e.g. staff.ludlow.ac.uk, student.ludlow.ac.uk)

Create a separate `.env.*` file for each project we wish to connect the app to. e.g. `.env.staff` and `.env.student`, these will contain the same alias `ALIAS=ludlow-uni` except the projects will be their respective ids e.g. `PROJECT=staff` and `PROJECT=student`.

Build the project as normal, and then start the server in the following way: `npm --start=staff.ludlow-uni run-script server` for the staff.ludlow.ac.uk deployment, and `npm --start=student.ludlow-uni run-script server` for the student.ludlow.ac.uk deployment

Another use case for this multiple-project approach is if multiple borough councils wish to develop the same site but keep their content separate, we could create a .env file for each project and start each server targeting both the project and CMS alias. e.g. `.env.montgomeryshire` and `.env.radnorshire` we could start each site in the following way: `npm --start=montgomeryshire.council-blueprint run-script server`
