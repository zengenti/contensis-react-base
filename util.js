(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@babel/runtime/helpers/interopRequireDefault"), require("@babel/runtime/helpers/typeof"), require("@babel/runtime/helpers/slicedToArray"), require("awesome-json2json"));
	else if(typeof define === 'function' && define.amd)
		define(["@babel/runtime/helpers/interopRequireDefault", "@babel/runtime/helpers/typeof", "@babel/runtime/helpers/slicedToArray", "awesome-json2json"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@babel/runtime/helpers/interopRequireDefault"), require("@babel/runtime/helpers/typeof"), require("@babel/runtime/helpers/slicedToArray"), require("awesome-json2json")) : factory(root["@babel/runtime/helpers/interopRequireDefault"], root["@babel/runtime/helpers/typeof"], root["@babel/runtime/helpers/slicedToArray"], root["awesome-json2json"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__40__, __WEBPACK_EXTERNAL_MODULE__72__, __WEBPACK_EXTERNAL_MODULE__106__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 105);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.mapJson = __webpack_require__(73)["default"];
exports.setCachingHeaders = __webpack_require__(107);
exports.stringifyStrings = __webpack_require__(108);
exports.urls = __webpack_require__(109);
exports.useMapper = __webpack_require__(73).useMapper;

/***/ }),

/***/ 106:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__106__;

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setCachingHeaders = function setCachingHeaders(response, _ref) {
  var _ref$cacheControl = _ref.cacheControl,
      cacheControl = _ref$cacheControl === void 0 ? 'private' : _ref$cacheControl,
      _ref$surrogateControl = _ref.surrogateControl,
      surrogateControl = _ref$surrogateControl === void 0 ? '3600' : _ref$surrogateControl;
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'header';
  if (cacheControl) response[method]('Cache-Control', cacheControl);
  if (surrogateControl) response[method]('Surrogate-Control', "max-age=".concat(surrogateControl.toString()));
};

module.exports = setCachingHeaders;

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _typeof2 = _interopRequireDefault(__webpack_require__(40));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(72));

var stringifyStrings = function stringifyStrings(obj) {
  var returnObj = Array.isArray(obj) ? [] : {};
  Object.entries(obj).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    switch ((0, _typeof2["default"])(value)) {
      case 'string':
        returnObj[key] = JSON.stringify(value);
        break;

      case 'object':
        returnObj[key] = stringifyStrings(value);
        break;

      default:
        returnObj[key] = value;
        break;
    }
  });
  return returnObj;
};

module.exports = stringifyStrings;

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var url = function url(alias, project) {
  var projectAndAlias = project && project.toLowerCase() != 'website' ? "".concat(project.toLowerCase(), "-").concat(alias) : alias;
  return {
    cms: "https://cms-".concat(alias, ".cloud.contensis.com"),
    liveWeb: "https://live-".concat(projectAndAlias, ".cloud.contensis.com"),
    previewWeb: "https://preview-".concat(projectAndAlias, ".cloud.contensis.com"),
    iisWeb: "https://iis-live-".concat(projectAndAlias, ".cloud.contensis.com"),
    iisPreviewWeb: "https://iis-preview-".concat(projectAndAlias, ".cloud.contensis.com")
  };
};

module.exports = url;

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__40__;

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__72__;

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useMapper = void 0;

var _awesomeJson2json = _interopRequireDefault(__webpack_require__(106));

var useMapper = function useMapper(json, template) {
  return (0, _awesomeJson2json["default"])(json, template);
};

exports.useMapper = useMapper;
var _default = _awesomeJson2json["default"];
exports["default"] = _default;

/***/ })

/******/ });
});
//# sourceMappingURL=util.js.map