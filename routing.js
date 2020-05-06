(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("react"), require("prop-types"), require("query-string"), require("react-redux"), require("react-router-dom"), require("react-hot-loader"), require("react-router-config"));
	else if(typeof define === 'function' && define.amd)
		define(["immutable", "react", "prop-types", "query-string", "react-redux", "react-router-dom", "react-hot-loader", "react-router-config"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("immutable"), require("react"), require("prop-types"), require("query-string"), require("react-redux"), require("react-router-dom"), require("react-hot-loader"), require("react-router-config")) : factory(root["immutable"], root["react"], root["prop-types"], root["query-string"], root["react-redux"], root["react-router-dom"], root["react-hot-loader"], root["react-router-config"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__13__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__18__, __WEBPACK_EXTERNAL_MODULE__24__, __WEBPACK_EXTERNAL_MODULE__25__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 69);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_ENTRY", function() { return GET_ENTRY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ENTRY", function() { return SET_ENTRY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_NODE", function() { return SET_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ANCESTORS", function() { return SET_ANCESTORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SIBLINGS", function() { return SET_SIBLINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ENTRY_ID", function() { return SET_ENTRY_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ENTRY_RELATED_ARTICLES", function() { return SET_ENTRY_RELATED_ARTICLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_NAVIGATION_NOT_FOUND", function() { return SET_NAVIGATION_NOT_FOUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_NAVIGATION_PATH", function() { return SET_NAVIGATION_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_TARGET_PROJECT", function() { return SET_TARGET_PROJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ROUTE", function() { return SET_ROUTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CALL_HISTORY_METHOD", function() { return CALL_HISTORY_METHOD; });
const ROUTING_PREFIX = '@ROUTING/';
const GET_ENTRY = `${ROUTING_PREFIX}_GET_ENTRY`;
const SET_ENTRY = `${ROUTING_PREFIX}_SET_ENTRY`;
const SET_NODE = `${ROUTING_PREFIX}_SET_NODE`;
const SET_ANCESTORS = `${ROUTING_PREFIX}_SET_ANCESTORS`;
const SET_SIBLINGS = `${ROUTING_PREFIX}_SET_SIBLINGS`;
const SET_ENTRY_ID = `${ROUTING_PREFIX}_SET_ENTRY_ID`;
const SET_ENTRY_RELATED_ARTICLES = `${ROUTING_PREFIX}_SET_ENTRY_RELATED_ARTICLES`;
const SET_NAVIGATION_NOT_FOUND = `${ROUTING_PREFIX}_SET_NOT_FOUND`;
const SET_NAVIGATION_PATH = `${ROUTING_PREFIX}_SET_NAVIGATION_PATH`;
const SET_TARGET_PROJECT = `${ROUTING_PREFIX}_SET_TARGET_PROJECT`;
const SET_ROUTE = `${ROUTING_PREFIX}_SET_ROUTE`;
const CALL_HISTORY_METHOD = `${ROUTING_PREFIX}_CALL_HISTORY_METHOD`;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return action; });
/* unused harmony export getWebPImageUri */
/* unused harmony export resizeImage */
/* unused harmony export resizeImageUri */
/* unused harmony export flattenArray */
/* unused harmony export api */
/* unused harmony export dynamicSort */
/* unused harmony export randomString */
function action(type, payload = {}) {
  return {
    type,
    ...payload
  };
}
const getWebPImageUri = uri => {
  let formatedUri = uri;

  if (uri.indexOf('.gif') == -1) {
    if (uri.indexOf('f=') == -1 && uri.indexOf('format=') == -1) {
      if (uri.indexOf('?') > -1) {
        formatedUri = `${uri}&f=webp`;
      } else {
        formatedUri = `${uri}?f=webp`;
      }
    }

    if (formatedUri.indexOf('q=') == -1 && formatedUri.indexOf('quality=') == -1) {
      if (formatedUri.indexOf('?') > -1) {
        formatedUri = `${formatedUri}&q=70`;
      } else {
        formatedUri = `${formatedUri}?q=70`;
      }
    }
  }

  return formatedUri;
};
const resizeImage = (image, height, width) => {
  if (image.asset && image.asset.sys && image.asset.sys.uri) {
    image.asset.sys.uri = resizeImageUri(image.asset.sys.uri, height, width);
  }
};
const resizeImageUri = (uri, height, width) => {
  let formatedUri = uri;
  let paramDelimeter = '?';

  if (uri.indexOf('?') > -1) {
    paramDelimeter = '&';
  }

  if (width) {
    if (formatedUri.indexOf('w=') == -1 && formatedUri.indexOf('width=') == -1) {
      formatedUri = `${formatedUri}${paramDelimeter}w=${width}`;
      paramDelimeter = '&';
    }
  }

  if (height) {
    if (formatedUri.indexOf('h=') == -1 && formatedUri.indexOf('height=') == -1) {
      formatedUri = `${formatedUri}${paramDelimeter}h=${height}`;
    }
  }

  return formatedUri;
};
function flattenArray(arr) {
  // flatten arrays inside the supplied array and
  // remove duplicates from the result
  return arr.reduce((acc, val) => acc.concat(val), []).filter((elem, pos, arr) => arr.indexOf(elem) == pos);
}
async function api(url, options) {
  return fetch(url, options).then(async response => {
    setTimeout(() => null, 0);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json().then(data => data);
  }).catch(error => {
    //console.log(error);
    throw error;
  });
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
const randomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectUser", function() { return selectUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectUsername", function() { return selectUsername; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectUserLoggedIn", function() { return selectUserLoggedIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectUserGroups", function() { return selectUserGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectUserMessage", function() { return selectUserMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectLoginScreenMode", function() { return selectLoginScreenMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectPasswordMessage", function() { return selectPasswordMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectChangePasswordMessage", function() { return selectChangePasswordMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCaptchaSiteKey", function() { return selectCaptchaSiteKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCaptchaData", function() { return selectCaptchaData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCaptchaResponse", function() { return selectCaptchaResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCaptchaToken", function() { return selectCaptchaToken; });
const selectUser = state => {
  return state.get('user');
};
const selectUsername = state => {
  return state.getIn(['user', 'username']);
};
const selectUserLoggedIn = state => {
  return state.getIn(['user', 'loggedIn']);
};
const selectUserGroups = state => {
  return state.getIn(['user', 'groups']);
};
const selectUserMessage = state => {
  return state.getIn(['user', 'logonResult']);
};
const selectLoginScreenMode = state => {
  return state.getIn(['user', 'loginScreenMode']);
};
const selectPasswordMessage = state => {
  return state.getIn(['user', 'passwordResetMessage']);
};
const selectChangePasswordMessage = state => {
  return state.getIn(['user', 'changePasswordMessage']);
};
const selectCaptchaSiteKey = state => {
  return state.getIn(['user', 'recaptcha', 'key']);
};
const selectCaptchaData = state => {
  return state.getIn(['user', 'recaptcha', 'response']);
};
const selectCaptchaResponse = state => {
  return state.getIn(['user', 'recaptcha', 'response', 'isHuman']);
};
const selectCaptchaToken = state => {
  return state.getIn(['user', 'recaptcha', 'response', 'token']);
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRouteEntry", function() { return selectRouteEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectNodeDepends", function() { return selectNodeDepends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentTreeID", function() { return selectCurrentTreeID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectEntryDepends", function() { return selectEntryDepends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRouteEntryEntryId", function() { return selectRouteEntryEntryId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRouteEntryContentTypeId", function() { return selectRouteEntryContentTypeId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRouteEntrySlug", function() { return selectRouteEntrySlug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRouteEntryID", function() { return selectRouteEntryID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentPath", function() { return selectCurrentPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentSearch", function() { return selectCurrentSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectQueryStringAsObject", function() { return selectQueryStringAsObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentProject", function() { return selectCurrentProject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectIsNotFound", function() { return selectIsNotFound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentAncestors", function() { return selectCurrentAncestors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCurrentNode", function() { return selectCurrentNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectBreadcrumb", function() { return selectBreadcrumb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRouteLoading", function() { return selectRouteLoading; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);


const selectRouteEntry = state => {
  return state.getIn(['routing', 'entry'], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])({}));
};
const selectNodeDepends = state => {
  return state.getIn(['routing', 'nodeDepends'], new immutable__WEBPACK_IMPORTED_MODULE_0__["List"]([]));
};
const selectCurrentTreeID = state => {
  return state.getIn(['routing', 'currentTreeId']);
};
const selectEntryDepends = state => {
  return state.getIn(['routing', 'entryDepends']);
};
const selectRouteEntryEntryId = state => {
  return state.getIn(['routing', 'entry', 'sys', 'id'], null);
};
const selectRouteEntryContentTypeId = state => {
  const entry = selectRouteEntry(state);
  return entry && entry.getIn(['sys', 'contentTypeId'], null);
};
const selectRouteEntrySlug = state => {
  return state.getIn(['routing', 'entry', 'sys', 'slug'], null);
};
const selectRouteEntryID = state => {
  return state.getIn(['routing', 'entryID']);
};
const selectCurrentPath = state => {
  return state.getIn(['routing', 'currentPath']);
};
const selectCurrentSearch = state => {
  return state.getIn(['routing', 'location', 'search']);
};
const selectQueryStringAsObject = state => Object(_util_navigation__WEBPACK_IMPORTED_MODULE_1__[/* queryParams */ "b"])(selectCurrentSearch(state));
const selectCurrentProject = state => {
  return state.getIn(['routing', 'currentProject']);
};
const selectIsNotFound = state => {
  return state.getIn(['routing', 'notFound']);
};
const selectCurrentAncestors = state => {
  return state.getIn(['routing', 'currentNodeAncestors'], new immutable__WEBPACK_IMPORTED_MODULE_0__["List"]());
};
const selectCurrentNode = state => {
  return state.getIn(['routing', 'currentNode']);
};
const selectBreadcrumb = state => {
  return (selectCurrentAncestors(state) || new immutable__WEBPACK_IMPORTED_MODULE_0__["List"]()).push(selectCurrentNode(state));
};
const selectRouteLoading = state => {
  return state.getIn(['routing', 'isLoading']);
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__16__;

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__18__;

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return queryParams; });
/* unused harmony export routeParams */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildUrl; });
/* unused harmony export clientHostname */
/* unused harmony export addHostname */
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_0__);

function queryParams(search) {
  return query_string__WEBPACK_IMPORTED_MODULE_0___default.a.parse(typeof window != 'undefined' ? window.location.search : search);
}
const routeParams = staticRoute => staticRoute && staticRoute.match ? staticRoute.match.params : {};
const buildUrl = (route, params) => {
  const qs = query_string__WEBPACK_IMPORTED_MODULE_0___default.a.stringify(params);
  const path = qs ? `${route}?${qs}` : route;
  return path;
};
const clientHostname = () => `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const addHostname = typeof window == 'undefined' || window.location.host == 'localhost:3000' ? `https://${PUBLIC_URI
/* global PUBLIC_URI */
}` : clientHostname();

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toJS; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_1__);


const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    newProps[wrappedComponentProp[KEY]] = immutable__WEBPACK_IMPORTED_MODULE_1__["Iterable"].isIterable(wrappedComponentProp[VALUE]) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
    return newProps;
  }, {});
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedComponent, propsJS);
};

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNotFound", function() { return setNotFound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNavigationPath", function() { return setNavigationPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCurrentProject", function() { return setCurrentProject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRoute", function() { return setRoute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRouteEntry", function() { return setRouteEntry; });
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _types_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


const setNotFound = notFound => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* action */ "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_NAVIGATION_NOT_FOUND"], {
  notFound
});
const setNavigationPath = (path, location, staticRoute, withEvents, statePath, routes) => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* action */ "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_NAVIGATION_PATH"], {
  path,
  location,
  staticRoute,
  withEvents,
  statePath,
  routes
});
const setCurrentProject = (project, allowedGroups) => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* action */ "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_TARGET_PROJECT"], {
  project,
  allowedGroups
});
const setRoute = (path, state) => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* action */ "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_ROUTE"], {
  path,
  state
});
const setRouteEntry = entry => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* action */ "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_ENTRY"], {
  entry
});

/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__24__;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__25__;

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);
/* harmony import */ var react_router_config__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_config__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _redux_selectors_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _redux_actions_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);
/* harmony import */ var _pages_NotFound__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(34);
/* harmony import */ var _Status__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(35);
/* harmony import */ var _util_ToJs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(21);
/* harmony import */ var _features_login_redux_selectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7);













const getTrimmedPath = path => {
  if (path !== '/') {
    const lastChar = path[path.length - 1];

    if (lastChar == '/') {
      return path.substring(0, path.length - 1);
    }
  }

  return path;
};

const RouteLoader = ({
  statePath,
  projectId,
  contentTypeId,
  entry,
  isLoading,
  isLoggedIn,
  isNotFound,
  loadingComponent,
  notFoundComponent,
  setNavigationPath,
  routes,
  withEvents
}) => {
  const location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["useLocation"])(); // Match any Static Routes a developer has defined

  const matchedStaticRoute = () => Object(react_router_config__WEBPACK_IMPORTED_MODULE_5__["matchRoutes"])(routes.StaticRoutes, location.pathname);

  const isStaticRoute = () => matchedStaticRoute().length > 0;

  const trimmedPath = getTrimmedPath(location.pathname);
  const staticRoute = isStaticRoute() && matchedStaticRoute()[0];
  const setPath = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    let serverPath = null;

    if (staticRoute && staticRoute.match && staticRoute.match.isExact) {
      serverPath = staticRoute.route.path.split('/').filter(p => !p.startsWith(':')).join('/');
    }

    setNavigationPath(serverPath || trimmedPath, location, staticRoute, withEvents, statePath, routes); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNavigationPath, // staticRoute,
  withEvents, location, routes, // statePath,
  trimmedPath]);
  if (typeof window == 'undefined') setPath();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setPath();
  }, [location, setPath]); // Need to redirect when url endswith a /

  if (location.pathname.length > trimmedPath.length) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Redirect"], {
      to: trimmedPath
    });
  } // Render any Static Routes a developer has defined


  if (isStaticRoute(trimmedPath)) {
    return Object(react_router_config__WEBPACK_IMPORTED_MODULE_5__["renderRoutes"])(routes.StaticRoutes, {
      projectId,
      contentTypeId,
      entry,
      isLoggedIn
    });
  } // Render a supplied Loading component if the route
  // is not a static route and is in a loading state


  if (isLoading && !isNotFound && loadingComponent) {
    const LoadingComponent = loadingComponent;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LoadingComponent, null);
  } // Match any defined Content Type Mappings


  if (contentTypeId) {
    const MatchedComponent = routes.ContentTypeMappings.find(item => item.contentTypeID == contentTypeId);

    if (MatchedComponent) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MatchedComponent.component, {
        projectId: projectId,
        contentTypeId: contentTypeId,
        entry: entry,
        isLoggedIn: isLoggedIn
      });
    }
  }

  const NotFoundComponent = notFoundComponent ? notFoundComponent : _pages_NotFound__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"];

  if (isNotFound) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Status__WEBPACK_IMPORTED_MODULE_9__[/* Status */ "a"], {
      code: 404
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NotFoundComponent, null));
  }

  return null;
};

RouteLoader.propTypes = {
  contentTypeId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  entry: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isLoggedIn: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isNotFound: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  loadingComponent: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  notFoundComponent: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  projectId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  routes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array),
  setNavigationPath: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  statePath: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  withEvents: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};

const mapStateToProps = state => {
  return {
    statePath: Object(_redux_selectors_routing__WEBPACK_IMPORTED_MODULE_6__["selectCurrentPath"])(state),
    projectId: Object(_redux_selectors_routing__WEBPACK_IMPORTED_MODULE_6__["selectCurrentProject"])(state),
    entry: Object(_redux_selectors_routing__WEBPACK_IMPORTED_MODULE_6__["selectRouteEntry"])(state),
    contentTypeId: Object(_redux_selectors_routing__WEBPACK_IMPORTED_MODULE_6__["selectRouteEntryContentTypeId"])(state),
    isNotFound: Object(_redux_selectors_routing__WEBPACK_IMPORTED_MODULE_6__["selectIsNotFound"])(state),
    isLoggedIn: Object(_features_login_redux_selectors__WEBPACK_IMPORTED_MODULE_11__["selectUserLoggedIn"])(state),
    isLoading: Object(_redux_selectors_routing__WEBPACK_IMPORTED_MODULE_6__["selectRouteLoading"])(state)
  };
};

const mapDispatchToProps = {
  setNavigationPath: _redux_actions_routing__WEBPACK_IMPORTED_MODULE_7__["setNavigationPath"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Object(_util_ToJs__WEBPACK_IMPORTED_MODULE_10__[/* toJS */ "a"])(RouteLoader))));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(44)(module)))

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const NotFound = () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "404 Page Not Found")));

/* harmony default export */ __webpack_exports__["a"] = (NotFound);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Status; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);



const Status = ({
  code,
  children
}) => {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
    render: ({
      staticContext
    }) => {
      if (staticContext) staticContext.status = code;
      return children;
    }
  });
};
Status.propTypes = {
  code: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element
};

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_routes_RouteLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);




const AppRoot = props => {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_routes_RouteLoader__WEBPACK_IMPORTED_MODULE_2__["default"], props);
};

/* harmony default export */ __webpack_exports__["default"] = (AppRoot);

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
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
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports.types = __webpack_require__(3);
exports.actions = __webpack_require__(22);
exports.selectors = __webpack_require__(8);

const ReactApp = __webpack_require__(43).default;

const RouteLoader = __webpack_require__(30).default;

exports.ReactApp = ReactApp;
exports.RouteLoader = RouteLoader;

/***/ })
/******/ ]);
});
//# sourceMappingURL=routing.js.map