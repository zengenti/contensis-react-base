---
title: "fix: Complete MFA-required published-site login via the BFF /idp/* session (KEYC-199)"
date: 2026-10-08
artifact_contract: ce-unified-plan/v1
execution: code
product_contract_source: ce-plan-bootstrap
ticket: KEYC-199 (Keycloak side); CHALKY-2080 (react-base implementation, linked as Relates)
owner: Neil Flatley (react-base, CHALKY-2080) — implements and approves
proposed_by: a.pop@zengenti.com (Keycloak migration)
target_line: master (v4)
origin: "contensis-app repo — docs/reports/2026-07-21-mfa-published-site-login-never-completes-three-repo-diagnostic.md"
---

# fix: Complete MFA-required published-site login via the BFF `/idp/*` session (KEYC-199)

**Target repo:** `contensis-react-base`, line `master` (v4). Branch `feat/keyc-199-bff-session-login` is at `origin/master` (`29ab2e28`, 4.0.1-beta.22) with no commits of its own. Paths are repo-relative to `contensis-react-base` unless another repo is named.

**Status:** proposal from the Keycloak migration for the react-base owner to approve. Four design questions are left to the owner (see Open Questions for the react-base Owner). Written against `zengenti-svc-identity-client` `origin/main` `206359e` and react-base `master` `29ab2e28` (2026-10-08).

**Overview:** [`docs/features/keycloak-login/README.md`](../features/keycloak-login/README.md) — the summary for discussion; this plan holds the detail.

---

## Summary

On a Keycloak tenant with member MFA enabled, a published-site member completes the browser login (including OTP) but the React site never shows them as authenticated, with no visible error. Root cause (confirmed live, see origin): react-base logs in and refreshes only through the two classic grants (`contensis_classic`, `contensis_classic_refresh_token`), and Keycloak rejects both for MFA-required users (KEYC-183).

The fix makes react-base use the BFF `/idp/*` session served by `zengenti-svc-identity-client` on the site's own host:

- build every management client from the JS-readable `ContensisSecurityBearerToken` cookie at the moment it is needed, with a far-future `bearerTokenExpiryDate`, and store no bearer or expiry;
- skip the `IsAuthenticated` round-trip;
- refresh with `POST /idp/refresh`, never a classic grant;
- send login and terminal failures to `GET /idp/check`, and logout to `GET /idp/logout`.

The design follows the `/idp/*` contract in the next section. When no BFF session is detected the classic path behaves as today.

Priority: KEYC-199 must be fixed before the first customer with MFA member login; it does not gate `standard` (`zengenti-svc-identity` branch `feature/keyc-302-keycloak-production-release`, `docs/keycloak-production-release.md:56`). The live site (`nlgpsf-website`) is on react-base v3 and needs a v3→v4 upgrade to consume the fix — out of scope here.

---

## The `/idp/*` Contract

Naming: `zengenti-svc-identity-client` is deployed as `identity-client` and serves `/idp/*`. Keycloak itself (realm config, user storage SPI, classic grants) is built from `zengenti-svc-identity` and deployed as `identity-keycloak`.

Verified in `zengenti-svc-identity-client` `origin/main` `206359e` (2026-10-08). `Svc` = `src/Contensis.Identity.Oidc/ContensisOidcService.cs`; `Web` = `src/Contensis.Identity.Oidc.Web/`.

**Host.** `/idp/*` is served on the published site's own host. Realm redirect URIs are `https://preview-…/idp/callback`, `https://live-…/idp/callback` and customer domains (`contensis-svc-security` realm template `:826-836`; runbook `:133-135`); HAProxy `keycloak_migrated_aliases` enables the route (runbook `:274`). There is no CORS policy (identity-client `docs/open-issues.md` OI-9), so calls must be site-relative.

**Cookies.** All are written by `AppendCookie` (`Svc:735-754`): `Path=/`, `SameSite=Lax`, `Secure` when the request is HTTPS (forwarded-proto honoured, `Web/Program.cs:148-167`), no `Domain` (host-only).

| Cookie | httpOnly | Lifetime | Value | Source |
|---|---|---|---|---|
| `ContensisSecurityBearerToken` | no | `ExpiresIn` (realm access-token lifespan, 1800 s by default) | Keycloak access token | `Svc:679-684`, refresh `:633-638` |
| `ContensisSecurityRefreshToken` | **yes** | `RefreshExpiresIn` (follows the realm SSO session: 15 days idle / 15 days max) | Keycloak refresh token | `Svc:688-693`, refresh `:642-647` |
| `ContensisClassicToken` | no | session (no Max-Age) | classic security token | `Svc:699` |
| `ContensisCMSUserName` | no | session | classic security token (same value) | `Svc:700-704` |
| `ContensisLastUserName`, `ContensisDisplayName` | no | session | display data | `Svc:706-732` |

Consequences for react-base:

- The bearer and the refresh cookie persist across a browser restart; `ContensisClassicToken` and `ContensisCMSUserName` do not. After a restart within the bearer lifetime the browser holds a bearer and the (unreadable) refresh cookie, with no `ContensisClassicToken`.
- `ContensisSecurityRefreshToken` is visible to the server on every request (SSR) but not to page JavaScript.
- There is no cookie carrying the bearer's expiry.

**`POST /idp/refresh`** (`Web/Program.cs:293-304`, logic `Svc:284-362`)

- Header `X-Contensis-Refresh` required, else `403` with `{error:"missing_header"}`.
- `200`, empty body: bearer and refresh cookies re-minted (`Svc:337`). `ContensisClassicToken`/`ContensisCMSUserName` are re-minted only when Keycloak returns an id_token (`Svc:649-661`).
- `401` with **nothing cleared** when there is no refresh cookie (`Svc:288-291`).
- `401` with **all auth cookies cleared** (`ClearAuthenticationCookies`, `Svc:784-797`) when Keycloak rejects the refresh, returns no access token, or validation throws (`Svc:311-321`, `:323-328`, `:352-361`).
- The refresh token is reusable: realm `revokeRefreshToken` is unset (default `false`); the `revoke.refresh.token` client attribute in the realm JSON is not recognised by Keycloak 26.0.5 (`zengenti-svc-identity` `docs/contensis-classic-payload-is3-vs-keycloak.md:85,141`). KEYC-180 (To Do) may introduce rotation.

**`GET /idp/check?returnPath=`** (`Web/IdpEndpoints.cs:18-87`)

- `returnPath` required, else redirect to `/idp/error?code=missing_return_path` (`:25-27`).
- Authenticated with the full cookie set (bearer, `ContensisCMSUserName`, `ContensisClassicToken`, refresh; `:10-16`) → local redirect to `returnPath`.
- Authenticated but a cookie missing → server-side refresh to restore the set, else `/idp/login` (added as a loop safety net; `zengenti-svc-identity` `docs/brainstorms/2026-06-11-idp-check-cookie-heal-requirements.md`).
- Not authenticated → `/idp/login?returnPath=…`, the Keycloak login (including MFA).
- "Authenticated" means the `.Contensis.Auth` session cookie (alias-scoped name) is valid. It is a session cookie (`IsPersistent = false`, `Svc:1283`), expires with the id_token (`Svc:1284`) and does not slide (`Web/Program.cs:99`). After a browser restart `/idp/check` therefore goes to `/idp/login`. That login is silent only if the member ticked "Remember me" at login (realm `rememberMe: true`). Without it, Keycloak's login cookie is a session cookie (Deferred item 10). `POST /idp/refresh` needs only the persistent refresh cookie, and when it receives an id_token it also renews `.Contensis.Auth` (`Svc:340-343`).

**`GET /idp/logout?returnPath=`** (`Web/IdpEndpoints.cs:119-163`, `Svc:400-467`): signs out, clears every auth cookie including the httpOnly refresh cookie (`Svc:414-415`), ends the Keycloak session, redirects via the Keycloak end-session endpoint. Clearing cookies in the browser alone leaves the refresh cookie and the Keycloak session, and the next `/idp/check` logs the user back in.

**Classic grants for MFA users** remain rejected (`zengenti-svc-identity` `ContensisClassicGrantType.java:202-216`, `ContensisClassicRefreshTokenGrantType.java:89-104`). The KEYC-200 bypass `CONTENSIS_ALLOW_MFA_CLASSIC_GRANTS` is off by default; if it is on in a test realm it hides this bug.

---

## Problem Frame

Two failure points make an MFA login impossible today (origin diagnostic):

- **FP1 — `IsAuthenticated` password replay.** `validateUserSaga` → `LoginHelper.GetCredentialsForSecurityToken` → `POST REST/Contensis/Security/IsAuthenticated`, which re-authenticates server-side via the `contensis_classic` grant. Rejected for MFA users, so `isAuthenticated` never flips. `SecurityService.IsAuthenticated` is unchanged on `contensis-app` main (`api/Contensis.Services/Security/SecurityService.vb:214-262`).
- **FP2 — the classic refresh grant.** `LoginHelper.LoginUser` builds the client with `contensis_classic_refresh_token` (or `contensis_classic`), and `getCurrent()` → `ensureBearerToken()` fires it. Also rejected.

The only MFA-passed credential the user holds is the BFF bearer/refresh pair.

**Current react-base facts** (`master` `29ab2e28`):

- `src/user/util/ContensisManagementApi.ts` — `getManagementApiClient` picks `contensis_classic_refresh_token` when a `refreshToken` is passed, else `contensis_classic`; `bearerToken`/`bearerTokenExpiryDate` are assigned after construction.
- `src/user/util/LoginHelper.class.ts`
  - `SetLoginCookies` (`:217-229`) writes `ContensisSecurityBearerToken`, `ContensisCMSUserName` (the classic token) and `RefreshToken`. `CookieHelper.SetCookie` defaults to a 1-day expiry (`CookieHelper.class.ts:4,54-66`), so classic cookies persist across a restart. react-base never writes `ContensisClassicToken` or `ContensisSecurityRefreshToken`.
  - `GetCachedCredentials` (`:232-241`) hardcodes `bearerToken: null`, `bearerTokenExpiryDate: null`, and reads `RefreshToken` and `ContensisCMSUserName`.
  - `ClearCachedCredentials` (`:243-258`) deletes `ContensisCMSUserName`, `RefreshToken`, `ContensisSecurityBearerToken`; not `ContensisClassicToken`.
  - `LoginUser` (`:260-353`) clears credentials on any `getCurrent` error; `GetUserDetails` (`:43-63`) returns the SDK error object unwrapped, so `errorMessage` at `:331` is `undefined` for an HTTP error. `LogoutUser` (`:355`) calls `ClearCachedCredentials`.
- `src/user/redux/sagas/login.ts`
  - `validateUserSaga` (`:96-161`) proceeds only when `securityToken || cachedSecurityToken || refreshToken` is present (`:101-105`); the bearer is not in the guard.
  - `refreshSecurityToken` (`:219-232`) takes no arguments, reads `selectClientCredentials`, and calls `client.authenticate()`. It has **no internal caller**; it is re-exported from `src/user/index.ts:23`.
  - An unauthenticated protected route ends in `ClientRedirectToSignInPage` (`:82-83`) → `/account/login`, the classic form.
- `src/user/redux/sagas/resetPassword.js:143-144` — `changePasswordSaga` builds a management client from redux credentials (`selectClientCredentials`, `selectors.ts:27-35`).
- `src/user/transformations/mapClientCredentials.ts` — unconditionally calls `.toISOString()` on both expiry dates, so redux holds ISO **strings**.
- `src/routing/redux/sagas.js`:
  - The protected-node `401`/`403` path is at `:363-391`; an unresolved 401 calls `do500` (`:386`, `:389`).
  - `ensureAccessTokenSaga` (`:100-142`, called at `:173`, skipped on the server at `:105`) runs `handleRequiresLoginSaga({ requireLogin: true })` on every client route while `config.accessToken` is unset, then POSTs the site-relative `releaseUri` (`:85-94`); failure goes to access-denied (`:128-132`).
- `src/server/features/access-token-api/authenticateRequest.ts` — `getRequestCredentials` (`:19-28`) takes the bearer from the `Authorization` header, then `ContensisCMSUserName`, then `ContensisSecurityBearerToken`, and the refresh token from `RefreshToken`. On a BFF session `ContensisCMSUserName` holds the classic token, not the JWT. `:52-58` calls `@current` with a raw bearer; `:128` falls back to a classic refresh grant. Applies only to sites that configure `accessTokens` with `requireLogin`.
- Stored credentials are public: `src/user/index.ts:27` exports every selector, including `selectClientCredentials` and `selectUserSecurityToken` (`clientCredentials.contensisClassicToken`, `selectors.ts:55-62`). `nlgpsf-website` reads `selectUserSecurityToken` (`src/app/redux/documents/sagas.ts:59`) and sends it as a `ContensisCMSUserName` header to its `/secure-documents` route (`:14-20`) to list the member's Level-1 documents.
- `getManagementApiClient` creates a new client on every call (`ContensisManagementApi.ts:48`); nothing caches a client.
- SSR can redirect: `src/server/webApp.tsx:439-447` calls `response.redirect(context.statusCode || 302, context.url)` when the render context sets a URL.
- **Pre-existing defect (master):** the SDK does not coerce a string expiry (see Deferred item 1). Every client built from redux credentials (`login.ts:220-222`, `resetPassword.js:143-144`) therefore sees an expired bearer and calls `authenticate()` with a classic grant. Once this plan lands it affects classic sites only, because the Keycloak path stores no expiry (KTD5); see Q3.
- **No test harness:** no jest/vitest, no `test` script, no `*.test.*` files. `node_modules` is not installed in this checkout; the lockfile resolves `contensis-management-api` 2.4.0 and `contensis-core-api` 1.2.1.

---

## Requirements

- **R1** — With a BFF session present, an MFA-required member completes login on the published React site.
- **R2** — No classic grant and no `IsAuthenticated` round-trip is attempted for a BFF session, at login, at refresh, or at change-password.
- **R3** — A BFF session with an absent or rejected bearer recovers via `POST /idp/refresh`; the next client built reads the newly minted bearer cookie.
- **R4** — A recoverable 401 must not clear BFF cookies. A terminal failure sends the browser to `/idp/check?returnPath=…`.
- **R5** — With no BFF session detected, the classic login/refresh path behaves as today.
- **R6** — SSR must not turn a client-recoverable BFF session into a 500 on protected content.
- **R7** — Logout on a BFF session navigates to `GET /idp/logout?returnPath=…` so the server clears the httpOnly refresh cookie and ends the Keycloak session.
- **R8** — An unauthenticated member on a Keycloak tenant who opens a protected route is sent to `/idp/check?returnPath=…`, not `/account/login`. (Depends on Q1.)
- **R9** — `returnPath` values sent to `/idp/check` and `/idp/logout` do not carry `Credentials`, `SecurityToken` or `Password` query parameters.
- **R10** — With the setting on, redux holds no bearer and no expiry. `selectUserSecurityToken` keeps returning the classic security token, read from the `ContensisClassicToken` cookie, so sites that use it (e.g. `nlgpsf-website`'s documents page) keep working.

---

## Open Questions for the react-base Owner

Each has a recommendation from the Keycloak side. The owner decides; the units below are written against the recommendation and note where an answer changes them.

### Q1. How react-base knows a site is on Keycloak

Detecting a BFF session from the `ContensisClassicToken` cookie alone fails in two states:

- **Browser restarted.** The httpOnly refresh cookie survives (up to 15 days idle), and so does the bearer if it is under 30 minutes old; `ContensisClassicToken` and `ContensisCMSUserName` are session cookies and are gone. The marker check says "not BFF", the classic path finds no `ContensisCMSUserName`, and the member appears logged out although `/idp/refresh` would restore the session.
- **No session yet.** A logged-out member on a protected route is sent to `/account/login` (`login.ts:82-83`), the classic form. Nothing in react-base sends them to `/idp/login`, so an MFA member cannot start a login from the site.

Signals available:

| Signal | Where readable | Distinguishes BFF from classic? |
|---|---|---|
| A site config setting (e.g. a `ServerConfig` option, passed to the client through `SSRContext` `config` as the access-token work already does) | server and client | yes, by declaration; covers the no-session state |
| `ContensisClassicToken` | server and client | yes when present; absent after a restart |
| `ContensisSecurityRefreshToken` | server only (httpOnly) | yes; react-base classic writes `RefreshToken`, never this name; survives a restart |
| `ContensisSecurityBearerToken` alone | server and client | no; classic writes it too, with a 1-day expiry |

Options: (a) marker cookie only; (b) config setting only; (c) config setting decides classic vs. Keycloak login, cookies decide refresh vs. `/idp/check`.

**Recommendation: (c).** The config setting is the only signal that covers the no-session state (R8). With the setting on, the server can see `ContensisSecurityRefreshToken` and pass "session present" to the client; the client uses the bearer and `ContensisClassicToken` to choose between building a client, `/idp/refresh`, or `/idp/check`. A site is either on Keycloak or not, so react-base does not need to infer the login type from cookies on each request. To confirm before choosing: where `nlgpsf-temp-dev` sends logged-out users today.

### Q2. Whether the access-token paths are in scope

`ensureAccessTokenSaga` (`sagas.js:100-142`) and `authenticateRequest.ts` are the access-token feature's login paths. On a BFF session:

- `ensureAccessTokenSaga` is a second caller of `handleRequiresLoginSaga`, so the terminal `/idp/check` redirect can race its `ClientRedirectToSignInPage` (`:113-117`) as well as the protected-node one (`:369-372`).
- `getRequestCredentials` (`authenticateRequest.ts:19-28`) picks `ContensisCMSUserName` (the classic token) as the bearer before `ContensisSecurityBearerToken`, and its fallback (`:128`) is a classic refresh grant.

**Recommendation: in scope, as U6.** Without it, a site that protects its access token with `requireLogin` still fails for MFA members.

### Q3. Whether to fix the string-expiry defect

On master every redux-sourced client re-authenticates with a classic grant because the expiry is an ISO string. With this plan the Keycloak path stores no bearer or expiry and builds every client from the live cookie (KTD3, KTD5), so the defect does not affect Keycloak sites. Fixing it changes classic behaviour (R5).

**Recommendation: file it as a separate classic-only defect, with no dependency on this work.**

### Q4. In-place branching or a dedicated module

The units add the Keycloak handling inside the existing functions. A dedicated module the sagas hand over to when the setting is on would leave the classic functions untouched (see Alternatives Considered).

**Recommendation: in-place branching,** as the units are written; a dedicated module is a reasonable alternative if the number of checks in the classic functions feels unwieldy.

---

## Key Technical Decisions

### KTD1. A site setting declares Keycloak login; cookies only decide the next step

Per the recommendation on Q1 (revise this KTD and U1 if the owner chooses otherwise):

- A site setting turns on Keycloak login. With it off, every function behaves as today (R5).
- With the setting on, on the server: `ContensisSecurityRefreshToken` present ⇒ a session exists; pass that to the client in SSR state (a boolean, never the token).
- With the setting on, on the server, for a protected route with no refresh cookie: redirect (302) to `/idp/check?returnPath=…` before rendering (KTD7, R8).
- With the setting on, in the browser: bearer readable ⇒ build the client from it (KTD3); bearer absent and a session exists ⇒ `/idp/refresh` first (KTD2); no session ⇒ `/idp/check?returnPath=…` for protected routes (R8).
- Switching an existing site to the setting: members still hold react-base's 1-day classic cookies (`RefreshToken`, `ContensisCMSUserName`, bearer) and no IdP refresh cookie. That resolves to build client → 401 → no session → `/idp/check` → Keycloak login: one forced re-login per member, once. Expected, not a defect.
- `ContensisClassicToken` is not the entry gate. It is cleared by the server on terminal refresh failure and on logout, so react-base does not need to delete it.

### KTD2. Missing bearer with the setting on: refresh first

If the bearer cookie or `ContensisClassicToken` is absent but a session exists (restart, or bearer expired), `POST /idp/refresh` before building a client. A `200` restores the bearer, and — when Keycloak returns an id_token — `ContensisClassicToken`, `ContensisCMSUserName` and `.Contensis.Auth`. A `401` is terminal (KTD6). Never fall through to a classic grant.

`/idp/refresh`, not `/idp/check`, is the restore path. `/idp/check` repairs missing cookies only while `.Contensis.Auth` is valid. That session cookie does not survive a browser restart, so after a restart `/idp/check` goes to login. `/idp/refresh` needs only the persistent refresh cookie. `/idp/check` remains the fallback when refresh fails and the entry point when there is no session.

### KTD3. One function builds every Keycloak-path client from the live bearer cookie

SDK facts (management-api 2.4.0 source):

- `isBearerTokenExpired` (`client.ts:108-117`) compares `now + 60 s < bearerTokenExpiryDate` with no coercion (`:48-49` types it `Date`). An ISO string compares as `NaN` → treated as expired → `authenticate()`.
- `ensureBearerToken` (`:130-134`) returns the bearer without a grant when the bearer is set and the expiry passes that check.
- With no `clientType`, the default is `null` (`client-config.ts:6`) and `getAuthenticatePayload` (`client.ts:202-203`) sends `grant_type=null`, so an accidental `authenticate()` on a bearer-only client fails at the token endpoint instead of firing a classic grant. `clientType: 'none'` is not usable: it throws without an `accessToken` (core-api `http-client.ts:30-32`). No SDK version has a `bearer` client type.

Rule: with the setting on, `getManagementApiClient` is the only place a client is built. It ignores any stored credentials, reads `ContensisSecurityBearerToken` at that moment, and assigns a newly constructed `Date` well beyond the bearer lifetime (1800 s plus the SDK's 60 s lookahead; pick a constant such as 24 h and document it). It passes no `clientType`, so the `grant_type=null` fallback above holds. Every caller goes through it: login, `changePasswordSaga`, and `authenticateRequest` (U6). `refreshSecurityToken` builds no client on the Keycloak path (U5).

- **Bearer source is an argument.** `getManagementApiClient` is module-level and has no request context. It takes the cookie source (the saga's `CookieHelper`, or the request in `authenticateRequest.ts`) and defaults to `document.cookie` in the browser. No module-level "current bearer": it would leak between concurrent SSR requests.
- **The date lives as long as one client.** Clients are created per call (`ContensisManagementApi.ts:48`), so the date is never stored, serialized or hydrated.
- This is a convention the SDK relies on, kept in one function with one review gate. Real staleness is handled by the 401 path (KTD4).

This follows the `/idp/*` contract: the IdP owns the token's lifetime and replaces the cookie on refresh; react-base reads it when it needs it.

### KTD4. Refresh with `POST /idp/refresh`, triggered by a missing bearer or a 401; read the new cookie live

- Request: `fetch('/idp/refresh', { method: 'POST', headers: { 'X-Contensis-Refresh': '1' }, credentials: 'same-origin', signal })` — site-relative; never prefixed with `LoginHelper.CMS_URL` (no CORS on `/idp/*`).
- Timeout: `AbortController` + `setTimeout`. `AbortSignal.timeout` is not available in the build's browser targets (chrome 78 / firefox 70, `rollup/rollup.config.lib.mjs:105`) and Babel does not polyfill it.
- After `200`, read `ContensisSecurityBearerToken` from live browser state (`document.cookie` or a new cookie instance). `CookieHelper.GetCookie` (`CookieHelper.class.ts:46-47`) returns a map captured at construction and does not see the `Set-Cookie`.
- The SDK does not refresh on 401. A 401 from `getCurrent` rejects with `{ status, statusText, url, data }` (core-api `http-client.ts:61-66,84-86`); match `error.status === 401`. On 401: refresh, build a new client (which reads the new cookie), retry once. A second 401 is terminal (KTD6).
- Single-flight: one module-scoped pending promise, because `LoginHelper` is re-created per saga call. The refresh token is reusable today, so the guard only turns several concurrent requests into one. It stays correct if KEYC-180 enables rotation. Browser-only, so no SSR cross-request leak.

### KTD5. Store no bearer and no expiry; store the classic security token

With the setting on, the Keycloak path never calls `mapClientCredentials`, and redux `clientCredentials` holds only `contensisClassicToken`, read from the `ContensisClassicToken` cookie (same value as `ContensisCMSUserName`, `Svc:699-704`). No bearer, no refresh token, no expiry dates.

- `selectUserSecurityToken` is public and used by sites (`nlgpsf-website` documents page), so the classic token stays (R10). `selectClientCredentials` on Keycloak sites returns only that field; state this in the release notes.
- After a restart `ContensisClassicToken` is gone until `/idp/refresh` restores it, which requires an id_token in the refresh response (Deferred item 9). react-base re-reads it after the refresh and before reporting the member as authenticated.
- The bearer never enters serialized SSR state on Keycloak sites.

### KTD6. Three outcomes: recoverable, terminal, logout

- **Recoverable** (401 from `getCurrent` with a session present): refresh, build a new client, retry once. Clear nothing.
- **Terminal** (`/idp/refresh` returns 401, or the retry still 401s): navigate to `/idp/check?returnPath=<current path>` (R9 applies). Do not rely on react-base deleting cookies:
  - if Keycloak rejected the refresh, the server has already cleared every auth cookie (`Svc:784-797`);
  - if there was no refresh cookie, nothing needs clearing and `/idp/check` routes to login;
  - if the retry after a successful refresh still 401s, the cookie set is valid by the server's rules and `/idp/check` decides. With the full set present, `/idp/check` redirects straight back (`Web/IdpEndpoints.cs:35-37`) and the 401 would repeat.
  - Bound: at most one `/idp/check` navigation per page load (e.g. a marker in `sessionStorage` or a query parameter on `returnPath`). A 401 that persists after that round-trip renders an error state, not another navigation.
  Do not call the classic `ClearCachedCredentials` on the BFF path; on Keycloak tenants the cookies belong to the IdP, and react-base must not write their values.
- **Logout** (`LogoutUser` with the setting on): navigate to `GET /idp/logout?returnPath=…` (R7, R9). Browser-side deletion is not sufficient (see contract).

The terminal and logout navigations must take precedence over `ClientRedirectToSignInPage` at every caller of `handleRequiresLoginSaga`: `sagas.js:113-117` (access token) and `:369-372` (protected node).

### KTD7. SSR: the server reads cookies, may redirect to `/idp/check`, but does not refresh or clear

The server receives every cookie, including the httpOnly refresh cookie, so it can tell a session exists (KTD1). It does not call `/idp/refresh`: the browser holds the cookie jar that must receive the re-minted cookies, and a server-side refresh would need to forward `Set-Cookie` headers through the SSR response — not attempted here.

For a protected route with the setting on and no refresh cookie, the server redirects (302) to `/idp/check?returnPath=…` through the existing render-context redirect (`webApp.tsx:439-447`), so a logged-out member reaches login without the page rendering first (R8, R9). Optional, owner's call: the same redirect when `.Contensis.Auth` is present but the bearer or `ContensisClassicToken` is missing, where `/idp/check` is certain to repair the set; it needs the alias-scoped cookie name, so it is not in the units.

For protected content, the routing saga turns an unresolved 401 into `do500` (`sagas.js:363-391`). With a session present but no usable bearer on the server, resolve one of two ways (Deferred item 2):

- **(a)** build the server-side client from the bearer cookie when present (U3 builder, request as cookie source), so protected node calls authenticate; or
- **(b)** when a session exists, render a client-deferred state instead of `do500`, so the browser runs KTD2/KTD4 after hydration.

Either way the SSR state carries the session boolean and the classic token (KTD5), never the bearer.

### KTD8. Setting off ⇒ behaviour unchanged

Every new branch is behind the Keycloak login setting check (KTD1). With it off, `GetCachedCredentials`, `getManagementApiClient`, `validateUserSaga`, `LoginUser`, `LogoutUser`, `refreshSecurityToken`, `changePasswordSaga`, `ensureAccessTokenSaga` and `authenticateRequest` behave as today. Reviewing R5 means checking that every gate is correct. The classic functions still change, so their code is not byte-identical.

---

## High-Level Technical Design

**Routing per request (KTD1, KTD2, KTD7):**

```mermaid
flowchart TD
    A[Login / validate entry] --> B{Keycloak login<br/>setting on?}
    B -- no --> C[Classic path — unchanged]
    B -- yes --> D{Server render?}
    D -- yes --> SR{Refresh cookie<br/>present?}
    SR -- no, protected route --> CK302[302 /idp/check?returnPath=…]
    SR -- no, public route --> AN
    SR -- yes --> E[Build client from bearer cookie if present.<br/>On 401: defer to client, not do500.<br/>No refresh, no clear]
    D -- no --> F{Bearer cookie<br/>readable live?}
    F -- yes --> H[Build client: live bearer +<br/>far-future Date]
    F -- no --> S{Session present?<br/>from SSR state}
    S -- yes --> G[POST /idp/refresh<br/>module single-flight]
    S -- no --> P{Protected route?}
    P -- yes --> CK[Navigate /idp/check?returnPath=…]
    P -- no --> AN[Anonymous]
    G -- 200 --> H
    G -- 401 --> CK
    H --> I[getCurrent / getUserGroups]
    I -- 200 --> K[Authenticated]
    I -- 401 --> L[POST /idp/refresh →<br/>build new client → retry once]
    L -- 200 --> K
    L -- 401 --> CK
```

**Browser sequence (happy path and 401 recovery):**

```mermaid
sequenceDiagram
    participant B as Browser (site host)
    participant RB as react-base saga / LoginHelper
    participant IDP as /idp/* (zengenti-svc-identity-client)
    participant CMS as Management API

    B->>RB: validate (page load / route guard)
    RB->>RB: Keycloak setting on? read bearer cookie live
    alt bearer missing, session present
        RB->>IDP: POST /idp/refresh (X-Contensis-Refresh, same-origin)
        IDP-->>RB: 200 + Set-Cookie bearer (+ marker if id_token)
        RB->>RB: read bearer live
    end
    RB->>RB: build client: live bearer + far-future Date
    RB->>CMS: getCurrent (ensureBearerToken short-circuits)
    alt 200
        CMS-->>RB: user
    else 401
        RB->>IDP: POST /idp/refresh (single-flight)
        IDP-->>RB: 200 + new bearer
        RB->>CMS: getCurrent retry
        CMS-->>RB: user, or 401 → navigate /idp/check
    end
```

Where diagrams and prose disagree, the prose governs.

---

## Implementation Units

### U1. Keycloak login setting and session detection

- **Goal:** the single gate for every BFF branch (KTD1, Q1).
- **Requirements:** R1, R5, R8.
- **Files:** `src/models/config/ServerConfig.ts` (new option), `src/util/SSRContext.tsx` / `src/models/SSRContext.ts` (expose to client, following the access-token `config` pattern), `src/user/util/CookieConstants.ts` (add `CLASSIC_TOKEN_COOKIE = 'ContensisClassicToken'`, `IDP_REFRESH_TOKEN_COOKIE = 'ContensisSecurityRefreshToken'`).
- **Approach:** add the setting; add a helper that reads it; on the server derive a session-present boolean from the refresh cookie and put it in SSR state. Helper and field names are for the owner to choose. Leave `findLoginCookies` unchanged. If Q1 is answered (a), replace this with a marker-cookie predicate and record the restart and no-session gaps as accepted.
- **Test scenarios:** setting off ⇒ every gate false regardless of cookies; setting on, refresh cookie present on the server ⇒ session-present true; setting on, only classic cookies (`RefreshToken`, `ContensisCMSUserName`, bearer) ⇒ session-present false; the refresh token value never appears in SSR state.
- **Verification:** typecheck/lint; review that no BFF branch is reachable with the setting off.

### U2. `/idp/refresh` helper

- **Goal:** one browser-only refresh function (KTD2, KTD4).
- **Requirements:** R2, R3, R6.
- **Files:** `src/user/util/LoginHelper.class.ts` (or a new module beside it for the module-scoped promise).
- **Approach:** per KTD4 — site-relative POST, header, `same-origin`, `AbortController` timeout (5 s), live cookie read after `200`, `null` on non-200/error/timeout, `null` without fetching when `typeof window === 'undefined'`, module-scoped single-flight.
- **Test scenarios:** 200 ⇒ returns the new bearer from live state; 401 ⇒ `null`; 403 (header missing) ⇒ `null` and is a code defect; timeout ⇒ `null`; server ⇒ `null`, no fetch; two concurrent calls ⇒ one request.
- **Verification:** review against the contract section (method, header, credentials, site-relative URL, live read, module scope).

### U3. One client builder and the stored classic token

- **Goal:** every Keycloak-path client built from the live bearer cookie in one function; redux holds only the classic token (KTD3, KTD5).
- **Requirements:** R1, R2, R5, R10.
- **Files:** `src/user/util/LoginHelper.class.ts` (`GetCachedCredentials`), `src/user/util/ContensisManagementApi.ts` (`getManagementApiClient`), `src/user/redux/sagas/resetPassword.js` (`changePasswordSaga`, `:143-144`).
- **Approach:** with the setting on, `getManagementApiClient` takes a cookie source argument, reads the bearer from it, sets a new far-future `Date` and no `clientType`, and ignores stored credentials. `GetCachedCredentials` returns only `contensisClassicToken` from `ContensisClassicToken`. `changePasswordSaga` and every other caller pass their cookie source instead of `selectClientCredentials`. The Keycloak path never calls `mapClientCredentials`.
- **Test scenarios:** setting on ⇒ client has the live bearer and a `Date`, no classic fields; redux `clientCredentials` holds only `contensisClassicToken`; `selectUserSecurityToken` returns the cookie value; after `/idp/refresh` the next client has the new bearer; setting off ⇒ today's shape; `getCurrent` makes no token-endpoint call (trace `client.ts:130-134`); change-password with the setting on makes no classic grant; two concurrent SSR requests build clients with their own bearers.
- **Verification:** code trace that `authenticate()` is unreachable on the Keycloak path and that only `getManagementApiClient` assigns `bearerTokenExpiryDate`.

### U4. BFF login, terminal and logout handling

- **Goal:** log in without `IsAuthenticated`, recover from a stale bearer, send terminal failures and logout to `/idp/*` (KTD2, KTD4, KTD6, KTD7).
- **Requirements:** R1–R4, R6–R9.
- **Files:** `src/user/redux/sagas/login.ts` (`validateUserSaga`, the redirect at `:82-83`), `src/user/util/LoginHelper.class.ts` (`LoginUser`, `LogoutUser`), `src/routing/redux/sagas.js` (`:363-391` for KTD7; `:369-372` redirect precedence), `src/server/webApp.tsx` (`:439-447`, existing redirect handling).
- **Approach:**
  - `validateUserSaga`: with the setting on bypass the `:101-105` guard and `GetCredentialsForSecurityToken`; build the client (U3), or refresh first (U2), or report "no session".
  - `LoginUser`: on `error.status === 401` refresh, build a new client, retry once; on second failure return terminal without calling `ClearCachedCredentials`.
  - `LoginUser` with the setting on does not call `SetLoginCookies` or `mapClientCredentials`. Today the success path does both (`LoginHelper.class.ts:338-340`), and `SetLoginCookies` writes the bearer and `ContensisCMSUserName` with a 1-day expiry (`:217-229`, `CookieHelper.class.ts:4`). On the Keycloak path that would overwrite the IdP's 30-minute bearer and turn the session-only classic token into a 1-day cookie. The same applies to the username/password branch (`:309`) and the `validateUserSaga` call (`login.ts:127`), which the Keycloak path does not reach.
  - Terminal or no-session on a protected route: navigate to `/idp/check?returnPath=…` in place of `ClientRedirectToSignInPage`. Strip `Credentials`, `SecurityToken`, `Password` from `returnPath` (R9).
  - `LogoutUser` with the setting on: navigate to `/idp/logout?returnPath=…`.
  - Server: protected route, setting on, no refresh cookie ⇒ set the render-context redirect to `/idp/check?returnPath=…` (KTD7). Otherwise no refresh, clear or redirect; resolve the `do500` path per Deferred item 2.
- **Test scenarios:** valid bearer ⇒ authenticated, no `IsAuthenticated`, no classic grant; bearer missing with session ⇒ refresh then login; one 401 ⇒ refresh + retry succeeds, no cookies cleared; refresh 401 ⇒ navigate `/idp/check` once (no loop: the server cleared the cookies, so the next validate sees no session); retry 401 after a successful refresh ⇒ `/idp/check`; logged-out member on a protected route ⇒ `/idp/check`, not `/account/login`; logout ⇒ `/idp/logout`, and the next load has no session; SSR with session and no bearer ⇒ no `do500`; SSR protected route with no refresh cookie ⇒ 302 to `/idp/check` before render; setting off ⇒ unchanged.
- **Verification:** trace showing no BFF branch reaches `GetCredentialsForSecurityToken` or a classic grant; terminal and logout navigations win over `/account/login` at both callers.

### U5. `refreshSecurityToken` with the setting on

- **Goal:** the exported saga uses `/idp/refresh` instead of `client.authenticate()` (KTD4).
- **Requirements:** R2, R3, R5.
- **Files:** `src/user/redux/sagas/login.ts` (`:219-232`).
- **Approach:** keep the no-argument signature. With the setting on, call U2; the new bearer lives in the cookie, so nothing is re-seeded. Dispatch `SET_AUTHENTICATION_STATE` with only the re-read `contensisClassicToken` (the dispatched credentials no longer carry a bearer; note it in the release notes). Setting off unchanged. No internal caller exists; this protects consumers of the public export.
- **Test scenarios:** setting on ⇒ one `/idp/refresh`, no `authenticate()`, dispatched credentials hold only the classic token; setting off ⇒ unchanged; refresh failure ⇒ no throw to the caller.
- **Verification:** typecheck/lint; signature unchanged.

### U6. Access-token paths (if Q2 is in scope)

- **Goal:** the access-token feature works for BFF sessions.
- **Requirements:** R2, R4.
- **Files:** `src/routing/redux/sagas.js` (`ensureAccessTokenSaga`, `:100-142`), `src/server/features/access-token-api/authenticateRequest.ts` (`:19-28`, `:128`).
- **Approach:** `ensureAccessTokenSaga` uses the U4 terminal navigation instead of `ClientRedirectToSignInPage` with the setting on. `getRequestCredentials` prefers `ContensisSecurityBearerToken` over `ContensisCMSUserName` when `ContensisSecurityRefreshToken` is present, builds the client through U3's builder with the request as cookie source, and skips the classic refresh fallback in that case (return 401; the browser refreshes and retries the release).
- **Test scenarios:** BFF session with `requireLogin` access token ⇒ release succeeds with the JWT; release 401 ⇒ client refreshes once and retries; classic session ⇒ unchanged precedence and fallback.
- **Verification:** review that the classic precedence is unchanged when no IdP refresh cookie is present.

---

## Alternatives Considered

- **Marker cookie as the only gate.** Fails after a browser restart and gives no route into `/idp/login` for a logged-out member. Listed as Q1 option (a).
- **In-place branching vs. a dedicated BFF module.** In-place branching adds a gate to about nine functions (KTD8). A dedicated module the sagas dispatch to when the setting is on would leave the classic functions untouched and shrink the R5 review to one dispatch point, at the cost of duplicating the client-building and `getCurrent` flow. Because the gate is a config setting, the dispatch is a single check. Recommended: in-place branching (Q4); the units are written for it.
- **`/idp/check` as the restore path after a restart.** It repairs missing cookies only while `.Contensis.Auth` is valid; that session cookie is gone after a restart, so it would send the member to login (silent only if Keycloak's SSO session survived). `/idp/refresh` restores from the persistent refresh cookie. Kept as fallback and entry point (KTD2).
- **Storing the bearer in redux and setting a fresh `Date` wherever a client is built.** Needs the rule at four places and puts the bearer in serialized SSR state. Not chosen; the single builder does the same in one place (KTD3, KTD5).
- **Server-side refresh during SSR.** Would let protected content render on first load after a bearer expiry, but requires forwarding `Set-Cookie` through the SSR response and coordinating with a concurrent browser refresh. Not pursued (KTD7).

---

## Scope Boundaries

- **No `contensis-management-api` SDK change.** No `bearer` client type exists in any version; KTD3 relies on a future `Date` and the `null` grant fallback.
- **No `nlgpsf-website` change.** It is on `^3.1.1-beta.16` on every branch; the v3→v4 upgrade is a separate ticket (not yet filed). The local unpushed branch `feat/nlgpsf-temp-dev-deploy` contains `useBffSessionBridge`, which dispatches `VALIDATE_USER` with `ContensisCMSUserName` and so still reaches `IsAuthenticated` (FP1); it is not a route to this fix.
- **No `zengenti-svc-identity-client` or `zengenti-svc-identity` change.** KEYC-183 stays. A JS-readable expiry cookie is not needed.
- **No `contensis-app` change.** `IsAuthenticated` stays for classic callers.
- **No test framework introduction.**
- **The string-expiry defect** (Q3): affects classic sites only once this lands; separate ticket.

### Follow-up work

- File the `nlgpsf-website` v3→v4 react-base upgrade ticket (gates live verification).
- File the string-expiry defect (Q3).
- Optional: httpOnly bearer / SDK bearer mode (see Risks).

---

## Deferred to Implementation

SDK facts are from the package source (management-api 2.4.0 / core-api 1.2.1).

1. **String expiry coercion — resolved: none.** See KTD3.
2. **SSR 401 resolution — open.** Choose KTD7 (a) or (b). Trace whether the delivery API returns 401 server-side for protected content when the bearer cookie has expired but the refresh cookie is present.
3. **`getCurrent` with only a bearer — resolved: works.** `user-operations.ts:21-23` → `getUser` (`:238-249`) → `getHeaders` (`client.ts:95-106`) sends only `Authorization: Bearer`; precedent `authenticateRequest.ts:52-58`.
4. **401 rejection shape — resolved:** `{ status, statusText, url, data }`, no `.message`.
5. **`ensureBearerToken` short-circuit — resolved: yes**, with a 60 s lookahead.
6. **Sentinel value — open.** Pick and document a constant (KTD3 suggests 24 h).
7. **`AbortSignal.timeout` — resolved: not available** in the browser targets; use `AbortController` + `setTimeout`.
8. **Detection inside `refreshSecurityToken` without a `CookieHelper` — resolved:** it reads the config setting (U1), which needs no cookies.
9. **`id_token` on refresh — resolved from config; confirm at runtime.** `/idp/refresh` re-mints `ContensisClassicToken`, `ContensisCMSUserName` and `.Contensis.Auth` only when Keycloak returns an id_token (`Svc:649-661`, `:340-343`). The login requests `scope=openid profile email contensis_claims contensis_groups` (`zengenti-svc-identity-client` `ContensisOidcOptions.cs:41`, sent at `ContensisOidcService.cs:86`), so the refresh token carries `openid` and Keycloak's refresh grant returns an id_token. Runtime check: after a restart, `ContensisClassicToken` is back after the first `/idp/refresh`.
10. **Realm remember-me / SSO session after a restart — resolved from config.** Both realm sources agree: `zengenti-svc-identity` `realm-config/contensis-realm-standard.json` and `contensis-svc-security` `src/Infrastructure.Keycloak/Resources/contensis-realm-template.json` (branch `feature/identity-management`) set `rememberMe: true`, `ssoSessionIdleTimeout` and `ssoSessionMaxLifespan` 1296000 s (15 days), no separate remember-me timeouts, `accessTokenLifespan` 1800 s.
    - The refresh token's lifetime follows the SSO session, so the persistent refresh cookie lasts up to 15 days idle. `/idp/refresh` restores a session after a restart any time within that window, not only within the 30-minute bearer lifetime.
    - `/idp/login` after a restart is silent only if the member ticked "Remember me" (Keycloak's own login cookie is otherwise a session cookie); without it they log in again with MFA. This affects only members who reach `/idp/check` with no usable refresh cookie.

---

## System-Wide Impact

- **`@contensis/forms`** reads `ContensisSecurityBearerToken`. The BFF path never writes or deletes it; the IdP does.
- **Change password** applies to Keycloak members, and `changePasswordSaga` (`resetPassword.js:143-144`) builds its client through the U3 builder. Member passwords stay in the tenant's CMS database; Keycloak does not hold them.
  - The user storage SPI reads users and checks passwords live against that database (`zengenti-svc-identity` `user-storage-spi/.../ContensisUserStorageProvider.java:35,136`). It does not implement `CredentialInputUpdater`, so Keycloak cannot change a password.
  - The BFF design keeps member self-service (registration, change-password, forgot-password) CMS-side (`zengenti-svc-identity` `docs/plans/2026-05-12-001-feat-keyc-27-published-site-bff-plan.md:555`).
  - `client.security.users.updatePassword` reaches `contensis-svc-security` `POST users/{userId}/credentials/password` (`src/Host/Controllers/UserController.cs:186-208`, `AuthorizeSysAdminOrUserAdminOrSelf`). `UpdatePasswordCommandHandler.cs:30-60` compares the existing password with the stored hash and writes the new one. No grant or `IsAuthenticated` call is involved, so MFA does not block it.
  - The next Keycloak login validates the new password through the SPI.
- **Public selectors:** `selectClientCredentials` returns only `contensisClassicToken` on Keycloak sites; `selectUserSecurityToken` is unchanged (R10). `nlgpsf-website`'s `/secure-documents` call depends on it; whether that route accepts a classic token issued through Keycloak is outside react-base and is a runtime check.
- **Route guards:** `handleRequiresLoginSaga` has two callers that redirect on failure (`sagas.js:113-117`, `:369-372`); both need the U4 navigation precedence.
- **Non-Keycloak sites:** no behaviour change with the setting off (R5).

---

## Risks & Mitigations

- **Gate wrong ⇒ classic sites affected.** Mitigation: a config setting, off by default; review every gate (KTD8).
- **Post-refresh stale read.** Mitigation: live cookie read (KTD4), a review gate.
- **A Keycloak-path client built outside the builder ⇒ no `Date`, `authenticate()` fires.** Mitigation: one builder (KTD3) and a review gate; no `clientType`, so a slip fails with `grant_type=null` instead of firing a classic grant.
- **Redirect loop on terminal failure.** The server clears cookies on a rejected refresh, and with no refresh cookie `/idp/check` routes to login. A loop remains when the CMS rejects a bearer that the IdP considers valid, because `/idp/check` then redirects straight back. Mitigation: one `/idp/check` navigation per page load, then an error state (KTD6).
- **SSR 500 on protected content with a recoverable session.** Mitigation: KTD7, Deferred item 2.
- **Concurrent refresh across tabs.** The refresh token is reusable today, so concurrent refreshes both succeed. If KEYC-180 enables rotation, a losing tab gets a 401 and the server clears cookies for all tabs (`Svc:311-321`); every tab then goes through `/idp/check`. Tracked by KEYC-180 / contensis-app OI-4.
- **XSS reads the bearer (pre-existing).** The bearer cookie is `httpOnly: false` by BFF design (`Svc:683`). The refresh cookie is httpOnly, but script on the origin can call `/idp/refresh` with the header. Not changed here; recorded for the threat model.
- **Spoofed marker cookie.** Not an entry gate (KTD1), so writing `ContensisClassicToken` has no effect on mode selection.
- **Bearer in serialized SSR state (pre-existing, classic only).** `mapClientCredentials` puts `bearerToken` into redux on classic sites. Keycloak sites store no bearer (KTD5).
- **Classic token missing after a restart.** If the refresh response has no id_token, `ContensisClassicToken` is not restored and `selectUserSecurityToken` is empty. Mitigation: Deferred item 9; `/idp/check` restores the full set.
- **KEYC-200 bypass on in a test realm masks the bug.** Mitigation: verify `CONTENSIS_ALLOW_MFA_CLASSIC_GRANTS` is off on `nlgpsf-temp-dev` before runtime validation.
- **No automated tests.** Mitigation: static and review gates below; runtime validation downstream.

---

## Verification Contract

- **Static gates:** `npm ci`, then `npm run lint` on changed files, `tspc` typecheck, `npm run build`.
- **Review gates:**
  - Setting off ⇒ no BFF branch reachable (R5, KTD8).
  - No BFF branch reaches `GetCredentialsForSecurityToken`, `contensis_classic`, or `contensis_classic_refresh_token` (R2).
  - `/idp/refresh` is site-relative, sends `X-Contensis-Refresh`, uses `same-origin`, `AbortController` timeout (KTD4).
  - The post-refresh bearer is read from live state (KTD4).
  - The single-flight promise is module-scoped (KTD4).
  - Only `getManagementApiClient` assigns `bearerTokenExpiryDate` on the Keycloak path, from a new `Date`; no `clientType`; the bearer source is an argument, not module state (KTD3).
  - Redux holds no bearer or expiry with the setting on; `selectUserSecurityToken` returns the classic token (KTD5, R10).
  - The BFF path never calls `ClearCachedCredentials` or `SetLoginCookies` and never writes IdP cookie values (KTD6, U4).
  - Terminal ⇒ `/idp/check?returnPath=…`; logout ⇒ `/idp/logout?returnPath=…`; `returnPath` stripped of credential parameters; at most one `/idp/check` navigation per page load (R4, R7, R9, KTD6).
  - The server never calls `/idp/refresh` or clears cookies; it redirects only to `/idp/check`, and only for a protected route with no refresh cookie; a session-present 401 does not reach `do500` (R6, R8, KTD7).
  - The Keycloak path never calls `mapClientCredentials` (KTD5).
- **Runtime validation (downstream, after the nlgpsf v3→v4 upgrade), on `nlgpsf-temp-dev` with member MFA on and `CONTENSIS_ALLOW_MFA_CLASSIC_GRANTS` off:**
  - a logged-out member on a protected page is sent to `/idp/check` and completes MFA login;
  - the account page lists the expected Level-1 documents (confirms `/secure-documents` accepts the classic token issued through Keycloak);
  - no `IsAuthenticated` request and no classic-grant 400 in the network trace;
  - after deleting the bearer cookie, the next request triggers one `/idp/refresh` and succeeds;
  - after a browser restart (within 30 minutes, and again after more than 30 minutes), the member is still logged in without a login page and the documents page still lists documents;
  - logout lands on the Keycloak end-session page, and reloading shows no session.

---

## Definition of Done

- The react-base owner (CHALKY-2080) has approved this plan and answered Q1–Q4.
- U1–U5 implemented on `feat/keyc-199-bff-session-login` (off `master`); U6 if Q2 is in scope.
- All static and review gates pass; classic behaviour unchanged with the setting off.
- Deferred items 2 and 6 resolved and noted in the PR; items 9 and 10 confirmed at runtime.
- Runtime validation flagged as pending the nlgpsf v3→v4 upgrade.
- The overview's "Where things stand" table and "Questions for Neil" section are updated in the PR that lands the code.

---

## Sources

- **Origin diagnostic:** `contensis-app` — `docs/reports/2026-07-21-mfa-published-site-login-never-completes-three-repo-diagnostic.md`.
- **`/idp/*` contract:** `zengenti-svc-identity-client` `206359e` — `src/Contensis.Identity.Oidc/ContensisOidcService.cs`, `src/Contensis.Identity.Oidc/ContensisOidcCookieNames.cs`, `src/Contensis.Identity.Oidc.Web/Program.cs`, `src/Contensis.Identity.Oidc.Web/IdpEndpoints.cs`, `docs/open-issues.md` (OI-9).
- **Realm settings:** `zengenti-svc-identity` `realm-config/contensis-realm-standard.json` and `contensis-svc-security` `src/Infrastructure.Keycloak/Resources/contensis-realm-template.json` (branch `feature/identity-management`) — `rememberMe`, SSO session limits, access-token lifespan.
- **Change password:** `contensis-svc-security` `src/Host/Controllers/UserController.cs:186-208`, `src/Application/Users/Commands/UpdatePasswordCommandHandler.cs:30-60`; `zengenti-svc-identity` `user-storage-spi/.../ContensisUserStorageProvider.java`.
- **Site usage of stored credentials:** `nlgpsf-website` `src/app/redux/documents/sagas.ts:14-20, 59`.
- **Realm and grants:** `zengenti-svc-identity` — `docs/contensis-classic-payload-is3-vs-keycloak.md:85,141` (refresh token reuse), `ContensisClassicGrantType.java`, `ContensisClassicRefreshTokenGrantType.java` (MFA rejection); `contensis-svc-security` realm template (redirect URIs, access-token lifespan); KEYC-302 runbook and `docs/keycloak-production-release.md` (branch `feature/keyc-302-keycloak-production-release`).
- **SDK:** `contensis-management-api` 2.4.0 and `contensis-core-api` 1.2.1 package source (`client.ts`, `client-config.ts`, `user-operations.ts`, `http-client.ts`).
- **react-base:** `master` `29ab2e28` — files cited inline.
- **Jira:** KEYC-199, CHALKY-2080, KEYC-180, KEYC-183, KEYC-200.
