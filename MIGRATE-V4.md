# 📦 Migration Guide: v3 → v4

Welcome to the official upgrade guide for **Contensis React Base v4**.

This document covers the **breaking changes**, **major upgrades**, and **migration steps** needed to move from version 3 to version 4.

> ⚠️ This guide is for maintainers of React projects using `@zengenti/contensis-react-base` v3.

## 📝 In This Guide

- ⚙️ [Before You Start](#️-before-you-start)
- 🚀 [What’s New in v4](#-whats-new-in-v4)
- 🚨 [Breaking Changes Overview](#-breaking-changes-overview)
- 🔧 [Step-by-Step Migration](#-step-by-step-migration)
- 🧠 [Known Issues & Debug Tips](#-known-issues--debug-tips)

## ⚙️ Before You Start

Before upgrading to v4, first update your app to the **latest version 3.x**. This ensures there are no lingering issues from v3.

### ✅ Pre-upgrade checklist:

- [ ] Upgdate to the latest `@zengenti/contensis-react-base@^3.x`
- [ ] Test in both `development` and `production` modes
- [ ] Monitor your server and browser console for warnings or errors

## 🚀 What’s New in v4

### React: v17 → v18

- Upgraded React from v17 to v18
- SSR responses streamed by default
  - adds `transfer-encoding: chunked` response header
  - enables full support for `<Suspense />` in React 18
- Replaced React Hot Loader with **React Fast Refresh**
- You may encounter **new hydration errors** in SSR such as `Minified React Error #418` and `#423`.
  - [Text content does not match server-rendered HTML](https://nextjs.org/docs/messages/react-hydration-error)
  - [How to debug hydration errors](https://medium.com/@craigmorten/how-to-debug-react-hydration-errors-5627f67a6548)
- Deprecated support for IE11
- `PropTypes` support removed ([ahead of React 19](<(https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-proptypes-and-defaultprops)>))

📖 [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)

---

#### 🔄 New SSR React Utilities

Import from `@zengenti/contensis-react-base/util`

- **`useIsClient()`** to use when we need to conditionally render in the browser only
- **`<NoSSR />`** component can wrap other components to conditionally render in the browser only
- **`<Helmet />`** component re-export of `react-helmet-async`, in case import paths change again in future

---

### React Router: v5 → v6

- Removed `useHistory` hook, replace with `useNavigate`
- Changed `staticRoute` object structure
- Removed `Redirect` component, replace with `Redirect` from `@zengenti/contensis-react-base/routing`
- Removed `staticContext`, replace with `useHttpContext` hook
- Removed `exact` prop in static routes (v6 handles this automatically)
- Future flags included for smoother upgrade to v7

📖 [React Router v6 Migration Guide](https://reactrouter.com/docs/en/v6/upgrading/v5)

---

#### 🧭 New Router Helpers

Import from `@zengenti/contensis-react-base/routing`

- `<Redirect />` and `<Status />` JSX components
- `useHttpContext()` hook (replaces `staticContext`)

---

### Express: v4 → v5

- Requires **Node.js v18+** (v20 or v22 recommended)
- Route pattern matching syntax has changed

📖 [Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html)

---

### 🔗 Search package tighter-coupling

- Support for setting `searchOptions` in route configurations
- Return `searchOptions` from the `onRouteLoaded` routing hook
- A cleaner boilerplate-free approach
  - no additional imports
  - no feature reducers and sagas
  - no redux injection
  - no saga calls are needed
  - `params` provided by default
- Trigger search by setting `facet` or `listingType` in `searchOptions`
- Support remains for all existing overrides
- Existing implementations continue to work without changes
  - However, we recommend removing old boilerplate to simplify your codebase
- New `i18n` configuration enables navigation with localised facet and filter keys

---

### 🌍 i18n

- Localisation / translation / internationalization native support
- Configure and switch between locales
- Translate static elements
- Resolve and navigate to translated versions of content

📖 [i18n documentation](I18N.md)

---

### 🪖 React Helmet Async

- Added support for migrating to `react-helmet-async`
- `<HelmetProvider>` wrapper collects helmet context per request
- Enables thread-safe SSR preventing potential cross-request metadata leakage
- Existing implementations continue to work without changes

---

## 🚨 Breaking Changes Overview

| Area             | Change                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Node.js          | Requires Node v18+ (v22 recommended)                                                                                      |
| React            | React Hot Loader removed; React Fast Refresh now required                                                                 |
| Router           | `useHistory()` hook replaced with `useNavigate()`                                                                         |
| Router           | `staticRoute` structure changed                                                                                           |
| Router           | `Redirect` component removed, replace with `Redirect` routing helper                                                      |
| Router           | `staticContext` removed, use `useHttpContext()`                                                                           |
| Express          | Route matching syntax changed                                                                                             |
| Express          | Removed deprecated method signatures                                                                                      |
| Compatibility    | IE11 support deprecated                                                                                                   |
| Compatibility    | Legacy bundle support deprecated                                                                                          |
| State Management | Redux with **Immutable.js** deprecated                                                                                    |
| State Management | Default `stateType` now is plain JS (via **Immer**)                                                                       |
| Forms            | Removed `/forms`, use [`@contensis/forms`](https://github.com/contensis/contensis-forms/tree/main/packages/react) instead |

---

## 🔧 Step-by-Step Migration

### 1. Upgrade Node.js

Update your local working copy of Node.js using your preferred method

> We recommend you upgrade to version 22 (or 20 as a minimum)

**Example:** check your current Node.js version

```shell
node -v
# outputs version to console
v22.17.1
```

Update other references to Node.js throughout the app

- any `*.Dockerfile` -- update the tag number in the `FROM` docker image
- `.nvmrc` file -- update the number in here
- any webpack config (loaders) that target a specific `node` version

### 2. Install React Base v4

```sh
npm install @zengenti/contensis-react-base@next
```

> ℹ️ Use `@latest` tag when v4 is officially released
> <br>_The command will change to_ `npm install @zengenti/contensis-react-base@latest`

**Troubleshooting:** If you encounter new `Could not resolve dependency` errors that prevent the install from completing, use:

```sh
npm install @zengenti/contensis-react-base@next --legacy-peer-deps
```

**More help:** [Avoid using "force" or "legacy-peer-deps"](https://javascript.plainenglish.io/how-to-avoid-using-force-and-legacy-peer-deps-when-running-npm-install-ci-612aa3288436)

### 3. Replace React Hot Loader with Fast Refresh

1. Uninstall `@hot-loader/react-dom`:

```sh
npm uninstall @hot-loader/react-dom
```

2. Remove `react-dom` alias in Webpack config `webpack.base.config.js`:

```js
  alias: {
    // ... other import aliases,
    'react-dom': '@hot-loader/react-dom', // ❌ delete this alias
  }
```

3. Remove `'react-hot-loader/babel'` from `babel.config.js`

4. Search your project and remove all `hot(module)` usage:

```tsx
import { hot } from 'react-hot-loader'; // ❌ delete this import

export default hot(module)(AppRoot); // ❌ delete this reference

export default AppRoot; // ✅ replace default export
```

5. Install Fast Refresh:

```sh
npm install --save-dev @pmmmwh/react-refresh-webpack-plugin react-refresh
```

6. Add a new plugin to `webpack.dev.config.js`:

```js
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

plugins: [
  new ReactRefreshPlugin(), // ✅ add required plugin
];
```

### 4. Upgrade React Router

---

1. Remove references to legacy router packages:

```sh
npm uninstall react-router react-router-dom react-router-config
npm uninstall @types/react-router @types/react-router-dom @types/react-router-config
```

---

2. Search your project for `useHistory` and replace with with `useNavigate`:

```tsx
// ❌ old
const history = useHistory();
history.push('/search');

// ✅ new
const navigate = useNavigate();
navigate('/search');
```

**Example:** A typical usage of `useHistory` inside a React component with user input updating the state and a submit action that navigates to a new location

```tsx
import { useHistory } from 'react-router-dom'; // ❌ old
import { useNavigate } from 'react-router-dom'; // ✅ new

...

const [term, setTerm] = useState('');
const history = useHistory(); // ❌ old
const navigate = useNavigate(); // ✅ new

const submitForm = (event) => {
  event.preventDefault();
  if (!term) {
    history.push('/search'); // ❌ old
    navigate('/search'); // ✅ new
  } else {
    history.push('/search?term=' + term); // ❌ old
    navigate('/search?term=' + term); // ✅ new
  }
};
```

The `navigate` function accepts options that provide equivalent functionality to other `history` methods such as `replace()` - [`useNavigate` API documentation](https://reactrouter.com/api/hooks/useNavigate).

---

3. Search your project for `staticRoute` and refactor code to follow the new structure

**Example:** The old `staticRoute` format from [`react-router-config`](https://www.npmjs.com/package/react-router-config#matchroutesroutes-pathname) v5

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

**Changed:** The new `staticRoute` format from [`react-router`](https://api.reactrouter.com/v7/interfaces/react_router.RouteMatch.html) v6

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

> 💡 Instead of handing old boilerplate for search implementations, refactor to use our new boilerplate-free approach with `searchOptions` (in this doc)

---

4. Search your project for `staticContext` and replace with `useHttpContext()`

> ℹ️ Delete any old boilerplate found and replace with the new `<StatusCode />` or `<Redirect />` components in `@zengenti/contensis-react-base/routing`

**Example:** a router component that references `staticContext` prop

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

5. Search your project for `Redirect` component usage and update imports

**Change:** any component that renders a `Redirect` component

```tsx
import { Redirect } from 'react-router-dom'; // ❌ Delete this (React Router v5)
import { Redirect } from '@zengenti/contensis-react-base/routing'; // ✅ New
```

---

6. Remove `exact` prop from static routes

**Example:** `StaticRoutes.ts|js` file

```typescript
const staticRoutes: StaticRoute[] = [
  {
    path: '/search/:facet?',
    exact: false, // ❌ delete this
    component: SearchPage,
  },
];
```

---

7. Search your project for `withRouter` and remove any references, replace any usage of props provided by `withRouter` HOC with hooks.

[Legacy `withRouter` documentation](https://v5.reactrouter.com/web/api/withRouter)

**Example:** remove `withRouter` higher-order-component and refactor usage of the previously provided props

```tsx
import { withRouter } from 'react-router-dom'; // ❌ Delete this (React Router v5)
import { useParams, useLocation, useNavigate } from 'react-router-dom'; // ✅ New (if required)

const Search = ({
  match, // ❌ Delete prop
  location, // ❌ Delete prop
  history, // ❌ Delete prop
  ...otherProps
}) => {
  const { id } = match.params; // ❌ Old

  const { id } = useParams(); // ✅ Replaces match.params prop
  const location = useLocation(); // ✅ Replaces location prop
  const navigate = useNavigate(); // ✅ Replaces history prop
};

export default withRouter(Search); // ❌ Old export
export default Search; // ✅ New export
```

> ℹ️ If your component does not use any of the `match`, `location`, or `history` props you only need to remove the references to `withRouter`

---

Should you encounter any further issues, refer to the official [React Router v6 Migration Guide](https://reactrouter.com/docs/en/v6/upgrading/v5)

### 5. Update Express wildcard paths

> ℹ️ You can skip this if your project does not use any "`ServerFeatures`"

Search your entire project for references to `app.`

Carefully examine any references for wildcard paths, or deprecated syntax

**Example:** Wildcard reference becomes a named parameter `{*splat}`

```ts
// ❌ Old
app.get('/example/*', handler);
app.get('*.aspx', handler);

// ✅ New
app.get('/example/{*splat}', handler);
app.get('{*splat}.aspx', handler);
```

Upgrade any `@types` package in your `package.json` to the latest for v5

```sh
npm install --save-dev @types/express@latest
```

A complete list of the changes introduced in Express v5 can be found in the official [Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html)

### 6. Update `stateType`

Since v3 we can set a `stateType` to be `immutable` (default) or `js`, so we could optionally use **Immer** to manage the immutability of our Redux state with plain `js` objects.

In v4, `immutable` is no longer the default `stateType` and the option has also been marked as deprecated. We will be removing this support for Immutable.js in a future release.

> 💡 We recommend migrating to **Redux Toolkit** or **Immer** for future compatibility

#### Projects using Immutable state

**Change:** `client-entrypoint.ts` **and make the same change in `server.ts`**

```typescript
const config: AppConfig = {
  routes: {
    ContentTypeMappings: contentTypeRoutes,
    StaticRoutes: staticRoutes,
  },
  stateType: 'immutable', // ✅ add to both client & server
  withReducers,
  withSagas,
  withEvents,
};

new ClientApp(ReactApp, config);
```

#### Projects using Immer / plain JS state

**Change:** `client-entrypoint.ts` **and make the same change in `server.ts`**

```typescript
const config: AppConfig = {
  routes: {
    ContentTypeMappings: contentTypeRoutes,
    StaticRoutes: staticRoutes,
  },
  stateType: 'js', // ❌ can now be removed from both client & server
  withReducers,
  withSagas,
  withEvents,
};

new ClientApp(ReactApp, config);
```

### 7. Update to `react-helmet-async`

Over recent years, the ecosystem has moved away from `react-helmet` and instead has been replaced with an almost direct replacement: `react-helmet-async`. This change paves the way for better React 19 support and more importantly resolves a potential thread-safety issue with very high concurrent requests in SSR. `react-helmet` uses a global singleton that is not request-scoped, meaning helmet metadata from one request has the potential to bleed into another's HTML response under load. [Read more](https://www.npmjs.com/package/react-helmet-async)

> ℹ️ Projects currently using `react-helmet` are still supported, making this an optional but strongly recommended upgrade step.

> ⚠️ Support for `react-helmet` will be dropped in the next major release.

1. Remove references to `react-helmet` package:

```sh
npm uninstall react-helmet
```

2. Search your project for `'react-helmet'` or `<Helmet>`

Update imports in any found components from `react-helmet` to `react-helmet-async` (or use the re-export from this library):

```tsx
import { Helmet } from 'react-helmet'; // ❌ old
import { Helmet } from 'react-helmet-async'; // ✅ new
// Or, if you'd prefer to import from our (stable) re-export:
import { Helmet } from '@zengenti/contensis-react-base/util'; // ✅ alternative
```

#### Do NOT add your own `<HelmetProvider>`

We are now wrapping your `<App />` JSX with a `<HelmetProvider>`, like we do with other core providers - such as Router, Redux and Cookies so we can collect the helmet data that was rendered in your JSX tree and add it to the SSR response.

> ⚠️ This means you do not need to (and should not) add this yourself. Any "inner provider" added will shadow the outer one and helmet metadata will not be collected for SSR.

**Exception**: In isolated testing, such as Storybook, contexts (where the provider is absent), you do need to wrap components in `<HelmetProvider>`:

```tsx
import { HelmetProvider } from 'react-helmet-async';

// In tests or Storybook stories:
render(
  <HelmetProvider>
    <YourComponent />
  </HelmetProvider>
);
```

---

### 8. Refactor search implementation

Although these changes strictly aren't required for the upgrade, we recommend removing old boilerplate to simplify your codebase and expand your search or listings using these simpler approaches.

**Example:** `withEvents.ts`

> Your version of this file will contain all elements from this example but your exact implementation could be different. We should delete any code-blocks that resemble those in this example - they are the excess boilerplate.

> ⚠️ Carefully examine deleted code and retain any intentionally customised aspects.

```typescript
onRouteLoaded: function* onRouteLoaded({
  params, // ℹ️ params are now provided automatically
}) {
  // ❌ delete this as we can set this in `searchOptions` in our route configurations
  const listingType =
    staticRoute?.route?.listingType || contentTypeListings[contentTypeId];

  // ❌ delete this entire `if` block
  if (path.startsWith('/search') || listingType) {
    // ℹ️ search assets are now injected automatically
    const { routeParams, setRouteFilters, mappers } =
      (yield injectSearchAssets()) as InjectSearchAssets;

    const params = routeParams(staticRoute, location); // ❌ delete this

    // 🚨 if you are overriding params you will need to retain this logic
    params.override = 'myvalue';

    // ℹ️ no more saga calls, remember to clean up any unused imports and arguments...
    yield call(setRouteFilters, {
      listingType,
      mappers,
      params,
      ssr,
    });
  }

  // ✅ `searchOptions` replaces everything we have deleted
  // 💡 `searchOptions` in route configurations will complement the options set here
  return yield {
    searchOptions: {
      // Optional: provide search config here to dynamically inject the search reducer
      config,
      // supply your mappers here, or in your route configuration
      mappers,
      // Optional: set paths here if you like or update your route configurations to use search when the route is matched
      onPaths: ['/en-gb/search'],
      // Optional: add params if you are doing any overrides above
      params,
    },
  };
}
```

> ℹ️ Supply `config` and `mappers` here to have them automatically applied any time search is invoked

> 💡 Search is not invoked until a `facet` or a `listingType` is present in the matched route's configuration, or we have set one of those values here ourselves

If you have provided a `config` option to a `searchOptions` object, we no longer need to inject or add the search reducer and sagas to the route configuration

**Change:** `staticRoutes.ts` **also update any `contentTypeMappings.ts` or `contentTypeRoutes.ts`**

```typescript
const staticRoutes: StaticRoute[] = [
  {
    path: '/search/:facet?',
    component: SearchPage,
    injectRedux: injectSearch, // ❌ delete this
    searchOptions: {
      facet: 'all', // ✅ `facet` in `searchOptions` will invoke the relevant search config
    },
  },
  {
    path: '/news',
    component: NewsPage,
    injectRedux: injectSearch, // ❌ delete this
    listingType: 'news', // ❌ this worked previously as we were plumbing everything in ourselves
    searchOptions: {
      listingType: 'news', // ✅ `listingType` in `searchOptions` will invoke the relevant search config
    },
  },
  {
    path: '/course/:subject',
    component: CoursePage,
    searchOptions: {}, // ℹ️ `searchOptions` will ensure search config is available when using minilists
  },
];
```

**Change:** `reducers.ts`

> ⚠️ **Important:** Global Minilist users - **Don't blindly delete!**
>
> These deletions assume you've moved and no longer need the search config, reducers and sagas available in every route.
>
> If your project uses **search minilists** in many or all of your routes, these are still the recommended locations to register them. **Review your implementation before proceeding.**

```typescript
import { reducer as SearchReducer } from '@zengenti/contensis-react-base/search'; // ❌ Delete if not required on every route
import { config } from '~/components/search'; // 🚨 Delete if search feature is not needed everywhere
import SiteConfigReducer from '~/core/redux/siteConfig/reducers';

const featureReducers = {
  search: SearchReducer(config), // ❌ Delete if not required on every route
  siteConfig: SiteConfigReducer,
};

export default featureReducers;
```

**Change:** `sagas.ts`

```typescript
import { sagas as searchSagas } from '@zengenti/contensis-react-base/search'; // ❌ Delete if not required on every route
import { SiteConfigSagas } from './siteConfig/sagas';

const featureSagas = [
  ...searchSagas, // ❌ Delete if not required on every route
  ...SiteConfigSagas,
];

export default featureSagas;
```

## 🧠 Known Issues & Debug Tips

### 1. Storybook + React 18

Some Storybook packages may request React 17 as a peer dependency, leading to version mismatches.

It is recommended to upgrade Storybook packages to support React 18.

🛠️ **Workaround**: Add `overrides` section in `package.json`

```json

"overrides": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

---

### 2. Missing Dependencies

When starting your project for the first time, if you encounter errors:

```
Module not found: Can't resolve '<package-name>'
```

> ℹ️ Key dependencies like `react-redux`, or `styled-components` may not be installed to the project root, instead nested into another package's `node_modules`. Each project is slightly different in their implementation so the actual package name(s) will be revealed when you start the project.

> ℹ️ **Tip:** Searching your project for this string: `node_modules/<package-name>"` should show result(s) in `package-lock.json` and reveal where the "missing" dependency is installed

Try:

```sh
npm install <package-name>
# install will add the dependency to your `package.json`
# and should "hoist" the package to the root `./node_modules`
npm uninstall <package-name>
# uninstall will remove the dependency that was added to your `package.json`
# but the package should remain installed in the root `./node_modules`
```

Confirm the dependency remains installed within the root `./node_modules`

If after this the dependency is still **not** available in the root `./node_modules`, apply the above workaround, adding the problem package to the `overrides` section in `package.json`.

---

### 3. SSR Hydration Errors (`Minified React Error #418`, `#423` or `#425`)

🛠️ Debug hydration errors introduced in React 18:

- Build the project with React running in `development` mode to output detailed errors

```js
const CLIENT_PROD_CONFIG = {
  // mode: 'production',
  mode: 'development', // ⚠️ change to development (temporarily)
  // ... other existing config
};
```

- Some hydration error examples:
  - Error: Hydration failed because the initial UI does not match what was rendered on the server.
  - Error: There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.
  - Warning: Expected server HTML to contain a matching `<h1>` in `<div>`
  - Warning: `<some-content>` did not match. Server: "carousel-1e16efd402a4f" Client: "carousel-a4cb44040522e8"
  - Warning: An error occurred during hydration. The server HTML was replaced with client content in `<div>`

- Simplify the component by commenting out sections and reintroduce code gradually to pinpoint issues that are difficult to trace
  - If all else fails comment out the entire component
  - Simply `return <p>Hello world</p>;` instead

- Avoid dynamic or lazy-loaded components where hydration fails
  - Change `component` in your `StaticRoute` or `ContentTypeMapping`
  - Do **not** use a `loadable()` import
  - Import the actual component into the route configuration directly

- Ensure `@loadable/babel-plugin` is applied in **both client and server** builds.

```js
const CLIENT_PROD_CONFIG = {
  // ... other existing config
  module: {
    rules: [
      // ✅ Webpack loader rule enables @loadable/components
      // and @loadable/server to work together correctly
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
};
```

---

### 4. Resolve hydration errors with Client rendering

> ⚠️ Avoid conditional code in components like `if (typeof window !== 'undefined') return null;`

> ℹ️ `useIsClient` hook provides a hydration-safe approach to defer component renders

> ℹ️ Wrap components with `<NoSSR />` to achieve the same defer behaviour

> 💡 `loadable()` lazy loaded components accept an option to avoid SSR, as well as options available in the route component mappings

There are many articles online that explain hydration errors and offer suggestions as to what we might be doing wrong to cause a mismatch between the server rendered HTML and the client rendered HTML

In some cases the solution (and the problem) could be deferring the render of the component to the client only

With previous React releases, we might have written conditional code like `if (typeof window !== 'undefined')`.

With new hydration checks in React 18, if we are intentionally rendering different content on the server and the browser, or deferring rendering to client-side only we must tread carefully in order to avoid the dreaded Minifed React Errors...

A hydration-safe approach to defer component rendering would be to use a hook that relies on `useEffect` being an api that is called only when the component has mounted in the browser

**Example:** `useIsClient` hook that can be used to prevent rendering in SSR

```tsx
export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
};
```

> `useIsClient` hook and `NoSSR` component are available in `@zengenti/contensis-react-base/util`

**Example:** Import and use the `useIsClient` hook

```tsx
import { useIsClient } from '@zengenti/contensis-react-base/util';

export default Page = () => {
  const isClient = useIsClient();
  if (!isClient) return null; // Skip SSR rendering
  return (
    <div>
      <h1>My Page</h1>
      <div>This page only renders on the client</div>
    </div>
  );
};
```

**Example:** Wrap JSX with the `NoSSR` component

```tsx
import { NoSSR } from '@zengenti/contensis-react-base/util';

export default Page = () => {
  return (
    <div>
      <h1>My Page</h1>
      <NoSSR>
        <div>This part only renders on the client</div>
      </NoSSR>
    </div>
  );
};
```

**Example:** Avoid SSR in `loadable()` component imports

```tsx
export const Content = loadable<any>(
  () =>
    import(
      /* webpackChunkName: "content.template" */ '~/templates/content/content.template'
    ),
  { ssr: false } // ✅ add this option
);
```

---

### 5. Try out React 19

Add `overrides` to your `package.json` to force your project to install React v19

```json
  "overrides": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
```

> ⚠️ Ensure **only one** version of both `react` and `react-dom` packages are installed in the project
> <br> **Tip:** _Searching your project for this string:_ `node_modules/react"` _should find one result in `package-lock.json`_

> ℹ️ Verify the `rendered by` react-dom version in React Developer Tools → Components view

📖 [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)

---
