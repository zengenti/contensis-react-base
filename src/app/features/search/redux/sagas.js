// load-entries.js
import * as log from 'loglevel';
import { List, Map, fromJS } from 'immutable';
import { takeEvery, put, select, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import queryString from 'query-string';
import { cachedSearch } from '~/core/util/ContensisDeliveryApi';
import { now } from '~/core/util/performance';
import { getSearchQuery, generateConfig } from '~/core/util/search';
import {
  getFilteredRoute,
  getCurrentProject,
  getRouteEntry,
  // getCurrentPath,
  getCurrentEnvironment,
} from '~/core/redux/selectors/routing';
import {
  getCurrentFacet,
  getFacets,
  getSelectedFilters,
  getCurrentPageIndex,
  getSearchTerm,
  // getFacetPageIndex,
  getFacetAuthentication,
} from './selectors';
import {
  SET_ROUTE_FILTERS,
  EXECUTE_FEATURED_SEARCH,
  EXECUTE_FEATURED_SEARCH_ERROR,
  SET_FEATURED_ENTRIES,
  EXECUTE_SEARCH,
  EXECUTE_SEARCH_DENIED,
  SET_SEARCH_ENTRIES,
  UPDATE_SEARCH_TERM,
  UPDATE_PAGE_INDEX,
  UPDATE_CURRENT_FACET,
  UPDATE_SELECTED_FILTERS,
  EXECUTE_SEARCH_PRELOAD,
} from './types';
import ProjectHelper from '~/core/util/helpers';
import { buildUrlParts } from '~/core/routes/FilterableRoutes';
import { getVersionStatus } from '~/core/redux/selectors/version';
// import { UpdateQueryString } from '~/core/util/navHelper';

export const searchSagas = [
  // takeEvery(SET_ROUTE_FILTERS, ensureSearch),
  takeEvery(SET_SEARCH_ENTRIES, preLoadOtherTabs),
  takeEvery(UPDATE_SEARCH_TERM, updateSearchTerm),
  takeEvery(UPDATE_PAGE_INDEX, updatePageIndex),
  takeEvery(UPDATE_CURRENT_FACET, updateCurrentFacet),
  takeEvery(UPDATE_SELECTED_FILTERS, applySearchFilter),
];
/* eslint-disable no-console */

export function* setSearchFilters(action) {
  const state = yield select();
  const filteredRoute =
    getFilteredRoute(state) ||
    fromJS({
      filters: Object.entries(
        queryString.parse(state.getIn(['router', 'location', 'search']))
      ).map(item => ({ key: item[0], value: item[1] })),
    });
  let entry = action;
  if (filteredRoute && entry) {
    const project = getCurrentProject(state);
    if (entry.configuration) {
      entry = {
        ...entry,
        ...ProjectHelper.composedFieldToObject(entry.configuration),
      };
    }
    const config = generateConfig(
      entry,
      filteredRoute.get('filters', new List([])).toJS(),
      project
    );
    const setFiltersAction = {
      type: SET_ROUTE_FILTERS,
      ...config,
      filteredRoute,
      versionStatus: getVersionStatus(state),
    };
    yield put(setFiltersAction);
    yield call(ensureSearch, setFiltersAction);
  }
}

function* loadFeaturedResults(action) {
  const state = yield select();
  const env = getCurrentEnvironment(state);
  const { facet } = action;
  const project = facet;
  const pageIndex = 0;
  const isFeatured = true;
  const result = yield cachedSearch.search(
    getSearchQuery(state, facet, pageIndex, isFeatured),
    1,
    project,
    env
  );
  if (result && result.items) {
    yield put({
      type: SET_FEATURED_ENTRIES,
      facet,
      items: result.items,
    });
  } else {
    yield put({ type: EXECUTE_FEATURED_SEARCH_ERROR, facet });
  }
}

function isSearchAllowed(state, facet) {
  const facetAuth = getFacetAuthentication(state, facet) || new Map();
  const user = new Map(); // getUser(state) || new Map();
  let searchAllowed = true;

  if (facetAuth.get('isLoginRequired')) {
    searchAllowed = false;
    const isAllowed = val =>
      facetAuth.get('allowedGroups').find(grp => grp == val);

    if (
      facetAuth.get('allowedGroups').size == 0 ||
      (user.get('loggedIn', false) &&
        user
          .get('groups')
          .map(g => g.get('id'))
          .toJS()
          .some(isAllowed))
    ) {
      searchAllowed = true;
    }
  }
  return searchAllowed;
}

function* executeSearch(action) {
  const state = yield select();
  const env = getCurrentEnvironment(state);
  const { facet, project, preload } = action;

  try {
    if (!isSearchAllowed(state, facet)) {
      yield put({ type: EXECUTE_SEARCH_DENIED });
    } else {
      let pageIndex = !preload ? getCurrentPageIndex(state) : 0;
      if (action.type != UPDATE_PAGE_INDEX) {
        //run featured query
        const searchTerm = getSearchTerm(state);
        if (searchTerm) {
          yield call(loadFeaturedResults, {
            ...action,
            type: EXECUTE_FEATURED_SEARCH,
            facet,
            searchTerm,
          });
        }
      } else {
        pageIndex = action.pageIndex;
      }
      const newState = yield select();
      const query = getSearchQuery(newState, facet, pageIndex);
      let duration = 0;
      const start = now();
      const payload = yield cachedSearch.search(query, 2, project, env);
      const end = now();
      duration = end - start;
      if (payload.type == 'error') {
        log.warn(`Error Executing Query ${JSON.stringify(query)}`);
        yield put({
          type: SET_SEARCH_ENTRIES,
          payload: {
            pageCount: 0,
            totalCount: 0,
            pageSize: 0,
            pageIndex: 0,
            items: [],
          },
          facet,
          duration,
          preload,
        });
      } else {
        yield put({
          type: SET_SEARCH_ENTRIES,
          payload: payload,
          facet,
          duration,
          preload,
        });
        log.info(`${EXECUTE_SEARCH} Got Results payload`);
      }
    }
  } catch (error) {
    log.warn(error);
  }
}

function* ensureSearch(action) {
  const state = yield select();
  const facet = getCurrentFacet(state);
  const project = facet;
  try {
    let pageIndex = getCurrentPageIndex(state);
    yield call(executeSearch, { ...action, pageIndex, project, facet });
  } catch (error) {
    log.error(error);
  }
}

function* ensureSearchPreload(facet) {
  const project = facet;
  const preload = true;
  try {
    yield call(executeSearch, {
      type: EXECUTE_SEARCH_PRELOAD,
      facet,
      project,
      preload,
    });
  } catch (error) {
    log.warn(error);
  }
}

function* updateCurrentFacet(action) {
  const { facet } = action;
  const state = yield select();
  const qsFilters = getSelectedFilters(state, facet);
  const entrySlug = getRouteEntry(state).getIn(['sys', 'slug']);
  yield put(push(buildUrlParts(state, entrySlug, qsFilters.toJS())));
}

function* updateSearchTerm(action) {
  const { term } = action;
  const state = yield select();
  // const currentFacet = getCurrentFacet(state);
  // const pageIndex = 0;
  const qsFilters = getSelectedFilters(state);
  const entrySlug = getRouteEntry(state).getIn(['sys', 'slug']);
  const newPath = `/${entrySlug}`;
  yield put(
    push(
      buildUrlParts(state, newPath, {
        ...qsFilters.toJS(),
        query: term,
        page: 1,
      })
    )
  );
  yield call(ensureSearch, action);
}

function* updatePageIndex(action) {
  const { pageIndex } = action;
  // if (typeof window != 'undefined') {
  //   window.location = UpdateQueryString('page', pageIndex + 1);
  // } else {
  const state = yield select();
  // const currentFacet = getCurrentFacet(state);
  // const term = getSearchTerm(state);
  let qsFilters = getSelectedFilters(state);

  const filteredRoute = getFilteredRoute(state);
  // const currentPath = getCurrentPath(state);
  let newPath;
  if (!filteredRoute) {
    qsFilters = qsFilters.set('page', pageIndex + 1);
  } else {
    const entrySlug = getRouteEntry(state).getIn(['sys', 'slug']);
    newPath = `/${entrySlug}/${pageIndex + 1}`;
  }
  yield put(
    push({ search: buildUrlParts(state, newPath || '', qsFilters.toJS()) })
  );
  // }
  yield call(ensureSearch, action);
}

function* applySearchFilter(action) {
  const state = yield select();
  // const currentFacet = getCurrentFacet(state);
  // const term = getSearchTerm(state);
  const qsFilters = getSelectedFilters(state);
  // const pageIndex = 0;
  const entrySlug = getRouteEntry(state).getIn(['sys', 'slug']);
  yield put(push(buildUrlParts(state, entrySlug, qsFilters.toJS())));
  yield call(ensureSearch, action);
}

function* preLoadOtherTabs(action) {
  const state = yield select();
  const currentFacet = getCurrentFacet(state);
  const facets = [...getFacets(state).keys()];
  if (!action.preload) {
    if (action.facet == currentFacet) {
      // This is the root load after a new keyword or filter has been selected, lets delay a few miliseconds and then load
      // the other tabs.
      try {
        if (action.facet != '') {
          yield all(
            facets
              .filter(f => f != currentFacet)
              .map(f => call(ensureSearchPreload, f))
          );
        }
      } catch (error) {
        log.warn(error);
      }
    }
  }
}
