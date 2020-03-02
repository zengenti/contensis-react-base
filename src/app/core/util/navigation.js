import queryString from 'query-string';

export function queryParams(search) {
  return queryString.parse(
    typeof window != 'undefined' ? window.location.search : search
  );
}
export const routeParams = staticRoute =>
  staticRoute && staticRoute.match ? staticRoute.match.params : {};

export const buildUrl = (route, params) => {
  const qs = queryString.stringify(params);
  const path = qs ? `${route}?${qs}` : route;
  return path;
};

export const clientHostname = () =>
  `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

export const addHostname =
  typeof window == 'undefined' || window.location.host == 'localhost:3000'
    ? `https://${PUBLIC_URI /* global PUBLIC_URI */}`
    : clientHostname();
