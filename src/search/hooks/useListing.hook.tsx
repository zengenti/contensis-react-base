import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  clearFilters,
  updateCurrentFacet,
  updatePageIndex,
  updatePageSize,
  updateSearchTerm,
  updateSelectedFilters,
  updateSortOrder,
  withMappers,
} from '../redux/actions';
import defaultMappers from '../transformations';
import { Context } from '../models/Enums';
import { ListingProps, UseListingProps } from '../models/SearchProps';
import { AppState } from '../models/SearchState';
import {
  getPaging,
  getResults,
  getSelectedFilters,
  selectListing,
} from '../redux/selectors';
import { Mappers } from '../models/Search';
const {
  getCurrent,
  getFeaturedResults,
  getIsLoading,
  getListing,
  getPageIndex,
  getPageIsLoading,
  getQueryParameter,
  getRenderableFilters,
  getSearchTerm,
} = selectListing;

const makeSelectListingProps = () =>
  createSelector(
    (state: AppState) => state,
    (_: any, mappers: Mappers) => mappers,
    (state: AppState, mappers: Mappers) => ({
      currentListing: getCurrent(state),
      currentPageIndex: getPageIndex(state),
      listing: getListing(state),
      featured: getFeaturedResults(state),
      filters: getRenderableFilters(state),
      isLoading: getIsLoading(state),
      pageIsLoading: getPageIsLoading(state),
      paging: getPaging(state, '', Context.listings, 'js'),
      results: getResults(state, '', Context.listings, 'js'),
      resultsInfo:
        mappers &&
        typeof mappers.resultsInfo === 'function' &&
        mappers.resultsInfo(state),
      searchTerm: getSearchTerm(state),
      selectedFilters: getSelectedFilters(state, '', Context.listings, 'js'),
      sortOrder: getQueryParameter({ state }, 'dynamicOrderBy', []),
    })
  );

const useListing = <SearchResults extends Record<string, any>>(
  { mappers }: UseListingProps = {
    id: '',
  }
) => {
  const dispatch = useDispatch();

  const m = mappers || defaultMappers;

  const selectListingProps = useMemo(makeSelectListingProps, [m]);

  const dispatchProps = {
    clearFilters: (filterKey?: string) =>
      dispatch(withMappers(clearFilters(filterKey), m)),
    updateCurrentFacet: (facet: string) =>
      dispatch(withMappers(updateCurrentFacet(facet), m)),
    updatePageIndex: (pageIndex: number, scrollToElement?: string) =>
      dispatch(withMappers(updatePageIndex(pageIndex, scrollToElement), m)),
    updatePageSize: (pageSize: number, scrollToElement?: string) =>
      dispatch(withMappers(updatePageSize(pageSize, scrollToElement), m)),
    updateSearchTerm: (term: string) =>
      dispatch(withMappers(updateSearchTerm(term), m)),
    updateSelectedFilters: (
      filter: string,
      key: string,
      isUnknownItem = false,
      scrollToElement?: string
    ) =>
      dispatch(
        withMappers(
          updateSelectedFilters(filter, key, isUnknownItem, scrollToElement),
          m
        )
      ),
    updateSortOrder: (orderBy: string) =>
      dispatch(withMappers(updateSortOrder(orderBy), m)),
  };

  const {
    currentListing,
    currentPageIndex,
    featured,
    filters,
    isLoading,
    listing,
    paging,
    pageIsLoading,
    results,
    resultsInfo,
    searchTerm,
    selectedFilters,
    sortOrder,
  } = useSelector((state: AppState) => selectListingProps(state, m));

  return {
    currentListing,
    currentPageIndex,
    featured,
    filters,
    isLoading,
    listing,
    pageIsLoading,
    paging,
    results,
    resultsInfo,
    searchTerm,
    selectedFilters,
    sortOrder,
    title: listing.title,
    ...dispatchProps,
  } as ListingProps<SearchResults>;
};

export default useListing;
