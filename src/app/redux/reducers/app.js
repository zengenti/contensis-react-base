import { Map, fromJS } from 'immutable';
import {
  APP_SET_SETTINGS,
  APP_SET_INITIALISED,
  APP_SET_INITIALISING,
} from '../types/app';

const initialState = Map({
  settings: null,
  appInitialised: false,
  appInitialising: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_SET_SETTINGS: {
      return state.set('settings', fromJS(action.settings));
    }
    case APP_SET_INITIALISED: {
      return state.set('appInitialised', true);
    }
    case APP_SET_INITIALISING: {
      return state.set('appInitialising', action.appInitialising);
    }
    default:
      return state;
  }
};
