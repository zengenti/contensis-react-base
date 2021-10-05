import { getImmutableOrJS as getIn } from '~/redux/util';

export const selectCommitRef = state => getIn(state, ['version', 'commitRef']);

export const selectBuildNumber = state => getIn(state, ['version', 'buildNo']);

export const selectVersionStatus = state =>
  getIn(state, ['version', 'contensisVersionStatus']);
