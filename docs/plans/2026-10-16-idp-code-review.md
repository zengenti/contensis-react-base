---
title: IDP session auth - initial code review (PR #30, draft)
date: 2026-10-16
plan: docs/plans/2026-10-12-1522-feat-idp-session-auth-plan.md
prior: docs/plans/2026-10-16-idp-e2e-results.md
---

# IDP session auth — initial code review (16 Oct 2026)

Multi-agent review of PR #30 (`feat-contensis-idp`, draft), committed range `29ab2e28..a8add1d4` (33 files). Uncommitted working-tree changes (rebuilt `cjs/`/`esm/`, config files, untracked plan copies, the nlgpsf e2e section) were not reviewed as code, but the nlgpsf results were considered.

**Reviewers:** correctness, security, adversarial, reliability, api-contract, testing, maintainability, agent-native. Every P1 and every judgement-call P2 was checked by an independent validator. #4, #5 and #9 were verified directly.

**Verdict: not ready to merge (expected for a draft).** Three P1s, all local fixes rather than design changes. No fixes have been applied.

> **Superseded on 16 Oct.** Everything below has since been worked through — nine
> of the ten findings fixed, #8 recorded as pre-existing, and the whole set run
> end to end in a browser. Outcomes are in
> `2026-10-16-idp-review-fixes-and-e2e.md`. This document is left as the review
> as it was made, including the parts that turned out to be wrong.

## P1 — High

| # | File | Issue | Reviewer | Confidence |
|---|------|-------|----------|------------|
| 1 | `src/user/redux/sagas/login.ts:34` | Saga switch decided at import, before `config.useIdp` is applied | correctness, adversarial, maintainability, testing, api-contract | 100 |
| 2 | `src/user/idp/returnPath.ts:70` | `sanitiseLocalPath` returns `//evil.com` for dot-segment input (open redirect) | security | 75 |
| 3 | `src/user/idp/sagas/routeSession.ts:160` | A Delivery 401 with a valid session redirects to `/idp/check` forever | adversarial | 75 |

- **#1** — `loginSagas` (and `resetPasswordSagas` in `resetPassword.js`) call `isIdpEnabled()` at module import. The import chain `internalServer.ts → webApp.tsx → redux/sagas → user/redux/sagas/login.ts` is static, so this runs before `start()` sets `global.USE_IDP` from `config.useIdp` (`internalServer.ts:40`).
  - Effect: a site that sets only `ServerConfig.useIdp` runs the classic login/reset sagas on the server and loses `idpUserSagas`' initial `isLoading: true`. Server markup and the client's first render then disagree on every SSR request (hydration mismatch for anything reading `useLogin().isLoading`).
  - This is exactly nlgpsf's configuration; its "SSR renders" result is consistent because the symptom is a React console warning, not a crash. Worth checking the browser console there.
  - Fix: decide when the action is handled — one `takeEvery` per action whose handler calls `isIdpEnabled()`, as every other switch in the PR already does.
- **#2** — `new URL('/.//evil.com', origin)`, `/a/..//evil.com` and `https://<origin>//evil.com` keep the site's origin but give pathname `//evil.com` (verified in node).
  - The value flows `getLoginReturnPath → goToIdpCheck → /idp/check?returnPath=%2F%2Fevil.com`. Per the plan, identity-client only checks "starts with /", so nothing downstream catches it.
  - Vector: `/account/login?redirect_uri=/.//evil.com`, then the visitor signs in. nlgpsf's classic login form is live on that route. `getLogoutReturnPath(redirectPath)` uses the same function.
  - Fix: after the origin check, return `/` when the pathname starts with two slashes (`/^[/\\]{2}/`). Add the three inputs above to the harness.
- **#3** — `/idp/check` is a full-page navigation, so the module-level reload marker (`deliveryReloadPath`) is lost while the sessionStorage guard survives. On return, `idpRouteSessionSaga` resolves a valid session and clears the guard; a Delivery 401 that persists (e.g. the member lacks Delivery rights) re-arms and redirects again, without limit. Breaks R16.
  - Fix: don't clear the guard in `idpRouteSessionSaga`. Clear it only after a route loads with no auth error, or give the Delivery-401 escalation its own guard key that session resolution never clears.

## P2 — Moderate

| # | File | Issue | Reviewer | Confidence |
|---|------|-------|----------|------------|
| 4 | `src/server/features/reverse-proxy/index.ts:21` | `/idp/*` proxy registered on every site, including flag-off | correctness, security, adversarial | 100 |
| 5 | `src/user/idp/sagas/deliveryAuthError.ts:38` | `GENERIC_ERROR_MESSAGE` and `idpRouteError` duplicated from `requireLogin.ts` | maintainability | 100 |
| 6 | `src/user/idp/sagas/routeSession.ts:172` | Anonymous visitor's `isLoading` stuck `true` when the app has no `onRouteLoaded` | correctness | 75 |
| 7 | `src/routing/redux/sagas.js:102` | Shared release promise has no timeout; a hang blocks later navigations | reliability (P1 → P2) | 75 |
| 8 | `src/routing/redux/sagas.js:125` | Released Delivery token outlives a logout in another tab | adversarial | 75 |

- **#4** — Flag-off classic sites now forward `/idp/*` to the preview web host with `xfwd: true`, shadowing any app route under `/idp`. `ConfigureReverseProxies` runs after `start()` sets the global, so `if (isIdpEnabled()) contensisIdpProxy(idpProxy, app);` is safe. Consider dev-only as well (the comment says varnish maps it in production).
- **#5** — `deliveryAuthError.ts` already imports from `requireLogin.ts`; export both from there. See also the DRY section.
- **#6** — `getRouteSaga` only calls `handleRequiresLoginSaga` when `withEvents.onRouteLoaded` returns `requireLogin` (`sagas.js:212`, `:516`). react-starter defines that hook, which is why its e2e passed. Without it, nothing settles the loading state and the route never redirects. Fix: always put `idpSettledUserAction` when nobody was shown (keep only the route loading state for protected routes).
- **#7** — Before this PR a hung release only stalled one navigation. Now the never-settling promise stays in `releasesInFlight` until a full reload. Add an `AbortController` timeout like `refresh.ts`. Minor: `flight.finally(...)` creates a derived promise that becomes an unhandled rejection if the flight rejects.
- **#8** — Release-gated (`accessTokens`) sites only. The IDP route check correctly clears the member after a cross-tab logout, but `ensureAccessTokenSaga` short-circuits on `config.accessToken`, so gated content keeps loading. Fix: drop `config.accessToken` (and the SSR context copy) when the identity clears or changes.
  - **Not fixed (17 Oct).** Real, but pre-existing and narrower than it reads. The released token is the static configured project token (`res.json({ accessToken: accessToken.token })`, `access-token-api/index.ts:80`) — the same string every eligible member is handed, and nothing revokes it on logout — so "released for B, used by C" is not a cross-user leak. What is left is presentation only: a logged-out visitor in a tab that was never reloaded keeps the gated view until they do reload, and both IDP identity changes (`/idp/check`, `/idp/logout`) are full loads in the tab they happen in. `if (config.accessToken) return true` and the config mutation are byte-identical on `master` (`29ab2e28`), so classic sites have always behaved this way; an IDP-only hook would fix one flag state and leave the other. Any change belongs in the release mechanism itself, for both.

## P3 — Low

| # | File | Issue | Reviewer | Confidence |
|---|------|-------|----------|------------|
| 9 | `src/user/hocs/withLogin.tsx:41` | HOC's `loginUser` still requires credentials, unlike `useLogin` | api-contract | 100 |
| 10 | `src/user/idp/sagas/requireLogin.ts:129` | Concurrent route sagas: the second sees the armed guard and throws a 401 error | adversarial | 75 |

- **#9** — Same type-only widening as the status doc's open point 1; decide them together.
- **#10** — Reachable by code inspection (StrictMode double dispatch, `takeEvery`), but the post-fix StrictMode retest saw no flash. `takeLatest` for `SET_NAVIGATION_PATH`, or single-flight on the arm-and-redirect step, would close it.

## Requirements completeness

Most requirements are met. Partially met:

- **R15** — returnPath rule bypassable (#2).
- **R16** — redirect limit fails for Delivery 401s (#3).
- **R19 / R26** — server/client agreement (#1) and the loading state (#6).
- **R27** — released token after a cross-tab logout (#8, not fixed: pre-existing, presentation only).
- **R1 / U6** — a flag-off site gains the `/idp/*` route (#4); the classic flag-off pass is still outstanding.

## Rejected during validation

- **Login guard fails open when sessionStorage is blocked** — accepted trade-off in the plan ("Considered and not built", with a revisit trigger).
- **Route login logic duplicated between classic and IDP** — required by R4/R5/KTD9.
- **404 responses miss the `window.USE_IDP` hint** — status ≥ 404 sets `accessMethod.STATIC` (`webApp.tsx:471`) and renders `templateHTMLStatic` with `{{LOADABLE_CHUNKS}}` emptied (`html.ts:53-59`), so no client bundle runs. Matches R3.

## Testing gaps

- **`cssModuleStyles` fix (`03e7197e`)** — the e2e doc committed ~70 s later still lists "dynamic shell ships no app.css" as open, with no recorded check of the fix.
- Untested paths:
  - the 403 branches in `deliveryAuthError.ts`
  - `releaseAccessTokenShared`, which flag-off release flows also use
  - the server-side (`isSSR`) branches — the harness always fakes `window`
  - the `NotFound` 5xx label
  - flag-off `/idp/*` routing
  - a server configured only through `ServerConfig.useIdp`
  - `sanitiseLocalPath` with dot-segment / double-slash pathnames

## Residual risks

- Anonymous visitors make one `POST /idp/refresh` on every client navigation (a 401 is not memoised).
- `lastOutcome` and `deliveryReloadPath` are single module-level slots; overlapping route sagas for different paths can overwrite each other.
- On a Management API 5xx with a member shown, the route check clears the member for that load.
- The `/idp/*` proxy error handler logs but never writes a response.
- The `as unknown as` cast in `managementClient.ts:100` may be unnecessary (not independently verified).
- Open-redirect safety ultimately also depends on identity-client: a direct link to `/idp/check?returnPath=…` skips react-base's sanitiser.
- Adoption notes from nlgpsf: `/account/login` still shows the classic form, and "Forgotten password?" still uses the classic reset flow.
- **#3 fix, accepted trade-off (17 Oct).** The delivery-scoped guard key is disarmed by its 5-minute TTL, by `logoutUser()`, or by moving to another path — not by a successful route load. Clearing on success needs a hook in `getRouteSaga` after the Delivery fetch succeeds, because the only existing clear point, `memberRoute`, runs *before* the content fetch on release-gated sites (via `ensureAccessTokenSaga`) — which is what re-opened the loop with a shared key. Worst case: a member who took one delivery escalation sees the error page instead of a sign-in redirect on that path for up to 5 minutes. Deliberately left as the TTL's problem rather than putting IDP state into classic routing.

## Suppressed (low confidence, not validated)

About 8 findings, mainly: identity changing in another tab during an in-flight `buildSession`; a refresh storm when the `ContensisClassicToken` cookie is missing; two tabs spending the same refresh cookie; the Delivery reload marker never being cleared on success; `refreshSecurityToken` updating the classic token but keeping the old user.

## DRY opportunities

Separate pass for duplication introduced by the diff, inside `src/user/idp/**` and against existing helpers elsewhere in `src/`. Classic-vs-IDP duplication is required by R4/R5/KTD9 and is not listed. Every suggestion below keeps to KTD9: shared code goes inside `src/user/idp/` or a neutral `src/util/` file, never anything the v5 clean-up deletes.

| # | Opportunity | Copies | Extract to | Effort | Priority |
|---|-------------|--------|------------|--------|----------|
| D1 | `GENERIC_ERROR_MESSAGE` + `idpRouteError()` verbatim (= finding #5) | `idp/sagas/requireLogin.ts:64-65,72-76`; `idp/sagas/deliveryAuthError.ts:38-45` | export from `requireLogin.ts`, or new `idp/sagas/errors.ts` | S | P2 |
| D2 | Single-flight promise pattern written 3 times, with different error handling | `idp/session.ts:127-152`; `idp/refresh.ts:34,104-125`; `routing/redux/sagas.js:99-109` | neutral `src/util/singleFlight.ts` (single-slot + keyed variants) | S/M | P2 |
| D3 | "Does this route require login" worked out in two places | `idp/sagas/routeSession.ts:102-113`; `idp/sagas/requireLogin.ts:165-176` | `idp/sagas/routeRequirements.ts` returning `{ requiresLogin, requiresGroups }` | M | P2 |
| D4 | `fetch` + `AbortController` timeout, and two `5000` ms constants linked only by a comment | `idp/refresh.ts:30,41-62`; `idp/managementClient.ts:34,65-83` | `idp/fetchTimeout.ts` + one shared constant | S | P3 |
| D5 | SSR hint `<script>` assembled three times | `server/webApp.tsx:302`, `:388`, `:391` | local `hintsScript()` joining the non-empty hints | S | P3 |
| D6 | `contensisIdpProxy` copies `deliveryApiProxy` almost line for line | `server/features/reverse-proxy/index.ts:55-81` vs `:83-106` | local `registerProxy({ paths, target, label, extraOptions })` | S | P3 |
| D7 | Cookie parse + Bearer extraction repeated in both branches | `server/features/access-token-api/authenticateRequest.ts:34-41` vs `:47-61` | local `parseRequestCookies(req)` / `bearerFromAuthHeader(req)` | S | P3 |
| D8 | `LOGIN_ROUTE` / `ACCESS_DENIED_ROUTE` declared independently | `user/util/LoginHelper.class.ts:34-35`; `idp/returnPath.ts:20`; `idp/navigation.ts:20` | neutral `src/util/routes.ts` imported by both (never import from `LoginHelper`) | S | P3 |
| D9 | `idpResolvingUserAction` / `idpSettledUserAction` differ by one boolean | `idp/session.ts:189-210` | settled delegates to a shared `(cc, isLoading)` builder | S | P3 |

- **D2** — The three copies already behave differently. `resolveSession` rethrows on rejection, `refreshSession` never rejects (returns `unknown`), and `releaseAccessTokenShared` evicts through a derived `.finally()` promise (the unhandled-rejection note in #7). A shared helper should standardise on never rejecting. It is also the natural place to add the missing timeout from #7.
- **D3** — The DRY reviewer reports drift: `requireLogin.ts` also merges `action.requireLogin`, while `routeSession.ts`'s check does not. The validator for the earlier maintainability finding traced that `action.requireLogin` is not yet set when `routeSession.ts` runs (`ensureAccessTokenSaga` adds it afterwards), so there is no behaviour difference today. Extracting one helper still removes the risk, and would be the place to fix #6's reliance on the previous route's entry.
- **D8** — Both IDP files say why they do not import `LoginHelper` (KTD9). A neutral constant removes the drift risk without breaking that. Low urgency.
- **D4, D5, D6, D7, D9** — Small local tidy-ups; D6 pairs well with the #4 gate.

**Looked at, not worth it:**

- `idp/cookies.ts` versus `CookieHelper`: KTD9, and the IDP module needs a fresh read on every call.
- `buildUserAndGroups` versus `LoginHelper.GetUserDetails`, and `getAccessDeniedRoute` versus `LoginHelper.GetAccessDeniedRoute`: KTD9.
- `isWsFedLoginEnabled` versus `LoginHelper.WSFED_LOGIN`: KTD9. The `LoginHelper`/`OidcUserManager` copy of that check predates this PR.
- `cssModuleStyles`: this diff removed duplication there.
- `returnPath.ts` versus `util/navigation`: the security-sensitive URL handling is deliberately separate.
- `IDP_ACCESS_TOKEN_COOKIE` equals `BEARER_TOKEN_COOKIE`: documented in `cookies.ts:11-14`. Drift risk only.

## Fix order

1. #2 and #4 — small, localized edits.
2. #1 — the saga switch.
3. #3 — the guard-clearing rule.
4. #6, #7, #8, then #5 / DRY items.

## Resolution (same day)

Taken in the order above. Detail, evidence and the browser run are in
`2026-10-16-idp-review-fixes-and-e2e.md`.

| Item | Outcome |
|---|---|
| #1, #2, #3, #4, #5, #6, #7, #9, #10 | Fixed — `5113dc9c`, `4efbfe0b`, `cc4e0eb4`, `c33773a6`, `31ccd22a`, `ed9ecd9c`, `0f49892e`, `2d131115`, `192ef1b1` |
| #8 | Not fixed — pre-existing, presentation only; see the note above |
| D1, D3, D4, D9 | Landed (`192ef1b1`, `b073f295`, `c634cd6c`, `a93366a4`) |
| D2 | Deferred — would change rejection semantics that differ on purpose |
| D5, D6, D7, D8 | Declined — server-side repetition that never reaches a client bundle; D6 was built and reverted |
| Testing gaps | Closed: flag-off routing, `ServerConfig.useIdp`-only hydration, `sanitiseLocalPath` dot-segments, `releaseAccessTokenShared`, the 403 branches. Still unexercised in a browser: the Delivery-401 loop, a hung release, concurrent StrictMode dispatch, token rotation, and the `isSSR` branches (the harness always fakes `window`) |
| R1 / U6 | Now proven: flag-off makes zero `/idp/*` request, `POST /idp/refresh` 404s, and `/idp/check` falls through to the app shell with `window.USE_IDP = false` |
| R15, R16, R18, R19, R26, R27 | R15/R16/R18/R26 proven in the browser; R19 proven by the clean hydration console; R27 left as #8 |

Two of the review's own claims did not survive contact with the browser: the
`/idp/*` proxy error handler writing no response is still true, but the
open-redirect residual risk note about identity-client turned out to matter more
than the react-base side, because identity-client double-encodes the logout
return path. That is filed as a follow-up against identity-client, not here.
