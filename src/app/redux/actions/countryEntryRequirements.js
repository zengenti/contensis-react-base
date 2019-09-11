import { action } from 'app/util/helpers';
import { SET_COUNTRY } from 'app/redux/types/countryEntryRequirements';

export const setCountry = country => action(SET_COUNTRY, { country });
export const setCountryRequirements = country =>
  action(SET_COUNTRY, { country });
