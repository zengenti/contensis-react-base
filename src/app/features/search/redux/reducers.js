import { List, Map, fromJS } from 'immutable';

import { fixImageUri } from '~/core/util/ContensisDeliveryApi';
import {
  SET_ROUTE_FILTERS,
  SET_SEARCH_ENTRIES,
  UPDATE_CURRENT_FACET,
  UPDATE_SEARCH_TERM,
  UPDATE_PAGE_INDEX,
  UPDATE_SELECTED_FILTERS,
  CLEAR_FILTERS,
  LOAD_FILTERS,
  LOAD_FILTERS_COMPLETE,
  LOAD_FILTERS_ERROR,
  EXECUTE_FEATURED_SEARCH,
  SET_FEATURED_ENTRIES,
  EXECUTE_FEATURED_SEARCH_ERROR,
} from './types';
import { bindFeaturedCardProps } from '../utils/bindCardProps';
import ProjectHelper from '~/core/util/helpers';

const featuredEntries = Map({
  isLoading: false,
  isError: false,
  title: 'Featured posts',
  items: new List(),
});

const pagingInfo = Map({
  pageIndex: 0,
  pageCount: 0,
  totalCount: 0,
  pageSize: 0,
});

const authentication = Map({
  isLoginRequired: false,
});

const searchFacet = Map({
  title: null,
  authentication,
  entries: new List([]),
  featuredEntries: featuredEntries,
  filters: new Map(),
  queryDuration: 0,
  pagingInfo,
});

const filtering = Map({
  isLoading: false,
  isError: false,
  title: null,
  items: new List(),
});

const filterItem = Map({
  key: null,
  type: null,
  title: null,
  path: null,
  isSelected: false,
});

const initialState = Map({
  currentFacet: null,
  term: '',
  facets: new Map({}),
  config: new Map({ isLoaded: false, isError: false }),
  filteredRoute: null,
});

export const searchParams = Map({
  searchTerm: null,
  versionStatus: 'published',
  projectId: 'website',
  pageSize: 10,
  filters: [],
  contentTypeIds: [],
  dataFormats: [],
  orderBy: [],
  weightedSearchFields: [],
  featuredEntryId: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ROUTE_FILTERS: {
      /* eslint-disable no-console */
      const {
        currentFacet,
        entry,
        filteredRoute,
        term,
        versionStatus,
      } = action;
      const routeFilters = filteredRoute.get('filters');

      // if (entry && entry.facets) {
      //   Object.keys(entry.facets)
      //     .map(key => ({ type: key, ...entry.facets[key] }))
      //     .forEach(facet => {
      if (entry) {
        const facet = {};
        facet.type = currentFacet; // Overriding facet.type as we only have one facet
        // load filters from entry.facets.filters
        const facetState = state.getIn(['facets', facet.type], new Map({}));
        let filters = Map({});
        Object.keys(facet.filters || {}).forEach(fkey => {
          const filter = facet.filters[fkey];
          filters = filters.set(
            fkey,
            filtering
              .set('title', filter.title)
              .set(
                'items',
                filter.items.map((item, i) =>
                  filterItem
                    .set('title', item.title)
                    .set('key', item.key)
                    .set('value', item.value)
                    .set('type', item.type)
                    .set('path', item.path)
                    .set(
                      'isSelected',
                      facet.type != currentFacet
                        ? facetState.getIn(
                            ['filters', fkey, 'items', i, 'isSelected'],
                            false
                          )
                        : routeFilters &&
                          routeFilters.find(
                            rf =>
                              rf.get('key') == fkey &&
                              rf
                                .get('value')
                                .split(',')
                                .find(
                                  v =>
                                    v.toLowerCase() == item.title.toLowerCase()
                                )
                          )
                        ? true
                        : false
                    )
                )
              )
              .set('isLoaded', true)
          );
        });

        // get any current facet values we wish to preserve
        const currentEntries = facetState.get('entries', new List([]));
        const currentPagingInfo = facetState.get('pagingInfo', pagingInfo);
        const currentQueryDuration = facetState.get('queryDuration', 0);

        // set the search facet
        state = state.setIn(
          ['facets', facet.type],
          searchFacet
            .set('type', facet.type)
            .set('title', facet.title || entry.title)
            .set(
              'searchParams',
              fromJS(facet.searchParams) ||
                searchParams
                  .set(
                    'contentTypeIds',
                    fromJS(
                      (entry.contentTypeIds &&
                        entry.contentTypeIds.replace(/ /g, '').split(',')) ||
                        []
                    )
                  )
                  .set(
                    'contentTypes',
                    fromJS(
                      entry.contentTypes &&
                        entry.contentTypes.map(ct => ({
                          contentTypeId: ct.contentTypeId,
                          url: ct.url,
                        }))
                    ) || []
                  )
                  .set('dataFormats', fromJS(entry.dataFormats))
                  .set('fields', ProjectHelper.stringToArray(entry.fields))
                  .set('excludeResultsPath', entry.excludeResultsPath)
                  .set('limitResultsPath', entry.limitResultsPath)
                  .set('orderBy', entry.orderBy)
                  .set('pageSize', entry.pageSize)
                  .set('replaceResultsPath', fromJS(entry.replaceResultsPath))
                  .set('rootUri', entry.rootUri)
                  .set('searchTerm', term || '')
                  .set(
                    'weightedSearchFields',
                    fromJS(entry.weightedSearchFields) || []
                  )
                  .set('whereClauses', fromJS(entry.whereClauses))
                  .set('versionStatus', versionStatus)
            )
            .set('filters', filters)
            .set('pagingInfo', currentPagingInfo)
            .set('entries', currentEntries)
            .set('queryDuration', currentQueryDuration)
        );

        if (currentFacet == facet.type) {
          state = state.setIn(
            ['facets', facet.type, 'pagingInfo', 'pageIndex'],
            action.pageIndex - 1
          );
        }
      } else {
        state = state.setIn(['config', 'isError'], true);
      }

      return state
        .set('currentFacet', currentFacet)
        .set('filteredRoute', fromJS(filteredRoute))
        .set('term', term || '')
        .setIn(['config', 'isLoaded'], true);
    }
    case UPDATE_SEARCH_TERM: {
      return state.set('term', action.term);
    }
    case UPDATE_CURRENT_FACET: {
      if (action.facet === '') {
        return state;
      }
      return state.set('currentFacet', action.facet);
    }
    case UPDATE_PAGE_INDEX: {
      const currentFacet = state.get('currentFacet');
      return state.setIn(
        ['facets', currentFacet, 'pagingInfo', 'pageIndex'],
        action.pageIndex
      );
    }
    case UPDATE_SELECTED_FILTERS: {
      const currentFacet = state.get('currentFacet');
      const { filter, key } = action;
      let currentItems = state.getIn([
        'facets',
        currentFacet,
        'filters',
        filter,
        'items',
      ]);
      return state.setIn(
        ['facets', currentFacet, 'filters', filter, 'items'],
        currentItems.map(item => {
          if (item.get('key') == key) {
            return item.set('isSelected', !item.get('isSelected'));
          }
          return item;
        })
      );
    }
    case CLEAR_FILTERS: {
      const currentFacet = state.get('currentFacet');
      const currentFilters = state.getIn(['facets', currentFacet, 'filters']);
      return state.setIn(
        ['facets', currentFacet, 'filters'],
        currentFilters.map(filter => {
          const filterItems = (filter && filter.get('items')) || [];
          filterItems.map(item => item.set('isSelected', false));
        })
      );
    }
    case SET_SEARCH_ENTRIES: {
      let items = action.payload.items;
      fixImageUri(items);
      return state
        .setIn(
          ['facets', action.facet, 'entries'],
          fromJS(action.payload.items)
        )
        .setIn(['facets', action.facet, 'queryDuration'], action.duration)
        .setIn(
          ['facets', action.facet, 'pagingInfo', 'pageCount'],
          action.payload.pageCount
        )
        .setIn(
          ['facets', action.facet, 'pagingInfo', 'totalCount'],
          action.payload.totalCount
        )
        .setIn(
          ['facets', action.facet, 'pagingInfo', 'pageSize'],
          action.payload.pageSize
        )
        .setIn(
          ['facets', action.facet, 'pagingInfo', 'pageIndex'],
          state.getIn(
            ['facets', action.facet, 'pagingInfo', 'pageIndex'],
            action.payload.pageIndex
          )
        );
    }
    case LOAD_FILTERS: {
      return state.setIn(
        ['facets', action.facet, 'filters', action.filter, 'isLoading'],
        true
      );
    }
    case LOAD_FILTERS_COMPLETE: {
      const currentlySelectedItems = state
        .getIn(['facets', action.facet, 'filters', action.filter, 'items'], [])
        .filter(item => {
          if (item.get('isSelected') === true) {
            return item;
          }
          return null;
        });
      action.items.map(item => {
        const selectThing = currentlySelectedItems.find(x => {
          return x.get('key') == item.key;
        });
        if (selectThing) {
          item.isSelected = true;
        }
      });
      return state
        .setIn(
          ['facets', action.facet, 'filters', action.filter, 'items'],
          fromJS(action.items)
        )
        .setIn(
          ['facets', action.facet, 'filters', action.filter, 'isLoading'],
          false
        );
    }
    case LOAD_FILTERS_ERROR: {
      return state.setIn(
        ['facets', action.facet, 'filters', action.filter],
        fromJS({
          isLoading: false,
          isError: true,
          items: new List([]),
        })
      );
    }
    case EXECUTE_FEATURED_SEARCH: {
      return state.setIn(
        ['facets', action.facet, 'featuredEntries', 'isLoading'],
        true
      );
    }
    case SET_FEATURED_ENTRIES: {
      return state
        .setIn(
          ['facets', action.facet, 'featuredEntries', 'items'],
          fromJS(action.items.map(item => bindFeaturedCardProps(item)))
        )
        .setIn(['facets', action.facet, 'featuredEntries', 'isLoading'], false);
    }
    case EXECUTE_FEATURED_SEARCH_ERROR: {
      return state.setIn(
        ['facets', action.facet, 'featuredEntries'],
        fromJS({
          isLoading: false,
          isError: true,
          items: new List([]),
        })
      );
    }
    default:
      return state;
  }
};
