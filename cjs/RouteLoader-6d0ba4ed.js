'use strict';

var React = require('react');
var reactRouterDom = require('react-router-dom');
var reactRedux = require('react-redux');
var reactRouterConfig = require('react-router-config');
var actions = require('./actions-24b4aaea.js');
var selectors = require('./selectors-d96c128c.js');
var ToJs = require('./ToJs-7aaee88a.js');
var reactHotLoader = require('react-hot-loader');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const NotFound = ({
  statusCode,
  statusText
}) => /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("header", null, /*#__PURE__*/React__default['default'].createElement("h1", null, statusCode || '404', " Page Not Found"), statusText && /*#__PURE__*/React__default['default'].createElement("h2", {
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
  return /*#__PURE__*/React__default['default'].createElement(reactRouterDom.Route, {
    render: ({
      staticContext
    }) => {
      if (staticContext) staticContext.statusCode = code;
      return children;
    }
  });
};

const getTrimmedPath = path => {
  if (path !== '/') {
    const nextPath = path.replace(/\/\//, '/');
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
  const location = reactRouterDom.useLocation(); // Always ensure paths are trimmed of trailing slashes so urls are always unique

  const trimmedPath = getTrimmedPath(location.pathname); // Match any Static Routes a developer has defined

  const matchedStaticRoute = () => reactRouterConfig.matchRoutes(routes.StaticRoutes, location.pathname);

  const isStaticRoute = () => matchedStaticRoute().length > 0;

  const staticRoute = isStaticRoute() && matchedStaticRoute()[0];
  const routeRequiresLogin = staticRoute && staticRoute.route.requireLogin;
  const setPath = React.useCallback(() => {
    // Use serverPath to control the path we send to siteview node api to resolve a route
    let serverPath = '';

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
  React.useEffect(() => {
    setPath();
  }, [location, setPath]); // Need to redirect when url endswith a /

  if (location.pathname.length > trimmedPath.length) {
    return /*#__PURE__*/React__default['default'].createElement(reactRouterDom.Redirect, {
      to: trimmedPath
    });
  } // Render any Static Routes a developer has defined


  if (isStaticRoute() && !(!isLoggedIn && routeRequiresLogin)) {
    if (ToJs.matchUserGroup(userGroups, routeRequiresLogin)) return reactRouterConfig.renderRoutes(routes.StaticRoutes, {
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
    return /*#__PURE__*/React__default['default'].createElement(LoadingComponent, null);
  } // Match any defined Content Type Mappings


  if (contentTypeId && !(!isLoggedIn && routeRequiresLogin)) {
    const MatchedComponent = routes.ContentTypeMappings.find(item => item.contentTypeID === contentTypeId); // debugger;

    if (MatchedComponent && !(MatchedComponent.requireLogin && !isLoggedIn)) {
      if (ToJs.matchUserGroup(userGroups, MatchedComponent.requireLogin)) return /*#__PURE__*/React__default['default'].createElement(MatchedComponent.component, {
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
    return /*#__PURE__*/React__default['default'].createElement(Status, {
      code: statusCode
    }, /*#__PURE__*/React__default['default'].createElement(NotFoundComponent, {
      statusCode: statusCode,
      statusText: statusText
    }));
  }

  return null;
};

const mapStateToProps = state => {
  return {
    contentTypeId: selectors.selectRouteEntryContentTypeId(state),
    entry: selectors.selectRouteEntry(state),
    isError: selectors.selectRouteIsError(state),
    isNotFound: selectors.selectIsNotFound(state),
    isLoading: selectors.selectRouteLoading(state),
    isLoggedIn: ToJs.selectUserIsAuthenticated(state),
    mappedEntry: selectors.selectMappedEntry(state),
    projectId: selectors.selectCurrentProject(state),
    statePath: selectors.selectCurrentPath(state),
    statusCode: selectors.selectRouteStatusCode(state),
    statusText: selectors.selectRouteErrorMessage(state),
    userGroups: ToJs.selectUserGroups(state)
  };
};

const mapDispatchToProps = {
  setNavigationPath: actions.setNavigationPath
};
var RouteLoader$1 = reactHotLoader.hot(module)(reactRedux.connect(mapStateToProps, mapDispatchToProps)(ToJs.toJS(RouteLoader)));

exports.RouteLoader = RouteLoader$1;
//# sourceMappingURL=RouteLoader-6d0ba4ed.js.map
