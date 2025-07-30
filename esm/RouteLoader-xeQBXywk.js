import React, { useContext, createContext, useCallback, useEffect, cloneElement } from 'react';
import { connect } from 'react-redux';
import { Navigate, useRoutes, useLocation, matchRoutes } from 'react-router-dom';
import { createSelector } from 'reselect';
import { f as selectRouteEntryContentTypeId, h as selectRouteEntry, j as selectRouteIsError, k as selectIsNotFound, l as selectRouteLoading, m as selectMappedEntry, n as selectCurrentProject, o as selectCurrentPath, p as selectRouteStatusCode, q as selectRouteErrorMessage, u as setNavigationPath } from './selectors-DO2ocdOp.js';
import { d as selectUserIsAuthenticated, k as selectUserGroups, t as toJS, m as matchUserGroup } from './ToJs-CNzfvyxJ.js';
import { e as useSSRContext } from './SSRContext-BE8ElZ3X.js';

const mergeStaticRoutes = matchedStaticRoute => {
  let finalRoute = {};
  for (const [i, route] of matchedStaticRoute.entries()) {
    const staticRouteCopy = {
      ...route.route
    };
    if (i === matchedStaticRoute.length - 1) {
      finalRoute = {
        ...finalRoute,
        ...staticRouteCopy,
        fullPath: `${finalRoute.fullPath || ''}${route.route.path ? route.route.path : ''}`
      };
      matchedStaticRoute[i].route = finalRoute;
    } else {
      delete staticRouteCopy.children;
      delete staticRouteCopy.index;
      delete staticRouteCopy.path;
      delete staticRouteCopy.component;
      delete staticRouteCopy.element;
      finalRoute = {
        ...finalRoute,
        ...staticRouteCopy,
        fullPath: `${finalRoute.fullPath || ''}${route.route.path ? route.route.path.endsWith('/') ? route.route.path : route.route.path + '/' : ''}`
      };
    }
  }
};

const HttpContext = /*#__PURE__*/createContext({});
const useHttpContext = () => {
  return useContext(HttpContext);
};

const Redirect = ({
  code,
  to
}) => {
  const httpContext = useHttpContext();
  if (httpContext) {
    httpContext.statusCode = code;
    httpContext.url = to;
  }
  return /*#__PURE__*/React.createElement(Navigate, {
    to: to
  });
};

const Status = ({
  code,
  children
}) => {
  const httpContext = useHttpContext();
  if (httpContext) {
    httpContext.statusCode = code;
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
};

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

const StaticRouteLoader = ({
  staticRoutes
}) => {
  const staticRouteElement = useRoutes(staticRoutes);
  return /*#__PURE__*/React.createElement(React.Fragment, null, staticRouteElement);
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
const processStaticRoutes = (staticRoutes, componentProps) => {
  const {
    projectId,
    contentTypeId,
    entry,
    mappedEntry,
    isLoggedIn
  } = componentProps;
  return staticRoutes.map(x => {
    const route = {
      ...x
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
    if (route.element) {
      route.element = /*#__PURE__*/cloneElement(route.element, {
        projectId,
        contentTypeId,
        entry,
        mappedEntry,
        isLoggedIn
      });
    }
    if (route.children) {
      route.children = processStaticRoutes(route.children, componentProps);
    }
    return route;
  });
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

  // In SSR pass references to things in backing sagas
  // we cannot access in a global scope
  const ssrContext = useSSRContext();

  // Always ensure paths are trimmed of trailing slashes so urls are always unique
  const trimmedPath = getTrimmedPath(location.pathname);

  // Convert any react-router-v5 style routes to react-router-v6 style routes.
  const staticRoutes = processStaticRoutes(routes.StaticRoutes, {
    projectId,
    contentTypeId,
    entry,
    mappedEntry,
    isLoggedIn
  });

  // Match any Static Routes a developer has defined
  const matchedStaticRoute = matchRoutes(staticRoutes, location);
  const isStaticRoute = matchedStaticRoute && matchedStaticRoute.length > 0;

  // Combine custom params for all static routes, with the furthest config taking precedence.
  if (isStaticRoute) {
    mergeStaticRoutes(matchedStaticRoute);
  }
  const staticRoute = isStaticRoute ? matchedStaticRoute.pop() || undefined : undefined;
  const routeRequiresLogin = staticRoute ? staticRoute.route.requireLogin : undefined;
  const setPath = useCallback(() => {
    // Use serverPath to control the path we send to siteview node api to resolve a route
    let serverPath = '';
    if (staticRoute && staticRoute.pathname === staticRoute.pathnameBase) {
      var _route$path, _route$fetchNode;
      const {
        route,
        pathname,
        params
      } = staticRoute;
      if ((_route$path = route.path) !== null && _route$path !== void 0 && _route$path.includes('*')) {
        // Send the whole url to api if we have matched route containing wildcard
        serverPath = pathname;
      } else if (typeof route.fetchNodeLevel === 'number') {
        // Send all url parts to a specified level to api
        serverPath = pathname.split('/').splice(0, route.fetchNodeLevel + 1).join('/');
      } else if (typeof route.fetchNode === 'object' && (_route$fetchNode = route.fetchNode) !== null && _route$fetchNode !== void 0 && _route$fetchNode.params) {
        const fetchNodeParams = route.fetchNode.params;
        const routeParams = params;
        const regexExp = new RegExp(Object.keys(routeParams).map(p => `:${p}`).join('|'), 'g');
        serverPath = pathname.replace(/\?/g, '').replace(regexExp, matched => {
          const param = matched.replace(':', '');
          if (fetchNodeParams.includes(param)) return routeParams[param] || '';else return '';
        }).replace(/\/$/, '');
      } else {
        var _route$fullPath;
        // Send all non-parameterised url parts to api
        serverPath = (_route$fullPath = route.fullPath) === null || _route$fullPath === void 0 ? void 0 : _route$fullPath.split('/').filter(p => !p.startsWith(':')).join('/');
      }
    }
    setNavigationPath(serverPath || trimmedPath, location, staticRoute, withEvents, statePath, routes, ssrContext);
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
    return /*#__PURE__*/React.createElement(Redirect, {
      code: trailingSlashRedirectCode || 302,
      to: `${trimmedPath}${location.search}${location.hash}`
    });
  }

  // Render any Static Routes a developer has defined
  if (isStaticRoute && !(!isLoggedIn && routeRequiresLogin)) {
    if (matchUserGroup(userGroups, routeRequiresLogin)) return /*#__PURE__*/React.createElement(StaticRouteLoader, {
      staticRoutes: staticRoutes
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
    console.info(`RouteLoader rendering NotFound component: statusCode ${statusCode}, isNotFound ${isNotFound}, isError ${isError}`);
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
var RouteLoader$1 = connect(mapStateToPropsMemoized, mapDispatchToProps)(toJS(RouteLoader));

export { HttpContext as H, Redirect as R, Status as S, RouteLoader$1 as a, mergeStaticRoutes as m, useHttpContext as u };
//# sourceMappingURL=RouteLoader-xeQBXywk.js.map
