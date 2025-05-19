import React from 'react';
import { connect } from 'react-redux';
import { toJS } from '../search/ToJs';
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
import { selectListing } from '../redux/selectors';
import { Mappers } from '../models/Search';
import { AppState } from '../models/SearchState';
import { ListingProps } from '../models/SearchProps';

const withListing =
  (mappers: Mappers) =>
  <Props extends Record<string, any>>(ListingComponent: React.FC<Props>) => {
    const Wrapper: React.FC<Props & ListingProps<any>> = props => {
      return <ListingComponent {...props} />;
    };

    Wrapper.displayName = `withListing(${
      ListingComponent.displayName || ListingComponent.name
    })`;

    const {
      getCurrent,
      getFeaturedResults,
      getIsLoading,
      getListing,
      getPageIndex,
      getPaging,
      getQueryParameter,
      getRenderableFilters,
      getResults,
      getSearchTerm,
      getSelectedFilters,
    } = selectListing;

    const mapStateToProps = (state: AppState) => {
      return {
        currentListing: getCurrent(state),
        currentPageIndex: getPageIndex(state),
        listing: getListing(state),
        featured: getFeaturedResults(state),
        filters: getRenderableFilters(state),
        isLoading: getIsLoading(state),
        paging: getPaging(state),
        results: getResults(state),
        resultsInfo:
          mappers &&
          typeof mappers.resultsInfo === 'function' &&
          mappers.resultsInfo(state),
        searchTerm: getSearchTerm(state),
        selectedFilters: getSelectedFilters(state),
        sortOrder: getQueryParameter({ state }, 'dynamicOrderBy', []),
      };
    };

    const mapDispatchToProps = {
      clearFilters: (filterKey?: string) =>
        withMappers(clearFilters(filterKey), mappers),
      updateCurrentFacet: (facet: string) =>
        withMappers(updateCurrentFacet(facet), mappers),
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

    return connect(mapStateToProps, mapDispatchToProps)(toJS(Wrapper) as any);
  };

export default withListing;
