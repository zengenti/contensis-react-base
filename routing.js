(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@babel/runtime/helpers/interopRequireDefault"), require("@babel/runtime/regenerator"), require("immutable"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/interopRequireWildcard"), require("query-string"), require("react-redux"), require("react-router-dom"), require("react-hot-loader"), require("prop-types"), require("react-router-config"));
	else if(typeof define === 'function' && define.amd)
		define(["@babel/runtime/helpers/interopRequireDefault", "@babel/runtime/regenerator", "immutable", "@babel/runtime/helpers/defineProperty", "react", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/helpers/interopRequireWildcard", "query-string", "react-redux", "react-router-dom", "react-hot-loader", "prop-types", "react-router-config"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@babel/runtime/helpers/interopRequireDefault"), require("@babel/runtime/regenerator"), require("immutable"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/interopRequireWildcard"), require("query-string"), require("react-redux"), require("react-router-dom"), require("react-hot-loader"), require("prop-types"), require("react-router-config")) : factory(root["@babel/runtime/helpers/interopRequireDefault"], root["@babel/runtime/regenerator"], root["immutable"], root["@babel/runtime/helpers/defineProperty"], root["react"], root["@babel/runtime/helpers/asyncToGenerator"], root["@babel/runtime/helpers/interopRequireWildcard"], root["query-string"], root["react-redux"], root["react-router-dom"], root["react-hot-loader"], root["prop-types"], root["react-router-config"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__15__, __WEBPACK_EXTERNAL_MODULE__17__, __WEBPACK_EXTERNAL_MODULE__26__, __WEBPACK_EXTERNAL_MODULE__30__, __WEBPACK_EXTERNAL_MODULE__33__, __WEBPACK_EXTERNAL_MODULE__46__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 103);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCaptchaToken = exports.selectCaptchaResponse = exports.selectCaptchaData = exports.selectCaptchaSiteKey = exports.selectChangePasswordMessage = exports.selectPasswordMessage = exports.selectLoginScreenMode = exports.selectUserMessage = exports.selectUserGroups = exports.selectUserLoggedIn = exports.selectUsername = exports.selectUser = void 0;

var selectUser = function selectUser(state) {
  return state.get('user');
};

exports.selectUser = selectUser;

var selectUsername = function selectUsername(state) {
  return state.getIn(['user', 'username']);
};

exports.selectUsername = selectUsername;

var selectUserLoggedIn = function selectUserLoggedIn(state) {
  return state.getIn(['user', 'loggedIn']);
};

exports.selectUserLoggedIn = selectUserLoggedIn;

var selectUserGroups = function selectUserGroups(state) {
  return state.getIn(['user', 'groups']);
};

exports.selectUserGroups = selectUserGroups;

var selectUserMessage = function selectUserMessage(state) {
  return state.getIn(['user', 'logonResult']);
};

exports.selectUserMessage = selectUserMessage;

var selectLoginScreenMode = function selectLoginScreenMode(state) {
  return state.getIn(['user', 'loginScreenMode']);
};

exports.selectLoginScreenMode = selectLoginScreenMode;

var selectPasswordMessage = function selectPasswordMessage(state) {
  return state.getIn(['user', 'passwordResetMessage']);
};

exports.selectPasswordMessage = selectPasswordMessage;

var selectChangePasswordMessage = function selectChangePasswordMessage(state) {
  return state.getIn(['user', 'changePasswordMessage']);
};

exports.selectChangePasswordMessage = selectChangePasswordMessage;

var selectCaptchaSiteKey = function selectCaptchaSiteKey(state) {
  return state.getIn(['user', 'recaptcha', 'key']);
};

exports.selectCaptchaSiteKey = selectCaptchaSiteKey;

var selectCaptchaData = function selectCaptchaData(state) {
  return state.getIn(['user', 'recaptcha', 'response']);
};

exports.selectCaptchaData = selectCaptchaData;

var selectCaptchaResponse = function selectCaptchaResponse(state) {
  return state.getIn(['user', 'recaptcha', 'response', 'isHuman']);
};

exports.selectCaptchaResponse = selectCaptchaResponse;

var selectCaptchaToken = function selectCaptchaToken(state) {
  return state.getIn(['user', 'recaptcha', 'response', 'token']);
};

exports.selectCaptchaToken = selectCaptchaToken;

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.types = __webpack_require__(8);
exports.actions = __webpack_require__(27);
exports.selectors = __webpack_require__(6);

var ReactApp = __webpack_require__(44)["default"];

var RouteLoader = __webpack_require__(39)["default"];

exports.ReactApp = ReactApp;
exports.RouteLoader = RouteLoader;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.action = action;
exports.flattenArray = flattenArray;
exports.api = api;
exports.dynamicSort = dynamicSort;
exports.randomString = exports.resizeImageUri = exports.resizeImage = exports.getWebPImageUri = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(5));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function action(type) {
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread({
    type: type
  }, payload);
}

var getWebPImageUri = function getWebPImageUri(uri) {
  var formatedUri = uri;

  if (uri.indexOf('.gif') == -1) {
    if (uri.indexOf('f=') == -1 && uri.indexOf('format=') == -1) {
      if (uri.indexOf('?') > -1) {
        formatedUri = "".concat(uri, "&f=webp");
      } else {
        formatedUri = "".concat(uri, "?f=webp");
      }
    }

    if (formatedUri.indexOf('q=') == -1 && formatedUri.indexOf('quality=') == -1) {
      if (formatedUri.indexOf('?') > -1) {
        formatedUri = "".concat(formatedUri, "&q=70");
      } else {
        formatedUri = "".concat(formatedUri, "?q=70");
      }
    }
  }

  return formatedUri;
};

exports.getWebPImageUri = getWebPImageUri;

var resizeImage = function resizeImage(image, height, width) {
  if (image.asset && image.asset.sys && image.asset.sys.uri) {
    image.asset.sys.uri = resizeImageUri(image.asset.sys.uri, height, width);
  }
};

exports.resizeImage = resizeImage;

var resizeImageUri = function resizeImageUri(uri, height, width) {
  var formatedUri = uri;
  var paramDelimeter = '?';

  if (uri.indexOf('?') > -1) {
    paramDelimeter = '&';
  }

  if (width) {
    if (formatedUri.indexOf('w=') == -1 && formatedUri.indexOf('width=') == -1) {
      formatedUri = "".concat(formatedUri).concat(paramDelimeter, "w=").concat(width);
      paramDelimeter = '&';
    }
  }

  if (height) {
    if (formatedUri.indexOf('h=') == -1 && formatedUri.indexOf('height=') == -1) {
      formatedUri = "".concat(formatedUri).concat(paramDelimeter, "h=").concat(height);
    }
  }

  return formatedUri;
};

exports.resizeImageUri = resizeImageUri;

function flattenArray(arr) {
  // flatten arrays inside the supplied array and
  // remove duplicates from the result
  return arr.reduce(function (acc, val) {
    return acc.concat(val);
  }, []).filter(function (elem, pos, arr) {
    return arr.indexOf(elem) == pos;
  });
}

function api(_x, _x2) {
  return _api.apply(this, arguments);
}

function _api() {
  _api = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(url, options) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", fetch(url, options).then(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(response) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        setTimeout(function () {
                          return null;
                        }, 0);

                        if (response.ok) {
                          _context.next = 3;
                          break;
                        }

                        throw new Error(response.statusText);

                      case 3:
                        return _context.abrupt("return", response.json().then(function (data) {
                          return data;
                        }));

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (error) {
              //console.log(error);
              throw error;
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _api.apply(this, arguments);
}

function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

var randomString = function randomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

exports.randomString = randomString;

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__17__;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryParams = queryParams;
exports.addHostname = exports.clientHostname = exports.buildUrl = exports.routeParams = void 0;

var _queryString = _interopRequireDefault(__webpack_require__(15));

function queryParams(search) {
  return _queryString["default"].parse(typeof window != 'undefined' ? window.location.search : search);
}

var routeParams = function routeParams(staticRoute) {
  return staticRoute && staticRoute.match ? staticRoute.match.params : {};
};

exports.routeParams = routeParams;

var buildUrl = function buildUrl(route, params) {
  var qs = _queryString["default"].stringify(params);

  var path = qs ? "".concat(route, "?").concat(qs) : route;
  return path;
};

exports.buildUrl = buildUrl;

var clientHostname = function clientHostname() {
  return "".concat(window.location.protocol, "//").concat(window.location.hostname, ":").concat(window.location.port);
};

exports.clientHostname = clientHostname;
var addHostname = typeof window == 'undefined' || window.location.host == 'localhost:3000' ? "https://".concat(PUBLIC_URI
/* global PUBLIC_URI */
) : clientHostname();
exports.addHostname = addHostname;

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toJS = void 0;

var _react = _interopRequireDefault(__webpack_require__(4));

var _immutable = __webpack_require__(2);

var toJS = function toJS(WrappedComponent) {
  return function (wrappedComponentProps) {
    var KEY = 0;
    var VALUE = 1;
    var propsJS = Object.entries(wrappedComponentProps).reduce(function (newProps, wrappedComponentProp) {
      newProps[wrappedComponentProp[KEY]] = _immutable.Iterable.isIterable(wrappedComponentProp[VALUE]) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
      return newProps;
    }, {});
    return _react["default"].createElement(WrappedComponent, propsJS);
  };
};

exports.toJS = toJS;

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__26__;

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRouteEntry = exports.setRoute = exports.setCurrentProject = exports.setNavigationPath = exports.setNotFound = void 0;

var _helpers = __webpack_require__(13);

var _routing = __webpack_require__(8);

var setNotFound = function setNotFound(notFound) {
  return (0, _helpers.action)(_routing.SET_NAVIGATION_NOT_FOUND, {
    notFound: notFound
  });
};

exports.setNotFound = setNotFound;

var setNavigationPath = function setNavigationPath(path, location, staticRoute, withEvents, statePath, routes) {
  return (0, _helpers.action)(_routing.SET_NAVIGATION_PATH, {
    path: path,
    location: location,
    staticRoute: staticRoute,
    withEvents: withEvents,
    statePath: statePath,
    routes: routes
  });
};

exports.setNavigationPath = setNavigationPath;

var setCurrentProject = function setCurrentProject(project, allowedGroups) {
  return (0, _helpers.action)(_routing.SET_TARGET_PROJECT, {
    project: project,
    allowedGroups: allowedGroups
  });
};

exports.setCurrentProject = setCurrentProject;

var setRoute = function setRoute(path, state) {
  return (0, _helpers.action)(_routing.SET_ROUTE, {
    path: path,
    state: state
  });
};

exports.setRoute = setRoute;

var setRouteEntry = function setRouteEntry(entry) {
  return (0, _helpers.action)(_routing.SET_ENTRY, {
    entry: entry
  });
};

exports.setRouteEntry = setRouteEntry;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__30__;

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__33__;

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _interopRequireDefault = __webpack_require__(0);

var _interopRequireWildcard = __webpack_require__(7);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__(4));

var _propTypes = _interopRequireDefault(__webpack_require__(33));

var _reactRedux = __webpack_require__(17);

var _reactHotLoader = __webpack_require__(30);

var _reactRouterDom = __webpack_require__(26);

var _reactRouterConfig = __webpack_require__(46);

var _routing = __webpack_require__(6);

var _routing2 = __webpack_require__(27);

var _NotFound = _interopRequireDefault(__webpack_require__(47));

var _Status = __webpack_require__(48);

var _ToJs = __webpack_require__(25);

var _selectors = __webpack_require__(10);

var getTrimmedPath = function getTrimmedPath(path) {
  if (path !== '/') {
    var lastChar = path[path.length - 1];

    if (lastChar == '/') {
      return path.substring(0, path.length - 1);
    }
  }

  return path;
};

var RouteLoader = function RouteLoader(_ref) {
  var statePath = _ref.statePath,
      projectId = _ref.projectId,
      contentTypeId = _ref.contentTypeId,
      entry = _ref.entry,
      isLoggedIn = _ref.isLoggedIn,
      isNotFound = _ref.isNotFound,
      notFoundComponent = _ref.notFoundComponent,
      setNavigationPath = _ref.setNavigationPath,
      routes = _ref.routes,
      withEvents = _ref.withEvents;
  var location = (0, _reactRouterDom.useLocation)(); // Match any Static Routes a developer has defined

  var matchedStaticRoute = function matchedStaticRoute() {
    return (0, _reactRouterConfig.matchRoutes)(routes.StaticRoutes, location.pathname);
  };

  var isStaticRoute = function isStaticRoute() {
    return matchedStaticRoute().length > 0;
  };

  var trimmedPath = getTrimmedPath(location.pathname);
  var staticRoute = isStaticRoute() && matchedStaticRoute()[0];
  var setPath = (0, _react.useCallback)(function () {
    var serverPath = null;

    if (staticRoute && staticRoute.match && staticRoute.match.isExact) {
      serverPath = staticRoute.route.path.split('/').filter(function (p) {
        return !p.startsWith(':');
      }).join('/');
    }

    setNavigationPath(serverPath || trimmedPath, location, staticRoute, withEvents, statePath, routes); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNavigationPath, // staticRoute,
  withEvents, location, routes, // statePath,
  trimmedPath]);
  if (typeof window == 'undefined') setPath();
  (0, _react.useEffect)(function () {
    setPath();
  }, [location, setPath]); // Need to redirect when url endswith a /

  if (location.pathname.length > trimmedPath.length) {
    return _react["default"].createElement(_reactRouterDom.Redirect, {
      to: trimmedPath
    });
  } // Render any Static Routes a developer has defined


  if (isStaticRoute(trimmedPath)) {
    return (0, _reactRouterConfig.renderRoutes)(routes.StaticRoutes, {
      projectId: projectId,
      contentTypeId: contentTypeId,
      entry: entry,
      isLoggedIn: isLoggedIn
    });
  } // Match any Defined Content Type Mappings


  if (contentTypeId) {
    var MatchedComponent = routes.ContentTypeMappings.find(function (item) {
      return item.contentTypeID == contentTypeId;
    });

    if (MatchedComponent) {
      return _react["default"].createElement(MatchedComponent.component, {
        projectId: projectId,
        contentTypeId: contentTypeId,
        entry: entry,
        isLoggedIn: isLoggedIn
      });
    }
  }

  var NotFoundComponent = notFoundComponent ? notFoundComponent : _NotFound["default"];

  if (isNotFound) {
    return _react["default"].createElement(_Status.Status, {
      code: 404
    }, _react["default"].createElement(NotFoundComponent, null));
  }

  return null;
};

RouteLoader.propTypes = {
  routes: _propTypes["default"].objectOf(_propTypes["default"].array, _propTypes["default"].array),
  withEvents: _propTypes["default"].object,
  statePath: _propTypes["default"].string,
  projectId: _propTypes["default"].string,
  contentTypeId: _propTypes["default"].string,
  loading: _propTypes["default"].object,
  entry: _propTypes["default"].object,
  isLoggedIn: _propTypes["default"].bool,
  isNotFound: _propTypes["default"].bool,
  notFoundComponent: _propTypes["default"].func,
  setNavigationPath: _propTypes["default"].func
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    statePath: (0, _routing.selectCurrentPath)(state),
    projectId: (0, _routing.selectCurrentProject)(state),
    entry: (0, _routing.selectRouteEntry)(state),
    contentTypeId: (0, _routing.selectRouteEntryContentTypeId)(state),
    isNotFound: (0, _routing.selectIsNotFound)(state),
    isLoggedIn: (0, _selectors.selectUserLoggedIn)(state),
    isLoading: (0, _routing.selectRouteLoading)(state)
  };
};

var mapDispatchToProps = {
  setNavigationPath: _routing2.setNavigationPath
};

var _default = (0, _reactHotLoader.hot)(module)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _ToJs.toJS)(RouteLoader)));

exports["default"] = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(45)(module)))

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(4));

var _reactHotLoader = __webpack_require__(30);

var _RouteLoader = _interopRequireDefault(__webpack_require__(39));

var AppRoot = function AppRoot(props) {
  return _react["default"].createElement(_RouteLoader["default"], props);
};

var _default = AppRoot;
exports["default"] = _default;

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__46__;

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(4));

var NotFound = function NotFound() {
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("header", null, _react["default"].createElement("h1", null, "404 Page Not Found")));
};

var _default = NotFound;
exports["default"] = _default;

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Status = void 0;

var _react = _interopRequireDefault(__webpack_require__(4));

var _propTypes = _interopRequireDefault(__webpack_require__(33));

var _reactRouterDom = __webpack_require__(26);

var Status = function Status(_ref) {
  var code = _ref.code,
      children = _ref.children;
  return _react["default"].createElement(_reactRouterDom.Route, {
    render: function render(_ref2) {
      var staticContext = _ref2.staticContext;
      if (staticContext) staticContext.status = code;
      return children;
    }
  });
};

exports.Status = Status;
Status.propTypes = {
  code: _propTypes["default"].number.isRequired,
  children: _propTypes["default"].element
};

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRouteLoading = exports.selectBreadcrumb = exports.selectCurrentNode = exports.selectCurrentAncestors = exports.selectIsNotFound = exports.selectCurrentProject = exports.selectQueryStringAsObject = exports.selectCurrentSearch = exports.selectCurrentPath = exports.selectRouteEntryID = exports.selectRouteEntrySlug = exports.selectRouteEntryContentTypeId = exports.selectRouteEntryEntryId = exports.selectEntryDepends = exports.selectCurrentTreeID = exports.selectNodeDepends = exports.selectRouteEntry = void 0;

var _immutable = __webpack_require__(2);

var _navigation = __webpack_require__(21);

var selectRouteEntry = function selectRouteEntry(state) {
  return state.getIn(['routing', 'entry'], (0, _immutable.Map)({}));
};

exports.selectRouteEntry = selectRouteEntry;

var selectNodeDepends = function selectNodeDepends(state) {
  return state.getIn(['routing', 'nodeDepends'], new _immutable.List([]));
};

exports.selectNodeDepends = selectNodeDepends;

var selectCurrentTreeID = function selectCurrentTreeID(state) {
  return state.getIn(['routing', 'currentTreeId']);
};

exports.selectCurrentTreeID = selectCurrentTreeID;

var selectEntryDepends = function selectEntryDepends(state) {
  return state.getIn(['routing', 'entryDepends']);
};

exports.selectEntryDepends = selectEntryDepends;

var selectRouteEntryEntryId = function selectRouteEntryEntryId(state) {
  return state.getIn(['routing', 'entry', 'sys', 'id'], null);
};

exports.selectRouteEntryEntryId = selectRouteEntryEntryId;

var selectRouteEntryContentTypeId = function selectRouteEntryContentTypeId(state) {
  var entry = selectRouteEntry(state);
  return entry && entry.getIn(['sys', 'contentTypeId'], null);
};

exports.selectRouteEntryContentTypeId = selectRouteEntryContentTypeId;

var selectRouteEntrySlug = function selectRouteEntrySlug(state) {
  return state.getIn(['routing', 'entry', 'sys', 'slug'], null);
};

exports.selectRouteEntrySlug = selectRouteEntrySlug;

var selectRouteEntryID = function selectRouteEntryID(state) {
  return state.getIn(['routing', 'entryID']);
};

exports.selectRouteEntryID = selectRouteEntryID;

var selectCurrentPath = function selectCurrentPath(state) {
  return state.getIn(['routing', 'currentPath']);
};

exports.selectCurrentPath = selectCurrentPath;

var selectCurrentSearch = function selectCurrentSearch(state) {
  return state.getIn(['routing', 'location', 'search']);
};

exports.selectCurrentSearch = selectCurrentSearch;

var selectQueryStringAsObject = function selectQueryStringAsObject(state) {
  return (0, _navigation.queryParams)(selectCurrentSearch(state));
};

exports.selectQueryStringAsObject = selectQueryStringAsObject;

var selectCurrentProject = function selectCurrentProject(state) {
  return state.getIn(['routing', 'currentProject']);
};

exports.selectCurrentProject = selectCurrentProject;

var selectIsNotFound = function selectIsNotFound(state) {
  return state.getIn(['routing', 'notFound']);
};

exports.selectIsNotFound = selectIsNotFound;

var selectCurrentAncestors = function selectCurrentAncestors(state) {
  return state.getIn(['routing', 'currentNodeAncestors'], new _immutable.List());
};

exports.selectCurrentAncestors = selectCurrentAncestors;

var selectCurrentNode = function selectCurrentNode(state) {
  return state.getIn(['routing', 'currentNode']);
};

exports.selectCurrentNode = selectCurrentNode;

var selectBreadcrumb = function selectBreadcrumb(state) {
  return (selectCurrentAncestors(state) || new _immutable.List()).push(selectCurrentNode(state));
};

exports.selectBreadcrumb = selectBreadcrumb;

var selectRouteLoading = function selectRouteLoading(state) {
  return state.getIn(['routing', 'isLoading']);
};

exports.selectRouteLoading = selectRouteLoading;

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CALL_HISTORY_METHOD = exports.SET_ROUTE = exports.SET_TARGET_PROJECT = exports.SET_NAVIGATION_PATH = exports.SET_NAVIGATION_NOT_FOUND = exports.SET_ENTRY_RELATED_ARTICLES = exports.SET_ENTRY_ID = exports.SET_SIBLINGS = exports.SET_ANCESTORS = exports.SET_NODE = exports.SET_ENTRY = exports.GET_ENTRY = void 0;
var ROUTING_PREFIX = '@ROUTING/';
var GET_ENTRY = "".concat(ROUTING_PREFIX, "_GET_ENTRY");
exports.GET_ENTRY = GET_ENTRY;
var SET_ENTRY = "".concat(ROUTING_PREFIX, "_SET_ENTRY");
exports.SET_ENTRY = SET_ENTRY;
var SET_NODE = "".concat(ROUTING_PREFIX, "_SET_NODE");
exports.SET_NODE = SET_NODE;
var SET_ANCESTORS = "".concat(ROUTING_PREFIX, "_SET_ANCESTORS");
exports.SET_ANCESTORS = SET_ANCESTORS;
var SET_SIBLINGS = "".concat(ROUTING_PREFIX, "_SET_SIBLINGS");
exports.SET_SIBLINGS = SET_SIBLINGS;
var SET_ENTRY_ID = "".concat(ROUTING_PREFIX, "_SET_ENTRY_ID");
exports.SET_ENTRY_ID = SET_ENTRY_ID;
var SET_ENTRY_RELATED_ARTICLES = "".concat(ROUTING_PREFIX, "_SET_ENTRY_RELATED_ARTICLES");
exports.SET_ENTRY_RELATED_ARTICLES = SET_ENTRY_RELATED_ARTICLES;
var SET_NAVIGATION_NOT_FOUND = "".concat(ROUTING_PREFIX, "_SET_NOT_FOUND");
exports.SET_NAVIGATION_NOT_FOUND = SET_NAVIGATION_NOT_FOUND;
var SET_NAVIGATION_PATH = "".concat(ROUTING_PREFIX, "_SET_NAVIGATION_PATH");
exports.SET_NAVIGATION_PATH = SET_NAVIGATION_PATH;
var SET_TARGET_PROJECT = "".concat(ROUTING_PREFIX, "_SET_TARGET_PROJECT");
exports.SET_TARGET_PROJECT = SET_TARGET_PROJECT;
var SET_ROUTE = "".concat(ROUTING_PREFIX, "_SET_ROUTE");
exports.SET_ROUTE = SET_ROUTE;
var CALL_HISTORY_METHOD = "".concat(ROUTING_PREFIX, "_CALL_HISTORY_METHOD");
exports.CALL_HISTORY_METHOD = CALL_HISTORY_METHOD;

/***/ })

/******/ });
});
//# sourceMappingURL=routing.js.map