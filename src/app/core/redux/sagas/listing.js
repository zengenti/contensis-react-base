import {
  put,
  all,
  select,
  takeLatest,
  call,
  fork,
  takeEvery,
} from 'redux-saga/effects';
import { deliveryApi } from '~/core/util/ContensisDeliveryApi';
import { getEntryPublishedDate } from '~/core/util/extractDataFromObject';
import {
  LISTING_SET_NODE,
  LISTING_EXECUTE_SEARCH,
  // LISTING_SET_SEARCH_RESULTS,
  LISTING_ADD_RESULTS,
  LISTING_ADD_EVENT_TO_DATE_DICTIONARY,
  LISTING_SET_PAGE_COUNT,
  LISTING_UPDATE_PAGE_INDEX,
  LISTING_REPLACE_RESULTS,
  LISTING_SET_CATEGORY_OPTION,
  LISTING_SET_DATE_OPTION,
} from '../types/listing';
import {
  getListingAndSearchhNodesQuery,
  getSearchQuery,
  getListingsQuery,
} from '~/core/util/queries';
import { selectListingTree } from '../selectors/listing';
import { getPathFromEntry } from '~/core/util/navHelper';
import isNonEmptyArray from '~/core/util/isNonEmptyArray';

// used if no defaultPAgeSize in listing cms entry
export const DEFAULT_PAGE_SIZE = 9;

export const listingSagas = [
  takeEvery(LISTING_EXECUTE_SEARCH, executeSearch),
  // takeEvery(LISTING_SET_NODE, executeSearch),
  takeLatest(LISTING_UPDATE_PAGE_INDEX, executeSearch),
  takeLatest(LISTING_SET_CATEGORY_OPTION, executeSearch),
  takeLatest(LISTING_SET_DATE_OPTION, executeSearch),
];

export function* initialiseListingsSaga() {
  const query = yield getListingAndSearchhNodesQuery();
  const result = yield deliveryApi.search(query, 1);
  if (result && result.items) {
    yield all(
      result.items.map(item => {
        return put({
          type: LISTING_SET_NODE,
          listingKey: item.sys.slug,
          contentTypes: item.contentTypes ? item.contentTypes : [],
          contentTypeId: item.sys.contentTypeId,
          listingType: item.listingType ? item.listingType : null,
          pageIndex: item.listingType === 'month-eventdates' ? null : 0,
          defaultPageSize: item.defaultPageSize
            ? item.defaultPageSize
            : DEFAULT_PAGE_SIZE,
          categoryOptions: item.categoryOptions ? item.categoryOptions : [],
        });
      })
    );

    // initialise listings' first pages, but not searches
    yield all(
      result.items.map(item => {
        if (item.sys.contentTypeId === 'listing')
          return call(executeSearch, {
            listingKey: item.sys.slug,
            suppressSearch: false,
          });
        return true;
      })
    );
  }
}

// search types will search dynamically
// however listing types based on date will do an inital retrieval of all their listings
// and searches will filter these initial results
// need to get 'search' contentType id to use this too as very similar - just mapped differently and different reducer case handling
function* executeSearch(action) {
  if (action.suppressSearch) return true;
  const listingTree = yield select(selectListingTree);
  const listingNodeAsMap = listingTree.get(action.listingKey);
  const listingNode =
    listingNodeAsMap && listingNodeAsMap.toJS && listingNodeAsMap.toJS();
  if (listingNode) {
    const {
      contentTypeId,
      listingType,
      contentTypes,
      filters,
      searchTerm,
      defaultPageSize,
    } = listingNode;
    //TODO: check this getListingsQuery is still required, this has an extra unused argument
    const baseQuery =
      contentTypeId && contentTypeId === 'listing'
        ? yield getListingsQuery(
            contentTypes || [],
            listingType,
            filters,
            searchTerm
          )
        : yield getSearchQuery(contentTypes, searchTerm);
    baseQuery.pageIndex = action.pageIndex !== undefined ? action.pageIndex : 0;
    baseQuery.pageSize = defaultPageSize || DEFAULT_PAGE_SIZE;
    const pageCount = yield addListingSummaries(
      baseQuery,
      action.listingKey,
      listingType === 'month-eventdates' ? false : true
    );

    // month based listings - get all that match query up front so calendar month can be populated
    if (listingType === 'month-eventdates') {
      if (pageCount > 1) {
        // initialise an array to map over with a yield all
        const pageIndexArray = [];
        for (let i = 1; i < pageCount; i++) {
          pageIndexArray.push(i);
        }
        yield all(
          pageIndexArray.map(pageIndex => {
            const query = { ...baseQuery };
            query.pageIndex = pageIndex;
            return call(addListingSummaries, query, action.listingKey, false);
          })
        );
      }
      yield fork(ensureDateDictionary, action.listingKey);
    } else {
      yield put({
        type: LISTING_SET_PAGE_COUNT,
        pageCount,
        listingKey: action.listingKey,
      });
    }
  }
}

// [TODO] - trigger this on date change and check if month there (eg historic traversal of calendar)
// and if not, search
// and populate empty month if 0 results, else results on key
// adds listing summaries and returns a pagecount
const addListingSummaries = function*(query, listingKey, replaceResults) {
  const result = yield deliveryApi.search(query, 1);
  const pageCount = result && result.pageSize ? result.pageCount : 0;
  // console.info(`Page Count( from getIndexContentSummaries): ${pageCount}`);
  const items = result ? result.items : [];
  // console.info(`Page Index: ${query.pageIndex}`);
  yield put({
    type: replaceResults ? LISTING_REPLACE_RESULTS : LISTING_ADD_RESULTS,
    listingKey,
    listingResults: mapResultItemsToListingSummary(items),
  });
  return pageCount;
};

// [TODO] -refactor contentType event to have eventDate component be pluralised as it's an array
const mapResultItemsToListingSummary = items => {
  return items.map(item => {
    const publishedDate = getEntryPublishedDate(item);

    //  [TODO] refactor out either title or entryTitle (search vs listing pages one using one one using other - consolidate)
    return {
      id: item.sys.id,
      contentTypeId: item.sys.contentTypeId,
      entryTitle: item.entryTitle,
      title: item.entryTitle,
      summary: item.summary,
      telephone: item.telephone,
      slug: item.sys.slug,
      listingImage: item.listingImage,
      publishedDate,
      events: item.eventDate ? item.eventDate : null,
      categories:
        item.articleCategory &&
        isNonEmptyArray(item.articleCategory.category) &&
        item.articleCategory.category.map(({ key, name }) => ({ key, name })),
      path: getPathFromEntry(item),
    };
  });
};

function* ensureDateDictionary(listingKey) {
  const listingTree = yield select(selectListingTree);
  const upComingEventsAsMap =
    listingTree && listingTree.getIn([listingKey, 'results']);
  const upComingEvents =
    upComingEventsAsMap &&
    upComingEventsAsMap.toJS &&
    upComingEventsAsMap.toJS();
  if (upComingEvents && upComingEvents.length) {
    yield all(
      upComingEvents.map(event => {
        return call(processEventForDateDictionary, listingKey, event);
      })
    );
  }
}

function* processEventForDateDictionary(listingKey, event) {
  if (event && event.events && event.events.length) {
    yield all(
      event.events.map((eventDate, index) => {
        return call(
          addDatesForSingleEventDateToDictionary,
          listingKey,
          event.id,
          eventDate,
          index,
          event.events.length,
          event.entryTitle,
          event.listingImageUri,
          event.path,
          event.categories
        );
      })
    );
  }
}

// a single eventDate item has a start date and possible end date, for all the days it spans, add info for those days to the dictionary
function* addDatesForSingleEventDateToDictionary(
  listingKey,
  eventId,
  eventDate,
  eventSeriesIndex,
  eventSeriesTotal,
  entryTitle,
  listingImageUri,
  path,
  categories
) {
  let { startDateTime, endDateTime } = eventDate || {};
  if (startDateTime) {
    const isOneDay =
      !endDateTime || startDateTime.substr(0, 10) === endDateTime.substr(0, 10);
    const dates = getDatesBetweenDateRange(startDateTime, endDateTime, true);
    const daysSpanned = dates.length;
    if (dates) {
      let time = { text: 'All day event' };
      startDateTime = new Date(startDateTime);
      const startTime = startDateTime.toTimeString();

      //if start/end are set, get human readable version from these datetimes, else just display time 'text'.
      //if no end and start isn't 0am, set start.
      //if end and end does not equal start, set start and end
      //else time is 'All day'.
      if (!endDateTime) {
        if (!startTime.startsWith('00:00:00')) {
          time = { start: startDateTime };
        }
      } else {
        endDateTime = new Date(endDateTime);
        const endTime = endDateTime.toTimeString();
        //has an end time
        //not the same, then display from, to.
        if (startTime !== endTime) {
          time = { start: startDateTime, end: endDateTime };
        }
      }

      let datesWithData = dates.reduce(
        (dictionary, date, eventInstanceIndex) => {
          dictionary[date] = {
            listingKey,
            eventId,
            entryTitle,
            isOneDay,
            eventSeriesTotal,
            eventSeriesIndex,
            daysSpanned,
            eventInstanceDates: dates,
            time,
            eventInstanceIndex,
            listingImageUri,
            path,
            categories,
          };
          return dictionary;
        },
        {}
      );
      yield put({
        type: LISTING_ADD_EVENT_TO_DATE_DICTIONARY,
        datesWithData,
        listingKey,
      });
    }
  }
}
// return an array of ISO string dates for each date including and between 2 dates
const getDatesBetweenDateRange = (
  fullStartDateString,
  fullEndDateString,
  suppressPastDates
) => {
  const startDateString =
    fullStartDateString && fullStartDateString.substr(0, 10);
  const endDateString = fullEndDateString && fullEndDateString.substr(0, 10);
  // first check if only one date ie no range, or start end is same day...
  if (startDateString && (!endDateString || startDateString === endDateString))
    return allowDate(startDateString, suppressPastDates)
      ? [startDateString]
      : [];
  if (endDateString && !startDateString)
    return allowDate(endDateString, suppressPastDates) ? [endDateString] : [];
  // then it must be a range of days, work out each of those days...
  const dates = [];
  let dateIndexString = startDateString;
  while (dateIndexString <= endDateString) {
    if (allowDate(dateIndexString, suppressPastDates)) {
      dates.push(dateIndexString);
    }
    const date = new Date(dateIndexString);
    dateIndexString = addDays(date, 1);
  }
  return dates;
};

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().substr(0, 10);
};

const allowDate = (dateString, suppressPastDates) => {
  const todayDateString = new Date().toISOString().substr(0, 10);
  return !suppressPastDates || dateString >= todayDateString;
};
