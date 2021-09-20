import { Response } from 'express';
import {
  selectCurrentProject,
  selectRouteEntry,
} from '~/routing/redux/selectors';
import { getCacheDuration } from '../features/caching/cacheDuration.schema';

export const addStandardHeaders = (
  state: any,
  response: Response,
  packagejson: any,
  groups: { globalGroups?: any[]; allowedGroups?: any[] }
) => {
  if (state) {
    try {
      console.info('About to add headers');
      const routingSurrogateKeys = state.getIn(
        ['routing', 'surrogateKeys'],
        ''
      );

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
  state: any,
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
        stateEntry.getIn(['authentication', 'isLoginRequired']) &&
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
