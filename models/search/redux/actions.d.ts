import { Mappers } from '../models/Search';
import { ClearFiltersActionCreator, InitListingActionCreator, TriggerSearchActionCreator } from '../models/SearchActions';
export declare const withMappers: <T>(action: T, mappers: Mappers) => T & {
    mappers: Mappers;
};
export declare const triggerSearch: TriggerSearchActionCreator;
export declare const initListing: InitListingActionCreator;
export declare const navigate: (path: string, state?: any) => {
    type: string;
    path: string;
    state: any;
};
export declare const clearFilters: ClearFiltersActionCreator;
export declare const updatePageIndex: (pageIndex: number, scrollYPos?: number | undefined) => {
    type: string;
    pageIndex: number;
    scrollYPos: number | undefined;
};
export declare const updateCurrentFacet: (facet: string) => {
    type: string;
    facet: string;
};
export declare const updateCurrentTab: (id: number) => {
    type: string;
    id: number;
};
export declare const updateSearchTerm: (term: string) => {
    type: string;
    term: string;
};
export declare const updateSelectedFilters: (filter: string, key: string, isUnknownItem?: boolean, scrollYPos?: number | undefined) => {
    type: string;
    filter: string;
    key: string;
    isUnknownItem: boolean;
    scrollYPos: number | undefined;
};
export declare const updateSortOrder: (orderBy: string, facet?: string | undefined) => {
    type: string;
    orderBy: string;
    facet: string | undefined;
};
