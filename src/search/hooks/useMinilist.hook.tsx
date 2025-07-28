import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { Context } from '../models/Enums';
import { MinilistProps, UseMinilistProps } from '../models/SearchProps';
import { AppState, Facet, Filters } from '../models/SearchState';

import { triggerSearch } from '../redux/actions';
import {
  getResults,
  getIsLoading,
  getFacet,
  getPaging,
  getSearchTerm,
  getFilters,
} from '../redux/selectors';

const makeSelectMinilistProps = () =>
  createSelector(
    (state: AppState) => state,
    (_: any, id: string) => id,
    (state: AppState, id: string) =>
      id
        ? {
            facet: getFacet(state, id, Context.minilist, 'js'),
            filters: getFilters(state, id, Context.minilist, 'js'),
            isLoading: getIsLoading(state, Context.minilist, id),
            pagingInfo: getPaging(state, id, Context.minilist, 'js'),
            results: getResults(state, id, Context.minilist, 'js'),
            searchTerm: getSearchTerm(state),
          }
        : null
  );

const useMinilist = <SearchResults extends Record<string, any>>(
  {
    id,
    config,
    excludeIds,
    mapper,
    mappers,
    params,
    defaultLang,
    debug,
  }: UseMinilistProps = { id: '' }
) => {
  const dispatch = useDispatch();

  const selectMinilistProps = useMemo(makeSelectMinilistProps, [id]);

  const { facet, filters, isLoading, pagingInfo, results, searchTerm } =
    useSelector((state: AppState) => selectMinilistProps(state, id)) || {
      facet: {} as Facet,
      filters: {} as Filters,
      isLoading: false,
      pagingInfo: {} as Facet['pagingInfo'],
      results: [] as SearchResults[],
      searchTerm: '',
    };
  // useSelector((state: AppState) => ({
  //   facet: getFacet(state, id, Context.minilist).toJS(),
  //   filters: getFilters(state, id, Context.minilist).toJS(),
  //   isLoading: getIsLoading(state, Context.minilist, id),
  //   pagingInfo: getPaging(state, id, Context.minilist).toJS(),
  //   results: getResults(state, id, Context.minilist).toJS(),
  //   searchTerm: getSearchTerm(state),
  // }));

  useEffect(() => {
    if (id && (mapper || mappers?.results)) {
      dispatch(
        triggerSearch({
          config,
          context: Context.minilist,
          defaultLang,
          facet: id,
          mapper,
          mappers,
          params,
          excludeIds,
          debug,
        })
      );
    }
  }, [dispatch, excludeIds, id, defaultLang, params]);

  return {
    filters,
    isLoading,
    paging: pagingInfo,
    results,
    searchTerm,
    title: facet.title,
  } as MinilistProps<SearchResults>;
};

export default useMinilist;
