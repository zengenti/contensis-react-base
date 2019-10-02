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
} from '~/core/redux/types/routing';
import { deliveryApi } from '~/core/util/ContensisDeliveryApi';
import { selectVersionStatus } from '~/core/redux/selectors/version';
import {
  selectCurrentPath,
  selectCurrentProject,
} from '~/core/redux/selectors/routing';
import { hasNavigationTree } from '../selectors/navigation';
import { ensureNodeTreeSaga } from './navigation';

export const routingSagas = [takeEvery(SET_NAVIGATION_PATH, getRouteSaga)];

function* getRouteSaga() {
  try {
    yield ensureNavigationTree();
    const state = yield select();
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
        .getClient(deliveryApiStatus)
        .nodes.getAncestors(pathNode.id);
      // debugger;
    }

    if (
      pathNode &&
      pathNode.entry &&
      pathNode.entry.sys &&
      pathNode.entry.sys.id
    ) {
      yield call(setRouteEntry, pathNode.entry, pathNode, ancestors);
    } else {
      yield call(do404);
    }
  } catch (e) {
    log.info(`Error running route saga: ${e}`);
    yield call(do404);
  }
}

function* ensureNavigationTree() {
  const treeLoaded = yield select(hasNavigationTree);
  if (!treeLoaded) {
    yield call(ensureNodeTreeSaga);
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
