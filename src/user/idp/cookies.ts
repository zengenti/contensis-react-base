/**
 * identity-client's cookies, read-only. The names are declared here rather than
 * imported from `CookieConstants`, so nothing in this folder can write one and
 * the module depends on no code the v5 clean-up deletes.
 *
 * Each read goes to `document.cookie` at the moment of the call: after
 * `POST /idp/refresh` the new access token must come from the browser, not from
 * a map captured earlier in the page. Two names are shared with react-base's
 * legacy cookies — under `USE_IDP` those legacy cookies are ignored, never
 * cleared.
 */

/** The Keycloak access token (a JWT) sent to Contensis APIs. */
export const IDP_ACCESS_TOKEN_COOKIE = 'ContensisSecurityBearerToken';

/** The legacy encrypted CMS security token, kept in step with the Keycloak
 *  session. This is what `selectUserSecurityToken` reports under `USE_IDP`. */
export const IDP_CLASSIC_TOKEN_COOKIE = 'ContensisClassicToken';

const readCookieValue = (name: string): string | undefined => {
  // Server rendering never reads the session, and there is no document.
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

export const readIdpAccessToken = () =>
  readCookieValue(IDP_ACCESS_TOKEN_COOKIE);

export const readIdpClassicToken = () =>
  readCookieValue(IDP_CLASSIC_TOKEN_COOKIE);

/** Both readable means there is something to build a session from; it still
 *  does not prove one. */
export const hasIdpSessionCookies = () =>
  !!readIdpAccessToken() && !!readIdpClassicToken();
