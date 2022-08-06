import { takeEvery, put, select } from 'redux-saga/effects';
import * as log from 'loglevel';

import { deliveryApi } from '~/util/ContensisDeliveryApi';
import {
  GET_NODE_TREE,
  SET_NODE_TREE,
  GET_NODE_TREE_ERROR,
} from '~/redux/types/navigation';
import { hasNavigationTree } from '~/redux/selectors/navigation';
import { selectVersionStatus } from '~/redux/selectors/version';
import { selectCurrentProject } from '~/routing/redux/selectors';

export const navigationSagas = [takeEvery(GET_NODE_TREE, ensureNodeTreeSaga)];

export function* ensureNodeTreeSaga(action) {
  const state = yield select();
  try {
    if (!hasNavigationTree(state)) {
      const deliveryApiVersionStatus = yield select(selectVersionStatus);
      const project = yield select(selectCurrentProject);
      const nodes = yield deliveryApi
        .getClient(deliveryApiVersionStatus, project)
        .nodes.getRoot({
          depth: action.treeDepth || 0,
        });
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
