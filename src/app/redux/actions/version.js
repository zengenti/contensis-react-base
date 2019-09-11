import { action } from 'app/util/helpers';
import { SET_VERSION, SET_VERSION_STATUS } from 'app/redux/types/version';

export const setVersion = (commitRef, buildNo) =>
  action(SET_VERSION, { commitRef, buildNo });

export const setVersionStatus = status =>
  action(SET_VERSION_STATUS, { status });
