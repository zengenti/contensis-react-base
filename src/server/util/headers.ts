import { Response } from 'express';
import {
  selectCurrentProject,
  selectRouteEntry,
  selectSurrogateKeys,
} from '~/routing/redux/selectors';
import { getImmutableOrJS as getIn } from '~/redux/util';

import { getCacheDuration } from '../features/caching/cacheDuration.schema';
import { AppState } from '~/redux/appstate';

export const addStandardHeaders = (
  state: AppState,
  response: Response,
  packagejson: any,
  groups: { globalGroups?: any[]; allowedGroups?: any[] }
) => {
  if (state) {
    try {
      console.info('About to add headers');
      const routingSurrogateKeys = selectSurrogateKeys(state);

      const surrogateKeyHeader = ` ${packagejson.name}-app ${routingSurrogateKeys}`;

      response.header('surrogate-key', surrogateKeyHeader);

      addVarnishAuthenticationHeaders(state, response, groups);

      response.setHeader(
        'Surrogate-Control',
        `max-age=${getCacheDuration(response.statusCode)}`
      );
    } catch (e: any) {
      console.info('Error Adding headers', e.message);
    }
  }
};

export const addVarnishAuthenticationHeaders = (
  state: AppState,
  response: Response,
  groups: { globalGroups?: any[]; allowedGroups?: any[] } = {}
) => {
  if (state) {
    try {
      const stateEntry = selectRouteEntry(state);
      const project = selectCurrentProject(state);
      const { globalGroups, allowedGroups } = groups;
      // console.info(globalGroups, allowedGroups);
      let allGroups = Array.from((globalGroups && globalGroups[project]) || {});
      if (
        stateEntry &&
        getIn(stateEntry, ['authentication', 'isLoginRequired']) &&
        allowedGroups &&
        allowedGroups[project]
      ) {
        allGroups = [...allGroups, ...allowedGroups[project]];
      }
      response.header('x-contensis-viewer-groups', allGroups.join('|'));
    } catch (e) {
      console.info('Error adding authentication header', e);
    }
  }
};
