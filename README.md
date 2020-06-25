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
