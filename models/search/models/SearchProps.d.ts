import { clearFilters, updateCurrentFacet, updateCurrentTab, updatePageIndex, updateSearchTerm, updateSelectedFilters, updateSortOrder } from '../redux/actions';
import { SearchFacet, Mappers } from '../models/Search';
import { DebugFlags } from '../models/SearchActions';
import { Facet as StateFacet, Facets, Filters, Paging, SelectedFilters } from '../models/SearchState';
export interface MinilistProps<SearchResults = any> {
    filters: Filters;
    isLoading: boolean;
    paging: Paging;
    results: SearchResults[];
    resultsInfo: any;
    searchTerm: string;
    sortOrder: string[];
    title: string;
    updatePageIndex: typeof updatePageIndex;
    updateSelectedFilters: typeof updateSelectedFilters;
    updateSortOrder: typeof updateSortOrder;
}
export interface ListingProps<SearchResults = any> {
    clearFilters: typeof clearFilters;
    currentListing: string;
    currentPageIndex: number;
    featured: SearchResults[];
    filters: Filters;
    isLoading: boolean;
    listing: StateFacet;
    pageIsLoading: boolean;
    paging: Paging;
    results: SearchResults[];
    resultsInfo: any;
    searchTerm: string;
    selectedFilters: SelectedFilters;
    sortOrder: string[];
    title: string;
    updateCurrentFacet: typeof updateCurrentFacet;
    updatePageIndex: typeof updatePageIndex;
    updateSearchTerm: typeof updateSearchTerm;
    updateSelectedFilters: typeof updateSelectedFilters;
    updateSortOrder: typeof updateSortOrder;
}
export interface SearchProps<SearchResults = any> {
    clearFilters: typeof clearFilters;
    currentFacet: string;
    currentPageIndex: number;
    currentTabIndex: number;
    facet: StateFacet;
    facets: Facets;
    featuredResults: SearchResults[];
    filters: Filters;
    isLoading: boolean;
    paging: Paging;
    pageIsLoading: boolean;
    results: SearchResults[];
    resultsInfo: any;
    searchTerm: string;
    selectedFilters: SelectedFilters;
    sortOrder: string[];
    tabsAndFacets: any;
    updateCurrentFacet: typeof updateCurrentFacet;
    updateCurrentTab: typeof updateCurrentTab;
    updatePageIndex: typeof updatePageIndex;
    updateSearchTerm: typeof updateSearchTerm;
    updateSelectedFilters: typeof updateSelectedFilters;
    updateSortOrder: typeof updateSortOrder;
}
export interface UseListingProps {
    debug?: DebugFlags;
    defaultLang?: string;
    mappers?: Mappers;
    params?: {
        [key: string]: string;
    };
    /** Reserved for future use */
    id?: string;
}
export interface UseMinilistProps {
    id: string;
    config?: SearchFacet;
    debug?: DebugFlags;
    defaultLang?: string;
    excludeIds?: string[];
    mapper?: Mappers['results'];
    mappers?: Mappers;
    params?: {
        [key: string]: string;
    };
}
