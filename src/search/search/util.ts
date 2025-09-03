import { parse, stringify } from 'query-string';
import { now } from './performance';

import { Entry } from 'contensis-delivery-api/lib/models';
import { PagedList, Query } from 'contensis-core-api';
import { CustomApi } from '../models/Search';
import { TimedSearchResponse } from '../models/SearchUtil';
import { SearchParams } from '../models/SearchActions';
import { CachedSearch, cachedSearch } from '~/util/ContensisDeliveryApi';

export function fixFreeTextForElastic(s: string): string {
  const illegalChars = [
    '>',
    '<',
    '=',
    '|',
    '!',
    '{',
    '}',
    '[',
    ']',
    '^',
    '~',
    '*',
    '?',
    ':',
    '\\',
    '/',
  ];

  const illegalRegEx = new RegExp(
    illegalChars.map(c => '\\' + c).join('|'),
    'g'
  );
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
export const convertKeyForAggregation = (key: string) => `sf_${key}`;
export const parseKeyForAggregation = (key: string) =>
  key.startsWith(`sf_`) ? key.slice(3) : key;
export const convertFieldIdForAggregation = (fieldId: string) =>
  fieldId.replaceAll('[]', '');

export const timedSearch = async (
  query: Query,
  linkDepth = 0,
  projectId?: string,
  // get api instance from SSR context that is connected to the current request in SSR,
  // fall back to the imported cachedSearch api that is not connected to the current SSR context
  ssr: { api: CachedSearch } = { api: cachedSearch }
): Promise<null | TimedSearchResponse> => {
  if (!query) return null;

  let duration = 0;

  const start = now();
  const payload = (await ssr.api.search(
    query,
    linkDepth,
    projectId,
  )) as PagedList<Entry>;
  const end = now();

  duration = Number((end - start).toFixed(2));

  return { duration, payload };
};

export const getItemsFromResult = (result?: {
  duration: number;
  payload: PagedList<Entry> | any[];
}): Entry[] => {
  const { payload } = result || {};
  if (payload) {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.items)) return payload.items;
    return payload as any;
  }
  return [];
};

export const extractQuotedPhrases = (searchTerm: string): string[] => {
  const pattern = new RegExp(
    /(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/gm
  );

  return (searchTerm.match(pattern) || []).map(match =>
    match.replace(/"/g, '')
  );
};

export const buildUrl = (route: string, params: SearchParams): string => {
  const qs = stringify(params) as string;
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
export const routeParams = (
  staticRoute?: any,
  location?: {
    [key: string]: any;
    pathname: string;
    search: string;
    hash?: string;
  }
) => {
  // match.params is react-router-config/react-router@5 style
  // params is supplied with RouteObject in react-router@6
  const pathParams = staticRoute?.match?.params || staticRoute?.params || {};
  const queryParams = parse(
    typeof window !== 'undefined'
      ? window.location.search
      : location?.search || ''
  );
  return {
    ...pathParams,
    ...queryParams,
  };
};

export const callCustomApi = async <T>(
  customApi: CustomApi,
  filters: SearchParams,
  // get api instance from SSR context that is connected to the current request in SSR,
  // fall back to the imported cachedSearch api that is not connected to the current SSR context
  ssr: { api: CachedSearch } = { api: cachedSearch }
): Promise<T> => {
  const apiUri = customApi.uri || '';
  let uri = buildUrl(apiUri, filters);
  if (!uri) throw new Error('uri is required to use customApi');
  if (typeof window == 'undefined') {
    if (!uri.startsWith('http')) uri = `http://localhost:3001${uri}`;
    const response = await fetch(uri);
    return (await response.json()) as T;
  }
  const response = await ssr.api.fetch(uri);
  return (await response.clone().json()) as T;
};

export const removeEmptyAttributes = (obj: any) => {
  Object.entries(obj).forEach(
    ([key, val]) =>
      (val && typeof val === 'object' && removeEmptyAttributes(val)) ||
      ((typeof val === 'undefined' || val === null || val === '') &&
        delete obj[key])
  );
  return obj;
};

export const toArray = (obj: string | null, seperator = ',') =>
  typeof obj === 'undefined' || obj === null
    ? obj
    : Array.isArray(obj)
      ? (obj as string[])
      : obj.split(seperator);

// assumes array elements are primitive types
export const areArraysEqualSets = (a1: any[], a2: any[]) => {
  const superSet = {} as { [key: string]: any };
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
