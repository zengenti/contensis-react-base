import { select } from 'redux-saga/effects';

import { Op, Query, OrderBy } from 'contensis-delivery-api';
import { selectVersionStatus } from '~/core/redux/selectors/version';

export function* getNavigationTreeQuery() {
  const versionStatus = yield select(selectVersionStatus);
  let expressions = [
    Op.equalTo('sys.versionStatus', versionStatus),
    Op.equalTo('sys.contentTypeId', 'navigation'),
  ];

  const query = new Query(...expressions);
  query.pageIndex = 0;
  query.pageSize = 100;
  return query;
}

export function getContentTypeFilters(contentTypes) {
  let expressions = [Op.in('sys.contentTypeId', ...contentTypes)];
  const query = new Query(...expressions);
  query.pageIndex = 0;
  query.pageSize = 100;
  query.orderBy = OrderBy.asc('entryTitle');
  return query;
}

export function* getLinkCollectionQuery(linkCollectionSlug) {
  const versionStatus = yield select(selectVersionStatus);
  const contentTypes = ['linkCollection'];
  const query = new Query(
    Op.equalTo('sys.versionStatus', versionStatus),
    Op.in('sys.contentTypeId', ...contentTypes),
    Op.equalTo('sys.slug', linkCollectionSlug)
  );
  query.fields = [
    'entryTitle',
    'navigationSettings',
    'sys.slug',
    'sys.contentTypeId',
    'parent',
    'sys.version',
  ];
  return query;
}

export function* getListingAndSearchhNodesQuery() {
  const versionStatus = yield select(selectVersionStatus);
  const contentTypes = ['search', 'listing'];
  const query = new Query(
    Op.equalTo('sys.versionStatus', versionStatus),
    Op.in('sys.contentTypeId', ...contentTypes)
  );
  query.fields = [
    'entryTitle',
    'sys.slug',
    'sys.contentTypeId',
    'sys.version',
    'contentTypes',
    'categoryOptions',
    'listingType',
    'defaultPageSize',
  ];
  return query;
}
export function* getSiteSettingsQuery() {
  const versionStatus = yield select(selectVersionStatus);
  const contentTypes = ['siteSettings'];
  const query = new Query(
    Op.equalTo('sys.versionStatus', versionStatus),
    Op.in('sys.contentTypeId', ...contentTypes)
  );
  return query;
}

export function* getSearchQuery(contentTypes, listingKeyword) {
  const versionStatus = yield select(selectVersionStatus);
  const termExpressions = getTermExpressions(listingKeyword);
  const query = new Query(
    Op.equalTo('sys.versionStatus', versionStatus),
    Op.in('sys.contentTypeId', ...contentTypes),
    ...termExpressions
  );
  query.fields = [
    'navigationSettings',
    'sys.slug',
    'entryTitle',
    'parent',
    'summary',
    'articleCategory',
    'listingImage',
    'sys.contentTypeId',
  ];
  return query;
}

function getTermExpressions(listingKeyword) {
  if (listingKeyword) {
    return [getTermExpression(listingKeyword, 10)];
  } else {
    return [];
  }
}

function getTermExpression(term, weight) {
  term = fixFreeTextForElastic(term);
  return Op.or(
    // Op.freeText('entryTitle', term).weight(weight * 10),
    // Op.freeText('metaInformation.metaDescription', term).weight(weight)
    Op.contains('entryTitle', term).weight(weight * 10),
    Op.contains('metaInformation.metaDescription', term).weight(weight),
    Op.contains('content[].textArea[]', term)
  );
}

function fixFreeTextForElastic(s) {
  let illegalChars = ['>', '<'];
  let encodedChars = [
    '+',
    '-',
    '=',
    '&',
    '|',
    '!',
    '(',
    ')',
    '{',
    '}',
    '[',
    ']',
    '^',
    '"',
    '~',
    '*',
    '?',
    ':',
    '\\',
    '/',
  ];
  let illegalRegEx = new RegExp(illegalChars.map(c => '\\' + c).join('|'), 'g');
  let encodedRegEx = new RegExp(encodedChars.map(c => '\\' + c).join('|'), 'g');

  s = s.replace(illegalRegEx, '');
  s = s.replace(encodedRegEx, ''); // (m) => '\\\\' + m);
  return s;
}

export function* getListingsQuery(contentTypes, listingType, filters = {}) {
  const versionStatus = yield select(selectVersionStatus);
  const expressions = [
    Op.equalTo('sys.versionStatus', versionStatus),
    Op.in('sys.contentTypeId', ...contentTypes),
  ];
  switch (listingType) {
    case 'month-eventdates': {
      const dateExpression = getEventDateExpression(
        filters ? filters.date : null
      );
      expressions.push(dateExpression);
      break;
    }
    case 'paged-datedesc': {
      //  currently hardcoded to 2 years worth, could make this configurable in listing content type
      const dateExpression = getPublishedDateExpression(2);
      if (dateExpression) expressions.push(dateExpression);
      break;
    }
    default: {
      break;
    }
  }
  if (filters.categoryKey) {
    expressions.push(Op.in('articleCategory.category[]', filters.categoryKey));
  }
  if (filters.yearKey || filters.monthKey) {
    const dateFilterExpression = getDateFilterExpression(
      ['publishDateOverride', 'sys.version.created'],
      filters.yearKey,
      filters.monthKey
    );
    if (dateFilterExpression) {
      expressions.push(dateFilterExpression);
    }
  }
  //if does NOT have a sys.id in this filters.not.ids array.
  if (filters.not) {
    if (filters.not.ids) {
      expressions.push(Op.not(Op.in('sys.id', ...filters.not.ids)));
    }
  }
  const query = new Query(...expressions);
  if (listingType === 'paged-datedesc')
    query.orderBy = OrderBy.desc('publishDateOverride').desc(
      'sys.version.created'
    );
  return query;
}

export const getPublishedDateExpression = maxAgeYears => {
  if (!maxAgeYears) return null;
  const currentDate = new Date();
  const yearLimit = currentDate.getFullYear() - maxAgeYears;
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const dateLimit = new Date(`${yearLimit}-${month}-${date}`);
  return Op.or(
    Op.greaterThanOrEqualTo('publishDateOverride', dateLimit),
    Op.greaterThanOrEqualTo('sys.version.created', dateLimit)
  );
};

export const getEventDateExpression = selectedDateString => {
  const selectedDate = selectedDateString
    ? new Date(selectedDateString)
    : new Date();
  const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();
  const startDate = new Date(selectedYear, selectedMonth, 1);
  return Op.greaterThanOrEqualTo('eventDate[].startDateTime', startDate);
};

function getDateFilterExpression(fields, year, month) {
  const hasYear = typeof year == 'string';
  const hasMonth = typeof month == 'string';
  //Set current year and month to be based on current time or any search filters
  const currentYear = hasYear ? year : new Date().getFullYear();
  const currentMonth = hasMonth ? parseInt(month) : 0;

  //Get date for start of year and month
  const yearFilterStartDate = new Date(currentYear, 0, 1);
  const monthFilterStartDate = new Date(currentYear, currentMonth, 1);

  //Get last day of year by increasing year start date by 1 year and then subtracting 1 day
  let yearFilterEndDate = new Date(yearFilterStartDate);
  yearFilterEndDate.setFullYear(yearFilterStartDate.getFullYear() + 1);
  yearFilterEndDate.setDate(yearFilterEndDate.getDate() - 1);

  //Get last day of month by adding 1 month to month start day and then setting day to 0
  //In JS 0 as the day returns the last day of the previous month
  let monthFilterEndDate = new Date(currentYear, currentMonth + 1, 0);
  //debugger;

  // Op.or(Op.and(Op.exists('override', true), Op.between('override', startDate, endDate)), Op.and(Op.exists('override', false), Op.between('sys.version.created', startDate, endDate)) )))

  if (hasMonth) {
    return Op.or(
      Op.and(
        Op.exists('publishDateOverride', true),
        Op.between(
          'publishDateOverride',
          monthFilterStartDate,
          monthFilterEndDate
        )
      ),
      Op.and(
        Op.exists('publishDateOverride', false),
        Op.between(
          'sys.version.created',
          monthFilterStartDate,
          monthFilterEndDate
        )
      )
    );
    /*
    return Op.or(
      ...fields.map(field =>
        Op.between(field, monthFilterStartDate, monthFilterEndDate)
      )
    );
    */
  }

  if (hasYear) {
    return Op.or(
      Op.and(
        Op.exists('publishDateOverride', true),
        Op.between(
          'publishDateOverride',
          yearFilterStartDate,
          yearFilterEndDate
        )
      ),
      Op.and(
        Op.exists('publishDateOverride', false),
        Op.between(
          'sys.version.created',
          yearFilterStartDate,
          yearFilterEndDate
        )
      )
    );
    /*
    return Op.or(
      ...fields.map(field =>
        Op.between(field, yearFilterStartDate, yearFilterEndDate)
      )
    );
    */
  }

  return null;
}
