import { action } from 'app/util/helpers';
import {
  LISTING_SET_SEARCH_TERM,
  LISTING_EXECUTE_SEARCH,
  LISTING_ENSURE_SEARCH_RESULTS,
  LISTING_SET_FILTER_DATE,
  LISTING_UPDATE_PAGE_INDEX,
  LISTING_SET_CATEGORY_OPTION,
  LISTING_SET_DATE_OPTION,
} from '../types/listing';

export const setListingSearchTerm = (listingKey, searchTerm, source) => {
  debugger;
  action(LISTING_SET_SEARCH_TERM, { listingKey, searchTerm, source });
};
export const executeSearch = listingKey =>
  action(LISTING_EXECUTE_SEARCH, { listingKey });
export const listingEnsureResults = listingKey =>
  action(LISTING_ENSURE_SEARCH_RESULTS, { listingKey });
export const listingSetFilterDate = (listingKey, date) =>
  action(LISTING_SET_FILTER_DATE, { listingKey, date });
export const updatePageIndex = (listingKey, pageIndex, suppressSearch) =>
  action(LISTING_UPDATE_PAGE_INDEX, { listingKey, pageIndex, suppressSearch });
export const setCategoryOption = (listingKey, categoryKey, suppressSearch) =>
  action(LISTING_SET_CATEGORY_OPTION, {
    listingKey,
    categoryKey,
    suppressSearch,
  });
export const setDateOption = (listingKey, { year, month }) => {
  console.info('setDateOption action', year, 'and', month);
  const payload = {
    listingKey,
    yearKey: year,
    monthKey: month,
  };
  console.info('payload', payload);
  return action(LISTING_SET_DATE_OPTION, payload);
};
