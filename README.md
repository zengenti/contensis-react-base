# Contensis React Base 🍃

Everything you need to get started with React and Contensis.

Handles web app routing with Contensis Site View and component rendering based on a loaded Content Type entry in Contensis, Redux application store creation and all the major application dependencies to get going, with server side rendering and an Express web server.

## Upgrade notes (older projects)

### React 17 (v3.0+)

This version introduces React v17. React is very sensitive to having multiple versions installed at the same time.

Many projects upgrading to v3.0 of `contensis-react-base` are likely to be using an older version of Storybook which when installed along with React 17 results in multiple versions of React being installed and resulting in the app not rendering giving a react console error.

You will need to upgrade your version of Storybook to be >= 6.1 which has support for React 17. [Further reading](https://storybook.js.org/blog/storybook-6-1/)

TLDR: Storybook have provided a simple way to upgrade. Run `npx sb upgrade` when upgrading to v2.6 of `contensis-react-base`. You should also ensure you are running the latest version of webpack or webpack@4 to prevent futher errors when loading Storybook.

If you are still getting react errors after this, check your project for other dependencies to remove/update that rely on older versions of react

# What's goin' on under the hood? 🔧

The core of your Contensis React application is in package `@zengenti/contensis-react-base` this must be installed as a 'production' dependency, i.e. lives in the `dependencies` section of your `package.json`

The package handles things such as:

- Peer dependencies such as React, react-router-dom, immutable, react-redux... etc.
- Server side express application serving an isomorphic web app
- Client side sub-package to handle client-side rendering and hydration
- Creation of redux store and global state management for core features
- Routing handled automatically via RouteLoader component which will load entries based on a given url
- Navigation data is automatically retrieved from the Node api to load the Site View into the state
- Automatic Cache key generation for any entries and nodes the core app handles, ensuring instant cache invalidation.

All of the essential 'boilerplate' code to work on React apps with Contensis is contained in a package that can be controlled and maintained in one place. Allowing us to provide a high quality, standardised and consistent experience for all projects.

The package does not handle things like:

- Building bundles for your project
- Providing global variables to access
  - e.g. CMS connection details
- Continuous integration & deployment

## Packages / subpackages

You will have imports available from the following packages:

- @zengenti/contensis-react-base
  - /client
  - /forms
  - /redux
  - /routing
  - /search
  - /user
  - /util

### contensis-react-base

Default export `ZengentiAppServer` which has a `.start()` function attached for use when loading the application via the server-side entrypoint

Named export `{ ReactApp }` provides a ready-made instance of a root `<App>` component to provide as the first argument to `ZengentiAppServer.start()`

All TypeScript models are exported from here and should be imported in your app from the default package `@zengenti/contensis-react-base`

### /client

Default export `ClientApp` which is a class when instantiated with `new ClientApp` accepts two constructor arguments similar to `ZengentiAppServer.start()` except for use when loading the application via the client-side entrypoint

### /forms

For use when using the newer Content Types and Entries based forms module

### /redux

Contains a named export of `{ store }` if you require a handle on the created redux store object anywhere in your app

### /routing

Named export of `{ RouteLoader }` which is our primary component responsible for initiating all the routing actions and triggering the specific api calls to Contensis to load all route-derived data into the app's redux store and render the appropriate component for any retrieved content.

### /search

For use when using the built-in search package for driving features like site search, listings and minilists in your app. React hooks and Higher order components are exported to wrap your components and inject additional props for handling all the required interactions inside your bespoke components.

### /user

For use when interactions are required with Contensis users for example user registration or login. React hooks and Higher order components are exported for common user interactions inside app components.

### /util

Some simple utility functions to save repetion of common functions in our app code

- simple functions to help build our app
- working out Contensis uris to standard uri patterns
- mapping functions when working with certain Contensis api results or data types
- a copy of `ZenInfo` page to show certain build and expose configuration parameters. Something we usually include with every deployed site and served at `/zenInfo` route.

### Using imports in your app

You should not import files from any other place than the packages / subpackages mentioned in this README. e.g. using imports like `@zengenti/contensis-react-base/cjs/client` or `@zengenti/contensis-react-base/models/*` is not recommended as it will not provide you with the best build output and they could change in future and would not be reflected in the semantic versioning having the potential to cause problems in future.

Sometimes VSCode may import the reference automatically from an unsupported place. You should check when committing your code that all imports are referenced correctly.

## TypeScript support (v2.5+)

As of v2.5.0 TypeScript declarations are available to use, and will also benefit applications written in JavaScript

All models are exported with the default package `@zengenti/contensis-react-base`

When importing Types to use in your own TypeScript project, try to always use the root import path e.g. `import { ModelName } from '@zengenti/contensis-react-base';`

## Loadable components (v3.0+)

We have switched to using `@loadable/components` for our code splitting and to get the best experience, so should you. You will need to swap out the existing `react-loadable` Babel and Webpack plugins and then convert your existing `react-loadable` code to use their `@loadable/components` syntax. [Read more here](https://loadable-components.com/docs/component-splitting/)

## Key scripts to build from source 🚦 📃

- `npm install` - install dependencies so we can get started
- `npm run build` - build the library bundles that will be published with the package

## Commits

Conventional commit messages are expected.

https://www.conventionalcommits.org/en/v1.0.0/#summary

# Changelog

#### 2.5.0 (2021-09-20)

##### New Features

- Removed useUser hook and created hooks for change password, forgot password (c65d6dd7)
- add entryMapper to /util utility function to clean up code when mapping route entries with jsonpath-mapper style templates and default arguments (3b6132d9)

##### Bug Fixes

- Error messages not displaying on the various password forms when operations fail (341bc827)
- issue with a default value set in typescript refactor (822da5c9)
- added two missing routing selectors (2ddc26e6)
- server side debugging requires an old version of babel-plugin to define the set globals in the app (09566a99)
- changes in latest immutable js typings break existing selectors by changing their return value from any to unknown, update search package to fix bug with ToJS component. Use typescript eslint import resolver (9da62533)
- update search package to set projectId in listings (098ea40f)
- small issue with SSR and dynamic bundles need to filter out some undefined array items from the loadable modules (c9fa233f)

##### Build System / Dependencies

- install latest search package and uninstall unused packages (81f1c1eb)
- update search package to add missing types, add rules-of-hooks back to eslintrc, correct staticRoute type in OnRouteLoadArgs (c7d1a9ce)
- add follow-tags to git push in release script so we caputure the tag created by npm version command (7030a4fd)
- adding further types to app config (d5da430c)
- add types to AppConfig keys (2c0d3447)
- search index.d.ts is not being copied in CI (0f6b7137)
- copy typescript models for search package as existing d.ts files are ignored by tsc (5f1ce21f)
- add missing @types packages (0f54a201)
- update search package to fix build (5223e118)
- update package-lock to fix build (a2f40c58)
- fix no default export in /client (9e10dc24)
- most models not published to npm (1b2eea17)
- try remove now redundant build stage (87d68755)
- handle all exports via index file, use ts-patch to be able to use tsconfig plugins to transform alias paths in d.ts files to usable paths for consumers (7fd52af6)
- update packages (dcc3cbd4)
- change npm script in CI to clean assets and build models with tsc (32c61de8)
- further TypeScript work (e91452d8)
- TypeScript with rollup and babel initial commit (2c737ed9)##### Other Changes

##### Performance Improvements

- remove excess code from bundles (03773ece)
- update zengenti packages (f654d22a)

##### Refactors

- further typescript conversions (9c88cd52)
- further typescript conversions (d7010813)
- typescript conversion progress, all models exported through default package, convert client entrypoint and types for routes and routing events (2a15b4c6)
- typescript conversion progress, types added for globals and server start config (12e17c53)

##### Documentation Changes

- add TypeScript notes to README (0a8bcabd)
- tweak package description text (4f713d5a)
- update CHANGELOG (b8b1b488)

#### Other changes

- zengenti/contensis-react-base into dom-auth-changes-merge (7d6e7ed9)
- //github.com/zengenti/contensis-react-base into contensis-14-forgot-change-password (c6775cf1)

#### 2.4.0 (2021-08-19)

##### Build System / Dependencies

- search package had gone back to old non TS version, now merged into master and back on correct version (5de95dfc)

##### Documentation Changes

- update README with some clarity on the available subpackages and their purpose also key scripts reduced to remove references to an included web app (29f284af)

##### New Features

- support saga and reducer injection, new key in ContentTypeMappings and StaticRoutes injectRedux async function when provided expects a returned object containing { key, reducer, saga } allowing adding dynamic imports into the redux store (d9786fda)

##### Bug Fixes

- global not defined error in dev mode (c650266c)
- update versionInfo page props to support github repositories (325992a4)
- entryMapper does not fire if the route path hasn't changed, we sometimes need the route entry remapped based on query params change for example, add return key to "onRouteLoad" event to ask the routing saga to not reuse the entry/mappedEntry from routing state and instead refetch and remap the route node if refetchNode is returned from the calling app as true (90f1fc7e)

##### Performance Improvements

- oidc-client appearing in consumer bundles despite the package being externalized in webpack. change to dynamic import and allow webpack splitChunksPlugin to handle the separation of this element and lazy loading (if it's ever called upon). webpackChunkName does not work at this time although the webpack hint comment has been left in should this work in future (13e3cb94)

##### Refactors

- call reduxInjector for static route separately (b4941837)
- implement new ./src/{lib} folder structure and remove inappropriate leftover folders (797c8bd1)
- delete webapp source and dependencies, update babel and eslint dependencies (40c320fb)

#### 2.3.0 (2021-08-06)

##### New Features

- add StaticRoute option "fetchNodeLevel" to be used with "fetchNode" to control how many url parts are sent to the siteview node api to resolve a route entry (f9e90ce0)
- new search package queryParams options "assetTypes" and "includeInSearch" (7cd86adb)
- scripts server start option. attributes option to add custom attributes to all rendered script tags. startup is now specified under new 'scripts' option (912625a9)
- add VersionInfo page as a named export of /util sub package, add globals from server startup options, keep this all server-side (9290561c)
- add new server start option "appRootPath", add support for any "startupScriptFilename" to be provided, added "resolveStartupMiddleware" to resolve requests for this static file to be served up from /dist/static/startup.js [skip ci](12d7f298)
- hostname in routing redux (17ed17f7)

##### Bug Fixes

- support new scripts.startup server config option (c53b96af)
- oidc-client import returning "UserMAnager is not a constructor" error when not importing the library version (b18b331f)
- build error around undefined global var (bdb0fc91)
- ensure in-app 404s hit the load balancer to allow load balancer take over and do any required rerouting (56dc8f12)
- add defaultLang to all api calls in routing saga (1fc57ba3)

##### Code Style Changes

- a new lick of paint for vscode (27c9a40d)

##### Tests

- add console.info when writing login cookies (de51a605)

##### Build System / Dependencies

- update search package to typescript branch (249ea515)
- remove /forms dir from global .npmignore (7bbb85e4)
- fix ci error due to out of date package-lock.json [skip ci](942b50a2)
- change release action to use github hosted runner (5a5d95c1)
- change local dev watch folders [skip ci](11d57430)
- change local dev watch folders [skip ci](2855d023)
- start script rollup watch [skip ci](615b4284)
- changes to scripts to work in monorepo scripts [skip ci](c294c27f)
- update package.json details (d287b258)
- remove pr from build ci [skip ci](2c8644d3)
- fix release script inputs [skip ci](b98804cf)
- fix syntax in release script [skip ci](42595aee)
- fix workflow syntax error, add master branch to build (c56c3d41)
- add new release action to be manually triggered, limit build and publish to branches (5c17ced5)
- fix issue with npm config (4112915c)
- fix problem with git actions (1031accd)
- move git interaction away from npm version scripts and into the action yml (c22665a1)
- don't tag ci prereleases (a5c55cb0)
- add git config to ci (871ed3c0)
- further testing ways of incrementing version and publishing prerelease package with actions (7c7b9f86)
- remove faulty test stage from preversion (91f3e248)
- add npm version to ci to increment a prerelease version and publish on each build (182a1a74)
- try fix cwebp compile from source in build (bfc61f6f)
- fix broken build with sudo (301f21fb)
- remove compiling from source error in npm ci (4d0196e1)
- suppress logging on npm ci build step (bde3cda0)
- update package name (4c1a43d6)
- update workflow action to use self-hosted runner (846b65bf)
- update search package to fix patch error in ci (caebac49)
- update package to remove missing patch error causing build to fail (0ffec891)
- add build github workflow action (a36f36a5)
- fix pull rate limit error (8efdf084)
- update search package to latest (a6447008)

##### Documentation Changes

- README update (#1) (8db8e8a1)
- tiny README update (54db40c5)
- update changelog (129081ca)

#### 2.2.3 (2021-05-10)

##### Bug Fixes

- entry object in routing saga not being passed to onRouteLoaded when doing field-limited entry search for a found siteview node (ce5d5df9)
- Empty currentNode value in routing when doing SSR (3a6cecd2)
- remove hostname from the ReturnURL querystring provided in the login redirect from classic web servers (e124ef11)
- issue around expired contensisClassicToken sending app on a redirect loop due to app reading refreshToken as valid but IIS requiring the contensisClassicToken / ContensisCMSUserName cookie which is not valid/not present, always write the latest client credentials to cookie when validating stored credentials (64cb6194)

##### Tests

- add new forms sub package (1393b479)

#### 2.2.2 (2021-04-08)

##### Documentation Changes

- update changelog (724f1727)

##### Bug Fixes

- change user props firstName, lastName to match new Management API format of camelcase (8433553b)
- Add contensis "ReturnURL" support to login redirects (b5c39814)

#### 2.2.1 (2021-04-06)

##### Documentation Changes

- update changelog (27eb6c35)

##### Bug Fixes

- issue in search package when using a customApi to retrieve search results (bf1cb0b7)
- issue with reading mappedEntry from the state not short circuiting to the fallback Immutable.Map() before calling .toJS() on a null value (36b62e55)

#### 2.2.0 (2021-04-01)

##### Build System / Dependencies

- disable warning (158a635d)
- add zenhub-dev as default .env (0308f34f)
- set zengenti-search-package to install from master branch (a90778fd)
- update contensis dependency packages (8a7e49f0)
- lib to ensure latest search package is installed (fec721ef)

##### Documentation Changes

- create changelog.md (859c4ae1)

##### New Features

- record and bubble up errors from the routing saga into the redux state, webApp middleware respects the context.status returned from the React StaticRouter and will render all status codes > 400 with the same rules as a plain 404 (b9f1dcc1)

##### Bug Fixes

- change user props userName, firstName, lastName to match new Management API format of all lowercase (8dbe7c3d)
- alter cache duration for 404 response to 5s down from 500s (f14a60a8)
- bug introduced with last fix causing dynamic=true to throw a server side error and return an error page (e81470df)
- Commit updated search bundles (cfa6b0ac)
- LoginHelper class - Loop through ApplicationData to find refresh token rather than assuming it's always at the same index (ade9ac53)

##### Other Changes

- track the current statusCode by setting it in the response object when it changes instead of primitive var (42dfd243)

#### 2.1.1

##### Bug Fixes

- issue with manipulated bundles from static not having cache headers on their response (9e59ca8d)
- prevent using relative paths to locate assets in a consumer project (d8cbe564)

##### Performance Improvements

- smaller bundles for release (db0a917f)

#### 2.1.0

##### Chores

##### New Features

- export redux store object in /redux subpackage (82db686e)
- new server startup options staticRoutePath and staticRoutePaths[] so an array of static route paths can be defined to serve up static assets from staticFolderPath. STATIC_PATH and STATIC_ROUTE_PATH are recommended in .env file can be used exclusively or together (df990169)
- adds new server start option to allow custom folder path and filename for static/startup.js (2c9ad565)
- support for a new server startup option of "staticFolderPath" this is not required initially as everything should default to 'static' path (b4356e17)
- use react-helmet to generate the html tag server side if htmlAttributes are specified in the consuming app (ad466706)
- introduced html attributes - If the app uses react-helmet html attributes they will now work server side. (ef7b89a3)
- add UPDATE_LOADING_STATE action to reset isLoading state when app has entry (79377ab0)
- add language control to routing preview and add defaultLang var (b7dbac18)

##### Bug Fixes

- add node.entry.language to the routing query (5247fb75)
- linkDepth in ContentTypeMappings not taking effect (f78c8507)
- issue with SSR not hydrating properly/flash alternative way of handling immer features (3b193fb2)
- set default folder path when serving static assets (cb9b2aef)
- variable access issue (a61bd07e)
- update search package to latest containing fixes and other tweaks (e8703763)
- removed unused comment (1401dbdd)
- multilingual entries not getting mapped when visiting the same entry but after switching language (ebcea379)
- removed some non-illegal characters from fixFreeTextForElastic func in search package (eeb2fe94)
- issue with mappedEntry not being written to the redux state in v2 only due to iffy Object.keys check (24fd300c)
- remove uneeded toJs (975a17b5)
- remove module-alias package reference causing server start to fail in release package (7261b155)

##### Other Changes

- add support for a nodeOptions object supplied with a ContentTypeMapping to specify details for fetching children for a route entry's contentTypeId (87a1302d)
- You have reached your pull rate limit. (4a2e76b7)
- attempt to nest immer reducers under one key (809e49be)
- testImmer bit more of an example (c4cab4d5)
- emulated sometimes using fromJS sometimes fromJSOrdered in the fromJSLeaveImmer (d54530bb)
- examples/doc to show how to use immer reducers and selectors (92712b0b)
- immer functionality/testing (8ce191d7)
- immer redux features (e16dfa3f)
- opportunity to reduce some of the excess code and add additional comments to webApp.js, remove redundant patch (0b7e0269)
- remove feature to automatically exclude the current route entry id in any minilist search, instead expect the consumer to provide the current route entry id in the options if they require the current page to be excluded from minilist results (98282648)

##### Performance Improvements

- changing the way we import login code and contensis-management-api package, to give consumer projects the potential to externalise this library from their vendor.js bundle if the login features are not required (055e4d43)
- remove unused packages, remove old webpack build script, update jsonpath-mapper to latest version (22323612)

##### Refactors

- remve superfluos header with Neil’s guidance (918d2e22)

#### 2.0.1

##### Bug Fixes

- issue in release package casuing prod server to fail to start, remove previous fix for @lse/component-library package (cbf61d96)
