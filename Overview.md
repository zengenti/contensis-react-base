# Overview

This is a basic overview of some of the concepts and background to the structure of this project and it's branches.

The project is called `zen-base`. But it is currently two different projects. One is the `zengenti-isomorphic-base` which provides core routing and optional search functionality. The other is a starter project, `zen-base` which utilises `zengenti-isomorphic-base` to provide a default template to start a new project from, including some features like `search/listings` and `forms`.

The project you are dealing with depends on the branch you are on.

## Branches

- ### `isomorphic-base-rc`

  The core routing project current release candidate. The version that is published to npm. Don't use this as a starter project.

- ### `isomorphic-base`

  The development branch of isomorphic base that handles all the routing and exports/exposes useful functions and variables. Add new features and test fixes here. When all is good and warrants publishing to npm, merge into `isomorphic-base-rc` and increment the version number.

- ### `develop`

  This is the starter template project. Clone from this branch if creating a new project.

- ### `other branches`

  Tend to be feature branches to test out isomorphic base changes.

## Testing changes to isomorphic base in a different project

It is possible to test changes in `isomorphic-base` branch in a different project without needing to merge into `isomorphic-base-rc` and publishing to npm. The principle involves setting an alias to the base and installing the gitlab commit you want to test. Then by swapping the alias to the gitlab commit version rather than the npm package version you can test it. Alternatively, copy files from your local changes to the folder in your other project.

Example with UCLAN

Repoint all calls to the `@zengenti/contensis-react-base` npm package to the feature branch you want to test using an alias.

- `webpack/webpack.config.base.js`

  Add an alias to module.exports.resolve.alias `'@zengenti/contensis-react-base': 'zengenti-isomorphic-base'`

- `package.json`

  in dependencies add the link to the feature branch
  `"zengenti-isomorphic-base": "git+https://gitlab+deploy-token-2:xAprxEv22QDzmu6UtKUb@gitlab.zengenti.com/ps-projects/zengenti-base/zen-base.git#feat-routing-entrymapper"`

Rebuild your project after an npm install `npm i && npm run build`

You should be now testing against the feature branch you have done.

To revert, remove/comment out the alias in the `webpack.config.base.js` file.

## Custom Routing

In a site created from the zen-base starter develop branch, you can customise the information you get back when a route changes or when a new route entry has been fetched.

`src/app/core/redux/withEvents.js`
OnRouteLoad has a customNavigation object. By default it doesn't fetch and ancestors/siblings/children or tree. But these can be set to true and they will be available to consume.

## @zengenti/contensis-react-base

This npm package, as mentioned is developed in the `isomorphic-base` branch, merged and version incremented in the `isomorphic-base-rc` branch and published from there using `npm-publish` providing you have the rights to do so.

The branch has several `lib` files which are all different entry points for the build process to expose various parts of the project when imported from other projects.

- `lib.js`
  This is the nodejs version with client App & server exported
- `lib-client`
  Just the client exported
- `lib-redux`
  All redux selectors, types and actions exported in the format:

  `<reducer-name>:{ types: {}, actions: {}, selectors: {}, }`
  e.g. to import/use `selectCurrentHash` in another project you could do it like this:

  ```
  import { routing } from '@zengenti/contensis-react-base/redux';
   ...
  yield select(routing.selectors.selectRouteEntrySlug);
  ```
