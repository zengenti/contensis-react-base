import { Map, fromJS } from 'immutable';
import {
  SET_USER_DETAILS,
  SET_SHOW_USER_DETAILS,
  SHOW_USER_DETAILS,
  HIDE_USER_DETAILS,
  SIGN_OUT,
} from '~/core/redux/types/user';

let initialState = Map({
  userDetails: null,
  userDetailsAreHidden: true,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS: {
      return state.set('userDetails', fromJS(action.userDetails));
    }
    case SHOW_USER_DETAILS: {
      return state.set('userDetailsAreHidden', false);
    }
    case HIDE_USER_DETAILS: {
      return state.set('userDetailsAreHidden', true);
    }
    case SET_SHOW_USER_DETAILS: {
      return state.set('userDetailsAreHidden', action.userDetailsAreHidden);
    }
    case SIGN_OUT: {
      return state.set('userDetails', null);
    }
    default:
      return state;
  }
};
