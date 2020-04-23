(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("react"), require("query-string"), require("react-redux"), require("@redux-saga/core/effects"), require("js-cookie"));
	else if(typeof define === 'function' && define.amd)
		define(["immutable", "react", "query-string", "react-redux", "@redux-saga/core/effects", "js-cookie"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("immutable"), require("react"), require("query-string"), require("react-redux"), require("@redux-saga/core/effects"), require("js-cookie")) : factory(root["immutable"], root["react"], root["query-string"], root["react-redux"], root["@redux-saga/core/effects"], root["js-cookie"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__13__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__27__, __WEBPACK_EXTERNAL_MODULE__28__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "all")) __webpack_require__.d(__webpack_exports__, "all", function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["all"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "call")) __webpack_require__.d(__webpack_exports__, "call", function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["call"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "fork")) __webpack_require__.d(__webpack_exports__, "fork", function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["fork"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "put")) __webpack_require__.d(__webpack_exports__, "put", function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["put"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "select")) __webpack_require__.d(__webpack_exports__, "select", function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["select"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "takeEvery")) __webpack_require__.d(__webpack_exports__, "takeEvery", function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"]; });




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_USER", function() { return UPDATE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGIN_USER", function() { return LOGIN_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGIN_SUCCESSFUL", function() { return LOGIN_SUCCESSFUL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGIN_FAILED", function() { return LOGIN_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGOUT_USER", function() { return LOGOUT_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOGGLE_LOGIN_MODE", function() { return TOGGLE_LOGIN_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CREATE_USER_ACCOUNT", function() { return CREATE_USER_ACCOUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATE_USER", function() { return VALIDATE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATE_USER_SUCCESS", function() { return VALIDATE_USER_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATE_USER_FAILED", function() { return VALIDATE_USER_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORGOT_USER_PASSWORD", function() { return FORGOT_USER_PASSWORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORGOT_USER_PASSWORD_COMPLETE", function() { return FORGOT_USER_PASSWORD_COMPLETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_USER_PASSWORD", function() { return CHANGE_USER_PASSWORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_USER_PASSWORD_FAILED", function() { return CHANGE_USER_PASSWORD_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_USER_PASSWORD_COMPLETE", function() { return CHANGE_USER_PASSWORD_COMPLETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_RECAPTCHA_KEY", function() { return SET_RECAPTCHA_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_RECAPTCHA_RESPONSE", function() { return SET_RECAPTCHA_RESPONSE; });
const ACTION_PREFIX = '@USER/';
const UPDATE_USER = `${ACTION_PREFIX}UPDATE_USER`;
const LOGIN_USER = `${ACTION_PREFIX}LOGIN_USER`;
const LOGIN_SUCCESSFUL = `${ACTION_PREFIX}LOGIN_SUCCESSFUL`;
const LOGIN_FAILED = `${ACTION_PREFIX}LOGIN_FAILED`;
const LOGOUT_USER = `${ACTION_PREFIX}LOGOUT_USER`;
const TOGGLE_LOGIN_MODE = `${ACTION_PREFIX}TOGGLE_LOGIN_MODE`;
const CREATE_USER_ACCOUNT = `${ACTION_PREFIX}CREATE_USER_ACCOUNT`;
const VALIDATE_USER = `${ACTION_PREFIX}VALIDATE_USER`;
const VALIDATE_USER_SUCCESS = `${ACTION_PREFIX}VALIDATE_USER_SUCCESS`;
const VALIDATE_USER_FAILED = `${ACTION_PREFIX}VALIDATE_USER_FAILED`;
const FORGOT_USER_PASSWORD = `${ACTION_PREFIX}FORGOT_USER_PASSWORD`;
const FORGOT_USER_PASSWORD_COMPLETE = `${ACTION_PREFIX}FORGOT_USER_PASSWORD_COMPLETE`;
const CHANGE_USER_PASSWORD = `${ACTION_PREFIX}CHANGE_USER_PASSWORD`;
const CHANGE_USER_PASSWORD_FAILED = `${ACTION_PREFIX}CHANGE_USER_PASSWORD_FAILED`;
const CHANGE_USER_PASSWORD_COMPLETE = `${ACTION_PREFIX}CHANGE_USER_PASSWORD_COMPLETE`;
const SET_RECAPTCHA_KEY = `${ACTION_PREFIX}SET_RECAPTCHA_KEY`;
const SET_RECAPTCHA_RESPONSE = `${ACTION_PREFIX}SET_RECAPTCHA_RESPONSE`;

/***/ }),
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
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "js-cookie"
var external_js_cookie_ = __webpack_require__(28);
var external_js_cookie_default = /*#__PURE__*/__webpack_require__.n(external_js_cookie_);

// CONCATENATED MODULE: ./src/app/features/login/util/CookieHelper.class.js

const COOKIE_VALID_DAYS = 1; // 0 = Session cookie
// Override the default js-cookie conversion / encoding
// methods so the written values work with Contensis sites

const _cookie = external_js_cookie_default.a.withConverter({
  read: value => decodeURIComponent(value),
  write: value => encodeURIComponent(value)
});

class CookieHelper {
  static GetCookie(name) {
    return _cookie.get(name);
  }

  static SetCookie(name, value, maxAgeDays = COOKIE_VALID_DAYS) {
    maxAgeDays === 0 ? _cookie.set(name, value) : _cookie.set(name, value, {
      expires: maxAgeDays
    });
  }

  static DeleteCookie(name) {
    _cookie.remove(name);
  }

}
// EXTERNAL MODULE: ./src/app/features/login/util/SecurityApi.class.js
var SecurityApi_class = __webpack_require__(11);

// EXTERNAL MODULE: ./src/app/features/login/redux/reducers.js
var reducers = __webpack_require__(14);

// CONCATENATED MODULE: ./src/app/features/login/util/LoginHelper.class.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginHelper", function() { return LoginHelper_class_LoginHelper; });
// import { ajax } from 'jquery';
// import queryString from 'query-string';


 // import { randomString } from '~/core/util/helpers';
// import userManager from './oidc/userManager';

const LOGIN_COOKIE = 'ContensisCMSUserName';
const LAST_USERNAME_COOKIE = 'ContensisLastUserName';
const DISPLAY_NAME_COOKIE = 'ContensisDisplayName';
const USER_LANGUAGE_COOKIE = 'User_LanguageID';
const AVATAR_COOKIE = 'ContensisAvatar'; // const contensis = CONTENSIS; /* global CONTENSIS */

class LoginHelper_class_LoginHelper {
  static GetLoginCookie() {
    return CookieHelper.GetCookie(LOGIN_COOKIE);
  }

  static SetLoginCookies(user) {
    if (user.securityToken) CookieHelper.SetCookie(LOGIN_COOKIE, user.securityToken);

    if (user.username) {
      CookieHelper.SetCookie(LAST_USERNAME_COOKIE, user.username);
      CookieHelper.SetCookie(DISPLAY_NAME_COOKIE, user.username);
    }
  }

  static GetCachedCredentials() {
    return {
      securityToken: CookieHelper.GetCookie(LOGIN_COOKIE),
      username: CookieHelper.GetCookie(LAST_USERNAME_COOKIE),
      displayName: CookieHelper.GetCookie(DISPLAY_NAME_COOKIE),
      languageId: CookieHelper.GetCookie(USER_LANGUAGE_COOKIE),
      avatar: CookieHelper.GetCookie(AVATAR_COOKIE)
    };
  }

  static GetCachedCredentialsSSR(cookies) {
    return {
      securityToken: cookies[LOGIN_COOKIE],
      username: cookies[LAST_USERNAME_COOKIE],
      displayName: cookies[DISPLAY_NAME_COOKIE],
      languageId: cookies[USER_LANGUAGE_COOKIE],
      avatar: cookies[AVATAR_COOKIE]
    };
  }

  static ClearCachedCredentials() {
    CookieHelper.DeleteCookie(LOGIN_COOKIE);
    CookieHelper.DeleteCookie(LAST_USERNAME_COOKIE);
    CookieHelper.DeleteCookie(DISPLAY_NAME_COOKIE);
    CookieHelper.DeleteCookie(USER_LANGUAGE_COOKIE);
    CookieHelper.DeleteCookie(AVATAR_COOKIE);
  }

  static async ValidateUser(groups = false, cookies = null) {
    const cached = cookies ? this.GetCachedCredentialsSSR(cookies) : this.GetCachedCredentials();

    if (cached.securityToken) {
      const response = await SecurityApi_class["a" /* SecurityApi */].ValidateUser(cached.securityToken);
      if (!response) return false; // Convert result to a User object

      const user = {
        username: cached.username,
        securityToken: encodeURIComponent(response.SecurityToken),
        logonResult: response.LogonResult,
        id: response.UserID,
        loginScreenMode: 'login'
      };

      if (user.logonResult !== 0) {
        // Clear the cookie cache so we don't need to validate again
        LoginHelper_class_LoginHelper.ClearCachedCredentials();
      } else {
        // Set logged in flag
        user.loggedIn = true;

        if (groups) {
          const userWithGroups = await this.GetGroups(user);
          return userWithGroups;
        }
      }

      return user;
    }

    return false;
  }

  static async LoginUser(username, password, groups = false) {
    if (username && password) {
      // Call LogonUser API
      const loginResponse = await SecurityApi_class["a" /* SecurityApi */].LogonUser(username, password);

      if (loginResponse) {
        // Extract the elements we need from the response
        const {
          SecurityToken,
          LogonResult,
          UserID
        } = loginResponse;
        const failedLogin = !!LogonResult; // 0 is successful
        // Map response to new user object

        const user = {
          username,
          failedLogin,
          loggedIn: !!SecurityToken && !failedLogin,
          securityToken: SecurityToken,
          id: UserID,
          logonResult: this.CheckResult(LogonResult)
        };

        if (!user.failedLogin && !!user.securityToken) {
          this.SetLoginCookies(user);

          if (groups) {
            const userWithGroups = await this.GetGroups(user);
            return userWithGroups;
          }
        }

        return user;
      } else {
        // Create user object to show login failed due to service fault
        return {
          securityToken: null,
          loggedIn: false,
          failedLogin: true,
          logonResult: 'Service Fault'
        };
      }
    }
  }

  static async GetGroups(user) {
    if (!user.securityToken) {
      return user;
    }

    const userInfoResponse = await SecurityApi_class["a" /* SecurityApi */].GetUserInfo(user.securityToken);

    if (userInfoResponse) {
      const response = JSON.parse(userInfoResponse);

      if (response.Error || !response.GroupCollection) {
        user.errorMessage = `Problem fetching user info: ${response.Error}`;
      } else {
        user.groups = response.GroupCollection.map(group => ({
          name: group.GroupName,
          id: group.GroupId
        }));
        user.fullName = response.Fullname;
        user.emailAddress = response.Email;
      }
    }

    return user;
  }

  static LogoutUser() {
    this.ClearCachedCredentials();
    return reducers["b" /* initialUserState */].toJS();
  }

  static ClientRedirectToLogin(uri) {
    if (typeof window != 'undefined') {
      window.location.href = LoginHelper_class_LoginHelper.LoginPageUrl(uri); // LoginHelper.IsWsFedSignin()
      // ? LoginHelper.WsFedLoginPageUrl(window.location)
      // : LoginHelper.LoginPageUrl(uri);
    }
  }

  static LoginPageUrl(uri) {
    return `${uri || '/login'}?redirect_uri=${window.location.pathname + window.location.search}`;
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


  static async ForgotPassword(username) {
    if (username) {
      const currentUrl = window.location.protocol + '//' + window.location.host;
      const passwordResponse = await SecurityApi_class["a" /* SecurityApi */].ForgotPassword(username, currentUrl);

      if (passwordResponse) {
        // Extract the elements we need from the response
        return passwordResponse;
      }
    }
  }

  static async ChangePassword(username, oldPassword, newPassword, newPasswordConfirm) {
    if (newPassword && newPasswordConfirm) {
      if (this.ValidatePassword(newPassword)) {
        const passwordResponse = await SecurityApi_class["a" /* SecurityApi */].ChangePassword(username, oldPassword, newPassword, newPasswordConfirm); //const passwordResponse = await SecurityApi.ChangePassword(btoa(username), btoa(oldPassword), btoa(newPassword), btoa(newPasswordConfirm));

        if (passwordResponse) {
          // Extract the elements we need from the response
          return passwordResponse;
        }
      } else {
        return 'New password does not meet the requirements: \r\n\r\n - Must be a minimum of 8 characters long \r\n - Must contain at least 1 uppercase character \r\n - Must contain at least 1 special character or number';
      }
    }
  }

  static async ChangePasswordWithToken(token, newPassword, newPasswordConfirm) {
    if (newPassword && newPasswordConfirm) {
      if (this.ValidatePassword(newPassword)) {
        const passwordResponse = await SecurityApi_class["a" /* SecurityApi */].ChangePasswordWithToken(token, btoa(newPassword), btoa(newPasswordConfirm)); //const passwordResponse = await SecurityApi.ChangePassword(btoa(username), btoa(oldPassword), btoa(newPassword), btoa(newPasswordConfirm));

        if (passwordResponse) {
          // Extract the elements we need from the response
          return passwordResponse;
        }
      } else {
        return 'New password does not meet the requirements: \r\n\r\n - Must be a minimum of 8 characters long \r\n - Must contain at least 1 uppercase character \r\n - Must contain at least 1 special character or number';
      }
    }
  }

  static ValidatePassword(pword) {
    //Password must be over 8 characters long
    if (pword.length < 8) return false; //This only returns true if the following criteria is met:
    //  *8 chars or more
    //  *Must contain at least 1 capital letter
    //  *Must contain at least 1 number or special character

    return /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/.test(pword);
  }

  static CheckResult(result) {
    const Results = {
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

}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurityApi; });
const CMS_URL = SERVERS.cms;
/* global SERVERS */

const config = {
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
const REGISTER_USER_URL = `${CMS_URL}/${config.REGISTER_USER_URI}`;
const LOGON_USER_URL = `${CMS_URL}/${config.LOGON_USER_URI}`;
const VALIDATE_USER_URL = `${CMS_URL}/${config.VALIDATE_USER_URI}`;
const USER_INFO_URL = `${CMS_URL}/${config.USER_INFO_URI}`;
const FORGOT_PASSWORD_URI = `/${config.FORGOT_PASSWORD_URI}`;
const CHANGE_PASSWORD_URI = `/${config.CHANGE_PASSWORD_URI}`;
const AUTH_CAPTCHA_URI = `/${config.AUTH_CAPTCHA_URI}`;
const CHANGE_PASSWORD_TOKEN_URI = `/${config.CHANGE_PASSWORD_TOKEN_URI}`;
const BASE_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};
class SecurityApi {
  static async AuthoriseRecaptcha(token) {
    const url = `${AUTH_CAPTCHA_URI}?captchaToken=${encodeURIComponent(token)}`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    return await SecurityApi.get(url, options);
  }

  static async LogonUser(username, password) {
    const body = {
      username,
      password,
      ip: '127.0.0.1',
      applicationName: 'DesktopTool'
    };
    const options = { ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body)
    };
    return await SecurityApi.get(LOGON_USER_URL, options);
  }

  static async ValidateUser(securityToken) {
    const url = `${VALIDATE_USER_URL}?token=${encodeURIComponent(securityToken)}`;
    const bodyToken = encodeURIComponent(decodeURIComponent(decodeURIComponent(securityToken)));
    const options = { ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify({
        securityToken: bodyToken
      })
    };
    return await SecurityApi.get(url, options);
  }

  static async GetUserInfo(securityToken) {
    const options = { ...BASE_OPTIONS,
      headers: {
        ['Content-Type']: 'text/plain',
        ContensisCMSUserName: securityToken
      }
    };
    return await SecurityApi.get(USER_INFO_URL, options);
  }

  static async RegisterUser(email, password) {
    const body = {
      email,
      password
    };
    const options = { ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body)
    };
    return await SecurityApi.get(REGISTER_USER_URL, options);
  }

  static async ChangePassword(username, oldPassword, newPassword, newPasswordConfirm) {
    const url = `${CHANGE_PASSWORD_URI}?username=${encodeURIComponent(username)}&oldPassword=${encodeURIComponent(oldPassword)}&newPassword=${encodeURIComponent(newPassword)}&newPasswordConfirm=${encodeURIComponent(newPasswordConfirm)}`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    return await SecurityApi.get(url, options);
  }

  static async ChangePasswordWithToken(token, newPassword, newPasswordConfirm) {
    const url = `${CHANGE_PASSWORD_TOKEN_URI}?token=${token}&newPassword=${encodeURIComponent(newPassword)}&confirmPassword=${encodeURIComponent(newPasswordConfirm)}`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    return await SecurityApi.get(url, options);
  }

  static async ForgotPassword(username, currentUrl) {
    const url = `${FORGOT_PASSWORD_URI}?username=${encodeURIComponent(username)}&currentUrl=${encodeURIComponent(currentUrl)}`;
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    return await SecurityApi.get(url, options);
  }

  static async get(url, options = BASE_OPTIONS) {
    try {
      const responseBody = await api(url, options);
      if (responseBody) return responseBody;
      return false;
    } catch (error) {
      return false;
    }
  }

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

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return initialUserState; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


const initialUserState = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])({
  loggedIn: false,
  failedLogin: null,
  username: null,
  id: null,
  securityToken: null,
  logonResult: null,
  groups: new immutable__WEBPACK_IMPORTED_MODULE_0__["List"]([]),
  emailAddress: null,
  fullName: null,
  loginScreenMode: 'login',
  passwordReset: false,
  passwordResetMessage: null,
  changePasswordMessage: null,
  recaptcha: new immutable__WEBPACK_IMPORTED_MODULE_0__["Map"]({
    key: null,
    response: new immutable__WEBPACK_IMPORTED_MODULE_0__["Map"]({
      isHuman: false,
      token: null
    })
  })
});
/* harmony default export */ __webpack_exports__["a"] = ((state = initialUserState, action) => {
  switch (action.type) {
    case _types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_USER"]:
      {
        const {
          user
        } = action;
        return state.set('loggedIn', typeof user.loggedIn !== 'undefined' ? user.loggedIn : state.get('loggedIn')).set('failedLogin', typeof user.failedLogin !== 'undefined' ? user.failedLogin : state.get('failedLogin')).set('username', user.username || state.get('username')).set('id', user.id || state.get('id')).set('securityToken', user.securityToken || state.get('securityToken')).set('logonResult', user.logonResult || state.get('logonResult')).set('groups', Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(user.groups) || state.get('groups')).set('emailAddress', user.emailAddress || state.get('emailAddress')).set('fullName', user.fullName || state.get('fullName')).set('passwordReset', typeof user.passwordReset !== 'undefined' ? user.passwordReset : state.get('passwordReset')).set('passwordResetMessage', user.passwordResetMessage || state.get('passwordResetMessage')).set('changePasswordMessage', user.changePasswordMessage || state.get('changePasswordMessage'));
      }

    case _types__WEBPACK_IMPORTED_MODULE_1__["TOGGLE_LOGIN_MODE"]:
      {
        const newMode = action.loginMode;
        return state.set('loginScreenMode', newMode);
      }

    case _types__WEBPACK_IMPORTED_MODULE_1__["SET_RECAPTCHA_KEY"]:
      {
        return state.setIn(['recaptcha', 'key'], action.key);
      }

    case _types__WEBPACK_IMPORTED_MODULE_1__["SET_RECAPTCHA_RESPONSE"]:
      {
        return state.setIn(['recaptcha', 'response', 'isHuman'], action.isHuman).setIn(['recaptcha', 'response', 'token'], action.token);
      }

    default:
      return state;
  }
});

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__16__;

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var actions_namespaceObject = {};
__webpack_require__.r(actions_namespaceObject);
__webpack_require__.d(actions_namespaceObject, "loginUser", function() { return loginUser; });
__webpack_require__.d(actions_namespaceObject, "validateUser", function() { return validateUser; });
__webpack_require__.d(actions_namespaceObject, "logoutUser", function() { return logoutUser; });
__webpack_require__.d(actions_namespaceObject, "toggleLoginMode", function() { return toggleLoginMode; });
__webpack_require__.d(actions_namespaceObject, "createUserAccount", function() { return createUserAccount; });
__webpack_require__.d(actions_namespaceObject, "forgotPassword", function() { return forgotPassword; });
__webpack_require__.d(actions_namespaceObject, "changePassword", function() { return changePassword; });
__webpack_require__.d(actions_namespaceObject, "changePasswordWithToken", function() { return changePasswordWithToken; });
__webpack_require__.d(actions_namespaceObject, "setRecaptchaKey", function() { return setRecaptchaKey; });
__webpack_require__.d(actions_namespaceObject, "setRecaptchaResponse", function() { return setRecaptchaResponse; });

// EXTERNAL MODULE: ./src/app/core/util/helpers.js
var helpers = __webpack_require__(4);

// EXTERNAL MODULE: ./src/app/features/login/redux/types.js
var types = __webpack_require__(1);

// CONCATENATED MODULE: ./src/app/features/login/redux/actions.js


const loginUser = (username, password) => Object(helpers["a" /* action */])(types["LOGIN_USER"], {
  username,
  password
});
const validateUser = cookies => Object(helpers["a" /* action */])(types["VALIDATE_USER"], {
  cookies
});
const logoutUser = () => Object(helpers["a" /* action */])(types["LOGOUT_USER"]);
const toggleLoginMode = loginMode => Object(helpers["a" /* action */])(types["TOGGLE_LOGIN_MODE"], {
  loginMode
});
const createUserAccount = () => Object(helpers["a" /* action */])(types["CREATE_USER_ACCOUNT"]);
const forgotPassword = username => Object(helpers["a" /* action */])(types["FORGOT_USER_PASSWORD"], {
  username
});
const changePassword = (oldPassword, newPassword, newPasswordConfirm) => Object(helpers["a" /* action */])(types["CHANGE_USER_PASSWORD"], {
  oldPassword,
  newPassword,
  newPasswordConfirm
});
const changePasswordWithToken = (token, newPassword, newPasswordConfirm) => Object(helpers["a" /* action */])(types["CHANGE_USER_PASSWORD"], {
  token,
  newPassword,
  newPasswordConfirm
});
const setRecaptchaKey = key => Object(helpers["a" /* action */])(types["SET_RECAPTCHA_KEY"], {
  key
});
const setRecaptchaResponse = (isHuman, token) => Object(helpers["a" /* action */])(types["SET_RECAPTCHA_RESPONSE"], {
  isHuman,
  token
});
// EXTERNAL MODULE: ./src/app/features/login/redux/selectors.js
var selectors = __webpack_require__(7);

// EXTERNAL MODULE: ./src/app/features/login/redux/reducers.js
var reducers = __webpack_require__(14);

// EXTERNAL MODULE: ./src/app/features/login/redux/sagas.js
var sagas = __webpack_require__(23);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(16);

// EXTERNAL MODULE: ./src/app/core/util/ToJs.js
var ToJs = __webpack_require__(21);

// EXTERNAL MODULE: ./src/app/core/redux/selectors/routing.js
var routing = __webpack_require__(8);

// CONCATENATED MODULE: ./src/app/features/login/components/withLogin.js






const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLogin = WrappedComponent => {
  // Returns a redux-connected component with the following props:
  // this.propTypes = {
  //   loginUser: PropTypes.func,
  //   logoutUser: PropTypes.func,
  //   user: PropTypes.object,
  // };
  const mapStateToProps = state => {
    return {
      user: Object(selectors["selectUser"])(state),
      userMessage: Object(selectors["selectUserMessage"])(state),
      screenMode: Object(selectors["selectLoginScreenMode"])(state),
      passwordMessage: Object(selectors["selectPasswordMessage"])(state),
      changePasswordMessage: Object(selectors["selectChangePasswordMessage"])(state),
      captchaSiteKey: Object(selectors["selectCaptchaSiteKey"])(state),
      isHuman: Object(selectors["selectCaptchaResponse"])(state),
      isLoggedIn: Object(selectors["selectUserLoggedIn"])(state),
      currentPath: Object(routing["selectCurrentPath"])(state),
      queryString: Object(routing["selectQueryStringAsObject"])(state)
    };
  };

  const mapDispatchToProps = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    toggleLoginMode: toggleLoginMode,
    forgotPassword: forgotPassword,
    changePassword: changePassword,
    changePasswordWithToken: changePasswordWithToken,
    captchaResponse: setRecaptchaResponse
  };
  const ConnectedComponent = Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(Object(ToJs["a" /* toJS */])(WrappedComponent));
  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  return ConnectedComponent;
};

/* harmony default export */ var components_withLogin = (withLogin);
// CONCATENATED MODULE: ./src/app/features/login/index.js
/* concated harmony reexport actions */__webpack_require__.d(__webpack_exports__, "actions", function() { return actions_namespaceObject; });
/* concated harmony reexport selectors */__webpack_require__.d(__webpack_exports__, "selectors", function() { return selectors; });
/* concated harmony reexport types */__webpack_require__.d(__webpack_exports__, "types", function() { return types; });
/* concated harmony reexport reducer */__webpack_require__.d(__webpack_exports__, "reducer", function() { return reducers["a" /* default */]; });
/* concated harmony reexport sagas */__webpack_require__.d(__webpack_exports__, "sagas", function() { return sagas["a" /* userSagas */]; });
/* concated harmony reexport withLogin */__webpack_require__.d(__webpack_exports__, "withLogin", function() { return components_withLogin; });








/***/ }),
/* 18 */,
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
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return userSagas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return validateUserSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _core_redux_types_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _core_redux_selectors_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var _util_LoginHelper_class__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
/* harmony import */ var _util_SecurityApi_class__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11);









const userSagas = [Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_types__WEBPACK_IMPORTED_MODULE_2__["LOGIN_USER"], loginUserSaga), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_types__WEBPACK_IMPORTED_MODULE_2__["LOGOUT_USER"], logoutUserSaga), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_types__WEBPACK_IMPORTED_MODULE_2__["VALIDATE_USER"], validateUserSaga), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_types__WEBPACK_IMPORTED_MODULE_2__["CREATE_USER_ACCOUNT"], createUserAccountSaga), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_types__WEBPACK_IMPORTED_MODULE_2__["FORGOT_USER_PASSWORD"], forgotPassword), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_types__WEBPACK_IMPORTED_MODULE_2__["CHANGE_USER_PASSWORD"], changePassword)];

function* loginUserSaga(action) {
  const getGroups = true;
  const {
    username,
    password
  } = action;

  if (username && password) {
    const user = yield _util_LoginHelper_class__WEBPACK_IMPORTED_MODULE_7__["LoginHelper"].LoginUser(username, password, getGroups);
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(updateUserSaga, {
      type: user.failedLogin ? _types__WEBPACK_IMPORTED_MODULE_2__["LOGIN_FAILED"] : _types__WEBPACK_IMPORTED_MODULE_2__["LOGIN_SUCCESSFUL"],
      user,
      redirect: !user.failedLogin
    });
  } else {
    yield _util_LoginHelper_class__WEBPACK_IMPORTED_MODULE_7__["LoginHelper"].ClientRedirectToLogin();
  }
}

function* logoutUserSaga() {
  const user = _util_LoginHelper_class__WEBPACK_IMPORTED_MODULE_7__["LoginHelper"].LogoutUser();
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(updateUserSaga, {
    user
  });
  const state = yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["select"])();
  yield _util_LoginHelper_class__WEBPACK_IMPORTED_MODULE_7__["LoginHelper"].ClientRedirectToHome(state.getIn(['router', 'location']));
}

function* validateUserSaga(action) {
  const getGroups = true;
  const state = yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["select"])();
  const currentQs = query_string__WEBPACK_IMPORTED_MODULE_1___default.a.parse(state.getIn(['router', 'location', 'search']));
  const qsToken = currentQs.securityToken || currentQs.securitytoken;

  if (qsToken) {
    _util_LoginHelper_class__WEBPACK_IMPORTED_MODULE_7__["LoginHelper"].SetLoginCookies({
      securityToken: qsToken
    });
  }

  const cookies = !qsToken ? action.cookies : {
    ContensisCMSUserName: encodeURIComponent(qsToken),
    ...action.cookies
  };
  const user = yield _util_LoginHelper_class__WEBPACK_IMPORTED_MODULE_7__["LoginHelper"].ValidateUser(getGroups, cookies);
  const type = user && user.loggedIn ? _types__WEBPACK_IMPORTED_MODULE_2__["VALIDATE_USER_SUCCESS"] : _types__WEBPACK_IMPORTED_MODULE_2__["VALIDATE_USER_FAILED"];
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(updateUserSaga, {
    type,
    user: user && !user.loggedIn ? _reducers__WEBPACK_IMPORTED_MODULE_3__[/* initialUserState */ "b"] : user
  });
}

function* updateUserSaga(action) {
  const userState = yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["select"])(_selectors__WEBPACK_IMPORTED_MODULE_6__["selectUser"]);
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
    type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_USER"],
    from: action.type,
    user: { ...userState.toJS(),
      ...action.user
    }
  });

  if (action.redirect) {
    const currentSearch = yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["select"])(_core_redux_selectors_routing__WEBPACK_IMPORTED_MODULE_5__["selectCurrentSearch"]);
    const qs = query_string__WEBPACK_IMPORTED_MODULE_1___default.a.parse(currentSearch);
    const redirectUri = qs.redirect_uri;

    if (redirectUri) {
      yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
        type: _core_redux_types_routing__WEBPACK_IMPORTED_MODULE_4__["SET_ROUTE"],
        path: redirectUri
      });
    }
  }
}

function* forgotPassword(action) {
  const message = yield _util_LoginHelper_class__WEBPACK_IMPORTED_MODULE_7__["LoginHelper"].ForgotPassword(action.username);
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
    type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_USER"],
    user: {
      passwordReset: true,
      passwordResetMessage: message
    },
    history
  });
}

function* changePassword(action) {
  const state = yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["select"])();
  const username = Object(_selectors__WEBPACK_IMPORTED_MODULE_6__["selectUsername"])(state);
  let message = '';

  if (action.token) {
    message = yield _util_LoginHelper_class__WEBPACK_IMPORTED_MODULE_7__["LoginHelper"].ChangePasswordWithToken(action.token, action.newPassword, action.newPasswordConfirm);
  } else {
    message = yield _util_LoginHelper_class__WEBPACK_IMPORTED_MODULE_7__["LoginHelper"].ChangePassword(username, action.oldPassword, action.newPassword, action.newPasswordConfirm);
  }

  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
    type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_USER"],
    user: {
      logonResult: message
    },
    history
  });
}

function* createUserAccountSaga() {
  const userState = yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["select"])(_selectors__WEBPACK_IMPORTED_MODULE_6__["selectUser"]);

  if (userState.username && userState.password) {
    // Call RegisterUser API
    const registerResponse = yield _util_SecurityApi_class__WEBPACK_IMPORTED_MODULE_8__[/* SecurityApi */ "a"].RegisterUser(userState.username, userState.password);

    if (registerResponse) {
      const {
        securityToken,
        registrationResult,
        id
      } = registerResponse;

      if (securityToken) {
        const user = { ...userState,
          id,
          securityToken,
          password: null,
          loggedIn: true,
          verifiedEmail: false,
          failedLogin: false,
          failedToCreateAccount: false,
          registrationResult
        };
        yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
          type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_USER"],
          user
        });
      } else {
        const user = { ...userState,
          securityToken: null,
          loggedIn: false,
          verifiedEmail: false,
          failedLogin: true,
          failedToCreateAccount: true,
          registrationResult
        };
        yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
          type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_USER"],
          user
        });
      }
    } else {
      yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
        type: _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_USER"],
        user: { ...userState,
          registrationResult: 'ServiceFault'
        }
      });
    }
  }
}

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__27__;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__28__;

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// Redux
exports.actions = __webpack_require__(17).actions;
exports.selectors = __webpack_require__(17).selectors;
exports.types = __webpack_require__(17).types; // HOC

exports.withLogin = __webpack_require__(17).withLogin; // Classes

exports.LoginHelper = __webpack_require__(10);

/***/ })
/******/ ]);
});
//# sourceMappingURL=user.js.map