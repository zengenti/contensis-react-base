# Keycloak login: tests

**Companion to:** [Keycloak login for published sites](README.md), the overview. This file holds the checks run on the test tenant before the react-base change, and the tests to run after it.
**Last updated:** 2026-10-26. The tests after the react-base change were brought in line with PR #30 (`master` `c416c44c`, code reading): tests 1, 2, 13, 18, 19, 27, 30, 32 and 34 changed on 2026-10-25, and test 34's note was corrected on 2026-10-26.

## Checks on the test tenant

Run read-only on `nlgpsf-temp-dev` on 2026-10-10, on the preview host and its CMS. The login was a Keycloak login through `/idp/check`, so the cookies came from the `contensis-web` client. The only account available was the CMS user `zengenti`, which is excluded from MFA; no website member account was used.

1. **Delivery API with the access token cookie: 403, then 200 after the KEYC-308 realm update** (re-checked by the KEYC-308 work on 2026-10-10, with the same account). See "Tokens and what accepts them" in [Keycloak login: details](keycloak-details.md).
2. **`security/users/@current` with a `contensis-web` token: confirmed, 200** on both the site host and the CMS host. The user-groups call was not tried.
3. **`/idp/refresh` restores the classic token cookies: confirmed.** With `ContensisClassicToken` and `ContensisCMSUserName` deleted and the refresh cookie kept, `POST /idp/refresh` returned 200 and both cookies were back. Whether `.Contensis.Auth` was rewritten can't be seen from the browser, because it is HttpOnly.
4. **Change password with a `contensis-web` token: not run.** No disposable member account was available.
5. **`Secure` cookies: confirmed for the cookies page JavaScript can see** (access token, classic token, user-name cookies): `Secure`, `SameSite=Lax`, `Path=/`, host-only. The HttpOnly refresh and session cookies can't be seen from page JavaScript; identity-client sets `Secure` on all cookies by the same rule.
6. **Logged-out visitor on a protected page:** `/account/user` redirects (302) to the site's own `/account/login`. On the test tenant's branch, that page has a "Sign in securely" button that goes to `/idp/check`, then to the Keycloak login with the `contensis-web` client and PKCE. The site defines no `requireLogin` routes; `/account/user` is protected by a component.

The next three were run on 2026-10-11 with `testUser1` as a member with no CMS role (groups Everyone and one "Level 1" group).

7. **User-groups call: confirmed.** The member's own groups return 200 with `Authorization: Bearer`; another user's groups return 403. With only the cookie and no header it returns 401: the security API never reads the cookie, so react-base must send the header itself. (With CMS groups, the call leaves them out of its answer.)
8. **Delivery API: confirmed, 200** with only the cookie and with the header. With `versionStatus=latest` the member also gets draft entries (1,777 against 1,629 published). That adds no draft access the public site doesn't already have. react-base requests `published` on live and staging hosts and `latest` on preview hosts, but a `?versionStatus=latest` query string overrides that on any host, on the server and in the browser. The site's own Delivery API access token, which is in the page's JavaScript, returns draft entries for that request on the test tenant's live host with no member cookie (1,777 against 1,629 published, 2026-10-12). Production `nlgpsf` was not probed. Management API entry requests return 403.
9. **Today's site after a member login with password and one-time code:** identity-client set the access token, classic token and name cookies for the member, and react-base still shows the member as signed out. That is KEYC-199 as expected. An earlier run showed a different user instead: react-base's own `RefreshToken` cookie, left from a `zengenti` login in the same browser, kept that session alive (test 28a covers it).

10. **Change password: confirmed** (2026-10-12, same member, who has MFA). `POST /api/security/users/{id}/credentials/password` with `Authorization: Bearer` and the current and new password returned 200, and the next Keycloak login accepted the new password.

All the checks that can run before the react-base change are done.

## Tests after the react-base change

These tests check that the react-base change delivers the fix described in the overview. Each one says what to do and what must happen. Run them on `nlgpsf-temp-dev` once `nlgpsf-website` is on a react-base build with the change (4.0.1-beta.24 or later) and `useIdp: true`.

Before starting:

- `Identity_UseKeycloak` and `Identity_EnableMFA` on; the realm has the KEYC-308 scopes; `CONTENSIS_ALLOW_MFA_CLASSIC_GRANTS` off.
- Accounts: a member with MFA set up, a member who has never set up MFA, and a member with no CMS permissions. None of them a CMS admin.
- Browser developer tools with the network log kept across navigations, and a way to block or slow one request (request blocking, throttling or a local response override).
- For the last group, a site on the same react-base build with the Keycloak setting off.

**Logging in**

Tests 1 to 3 need pages that react-base protects: a route marked `requireLogin` and a protected node. `nlgpsf-website` has no `requireLogin` routes today and protects `/account/user` with its own component, so either add one for testing or check that the site's own redirect goes to `/idp/check`.

1. Logged out, open a protected page in the browser. Expect one `POST /idp/refresh` that returns 401 (on a `requireLogin` route the site's loading component shows meanwhile), then a navigation to `/idp/check?returnPath=<that page>`, not `/account/login`.
2. Request a `requireLogin` route with no cookies from the command line. Expect a 200 with the page rendered for an anonymous visitor, `window.USE_IDP = true;` in its inline script, and the same `Surrogate-Control` header as a public page. The server does not redirect; the browser does, after hydration (test 1).
3. Open a protected page with `?securityToken=x&Credentials=y&PASSWORD=z` added. Expect the `returnPath` sent to `/idp/check` to contain none of the three.
4. Complete the password and the one-time code. Expect to land back on the protected page, logged in, with the account page and the member's documents showing.
5. Log in with the member who has never set up MFA. Expect Keycloak to ask for authenticator setup, then land back on the site logged in.
6. In the network log for tests 4 and 5, expect no `IsAuthenticated` call, no request to `/authenticate/connect/token` and no `contensis_classic` grant of either kind. Expect `security/users/@current` and the user-groups call to return 200 with an `Authorization: Bearer` header.
7. After login, check the cookies. Expect react-base to have written none: `ContensisSecurityBearerToken` still expires 30 minutes after it was issued, not after a day; `ContensisCMSUserName` is still a session cookie; no `RefreshToken` cookie exists.
8. Check redux state. Expect `clientCredentials` to hold only `contensisClassicToken`, and `selectUserSecurityToken` to equal the `ContensisClassicToken` cookie.
9. View the page source of a server-rendered page while logged in. Expect no access token, classic token or session flag in the HTML or the serialised state, and the same `Surrogate-Control` header as for a logged-out visitor.

**Refreshing**

10. Delete the `ContensisSecurityBearerToken` cookie and navigate. Expect one `POST /idp/refresh` with an `X-Contensis-Refresh` header to the site's own host, then the page loads logged in.
11. Delete the access token cookie on a page that makes several API calls at once. Expect exactly one `/idp/refresh`.
12. Stay idle on a page for more than 30 minutes, then navigate. Expect one refresh and no login page.
13. Replace the access token cookie's value with an invalid token and reload the page (a client-side navigation trusts the cookies already checked and makes no Management API call). Expect the Management API call to get 401, then one refresh, a retry that succeeds, and no cookies deleted by react-base.
13a. With the same invalid cookie, open a protected node. Expect the CMS-served Delivery API to answer as for an anonymous visitor using the site's access key, not 401 (the CMS ignores a token it can't validate). The member's access to the node comes back only after the refresh in test 13.
14. Close the browser completely and reopen it within 30 minutes. Expect to be logged in without a login page, the classic token cookies back after the first refresh, and the documents listed.
15. Repeat test 14 after more than 30 minutes. Same result.

**When the session can't be recovered**

16. Delete the access token and refresh cookies, then open a protected page. Expect `/idp/refresh` to return 401 and one navigation to `/idp/check`.
17. Do the same on a public page. Expect the member to be shown as logged out, with no redirect.
18. Make the retry fail: block or override `security/users/@current` to return 401 after a successful refresh. Expect one round trip through `/idp/check`, then the site's `notFoundComponent` with status 401, with no loop. Within 5 minutes the same path shows the error again; after that, one more redirect is allowed.
19. Block `/idp/refresh` (network error), slow it past the 5-second timeout, and override it to return 503, in three runs, each with the access token cookie deleted. Expect no cookies deleted and no redirect in every run. On a public page: the member is shown as logged out for that page load, and the next navigation recovers. On a protected page: one more `/idp/refresh` about a second later, then the site's `notFoundComponent` with status 503.

**Logging out**

20. Log out. Expect a navigation to `/idp/logout?returnPath=…`, every login cookie gone including the HttpOnly refresh cookie, and opening a protected page afterwards to show the Keycloak login form, not a silent login.

**Server rendering and protected content**

21. Logged in, open a protected content page directly (a full page load, not a client-side navigation), both a static route with `requireLogin` and a protected node. Expect no 500 and no repeated reload; the content appears after the page hydrates.
22. Logged in as a member without access to a protected node, open it. Expect one access-denied or login outcome, with no reload loop.
23. As the member with no CMS permissions, browse public and protected pages. Expect Delivery API requests to return 200 for content the member may see.

**Other features**

24. Change the password. Expect success with no classic grant in the network log, and the next Keycloak login to accept the new password.
25. If the site calls `refreshSecurityToken`, trigger it. Expect one `/idp/refresh`, no `authenticate()` call, and only the classic token dispatched.
26. On a page with `@contensis/forms`, submit a form while logged in. Expect it to succeed with no classic grant.
27. On a route protected by `accessTokens` with `requireLogin`, expect the release to succeed with the access token cookie and no classic grant. With an invalid access token cookie, expect the release to answer 401 and the browser to go to `/account/access-denied`; there is no refresh and retry.
28. With leftover cookies from the old react-base login (`RefreshToken`, a 1-day `ContensisCMSUserName`) and no Keycloak cookies, open a protected page. Expect no classic grant, a refresh that returns 401, and one Keycloak login.
28a. In a browser that holds an old react-base session for user A, log in through Keycloak as member B. Expect the site to show member B everywhere (header, account page, documents), never user A, and no classic grant made with A's leftover `RefreshToken`.

**Sites with the setting off**

29. On the site without the Keycloak setting, repeat login, refresh after deleting the access token cookie, change password and logout. Expect today's behaviour: `/account/login`, classic grants, and react-base's own cookies.

**In code review**

30. With the setting off, no code in `src/user/idp/` runs except the setting check. The changes that do reach sites with the setting off are expected: the shared access-token release call with its 15-second timeout, the `window.USE_IDP = false;` hint, the page hints written under `disableSsrRedux`, and the `NotFound` label for an unmapped 5xx.
31. No Keycloak code path can reach `GetCredentialsForSecurityToken`, `contensis_classic` or `contensis_classic_refresh_token`.
32. Only `createIdpManagementClient` builds Keycloak clients and sets the expiry, from a newly created date; the access token is read from the cookie at each call, never from module state.
33. `/idp/*` URLs are relative to the site; the refresh sends the header with same-origin credentials, has a timeout that doesn't use `AbortSignal.timeout`, and is shared across concurrent callers.
34. react-base never writes or deletes identity-client's cookies, and react-base's own server-side flows never call `/idp/refresh`. (The validate, refresh and change-password sagas have no server check, but on the server the refresh fails before any request and counts as unknown.)
