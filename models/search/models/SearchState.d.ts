import { Context } from './Enums';
import { CustomWhereClause } from './Search';
export declare type AppState = Record<'search', SearchState>;
export declare type SearchState = {
    context: keyof typeof Context;
    currentFacet: string;
    currentListing: string;
    term: string;
    facets: Facets;
    listings: Facets;
    minilist: Facets;
    tabs: Tab[];
    config: Record<string, boolean>;
};
export declare type Facets = {
    [key: string]: Facet;
};
export declare type Facet = {
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
    featuredResults: any[];
    filters: Filters;
    pagingInfo: {
        isLoading: boolean;
        pageCount: number;
        pageSize: number;
        pageIndex: number;
        pagesLoaded: number[];
        prevPageIndex: number;
        totalCount: number;
    };
    preloaded: boolean;
    projectId: string;
    queryDuration: number;
    queryParams: {
        contentTypeIds: string[];
        dynamicOrderBy: string[];
        excludeIds: string[];
        internalPaging: boolean;
        loadMorePaging: boolean;
        useSearchTerm: boolean;
    };
    results: any[];
    tabId: number;
    title: string;
};
export declare type Filters = {
    [key: string]: Filter;
};
export declare type Filter = {
    contentTypeId?: string;
    customWhere?: CustomWhereClause;
    fieldId?: string;
    isGrouped?: boolean;
    isSingleSelect?: boolean;
    isLoading: boolean;
    isError: boolean;
    items?: FilterItem[];
    path?: string;
    renderable?: boolean;
    title?: string;
};
export declare type FilterItem = {
    contentTypeId?: string;
    title?: string;
    type?: string;
    key: string;
    path?: string;
    isSelected: boolean;
};
export declare type Paging = {
    isLoading: boolean;
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    pagesLoaded: number[];
    prevPageIndex: number;
    totalCount: number;
};
export declare type Tab = {
    currentFacet: string;
    defaultFacet: string;
    id: number;
    label: string;
    totalCount: number;
};
export declare type TabAndFacets = Tab & {
    facets: {
        [key: string]: Facet;
    };
};