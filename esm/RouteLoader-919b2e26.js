import React, { useCallback, useEffect } from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { j as selectRouteEntryContentTypeId, c as selectRouteEntry, k as selectIsNotFound, l as selectUserLoggedIn, m as selectRouteLoading, n as selectMappedEntry, d as selectCurrentProject, o as selectCurrentPath } from './selectors-99d4c59c.js';
import { a as setNavigationPath } from './routing-35ccdb5f.js';
import { t as toJS } from './ToJs-1649f545.js';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

const NotFound = () => React.createElement(React.Fragment, null, React.createElement("header", null, React.createElement("h1", null, "404 Page Not Found")));

const Status = ({
  code,
  children
}) => {
  return React.createElement(Route, {
    render: ({
      staticContext
    }) => {
      if (staticContext) staticContext.status = code;
      return children;
    }
  });
};
Status.propTypes = {
  code: PropTypes.number.isRequired,
  children: PropTypes.element
};

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
  withEvents
}) => {
  const location = useLocation(); // Match any Static Routes a developer has defined

  const matchedStaticRoute = () => matchRoutes(routes.StaticRoutes, location.pathname);

  const isStaticRoute = () => matchedStaticRoute().length > 0;

  const trimmedPath = getTrimmedPath(location.pathname);
  const staticRoute = isStaticRoute() && matchedStaticRoute()[0];
  const setPath = useCallback(() => {
    let serverPath = null;

    if (staticRoute && staticRoute.match && staticRoute.match.isExact) {
      serverPath = staticRoute.route.path.split('/').filter(p => !p.startsWith(':')).join('/');
    }

    setNavigationPath(serverPath || trimmedPath, location, staticRoute, withEvents, statePath, routes); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNavigationPath, // staticRoute,
  withEvents, location, routes, // statePath,
  trimmedPath]);
  if (typeof window == 'undefined') setPath();
  useEffect(() => {
    setPath();
  }, [location, setPath]); // Need to redirect when url endswith a /

  if (location.pathname.length > trimmedPath.length) {
    return React.createElement(Redirect, {
      to: trimmedPath
    });
  } // Render any Static Routes a developer has defined


  if (isStaticRoute()) {
    return renderRoutes(routes.StaticRoutes, {
      projectId,
      contentTypeId,
      entry,
      mappedEntry,
      isLoggedIn
    });
  } // Render a supplied Loading component if the route
  // is not a static route and is in a loading state


  if (isLoading && !isNotFound && loadingComponent) {
    const LoadingComponent = loadingComponent;
    return React.createElement(LoadingComponent, null);
  } // Match any defined Content Type Mappings


  if (contentTypeId) {
    const MatchedComponent = routes.ContentTypeMappings.find(item => item.contentTypeID == contentTypeId);

    if (MatchedComponent) {
      return React.createElement(MatchedComponent.component, {
        projectId: projectId,
        contentTypeId: contentTypeId,
        entry: entry,
        mappedEntry: mappedEntry,
        isLoggedIn: isLoggedIn
      });
    }
  }

  const NotFoundComponent = notFoundComponent ? notFoundComponent : NotFound;

  if (isNotFound) {
    return React.createElement(Status, {
      code: 404
    }, React.createElement(NotFoundComponent, null));
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
  withEvents: PropTypes.object
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
    statePath: selectCurrentPath(state)
  };
};

const mapDispatchToProps = {
  setNavigationPath
};
var RouteLoader$1 = hot(module)(connect(mapStateToProps, mapDispatchToProps)(toJS(RouteLoader)));

export { RouteLoader$1 as R };
//# sourceMappingURL=RouteLoader-919b2e26.js.map
