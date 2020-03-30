import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Redirect, useLocation } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';

import {
  selectRouteEntry,
  selectRouteEntryContentTypeId,
  selectRouteLoading,
  selectIsNotFound,
  selectCurrentProject,
  selectCurrentPath,
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
  isLoggedIn,
  isNotFound,
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

  const [MatchedComponent, setMatchedComponent] = useState(false);

  useEffect(() => {
    setMatchedComponent(() =>
      routes.ContentTypeMappings.find(
        item => item.contentTypeID == contentTypeId
      )
    );
  }, [contentTypeId, routes.ContentTypeMappings]);

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
      isLoggedIn,
    });
  }

  // Match any Defined Content Type Mappings

  if (MatchedComponent) {
    return (
      <MatchedComponent.component
        projectId={projectId}
        contentTypeId={contentTypeId}
        entry={entry}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  if (isNotFound) {
    return (
      <Status code={404}>
        <NotFound />
      </Status>
    );
  }

  return null;
};

RouteLoader.propTypes = {
  routes: PropTypes.objectOf(PropTypes.array, PropTypes.array),
  withEvents: PropTypes.object,
  statePath: PropTypes.string,
  projectId: PropTypes.string,
  contentTypeId: PropTypes.string,
  loading: PropTypes.object,
  entry: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  isNotFound: PropTypes.bool,
  setNavigationPath: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    statePath: selectCurrentPath(state),
    projectId: selectCurrentProject(state),
    entry: selectRouteEntry(state),
    contentTypeId: selectRouteEntryContentTypeId(state),
    isNotFound: selectIsNotFound(state),
    isLoggedIn: selectUserLoggedIn(state),
    isLoading: selectRouteLoading(state),
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
