// load-entries.js
import 'isomorphic-fetch';
import * as log from 'loglevel';
import { takeEvery, put, select, call, fork } from 'redux-saga/effects';
import { deliveryApi } from 'app/util/ContensisDeliveryApi';
import { now } from 'app/util/performance';
import {
  EXECUTE_SEARCH,
  SET_ENTRIES,
  SET_KEYWORD,
  Facets,
  CHANGE_PAGE,
  TOGGLE_TAXONOMY_SELECTION_LIST,
  TOGGLE_SEARCH_FILTER,
} from 'app/redux/types/search';
import { getSearchQuery, getSearchPromoQuery } from 'app/util/search';
import { getCurrentFacet, isSingleFacetMode } from 'app/redux/selectors/search';

export const searchSagas = [
  takeEvery(EXECUTE_SEARCH, executeSearch),
  takeEvery(SET_KEYWORD, executeSearch),
  takeEvery(CHANGE_PAGE, executeSearch),
  takeEvery(SET_ENTRIES, preLoadOtherTabs),
  takeEvery(TOGGLE_TAXONOMY_SELECTION_LIST, updateCourseSearch),
  takeEvery(TOGGLE_SEARCH_FILTER, updateCourseSearch),
];

function* executeSearch(action) {
  const state = yield select();
  const facet = getCurrentFacet(state);
  // yield log.info(`${EXECUTE_SEARCH} Fired about to Get Entry`);
  /* eslint-disable no-console */
  console.log(`${EXECUTE_SEARCH} Fired about to Get Entry`);

  try {
    let pageIndex = 0;
    if (action.type == CHANGE_PAGE) {
      pageIndex = action.index;
    }
    const query = getSearchQuery(state, facet, pageIndex);
    // query.fields = getSearchFacetFields(facet);
    let duration = 0;
    const start = now();
    const payload = yield deliveryApi.search(query, 1);
    const end = now();
    duration = end - start;
    yield fork(getSearchPromo, action, facet);
    if (payload.type == 'error') {
      log.warn(`Error Executing Query ${JSON.stringify(query)}`);
      yield put({
        type: SET_ENTRIES,
        payload: {
          pageCount: 0,
          totalCount: 0,
          pageSize: 0,
          pageIndex: 0,
          items: [],
        },
        facet,
        duration,
      });
    } else {
      yield put({ type: SET_ENTRIES, payload: payload, facet, duration });
      log.info(`${EXECUTE_SEARCH} Got Results payload`);
    }
    // const end = window.performance.now();
  } catch (error) {
    log.warn(error);
  }
  /* eslint-enable no-console */
}

function* getSearchPromo(action, facet) {
  const state = yield select();
  // yield log.info(`${EXECUTE_SEARCH} Fired about to Get Entry`);
  try {
    const query = getSearchPromoQuery(state, facet);
    query.fields = [
      'entryTitle',
      'sys.contentTypeId',
      'summary',
      'thumbnailImage',
      'asset',
      'uri',
      'sys',
      'url',
    ];
    //const benchmark = new Benchmark();
    const payload = yield deliveryApi.search(query, 1);

    //const duration = benchmark.elapsed;
    const duration = 0;
    yield put({
      type: SET_ENTRIES,
      payload: payload,
      facet: 'searchPromo',
      duration,
    });
  } catch (error) {
    log.warn(error);
  }
}

function* ensureSearchPreload(facet) {
  const state = yield select();
  const preload = true;
  // yield log.info(`${EXECUTE_SEARCH} Fired about to Get Entry`);
  try {
    const query = getSearchQuery(state, facet);
    // query.fields = getSearchFacetFields(facet);
    // debugger;
    const start = now();
    const payload = yield deliveryApi.search(query, 1);

    const end = now();
    const duration = end - start;
    if (payload.type == 'error') {
      log.warn(`Error Executing Query ${JSON.stringify(query)}`);
      yield put({
        type: SET_ENTRIES,
        payload: {
          pageCount: 0,
          totalCount: 0,
          pageSize: 0,
          pageIndex: 0,
          items: [],
        },
        facet,
        preload,
        duration,
      });
    } else {
      yield put({
        type: SET_ENTRIES,
        payload: payload,
        facet,
        preload,
        duration,
      });
    }
  } catch (error) {
    log.warn(error);
  }
}

function* updateCourseSearch() {
  const state = yield select();
  const currentFacet = getCurrentFacet(state);

  if (currentFacet == Facets.courses) {
    // This is the root load after a new keyword or filter has been selected, lets delay a few miliseconds and then load
    // the other tabs.
    try {
      yield log.info(`Re-search Courses`);
      yield call(ensureSearchPreload, Facets.courses);
    } catch (error) {
      log.warn(error);
    }
  }
}

function* preLoadOtherTabs(action) {
  const state = yield select();
  const currentFacet = getCurrentFacet(state);
  const isSingleFacet = isSingleFacetMode(state);
  if (!action.preload && !isSingleFacet) {
    if (action.facet == currentFacet) {
      // This is the root load after a new keyword or filter has been selected, lets delay a few miliseconds and then load
      // the other tabs.
      try {
        // Lets just do the News for now, as a test
        yield log.info(`Preload Other tabs Fired about to Get News Enties`);
        if (action.facet != Facets.all) {
          yield call(ensureSearchPreload, Facets.all);
        }
        if (action.facet != Facets.news) {
          yield call(ensureSearchPreload, Facets.news);
        }
        if (action.facet != Facets.staffProfiles) {
          yield call(ensureSearchPreload, Facets.staffProfiles);
        }
        if (action.facet != Facets.research) {
          yield call(ensureSearchPreload, Facets.research);
        }
        if (action.facet != Facets.courses) {
          yield call(ensureSearchPreload, Facets.courses);
        }
        if (action.facet != Facets.studentProfiles) {
          yield call(ensureSearchPreload, Facets.studentProfiles);
        }
      } catch (error) {
        log.warn(error);
      }
    }
  }
}
