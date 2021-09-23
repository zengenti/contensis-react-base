import { SearchConfig } from '../models/Search';
import { Context } from '../models/Enums';
import { FilterItem } from '../models/SearchState';
declare const _default: (config: SearchConfig) => (base: {
    context: "facets" | "listings" | "minilist";
    currentFacet: string;
    currentListing: string;
    term: string;
    facets: {
        [x: string]: {
            entries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredEntries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredResults: import("immer").DraftArray<any[]>;
            filters: {
                [x: string]: {
                    contentTypeId?: string | undefined;
                    customWhere?: import("immer").DraftArray<import("../models/Search").CustomWhereClause> | undefined;
                    fieldId?: string | undefined;
                    isGrouped?: boolean | undefined;
                    isSingleSelect?: boolean | undefined;
                    isLoading: boolean;
                    isError: boolean;
                    items?: import("immer").DraftArray<FilterItem[]> | undefined;
                    path?: string | undefined;
                    renderable?: boolean | undefined;
                    title?: string | undefined;
                };
            };
            pagingInfo: {
                isLoading: boolean;
                pageCount: number;
                pageSize: number;
                pageIndex: number;
                pagesLoaded: import("immer").DraftArray<number[]>;
                prevPageIndex: number;
                totalCount: number;
            };
            preloaded: boolean;
            projectId: string;
            queryDuration: number;
            queryParams: {
                contentTypeIds: import("immer").DraftArray<string[]>;
                dynamicOrderBy: import("immer").DraftArray<string[]>;
                excludeIds: import("immer").DraftArray<string[]>;
                internalPaging: boolean;
                loadMorePaging: boolean;
                useSearchTerm: boolean;
            };
            results: import("immer").DraftArray<any[]>;
            tabId: number;
            title: string;
        };
    };
    listings: {
        [x: string]: {
            entries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredEntries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredResults: import("immer").DraftArray<any[]>;
            filters: {
                [x: string]: {
                    contentTypeId?: string | undefined;
                    customWhere?: import("immer").DraftArray<import("../models/Search").CustomWhereClause> | undefined;
                    fieldId?: string | undefined;
                    isGrouped?: boolean | undefined;
                    isSingleSelect?: boolean | undefined;
                    isLoading: boolean;
                    isError: boolean;
                    items?: import("immer").DraftArray<FilterItem[]> | undefined;
                    path?: string | undefined;
                    renderable?: boolean | undefined;
                    title?: string | undefined;
                };
            };
            pagingInfo: {
                isLoading: boolean;
                pageCount: number;
                pageSize: number;
                pageIndex: number;
                pagesLoaded: import("immer").DraftArray<number[]>;
                prevPageIndex: number;
                totalCount: number;
            };
            preloaded: boolean;
            projectId: string;
            queryDuration: number;
            queryParams: {
                contentTypeIds: import("immer").DraftArray<string[]>;
                dynamicOrderBy: import("immer").DraftArray<string[]>;
                excludeIds: import("immer").DraftArray<string[]>;
                internalPaging: boolean;
                loadMorePaging: boolean;
                useSearchTerm: boolean;
            };
            results: import("immer").DraftArray<any[]>;
            tabId: number;
            title: string;
        };
    };
    minilist: {
        [x: string]: {
            entries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredEntries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredResults: import("immer").DraftArray<any[]>;
            filters: {
                [x: string]: {
                    contentTypeId?: string | undefined;
                    customWhere?: import("immer").DraftArray<import("../models/Search").CustomWhereClause> | undefined;
                    fieldId?: string | undefined;
                    isGrouped?: boolean | undefined;
                    isSingleSelect?: boolean | undefined;
                    isLoading: boolean;
                    isError: boolean;
                    items?: import("immer").DraftArray<FilterItem[]> | undefined;
                    path?: string | undefined;
                    renderable?: boolean | undefined;
                    title?: string | undefined;
                };
            };
            pagingInfo: {
                isLoading: boolean;
                pageCount: number;
                pageSize: number;
                pageIndex: number;
                pagesLoaded: import("immer").DraftArray<number[]>;
                prevPageIndex: number;
                totalCount: number;
            };
            preloaded: boolean;
            projectId: string;
            queryDuration: number;
            queryParams: {
                contentTypeIds: import("immer").DraftArray<string[]>;
                dynamicOrderBy: import("immer").DraftArray<string[]>;
                excludeIds: import("immer").DraftArray<string[]>;
                internalPaging: boolean;
                loadMorePaging: boolean;
                useSearchTerm: boolean;
            };
            results: import("immer").DraftArray<any[]>;
            tabId: number;
            title: string;
        };
    };
    tabs: import("immer").DraftArray<import("../models/SearchState").Tab[]>;
    config: {
        [x: string]: boolean;
    };
} | undefined, action: {
    [key: string]: any;
    context: keyof typeof Context;
    facet: string;
    params: {
        [key: string]: string;
    };
}) => {
    context: "facets" | "listings" | "minilist";
    currentFacet: string;
    currentListing: string;
    term: string;
    facets: {
        [x: string]: {
            entries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredEntries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredResults: import("immer").DraftArray<any[]>;
            filters: {
                [x: string]: {
                    contentTypeId?: string | undefined;
                    customWhere?: import("immer").DraftArray<import("../models/Search").CustomWhereClause> | undefined;
                    fieldId?: string | undefined;
                    isGrouped?: boolean | undefined;
                    isSingleSelect?: boolean | undefined;
                    isLoading: boolean;
                    isError: boolean;
                    items?: import("immer").DraftArray<FilterItem[]> | undefined;
                    path?: string | undefined;
                    renderable?: boolean | undefined;
                    title?: string | undefined;
                };
            };
            pagingInfo: {
                isLoading: boolean;
                pageCount: number;
                pageSize: number;
                pageIndex: number;
                pagesLoaded: import("immer").DraftArray<number[]>;
                prevPageIndex: number;
                totalCount: number;
            };
            preloaded: boolean;
            projectId: string;
            queryDuration: number;
            queryParams: {
                contentTypeIds: import("immer").DraftArray<string[]>;
                dynamicOrderBy: import("immer").DraftArray<string[]>;
                excludeIds: import("immer").DraftArray<string[]>;
                internalPaging: boolean;
                loadMorePaging: boolean;
                useSearchTerm: boolean;
            };
            results: import("immer").DraftArray<any[]>;
            tabId: number;
            title: string;
        };
    };
    listings: {
        [x: string]: {
            entries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredEntries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredResults: import("immer").DraftArray<any[]>;
            filters: {
                [x: string]: {
                    contentTypeId?: string | undefined;
                    customWhere?: import("immer").DraftArray<import("../models/Search").CustomWhereClause> | undefined;
                    fieldId?: string | undefined;
                    isGrouped?: boolean | undefined;
                    isSingleSelect?: boolean | undefined;
                    isLoading: boolean;
                    isError: boolean;
                    items?: import("immer").DraftArray<FilterItem[]> | undefined;
                    path?: string | undefined;
                    renderable?: boolean | undefined;
                    title?: string | undefined;
                };
            };
            pagingInfo: {
                isLoading: boolean;
                pageCount: number;
                pageSize: number;
                pageIndex: number;
                pagesLoaded: import("immer").DraftArray<number[]>;
                prevPageIndex: number;
                totalCount: number;
            };
            preloaded: boolean;
            projectId: string;
            queryDuration: number;
            queryParams: {
                contentTypeIds: import("immer").DraftArray<string[]>;
                dynamicOrderBy: import("immer").DraftArray<string[]>;
                excludeIds: import("immer").DraftArray<string[]>;
                internalPaging: boolean;
                loadMorePaging: boolean;
                useSearchTerm: boolean;
            };
            results: import("immer").DraftArray<any[]>;
            tabId: number;
            title: string;
        };
    };
    minilist: {
        [x: string]: {
            entries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredEntries: {
                isLoading: boolean;
                isError: boolean;
                error?: any;
            };
            featuredResults: import("immer").DraftArray<any[]>;
            filters: {
                [x: string]: {
                    contentTypeId?: string | undefined;
                    customWhere?: import("immer").DraftArray<import("../models/Search").CustomWhereClause> | undefined;
                    fieldId?: string | undefined;
                    isGrouped?: boolean | undefined;
                    isSingleSelect?: boolean | undefined;
                    isLoading: boolean;
                    isError: boolean;
                    items?: import("immer").DraftArray<FilterItem[]> | undefined;
                    path?: string | undefined;
                    renderable?: boolean | undefined;
                    title?: string | undefined;
                };
            };
            pagingInfo: {
                isLoading: boolean;
                pageCount: number;
                pageSize: number;
                pageIndex: number;
                pagesLoaded: import("immer").DraftArray<number[]>;
                prevPageIndex: number;
                totalCount: number;
            };
            preloaded: boolean;
            projectId: string;
            queryDuration: number;
            queryParams: {
                contentTypeIds: import("immer").DraftArray<string[]>;
                dynamicOrderBy: import("immer").DraftArray<string[]>;
                excludeIds: import("immer").DraftArray<string[]>;
                internalPaging: boolean;
                loadMorePaging: boolean;
                useSearchTerm: boolean;
            };
            results: import("immer").DraftArray<any[]>;
            tabId: number;
            title: string;
        };
    };
    tabs: import("immer").DraftArray<import("../models/SearchState").Tab[]>;
    config: {
        [x: string]: boolean;
    };
} | undefined;
export default _default;
