# Keycloak login for published sites

**Ticket:** CHALKY-2080, "CRB: Update to support new Keycloak IDP". Neil Flatley implements and approves the work.
**Keycloak side:** KEYC-199, linked to CHALKY-2080 as Relates. Must be fixed before the first customer with MFA member login; it does not block `standard`.
**Detailed plan:** [Complete MFA-required published-site login via the BFF `/idp/*` session](../../plans/2026-07-21-001-fix-keyc-199-bff-session-login-plan.md). Proposed from the Keycloak migration; awaiting Neil's approval.
**Plain-English version of the plan:** [review copy](../../plans/2026-07-21-001-fix-keyc-199-bff-session-login-plan-plain-english.md), easier to read; the plan above stays the source.
**Last updated:** 2026-10-08

## What this document is about

On a tenant that has moved to Keycloak with MFA turned on for website members, a member completes the login page and the one-time code, comes back to the site, and is still logged out. No error appears. KEYC-199 records the bug; CHALKY-2080 is where react-base gets the fix, as part of supporting the new Keycloak login.

This document is the summary for discussing the change with Neil. It gives the main points in react-base terms, where they land in the code, what identity-client provides, and the questions Neil needs to answer. The plan has the detail: line references, design decisions, implementation units and review checks. It is one plan, to be implemented as a whole.

## Terms

| Term | Meaning here |
|---|---|
| identity-client, `/idp/*` | `zengenti-svc-identity-client`: the service that runs the Keycloak login for a site, on the site's own host, and writes the login cookies. Also called the BFF ("backend for frontend") |
| identity-keycloak | The Keycloak server itself, built from `zengenti-svc-identity`: the realm config, the user storage SPI that reads members from the CMS database, and the classic grants it refuses for MFA members |
| Realm | A tenant's configuration in Keycloak: login settings, session lengths, MFA |
| Access token / bearer | The Keycloak token sent to the Management API. `ContensisSecurityBearerToken` |
| id_token | A second token Keycloak returns with a login or refresh; identity-client uses it to write the classic token cookies |
| Classic security token | The existing Contensis session token react-base already stores as `contensisClassicToken`. Keycloak still issues one |

## The short version

1. **react-base's login can't work for MFA members on Keycloak.** Both `validateUserSaga` (through `IsAuthenticated`) and `LoginUser` (through `getCurrent`) get their tokens with the classic grants, and Keycloak refuses those for anyone who needs MFA.
2. **The member already has what react-base needs.** After a Keycloak login identity-client has written the access token and a refresh token as cookies on the site's own host, and it offers `/idp/refresh`, `/idp/check` and `/idp/logout` on that host.
3. **A site setting turns on Keycloak login.** With it off, react-base behaves as it does today.
4. **With it on, react-base reads the access token from its cookie every time it builds a Management API client,** in `getManagementApiClient`, and stores no token and no expiry. It refreshes through `/idp/refresh`, sends members who need to log in to `/idp/check`, and logs out through `/idp/logout`. It never uses a classic grant or `IsAuthenticated`.
5. **It keeps storing the classic security token,** because sites read it through `selectUserSecurityToken`.
6. **Four questions are for Neil.** The main one is how react-base knows a site uses Keycloak.

## Where things stand

| Item | Status |
|---|---|
| Plan and plain-English copy | Written 2026-10-08 against react-base `master` and the current identity-client. Untracked on branch `feat/keyc-199-bff-session-login`. Awaiting Neil's approval and answers to the questions below |
| react-base code | None. The branch is at `origin/master` (`29ab2e28`, 4.0.1-beta.22) |
| identity-client (`/idp/*`) | Built in `zengenti-svc-identity-client` and running on the test tenant `nlgpsf-temp-dev`. Production rollout is tracked under KEYC-302. No change needed for this work |
| `nlgpsf-website` | On react-base v3 (`^3.1.1-beta.16`). Needs a v3→v4 upgrade to use the fix. No ticket yet |
| Testing on a real site | Waits on the `nlgpsf-website` upgrade |

## Why login fails today

react-base logs a member in through two calls, and Keycloak rejects both for members who need MFA (KEYC-183):

- **Checking the login.** `validateUserSaga` calls `LoginHelper.GetCredentialsForSecurityToken`, which posts to `IsAuthenticated` in `contensis-app`. That endpoint logs the user in again on the server with their password and the `contensis_classic` grant.
- **Getting a token for the Management API.** `LoginUser` builds the client with the `contensis_classic_refresh_token` grant, and the first `getCurrent` call asks for a token through it.

## What changes in react-base

With the Keycloak login setting off, none of this runs.

- **Knowing a site uses Keycloak.** A site setting in the server config, passed to the browser the way the access-token feature passes its config. It is the same for every visitor, so it is safe in cached pages. As proposed; see question 1.
- **Nothing per-member in server-rendered pages.** Those pages are cached for up to an hour, which is why react-base already strips the `user` slice before serialising state (`webApp.tsx:352-355`). The plan adds no session flag, classic token or access token to them. The browser works out whether a session exists itself, by reading the cookies and calling `/idp/refresh` when one is missing.
- **One place builds clients.** `getManagementApiClient` reads the access token cookie at that moment, gives the client a far-future expiry date so the SDK never asks for a token itself, and passes no grant type. It takes the cookie source as an argument: `document.cookie` in the browser, and on the server the raw `Cookie` header of the request. The server can't use the sagas' cookie helper, because it is empty unless a site sets `enableSsrCookies`, and `nlgpsf-website` doesn't. Login, change password and the access-token release (question 2) all build their clients through it.
- **What is stored.** Redux holds no access token, refresh token or expiry. It keeps `contensisClassicToken`, which the browser reads from the `ContensisClassicToken` cookie, because sites read it through `selectUserSecurityToken`. `nlgpsf-website` sends it to its `/secure-documents` route to list a member's documents. `selectClientCredentials` on a Keycloak site returns only that field.
- **No cookie writes.** react-base never writes or deletes identity-client's cookies. Today `LoginUser` calls `SetLoginCookies` after a successful login, which writes 1-day copies of the access token and classic token. With the setting on, `LoginUser` skips that call.
- **Refreshing.** If the access token or classic token cookie is missing (for example after a browser restart), react-base calls `POST /idp/refresh` first. A 200 means there is a session; a 401 means there isn't. If the Management API returns 401, it refreshes once, builds a new client and retries once. Concurrent refreshes share one request.
- **Sessions that can't be recovered, and logged-out members.** react-base navigates to `/idp/check?returnPath=…` instead of `/account/login`. The change is made inside `handleRequiresLoginSaga`, so all three places that call it get it: protected content, the access-token saga, and routes marked `requireLogin`. A query parameter on `returnPath` limits this to one round trip; if the member comes back and still gets a 401, react-base shows an error instead of looping. When the server can already see there is no refresh cookie on a protected page, it redirects before rendering, using the existing redirect in `webApp.tsx`, with `no-store` cache headers so the redirect is never cached. react-base removes `securityToken`, `credentials` and `password` from `returnPath` first, matching names case-insensitively, because identity-client doesn't strip them.
- **Logout** navigates to `/idp/logout?returnPath=…`.
- **`refreshSecurityToken`** keeps its no-argument signature. It calls `/idp/refresh` and dispatches only the classic token; it builds no client.
- **Server rendering** never refreshes and never deletes cookies. Protected content is fetched during server rendering through the Delivery API, which only carries the forwarded login cookies, so a 401 there can't be fixed on the server. With a refresh cookie present, a protected page that gets 401 renders a state the browser recovers after hydration. That replaces both `do500` and the route reload that would otherwise repeat without limit.
- **Change password** keeps working for Keycloak members. Their passwords stay in the CMS database, which Keycloak reads at login, and `contensis-svc-security` checks and stores them without any grant.
- **The access-token release** (`authenticateRequest.ts`), if Neil agrees: with a refresh cookie present it uses the access token cookie instead of `ContensisCMSUserName`, and returns 401 instead of falling back to a classic grant, so the browser can refresh and retry.

Members of a site that switches to Keycloak log in once more after the switch, because their old react-base cookies are not a Keycloak session.

### Where it lands in the code

| File | Change |
|---|---|
| `src/models/config/ServerConfig.ts`, `src/util/SSRContext.tsx` | The setting, passed to the browser; a server helper that reads the refresh cookie from the raw request header |
| `src/user/util/CookieConstants.ts` | Names for `ContensisClassicToken` and `ContensisSecurityRefreshToken` |
| `src/user/util/ContensisManagementApi.ts` | `getManagementApiClient` builds Keycloak clients from the cookie |
| `src/user/util/LoginHelper.class.ts` | The `/idp/refresh` helper; `GetCachedCredentials` returns only the classic token; `LoginUser` refreshes and retries on 401 and skips `SetLoginCookies` and `ClearCachedCredentials`; `LogoutUser` goes to `/idp/logout` |
| `src/user/redux/sagas/login.ts` | `validateUserSaga` skips `IsAuthenticated`; `handleRequiresLoginSaga` sends members to `/idp/check` instead of `/account/login`; `refreshSecurityToken` |
| `src/user/redux/sagas/resetPassword.js` | `changePasswordSaga` builds its client through `getManagementApiClient` |
| `src/routing/redux/sagas.js` | A protected-content 401 with a session present renders a recoverable state instead of `do500` or a reload |
| `src/server/webApp.tsx` | Existing redirect, used for the server-side redirect to `/idp/check`, with `no-store` cache headers |
| `src/server/features/access-token-api/authenticateRequest.ts` | Cookie order and no classic fallback (question 2) |

## What identity-client provides

The `/idp/*` endpoints are served by `zengenti-svc-identity-client` on the published site's own host. There is no cross-origin access, so react-base calls them with relative URLs.

Cookies written after login:

| Cookie | Readable by page JavaScript | Lasts |
|---|---|---|
| `ContensisSecurityBearerToken` (Keycloak access token) | yes | 30 minutes |
| `ContensisSecurityRefreshToken` | no (server only) | up to 15 days without use (realm config; confirm in testing) |
| `ContensisClassicToken`, `ContensisCMSUserName` (classic security token, same value) | yes | until the browser closes |

Endpoints:

- **`POST /idp/refresh`**, with header `X-Contensis-Refresh`, writes a new access token cookie. It writes the classic token cookies again when Keycloak returns an id_token. Keycloak should return one, because the login asks for the `openid` scope (confirm in testing). If Keycloak rejects the refresh, the service deletes every login cookie itself and returns 401. If there is no refresh cookie, it returns 401 and deletes nothing. The refresh token can be used more than once; KEYC-180 may change that.
- **`GET /idp/check?returnPath=…`** sends a logged-out member to the Keycloak login (including MFA) and back. A logged-in member goes straight back; if a cookie is missing, it repairs the cookies first. "Logged in" here means identity-client's own session cookie is valid. That cookie is gone after a browser restart, so after a restart `/idp/check` goes to the login page. The member then skips typing their password and code only if they ticked "Remember me". That is why react-base restores a session after a restart with `/idp/refresh`, which only needs the refresh cookie.
- **`GET /idp/logout?returnPath=…`** deletes every login cookie, including the refresh cookie the page can't see, and ends the Keycloak session. Deleting cookies from the page is not enough, because the next `/idp/check` would log the member straight back in.

## Questions for Neil

1. **How react-base knows a site uses Keycloak.** Looking only for the `ContensisClassicToken` cookie doesn't work. That cookie is gone after a browser restart while the session is still valid, so the member would look logged out. A logged-out member has no cookie at all, so react-base would never send them to the Keycloak login. The options:
   - (a) the cookie only;
   - (b) a site setting only;
   - (c) a site setting decides whether the site uses Keycloak, and cookies decide whether to refresh or log in.

   **Recommendation: (c).** Something to check first: where `nlgpsf-temp-dev` sends logged-out members today.
2. **Whether the access-token release is part of this work.** The access-token feature has two login paths. `ensureAccessTokenSaga` is covered anyway, through `handleRequiresLoginSaga`. The open one is `authenticateRequest.ts`: on a Keycloak site it picks the classic token as the bearer and falls back to a classic grant. **Recommendation: include it.** Otherwise sites that protect their access token with `requireLogin` still fail for MFA members.
3. **The expiry-date bug on classic sites.** react-base stores the token expiry as text (`mapClientCredentials`). The SDK compares it as a date and treats the token as expired, so every client built from stored credentials asks for a new token with a classic grant. This happens on `master` today. Keycloak sites are not affected, because they store no expiry. **Recommendation: a separate ticket for classic sites,** with no dependency on this work.
4. **Where the new code goes.** The plan adds the Keycloak handling inside the existing functions. The alternative is a separate module that the sagas hand over to when the setting is on, which leaves the classic code untouched. **Recommendation: inside the existing functions,** as the plan is written; a separate module is a reasonable alternative if the number of checks in the classic functions feels unwieldy.

One smaller point is settled during implementation: the value of the far-future expiry date.

## Not part of this work

- No change to the `contensis-management-api` SDK, `zengenti-svc-identity-client`, `zengenti-svc-identity` or `contensis-app`.
- No test framework for react-base. Checks are typecheck, lint, build and review, then testing on a real site.
- The `nlgpsf-website` v3→v4 upgrade. Separate ticket, not yet filed.
- The expiry-date bug on classic sites (question 3).

## How we'll know it works

On `nlgpsf-temp-dev` after the upgrade, with member MFA on and the KEYC-200 bypass (`CONTENSIS_ALLOW_MFA_CLASSIC_GRANTS`) confirmed off:

- a logged-out member opening a protected page is sent to the Keycloak login, completes MFA, and sees their account page and their documents (which also confirms `/secure-documents` accepts the classic token issued through Keycloak);
- the network trace shows no `IsAuthenticated` call and no classic grant;
- after the access token cookie is deleted, the next request refreshes once and carries on;
- a protected content page, not only the documents route, loads for a logged-in member, including after a browser restart, without reloading in a loop;
- a logged-out request for a protected page gets a redirect to `/idp/check` with `no-store` cache headers;
- after closing and reopening the browser, both within 30 minutes and after longer, the member is still logged in without seeing a login page and still sees their documents;
- a logged-in member can change their password, and the next login accepts the new one;
- after logout, reloading the page shows no session.

## Suggested next actions

1. Neil reviews the plan and answers the questions above.
2. Commit the plan, its plain-English copy and this document on `feat/keyc-199-bff-session-login` so Neil can read them.
3. Add a short description to CHALKY-2080 pointing at the plan and this document.
4. File the `nlgpsf-website` v3→v4 upgrade ticket.
5. Confirm the KEYC-200 bypass is off on `nlgpsf-temp-dev`.
