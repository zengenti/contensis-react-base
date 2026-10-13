/**
 * identity-client's cookies (KTD9).
 *
 * The names are declared here, not imported from `CookieConstants`, so the IDP
 * module depends on nothing the v5 clean-up deletes (R5) — and so nothing in
 * this folder can reach a cookie write or delete (R7). Reads are a fresh
 * `document.cookie` read at the moment of the call: after `POST /idp/refresh`
 * the new access token must be read from the browser, never from a cookie map
 * captured earlier in the page.
 *
 * Two of these names are shared with react-base's legacy login cookies
 * (`ContensisSecurityBearerToken`, `ContensisCMSUserName`). Under `USE_IDP` the
 * legacy `RefreshToken` cookie and the legacy copies of those two are ignored —
 * never read, never cleared (R6).
 */

/** The Keycloak access token (a JWT) sent to Contensis APIs. */
export const IDP_ACCESS_TOKEN_COOKIE = 'ContensisSecurityBearerToken';

/** The legacy encrypted CMS security token, kept in step with the Keycloak
 *  login session. Written by identity-client alongside `ContensisCMSUserName`.
 *  This is the value `selectUserSecurityToken` reports under `USE_IDP` (R12). */
export const IDP_CLASSIC_TOKEN_COOKIE = 'ContensisClassicToken';

const readCookieValue = (name: string): string | undefined => {
  // Server rendering never reads the session (R19), and there is no document.
  if (typeof document === 'undefined' || !document.cookie) return undefined;

  const prefix = `${name}=`;
  for (const entry of document.cookie.split(';')) {
    const cookie = entry.trim();
    if (!cookie.startsWith(prefix)) continue;
    const value = cookie.slice(prefix.length);
    if (!value) return undefined;
    try {
      return decodeURIComponent(value);
    } catch {
      // A value we cannot decode is still the value the browser holds.
      return value;
    }
  }
  return undefined;
};

/** Read the access token cookie now. Undefined when missing or empty. */
export const readIdpAccessToken = () =>
  readCookieValue(IDP_ACCESS_TOKEN_COOKIE);

/** Read the classic token cookie now. Undefined when missing or empty. */
export const readIdpClassicToken = () =>
  readCookieValue(IDP_CLASSIC_TOKEN_COOKIE);

/**
 * Cookie presence alone never proves a session, but when both are readable
 * there is something to build a session from and no refresh is needed (KTD3).
 */
export const hasIdpSessionCookies = () =>
  !!readIdpAccessToken() && !!readIdpClassicToken();
