import { CustomWhereClause } from '../models/Search';
import { Filter, FilterItem, SearchState } from '../models/SearchState';
export declare const entries: {
    isLoading: boolean;
    isError: boolean;
    items: never[];
};
export declare const pagingInfo: {
    isLoading: boolean;
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    pagesLoaded: never[];
    prevPageIndex: number;
    totalCount: number;
};
export declare const searchFacet: {
    title: null;
    featuredEntries: {
        isLoading: boolean;
        isError: boolean;
        items: never[];
    };
    featuredResults: never[];
    entries: {
        isLoading: boolean;
        isError: boolean;
        items: never[];
    };
    results: never[];
    queryParams: {};
    filters: {};
    queryDuration: number;
    pagingInfo: {
        isLoading: boolean;
        pageCount: number;
        pageIndex: number;
        pageSize: number;
        pagesLoaded: never[];
        prevPageIndex: number;
        totalCount: number;
    };
    projectId: string;
};
export declare const searchTab: {
    currentFacet: undefined;
    facets: {};
    id: number;
    label: undefined;
    totalCount: string;
};
export declare const filtering: Omit<Filter, "customWhere" | "items"> & {
    customWhere?: CustomWhereClause[] | undefined;
    items?: FilterItem[] | undefined;
};
export declare const filterItem: FilterItem;
export declare const initialState: SearchState;
