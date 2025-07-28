import { Entry } from 'contensis-delivery-api/lib/models';
import { PagedList, Query } from 'contensis-core-api';
import { CustomApi } from '../models/Search';
import { TimedSearchResponse } from '../models/SearchUtil';
export declare function fixFreeTextForElastic(s: string): string;
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
export declare const convertKeyForAggregation: (key: string) => string;
export declare const parseKeyForAggregation: (key: string) => string;
export declare const convertFieldIdForAggregation: (fieldId: string) => string;
export declare const timedSearch: (query: Query, linkDepth?: number, projectId?: string, env?: string) => Promise<null | TimedSearchResponse>;
export declare const getItemsFromResult: (result?: {
    duration: number;
    payload: PagedList<Entry> | any[];
}) => Entry[];
export declare const extractQuotedPhrases: (searchTerm: string) => string[];
export declare const buildUrl: (route: string, params: {
    [key: string]: string;
}) => string;
/**
 * Returns all params from the current route query string or static route
 * Supply static route argument if reading parameters from the route path
 * Supply location argument for the params to be read in SSR
 * @param staticRoute Matched static route from react-router 5 or 6
 * @param location location object containing at least pathname and search
 * @returns Keyed params object
 */
export declare const routeParams: (staticRoute?: any, location?: {
    [key: string]: any;
    pathname: string;
    search: string;
    hash?: string;
}) => any;
export declare const callCustomApi: <T>(customApi: CustomApi, filters: {
    [key: string]: string;
}) => Promise<T>;
export declare const removeEmptyAttributes: (obj: any) => any;
export declare const toArray: (obj: string | null, seperator?: string) => string[] | null;
export declare const areArraysEqualSets: (a1: any[], a2: any[]) => boolean;
