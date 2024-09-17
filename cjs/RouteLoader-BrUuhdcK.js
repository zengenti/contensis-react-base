'use strict';

var React = require('react');
var reactRedux = require('react-redux');
var reactHotLoader = require('react-hot-loader');
var reactRouterDom = require('react-router-dom');
var reactRouterConfig = require('react-router-config');
var reselect = require('reselect');
var selectors = require('./selectors-wCs5fHD4.js');
var ToJs = require('./ToJs-C9jwV7YB.js');
var SSRContext = require('./SSRContext-CmXDzwPL.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

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

const Status = ({
  code,
  children
}) => {
  return /*#__PURE__*/React__default.default.createElement(reactRouterDom.Route, {
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
  const location = reactRouterDom.useLocation();

  // In SSR pass references to things in backing sagas
  // we cannot access in a global scope
  const ssrContext = SSRContext.useSSRContext();

  // Always ensure paths are trimmed of trailing slashes so urls are always unique
  const trimmedPath = getTrimmedPath(location.pathname);

  // Match any Static Routes a developer has defined
  const matchedStaticRoute = () => reactRouterConfig.matchRoutes(routes.StaticRoutes, location.pathname);
  const isStaticRoute = () => matchedStaticRoute().length > 0;
  const staticRoute = isStaticRoute() ? matchedStaticRoute()[0] : undefined;
  const routeRequiresLogin = staticRoute && staticRoute.route.requireLogin;
  const setPath = React.useCallback(() => {
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
    return /*#__PURE__*/React__default.default.createElement(Status, {
      code: trailingSlashRedirectCode
    }, /*#__PURE__*/React__default.default.createElement(reactRouterDom.Redirect, {
      to: `${trimmedPath}${location.search}${location.hash}`
    }));
  }

  // Render any Static Routes a developer has defined
  if (isStaticRoute() && !(!isLoggedIn && routeRequiresLogin)) {
    if (ToJs.matchUserGroup(userGroups, routeRequiresLogin)) return reactRouterConfig.renderRoutes(routes.StaticRoutes, {
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
    return /*#__PURE__*/React__default.default.createElement(LoadingComponent, null);
  }

  // Match any defined Content Type Mappings
  if (contentTypeId && !(!isLoggedIn && routeRequiresLogin)) {
    const MatchedComponent = routes.ContentTypeMappings.find(item => item.contentTypeID === contentTypeId);
    if (MatchedComponent && !(MatchedComponent.requireLogin && !isLoggedIn)) {
      if (ToJs.matchUserGroup(userGroups, MatchedComponent.requireLogin)) return /*#__PURE__*/React__default.default.createElement(MatchedComponent.component, {
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
const mapStateToPropsMemoized = reselect.createSelector(selectors.selectRouteEntryContentTypeId, selectors.selectRouteEntry, selectors.selectRouteIsError, selectors.selectIsNotFound, selectors.selectRouteLoading, ToJs.selectUserIsAuthenticated, selectors.selectMappedEntry, selectors.selectCurrentProject, selectors.selectCurrentPath, selectors.selectRouteStatusCode, selectors.selectRouteErrorMessage, ToJs.selectUserGroups, (contentTypeId, entry, isError, isNotFound, isLoading, isLoggedIn, mappedEntry, projectId, statePath, statusCode, statusText, userGroups) => ({
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
var RouteLoader$1 = reactHotLoader.hot(module)(reactRedux.connect(mapStateToPropsMemoized, mapDispatchToProps)(ToJs.toJS(RouteLoader)));

exports.RouteLoader = RouteLoader$1;
//# sourceMappingURL=RouteLoader-BrUuhdcK.js.map
