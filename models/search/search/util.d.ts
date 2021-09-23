import { Entry } from 'contensis-delivery-api/lib/models';
import { PagedList, Query } from 'contensis-core-api';
import { CustomApi } from '../models/Search';
import { TimedSearchResponse } from '../models/SearchUtil';
export declare function fixFreeTextForElastic(s: string): string;
export declare const timedSearch: (query: Query, linkDepth?: number, projectId?: string | undefined, env?: string | undefined) => Promise<null | TimedSearchResponse>;
export declare const getItemsFromResult: (result?: {
    duration: number;
    payload: PagedList<Entry> | any[];
} | undefined) => Entry[];
export declare const extractQuotedPhrases: (searchTerm: string) => string[];
export declare const buildUrl: (route: string, params: {
    [key: string]: string;
}) => string;
export declare const callCustomApi: <T>(customApi: CustomApi, filters: {
    [key: string]: string;
}) => Promise<T>;
export declare const removeEmptyAttributes: (obj: any) => any;
export declare const toArray: (obj: string | null, seperator?: string) => string[] | null;
export declare const areArraysEqualSets: (a1: any[], a2: any[]) => boolean;
