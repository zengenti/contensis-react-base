import { takeEvery, put, select } from 'redux-saga/effects';
import * as log from 'loglevel';

import {
  GET_NODE_TREE,
  SET_NODE_TREE,
  GET_NODE_TREE_ERROR,
} from '~/redux/types/navigation';
import { hasNavigationTree } from '~/redux/selectors/navigation';

export const navigationSagas = [takeEvery(GET_NODE_TREE, ensureNodeTreeSaga)];

export function* ensureNodeTreeSaga(action) {
  const { api, language, project, versionStatus, treeDepth } = action;
  const state = yield select();
  try {
    if (!hasNavigationTree(state)) {
      const nodes = yield api.getRootNode(
        {
          depth: treeDepth || 0,
          language,
        },
        versionStatus,
        project
      );
      if (nodes) {
        yield put({ type: SET_NODE_TREE, nodes });
      } else {
        yield put({ type: GET_NODE_TREE_ERROR });
      }
    }
  } catch (ex) {
    log.error(...['Error running ensureNodeTreeSaga:', ex]);
    yield put({ type: GET_NODE_TREE_ERROR, error: ex.toString() });
  }
}
