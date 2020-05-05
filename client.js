(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("react"), require("contensis-delivery-api"), require("prop-types"), require("query-string"), require("react-redux"), require("react-router-dom"), require("react-hot-loader"), require("react-router-config"), require("@redux-saga/core/effects"), require("js-cookie"), require("redux"), require("react-loadable"), require("history"), require("redux-saga"), require("redux-immutable"), require("redux-thunk"), require("loglevel"), require("isomorphic-fetch"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["immutable", "react", "contensis-delivery-api", "prop-types", "query-string", "react-redux", "react-router-dom", "react-hot-loader", "react-router-config", "@redux-saga/core/effects", "js-cookie", "redux", "react-loadable", "history", "redux-saga", "redux-immutable", "redux-thunk", "loglevel", "isomorphic-fetch", "react-dom"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("immutable"), require("react"), require("contensis-delivery-api"), require("prop-types"), require("query-string"), require("react-redux"), require("react-router-dom"), require("react-hot-loader"), require("react-router-config"), require("@redux-saga/core/effects"), require("js-cookie"), require("redux"), require("react-loadable"), require("history"), require("redux-saga"), require("redux-immutable"), require("redux-thunk"), require("loglevel"), require("isomorphic-fetch"), require("react-dom")) : factory(root["immutable"], root["react"], root["contensis-delivery-api"], root["prop-types"], root["query-string"], root["react-redux"], root["react-router-dom"], root["react-hot-loader"], root["react-router-config"], root["@redux-saga/core/effects"], root["js-cookie"], root["redux"], root["react-loadable"], root["history"], root["redux-saga"], root["redux-immutable"], root["redux-thunk"], root["loglevel"], root["isomorphic-fetch"], root["react-dom"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__13__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__18__, __WEBPACK_EXTERNAL_MODULE__24__, __WEBPACK_EXTERNAL_MODULE__25__, __WEBPACK_EXTERNAL_MODULE__28__, __WEBPACK_EXTERNAL_MODULE__29__, __WEBPACK_EXTERNAL_MODULE__33__, __WEBPACK_EXTERNAL_MODULE__36__, __WEBPACK_EXTERNAL_MODULE__38__, __WEBPACK_EXTERNAL_MODULE__39__, __WEBPACK_EXTERNAL_MODULE__46__, __WEBPACK_EXTERNAL_MODULE__47__, __WEBPACK_EXTERNAL_MODULE__48__, __WEBPACK_EXTERNAL_MODULE__51__, __WEBPACK_EXTERNAL_MODULE__58__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 64);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
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
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "js-cookie"
var external_js_cookie_ = __webpack_require__(29);
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetClientSideDeliveryApiStatus", function() { return GetClientSideDeliveryApiStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetDeliveryApiStatusFromHostname", function() { return GetDeliveryApiStatusFromHostname; });
/* unused harmony export GetResponseGuids */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetAllResponseGuids", function() { return GetAllResponseGuids; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deliveryApi", function() { return deliveryApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cachedSearch", function() { return cachedSearch; });
/* harmony import */ var contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__, "Query")) __webpack_require__.d(__webpack_exports__, "Query", function() { return contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Query"]; });



const getClientConfig = project => {
  let config = DELIVERY_API_CONFIG;
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
        404: () => null
      };
    }

  return config;
};

 // This should only be executed on the client as it relies on the window.

const GetClientSideDeliveryApiStatus = () => {
  if (typeof window != 'undefined') {
    const currentHostname = window.location.hostname;
    return GetDeliveryApiStatusFromHostname(currentHostname);
  }

  return null;
};
const GetDeliveryApiStatusFromHostname = currentHostname => {
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
const GetResponseGuids = object => {
  let Ids = [];
  Object.keys(object).some(function (k) {
    if (k === 'sys') {
      //Should always have an ID, but lets check...
      if (object[k].id && object[k].language) {
        // We can exclude assets here i think... ?
        if (object[k].dataFormat) {
          if (object[k].dataFormat !== 'asset') {
            Ids.push(`${object[k].id}_${object[k].language.toLowerCase()}`);
          }
        } else {
          // If we don't have a dataformat add it anyhow, for safety
          Ids.push(`${object[k].id}_${object[k].language.toLowerCase()}`);
        }
      }

      return false;
    }

    if (object[k] && typeof object[k] === 'object') {
      let subIds = GetResponseGuids(object[k]);

      if (subIds.length > 0) {
        Ids.push(...subIds);
      }

      return false;
    }
  });
  return Ids;
};
const GetAllResponseGuids = object => {
  if (!object) return [];
  let returnItems = GetResponseGuids(object);
  let unique = new Set(returnItems);
  return unique;
};

class DeliveryApi {
  search(query, linkDepth, project, env) {
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(getClientConfig(project, env));
    return client.entries.search(query, typeof linkDepth !== 'undefined' ? linkDepth : 1);
  }

  getClient(deliveryApiStatus = 'published', project, env) {
    const baseConfig = getClientConfig(project, env);
    baseConfig.versionStatus = deliveryApiStatus;
    return contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(baseConfig);
  }

  getEntry(id, linkDepth = 0, deliveryApiStatus = 'published', project, env) {
    const baseConfig = getClientConfig(project, env);
    baseConfig.versionStatus = deliveryApiStatus;
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(baseConfig); // return client.entries.get(id, linkDepth);

    return client.entries.get({
      id,
      linkDepth
    });
  }

}

const deliveryApi = new DeliveryApi();

class CacheNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }

}

class LruCache {
  constructor(limit = 100) {
    this.map = {};
    this.head = null;
    this.tail = null;
    this.limit = limit || 100;
    this.size = 0;
  }

  get(key) {
    if (this.map[key]) {
      let value = this.map[key].value;
      let node = new CacheNode(key, value);
      this.remove(key);
      this.setHead(node);
      return value;
    }
  }

  set(key, value) {
    let node = new CacheNode(key, value);

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

  setHead(node) {
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

  remove(key) {
    let node = this.map[key];

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

}

class CachedSearch {
  constructor() {
    this.cache = new LruCache();
    this.taxonomyLookup = {};
  }

  search(query, linkDepth, project, env) {
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(getClientConfig(project, env));
    return this.request(project + JSON.stringify(query) + linkDepth.toString(), () => client.entries.search(query, linkDepth));
  }

  get(id, linkDepth, versionStatus, project, env) {
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(getClientConfig(project, env));
    client.clientConfig.versionStatus = versionStatus;
    return this.request(id, () => client.entries.get({
      id,
      linkDepth
    }));
  }

  getContentType(id, project, env) {
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(getClientConfig(project, env));
    return this.request(`[CONTENT TYPE] ${id} ${project}`, () => client.contentTypes.get(id));
  }

  getTaxonomyNode(key, project, env) {
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(getClientConfig(project, env));
    return this.request(`[TAXONOMY NODE] ${key}`, () => client.taxonomy.resolveChildren(key).then(node => this.extendTaxonomyNode(node)));
  }

  getRootNode(options, project, env) {
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(getClientConfig(project, env));
    return this.request(`${project} / ${JSON.stringify(options)}`, () => client.nodes.getRoot(options));
  }

  getNode(options, project, env) {
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(getClientConfig(project, env));
    return this.request(`${project} ${options && options.path || options} ${JSON.stringify(options)}`, () => client.nodes.get(options));
  }

  getAncestors(options, project, env) {
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(getClientConfig(project, env));
    return this.request(`${project} [A] ${options && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getAncestors(options));
  }

  getChildren(options, project, env) {
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(getClientConfig(project, env));
    return this.request(`${project} [C] ${options && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getChildren(options));
  }

  getSiblings(options, project, env) {
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(getClientConfig(project, env));
    return this.request(`${project} [S] ${options && options.id || options} ${JSON.stringify(options)}`, () => client.nodes.getSiblings(options));
  }

  request(key, execute) {
    if (!this.cache.get(key) || typeof window == 'undefined') {
      let promise = execute();
      this.cache.set(key, promise);
      promise.catch(() => {
        this.cache.remove(key);
      });
    }

    return this.cache.get(key);
  }

  extendTaxonomyNode(node) {
    let id = this.getTaxonomyId(node);
    this.taxonomyLookup[id] = node.key;
    return { ...node,
      id,
      children: node.children ? node.children.map(n => this.extendTaxonomyNode(n)) : null
    };
  }

  getTaxonomyId(node) {
    if (node.key) {
      let parts = node.key.split('/');
      return parts[parts.length - 1];
    }

    return '';
  }

  getTaxonomyKey(id) {
    return this.taxonomyLookup[id];
  }

}

const cachedSearch = new CachedSearch();

/***/ }),
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_NODE_TREE", function() { return GET_NODE_TREE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_NODE_TREE", function() { return SET_NODE_TREE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_NODE_TREE_ERROR", function() { return GET_NODE_TREE_ERROR; });
const ACTION_PREFIX = '@NAVIGATION/';
const GET_NODE_TREE = `${ACTION_PREFIX}_GET_NODE_TREE`;
const SET_NODE_TREE = `${ACTION_PREFIX}_SET_NODE_TREE`;
const GET_NODE_TREE_ERROR = `${ACTION_PREFIX}_GET_NODE_TREE_ERROR`;

/***/ }),
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
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__18__;

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_VERSION", function() { return SET_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_VERSION_STATUS", function() { return SET_VERSION_STATUS; });
const VERSION_PREFIX = '@VERSION/';
const SET_VERSION = `${VERSION_PREFIX}SET_VERSION`;
const SET_VERSION_STATUS = `${VERSION_PREFIX}SET_VERSION_STATUS`;

/***/ }),
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
/* 24 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__24__;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__25__;

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectCommitRef", function() { return selectCommitRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectBuildNumber", function() { return selectBuildNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectVersionStatus", function() { return selectVersionStatus; });
const selectCommitRef = state => {
  return state.getIn(['version', 'commitRef']);
};
const selectBuildNumber = state => {
  return state.getIn(['version', 'buildNo']);
};
const selectVersionStatus = state => {
  return state.getIn(['version', 'contensisVersionStatus']);
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasNavigationTree", function() { return hasNavigationTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectNavigationRoot", function() { return selectNavigationRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectNavigationDepends", function() { return selectNavigationDepends; });
const hasNavigationTree = state => {
  return state.getIn(['navigation', 'isReady']);
};
const selectNavigationRoot = state => {
  return state.getIn(['navigation', 'root']);
};
const selectNavigationDepends = state => {
  return state.getIn(['navigation', 'treeDepends']);
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__28__;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__29__;

/***/ }),
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
  isLoggedIn,
  isNotFound,
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
  } // Match any Defined Content Type Mappings


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
  routes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array),
  withEvents: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  statePath: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  projectId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  contentTypeId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  loading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  entry: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  isLoggedIn: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isNotFound: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  notFoundComponent: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  setNavigationPath: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVersion", function() { return setVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVersionStatus", function() { return setVersionStatus; });
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _types_version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);


const setVersion = (commitRef, buildNo) => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* action */ "a"])(_types_version__WEBPACK_IMPORTED_MODULE_1__["SET_VERSION"], {
  commitRef,
  buildNo
});
const setVersionStatus = status => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[/* action */ "a"])(_types_version__WEBPACK_IMPORTED_MODULE_1__["SET_VERSION_STATUS"], {
  status
});

/***/ }),
/* 32 */,
/* 33 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__33__;

/***/ }),
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
/* 36 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__36__;

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return history; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return browserHistory; });
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(history__WEBPACK_IMPORTED_MODULE_0__);
 // Create a history depending on the environment

const selectedHistory = typeof window !== 'undefined' ? history__WEBPACK_IMPORTED_MODULE_0__["createBrowserHistory"] : history__WEBPACK_IMPORTED_MODULE_0__["createMemoryHistory"];
const history = (options = {}) => selectedHistory(options);
const browserHistory = selectedHistory();

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__38__;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__39__;

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const servers = SERVERS;
/* global SERVERS */

const alias = servers.alias.toLowerCase();
const publicUri = PUBLIC_URI;
/* global PUBLIC_URI */

const projects = PROJECTS;
/* global PROJECTS */
// return a projectId via the request hostname

const pickProject = (hostname, query) => {
  // if localhost we can only infer via a querystring, and take your word for it
  if (hostname == 'localhost') {
    return query && query.p || projects[0].id;
  } // if hostname is the actual public uri we can return the first project from the list


  if (hostname == publicUri) {
    return projects[0].id;
  }

  let project = 'unknown'; // // go through all the defined projects
  // Object.entries(projects).map(([, p]) => {

  const p = projects[0]; // check if we're accessing via the project's public uri

  if (hostname.includes(p.publicUri)) project = p.id; // the url structure is different for website (we don't prefix)

  if (p.id.startsWith('website')) {
    // check for internal and external hostnames
    // we check live and preview distinctly so our rule does not clash with
    // hostnames that use a project prefix
    if (hostname.includes(`live-${alias}.cloud.contensis.com`) || hostname.includes(`live.${alias}.contensis.cloud`) || hostname.includes(`preview-${alias}.cloud.contensis.com`) || hostname.includes(`preview.${alias}.contensis.cloud`)) project = p.id;
  } else {
    // check for internal and external hostnames, prefixed with the projectId
    if (hostname.includes(`${p.id.toLowerCase()}-${alias}.cloud.contensis.com`) || hostname.includes(`${p.id.toLowerCase()}.${alias}.contensis.cloud`)) project = p.id;
  } // });


  return project === 'unknown' ? p.id : project;
};

/* harmony default export */ __webpack_exports__["a"] = (pickProject);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js
var redux_saga_effects_npm_proxy_esm = __webpack_require__(0);

// EXTERNAL MODULE: external "loglevel"
var external_loglevel_ = __webpack_require__(48);

// EXTERNAL MODULE: ./src/app/core/redux/types/routing.js
var routing = __webpack_require__(3);

// EXTERNAL MODULE: ./src/app/core/util/ContensisDeliveryApi.js
var ContensisDeliveryApi = __webpack_require__(12);

// EXTERNAL MODULE: ./src/app/core/redux/selectors/version.js
var version = __webpack_require__(26);

// EXTERNAL MODULE: ./src/app/core/redux/selectors/routing.js
var selectors_routing = __webpack_require__(8);

// EXTERNAL MODULE: ./src/app/core/redux/types/navigation.js
var navigation = __webpack_require__(15);

// EXTERNAL MODULE: ./src/app/core/redux/selectors/navigation.js
var selectors_navigation = __webpack_require__(27);

// EXTERNAL MODULE: external "contensis-delivery-api"
var external_contensis_delivery_api_ = __webpack_require__(6);

// CONCATENATED MODULE: ./src/app/core/schema.js
const DataFormats = {
  entry: 'entry',
  webpage: 'webpage'
};
const sys = {
  contentTypeId: 'sys.contentTypeId',
  dataFormat: 'sys.dataFormat',
  filename: 'sys.properties.filename',
  id: 'sys.id',
  includeInSearch: 'sys.metadata.includeInSearch',
  slug: 'sys.slug',
  uri: 'sys.uri',
  versionStatus: 'sys.versionStatus'
};
const Fields = {
  entryTitle: 'entryTitle',
  entryDescription: 'entryDescription',
  keywords: 'keywords',
  sys,
  contentTypeId: 'sys.contentTypeId',
  wildcard: '*'
};
const Projects = {
  website: 'website'
};
const VersionStatus = {
  published: 'published',
  latest: 'latest'
};
const ContentTypes = {
  contentPage: 'contentPage'
};
const WebpageFormats = {};
const FilterExpressionTypes = {
  contentType: 'contentType',
  field: 'field'
};
// CONCATENATED MODULE: ./src/app/core/util/performance.js
const now = () => {
  if (typeof window == 'undefined') {
    return Date.now();
  }

  return window.performance.now();
};
// EXTERNAL MODULE: ./src/app/core/util/navigation.js
var util_navigation = __webpack_require__(20);

// CONCATENATED MODULE: ./src/app/core/search/util.js



function fixFreeTextForElastic(s) {
  let illegalChars = ['>', '<'];
  let encodedChars = ['+', '-', '=', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '\\', '/'];
  let illegalRegEx = new RegExp(illegalChars.map(c => '\\' + c).join('|'), 'g');
  let encodedRegEx = new RegExp(encodedChars.map(c => '\\' + c).join('|'), 'g');
  s = s.replace(illegalRegEx, '');
  s = s.replace(encodedRegEx, ''); // (m) => '\\\\' + m);

  return s;
}
const timedSearch = async (query, linkDepth, projectId) => {
  let duration = 0;
  const start = now();
  const payload = await ContensisDeliveryApi["cachedSearch"].search(query, linkDepth, projectId);
  const end = now();
  duration = end - start;
  return {
    duration,
    payload
  };
};
const extractQuotedPhrases = searchTerm => {
  const pattern = new RegExp(/(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/gm);
  return (searchTerm.match(pattern) || []).map(match => match.replace(/"/g, ''));
};
const callCustomApi = async (customApi, filters) => {
  let uri = Object(util_navigation["a" /* buildUrl */])(customApi.get('uri'), filters);
  if (!uri) return null;
  if (typeof window == 'undefined' && uri.startsWith('/')) uri = `http://localhost:3001${uri}`;
  const response = await fetch(uri);
  return await response.json();
};
// CONCATENATED MODULE: ./src/app/core/search/expressions.js



const fieldExpression = (field, value, operator = 'equalTo', weight = null) => {
  if (!field || !value) return [];
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? [external_contensis_delivery_api_["Op"][operator](field, value)] : [external_contensis_delivery_api_["Op"][operator](field, value).weight(weight)];
};
const contentTypeIdExpression = (contentTypeIds, webpageTemplates) => {
  const expressions = [];
  if (!contentTypeIds && !webpageTemplates) return expressions;

  if (contentTypeIds && contentTypeIds.length > 0) {
    expressions.push(...dataFormatExpression(contentTypeIds, DataFormats.entry));
  }

  if (webpageTemplates && webpageTemplates.length > 0) {
    expressions.push(...dataFormatExpression(webpageTemplates, DataFormats.webpage));
  }

  if (expressions.length > 1) return [external_contensis_delivery_api_["Op"].or(...expressions)];
  return expressions;
};
const filterExpressions = filters => {
  if (!filters) return [];
  const expressions = [];
  filters.map(param => {
    expressions.push(...fieldExpression(param.key, param.value, 'contains'));
  });
  return expressions;
};
const dataFormatExpression = (contentTypeIds, dataFormat = DataFormats.entry) => {
  if (contentTypeIds && contentTypeIds.length > 0) {
    /**
     * We have an array of contentTypeIds some may be prefixed with a "!"
     * to indicate this is a "not" expression
     */
    const withContentTypeIds = contentTypeIds.filter(c => !c.startsWith('!'));
    const notContentTypeIds = contentTypeIds.filter(c => c.startsWith('!')).map(id => id.substring(1));
    const andExpr = external_contensis_delivery_api_["Op"].and();
    const dataFormatExpr = fieldExpression(Fields.sys.dataFormat, dataFormat);
    const withExpr = fieldExpression(Fields.sys.contentTypeId, withContentTypeIds);
    const notExpr = [external_contensis_delivery_api_["Op"].not(...fieldExpression(Fields.sys.contentTypeId, notContentTypeIds))];
    andExpr.add(...dataFormatExpr);
    if (withContentTypeIds.length > 0) andExpr.add(...withExpr);
    if (notContentTypeIds.length > 0) andExpr.add(...notExpr);
    return [andExpr];
  }

  return [];
};
const defaultExpressions = versionStatus => {
  return [external_contensis_delivery_api_["Op"].equalTo(Fields.sys.versionStatus, versionStatus)];
};
const defaultSearchExpressions = versionStatus => {
  return [...defaultExpressions(versionStatus), ...includeInSearchExpressions()];
};
const includeInSearchExpressions = () => [external_contensis_delivery_api_["Op"].or(external_contensis_delivery_api_["Op"].and(external_contensis_delivery_api_["Op"].exists(Fields.sys.includeInSearch, true), external_contensis_delivery_api_["Op"].equalTo(Fields.sys.includeInSearch, true)), external_contensis_delivery_api_["Op"].exists(Fields.sys.includeInSearch, false))];
const orderByExpression = orderBy => {
  let expression = external_contensis_delivery_api_["OrderBy"];

  if (orderBy && orderBy.length > 0) {
    orderBy.map(ob => expression = ob.startsWith('-') ? expression.desc(ob.substring(1)) : expression.asc(ob));
  }

  return expression;
};

const equalToOrIn = (field, arr, operator = 'equalTo') => arr.length === 0 ? [] : arr.length === 1 ? [external_contensis_delivery_api_["Op"][operator](field, arr[0])] : [external_contensis_delivery_api_["Op"].in(field, ...arr)];

const customWhereExpressions = where => {
  if (!where || !Array.isArray(where)) return []; // Accept HTTP style objects and map them to
  // their equivalent JS client "Op" expressions

  return where.map(clause => {
    let expression;
    Object.keys(clause).map((key, idx) => {
      if (idx === 1) {
        const operator = key;
        const value = clause[key];
        expression = external_contensis_delivery_api_["Op"][operator](clause.field, value, clause.weight);
      }
    });
    return expression;
  });
};
const termExpressions = (searchTerm, weightedSearchFields) => {
  if (searchTerm && weightedSearchFields && weightedSearchFields.length > 0) {
    // Extract any phrases in quotes to array
    const quotedPhrases = extractQuotedPhrases(searchTerm); // Modify the search term to remove any quoted phrases to leave any remaining terms

    let modifiedSearchTerm = searchTerm;
    quotedPhrases.forEach(qp => modifiedSearchTerm = modifiedSearchTerm.replace(qp, '').replace('""', '').trim()); // Push to the operators array to include in the query

    const operators = []; // Helper functions to generate Op expressions

    const containsOp = (f, term) => fieldExpression(f.fieldId, fixFreeTextForElastic(term), 'contains', f.weight);

    const freeTextOp = (f, term) => fieldExpression(f.fieldId, fixFreeTextForElastic(term), 'freeText', f.weight); // For each weighted search field


    weightedSearchFields.forEach(f => {
      // Push to field operators
      const fieldOperators = []; // Add operator expressions for modified search term

      if (modifiedSearchTerm) {
        if ([Fields.keywords, Fields.sys.filename, Fields.sys.uri].includes(f.fieldId)) {
          fieldOperators.push(...containsOp(f, modifiedSearchTerm));
        } else {
          if ([Fields.entryTitle].includes(f.fieldId)) {
            fieldOperators.push(external_contensis_delivery_api_["Op"].or(...containsOp(f, modifiedSearchTerm), ...freeTextOp(f, modifiedSearchTerm)));
          } else {
            fieldOperators.push(...freeTextOp(f, modifiedSearchTerm));
          }
        }
      } // Add operator expressions for any quoted phrases


      quotedPhrases.forEach(qp => fieldOperators.push(...containsOp(f, qp))); // If we are using multiple operators for a field we will
      // wrap each field inside an And operator so we will match
      // all terms/phrases rather than any terms/phrases

      if (fieldOperators.length > 1) {
        operators.push(external_contensis_delivery_api_["Op"].and(...fieldOperators));
      } else {
        operators.push(...fieldOperators);
      }
    }); // Wrap operators in an Or operator

    return [external_contensis_delivery_api_["Op"].or().addRange(operators)];
  } else if (searchTerm) {
    return [external_contensis_delivery_api_["Op"].contains(Fields.wildcard, searchTerm)];
  } else {
    return [];
  }
};
// CONCATENATED MODULE: ./src/app/core/redux/sagas/queries.js
// eslint-disable-next-line import/named


const routeEntryByFields = (id, fields = [], versionStatus = 'published') => {
  const query = new ContensisDeliveryApi["Query"](...[...fieldExpression('sys.id', id), ...defaultExpressions(versionStatus)]);
  query.fields = fields;
  return query;
};
// CONCATENATED MODULE: ./src/app/core/redux/sagas/routing.js
// load-entries.js









const routingSagas = [Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(routing["SET_NAVIGATION_PATH"], getRouteSaga), Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(routing["SET_ROUTE"], setRouteSaga)];
/**
 * To navigate / push a specific route via redux middleware
 * @param {path, state} action
 */

function* setRouteSaga(action) {
  yield Object(redux_saga_effects_npm_proxy_esm["put"])({
    type: routing["CALL_HISTORY_METHOD"],
    payload: {
      method: 'push',
      args: [action.path, action.state]
    }
  });
}

function* getRouteSaga(action) {
  let entry = null;

  try {
    const {
      withEvents,
      routes,
      staticRoute
    } = action;
    let appsays;

    if (withEvents && withEvents.onRouteLoad) {
      appsays = yield withEvents.onRouteLoad(action);
    } // if appsays customNavigation: true, we will set doNavigation to false
    // if appsays customNavigation: { ... }, we will set doNavigation to the customNavigation object and check for child elements
    // if appsays nothing we will set doNavigation to true and continue to do navigation calls


    const doNavigation = !appsays || (appsays && appsays.customNavigation === true ? false : appsays && appsays.customNavigation || true);
    const entryLinkDepth = appsays && appsays.entryLinkDepth || 3;
    const setContentTypeLimits = routes && routes.ContentTypeMappings && !!routes.ContentTypeMappings.find(ct => ct.fields || ct.linkDepth);
    const state = yield Object(redux_saga_effects_npm_proxy_esm["select"])();
    const routeEntry = Object(selectors_routing["selectRouteEntry"])(state);
    const currentPath = Object(selectors_routing["selectCurrentPath"])(state);
    const deliveryApiStatus = Object(version["selectVersionStatus"])(state);
    const project = Object(selectors_routing["selectCurrentProject"])(state);
    const isHome = currentPath === '/';
    const isPreview = currentPath && currentPath.startsWith('/preview/');

    if (!isPreview && (appsays && appsays.customRouting || staticRoute && !staticRoute.route.fetchNode || routeEntry && action.statePath === action.path)) {
      // To prevent erroneous 404s and wasted network calls, this covers
      // - appsays customRouting and does SET_ENTRY etc. via the consuming app
      // - all staticRoutes (where custom 'route.fetchNode' attribute is falsey)
      // - standard Contensis SiteView Routing where we already have that entry in state
      if (routeEntry && (!staticRoute || staticRoute.route && staticRoute.route.fetchNode)) {
        entry = routeEntry.toJS();
        yield Object(redux_saga_effects_npm_proxy_esm["put"])({
          type: routing["SET_ENTRY"],
          entry,
          isLoading: false
        });
      } else yield Object(redux_saga_effects_npm_proxy_esm["call"])(setRouteEntry);
    } else {
      let pathNode = null,
          ancestors = null,
          siblings = null; // Scroll into View

      if (typeof window !== 'undefined') {
        window.scroll({
          top: 0
        });
      }

      let currentPathDepth = currentPath.split('/').length - 1;
      if (isHome) currentPathDepth = 0; // Handle homepage

      if (isHome) {
        pathNode = yield ContensisDeliveryApi["cachedSearch"].getRootNode({
          depth: 0,
          entryFields: '*',
          entryLinkDepth,
          language: 'en-GB',
          versionStatus: deliveryApiStatus
        }, project);
      } else {
        // Handle preview routes
        if (isPreview) {
          let splitPath = currentPath.split('/');
          let entryGuid = splitPath[2];

          if (splitPath.length == 3) {
            // According to product dev we cannot use Node API
            // for previewing entries as it gives a response of []
            // -- apparently it is not correct to request latest content
            // with Node API
            let previewEntry = yield ContensisDeliveryApi["deliveryApi"].getClient(deliveryApiStatus, project).entries.get({
              id: entryGuid,
              linkDepth: 3
            });

            if (previewEntry) {
              pathNode = {
                entry: previewEntry
              }; // yield call(setRouteEntry, previewEntry);
              // } else {
              // yield call(do404);
            }
          }
        } else {
          // Handle all other routes
          pathNode = yield ContensisDeliveryApi["cachedSearch"].getNode({
            depth: doNavigation === true || doNavigation.children === true ? 3 : doNavigation && doNavigation.children || 0,
            path: currentPath,
            entryFields: setContentTypeLimits ? ['sys.contentTypeId', 'sys.id'] : '*',
            entryLinkDepth: setContentTypeLimits ? 0 : entryLinkDepth,
            versionStatus: deliveryApiStatus
          }, project);

          if (setContentTypeLimits && pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id) {
            const contentType = routes && routes.ContentTypeMappings && routes.ContentTypeMappings.find(ct => ct.contentTypeID === pathNode.entry.sys.contentTypeId);
            const query = routeEntryByFields(pathNode.entry.sys.id, contentType && contentType.fields, deliveryApiStatus);
            const payload = yield ContensisDeliveryApi["cachedSearch"].search(query, contentType && typeof contentType.linkDepth !== 'undefined' ? contentType.linkDepth : 3, project);

            if (payload && payload.items && payload.items.length > 0) {
              pathNode.entry = payload.items[0];
            }
          }
        }

        if (pathNode && pathNode.id && (doNavigation === true || doNavigation.ancestors)) {
          ancestors = yield ContensisDeliveryApi["cachedSearch"].getAncestors(pathNode.id, project); // No menu shows the  siblings at this level, so no need to load them.

          if (currentPathDepth > 1 && (doNavigation === true || doNavigation.siblings)) {
            siblings = yield ContensisDeliveryApi["cachedSearch"].getSiblings({
              id: pathNode.id,
              entryFields: ['sys.contentTypeId', 'url']
            }, project);
          }
        }
      }

      if (pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id) {
        entry = pathNode.entry;
        yield Object(redux_saga_effects_npm_proxy_esm["call"])(setRouteEntry, entry, pathNode, ancestors, siblings);
      } else {
        yield Object(redux_saga_effects_npm_proxy_esm["call"])(do404);
      }
    }

    if (withEvents && withEvents.onRouteLoaded) {
      yield withEvents.onRouteLoaded({ ...action,
        entry
      });
    }

    if (!Object(selectors_navigation["hasNavigationTree"])(state) && (doNavigation === true || doNavigation.tree)) // Load navigation clientside only, a put() should help that work
      yield Object(redux_saga_effects_npm_proxy_esm["put"])({
        type: navigation["GET_NODE_TREE"],
        treeDepth: doNavigation === true || !doNavigation.tree || doNavigation.tree === true ? 2 : doNavigation.tree
      });
  } catch (e) {
    external_loglevel_["error"](...['Error running route saga:', e, e.stack]);
    yield Object(redux_saga_effects_npm_proxy_esm["call"])(do404);
  }
}

function* setRouteEntry(entry, node, ancestors, siblings) {
  yield Object(redux_saga_effects_npm_proxy_esm["all"])([Object(redux_saga_effects_npm_proxy_esm["put"])({
    type: routing["SET_NAVIGATION_NOT_FOUND"],
    notFound: !(entry && entry.sys.id)
  }), Object(redux_saga_effects_npm_proxy_esm["put"])({
    type: routing["SET_NODE"],
    node
  }), Object(redux_saga_effects_npm_proxy_esm["put"])({
    type: routing["SET_ENTRY"],
    entry: entry
  }), Object(redux_saga_effects_npm_proxy_esm["put"])({
    type: routing["SET_ENTRY_ID"],
    id: entry && entry.sys.id || null
  }), Object(redux_saga_effects_npm_proxy_esm["put"])({
    type: routing["SET_ANCESTORS"],
    ancestors
  }), Object(redux_saga_effects_npm_proxy_esm["put"])({
    type: routing["SET_SIBLINGS"],
    siblings
  })]);
}

function* do404() {
  yield Object(redux_saga_effects_npm_proxy_esm["put"])({
    type: routing["SET_NAVIGATION_NOT_FOUND"],
    notFound: true
  });
  yield Object(redux_saga_effects_npm_proxy_esm["put"])({
    type: routing["SET_ENTRY_ID"],
    id: null
  });
  yield Object(redux_saga_effects_npm_proxy_esm["put"])({
    type: routing["SET_ENTRY"],
    entry: null
  });
}
// EXTERNAL MODULE: ./src/app/features/login/index.js + 2 modules
var login = __webpack_require__(17);

// CONCATENATED MODULE: ./src/app/core/redux/sagas/navigation.js






const navigationSagas = [Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(navigation["GET_NODE_TREE"], ensureNodeTreeSaga)];
function* ensureNodeTreeSaga(action) {
  const state = yield Object(redux_saga_effects_npm_proxy_esm["select"])();

  try {
    if (!Object(selectors_navigation["hasNavigationTree"])(state)) {
      const deliveryApiVersionStatus = yield Object(redux_saga_effects_npm_proxy_esm["select"])(version["selectVersionStatus"]);
      const project = yield Object(redux_saga_effects_npm_proxy_esm["select"])(selectors_routing["selectCurrentProject"]);
      const nodes = yield ContensisDeliveryApi["deliveryApi"].getClient(deliveryApiVersionStatus, project).nodes.getRoot({
        depth: action.treeDepth || 2,
        entryFields: 'entryTitle, metaInformation, sys.contentTypeId'
      });

      if (nodes) {
        yield Object(redux_saga_effects_npm_proxy_esm["put"])({
          type: navigation["SET_NODE_TREE"],
          nodes
        });
      } else {
        yield Object(redux_saga_effects_npm_proxy_esm["put"])({
          type: navigation["GET_NODE_TREE_ERROR"]
        });
      }
    }
  } catch (ex) {
    yield Object(redux_saga_effects_npm_proxy_esm["put"])({
      type: navigation["GET_NODE_TREE_ERROR"],
      error: ex.toString()
    });
  }
}
// EXTERNAL MODULE: ./src/app/features/login/redux/sagas.js
var sagas = __webpack_require__(23);

// CONCATENATED MODULE: ./src/app/core/redux/sagas/index.js
// index.js





/* harmony default export */ var redux_sagas = __webpack_exports__["a"] = (function (featureSagas = []) {
  return function* rootSaga() {
    const subSagas = [...routingSagas, ...navigationSagas, ...login["sagas"]];
    yield Object(redux_saga_effects_npm_proxy_esm["all"])([Object(sagas["b" /* validateUserSaga */])({}), ...subSagas, ...featureSagas]);
  };
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(33);

// EXTERNAL MODULE: external "redux-immutable"
var external_redux_immutable_ = __webpack_require__(46);

// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__(47);
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// EXTERNAL MODULE: external "redux-saga"
var external_redux_saga_ = __webpack_require__(39);
var external_redux_saga_default = /*#__PURE__*/__webpack_require__.n(external_redux_saga_);

// EXTERNAL MODULE: external "immutable"
var external_immutable_ = __webpack_require__(2);

// EXTERNAL MODULE: ./src/app/core/redux/types/routing.js
var routing = __webpack_require__(3);

// EXTERNAL MODULE: ./src/app/core/util/ContensisDeliveryApi.js
var ContensisDeliveryApi = __webpack_require__(12);

// CONCATENATED MODULE: ./src/app/core/redux/reducers/routing.js



let routing_initialState = Object(external_immutable_["Map"])({
  currentPath: '/',
  currentNode: [],
  currentProject: 'unknown',
  notFound: false,
  entryID: null,
  entry: null,
  entryDepends: new external_immutable_["List"](),
  contentTypeId: null,
  currentNodeAncestors: new external_immutable_["List"](),
  currentTreeId: null
});
/* harmony default export */ var reducers_routing = ((state = routing_initialState, action) => {
  switch (action.type) {
    case routing["SET_ANCESTORS"]:
      {
        if (action.ancestors) {
          let ancestorIDs = action.ancestors.map(node => {
            return node.id;
          });
          let currentNodeDepends = state.get('nodeDepends');
          const allNodeDepends = external_immutable_["Set"].union([Object(external_immutable_["Set"])(ancestorIDs), currentNodeDepends]);
          return state.set('nodeDepends', allNodeDepends).set('currentNodeAncestors', Object(external_immutable_["fromJS"])(action.ancestors));
        }

        return state.set('currentNodeAncestors', Object(external_immutable_["fromJS"])(action.ancestors));
      }

    case routing["SET_ENTRY"]:
      {
        if (!action.entry) return state.set('entry', null).set('entryDepends', null).set('isLoading', action.isLoading);
        const entryDepends = Object(ContensisDeliveryApi["GetAllResponseGuids"])(action.entry);
        return state.set('entryDepends', Object(external_immutable_["fromJS"])(entryDepends)).set('entry', Object(external_immutable_["fromJS"])(action.entry)).set('isLoading', action.isLoading);
      }

    case routing["SET_ENTRY_ID"]:
      {
        if (action.id === '') {
          return state;
        }

        return state.set('entryID', action.id);
      }

    case routing["SET_NAVIGATION_PATH"]:
      {
        let staticRoute = false;

        if (action.staticRoute) {
          staticRoute = { ...action.staticRoute
          };
        }

        if (action.path) {
          return state.set('currentPath', Object(external_immutable_["fromJS"])(action.path)).set('location', Object(external_immutable_["fromJS"])(action.location)).set('staticRoute', Object(external_immutable_["fromJS"])({ ...staticRoute,
            route: { ...staticRoute.route,
              component: null
            }
          })).set('isLoading', typeof window !== 'undefined');
        }

        return state;
      }

    case routing["SET_NAVIGATION_NOT_FOUND"]:
      {
        return state.set('notFound', Object(external_immutable_["fromJS"])(action.notFound)).set('isLoading', false);
      }

    case routing["SET_NODE"]:
      {
        const {
          node
        } = action;
        if (!node) return state; // On Set Node, we reset all dependants.

        const nodeDepends = Object(external_immutable_["Set"])([node.id]);
        return state.set('nodeDepends', nodeDepends).set('currentNode', Object(external_immutable_["fromJS"])(action.node)).removeIn(['currentNode', 'entry']); // We have the entry stored elsewhere, so lets not keep it twice.
      }

    case routing["SET_ROUTE"]:
      {
        return state.set('nextPath', action.path);
      }

    case routing["SET_SIBLINGS"]:
      {
        // Can be null in some cases like the homepage.
        let currentNodeSiblingParent = null;
        let siblingIDs = [];

        if (action.siblings && action.siblings.length > 0) {
          currentNodeSiblingParent = action.siblings[0].parentId;
          siblingIDs = action.siblings.map(node => {
            return node.id;
          });
        }

        let currentNodeDepends = state.get('nodeDepends');
        const allNodeDepends = external_immutable_["Set"].union([Object(external_immutable_["Set"])(siblingIDs), currentNodeDepends]);
        return state.set('nodeDepends', allNodeDepends).set('currentNodeSiblings', Object(external_immutable_["fromJS"])(action.siblings)).set('currentNodeSiblingsParent', currentNodeSiblingParent);
      }

    case routing["SET_TARGET_PROJECT"]:
      {
        return state.set('currentProject', action.project).set('currentTreeId', '') //getTreeID(action.project))
        .set('allowedGroups', Object(external_immutable_["fromJS"])(action.allowedGroups));
      }

    default:
      return state;
  }
});
// EXTERNAL MODULE: ./src/app/features/login/index.js + 2 modules
var login = __webpack_require__(17);

// EXTERNAL MODULE: ./src/app/core/redux/types/version.js
var version = __webpack_require__(19);

// CONCATENATED MODULE: ./src/app/core/redux/reducers/version.js


let version_initialState = Object(external_immutable_["Map"])({
  commitRef: null,
  buildNo: null,
  contensisVersionStatus: 'published'
});
/* harmony default export */ var reducers_version = ((state = version_initialState, action) => {
  switch (action.type) {
    case version["SET_VERSION_STATUS"]:
      {
        return state.set('contensisVersionStatus', action.status);
      }

    case version["SET_VERSION"]:
      {
        return state.set('commitRef', action.commitRef).set('buildNo', action.buildNo);
      }

    default:
      return state;
  }
});
// EXTERNAL MODULE: ./src/app/core/redux/types/navigation.js
var navigation = __webpack_require__(15);

// CONCATENATED MODULE: ./src/app/core/redux/reducers/navigation.js


const navigation_initialState = Object(external_immutable_["Map"])({
  root: null,
  treeDepends: new external_immutable_["List"]([]),
  isError: false,
  isReady: false
});
/* harmony default export */ var reducers_navigation = ((state = navigation_initialState, action) => {
  switch (action.type) {
    case navigation["SET_NODE_TREE"]:
      {
        return state.set('root', Object(external_immutable_["fromJS"])(action.nodes)).set('isReady', true);
      }

    case navigation["GET_NODE_TREE_ERROR"]:
      {
        return state.set('isError', true);
      }

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/app/core/redux/routerMiddleware.js

/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */

/* eslint-disable no-unused-vars */

const routerMiddleware = history => store => next => action => {
  if (action.type !== routing["CALL_HISTORY_METHOD"]) {
    return next(action);
  }

  const {
    payload: {
      method,
      args
    }
  } = action;
  history[method](...args);
};

/* harmony default export */ var redux_routerMiddleware = (routerMiddleware);
// CONCATENATED MODULE: ./src/app/core/redux/store.js



 // Core reducers






/* harmony default export */ var redux_store = __webpack_exports__["a"] = ((featureReducers, initialState, history) => {
  const thunkMiddleware = [external_redux_thunk_default.a];

  let reduxDevToolsMiddleware = f => f;

  if (typeof window != 'undefined') {
    reduxDevToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
  }

  const sagaMiddleware = external_redux_saga_default()();
  const middleware = Object(external_redux_["compose"])(Object(external_redux_["applyMiddleware"])(...thunkMiddleware, sagaMiddleware, redux_routerMiddleware(history)), reduxDevToolsMiddleware);
  let reducers = {
    navigation: reducers_navigation,
    routing: reducers_routing,
    user: login["reducer"],
    version: reducers_version,
    ...featureReducers
  };
  const combinedReducers = Object(external_redux_immutable_["combineReducers"])(reducers);

  const store = initialState => {
    const store = Object(external_redux_["createStore"])(combinedReducers, initialState, middleware);
    store.runSaga = sagaMiddleware.run;

    store.close = () => store.dispatch(external_redux_saga_["END"]);

    return store;
  };

  return store(initialState);
});

/***/ }),
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
/* 46 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__46__;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__47__;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__48__;

/***/ }),
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__51__;

/***/ }),
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__58__;

/***/ }),
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactApp", function() { return ReactApp; });
const client = __webpack_require__(65).default;

const ReactApp = __webpack_require__(43).default;
/* harmony default export */ __webpack_exports__["default"] = (client);

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(51);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(58);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36);
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _app_core_redux_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(42);
/* harmony import */ var _app_core_redux_sagas_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(41);
/* harmony import */ var _app_core_redux_actions_version__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(31);
/* harmony import */ var _app_core_util_ContensisDeliveryApi__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(12);
/* harmony import */ var _app_core_redux_actions_routing__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(22);
/* harmony import */ var _app_core_util_pickProject__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(40);
/* harmony import */ var _app_core_redux_history__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(37);

















class ClientApp {
  constructor(ReactApp, config) {
    const documentRoot = document.getElementById('root');
    const {
      routes,
      withReducers,
      withSagas,
      withEvents
    } = config;

    const GetClientJSX = store => {
      const ClientJsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_hot_loader__WEBPACK_IMPORTED_MODULE_5__["AppContainer"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_6__["Provider"], {
        store: store
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Router"], {
        history: _app_core_redux_history__WEBPACK_IMPORTED_MODULE_15__[/* browserHistory */ "a"]
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ReactApp, {
        routes: routes,
        withEvents: withEvents
      }))));
      return ClientJsx;
    };

    const isProduction = !(process.env.NODE_ENV != 'production');
    /**
     * Webpack HMR Setup.
     */

    const HMRRenderer = Component => {
      Object(react_loadable__WEBPACK_IMPORTED_MODULE_4__["preloadReady"])().then(() => {
        isProduction ? Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["hydrate"])(Component, documentRoot) : Object(react_dom__WEBPACK_IMPORTED_MODULE_2__["render"])(Component, documentRoot);
      });
    };

    let store = null;
    const qs = query_string__WEBPACK_IMPORTED_MODULE_7___default.a.parse(window.location.search);
    const versionStatusFromHostname = Object(_app_core_util_ContensisDeliveryApi__WEBPACK_IMPORTED_MODULE_12__["GetClientSideDeliveryApiStatus"])();

    if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
      store = Object(_app_core_redux_store__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(withReducers, Object(immutable__WEBPACK_IMPORTED_MODULE_8__["fromJS"])(window.REDUX_DATA), _app_core_redux_history__WEBPACK_IMPORTED_MODULE_15__[/* browserHistory */ "a"]);
      store.dispatch(Object(_app_core_redux_actions_version__WEBPACK_IMPORTED_MODULE_11__["setVersionStatus"])(qs.versionStatus || versionStatusFromHostname));
      /* eslint-disable no-console */

      console.log('Hydrating from inline Redux');
      /* eslint-enable no-console */

      store.runSaga(Object(_app_core_redux_sagas_index_js__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(withSagas));
      store.dispatch(Object(_app_core_redux_actions_routing__WEBPACK_IMPORTED_MODULE_13__["setCurrentProject"])(Object(_app_core_util_pickProject__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])(window.location.hostname, qs)));
      delete window.REDUX_DATA;
      HMRRenderer(GetClientJSX(store));
    } else {
      fetch(`${window.location.pathname}?redux=true`).then(response => response.json()).then(data => {
        /* eslint-disable no-console */
        //console.log('Got Data Back');
        // console.log(data);

        /* eslint-enable no-console */
        const ssRedux = JSON.parse(data);
        store = Object(_app_core_redux_store__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])(withReducers, Object(immutable__WEBPACK_IMPORTED_MODULE_8__["fromJS"])(ssRedux), _app_core_redux_history__WEBPACK_IMPORTED_MODULE_15__[/* browserHistory */ "a"]); // store.dispatch(setVersionStatus(versionStatusFromHostname));

        store.runSaga(Object(_app_core_redux_sagas_index_js__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(withSagas));
        store.dispatch(Object(_app_core_redux_actions_routing__WEBPACK_IMPORTED_MODULE_13__["setCurrentProject"])(Object(_app_core_util_pickProject__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])(window.location.hostname, query_string__WEBPACK_IMPORTED_MODULE_7___default.a.parse(window.location.search)))); // if (typeof window != 'undefined') {
        //   store.dispatch(checkUserLoggedIn());
        // }

        HMRRenderer(GetClientJSX(store));
      });
    } // webpack Hot Module Replacement API


    if (false) {}
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ClientApp);

/***/ })
/******/ ]);
});
//# sourceMappingURL=client.js.map