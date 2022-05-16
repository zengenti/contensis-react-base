import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { useLocation, matchRoutes, useRoutes, Navigate } from 'react-router-dom';
import { createSelector } from 'reselect';
import { k as selectRouteEntryContentTypeId, a as selectRouteEntry, l as selectRouteIsError, m as selectIsNotFound, n as selectRouteLoading, i as selectMappedEntry, b as selectCurrentProject, o as selectCurrentPath, p as selectRouteStatusCode, r as selectRouteErrorMessage } from './selectors-337be432.js';
import { g as setNavigationPath } from './actions-fcfc8704.js';
import { a as selectUserIsAuthenticated, b as selectUserGroups, t as toJS, m as matchUserGroup } from './ToJs-fcfaca09.js';

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

// Todo: Remove below disable once implemented properly.

/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Route } from 'react-router-dom';
const Status = ({
  code,
  children
}) => {
  // Todo: Use our custom context to set a status code.
  return null; // return (
  //   <Route
  //     render={({ staticContext }) => {
  //       if (staticContext) staticContext.statusCode = code;
  //       return children;
  //     }}
  //   />
  // );
};

const replaceDoubleSlashRecursive = path => {
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

  const trimmedPath = getTrimmedPath(location.pathname); // Convert any react-router-v5 style routes to react-router-v6 style routes.

  const staticRoutes = routes.StaticRoutes.map(x => {
    const route = { ...x
    };

    if (route.component) {
      route.element = /*#__PURE__*/React.createElement(route.component, {
        projectId: projectId,
        contentTypeId: contentTypeId ? contentTypeId : undefined,
        entry: entry,
        mappedEntry: mappedEntry,
        isLoggedIn: isLoggedIn
      });
      delete route.component;
    }

    return route;
  }); // Match any Static Routes a developer has defined

  const matchedStaticRoute = matchRoutes(staticRoutes, location);
  const isStaticRoute = matchedStaticRoute && matchedStaticRoute.length > 0; // Combine custom params for all static routes, with the furthest config taking precedence.

  let finalRoute = {};

  if (isStaticRoute) {
    for (const [i, route] of matchedStaticRoute.entries()) {
      const staticRouteCopy = { ...route.route
      };

      if (i === matchedStaticRoute.length - 1) {
        finalRoute = { ...finalRoute,
          ...staticRouteCopy
        };
        matchedStaticRoute[i].route = finalRoute;
      } else {
        delete staticRouteCopy.children;
        delete staticRouteCopy.index;
        delete staticRouteCopy.path;
        delete staticRouteCopy.component;
        delete staticRouteCopy.element;
        finalRoute = { ...finalRoute,
          ...staticRouteCopy
        };
      }
    }
  }

  const staticRoute = isStaticRoute ? matchedStaticRoute.pop() || null : null;
  const routeRequiresLogin = staticRoute ? staticRoute.route.requireLogin : undefined;
  const staticRouteElement = useRoutes(staticRoutes);
  const setPath = useCallback(() => {
    // Use serverPath to control the path we send to siteview node api to resolve a route
    let serverPath = '';

    if (staticRoute && staticRoute.pathname === staticRoute.pathnameBase) {
      var _route$path;

      const {
        route,
        pathname
      } = staticRoute;

      if ((_route$path = route.path) !== null && _route$path !== void 0 && _route$path.includes('*')) {
        // Send the whole url to api if we have matched route containing wildcard
        serverPath = pathname;
      } else if (typeof route.fetchNodeLevel === 'number') {
        // Send all url parts to a specified level to api
        serverPath = pathname.split('/').splice(0, route.fetchNodeLevel + 1).join('/');
      } else {
        var _route$path2;

        // Send all non-parameterised url parts to api
        serverPath = (_route$path2 = route.path) === null || _route$path2 === void 0 ? void 0 : _route$path2.split('/').filter(p => !p.startsWith(':')).join('/');
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
    // Todo: Also handle the redirect serverside
    return /*#__PURE__*/React.createElement(Navigate, {
      to: trimmedPath
    });
  } // Render any Static Routes a developer has defined


  if (isStaticRoute && !(!isLoggedIn && routeRequiresLogin)) {
    if (matchUserGroup(userGroups, routeRequiresLogin)) return staticRouteElement;
  } // Render a supplied Loading component if the route
  // is not a static route and is in a loading state


  if (isLoading && !isNotFound && loadingComponent) {
    const LoadingComponent = loadingComponent;
    return /*#__PURE__*/React.createElement(LoadingComponent, null);
  } // Match any defined Content Type Mappings


  if (contentTypeId && !(!isLoggedIn && routeRequiresLogin)) {
    const MatchedComponent = routes.ContentTypeMappings.find(item => item.contentTypeID === contentTypeId);

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

const mapStateToPropsMemoized = createSelector(selectRouteEntryContentTypeId, selectRouteEntry, selectRouteIsError, selectIsNotFound, selectRouteLoading, selectUserIsAuthenticated, selectMappedEntry, selectCurrentProject, selectCurrentPath, selectRouteStatusCode, selectRouteErrorMessage, selectUserGroups, (contentTypeId, entry, isError, isNotFound, isLoading, isLoggedIn, mappedEntry, projectId, statePath, statusCode, statusText, userGroups) => ({
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
}));
const mapDispatchToProps = {
  setNavigationPath
};
var RouteLoader$1 = hot(module)(connect(mapStateToPropsMemoized, mapDispatchToProps)(toJS(RouteLoader)));

export { RouteLoader$1 as R };
//# sourceMappingURL=RouteLoader-804d6019.js.map
