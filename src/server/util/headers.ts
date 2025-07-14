import { Response } from 'express';
import {
  selectCurrentProject,
  selectRouteEntry,
  selectSsrApiCalls,
  selectSurrogateKeys,
} from '~/routing/redux/selectors';
import { getImmutableOrJS as getIn } from '~/redux/util';

import {
  anyUpdateHeader,
  getCacheDuration,
} from '../features/caching/cacheDuration.schema';
import { AppState } from '~/models';

export const addStandardHeaders = (
  state: AppState,
  response: Response,
  packagejson: any,
  groups: { globalGroups?: any[]; allowedGroups?: any[] }
) => {
  if (state) {
    try {
      const routingSurrogateKeys = selectSurrogateKeys(state);
      const apiCalls = selectSsrApiCalls(state);
      const anyApiError = !!apiCalls.find(([status]) => status >= 400);

      // Check length of surrogate keys and prevent potential header overflow errors in prod
      // Check for any error set in the page response
      // And check if we have seen any error in any of the Delivery API calls
      // - add `any-update` header that will indiscriminately
      //   invalidate the SSR page cache when any content is updated
      const addAnyUpdateHeader =
        routingSurrogateKeys.length >= 2000 ||
        response.statusCode >= 400 ||
        anyApiError;

      console.info(
        `[addStandardHeaders] ${
          addAnyUpdateHeader ? anyUpdateHeader : routingSurrogateKeys.length
        } surrogate keys for ${response.req.url}`
      );

      const surrogateKeys = addAnyUpdateHeader
        ? anyUpdateHeader
        : routingSurrogateKeys.join(' ');

      const surrogateKeyHeader = `${packagejson.name}-app ${surrogateKeys}`;

      response.setHeader('surrogate-key', surrogateKeyHeader);

      addVarnishAuthenticationHeaders(state, response, groups);

      response.setHeader(
        'surrogate-control',
        `max-age=${getCacheDuration(response.statusCode)}`
      );
    } catch (e: any) {
      console.info('[addStandardHeaders] Error adding headers', e.message);
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
