import { action } from '~/core/util/helpers';
import { SET_VERSION, SET_VERSION_STATUS } from '~/core/redux/types/version';

export const setVersion = (commitRef, buildNo) =>
  action(SET_VERSION, { commitRef, buildNo });

export const setVersionStatus = status =>
  action(SET_VERSION_STATUS, { status });
