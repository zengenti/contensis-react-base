import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Redirect, useLocation } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';

import {
  selectCurrentPath,
  selectCurrentProject,
  selectIsNotFound,
  selectMappedEntry,
  selectRouteEntry,
  selectRouteEntryContentTypeId,
  selectRouteLoading,
} from '~/core/redux/selectors/routing';
import { setNavigationPath } from '~/core/redux/actions/routing';
import NotFound from '~/pages/NotFound';

import { Status } from './Status';
import { toJS } from '../util/ToJs';
import { selectUserLoggedIn } from '~/features/login/redux/selectors';

const getTrimmedPath = path => {
  if (path !== '/') {
    const lastChar = path[path.length - 1];
    if (lastChar == '/') {
      return path.substring(0, path.length - 1);
    }
  }
  return path;
};

const RouteLoader = ({
  statePath,
  projectId,
  contentTypeId,
  entry,
  isLoading,
  isLoggedIn,
  isNotFound,
  loadingComponent,
  mappedEntry,
  notFoundComponent,
  setNavigationPath,
  routes,
  withEvents,
}) => {
  const location = useLocation();

  // Match any Static Routes a developer has defined
  const matchedStaticRoute = () =>
    matchRoutes(routes.StaticRoutes, location.pathname);
  const isStaticRoute = () => matchedStaticRoute().length > 0;

  const trimmedPath = getTrimmedPath(location.pathname);

  const staticRoute = isStaticRoute() && matchedStaticRoute()[0];

  const setPath = useCallback(() => {
    let serverPath = null;
    if (staticRoute && staticRoute.match && staticRoute.match.isExact) {
      serverPath = staticRoute.route.path
        .split('/')
        .filter(p => !p.startsWith(':'))
        .join('/');
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
  if (isStaticRoute(trimmedPath)) {
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
  if (contentTypeId) {
    const MatchedComponent = routes.ContentTypeMappings.find(
      item => item.contentTypeID == contentTypeId
    );

    if (MatchedComponent) {
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
  if (isNotFound) {
    return (
      <Status code={404}>
        <NotFoundComponent />
      </Status>
    );
  }

  return null;
};

RouteLoader.propTypes = {
  contentTypeId: PropTypes.string,
  entry: PropTypes.object,
  isLoading: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  isNotFound: PropTypes.bool,
  loadingComponent: PropTypes.func,
  mappedEntry: PropTypes.object,
  notFoundComponent: PropTypes.func,
  projectId: PropTypes.string,
  routes: PropTypes.objectOf(PropTypes.array, PropTypes.array),
  setNavigationPath: PropTypes.func,
  statePath: PropTypes.string,
  withEvents: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    contentTypeId: selectRouteEntryContentTypeId(state),
    entry: selectRouteEntry(state),
    isNotFound: selectIsNotFound(state),
    isLoggedIn: selectUserLoggedIn(state),
    isLoading: selectRouteLoading(state),
    mappedEntry: selectMappedEntry(state),
    projectId: selectCurrentProject(state),
    statePath: selectCurrentPath(state),
  };
};

const mapDispatchToProps = {
  setNavigationPath,
};

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(RouteLoader))
);
