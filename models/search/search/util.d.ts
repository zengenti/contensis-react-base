import { Entry } from 'contensis-delivery-api/lib/models';
import { PagedList, Query } from 'contensis-core-api';
import { CustomApi } from '../models/Search';
import { TimedSearchResponse } from '../models/SearchUtil';
export declare function fixFreeTextForElastic(s: string): string;
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
    hash?: string | undefined;
} | undefined) => any;
export declare const callCustomApi: <T>(customApi: CustomApi, filters: {
    [key: string]: string;
}) => Promise<T>;
export declare const removeEmptyAttributes: (obj: any) => any;
export declare const toArray: (obj: string | null, seperator?: string) => string[] | null;
export declare const areArraysEqualSets: (a1: any[], a2: any[]) => boolean;
