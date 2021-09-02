export const selectCommitRef = state => state?.version?.commitRef;

export const selectBuildNumber = state => state?.version?.buildNo;

export const selectVersionStatus = state =>
  state?.version?.contensisVersionStatus;
