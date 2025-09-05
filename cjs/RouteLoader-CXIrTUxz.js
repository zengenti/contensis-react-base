'use strict';

var React = require('react');
var reactRedux = require('react-redux');
var reactRouterDom = require('react-router-dom');
var reselect = require('reselect');
var selectors = require('./selectors-Bp_TrwG5.js');
var matchGroups = require('./matchGroups-CNt2aNoC.js');
var ToJs = require('./ToJs-BsWqWjdm.js');
var SSRContext = require('./SSRContext-t1bfEwbB.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

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

const HttpContext = /*#__PURE__*/React.createContext({});
const useHttpContext = () => {
  return React.useContext(HttpContext);
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
  return /*#__PURE__*/React__default.default.createElement(reactRouterDom.Navigate, {
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
  return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, children);
};

const NotFound = ({
  statusCode,
  statusText
}) => /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement("header", null, /*#__PURE__*/React__default.default.createElement("h1", null, statusCode || '404', " Page Not Found"), statusText && /*#__PURE__*/React__default.default.createElement("h2", {
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
  const staticRouteElement = reactRouterDom.useRoutes(staticRoutes);
  return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, staticRouteElement);
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
      route.element = /*#__PURE__*/React__default.default.createElement(route.component, {
        projectId: projectId,
        contentTypeId: contentTypeId ? contentTypeId : undefined,
        entry: entry,
        mappedEntry: mappedEntry,
        isLoggedIn: isLoggedIn
      });
      delete route.component;
    }
    if (route.element) {
      route.element = /*#__PURE__*/React.cloneElement(route.element, {
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
  const location = reactRouterDom.useLocation();

  // In SSR pass references to things in backing sagas
  // we cannot access in a global scope
  const ssrContext = SSRContext.useSSRContext();

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
  const matchedStaticRoute = reactRouterDom.matchRoutes(staticRoutes, location);
  const isStaticRoute = matchedStaticRoute && matchedStaticRoute.length > 0;

  // Combine custom params for all static routes, with the furthest config taking precedence.
  if (isStaticRoute) {
    mergeStaticRoutes(matchedStaticRoute);
  }
  const staticRoute = isStaticRoute ? matchedStaticRoute.pop() || undefined : undefined;
  const routeRequiresLogin = staticRoute ? staticRoute.route.requireLogin : undefined;
  const setPath = React.useCallback(() => {
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
  React.useEffect(() => {
    setPath();
  }, [location, setPath]);

  // Need to redirect when url endswith a /
  if (location.pathname.length > trimmedPath.length) {
    return /*#__PURE__*/React__default.default.createElement(Redirect, {
      code: trailingSlashRedirectCode || 302,
      to: `${trimmedPath}${location.search}${location.hash}`
    });
  }

  // Render any Static Routes a developer has defined
  if (isStaticRoute && !(!isLoggedIn && routeRequiresLogin)) {
    if (matchGroups.matchUserGroup(userGroups, routeRequiresLogin)) return /*#__PURE__*/React__default.default.createElement(StaticRouteLoader, {
      staticRoutes: staticRoutes
    });
  }

  // Render a supplied Loading component if the route
  // is not a static route and is in a loading state
  if (isLoading && !isNotFound && loadingComponent) {
    const LoadingComponent = loadingComponent;
    return /*#__PURE__*/React__default.default.createElement(LoadingComponent, null);
  }

  // Match any defined Content Type Mappings
  if (contentTypeId && !(!isLoggedIn && routeRequiresLogin)) {
    const MatchedComponent = routes.ContentTypeMappings.find(item => item.contentTypeID === contentTypeId);
    if (MatchedComponent && !(MatchedComponent.requireLogin && !isLoggedIn)) {
      if (matchGroups.matchUserGroup(userGroups, MatchedComponent.requireLogin)) return /*#__PURE__*/React__default.default.createElement(MatchedComponent.component, {
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
    return /*#__PURE__*/React__default.default.createElement(Status, {
      code: statusCode
    }, /*#__PURE__*/React__default.default.createElement(NotFoundComponent, {
      statusCode: statusCode,
      statusText: statusText
    }));
  }
  return null;
};
const mapStateToPropsMemoized = reselect.createSelector(selectors.selectRouteEntryContentTypeId, selectors.selectRouteEntry, selectors.selectRouteIsError, selectors.selectIsNotFound, selectors.selectRouteLoading, matchGroups.selectUserIsAuthenticated, selectors.selectMappedEntry, selectors.selectCurrentProject, selectors.selectCurrentPath, selectors.selectRouteStatusCode, selectors.selectRouteErrorMessage, matchGroups.selectUserGroups, (contentTypeId, entry, isError, isNotFound, isLoading, isLoggedIn, mappedEntry, projectId, statePath, statusCode, statusText, userGroups) => ({
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
  setNavigationPath: selectors.setNavigationPath
};
var RouteLoader$1 = reactRedux.connect(mapStateToPropsMemoized, mapDispatchToProps)(ToJs.toJS(RouteLoader));

exports.HttpContext = HttpContext;
exports.Redirect = Redirect;
exports.RouteLoader = RouteLoader$1;
exports.Status = Status;
exports.mergeStaticRoutes = mergeStaticRoutes;
exports.useHttpContext = useHttpContext;
//# sourceMappingURL=RouteLoader-CXIrTUxz.js.map
