import { Draft, produce } from 'immer';
import { SET_NODE_TREE, GET_NODE_TREE_ERROR } from '~/redux/types/navigation';

const initialState = {
  root: null,
  isError: false,
  isReady: false,
};

export default produce((state: Draft<any>, action) => {
  switch (action.type) {
    case SET_NODE_TREE: {
      state.root = action.nodes;
      state.isReady = true;
      return;
    }
    case GET_NODE_TREE_ERROR: {
      state.isError = true;
      return;
    }
    default:
      return;
  }
}, initialState);
