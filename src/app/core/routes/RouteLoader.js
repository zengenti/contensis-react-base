import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { withRouter, Redirect } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';

import {
  selectRouteEntry,
  selectRouteEntryContentTypeId,
  selectIsNotFound,
  selectCurrentProject,
} from '~/core/redux/selectors/routing';
import { setNavigationPath } from '~/core/redux/actions/routing';
import NotFound from '~/pages/NotFound';

import { Status } from './Status';
import { toJS } from '../util/ToJs';

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
  projectId,
  contentTypeId,
  entry,
  isNotFound,
  setNavigationPath,
  routes,
  location,
  //history,
  withEvents,
}) => {
  const matchedStaticRoute = pathname =>
    matchRoutes(
      routes.StaticRoutes,
      typeof window != 'undefined' ? window.location.pathname : pathname
    );
  const isStaticRoute = pathname => matchedStaticRoute(pathname).length > 0;

  const currentPath = location.pathname;
  const trimmedPath = getTrimmedPath(location.pathname);

  const setPath = () => {
    const routeParams = isStaticRoute(trimmedPath)
      ? matchedStaticRoute(trimmedPath)[0].match.params
      : {};

    setNavigationPath(
      trimmedPath,
      routeParams,
      withEvents,
      isStaticRoute(trimmedPath)
    );
  };

  if (typeof window == 'undefined') setPath();

  useEffect(() => {
    setPath();
  }, [location]);

  // Match Any Static Routes a developer has defined
  if (isStaticRoute(currentPath)) {
    return renderRoutes(routes.StaticRoutes, {
      projectId,
      contentTypeId,
      entry,
    });
  }

  // Need to redirect when url endswith a /
  if (currentPath.length > trimmedPath.length) {
    return <Redirect to={trimmedPath} />;
  }
  // Match Any Defined Content Type Mappings
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
        />
      );
    }
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
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  projectId: PropTypes.string,
  contentTypeId: PropTypes.string,
  entry: PropTypes.object,
  isNotFound: PropTypes.bool,
  setNavigationPath: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    projectId: selectCurrentProject(state),
    entry: selectRouteEntry(state),
    contentTypeId: selectRouteEntryContentTypeId(state),
    isNotFound: selectIsNotFound(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setNavigationPath: (path, routeParams, withEvents, isStatic) =>
      dispatch(setNavigationPath(path, routeParams, withEvents, isStatic)),
  };
}

export default hot(module)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(toJS(RouteLoader))
  )
);
