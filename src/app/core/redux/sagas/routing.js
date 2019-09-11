// load-entries.js
// import * as log from 'loglevel';
import { takeEvery, put, select, call, all, fork } from 'redux-saga/effects';
import {
  SET_ENTRY_ID,
  SET_ENTRY,
  SET_NAVIGATION_NOT_FOUND,
  SET_NODE,
  SET_ANCESTORS,
  SET_NAVIGATION_PATH,
  SET_ENTRY_RELATED_ARTICLES,
} from 'app/redux/types/routing';
import { deliveryApi, Query, Op } from 'app/util/ContensisDeliveryApi';
import { getListingsQuery } from 'app/util/queries';
import { selectVersionStatus } from 'app/redux/selectors/version';
import {
  validateRouteFromNavigationSettings,
  getLeafSlugFromRoute,
} from 'app/util/navHelper';

// import { getMessages } from './defaultMessages';
import { fetchCountries } from './countryEntryRequirements';

export const routingSagas = [
  takeEvery(SET_NAVIGATION_PATH, getRouteSaga),
  takeEvery(SET_ENTRY, ensureRelatedArticlesSaga),
];

function* setRouteEntry(entry, node, ancestors) {
  yield all([
    put({
      type: SET_NAVIGATION_NOT_FOUND,
      notFound: false,
    }),
    put({
      type: SET_NODE,
      node,
    }),
    put({
      type: SET_ENTRY,
      entry: entry,
    }),
    put({
      type: SET_ENTRY_ID,
      id: entry.sys.id,
    }),
    put({
      type: SET_ANCESTORS,
      ancestors,
    }),
  ]);
  // yield fork(getMessages);
  yield fork(fetchCountries);
}

function* do404() {
  yield put({
    type: SET_NAVIGATION_NOT_FOUND,
    notFound: true,
  });
  yield put({
    type: SET_ENTRY_ID,
    id: null,
  });
}

function* ensureRelatedArticlesSaga(action) {
  //yield console.info('action::', action);
  try {
    const entry = action.entry;
    if (entry) {
      const contentTypeId = entry.sys.contentTypeId;

      if (contentTypeId === 'news') {
        //if no articleCategories, exit, don't set any related articles
        if (!entry.articleCategory) return;
        //assume articleCategory if exists that it has at least 1 item in the category array, else error.
        const filters = {
          categoryKey: entry.articleCategory.category[0].key,
          not: {
            ids: [entry.sys.id],
          },
        };
        console.info('filters', filters);
        const query = yield getListingsQuery(
          [contentTypeId],
          'paged-datedesc',
          filters
        );
        //fields currently doesn't work, could be due to internalServer not handling fields
        query.fields = [
          'entryTitle',
          'publishDateOverride',
          'listingImage',
          'sys',
        ];
        //yield console.info('query:', query);
        const queryResponse = yield deliveryApi.search(query, 1);
        //yield console.info('query response', queryResponse);
        yield put({
          type: SET_ENTRY_RELATED_ARTICLES,
          relatedArticles: queryResponse.items,
        });
      }
    }
  } catch (err) {
    //SET_ENTRY action has invalid input
    console.error('SET_ENTRY action may have an invalid payload.', action);
    throw new Error(err);
    //could create validation to ensure payload is the correct/expected shape
    //so there's no need to do too much falsey checking
  }
}

function* getRouteSaga(action) {
  // try {
  const state = yield select();
  // const currentPath = selectCurrentPath(state);
  const deliveryApiStatus = selectVersionStatus(state);
  const currentPath = action.path;
  if (currentPath && currentPath.startsWith('/preview/')) {
    let splitPath = currentPath.split('/');
    let entryGuid = splitPath[2];
    if (splitPath.length == 3) {
      let previewEntry = yield deliveryApi.getEntry(
        entryGuid,
        2,
        deliveryApiStatus
      );
      if (previewEntry) {
        yield call(setRouteEntry, previewEntry);
      } else {
        yield call(do404);
      }
      return true;
    }
  } else {
    let pathNode = null;
    let Ancestors = null;
    // Scroll into View
    if (typeof window !== 'undefined') {
      window.scroll({
        top: 0,
      });
    }
    if (currentPath === '/') {
      let homeEntry = yield deliveryApi.getEntry(
        '33479a87-7069-4220-9b0c-220318bd3345',
        2,
        deliveryApiStatus
      );
      pathNode = { entry: homeEntry };
    } else {
      let query = null;
      const leaf = getLeafSlugFromRoute(currentPath);

      let expressions = [
        ...GetSlugQuery(leaf),
        ...selectVersionStatusQuery(deliveryApiStatus),
      ];
      query = new Query(...expressions);
      query.pageSize = 1;
      const routePathEntryResult = yield deliveryApi.search(query, 2);
      let routePathEntry =
        routePathEntryResult &&
        routePathEntryResult.totalCount &&
        routePathEntryResult.totalCount > 0 &&
        routePathEntryResult.items &&
        routePathEntryResult.items[0];

      // Validate path down navigationSettings.parent
      const routeValidated = validateRouteFromNavigationSettings(
        currentPath,
        routePathEntry
      );

      if (routePathEntry && routeValidated) {
        pathNode = { entry: routePathEntry };
      }
    }
    if (
      pathNode &&
      pathNode.entry &&
      pathNode.entry.sys &&
      pathNode.entry.sys.id
    ) {
      yield call(setRouteEntry, pathNode.entry, pathNode, Ancestors);
    } else {
      debugger;
      yield call(do404);
    }
  }
}

function GetSlugQuery(s) {
  return [Op.equalTo('sys.slug', s)];
}

function selectVersionStatusQuery(deliveryApiStatus) {
  return [Op.equalTo('sys.versionStatus', deliveryApiStatus)];
}
