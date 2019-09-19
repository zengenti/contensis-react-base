import { action } from '~/core/util/helpers';
import { SET_COUNTRY } from '~/core/redux/types/countryEntryRequirements';

export const setCountry = country => action(SET_COUNTRY, { country });
export const setCountryRequirements = country =>
  action(SET_COUNTRY, { country });
