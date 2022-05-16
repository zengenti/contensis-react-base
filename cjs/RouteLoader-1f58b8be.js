'use strict';

var React = require('react');
var reactRedux = require('react-redux');
var reactHotLoader = require('react-hot-loader');
var require$$2 = require('react-router-dom');
var reselect = require('reselect');
var selectors = require('./selectors-656da4b7.js');
var actions = require('./actions-8dc9e8de.js');
var ToJs = require('./ToJs-55a7536c.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const NotFound = ({
  statusCode,
  statusText
}) => /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("header", null, /*#__PURE__*/React__default["default"].createElement("h1", null, statusCode || '404', " Page Not Found"), statusText && /*#__PURE__*/React__default["default"].createElement("h2", {
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
  const location = require$$2.useLocation(); // Always ensure paths are trimmed of trailing slashes so urls are always unique

  const trimmedPath = getTrimmedPath(location.pathname); // Convert any react-router-v5 style routes to react-router-v6 style routes.

  const staticRoutes = routes.StaticRoutes.map(x => {
    const route = { ...x
    };

    if (route.component) {
      route.element = /*#__PURE__*/React__default["default"].createElement(route.component, {
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

  const matchedStaticRoute = require$$2.matchRoutes(staticRoutes, location);
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
  const staticRouteElement = require$$2.useRoutes(staticRoutes);
  const setPath = React.useCallback(() => {
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
  React.useEffect(() => {
    setPath();
  }, [location, setPath]); // Need to redirect when url endswith a /

  if (location.pathname.length > trimmedPath.length) {
    // Todo: Also handle the redirect serverside
    return /*#__PURE__*/React__default["default"].createElement(require$$2.Navigate, {
      to: trimmedPath
    });
  } // Render any Static Routes a developer has defined


  if (isStaticRoute && !(!isLoggedIn && routeRequiresLogin)) {
    if (ToJs.matchUserGroup(userGroups, routeRequiresLogin)) return staticRouteElement;
  } // Render a supplied Loading component if the route
  // is not a static route and is in a loading state


  if (isLoading && !isNotFound && loadingComponent) {
    const LoadingComponent = loadingComponent;
    return /*#__PURE__*/React__default["default"].createElement(LoadingComponent, null);
  } // Match any defined Content Type Mappings


  if (contentTypeId && !(!isLoggedIn && routeRequiresLogin)) {
    const MatchedComponent = routes.ContentTypeMappings.find(item => item.contentTypeID === contentTypeId);

    if (MatchedComponent && !(MatchedComponent.requireLogin && !isLoggedIn)) {
      if (ToJs.matchUserGroup(userGroups, MatchedComponent.requireLogin)) return /*#__PURE__*/React__default["default"].createElement(MatchedComponent.component, {
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
    return /*#__PURE__*/React__default["default"].createElement(Status, {
      code: statusCode
    }, /*#__PURE__*/React__default["default"].createElement(NotFoundComponent, {
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
  setNavigationPath: actions.setNavigationPath
};
var RouteLoader$1 = reactHotLoader.hot(module)(reactRedux.connect(mapStateToPropsMemoized, mapDispatchToProps)(ToJs.toJS(RouteLoader)));

exports.RouteLoader = RouteLoader$1;
//# sourceMappingURL=RouteLoader-1f58b8be.js.map
