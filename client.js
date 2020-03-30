(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@babel/runtime/helpers/interopRequireDefault"), require("@babel/runtime/regenerator"), require("immutable"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/interopRequireWildcard"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("query-string"), require("react-redux"), require("@babel/runtime/helpers/toConsumableArray"), require("@redux-saga/core/effects"), require("@babel/runtime/helpers/slicedToArray"), require("react-router-dom"), require("react-hot-loader"), require("prop-types"), require("js-cookie"), require("@babel/runtime/helpers/typeof"), require("contensis-delivery-api"), require("react-router-config"), require("react-loadable"), require("isomorphic-fetch"), require("history"), require("redux"), require("redux-immutable"), require("redux-thunk"), require("redux-saga"), require("loglevel"), require("@babel/runtime/helpers/construct"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["@babel/runtime/helpers/interopRequireDefault", "@babel/runtime/regenerator", "immutable", "@babel/runtime/helpers/defineProperty", "react", "@babel/runtime/helpers/asyncToGenerator", "@babel/runtime/helpers/interopRequireWildcard", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "query-string", "react-redux", "@babel/runtime/helpers/toConsumableArray", "@redux-saga/core/effects", "@babel/runtime/helpers/slicedToArray", "react-router-dom", "react-hot-loader", "prop-types", "js-cookie", "@babel/runtime/helpers/typeof", "contensis-delivery-api", "react-router-config", "react-loadable", "isomorphic-fetch", "history", "redux", "redux-immutable", "redux-thunk", "redux-saga", "loglevel", "@babel/runtime/helpers/construct", "react-dom"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@babel/runtime/helpers/interopRequireDefault"), require("@babel/runtime/regenerator"), require("immutable"), require("@babel/runtime/helpers/defineProperty"), require("react"), require("@babel/runtime/helpers/asyncToGenerator"), require("@babel/runtime/helpers/interopRequireWildcard"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("query-string"), require("react-redux"), require("@babel/runtime/helpers/toConsumableArray"), require("@redux-saga/core/effects"), require("@babel/runtime/helpers/slicedToArray"), require("react-router-dom"), require("react-hot-loader"), require("prop-types"), require("js-cookie"), require("@babel/runtime/helpers/typeof"), require("contensis-delivery-api"), require("react-router-config"), require("react-loadable"), require("isomorphic-fetch"), require("history"), require("redux"), require("redux-immutable"), require("redux-thunk"), require("redux-saga"), require("loglevel"), require("@babel/runtime/helpers/construct"), require("react-dom")) : factory(root["@babel/runtime/helpers/interopRequireDefault"], root["@babel/runtime/regenerator"], root["immutable"], root["@babel/runtime/helpers/defineProperty"], root["react"], root["@babel/runtime/helpers/asyncToGenerator"], root["@babel/runtime/helpers/interopRequireWildcard"], root["@babel/runtime/helpers/classCallCheck"], root["@babel/runtime/helpers/createClass"], root["query-string"], root["react-redux"], root["@babel/runtime/helpers/toConsumableArray"], root["@redux-saga/core/effects"], root["@babel/runtime/helpers/slicedToArray"], root["react-router-dom"], root["react-hot-loader"], root["prop-types"], root["js-cookie"], root["@babel/runtime/helpers/typeof"], root["contensis-delivery-api"], root["react-router-config"], root["react-loadable"], root["isomorphic-fetch"], root["history"], root["redux"], root["redux-immutable"], root["redux-thunk"], root["redux-saga"], root["loglevel"], root["@babel/runtime/helpers/construct"], root["react-dom"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__15__, __WEBPACK_EXTERNAL_MODULE__17__, __WEBPACK_EXTERNAL_MODULE__20__, __WEBPACK_EXTERNAL_MODULE__23__, __WEBPACK_EXTERNAL_MODULE__26__, __WEBPACK_EXTERNAL_MODULE__27__, __WEBPACK_EXTERNAL_MODULE__31__, __WEBPACK_EXTERNAL_MODULE__34__, __WEBPACK_EXTERNAL_MODULE__36__, __WEBPACK_EXTERNAL_MODULE__41__, __WEBPACK_EXTERNAL_MODULE__42__, __WEBPACK_EXTERNAL_MODULE__46__, __WEBPACK_EXTERNAL_MODULE__49__, __WEBPACK_EXTERNAL_MODULE__50__, __WEBPACK_EXTERNAL_MODULE__52__, __WEBPACK_EXTERNAL_MODULE__55__, __WEBPACK_EXTERNAL_MODULE__56__, __WEBPACK_EXTERNAL_MODULE__57__, __WEBPACK_EXTERNAL_MODULE__58__, __WEBPACK_EXTERNAL_MODULE__65__, __WEBPACK_EXTERNAL_MODULE__67__, __WEBPACK_EXTERNAL_MODULE__97__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 95);
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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
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
  return state.getIn(['routing', 'isLoading']);
};

exports.selectRouteLoading = selectRouteLoading;

/***/ }),
/* 7 */
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
  groups: new _immutable.List([]),
  emailAddress: null,
  fullName: null,
  loginScreenMode: 'login',
  passwordReset: false,
  passwordResetMessage: null,
  changePasswordMessage: null,
  recaptcha: new _immutable.Map({
    key: null,
    response: new _immutable.Map({
      isHuman: false,
      token: null
    })
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
        return state.set('loggedIn', typeof user.loggedIn !== 'undefined' ? user.loggedIn : state.get('loggedIn')).set('failedLogin', typeof user.failedLogin !== 'undefined' ? user.failedLogin : state.get('failedLogin')).set('username', user.username || state.get('username')).set('id', user.id || state.get('id')).set('securityToken', user.securityToken || state.get('securityToken')).set('logonResult', user.logonResult || state.get('logonResult')).set('groups', (0, _immutable.fromJS)(user.groups) || state.get('groups')).set('emailAddress', user.emailAddress || state.get('emailAddress')).set('fullName', user.fullName || state.get('fullName')).set('passwordReset', typeof user.passwordReset !== 'undefined' ? user.passwordReset : state.get('passwordReset')).set('passwordResetMessage', user.passwordResetMessage || state.get('passwordResetMessage')).set('changePasswordMessage', user.changePasswordMessage || state.get('changePasswordMessage'));
      }

    case _types.TOGGLE_LOGIN_MODE:
      {
        var newMode = action.loginMode;
        return state.set('loginScreenMode', newMode);
      }

    case _types.SET_RECAPTCHA_KEY:
      {
        return state.setIn(['recaptcha', 'key'], action.key);
      }

    case _types.SET_RECAPTCHA_RESPONSE:
      {
        return state.setIn(['recaptcha', 'response', 'isHuman'], action.isHuman).setIn(['recaptcha', 'response', 'token'], action.token);
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

var _interopRequireWildcard = __webpack_require__(8);

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

var _sagas = __webpack_require__(30);

var _withLogin = _interopRequireDefault(__webpack_require__(37));

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__17__;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  GetClientSideDeliveryApiStatus: true,
  GetDeliveryApiStatusFromHostname: true,
  fixImageUri: true,
  GetResponseGuids: true,
  GetAllResponseGuids: true,
  deliveryApi: true,
  cachedSearch: true
};
exports.cachedSearch = exports.deliveryApi = exports.GetAllResponseGuids = exports.GetResponseGuids = exports.fixImageUri = exports.GetDeliveryApiStatusFromHostname = exports.GetClientSideDeliveryApiStatus = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(11));

var _createClass2 = _interopRequireDefault(__webpack_require__(12));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(20));

var _typeof2 = _interopRequireDefault(__webpack_require__(41));

var _contensisDeliveryApi = __webpack_require__(42);

Object.keys(_contensisDeliveryApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _contensisDeliveryApi[key];
    }
  });
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getClientConfig = function getClientConfig(project) {
  var config = DELIVERY_API_CONFIG;
  /* global DELIVERY_API_CONFIG */

  if (project) {
    config.projectId = project;
  }

  if (typeof window != 'undefined' && PROXY_DELIVERY_API
  /* global PROXY_DELIVERY_API */
  ) {
      // ensure a relative url is used to bypass the need for CORS (separate OPTIONS calls)
      config.rootUrl = '';
      config.responseHandler = {
        404: function _() {
          return null;
        }
      };
    }

  return config;
};

// This should only be executed on the client as it relies on the window.
var GetClientSideDeliveryApiStatus = function GetClientSideDeliveryApiStatus() {
  if (typeof window != 'undefined') {
    var currentHostname = window.location.hostname;
    return GetDeliveryApiStatusFromHostname(currentHostname);
  }

  return null;
};

exports.GetClientSideDeliveryApiStatus = GetClientSideDeliveryApiStatus;

var GetDeliveryApiStatusFromHostname = function GetDeliveryApiStatusFromHostname(currentHostname) {
  if (currentHostname.indexOf('localhost') > -1) return 'latest';

  if (currentHostname.endsWith('contensis.cloud')) {
    if (currentHostname.indexOf('preview.') > -1) {
      return 'latest';
    } else {
      return 'published';
    }
  }

  if (currentHostname.endsWith('cloud.contensis.com')) {
    if (currentHostname.indexOf('preview-') > -1) {
      return 'latest';
    } else {
      return 'published';
    }
  }

  return 'published';
};

exports.GetDeliveryApiStatusFromHostname = GetDeliveryApiStatusFromHostname;

var fixImageUri = function fixImageUri(object) {
  Object.keys(object).some(function (k) {
    if (k === 'asset') {
      //Should always have an ID, but lets check...
      if (object[k].sys && object[k].sys.id) {
        // We can exclude assets here i think... ?
        var userTransforms = object[k].transformations ? "&".concat(object[k].transformations) : '';
        object[k].sys.uri = "/api/image/".concat(object[k].sys.id, "?invalidationKey=").concat(object[k].sys && object[k].sys.version.versionNo).concat(userTransforms);
      }

      return false;
    }

    if (object[k] && (0, _typeof2["default"])(object[k]) === 'object') {
      fixImageUri(object[k]);
      return false;
    }
  });
};

exports.fixImageUri = fixImageUri;

var GetResponseGuids = function GetResponseGuids(object) {
  var Ids = [];
  Object.keys(object).some(function (k) {
    if (k === 'sys') {
      //Should always have an ID, but lets check...
      if (object[k].id && object[k].language) {
        // We can exclude assets here i think... ?
        if (object[k].dataFormat) {
          if (object[k].dataFormat !== 'asset') {
            Ids.push("".concat(object[k].id, "_").concat(object[k].language.toLowerCase()));
          }
        } else {
          // If we don't have a dataformat add it anyhow, for safety
          Ids.push("".concat(object[k].id, "_").concat(object[k].language.toLowerCase()));
        }
      }

      return false;
    }

    if (object[k] && (0, _typeof2["default"])(object[k]) === 'object') {
      var subIds = GetResponseGuids(object[k]);

      if (subIds.length > 0) {
        Ids.push.apply(Ids, (0, _toConsumableArray2["default"])(subIds));
      }

      return false;
    }
  });
  return Ids;
};

exports.GetResponseGuids = GetResponseGuids;

var GetAllResponseGuids = function GetAllResponseGuids(object) {
  if (!object) return [];
  var returnItems = GetResponseGuids(object);
  var unique = new Set(returnItems);
  return unique;
};

exports.GetAllResponseGuids = GetAllResponseGuids;

var DeliveryApi =
/*#__PURE__*/
function () {
  function DeliveryApi() {
    (0, _classCallCheck2["default"])(this, DeliveryApi);
  }

  (0, _createClass2["default"])(DeliveryApi, [{
    key: "search",
    value: function search(query, linkDepth, project, env) {
      var client = _contensisDeliveryApi.Client.create(getClientConfig(project, env));

      return client.entries.search(query, linkDepth || 1);
    }
  }, {
    key: "getClient",
    value: function getClient() {
      var deliveryApiStatus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'published';
      var project = arguments.length > 1 ? arguments[1] : undefined;
      var env = arguments.length > 2 ? arguments[2] : undefined;
      var baseConfig = getClientConfig(project, env);
      baseConfig.versionStatus = deliveryApiStatus;
      return _contensisDeliveryApi.Client.create(baseConfig);
    }
  }, {
    key: "getEntry",
    value: function getEntry(id) {
      var linkDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var deliveryApiStatus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'published';
      var project = arguments.length > 3 ? arguments[3] : undefined;
      var env = arguments.length > 4 ? arguments[4] : undefined;
      var baseConfig = getClientConfig(project, env);
      baseConfig.versionStatus = deliveryApiStatus;

      var client = _contensisDeliveryApi.Client.create(baseConfig); // return client.entries.get(id, linkDepth);


      return client.entries.get({
        id: id,
        linkDepth: linkDepth
      });
    }
  }]);
  return DeliveryApi;
}();

var deliveryApi = new DeliveryApi();
exports.deliveryApi = deliveryApi;

var CacheNode = function CacheNode(key, value) {
  (0, _classCallCheck2["default"])(this, CacheNode);
  this.key = key;
  this.value = value;
  this.next = null;
  this.prev = null;
};

var LruCache =
/*#__PURE__*/
function () {
  function LruCache() {
    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    (0, _classCallCheck2["default"])(this, LruCache);
    this.map = {};
    this.head = null;
    this.tail = null;
    this.limit = limit || 100;
    this.size = 0;
  }

  (0, _createClass2["default"])(LruCache, [{
    key: "get",
    value: function get(key) {
      if (this.map[key]) {
        var value = this.map[key].value;
        var node = new CacheNode(key, value);
        this.remove(key);
        this.setHead(node);
        return value;
      }
    }
  }, {
    key: "set",
    value: function set(key, value) {
      var node = new CacheNode(key, value);

      if (this.map[key]) {
        this.remove(key);
      } else {
        if (this.size >= this.limit) {
          delete this.map[this.tail.key];
          this.size--;
          this.tail = this.tail.prev;
          this.tail.next = null;
        }
      }

      this.setHead(node);
    }
  }, {
    key: "setHead",
    value: function setHead(node) {
      node.next = this.head;
      node.prev = null;

      if (this.head) {
        this.head.prev = node;
      }

      this.head = node;

      if (!this.tail) {
        this.tail = node;
      }

      this.size++;
      this.map[node.key] = node;
    }
  }, {
    key: "remove",
    value: function remove(key) {
      var node = this.map[key];

      if (node.prev) {
        node.prev.next = node.next;
      } else {
        this.head = node.next;
      }

      if (node.next) {
        node.next.prev = node.prev;
      } else {
        this.tail = node.prev;
      }

      delete this.map[key];
      this.size--;
    }
  }]);
  return LruCache;
}();

var CachedSearch =
/*#__PURE__*/
function () {
  function CachedSearch() {
    (0, _classCallCheck2["default"])(this, CachedSearch);
    (0, _defineProperty2["default"])(this, "cache", new LruCache());
    (0, _defineProperty2["default"])(this, "taxonomyLookup", {});
  }

  (0, _createClass2["default"])(CachedSearch, [{
    key: "search",
    value: function search(query, linkDepth, project, env) {
      var client = _contensisDeliveryApi.Client.create(getClientConfig(project, env));

      return this.request(project + JSON.stringify(query) + linkDepth.toString(), function () {
        return client.entries.search(query, linkDepth);
      });
    }
  }, {
    key: "get",
    value: function get(id, linkDepth, versionStatus, project, env) {
      var client = _contensisDeliveryApi.Client.create(getClientConfig(project, env));

      client.clientConfig.versionStatus = versionStatus;
      return this.request(id, function () {
        return client.entries.get({
          id: id,
          linkDepth: linkDepth
        });
      });
    }
  }, {
    key: "getContentType",
    value: function getContentType(id, project, env) {
      var client = _contensisDeliveryApi.Client.create(getClientConfig(project, env));

      return this.request("[CONTENT TYPE] ".concat(id, " ").concat(project), function () {
        return client.contentTypes.get(id);
      });
    }
  }, {
    key: "getTaxonomyNode",
    value: function getTaxonomyNode(key, project, env) {
      var _this = this;

      var client = _contensisDeliveryApi.Client.create(getClientConfig(project, env));

      return this.request("[TAXONOMY NODE] ".concat(key), function () {
        return client.taxonomy.resolveChildren(key).then(function (node) {
          return _this.extendTaxonomyNode(node);
        });
      });
    }
  }, {
    key: "request",
    value: function request(key, execute) {
      var _this2 = this;

      if (!this.cache.get(key) || typeof window == 'undefined') {
        var promise = execute();
        this.cache.set(key, promise);
        promise["catch"](function () {
          _this2.cache.remove(key);
        });
      }

      return this.cache.get(key);
    }
  }, {
    key: "extendTaxonomyNode",
    value: function extendTaxonomyNode(node) {
      var _this3 = this;

      var id = this.getTaxonomyId(node);
      this.taxonomyLookup[id] = node.key;
      return _objectSpread({}, node, {
        id: id,
        children: node.children ? node.children.map(function (n) {
          return _this3.extendTaxonomyNode(n);
        }) : null
      });
    }
  }, {
    key: "getTaxonomyId",
    value: function getTaxonomyId(node) {
      if (node.key) {
        var parts = node.key.split('/');
        return parts[parts.length - 1];
      }

      return '';
    }
  }, {
    key: "getTaxonomyKey",
    value: function getTaxonomyKey(id) {
      return this.taxonomyLookup[id];
    }
  }]);
  return CachedSearch;
}();

var cachedSearch = new CachedSearch();
exports.cachedSearch = cachedSearch;

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__20__;

/***/ }),
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

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(5));

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
  USER_INFO_URI: 'REST/Contensis/Security/GetUserInfo',
  FORGOT_PASSWORD_URI: 'Security/ResetPasswordEmail',
  CHANGE_PASSWORD_URI: 'Security/ChangePassword',
  CHANGE_PASSWORD_TOKEN_URI: 'Security/ChangePasswordWithToken',
  AUTH_CAPTCHA_URI: 'Security/AuthenticateCaptcha',
  LOGIN_URL: '/business-government/partner'
};
var REGISTER_USER_URL = "".concat(CMS_URL, "/").concat(config.REGISTER_USER_URI);
var LOGON_USER_URL = "".concat(CMS_URL, "/").concat(config.LOGON_USER_URI);
var VALIDATE_USER_URL = "".concat(CMS_URL, "/").concat(config.VALIDATE_USER_URI);
var USER_INFO_URL = "".concat(CMS_URL, "/").concat(config.USER_INFO_URI);
var FORGOT_PASSWORD_URI = "/".concat(config.FORGOT_PASSWORD_URI);
var CHANGE_PASSWORD_URI = "/".concat(config.CHANGE_PASSWORD_URI);
var AUTH_CAPTCHA_URI = "/".concat(config.AUTH_CAPTCHA_URI);
var CHANGE_PASSWORD_TOKEN_URI = "/".concat(config.CHANGE_PASSWORD_TOKEN_URI);
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
    key: "AuthoriseRecaptcha",
    value: function () {
      var _AuthoriseRecaptcha = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(token) {
        var url, options;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = "".concat(AUTH_CAPTCHA_URI, "?captchaToken=").concat(encodeURIComponent(token));
                options = {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method: 'POST'
                };
                _context.next = 4;
                return SecurityApi.get(url, options);

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function AuthoriseRecaptcha(_x) {
        return _AuthoriseRecaptcha.apply(this, arguments);
      }

      return AuthoriseRecaptcha;
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

      function LogonUser(_x2, _x3) {
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

      function ValidateUser(_x4) {
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

      function GetUserInfo(_x5) {
        return _GetUserInfo.apply(this, arguments);
      }

      return GetUserInfo;
    }()
  }, {
    key: "RegisterUser",
    value: function () {
      var _RegisterUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(email, password) {
        var body, options;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                body = {
                  email: email,
                  password: password
                };
                options = _objectSpread({}, BASE_OPTIONS, {
                  method: 'POST',
                  body: JSON.stringify(body)
                });
                _context5.next = 4;
                return SecurityApi.get(REGISTER_USER_URL, options);

              case 4:
                return _context5.abrupt("return", _context5.sent);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function RegisterUser(_x6, _x7) {
        return _RegisterUser.apply(this, arguments);
      }

      return RegisterUser;
    }()
  }, {
    key: "ChangePassword",
    value: function () {
      var _ChangePassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(username, oldPassword, newPassword, newPasswordConfirm) {
        var url, options;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                url = "".concat(CHANGE_PASSWORD_URI, "?username=").concat(encodeURIComponent(username), "&oldPassword=").concat(encodeURIComponent(oldPassword), "&newPassword=").concat(encodeURIComponent(newPassword), "&newPasswordConfirm=").concat(encodeURIComponent(newPasswordConfirm));
                options = {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method: 'POST'
                };
                _context6.next = 4;
                return SecurityApi.get(url, options);

              case 4:
                return _context6.abrupt("return", _context6.sent);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function ChangePassword(_x8, _x9, _x10, _x11) {
        return _ChangePassword.apply(this, arguments);
      }

      return ChangePassword;
    }()
  }, {
    key: "ChangePasswordWithToken",
    value: function () {
      var _ChangePasswordWithToken = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(token, newPassword, newPasswordConfirm) {
        var url, options;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                url = "".concat(CHANGE_PASSWORD_TOKEN_URI, "?token=").concat(token, "&newPassword=").concat(encodeURIComponent(newPassword), "&confirmPassword=").concat(encodeURIComponent(newPasswordConfirm));
                options = {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method: 'POST'
                };
                _context7.next = 4;
                return SecurityApi.get(url, options);

              case 4:
                return _context7.abrupt("return", _context7.sent);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function ChangePasswordWithToken(_x12, _x13, _x14) {
        return _ChangePasswordWithToken.apply(this, arguments);
      }

      return ChangePasswordWithToken;
    }()
  }, {
    key: "ForgotPassword",
    value: function () {
      var _ForgotPassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(username, currentUrl) {
        var url, options;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                url = "".concat(FORGOT_PASSWORD_URI, "?username=").concat(encodeURIComponent(username), "&currentUrl=").concat(encodeURIComponent(currentUrl));
                options = {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method: 'POST'
                };
                _context8.next = 4;
                return SecurityApi.get(url, options);

              case 4:
                return _context8.abrupt("return", _context8.sent);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function ForgotPassword(_x15, _x16) {
        return _ForgotPassword.apply(this, arguments);
      }

      return ForgotPassword;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(url) {
        var options,
            responseBody,
            _args9 = arguments;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : BASE_OPTIONS;
                _context9.prev = 1;
                _context9.next = 4;
                return api(url, options);

              case 4:
                responseBody = _context9.sent;

                if (!responseBody) {
                  _context9.next = 7;
                  break;
                }

                return _context9.abrupt("return", responseBody);

              case 7:
                return _context9.abrupt("return", false);

              case 10:
                _context9.prev = 10;
                _context9.t0 = _context9["catch"](1);
                return _context9.abrupt("return", false);

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[1, 10]]);
      }));

      function get(_x17) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }]);
  return SecurityApi;
}();

exports.SecurityApi = SecurityApi;

function api(_x18, _x19) {
  return _api.apply(this, arguments);
}

function _api() {
  _api = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(url, options) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt("return", fetch(url, options).then(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee10(response) {
                return _regenerator["default"].wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        setTimeout(function () {
                          return null;
                        }, 0);

                        if (response.ok) {
                          _context10.next = 3;
                          break;
                        }

                        throw new Error(response.statusText);

                      case 3:
                        return _context10.abrupt("return", response.json().then(function (data) {
                          return data;
                        }));

                      case 4:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              }));

              return function (_x20) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](function (error) {
              //console.log(error);
              throw error;
            }));

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
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
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__26__;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__27__;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRouteEntry = exports.setRoute = exports.setCurrentProject = exports.setNavigationPath = exports.setNotFound = void 0;

var _helpers = __webpack_require__(13);

var _routing = __webpack_require__(7);

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
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserSaga = validateUserSaga;
exports.userSagas = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _effects = __webpack_require__(19);

var _queryString = _interopRequireDefault(__webpack_require__(15));

var _types = __webpack_require__(9);

var _reducers = __webpack_require__(14);

var _routing = __webpack_require__(7);

var _routing2 = __webpack_require__(6);

var _selectors = __webpack_require__(10);

var _LoginHelper = __webpack_require__(33);

var _SecurityApi = __webpack_require__(24);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(loginUserSaga),
    _marked2 =
/*#__PURE__*/
_regenerator["default"].mark(logoutUserSaga),
    _marked3 =
/*#__PURE__*/
_regenerator["default"].mark(validateUserSaga),
    _marked4 =
/*#__PURE__*/
_regenerator["default"].mark(updateUserSaga),
    _marked5 =
/*#__PURE__*/
_regenerator["default"].mark(forgotPassword),
    _marked6 =
/*#__PURE__*/
_regenerator["default"].mark(changePassword),
    _marked7 =
/*#__PURE__*/
_regenerator["default"].mark(createUserAccountSaga);

var userSagas = [(0, _effects.takeEvery)(_types.LOGIN_USER, loginUserSaga), (0, _effects.takeEvery)(_types.LOGOUT_USER, logoutUserSaga), (0, _effects.takeEvery)(_types.VALIDATE_USER, validateUserSaga), (0, _effects.takeEvery)(_types.CREATE_USER_ACCOUNT, createUserAccountSaga), (0, _effects.takeEvery)(_types.FORGOT_USER_PASSWORD, forgotPassword), (0, _effects.takeEvery)(_types.CHANGE_USER_PASSWORD, changePassword)];
exports.userSagas = userSagas;

function loginUserSaga(action) {
  var getGroups, username, password, user;
  return _regenerator["default"].wrap(function loginUserSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          getGroups = true;
          username = action.username, password = action.password;

          if (!(username && password)) {
            _context.next = 10;
            break;
          }

          _context.next = 5;
          return _LoginHelper.LoginHelper.LoginUser(username, password, getGroups);

        case 5:
          user = _context.sent;
          _context.next = 8;
          return (0, _effects.call)(updateUserSaga, {
            type: user.failedLogin ? _types.LOGIN_FAILED : _types.LOGIN_SUCCESSFUL,
            user: user,
            redirect: !user.failedLogin
          });

        case 8:
          _context.next = 12;
          break;

        case 10:
          _context.next = 12;
          return _LoginHelper.LoginHelper.ClientRedirectToLogin();

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function logoutUserSaga() {
  var user, state;
  return _regenerator["default"].wrap(function logoutUserSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = _LoginHelper.LoginHelper.LogoutUser();
          _context2.next = 3;
          return (0, _effects.fork)(updateUserSaga, {
            user: user
          });

        case 3:
          _context2.next = 5;
          return (0, _effects.select)();

        case 5:
          state = _context2.sent;
          _context2.next = 8;
          return _LoginHelper.LoginHelper.ClientRedirectToHome(state.getIn(['router', 'location']));

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

function validateUserSaga(action) {
  var getGroups, state, currentQs, qsToken, cookies, user, type;
  return _regenerator["default"].wrap(function validateUserSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          getGroups = true;
          _context3.next = 3;
          return (0, _effects.select)();

        case 3:
          state = _context3.sent;
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
          _context3.next = 10;
          return _LoginHelper.LoginHelper.ValidateUser(getGroups, cookies);

        case 10:
          user = _context3.sent;
          type = user && user.loggedIn ? _types.VALIDATE_USER_SUCCESS : _types.VALIDATE_USER_FAILED;
          _context3.next = 14;
          return (0, _effects.call)(updateUserSaga, {
            type: type,
            user: user && !user.loggedIn ? _reducers.initialUserState : user
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

function updateUserSaga(action) {
  var userState, currentSearch, qs, redirectUri;
  return _regenerator["default"].wrap(function updateUserSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.select)(_selectors.selectUser);

        case 2:
          userState = _context4.sent;
          _context4.next = 5;
          return (0, _effects.put)({
            type: _types.UPDATE_USER,
            from: action.type,
            user: _objectSpread({}, userState.toJS(), {}, action.user)
          });

        case 5:
          if (!action.redirect) {
            _context4.next = 14;
            break;
          }

          _context4.next = 8;
          return (0, _effects.select)(_routing2.selectCurrentSearch);

        case 8:
          currentSearch = _context4.sent;
          qs = _queryString["default"].parse(currentSearch);
          redirectUri = qs.redirect_uri;

          if (!redirectUri) {
            _context4.next = 14;
            break;
          }

          _context4.next = 14;
          return (0, _effects.put)({
            type: _routing.SET_ROUTE,
            path: redirectUri
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

function forgotPassword(action) {
  var message;
  return _regenerator["default"].wrap(function forgotPassword$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _LoginHelper.LoginHelper.ForgotPassword(action.username);

        case 2:
          message = _context5.sent;
          _context5.next = 5;
          return (0, _effects.put)({
            type: _types.UPDATE_USER,
            user: {
              passwordReset: true,
              passwordResetMessage: message
            },
            history: history
          });

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}

function changePassword(action) {
  var state, userState, message;
  return _regenerator["default"].wrap(function changePassword$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.select)();

        case 2:
          state = _context6.sent;
          _context6.next = 5;
          return state.get('user');

        case 5:
          userState = _context6.sent;
          message = '';

          if (!action.token) {
            _context6.next = 13;
            break;
          }

          _context6.next = 10;
          return _LoginHelper.LoginHelper.ChangePasswordWithToken(action.token, action.newPassword, action.newPasswordConfirm);

        case 10:
          message = _context6.sent;
          _context6.next = 16;
          break;

        case 13:
          _context6.next = 15;
          return _LoginHelper.LoginHelper.ChangePassword(userState.username, action.oldPassword, action.newPassword, action.newPasswordConfirm);

        case 15:
          message = _context6.sent;

        case 16:
          _context6.next = 18;
          return (0, _effects.put)({
            type: _types.UPDATE_USER,
            user: {
              logonResult: message
            },
            history: history
          });

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}

function createUserAccountSaga() {
  var userState, registerResponse, securityToken, registrationResult, id, user, _user;

  return _regenerator["default"].wrap(function createUserAccountSaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.select)(_selectors.selectUser);

        case 2:
          userState = _context7.sent;

          if (!(userState.username && userState.password)) {
            _context7.next = 22;
            break;
          }

          _context7.next = 6;
          return _SecurityApi.SecurityApi.RegisterUser(userState.username, userState.password);

        case 6:
          registerResponse = _context7.sent;

          if (!registerResponse) {
            _context7.next = 20;
            break;
          }

          securityToken = registerResponse.securityToken, registrationResult = registerResponse.registrationResult, id = registerResponse.id;

          if (!securityToken) {
            _context7.next = 15;
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
          _context7.next = 13;
          return (0, _effects.put)({
            type: _types.UPDATE_USER,
            user: user
          });

        case 13:
          _context7.next = 18;
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
          _context7.next = 18;
          return (0, _effects.put)({
            type: _types.UPDATE_USER,
            user: _user
          });

        case 18:
          _context7.next = 22;
          break;

        case 20:
          _context7.next = 22;
          return (0, _effects.put)({
            type: _types.UPDATE_USER,
            user: _objectSpread({}, userState, {
              registrationResult: 'ServiceFault'
            })
          });

        case 22:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__31__;

/***/ }),
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginHelper = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(5));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(11));

var _createClass2 = _interopRequireDefault(__webpack_require__(12));

var _CookieHelper = __webpack_require__(35);

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
    key: "ForgotPassword",
    value: function () {
      var _ForgotPassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(username) {
        var currentUrl, passwordResponse;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!username) {
                  _context4.next = 7;
                  break;
                }

                currentUrl = window.location.protocol + '//' + window.location.host;
                _context4.next = 4;
                return _SecurityApi.SecurityApi.ForgotPassword(username, currentUrl);

              case 4:
                passwordResponse = _context4.sent;

                if (!passwordResponse) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", passwordResponse);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function ForgotPassword(_x4) {
        return _ForgotPassword.apply(this, arguments);
      }

      return ForgotPassword;
    }()
  }, {
    key: "ChangePassword",
    value: function () {
      var _ChangePassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(username, oldPassword, newPassword, newPasswordConfirm) {
        var passwordResponse;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(newPassword && newPasswordConfirm)) {
                  _context5.next = 10;
                  break;
                }

                if (!this.ValidatePassword(newPassword)) {
                  _context5.next = 9;
                  break;
                }

                _context5.next = 4;
                return _SecurityApi.SecurityApi.ChangePassword(username, oldPassword, newPassword, newPasswordConfirm);

              case 4:
                passwordResponse = _context5.sent;

                if (!passwordResponse) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", passwordResponse);

              case 7:
                _context5.next = 10;
                break;

              case 9:
                return _context5.abrupt("return", 'New password does not meet the requirements: \r\n\r\n - Must be a minimum of 8 characters long \r\n - Must contain at least 1 uppercase character \r\n - Must contain at least 1 special character or number');

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function ChangePassword(_x5, _x6, _x7, _x8) {
        return _ChangePassword.apply(this, arguments);
      }

      return ChangePassword;
    }()
  }, {
    key: "ChangePasswordWithToken",
    value: function () {
      var _ChangePasswordWithToken = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(token, newPassword, newPasswordConfirm) {
        var passwordResponse;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(newPassword && newPasswordConfirm)) {
                  _context6.next = 10;
                  break;
                }

                if (!this.ValidatePassword(newPassword)) {
                  _context6.next = 9;
                  break;
                }

                _context6.next = 4;
                return _SecurityApi.SecurityApi.ChangePasswordWithToken(token, btoa(newPassword), btoa(newPasswordConfirm));

              case 4:
                passwordResponse = _context6.sent;

                if (!passwordResponse) {
                  _context6.next = 7;
                  break;
                }

                return _context6.abrupt("return", passwordResponse);

              case 7:
                _context6.next = 10;
                break;

              case 9:
                return _context6.abrupt("return", 'New password does not meet the requirements: \r\n\r\n - Must be a minimum of 8 characters long \r\n - Must contain at least 1 uppercase character \r\n - Must contain at least 1 special character or number');

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function ChangePasswordWithToken(_x9, _x10, _x11) {
        return _ChangePasswordWithToken.apply(this, arguments);
      }

      return ChangePasswordWithToken;
    }()
  }, {
    key: "ValidatePassword",
    value: function ValidatePassword(pword) {
      //Password must be over 8 characters long
      if (pword.length < 8) return false; //This only returns true if the following criteria is met:
      //  *8 chars or more
      //  *Must contain at least 1 capital letter
      //  *Must contain at least 1 number or special character

      return /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/.test(pword);
    }
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
/* 34 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__34__;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookieHelper = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(11));

var _createClass2 = _interopRequireDefault(__webpack_require__(12));

var _jsCookie = _interopRequireDefault(__webpack_require__(36));

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
/* 36 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__36__;

/***/ }),
/* 37 */
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

var _routing = __webpack_require__(6);

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
      isLoggedIn: (0, _selectors.selectUserLoggedIn)(state),
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
/* 38 */
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
/* 39 */
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _interopRequireWildcard = __webpack_require__(8);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(26));

var _react = _interopRequireWildcard(__webpack_require__(4));

var _propTypes = _interopRequireDefault(__webpack_require__(34));

var _reactRedux = __webpack_require__(17);

var _reactHotLoader = __webpack_require__(31);

var _reactRouterDom = __webpack_require__(27);

var _reactRouterConfig = __webpack_require__(46);

var _routing = __webpack_require__(6);

var _routing2 = __webpack_require__(28);

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
  }, [location, setPath]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      MatchedComponent = _useState2[0],
      setMatchedComponent = _useState2[1];

  (0, _react.useEffect)(function () {
    setMatchedComponent(function () {
      return routes.ContentTypeMappings.find(function (item) {
        return item.contentTypeID == contentTypeId;
      });
    });
  }, [contentTypeId, routes.ContentTypeMappings]); // Need to redirect when url endswith a /

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


  if (MatchedComponent) {
    return _react["default"].createElement(MatchedComponent.component, {
      projectId: projectId,
      contentTypeId: contentTypeId,
      entry: entry,
      isLoggedIn: isLoggedIn
    });
  }

  if (isNotFound) {
    return _react["default"].createElement(_Status.Status, {
      code: 404
    }, _react["default"].createElement(_NotFound["default"], null));
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
/* 41 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__41__;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__42__;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setVersionStatus = exports.setVersion = void 0;

var _helpers = __webpack_require__(13);

var _version = __webpack_require__(32);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(4));

var _reactHotLoader = __webpack_require__(31);

var _RouteLoader = _interopRequireDefault(__webpack_require__(40));

var AppRoot = function AppRoot(props) {
  return _react["default"].createElement(_RouteLoader["default"], props);
};

var _default = AppRoot;
exports["default"] = _default;

/***/ }),
/* 45 */
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
/* 46 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__46__;

/***/ }),
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Status = void 0;

var _react = _interopRequireDefault(__webpack_require__(4));

var _propTypes = _interopRequireDefault(__webpack_require__(34));

var _reactRouterDom = __webpack_require__(27);

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
/* 49 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__49__;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__50__;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserHistory = exports.history = void 0;

var _history = __webpack_require__(52);

// Create a history depending on the environment
var selectedHistory = typeof window !== 'undefined' ? _history.createBrowserHistory : _history.createMemoryHistory;

var history = function history() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return selectedHistory(options);
};

exports.history = history;
var browserHistory = selectedHistory();
exports.browserHistory = browserHistory;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__52__;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var servers = SERVERS;
/* global SERVERS */

var alias = servers.alias.toLowerCase();
var publicUri = PUBLIC_URI;
/* global PUBLIC_URI */

var projects = PROJECTS;
/* global PROJECTS */
// return a projectId via the request hostname

var pickProject = function pickProject(hostname, query) {
  // if localhost we can only infer via a querystring, and take your word for it
  if (hostname == 'localhost') {
    return query && query.p || projects[0].id;
  } // if hostname is the actual public uri we can return the first project from the list


  if (hostname == publicUri) {
    return projects[0].id;
  }

  var project = 'unknown'; // // go through all the defined projects
  // Object.entries(projects).map(([, p]) => {

  var p = projects[0]; // check if we're accessing via the project's public uri

  if (hostname.includes(p.publicUri)) project = p.id; // the url structure is different for website (we don't prefix)

  if (p.id.startsWith('website')) {
    // check for internal and external hostnames
    // we check live and preview distinctly so our rule does not clash with
    // hostnames that use a project prefix
    if (hostname.includes("live-".concat(alias, ".cloud.contensis.com")) || hostname.includes("live.".concat(alias, ".contensis.cloud")) || hostname.includes("preview-".concat(alias, ".cloud.contensis.com")) || hostname.includes("preview.".concat(alias, ".contensis.cloud"))) project = p.id;
  } else {
    // check for internal and external hostnames, prefixed with the projectId
    if (hostname.includes("".concat(p.id.toLowerCase(), "-").concat(alias, ".cloud.contensis.com")) || hostname.includes("".concat(p.id.toLowerCase(), ".").concat(alias, ".contensis.cloud"))) project = p.id;
  } // });


  return project === 'unknown' ? p.id : project;
};

var _default = pickProject;
exports["default"] = _default;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(8);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

var _redux = __webpack_require__(55);

var _reduxImmutable = __webpack_require__(56);

var _reduxThunk = _interopRequireDefault(__webpack_require__(57));

var _reduxSaga = _interopRequireWildcard(__webpack_require__(58));

var _routing = _interopRequireDefault(__webpack_require__(59));

var _login = __webpack_require__(16);

var _version = _interopRequireDefault(__webpack_require__(60));

var _navigation = _interopRequireDefault(__webpack_require__(61));

var _routerMiddleware = _interopRequireDefault(__webpack_require__(62));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(featureReducers, initialState, history) {
  var thunkMiddleware = [_reduxThunk["default"]];

  var reduxDevToolsMiddleware = function reduxDevToolsMiddleware(f) {
    return f;
  };

  if (typeof window != 'undefined') {
    reduxDevToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
      return f;
    };
  }

  var sagaMiddleware = (0, _reduxSaga["default"])();
  var middleware = (0, _redux.compose)(_redux.applyMiddleware.apply(void 0, thunkMiddleware.concat([sagaMiddleware, (0, _routerMiddleware["default"])(history)])), reduxDevToolsMiddleware);

  var reducers = _objectSpread({
    navigation: _navigation["default"],
    routing: _routing["default"],
    user: _login.reducer,
    version: _version["default"]
  }, featureReducers);

  var combinedReducers = (0, _reduxImmutable.combineReducers)(reducers);

  var store = function store(initialState) {
    var store = (0, _redux.createStore)(combinedReducers, initialState, middleware);
    store.runSaga = sagaMiddleware.run;

    store.close = function () {
      return store.dispatch(_reduxSaga.END);
    };

    return store;
  };

  return store(initialState);
};

exports["default"] = _default;

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__55__;

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__56__;

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__57__;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__58__;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

var _immutable = __webpack_require__(2);

var _routing = __webpack_require__(7);

var _ContensisDeliveryApi = __webpack_require__(18);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initialState = (0, _immutable.Map)({
  currentPath: '/',
  currentNode: [],
  currentProject: 'unknown',
  notFound: false,
  entryID: null,
  entry: null,
  entryDepends: new _immutable.List(),
  contentTypeId: null,
  currentNodeAncestors: new _immutable.List(),
  currentTreeId: null
});

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _routing.SET_ANCESTORS:
      {
        if (action.ancestors) {
          var ancestorIDs = action.ancestors.map(function (node) {
            return node.id;
          });
          var currentNodeDepends = state.get('nodeDepends');

          var allNodeDepends = _immutable.Set.union([(0, _immutable.Set)(ancestorIDs), currentNodeDepends]);

          return state.set('nodeDepends', allNodeDepends).set('currentNodeAncestors', (0, _immutable.fromJS)(action.ancestors));
        }

        return state.set('currentNodeAncestors', (0, _immutable.fromJS)(action.ancestors));
      }

    case _routing.SET_ENTRY:
      {
        if (!action.entry) return state.set('entry', null).set('entryDepends', null).set('isLoading', action.isLoading);
        var entryDepends = (0, _ContensisDeliveryApi.GetAllResponseGuids)(action.entry);
        return state.set('entryDepends', (0, _immutable.fromJS)(entryDepends)).set('entry', (0, _immutable.fromJS)(action.entry)).set('isLoading', action.isLoading);
      }

    case _routing.SET_ENTRY_ID:
      {
        if (action.id === '') {
          return state;
        }

        return state.set('entryID', action.id);
      }

    case _routing.SET_NAVIGATION_PATH:
      {
        var staticRoute = false;

        if (action.staticRoute) {
          staticRoute = _objectSpread({}, action.staticRoute);
        }

        if (action.path) {
          return state.set('currentPath', (0, _immutable.fromJS)(action.path)).set('location', (0, _immutable.fromJS)(action.location)).set('staticRoute', (0, _immutable.fromJS)(_objectSpread({}, staticRoute, {
            route: _objectSpread({}, staticRoute.route, {
              component: null
            })
          }))).set('isLoading', typeof window !== 'undefined');
        }

        return state;
      }

    case _routing.SET_NAVIGATION_NOT_FOUND:
      {
        return state.set('notFound', (0, _immutable.fromJS)(action.notFound)).set('isLoading', false);
      }

    case _routing.SET_NODE:
      {
        var node = action.node;
        if (!node) return state; // We have the entry stored elsewhere, so lets not keep it twice.
        // On Set Node, we reset all dependants.

        var nodeDepends = (0, _immutable.Set)([node.id]);
        if (node && node.entry) delete node.entry;
        return state.set('nodeDepends', nodeDepends).set('currentNode', (0, _immutable.fromJS)(action.node));
      }

    case _routing.SET_ROUTE:
      {
        return state.set('nextPath', action.path);
      }

    case _routing.SET_SIBLINGS:
      {
        // Can be null in some cases like the homepage.
        var currentNodeSiblingParent = null;
        var siblingIDs = [];

        if (action.siblings && action.siblings.length > 0) {
          currentNodeSiblingParent = action.siblings[0].parentId;
          siblingIDs = action.siblings.map(function (node) {
            return node.id;
          });
        }

        var _currentNodeDepends = state.get('nodeDepends');

        var _allNodeDepends = _immutable.Set.union([(0, _immutable.Set)(siblingIDs), _currentNodeDepends]);

        return state.set('nodeDepends', _allNodeDepends).set('currentNodeSiblings', (0, _immutable.fromJS)(action.siblings)).set('currentNodeSiblingsParent', currentNodeSiblingParent);
      }

    case _routing.SET_TARGET_PROJECT:
      {
        return state.set('currentProject', action.project).set('currentTreeId', '') //getTreeID(action.project))
        .set('allowedGroups', (0, _immutable.fromJS)(action.allowedGroups));
      }

    default:
      return state;
  }
};

exports["default"] = _default;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = __webpack_require__(2);

var _version = __webpack_require__(32);

var initialState = (0, _immutable.Map)({
  commitRef: null,
  buildNo: null,
  contensisVersionStatus: 'published'
});

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _version.SET_VERSION_STATUS:
      {
        return state.set('contensisVersionStatus', action.status);
      }

    case _version.SET_VERSION:
      {
        return state.set('commitRef', action.commitRef).set('buildNo', action.buildNo);
      }

    default:
      return state;
  }
};

exports["default"] = _default;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = __webpack_require__(2);

var _navigation = __webpack_require__(29);

var initialState = (0, _immutable.Map)({
  root: null,
  treeDepends: new _immutable.List([]),
  isError: false,
  isReady: false
});

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _navigation.SET_NODE_TREE:
      {
        return state.set('root', (0, _immutable.fromJS)(action.nodes)).set('isReady', true);
      }

    case _navigation.GET_NODE_TREE_ERROR:
      {
        return state.set('isError', true);
      }

    default:
      return state;
  }
};

exports["default"] = _default;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(20));

var _routing = __webpack_require__(7);

/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */

/* eslint-disable no-unused-vars */
var routerMiddleware = function routerMiddleware(history) {
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type !== _routing.CALL_HISTORY_METHOD) {
          return next(action);
        }

        var _action$payload = action.payload,
            method = _action$payload.method,
            args = _action$payload.args;
        history[method].apply(history, (0, _toConsumableArray2["default"])(args));
      };
    };
  };
};

var _default = routerMiddleware;
exports["default"] = _default;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(20));

var _effects = __webpack_require__(19);

var _routing = __webpack_require__(64);

var _login = __webpack_require__(16);

var _navigation = __webpack_require__(72);

var _sagas = __webpack_require__(30);

// index.js
function _default() {
  var featureSagas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return (
    /*#__PURE__*/
    _regenerator["default"].mark(function rootSaga() {
      var subSagas;
      return _regenerator["default"].wrap(function rootSaga$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              subSagas = [].concat((0, _toConsumableArray2["default"])(_routing.routingSagas), (0, _toConsumableArray2["default"])(_navigation.navigationSagas), (0, _toConsumableArray2["default"])(_login.sagas));
              _context.next = 3;
              return (0, _effects.all)([(0, _sagas.validateUserSaga)({})].concat((0, _toConsumableArray2["default"])(subSagas), (0, _toConsumableArray2["default"])(featureSagas)));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, rootSaga);
    })
  );
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(8);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routingSagas = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var log = _interopRequireWildcard(__webpack_require__(65));

var _effects = __webpack_require__(19);

var _routing = __webpack_require__(7);

var _ContensisDeliveryApi = __webpack_require__(18);

var _version = __webpack_require__(38);

var _routing2 = __webpack_require__(6);

var _navigation = __webpack_require__(29);

var _navigation2 = __webpack_require__(39);

var _queries = __webpack_require__(66);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(setRouteSaga),
    _marked2 =
/*#__PURE__*/
_regenerator["default"].mark(getRouteSaga),
    _marked3 =
/*#__PURE__*/
_regenerator["default"].mark(setRouteEntry),
    _marked4 =
/*#__PURE__*/
_regenerator["default"].mark(do404);

var routingSagas = [(0, _effects.takeEvery)(_routing.SET_NAVIGATION_PATH, getRouteSaga), (0, _effects.takeEvery)(_routing.SET_ROUTE, setRouteSaga)];
/**
 * To navigate / push a specific route via redux middleware
 * @param {path, state} action
 */

exports.routingSagas = routingSagas;

function setRouteSaga(action) {
  return _regenerator["default"].wrap(function setRouteSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.put)({
            type: _routing.CALL_HISTORY_METHOD,
            payload: {
              method: 'push',
              args: [action.path, action.state]
            }
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function getRouteSaga(action) {
  var entry, withEvents, routes, appsays, doNavigation, entryLinkDepth, setContentTypeLimits, state, routeEntry, currentPath, deliveryApiStatus, project, pathNode, ancestors, siblings, currentPathDepth, splitPath, entryGuid, previewEntry, contentType, query, payload;
  return _regenerator["default"].wrap(function getRouteSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          entry = null;
          _context2.prev = 1;
          withEvents = action.withEvents, routes = action.routes;

          if (!(withEvents && withEvents.onRouteLoad)) {
            _context2.next = 7;
            break;
          }

          _context2.next = 6;
          return withEvents.onRouteLoad(action);

        case 6:
          appsays = _context2.sent;

        case 7:
          // if appsays customNavigation: true, we will set doNavigation to false
          // if appsays nothing we will set doNavigation to true and continue to do navigation calls
          doNavigation = !appsays || appsays && !appsays.customNavigation;
          entryLinkDepth = appsays && appsays.entryLinkDepth || 3;
          setContentTypeLimits = routes && routes.ContentTypeMappings && !!routes.ContentTypeMappings.find(function (ct) {
            return ct.fields || ct.linkDepth;
          });
          _context2.next = 12;
          return (0, _effects.select)();

        case 12:
          state = _context2.sent;
          routeEntry = (0, _routing2.selectRouteEntry)(state);

          if (!(appsays && appsays.customRouting || action.staticRoute && !action.staticRoute.route.fetchNode || routeEntry && action.statePath === action.path)) {
            _context2.next = 25;
            break;
          }

          if (!routeEntry) {
            _context2.next = 21;
            break;
          }

          entry = routeEntry.toJS();
          _context2.next = 19;
          return (0, _effects.put)({
            type: _routing.SET_ENTRY,
            entry: entry,
            isLoading: false
          });

        case 19:
          _context2.next = 23;
          break;

        case 21:
          _context2.next = 23;
          return (0, _effects.call)(setRouteEntry);

        case 23:
          _context2.next = 80;
          break;

        case 25:
          currentPath = (0, _routing2.selectCurrentPath)(state);
          deliveryApiStatus = (0, _version.selectVersionStatus)(state);
          project = (0, _routing2.selectCurrentProject)(state);
          pathNode = null, ancestors = null, siblings = null; // Scroll into View

          if (typeof window !== 'undefined') {
            window.scroll({
              top: 0
            });
          }

          currentPathDepth = currentPath.split('/').length - 1;
          if (currentPath === '/') currentPathDepth = 0; // Handle homepage

          if (!(currentPath === '/')) {
            _context2.next = 38;
            break;
          }

          _context2.next = 35;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.getRoot({
            depth: 0,
            entryFields: '*',
            entryLinkDepth: entryLinkDepth,
            language: 'en-GB'
          });

        case 35:
          pathNode = _context2.sent;
          _context2.next = 72;
          break;

        case 38:
          if (!(currentPath && currentPath.startsWith('/preview/'))) {
            _context2.next = 54;
            break;
          }

          splitPath = currentPath.split('/');
          entryGuid = splitPath[2];

          if (!(splitPath.length == 3)) {
            _context2.next = 52;
            break;
          }

          _context2.next = 44;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).entries.get({
            id: entryGuid,
            linkDepth: 4
          });

        case 44:
          previewEntry = _context2.sent;

          if (!previewEntry) {
            _context2.next = 50;
            break;
          }

          _context2.next = 48;
          return (0, _effects.call)(setRouteEntry, previewEntry);

        case 48:
          _context2.next = 52;
          break;

        case 50:
          _context2.next = 52;
          return (0, _effects.call)(do404);

        case 52:
          _context2.next = 64;
          break;

        case 54:
          _context2.next = 56;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.get({
            depth: 0,
            path: currentPath,
            entryFields: setContentTypeLimits ? ['sys.contentTypeId', 'sys.id'] : '*',
            entryLinkDepth: setContentTypeLimits ? 0 : entryLinkDepth
          });

        case 56:
          pathNode = _context2.sent;

          if (!(setContentTypeLimits && pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id)) {
            _context2.next = 64;
            break;
          }

          contentType = routes && routes.ContentTypeMappings && routes.ContentTypeMappings.find(function (ct) {
            return ct.contentTypeID === pathNode.entry.sys.contentTypeId;
          });
          query = (0, _queries.routeEntryByFields)(pathNode.entry.sys.id, contentType && contentType.fields, deliveryApiStatus);
          _context2.next = 62;
          return _ContensisDeliveryApi.deliveryApi.search(query, contentType && contentType.linkDepth || 3, project);

        case 62:
          payload = _context2.sent;

          if (payload && payload.items && payload.items.length > 0) {
            pathNode.entry = payload.items[0];
          }

        case 64:
          if (!(pathNode && pathNode.id && doNavigation)) {
            _context2.next = 72;
            break;
          }

          _context2.next = 67;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.getAncestors(pathNode.id);

        case 67:
          ancestors = _context2.sent;

          if (!(currentPathDepth > 1)) {
            _context2.next = 72;
            break;
          }

          _context2.next = 71;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.getSiblings({
            id: pathNode.id,
            entryFields: ['sys.contentTypeId', 'url']
          });

        case 71:
          siblings = _context2.sent;

        case 72:
          if (!(pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id)) {
            _context2.next = 78;
            break;
          }

          entry = pathNode.entry;
          _context2.next = 76;
          return (0, _effects.call)(setRouteEntry, entry, pathNode, ancestors, siblings);

        case 76:
          _context2.next = 80;
          break;

        case 78:
          _context2.next = 80;
          return (0, _effects.call)(do404);

        case 80:
          if (!(withEvents && withEvents.onRouteLoaded)) {
            _context2.next = 83;
            break;
          }

          _context2.next = 83;
          return withEvents.onRouteLoaded(_objectSpread({}, action, {
            entry: entry
          }));

        case 83:
          if (!(!(0, _navigation2.hasNavigationTree)(state) && doNavigation)) {
            _context2.next = 86;
            break;
          }

          _context2.next = 86;
          return (0, _effects.put)({
            type: _navigation.GET_NODE_TREE
          });

        case 86:
          _context2.next = 93;
          break;

        case 88:
          _context2.prev = 88;
          _context2.t0 = _context2["catch"](1);
          log.error.apply(log, ['Error running route saga:', _context2.t0, _context2.t0.stack]);
          _context2.next = 93;
          return (0, _effects.call)(do404);

        case 93:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[1, 88]]);
}

function setRouteEntry(entry, node, ancestors, siblings) {
  return _regenerator["default"].wrap(function setRouteEntry$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.all)([(0, _effects.put)({
            type: _routing.SET_NAVIGATION_NOT_FOUND,
            notFound: false
          }), (0, _effects.put)({
            type: _routing.SET_NODE,
            node: node
          }), (0, _effects.put)({
            type: _routing.SET_ENTRY,
            entry: entry
          }), (0, _effects.put)({
            type: _routing.SET_ENTRY_ID,
            id: entry && entry.sys.id || null
          }), (0, _effects.put)({
            type: _routing.SET_ANCESTORS,
            ancestors: ancestors
          }), (0, _effects.put)({
            type: _routing.SET_SIBLINGS,
            siblings: siblings
          })]);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

function do404() {
  return _regenerator["default"].wrap(function do404$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.put)({
            type: _routing.SET_NAVIGATION_NOT_FOUND,
            notFound: true
          });

        case 2:
          _context4.next = 4;
          return (0, _effects.put)({
            type: _routing.SET_ENTRY_ID,
            id: null
          });

        case 4:
          _context4.next = 6;
          return (0, _effects.put)({
            type: _routing.SET_ENTRY,
            entry: null
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__65__;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeEntryByFields = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(20));

var _construct2 = _interopRequireDefault(__webpack_require__(67));

var _ContensisDeliveryApi = __webpack_require__(18);

var _expressions = __webpack_require__(68);

// eslint-disable-next-line import/named
var routeEntryByFields = function routeEntryByFields(id) {
  var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var versionStatus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'published';
  var query = (0, _construct2["default"])(_ContensisDeliveryApi.Query, [].concat((0, _toConsumableArray2["default"])((0, _expressions.fieldExpression)('sys.id', id)), (0, _toConsumableArray2["default"])((0, _expressions.defaultExpressions)(versionStatus))));
  query.fields = fields;
  return query;
};

exports.routeEntryByFields = routeEntryByFields;

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__67__;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.termExpressions = exports.customWhereExpressions = exports.orderByExpression = exports.includeInSearchExpressions = exports.defaultSearchExpressions = exports.defaultExpressions = exports.dataFormatExpression = exports.filterExpressions = exports.contentTypeIdExpression = exports.fieldExpression = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(20));

var _contensisDeliveryApi = __webpack_require__(42);

var _schema = __webpack_require__(69);

var _util = __webpack_require__(70);

var fieldExpression = function fieldExpression(field, value) {
  var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'equalTo';
  var weight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (!field || !value) return [];
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? [_contensisDeliveryApi.Op[operator](field, value)] : [_contensisDeliveryApi.Op[operator](field, value).weight(weight)];
};

exports.fieldExpression = fieldExpression;

var contentTypeIdExpression = function contentTypeIdExpression(contentTypeIds, webpageTemplates) {
  var expressions = [];
  if (!contentTypeIds && !webpageTemplates) return expressions;

  if (contentTypeIds && contentTypeIds.length > 0) {
    expressions.push.apply(expressions, (0, _toConsumableArray2["default"])(dataFormatExpression(contentTypeIds, _schema.DataFormats.entry)));
  }

  if (webpageTemplates && webpageTemplates.length > 0) {
    expressions.push.apply(expressions, (0, _toConsumableArray2["default"])(dataFormatExpression(webpageTemplates, _schema.DataFormats.webpage)));
  }

  if (expressions.length > 1) return [_contensisDeliveryApi.Op.or.apply(_contensisDeliveryApi.Op, expressions)];
  return expressions;
};

exports.contentTypeIdExpression = contentTypeIdExpression;

var filterExpressions = function filterExpressions(filters) {
  if (!filters) return [];
  var expressions = [];
  filters.map(function (param) {
    expressions.push.apply(expressions, (0, _toConsumableArray2["default"])(fieldExpression(param.key, param.value, 'contains')));
  });
  return expressions;
};

exports.filterExpressions = filterExpressions;

var dataFormatExpression = function dataFormatExpression(contentTypeIds) {
  var dataFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _schema.DataFormats.entry;

  if (contentTypeIds && contentTypeIds.length > 0) {
    /**
     * We have an array of contentTypeIds some may be prefixed with a "!"
     * to indicate this is a "not" expression
     */
    var withContentTypeIds = contentTypeIds.filter(function (c) {
      return !c.startsWith('!');
    });
    var notContentTypeIds = contentTypeIds.filter(function (c) {
      return c.startsWith('!');
    }).map(function (id) {
      return id.substring(1);
    });

    var andExpr = _contensisDeliveryApi.Op.and();

    var dataFormatExpr = fieldExpression(_schema.Fields.sys.dataFormat, dataFormat);
    var withExpr = fieldExpression(_schema.Fields.sys.contentTypeId, withContentTypeIds);
    var notExpr = [_contensisDeliveryApi.Op.not.apply(_contensisDeliveryApi.Op, (0, _toConsumableArray2["default"])(fieldExpression(_schema.Fields.sys.contentTypeId, notContentTypeIds)))];
    andExpr.add.apply(andExpr, (0, _toConsumableArray2["default"])(dataFormatExpr));
    if (withContentTypeIds.length > 0) andExpr.add.apply(andExpr, (0, _toConsumableArray2["default"])(withExpr));
    if (notContentTypeIds.length > 0) andExpr.add.apply(andExpr, notExpr);
    return [andExpr];
  }

  return [];
};

exports.dataFormatExpression = dataFormatExpression;

var defaultExpressions = function defaultExpressions(versionStatus) {
  return [_contensisDeliveryApi.Op.equalTo(_schema.Fields.sys.versionStatus, versionStatus)];
};

exports.defaultExpressions = defaultExpressions;

var defaultSearchExpressions = function defaultSearchExpressions(versionStatus) {
  return [].concat((0, _toConsumableArray2["default"])(defaultExpressions(versionStatus)), (0, _toConsumableArray2["default"])(includeInSearchExpressions()));
};

exports.defaultSearchExpressions = defaultSearchExpressions;

var includeInSearchExpressions = function includeInSearchExpressions() {
  return [_contensisDeliveryApi.Op.or(_contensisDeliveryApi.Op.and(_contensisDeliveryApi.Op.exists(_schema.Fields.sys.includeInSearch, true), _contensisDeliveryApi.Op.equalTo(_schema.Fields.sys.includeInSearch, true)), _contensisDeliveryApi.Op.exists(_schema.Fields.sys.includeInSearch, false))];
};

exports.includeInSearchExpressions = includeInSearchExpressions;

var orderByExpression = function orderByExpression(orderBy) {
  var expression = _contensisDeliveryApi.OrderBy;

  if (orderBy && orderBy.length > 0) {
    orderBy.map(function (ob) {
      return expression = ob.startsWith('-') ? expression.desc(ob.substring(1)) : expression.asc(ob);
    });
  }

  return expression;
};

exports.orderByExpression = orderByExpression;

var equalToOrIn = function equalToOrIn(field, arr) {
  var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'equalTo';
  return arr.length === 0 ? [] : arr.length === 1 ? [_contensisDeliveryApi.Op[operator](field, arr[0])] : [_contensisDeliveryApi.Op["in"].apply(_contensisDeliveryApi.Op, [field].concat((0, _toConsumableArray2["default"])(arr)))];
};

var customWhereExpressions = function customWhereExpressions(where) {
  if (!where || !Array.isArray(where)) return []; // Accept HTTP style objects and map them to
  // their equivalent JS client "Op" expressions

  return where.map(function (clause) {
    var expression;
    Object.keys(clause).map(function (key, idx) {
      if (idx === 1) {
        var operator = key;
        var value = clause[key];
        expression = _contensisDeliveryApi.Op[operator](clause.field, value, clause.weight);
      }
    });
    return expression;
  });
};

exports.customWhereExpressions = customWhereExpressions;

var termExpressions = function termExpressions(searchTerm, weightedSearchFields) {
  if (searchTerm && weightedSearchFields && weightedSearchFields.length > 0) {
    // Extract any phrases in quotes to array
    var quotedPhrases = (0, _util.extractQuotedPhrases)(searchTerm); // Modify the search term to remove any quoted phrases to leave any remaining terms

    var modifiedSearchTerm = searchTerm;
    quotedPhrases.forEach(function (qp) {
      return modifiedSearchTerm = modifiedSearchTerm.replace(qp, '').replace('""', '').trim();
    }); // Push to the operators array to include in the query

    var operators = []; // Helper functions to generate Op expressions

    var containsOp = function containsOp(f, term) {
      return fieldExpression(f.fieldId, (0, _util.fixFreeTextForElastic)(term), 'contains', f.weight);
    };

    var freeTextOp = function freeTextOp(f, term) {
      return fieldExpression(f.fieldId, (0, _util.fixFreeTextForElastic)(term), 'freeText', f.weight);
    }; // For each weighted search field


    weightedSearchFields.forEach(function (f) {
      // Push to field operators
      var fieldOperators = []; // Add operator expressions for modified search term

      if (modifiedSearchTerm) {
        if ([_schema.Fields.keywords, _schema.Fields.sys.filename, _schema.Fields.sys.uri].includes(f.fieldId)) {
          fieldOperators.push.apply(fieldOperators, (0, _toConsumableArray2["default"])(containsOp(f, modifiedSearchTerm)));
        } else {
          if ([_schema.Fields.entryTitle].includes(f.fieldId)) {
            fieldOperators.push(_contensisDeliveryApi.Op.or.apply(_contensisDeliveryApi.Op, (0, _toConsumableArray2["default"])(containsOp(f, modifiedSearchTerm)).concat((0, _toConsumableArray2["default"])(freeTextOp(f, modifiedSearchTerm)))));
          } else {
            fieldOperators.push.apply(fieldOperators, (0, _toConsumableArray2["default"])(freeTextOp(f, modifiedSearchTerm)));
          }
        }
      } // Add operator expressions for any quoted phrases


      quotedPhrases.forEach(function (qp) {
        return fieldOperators.push.apply(fieldOperators, (0, _toConsumableArray2["default"])(containsOp(f, qp)));
      }); // If we are using multiple operators for a field we will
      // wrap each field inside an And operator so we will match
      // all terms/phrases rather than any terms/phrases

      if (fieldOperators.length > 1) {
        operators.push(_contensisDeliveryApi.Op.and.apply(_contensisDeliveryApi.Op, fieldOperators));
      } else {
        operators.push.apply(operators, fieldOperators);
      }
    }); // Wrap operators in an Or operator

    return [_contensisDeliveryApi.Op.or().addRange(operators)];
  } else if (searchTerm) {
    return [_contensisDeliveryApi.Op.contains(_schema.Fields.wildcard, searchTerm)];
  } else {
    return [];
  }
};

exports.termExpressions = termExpressions;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterExpressionTypes = exports.WebpageFormats = exports.ContentTypes = exports.VersionStatus = exports.Projects = exports.Fields = exports.DataFormats = void 0;
var DataFormats = {
  entry: 'entry',
  webpage: 'webpage'
};
exports.DataFormats = DataFormats;
var sys = {
  contentTypeId: 'sys.contentTypeId',
  dataFormat: 'sys.dataFormat',
  filename: 'sys.properties.filename',
  id: 'sys.id',
  includeInSearch: 'sys.metadata.includeInSearch',
  slug: 'sys.slug',
  uri: 'sys.uri',
  versionStatus: 'sys.versionStatus'
};
var Fields = {
  entryTitle: 'entryTitle',
  entryDescription: 'entryDescription',
  keywords: 'keywords',
  sys: sys,
  contentTypeId: 'sys.contentTypeId',
  wildcard: '*'
};
exports.Fields = Fields;
var Projects = {
  website: 'website'
};
exports.Projects = Projects;
var VersionStatus = {
  published: 'published',
  latest: 'latest'
};
exports.VersionStatus = VersionStatus;
var ContentTypes = {
  contentPage: 'contentPage'
};
exports.ContentTypes = ContentTypes;
var WebpageFormats = {};
exports.WebpageFormats = WebpageFormats;
var FilterExpressionTypes = {
  contentType: 'contentType',
  field: 'field'
};
exports.FilterExpressionTypes = FilterExpressionTypes;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixFreeTextForElastic = fixFreeTextForElastic;
exports.callCustomApi = exports.extractQuotedPhrases = exports.timedSearch = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(5));

var _performance = __webpack_require__(71);

var _ContensisDeliveryApi = __webpack_require__(18);

var _navigation = __webpack_require__(21);

function fixFreeTextForElastic(s) {
  var illegalChars = ['>', '<'];
  var encodedChars = ['+', '-', '=', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '\\', '/'];
  var illegalRegEx = new RegExp(illegalChars.map(function (c) {
    return '\\' + c;
  }).join('|'), 'g');
  var encodedRegEx = new RegExp(encodedChars.map(function (c) {
    return '\\' + c;
  }).join('|'), 'g');
  s = s.replace(illegalRegEx, '');
  s = s.replace(encodedRegEx, ''); // (m) => '\\\\' + m);

  return s;
}

var timedSearch =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(query, linkDepth, projectId) {
    var duration, start, payload, end;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            duration = 0;
            start = (0, _performance.now)();
            _context.next = 4;
            return _ContensisDeliveryApi.cachedSearch.search(query, linkDepth, projectId);

          case 4:
            payload = _context.sent;
            end = (0, _performance.now)();
            duration = end - start;
            return _context.abrupt("return", {
              duration: duration,
              payload: payload
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function timedSearch(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.timedSearch = timedSearch;

var extractQuotedPhrases = function extractQuotedPhrases(searchTerm) {
  var pattern = new RegExp(/(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/gm);
  return (searchTerm.match(pattern) || []).map(function (match) {
    return match.replace(/"/g, '');
  });
};

exports.extractQuotedPhrases = extractQuotedPhrases;

var callCustomApi =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(customApi, filters) {
    var uri, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            uri = (0, _navigation.buildUrl)(customApi.get('uri'), filters);

            if (uri) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", null);

          case 3:
            if (typeof window == 'undefined' && uri.startsWith('/')) uri = "http://localhost:3001".concat(uri);
            _context2.next = 6;
            return fetch(uri);

          case 6:
            response = _context2.sent;
            _context2.next = 9;
            return response.json();

          case 9:
            return _context2.abrupt("return", _context2.sent);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function callCustomApi(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.callCustomApi = callCustomApi;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.now = void 0;

var now = function now() {
  if (typeof window == 'undefined') {
    return Date.now();
  }

  return window.performance.now();
};

exports.now = now;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureNodeTreeSaga = ensureNodeTreeSaga;
exports.navigationSagas = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _effects = __webpack_require__(19);

var _ContensisDeliveryApi = __webpack_require__(18);

var _navigation = __webpack_require__(29);

var _navigation2 = __webpack_require__(39);

var _version = __webpack_require__(38);

var _routing = __webpack_require__(6);

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(ensureNodeTreeSaga);

var navigationSagas = [(0, _effects.takeEvery)(_navigation.GET_NODE_TREE, ensureNodeTreeSaga)];
exports.navigationSagas = navigationSagas;

function ensureNodeTreeSaga() {
  var state, deliveryApiVersionStatus, project, nodes;
  return _regenerator["default"].wrap(function ensureNodeTreeSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)();

        case 2:
          state = _context.sent;
          _context.prev = 3;

          if ((0, _navigation2.hasNavigationTree)(state)) {
            _context.next = 21;
            break;
          }

          _context.next = 7;
          return (0, _effects.select)(_version.selectVersionStatus);

        case 7:
          deliveryApiVersionStatus = _context.sent;
          _context.next = 10;
          return (0, _effects.select)(_routing.selectCurrentProject);

        case 10:
          project = _context.sent;
          _context.next = 13;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiVersionStatus, project).nodes.getRoot({
            depth: 2,
            entryFields: 'entryTitle, metaInformation, sys.contentTypeId'
          });

        case 13:
          nodes = _context.sent;

          if (!nodes) {
            _context.next = 19;
            break;
          }

          _context.next = 17;
          return (0, _effects.put)({
            type: _navigation.SET_NODE_TREE,
            nodes: nodes
          });

        case 17:
          _context.next = 21;
          break;

        case 19:
          _context.next = 21;
          return (0, _effects.put)({
            type: _navigation.GET_NODE_TREE_ERROR
          });

        case 21:
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](3);
          _context.next = 27;
          return (0, _effects.put)({
            type: _navigation.GET_NODE_TREE_ERROR,
            error: _context.t0.toString()
          });

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[3, 23]]);
}

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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ReactApp = void 0;

var client = __webpack_require__(96)["default"];

var ReactApp = __webpack_require__(44)["default"];

exports.ReactApp = ReactApp;
var _default = client;
exports["default"] = _default;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(11));

__webpack_require__(50);

var _react = _interopRequireDefault(__webpack_require__(4));

var _reactDom = __webpack_require__(97);

var _reactRouterDom = __webpack_require__(27);

var _reactLoadable = __webpack_require__(49);

var _reactHotLoader = __webpack_require__(31);

var _reactRedux = __webpack_require__(17);

var _queryString = _interopRequireDefault(__webpack_require__(15));

var _immutable = __webpack_require__(2);

var _store = _interopRequireDefault(__webpack_require__(54));

var _index = _interopRequireDefault(__webpack_require__(63));

var _version = __webpack_require__(43);

var _ContensisDeliveryApi = __webpack_require__(18);

var _routing = __webpack_require__(28);

var _pickProject = _interopRequireDefault(__webpack_require__(53));

var _history = __webpack_require__(51);

var ClientApp = function ClientApp(ReactApp, config) {
  (0, _classCallCheck2["default"])(this, ClientApp);
  var documentRoot = document.getElementById('root');
  var routes = config.routes,
      withReducers = config.withReducers,
      withSagas = config.withSagas,
      withEvents = config.withEvents;

  var GetClientJSX = function GetClientJSX(store) {
    var ClientJsx = _react["default"].createElement(_reactHotLoader.AppContainer, null, _react["default"].createElement(_reactRedux.Provider, {
      store: store
    }, _react["default"].createElement(_reactRouterDom.Router, {
      history: _history.browserHistory
    }, _react["default"].createElement(ReactApp, {
      routes: routes,
      withEvents: withEvents
    }))));

    return ClientJsx;
  };

  var isProduction = !(process.env.NODE_ENV != 'production');
  /**
   * Webpack HMR Setup.
   */

  var HMRRenderer = function HMRRenderer(Component) {
    (0, _reactLoadable.preloadReady)().then(function () {
      isProduction ? (0, _reactDom.hydrate)(Component, documentRoot) : (0, _reactDom.render)(Component, documentRoot);
    });
  };

  var store = null;

  var qs = _queryString["default"].parse(window.location.search);

  var versionStatusFromHostname = (0, _ContensisDeliveryApi.GetClientSideDeliveryApiStatus)();

  if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
    store = (0, _store["default"])(withReducers, (0, _immutable.fromJS)(window.REDUX_DATA), _history.browserHistory);
    store.dispatch((0, _version.setVersionStatus)(qs.versionStatus || versionStatusFromHostname));
    /* eslint-disable no-console */

    console.log('Hydrating from inline Redux');
    /* eslint-enable no-console */

    store.runSaga((0, _index["default"])(withSagas));
    store.dispatch((0, _routing.setCurrentProject)((0, _pickProject["default"])(window.location.hostname, qs)));
    delete window.REDUX_DATA;
    HMRRenderer(GetClientJSX(store));
  } else {
    fetch("".concat(window.location.pathname, "?redux=true")).then(function (response) {
      return response.json();
    }).then(function (data) {
      /* eslint-disable no-console */
      //console.log('Got Data Back');
      // console.log(data);

      /* eslint-enable no-console */
      var ssRedux = JSON.parse(data);
      store = (0, _store["default"])(withReducers, (0, _immutable.fromJS)(ssRedux), _history.browserHistory); // store.dispatch(setVersionStatus(versionStatusFromHostname));

      store.runSaga((0, _index["default"])(withSagas));
      store.dispatch((0, _routing.setCurrentProject)((0, _pickProject["default"])(window.location.hostname, _queryString["default"].parse(window.location.search)))); // if (typeof window != 'undefined') {
      //   store.dispatch(checkUserLoggedIn());
      // }

      HMRRenderer(GetClientJSX(store));
    });
  } // webpack Hot Module Replacement API


  if (false) {}
};

var _default = ClientApp;
exports["default"] = _default;

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__97__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=client.js.map