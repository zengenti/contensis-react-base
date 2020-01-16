(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("immutable"), require("react-router-dom"), require("react-hot-loader"), require("react-redux"), require("@redux-saga/core/effects"), require("react-loadable"), require("isomorphic-fetch"), require("history"), require("contensis-delivery-api"), require("regenerator-runtime"), require("redux"), require("redux-immutable"), require("redux-thunk"), require("redux-saga"), require("loglevel"), require("react-router-config"), require("express"), require("evil-dns"), require("http-proxy"), require("react-dom/server"), require("react-loadable/webpack"), require("styled-components"), require("react-helmet"), require("serialize-javascript"), require("minify-css-string"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "immutable", "react-router-dom", "react-hot-loader", "react-redux", "@redux-saga/core/effects", "react-loadable", "isomorphic-fetch", "history", "contensis-delivery-api", "regenerator-runtime", "redux", "redux-immutable", "redux-thunk", "redux-saga", "loglevel", "react-router-config", "express", "evil-dns", "http-proxy", "react-dom/server", "react-loadable/webpack", "styled-components", "react-helmet", "serialize-javascript", "minify-css-string"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("immutable"), require("react-router-dom"), require("react-hot-loader"), require("react-redux"), require("@redux-saga/core/effects"), require("react-loadable"), require("isomorphic-fetch"), require("history"), require("contensis-delivery-api"), require("regenerator-runtime"), require("redux"), require("redux-immutable"), require("redux-thunk"), require("redux-saga"), require("loglevel"), require("react-router-config"), require("express"), require("evil-dns"), require("http-proxy"), require("react-dom/server"), require("react-loadable/webpack"), require("styled-components"), require("react-helmet"), require("serialize-javascript"), require("minify-css-string")) : factory(root["react"], root["immutable"], root["react-router-dom"], root["react-hot-loader"], root["react-redux"], root["@redux-saga/core/effects"], root["react-loadable"], root["isomorphic-fetch"], root["history"], root["contensis-delivery-api"], root["regenerator-runtime"], root["redux"], root["redux-immutable"], root["redux-thunk"], root["redux-saga"], root["loglevel"], root["react-router-config"], root["express"], root["evil-dns"], root["http-proxy"], root["react-dom/server"], root["react-loadable/webpack"], root["styled-components"], root["react-helmet"], root["serialize-javascript"], root["minify-css-string"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__15__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__21__, __WEBPACK_EXTERNAL_MODULE__24__, __WEBPACK_EXTERNAL_MODULE__26__, __WEBPACK_EXTERNAL_MODULE__31__, __WEBPACK_EXTERNAL_MODULE__34__, __WEBPACK_EXTERNAL_MODULE__35__, __WEBPACK_EXTERNAL_MODULE__39__, __WEBPACK_EXTERNAL_MODULE__40__, __WEBPACK_EXTERNAL_MODULE__41__, __WEBPACK_EXTERNAL_MODULE__42__, __WEBPACK_EXTERNAL_MODULE__49__, __WEBPACK_EXTERNAL_MODULE__55__, __WEBPACK_EXTERNAL_MODULE__61__, __WEBPACK_EXTERNAL_MODULE__64__, __WEBPACK_EXTERNAL_MODULE__67__, __WEBPACK_EXTERNAL_MODULE__70__, __WEBPACK_EXTERNAL_MODULE__71__, __WEBPACK_EXTERNAL_MODULE__72__, __WEBPACK_EXTERNAL_MODULE__73__, __WEBPACK_EXTERNAL_MODULE__74__, __WEBPACK_EXTERNAL_MODULE__75__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

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

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(13));

var _createClass2 = _interopRequireDefault(__webpack_require__(17));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(8));

var _typeof2 = _interopRequireDefault(__webpack_require__(33));

var _contensisDeliveryApi = __webpack_require__(34);

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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

    if (object[k] && (0, _typeof2.default)(object[k]) === 'object') {
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

    if (object[k] && (0, _typeof2.default)(object[k]) === 'object') {
      var subIds = GetResponseGuids(object[k]);

      if (subIds.length > 0) {
        Ids.push.apply(Ids, (0, _toConsumableArray2.default)(subIds));
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
  var unique = (0, _toConsumableArray2.default)(new Set(returnItems));
  return unique;
};

exports.GetAllResponseGuids = GetAllResponseGuids;

var DeliveryApi =
/*#__PURE__*/
function () {
  function DeliveryApi() {
    (0, _classCallCheck2.default)(this, DeliveryApi);
  }

  (0, _createClass2.default)(DeliveryApi, [{
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
  (0, _classCallCheck2.default)(this, CacheNode);
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
    (0, _classCallCheck2.default)(this, LruCache);
    this.map = {};
    this.head = null;
    this.tail = null;
    this.limit = limit || 100;
    this.size = 0;
  }

  (0, _createClass2.default)(LruCache, [{
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
    (0, _classCallCheck2.default)(this, CachedSearch);
    (0, _defineProperty2.default)(this, "cache", new LruCache());
    (0, _defineProperty2.default)(this, "taxonomyLookup", {});
  }

  (0, _createClass2.default)(CachedSearch, [{
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
        promise.catch(function () {
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
/* 4 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(35);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CALL_HISTORY_METHOD = exports.SET_ROUTE = exports.SET_TARGET_PROJECT = exports.SET_ROUTE_LOADING = exports.SET_NAVIGATION_PATH = exports.SET_NAVIGATION_NOT_FOUND = exports.SET_ENTRY_ID = exports.SET_ANCESTORS = exports.SET_NODE = exports.SET_ENTRY = exports.GET_ENTRY = void 0;
var ROUTING_PREFIX = '@ROUTING/';
var GET_ENTRY = "".concat(ROUTING_PREFIX, "_GET_ENTRY");
exports.GET_ENTRY = GET_ENTRY;
var SET_ENTRY = "".concat(ROUTING_PREFIX, "_SET_ENTRY");
exports.SET_ENTRY = SET_ENTRY;
var SET_NODE = "".concat(ROUTING_PREFIX, "_SET_NODE");
exports.SET_NODE = SET_NODE;
var SET_ANCESTORS = "".concat(ROUTING_PREFIX, "_SET_ANCESTORS");
exports.SET_ANCESTORS = SET_ANCESTORS;
var SET_ENTRY_ID = "".concat(ROUTING_PREFIX, "_SET_ENTRY_ID");
exports.SET_ENTRY_ID = SET_ENTRY_ID;
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

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(27);

var iterableToArray = __webpack_require__(28);

var nonIterableSpread = __webpack_require__(29);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRouteLoading = exports.selectCurrentAncestors = exports.selectIsNotFound = exports.selectCurrentProject = exports.selectCurrentPath = exports.selectRouteEntryID = exports.selectRouteEntrySlug = exports.selectRouteEntryContentTypeId = exports.selectRouteEntryEntryId = exports.selectRouteEntryDepends = exports.selectRouteEntry = void 0;

var _immutable = __webpack_require__(2);

var selectRouteEntry = function selectRouteEntry(state) {
  return state.getIn(['routing', 'entry'], (0, _immutable.Map)({}));
};

exports.selectRouteEntry = selectRouteEntry;

var selectRouteEntryDepends = function selectRouteEntryDepends(state) {
  return state.getIn(['routing', 'entryDepends'], new _immutable.List());
};

exports.selectRouteEntryDepends = selectRouteEntryDepends;

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
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),
/* 13 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__16__;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRouteEntry = exports.setRoute = exports.setCurrentProject = exports.setNavigationPath = exports.setNotFound = void 0;

var _helpers = __webpack_require__(19);

var _routing = __webpack_require__(6);

var setNotFound = function setNotFound(notFound) {
  return (0, _helpers.action)(_routing.SET_NAVIGATION_NOT_FOUND, {
    notFound: notFound
  });
};

exports.setNotFound = setNotFound;

var setNavigationPath = function setNavigationPath(path, location, staticRoute, withEvents, statePath) {
  return (0, _helpers.action)(_routing.SET_NAVIGATION_PATH, {
    path: path,
    location: location,
    staticRoute: staticRoute,
    withEvents: withEvents,
    statePath: statePath
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
/* 19 */
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
exports.randomString = exports.resizeImageUri = exports.resizeImage = exports.getWebPImageUri = exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(5));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(36));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(13));

var _createClass2 = _interopRequireDefault(__webpack_require__(17));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ProjectHelper =
/*#__PURE__*/
function () {
  function ProjectHelper() {
    (0, _classCallCheck2.default)(this, ProjectHelper);
  }

  (0, _createClass2.default)(ProjectHelper, null, [{
    key: "currencyFormat",
    value: function currencyFormat(val) {
      var formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0
      });
      return formatter.format(val);
    }
  }, {
    key: "showChildren",
    value: function showChildren(e) {
      e.preventDefault;
      var children = document.getElementById(e);

      if (children.style.display == 'block') {
        children.style.display = 'none';
      } else {
        children.style.display = 'block';
      }
    }
  }, {
    key: "camelize",
    value: function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/\s+/g, '');
    }
  }, {
    key: "ltrim",
    value: function ltrim(stringToTrim) {
      return stringToTrim.replace(/^\s+/, '');
    }
  }, {
    key: "trim",
    value: function trim(s) {
      var c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
      if (c === ']') c = '\\]';
      if (c === '\\') c = '\\\\';
      return s.replace(new RegExp('^[' + c + ']+|[' + c + ']+$', 'g'), '');
    }
  }, {
    key: "ArrayToSentence",
    value: function ArrayToSentence(arr) {
      var connector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'and';
      return arr.length > 1 ? arr.slice(0, -1).join(', ') + ' ' + connector + ' ' + arr.slice(-1) : arr.toString();
    }
  }, {
    key: "GetComposerContent",
    value: function GetComposerContent(composer, fieldName) {
      if (composer) {
        var composerField = composer.filter(function (c) {
          return c.type === fieldName;
        }).map(function (c) {
          return c.value;
        });
        return composerField;
      }

      return null;
    }
  }, {
    key: "dedupeUriSlashes",
    value: function dedupeUriSlashes(uri) {
      var work = uri.replace('//', '~~'); // replace first instance of double slash with tildes to switch out again for slashes later

      var uriParts = work.split('/').filter(function (part) {
        return part;
      }); // split the working url into parts and filter any null parts

      return uriParts.join('/').replace('~~', '//');
    }
  }, {
    key: "dedupeArray",
    value: function dedupeArray(arr) {
      // remove duplicates from simple array
      return arr.filter(function (elem, pos, arr) {
        return arr.indexOf(elem) == pos;
      });
    }
  }, {
    key: "stringToArray",
    value: function stringToArray(s) {
      var seperator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
      return typeof s === 'string' ? s.split(seperator).map(function (item) {
        return ProjectHelper.trim(item);
      }) : s;
    }
  }, {
    key: "composedFieldToObject",
    value: function composedFieldToObject(composer) {
      // convert array of [ { type: 'type', value: composerItem } ]
      // to plain object of { type: composerItem }
      var object = {};
      composer.forEach(function (cfi) {
        return object[cfi.type] = ProjectHelper.getComposerContent(cfi.type, composer);
      });
      return object;
    }
  }, {
    key: "getComposerContent",
    value: function getComposerContent(type, composer) {
      var component = composer.find(function (c) {
        return c.type === type;
      });
      return component && component.value;
    }
  }, {
    key: "getFileSize",
    value: function getFileSize(fileSize) {
      var kb = Math.ceil(fileSize * 0.0009765625);
      var mb = Math.round(parseFloat((fileSize * 0.00000095367432 * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2);

      if (kb < 1000) {
        return kb + 'KB';
      }

      return mb + 'MB';
    }
  }, {
    key: "getFileExtension",
    value: function getFileExtension(uri) {
      var re = /(?:\.([^.]+))?$/;
      var ext = re.exec(uri)[1];

      if (ext) {
        return ext.toUpperCase();
      }

      return '';
    }
  }, {
    key: "renderImageAsWebP",
    value: function renderImageAsWebP(imageUrl) {
      //Set new url to current url by default
      var newImageUrl = imageUrl; //First check if image has has webp referenced in url

      if (imageUrl && !imageUrl.includes('webp')) {
        //Check if image already has transformations
        if (!imageUrl.includes('?')) {
          //If not load image as webp
          newImageUrl = imageUrl + '?f=webp';
        } else {
          //Otherwise append webp format to existing transformations
          newImageUrl = imageUrl + '&f=webp';
        }
      }

      return newImageUrl;
    }
  }, {
    key: "decodeEntities",
    value: function decodeEntities(encodedString) {
      var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
      var translate = {
        nbsp: ' ',
        amp: '&',
        quot: '"',
        lt: '<',
        gt: '>'
      };
      return encodedString.replace(translate_re, function (match, entity) {
        return translate[entity];
      }).replace(/&#(\d+);/gi, function (match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
      });
    }
  }, {
    key: "keyPress",
    value: function keyPress(event, action) {
      var code = event.keyCode || event.which;

      if (code === 13) {
        action;
      }
    }
  }, {
    key: "GroupBy",
    value: function GroupBy(list, keyGetter) {
      var map = new Map();
      list.forEach(function (item) {
        var key = keyGetter(item);

        if (!map.has(key)) {
          map.set(key, [item]);
        } else {
          map.get(key).push(item);
        }
      });
      return map;
    }
  }]);
  return ProjectHelper;
}();

exports.default = ProjectHelper;

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
  _api = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(url, options) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", fetch(url, options).then(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(response) {
                return _regenerator.default.wrap(function _callee$(_context) {
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
            }()).catch(function (error) {
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
/* 20 */
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
/* 21 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__21__;

/***/ }),
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(53)();
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__24__;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _interopRequireDefault = __webpack_require__(0);

var _interopRequireWildcard = __webpack_require__(7);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(23));

var _reactRedux = __webpack_require__(16);

var _reactHotLoader = __webpack_require__(15);

var _reactRouterDom = __webpack_require__(10);

var _reactRouterConfig = __webpack_require__(55);

var _routing = __webpack_require__(9);

var _routing2 = __webpack_require__(18);

var _NotFound = _interopRequireDefault(__webpack_require__(56));

var _Status = __webpack_require__(57);

var _ToJs = __webpack_require__(58);

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
      isNotFound = _ref.isNotFound,
      setNavigationPath = _ref.setNavigationPath,
      routes = _ref.routes,
      location = _ref.location,
      withEvents = _ref.withEvents;

  // Match any Static Routes a developer has defined
  var matchedStaticRoute = function matchedStaticRoute(pathname) {
    return (0, _reactRouterConfig.matchRoutes)(routes.StaticRoutes, typeof window != 'undefined' ? window.location.pathname : pathname);
  };

  var isStaticRoute = function isStaticRoute(pathname) {
    return matchedStaticRoute(pathname).length > 0;
  };

  var trimmedPath = getTrimmedPath(location.pathname);

  var setPath = function setPath() {
    var staticRoute = isStaticRoute(trimmedPath) && matchedStaticRoute(trimmedPath)[0];
    var serverPath = null;

    if (staticRoute) {
      serverPath = staticRoute.route.path.split('/').filter(function (p) {
        return !p.startsWith(':');
      }).join('/');
    }

    setNavigationPath(serverPath || trimmedPath, location, staticRoute, withEvents, statePath);
  };

  if (typeof window == 'undefined') setPath();
  (0, _react.useEffect)(function () {
    setPath();
  }, [location]); // Render any Static Routes a developer has defined

  if (isStaticRoute(trimmedPath)) {
    return (0, _reactRouterConfig.renderRoutes)(routes.StaticRoutes, {
      projectId: projectId,
      contentTypeId: contentTypeId,
      entry: entry
    });
  } // Need to redirect when url endswith a /


  if (location.pathname.length > trimmedPath.length) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: trimmedPath
    });
  } // Match any Defined Content Type Mappings


  if (contentTypeId) {
    var MatchedComponent = routes.ContentTypeMappings.find(function (item) {
      return item.contentTypeID == contentTypeId;
    });

    if (MatchedComponent) {
      return _react.default.createElement(MatchedComponent.component, {
        projectId: projectId,
        contentTypeId: contentTypeId,
        entry: entry
      });
    }
  }

  if (isNotFound) {
    return _react.default.createElement(_Status.Status, {
      code: 404
    }, _react.default.createElement(_NotFound.default, null));
  }

  return null;
};

RouteLoader.propTypes = {
  routes: _propTypes.default.objectOf(_propTypes.default.array, _propTypes.default.array),
  withEvents: _propTypes.default.object,
  location: _propTypes.default.object.isRequired,
  history: _propTypes.default.object.isRequired,
  statePath: _propTypes.default.string,
  projectId: _propTypes.default.string,
  contentTypeId: _propTypes.default.string,
  entry: _propTypes.default.object,
  isNotFound: _propTypes.default.bool,
  setNavigationPath: _propTypes.default.func
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    statePath: (0, _routing.selectCurrentPath)(state),
    projectId: (0, _routing.selectCurrentProject)(state),
    entry: (0, _routing.selectRouteEntry)(state),
    contentTypeId: (0, _routing.selectRouteEntryContentTypeId)(state),
    isNotFound: (0, _routing.selectIsNotFound)(state)
  };
};

var mapDispatchToProps = {
  setNavigationPath: function setNavigationPath(path, location, staticRoute, withEvents, statePath) {
    return (0, _routing2.setNavigationPath)(path, location, staticRoute, withEvents, statePath);
  }
};

var _default = (0, _reactHotLoader.hot)(module)((0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _ToJs.toJS)(RouteLoader))));

exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(52)(module)))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__26__;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserHistory = exports.history = void 0;

var _history = __webpack_require__(31);

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
exports.default = void 0;
var servers = SERVERS;
/* global SERVERS */

var alias = servers.alias;
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

  var project = 'unknown'; // go through all the defined projects

  projects.forEach(function (p) {
    // check if we're accessing via the project's public uri
    if (hostname.includes(p.publicUri)) project = p.id; // the url structure is different for website (we don't prefix)

    if (p.id == 'website') {
      // check for internal and external hostnames
      // we check live and preview distinctly so our rule does not clash with
      // hostnames that use a project prefix
      if (hostname.includes("live-".concat(alias, ".cloud.contensis.com")) || hostname.includes("live.".concat(alias, ".contensis.cloud")) || hostname.includes("preview-".concat(alias, ".cloud.contensis.com")) || hostname.includes("preview.".concat(alias, ".contensis.cloud"))) project = p.id;
    } else {
      // check for internal and external hostnames, prefixed with the projectId
      if (hostname.includes("".concat(p.id, "-").concat(alias, ".cloud.contensis.com")) || hostname.includes("".concat(p.id, ".").concat(alias, ".contensis.cloud"))) project = p.id;
    }
  });
  return project;
};

var _default = pickProject;
exports.default = _default;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__34__;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__35__;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setVersionStatus = exports.setVersion = void 0;

var _helpers = __webpack_require__(19);

var _version = __webpack_require__(20);

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(7);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _redux = __webpack_require__(39);

var _reduxImmutable = __webpack_require__(40);

var _reduxThunk = _interopRequireDefault(__webpack_require__(41));

var _reduxSaga = _interopRequireWildcard(__webpack_require__(42));

var _routing = _interopRequireDefault(__webpack_require__(43));

var _version = _interopRequireDefault(__webpack_require__(44));

var _navigation = _interopRequireDefault(__webpack_require__(45));

var _routerMiddleware = _interopRequireDefault(__webpack_require__(46));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(featureReducers, initialState, history) {
  var thunkMiddleware = [_reduxThunk.default];

  var reduxDevToolsMiddleware = function reduxDevToolsMiddleware(f) {
    return f;
  };

  if (typeof window != 'undefined') {
    reduxDevToolsMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : function (f) {
      return f;
    };
  }

  var sagaMiddleware = (0, _reduxSaga.default)();
  var middleware = (0, _redux.compose)(_redux.applyMiddleware.apply(void 0, thunkMiddleware.concat([sagaMiddleware, (0, _routerMiddleware.default)(history)])), reduxDevToolsMiddleware);

  var reducers = _objectSpread({
    navigation: _navigation.default,
    routing: _routing.default,
    version: _version.default
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

exports.default = _default;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__39__;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__40__;

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
exports.default = void 0;

var _immutable = __webpack_require__(2);

var _routing = __webpack_require__(6);

var _ContensisDeliveryApi = __webpack_require__(3);

var initialState = (0, _immutable.Map)({
  currentPath: '/',
  currentNode: [],
  currentProject: 'unknown',
  notFound: false,
  entryID: null,
  entry: null,
  entryDepends: new _immutable.List(),
  contentTypeId: null,
  currentNodeAncestors: new _immutable.List()
});

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _routing.SET_ENTRY_ID:
      {
        if (action.id === '') {
          return state;
        }

        return state.set('entryID', action.id);
      }

    case _routing.SET_ANCESTORS:
      {
        return state.set('currentNodeAncestors', (0, _immutable.fromJS)(action.ancestors));
      }

    case _routing.SET_NODE:
      {
        // We have the entry stored elsewhere, so lets not keep it twice.
        if (action.node && action.node.entry) delete action.node.entry;
        return state.set('currentNode', (0, _immutable.fromJS)(action.node));
      }

    case _routing.SET_ENTRY:
      {
        // Get Depends for entry
        var depends = (0, _ContensisDeliveryApi.GetAllResponseGuids)(action.entry); // if (action.entry) {
        //   fixImageUri(action.entry);
        // }

        return state.set('entryDepends', (0, _immutable.fromJS)(depends)).set('entry', (0, _immutable.fromJS)(action.entry));
      }

    case _routing.SET_NAVIGATION_PATH:
      {
        if (action.path) {
          return state.set('currentPath', (0, _immutable.fromJS)(action.path)).set('location', (0, _immutable.fromJS)(action.location)).set('staticRoute', (0, _immutable.fromJS)(action.staticRoute));
        }

        return state;
      }

    case _routing.SET_ROUTE:
      {
        return state.set('nextPath', action.path);
      }

    case _routing.SET_NAVIGATION_NOT_FOUND:
      {
        return state.set('notFound', (0, _immutable.fromJS)(action.notFound));
      }

    case _routing.SET_ROUTE_LOADING:
      {
        return state.set('routeLoading', action.loading);
      }

    case _routing.SET_TARGET_PROJECT:
      {
        return state.set('currentProject', action.project).set('allowedGroups', (0, _immutable.fromJS)(action.allowedGroups));
      }

    default:
      return state;
  }
};

exports.default = _default;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = __webpack_require__(2);

var _version = __webpack_require__(20);

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

exports.default = _default;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = __webpack_require__(2);

var _navigation = __webpack_require__(11);

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

exports.default = _default;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(8));

var _routing = __webpack_require__(6);

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
        history[method].apply(history, (0, _toConsumableArray2.default)(args));
      };
    };
  };
};

var _default = routerMiddleware;
exports.default = _default;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _regenerator = _interopRequireDefault(__webpack_require__(5));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(8));

var _effects = __webpack_require__(12);

var _routing = __webpack_require__(48);

var _navigation = __webpack_require__(50);

// index.js
function _default() {
  var featureSagas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return (
    /*#__PURE__*/
    _regenerator.default.mark(function rootSaga() {
      var subSagas;
      return _regenerator.default.wrap(function rootSaga$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              subSagas = [].concat((0, _toConsumableArray2.default)(_routing.routingSagas), (0, _toConsumableArray2.default)(_navigation.navigationSagas));
              _context.next = 3;
              return (0, _effects.all)([].concat((0, _toConsumableArray2.default)(subSagas), (0, _toConsumableArray2.default)(featureSagas)));

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(7);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routingSagas = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _regenerator = _interopRequireDefault(__webpack_require__(5));

var log = _interopRequireWildcard(__webpack_require__(49));

var _effects = __webpack_require__(12);

var _routing = __webpack_require__(6);

var _ContensisDeliveryApi = __webpack_require__(3);

var _version = __webpack_require__(22);

var _routing2 = __webpack_require__(9);

var _navigation = __webpack_require__(11);

var _navigation2 = __webpack_require__(14);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked =
/*#__PURE__*/
_regenerator.default.mark(setRouteSaga),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(getRouteSaga),
    _marked3 =
/*#__PURE__*/
_regenerator.default.mark(setRouteEntry),
    _marked4 =
/*#__PURE__*/
_regenerator.default.mark(do404);

var routingSagas = [(0, _effects.takeEvery)(_routing.SET_NAVIGATION_PATH, getRouteSaga), (0, _effects.takeEvery)(_routing.SET_ROUTE, setRouteSaga)];
exports.routingSagas = routingSagas;

function setRouteSaga(action) {
  return _regenerator.default.wrap(function setRouteSaga$(_context) {
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
  var entry, withEvents, state, routeEntry, currentPath, deliveryApiStatus, project, splitPath, entryGuid, previewEntry, pathNode, ancestors, _splitPath, _entryGuid, _previewEntry;

  return _regenerator.default.wrap(function getRouteSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          entry = null;
          _context2.prev = 1;
          withEvents = action.withEvents;

          if (!(withEvents && withEvents.onRouteLoad)) {
            _context2.next = 6;
            break;
          }

          _context2.next = 6;
          return withEvents.onRouteLoad(action);

        case 6:
          _context2.next = 8;
          return (0, _effects.select)();

        case 8:
          state = _context2.sent;
          routeEntry = (0, _routing2.selectRouteEntry)(state);

          if (!(action.staticRoute && !action.staticRoute.route.fetchNode || routeEntry && action.statePath === action.path)) {
            _context2.next = 14;
            break;
          }

          // Do we need to fetch node/validate routes for a static route?
          // For a genuinely static route we recieve a 404 in browser console,
          // and a wasted network call.
          if (routeEntry) entry = routeEntry.toJS();
          _context2.next = 73;
          break;

        case 14:
          currentPath = (0, _routing2.selectCurrentPath)(state);
          deliveryApiStatus = (0, _version.selectVersionStatus)(state);
          project = (0, _routing2.selectCurrentProject)(state);

          if (!(currentPath && currentPath.startsWith('/preview/'))) {
            _context2.next = 32;
            break;
          }

          splitPath = currentPath.split('/');
          entryGuid = splitPath[2];

          if (!(splitPath.length == 3)) {
            _context2.next = 32;
            break;
          }

          _context2.next = 23;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).entries.get({
            id: entryGuid,
            linkDepth: 4
          });

        case 23:
          previewEntry = _context2.sent;

          if (!previewEntry) {
            _context2.next = 29;
            break;
          }

          _context2.next = 27;
          return (0, _effects.call)(setRouteEntry, previewEntry);

        case 27:
          _context2.next = 31;
          break;

        case 29:
          _context2.next = 31;
          return (0, _effects.call)(do404);

        case 31:
          return _context2.abrupt("return", true);

        case 32:
          pathNode = null;
          ancestors = null; // Scroll into View

          if (typeof window !== 'undefined') {
            window.scroll({
              top: 0
            });
          }

          if (!(currentPath === '/')) {
            _context2.next = 41;
            break;
          }

          _context2.next = 38;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.getRoot({
            entryFields: '*',
            entryLinkDepth: 4,
            language: 'en-GB'
          });

        case 38:
          pathNode = _context2.sent;
          _context2.next = 65;
          break;

        case 41:
          if (!(currentPath && currentPath.startsWith('/preview/'))) {
            _context2.next = 58;
            break;
          }

          _splitPath = currentPath.split('/');
          _entryGuid = _splitPath[2];

          if (!(_splitPath.length == 3)) {
            _context2.next = 56;
            break;
          }

          _context2.next = 47;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).entries.get({
            id: _entryGuid,
            linkDepth: 4
          });

        case 47:
          _previewEntry = _context2.sent;

          if (!_previewEntry) {
            _context2.next = 53;
            break;
          }

          _context2.next = 51;
          return (0, _effects.call)(setRouteEntry, _previewEntry);

        case 51:
          _context2.next = 55;
          break;

        case 53:
          _context2.next = 55;
          return (0, _effects.call)(do404);

        case 55:
          return _context2.abrupt("return", true);

        case 56:
          _context2.next = 61;
          break;

        case 58:
          _context2.next = 60;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.get({
            path: currentPath,
            entryFields: '*',
            entryLinkDepth: 4
          });

        case 60:
          pathNode = _context2.sent;

        case 61:
          if (!pathNode) {
            _context2.next = 65;
            break;
          }

          _context2.next = 64;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.getAncestors(pathNode.id);

        case 64:
          ancestors = _context2.sent;

        case 65:
          if (!(pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id)) {
            _context2.next = 71;
            break;
          }

          entry = pathNode.entry;
          _context2.next = 69;
          return (0, _effects.call)(setRouteEntry, entry, pathNode, ancestors);

        case 69:
          _context2.next = 73;
          break;

        case 71:
          _context2.next = 73;
          return (0, _effects.call)(do404);

        case 73:
          if (!(withEvents && withEvents.onRouteLoaded)) {
            _context2.next = 76;
            break;
          }

          _context2.next = 76;
          return withEvents.onRouteLoaded(_objectSpread({}, action, {
            entry: entry
          }));

        case 76:
          if ((0, _navigation2.hasNavigationTree)(state)) {
            _context2.next = 79;
            break;
          }

          _context2.next = 79;
          return (0, _effects.put)({
            type: _navigation.GET_NODE_TREE
          });

        case 79:
          _context2.next = 86;
          break;

        case 81:
          _context2.prev = 81;
          _context2.t0 = _context2["catch"](1);
          log.error.apply(log, ['Error running route saga:', _context2.t0, _context2.t0.stack]);
          _context2.next = 86;
          return (0, _effects.call)(do404);

        case 86:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[1, 81]]);
}

function setRouteEntry(entry, node, ancestors) {
  return _regenerator.default.wrap(function setRouteEntry$(_context3) {
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
            id: entry.sys.id
          }), (0, _effects.put)({
            type: _routing.SET_ANCESTORS,
            ancestors: ancestors
          })]);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

function do404() {
  return _regenerator.default.wrap(function do404$(_context4) {
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
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__49__;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureNodeTreeSaga = ensureNodeTreeSaga;
exports.navigationSagas = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(5));

var _effects = __webpack_require__(12);

var _ContensisDeliveryApi = __webpack_require__(3);

var _navigation = __webpack_require__(11);

var _navigation2 = __webpack_require__(14);

var _version = __webpack_require__(22);

var _routing = __webpack_require__(9);

var _marked =
/*#__PURE__*/
_regenerator.default.mark(ensureNodeTreeSaga);

var navigationSagas = [(0, _effects.takeEvery)(_navigation.GET_NODE_TREE, ensureNodeTreeSaga)];
exports.navigationSagas = navigationSagas;

function ensureNodeTreeSaga() {
  var state, deliveryApiVersionStatus, project, nodes;
  return _regenerator.default.wrap(function ensureNodeTreeSaga$(_context) {
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactHotLoader = __webpack_require__(15);

var _RouteLoader = _interopRequireDefault(__webpack_require__(25));

var AppRoot = function AppRoot(props) {
  return _react.default.createElement(_RouteLoader.default, props);
};

var _default = AppRoot;
exports.default = _default;

/***/ }),
/* 52 */
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(54);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__55__;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var NotFound = function NotFound() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("header", null, _react.default.createElement("h1", null, "404 Page Not Found")));
};

var _default = NotFound;
exports.default = _default;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Status = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(23));

var _reactRouterDom = __webpack_require__(10);

var Status = function Status(_ref) {
  var code = _ref.code,
      children = _ref.children;
  return _react.default.createElement(_reactRouterDom.Route, {
    render: function render(_ref2) {
      var staticContext = _ref2.staticContext;
      if (staticContext) staticContext.status = code;
      return children;
    }
  });
};

exports.Status = Status;
Status.propTypes = {
  code: _propTypes.default.number.isRequired,
  children: _propTypes.default.element
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toJS = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _immutable = __webpack_require__(2);

var toJS = function toJS(WrappedComponent) {
  return function (wrappedComponentProps) {
    var KEY = 0;
    var VALUE = 1;
    var propsJS = Object.entries(wrappedComponentProps).reduce(function (newProps, wrappedComponentProp) {
      newProps[wrappedComponentProp[KEY]] = _immutable.Iterable.isIterable(wrappedComponentProp[VALUE]) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
      return newProps;
    }, {});
    return _react.default.createElement(WrappedComponent, propsJS);
  };
};

exports.toJS = toJS;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var internalServer = __webpack_require__(60).default;

exports.app = internalServer.app;
exports.httpProxy = internalServer.apiProxy;
exports.start = internalServer.start;

var ReactApp = __webpack_require__(51).default;

var RouteLoader = __webpack_require__(25).default;

exports.ReactApp = ReactApp;
exports.RouteLoader = RouteLoader;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(7);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(26);

var _express = _interopRequireDefault(__webpack_require__(61));

var _reactLoadable = _interopRequireDefault(__webpack_require__(24));

var _displayStartupConfiguration = _interopRequireDefault(__webpack_require__(62));

var _localDns = _interopRequireDefault(__webpack_require__(63));

var _reverseProxies = _interopRequireWildcard(__webpack_require__(66));

var _webApp = _interopRequireDefault(__webpack_require__(68));

// import ServerFeatures from './features/configure';
var app = (0, _express.default)();

var start = function start(ReactApp, config, ServerFeatures) {
  app.disable('x-powered-by'); // Output some information about the used build/startup configuration

  (0, _displayStartupConfiguration.default)(config); // Configure DNS to make life easier

  (0, _localDns.default)(); // Set-up local proxy for images from cms, to save doing rewrites and extra code

  ServerFeatures(app);
  (0, _reverseProxies.default)(app, config.reverseProxyPaths);
  (0, _webApp.default)(app, ReactApp, config);
  app.use('/static', _express.default.static('dist/static', {
    maxage: '31557600h'
  }));
  app.on('ready', function () {
    _reactLoadable.default.preloadAll().then(function () {
      var server = app.listen(3001, function () {
        console.info("HTTP server is listening @ port 3001");
        setTimeout(function () {
          app.emit('app_started');
        }, 500);
      });
      app.on('stop', function () {
        server.close(function () {
          console.info('GoodBye :(');
        });
      });
    });
  });
};

var _default = {
  app: app,
  apiProxy: _reverseProxies.apiProxy,
  start: start
};
exports.default = _default;

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__61__;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var servers = SERVERS;
/* global SERVERS */

var projects = PROJECTS;
/* global PROJECTS */

var DisplayStartupConfiguration = function DisplayStartupConfiguration(config) {
  /* eslint-disable no-console */
  console.log();
  console.log("Configured servers:\n", JSON.stringify(servers, null, 2));
  console.log();
  console.log("Configured projects:\n", JSON.stringify(projects, null, 2));
  console.log();
  console.log('Reverse proxy paths: ', JSON.stringify(config.reverseProxyPaths, null, 2));
  console.log();
  /* eslint-enable no-console */
};

var _default = DisplayStartupConfiguration;
exports.default = _default;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evilDns = _interopRequireDefault(__webpack_require__(64));

var _fetchMyIp = _interopRequireDefault(__webpack_require__(65));

var servers = SERVERS;
/* global SERVERS */

var apiConfig = DELIVERY_API_CONFIG;
/* global DELIVERY_API_CONFIG */

var localDns = function localDns() {
  var disableDnsChanges = false;

  var configureLocalEndpoint = function configureLocalEndpoint() {
    if (!disableDnsChanges) {
      _evilDns.default.add("*".concat(servers.alias, ".cloud.contensis.com"), servers.internalVip);

      if (apiConfig.internalIp) _evilDns.default.add(apiConfig.rootUrl, apiConfig.internalIp);
    }
  }; // Break api.ipify to test
  // evilDns.add('api.ipify.org', '8.8.8.8');


  (0, _fetchMyIp.default)(servers, configureLocalEndpoint);
};

var _default = localDns;
exports.default = _default;

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__64__;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var fetchMyIp = function fetchMyIp(env, configureLocalEndpoint) {
  /* eslint-disable no-console */
  fetch('https://api.ipify.org?format=json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }, function (error) {
    console.log("Could not work out where I am so defaulting to local DNS, as I am probably running as a container this is what matters most. Not developers at home or tests :( Sorry. error: ".concat(error));
    configureLocalEndpoint();
  }).then(function (ipJson) {
    console.log("Current public ip -> ".concat(JSON.stringify(ipJson)));

    if (ipJson.ip.startsWith('185.18.13')) {
      console.log("Using local endpoint for ".concat(env.alias, " -> ").concat(env.internalVip));
      configureLocalEndpoint();
    } else {
      console.log("Outside Zengenti network, use real DNS.");
    }
  }).catch(function (error) {
    configureLocalEndpoint();
    console.log("Could not work out where I am so defaulting to local DNS, as I am probably running as a container this is what matters most. Not developers at home or tests :( Sorry. error: ".concat(error));
  });
  /* eslint-enable no-console */
};

var _default = fetchMyIp;
exports.default = _default;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.apiProxy = void 0;

var _httpProxy = _interopRequireDefault(__webpack_require__(67));

var servers = SERVERS;
/* global SERVERS */

var apiProxy = _httpProxy.default.createProxyServer();

exports.apiProxy = apiProxy;

var reverseProxies = function reverseProxies(app, reverseProxyPaths) {
  deliveryApiProxy(apiProxy, app);
  app.all(reverseProxyPaths, function (req, res) {
    var target = servers.iis;
    apiProxy.web(req, res, {
      target: target,
      changeOrigin: true
    });
    apiProxy.on('error', function (e) {
      /* eslint-disable no-console */
      console.log("Proxy Request for ".concat(req.path, " HostName:").concat(req.hostname, " failed with ").concat(e));
      /* eslint-enable no-console */
    });
  });
};

var deliveryApiProxy = function deliveryApiProxy(apiProxy, app) {
  // This is just here to stop cors requests on localhost. In Production this is mapped using varnish.
  app.all(['/api/delivery/*'], function (req, res) {
    /* eslint-disable no-console */
    var target = servers.cms;
    console.log("Proxying api request to ".concat(servers.alias));
    apiProxy.web(req, res, {
      target: target,
      changeOrigin: true
    });
    apiProxy.on('error', function (e) {
      /* eslint-disable no-console */
      console.log("Proxy request for ".concat(req.path, " HostName:").concat(req.hostname, " failed with ").concat(e));
      /* eslint-enable no-console */
    });
  });
};

var _default = reverseProxies;
exports.default = _default;

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
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(8));

var _fs = _interopRequireDefault(__webpack_require__(69));

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactRouterDom = __webpack_require__(10);

var _reactRedux = __webpack_require__(16);

var _reactLoadable = _interopRequireDefault(__webpack_require__(24));

var _server = __webpack_require__(70);

var _webpack = __webpack_require__(71);

var _styledComponents = __webpack_require__(72);

var _reactHelmet = _interopRequireDefault(__webpack_require__(73));

var _serializeJavascript = _interopRequireDefault(__webpack_require__(74));

var _minifyCssString = _interopRequireDefault(__webpack_require__(75));

var _history = __webpack_require__(30);

var _types = __webpack_require__(76);

var _pickProject = _interopRequireDefault(__webpack_require__(32));

var _ContensisDeliveryApi = __webpack_require__(3);

var _routing = __webpack_require__(18);

var _version = __webpack_require__(37);

var _navigation = __webpack_require__(14);

var _routing2 = __webpack_require__(9);

var _store = _interopRequireDefault(__webpack_require__(38));

var _index = _interopRequireDefault(__webpack_require__(47));

var _immutable = __webpack_require__(2);

var addStandardHeaders = function addStandardHeaders(state, response, packagejson, allowedGroups) {
  if (state) {
    /* eslint-disable no-console */
    try {
      console.log('About to add header');
      var navDepends = (0, _navigation.selectNavigationDepends)(state);
      var recordDepends = (0, _routing2.selectRouteEntryDepends)(state);
      navDepends = navDepends.toJS();
      recordDepends = recordDepends.toJS();
      console.log("navDepends count: ".concat(navDepends.length));
      console.log("recordDepends count: ".concat(recordDepends.length));
      var allDepends = [].concat((0, _toConsumableArray2.default)(navDepends), (0, _toConsumableArray2.default)(recordDepends));
      var allDependsHeaderValue = allDepends.join(' ');
      allDependsHeaderValue = " ".concat(packagejson.name, "-app ").concat(allDependsHeaderValue, " ").concat(packagejson.name, "-app");
      response.header('surrogate-key', allDependsHeaderValue);
      addVarnishAuthenticationHeaders(state, response, allowedGroups);
    } catch (e) {
      console.log('Error Adding headers');
      console.log(e);
    }
  }

  response.setHeader('Surrogate-Control', 'max-age=3600');
};

var addVarnishAuthenticationHeaders = function addVarnishAuthenticationHeaders(state, response, allowedGroups) {
  if (state) {
    try {
      var stateEntry = (0, _routing2.selectRouteEntry)(state);
      var project = (0, _routing2.selectCurrentProject)(state);

      if (stateEntry && stateEntry.getIn(['authentication', 'isLoginRequired'])) {
        response.header('x-contensis-viewer-groups', allowedGroups[project].join('|'));
      }
    } catch (e) {
      console.log('Error adding authentication header');
      console.log(e);
    }
  }
};

var webApp = function webApp(app, ReactApp, config) {
  var routes = config.routes,
      withReducers = config.withReducers,
      withSagas = config.withSagas,
      withEvents = config.withEvents,
      packagejson = config.packagejson,
      versionData = config.versionData,
      dynamicPaths = config.dynamicPaths,
      allowedGroups = config.allowedGroups,
      disableSsrRedux = config.disableSsrRedux;
  var templates = {
    templateHTML: _fs.default.readFileSync(config.templates.html, 'utf8'),
    templateHTMLStatic: _fs.default.readFileSync(config.templates.static, 'utf8'),
    templateHTMLFragment: _fs.default.readFileSync(config.templates.fragment, 'utf8')
  };
  var stats = JSON.parse(_fs.default.readFileSync(config.stats));
  var versionInfo = JSON.parse(_fs.default.readFileSync(versionData, 'utf8'));
  app.get('/*', function (request, response, next) {
    if (request.originalUrl.startsWith('/static/')) return next();
    var url = request.url; // Determine functional params and set access methods

    var accessMethod = {};
    var isDynamicNormalised = request.query.dynamic ? request.query.dynamic.toLowerCase() : 'false'; // Hack for certain pages to avoid SSR

    var onlyDynamic = dynamicPaths.includes(request.path);
    var isReduxRequestNormalised = request.query.redux ? request.query.redux.toLowerCase() : 'false';
    var isFragmentNormalised = request.query.fragment ? request.query.fragment.toLowerCase() : 'false';
    var isStaticNormalised = request.query.static ? request.query.static.toLowerCase() : 'false';
    if (onlyDynamic || isDynamicNormalised === 'true') accessMethod.DYNAMIC = _types.AccessMethods.DYNAMIC;
    if (isReduxRequestNormalised === 'true') accessMethod.REDUX = _types.AccessMethods.REDUX;
    if (isFragmentNormalised === 'true') accessMethod.FRAGMENT = _types.AccessMethods.FRAGMENT;
    if (isStaticNormalised === 'true') accessMethod.STATIC = _types.AccessMethods.STATIC;
    var context = {};
    var status = 200; // Create a store (with a memory history) from our current url

    var store = (0, _store.default)(withReducers, (0, _immutable.fromJS)({}), (0, _history.history)({
      initialEntries: [url]
    })); //const store = createStore(withReducers);
    // dispatch any global and non-saga related actions before calling our JSX

    var versionStatusFromHostname = (0, _ContensisDeliveryApi.GetDeliveryApiStatusFromHostname)(request.hostname);
    store.dispatch((0, _version.setVersionStatus)(versionStatusFromHostname));
    store.dispatch((0, _version.setVersion)(versionInfo.commitRef, versionInfo.buildNo));
    var project = (0, _pickProject.default)(request.hostname, request.query);
    var groups = allowedGroups && allowedGroups[project];
    store.dispatch((0, _routing.setCurrentProject)(project, groups));
    var modules = [];

    var jsx = _react.default.createElement(_reactLoadable.default.Capture, {
      report: function report(moduleName) {
        return modules.push(moduleName);
      }
    }, _react.default.createElement(_reactRedux.Provider, {
      store: store
    }, _react.default.createElement(_reactRouterDom.StaticRouter, {
      context: context,
      location: url
    }, _react.default.createElement(ReactApp, {
      routes: routes,
      withEvents: withEvents
    }))));
    /* eslint-disable no-console */


    console.log("Request for ".concat(request.path, " hostname: ").concat(request.hostname, " versionStatus: ").concat(versionStatusFromHostname));
    /* eslint-enable no-console */

    var templateHTML = templates.templateHTML,
        templateHTMLFragment = templates.templateHTMLFragment,
        templateHTMLStatic = templates.templateHTMLStatic; // Serve a blank HTML page with client scripts to load the app in the browser

    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      (0, _server.renderToString)(jsx);
      var isDynamicHint = "<script>window.isDynamic = true;</script>";
      var dynamicBundles = (0, _webpack.getBundles)(stats, modules);
      var dynamicBundleScripts = dynamicBundles.map(function (bundle) {
        return "<script src=\"".concat(bundle.publicPath, "\"></script>");
      }).join('');
      var responseHtmlDynamic = templateHTML.replace('{{TITLE}}', '').replace('{{SEO_CRITICAL_METADATA}}', '').replace('{{CRITICAL_CSS}}', '').replace('{{APP}}', '').replace('{{LOADABLE_CHUNKS}}', dynamicBundleScripts).replace('{{REDUX_DATA}}', isDynamicHint);
      response.setHeader('Surrogate-Control', 'max-age=3600');
      response.status(status).send(responseHtmlDynamic);
    } // Render the JSX server side and send response as per access method options


    if (!accessMethod.DYNAMIC) {
      store.runSaga((0, _index.default)(withSagas)).toPromise().then(function () {
        var sheet = new _styledComponents.ServerStyleSheet();
        var html = (0, _server.renderToString)(sheet.collectStyles(jsx));

        var helmet = _reactHelmet.default.renderStatic();

        _reactHelmet.default.rewind();

        var title = helmet.title.toString();
        var metadata = helmet.meta.toString();

        if (context.status === 404) {
          status = 404;
          title = '<title>404 page not found</title>';
        }

        if (context.url) {
          return response.redirect(302, context.url);
        }

        var reduxState = store.getState();
        var styleTags = sheet.getStyleTags();
        var bundles = (0, _webpack.getBundles)(stats, modules);
        var bundleScripts = bundles.map(function (bundle) {
          return "<script src=\"".concat(bundle.publicPath, "\"></script>");
        }).join('');
        var serialisedReduxData = '';

        if (context.status !== 404) {
          if (accessMethod.REDUX) {
            serialisedReduxData = (0, _serializeJavascript.default)(reduxState);
            addStandardHeaders(reduxState, response, packagejson, allowedGroups);
            response.status(status).json(serialisedReduxData);
            return true;
          }

          if (!disableSsrRedux) {
            serialisedReduxData = (0, _serializeJavascript.default)(reduxState);
            serialisedReduxData = "<script>window.REDUX_DATA = ".concat(serialisedReduxData, "</script>");
          }
        }

        if (context.status === 404) {
          accessMethod.STATIC = _types.AccessMethods.STATIC;
        } // Responses


        var responseHTML = ''; // Static page served as a fragment

        if (accessMethod.FRAGMENT && accessMethod.STATIC) {
          addStandardHeaders(reduxState, response, packagejson, allowedGroups);
          responseHTML = (0, _minifyCssString.default)(styleTags) + html;
        } // Page fragment served with client scripts and redux data that hydrate the app client side


        if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTMLFragment.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', (0, _minifyCssString.default)(styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleScripts).replace('{{REDUX_DATA}}', serialisedReduxData);
        } // Full HTML page served statically


        if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = templateHTMLStatic.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', (0, _minifyCssString.default)(styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', '');
        } // Full HTML page served with client scripts and redux data that hydrate the app client side


        if (!accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTML.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', styleTags).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleScripts).replace('{{REDUX_DATA}}', serialisedReduxData);
        }

        addStandardHeaders(reduxState, response, packagejson, allowedGroups);
        response.status(status).send(responseHTML);
      }).catch(function (err) {
        // Handle any error that occurred in any of the previous
        // promises in the chain.

        /* eslint-disable no-console */
        console.log(err);
        /* eslint-enable no-console */

        response.status(500).send("Error occurred: <br />".concat(err.stack, " <br />").concat(JSON.stringify(err)));
      });
      (0, _server.renderToString)(jsx);
      store.close();
    }
  });
};

var _default = webApp;
exports.default = _default;

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__70__;

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__71__;

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__72__;

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__73__;

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__74__;

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__75__;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessMethods = void 0;
var AccessMethods = {
  DYNAMIC: 'dynamic',
  STATIC: 'static',
  FRAGMENT: 'fragment',
  REDUX: 'redux'
};
exports.AccessMethods = AccessMethods;

/***/ })
/******/ ]);
});
//# sourceMappingURL=zengenti-isomorphic-base.js.map