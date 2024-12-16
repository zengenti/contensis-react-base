# Changelog

## [3.3.0](https://github.com/zengenti/contensis-react-base/compare/v3.2.2...v3.3.0) (2024-12-16)


### Features

* Update Styled components to v6 ([95c36ce](https://github.com/zengenti/contensis-react-base/commit/95c36ce02cb41babcd3e5311a6540c01534c1292))


### Bug Fixes

* content flash after ssr in projects using legacy `immutable` state format ([c3d070a](https://github.com/zengenti/contensis-react-base/commit/c3d070a005280ec7b9fc93ca19a88193b02a1864))
* fetch all entry fields in routing call when no fields array is supplied in static route ([139c379](https://github.com/zengenti/contensis-react-base/commit/139c3791168de6c131ba10bd0650d19148df76e9))
* protected forms render after logging out, set and unset additional login cookie used by `@contensis/forms` package ([721cbe0](https://github.com/zengenti/contensis-react-base/commit/721cbe0e6b2568224ad17f9c6aaed409cfb2c4a1))
* sanitise server-side usage of uri parts from request addressing vulnerability `CWE-96: Improper Neutralization of Directives in Statically Saved Code` and `CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')` ([927b61b](https://github.com/zengenti/contensis-react-base/commit/927b61b7bdc6af870f8c782b9c3d647a0820b2cb))


### Performance Improvements

* entry fetch options not applied from `fetchNode` object in a matched static route ([a44a200](https://github.com/zengenti/contensis-react-base/commit/a44a200d7984541bc67e3b6347945dd26611876f))

## [3.2.2](https://github.com/zengenti/contensis-react-base/compare/v3.2.1...v3.2.2) (2024-09-25)


### Bug Fixes

* `mappedEntry` is retained in state when changing to a route that does not have an `entryMapper` causing `entry` prop to become truncated after navigating inside the next page ([943609b](https://github.com/zengenti/contensis-react-base/commit/943609b26e55de1495e5ca41803d4edf13bef4dd))
* `referer` header in api calls during ssr is not accurate in high concurrent load scenarios ([3bad28e](https://github.com/zengenti/contensis-react-base/commit/3bad28e97188af71c589713081db295590352ac3))
* ensure SSR request and response objects are available in api SSRContext when the api is used from SSRContext ([abe1a2c](https://github.com/zengenti/contensis-react-base/commit/abe1a2c2ee88dcc3f53b7ce07c68c3815e5af0de))
* handle authenticate api in localhost reverse proxy when proxying secured forms via the new forms api ([9d3c8b1](https://github.com/zengenti/contensis-react-base/commit/9d3c8b1cc5f2bd4c89b0c03a26f1b72d79fe31fc))
* handle new forms api in localhost reverse proxy when proxying delivery api requests ([edd7932](https://github.com/zengenti/contensis-react-base/commit/edd793216842ceeb018f462b876d626de5dedb93))
* server-side memory leak by updating cookies packages to latest ([5394cef](https://github.com/zengenti/contensis-react-base/commit/5394cef415a842e893a0ba93559f15bad38f0aa5))
* TypeScript error in StaticRoutes files when used with Loadable components ([8f0840f](https://github.com/zengenti/contensis-react-base/commit/8f0840f010527c8500c46b52ceedb7896601f427))


### Performance Improvements

* add `contentTypeId` to query when resolving any route entry by id to improve response time ([7527262](https://github.com/zengenti/contensis-react-base/commit/7527262f445e01ad0381d5e5edcd1b3680bb07ae))

#### 3.2.1 (2024-06-24)

##### Bug Fixes

*  use `cms` uri in user-based operations for DR scenario (135ccb54)
*  update CachedDeliveryAPI to access the 'fields' query param (#11) (1110bf43)

#### 3.2.0 (2024-04-26)

##### New Features

*  add support for new delivery api search parameter `fieldLinkDepths` (3f6d1def)
*  introduce `SSRContext` allowing us to hold and access request-scope references throughout the component tree and use these refs in backing code reliably scoped to the current request (915e9f97)

##### Bug Fixes

*  cache invalidation - surrogate key count inconsistencies in high concurrent load scenario (915e9f97)
*  Routing sagas - childrenOptions object undefined if nodeOptions.children not specified, meaning children saga would error with global children customNavigation setting (55b389b5)
*  restore delivery api response handler to handle 200 responses only due to inconsistent behaviour in non-ok fetch responses (5f69d2db)
*  add `any_update` header in SSR for any page request with any delivery api errors (3d404e4f)
*  correct syntax for last immutable fix (f415a487)
*  add server startup option `enableSsrCookies` as processing cookies in ssr can cause authentication information to become cached (67b0d011)
*  undefined error in ssr when using immutable state type (afd2f147)
*  undefined error on Redux in server features (e1e4842a)
*  need to provide path attribute when using `universal-cookie` package (95fe9f12)
*  Reset user state to prevent user details from being cached in SSR response (f8fb5bfe)
*  allow CookieHelper  fallback to browser cookies when cookies args not provided (457c4f56)
*  prevent mutation of DELIVERY_API_CONFIG when building client config (cafbe5e1)

##### Performance Improvements

*  remove surrogateKeys routing key from serialised redux state in ssr (749782bc)

##### Refactors

*  remove redundant types files (dac4cf52)
*  consolidate typescript types in models folder (de959949)
*  convert user login JS code to TypeScript (75ef4e0c)

##### Code Style Changes

*  fix return types in store creation (f611e88c)

#### 3.1.0 (2024-01-18)

##### New Features

*  Handle 401/403 response from Delivery API (27628a7)
*  add referer header to delivery api requests in ssr (27628a7)
*  able to specify an array of specific exception types to add listeners and exception handlers for and fixes server not exiting cleanly (27628a7)
*  Canonical Path support (033e212c)
*  Upgraded to Styled Components v6 beta (breaking change for Styled Components) (19c114ce)
*  /search package support for setting dynamic pageSize and fix for /forms subpackage after recent refactoring of imports (1b04662d)

##### Bug Fixes

*  ensure `surrogate-key` response header does not exceed 2000 keys and dedupe surrogate keys as they are collected and aggregated (e50c3583)
*  update forms package - accessible country searchable dropdown (ab1bd37d)
*  manually update version to align with another branch so that the ci versioning doesn't fail. (ef0cf3ba)
*  prefer x-orig-host over host header for currentHostname (6f34c5e2)
*  ensureNodeTreeSaga now respects language setting (1e67e8fb)
*  forms package import fix (e847ceca)
*  `object is not extensible` error when using `selectBreadcrumb` with immer state (59ca555b)
*  Revert update of Styled Components due to babel compiling issues. (23ef4ab4)
*  Increase number of user groups returned when requesting user details. (7d9e59a0)
*  allow use of exported delivery api methods which inherit cache invalidation features (2eeaed7b)
*  User reducer - Create object copy instead of referencing directly (1dad589b)
*  preview toolbar cannot edit the correct entry after client-side navigation (4df782cc)
*  exported `server` object is not working as expected (b3ce8a81)

##### Refactors

*  delivery api utilities now in TypeScript (0b1e8911)

##### Build System / Dependencies

*  fix error in release action (c03516c9)
*  fix issue with path transformations not applied to alias imports in d.ts files (27628a7)

#### 3.0.1 (2023-01-27)

##### Bug Fixes

- search package update supporting 'fuzzy' search (67bf14f3)
- revert package `chalk@4` as v5 requires total ESM environment which is incompatible with the Node.js app server today (4dcd478d)
- node process terminating on unhandled exception / promise rejection when running on node.js 15+, implement default behaviour as in <15 with the option to turn this off. Export express `server` for package consumers who need to access server methods in app handlers (677cd00a)
- search package null errors when replacing entire search state with a fresh config, remove redundant nav code (b74a526b)
- state-to-searchuri - fix crash when app state is immutable (f4e265eb)
- search package issue with APPLY_CONFIG after immer conversion (a827d075)
- Update from Search Package to use ?pageIndex over /pageIndex by default (99e42b90)
- search package fix resolving customApi response in ssr causes thread to hang (c4bed5e8)
- always use `api-` uri for delivery api proxy requests (6887e440)
- useMinilist hook, handle undefined arguments. (12d906d7)
- ContensisDeliveryApi.js -Add null check in LruCache.remove method (95cb63bf)

##### Refactors

- convert some files to typescript (5c3b74e2)
- Split deliveryApi and asset proxy servers into separate instances (7ae1e007)

#### 3.0.0 (2022-10-06)

##### New Features

- Allow choosing 301/302 for trailing slash redirect. (49921fcb)
- new feature which allows you to pass params to the site view query that fetches the static node, also you can now specify linkDepth, fields and a entry mapper in the static routes file (6dbf1517)
- support setting versionStatus via new header 'x-entry-versionstatus' (b867bb04)
- initial commit for final implementation of LinkDepthApi (6e581a43)
- additional exports from search package, `routeParams` helper util for use with react-router@6 or 5 (2cf19338)
- initial commit for linkdepth-api for use with search package (802a7edc)
- add CookiesProvider JSX from react-cookie to support use of useCookie() hook inside components which should return any cookies in a keyed object and optionally other cookie manipulation methods (5e0c3184)
- expose new navigation selector and remove redundant keys from routing and navigation state (1ae609ee)
- search feature filter config added logicOperator support (9a0d83d0)
- add routing selectors selectCurrentLocation and selectStaticRoute (23d45292)
- add additional mapping fields to mapComposer, \_index and $root, make all additional fields availalbe in item mappings returning only \_type and \_index with each mapped result (15acc8d0)
- add AppState typing, add stateType as an app start option to specify whether the app will load with an immer or an immutable state, with immutable references dynamically imported. createStore becomes async to support dynamic imports. remove toJS wrapper component and ensure selectors are reurned in plain JS instead (f9dd353e)
- upgrade dependency to support react 17 (c2843beb)

##### Bug Fixes

- incorrectly setting versionStatus to published in localhost after recent change (ef9fd02a)
- use scrollTo instead of scroll window function as this was causing inconsistent scroll behaviour on FF (364f1744)
- build add --legacy-peer-deps flag when installing node_modules (cd865b87)
- missing legacy build stats does not affect the server-side ChunkExtractor, add missing typings and update project to use node 16 / npm 8 (dce347a2)
- add error handling when reading /static/version.json in server startup (aef8d3a5)
- render script, noscript and base tags as well as meta and link in SSR (b899547a)
- give `nomodule` attribute in script tag an acceptable value (786a6366)
- invalid nomodule attribute on script tags, must be lower case (2dac2cff)
- update search package for better handling of customApi usage (7241e243)
- enable use of boolean in nodeOptions in ContentTypeMappings to override any global setting from onRouteLoad, add missing keys to ContentTypeMapping type (82960b5a)
- add forms key to convert this part of state to immer when used with immutable store (74f5a017)
- default export formv2 (fe1a4eae)
- missing return from double slash fix (b5601e37)
- preserve empty objects when cleaning serialised redux state in SSR (194bd8e7)
- resolve double-slash redirect vulnerability and remove non JSON-safe undefined and empty values from the serialised redux state in SSR (5618df7d)
- setting staticFolderPath outside of env files causing runtime file not found and 404 errors (c704682d)
- custom staticRoutePath not taking effect with loadable chunkExtractor in SSR (d9f63ae3)
- mapComposer will return empty object for any composeritem.type that isn't resolved to a keyed mapper (5202a5a5)
- search APPLY_CONFIG not persisting state in SSR (aa410755)
- between operator works with dates (11977f69)
- don't treat homepage differently from a normally routed page in routing saga so we can apply the same api loading sequence for any route when applying field and node restrictions for example, fix issue with entryLinkDepth 0 treated as falsy (19b4b5e3)
- search package expression tweaks and filter enhancement (267a0eeb)
- mapComposer util converting arrays into indexed object unintentionally, add some missing types for entryMapper and expose RouteNode type for writing entry mapping functions (9f4a5e3d)
- correctly set isLoading user prop when validating a security token from an Azure login or stored contensis credentials, LOGOUT_USER action without a redirect does not adequately remove the user from state (3e2e1b36)
- search package project switching issue (006905a6)
- log the url when calling SET_SURROGATE_KEYS to assist debugging (b5d6a0fc)
- incorrect fallback type for setting surrogate keys (39db75d2)
- retire nodeDepends from routing state and fix issue with not all surrogateKeys being provided in the SSR page response (f748ac24)
- update search package to resolve filtering issue (03bb7479)
- issues with consuming immutable selectors in user sagas after recent immer change (50bb525e)
- user selectors not working, return an object in an immer reducer, possibly to cover an immer faux pas? (fe24547b)
- allow <link> tags from react helmet to be added in to the <head /> server side (0fce150a)
- Enable retrieving arbitrary depth of children in contentTypeMapping node settings (36eecf5b)
- use memoised selector in RouteLoader to stop needless re-renders when using immutable app state (94132300)
- add form to fromJSLeaveImmer as this is now converted to use immer reducers (6fd2c9ab)
- broken version and user selectors (90c30ad9)
- ssr error due to serialize syntax after package upgrade (009a788a)
- back button gives 404 as we have mutated the cached node response by deleting the entry key in the routing reducer (95a41ab0)
- update search package to receive immer fixes (21fa682f)
- `loadableReady()` requires state error on hydrate (d9b4e685)
- undefined appearing in render after recent loadable changes (ff6eaf30)
- siteview nodes with no entry attached will now 404, unless the node has been requested via a defined staticRoute (258a169e)
- provide a way of providing consistent selector return types to internal sagas (8b1a970e)
- missing fromJS in return from getIn (a1b45be4)
- convert selectors to use new getIn function (56e5c903)
- dynamically load immutable library into global scope when immutable state type is used, set global var STATE_TYPE during async createStore (d0154681)
- typo in new function, better checking that input object is actually an object (2c91aefe)
- avoid calling toJS() inside selectors, create utility method to replace immutable's getIn (ea58df45)
- reinstate toJS HoC (6f37fe2a)
- getIn is not defined in selectors (81c80cbe)
- fromJS is not a function error (d5adfb34)
- react17 not getting installed in consumer project (48e2bacc)

##### Other Changes

- add a error message section in the navigation redux state so this is easier to debug in the future (e2cf6638)
- SideEffect(NullComponent)" error in development, update other packages checking for breaking changes, Helmet no longer has a default export (42f374c8)
- zengenti/contensis-react-base into feat/react17 (3ae0f5e6)
- converting redux store to immer and most reducers and selectors (d77ca793)

##### Performance Improvements

- refactor siteview api calls so they are all made at the same time, reduce footprint of network calls if nodes options have been set carelessly, fix issue with linkDepth 0 treated as falsy and expose nodeOptions.siblings in ContentTypeMappings (fc8900e5)
- only add additional composer fields to first array item in mapComposer instead of every field (6b443144)
- avoid referencing immutable library in ToJS component (3574319a)

##### Refactors

- add missing typings and exports for search mappers (3b9de097)
- use "is" naming convention for boolean values in user state (d9d4cb87)
- deprecate authenticationErrorMessage from authenticationState, instead use errorMessage (4658461e)
- add type for RouteComponentProps (eec4ef45)
- Remove react-loadable dependancies. Complete loadable-components implementation (99acc6fe)
- replace immutable getin when setting headers in ssr, preserve plain JS for parts of immutable state to maintain compatibility with immer reducers (ecbba1a2)
- tidy up webApp and load startup script from getBundleTags function (e4e2bfb4)
- remove react-loadable bundle generation from webApp as it is not working and use the loadable/server chunk extractors instead. This should fail gracefully if loadable-stats.json cannot be found (1dfc5199)
- move utility code out of webApp, wip for loadable/server implementation (08443957)

##### Build System / Dependencies

- resolve patch-package error (03a4198e)
- resolve ci error `package-lock.json file was created with an old version of npm` (36114b30)
- rebuild /forms subpackage from source code with each build (bc9f5a76)
- update dependency redux-injectors to resolve react 16 peerDependency error in npm 8 (eabe8d57)
- update contensis packages to latest and update outdated npm packages, fix build error with RouteLoader returning an unintelligable type due to the way it is exported (3ea987ab)
- remove excess console.info (5c72037f)
- update contensis packages to latest versions, add missing typings to fix broken build (e79c9dbe)
- change immer version to be greater than to resolve multiple versions getting installed with consumers, remove peerDependencies as they were not the required fix (5a4baf6b)
- introduce peerDependencies to allow npm to not separate key dependency installations such as immer when multiple conflicting versions exist to install (e5c2f390)
- add missing prod dependencies (065423f2)
- fix rollup error (d4d9cf81)
- replace deprecated babel-eslint (748fc4f1)
- remove postcss from build (0c547f03)
- update all known safe outdated dependencies (ec2a9417)
- update nodemon dev dependency to latest (d36c125c)
- add back react-loadable dependency to help out users who are yet to upgrade to loadable/components (8a83e367)
- update search package to use immer branch (5bdef918)
- export getImmutableOrJS utility function as /redux/getIn (4787b447)

##### Documentation Changes

- fix typo in readme [skip ci] (842faa3c)
- update README to be for v3.0 not v2.6 (343e9001)
- add loadable components to README (15ba287c)
- add further installation notes to fix Storybook errors when upgrading to react@17 (920a66b1)
- add v2.6 react17 upgrade installation notes (b569df73)

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
