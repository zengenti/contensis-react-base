import { getJS } from '../util';

const select = state => getJS(state, 'version');

export const selectCommitRef = state => select(state)?.commitRef;

export const selectBuildNumber = state => select(state)?.buildNo;

export const selectVersionStatus = state =>
  select(state)?.contensisVersionStatus;
