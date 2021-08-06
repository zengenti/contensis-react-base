import { Map } from 'immutable';
import { SET_VERSION, SET_VERSION_STATUS } from '~/redux/types/version';

let initialState = Map({
  commitRef: null,
  buildNo: null,
  contensisVersionStatus: 'published',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VERSION_STATUS: {
      return state.set('contensisVersionStatus', action.status);
    }
    case SET_VERSION: {
      return state
        .set('commitRef', action.commitRef)
        .set('buildNo', action.buildNo);
    }
    default:
      return state;
  }
};
