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
