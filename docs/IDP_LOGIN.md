# IDP login (`USE_IDP`)

Sign members in through the Contensis IDP and keep them signed in from the cookies it writes. The app never handles a password and never asks for a token grant.

The first half is the framework-neutral contract; the second half covers react-base.

## The contract

Three endpoints on the site's own host, and some cookies the browser already holds.

| What | How | Answers |
|---|---|---|
| `POST /idp/refresh` | `fetch`, same-origin, header `X-Contensis-Refresh: 1` | `200` session, `401` no session, `403` header missing |
| `GET /idp/check?returnPath=…` | full-page navigation | signs the member in (including any multi-factor step), then redirects to `returnPath` |
| `GET /idp/logout?returnPath=…` | full-page navigation | clears the IDP's cookies, ends the sign-in session, redirects to `returnPath` |

Never call `/idp/check` or `/idp/logout` with `fetch` - they are redirect chains and only work as navigations.

### Cookies read

| Cookie | Holds | Readable by script |
|---|---|---|
| `ContensisSecurityBearerToken` | the access token: send it as `Authorization: Bearer …` to Contensis APIs | yes |
| `ContensisClassicToken` | the legacy CMS security token, for anything that still expects one | yes |

The IDP writes and deletes these. **Your app must never write or delete them** - not on login, not on logout, not on error. Cookie presence alone never proves a session: an access token can be expired or revoked while its cookie is still there.

### Refresh, and its three outcomes

Call `POST /idp/refresh` when the access token cookie is missing (a browser restart, or the cookie expired after idle), and once more when an API answers `401`.

| Response | Outcome | What the app does |
|---|---|---|
| `200`, and the access token cookie is now readable | **session** | read the new cookie and carry on |
| `401` | **no session** | the IDP has already cleared its cookies. Show anonymous, or send the member to `/idp/check` if the page needs one |
| timeout (5 s), network error, `5xx` | **unknown** | change nothing. A public page renders anonymous for this load; a protected page retries once after a second, then shows a generic "try again" error. The next navigation tries again |
| `200` but the access token cookie is still unreadable | **unknown** | log it once (the cookie's Domain/Path/Secure/SameSite don't fit this host) and don't refresh again this page load |
| `403` | **unknown** | it means your code forgot the header. Log it as a defect; never log anyone out over it |

**Only `401` ends a session.** When you don't know, you must not log the member out.

Share one in-flight refresh between everything that needs it at that moment.

### `returnPath` rules

- It is a **local path**: resolve the candidate against the page's origin and use `/` unless the origin matches. That rules out `//host`, `/\host`, `javascript:` and absolute URLs to other hosts. The IDP also refuses anything that isn't a local path and quietly uses `/` instead, so sending one only loses the member's place.
- Keep the path, query and hash, but strip `securityToken`, `credentials` and `password` (any letter case). Do this last, after any substitution.
- URL-encode it: `/documents?page=2` travels as `returnPath=%2Fdocuments%3Fpage%3D2`.
- For `/idp/check` use the current path. If the current page *is* the site's login page, use that page's own target (`redirect_uri`, then `ReturnURL`) or `/`.
- For `/idp/logout` use the path the caller asked for, else the current path, else `/` when the current page needs a member.

### Redirect at most once per path

Send a member to `/idp/check` automatically at most once per `returnPath`. Keep the mark in `sessionStorage` (it has to survive the sign-in round trip), keyed by path, expiring after 5 minutes. If they come straight back and still have no session, show an error instead of redirecting again. Clear the mark when a session is established for that path, and on logout. An explicit "Log in" click is never blocked by it. Where `sessionStorage` is unavailable the mark can't be kept, so the redirect is allowed.

## Using it in a react-base site

### Turn it on

`useIdp: true` in the server's `ServerConfig` (`src/server/server.ts`). It sets the server global and is written into every SSR response (`window.USE_IDP = true;`), so the client hydrates with the same answer.

Two alternatives, for sites that prefer them:

| Where | How |
|---|---|
| Pure CSR development (no SSR response to carry the value) | `USE_IDP: true` in the site's `DefinePlugin` variables. A build-time definition wins over the runtime globals. |
| Per environment | `USE_IDP=true` in the `.env` the startup scripts are built from. It reaches the server (`start.js`) and the browser (`startup.js`). |

Off by default; with it off nothing changes. `USE_IDP` takes precedence over `WSFED_LOGIN`, which needs nothing when off: not defined means off. The server startup logs the active method:

```
Active login method: IDP (/idp/* session auth)
```

The dev server proxies `/idp/*` to the tenant's preview host, and identity-client builds the sign-in callback from the forwarded host — a full sign-in works from `localhost`.

### What stays the same

`useLogin`, `withLogin`, the user selectors, `requireLogin` on routes and content type mappings (`true` or a group list), `refreshSecurityToken()` and `useChangePassword` keep working without code changes. Group-restricted routes still send a member who lacks the group to `/account/access-denied?original_uri=…`.

### What changes

- **`loginUser()`** navigates to `/idp/check`. Credentials passed to it are ignored, with a console warning. Replace a username/password form with a "Sign in" button.
- **`logoutUser(redirectPath?)`** navigates to `/idp/logout`.
- **Server rendering is session-blind.** Every page is rendered anonymous and the browser settles the session after hydration, before each route's content is fetched. While it does, `useLogin().isLoading` is `true`. **A component-level guard must render nothing while `isLoading` is true**, or it will act on "not signed in" before the answer arrives. Prefer `requireLogin` on the route: a protected route shows your `loadingComponent` until the check settles.
- **Failures render through your `notFoundComponent`**, with `statusCode` `401` (the member was already sent to sign in for this page and it didn't work) or `503` (the sign-in service couldn't be reached). It must branch on `statusCode` instead of always saying "page not found". `useLogin().isError` is set as well.
- **`selectClientCredentials`** holds `{ contensisClassicToken }` and nothing else: no access token, refresh token or expiry. `selectUserSecurityToken` returns the classic token from the `ContensisClassicToken` cookie.
- **Management API calls** made by react-base (current user, groups, change password) send the access token cookie as `Authorization: Bearer`, read at the time of the call. A `401` refreshes once and retries once. The classic token is **not** a Bearer credential: `Authorization: Bearer <ContensisClassicToken>` answers `401`. Use it only where a classic security token is expected.
- **Delivery API `401`** for route content refreshes once and reloads the route once. A second `401` sends the member to `/idp/check`, or to the error state if that already happened.
- **Access-token release** (`accessTokens` with `requireLogin`) resolves the member from the access token only: the `Authorization` header, then the `ContensisSecurityBearerToken` cookie. The legacy `RefreshToken` cookie is never used, so a leftover classic session can't stand in for the member.
- react-base's legacy cookies (`RefreshToken`, the `securityToken` query string) are ignored, not cleared. They expire on their own.
- Don't call `LoginHelper`'s classic methods (`LogoutUser`, `ClearCachedCredentials`, `SetLoginCookies`) directly. Two of the cookies they write or delete have the same names as the IDP's, so calling them can end the member's real session.
- There is nothing MFA-specific in the app. Multi-factor sign-in happens entirely behind `/idp/check`.

### Adopting it in an existing site

A site that signs members in with its own form usually needs three changes on top of the setting:

1. Replace the username/password form with a "Sign in" button that calls `loginUser()`.
2. Make any component-level guard render nothing while `useLogin().isLoading` is true.
3. Make the not-found page branch on `statusCode` (401 / 5xx / 404).

The [react-starter](https://gitlab.zengenti.com/starter-projects/react-starter) project has a working example: a login control, a `requireLogin: true` route, a group-restricted route, an access-denied page and a `statusCode`-aware not-found page.
