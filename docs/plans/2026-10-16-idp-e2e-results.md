---
title: IDP session auth - first real end-to-end run
date: 2026-10-16
plan: docs/plans/2026-10-12-1522-feat-idp-session-auth-plan.md
prior: docs/plans/2026-10-13-idp-session-auth-status.md
---

# IDP session auth — first real e2e (16 Oct 2026)

First run with a **real Keycloak sign-in** — the item every earlier pass could only fake. Machine on the VPN, react-base rebuilt from `feat-contensis-idp` at `fb8fc19c` (includes the dev-proxy fix: `xfwd: true`, `cookieDomainRewrite: false`), react-starter dev server on `http://localhost:3001` with `USE_IDP=true` against the `idp` tenant. Browser: real Chrome (headed, agent-browser), signed in as `zengenti` (password + the real `/idp/callback` loop).

## The localhost blocker is gone

`LOCALHOST_CALLBACK.md` (13 Oct) said sign-in could not return to localhost. It now does, end to end:

- `/idp/check?returnPath=%2Fmembers` → `/idp/login` → Keycloak with `redirect_uri=http://localhost:3001/idp/callback` — identity-client builds the callback from the forwarded host.
- Logout likewise: Keycloak end-session with `post_logout_redirect_uri=http://localhost:3001/`.
- Session cookies land host-only on `localhost:3001`, and the refresh cookie keeps them alive through the dev proxy.

## Results

| # | Check | Result |
|---|---|---|
| 1 | Anonymous on protected `/members` | `POST /idp/refresh` → 401 → `no-session` → one redirect to `/idp/check?returnPath=%2Fmembers`. No loop. |
| 2 | Real sign-in | Keycloak login → `/idp/callback` → back on `/members`, signed in. |
| 3 | Signed-in state | "Signed in as zengenti". Redux `user.authenticationState`: `isAuthenticated: true`, `isLoading: false`, `clientCredentials` = `{ contensisClassicToken }` **only**. Groups from the live API: Developers, Everyone, System Administrators. |
| 4 | Bearer, no grant | `GET /api/security/users/@current` and `/users/{id}/groups` carry `Authorization: Bearer <Keycloak JWT>` (iss `idp-dev`, aud `contensis-api`). No grant request anywhere in the log. The JWT's `contensis_security_token` claim matches the classic-token cookie. |
| 5 | Group-restricted route | `/board` (group `Board`, user not a member) → `/account/access-denied?original_uri=/board`, member still shown, "Sign in as someone else" offered. |
| 6 | KTD3 client navigation | pushState `/board` → `/members` with a hydrated session: only the lazy route chunks load; **zero** auth network calls. |
| 7 | Refresh with real cookies | `POST /idp/refresh` + header → 200, `ContensisSecurityBearerToken` rotated (fresh 30-min exp). |
| 8 | Classic token as Bearer (U7/KTD10, was blocked) | `Authorization: Bearer <ContensisClassicToken>` to `@current` → **401**. The classic token is not a Bearer credential. Recorded in `docs/IDP_LOGIN.md`. |
| 9 | Logout round trip | "Log out" → `/idp/logout?returnPath=%2F` → Keycloak end-session → back on `/`. All IDP cookies gone (readable ones verified empty; deletion done by identity-client, never by the app). |
| 10 | Post-logout settle | One `POST /idp/refresh` → 401 → anonymous renders "Log in". No redirect, no loop. |

## Fix landed this session: single-flight for `resolveSession`

Observation 1 (double `@current`) was diagnosed and fixed in `src/user/idp/session.ts`: `resolveSession` now shares one in-flight promise between concurrent callers, the same pattern as `refreshSession` (KTD4). The in-flight promise clears when it settles, so the quiet retry still resolves afresh.

- **Dev (StrictMode, which doubles the first route dispatch):** after the fix, the signed-in load makes exactly **one** `@current` and **one** `groups` call (was 2+2).
- **Harness:** unit 72/72, server 9/9 after the change.

## Production build run (same day)

`npm run build` + `npm run server` (NODE_ENV=production, SSR on, `USE_IDP=true` baked into `startup.js` and `start.js` by `buildstartup`), fresh browser profile, full journey:

| Check | Result |
|---|---|
| Startup script | `startup-2.0.0.js` 200 — see workspace note below |
| Anonymous `/members` | one `POST /idp/refresh` 401 → one redirect → Keycloak |
| Real sign-in | callback → `/members`, "Signed in as zengenti", **one** `@current` + one `groups` |
| Client nav to `/board` | no auth calls on the client navigation; the group mismatch then does the usual full-page redirect to `/account/access-denied?original_uri=/board` (classic behaviour), where the fresh store settles with one user+groups pair |
| Refresh with real cookies | 200, bearer cookie rotated |
| Logout | `/idp/logout?returnPath=%2F` → Keycloak end-session → `/` → "Log in", cookies cleared, one refresh 401, no loop |

**Workspace note (not IDP-related):** running the prod server from an npm-workspace checkout 404s the versioned startup script, because `app-root-path` resolves to the workspace root through the symlinked package. Fixed locally in react-starter's `src/server/server.ts` with `appRootPath: process.cwd()`. Deployed (non-hoisted) builds are unaffected.

**Setting rework (later the same day):** `USE_IDP` now has one primary home — `useIdp: true` in `ServerConfig` (`server.ts`). React-base shims the server global from it and writes `window.USE_IDP = <resolved>;` into every SSR response (next to the access-token hint, before the bundles), so the client — including its load-time saga choice — hydrates from the server's answer. The `DefinePlugin` route remains as the fallback for pure-CSR development, and the per-environment `.env` route still works; a build-time define wins over both globals. `WSFED_LOGIN` no longer needs setting when off: its dev-mode reads are `typeof`-guarded, so not defined means off. Verified: harness 72/72 + 9/9; prod and dev both boot IDP with no `USE_IDP` define and no `.env` entry; hint present in both SSR responses; signed-in round trip on the hint-driven client.

## Observations for follow-up

1. **Double `GET /api/security/users/@current`** on every session settle (two GETs, two CORS preflights, both 200) — seen on the post-callback load and on the `/board` full-page load. **Root cause found:** the starter renders under `React.StrictMode` (dev), which double-invokes `RouteLoader`'s effect, so `SET_NAVIGATION_PATH` is dispatched twice; `getRouteSaga` is registered with `takeEvery`, so two route sagas run concurrently and both reach switch 5 before either has put a session in state — `isAuthenticated` is still false in both, and `resolveSession`/`buildSession` had no single-flight, so both fetched user+groups. Dev-only for the doubling itself (StrictMode), but the concurrency is real in production for any two overlapping route changes. The anonymous case showed one `POST /idp/refresh` because refresh *does* have single-flight (KTD4) — which is the pattern the fix copies. **Fixed this session** (see above); verified one call each in dev and prod.
2. A raw `fetch` probe that 401s on `@current` was followed by an app `POST /idp/refresh` (200). Likely the second, lagging copy of the doubled route saga settling — re-check if it ever reappears now that the doubling is fixed.
3. The starter's "Board members only" link does a **full document navigation**, so the KTD3 no-network property only shows via pushState. Cosmetic for the example; could use the client-side `Link`.
4. `@current`'s response shows `failedLoginAttempts: 46` on the account used — housekeeping for whoever owns that user, not a defect.

## Still blocked (unchanged)

- AE16 deployed react-starter: `/members` and `/board` are still 404 on `preview-idp` (not deployed to the `idp` tenant).
- Release-gated (`releaseUri`) configuration in a browser; flag-off pass on a classic client site; react-starter lint (pre-existing ESLint crash).

## Access-token release × IDP (later the same day)

react-starter switched to a release-gated delivery config — `ACCESS_TOKEN` out of `.env`, `accessTokens: { latest/published: { token, requireLogin: true } }` in `server.ts` — and the flow was run against a real session:

| Check | Result |
|---|---|
| Startup | `[accessTokenApi] … require auth, registering /crb-api/auth/access-token` |
| SSR gating | Anonymous requests get the dynamic shell (`accessToken: null`, `releaseUri` set, no REDUX_DATA) — SSR never renders gated content or releases to itself |
| Signed-in release | `POST /crb-api/auth/access-token?versionStatus=latest` → 200, member resolved from the IDP access-token cookie alone (no `Authorization` header; no legacy `RefreshToken` exists in the jar) |
| Anonymous release | → 401 `{"message":"Not authenticated"}` |
| Anonymous journey | refresh 401 → `/idp/check?returnPath=%2F` → Keycloak; second visit with the guard armed → no redirect loop |
| Static routes | A static route (the welcome page) renders its static JSX while the release saga records the 401 — `RouteLoader` gates static routes on the *route's* `requireLogin`, not the release config. No gated content is fetched, so nothing leaks |

**Fixed with it:** the release POST fired twice on a signed-in load — the same StrictMode double-saga race as `@current`. `releaseAccessTokenShared` (routing sagas) now shares one in-flight release per uri; verified exactly one POST after login, and client navigations reuse the held token with no further release. Harness 72/72 after the change.

**Open:** the dynamic shell ships no `app.css` — under release gating every page is dynamic, so global/layout styles (body background, the login control's panel) render unstyled until/unless their chunks load. Pre-existing gap in the dynamic path, newly reachable; to be fixed separately.

## How this run was made

Headed Chrome via `agent-browser` against the dev server; network evidence from `agent-browser network requests/request`; Redux read by locating the store on the React fiber tree (`window.__store`). Reproduce: `npm run build:crb`, then `npm run dev` in `packages/react-starter` (`.env` already carries `USE_IDP=true`, `ALIAS=idp`).
