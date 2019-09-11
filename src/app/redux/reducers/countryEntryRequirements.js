import {
  GET_COUNTRIES,
  SET_COUNTRY,
  SET_COUNTRY_REQUIREMENTS,
} from '../types/countryEntryRequirements';
import { Map, fromJS, List } from 'immutable';

let initialState = Map({
  countries: new List(),
  selectedCountry: null,
  countryRequirements: new List(),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES: {
      return state.set('countries', fromJS(action.payload.children));
    }
    case SET_COUNTRY: {
      return state.set('selectedCountry', fromJS(action.country));
    }
    case SET_COUNTRY_REQUIREMENTS: {
      return state.set('countryRequirements', fromJS(action.payload));
    }
    default:
      return state;
  }
};
