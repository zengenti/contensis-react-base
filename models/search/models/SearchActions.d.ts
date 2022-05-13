import { PagedList } from 'contensis-core-api';
import { Entry, TaxonomyNode } from 'contensis-delivery-api/lib/models';
import { Context } from '../models/Enums';
import { SearchFacet, Listing, Mappers } from '../models/Search';
import { AppState } from './SearchState';
import { QueryParams } from './Queries';
import { TimedSearchResponse } from './SearchUtil';
declare type Action = {
    type: string;
};
export declare type WithMappers<T> = T & {
    mappers: Mappers;
};
export declare type DebugFlags = boolean | {
    executeSearch?: boolean;
    preloadOtherFacets?: boolean;
};
export declare type TriggerSearchParams = {
    config?: SearchFacet | Listing;
    context: Context;
    debug?: DebugFlags;
    defaultLang?: string;
    excludeIds?: string[];
    facet: string;
    mapper?: Mappers['results'];
    mappers?: Mappers;
    params?: {
        [key: string]: string;
    };
};
export declare type TriggerSearchAction = Action & TriggerSearchParams;
export declare type TriggerSearchActionCreator = (p: TriggerSearchParams) => TriggerSearchAction;
declare type InitListingParams = {
    context: Context;
    debug?: DebugFlags;
    defaultLang?: string;
    facet: string;
    listingType?: string;
    mapper?: Mappers['results'];
    mappers?: Mappers;
    params: {
        [key: string]: string;
    };
    preload?: boolean;
};
export declare type InitListingAction = Action & InitListingParams & {
    ssr?: boolean;
};
export declare type SetRouteFiltersOptions = Partial<InitListingAction>;
export declare type InitListingActionCreator = (p: InitListingParams) => InitListingAction;
export declare type LoadFiltersSearchResults = Action & {
    error: any;
    facetKey: string;
    filterKey: string;
    payload: TaxonomyNode | PagedList<Entry>;
    selectedKeys: string[];
    context: Context;
    mapper: Mappers['filterItems'];
};
export declare type SearchResults = {
    action: ExecuteSearchAction;
    featuredResult?: TimedSearchResponse;
    pageIndex: number;
    prevResults: any[];
    result: TimedSearchResponse;
    state: AppState;
};
export declare type LoadFiltersCompleteAction = Action & {
    error: any;
    facetKey: string;
    filterKey: string;
    payload: TaxonomyNode | PagedList<Entry>;
    selectedKeys: string[];
    context: Context;
    mapper: Mappers['filterItems'];
};
export declare type EnsureSearchAction = InitListingAction & {
    ogState: AppState;
};
export declare type ExecuteSearchAction = EnsureSearchAction & {
    preload: boolean;
    queryParams: QueryParams;
};
export declare type SetSearchEntriesParams = {
    type: string;
    context: Context;
    defaultLang: string;
    facet: string;
    mappers: Mappers;
    nextFacet: SearchFacet;
    preload: boolean;
    ogState: AppState;
    debug: DebugFlags;
    params: {
        [key: string]: string;
    };
};
export declare type SetSearchEntriesAction = Action & SetSearchEntriesParams;
export declare type ApplySearchFilterAction = Action & {
    filter: string;
    key: string;
};
export declare type ApplySearchFilterActionCreator = (filter: string, key: string) => ApplySearchFilterAction;
export declare type ClearFiltersAction = Action;
export declare type ClearFiltersActionCreator = () => ClearFiltersAction;
export declare type UpdateCurrentFacetAction = Action & {
    facet: string;
};
export declare type UpdateCurrentFacetActionCreator = (facet: string) => UpdateCurrentFacetAction;
export declare type UpdateCurrentTabAction = Action & {
    id: number;
};
export declare type UpdateCurrentTabActionCreator = (id: number) => UpdateCurrentFacetAction;
export declare type UpdateSearchTermAction = Action & {
    term: string;
};
export declare type UpdateSearchTermActionCreator = (term: string) => UpdateSearchTermAction;
export declare type UpdateSortOrderAction = Action & {
    orderBy: string;
    facet: string;
};
export declare type UpdateSortOrderActionCreator = (orderBy: string, facet: string) => UpdateSortOrderAction;
export declare type UpdatePageIndexAction = Action & {
    pageIndex: number;
};
export declare type UpdatePageIndexActionCreator = (pageIndex: number) => UpdatePageIndexAction;
export {};
