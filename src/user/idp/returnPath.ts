/**
 * Choosing and sanitising the `returnPath` handed to `/idp/*` (R13, R14, R15).
 *
 * A `returnPath` must be a local path. identity-client's own check is only
 * "starts with `/`", which would let an attacker-chosen `redirect_uri` on the
 * login route become a redirect to another host through a service we do not
 * own. So every candidate is resolved against the site's origin and accepted
 * only when the origin matches; anything else becomes `/`. That covers
 * `//host`, `/\host` (URL parsing normalises the backslash and resolves it off
 * site) and absolute cross-origin URLs.
 *
 * The three parameters that must never leave the browser — `securityToken`,
 * `credentials` and `password`, matched case-insensitively — are removed last,
 * after any substitution, so a token cannot ride along inside a
 * `redirect_uri` target. Other query parameters are kept.
 */

/** The site's classic login route. Declared here rather than imported from
 *  `LoginHelper` so the module survives the v5 clean-up unchanged (KTD9). */
export const LOGIN_ROUTE = '/account/login';

const NEVER_IN_RETURN_PATH = ['securitytoken', 'credentials', 'password'];

const firstParam = (params: URLSearchParams, name: string) => {
  const value = params.get(name);
  return typeof value === 'string' && value !== '' ? value : undefined;
};

/** Drop the parameters that must never be sent in a `returnPath` (R15). */
const stripNeverSentParams = (url: URL) => {
  const names: string[] = [];
  url.searchParams.forEach((_value, name) => {
    if (NEVER_IN_RETURN_PATH.includes(name.toLowerCase())) names.push(name);
  });
  names.forEach(name => url.searchParams.delete(name));
  return url;
};

const safeHref = (href: string): URL | null => {
  try {
    return new URL(href);
  } catch {
    return null;
  }
};

/**
 * Resolve a candidate to a local path on this origin, or `/` when it is not
 * one. Keeps path, query and hash.
 */
export const sanitiseLocalPath = (
  candidate: string | null | undefined,
  origin: string
): string => {
  if (typeof candidate !== 'string' || candidate.trim() === '') return '/';

  let resolved: URL;
  try {
    resolved = new URL(candidate, origin);
  } catch {
    return '/';
  }

  // Covers an absolute URL to another host, a protocol-relative `//host`, a
  // `/\host` (parsed as an authority) and non-http schemes such as
  // `javascript:` (no origin at all).
  if (!origin || resolved.origin !== origin) return '/';

  const cleaned = stripNeverSentParams(resolved);
  return `${cleaned.pathname}${cleaned.search}${cleaned.hash}` || '/';
};

/**
 * The `returnPath` for a trip to `/idp/check` (R13).
 *
 * Normally the current path. When the current path *is* the site's login
 * route, the page's own target is used instead — `redirect_uri` (the react-base
 * classic login hand-off) or `ReturnURL` (the asset/IIS hand-off) — falling
 * back to `/`.
 */
export const getLoginReturnPath = (currentHref: string): string => {
  const current = safeHref(currentHref);
  if (!current) return '/';

  const { origin, pathname, searchParams } = current;

  if (pathname === LOGIN_ROUTE) {
    const target =
      firstParam(searchParams, 'redirect_uri') ??
      firstParam(searchParams, 'ReturnURL');
    return sanitiseLocalPath(target, origin);
  }

  return sanitiseLocalPath(currentHref, origin);
};

/**
 * The `returnPath` for a trip to `/idp/logout` (R14): the path the caller
 * asked for, otherwise the current path, otherwise `/` when the current route
 * requires login (so a logout from a members area lands somewhere public).
 */
export const getLogoutReturnPath = ({
  redirectPath,
  currentHref,
  routeRequiresLogin = false,
}: {
  redirectPath?: string;
  currentHref: string;
  routeRequiresLogin?: boolean;
}): string => {
  const current = safeHref(currentHref);
  const origin = current?.origin || '';

  if (redirectPath) return sanitiseLocalPath(redirectPath, origin);
  if (routeRequiresLogin) return '/';
  return sanitiseLocalPath(currentHref, origin);
};
