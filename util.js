(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jsonpath-mapper"));
	else if(typeof define === 'function' && define.amd)
		define(["jsonpath-mapper"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jsonpath-mapper")) : factory(root["jsonpath-mapper"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__32__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
/******/ })
/************************************************************************/
/******/ ({

/***/ 32:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__32__;

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMapper", function() { return useMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useEntryMapper", function() { return useEntryMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapEntries", function() { return mapEntries; });
/* harmony import */ var jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mapJson", function() { return jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "jpath", function() { return jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0__["jpath"]; });



const useMapper = (json, template) => {
  return template ? jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0___default()(json, template) : json;
};
/**
 * useEntryMapper hook
 * @param {any} entry The source entry we wish to transform
 * @param {object} mappers Object with keys containing mapper templates,
 * the key name matching entry.sys.contentTypeId
 * @returns {object} Object transformed using a matched content type or
 * a default mapper template, returns an empty object if no mapper template
 * couild be applied.
 */

const useEntryMapper = (entry, mappers, field = 'sys.contentTypeId') => {
  const fieldValue = Object(jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0__["jpath"])(field, entry || {});
  const mapper = mappers[fieldValue] || mappers['default'];
  return useMapper(entry || {}, mapper);
};
const mapEntries = (entries, mappers, field = 'sys.contentTypeId') => entries.map(entry => {
  const fieldValue = Object(jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0__["jpath"])(field, entry || {});
  const mapper = mappers[fieldValue] || mappers['default'];
  return mapper ? jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0___default()(entry || {}, mapper) : entry;
});
/* harmony default export */ __webpack_exports__["default"] = (jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

// Global server and build utils
exports.setCachingHeaders = __webpack_require__(72);
exports.stringifyStrings = __webpack_require__(73);
exports.urls = __webpack_require__(74); // JSON mapping functions

exports.jpath = __webpack_require__(45).jpath;
exports.mapJson = __webpack_require__(45).mapJson;
exports.mapEntries = __webpack_require__(45).mapEntries; // JSON mapping hooks

exports.useMapper = __webpack_require__(45).useMapper;
exports.useEntryMapper = __webpack_require__(45).useEntryMapper;

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

const setCachingHeaders = (response, {
  cacheControl = 'private',
  surrogateControl = '3600'
}, method = 'header') => {
  if (cacheControl) response[method]('Cache-Control', cacheControl);
  if (surrogateControl) response[method]('Surrogate-Control', `max-age=${surrogateControl.toString()}`);
};

module.exports = setCachingHeaders;

/***/ }),

/***/ 73:
/***/ (function(module, exports) {

const stringifyStrings = obj => {
  const returnObj = Array.isArray(obj) ? [] : {};
  Object.entries(obj).forEach(([key, value]) => {
    switch (typeof value) {
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

/***/ 74:
/***/ (function(module, exports) {

const url = (alias, project) => {
  const projectAndAlias = project && project.toLowerCase() != 'website' ? `${project.toLowerCase()}-${alias}` : alias;
  return {
    cms: `https://cms-${alias}.cloud.contensis.com`,
    liveWeb: `https://live-${projectAndAlias}.cloud.contensis.com`,
    previewWeb: `https://preview-${projectAndAlias}.cloud.contensis.com`,
    iisWeb: `https://iis-live-${projectAndAlias}.cloud.contensis.com`,
    iisPreviewWeb: `https://iis-preview-${projectAndAlias}.cloud.contensis.com`
  };
};

module.exports = url;

/***/ })

/******/ });
});
//# sourceMappingURL=util.js.map