// load-entries.js
import * as log from 'loglevel';
import { takeEvery, put, select, call, all } from 'redux-saga/effects';
import {
  SET_ENTRY_ID,
  SET_ENTRY,
  SET_NAVIGATION_NOT_FOUND,
  SET_NODE,
  SET_ANCESTORS,
  SET_NAVIGATION_PATH,
  SET_ROUTE,
  CALL_HISTORY_METHOD,
  SET_SIBLINGS,
} from '~/core/redux/types/routing';
import { deliveryApi } from '~/core/util/ContensisDeliveryApi';
import { selectVersionStatus } from '~/core/redux/selectors/version';
import {
  selectCurrentPath,
  selectCurrentProject,
  selectRouteEntry,
} from '~/core/redux/selectors/routing';
import { GET_NODE_TREE } from '../types/navigation';
import { hasNavigationTree } from '../selectors/navigation';

export const routingSagas = [
  takeEvery(SET_NAVIGATION_PATH, getRouteSaga),
  takeEvery(SET_ROUTE, setRouteSaga),
];

/**
 * To navigate / push a specific route via redux middleware
 * @param {path, state} action
 */
function* setRouteSaga(action) {
  yield put({
    type: CALL_HISTORY_METHOD,
    payload: {
      method: 'push',
      args: [action.path, action.state],
    },
  });
}

function* getRouteSaga(action) {
  let entry = null;
  try {
    const { withEvents } = action;
    if (withEvents && withEvents.onRouteLoad) {
      yield withEvents.onRouteLoad(action);
    }
    const state = yield select();
    const routeEntry = selectRouteEntry(state);
    if (
      (action.staticRoute && !action.staticRoute.route.fetchNode) ||
      (routeEntry && action.statePath === action.path)
    ) {
      // Do we need to fetch node/validate routes for a static route?
      // For a genuinely static route we recieve a 404 in browser console,
      // and a wasted network call.
      if (routeEntry) entry = routeEntry.toJS();
    } else {
      const currentPath = selectCurrentPath(state);
      const deliveryApiStatus = selectVersionStatus(state);
      const project = selectCurrentProject(state);

      let pathNode = null,
        ancestors = null,
        siblings = null;

      // Scroll into View
      if (typeof window !== 'undefined') {
        window.scroll({
          top: 0,
        });
      }

      let currentPathDepth = currentPath.split('/').length - 1;
      if (currentPath === '/') currentPathDepth = 0;

      // Handle homepage
      if (currentPath === '/') {
        pathNode = yield deliveryApi
          .getClient(deliveryApiStatus, project)
          .nodes.getRoot({
            depth: 0,
            entryFields: '*',
            entryLinkDepth: 4,
            language: 'en-GB',
          });
      } else {
        // Handle preview routes
        if (currentPath && currentPath.startsWith('/preview/')) {
          let splitPath = currentPath.split('/');
          let entryGuid = splitPath[2];
          if (splitPath.length == 3) {
            // According to product dev we cannot use Node API
            // for previewing entries as it gives a response of []
            // -- apparently it is not correct to request latest content
            // with Node API
            let previewEntry = yield deliveryApi
              .getClient(deliveryApiStatus, project)
              .entries.get({ id: entryGuid, linkDepth: 4 });
            if (previewEntry) {
              yield call(setRouteEntry, previewEntry);
            } else {
              yield call(do404);
            }
          }
        } else {
          // Handle all other routes
          pathNode = yield deliveryApi
            .getClient(deliveryApiStatus, project)
            .nodes.get({
              depth: 0,
              path: currentPath,
              entryFields: '*',
              entryLinkDepth: 4,
            });
        }

        if (pathNode && pathNode.id) {
          ancestors = yield deliveryApi
            .getClient(deliveryApiStatus, project)
            .nodes.getAncestors(pathNode.id);
          // No menu shows the  siblings at this level, so no need to load them.
          if (currentPathDepth > 1) {
            siblings = yield deliveryApi
              .getClient(deliveryApiStatus, project)
              .nodes.getSiblings({
                id: pathNode.id,
                entryFields: ['sys.contentTypeId', 'url'],
              });
          }
        }
      }

      if (
        pathNode &&
        pathNode.entry &&
        pathNode.entry.sys &&
        pathNode.entry.sys.id
      ) {
        entry = pathNode.entry;
        yield call(setRouteEntry, entry, pathNode, ancestors, siblings);
      } else {
        yield call(do404);
      }
    }
    if (withEvents && withEvents.onRouteLoaded) {
      yield withEvents.onRouteLoaded({ ...action, entry });
    }

    if (!hasNavigationTree(state))
      // Load navigation clientside only, a put() should help that work
      yield put({ type: GET_NODE_TREE });
  } catch (e) {
    log.error(...['Error running route saga:', e, e.stack]);
    yield call(do404);
  }
}

function* setRouteEntry(entry, node, ancestors, siblings) {
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
    put({
      type: SET_SIBLINGS,
      siblings,
    }),
  ]);
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
