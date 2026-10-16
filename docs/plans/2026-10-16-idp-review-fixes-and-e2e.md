---
title: IDP session auth — review fixes, DRY pass, and the full e2e
date: 2026-10-16
plan: docs/plans/2026-10-12-1522-feat-idp-session-auth-plan.md
review: docs/plans/2026-10-16-idp-code-review.md
prior: docs/plans/2026-10-16-idp-e2e-results.md
---

# IDP session auth — fixes, refactor, and end-to-end verification

Everything the 16 Oct review surfaced has been worked through: nine of its ten
findings are fixed, one is recorded as pre-existing and deliberately left, four
DRY items landed and five were declined with a reason. All of it was then run
end to end in a real browser against two tenants — `react-starter` on `idp`, and
`nlgpsf-website` on `nlgpsf-temp-dev` — including a full Keycloak sign-in, a
group restriction, a logout, and a flag-off pass.

**Branch state:** `feat-contensis-idp` at `b073f295`, twelve commits on top of
`c957f2d3`. Nothing pushed.

## Fixes

Each was proven red before it was made green: the guard was temporarily neutered
(or the file stashed) and the harness was shown to fail, then shown to pass.

| # | Commit | Finding | What changed |
|---|--------|---------|--------------|
| 2 | `5113dc9c` | Open redirect — `sanitiseLocalPath` returned `//evil.com` | Reject a pathname starting with two slashes after the origin check. Three harness inputs from the review added. |
| 4 | `4efbfe0b` | `/idp/*` proxied on every site, including flag-off | `if (isIdpEnabled())` around the registration. Safe because `internalServer.ts:40` sets the global before `:51`. |
| 1 | `cc4e0eb4` | Saga switch decided at import, before `config.useIdp` | One `takeEvery` per action, each handler calling `isIdpEnabled()` when the action is handled. `redirectAfterSuccessfulLoginSaga` returns early under IDP. |
| 3 | `c33773a6` | Delivery 401 with a valid session redirected forever | The session check no longer clears the guard; Delivery escalation arms its own key (`DELIVERY_GUARD`). |
| 6 | `31ccd22a` | Anonymous visitor's `isLoading` stuck true with no `onRouteLoaded` | The loading state settles for everyone; only the *route* loading state is kept for protected routes. |
| 7 | `ed9ecd9c` | Shared release promise had no timeout | `RELEASE_TIMEOUT_MS` (15 s) on the release call, and `flight.then(forget, forget)` instead of a derived `.finally()`. |
| 9 | `0f49892e` | `withLogin`'s `loginUser` still required credentials | Signature now `(username?, password?) =>`, matching `useLogin`. |
| 10 | `2d131115` | Concurrent route sagas saw the armed guard and threw a 401 | The guard value carries the page-load id, so a redirect armed by *this* page load reads as pending, not spent. |
| 5 | `192ef1b1` | `GENERIC_ERROR_MESSAGE` / `idpRouteError` duplicated | New `idp/sagas/errors.ts`; the harness now asserts the thrown message text. |
| 8 | — | Released token outlives a cross-tab logout | **Not fixed.** Pre-existing, presentation only, identical on `master`. See the review's note. |

## Refactor

| # | Commit | Decision |
|---|--------|----------|
| D1 | `192ef1b1` | Landed with #5 — inside `src/user/idp/`, so KTD9 is unaffected. |
| D9 | `a93366a4` | Landed. One `(clientCredentials, isLoading)` builder behind `idpResolvingUserAction` / `idpSettledUserAction`, carrying the reducer-quirk note once. |
| D4 | `c634cd6c` | Landed via `enterprise-fetch` — see below. |
| D3 | `b073f295` | Landed. `idp/sagas/routeRequirements.ts` answers "does this route need a member, and which groups" from all three sources. **The drift was real and reachable**: `ensureAccessTokenSaga` calls the require-login saga with `requireLogin: true` and that saga settles the session with the same action, which the session check ignored — so on a release-gated site it saw a protected route as public. |
| D2 | — | **Deferred by agreement.** A shared single-flight helper would have to standardise the rejection semantics, and the three copies differ on purpose: `resolveSession` rethrows, `refreshSession` never rejects, `releaseAccessTokenShared` evicts via `.then(forget, forget)`. Unifying them is a behaviour change wearing a refactor's clothes. |
| D5, D6, D7, D8 | — | **Declined.** D6 was implemented and then reverted on the grounds that these are server-side files that never reach a client bundle, so the repetition costs nothing and the separate handlers keep their separation. D5 and D7 fail the same test. D8 is client-side but small; not worth a shared module for two constants. |

## enterprise-fetch

`src/util/fetch.ts` now holds the one configured instance every Contensis call
goes through, so the `AbortController` + `setTimeout` + `clearTimeout` dance is
written once and the two `5000` constants linked only by a comment are gone.

**Retries are off, deliberately.** The wrapper throws whatever it is told to
retry, so a retried status arrives as a thrown `Response` rather than the SDK
error callers classify — a retried 401 from `/idp/refresh` turned `no-session`
into `unknown` in the harness — and a retried stall multiplies a route's worst
case past the KTD4/KTD5 budget. Every call here is either a definitive answer or
already has its own retry.

Getting it to build surfaced two genuine defects in the package, both now fixed
and committed there:

1. **Every request failed on Node 18+.** `abort-controller` resolves to the
   native controller in the browser build but to its shim on Node, and undici's
   global `fetch` rejects a foreign signal: `RequestInit: Expected signal to be
   an instance of AbortSignal`. The signal is attached to every call, so this
   was not a timeout-only problem. Fixed by preferring `globalThis.AbortController`.
   Neither suite could see it: the browser specs pass because the browser path
   was always fine, and the Node specs replace global fetch with `fetch-mock`,
   which never validates the signal. The regression spec starts a real
   `node:http` server and uses the real global fetch.
2. **`tsconfig.json` `"module": "Node16"` silently un-bundled the build.**
   `@rollup/plugin-typescript` transpiles with the project's `module`, and
   Node16 emits CommonJS for `.ts`, so rollup received `require("./fetch-defaults")`
   and left every internal import external — six files of dangling requires
   where there should have been one bundle. `"moduleResolution": "bundler"`
   (with `module: ESNext`) is the fix for the `node10` deprecation that prompted
   the change.

CI also failed because the new Node-only spec sits in `cypress/integration/`,
where the webpack preprocessor tries to compile `node:http`. Excluded via
`excludeSpecPattern` rather than by hiding the import behind string
concatenation.

**2.0.3 is published and crb is bumped to `^2.0.3`** (staged with the
regenerated `package-lock.json`, which resolves to the registry tarball, not the
workspace link). Verified against the published artefact rather than the local
clone — unpacked to a temp directory and run under Node with the real global
fetch:

```
published 2.0.3 GET : OK 200 pong
timeout             : OK AbortError
```

and the artefact itself: `globalThis.AbortController` present, no dangling
internal imports in any of the six bundles, `browser` →
`dist/client/enterprise-fetch.esm.min.js`.

## End-to-end

Headed Chrome, real Keycloak sign-in, dev servers against the rebuilt library.

### react-starter × `idp`

| Check | Result |
|---|---|
| Anonymous `/` | refresh 401 → one `/idp/check` → one `/idp/login` → Keycloak. Then it stops. |
| Authorise request | `code_challenge_method=S256`, fresh `state` and `nonce`, `redirect_uri=http://localhost:3001/idp/callback` |
| Callback landing | `/` — `returnPath` honoured (R15) |
| Signed in | "Signed in as zengenti", Log out control |
| **Hydration console** | **Empty.** The `ServerConfig.useIdp`-only shape that #1 was about. |
| Cookies | Bearer, refresh, classic token, display name, plus identity-client's own `.Contensis.Auth.idp` — react-base writes none of them (R7) |
| Token grant | No browser-side `/token` call |
| `/members` | Renders signed in; **zero** `/idp/*` calls on that navigation (KTD12 cheap path) |
| `/board` (`requireLogin: [{ name: 'Board' }]`) | → `/account/access-denied?original_uri=/board` (R18), zero auth calls |
| Retry `/board` from access-denied | Same page again, zero auth calls, no loop |
| Logout | `/idp/logout` → end-session → signed out; one refresh 401 and one redirect after, no loop |
| Post-logout return path | ❌ **identity-client double-encode** — see follow-ups |

### Flag off (the review's R1/U6 gap)

`useIdp: false`, restarted:

- `Active login method: Classic Contensis login`
- `/members` → `/account/login?redirect_uri=/members` — classic behaviour, untouched
- **Zero `/idp/` requests**
- `POST /idp/refresh` → **404** (not proxied)
- `GET /idp/check` → the SSR app shell, carrying `window.USE_IDP = false`

### nlgpsf-website × `nlgpsf-temp-dev`

| Check | Result |
|---|---|
| Client bundle | `webpack-client-dev-config compiled successfully` — a second real consumer building against the enterprise-fetch-dependent library |
| Config shape | `useIdp: true` in `ServerConfig` only; SSR payload carries `window.USE_IDP = true` |
| **Hydration console** | **No mismatch.** 31 console lines, all of them nlgpsf's own pre-existing styled-components warnings about `variant` and `backgroundImg`. This is the config #1 was reported against. |
| IDP on temp-dev | refresh 401 → `/idp/check` → realm `contensis-nlgpsf-temp-dev` |
| Login | Full round trip; cookies include `ContensisCMSUserName` and `ContensisClassicToken`, and identity-client's cookie is scoped `.Contensis.Auth.nlgpsf-temp-dev` |
| Secure documents chain | `GET /secure-documents` **(Fetch) → 200** — nlgpsf's saga read the classic token out of react-base state and the endpoint accepted it |
| Hard load of `/account/user` while signed in | Bounced to `/account/login`, then to `/`. See follow-ups. |

### Two things I got wrong during the run, recorded so nobody re-chases them

- I navigated the browser directly at `/secure-documents` and reported its 500 as
  a bug. It is nlgpsf's own API endpoint, and its first middleware requires a
  `ContensisCMSUserName` **header** that a bare navigation cannot supply. The
  500 is correct; the page that calls it gets a 200.
- Earlier in the session I claimed the package's `browser` field shipped a broken
  bundle. That was read from a `dist/` that my own shortcut build had corrupted.
  The published artefact is fine.

## Follow-ups

1. **identity-client: logout double-encodes the return path.** react-base sends
   `/idp/logout?returnPath=%2Faccount%2Faccess-denied%3Foriginal_uri%3D%2Fboard`
   — encoded once, as AE7 specifies. Keycloak receives
   `post_logout_redirect_uri=…%253Foriginal_uri%3D%2Fboard` and redirects to
   `/account/access-denied%3Foriginal_uri=/board`, a path with a literal `%3F`
   in it. Logging out from any URL with a query string never returns you where
   you were, and the mangled path then becomes the next `returnPath`.
2. **SSR is session-blind, and app-level guards don't know that.** nlgpsf's pages
   render `<Redirect>` when `useLogin().isAuthenticated` is false. Under IDP the
   server render never resolves a session (R19), so a hard load of a protected
   page emits that redirect before the client can settle — signed in or not.
   Classic auth never had this because the server could read the cookies. Worth a
   decision: either the plan states that apps must not redirect on
   `isAuthenticated` during SSR, or `useLogin` needs to distinguish "anonymous"
   from "not yet known" on the server.
3. **`withLogin` erases its props.** `withLogin(WrappedComponent: React.ComponentType)`
   means the injected `loginUser` signature isn't observable to consumers, so #9's
   type fix is invisible from outside. Separate ticket.
4. **#8** stays open as recorded: any fix belongs in the release mechanism itself,
   for both flag states, not in an IDP-only hook.
5. The review's residual risks are unchanged by this work — notably one
   `POST /idp/refresh` per navigation for anonymous visitors, and the single-slot
   `lastOutcome` / `deliveryReloadPath` module state.

## What was not exercised in a browser

The Delivery-401 loop (#3), the hung release (#7), and the concurrent StrictMode
dispatch (#10) are proven in the harness and not in the browser: each needs a
state that is awkward to force against a live tenant — a member without Delivery
rights, a release endpoint that hangs, a double-dispatching build. Token
rotation on refresh is likewise harness-only.

## Reproducing

```
# harness (no test runner in the package — KTD11)
cd .logs/idp-harness && node harness.mjs unit      # 110/110
node harness.mjs server                            # 15/15  (hits live idp-dev)
node harness.mjs browser                           # bundle-in-a-browser smoke
node harness.mjs flagoff                           # classic path, flag off

# gates, in packages/contensis-react-base
npx tsc -p tsconfig.json --noEmit
npm run lint                                       # baseline 15 errors / 19 warnings, 0 in src/user/idp

# e2e
npm run build:crb                                  # the dev servers run the BUILT lib
npm run dev --workspace react-starter              # :3001, alias idp
npm run dev --workspace nlgpsf-website             # :3001, alias nlgpsf-temp-dev
```

The harness lives in `.logs/idp-harness` (untracked). It bundles the real `src/`
with esbuild and runs it under Node against a faked DOM; `harness.mjs` is the
Windows-safe runner, since `run.sh`'s PowerShell-quoting of `--define` breaks
under `pwsh`.
