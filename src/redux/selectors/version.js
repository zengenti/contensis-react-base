export const selectCommitRef = state => {
  return state.getIn(['version', 'commitRef']);
};
export const selectBuildNumber = state => {
  return state.getIn(['version', 'buildNo']);
};

export const selectVersionStatus = state => {
  return state.getIn(['version', 'contensisVersionStatus']);
};
