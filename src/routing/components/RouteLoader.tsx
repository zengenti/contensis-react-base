import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import {
  Navigate,
  useLocation,
  matchRoutes,
  RouteObject,
  useRoutes,
} from 'react-router-dom';

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
import { Entry } from 'contensis-delivery-api/lib/models';
import {
  AppRootProps,
  RouteLoaderProps,
  StaticRoute,
  MatchedRoute,
} from '../routes';

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
}: AppRootProps & RouteLoaderProps & IReduxProps) => {
  const location = useLocation();
  // Always ensure paths are trimmed of trailing slashes so urls are always unique
  const trimmedPath = getTrimmedPath(location.pathname);

  // Convert any react-router-v5 style routes to react-router-v6 style routes.
  const staticRoutes = routes.StaticRoutes.map(x => {
    const route = { ...x };
    if (route.component) {
      route.element = (
        <route.component
          projectId={projectId}
          contentTypeId={contentTypeId ? contentTypeId : undefined}
          entry={entry}
          mappedEntry={mappedEntry}
          isLoggedIn={isLoggedIn}
        />
      );
      delete route.component;
    }
    return route;
  });

  // Match any Static Routes a developer has defined
  const matchedStaticRoute = matchRoutes(
    staticRoutes as RouteObject[],
    location
  );
  const isStaticRoute = matchedStaticRoute && matchedStaticRoute.length > 0;

  // Combine custom params for all static routes, with the furthest config taking precedence.
  let finalRoute = {};
  if (isStaticRoute) {
    for (const [i, route] of matchedStaticRoute.entries()) {
      const staticRouteCopy = { ...route.route };
      if (i === matchedStaticRoute.length - 1) {
        finalRoute = { ...finalRoute, ...staticRouteCopy };
        matchedStaticRoute[i].route = finalRoute;
      } else {
        delete staticRouteCopy.children;
        delete staticRouteCopy.index;
        delete staticRouteCopy.path;
        delete staticRouteCopy.component;
        delete staticRouteCopy.element;
        finalRoute = { ...finalRoute, ...staticRouteCopy };
      }
    }
  }

  const staticRoute: MatchedRoute<string, StaticRoute> | null = isStaticRoute
    ? matchedStaticRoute.pop() || null
    : null;

  const routeRequiresLogin = staticRoute
    ? staticRoute.route.requireLogin
    : undefined;

  const staticRouteElement = useRoutes(staticRoutes as RouteObject[]);

  const setPath = useCallback(() => {
    // Use serverPath to control the path we send to siteview node api to resolve a route
    let serverPath = '';
    if (staticRoute && staticRoute.pathname === staticRoute.pathnameBase) {
      const { route, pathname } = staticRoute;

      if (route.path?.includes('*')) {
        // Send the whole url to api if we have matched route containing wildcard
        serverPath = pathname;
      } else if (typeof route.fetchNodeLevel === 'number') {
        // Send all url parts to a specified level to api
        serverPath = pathname
          .split('/')
          .splice(0, route.fetchNodeLevel + 1)
          .join('/');
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
      routes
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
    // Todo: Also handle the redirect serverside
    return <Navigate to={trimmedPath} />;
  }

  // Render any Static Routes a developer has defined
  if (isStaticRoute && !(!isLoggedIn && routeRequiresLogin)) {
    if (matchUserGroup(userGroups, routeRequiresLogin))
      return staticRouteElement;
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
  connect(mapStateToPropsMemoized, mapDispatchToProps)(toJS(RouteLoader))
) as unknown as (props: AppRootProps & RouteLoaderProps) => JSX.Element;
