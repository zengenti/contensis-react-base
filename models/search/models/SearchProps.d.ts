import { clearFilters, updateCurrentFacet, updateCurrentTab, updatePageIndex, updateSearchTerm, updateSelectedFilters, updateSortOrder } from '../redux/actions';
import { Facet, Facets, Filters, Paging } from '../models/SearchState';
export interface ListingProps<SearchResults = any> {
    clearFilters: typeof clearFilters;
    currentListing: string;
    currentPageIndex: number;
    featured: SearchResults[];
    filters: Filters;
    isLoading: boolean;
    paging: Paging;
    pageIsLoading: boolean;
    results: SearchResults[];
    resultsInfo: any;
    searchTerm: string;
    sortOrder: string[];
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
    facet: Facet;
    facets: Facets;
    featuredResults: SearchResults[];
    filters: Filters;
    isLoading: boolean;
    paging: Paging;
    pageIsLoading: boolean;
    results: SearchResults[];
    resultsInfo: any;
    searchTerm: string;
    sortOrder: string[];
    tabsAndFacets: any;
    updateCurrentFacet: typeof updateCurrentFacet;
    updateCurrentTab: typeof updateCurrentTab;
    updatePageIndex: typeof updatePageIndex;
    updateSearchTerm: typeof updateSearchTerm;
    updateSelectedFilters: typeof updateSelectedFilters;
    updateSortOrder: typeof updateSortOrder;
}
