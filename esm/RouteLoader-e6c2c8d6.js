import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Route, useLocation, Redirect } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { createSelector } from 'reselect';
import { r as selectRouteEntryContentTypeId, a as selectRouteEntry, t as selectRouteIsError, u as selectIsNotFound, v as selectRouteLoading, k as selectMappedEntry, b as selectCurrentProject, w as selectCurrentPath, x as selectRouteStatusCode, y as selectRouteErrorMessage, z as setNavigationPath } from './selectors-ff21e98a.js';
import { a as selectUserIsAuthenticated, b as selectUserGroups, t as toJS, m as matchUserGroup } from './ToJs-7233c038.js';

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

const Status = ({
  code,
  children
}) => {
  return /*#__PURE__*/React.createElement(Route, {
    render: ({
      staticContext
    }) => {
      if (staticContext) staticContext.statusCode = code;
      return children;
    }
  });
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
  withEvents,
  trailingSlashRedirectCode = 302
}) => {
  const location = useLocation();
  // Always ensure paths are trimmed of trailing slashes so urls are always unique
  const trimmedPath = getTrimmedPath(location.pathname);

  // Match any Static Routes a developer has defined
  const matchedStaticRoute = () => matchRoutes(routes.StaticRoutes, location.pathname);
  const isStaticRoute = () => matchedStaticRoute().length > 0;
  const staticRoute = isStaticRoute() && matchedStaticRoute()[0];
  const routeRequiresLogin = staticRoute && staticRoute.route.requireLogin;
  const setPath = useCallback(() => {
    // Use serverPath to control the path we send to siteview node api to resolve a route
    let serverPath = '';
    if (staticRoute && staticRoute.match && staticRoute.match.isExact) {
      var _route$path, _route$fetchNode;
      const {
        match,
        route
      } = staticRoute;
      if ((_route$path = route.path) !== null && _route$path !== void 0 && _route$path.includes('*')) {
        // Send the whole url to api if we have matched route containing wildcard
        serverPath = match.url;
      } else if (typeof route.fetchNodeLevel === 'number') {
        // Send all url parts to a specified level to api
        serverPath = match.url.split('/').splice(0, route.fetchNodeLevel + 1).join('/');
      } else if ((_route$fetchNode = route.fetchNode) !== null && _route$fetchNode !== void 0 && _route$fetchNode.params) {
        const fetchNodeParams = route.fetchNode.params;
        const routeParams = match.params;
        const regexExp = new RegExp(Object.keys(routeParams).map(p => `:${p}`).join('|'), 'g');
        serverPath = match.path.replace(/\?/g, '').replace(regexExp, matched => {
          const param = matched.replace(':', '');
          if (fetchNodeParams.includes(param)) return routeParams[param];else return '';
        }).replace(/\/$/, '');
      } else {
        var _route$path2;
        // Send all non-parameterised url parts to api
        serverPath = (_route$path2 = route.path) === null || _route$path2 === void 0 ? void 0 : _route$path2.split('/').filter(p => !p.startsWith(':')).join('/');
      }
    }
    setNavigationPath(serverPath || trimmedPath, location, staticRoute, withEvents, statePath, routes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNavigationPath,
  // staticRoute,
  withEvents, location, routes,
  // statePath,
  trimmedPath]);
  if (typeof window == 'undefined') setPath();
  useEffect(() => {
    setPath();
  }, [location, setPath]);

  // Need to redirect when url endswith a /
  if (location.pathname.length > trimmedPath.length) {
    return /*#__PURE__*/React.createElement(Status, {
      code: trailingSlashRedirectCode
    }, /*#__PURE__*/React.createElement(Redirect, {
      to: `${trimmedPath}${location.search}${location.hash}`
    }));
  }

  // Render any Static Routes a developer has defined
  if (isStaticRoute() && !(!isLoggedIn && routeRequiresLogin)) {
    if (matchUserGroup(userGroups, routeRequiresLogin)) return renderRoutes(routes.StaticRoutes, {
      projectId,
      contentTypeId,
      entry,
      mappedEntry,
      isLoggedIn
    });
  }

  // Render a supplied Loading component if the route
  // is not a static route and is in a loading state
  if (isLoading && !isNotFound && loadingComponent) {
    const LoadingComponent = loadingComponent;
    return /*#__PURE__*/React.createElement(LoadingComponent, null);
  }

  // Match any defined Content Type Mappings
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
//# sourceMappingURL=RouteLoader-e6c2c8d6.js.map
