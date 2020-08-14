(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jsonpath-mapper"));
	else if(typeof define === 'function' && define.amd)
		define(["jsonpath-mapper"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jsonpath-mapper")) : factory(root["jsonpath-mapper"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__30__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 72);
/******/ })
/************************************************************************/
/******/ ({

/***/ 30:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__30__;

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMapper", function() { return useMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useEntriesMapper", function() { return useEntriesMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useEntryMapper", function() { return useEntryMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapEntries", function() { return mapEntries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapComposer", function() { return mapComposer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useComposerMapper", function() { return useComposerMapper; });
/* harmony import */ var jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "mapJson", function() { return jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "jpath", function() { return jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0__["jpath"]; });



/**
 *
 * @param {object} json The source object we wish to transform
 * @param {object} template The mapping template we wish to apply to the source
 * object to generate the intended target object
 */

const useMapper = (json, template) => {
  return template ? jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0___default()(json || {}, template) : json;
};

const chooseMapperByFieldValue = (entry, mappers, field = 'sys.contentTypeId') => {
  const fieldValue = Object(jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0__["jpath"])(field, entry || {});
  return mappers[fieldValue] || mappers['default'] || {};
};
/**
 * useEntriesMapper hook to take a list of entries from Delivery API along
 * with mappers for each contentTypeId and return an array of mapped objects
 * @param {any} entry The source entry we wish to transform
 * @param {object} mappers Object with keys containing mapper templates,
 * the key name matching sys.contentTypeId
 * @param {string} field Only include if we need to match content based on
 * a field other than sys.contentTypeId in the source data
 * @returns {object} Object transformed using a matched content type or
 * a default mapper template, returns an empty object if no mapper template
 * couild be applied.
 */


const useEntriesMapper = (entry, mappers, field = 'sys.contentTypeId') => {
  const mapper = chooseMapperByFieldValue(entry, mappers, field);
  return useMapper(entry || {}, mapper);
};
/**
 * Deprecated: due to misleading name, use the hook useEntriesMapper instead
 */

const useEntryMapper = useEntriesMapper;
/**
 * mapEntries mapping function to take a list of entries from Delivery API along
 * with mappers for each contentTypeId and return an array of mapped objects
 * @param {any} entry The source entry we wish to transform
 * @param {object} mappers Object with keys containing mapper templates,
 * the key name matching sys.contentTypeId
 * @param {string} field Only include if we need to match content based on
 * a field other than sys.contentTypeId in the source data
 * @returns {object} Object transformed using a matched content type or
 * a default mapper template, returns an empty object if no mapper template
 * couild be applied.
 */

const mapEntries = (entries, mappers, field = 'sys.contentTypeId') => entries.map(entry => {
  const mapper = chooseMapperByFieldValue(entry, mappers, field);
  return mapper ? jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0___default()(entry || {}, mapper) : entry;
});
/**
 * mapComposer mapping function to take a composer field from Delivery API along
 * with mappers for each Composer Item "type" and return an array of mapped components
 * @param {array} composer Composer field array of Composer Items
 * @param {object} mappers A keyed object with each key matching the Composer Item "type"
 * @returns {array} Array of mapped objects transformed using a matched Composer Item "type" mapping
 * or null. Injects a "_type" property into each transformed object in the array to indicate
 * where the mapping originated and for what component the mapped object is representing
 */

const mapComposer = (composer, mappers) => Array.isArray(composer) ? composer.map(composerItem => {
  const fieldValue = composerItem.type;
  const mapper = mappers[fieldValue] || mappers['default'];
  return mapper ? {
    _type: fieldValue,
    ...jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0___default()(composerItem.value || {}, mapper)
  } : composerItem;
}) : null;
/**
 * useComposerMapper hook to take a composer field from Delivery API along
 * with mappers for each Composer Item "type" and return an array of mapped components
 * @param {array} composer Composer field array of Composer Items
 * @param {object} mappers A keyed object with each key matching the Composer Item "type"
 * @returns {array} Array of mapped objects transformed using a matched Composer Item "type" mapping
 * or null. Injects a "_type" property into each transformed object in the array to indicate
 * where the mapping originated and for what component the mapped object is representing
 */

const useComposerMapper = (composer = [], mappers = {}) => mapComposer(composer, mappers);
/* harmony default export */ __webpack_exports__["default"] = (jsonpath_mapper__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

// Global server and build utils
exports.setCachingHeaders = __webpack_require__(73);
exports.stringifyStrings = __webpack_require__(74);
exports.urls = __webpack_require__(75); // JSON mapping functions

exports.jpath = __webpack_require__(33).jpath;
exports.mapJson = __webpack_require__(33).mapJson;
exports.mapEntries = __webpack_require__(33).mapEntries;
exports.mapComposer = __webpack_require__(33).mapComposer; // JSON mapping hooks

exports.useMapper = __webpack_require__(33).useMapper;
exports.useEntriesMapper = __webpack_require__(33).useEntriesMapper;
exports.useEntryMapper = __webpack_require__(33).useEntryMapper;
exports.useComposerMapper = __webpack_require__(33).useComposerMapper;

/***/ }),

/***/ 73:
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

/***/ 74:
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

/***/ 75:
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