import { List, Map, OrderedMap } from 'immutable';
import { initialState, searchFacet } from '../redux/schema';
import { CustomWhereClause } from './Search';
export declare type AppState = Map<'search', typeof initialState>;
export declare type SearchState = {
    currentFacet: string;
    term: string;
    facets: OrderedMap<string, OrderedMap<string, typeof searchFacet>>;
    tabs: List<Tab>;
    config: Map<string, boolean>;
};
export declare type Facets = {
    [key: string]: Facet;
};
export declare type Facet = {
    entries: {
        isLoading: boolean;
        isError: boolean;
    };
    featuredEntries: {
        isLoading: boolean;
        isError: boolean;
    };
    featuredResults: any[];
    filters: Filters;
    pagingInfo: {
        isLoading: boolean;
        pageCount: number;
        pageSize: number;
        pageIndex: number;
        totalCount: number;
    };
    preloaded: boolean;
    queryDuration: number;
    queryParams: {
        contentTypeIds: string[];
        dynamicOrderBy: string[];
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
    facets: {
        [key: string]: Facet;
    };
    id: number;
    label: string;
    totalCount: number;
};
