import { createSelector } from 'reselect';
import { List } from 'immutable';
import {
  selectRouteEntryCategory,
  selectRouteEntryID,
  selectRouteEntryParentSlug,
} from 'app/redux/selectors/routing';
export const selectListingTree = state => state.get('listing');

export const selectGlobalSearchListingData = state => {
  const mainlistingKey = state.getIn([
    'app',
    'settings',
    'mainSearchReference',
  ]);
  return state.getIn(['listing', mainlistingKey]);
};

export const makeSelectGlobalSearchListingData = () =>
  createSelector(
    [selectGlobalSearchListingData],
    listingData => {
      return listingData;
    }
  );
export const makeSelectListingCategoryOptions = listingKey =>
  createSelector(
    selectListingTree,
    listingTree => {
      return listingTree.getIn([listingKey, 'categoryOptions'], new List());
    }
  );

export const makeSelectListingResults = listingKey =>
  createSelector(
    [selectListingTree],
    listingTree => {
      const resultsAsMap = listingTree.getIn([listingKey, 'results']);
      const results = resultsAsMap && resultsAsMap.toJS && resultsAsMap.toJS();
      let filteredResults = [...results];
      const dateDictionaryAsMap = listingTree.getIn([
        listingKey,
        'dateDictionary',
      ]);
      const dateDictionary =
        dateDictionaryAsMap &&
        dateDictionaryAsMap.toJS &&
        dateDictionaryAsMap.toJS();
      if (results) {
        const filtersAsMap = listingTree.getIn([listingKey, 'filters']);
        const filters =
          filtersAsMap && filtersAsMap.toJS && filtersAsMap.toJS();
        if (filters) {
          Object.keys(filters).forEach(filterKey => {
            switch (filterKey) {
              case 'date': {
                const date = filters[filterKey];
                if (!date) break;
                const monthKey = date.substr(0, 7);
                const resultIds =
                  dateDictionary &&
                  dateDictionary[monthKey] &&
                  dateDictionary[monthKey][date] &&
                  dateDictionary[monthKey][date].map(
                    eventData => eventData.eventId
                  );
                if (!resultIds) {
                  filteredResults = [];
                } else {
                  filteredResults = filteredResults.filter(
                    listing => resultIds.indexOf(listing.id) > -1
                  );
                }
              }
            }
          });
        }
      }
      // would like to come up with a way to set property and sort order on content type
      //  perhaps content types in listings always assumed to have some core 'summary' fields
      //  then a component to select which of these to sort by and which order
      //  in the meantime will hard code it where with a default of publish date desc;

      // note to self about event behaviours - upcoming events - show in calendar with some form of indicator, so perhaps create a day dictionary?
      // click wil show only events on that day
      // selecting a date then only show events on that day
      // so this selector filters out event ids that exist in day dictionary on that day
      switch (listingKey) {
        // case 'whats-on': {
        //   return results.sort((resultA, resultB) => {
        //     const firstEventA =
        //     return resultA.publishedDate < resultB.publishedDate
        //       ? -1
        //       : resultA.publishedDate > resultB.publishedDate
        //         ? 1
        //         : 0;
        //   });
        // }
        default: {
          return filteredResults.sort((resultA, resultB) => {
            return resultA.publishedDate < resultB.publishedDate
              ? 1
              : resultA.publishedDate > resultB.publishedDate
              ? -1
              : 0;
          });
        }
      }
    }
  );

// const getThisMonthStartDateAsISOString = () => {
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth();
//   const currentYear = currentDate.getFullYear();
//   return new Date(currentYear, currentMonth, 1).toISOString().splice(0,10);
// };

export const makeSelectListingFilterDate = listingKey =>
  createSelector(
    [selectListingTree],
    listingTree => {
      return listingTree.getIn([listingKey, 'filters', 'date']);
    }
  );

export const makeSelectListingDateDictionary = listingKey =>
  createSelector(
    [selectListingTree],
    listingTree => {
      return listingTree.getIn([listingKey, 'dateDictionary']);
    }
  );

export const makeSelectListingPageCount = listingKey =>
  createSelector(
    [selectListingTree],
    listingTree => {
      return listingTree.getIn([listingKey, 'pageCount']);
    }
  );

export const makeSelectListingPageIndex = listingKey =>
  createSelector(
    [selectListingTree],
    listingTree => {
      return listingTree.getIn([listingKey, 'pageIndex']);
    }
  );

// for home apge, get the next 5 discrete events
// this means an event spanning 2 days, only show once
// whereas an event that has multipe eventDates, e.g. 3 separate weekends, show each if necessary
export const makeSelectNextThreeEvents = listingKey =>
  createSelector(
    [selectListingTree],
    listingTree => {
      const dateDictionaryAsMap = listingTree.getIn([
        listingKey,
        'dateDictionary',
      ]);
      const dateDictionary =
        dateDictionaryAsMap &&
        dateDictionaryAsMap.toJS &&
        dateDictionaryAsMap.toJS();
      if (dateDictionary && Object.keys(dateDictionary).length) {
        const currentMonth = new Date().toISOString().substr(0, 7);
        const dateDictionaryCurrentAndFutureMonths = Object.keys(dateDictionary)
          .filter(monthKey => monthKey >= currentMonth)
          .sort((monthKeyA, monthKeyB) =>
            monthKeyA < monthKeyB ? -1 : monthKeyA > monthKeyB ? 1 : 0
          );
        if (
          dateDictionaryCurrentAndFutureMonths &&
          dateDictionaryCurrentAndFutureMonths.length
        ) {
          let top5 = [];
          dateDictionaryCurrentAndFutureMonths.forEach(monthKey => {
            const dates =
              dateDictionary[monthKey] && Object.keys(dateDictionary[monthKey]);
            if (dates) {
              const sortedDates = Object.keys(dateDictionary[monthKey]).sort(
                (dateA, dateB) => (dateA < dateB ? -1 : dateA > dateB ? 1 : 0)
              );
              sortedDates.forEach(date => {
                const eventSummaries = dateDictionary[monthKey][date];
                eventSummaries.forEach(eventSummary => {
                  const alreadyInList = eventInThisSeriesAlreadyPresent(
                    eventSummary,
                    top5
                  );
                  if (!alreadyInList) {
                    const updatedEventSummary = { ...eventSummary };
                    updatedEventSummary.nextDate = date;
                    top5.push(updatedEventSummary);
                  }
                });
              });
            }
          });

          return top5.slice(0, 3);
        }
      }
    }
  );

const eventInThisSeriesAlreadyPresent = (eventSummary, list) => {
  if (eventSummary.isOneDayEvent) return false;
  const eventInThisSeriesAlreadyPresent = list.some(
    listItem =>
      listItem.eventId === eventSummary.eventId &&
      listItem.eventSeriesIndex === eventSummary.eventSeriesIndex
  );
  return eventInThisSeriesAlreadyPresent;
};

// is there a selected date?
// if so work out that month and return the dates as an array from the dateDictionary that happen in that month
// otherwise do the same, but for the current month
export const makeSelectDatesWithEventsOnThemForSelectedMonth = listingKey =>
  createSelector(
    [selectListingTree],
    listingTree => {
      const selectedDate = listingTree.getIn([listingKey, 'filters', 'date']);
      const monthKey = selectedDate
        ? selectedDate.substr(0, 7)
        : new Date().toISOString().substr(0, 7);
      const dateDictionaryEntriesFromMonthAsMap = listingTree.getIn([
        listingKey,
        'dateDictionary',
        monthKey,
      ]);
      const dateDictionaryEntriesFromMonth =
        dateDictionaryEntriesFromMonthAsMap &&
        dateDictionaryEntriesFromMonthAsMap.toJS &&
        dateDictionaryEntriesFromMonthAsMap.toJS();
      if (dateDictionaryEntriesFromMonth) {
        return Object.keys(dateDictionaryEntriesFromMonth);
      }
      return [];
    }
  );

export const selectFeaturedNews = state =>
  state.getIn(['listing', 'campus-news', 'results']);

export const makeSelectEventsFromDateDictionary = listingKey =>
  createSelector(
    [selectListingTree],
    listingTree => {
      const defaultPageSize = listingTree.getIn([
        listingKey,
        'defaultPageSize',
      ]);
      const pageIndex = listingTree.getIn([listingKey, 'pageIndex']);
      let listingResults = [];
      const selectedDate = listingTree.getIn([listingKey, 'filters', 'date']);
      const monthKey = selectedDate
        ? selectedDate.substr(0, 7)
        : new Date().toISOString().substr(0, 7);

      // return events on selected date if set
      // else return all upcoming events in date dictionary
      if (selectedDate) {
        const selectedDateEventsAsMap = listingTree.getIn([
          listingKey,
          'dateDictionary',
          monthKey,
          selectedDate,
        ]);
        const selectedDateEvents =
          selectedDateEventsAsMap &&
          selectedDateEventsAsMap.toJS &&
          selectedDateEventsAsMap.toJS();
        if (selectedDateEvents) listingResults = [...selectedDateEvents];
      } else {
        const allEvents = [];
        const dateDictionary = getDateDictionaryAsObject(
          listingTree,
          listingKey
        );
        if (dateDictionary && Object.keys(dateDictionary).length) {
          const currentMonth = new Date().toISOString().substr(0, 7);
          const dateDictionaryCurrentAndFutureMonths = Object.keys(
            dateDictionary
          )
            .filter(monthKey => monthKey >= currentMonth)
            .sort((monthKeyA, monthKeyB) =>
              monthKeyA < monthKeyB ? -1 : monthKeyA > monthKeyB ? 1 : 0
            );
          if (
            dateDictionaryCurrentAndFutureMonths &&
            dateDictionaryCurrentAndFutureMonths.length
          ) {
            dateDictionaryCurrentAndFutureMonths.forEach(monthKey => {
              const dates =
                dateDictionary[monthKey] &&
                Object.keys(dateDictionary[monthKey]);
              if (dates) {
                const sortedDates = Object.keys(dateDictionary[monthKey]).sort(
                  (dateA, dateB) => (dateA < dateB ? -1 : dateA > dateB ? 1 : 0)
                );
                sortedDates.forEach(date => {
                  const eventSummaries = dateDictionary[monthKey][date];
                  eventSummaries.forEach(eventSummary => {
                    const alreadyInList = eventInThisSeriesAlreadyPresent(
                      eventSummary,
                      allEvents
                    );
                    if (!alreadyInList) {
                      const updatedEventSummary = { ...eventSummary };
                      updatedEventSummary.nextDate = date;
                      allEvents.push(updatedEventSummary);
                    }
                  });
                });
              }
            });
          }
        }
        if (allEvents) listingResults = [...allEvents];
      }
      // now apply any category option filters
      const selectedCategoryKey = listingTree.getIn([
        listingKey,
        'filters',
        'categoryKey',
      ]);
      if (selectedCategoryKey) {
        listingResults = listingResults.filter(result => {
          const matches =
            result.categories && result.categories.length
              ? result.categories.some(
                  category => category.key === selectedCategoryKey
                )
              : false;
          return matches;
        });
      }
      // work out pageCount before filtering out items for page
      const pageCount = getPageCountForItems(listingResults, defaultPageSize);
      return {
        listingResults: getItemsForPage(
          pageIndex,
          defaultPageSize,
          listingResults
        ),
        pageCount,
      };
    }
  );

const getDateDictionaryAsObject = (listingTree, listingKey) => {
  const dateDictionaryAsMap = listingTree.getIn([listingKey, 'dateDictionary']);
  console.info('datedictionary imjs Map', dateDictionaryAsMap);
  const dateDictionary =
    dateDictionaryAsMap &&
    dateDictionaryAsMap.toJS &&
    dateDictionaryAsMap.toJS();
  return dateDictionary;
};
//TODO: this contains duplicate logic as in makeSelectEventsFromDateDictionary
//consider refactoring.
export const makeSelectRelatedEventsAndParentSlug = state =>
  createSelector(
    [selectRouteEntryParentSlug, selectRouteEntryCategory, selectRouteEntryID],
    (listingKey, categories, entryID) => {
      const listingTree = selectListingTree(state);
      categories = categories.toJS ? categories.toJS() : [];
      //console.info('categories', categories);
      let categoryKey;
      if (categories && categories.length) {
        categoryKey = categories[0].key;
      } else {
        return [];
      }
      //return all upcoming events in date dictionary
      let allEvents = getCurrentAndFutureEventsFromDateDictionary(
        listingTree,
        listingKey
      );
      // now filter by category
      const eventsInCategory = allEvents.filter(result => {
        return (
          result.eventId !== entryID &&
          result.categories &&
          result.categories.length &&
          result.categories.some(category => category.key === categoryKey)
        );
      });
      return {
        relatedEvents: eventsInCategory,
        parentSlug: listingKey,
      };
    }
  );
const getCurrentAndFutureEventsFromDateDictionary = (
  listingTree,
  listingKey
) => {
  const allEvents = [];
  const currentMonth = new Date().toISOString().substr(0, 7);
  const dateDictionaryObject = getDateDictionaryAsObject(
    listingTree,
    listingKey
  );
  const dateDictionaryMonths = dateDictionaryObject
    ? Object.keys(dateDictionaryObject)
    : [];
  const dateDictionaryCurrentAndFutureMonths = dateDictionaryMonths
    .filter(month => month >= currentMonth)
    .sort((monthA, monthB) => (monthA < monthB ? -1 : monthA > monthB ? 1 : 0));
  dateDictionaryCurrentAndFutureMonths.forEach(month => {
    const sortedDates = Object.keys(dateDictionaryObject[month]).sort(
      (dateA, dateB) => (dateA < dateB ? -1 : dateA > dateB ? 1 : 0)
    );
    sortedDates.forEach(date => {
      const eventSummaries = dateDictionaryObject[month][date];
      eventSummaries.forEach(eventSummary => {
        const alreadyInList = eventInThisSeriesAlreadyPresent(
          eventSummary,
          allEvents
        );
        if (!alreadyInList) {
          const updatedEventSummary = { ...eventSummary };
          updatedEventSummary.nextDate = date;
          allEvents.push(updatedEventSummary);
        }
      });
    });
  });
  return allEvents;
};
//duplicate logic, consider refactoring.
export const makeSelectDatetimesOfEntry = state =>
  createSelector(
    [selectRouteEntryParentSlug, selectRouteEntryID],
    (listingKey, entryID) => {
      const listingTree = selectListingTree(state);

      //return upcoming events in date dictionary

      let allEvents = getCurrentAndFutureEventsFromDateDictionary(
        listingTree,
        listingKey
      );

      // now filter in only those of this entry id
      const eventsForEntry = allEvents.filter(result => {
        return result.eventId === entryID;
      });
      return eventsForEntry;
    }
  );

const getItemsForPage = (pageIndex, pageSize, items) => {
  if (items) {
    const startIndex = pageIndex ? pageIndex * pageSize : 0;
    return items.slice(startIndex, startIndex + pageSize);
  }
  return [];
};

const getPageCountForItems = (items, pageSize) => {
  return !items || !items.length || !pageSize
    ? 0
    : items.length <= pageSize
    ? 1
    : items.length % pageSize === 0
    ? items.length / pageSize
    : Math.floor(items.length / pageSize) + 1;
};
