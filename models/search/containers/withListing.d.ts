import React from 'react';
import { Mappers } from '../models/Search';
declare const withListing: (mappers: Mappers) => (ListingComponent: React.FC<any>) => import("react-redux").ConnectedComponent<React.ComponentType<any>, import("react-redux").Omit<any, "isLoading" | "results" | "filters" | "searchTerm" | "currentListing" | "clearFilters" | "updateCurrentFacet" | "updatePageIndex" | "updateSearchTerm" | "updateSelectedFilters" | "updateSortOrder" | "currentPageIndex" | "paging" | "resultsInfo" | "sortOrder" | "listing" | "featured">>;
export default withListing;
