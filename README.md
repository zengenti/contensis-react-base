# Zengenti Base Project :boom:

## Key scripts :vertical_traffic_light: :page_with_curl:

- `npm install` - install dependencies so we can use the application
- `npm start` - start the application in development mode
- `npm run storybook` - start storybook in development mode
- `npm run build` - build the application into production-ready client and server-side bundles
- `npm run server` - start the application server same as we would as if it were deployed in production
- `npm run build && npm run dev:server` - build the application and start the server-side application from source code (allowing us to connect a debugger and stop on code that is executed server-side)

There is also a README in the webpack folder that goes into detail using multiple environments for a project and setting variables as part of launching the application.

## Branches

### feature-featureName :exclamation:

We are using feature branches on this project, if you are developing a new feature please create a new branch with the following naming convention `feature-featureName` this will clearly indicate that it is a feature branch. You should work on your feature branch until you are happy it passes tests and can be reviewed, your branch can then be merged into develop.

### Develop :bug:

This is the development branch, it can be viewed by the client but they understand that it is under development and they may see some unusual things. The reasons for this branch are as follows:

- A location to see prototypes that are functionality only
- Peer reviews

### Staging :question:

Staging branch is used for reviwing features that are ready to be merged into master

### Master :zap:

This branch is the master branch, it shoould only contain code that is ready to be released.

## Jira Integration :calendar:

If your commit message contains a Jira task ID gitlab will automatically add a comment to the Jira task, you can also add the following to your commit messages:

- `Resolves PSBP-1`
- `Closes PSBP-1`
- `Fixes PSBP-1`

# What's goin' on under the hood? :wrench:

The core of the application is in package `@zengenti/contensis-react-base` this must be installed as a 'production' dependency, i.e. lives in the `dependencies` section of your `package.json`

The package handles things such as:

- Peer dependencies such as React, react-router-dom, immutable, react-redux... etc.
- Server side express application serving an isomorphic web app
- Client side sub-package to handle client-side rendering and hydration
- Creation of redux store and global state management for core features
- Routing handled automatically via RouteLoader component which will load entries based on a given url
- Navigation data is automatically retrieved from the Node api to load the Site View into the state

# What you need to do next

- Define your CMS environment in the `.env` file
- Develop your features inside the `/src/app/features/` folder, create a new folder for each feature
- Tell the application to load any feature `reducers` and `sagas` when it starts
- Create pages in the `/src/app/pages/` folder to set your page layouts and load your components
- Define routes in your application, there are 'Static routes' and 'Content type mappings' which tell the application what pages are to be loaded when certain routes / content type entries are loaded
- Import components using the import aliases e.g. `~/pages/MyPage` avoid importing components like `/src/app/pages/MyPage` or `../../../pages/MyPage`

# Changelog

#### 1.1.1 (2021-05-10)

##### Bug Fixes

- entry object in routing saga not being passed to onRouteLoaded when doing field-limited entry search for a found siteview node (ce5d5df9)

##### Documentation Changes

- update changelog (4658a877)

#### 1.1.0 (2021-04-01)

##### Build System / Dependencies

- disable warning (158a635d)
- add zenhub-dev as default .env (0308f34f)
- set zengenti-search-package to install from master branch (a90778fd)

##### Documentation Changes

- create changelog.md (859c4ae1)

##### New Features

- record and bubble up errors from the routing saga into the redux state, webApp middleware respects the context.status returned from the React StaticRouter and will render all status codes > 400 with the same rules as a plain 404 (b9f1dcc1)

##### Bug Fixes

- alter cache duration for 404 response to 5s down from 500s (f14a60a8)
- bug introduced with last fix causing dynamic=true to throw a server side error and return an error page (e81470df)

##### Other Changes

- lib to ensure latest search package is installed (fec721ef)
- track the current statusCode by setting it in the response object when it changes instead of primitive var (42dfd243)

#### 1.0.3

##### Bug Fixes

- issue with manipulated bundles from static not having cache headers on their response (9e59ca8d)

#### 1.0.2

##### Bug Fixes

- prevent using relative paths to locate assets in a consumer project (d8cbe564)

#### 1.0.1

##### New Features

- export redux store object in /redux subpackage (82db686e)
- new server startup options staticRoutePath and staticRoutePaths[] so an array of static route paths can be defined to serve up static assets from staticFolderPath. STATIC_PATH and STATIC_ROUTE_PATH are recommended in .env file can be used exclusively or together (df990169)
- adds new server start option to allow custom folder path and filename for static/startup.js (2c9ad565)
- support for a new server startup option of "staticFolderPath" this is not required initially as everything should default to 'static' path (b4356e17)
- use react-helmet to generate the html tag server side if htmlAttributes are specified in the consuming app (ad466706)
- add UPDATE_LOADING_STATE action to reset isLoading state when app has entry (79377ab0)

##### Bug Fixes

- add node.entry.language to the routing query (5247fb75)
- set default folder path when serving static assets (cb9b2aef)
- variable access issue (a61bd07e)
- update search package to latest containing fixes and other tweaks (e8703763)
- remove uneeded toJs (975a17b5)

##### Other Changes

- add support for a nodeOptions object supplied with a ContentTypeMapping to specify details for fetching children for a route entry's contentTypeId (87a1302d)
- opportunity to reduce some of the excess code and add additional comments to webApp.js, remove redundant patch (0b7e0269)
- remove feature to automatically exclude the current route entry id in any minilist search, instead expect the consumer to provide the current route entry id in the options if they require the current page to be excluded from minilist results (98282648)

##### Performance Improvements

- remove unused packages, remove old webpack build script, update jsonpath-mapper to latest version (22323612)

##### Refactors

- remve superfluos header with Neil’s guidance (918d2e22)
