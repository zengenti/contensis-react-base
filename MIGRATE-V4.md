# 📦 Migration Guide: v3 to v4

With the release of Contensis React Base 4, this guide outlines the **breaking changes**, **required updates**, and **caveats** introduced in this major version update. Follow the **Migration steps** below to ensure a smooth upgrade.

This guide is for maintainers of React projects using the latest version of `@zengenti/contensis-react-base` version 3.

Before embarking on this migration it is strongly recommended to update your project to the very latest version 3 and try it out first, so you can identify and resolve any new console warnings or errors that **were not** introduced by migrating the project to version 4.

When you have completed all of the steps, you will need to test your project in both `development` mode (with hot reloading), and in the `production` mode (with SSR and client-side hydration).

Keep your Browser console open during testing to monitor for new errors or warnings

## 🚀 Major Upgrades

### React: v17 → v18

- Upgraded React from v17 to v18
- SSR responses streamed by default
  - adds `transfer-encoding: chunked` response header
  - enables full support for `<Suspense />` in React 18
- Replace React Hot Loader with React Fast Refresh
- You may encounter **new hydration errors** in SSR such as `Minified React Error #418` and `#423`.
  - [Text content does not match server-rendered HTML](https://nextjs.org/docs/messages/react-hydration-error)
  - [How to debug hydration errors](https://medium.com/@craigmorten/how-to-debug-react-hydration-errors-5627f67a6548)
- Deprecated support for IE11
- Deprecated `PropTypes` since 2017 (v15.5) and [checks have been removed](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-proptypes-and-defaultprops) in the next React v19 release

**Reference:** [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)

### React Router: v5 → v6

- Replace `useHistory` with `useNavigate`
- Changed **`staticRoute` object structure** – update all navigation utilities like `routeParams`.
- Replace `staticContext` – use new `useHttpContext()` hook instead.
- Remove `exact` prop in static routes – no longer required in v6+.
- Added **future flags** to upgrade from v6 to v7 as a potential non-breaking update.

**Reference:** [React Router v6 Migration Guide](https://reactrouter.com/docs/en/v6/upgrading/v5)

#### 🧭 New Router Helpers

Import any of these from `@zengenti/contensis-react-base/routing`

- **`<Redirect />`** and **`<Status />`** components are now available for JSX-based routing responses.
- **`useHttpContext()`** replaces the deprecated `staticContext` in React Router.
- **`routeParams`** helper is available as a named export (also in v3)

### Express: v4 → v5

- Requires **Node.js v18+** (v22 is recommended).
- Route pattern matching syntax has changed.

**Reference:** [Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html)

---

## 💥 Breaking Changes Summary

| Area             | Change                                                    |
| ---------------- | --------------------------------------------------------- |
| Node.js          | Minimum Node version 18 (version 22 is recommended)       |
| React            | React Hot Loader removed; React Fast Refresh now required |
| Router           | `useHistory()` hook replaced with `useNavigate()`         |
| Router           | `staticRoute` structure changed                           |
| Router           | `staticContext` removed, use `useHttpContext()`           |
| Express          | Route matching syntax changed                             |
| Express          | Removed deprecated method signatures                      |
| Compatibility    | IE11 support deprecated                                   |
| Compatibility    | Legacy bundle support deprecated                          |
| State Management | Deprecated Redux with Immutable.js                        |
| State Management | Default `stateType` now is plain JS (via Immer)           |
| Forms            | Deprecated `/forms`; use `@contensis/forms` instead       |

---

## Migration steps

### Upgrade your project's Node.js version

Update your local working copy of Node.js using `nvm` or your preferred method of installing Node.js... _we recommend you upgrade to version 20 or 22_.

**Example:** check your current Node.js version

```shell
node -v
# outputs version to console
v22.17.1
```

Update other references to Node.js throughout the app

- any `*.Dockerfile` -- update the tag number in the `FROM` docker image
- `.nvmrc` file -- update the number in here

### Upgrade to Contensis React Base 4

```shell
npm install @zengenti/contensis-react-base@next
```

_**N.B.:** the tag will change from `@next` to `@latest` when version 4 is released changing the command to `npm install @zengenti/contensis-react-base@latest`_

If you recieve errors regarding `Could not resolve dependency` or `Conflicting peer dependency` that prevent installation or uninstallation of npm packages, you should append `--legacy-peers-deps` option to all of your `npm install` and `npm uninstall` commands when completing this migration. Peer dependencies are automatically installed and checks have been enforced since Node.js v17+ and npm v7+. Further information: [How to avoid using "force" and "legacy-peer-deps"](https://javascript.plainenglish.io/how-to-avoid-using-force-and-legacy-peer-deps-when-running-npm-install-ci-612aa3288436)

### Hot Reloading: Upgrade to React Fast Refresh

Remove any reference to `@hot-loader/react-dom` in your `package.json`

```shell
npm uninstall @hot-loader/react-dom
```

Remove the previously required `alias` from your webpack config

**Example:** Delete `react-dom` alias from `webpack.base.config.js`

```js
  ...

  alias: {
    // ... other required import aliases,
    'react-dom': '@hot-loader/react-dom', // delete this line
  },

  ...
```

Remove the `react-hot-loader/babel` plugin

**Example:** Delete `react-hot-loader/babel` plugin from `babel.config.js`

```js
const plugins = {
  base: [
    // ... other plugins
    'react-hot-loader/babel', // delete this line
    '@loadable/babel-plugin',
    // ... other plugins
  ],
};
```

Search your entire project for any references to `hot(module)`

**Example:** Remove a `hot(module)` reference

```tsx
// Delete this import
import { hot } from 'react-hot-loader';

// Replace any reference to `hot(module)`
export default hot(module)(AppRoot);

// So it will instead look like this
export default AppRoot;
```

Then install the `react-refresh-webpack-plugin` and the required `react-refresh` package to your project's `devDependencies`

```shell
npm install --save-dev @pmmmwh/react-refresh-webpack-plugin react-refresh
```

Add the new plugin to your **development** webpack config

**Example:** Add [`@pmmmwh/react-refresh-webpack-plugin`](https://github.com/pmmmwh/react-refresh-webpack-plugin) to `webpack.dev.config.js`

```js
// Add the import/require near the top of the file
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

  ...

  // Add this in the existing `plugins[]` array in the webpack config
  plugins: [
    // ... any other existing plugins
    new ReactRefreshPlugin()
  ]
```

### React router changes

Remove any of the following package dependencies, and any related `@types` that may or may not be present in your `package.json`

```shell
npm uninstall react-router react-router-dom react-router-config

npm uninstall @types/react-router @types/react-router-dom @types/react-router-config
```

---

Search your entire project for any references to `useHistory`.

All references must be refactored to remove `useHistory()` hook and replace with `useNavigate()`

**Example:** A typical usage of `useHistory` inside a React component with user input updating the state and a submit action that navigates to a new location

```tsx
import { useHistory } from 'react-router-dom';

...

const [term, setTerm] = useState('');
const history = useHistory();

const submitForm = (event) => {
  event.preventDefault();
  if (!term) {
    history.push('/search');
  } else history.push('/search?term=' + term);
};
```

**Change to:** Replace `useHistory` with `useNavigate`, refactor usage of `history.*(...)` methods to be just `navigate(...)`

```tsx
import { useNavigate } from 'react-router-dom';

...

const [term, setTerm] = useState('');
const navigate = useNavigate();

const submitForm = (event) => {
  event.preventDefault();
  if (!term) {
    navigate('/search');
  } else navigate('/search?term=' + term);
};
```

The `navigate` function returned from `useNavigate()` hook also accepts options to customise the navigation action to provide equivalent functionality to calling different `history` methods such as `history.replace({...})`. Check the [`useNavigate` API documentation](https://reactrouter.com/api/hooks/useNavigate) for further detail.

---

Search your entire project for any references to `staticRoute`

Carefully examine any references and if necessary, refactor them to retrieve `params` or any other key using the new structure

**Example:** The old `staticRoute` format from [`react-router-config`](https://www.npmjs.com/package/react-router-config#matchroutesroutes-pathname) v5 looked like this

```javascript
{
  staticRoute: {
    route: {
      path: '/pricing',
      exact: true,
      projects: [
        'contensis'
      ],
      component: null
    },
    match: {
      path: '/pricing',
      url: '/pricing',
      isExact: true,
      params: {}
    }
  }
}
```

**Changed:** The new `staticRoute` format from [`react-router`](https://api.reactrouter.com/v7/interfaces/react_router.RouteMatch.html) v6 will now look like this

```javascript
{
  staticRoute: {
    params: {},
    pathname: '/pricing',
    pathnameBase: '/',
    route: {
      index: true,
      element: null,
      fetchNode: true
    }
  }
}
```

Instead of refactoring old boilerplate code, try out our new `routeParams` helper you can import from `@zengenti/contensis-react-base/search`

---

Search your entire project for references to `staticContext`

**Example:** you may have a routing component that references `<Route render={...} />`

```tsx
import { Route } from 'react-router-dom';

export const Status = ({ code, children }) => {
  return (
    <Route
      render={({ staticContext }: RouteComponentProps) => {
        if (staticContext) staticContext.statusCode = code;
        return children;
      }}
    />
  );
};
```

**Change:** using the new `useHttpContext()` context hook instead

```tsx
import { useHttpContext } from '@zengenti/contensis-react-base/routing';

export const Status = ({ code, children }) => {
  const httpContext = useHttpContext();
  if (httpContext) {
    httpContext.statusCode = code;
  }
  return <>{children}</>;
};
```

---

Remove references to `exact` prop in static routes

**Example:** Remove redundant prop from `StaticRoutes.ts`

```tsx
// Remove all references to `exact`
const staticRoutes: StaticRoute[] = [
  // ... any other static routes
  {
    path: '/search/:facet?',
    exact: false, // delete this line, and any other similar references
    component: SearchPage,
  },
  // ... any other static routes
];
```

---

This is by no means an exhaustive list of all changes required to support React Router 6 however should you encounter any further issues you should refer to the official [React Router v6 Migration Guide](https://reactrouter.com/docs/en/v6/upgrading/v5)

---

### Express server changes

Search your entire project for references to `app.`

Carefully examine any references for wildcard paths, or deprecated syntax

**Example:** Update wildcard paths with the new Express v5 syntax

```typescript
app.get('/server-feature/*', (req, res) => {
  // ... any server-side code
  res.send('Hello world');
});

app.get('*.aspx', (req, res) => {
  // ... any server-side code
  res.send('Hello world');
});
```

**Change:** Wildcard reference becomes a named parameter `{*splat}`

```typescript
app.get('/server-feature/{*splat}', (req, res) => {
  // ... any server-side code
  res.send('Hello world');
});

app.get('{*splat}.aspx', (req, res) => {
  // ... any server-side code
  res.send('Hello world');
});
```

A complete list of the changes introduced in Express v5 can be found in the official [Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html)

### Immutable.js deprecation

Since v3 we can set a `stateType` to be `immutable` (default) or `js`, so we could optionally use Immer to manage the immutability of our Redux state.

In v4, `immutable` is no longer the default `stateType` and the option has also been marked as deprecated.

We will be removing this support for Immutable.js in a future release

If your app still uses Immutable for its Redux state today, you will need to add the following option to your app entrypoints

**Change:** `client-entrypoint.ts` **and make the same change in `server.ts`**

```typescript
const config: AppConfig = {
  routes: {
    ContentTypeMappings: contentTypeRoutes,
    StaticRoutes: staticRoutes,
  },
  stateType: 'immutable', // add this line
  withReducers,
  withSagas,
  withEvents,
};

new ClientApp(ReactApp, config);
```

We would also recommend refactoring all of your custom Redux interactions to use **Immer** reducers and plain JS selectors, or **Redux Toolkit** slices

If your app already uses plain JS (Immer) for its Redux state, you can remove the following line

**Change:** `client-entrypoint.ts` **and make the same change in `server.ts`**

```typescript
const config: AppConfig = {
  routes: {
    ContentTypeMappings: contentTypeRoutes,
    StaticRoutes: staticRoutes,
  },
  stateType: 'js', // delete this line
  withReducers,
  withSagas,
  withEvents,
};

new ClientApp(ReactApp, config);
```

## ⚠️ Caveats & Gotchas

### 1. **Storybook compatibility with React 17**

Some Storybook packages may request React 17 as a peer dependency, leading to version mismatches.

✅ **Solution**: Upgrade Storybook packages to support React 18.

🛠️ **Workaround**:

```json
// In package.json
"overrides": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

---

### 2. **Missing packages due to peerDependency mismatches**

You may experience error `Module not found: Can't resolve '<package-name>'...` when starting your project for the first time

Some key dependencies like `react-redux`, or `styled-components` may not be installed in the project root. Each project is slightly different in their implementation so the actual package name(s) will be revealed when you start the project.

✅ **Solution**:

```sh
npm install <affected-package>
# verify it's in root ./node_modules/

npm uninstall <affected-package>
# verify it's still in root ./node_modules/
# and commit package-lock.json changes to git
```

If after this the dependency is still not in the root `./node_modules`, another solution could be to employ the `overrides` approach mentioned above.

---

### 3. `Minified React Error #418` and `#423`

Does a route you are loading in SSR keep producing this error in the browser console when the app hydrates?

Try commenting out the entire component contents and return a simple `return <p>Hello world</p>;` instead.

Rebuild the project and reload the problem page.

If the error persists, try changing the route configuration for the `StaticRoute` or `ContentTypeMapping` to **not** use a dynamic/lazy `loadable()` import, instead import the actual component into the route configuration directly.

Rebuild the project and reload the problem page.

If the error goes away, revert the change you made to the route configuration (to import the component directly), then we need to look at your `webpack.config.prod.js` file.

Ensure a loader exists that runs the `@loadable/babel-plugin` in **both** the server and client webpack configurations

**Example:** Ensure this loader exists in **both** server and client sections in `webpack.config.prod.js` file

```js
const CLIENT_MODERN_CONFIG = {
  // ... other existing config
  module: {
    rules: [
      // ... other existing rules/loaders
      // Include the next rule to ensure @loadable/components
      // and @loadable/serverwork together correctly
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@loadable/babel-plugin'],
          },
        },
      },
    ],
  },
  // ... other existing config
};
```

If you have updated any of your webpack configuration, rebuild the project again and reload the problem page, the error should no longer appear.

When resolved, uncomment any commented out sections in your component and try again. If the error persists after reinstating code, the problem is originating from within the reinstated code.

---

### 4. Debugging `Minified React Error #418`, `#423` or `#425`

These are all SSR Hydration mismatch errors

You can run the development version of React that will provide the full (and not minified) errors to help pinpoint which component(s) the error is created by

**Example:** Change the mode to `development` in client sections in `webpack.config.prod.js` file

```js
const CLIENT_PROD_CONFIG = {
  // mode: 'production',
  mode: 'development',
  // ... other existing config
};
```

Rebuild the project and reload the problem page.

---
