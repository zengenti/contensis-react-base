import { PagedSearchList } from 'contensis-core-api';
import { Context } from './Enums';
import { CustomWhereClause } from './Search';
export type AppState = Record<'search', SearchState> & Record<string, any>;
export type SearchState = {
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
export type Aggregations = Required<PagedSearchList<unknown>>['aggregations'];
export type Facets = {
    [key: string]: Facet;
};
export type Facet = {
    aggregations?: Aggregations;
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
        pageSize: number;
        excludeIds: string[];
        internalPaging: boolean;
        loadMorePaging: boolean;
        useSearchTerm: boolean;
    };
    results: any[];
    tabId: number;
    title: string;
};
export type Filters = {
    [key: string]: Filter;
};
export type Filter = {
    contentTypeId?: string;
    customWhere?: CustomWhereClause;
    defaultValue?: string;
    fieldId?: string | string[];
    isGrouped?: boolean;
    isSingleSelect?: boolean;
    isLoading: boolean;
    isError: boolean;
    items?: FilterItem[];
    path?: string;
    renderable?: boolean;
    title?: string;
};
export type FilterItem = {
    contentTypeId?: string;
    title?: string;
    type?: string;
    key: string;
    path?: string;
    isSelected: boolean;
    aggregate?: number;
};
export type SelectedFilters = {
    [k: string]: string[];
};
export type Paging = {
    isLoading: boolean;
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    pagesLoaded: number[];
    prevPageIndex: number;
    totalCount: number;
};
export type Tab = {
    currentFacet: string;
    defaultFacet: string;
    id: number;
    label: string;
    totalCount: number;
};
export type TabAndFacets = Tab & {
    facets: {
        [key: string]: Facet;
    };
};
