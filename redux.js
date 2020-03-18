(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@babel/runtime/helpers/interopRequireDefault"), require("@babel/runtime/regenerator"), require("immutable"), require("react"), require("@babel/runtime/helpers/defineProperty"), require("@babel/runtime/helpers/interopRequireWildcard"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("query-string"), require("react-redux"), require("@redux-saga/core/effects"), require("js-cookie"), require("@babel/runtime/helpers/slicedToArray"));
	else if(typeof define === 'function' && define.amd)
		define(["@babel/runtime/helpers/interopRequireDefault", "@babel/runtime/regenerator", "immutable", "react", "@babel/runtime/helpers/defineProperty", "@babel/runtime/helpers/interopRequireWildcard", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "query-string", "react-redux", "@redux-saga/core/effects", "js-cookie", "@babel/runtime/helpers/slicedToArray"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@babel/runtime/helpers/interopRequireDefault"), require("@babel/runtime/regenerator"), require("immutable"), require("react"), require("@babel/runtime/helpers/defineProperty"), require("@babel/runtime/helpers/interopRequireWildcard"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("query-string"), require("react-redux"), require("@redux-saga/core/effects"), require("js-cookie"), require("@babel/runtime/helpers/slicedToArray")) : factory(root["@babel/runtime/helpers/interopRequireDefault"], root["@babel/runtime/regenerator"], root["immutable"], root["react"], root["@babel/runtime/helpers/defineProperty"], root["@babel/runtime/helpers/interopRequireWildcard"], root["@babel/runtime/helpers/asyncToGenerator"], root["@babel/runtime/helpers/classCallCheck"], root["@babel/runtime/helpers/createClass"], root["query-string"], root["react-redux"], root["@redux-saga/core/effects"], root["js-cookie"], root["@babel/runtime/helpers/slicedToArray"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__15__, __WEBPACK_EXTERNAL_MODULE__17__, __WEBPACK_EXTERNAL_MODULE__23__, __WEBPACK_EXTERNAL_MODULE__35__, __WEBPACK_EXTERNAL_MODULE__72__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 98);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRouteLoading = exports.selectCurrentAncestors = exports.selectIsNotFound = exports.selectCurrentProject = exports.selectQueryStringAsObject = exports.selectCurrentSearch = exports.selectCurrentPath = exports.selectRouteEntryID = exports.selectRouteEntrySlug = exports.selectRouteEntryContentTypeId = exports.selectRouteEntryEntryId = exports.selectEntryDepends = exports.selectCurrentTreeID = exports.selectNodeDepends = exports.selectRouteEntry = void 0;

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
  return state.getIn(['routing', 'currentNodeAncestors']);
};

exports.selectCurrentAncestors = selectCurrentAncestors;

var selectRouteLoading = function selectRouteLoading(state) {
  return state.getIn(['routing', 'routeLoading']);
};

exports.selectRouteLoading = selectRouteLoading;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CALL_HISTORY_METHOD = exports.SET_ROUTE = exports.SET_TARGET_PROJECT = exports.SET_ROUTE_LOADING = exports.SET_NAVIGATION_PATH = exports.SET_NAVIGATION_NOT_FOUND = exports.SET_ENTRY_RELATED_ARTICLES = exports.SET_ENTRY_ID = exports.SET_SIBLINGS = exports.SET_ANCESTORS = exports.SET_NODE = exports.SET_ENTRY = exports.GET_ENTRY = void 0;
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
var SET_ROUTE_LOADING = "".concat(ROUTING_PREFIX, "_SET_ROUTE_LOADING");
exports.SET_ROUTE_LOADING = SET_ROUTE_LOADING;
var SET_TARGET_PROJECT = "".concat(ROUTING_PREFIX, "_SET_TARGET_PROJECT");
exports.SET_TARGET_PROJECT = SET_TARGET_PROJECT;
var SET_ROUTE = "".concat(ROUTING_PREFIX, "_SET_ROUTE");
exports.SET_ROUTE = SET_ROUTE;
var CALL_HISTORY_METHOD = "".concat(ROUTING_PREFIX, "_CALL_HISTORY_METHOD");
exports.CALL_HISTORY_METHOD = CALL_HISTORY_METHOD;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_RECAPTCHA_RESPONSE = exports.SET_RECAPTCHA_KEY = exports.CHANGE_USER_PASSWORD_COMPLETE = exports.CHANGE_USER_PASSWORD_FAILED = exports.CHANGE_USER_PASSWORD = exports.FORGOT_USER_PASSWORD_COMPLETE = exports.FORGOT_USER_PASSWORD = exports.VALIDATE_USER_FAILED = exports.VALIDATE_USER_SUCCESS = exports.VALIDATE_USER = exports.CREATE_USER_ACCOUNT = exports.TOGGLE_LOGIN_MODE = exports.LOGOUT_USER = exports.LOGIN_FAILED = exports.LOGIN_SUCCESSFUL = exports.LOGIN_USER = exports.UPDATE_USER = void 0;
var ACTION_PREFIX = '@USER/';
var UPDATE_USER = "".concat(ACTION_PREFIX, "UPDATE_USER");
exports.UPDATE_USER = UPDATE_USER;
var LOGIN_USER = "".concat(ACTION_PREFIX, "LOGIN_USER");
exports.LOGIN_USER = LOGIN_USER;
var LOGIN_SUCCESSFUL = "".concat(ACTION_PREFIX, "LOGIN_SUCCESSFUL");
exports.LOGIN_SUCCESSFUL = LOGIN_SUCCESSFUL;
var LOGIN_FAILED = "".concat(ACTION_PREFIX, "LOGIN_FAILED");
exports.LOGIN_FAILED = LOGIN_FAILED;
var LOGOUT_USER = "".concat(ACTION_PREFIX, "LOGOUT_USER");
exports.LOGOUT_USER = LOGOUT_USER;
var TOGGLE_LOGIN_MODE = "".concat(ACTION_PREFIX, "TOGGLE_LOGIN_MODE");
exports.TOGGLE_LOGIN_MODE = TOGGLE_LOGIN_MODE;
var CREATE_USER_ACCOUNT = "".concat(ACTION_PREFIX, "CREATE_USER_ACCOUNT");
exports.CREATE_USER_ACCOUNT = CREATE_USER_ACCOUNT;
var VALIDATE_USER = "".concat(ACTION_PREFIX, "VALIDATE_USER");
exports.VALIDATE_USER = VALIDATE_USER;
var VALIDATE_USER_SUCCESS = "".concat(ACTION_PREFIX, "VALIDATE_USER_SUCCESS");
exports.VALIDATE_USER_SUCCESS = VALIDATE_USER_SUCCESS;
var VALIDATE_USER_FAILED = "".concat(ACTION_PREFIX, "VALIDATE_USER_FAILED");
exports.VALIDATE_USER_FAILED = VALIDATE_USER_FAILED;
var FORGOT_USER_PASSWORD = "".concat(ACTION_PREFIX, "FORGOT_USER_PASSWORD");
exports.FORGOT_USER_PASSWORD = FORGOT_USER_PASSWORD;
var FORGOT_USER_PASSWORD_COMPLETE = "".concat(ACTION_PREFIX, "FORGOT_USER_PASSWORD_COMPLETE");
exports.FORGOT_USER_PASSWORD_COMPLETE = FORGOT_USER_PASSWORD_COMPLETE;
var CHANGE_USER_PASSWORD = "".concat(ACTION_PREFIX, "CHANGE_USER_PASSWORD");
exports.CHANGE_USER_PASSWORD = CHANGE_USER_PASSWORD;
var CHANGE_USER_PASSWORD_FAILED = "".concat(ACTION_PREFIX, "CHANGE_USER_PASSWORD_FAILED");
exports.CHANGE_USER_PASSWORD_FAILED = CHANGE_USER_PASSWORD_FAILED;
var CHANGE_USER_PASSWORD_COMPLETE = "".concat(ACTION_PREFIX, "CHANGE_USER_PASSWORD_COMPLETE");
exports.CHANGE_USER_PASSWORD_COMPLETE = CHANGE_USER_PASSWORD_COMPLETE;
var SET_RECAPTCHA_KEY = "".concat(ACTION_PREFIX, "SET_RECAPTCHA_KEY");
exports.SET_RECAPTCHA_KEY = SET_RECAPTCHA_KEY;
var SET_RECAPTCHA_RESPONSE = "".concat(ACTION_PREFIX, "SET_RECAPTCHA_RESPONSE");
exports.SET_RECAPTCHA_RESPONSE = SET_RECAPTCHA_RESPONSE;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCaptchaSiteKey = exports.selectCaptchaToken = exports.selectCaptchaData = exports.selectCaptchaResponse = exports.selectChangePasswordMessage = exports.selectPasswordMessage = exports.selectLoginScreenMode = exports.selectUserMessage = exports.selectUserGroups = exports.selectUserLoggedIn = exports.selectUsername = exports.selectUser = void 0;

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
  return state.getIn(['user', 'logonResultMessage']);
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

var selectCaptchaResponse = function selectCaptchaResponse(state) {
  return state.getIn(['user', 'settings', 'recaptcha', 'response', 'isHuman']);
};

exports.selectCaptchaResponse = selectCaptchaResponse;

var selectCaptchaData = function selectCaptchaData(state) {
  return state.getIn(['user', 'settings', 'recaptcha', 'response']);
};

exports.selectCaptchaData = selectCaptchaData;

var selectCaptchaToken = function selectCaptchaToken(state) {
  return state.getIn(['user', 'settings', 'recaptcha', 'response', 'token']);
};

exports.selectCaptchaToken = selectCaptchaToken;

var selectCaptchaSiteKey = function selectCaptchaSiteKey(state) {
  return state.getIn(['user', 'recaptchaKey']);
};

exports.selectCaptchaSiteKey = selectCaptchaSiteKey;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ }),
/* 13 */
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

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(8));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.initialUserState = void 0;

var _immutable = __webpack_require__(2);

var _types = __webpack_require__(9);

var initialUserState = (0, _immutable.Map)({
  loggedIn: false,
  failedLogin: null,
  username: null,
  id: null,
  securityToken: null,
  logonResult: null,
  registrationResult: null,
  groups: new _immutable.List([]),
  emailAddress: null,
  fullName: null,
  loginScreenMode: 'login',
  passwordReset: false,
  passwordResetMessage: null,
  changePasswordMessage: null,
  recaptchaKey: null,
  settings: (0, _immutable.fromJS)({
    recaptcha: {
      response: {
        isHuman: false,
        token: null
      }
    }
  })
});
exports.initialUserState = initialUserState;

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialUserState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.UPDATE_USER:
      {
        var user = action.user;
        return state.set('loggedIn', user.loggedIn != 'undefined' ? user.loggedIn : state.get('loggedIn')).set('failedLogin', user.failedLogin != 'undefined' ? user.failedLogin : state.get('failedLogin')).set('username', user.username || state.get('username')).set('id', user.id || state.get('id')).set('securityToken', user.securityToken || state.get('securityToken')).set('logonResult', user.logonResult || state.get('logonResult')).set('registrationResult', user.registrationResult || state.get('registrationResult')).set('groups', (0, _immutable.fromJS)(user.groups) || state.get('groups')).set('emailAddress', user.emailAddress || state.get('emailAddress')).set('fullName', user.fullName || state.get('fullName'));
      }

    case _types.TOGGLE_LOGIN_MODE:
      {
        var newMode = action.loginMode;
        return state.set('loginScreenMode', newMode);
      }

    case _types.SET_RECAPTCHA_KEY:
      {
        return state.set('recaptchaKey', action.key);
      }

    case _types.SET_RECAPTCHA_RESPONSE:
      {
        var settings = {
          recaptcha: {
            response: {
              isHuman: action.isHuman,
              token: action.token
            }
          }
        };
        return state.set('settings', (0, _immutable.fromJS)(settings));
      }

    default:
      return state;
  }
};

exports["default"] = _default;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _interopRequireWildcard = __webpack_require__(7);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "reducer", {
  enumerable: true,
  get: function get() {
    return _reducers["default"];
  }
});
Object.defineProperty(exports, "sagas", {
  enumerable: true,
  get: function get() {
    return _sagas.userSagas;
  }
});
Object.defineProperty(exports, "withLogin", {
  enumerable: true,
  get: function get() {
    return _withLogin["default"];
  }
});
exports.types = exports.selectors = exports.actions = void 0;

var actions = _interopRequireWildcard(__webpack_require__(22));

exports.actions = actions;

var selectors = _interopRequireWildcard(__webpack_require__(10));

exports.selectors = selectors;

var types = _interopRequireWildcard(__webpack_require__(9));

exports.types = types;

var _reducers = _interopRequireDefault(__webpack_require__(14));

var _sagas = __webpack_require__(29);

var _withLogin = _interopRequireDefault(__webpack_require__(36));

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__17__;

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),
/* 20 */,
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRecaptchaResponse = exports.setRecaptchaKey = exports.changePasswordWithToken = exports.changePassword = exports.forgotPassword = exports.createUserAccount = exports.toggleLoginMode = exports.logoutUser = exports.validateUser = exports.loginUser = void 0;

var _helpers = __webpack_require__(13);

var _types = __webpack_require__(9);

var loginUser = function loginUser(username, password) {
  return (0, _helpers.action)(_types.LOGIN_USER, {
    username: username,
    password: password
  });
};

exports.loginUser = loginUser;

var validateUser = function validateUser(cookies) {
  return (0, _helpers.action)(_types.VALIDATE_USER, {
    cookies: cookies
  });
};

exports.validateUser = validateUser;

var logoutUser = function logoutUser() {
  return (0, _helpers.action)(_types.LOGOUT_USER);
};

exports.logoutUser = logoutUser;

var toggleLoginMode = function toggleLoginMode(loginMode) {
  return (0, _helpers.action)(_types.TOGGLE_LOGIN_MODE, {
    loginMode: loginMode
  });
};

exports.toggleLoginMode = toggleLoginMode;

var createUserAccount = function createUserAccount() {
  return (0, _helpers.action)(_types.CREATE_USER_ACCOUNT);
};

exports.createUserAccount = createUserAccount;

var forgotPassword = function forgotPassword(username) {
  return (0, _helpers.action)(_types.FORGOT_USER_PASSWORD, {
    username: username
  });
};

exports.forgotPassword = forgotPassword;

var changePassword = function changePassword(oldPassword, newPassword, newPasswordConfirm) {
  return (0, _helpers.action)(_types.CHANGE_USER_PASSWORD, {
    oldPassword: oldPassword,
    newPassword: newPassword,
    newPasswordConfirm: newPasswordConfirm
  });
};

exports.changePassword = changePassword;

var changePasswordWithToken = function changePasswordWithToken(token, newPassword, newPasswordConfirm) {
  return (0, _helpers.action)(_types.CHANGE_USER_PASSWORD, {
    token: token,
    newPassword: newPassword,
    newPasswordConfirm: newPasswordConfirm
  });
};

exports.changePasswordWithToken = changePasswordWithToken;

var setRecaptchaKey = function setRecaptchaKey(key) {
  return (0, _helpers.action)(_types.SET_RECAPTCHA_KEY, {
    key: key
  });
};

exports.setRecaptchaKey = setRecaptchaKey;

var setRecaptchaResponse = function setRecaptchaResponse(isHuman, token) {
  return (0, _helpers.action)(_types.SET_RECAPTCHA_RESPONSE, {
    isHuman: isHuman,
    token: token
  });
};

exports.setRecaptchaResponse = setRecaptchaResponse;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__23__;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecurityApi = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(8));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(11));

var _createClass2 = _interopRequireDefault(__webpack_require__(12));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CMS_URL = SERVERS.cms;
/* global SERVERS */

var config = {
  REGISTER_USER_URI: 'Security/RegisterUser',
  LOGON_USER_URI: 'REST/Contensis/Security/AuthenticateApplication',
  VALIDATE_USER_URI: 'REST/Contensis/Security/IsAuthenticated',
  USER_INFO_URI: 'REST/Contensis/Security/GetUserInfo'
};
var REGISTER_USER_URL = "".concat(CMS_URL, "/").concat(config.REGISTER_USER_URI);
var LOGON_USER_URL = "".concat(CMS_URL, "/").concat(config.LOGON_USER_URI);
var VALIDATE_USER_URL = "".concat(CMS_URL, "/").concat(config.VALIDATE_USER_URI);
var USER_INFO_URL = "".concat(CMS_URL, "/").concat(config.USER_INFO_URI);
var BASE_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

var SecurityApi =
/*#__PURE__*/
function () {
  function SecurityApi() {
    (0, _classCallCheck2["default"])(this, SecurityApi);
  }

  (0, _createClass2["default"])(SecurityApi, null, [{
    key: "RegisterUser",
    value: function () {
      var _RegisterUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(email, password) {
        var body, options;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                body = {
                  email: email,
                  password: password
                };
                options = _objectSpread({}, BASE_OPTIONS, {
                  method: 'POST',
                  body: JSON.stringify(body)
                });
                _context.next = 4;
                return SecurityApi.get(REGISTER_USER_URL, options);

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function RegisterUser(_x, _x2) {
        return _RegisterUser.apply(this, arguments);
      }

      return RegisterUser;
    }()
  }, {
    key: "LogonUser",
    value: function () {
      var _LogonUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(username, password) {
        var body, options;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                body = {
                  username: username,
                  password: password,
                  ip: '127.0.0.1',
                  applicationName: 'DesktopTool'
                };
                options = _objectSpread({}, BASE_OPTIONS, {
                  method: 'POST',
                  body: JSON.stringify(body)
                });
                _context2.next = 4;
                return SecurityApi.get(LOGON_USER_URL, options);

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function LogonUser(_x3, _x4) {
        return _LogonUser.apply(this, arguments);
      }

      return LogonUser;
    }()
  }, {
    key: "ValidateUser",
    value: function () {
      var _ValidateUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(securityToken) {
        var url, bodyToken, options;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = "".concat(VALIDATE_USER_URL, "?token=").concat(encodeURIComponent(securityToken));
                bodyToken = encodeURIComponent(decodeURIComponent(decodeURIComponent(securityToken)));
                options = _objectSpread({}, BASE_OPTIONS, {
                  method: 'POST',
                  body: JSON.stringify({
                    securityToken: bodyToken
                  })
                });
                _context3.next = 5;
                return SecurityApi.get(url, options);

              case 5:
                return _context3.abrupt("return", _context3.sent);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function ValidateUser(_x5) {
        return _ValidateUser.apply(this, arguments);
      }

      return ValidateUser;
    }()
  }, {
    key: "GetUserInfo",
    value: function () {
      var _GetUserInfo = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(securityToken) {
        var _headers;

        var options;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _objectSpread({}, BASE_OPTIONS, {
                  headers: (_headers = {}, (0, _defineProperty2["default"])(_headers, 'Content-Type', 'text/plain'), (0, _defineProperty2["default"])(_headers, "ContensisCMSUserName", securityToken), _headers)
                });
                _context4.next = 3;
                return SecurityApi.get(USER_INFO_URL, options);

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function GetUserInfo(_x6) {
        return _GetUserInfo.apply(this, arguments);
      }

      return GetUserInfo;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(url) {
        var options,
            responseBody,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : BASE_OPTIONS;
                _context5.prev = 1;
                _context5.next = 4;
                return api(url, options);

              case 4:
                responseBody = _context5.sent;

                if (!responseBody) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", responseBody);

              case 7:
                return _context5.abrupt("return", false);

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](1);
                return _context5.abrupt("return", false);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 10]]);
      }));

      function get(_x7) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }]);
  return SecurityApi;
}();

exports.SecurityApi = SecurityApi;

function api(_x8, _x9) {
  return _api.apply(this, arguments);
}

function _api() {
  _api = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(url, options) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", fetch(url, options).then(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee6(response) {
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        setTimeout(function () {
                          return null;
                        }, 0);

                        if (response.ok) {
                          _context6.next = 3;
                          break;
                        }

                        throw new Error(response.statusText);

                      case 3:
                        return _context6.abrupt("return", response.json().then(function (data) {
                          return data;
                        }));

                      case 4:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x10) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (error) {
              //console.log(error);
              throw error;
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _api.apply(this, arguments);
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toJS = void 0;

var _react = _interopRequireDefault(__webpack_require__(3));

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
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRouteEntry = exports.setRoute = exports.setCurrentProject = exports.setNavigationPath = exports.setNotFound = void 0;

var _helpers = __webpack_require__(13);

var _routing = __webpack_require__(6);

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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET_NODE_TREE_ERROR = exports.SET_NODE_TREE = exports.GET_NODE_TREE = void 0;
var ACTION_PREFIX = '@NAVIGATION/';
var GET_NODE_TREE = "".concat(ACTION_PREFIX, "_GET_NODE_TREE");
exports.GET_NODE_TREE = GET_NODE_TREE;
var SET_NODE_TREE = "".concat(ACTION_PREFIX, "_SET_NODE_TREE");
exports.SET_NODE_TREE = SET_NODE_TREE;
var GET_NODE_TREE_ERROR = "".concat(ACTION_PREFIX, "_GET_NODE_TREE_ERROR");
exports.GET_NODE_TREE_ERROR = GET_NODE_TREE_ERROR;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserSaga = validateUserSaga;
exports.userSagas = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _effects = __webpack_require__(19);

var _queryString = _interopRequireDefault(__webpack_require__(15));

var _types = __webpack_require__(9);

var _reducers = __webpack_require__(14);

var _routing = __webpack_require__(6);

var _routing2 = __webpack_require__(5);

var _selectors = __webpack_require__(10);

var _LoginHelper = __webpack_require__(32);

var _SecurityApi = __webpack_require__(24);

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(createUserAccountSaga),
    _marked2 =
/*#__PURE__*/
_regenerator["default"].mark(loginUserSaga),
    _marked3 =
/*#__PURE__*/
_regenerator["default"].mark(logoutUserSaga),
    _marked4 =
/*#__PURE__*/
_regenerator["default"].mark(validateUserSaga),
    _marked5 =
/*#__PURE__*/
_regenerator["default"].mark(updateUserSaga);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var userSagas = [(0, _effects.takeEvery)(_types.LOGIN_USER, loginUserSaga), (0, _effects.takeEvery)(_types.LOGOUT_USER, logoutUserSaga), (0, _effects.takeEvery)(_types.VALIDATE_USER, validateUserSaga), (0, _effects.takeEvery)(_types.CREATE_USER_ACCOUNT, createUserAccountSaga)];
exports.userSagas = userSagas;

function createUserAccountSaga() {
  var userState, registerResponse, securityToken, registrationResult, id, user, _user;

  return _regenerator["default"].wrap(function createUserAccountSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)(_selectors.selectUser);

        case 2:
          userState = _context.sent;

          if (!(userState.username && userState.password)) {
            _context.next = 22;
            break;
          }

          _context.next = 6;
          return _SecurityApi.SecurityApi.RegisterUser(userState.username, userState.password);

        case 6:
          registerResponse = _context.sent;

          if (!registerResponse) {
            _context.next = 20;
            break;
          }

          securityToken = registerResponse.securityToken, registrationResult = registerResponse.registrationResult, id = registerResponse.id;

          if (!securityToken) {
            _context.next = 15;
            break;
          }

          user = _objectSpread({}, userState, {
            id: id,
            securityToken: securityToken,
            password: null,
            loggedIn: true,
            verifiedEmail: false,
            failedLogin: false,
            failedToCreateAccount: false,
            registrationResult: registrationResult
          });
          _context.next = 13;
          return (0, _effects.put)({
            type: _types.UPDATE_USER,
            user: user
          });

        case 13:
          _context.next = 18;
          break;

        case 15:
          _user = _objectSpread({}, userState, {
            securityToken: null,
            loggedIn: false,
            verifiedEmail: false,
            failedLogin: true,
            failedToCreateAccount: true,
            registrationResult: registrationResult
          });
          _context.next = 18;
          return (0, _effects.put)({
            type: _types.UPDATE_USER,
            user: _user
          });

        case 18:
          _context.next = 22;
          break;

        case 20:
          _context.next = 22;
          return (0, _effects.put)({
            type: _types.UPDATE_USER,
            user: _objectSpread({}, userState, {
              registrationResult: 'ServiceFault'
            })
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function loginUserSaga(action) {
  var getGroups, username, password, user;
  return _regenerator["default"].wrap(function loginUserSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          getGroups = true;
          username = action.username, password = action.password;

          if (!(username && password)) {
            _context2.next = 10;
            break;
          }

          _context2.next = 5;
          return _LoginHelper.LoginHelper.LoginUser(username, password, getGroups);

        case 5:
          user = _context2.sent;
          _context2.next = 8;
          return (0, _effects.call)(updateUserSaga, {
            type: user.failedLogin ? _types.LOGIN_FAILED : _types.LOGIN_SUCCESSFUL,
            user: user,
            redirect: !user.failedLogin
          });

        case 8:
          _context2.next = 12;
          break;

        case 10:
          _context2.next = 12;
          return _LoginHelper.LoginHelper.ClientRedirectToLogin();

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

function logoutUserSaga() {
  var user, state;
  return _regenerator["default"].wrap(function logoutUserSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = _LoginHelper.LoginHelper.LogoutUser();
          _context3.next = 3;
          return (0, _effects.fork)(updateUserSaga, {
            user: user
          });

        case 3:
          _context3.next = 5;
          return (0, _effects.select)();

        case 5:
          state = _context3.sent;
          _context3.next = 8;
          return _LoginHelper.LoginHelper.ClientRedirectToHome(state.getIn(['router', 'location']));

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

function validateUserSaga(action) {
  var getGroups, state, currentQs, qsToken, cookies, user, type;
  return _regenerator["default"].wrap(function validateUserSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          getGroups = true;
          _context4.next = 3;
          return (0, _effects.select)();

        case 3:
          state = _context4.sent;
          currentQs = _queryString["default"].parse(state.getIn(['router', 'location', 'search']));
          qsToken = currentQs.securityToken || currentQs.securitytoken;

          if (qsToken) {
            _LoginHelper.LoginHelper.SetLoginCookies({
              securityToken: qsToken
            });
          }

          cookies = !qsToken ? action.cookies : _objectSpread({
            ContensisCMSUserName: encodeURIComponent(qsToken)
          }, action.cookies);
          _context4.next = 10;
          return _LoginHelper.LoginHelper.ValidateUser(getGroups, cookies);

        case 10:
          user = _context4.sent;
          type = user && user.loggedIn ? _types.VALIDATE_USER_SUCCESS : _types.VALIDATE_USER_FAILED;
          _context4.next = 14;
          return (0, _effects.call)(updateUserSaga, {
            type: type,
            user: user && !user.loggedIn ? _reducers.initialUserState : user
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

function updateUserSaga(action) {
  var userState, currentSearch, qs, redirectUri;
  return _regenerator["default"].wrap(function updateUserSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.select)(_selectors.selectUser);

        case 2:
          userState = _context5.sent;
          _context5.next = 5;
          return (0, _effects.put)({
            type: _types.UPDATE_USER,
            from: action.type,
            user: _objectSpread({}, userState.toJS(), {}, action.user)
          });

        case 5:
          if (!action.redirect) {
            _context5.next = 14;
            break;
          }

          _context5.next = 8;
          return (0, _effects.select)(_routing2.selectCurrentSearch);

        case 8:
          currentSearch = _context5.sent;
          qs = _queryString["default"].parse(currentSearch);
          redirectUri = qs.redirect_uri;

          if (!redirectUri) {
            _context5.next = 14;
            break;
          }

          _context5.next = 14;
          return (0, _effects.put)({
            type: _routing.SET_ROUTE,
            path: redirectUri
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}

/***/ }),
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_VERSION_STATUS = exports.SET_VERSION = void 0;
var VERSION_PREFIX = '@VERSION/';
var SET_VERSION = "".concat(VERSION_PREFIX, "SET_VERSION");
exports.SET_VERSION = SET_VERSION;
var SET_VERSION_STATUS = "".concat(VERSION_PREFIX, "SET_VERSION_STATUS");
exports.SET_VERSION_STATUS = SET_VERSION_STATUS;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginHelper = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(8));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(11));

var _createClass2 = _interopRequireDefault(__webpack_require__(12));

var _CookieHelper = __webpack_require__(34);

var _SecurityApi = __webpack_require__(24);

var _reducers = __webpack_require__(14);

// import { ajax } from 'jquery';
// import queryString from 'query-string';
// import { randomString } from '~/core/util/helpers';
// import userManager from './oidc/userManager';
var LOGIN_COOKIE = 'ContensisCMSUserName';
var LAST_USERNAME_COOKIE = 'ContensisLastUserName';
var DISPLAY_NAME_COOKIE = 'ContensisDisplayName';
var USER_LANGUAGE_COOKIE = 'User_LanguageID';
var AVATAR_COOKIE = 'ContensisAvatar'; // const contensis = CONTENSIS; /* global CONTENSIS */

var LoginHelper =
/*#__PURE__*/
function () {
  function LoginHelper() {
    (0, _classCallCheck2["default"])(this, LoginHelper);
  }

  (0, _createClass2["default"])(LoginHelper, null, [{
    key: "GetLoginCookie",
    value: function GetLoginCookie() {
      return _CookieHelper.CookieHelper.GetCookie(LOGIN_COOKIE);
    }
  }, {
    key: "SetLoginCookies",
    value: function SetLoginCookies(user) {
      if (user.securityToken) _CookieHelper.CookieHelper.SetCookie(LOGIN_COOKIE, user.securityToken);

      if (user.username) {
        _CookieHelper.CookieHelper.SetCookie(LAST_USERNAME_COOKIE, user.username);

        _CookieHelper.CookieHelper.SetCookie(DISPLAY_NAME_COOKIE, user.username);
      }
    }
  }, {
    key: "GetCachedCredentials",
    value: function GetCachedCredentials() {
      return {
        securityToken: _CookieHelper.CookieHelper.GetCookie(LOGIN_COOKIE),
        username: _CookieHelper.CookieHelper.GetCookie(LAST_USERNAME_COOKIE),
        displayName: _CookieHelper.CookieHelper.GetCookie(DISPLAY_NAME_COOKIE),
        languageId: _CookieHelper.CookieHelper.GetCookie(USER_LANGUAGE_COOKIE),
        avatar: _CookieHelper.CookieHelper.GetCookie(AVATAR_COOKIE)
      };
    }
  }, {
    key: "GetCachedCredentialsSSR",
    value: function GetCachedCredentialsSSR(cookies) {
      return {
        securityToken: cookies[LOGIN_COOKIE],
        username: cookies[LAST_USERNAME_COOKIE],
        displayName: cookies[DISPLAY_NAME_COOKIE],
        languageId: cookies[USER_LANGUAGE_COOKIE],
        avatar: cookies[AVATAR_COOKIE]
      };
    }
  }, {
    key: "ClearCachedCredentials",
    value: function ClearCachedCredentials() {
      _CookieHelper.CookieHelper.DeleteCookie(LOGIN_COOKIE);

      _CookieHelper.CookieHelper.DeleteCookie(LAST_USERNAME_COOKIE);

      _CookieHelper.CookieHelper.DeleteCookie(DISPLAY_NAME_COOKIE);

      _CookieHelper.CookieHelper.DeleteCookie(USER_LANGUAGE_COOKIE);

      _CookieHelper.CookieHelper.DeleteCookie(AVATAR_COOKIE);
    }
  }, {
    key: "ValidateUser",
    value: function () {
      var _ValidateUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var groups,
            cookies,
            cached,
            response,
            user,
            userWithGroups,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                groups = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
                cookies = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                cached = cookies ? this.GetCachedCredentialsSSR(cookies) : this.GetCachedCredentials();

                if (!cached.securityToken) {
                  _context.next = 21;
                  break;
                }

                _context.next = 6;
                return _SecurityApi.SecurityApi.ValidateUser(cached.securityToken);

              case 6:
                response = _context.sent;

                if (response) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", false);

              case 9:
                // Convert result to a User object
                user = {
                  username: cached.username,
                  securityToken: encodeURIComponent(response.SecurityToken),
                  logonResult: response.LogonResult,
                  id: response.UserID,
                  loginScreenMode: 'login'
                };

                if (!(user.logonResult !== 0)) {
                  _context.next = 14;
                  break;
                }

                // Clear the cookie cache so we don't need to validate again
                LoginHelper.ClearCachedCredentials();
                _context.next = 20;
                break;

              case 14:
                // Set logged in flag
                user.loggedIn = true;

                if (!groups) {
                  _context.next = 20;
                  break;
                }

                _context.next = 18;
                return this.GetGroups(user);

              case 18:
                userWithGroups = _context.sent;
                return _context.abrupt("return", userWithGroups);

              case 20:
                return _context.abrupt("return", user);

              case 21:
                return _context.abrupt("return", false);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function ValidateUser() {
        return _ValidateUser.apply(this, arguments);
      }

      return ValidateUser;
    }()
  }, {
    key: "LoginUser",
    value: function () {
      var _LoginUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(username, password) {
        var groups,
            loginResponse,
            SecurityToken,
            LogonResult,
            UserID,
            failedLogin,
            user,
            userWithGroups,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                groups = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : false;

                if (!(username && password)) {
                  _context2.next = 20;
                  break;
                }

                _context2.next = 4;
                return _SecurityApi.SecurityApi.LogonUser(username, password);

              case 4:
                loginResponse = _context2.sent;

                if (!loginResponse) {
                  _context2.next = 19;
                  break;
                }

                // Extract the elements we need from the response
                SecurityToken = loginResponse.SecurityToken, LogonResult = loginResponse.LogonResult, UserID = loginResponse.UserID;
                failedLogin = !!LogonResult; // 0 is successful
                // Map response to new user object

                user = {
                  username: username,
                  failedLogin: failedLogin,
                  loggedIn: !!SecurityToken && !failedLogin,
                  securityToken: SecurityToken,
                  id: UserID,
                  logonResult: this.CheckResult(LogonResult)
                };

                if (!(!user.failedLogin && !!user.securityToken)) {
                  _context2.next = 16;
                  break;
                }

                this.SetLoginCookies(user);

                if (!groups) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 14;
                return this.GetGroups(user);

              case 14:
                userWithGroups = _context2.sent;
                return _context2.abrupt("return", userWithGroups);

              case 16:
                return _context2.abrupt("return", user);

              case 19:
                return _context2.abrupt("return", {
                  securityToken: null,
                  loggedIn: false,
                  failedLogin: true,
                  logonResult: 'Service Fault'
                });

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function LoginUser(_x, _x2) {
        return _LoginUser.apply(this, arguments);
      }

      return LoginUser;
    }()
  }, {
    key: "GetGroups",
    value: function () {
      var _GetGroups = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(user) {
        var userInfoResponse, response;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (user.securityToken) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", user);

              case 2:
                _context3.next = 4;
                return _SecurityApi.SecurityApi.GetUserInfo(user.securityToken);

              case 4:
                userInfoResponse = _context3.sent;

                if (userInfoResponse) {
                  response = JSON.parse(userInfoResponse);

                  if (response.Error || !response.GroupCollection) {
                    user.errorMessage = "Problem fetching user info: ".concat(response.Error);
                  } else {
                    user.groups = response.GroupCollection.map(function (group) {
                      return {
                        name: group.GroupName,
                        id: group.GroupId
                      };
                    });
                    user.fullName = response.Fullname;
                    user.emailAddress = response.Email;
                  }
                }

                return _context3.abrupt("return", user);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function GetGroups(_x3) {
        return _GetGroups.apply(this, arguments);
      }

      return GetGroups;
    }()
  }, {
    key: "LogoutUser",
    value: function LogoutUser() {
      this.ClearCachedCredentials();
      return _reducers.initialUserState.toJS();
    }
  }, {
    key: "ClientRedirectToLogin",
    value: function ClientRedirectToLogin(uri) {
      if (typeof window != 'undefined') {
        window.location.href = LoginHelper.LoginPageUrl(uri); // LoginHelper.IsWsFedSignin()
        // ? LoginHelper.WsFedLoginPageUrl(window.location)
        // : LoginHelper.LoginPageUrl(uri);
      }
    }
  }, {
    key: "LoginPageUrl",
    value: function LoginPageUrl(uri) {
      return "".concat(uri || '/login', "?redirect_uri=").concat(window.location.pathname + window.location.search);
    } // static WsFedLoginPageUrl(currentLocation) {
    //   const loginPage = contensis.ADFS_LOGIN_PAGE.replace(
    //     '{redirect_uri}',
    //     encodeURIComponent(currentLocation.toString().split('#')[0])
    //   ).replace('{nonce}', randomString(5));
    //   return `${contensis.URL}${loginPage}`.replace(/([^:]\/)\/+/g, '$1');
    // }
    // static IsWsFedSignin() {
    //   return contensis.WSFED_SIGNIN;
    // }
    // static WsFedSignin(redirectUri) {
    //   userManager.signinRedirect({
    //     scope: 'openid',
    //     response_type: 'id_token',
    //     redirect_uri: redirectUri || window.location.toString(),
    //   });
    // }
    // static WsFedLogout() {
    //   ajax(`${contensis.URL}authenticate/logout/`, {
    //     dataType: 'jsonp',
    //     jsonp: false,
    //     async: false,
    //   });
    // }

  }, {
    key: "CheckResult",
    value: function CheckResult(result) {
      var Results = {
        '0': 'OK',
        '-2': 'Incorrect username or password',
        '-3': 'Account disabled',
        '-4': 'Account locked',
        '-5': 'Log on from this PC is denied',
        '-6': 'Log on at this time is denied',
        '-7': 'Account already logged in',
        '-9': 'Unspecified error',
        '2': 'Password change required',
        '3': 'Insufficient privileges',
        '-10': 'Account expired',
        '-11': 'Maintenance mode',
        '4': 'Security token expired',
        '': 'An error has occured'
      };
      return Results[result];
    }
  }]);
  return LoginHelper;
}();

exports.LoginHelper = LoginHelper;

/***/ }),
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookieHelper = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(11));

var _createClass2 = _interopRequireDefault(__webpack_require__(12));

var _jsCookie = _interopRequireDefault(__webpack_require__(35));

var COOKIE_VALID_DAYS = 1; // 0 = Session cookie
// Override the default js-cookie conversion / encoding
// methods so the written values work with Contensis sites

var _cookie = _jsCookie["default"].withConverter({
  read: function read(value) {
    return decodeURIComponent(value);
  },
  write: function write(value) {
    return encodeURIComponent(value);
  }
});

var CookieHelper =
/*#__PURE__*/
function () {
  function CookieHelper() {
    (0, _classCallCheck2["default"])(this, CookieHelper);
  }

  (0, _createClass2["default"])(CookieHelper, null, [{
    key: "GetCookie",
    value: function GetCookie(name) {
      return _cookie.get(name);
    }
  }, {
    key: "SetCookie",
    value: function SetCookie(name, value) {
      var maxAgeDays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : COOKIE_VALID_DAYS;
      maxAgeDays === 0 ? _cookie.set(name, value) : _cookie.set(name, value, {
        expires: maxAgeDays
      });
    }
  }, {
    key: "DeleteCookie",
    value: function DeleteCookie(name) {
      _cookie.remove(name);
    }
  }]);
  return CookieHelper;
}();

exports.CookieHelper = CookieHelper;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__35__;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = __webpack_require__(17);

var _actions = __webpack_require__(22);

var _selectors = __webpack_require__(10);

var _ToJs = __webpack_require__(25);

var _routing = __webpack_require__(5);

var getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

var withLogin = function withLogin(WrappedComponent) {
  // Returns a redux-connected component with the following props:
  // this.propTypes = {
  //   loginUser: PropTypes.func,
  //   logoutUser: PropTypes.func,
  //   user: PropTypes.object,
  // };
  var mapStateToProps = function mapStateToProps(state) {
    return {
      user: (0, _selectors.selectUser)(state),
      userMessage: (0, _selectors.selectUserMessage)(state),
      screenMode: (0, _selectors.selectLoginScreenMode)(state),
      passwordMessage: (0, _selectors.selectPasswordMessage)(state),
      changePasswordMessage: (0, _selectors.selectChangePasswordMessage)(state),
      captchaSiteKey: (0, _selectors.selectCaptchaSiteKey)(state),
      isHuman: (0, _selectors.selectCaptchaResponse)(state),
      currentPath: (0, _routing.selectCurrentPath)(state),
      queryString: (0, _routing.selectQueryStringAsObject)(state)
    };
  };

  var mapDispatchToProps = {
    loginUser: _actions.loginUser,
    logoutUser: _actions.logoutUser,
    toggleLoginMode: _actions.toggleLoginMode,
    forgotPassword: _actions.forgotPassword,
    changePassword: _actions.changePassword,
    changePasswordWithToken: _actions.changePasswordWithToken,
    captchaResponse: _actions.setRecaptchaResponse
  };
  var ConnectedComponent = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _ToJs.toJS)(WrappedComponent));
  ConnectedComponent.displayName = "".concat(getDisplayName(WrappedComponent));
  return ConnectedComponent;
};

var _default = withLogin;
exports["default"] = _default;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectVersionStatus = exports.selectBuildNumber = exports.selectCommitRef = void 0;

var selectCommitRef = function selectCommitRef(state) {
  return state.getIn(['version', 'commitRef']);
};

exports.selectCommitRef = selectCommitRef;

var selectBuildNumber = function selectBuildNumber(state) {
  return state.getIn(['version', 'buildNo']);
};

exports.selectBuildNumber = selectBuildNumber;

var selectVersionStatus = function selectVersionStatus(state) {
  return state.getIn(['version', 'contensisVersionStatus']);
};

exports.selectVersionStatus = selectVersionStatus;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectNavigationDepends = exports.selectNavigationRoot = exports.hasNavigationTree = void 0;

var hasNavigationTree = function hasNavigationTree(state) {
  return state.getIn(['navigation', 'isReady']);
};

exports.hasNavigationTree = hasNavigationTree;

var selectNavigationRoot = function selectNavigationRoot(state) {
  return state.getIn(['navigation', 'root']);
};

exports.selectNavigationRoot = selectNavigationRoot;

var selectNavigationDepends = function selectNavigationDepends(state) {
  return state.getIn(['navigation', 'treeDepends']);
};

exports.selectNavigationDepends = selectNavigationDepends;

/***/ }),
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setVersionStatus = exports.setVersion = void 0;

var _helpers = __webpack_require__(13);

var _version = __webpack_require__(31);

var setVersion = function setVersion(commitRef, buildNo) {
  return (0, _helpers.action)(_version.SET_VERSION, {
    commitRef: commitRef,
    buildNo: buildNo
  });
};

exports.setVersion = setVersion;

var setVersionStatus = function setVersionStatus(status) {
  return (0, _helpers.action)(_version.SET_VERSION_STATUS, {
    status: status
  });
};

exports.setVersionStatus = setVersionStatus;

/***/ }),
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__72__;

/***/ }),
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(72));

var types = __webpack_require__(99)["default"];

var actions = __webpack_require__(100)["default"];

var selectors = __webpack_require__(102)["default"]; // Remap the objects so they are presented in "feature" hierarchy
// e.g. { routing: { types, actions }, navigation: { types, actions } }
// instead of { types: { routing, navigation }, actions: { routing, navigation } }


Object.entries(types).map(function (_ref) {
  var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      key = _ref2[0],
      v = _ref2[1];

  exports[key] = {
    types: v,
    actions: actions[key],
    selectors: selectors[key]
  };
});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(7);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var navigation = _interopRequireWildcard(__webpack_require__(28));

var routing = _interopRequireWildcard(__webpack_require__(6));

var _login = __webpack_require__(16);

var version = _interopRequireWildcard(__webpack_require__(31));

var _default = {
  navigation: navigation,
  routing: routing,
  user: _login.types,
  version: version
};
exports["default"] = _default;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(7);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _login = __webpack_require__(16);

var navigation = _interopRequireWildcard(__webpack_require__(101));

var routing = _interopRequireWildcard(__webpack_require__(27));

var version = _interopRequireWildcard(__webpack_require__(42));

var _default = {
  navigation: navigation,
  routing: routing,
  user: _login.actions,
  version: version
};
exports["default"] = _default;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadNavigationTree = void 0;

var _helpers = __webpack_require__(13);

var _navigation = __webpack_require__(28);

var loadNavigationTree = function loadNavigationTree() {
  return (0, _helpers.action)(_navigation.GET_NODE_TREE);
};

exports.loadNavigationTree = loadNavigationTree;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(7);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var navigation = _interopRequireWildcard(__webpack_require__(38));

var routing = _interopRequireWildcard(__webpack_require__(5));

var _login = __webpack_require__(16);

var version = _interopRequireWildcard(__webpack_require__(37));

var _default = {
  navigation: navigation,
  routing: routing,
  user: _login.selectors,
  version: version
};
exports["default"] = _default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=redux.js.map