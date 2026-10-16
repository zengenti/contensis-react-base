---
title: IDP Session Auth - Work Status
date: 2026-10-13
plan: docs/plans/2026-10-12-1522-feat-idp-session-auth-plan.md
---

# IDP Session Auth - Work Status (13 Oct 2026)

Status of `ce-work` against the plan, at the end of the second session. Nothing is committed and no branch was created: everything is in the working trees of `contensis-react-base` (on `master`) and `react-starter` (on `next`), left for manual review.

## Summary

- **All nine units have code or docs in place (U1–U9).** The module, the switches, the react-starter example and the write-up exist. Both packages build.
- **Tested so far:** a verification harness runs the real IDP code, plus a headless browser against react-starter's dev server with `USE_IDP=true`. Results: 72/72 unit-level checks, 9/9 server-side checks and 16/16 browser checks, plus a 2/2 flag-off regression pass. Three of those checks ran live against the `idp` tenant, alongside direct probes of the `/idp/*` endpoints.
- **One defect found and fixed this session:** anonymous visitors were stuck with `useLogin().isLoading === true`, so the starter's login control never showed "Log in".
- **Blocked:** a real Keycloak sign-in. `idp-dev.zengenti.com` is not reachable from this machine (VPN), and react-starter is not deployed to the `idp` tenant. Every check that needs real identity-client cookies is untested against the real services. The browser runs used forced responses instead.

## Unit status

| Unit | State | Notes |
|---|---|---|
| U1 Setting, global, startup log | Done, verified | Logs `Active login method: IDP (/idp/* session auth)` with `USE_IDP=true`, and `Classic Contensis login` without it (dev server, both runs). Precedence over `WSFED_LOGIN` checked in the harness. |
| U2 cookies, refresh, returnPath, navigation, guard | Done, verified | Every U2 scenario in the plan passes in the harness. A live refresh with no cookies classifies as `no-session`. |
| U3 Management client, session builder | Done, verified with forced responses | Sends a Bearer token and never a grant. 401 → one refresh and one retry. 503, a stall, or a groups 503 → `unknown`. |
| U4 Route sagas | Done, verified with forced responses | **Fixed:** the user state now settles for anonymous visitors (see below). The decision table is in `requireLogin.ts`. |
| U5 User-action sagas | Done, verified with forced responses | Login, logout, validate, `refreshSecurityToken` and change password all behave as the plan says. |
| U6 Switches 1–6 | Done | Flag-off regression passes on react-starter (see Evidence). Not yet run on a classic client build. |
| U7 Release reads access token only | Done, partly verified live | The live check is AE14's shape: a rejected access token plus a legacy `RefreshToken` gives `null` with no grant. The "classic token as Bearer" request is **blocked** (it needs a real classic token). |
| U8 react-starter example | Done (previous session), verified locally | Login control, `/members`, `/board` (group `Board`), access-denied page, and a `statusCode`-aware not-found page. AE16 on a deployed tenant is **blocked**. |
| U9 Write-up | Done this session | `docs/IDP_LOGIN.md`, linked from the README's `/user` section. It states that the "classic token as Bearer" result is still outstanding. |

## Changes this session

**Defect fix (U4/U5, KTD7, R26).** The IDP saga set puts `isLoading: true` when the store starts. Only a session, or a reset of a previously shown member, ever cleared it. So for an anonymous visitor the flag stayed true, and any component that follows the plan's guidance ("render nothing while `isLoading`") rendered nothing. The starter's "Log in" button never appeared. The harness reproduced it (two failing checks) before the fix.

- `session.ts`: new `idpSettledUserAction`, which sets `isLoading: false` and carries `clientCredentials` forward.
- `sagas/routeSession.ts`: puts it on a `no-session` or `unknown` outcome when nobody was shown and the route does not require login. Protected routes stay loading, because the require-login saga then navigates, retries or throws.
- `sagas/userActions.ts`: `VALIDATE_USER` settles the same way.

**U9.** Added `docs/IDP_LOGIN.md` and the README link.

Already in place from the previous session and re-verified here: U1–U7 code, the six switches, the `loginUser` optional-credential signature, and all of U8.

## Evidence

Automated gates (logs in `crb-workspace/.logs/run3/`):

| Gate | Result |
|---|---|
| react-base `npm run build` (tspc + rollup) | Pass |
| react-base `npm run lint` | 34 problems (15 errors, 19 warnings), the same as the pre-change baseline. None in `src/user/idp/`. |
| react-starter `tsc --noEmit` | 46 errors, all identical to the baseline (for example `src/server/debug.ts`). None new. |
| react-starter `npm run lint` | **Blocked.** ESLint 8.57 crashes loading `@typescript-eslint/no-empty-function` from the hoisted workspace dependencies. It does the same on the untouched baseline. Not worked around. |
| react-starter `npm run build` | Pass. `buildstartup` emits every `.env` key as `context.KEY = "value"`, so `USE_IDP=true` reaches `start.js` and `startup.js`. |

The verification harness is in `crb-workspace/.logs/idp-harness/`, deliberately outside both packages because KTD11 adds no test runner. `run.sh unit|server|browser|flagoff` runs it. It bundles the real `src/user/idp` code with esbuild. The unit run uses the real user reducer and redux-saga, with fake `document.cookie`, `location`, `sessionStorage` and `fetch`.

- **Unit (72/72).** Covers:
  - AE7, R13–R15 `returnPath` cases, including `//evil`, `/\evil`, `javascript:` and cross-origin `ReturnURL`.
  - The KTD8 guard: TTL, per-path keys, and blocked storage.
  - KTD4 refresh: single flight, the header, 401/403/503/network/5 s stall, and a cookieless 200 with no second POST.
  - KTD5 Management client: Bearer from cookie, no grant, 401 → refresh → retry, 401 twice, 503, a groups 503 (AE13), a 5 s stall, and a legacy `RefreshToken` ignored (AE5).
  - Sagas with the real reducer: AE1, AE3, AE4, AE6, AE10, AE11, AE15, R16 (`loginUser()` bypasses the guard), R17 `refreshSecurityToken`, R18 access-denied, R26, and AE9 change password (success, plus a wrong-password error surfaced in `changePassword.error`).
  - R7: `document.cookie` is never written.
- **Server (9/9).**
  - The startup method in each configuration (AE8).
  - `getRequestCredentials` with the flag off (unchanged) and on: access-token cookie only, header wins, no refresh token.
  - **Live** `authenticateRequest` against `cms-idp`: AE14's shape returns `null` and calls only `@current`.
- **Browser (16/16).** Headless Chromium against `USE_IDP=true npm run dev`. `/idp/*` and Management API answers were forced by request interception, the checklist's "devtools overrides" method.
  - S1: public page with a real localhost 404 for `/idp/refresh` → `unknown` → "Log in" renders, with one refresh and no redirect.
  - S2: "Log in" → `/idp/check?returnPath=%2F`.
  - S3: `/members?SecurityToken=x&page=2` with a 401 → `/idp/check?returnPath=%2Fmembers%3Fpage%3D2`.
  - S4: a 503 gives exactly two refreshes, then the "Something went wrong" view.
  - S5: bounced back from `/idp/check` → "We could not sign you in", with one redirect only.
  - S6: forced member session → "Signed in as Member B", Bearer header, no grant, no refresh. A client navigation makes no network call (KTD3). `/board` → access-denied with the member still shown. "Sign in as someone else" → `/idp/logout?returnPath=%2F`. All cookies, including a legacy `RefreshToken`, are untouched.
  - S7: "Log out" on `/members` → `returnPath=%2F`.
- **Flag-off regression (2/2).** No `/idp/*` request at all. `/members` redirects to `/account/login` as before.
- **SSR (AE12).** `GET /members` with identity-client cookies on the request renders an empty `app-root` (RouteLoader's existing behaviour for a protected route with nobody signed in). The payload holds no user slice.
- **Live contract probes** (no cookies, `preview-idp.cloud.contensis.com`):
  - Refresh with the header → 401. Without it → 403 `missing_header`.
  - `/idp/check` → 302 to `/idp/login` → Keycloak (PKCE).
  - `/idp/logout` → 302 to Keycloak end-session, expiring every identity-client cookie.

## Blocked

| What | Blocked by | Covers |
|---|---|---|
| A real Keycloak sign-in, and everything that needs real identity-client cookies | `idp-dev.zengenti.com` times out from here (VPN). The plan also notes localhost cannot reach `/idp/*`. | AE1, AE2, AE5, AE9, AE10, AE15 against real services (all passed with forced responses only) |
| AE16 deployed react-starter | react-starter is not deployed to the `idp` tenant (`/members` on the preview host is a 404), and how it gets deployed there is unconfirmed | U8 verification |
| The "classic token as Bearer" live request (KTD10) | Needs a real `ContensisClassicToken`, which needs a completed sign-in | U7, U9 |
| Release-gated (`releaseUri`) configuration in a browser | No release-gated configuration of react-starter exists. The server-side switch is verified. | U4 last scenario, U7 |
| Flag-off pass on a classic client site | Not attempted. It needs the client's v4 branch and its environment. | U6, AE8 |
| react-starter lint | Pre-existing ESLint/plugin crash (see Evidence) | U8 gate |

## Open points for review

1. **Changes outside the KTD1 switch list.** `src/user/hooks/useLogin.ts` and `src/user/redux/actions.ts` make `username`/`password` optional, so `loginUser()` type-checks with no arguments (R13, R17). The change is type-only and behaviour-neutral, but the DoD says modified classic files differ only by switch lines. Keep it, or ask sites to pass `undefined`?
2. **Switches 1 and 4 are decided at module load.** They pick a saga array and a registration, unlike the call-time reads elsewhere. This matches `LoginHelper.WSFED_LOGIN` and works because `startup.js`/`start.js` set the global before the bundle loads, but it means the setting can't change without a reload.
3. **Content-type-protected routes on a client navigation.** The route check only knows about the static route and an already-hydrated entry. For a protected content-type route reached by client navigation it settles anonymous, and then the require-login saga redirects. A component guard could see "not loading, anonymous" for that one tick. Static `requireLogin` routes are unaffected.
4. **react-starter's "Log in" on a classic (flag-off) build** calls `loginUser()` with no credentials. On a classic site that runs the classic login saga with `undefined`. Not clicked during the flag-off pass, to avoid sending empty logins to the real CMS. The example probably wants to send flag-off builds to `/account/login`. That would need it to know the mode, which the example currently avoids on purpose.
5. **`react-starter/.env` points at the `idp` tenant.** The previous session switched it (`ALIAS=idp`, `PROJECT=website`, `PUBLIC_URL=https://preview-idp.cloud.contensis.com`) and saved the original as `.env.bak-prs`. Both files are uncommitted. Restore or keep before committing.
6. **The previous session's leftovers** in `crb-workspace/.logs/` (baseline logs and `crb-baseline/`, a full copy of the repo used for lint comparison) are not part of either package and can be deleted.

## Next steps

1. On a machine with the VPN and a deployed react-starter on `cms-idp`, run the plan's manual checklist. Rows "IDP happy paths" and "Session hygiene" first, then the "classic token as Bearer" request, recording the result in `docs/IDP_LOGIN.md`.
2. Rerun `.logs/idp-harness/run.sh unit` after any change to `src/user/idp/`. It takes about 15 seconds, including two 5-second stall checks.
3. Decide open points 1 and 4, then run the flag-off pass on a client's v4 branch.
