import { Map, fromJS } from 'immutable';
import {
  LISTING_SET_SEARCH_TERM,
  LISTING_SET_SEARCH_RESULTS,
  LISTING_SET_NODE,
  LISTING_ADD_RESULTS,
  LISTING_SET_FILTER_DATE,
  LISTING_ADD_EVENT_TO_DATE_DICTIONARY,
  LISTING_UPDATE_PAGE_INDEX,
  LISTING_SET_PAGE_COUNT,
  LISTING_REPLACE_RESULTS,
  LISTING_SET_CATEGORY_OPTION,
  LISTING_SET_DATE_OPTION,
} from '../types/listing';

const intitalSearchNode = {
  searchTerm: '',
  results: [],
  contentTypes: [],
  contentTypeId: null,
  filters: {},
  dateDictionary: {},
  pageIndex: null,
  pageCount: null,
  defaultPageSize: null,
  listingType: null,
  categoryOptions: [],
};

const initialState = Map({});

export default (state = initialState, action) => {
  switch (action.type) {
    case LISTING_SET_CATEGORY_OPTION: {
      const currentFiltersAsMap = state.getIn([action.listingKey, 'filters']);
      const currentFilters =
        currentFiltersAsMap &&
        currentFiltersAsMap.toJS &&
        currentFiltersAsMap.toJS();
      const newFilters = currentFilters ? { ...currentFilters } : {};
      if (action.categoryKey === null && newFilters.categoryKey) {
        delete newFilters.categoryKey;
      } else {
        newFilters.categoryKey = action.categoryKey;
      }
      return state.setIn([action.listingKey, 'filters'], fromJS(newFilters));
    }
    case LISTING_SET_DATE_OPTION: {
      const currentFiltersAsMap = state.getIn([action.listingKey, 'filters']);
      const currentFilters =
        currentFiltersAsMap &&
        currentFiltersAsMap.toJS &&
        currentFiltersAsMap.toJS();
      const newFilters = currentFilters ? { ...currentFilters } : {};
      //if null, intentionally delete,
      //else if not undefined, because only null should overwrite, not undefined.
      if (action.yearKey === null && newFilters.yearKey) {
        delete newFilters.yearKey;
      } else if (typeof action.yearKey != 'undefined') {
        newFilters.yearKey = action.yearKey;
      }
      //ditto for month
      if (action.monthKey === null && newFilters.monthKey) {
        delete newFilters.monthKey;
      } else if (typeof action.monthKey != 'undefined') {
        newFilters.monthKey = action.monthKey;
      }
      console.info('new filters', newFilters);
      return state.setIn([action.listingKey, 'filters'], fromJS(newFilters));
    }
    case LISTING_SET_NODE: {
      const searchNode = {
        ...intitalSearchNode,
        contentTypes: action.contentTypes,
        contentTypeId: action.contentTypeId,
        listingType: action.listingType,
        pageIndex: action.pageIndex,
        defaultPageSize: action.defaultPageSize ? action.defaultPageSize : 10,
        categoryOptions: action.categoryOptions,
      };
      return state.set(action.listingKey, fromJS(searchNode));
    }
    case LISTING_SET_SEARCH_TERM: {
      return state.setIn([action.listingKey, 'searchTerm'], action.searchTerm);
    }
    case LISTING_SET_SEARCH_RESULTS: {
      return state.setIn(
        [action.listingKey, 'results'],
        fromJS(action.results)
      );
    }
    case LISTING_ADD_RESULTS: {
      return state.updateIn([action.listingKey, 'results'], array =>
        array.concat(action.listingResults)
      );
    }
    case LISTING_REPLACE_RESULTS: {
      return state.setIn(
        [action.listingKey, 'results'],
        fromJS(action.listingResults)
      );
    }
    case LISTING_SET_FILTER_DATE: {
      return state
        .setIn([action.listingKey, 'filters', 'date'], action.date)
        .setIn([action.listingKey, 'pageIndex'], 0);
    }
    case LISTING_ADD_EVENT_TO_DATE_DICTIONARY: {
      const currentDictionary = state.getIn([
        action.listingKey,
        'dateDictionary',
      ]);
      if (currentDictionary && action.datesWithData) {
        const newDictionary = { ...currentDictionary.toJS() };
        Object.keys(action.datesWithData).forEach(date => {
          const monthKey = date && date.substr(0, 7);
          if (!newDictionary[monthKey]) newDictionary[monthKey] = {};
          if (!newDictionary[monthKey][date]) {
            newDictionary[monthKey][date] = [action.datesWithData[date]];
          } else {
            newDictionary[monthKey][date].push(action.datesWithData[date]);
          }
        });
        return state.setIn(
          [action.listingKey, 'dateDictionary'],
          fromJS(newDictionary)
        );
      }
      break;
    }
    case LISTING_UPDATE_PAGE_INDEX: {
      return state.setIn([action.listingKey, 'pageIndex'], action.pageIndex);
    }
    case LISTING_SET_PAGE_COUNT: {
      return state.setIn([action.listingKey, 'pageCount'], action.pageCount);
    }
    default:
      return state;
  }
};
