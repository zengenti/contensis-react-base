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

function* setRouteSaga(action) {
  // To navigate / push a specific route via redux middleware
  yield put({
    type: CALL_HISTORY_METHOD,
    payload: {
      method: 'push',
      args: [action.path, action.state],
    },
  });
  // yield put({
  //   type: SET_NAVIGATION_PATH,
  //   path: action.path,
  //   staticRoute: action.isStatic,
  //   withEvents: action.withEvents,
  // });
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

      let pathNode = null;
      let ancestors = null;
      // Scroll into View
      if (typeof window !== 'undefined') {
        window.scroll({
          top: 0,
        });
      }
      if (currentPath === '/') {
        pathNode = yield deliveryApi
          .getClient(deliveryApiStatus, project)
          .nodes.getRoot({
            entryFields: '*',
            entryLinkDepth: 4,
            language: 'en-GB',
          });
      } else {
        if (currentPath.startsWith('/preview/')) {
          let splitPath = currentPath.split('/');
          let entryGuid = splitPath[2];
          pathNode = yield deliveryApi
            .getClient(deliveryApiStatus, project)
            .nodes.getByEntry({
              entryId: entryGuid,
              entryFields: '*',
              entryLinkDepth: 4,
            });
          pathNode = pathNode[0];
        } else {
          pathNode = yield deliveryApi
            .getClient(deliveryApiStatus, project)
            .nodes.get({
              path: currentPath,
              entryFields: '*',
              entryLinkDepth: 4,
            });
        }

        ancestors = yield deliveryApi
          .getClient(deliveryApiStatus, project)
          .nodes.getAncestors(pathNode.id);
      }

      if (
        pathNode &&
        pathNode.entry &&
        pathNode.entry.sys &&
        pathNode.entry.sys.id
      ) {
        entry = pathNode.entry;
        yield call(setRouteEntry, entry, pathNode, ancestors);
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
