import { Context } from '../models/Enums';
import { QueryParams as QueryParams2 } from '../models/Queries';
import { CustomApi, QueryParams } from '../models/Search';
import { AppState, Facet, Facets, Filters, Paging, Tab } from '../models/SearchState';
declare type StateType = 'immutable' | 'js';
export declare const getSearchContext: (state: AppState) => Context;
export declare const getCurrent: (state: AppState, context?: Context) => string;
export declare const getCurrentFacet: (state: AppState) => string;
export declare const getCurrentListing: (state: AppState) => string;
export declare const getCurrentTab: (state: AppState) => Map<string, Tab[keyof Tab]>;
export declare const getFacets: (state: AppState, returnType?: StateType | undefined) => Facets;
export declare const getTabFacets: (state: AppState) => {
    [k: string]: Facet;
};
export declare const getFacetTitles: (state: AppState) => {
    key: string;
    title: string | undefined;
    totalCount: number;
}[];
export declare const getFacet: (state: AppState, facetName?: string, context?: Context, returnType?: StateType | undefined) => Facet;
export declare const getListing: (state: AppState, listing?: string) => Facet;
export declare const getFilters: (state: AppState, facet: string, context?: Context, returnType?: StateType | undefined) => Filters;
export declare const getRenderableFilters: (state: AppState, facet?: string, context?: Context) => Filters;
export declare const getFiltersToLoad: (state: AppState, facet: string, context?: Context, returnType?: StateType | undefined) => string[];
export declare const getSelectedFilters: (state: AppState, facet?: string, context?: Context, returnType?: StateType | undefined) => {
    [k: string]: string[];
};
export declare const getResults: (state: AppState, current?: string, context?: Context, returnType?: StateType | undefined) => any[];
export declare const getIsInternalPaging: (state: AppState, current: string, context?: Context) => boolean;
export declare const getIsLoaded: (state: AppState, context?: Context, facet?: string | undefined) => boolean;
export declare const getIsLoading: (state: AppState, context?: Context, facet?: string | undefined) => boolean;
export declare const getIsSsr: (state: AppState) => boolean;
export declare const getFeaturedResults: (state: AppState, current?: string, context?: Context) => any[];
export declare const getPaging: (state: AppState, current?: string, context?: Context, returnType?: StateType | undefined) => Paging;
export declare const getPageIndex: (state: AppState, current?: string, context?: Context) => number;
export declare const getPrevPageIndex: (state: AppState, current?: string, context?: Context) => number;
export declare const getPageIsLoading: (state: AppState, current?: string, context?: Context) => boolean;
export declare const getPagesLoaded: (state: AppState, current?: string, context?: Context) => number[];
export declare const getTotalCount: (state: AppState, current?: string, context?: Context) => number;
export declare const getSearchTerm: (state: AppState) => string;
export declare const getSearchTabs: (state: AppState, returnType?: StateType | undefined) => Tab[];
export declare const getQueryParams: (state: AppState, current?: string, context?: Context) => Record<string, any>;
export declare const getQueryParameter: <K extends keyof QueryParams, K2 extends "internalPaging" | "linkDepth" | "loadMorePaging" | keyof import("../models/Queries").SearchQueryOptions | "env" | "internalPageIndex" | "pagesLoaded" | "prevPageIndex" | "projectId" | "selectedFilters">({ state, facet, context, }: {
    state: AppState;
    facet?: string | undefined;
    context?: Context | undefined;
}, key: K | K2, ifnull?: any) => QueryParams[K] | QueryParams2[K2];
export declare const getCustomApi: (state: AppState, current: string, context?: Context, returnType?: StateType | undefined) => CustomApi;
export declare const getCustomEnv: (state: AppState, current: string, context?: Context) => any;
export declare const getTabsAndFacets: (state: AppState, returnType?: StateType | undefined) => any;
export declare const getSearchTotalCount: (state: AppState) => any;
export declare const getFacetsTotalCount: (state: AppState) => number;
export declare const selectFacets: {
    getCurrent: (state: AppState) => string;
    getCurrentTab: (state: AppState) => Map<string, Tab[keyof Tab]>;
    getCustomApi: (state: AppState, current: string, context?: Context, returnType?: StateType | undefined) => CustomApi;
    getCustomEnv: (state: AppState, current: string, context?: Context) => any;
    getFacet: (state: AppState, facetName?: string, context?: Context, returnType?: StateType | undefined) => Facet;
    getFacetTitles: (state: AppState) => {
        key: string;
        title: string | undefined;
        totalCount: number;
    }[];
    getFacets: (state: AppState, returnType?: StateType | undefined) => Facets;
    getFacetsTotalCount: (state: AppState) => number;
    getFeaturedResults: (state: AppState, current?: string, context?: Context) => any[];
    getFilters: (state: AppState, facet: string, context?: Context, returnType?: StateType | undefined) => Filters;
    getFiltersToLoad: (state: AppState, facet: string, context?: Context, returnType?: StateType | undefined) => string[];
    getIsLoaded: (state: AppState, context?: Context, facet?: string | undefined) => boolean;
    getIsLoading: (state: AppState, context?: Context, facet?: string | undefined) => boolean;
    getPageIndex: (state: AppState, current?: string, context?: Context) => number;
    getPageIsLoading: (state: AppState, current?: string, context?: Context) => boolean;
    getPagesLoaded: (state: AppState, current?: string, context?: Context) => number[];
    getPaging: (state: AppState, current?: string, context?: Context, returnType?: StateType | undefined) => Paging;
    getQueryParams: (state: AppState, facet: string) => Record<string, any>;
    getQueryParameter: ({ state, facet }: {
        state: AppState;
        facet: string;
    }, key: keyof QueryParams | keyof QueryParams2, ifnull: any) => any;
    getRenderableFilters: (state: AppState, facet?: string, context?: Context) => Filters;
    getResults: (state: AppState, current?: string, context?: Context, returnType?: StateType | undefined) => any[];
    getTabFacets: (state: AppState) => {
        [k: string]: Facet;
    };
    getTabsAndFacets: (state: AppState, returnType?: StateType | undefined) => any;
    getTotalCount: (state: AppState, current?: string, context?: Context) => number;
    getSearchTabs: (state: AppState, returnType?: StateType | undefined) => Tab[];
    getSearchTerm: (state: AppState) => string;
    getSearchTotalCount: (state: AppState) => any;
    getSelectedFilters: (state: AppState, facet?: string, context?: Context, returnType?: StateType | undefined) => {
        [k: string]: string[];
    };
};
export declare const selectListing: {
    getCurrent: (state: AppState) => string;
    getFeaturedResults: (state: AppState, listing?: string) => any[];
    getFilters: (state: AppState, listing?: string) => Filters;
    getFiltersToLoad: (state: AppState, listing?: string) => string[];
    getListing: (state: AppState, listing?: string) => Facet;
    getIsLoaded: (state: AppState) => boolean;
    getIsLoading: (state: AppState) => boolean;
    getPageIndex: (state: AppState, listing?: string) => number;
    getPaging: (state: AppState, listing?: string) => Paging;
    getPageIsLoading: (state: AppState, listing?: string) => boolean;
    getPagesLoaded: (state: AppState, listing?: string) => number[];
    getQueryParams: (state: AppState, listing?: string) => Record<string, any>;
    getQueryParameter: ({ state, facet }: {
        state: AppState;
        facet?: string | undefined;
    }, key: keyof QueryParams | keyof QueryParams2, ifnull: any) => any;
    getRenderableFilters: (state: AppState, listing?: string) => Filters;
    getResults: (state: AppState, listing?: string) => any[];
    getSearchTerm: (state: AppState) => string;
    getTotalCount: (state: AppState, listing?: string) => number;
    getSelectedFilters: (state: AppState, listing?: string) => {
        [k: string]: string[];
    };
};
export declare const selectCurrentPath: (state: AppState) => any;
export declare const selectVersionStatus: (state: AppState) => any;
export {};