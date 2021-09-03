import React, { useCallback, useEffect } from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
<<<<<<< HEAD:esm/RouteLoader-2cfdfc5c.js
=======
<<<<<<< HEAD:esm/RouteLoader-b60ba6b7.js
import { h as setNavigationPath } from './routing-3bbf9dde.js';
import { h as selectRouteEntryContentTypeId, s as selectRouteEntry, i as selectRouteIsError, j as selectIsNotFound, k as selectRouteLoading, f as selectMappedEntry, a as selectCurrentProject, l as selectCurrentPath, m as selectRouteStatusCode, n as selectRouteErrorMessage } from './routing-786c3bb0.js';
import { t as toJS, a as selectUserIsAuthenticated, b as selectUserGroups, m as matchUserGroup } from './ToJs-bf49708e.js';
=======
import { p as selectRouteEntryContentTypeId, a as selectRouteEntry, r as selectIsNotFound, t as selectRouteLoading, j as selectMappedEntry, b as selectCurrentProject, u as selectCurrentPath, v as setNavigationPath } from './routing-7eff80b5.js';
import { t as toJS, a as selectUserIsAuthenticated, b as selectUserGroups, m as matchUserGroup } from './ToJs-13f1f0b2.js';
>>>>>>> 8f6a0bd8ed1dfcb4a74b6d35685352d4189a5b5c:esm/RouteLoader-a5e6fc7b.js
>>>>>>> contensis-14-forgot-change-password:esm/RouteLoader-a5e6fc7b.js
import { matchRoutes, renderRoutes } from 'react-router-config';
import { g as setNavigationPath } from './actions-fda5e103.js';
import { h as selectRouteEntryContentTypeId, s as selectRouteEntry, i as selectRouteIsError, j as selectIsNotFound, k as selectRouteLoading, f as selectMappedEntry, a as selectCurrentProject, l as selectCurrentPath, m as selectRouteStatusCode, n as selectRouteErrorMessage } from './selectors-170581d2.js';
import { t as toJS, s as selectUserIsAuthenticated, a as selectUserGroups, m as matchUserGroup } from './ToJs-19a3244a.js';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

const NotFound = ({
  statusCode,
  statusText
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("h1", null, statusCode || '404', " Page Not Found"), statusText && /*#__PURE__*/React.createElement("h2", {
  style: {
    background: '#eee',
    color: '#666',
    fontSize: '100%',
    padding: '10px'
  }
}, statusText)));

NotFound.propTypes = {
  statusCode: PropTypes.number,
  statusText: PropTypes.string
};

const Status = ({
  code,
  children
}) => {
  return /*#__PURE__*/React.createElement(Route, {
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
    const nextPath = path.replace(/\/\//, '/');
    const lastChar = nextPath[nextPath.length - 1];

    if (lastChar == '/') {
      return nextPath.substring(0, nextPath.length - 1);
    }
  }

  return path;
};

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
  withEvents
}) => {
  const location = useLocation(); // Always ensure paths are trimmed of trailing slashes so urls are always unique

  const trimmedPath = getTrimmedPath(location.pathname); // Match any Static Routes a developer has defined

  const matchedStaticRoute = () => matchRoutes(routes.StaticRoutes, location.pathname);

  const isStaticRoute = () => matchedStaticRoute().length > 0;

  const staticRoute = isStaticRoute() && matchedStaticRoute()[0];
  const routeRequiresLogin = staticRoute && staticRoute.route.requireLogin;
  const setPath = useCallback(() => {
    // Use serverPath to control the path we send to siteview node api to resolve a route
    let serverPath = null;

    if (staticRoute && staticRoute.match && staticRoute.match.isExact) {
      const {
        match,
        route
      } = staticRoute;

      if (route.path.includes('*')) {
        // Send the whole url to api if we have matched route containing wildcard
        serverPath = match.url;
      } else if (typeof route.fetchNodeLevel === 'number') {
        // Send all url parts to a specified level to api
        serverPath = match.url.split('/').splice(0, route.fetchNodeLevel + 1).join('/');
      } else {
        // Send all non-parameterised url parts to api
        serverPath = route.path.split('/').filter(p => !p.startsWith(':')).join('/');
      }
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
    return /*#__PURE__*/React.createElement(Redirect, {
      to: trimmedPath
    });
  } // Render any Static Routes a developer has defined


  if (isStaticRoute() && !(!isLoggedIn && routeRequiresLogin)) {
    if (matchUserGroup(userGroups, routeRequiresLogin)) return renderRoutes(routes.StaticRoutes, {
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
    return /*#__PURE__*/React.createElement(LoadingComponent, null);
  } // Match any defined Content Type Mappings


  if (contentTypeId && !(!isLoggedIn && routeRequiresLogin)) {
    const MatchedComponent = routes.ContentTypeMappings.find(item => item.contentTypeID == contentTypeId); // debugger;

    if (MatchedComponent && !(MatchedComponent.requireLogin && !isLoggedIn)) {
      if (matchUserGroup(userGroups, MatchedComponent.requireLogin)) return /*#__PURE__*/React.createElement(MatchedComponent.component, {
        projectId: projectId,
        contentTypeId: contentTypeId,
        entry: entry,
        mappedEntry: mappedEntry,
        isLoggedIn: isLoggedIn
      });
    }
  }

  const NotFoundComponent = notFoundComponent ? notFoundComponent : NotFound;

  if (isNotFound || isError) {
    return /*#__PURE__*/React.createElement(Status, {
      code: statusCode
    }, /*#__PURE__*/React.createElement(NotFoundComponent, {
      statusCode: statusCode,
      statusText: statusText
    }));
  }

  return null;
};

RouteLoader.propTypes = {
  contentTypeId: PropTypes.string,
  entry: PropTypes.object,
  isError: PropTypes.bool,
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
  statusCode: PropTypes.number,
  statusText: PropTypes.string,
  userGroups: PropTypes.array,
  withEvents: PropTypes.object
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
    userGroups: selectUserGroups(state)
  };
};

const mapDispatchToProps = {
  setNavigationPath
};
var RouteLoader$1 = hot(module)(connect(mapStateToProps, mapDispatchToProps)(toJS(RouteLoader)));

export { RouteLoader$1 as R };
<<<<<<< HEAD:esm/RouteLoader-2cfdfc5c.js
//# sourceMappingURL=RouteLoader-2cfdfc5c.js.map
=======
<<<<<<< HEAD:esm/RouteLoader-b60ba6b7.js
//# sourceMappingURL=RouteLoader-b60ba6b7.js.map
=======
//# sourceMappingURL=RouteLoader-a5e6fc7b.js.map
>>>>>>> 8f6a0bd8ed1dfcb4a74b6d35685352d4189a5b5c:esm/RouteLoader-a5e6fc7b.js
>>>>>>> contensis-14-forgot-change-password:esm/RouteLoader-a5e6fc7b.js
