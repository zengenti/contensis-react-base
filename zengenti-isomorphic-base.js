(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@babel/runtime/helpers/interopRequireDefault"), require("react"), require("immutable"), require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/interopRequireWildcard"), require("@babel/runtime/helpers/defineProperty"), require("@babel/runtime/helpers/toConsumableArray"), require("react-router-dom"), require("@babel/runtime/helpers/asyncToGenerator"), require("react-hot-loader"), require("prop-types"), require("react-redux"), require("@babel/runtime/helpers/typeof"), require("contensis-delivery-api"), require("@redux-saga/core/effects"), require("react-router-config"), require("react-loadable"), require("@babel/runtime/helpers/classCallCheck"), require("query-string"), require("isomorphic-fetch"), require("history"), require("@babel/runtime/helpers/createClass"), require("redux"), require("redux-immutable"), require("redux-thunk"), require("redux-saga"), require("loglevel"), require("@babel/runtime/helpers/construct"), require("express"), require("evil-dns"), require("http-proxy"), require("react-dom/server"), require("react-loadable/webpack"), require("styled-components"), require("react-helmet"), require("browserslist-useragent"), require("serialize-javascript"), require("minify-css-string"), require("xxhashjs"));
	else if(typeof define === 'function' && define.amd)
		define(["@babel/runtime/helpers/interopRequireDefault", "react", "immutable", "@babel/runtime/regenerator", "@babel/runtime/helpers/interopRequireWildcard", "@babel/runtime/helpers/defineProperty", "@babel/runtime/helpers/toConsumableArray", "react-router-dom", "@babel/runtime/helpers/asyncToGenerator", "react-hot-loader", "prop-types", "react-redux", "@babel/runtime/helpers/typeof", "contensis-delivery-api", "@redux-saga/core/effects", "react-router-config", "react-loadable", "@babel/runtime/helpers/classCallCheck", "query-string", "isomorphic-fetch", "history", "@babel/runtime/helpers/createClass", "redux", "redux-immutable", "redux-thunk", "redux-saga", "loglevel", "@babel/runtime/helpers/construct", "express", "evil-dns", "http-proxy", "react-dom/server", "react-loadable/webpack", "styled-components", "react-helmet", "browserslist-useragent", "serialize-javascript", "minify-css-string", "xxhashjs"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@babel/runtime/helpers/interopRequireDefault"), require("react"), require("immutable"), require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/interopRequireWildcard"), require("@babel/runtime/helpers/defineProperty"), require("@babel/runtime/helpers/toConsumableArray"), require("react-router-dom"), require("@babel/runtime/helpers/asyncToGenerator"), require("react-hot-loader"), require("prop-types"), require("react-redux"), require("@babel/runtime/helpers/typeof"), require("contensis-delivery-api"), require("@redux-saga/core/effects"), require("react-router-config"), require("react-loadable"), require("@babel/runtime/helpers/classCallCheck"), require("query-string"), require("isomorphic-fetch"), require("history"), require("@babel/runtime/helpers/createClass"), require("redux"), require("redux-immutable"), require("redux-thunk"), require("redux-saga"), require("loglevel"), require("@babel/runtime/helpers/construct"), require("express"), require("evil-dns"), require("http-proxy"), require("react-dom/server"), require("react-loadable/webpack"), require("styled-components"), require("react-helmet"), require("browserslist-useragent"), require("serialize-javascript"), require("minify-css-string"), require("xxhashjs")) : factory(root["@babel/runtime/helpers/interopRequireDefault"], root["react"], root["immutable"], root["@babel/runtime/regenerator"], root["@babel/runtime/helpers/interopRequireWildcard"], root["@babel/runtime/helpers/defineProperty"], root["@babel/runtime/helpers/toConsumableArray"], root["react-router-dom"], root["@babel/runtime/helpers/asyncToGenerator"], root["react-hot-loader"], root["prop-types"], root["react-redux"], root["@babel/runtime/helpers/typeof"], root["contensis-delivery-api"], root["@redux-saga/core/effects"], root["react-router-config"], root["react-loadable"], root["@babel/runtime/helpers/classCallCheck"], root["query-string"], root["isomorphic-fetch"], root["history"], root["@babel/runtime/helpers/createClass"], root["redux"], root["redux-immutable"], root["redux-thunk"], root["redux-saga"], root["loglevel"], root["@babel/runtime/helpers/construct"], root["express"], root["evil-dns"], root["http-proxy"], root["react-dom/server"], root["react-loadable/webpack"], root["styled-components"], root["react-helmet"], root["browserslist-useragent"], root["serialize-javascript"], root["minify-css-string"], root["xxhashjs"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__14__, __WEBPACK_EXTERNAL_MODULE__15__, __WEBPACK_EXTERNAL_MODULE__17__, __WEBPACK_EXTERNAL_MODULE__18__, __WEBPACK_EXTERNAL_MODULE__23__, __WEBPACK_EXTERNAL_MODULE__24__, __WEBPACK_EXTERNAL_MODULE__26__, __WEBPACK_EXTERNAL_MODULE__29__, __WEBPACK_EXTERNAL_MODULE__33__, __WEBPACK_EXTERNAL_MODULE__34__, __WEBPACK_EXTERNAL_MODULE__35__, __WEBPACK_EXTERNAL_MODULE__36__, __WEBPACK_EXTERNAL_MODULE__38__, __WEBPACK_EXTERNAL_MODULE__40__, __WEBPACK_EXTERNAL_MODULE__42__, __WEBPACK_EXTERNAL_MODULE__43__, __WEBPACK_EXTERNAL_MODULE__44__, __WEBPACK_EXTERNAL_MODULE__45__, __WEBPACK_EXTERNAL_MODULE__52__, __WEBPACK_EXTERNAL_MODULE__54__, __WEBPACK_EXTERNAL_MODULE__65__, __WEBPACK_EXTERNAL_MODULE__68__, __WEBPACK_EXTERNAL_MODULE__71__, __WEBPACK_EXTERNAL_MODULE__74__, __WEBPACK_EXTERNAL_MODULE__75__, __WEBPACK_EXTERNAL_MODULE__76__, __WEBPACK_EXTERNAL_MODULE__77__, __WEBPACK_EXTERNAL_MODULE__78__, __WEBPACK_EXTERNAL_MODULE__79__, __WEBPACK_EXTERNAL_MODULE__80__, __WEBPACK_EXTERNAL_MODULE__83__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
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
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
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

var _defineProperty2 = _interopRequireDefault(__webpack_require__(7));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(34));

var _createClass2 = _interopRequireDefault(__webpack_require__(40));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(9));

var _typeof2 = _interopRequireDefault(__webpack_require__(23));

var _contensisDeliveryApi = __webpack_require__(24);

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
  var unique = (0, _toConsumableArray2["default"])(new Set(returnItems));
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
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRouteLoading = exports.selectCurrentAncestors = exports.selectIsNotFound = exports.selectCurrentProject = exports.selectCurrentSearch = exports.selectCurrentPath = exports.selectRouteEntryID = exports.selectRouteEntrySlug = exports.selectRouteEntryContentTypeId = exports.selectRouteEntryEntryId = exports.selectEntryDepends = exports.selectCurrentTreeID = exports.selectNodeDepends = exports.selectRouteEntry = void 0;

var _immutable = __webpack_require__(2);

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
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ }),
/* 10 */
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

var _regenerator = _interopRequireDefault(__webpack_require__(3));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(14));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(7));

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
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRouteEntry = exports.setRoute = exports.setCurrentProject = exports.setNavigationPath = exports.setNotFound = void 0;

var _helpers = __webpack_require__(10);

var _routing = __webpack_require__(4);

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
/* 13 */
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
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__14__;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__17__;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__18__;

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _interopRequireDefault = __webpack_require__(0);

var _interopRequireWildcard = __webpack_require__(5);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(17));

var _reactRedux = __webpack_require__(18);

var _reactHotLoader = __webpack_require__(15);

var _reactRouterDom = __webpack_require__(11);

var _reactRouterConfig = __webpack_require__(29);

var _routing = __webpack_require__(8);

var _routing2 = __webpack_require__(12);

var _NotFound = _interopRequireDefault(__webpack_require__(30));

var _Status = __webpack_require__(31);

var _ToJs = __webpack_require__(32);

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
      withEvents = _ref.withEvents;
  var location = (0, _reactRouterDom.useLocation)(); // Match any Static Routes a developer has defined

  var matchedStaticRoute = function matchedStaticRoute(pathname) {
    return (0, _reactRouterConfig.matchRoutes)(routes.StaticRoutes, typeof window != 'undefined' ? window.location.pathname : pathname);
  };

  var isStaticRoute = function isStaticRoute(pathname) {
    return matchedStaticRoute(pathname).length > 0;
  };

  var trimmedPath = getTrimmedPath(location.pathname);
  var staticRoute = isStaticRoute(trimmedPath) && matchedStaticRoute(trimmedPath)[0];
  var setPath = (0, _react.useCallback)(function () {
    var serverPath = null;

    if (staticRoute) {
      serverPath = staticRoute.route.path.split('/').filter(function (p) {
        return !p.startsWith(':');
      }).join('/');
    }

    setNavigationPath(serverPath || trimmedPath, location, staticRoute, withEvents, statePath, routes); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNavigationPath, staticRoute, withEvents, location, routes, // statePath,
  trimmedPath]);
  if (typeof window == 'undefined') setPath();
  (0, _react.useEffect)(function () {
    setPath();
  }, [location, setPath]); // Render any Static Routes a developer has defined

  if (isStaticRoute(trimmedPath)) {
    return (0, _reactRouterConfig.renderRoutes)(routes.StaticRoutes, {
      projectId: projectId,
      contentTypeId: contentTypeId,
      entry: entry
    });
  } // Need to redirect when url endswith a /


  if (location.pathname.length > trimmedPath.length) {
    return _react["default"].createElement(_reactRouterDom.Redirect, {
      to: trimmedPath
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
        entry: entry
      });
    }
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
  entry: _propTypes["default"].object,
  isNotFound: _propTypes["default"].bool,
  setNavigationPath: _propTypes["default"].func
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
  setNavigationPath: _routing2.setNavigationPath
};

var _default = (0, _reactHotLoader.hot)(module)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _ToJs.toJS)(RouteLoader)));

exports["default"] = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(28)(module)))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__23__;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__24__;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setVersionStatus = exports.setVersion = void 0;

var _helpers = __webpack_require__(10);

var _version = __webpack_require__(16);

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
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__26__;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactHotLoader = __webpack_require__(15);

var _RouteLoader = _interopRequireDefault(__webpack_require__(22));

var AppRoot = function AppRoot(props) {
  return _react["default"].createElement(_RouteLoader["default"], props);
};

var _default = AppRoot;
exports["default"] = _default;

/***/ }),
/* 28 */
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
/* 29 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__29__;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var NotFound = function NotFound() {
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("header", null, _react["default"].createElement("h1", null, "404 Page Not Found")));
};

var _default = NotFound;
exports["default"] = _default;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Status = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _propTypes = _interopRequireDefault(__webpack_require__(17));

var _reactRouterDom = __webpack_require__(11);

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
/* 32 */
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
    return _react["default"].createElement(WrappedComponent, propsJS);
  };
};

exports.toJS = toJS;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__33__;

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

module.exports = __WEBPACK_EXTERNAL_MODULE__36__;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserHistory = exports.history = void 0;

var _history = __webpack_require__(38);

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
/* 38 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__38__;

/***/ }),
/* 39 */
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
/* 40 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__40__;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(5);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(7));

var _redux = __webpack_require__(42);

var _reduxImmutable = __webpack_require__(43);

var _reduxThunk = _interopRequireDefault(__webpack_require__(44));

var _reduxSaga = _interopRequireWildcard(__webpack_require__(45));

var _routing = _interopRequireDefault(__webpack_require__(46));

var _version = _interopRequireDefault(__webpack_require__(47));

var _navigation = _interopRequireDefault(__webpack_require__(48));

var _routerMiddleware = _interopRequireDefault(__webpack_require__(49));

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
/* 42 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__42__;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__43__;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__44__;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__45__;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = __webpack_require__(2);

var _routing = __webpack_require__(4);

var _ContensisDeliveryApi = __webpack_require__(6);

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
        var entryDepends = (0, _ContensisDeliveryApi.GetAllResponseGuids)(action.entry);
        return state.set('entryDepends', (0, _immutable.fromJS)(entryDepends)).set('entry', (0, _immutable.fromJS)(action.entry));
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
        if (action.path) {
          return state.set('currentPath', (0, _immutable.fromJS)(action.path)).set('location', (0, _immutable.fromJS)(action.location)).set('staticRoute', (0, _immutable.fromJS)(action.staticRoute));
        }

        return state;
      }

    case _routing.SET_NAVIGATION_NOT_FOUND:
      {
        return state.set('notFound', (0, _immutable.fromJS)(action.notFound));
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

    case _routing.SET_ROUTE_LOADING:
      {
        return state.set('routeLoading', action.loading);
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
        return state.set('currentProject', action.project).set('allowedGroups', (0, _immutable.fromJS)(action.allowedGroups));
      }

    default:
      return state;
  }
};

exports["default"] = _default;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = __webpack_require__(2);

var _version = __webpack_require__(16);

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = __webpack_require__(2);

var _navigation = __webpack_require__(13);

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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(9));

var _routing = __webpack_require__(4);

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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _regenerator = _interopRequireDefault(__webpack_require__(3));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(9));

var _effects = __webpack_require__(19);

var _routing = __webpack_require__(51);

var _navigation = __webpack_require__(60);

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
              subSagas = [].concat((0, _toConsumableArray2["default"])(_routing.routingSagas), (0, _toConsumableArray2["default"])(_navigation.navigationSagas));
              _context.next = 3;
              return (0, _effects.all)([].concat((0, _toConsumableArray2["default"])(subSagas), (0, _toConsumableArray2["default"])(featureSagas)));

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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(5);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routingSagas = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(7));

var _regenerator = _interopRequireDefault(__webpack_require__(3));

var log = _interopRequireWildcard(__webpack_require__(52));

var _effects = __webpack_require__(19);

var _routing = __webpack_require__(4);

var _ContensisDeliveryApi = __webpack_require__(6);

var _version = __webpack_require__(20);

var _routing2 = __webpack_require__(8);

var _navigation = __webpack_require__(13);

var _navigation2 = __webpack_require__(21);

var _queries = __webpack_require__(53);

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
  var entry, withEvents, routes, appsays, state, routeEntry, currentPath, deliveryApiStatus, project, pathNode, ancestors, siblings, currentPathDepth, splitPath, entryGuid, previewEntry, contentType, query, payload;
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
          _context2.next = 9;
          return (0, _effects.select)();

        case 9:
          state = _context2.sent;
          routeEntry = (0, _routing2.selectRouteEntry)(state);

          if (!(appsays && appsays.customRouting || action.staticRoute && !action.staticRoute.route.fetchNode || routeEntry && action.statePath === action.path)) {
            _context2.next = 15;
            break;
          }

          // To prevent erroneous 404s and wasted network calls, this covers
          // - customRouting and SET_ENTRY via the consuming app
          // - all staticRoutes (where custom 'route.fetchNode' attribute is falsey)
          // - standard Contensis SiteView Routing where we already have the entry
          if (routeEntry) entry = routeEntry.toJS();
          _context2.next = 70;
          break;

        case 15:
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
            _context2.next = 28;
            break;
          }

          _context2.next = 25;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.getRoot({
            depth: 0,
            entryFields: '*',
            entryLinkDepth: 4,
            language: 'en-GB'
          });

        case 25:
          pathNode = _context2.sent;
          _context2.next = 62;
          break;

        case 28:
          if (!(currentPath && currentPath.startsWith('/preview/'))) {
            _context2.next = 44;
            break;
          }

          splitPath = currentPath.split('/');
          entryGuid = splitPath[2];

          if (!(splitPath.length == 3)) {
            _context2.next = 42;
            break;
          }

          _context2.next = 34;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).entries.get({
            id: entryGuid,
            linkDepth: 4
          });

        case 34:
          previewEntry = _context2.sent;

          if (!previewEntry) {
            _context2.next = 40;
            break;
          }

          _context2.next = 38;
          return (0, _effects.call)(setRouteEntry, previewEntry);

        case 38:
          _context2.next = 42;
          break;

        case 40:
          _context2.next = 42;
          return (0, _effects.call)(do404);

        case 42:
          _context2.next = 54;
          break;

        case 44:
          _context2.next = 46;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.get({
            depth: 0,
            path: currentPath,
            entryFields: ['sys.contentTypeId', 'sys.id'],
            entryLinkDepth: 0
          });

        case 46:
          pathNode = _context2.sent;

          if (!(pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id)) {
            _context2.next = 54;
            break;
          }

          contentType = routes && routes.ContentTypeMappings && routes.ContentTypeMappings.find(function (ct) {
            return ct.contentTypeID === pathNode.entry.sys.contentTypeId;
          });
          query = (0, _queries.routeEntryByFields)(pathNode.entry.sys.id, contentType && contentType.fields, deliveryApiStatus);
          _context2.next = 52;
          return _ContensisDeliveryApi.deliveryApi.search(query, contentType && contentType.linkDepth || 3, project);

        case 52:
          payload = _context2.sent;

          if (payload && payload.items && payload.items.length > 0) {
            pathNode.entry = payload.items[0];
          }

        case 54:
          if (!(pathNode && pathNode.id)) {
            _context2.next = 62;
            break;
          }

          _context2.next = 57;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.getAncestors(pathNode.id);

        case 57:
          ancestors = _context2.sent;

          if (!(currentPathDepth > 1)) {
            _context2.next = 62;
            break;
          }

          _context2.next = 61;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.getSiblings({
            id: pathNode.id,
            entryFields: ['sys.contentTypeId', 'url']
          });

        case 61:
          siblings = _context2.sent;

        case 62:
          if (!(pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id)) {
            _context2.next = 68;
            break;
          }

          entry = pathNode.entry;
          _context2.next = 66;
          return (0, _effects.call)(setRouteEntry, entry, pathNode, ancestors, siblings);

        case 66:
          _context2.next = 70;
          break;

        case 68:
          _context2.next = 70;
          return (0, _effects.call)(do404);

        case 70:
          if (!(withEvents && withEvents.onRouteLoaded)) {
            _context2.next = 74;
            break;
          }

          _context2.next = 73;
          return withEvents.onRouteLoaded(_objectSpread({}, action, {
            entry: entry
          }));

        case 73:
          appsays = _context2.sent;

        case 74:
          if (!(!(0, _navigation2.hasNavigationTree)(state) && appsays && !appsays.customNavigation)) {
            _context2.next = 77;
            break;
          }

          _context2.next = 77;
          return (0, _effects.put)({
            type: _navigation.GET_NODE_TREE
          });

        case 77:
          _context2.next = 84;
          break;

        case 79:
          _context2.prev = 79;
          _context2.t0 = _context2["catch"](1);
          log.error.apply(log, ['Error running route saga:', _context2.t0, _context2.t0.stack]);
          _context2.next = 84;
          return (0, _effects.call)(do404);

        case 84:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[1, 79]]);
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
            id: entry.sys.id
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
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__52__;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeEntryByFields = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(9));

var _construct2 = _interopRequireDefault(__webpack_require__(54));

var _ContensisDeliveryApi = __webpack_require__(6);

var _expressions = __webpack_require__(55);

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
/* 54 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__54__;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.termExpressions = exports.customWhereExpressions = exports.orderByExpression = exports.includeInSearchExpressions = exports.defaultSearchExpressions = exports.defaultExpressions = exports.dataFormatExpression = exports.filterExpressions = exports.contentTypeIdExpression = exports.fieldExpression = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(9));

var _contensisDeliveryApi = __webpack_require__(24);

var _schema = __webpack_require__(56);

var _util = __webpack_require__(57);

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
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixFreeTextForElastic = fixFreeTextForElastic;
exports.callCustomApi = exports.extractQuotedPhrases = exports.timedSearch = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(3));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(14));

var _performance = __webpack_require__(58);

var _ContensisDeliveryApi = __webpack_require__(6);

var _navigation = __webpack_require__(59);

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
/* 58 */
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryParams = queryParams;
exports.addHostname = exports.clientHostname = exports.buildUrl = exports.routeParams = void 0;

var _queryString = _interopRequireDefault(__webpack_require__(35));

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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureNodeTreeSaga = ensureNodeTreeSaga;
exports.navigationSagas = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(3));

var _effects = __webpack_require__(19);

var _ContensisDeliveryApi = __webpack_require__(6);

var _navigation = __webpack_require__(13);

var _navigation2 = __webpack_require__(21);

var _version = __webpack_require__(20);

var _routing = __webpack_require__(8);

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
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var internalServer = __webpack_require__(64)["default"];

exports.app = internalServer.app;
exports.httpProxy = internalServer.apiProxy;
exports.start = internalServer.start;

var ReactApp = __webpack_require__(27)["default"];

exports.ReactApp = ReactApp;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(5);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

__webpack_require__(36);

var _express = _interopRequireDefault(__webpack_require__(65));

var _reactLoadable = _interopRequireDefault(__webpack_require__(33));

var _displayStartupConfiguration = _interopRequireDefault(__webpack_require__(66));

var _localDns = _interopRequireDefault(__webpack_require__(67));

var _reverseProxies = _interopRequireWildcard(__webpack_require__(70));

var _webApp = _interopRequireDefault(__webpack_require__(72));

// import ServerFeatures from './features/configure';
var app = (0, _express["default"])();

var start = function start(ReactApp, config, ServerFeatures) {
  app.disable('x-powered-by'); // Output some information about the used build/startup configuration

  (0, _displayStartupConfiguration["default"])(config); // Configure DNS to make life easier

  (0, _localDns["default"])(); // Set-up local proxy for images from cms, to save doing rewrites and extra code

  ServerFeatures(app);
  (0, _reverseProxies["default"])(app, config.reverseProxyPaths);
  (0, _webApp["default"])(app, ReactApp, config);
  app.use('/static', _express["default"]["static"]('dist/static', {
    maxage: '31557600h'
  }));
  app.on('ready', function () {
    _reactLoadable["default"].preloadAll().then(function () {
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
exports["default"] = _default;

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__65__;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
exports["default"] = _default;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _evilDns = _interopRequireDefault(__webpack_require__(68));

var _fetchMyIp = _interopRequireDefault(__webpack_require__(69));

var servers = SERVERS;
/* global SERVERS */

var apiConfig = DELIVERY_API_CONFIG;
/* global DELIVERY_API_CONFIG */

var localDns = function localDns() {
  var disableDnsChanges = false;

  var configureLocalEndpoint = function configureLocalEndpoint() {
    if (!disableDnsChanges) {
      _evilDns["default"].add("*".concat(servers.alias, ".cloud.contensis.com"), servers.internalVip);

      if (apiConfig.internalIp) _evilDns["default"].add(apiConfig.rootUrl, apiConfig.internalIp);
    }
  }; // Break api.ipify to test
  // evilDns.add('api.ipify.org', '8.8.8.8');


  (0, _fetchMyIp["default"])(servers, configureLocalEndpoint);
};

var _default = localDns;
exports["default"] = _default;

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__68__;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
  })["catch"](function (error) {
    configureLocalEndpoint();
    console.log("Could not work out where I am so defaulting to local DNS, as I am probably running as a container this is what matters most. Not developers at home or tests :( Sorry. error: ".concat(error));
  });
  /* eslint-enable no-console */
};

var _default = fetchMyIp;
exports["default"] = _default;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.apiProxy = void 0;

var _httpProxy = _interopRequireDefault(__webpack_require__(71));

var servers = SERVERS;
/* global SERVERS */

var apiProxy = _httpProxy["default"].createProxyServer();

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
  app.all(['/api/delivery/*', '/api/image/*'], function (req, res) {
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
exports["default"] = _default;

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__71__;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(9));

var _fs = _interopRequireDefault(__webpack_require__(73));

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactRouterDom = __webpack_require__(11);

var _reactRedux = __webpack_require__(18);

var _reactLoadable = _interopRequireDefault(__webpack_require__(33));

var _server = __webpack_require__(74);

var _webpack = __webpack_require__(75);

var _styledComponents = __webpack_require__(76);

var _reactHelmet = _interopRequireDefault(__webpack_require__(77));

var _browserslistUseragent = __webpack_require__(78);

var _serializeJavascript = _interopRequireDefault(__webpack_require__(79));

var _minifyCssString = _interopRequireDefault(__webpack_require__(80));

var _immutable = __webpack_require__(2);

var _history = __webpack_require__(37);

var _types = __webpack_require__(81);

var _cacheHashing = __webpack_require__(82);

var _pickProject = _interopRequireDefault(__webpack_require__(39));

var _ContensisDeliveryApi = __webpack_require__(6);

var _routing = __webpack_require__(12);

var _version = __webpack_require__(25);

var _routing2 = __webpack_require__(8);

var _store = _interopRequireDefault(__webpack_require__(41));

var _index = _interopRequireDefault(__webpack_require__(50));

var addStandardHeaders = function addStandardHeaders(state, response, packagejson) {
  if (state) {
    /* eslint-disable no-console */
    try {
      console.log('About to add header');
      var entryDepends = (0, _routing2.selectEntryDepends)(state);
      entryDepends = entryDepends.toJS();
      console.log("entryDepends count: ".concat(entryDepends.length));
      var nodeDepends = (0, _routing2.selectNodeDepends)(state).toJS();
      var currentTreeId = (0, _routing2.selectCurrentTreeID)(state);
      var nodeDependsKeys = nodeDepends.map(function (nodeKey) {
        return "".concat(currentTreeId, "_").concat(nodeKey);
      });
      var allDepends = [].concat((0, _toConsumableArray2["default"])(entryDepends), (0, _toConsumableArray2["default"])(nodeDependsKeys));
      var allDependsHashed = (0, _cacheHashing.hashKeys)(allDepends);
      response.header('surrogate-key', " ".concat(packagejson.name, "-app ").concat(allDependsHashed.join(' ')));
      console.log("depends hashed: ".concat(allDependsHashed.join(' ')));
      console.log("depends hashed: ".concat(allDepends.join(' ')));
      addVarnishAuthenticationHeaders(state, response);
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

var readFileSync = function readFileSync(path) {
  return _fs["default"].readFileSync(path, 'utf8');
};

var loadBundleData = function loadBundleData(_ref, build) {
  var stats = _ref.stats,
      templates = _ref.templates;

  try {
    var bundle = {};
    bundle.stats = JSON.parse(readFileSync(stats.replace('/target', build ? "/".concat(build) : '')));
    bundle.templates = {
      templateHTML: readFileSync(templates.html.replace('/target', build ? "/".concat(build) : '')),
      templateHTMLStatic: readFileSync(templates["static"].replace('/target', build ? "/".concat(build) : '')),
      templateHTMLFragment: readFileSync(templates.fragment.replace('/target', build ? "/".concat(build) : ''))
    };
    return bundle;
  } catch (_unused) {//console.log(ex);
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
  var bundles = {
    "default": loadBundleData(config),
    legacy: loadBundleData(config, 'legacy'),
    modern: loadBundleData(config, 'modern')
  };
  if (!bundles["default"]) bundles["default"] = bundles.legacy || bundles.modern;
  var versionInfo = JSON.parse(_fs["default"].readFileSync(versionData, 'utf8'));
  app.get('/*', function (request, response, next) {
    if (request.originalUrl.startsWith('/static/')) return next();
    var useragent = request.headers['user-agent'];
    var isModernUser = (0, _browserslistUseragent.matchesUA)(useragent, {
      env: 'modern',
      allowHigherVersions: true
    });
    var url = request.url; // Determine functional params and set access methods

    var accessMethod = {};
    var isDynamicNormalised = request.query.dynamic ? request.query.dynamic.toLowerCase() : 'false'; // Hack for certain pages to avoid SSR

    var onlyDynamic = dynamicPaths.includes(request.path);
    var isReduxRequestNormalised = request.query.redux ? request.query.redux.toLowerCase() : 'false';
    var isFragmentNormalised = request.query.fragment ? request.query.fragment.toLowerCase() : 'false';
    var isStaticNormalised = request.query["static"] ? request.query["static"].toLowerCase() : 'false';
    if (onlyDynamic || isDynamicNormalised === 'true') accessMethod.DYNAMIC = _types.AccessMethods.DYNAMIC;
    if (isReduxRequestNormalised === 'true') accessMethod.REDUX = _types.AccessMethods.REDUX;
    if (isFragmentNormalised === 'true') accessMethod.FRAGMENT = _types.AccessMethods.FRAGMENT;
    if (isStaticNormalised === 'true') accessMethod.STATIC = _types.AccessMethods.STATIC;
    var context = {};
    var status = 200; // Create a store (with a memory history) from our current url

    var store = (0, _store["default"])(withReducers, (0, _immutable.fromJS)({}), (0, _history.history)({
      initialEntries: [url]
    })); //const store = createStore(withReducers);
    // dispatch any global and non-saga related actions before calling our JSX

    var versionStatusFromHostname = (0, _ContensisDeliveryApi.GetDeliveryApiStatusFromHostname)(request.hostname);
    store.dispatch((0, _version.setVersionStatus)(request.query.versionStatus || versionStatusFromHostname));
    store.dispatch((0, _version.setVersion)(versionInfo.commitRef, versionInfo.buildNo));
    var project = (0, _pickProject["default"])(request.hostname, request.query);
    var groups = allowedGroups && allowedGroups[project];
    store.dispatch((0, _routing.setCurrentProject)(project, groups));
    var modules = [];

    var jsx = _react["default"].createElement(_reactLoadable["default"].Capture, {
      report: function report(moduleName) {
        return modules.push(moduleName);
      }
    }, _react["default"].createElement(_reactRedux.Provider, {
      store: store
    }, _react["default"].createElement(_reactRouterDom.StaticRouter, {
      context: context,
      location: url
    }, _react["default"].createElement(ReactApp, {
      routes: routes,
      withEvents: withEvents
    }))));
    /* eslint-disable no-console */


    console.log("Request for ".concat(request.path, " hostname: ").concat(request.hostname, " versionStatus: ").concat(versionStatusFromHostname));
    /* eslint-enable no-console */

    var target = isModernUser ? bundles.modern : bundles.legacy;

    var _ref2 = target || bundles["default"],
        templates = _ref2.templates,
        stats = _ref2.stats;

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
      store.runSaga((0, _index["default"])(withSagas)).toPromise().then(function () {
        var sheet = new _styledComponents.ServerStyleSheet();
        var html = (0, _server.renderToString)(sheet.collectStyles(jsx));

        var helmet = _reactHelmet["default"].renderStatic();

        _reactHelmet["default"].rewind();

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
            serialisedReduxData = (0, _serializeJavascript["default"])(reduxState);
            addStandardHeaders(reduxState, response, packagejson, allowedGroups);
            response.status(status).json(serialisedReduxData);
            return true;
          }

          if (!disableSsrRedux) {
            serialisedReduxData = (0, _serializeJavascript["default"])(reduxState);
            serialisedReduxData = "<script>window.REDUX_DATA = ".concat(serialisedReduxData, "</script>");
          }
        }

        if (context.status === 404) {
          accessMethod.STATIC = _types.AccessMethods.STATIC;
        } // Responses


        var responseHTML = ''; // Static page served as a fragment

        if (accessMethod.FRAGMENT && accessMethod.STATIC) {
          addStandardHeaders(reduxState, response, packagejson, allowedGroups);
          responseHTML = (0, _minifyCssString["default"])(styleTags) + html;
        } // Page fragment served with client scripts and redux data that hydrate the app client side


        if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTMLFragment.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', (0, _minifyCssString["default"])(styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleScripts).replace('{{REDUX_DATA}}', serialisedReduxData);
        } // Full HTML page served statically


        if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = templateHTMLStatic.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', (0, _minifyCssString["default"])(styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', '');
        } // Full HTML page served with client scripts and redux data that hydrate the app client side


        if (!accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTML.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', styleTags).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleScripts).replace('{{REDUX_DATA}}', serialisedReduxData);
        }

        addStandardHeaders(reduxState, response, packagejson, allowedGroups);
        response.status(status).send(responseHTML);
      })["catch"](function (err) {
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
exports["default"] = _default;

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("fs");

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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__76__;

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__77__;

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__78__;

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__79__;

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__80__;

/***/ }),
/* 81 */
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

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashKeys = void 0;

var hashKeys = function hashKeys(keys) {
  // const XXHash = require('xxhash');
  var XXHash = __webpack_require__(83);

  var returnKeys = [];
  keys.forEach(function (cacheKey) {
    var inputBuffer = Buffer.from(cacheKey.toLowerCase(), 'utf-8'); // const outputBuffer = Buffer.alloc(4);
    // XXHash.hash(inputBuffer, 0x0, outputBuffer);

    var hashed = XXHash.h32(inputBuffer, 0x0).toString(16);
    var reversedhex = hashed.match(/[a-fA-F0-9]{2}/g).reverse().join('');
    var outputBuffer = Buffer.from(reversedhex, 'hex');
    returnKeys.push(outputBuffer.toString('base64').substring(0, 6));
  });
  return returnKeys;
};

exports.hashKeys = hashKeys;

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__83__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=zengenti-isomorphic-base.js.map