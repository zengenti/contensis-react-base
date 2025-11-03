import { stringify, parse } from 'query-string';
import { a as cachedSearch } from './ContensisDeliveryApi-n2YHcRbB.js';

const now = () => {
  if (typeof window == 'undefined') {
    return Date.now();
  }
  return window.performance.now();
};

function fixFreeTextForElastic(s) {
  const illegalChars = ['>', '<', '=', '|', '!', '{', '}', '[', ']', '^', '~', '*', '?', ':', '\\', '/'];
  const illegalRegEx = new RegExp(illegalChars.map(c => '\\' + c).join('|'), 'g');
  s = s.replace(illegalRegEx, '');
  // s = s.replace(encodedRegEx, ''); // (m) => '\\\\' + m);

  return s;
}
/** `convertKeyForAggregation` and `parseKeyForAggregation` exists to prevent an
 *  auto-generated aggregation using a reserved keyword because Elasticsearch has a list of
 *  reserved keywords when it parses the response:
 *  `'location' is one of the reserved aggregation keywords we use a heuristics based
 *  response parser and using these reserved keywords could throw its heuristics off
 *  course. We are working on a solution in Elasticsearch itself to make the response
 *  parseable. For now these are all the reserved keywords: after_key, _as_string,
 *  bg_count, bottom_right, bounds, buckets, count, doc_count, doc_count_error_upper_bound,
 *  fields, from, top, type, from_as_string, hits, key, key_as_string, keys, location,
 *  max_score, meta, min, min_length, score, sum_other_doc_count, to, to_as_string, top_left,
 *  total, value, value_as_string, values, geometry, properties`
 */
const convertKeyForAggregation = key => `sf_${key}`;
const cleanseFieldIdForAggregation = fieldId => fieldId.replaceAll('[]', '');
const timedSearch = async (query, linkDepth = 0, projectId,
// get api instance from SSR context that is connected to the current request in SSR,
// fall back to the imported cachedSearch api that is not connected to the current SSR context
ssr = {
  api: cachedSearch
}) => {
  if (!query) return null;
  let duration = 0;
  const start = now();
  const payload = await ssr.api.search(query, linkDepth, projectId);
  const end = now();
  duration = Number((end - start).toFixed(2));
  return {
    duration,
    payload
  };
};
const getItemsFromResult = result => {
  const {
    payload
  } = result || {};
  if (payload) {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.items)) return payload.items;
    return payload;
  }
  return [];
};
const extractQuotedPhrases = searchTerm => {
  const pattern = new RegExp(/(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/gm);
  return (searchTerm.match(pattern) || []).map(match => match.replace(/"/g, ''));
};
const buildUrl = (route, params) => {
  const qs = stringify(params);
  const path = qs ? `${route}${route.includes('?') ? '&' : '?'}${qs}` : route;
  return path;
};

/**
 * Returns all params from the current route query string or static route
 * Supply static route argument if reading parameters from the route path
 * Supply location argument for the params to be read in SSR
 * @param staticRoute Matched static route from react-router 5 or 6
 * @param location location object containing at least pathname and search
 * @returns Keyed params object
 */
const routeParams = (staticRoute, location) => {
  var _staticRoute$match;
  // match.params is react-router-config/react-router@5 style
  // params is supplied with RouteObject in react-router@6
  const pathParams = (staticRoute === null || staticRoute === void 0 || (_staticRoute$match = staticRoute.match) === null || _staticRoute$match === void 0 ? void 0 : _staticRoute$match.params) || (staticRoute === null || staticRoute === void 0 ? void 0 : staticRoute.params) || {};
  const queryParams = parse(typeof window !== 'undefined' ? window.location.search : (location === null || location === void 0 ? void 0 : location.search) || '');
  return {
    ...pathParams,
    ...queryParams
  };
};
const callCustomApi = async (customApi, filters,
// get api instance from SSR context that is connected to the current request in SSR,
// fall back to the imported cachedSearch api that is not connected to the current SSR context
ssr = {
  api: cachedSearch
}) => {
  const apiUri = customApi.uri || '';
  let uri = buildUrl(apiUri, filters);
  if (!uri) throw new Error('uri is required to use customApi');
  if (typeof window == 'undefined') {
    if (!uri.startsWith('http')) uri = `http://localhost:3001${uri}`;
    const response = await fetch(uri);
    return await response.json();
  }
  const response = await ssr.api.fetch(uri);
  return await response.clone().json();
};
const removeEmptyAttributes = obj => {
  Object.entries(obj).forEach(([key, val]) => val && typeof val === 'object' && removeEmptyAttributes(val) || (typeof val === 'undefined' || val === null || val === '') && delete obj[key]);
  return obj;
};
const toArray = (obj, seperator = ',') => typeof obj === 'undefined' || obj === null ? obj : Array.isArray(obj) ? obj : obj.split(seperator);

// assumes array elements are primitive types
const areArraysEqualSets = (a1, a2) => {
  const superSet = {};
  for (const ai of a1) {
    const e = ai + typeof ai;
    superSet[e] = 1;
  }
  for (const ai of a2) {
    const e = ai + typeof ai;
    if (!superSet[e]) {
      return false;
    }
    superSet[e] = 2;
  }
  for (const e in superSet) {
    if (superSet[e] === 1) {
      return false;
    }
  }
  return true;
};

export { removeEmptyAttributes as a, cleanseFieldIdForAggregation as b, convertKeyForAggregation as c, areArraysEqualSets as d, extractQuotedPhrases as e, fixFreeTextForElastic as f, getItemsFromResult as g, callCustomApi as h, timedSearch as i, routeParams as r, toArray as t };
//# sourceMappingURL=util-DNeSxrGJ.js.map
