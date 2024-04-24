import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Redirect, useLocation } from 'react-router-dom';
import { renderRoutes, matchRoutes, RouteConfig } from 'react-router-config';
import { createSelector } from 'reselect';

import NotFound from './NotFound';
import { Status } from './Status';

import {
  selectCurrentPath,
  selectCurrentProject,
  selectIsNotFound,
  selectMappedEntry,
  selectRouteEntry,
  selectRouteEntryContentTypeId,
  selectRouteErrorMessage,
  selectRouteIsError,
  selectRouteLoading,
  selectRouteStatusCode,
} from '../redux/selectors';
import { setNavigationPath } from '../redux/actions';

import {
  selectUserGroups,
  selectUserIsAuthenticated,
} from '~/user/redux/selectors';
import { matchUserGroup } from '~/user/util/matchGroups';
import { toJS } from '~/util/ToJs';
import { useSSRContext } from '~/util/SSRContext';

import { Entry } from 'contensis-delivery-api/lib/models';
import { AppRootProps, RouteComponentProps, RouteLoaderProps } from '~/models';

const replaceDoubleSlashRecursive = (path: string) => {
  const nextPath = path.replace(/\/\//, '/');

  if (nextPath.match(/\/\//)) {
    return replaceDoubleSlashRecursive(nextPath);
  }

  return nextPath;
};

const getTrimmedPath = path => {
  if (path !== '/') {
    const nextPath = replaceDoubleSlashRecursive(path);
    const lastChar = nextPath[nextPath.length - 1];
    if (lastChar === '/') {
      return nextPath.substring(0, nextPath.length - 1);
    }
  }
  return path;
};

interface IReduxProps {
  contentTypeId: string | null;
  entry: Entry | null;
  isError: boolean;
  isNotFound: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  mappedEntry: any;
  projectId: string;
  setNavigationPath: typeof setNavigationPath;
  statePath: string;
  statusCode: any;
  statusText: string;
  userGroups: any;
}

const RouteLoader = ({
  contentTypeId,
  entry,
  isError,
  isLoading,
  isLoggedIn,
  isNotFound,
  loadingComponent,
  mappedEntry,
  notFoundComponent,
  projectId,
  routes,
  setNavigationPath,
  statePath,
  statusCode,
  statusText,
  userGroups,
  withEvents,
  trailingSlashRedirectCode = 302,
}: AppRootProps & RouteLoaderProps & IReduxProps) => {
  const location = useLocation();

  // In SSR pass references to things in backing sagas
  // we cannot access in a global scope
  const ssrContext = useSSRContext();

  // Always ensure paths are trimmed of trailing slashes so urls are always unique
  const trimmedPath = getTrimmedPath(location.pathname);

  // Match any Static Routes a developer has defined
  const matchedStaticRoute = () =>
    matchRoutes(routes.StaticRoutes as RouteConfig[], location.pathname);
  const isStaticRoute = () => matchedStaticRoute().length > 0;

  const staticRoute = isStaticRoute() ? matchedStaticRoute()[0] : undefined;
  const routeRequiresLogin = staticRoute && staticRoute.route.requireLogin;

  const setPath = useCallback(() => {
    // Use serverPath to control the path we send to siteview node api to resolve a route
    let serverPath = '';
    if (staticRoute && staticRoute.match && staticRoute.match.isExact) {
      const { match, route } = staticRoute;

      if (route.path?.includes('*')) {
        // Send the whole url to api if we have matched route containing wildcard
        serverPath = match.url;
      } else if (typeof route.fetchNodeLevel === 'number') {
        // Send all url parts to a specified level to api
        serverPath = match.url
          .split('/')
          .splice(0, route.fetchNodeLevel + 1)
          .join('/');
      } else if (route.fetchNode?.params) {
        const fetchNodeParams: string[] = route.fetchNode.params;
        const routeParams: { [key: string]: string } = match.params;

        const regexExp = new RegExp(
          Object.keys(routeParams)
            .map(p => `:${p}`)
            .join('|'),
          'g'
        );

        serverPath = match.path
          .replace(/\?/g, '')
          .replace(regexExp, matched => {
            const param = matched.replace(':', '');
            if (fetchNodeParams.includes(param)) return routeParams[param];
            else return '';
          })
          .replace(/\/$/, '');
      } else {
        // Send all non-parameterised url parts to api
        serverPath = (route.path as string)
          ?.split('/')
          .filter(p => !p.startsWith(':'))
          .join('/');
      }
    }

    setNavigationPath(
      serverPath || trimmedPath,
      location,
      staticRoute,
      withEvents,
      statePath,
      routes,
      ssrContext
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    setNavigationPath,
    // staticRoute,
    withEvents,
    location,
    routes,
    // statePath,
    trimmedPath,
  ]);

  if (typeof window == 'undefined') setPath();

  useEffect(() => {
    setPath();
  }, [location, setPath]);

  // Need to redirect when url endswith a /
  if (location.pathname.length > trimmedPath.length) {
    return (
      <Status code={trailingSlashRedirectCode}>
        <Redirect to={`${trimmedPath}${location.search}${location.hash}`} />
      </Status>
    );
  }

  // Render any Static Routes a developer has defined
  if (isStaticRoute() && !(!isLoggedIn && routeRequiresLogin)) {
    if (matchUserGroup(userGroups, routeRequiresLogin))
      return renderRoutes(
        routes.StaticRoutes as RouteConfig[],
        {
          projectId,
          contentTypeId,
          entry,
          mappedEntry,
          isLoggedIn,
        } as RouteComponentProps
      );
  }

  // Render a supplied Loading component if the route
  // is not a static route and is in a loading state
  if (isLoading && !isNotFound && loadingComponent) {
    const LoadingComponent = loadingComponent;
    return <LoadingComponent />;
  }

  // Match any defined Content Type Mappings
  if (contentTypeId && !(!isLoggedIn && routeRequiresLogin)) {
    const MatchedComponent = routes.ContentTypeMappings.find(
      item => item.contentTypeID === contentTypeId
    );

    if (MatchedComponent && !(MatchedComponent.requireLogin && !isLoggedIn)) {
      if (matchUserGroup(userGroups, MatchedComponent.requireLogin))
        return (
          <MatchedComponent.component
            projectId={projectId}
            contentTypeId={contentTypeId}
            entry={entry}
            mappedEntry={mappedEntry}
            isLoggedIn={isLoggedIn}
          />
        );
    }
  }

  const NotFoundComponent = notFoundComponent ? notFoundComponent : NotFound;
  if (isNotFound || isError) {
    console.info(
      `RouteLoader rendering NotFound component: statusCode ${statusCode}, isNotFound ${isNotFound}, isError ${isError}`
    );

    return (
      <Status code={statusCode}>
        <NotFoundComponent statusCode={statusCode} statusText={statusText} />
      </Status>
    );
  }

  return null;
};
const mapStateToPropsMemoized = createSelector(
  selectRouteEntryContentTypeId,
  selectRouteEntry,
  selectRouteIsError,
  selectIsNotFound,
  selectRouteLoading,
  selectUserIsAuthenticated,
  selectMappedEntry,
  selectCurrentProject,
  selectCurrentPath,
  selectRouteStatusCode,
  selectRouteErrorMessage,
  selectUserGroups,
  (
    contentTypeId,
    entry,
    isError,
    isNotFound,
    isLoading,
    isLoggedIn,
    mappedEntry,
    projectId,
    statePath,
    statusCode,
    statusText,
    userGroups
  ) => ({
    contentTypeId,
    entry,
    isError,
    isNotFound,
    isLoading,
    isLoggedIn,
    mappedEntry,
    projectId,
    statePath,
    statusCode,
    statusText,
    userGroups,
  })
);

const mapDispatchToProps = {
  setNavigationPath,
};

export default hot(module)(
  connect(mapStateToPropsMemoized, mapDispatchToProps)(toJS(RouteLoader as any))
) as unknown as (props: AppRootProps & RouteLoaderProps) => JSX.Element;
