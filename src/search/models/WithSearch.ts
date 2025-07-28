import { Facet, Filter, Paging, Tab } from './SearchState';

export type WithSearch<T> = {
  className: string;
  /** Dispatch action to clear all selected filters */
  clearFilters: Function;
  /** The key of the current facet  */
  currentFacet: string;
  /** The index of the current page */
  currentPageIndex: number;
  /** The index of the current tab */
  currentTabIndex: number;
  // /** ? */
  // entry: object;
  /** The entire facet object from the state */
  facet: Facet;
  /** All facets from state */
  facets: { [key: string]: Facet };
  /** Featured results entry array */
  featuredResults: T[];
  /** ? */
  filters: { [key: string]: Filter };
  /** Search loading status */
  isLoading: boolean;
  /** Array of entries for current page of results */
  results: T[];
  /**
   * Results info object
   *
   * This is defined in the SearchTranformation.resultsInfo that is passed to the withSearch HOC
   */
  resultsInfo: any;
  /** The paging information of the current search */
  paging: Paging;
  /** Page loading status (best used with loadMorePaging) */
  pageIsLoading: boolean;
  /** The currently applied keyword / search term */
  searchTerm: string;
  /** The current sort order of the results */
  sortOrder: string[];
  /** An array of each tab on the state */
  tabsAndFacets: Tab[];
  /** param {string} facet : The key of the facet to set */
  updateCurrentFacet: Function;
  /** param {number} id : The tabId to set */
  updateCurrentTab: Function;
  /** param {number} pageIndex : The page index to set */
  updatePageIndex: Function;
  /** param {string} term : The keyword term to set */
  updateSearchTerm: Function;
  /**
   * param filter
   * param key
   */
  updateSelectedFilters: Function;
  /**
   * param orderBy
   */
  updateSortOrder: Function;
};
