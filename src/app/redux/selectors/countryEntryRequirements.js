export const getCountries = state => {
  return state.getIn(['countries', 'countries']);
};

export const getSelectedCountry = state => {
  return state.getIn(['countries', 'selectedCountry']);
};

export const getCountryRequirements = state => {
  return state.getIn(['countries', 'countryRequirements']);
};

export const getCourseEntryRequirementGrade = state => {
  return state.getIn(
    [
      'record',
      'entry',
      'entryRequirements',
      'internationalEntryRequirement',
      'entryTitle',
    ],
    null
  );
};
