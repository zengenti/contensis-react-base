import { Draft, produce } from 'immer';
import { SET_VERSION, SET_VERSION_STATUS } from '~/redux/types/version';

const initialState = {
  commitRef: null,
  buildNo: null,
  contensisVersionStatus: 'published',
};

export default produce((state: Draft<any>, action) => {
  switch (action.type) {
    case SET_VERSION_STATUS: {
      state.contensisVersionStatus = action.status;
      return;
    }
    case SET_VERSION: {
      state.commitRef = action.commitRef;
      state.buildNo = action.buildNo;
      return;
    }
    default:
      return;
  }
}, initialState);
