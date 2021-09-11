import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Redirect, useLocation } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';

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
import { AppRootProps, RouteLoaderProps } from '../routes';

const getTrimmedPath = path => {
  if (path !== '/') {
    const nextPath = path.replace(/\/\//, '/');
    const lastChar = nextPath[nextPath.length - 1];
    if (lastChar === '/') {
      return nextPath.substring(0, nextPath.length - 1);
    }
  }
  return path;
};

interface IReduxProps {
  contentTypeId: string;
  entry: Entry;
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

  // Match any Static Routes a developer has defined
  const matchedStaticRoute = () =>
    matchRoutes(routes.StaticRoutes, location.pathname);
  const isStaticRoute = () => matchedStaticRoute().length > 0;

  const staticRoute = isStaticRoute() && matchedStaticRoute()[0];
  const routeRequiresLogin = staticRoute && staticRoute.route.requireLogin;

  const setPath = useCallback(() => {
    // Use serverPath to control the path we send to siteview node api to resolve a route
    let serverPath = '';
    if (staticRoute && staticRoute.match && staticRoute.match.isExact) {
      const { match, route } = staticRoute;

      if (route.path.includes('*')) {
        // Send the whole url to api if we have matched route containing wildcard
        serverPath = match.url;
      } else if (typeof route.fetchNodeLevel === 'number') {
        // Send all url parts to a specified level to api
        serverPath = match.url
          .split('/')
          .splice(0, route.fetchNodeLevel + 1)
          .join('/');
      } else {
        // Send all non-parameterised url parts to api
        serverPath = route.path
          .split('/')
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
    return <Redirect to={trimmedPath} />;
  }

  // Render any Static Routes a developer has defined
  if (isStaticRoute() && !(!isLoggedIn && routeRequiresLogin)) {
    if (matchUserGroup(userGroups, routeRequiresLogin))
      return renderRoutes(routes.StaticRoutes, {
        projectId,
        contentTypeId,
        entry,
        mappedEntry,
        isLoggedIn,
      });
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

    // debugger;
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

const mapStateToProps = state => {
  return {
    contentTypeId: selectRouteEntryContentTypeId(state),
    entry: selectRouteEntry(state),
    isError: selectRouteIsError(state),
    isNotFound: selectIsNotFound(state),
    isLoading: selectRouteLoading(state),
    isLoggedIn: selectUserIsAuthenticated(state),
    mappedEntry: selectMappedEntry(state),
    projectId: selectCurrentProject(state),
    statePath: selectCurrentPath(state),
    statusCode: selectRouteStatusCode(state),
    statusText: selectRouteErrorMessage(state),
    userGroups: selectUserGroups(state),
  };
};

const mapDispatchToProps = {
  setNavigationPath,
};

export default hot(module)(
  connect(mapStateToProps, mapDispatchToProps)(toJS(RouteLoader))
);
