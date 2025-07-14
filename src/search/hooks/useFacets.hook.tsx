import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  clearFilters,
  updateCurrentFacet,
  updateCurrentTab,
  updatePageIndex,
  updatePageSize,
  updateSearchTerm,
  updateSelectedFilters,
  updateSortOrder,
  withMappers,
} from '../redux/actions';
import defaultMappers from '../transformations';
import { Context } from '../models/Enums';
import { SearchProps, UseFacetsProps } from '../models/SearchProps';
import { AppState } from '../models/SearchState';
import {
  getPaging,
  getResults,
  getSelectedFilters,
  selectFacets,
} from '../redux/selectors';
import { Mappers } from '../models/Search';
const {
  getCurrent,
  getCurrentTab,
  getFacet,
  getFacetsTotalCount,
  getFacetTitles,
  getFeaturedResults,
  getIsLoading,
  getPageIndex,
  getPageIsLoading,
  getQueryParameter,
  getRenderableFilters,
  getSearchTerm,
  getSearchTotalCount,
  getTabFacets,
  getTabsAndFacets,
  getTotalCount,
} = selectFacets;

const makeSelectFacetsProps = () =>
  createSelector(
    (state: AppState) => state,
    (_: any, mappers: Mappers) => mappers,
    (state: AppState, mappers: Mappers) => ({
      currentFacet: getCurrent(state),
      currentPageIndex: getPageIndex(state),
      currentTabIndex: getCurrentTab(state),
      facet: getFacet(state),
      facetTitles: getFacetTitles(state),
      facets: getTabFacets(state),
      facetsTotalCount: getFacetsTotalCount(state),
      featured: getFeaturedResults(state),
      filters: getRenderableFilters(state),
      isLoading: getIsLoading(state),
      pageIsLoading: getPageIsLoading(state),
      paging: getPaging(state, '', Context.facets, 'js'),
      results: getResults(state, '', Context.facets, 'js'),
      resultsInfo:
        mappers &&
        typeof mappers.resultsInfo === 'function' &&
        mappers.resultsInfo(state),
      searchTerm: getSearchTerm(state),
      searchTotalCount: getSearchTotalCount(state),
      selectedFilters: getSelectedFilters(state, '', Context.facets, 'js'),
      sortOrder: getQueryParameter({ state }, 'dynamicOrderBy', []),
      tabsAndFacets: getTabsAndFacets(state),
      totalCount: getTotalCount(state),
    })
  );

const useFacets = <SearchResults extends Record<string, any>>(
  { mappers }: UseFacetsProps = {
    id: '',
  }
) => {
  const dispatch = useDispatch();

  const m = mappers || defaultMappers;

  const selectListingProps = useMemo(makeSelectFacetsProps, [m]);

  const dispatchProps = {
    clearFilters: (filterKey?: string) =>
      dispatch(withMappers(clearFilters(filterKey), m)),
    updateCurrentFacet: (facet: string) =>
      dispatch(withMappers(updateCurrentFacet(facet), m)),
    updateCurrentTab: (id: number) => withMappers(updateCurrentTab(id), m),
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
    currentFacet,
    currentPageIndex,
    currentTabIndex,
    facet,
    facets,
    facetsTotalCount,
    facetTitles,
    featured,
    filters,
    isLoading,
    paging,
    pageIsLoading,
    results,
    resultsInfo,
    searchTerm,
    searchTotalCount,
    selectedFilters,
    sortOrder,
    tabsAndFacets,
    totalCount,
  } = useSelector((state: AppState) => selectListingProps(state, m));

  return {
    currentFacet,
    currentPageIndex,
    currentTabIndex,
    facet,
    facets,
    facetsTotalCount,
    facetTitles,
    featured,
    filters,
    isLoading,
    paging,
    pageIsLoading,
    results,
    resultsInfo,
    searchTerm,
    searchTotalCount,
    selectedFilters,
    sortOrder,
    tabsAndFacets,
    totalCount,
    ...dispatchProps,
  } as SearchProps<SearchResults>;
};

export default useFacets;
