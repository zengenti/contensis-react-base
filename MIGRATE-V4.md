# 📦 Migration Guide: v3 → v4

Welcome to the official upgrade guide for **Contensis React Base v4**.

This document covers the **breaking changes**, **major upgrades**, and **migration steps** needed to move from version 3 to version 4.

> ⚠️ This guide is for maintainers of React projects using `@zengenti/contensis-react-base` v3.

## 📝 In This Guide

- [⚙️ Before You Start](#️-before-you-start)
- [🚀 What’s New in v4](#-whats-new-in-v4)
  - [🔄 New SSR React Utilities](#-new-ssr-react-utilities)
  - [🧭 New Router Helpers](#-new-router-helpers)
- [🚨 Breaking Changes Overview](#-breaking-changes-overview)
- [🔧 Step-by-Step Migration](#-step-by-step-migration)
- [🧠 Known Issues & Debug Tips](#-known-issues--debug-tips)

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

---

### React Router: v5 → v6

- Replace `useHistory` hook with `useNavigate`
- Changed `staticRoute` object structure
- Replace `staticContext` – use new `useHttpContext()` hook instead
- Remove `exact` prop in static routes (v6 handles this automatically)
- Future flags included for smoother upgrade to v7

📖 [React Router v6 Migration Guide](https://reactrouter.com/docs/en/v6/upgrading/v5)

---

#### 🧭 New Router Helpers

Import from `@zengenti/contensis-react-base/routing`

- `<Redirect />` and `<Status />` JSX components
- `useHttpContext()` hook (replaces `staticContext`)
- `routeParams` helper for parsing route/query parameters

---

### Express: v4 → v5

- Requires **Node.js v18+** (v20 or v22 recommended)
- Route pattern matching syntax has changed

📖 [Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html)

## 🚨 Breaking Changes Overview

| Area             | Change                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Node.js          | Requires Node v18+ (v22 recommended)                                                                                      |
| React            | React Hot Loader removed; React Fast Refresh now required                                                                 |
| Router           | `useHistory()` hook replaced with `useNavigate()`                                                                         |
| Router           | `staticRoute` structure changed                                                                                           |
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
    'react-dom': '@hot-loader/react-dom', // ❌ delete this line
  }
```

3. Remove `'react-hot-loader/babel'` from `babel.config.js`

4. Search your project and remove all `hot(module)` usage:

```tsx
import { hot } from 'react-hot-loader'; // ❌ delete this import

export default hot(module)(AppRoot); // ❌ delete this

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
// ❌ Old
const history = useHistory();
history.push('/search');

// ✅ New
const navigate = useNavigate();
navigate('/search');
```

**Example:** A typical usage of `useHistory` inside a React component with user input updating the state and a submit action that navigates to a new location

```tsx
import { useHistory } from 'react-router-dom'; // ❌ Old
import { useNavigate } from 'react-router-dom'; // ✅ New

...

const [term, setTerm] = useState('');
const history = useHistory(); // ❌ Old
const navigate = useNavigate(); // ✅ New

const submitForm = (event) => {
  event.preventDefault();
  if (!term) {
    history.push('/search'); // ❌ Old
    navigate('/search'); // ✅ New
  } else {
    history.push('/search?term=' + term); // ❌ Old
    navigate('/search?term=' + term); // ✅ New
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

> ℹ️ Instead of refactoring old boilerplate code, try out our `routeParams` helper from `@zengenti/contensis-react-base/routing`

---

4. Search your project for `staticContext` and replace with `useHttpContext()`

> ℹ️ It is recommended to delete old boilerplate code and replace with the new `<StatusCode />` or `<Redirect />` components in `@zengenti/contensis-react-base/routing` instead of refactoring

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

5. Remove `exact` prop from static routes

```tsx
const staticRoutes: StaticRoute[] = [
  {
    path: '/search/:facet?',
    exact: false, // ❌ delete this
    component: SearchPage,
  },
];
```

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

Since v3 we can set a `stateType` to be `immutable` (default) or `js`, so we could optionally use **Immer** to manage the immutability of our Redux state.

In v4, `immutable` is no longer the default `stateType` and the option has also been marked as deprecated. We will be removing this support for Immutable.js in a future release.

> We recommend migrating to **Redux Toolkit** or **Immer** for future compatibility

#### Using Immutable

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

#### Using Immer / plain JS

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

> ℹ️ Key dependencies like `react-redux`, or `styled-components` may not be installed in the project root. Each project is slightly different in their implementation so the actual package name(s) will be revealed when you start the project.

Try:

```sh
npm install <package-name>
npm uninstall <package-name>
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

- Simplify the component by commenting out sections and reintroduce code gradually to pinpoint issues that are difficult to trace
  - If all else fails comment out the entire component
  - Simply `return <p>Hello world</p>;` instead

- Avoid dynamic or lazy-loaded components where hydration fails
  - Change `component` in your `StaticRoute` or `ContentTypeMapping` to **not** use a `loadable()` import
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

> ℹ️ `useIsClient` hook provides a React 18+ hydration-safe approach to defer component rendering or wrap components with `<NoSSR />`

> ℹ️ `loadable()` lazy loaded components accept an option to avoid SSR

If you have run your build after changing the webpack `mode` to `development` (see above) these errors will be presented differently:

- Error: Hydration failed because the initial UI does not match what was rendered on the server.
- Error: There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.
- Warning: Expected server HTML to contain a matching `<h1>` in `<div>`
- Warning: `<some-content>` did not match. Server: "carousel-1e16efd402a4f" Client: "carousel-a4cb44040522e8"
- Warning: An error occurred during hydration. The server HTML was replaced with client content in `<div>`

There are many articles online that explain this error and offer suggestions as to what we might be doing wrong to cause a hydration mismatch. In some cases the solution (and the problem) could be deferring the render of the component to the client only.

With previous React releases, we might have written conditional code like `if (typeof window !== 'undefined')` however in React 18, if we are intentionally rendering different content on the server and the browser, or deferring rendering to client-side only we must tread carefully in order to avoid the dreaded Minifed React Errors...

A React 18+ hydration-safe approach to defer component rendering would be to use a hook that relies on `useEffect` being an api that is called only when the component has mounted in the browser.

**Example:** `useIsClient` hook to prevent rendering in SSR

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
