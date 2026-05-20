// Switched from default import to named imports: v8+ (ESM-only) has no default export,
// which would make queryString.parse and queryString.stringify silently undefined at runtime.
// Named imports work identically with the current v5 CJS build via Rollup's commonjs interop.
import { parse, stringify } from 'query-string';

export function queryParams(search) {
  return parse(
    typeof window != 'undefined' ? window.location.search : search || ''
  );
}
export const routeParams = staticRoute =>
  staticRoute && staticRoute.match ? staticRoute.match.params : {};

export const buildUrl = (route, params) => {
  // [query-string v6+] BEHAVIOUR CHANGE: sort defaults to true — output key order is now alphabetical.
  // Pass { sort: false } to preserve v5 insertion-order behaviour if URL shape is tested or cached.
  const qs = stringify(params);
  const path = qs ? `${route}?${qs}` : route;
  return path;
};

export const clientHostname = () =>
  `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
