import { getImmutableOrJS as getIn } from '~/redux/util';

export const selectCommitRef = state => getIn(state, ['routing', 'commitRef']);

export const selectBuildNumber = state => getIn(state, ['routing', 'buildNo']);

export const selectVersionStatus = state =>
  getIn(state, ['routing', 'contensisVersionStatus']);
