import { Map, fromJS } from 'immutable';

import {
  SET_NODE_TREE,
  GET_NODE_TREE_ERROR,
} from '~/core/redux/types/navigation';

const initialState = Map({
  root: null,
  isError: false,
  isReady: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NODE_TREE: {
      return fromJS({ root: action.nodes, isReady: true });
    }
    case GET_NODE_TREE_ERROR: {
      return state.set('isError', true);
    }
    default:
      return state;
  }
};
