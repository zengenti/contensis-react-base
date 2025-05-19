import React from 'react';
import { connect } from 'react-redux';

import { toJS } from '../search/ToJs';
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
import {
  getCurrentFacet,
  getCurrentTab,
  getFacet,
  getFacetTitles,
  getFacetsTotalCount,
  getFeaturedResults,
  getIsLoading,
  getPageIndex,
  getPageIsLoading,
  getPaging,
  getQueryParameter,
  getRenderableFilters,
  getResults,
  getSearchTerm,
  getSearchTotalCount,
  getSelectedFilters,
  getTabFacets,
  getTabsAndFacets,
  getTotalCount,
} from '../redux/selectors';
import { Mappers } from '../models/Search';
import { SearchProps } from '../models/SearchProps';
import { AppState } from '../models/SearchState';

const withSearch =
  (mappers: Mappers) =>
  <Props extends Record<string, any>>(
    SearchComponent: React.ComponentType<Props>
  ) => {
    const Wrapper: React.FC<Props & SearchProps<any>> = props => {
      return <SearchComponent {...props} />;
    };

    Wrapper.displayName = `withSearch(${
      SearchComponent.displayName || SearchComponent.name
    })`;

    const mapStateToProps = (state: AppState) => {
      return {
        currentFacet: getCurrentFacet(state),
        currentPageIndex: getPageIndex(state),
        currentTabIndex: getCurrentTab(state),
        facet: getFacet(state),
        facets: getTabFacets(state),
        facetsTotalCount: getFacetsTotalCount(state),
        facetTitles: getFacetTitles(state),
        featuredResults: getFeaturedResults(state),
        filters: getRenderableFilters(state),
        isLoading: getIsLoading(state),
        paging: getPaging(state),
        pageIsLoading: getPageIsLoading(state),
        results: getResults(state),
        resultsInfo: mappers?.resultsInfo && mappers.resultsInfo(state),
        searchTerm: getSearchTerm(state),
        searchTotalCount: getSearchTotalCount(state),
        selectedFilters: getSelectedFilters(state),
        sortOrder: getQueryParameter({ state }, 'dynamicOrderBy', []),
        tabsAndFacets: getTabsAndFacets(state),
        totalCount: getTotalCount(state),
      };
    };

    const mapDispatchToProps = {
      clearFilters: (filterKey?: string) =>
        withMappers(clearFilters(filterKey), mappers),
      updateCurrentFacet: (facet: string) =>
        withMappers(updateCurrentFacet(facet), mappers),
      updateCurrentTab: (id: number) =>
        withMappers(updateCurrentTab(id), mappers),
      updatePageIndex: (pageIndex: number, scrollToElement?: string) =>
        withMappers(updatePageIndex(pageIndex, scrollToElement), mappers),
      updatePageSize: (pageSize: number, scrollToElement?: string) =>
        withMappers(updatePageSize(pageSize, scrollToElement), mappers),
      updateSearchTerm: (term: string) =>
        withMappers(updateSearchTerm(term), mappers),
      updateSelectedFilters: (
        filter: string,
        key: string,
        isUnknownItem = false,
        scrollToElement?: string
      ) =>
        withMappers(
          updateSelectedFilters(filter, key, isUnknownItem, scrollToElement),
          mappers
        ),
      updateSortOrder: (orderBy: string) =>
        withMappers(updateSortOrder(orderBy), mappers),
    };

    const connector = connect(mapStateToProps, mapDispatchToProps);

    return connector(toJS(Wrapper) as any);
  };

export default withSearch;
