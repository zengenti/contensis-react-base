import { Map, fromJS, List } from 'immutable';

import {
  SET_NODE_TREE,
  GET_NODE_TREE_ERROR,
} from '~/core/redux/types/navigation';

const initialState = Map({
  root: null,
  treeDepends: new List([]),
  isError: false,
  isReady: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NODE_TREE: {
      return state.set('root', fromJS(action.nodes)).set('isReady', true);
    }
    case GET_NODE_TREE_ERROR: {
      return state.set('isError', true);
    }
    default:
      return state;
  }
};
