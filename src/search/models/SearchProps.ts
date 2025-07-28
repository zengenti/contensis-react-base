import {
  clearFilters,
  updateCurrentFacet,
  updateCurrentTab,
  updatePageIndex,
  updatePageSize,
  updateSearchTerm,
  updateSelectedFilters,
  updateSortOrder,
} from '../redux/actions';

import { SearchFacet, Mappers } from '../models/Search';
import { DebugFlags } from '../models/SearchActions';
import {
  Facet as StateFacet,
  Facets,
  Filters,
  Paging,
  SelectedFilters,
  TabAndFacets,
} from '../models/SearchState';

// TODO: some of these props are not implemented yet
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
  updatePageSize: typeof updatePageSize;
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
  updatePageSize: typeof updatePageSize;
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
  facetTitles: {
    isSelected: boolean;
    key: string;
    title: string;
    totalCount: number;
  }[];
  facets: Facets;
  featured: SearchResults[];
  filters: Filters;
  isLoading: boolean;
  pageIsLoading: boolean;
  paging: Paging;
  results: SearchResults[];
  resultsInfo: any;
  searchTerm: string;
  searchTotalCount: number;
  selectedFilters: SelectedFilters;
  sortOrder: string[];
  tabsAndFacets: TabAndFacets;
  totalCount: number;
  updateCurrentFacet: typeof updateCurrentFacet;
  updateCurrentTab: typeof updateCurrentTab;
  updatePageIndex: typeof updatePageIndex;
  updatePageSize: typeof updatePageSize;
  updateSearchTerm: typeof updateSearchTerm;
  updateSelectedFilters: typeof updateSelectedFilters;
  updateSortOrder: typeof updateSortOrder;
}
export interface UseFacetsProps {
  debug?: DebugFlags;
  defaultLang?: string;
  mappers?: Mappers;
  /** Reserved for future use */
  id?: string;
  params?: { [key: string]: string };
  // config?: SearchFacet;
}
export interface UseListingProps {
  debug?: DebugFlags;
  defaultLang?: string;
  mappers?: Mappers;
  /** Reserved for future use */
  id?: string;
  params?: { [key: string]: string };
  // config?: SearchFacet;
}

export interface UseMinilistProps {
  id: string;
  config?: SearchFacet;
  debug?: DebugFlags;
  defaultLang?: string;
  excludeIds?: string[];
  mapper?: Mappers['results'];
  mappers?: Mappers;
  params?: { [key: string]: string };
}
