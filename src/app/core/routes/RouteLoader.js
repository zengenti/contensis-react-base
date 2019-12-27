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
  entry,
  contentTypeId,
  isNotFound,
  setNavigationPath,
  routes,
  location,
  //history,
  withEvents,
}) => {
  useEffect(() => {
    const trimmedPath = getTrimmedPath(location.pathname);
    const routeParams = isStaticRoute(trimmedPath)
      ? matchedStaticRoute(trimmedPath)[0].match.params
      : {};

    setNavigationPath(
      trimmedPath,
      routeParams,
      withEvents,
      isStaticRoute(trimmedPath)
    );
  }, [location, setNavigationPath]);

  const matchedStaticRoute = pathname =>
    matchRoutes(
      routes.StaticRoutes,
      typeof window != 'undefined' ? window.location.pathname : pathname
    );
  const isStaticRoute = pathname => matchedStaticRoute(pathname).length > 0;

  const currentPath = location.pathname;
  const trimmedCurrentPath = getTrimmedPath(location.pathname);

  // Match Any Static Routes a developer has defined
  if (isStaticRoute(currentPath)) {
    return renderRoutes(routes.StaticRoutes, {
      entry,
    });
  }

  // Need to redirect when url endswith a /
  if (currentPath.length > trimmedCurrentPath.length) {
    return <Redirect to={trimmedCurrentPath} />;
  }
  // Match Any Defined Content Type Mappings
  if (contentTypeId) {
    const MatchedComponent = routes.ContentTypeMappings.find(
      item => item.contentTypeID == contentTypeId
    );

    if (MatchedComponent) {
      return <MatchedComponent.component entry={entry} />;
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
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  entry: PropTypes.object,
  isNotFound: PropTypes.bool,
  setNavigationPath: PropTypes.func,
  contentTypeId: PropTypes.string,
  withEvents: PropTypes.object,
};

const mapStateToProps = state => {
  return {
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
