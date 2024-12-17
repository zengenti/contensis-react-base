# Contensis React Base 🍃

Everything you need to get started with React and Contensis.

Handles web app routing with Contensis Site View and component rendering based on a loaded Content Type entry in Contensis, Redux application store creation and all the major application dependencies to get going, with server side rendering and an Express web server.

## Upgrade notes (older projects)

### Styled Components 6 (v3.3+)

Some projects may see console warnings in the web app like the example below after upgrading to v3.3+ which updates Styled Components from version 5 to 6

```
styled-components: it looks like an unknown prop "maxWidth" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)

React does not recognize the `maxWidth` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `maxwidth` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
```

To fix these warnings we can opt-in to certain behaviours from Styled Components v5 by wrapping the top-level components in `App` in a `StyleSheetManager` component and handlers for suppressing the necessary warnings. [Further reading](https://styled-components.com/docs/faqs#shouldforwardprop-is-no-longer-provided-by-default)

### React 17 (v3.0+)

This version introduces React v17. React is very sensitive to having multiple versions installed at the same time.

Many projects upgrading to v3.0 of `contensis-react-base` are likely to be using an older version of Storybook which when installed along with React 17 results in multiple versions of React being installed and resulting in the app not rendering giving a react console error.

You will need to upgrade your version of Storybook to be >= 6.1 which has support for React 17. [Further reading](https://storybook.js.org/blog/storybook-6-1/)

TLDR: Storybook have provided a simple way to upgrade. Run `npx sb upgrade` when upgrading to v3.0 of `contensis-react-base`. You should also ensure you are running the latest version of webpack or webpack@4 to prevent futher errors when loading Storybook.

If you are still getting react errors after this, check your project for other dependencies to remove/update that rely on older versions of react

# What's goin' on under the hood? 🔧

The core of your Contensis React application is in package `@zengenti/contensis-react-base` this must be installed as a 'production' dependency, i.e. lives in the `dependencies` section of your `package.json`

The package handles things such as:

- Peer dependencies such as React, react-router-dom, immutable, react-redux... etc.
- Server side express application serving a Universal JavaScript web app
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

### /forms (deprecated)

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
