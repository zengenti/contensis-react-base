import { Context } from '../models/Enums';
import { QueryParams as QueryParams2 } from '../models/Queries';
import { CustomApi, SearchQueryParams } from '../models/Search';
import { AppState, Facet, Facets, Filters, Paging, SelectedFilters, Tab } from '../models/SearchState';
type StateType = 'immutable' | 'js';
type ContextType = keyof typeof Context;
export declare const getSearchContext: (state: AppState) => ContextType;
export declare const getCurrent: (state: AppState, context?: ContextType) => string;
export declare const getCurrentFacet: (state: AppState) => string;
export declare const getCurrentListing: (state: AppState) => string;
export declare const getCurrentTab: (state: AppState) => number;
export declare const getFacets: (state: AppState, returnType?: StateType) => Facets;
export declare const getTabFacets: (state: AppState) => {
    [k: string]: Facet;
};
export declare const getFacetTitles: (state: AppState) => {
    isSelected: boolean;
    key: string;
    title: string | undefined;
    totalCount: number;
}[];
export declare const getFacet: (state: AppState, facetName?: string, context?: Context | string, returnType?: StateType) => Facet;
export declare const getListing: (state: AppState, listing?: string) => Facet;
/** Return filter state for the current (or provided) facet */
export declare const getFilters: (state: AppState, facet: string, context?: ContextType, returnType?: StateType) => Filters;
/** Return filter state for the current (or provided) facet, excluding filters configured as `renderable: false` */
export declare const getRenderableFilters: (state: AppState, facet?: string, context?: ContextType) => Filters;
export declare const getFiltersToLoad: (state: AppState, facet: string, context?: ContextType, returnType?: StateType) => string[];
/** Return keyed object for all filters in the current facet with all selected values for each filter */
export declare const getSelectedFilters: (state: AppState, facet?: string, context?: ContextType, returnType?: StateType) => SelectedFilters;
/** Return keyed object for all _renderable_ filters in the current facet with all selected values for each filter */
export declare const getRenderableSelectedFilters: (state: AppState, facet?: string, context?: ContextType) => SelectedFilters;
export declare const getResults: (state: AppState, current?: string, context?: ContextType, returnType?: StateType) => any[];
export declare const getIsInternalPaging: (state: AppState, current: string, context?: ContextType) => boolean;
export declare const getIsLoaded: (state: AppState, context?: ContextType, facet?: string) => boolean;
export declare const getIsLoading: (state: AppState, context?: ContextType, facet?: string) => boolean;
export declare const getIsSsr: (state: AppState) => boolean;
export declare const getFeaturedResults: (state: AppState, current?: string, context?: ContextType, returnType?: StateType) => any[];
export declare const getPaging: (state: AppState, current?: string, context?: ContextType, returnType?: StateType) => Paging;
export declare const getPageIndex: (state: AppState, current?: string, context?: ContextType) => number;
export declare const getPageSize: (state: AppState, current?: string, context?: ContextType) => number;
export declare const getPrevPageIndex: (state: AppState, current?: string, context?: ContextType) => number;
export declare const getPageIsLoading: (state: AppState, current?: string, context?: ContextType) => boolean;
export declare const getPagesLoaded: (state: AppState, current?: string, context?: ContextType) => number[];
export declare const getTotalCount: (state: AppState, current?: string, context?: ContextType) => number;
export declare const getSearchTerm: (state: AppState) => string;
export declare const getSearchTabs: (state: AppState, returnType?: StateType) => Tab[];
export declare const getQueryParams: (state: AppState, current?: string, context?: ContextType) => Record<string, any>;
export declare const getQueryParameter: <K extends keyof SearchQueryParams, K2 extends keyof QueryParams2>({ state, facet, context, }: {
    state: AppState;
    facet?: string;
    context?: ContextType;
}, key: K | K2, ifnull?: any) => SearchQueryParams[K] | QueryParams2[K2];
export declare const getCustomApi: (state: AppState, current: string, context?: ContextType, returnType?: StateType) => CustomApi;
export declare const getTabsAndFacets: (state: AppState, returnType?: StateType) => any;
export declare const getSearchTotalCount: (state: AppState) => number;
export declare const getFacetsTotalCount: (state: AppState) => number;
export declare const selectFacets: {
    getCurrent: (state: AppState) => string;
    getCurrentTab: (state: AppState) => number;
    getCustomApi: (state: AppState, current: string, context?: ContextType, returnType?: StateType) => CustomApi;
    getFacet: (state: AppState, facetName?: string, context?: Context | string, returnType?: StateType) => Facet;
    getFacetTitles: (state: AppState) => {
        isSelected: boolean;
        key: string;
        title: string | undefined;
        totalCount: number;
    }[];
    getFacets: (state: AppState, returnType?: StateType) => Facets;
    getFacetsTotalCount: (state: AppState) => number;
    getFeaturedResults: (state: AppState, current?: string, context?: ContextType, returnType?: StateType) => any[];
    getFilters: (state: AppState, facet: string, context?: ContextType, returnType?: StateType) => Filters;
    getFiltersToLoad: (state: AppState, facet: string, context?: ContextType, returnType?: StateType) => string[];
    getIsLoaded: (state: AppState, context?: ContextType, facet?: string) => boolean;
    getIsLoading: (state: AppState, context?: ContextType, facet?: string) => boolean;
    getPageIndex: (state: AppState, current?: string, context?: ContextType) => number;
    getPageIsLoading: (state: AppState, current?: string, context?: ContextType) => boolean;
    getPagesLoaded: (state: AppState, current?: string, context?: ContextType) => number[];
    getPaging: (state: AppState, current?: string, context?: ContextType, returnType?: StateType) => Paging;
    getQueryParams: (state: AppState, facet: string) => Record<string, any>;
    getQueryParameter: ({ state, facet }: {
        state: AppState;
        facet?: string;
    }, key: keyof SearchQueryParams | keyof QueryParams2, ifnull: any) => any;
    getRenderableFilters: (state: AppState, facet?: string, context?: ContextType) => Filters;
    getResults: (state: AppState, current?: string, context?: ContextType, returnType?: StateType) => any[];
    getTabFacets: (state: AppState) => {
        [k: string]: Facet;
    };
    getTabsAndFacets: (state: AppState, returnType?: StateType) => any;
    getTotalCount: (state: AppState, current?: string, context?: ContextType) => number;
    getSearchTabs: (state: AppState, returnType?: StateType) => Tab[];
    getSearchTerm: (state: AppState) => string;
    getSearchTotalCount: (state: AppState) => number;
    getSelectedFilters: (state: AppState, facet?: string, context?: ContextType, returnType?: StateType) => SelectedFilters;
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
        facet?: string;
    }, key: keyof SearchQueryParams | keyof QueryParams2, ifnull: any) => any;
    getRenderableFilters: (state: AppState, listing?: string) => Filters;
    getResults: (state: AppState, listing?: string) => any[];
    getSearchTerm: (state: AppState) => string;
    getTotalCount: (state: AppState, listing?: string) => number;
    getSelectedFilters: (state: AppState, listing?: string) => SelectedFilters;
};
export {};
