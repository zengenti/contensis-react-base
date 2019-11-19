(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"), require("react"), require("react-router-dom"), require("react-hot-loader"), require("react-redux"), require("react-loadable"), require("isomorphic-fetch"), require("contensis-delivery-api"), require("regenerator-runtime"), require("redux"), require("redux-immutable"), require("redux-thunk"), require("redux-saga"), require("query-string"), require("react-router-config"), require("express"), require("evil-dns"), require("http-proxy"), require("react-dom/server"), require("react-loadable/webpack"), require("styled-components"), require("react-helmet"), require("serialize-javascript"), require("minify-css-string"), require("js-cookie"));
	else if(typeof define === 'function' && define.amd)
		define(["immutable", "react", "react-router-dom", "react-hot-loader", "react-redux", "react-loadable", "isomorphic-fetch", "contensis-delivery-api", "regenerator-runtime", "redux", "redux-immutable", "redux-thunk", "redux-saga", "query-string", "react-router-config", "express", "evil-dns", "http-proxy", "react-dom/server", "react-loadable/webpack", "styled-components", "react-helmet", "serialize-javascript", "minify-css-string", "js-cookie"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("immutable"), require("react"), require("react-router-dom"), require("react-hot-loader"), require("react-redux"), require("react-loadable"), require("isomorphic-fetch"), require("contensis-delivery-api"), require("regenerator-runtime"), require("redux"), require("redux-immutable"), require("redux-thunk"), require("redux-saga"), require("query-string"), require("react-router-config"), require("express"), require("evil-dns"), require("http-proxy"), require("react-dom/server"), require("react-loadable/webpack"), require("styled-components"), require("react-helmet"), require("serialize-javascript"), require("minify-css-string"), require("js-cookie")) : factory(root["immutable"], root["react"], root["react-router-dom"], root["react-hot-loader"], root["react-redux"], root["react-loadable"], root["isomorphic-fetch"], root["contensis-delivery-api"], root["regenerator-runtime"], root["redux"], root["redux-immutable"], root["redux-thunk"], root["redux-saga"], root["query-string"], root["react-router-config"], root["express"], root["evil-dns"], root["http-proxy"], root["react-dom/server"], root["react-loadable/webpack"], root["styled-components"], root["react-helmet"], root["serialize-javascript"], root["minify-css-string"], root["js-cookie"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__15__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__24__, __WEBPACK_EXTERNAL_MODULE__28__, __WEBPACK_EXTERNAL_MODULE__34__, __WEBPACK_EXTERNAL_MODULE__35__, __WEBPACK_EXTERNAL_MODULE__38__, __WEBPACK_EXTERNAL_MODULE__39__, __WEBPACK_EXTERNAL_MODULE__40__, __WEBPACK_EXTERNAL_MODULE__41__, __WEBPACK_EXTERNAL_MODULE__46__, __WEBPACK_EXTERNAL_MODULE__55__, __WEBPACK_EXTERNAL_MODULE__68__, __WEBPACK_EXTERNAL_MODULE__71__, __WEBPACK_EXTERNAL_MODULE__74__, __WEBPACK_EXTERNAL_MODULE__77__, __WEBPACK_EXTERNAL_MODULE__78__, __WEBPACK_EXTERNAL_MODULE__79__, __WEBPACK_EXTERNAL_MODULE__80__, __WEBPACK_EXTERNAL_MODULE__81__, __WEBPACK_EXTERNAL_MODULE__82__, __WEBPACK_EXTERNAL_MODULE__89__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

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
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(35);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(29);

var iterableToArray = __webpack_require__(30);

var nonIterableSpread = __webpack_require__(31);

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
exports.CALL_HISTORY_METHOD = exports.SET_ROUTE = exports.SET_TARGET_PROJECT = exports.SET_ROUTE_LOADING = exports.SET_NAVIGATION_PATH = exports.SET_NAVIGATION_NOT_FOUND = exports.SET_ENTRY_RELATED_ARTICLES = exports.SET_ENTRY_ID = exports.SET_ANCESTORS = exports.SET_NODE = exports.SET_ENTRY = exports.GET_ENTRY = void 0;
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
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
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

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(5));

var _createClass2 = _interopRequireDefault(__webpack_require__(6));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(8));

var _typeof2 = _interopRequireDefault(__webpack_require__(17));

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
/* 12 */
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

var _regenerator = _interopRequireDefault(__webpack_require__(7));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(19));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(5));

var _createClass2 = _interopRequireDefault(__webpack_require__(6));

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRouteEntryRelatedArticles = exports.selectRouteLoading = exports.selectCurrentAncestors = exports.selectIsNotFound = exports.selectCurrentProject = exports.selectCurrentPath = exports.selectRouteEntryID = exports.selectRouteEntrySlug = exports.selectRouteEntryContentTypeId = exports.selectRouteEntryEntryId = exports.selectRouteEntryDepends = exports.selectRouteEntry = void 0;

var _immutable = __webpack_require__(2);

var selectRouteEntry = function selectRouteEntry(state) {
  return state.getIn(['routing', 'entry']);
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
  return state.getIn(['routing', 'entry', 'sys', 'contentTypeId'], null);
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

var selectRouteEntryRelatedArticles = function selectRouteEntryRelatedArticles(state) {
  return state.getIn(['routing', 'relatedArticles']);
};

exports.selectRouteEntryRelatedArticles = selectRouteEntryRelatedArticles;

/***/ }),
/* 14 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentProject = exports.setRouteEntryRelatedArticles = exports.setRouteEntry = exports.setRoute = exports.setNavigationPath = exports.setNotFound = void 0;

var _helpers = __webpack_require__(12);

var _routing = __webpack_require__(9);

var setNotFound = function setNotFound(notFound) {
  return (0, _helpers.action)(_routing.SET_NAVIGATION_NOT_FOUND, {
    notFound: notFound
  });
};

exports.setNotFound = setNotFound;

var setNavigationPath = function setNavigationPath(path, isStatic) {
  return (0, _helpers.action)(_routing.SET_NAVIGATION_PATH, {
    path: path,
    isStatic: isStatic
  });
};

exports.setNavigationPath = setNavigationPath;

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

var setRouteEntryRelatedArticles = function setRouteEntryRelatedArticles(relatedArticles) {
  return (0, _helpers.action)(_routing.SET_ENTRY_RELATED_ARTICLES, {
    relatedArticles: relatedArticles
  });
};

exports.setRouteEntryRelatedArticles = setRouteEntryRelatedArticles;

var setCurrentProject = function setCurrentProject(project, allowedGroups) {
  return (0, _helpers.action)(_routing.SET_TARGET_PROJECT, {
    project: project,
    allowedGroups: allowedGroups
  });
};

exports.setCurrentProject = setCurrentProject;

/***/ }),
/* 19 */
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 22 */
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@redux-saga/symbols/dist/redux-saga-symbols.esm.js
var createSymbol = function createSymbol(name) {
  return "@@redux-saga/" + name;
};

var CANCEL =
/*#__PURE__*/
createSymbol('CANCEL_PROMISE');
var CHANNEL_END_TYPE =
/*#__PURE__*/
createSymbol('CHANNEL_END');
var IO =
/*#__PURE__*/
createSymbol('IO');
var MATCH =
/*#__PURE__*/
createSymbol('MATCH');
var MULTICAST =
/*#__PURE__*/
createSymbol('MULTICAST');
var SAGA_ACTION =
/*#__PURE__*/
createSymbol('SAGA_ACTION');
var SELF_CANCELLATION =
/*#__PURE__*/
createSymbol('SELF_CANCELLATION');
var TASK =
/*#__PURE__*/
createSymbol('TASK');
var TASK_CANCEL =
/*#__PURE__*/
createSymbol('TASK_CANCEL');
var TERMINATE =
/*#__PURE__*/
createSymbol('TERMINATE');
var SAGA_LOCATION =
/*#__PURE__*/
createSymbol('LOCATION');



// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@redux-saga/is/dist/redux-saga-is.esm.js


var undef = function undef(v) {
  return v === null || v === undefined;
};
var notUndef = function notUndef(v) {
  return v !== null && v !== undefined;
};
var func = function func(f) {
  return typeof f === 'function';
};
var number = function number(n) {
  return typeof n === 'number';
};
var string = function string(s) {
  return typeof s === 'string';
};
var array = Array.isArray;
var object = function object(obj) {
  return obj && !array(obj) && typeof obj === 'object';
};
var redux_saga_is_esm_promise = function promise(p) {
  return p && func(p.then);
};
var iterator = function iterator(it) {
  return it && func(it.next) && func(it.throw);
};
var iterable = function iterable(it) {
  return it && func(Symbol) ? func(it[Symbol.iterator]) : array(it);
};
var redux_saga_is_esm_task = function task(t) {
  return t && t[TASK];
};
var redux_saga_is_esm_sagaAction = function sagaAction(a) {
  return Boolean(a && a[SAGA_ACTION]);
};
var observable = function observable(ob) {
  return ob && func(ob.subscribe);
};
var buffer = function buffer(buf) {
  return buf && func(buf.isEmpty) && func(buf.take) && func(buf.put);
};
var redux_saga_is_esm_pattern = function pattern(pat) {
  return pat && (string(pat) || symbol(pat) || func(pat) || array(pat) && pat.every(pattern));
};
var redux_saga_is_esm_channel = function channel(ch) {
  return ch && func(ch.take) && func(ch.close);
};
var stringableFunc = function stringableFunc(f) {
  return func(f) && f.hasOwnProperty('toString');
};
var symbol = function symbol(sym) {
  return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
};
var redux_saga_is_esm_multicast = function multicast(ch) {
  return redux_saga_is_esm_channel(ch) && ch[MULTICAST];
};
var redux_saga_is_esm_effect = function effect(eff) {
  return eff && eff[IO];
};



// CONCATENATED MODULE: ./node_modules/@redux-saga/delay-p/dist/redux-saga-delay-p.esm.js


function delayP(ms, val) {
  if (val === void 0) {
    val = true;
  }

  var timeoutId;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(resolve, ms, val);
  });

  promise[CANCEL] = function () {
    clearTimeout(timeoutId);
  };

  return promise;
}

/* harmony default export */ var redux_saga_delay_p_esm = (delayP);

// CONCATENATED MODULE: ./node_modules/@redux-saga/core/dist/io-427945dd.js





var konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue =
/*#__PURE__*/
konst(true);

var noop = function noop() {};

if (false) {}
var identity = function identity(v) {
  return v;
};
var hasSymbol = typeof Symbol === 'function';
var asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator ? Symbol.asyncIterator : '@@asyncIterator';
function check(value, predicate, error) {
  if (!predicate(value)) {
    throw new Error(error);
  }
}
var io_427945dd_assignWithSymbols = function assignWithSymbols(target, source) {
  Object(esm_extends["a" /* default */])(target, source);

  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(source).forEach(function (s) {
      target[s] = source[s];
    });
  }
};
var flatMap = function flatMap(mapper, arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, arr.map(mapper));
};
function remove(array, item) {
  var index = array.indexOf(item);

  if (index >= 0) {
    array.splice(index, 1);
  }
}
function once(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    fn();
  };
}

var kThrow = function kThrow(err) {
  throw err;
};

var kReturn = function kReturn(value) {
  return {
    value: value,
    done: true
  };
};

function makeIterator(next, thro, name) {
  if (thro === void 0) {
    thro = kThrow;
  }

  if (name === void 0) {
    name = 'iterator';
  }

  var iterator = {
    meta: {
      name: name
    },
    next: next,
    throw: thro,
    return: kReturn,
    isSagaIterator: true
  };

  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}
function logError(error, _ref2) {
  var sagaStack = _ref2.sagaStack;

  /*eslint-disable no-console*/
  console.error(error);
  console.error(sagaStack);
}
var internalErr = function internalErr(err) {
  return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + err + "\n");
};
var createSetContextWarning = function createSetContextWarning(ctx, props) {
  return (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
};
var FROZEN_ACTION_ERROR = "You can't put (a.k.a. dispatch from saga) frozen actions.\nWe have to define a special non-enumerable property on those actions for scheduling purposes.\nOtherwise you wouldn't be able to communicate properly between sagas & other subscribers (action ordering would become far less predictable).\nIf you are using redux and you care about this behaviour (frozen actions),\nthen you might want to switch to freezing actions in a middleware rather than in action creator.\nExample implementation:\n\nconst freezeActions = store => next => action => next(Object.freeze(action))\n"; // creates empty, but not-holey array

var createEmptyArray = function createEmptyArray(n) {
  return Array.apply(null, new Array(n));
};
var io_427945dd_wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
  return function (action) {
    if (false) {}

    return dispatch(Object.defineProperty(action, SAGA_ACTION, {
      value: true
    }));
  };
};
var io_427945dd_shouldTerminate = function shouldTerminate(res) {
  return res === TERMINATE;
};
var io_427945dd_shouldCancel = function shouldCancel(res) {
  return res === TASK_CANCEL;
};
var shouldComplete = function shouldComplete(res) {
  return io_427945dd_shouldTerminate(res) || io_427945dd_shouldCancel(res);
};
function createAllStyleChildCallbacks(shape, parentCallback) {
  var keys = Object.keys(shape);
  var totalCount = keys.length;

  if (false) {}

  var completedCount = 0;
  var completed;
  var results = array(shape) ? createEmptyArray(totalCount) : {};
  var childCallbacks = {};

  function checkEnd() {
    if (completedCount === totalCount) {
      completed = true;
      parentCallback(results);
    }
  }

  keys.forEach(function (key) {
    var chCbAtKey = function chCbAtKey(res, isErr) {
      if (completed) {
        return;
      }

      if (isErr || shouldComplete(res)) {
        parentCallback.cancel();
        parentCallback(res, isErr);
      } else {
        results[key] = res;
        completedCount++;
        checkEnd();
      }
    };

    chCbAtKey.cancel = noop;
    childCallbacks[key] = chCbAtKey;
  });

  parentCallback.cancel = function () {
    if (!completed) {
      completed = true;
      keys.forEach(function (key) {
        return childCallbacks[key].cancel();
      });
    }
  };

  return childCallbacks;
}
function getMetaInfo(fn) {
  return {
    name: fn.name || 'anonymous',
    location: getLocation(fn)
  };
}
function getLocation(instrumented) {
  return instrumented[SAGA_LOCATION];
}

var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;
var zeroBuffer = {
  isEmpty: kTrue,
  put: noop,
  take: noop
};

function ringBuffer(limit, overflowAction) {
  if (limit === void 0) {
    limit = 10;
  }

  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push = function push(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];

    while (length) {
      items.push(take());
    }

    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push(it);
      } else {
        var doubledLimit;

        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);

          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;

          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;
            arr = flush();
            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;
            arr.length = doubledLimit;
            limit = doubledLimit;
            push(it);
            break;

          default: // DROP

        }
      }
    },
    take: take,
    flush: flush
  };
}

var none = function none() {
  return zeroBuffer;
};
var fixed = function fixed(limit) {
  return ringBuffer(limit, ON_OVERFLOW_THROW);
};
var dropping = function dropping(limit) {
  return ringBuffer(limit, ON_OVERFLOW_DROP);
};
var sliding = function sliding(limit) {
  return ringBuffer(limit, ON_OVERFLOW_SLIDE);
};
var expanding = function expanding(initialSize) {
  return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
};

var buffers = /*#__PURE__*/Object.freeze({
  none: none,
  fixed: fixed,
  dropping: dropping,
  sliding: sliding,
  expanding: expanding
});

var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var io_427945dd_CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var effectTypes = /*#__PURE__*/Object.freeze({
  TAKE: TAKE,
  PUT: PUT,
  ALL: ALL,
  RACE: RACE,
  CALL: CALL,
  CPS: CPS,
  FORK: FORK,
  JOIN: JOIN,
  CANCEL: io_427945dd_CANCEL,
  SELECT: SELECT,
  ACTION_CHANNEL: ACTION_CHANNEL,
  CANCELLED: CANCELLED,
  FLUSH: FLUSH,
  GET_CONTEXT: GET_CONTEXT,
  SET_CONTEXT: SET_CONTEXT
});

var TEST_HINT = '\n(HINT: if you are getting these errors in tests, consider using createMockTask from @redux-saga/testing-utils)';

var io_427945dd_makeEffect = function makeEffect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
};

var io_427945dd_isForkEffect = function isForkEffect(eff) {
  return eff && eff[IO] && eff.type === FORK;
};

var io_427945dd_detach = function detach(eff) {
  if (false) {}

  return io_427945dd_makeEffect(FORK, Object(esm_extends["a" /* default */])({}, eff.payload, {
    detached: true
  }));
};
function take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = '*';
  }

  if (false) {}

  if (redux_saga_is_esm_pattern(patternOrChannel)) {
    return io_427945dd_makeEffect(TAKE, {
      pattern: patternOrChannel
    });
  }

  if (redux_saga_is_esm_multicast(patternOrChannel) && notUndef(multicastPattern) && redux_saga_is_esm_pattern(multicastPattern)) {
    return io_427945dd_makeEffect(TAKE, {
      channel: patternOrChannel,
      pattern: multicastPattern
    });
  }

  if (redux_saga_is_esm_channel(patternOrChannel)) {
    return io_427945dd_makeEffect(TAKE, {
      channel: patternOrChannel
    });
  }

  if (false) {}
}
var takeMaybe = function takeMaybe() {
  var eff = take.apply(void 0, arguments);
  eff.payload.maybe = true;
  return eff;
};
function put(channel$1, action) {
  if (false) {}

  if (undef(action)) {
    action = channel$1; // `undefined` instead of `null` to make default parameter work

    channel$1 = undefined;
  }

  return io_427945dd_makeEffect(PUT, {
    channel: channel$1,
    action: action
  });
}
var putResolve = function putResolve() {
  var eff = put.apply(void 0, arguments);
  eff.payload.resolve = true;
  return eff;
};
function io_427945dd_all(effects) {
  var eff = io_427945dd_makeEffect(ALL, effects);
  eff.combinator = true;
  return eff;
}
function race(effects) {
  var eff = io_427945dd_makeEffect(RACE, effects);
  eff.combinator = true;
  return eff;
} // this match getFnCallDescriptor logic

var io_427945dd_validateFnDescriptor = function validateFnDescriptor(effectName, fnDescriptor) {
  check(fnDescriptor, notUndef, effectName + ": argument fn is undefined or null");

  if (func(fnDescriptor)) {
    return;
  }

  var context = null;
  var fn;

  if (array(fnDescriptor)) {
    context = fnDescriptor[0];
    fn = fnDescriptor[1];
    check(fn, notUndef, effectName + ": argument of type [context, fn] has undefined or null `fn`");
  } else if (object(fnDescriptor)) {
    context = fnDescriptor.context;
    fn = fnDescriptor.fn;
    check(fn, notUndef, effectName + ": argument of type {context, fn} has undefined or null `fn`");
  } else {
    check(fnDescriptor, func, effectName + ": argument fn is not function");
    return;
  }

  if (context && string(fn)) {
    check(context[fn], func, effectName + ": context arguments has no such method - \"" + fn + "\"");
    return;
  }

  check(fn, func, effectName + ": unpacked fn argument (from [context, fn] or {context, fn}) is not a function");
};

function getFnCallDescriptor(fnDescriptor, args) {
  var context = null;
  var fn;

  if (func(fnDescriptor)) {
    fn = fnDescriptor;
  } else {
    if (array(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
    }

    if (context && string(fn) && func(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context: context,
    fn: fn,
    args: args
  };
}

var isNotDelayEffect = function isNotDelayEffect(fn) {
  return fn !== delay;
};

function call(fnDescriptor) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (false) { var arg0; }

  return io_427945dd_makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
}
function apply(context, fn, args) {
  if (args === void 0) {
    args = [];
  }

  var fnDescriptor = [context, fn];

  if (false) {}

  return io_427945dd_makeEffect(CALL, getFnCallDescriptor([context, fn], args));
}
function cps(fnDescriptor) {
  if (false) {}

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return io_427945dd_makeEffect(CPS, getFnCallDescriptor(fnDescriptor, args));
}
function fork(fnDescriptor) {
  if (false) {}

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return io_427945dd_makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
}
function spawn(fnDescriptor) {
  if (false) {}

  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return io_427945dd_detach(fork.apply(void 0, [fnDescriptor].concat(args)));
}
function join(taskOrTasks) {
  if (false) {}

  return io_427945dd_makeEffect(JOIN, taskOrTasks);
}
function cancel(taskOrTasks) {
  if (taskOrTasks === void 0) {
    taskOrTasks = SELF_CANCELLATION;
  }

  if (false) {}

  return io_427945dd_makeEffect(io_427945dd_CANCEL, taskOrTasks);
}
function io_427945dd_select(selector) {
  if (selector === void 0) {
    selector = identity;
  }

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if (false) {}

  return io_427945dd_makeEffect(SELECT, {
    selector: selector,
    args: args
  });
}
/**
  channel(pattern, [buffer])    => creates a proxy channel for store actions
**/

function actionChannel(pattern$1, buffer$1) {
  if (false) {}

  return io_427945dd_makeEffect(ACTION_CHANNEL, {
    pattern: pattern$1,
    buffer: buffer$1
  });
}
function cancelled() {
  return io_427945dd_makeEffect(CANCELLED, {});
}
function flush(channel$1) {
  if (false) {}

  return io_427945dd_makeEffect(FLUSH, channel$1);
}
function getContext(prop) {
  if (false) {}

  return io_427945dd_makeEffect(GET_CONTEXT, prop);
}
function setContext(props) {
  if (false) {}

  return io_427945dd_makeEffect(SET_CONTEXT, props);
}
var delay =
/*#__PURE__*/
call.bind(null, redux_saga_delay_p_esm);



// CONCATENATED MODULE: ./node_modules/@redux-saga/core/dist/redux-saga-effects.esm.js







var done = function done(value) {
  return {
    done: true,
    value: value
  };
};

var qEnd = {};
function safeName(patternOrChannel) {
  if (redux_saga_is_esm_channel(patternOrChannel)) {
    return 'channel';
  }

  if (stringableFunc(patternOrChannel)) {
    return String(patternOrChannel);
  }

  if (func(patternOrChannel)) {
    return patternOrChannel.name;
  }

  return String(patternOrChannel);
}
function fsmIterator(fsm, startState, name) {
  var stateUpdater,
      errorState,
      effect,
      nextState = startState;

  function next(arg, error) {
    if (nextState === qEnd) {
      return done(arg);
    }

    if (error && !errorState) {
      nextState = qEnd;
      throw error;
    } else {
      stateUpdater && stateUpdater(arg);
      var currentState = error ? fsm[errorState](error) : fsm[nextState]();
      nextState = currentState.nextState;
      effect = currentState.effect;
      stateUpdater = currentState.stateUpdater;
      errorState = currentState.errorState;
      return nextState === qEnd ? done(arg) : effect;
    }
  }

  return makeIterator(next, function (error) {
    return next(null, error);
  }, name);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yFork(action)
      };
    }
  }, 'q1', "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yCancel = function yCancel(task) {
    return {
      done: false,
      value: cancel(task)
    };
  };

  var task, action;

  var setTask = function setTask(t) {
    return task = t;
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return task ? {
        nextState: 'q3',
        effect: yCancel(task)
      } : {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    },
    q3: function q3() {
      return {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    }
  }, 'q1', "takeLatest(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeLeading(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yCall = function yCall(ac) {
    return {
      done: false,
      value: call.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action;

  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yCall(action)
      };
    }
  }, 'q1', "takeLeading(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function throttle(delayLength, pattern, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action, channel;
  var yActionChannel = {
    done: false,
    value: actionChannel(pattern, sliding(1))
  };

  var yTake = function yTake() {
    return {
      done: false,
      value: take(channel)
    };
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yDelay = {
    done: false,
    value: delay(delayLength)
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  var setChannel = function setChannel(ch) {
    return channel = ch;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yActionChannel,
        stateUpdater: setChannel
      };
    },
    q2: function q2() {
      return {
        nextState: 'q3',
        effect: yTake(),
        stateUpdater: setAction
      };
    },
    q3: function q3() {
      return {
        nextState: 'q4',
        effect: yFork(action)
      };
    },
    q4: function q4() {
      return {
        nextState: 'q2',
        effect: yDelay
      };
    }
  }, 'q1', "throttle(" + safeName(pattern) + ", " + worker.name + ")");
}

function retry(maxTries, delayLength, fn) {
  var counter = maxTries;

  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var yCall = {
    done: false,
    value: call.apply(void 0, [fn].concat(args))
  };
  var yDelay = {
    done: false,
    value: delay(delayLength)
  };
  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yCall,
        errorState: 'q10'
      };
    },
    q2: function q2() {
      return {
        nextState: qEnd
      };
    },
    q10: function q10(error) {
      counter -= 1;

      if (counter <= 0) {
        throw error;
      }

      return {
        nextState: 'q1',
        effect: yDelay
      };
    }
  }, 'q1', "retry(" + fn.name + ")");
}

function debounceHelper(delayLength, patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var action, raceOutput;
  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };
  var yRace = {
    done: false,
    value: race({
      action: take(patternOrChannel),
      debounce: delay(delayLength)
    })
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var yNoop = function yNoop(value) {
    return {
      done: false,
      value: value
    };
  };

  var setAction = function setAction(ac) {
    return action = ac;
  };

  var setRaceOutput = function setRaceOutput(ro) {
    return raceOutput = ro;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q3',
        effect: yRace,
        stateUpdater: setRaceOutput
      };
    },
    q3: function q3() {
      return raceOutput.debounce ? {
        nextState: 'q1',
        effect: yFork(action)
      } : {
        nextState: 'q2',
        effect: yNoop(raceOutput.action),
        stateUpdater: setAction
      };
    }
  }, 'q1', "debounce(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

var redux_saga_effects_esm_validateTakeEffect = function validateTakeEffect(fn, patternOrChannel, worker) {
  check(patternOrChannel, notUndef, fn.name + " requires a pattern or channel");
  check(worker, notUndef, fn.name + " requires a saga parameter");
};

function takeEvery$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fork.apply(void 0, [takeEvery, patternOrChannel, worker].concat(args));
}
function takeLatest$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return fork.apply(void 0, [takeLatest, patternOrChannel, worker].concat(args));
}
function takeLeading$1(patternOrChannel, worker) {
  if (false) {}

  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  return fork.apply(void 0, [takeLeading, patternOrChannel, worker].concat(args));
}
function throttle$1(ms, pattern, worker) {
  if (false) {}

  for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
    args[_key4 - 3] = arguments[_key4];
  }

  return fork.apply(void 0, [throttle, ms, pattern, worker].concat(args));
}
function retry$1(maxTries, delayLength, worker) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
    args[_key5 - 3] = arguments[_key5];
  }

  return call.apply(void 0, [retry, maxTries, delayLength, worker].concat(args));
}
function debounce(delayLength, pattern, worker) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
    args[_key6 - 3] = arguments[_key6];
  }

  return fork.apply(void 0, [debounceHelper, delayLength, pattern, worker].concat(args));
}



// CONCATENATED MODULE: ./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js
/* concated harmony reexport actionChannel */__webpack_require__.d(__webpack_exports__, "actionChannel", function() { return actionChannel; });
/* concated harmony reexport all */__webpack_require__.d(__webpack_exports__, "all", function() { return io_427945dd_all; });
/* concated harmony reexport apply */__webpack_require__.d(__webpack_exports__, "apply", function() { return apply; });
/* concated harmony reexport call */__webpack_require__.d(__webpack_exports__, "call", function() { return call; });
/* concated harmony reexport cancel */__webpack_require__.d(__webpack_exports__, "cancel", function() { return cancel; });
/* concated harmony reexport cancelled */__webpack_require__.d(__webpack_exports__, "cancelled", function() { return cancelled; });
/* concated harmony reexport cps */__webpack_require__.d(__webpack_exports__, "cps", function() { return cps; });
/* concated harmony reexport delay */__webpack_require__.d(__webpack_exports__, "delay", function() { return delay; });
/* concated harmony reexport effectTypes */__webpack_require__.d(__webpack_exports__, "effectTypes", function() { return effectTypes; });
/* concated harmony reexport flush */__webpack_require__.d(__webpack_exports__, "flush", function() { return flush; });
/* concated harmony reexport fork */__webpack_require__.d(__webpack_exports__, "fork", function() { return fork; });
/* concated harmony reexport getContext */__webpack_require__.d(__webpack_exports__, "getContext", function() { return getContext; });
/* concated harmony reexport join */__webpack_require__.d(__webpack_exports__, "join", function() { return join; });
/* concated harmony reexport put */__webpack_require__.d(__webpack_exports__, "put", function() { return put; });
/* concated harmony reexport putResolve */__webpack_require__.d(__webpack_exports__, "putResolve", function() { return putResolve; });
/* concated harmony reexport race */__webpack_require__.d(__webpack_exports__, "race", function() { return race; });
/* concated harmony reexport select */__webpack_require__.d(__webpack_exports__, "select", function() { return io_427945dd_select; });
/* concated harmony reexport setContext */__webpack_require__.d(__webpack_exports__, "setContext", function() { return setContext; });
/* concated harmony reexport spawn */__webpack_require__.d(__webpack_exports__, "spawn", function() { return spawn; });
/* concated harmony reexport take */__webpack_require__.d(__webpack_exports__, "take", function() { return take; });
/* concated harmony reexport takeMaybe */__webpack_require__.d(__webpack_exports__, "takeMaybe", function() { return takeMaybe; });
/* concated harmony reexport debounce */__webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* concated harmony reexport retry */__webpack_require__.d(__webpack_exports__, "retry", function() { return retry$1; });
/* concated harmony reexport takeEvery */__webpack_require__.d(__webpack_exports__, "takeEvery", function() { return takeEvery$1; });
/* concated harmony reexport takeLatest */__webpack_require__.d(__webpack_exports__, "takeLatest", function() { return takeLatest$1; });
/* concated harmony reexport takeLeading */__webpack_require__.d(__webpack_exports__, "takeLeading", function() { return takeLeading$1; });
/* concated harmony reexport throttle */__webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle$1; });



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
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _interopRequireWildcard = __webpack_require__(14);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(5));

var _createClass2 = _interopRequireDefault(__webpack_require__(6));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(49));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(50));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(21));

var _inherits2 = _interopRequireDefault(__webpack_require__(51));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _react = _interopRequireWildcard(__webpack_require__(3));

var _propTypes = _interopRequireDefault(__webpack_require__(22));

var _reactRedux = __webpack_require__(16);

var _reactHotLoader = __webpack_require__(15);

var _reactRouterDom = __webpack_require__(10);

var _reactRouterConfig = __webpack_require__(55);

var _routing = __webpack_require__(13);

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

var RouteLoader =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RouteLoader, _Component);

  function RouteLoader() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RouteLoader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RouteLoader)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "MatchedStaticRoute", function (pathname) {
      return (0, _reactRouterConfig.matchRoutes)(_this.props.routes.StaticRoutes, typeof window != 'undefined' ? window.location.pathname : pathname).length;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "render", function () {
      var currentPath = _this.props.location.pathname;
      var trimmedCurrentPath = getTrimmedPath(_this.props.location.pathname); // Match Any Static Routes a developer has defined

      if (_this.MatchedStaticRoute(currentPath)) {
        return (0, _reactRouterConfig.renderRoutes)(_this.props.routes.StaticRoutes, {
          entry: _this.props.entry
        });
      } // Need to redirect when url endswith a /


      if (currentPath.length > trimmedCurrentPath.length) {
        return _react.default.createElement(_reactRouterDom.Redirect, {
          to: trimmedCurrentPath
        });
      } // Match Any Defined Content Type Mappings


      if (_this.props.contentTypeId) {
        var MatchedComponent = _this.props.routes.ContentTypeMappings.find(function (item) {
          return item.contentTypeID == _this.props.contentTypeId;
        });

        if (MatchedComponent) {
          return _react.default.createElement(MatchedComponent.component, {
            entry: _this.props.entry
          });
        }
      }

      if (_this.props.isNotFound) {
        return _react.default.createElement(_Status.Status, {
          code: 404
        }, _react.default.createElement(_NotFound.default, null));
      }

      return null;
    });
    return _this;
  }

  (0, _createClass2.default)(RouteLoader, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var trimmedPath = getTrimmedPath(this.props.location.pathname);
      this.props.setNavigationPath(trimmedPath, this.MatchedStaticRoute(trimmedPath));
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var nextPath = nextProps.location.pathname;
      var trimmedNextPath = getTrimmedPath(nextPath);
      var trimmedPreviousPath = getTrimmedPath(this.props.location.pathname);

      if (trimmedPreviousPath !== trimmedNextPath) {
        this.props.setNavigationPath(trimmedNextPath, this.MatchedStaticRoute(trimmedNextPath));
      }
    }
  }]);
  return RouteLoader;
}(_react.Component);

(0, _defineProperty2.default)(RouteLoader, "propTypes", {
  routes: _propTypes.default.objectOf(_propTypes.default.array, _propTypes.default.array),
  currentPath: _propTypes.default.string,
  location: _propTypes.default.object.isRequired,
  history: _propTypes.default.object.isRequired,
  match: _propTypes.default.object.isRequired,
  entry: _propTypes.default.object,
  isNotFound: _propTypes.default.bool,
  setNavigationPath: _propTypes.default.func,
  contentTypeId: _propTypes.default.string
});
(0, _defineProperty2.default)(RouteLoader, "defaultProps", {});

var mapStateToProps = function mapStateToProps(state) {
  return {
    entry: (0, _routing.selectRouteEntry)(state),
    contentTypeId: (0, _routing.selectRouteEntryContentTypeId)(state),
    isNotFound: (0, _routing.selectIsNotFound)(state)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setNavigationPath: function setNavigationPath(path) {
      return dispatch((0, _routing2.setNavigationPath)(path));
    }
  };
}

var _default = (0, _reactHotLoader.hot)(module)((0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _ToJs.toJS)(RouteLoader))));

exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(48)(module)))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__28__;

/***/ }),
/* 29 */
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
/* 30 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserHistory = exports.history = void 0;

var _history = __webpack_require__(59);

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
/* 33 */
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
/* 34 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__34__;

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
exports.setVersionStatus = exports.setVersion = void 0;

var _helpers = __webpack_require__(12);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(14);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _redux = __webpack_require__(38);

var _reduxImmutable = __webpack_require__(39);

var _reduxThunk = _interopRequireDefault(__webpack_require__(40));

var _reduxSaga = _interopRequireWildcard(__webpack_require__(41));

var _routing = _interopRequireDefault(__webpack_require__(42));

var _version = _interopRequireDefault(__webpack_require__(43));

var _navigation = _interopRequireDefault(__webpack_require__(44));

var _routerMiddleware = _interopRequireDefault(__webpack_require__(45));

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
/* 38 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__38__;

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = __webpack_require__(2);

var _routing = __webpack_require__(9);

var _ContensisDeliveryApi = __webpack_require__(11);

var initialState = (0, _immutable.Map)({
  currentPath: [],
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
          return state.set('currentPath', (0, _immutable.fromJS)(action.path));
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

    case _routing.SET_ENTRY_RELATED_ARTICLES:
      {
        return state.set('relatedArticles', (0, _immutable.fromJS)(action.relatedArticles));
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
/* 43 */
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutable = __webpack_require__(2);

var _navigation = __webpack_require__(26);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(8));

var _routing = __webpack_require__(9);

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
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(3));

var _reactHotLoader = __webpack_require__(15);

var _RouteLoader = _interopRequireDefault(__webpack_require__(27));

var AppRoot = function AppRoot(props) {
  return _react.default.createElement(_RouteLoader.default, props);
};

var _default = AppRoot;
exports.default = _default;

/***/ }),
/* 48 */
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(17);

var assertThisInitialized = __webpack_require__(21);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(52);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

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

var _react = _interopRequireDefault(__webpack_require__(3));

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

var _react = _interopRequireDefault(__webpack_require__(3));

var _propTypes = _interopRequireDefault(__webpack_require__(22));

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
    return _react.default.createElement(WrappedComponent, propsJS);
  };
};

exports.toJS = toJS;

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/resolve-pathname/esm/resolve-pathname.js
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';

  var toParts = (to && to.split('/')) || [];
  var fromParts = (from && from.split('/')) || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ var resolve_pathname = (resolvePathname);

// CONCATENATED MODULE: ./node_modules/value-equal/esm/value-equal.js
function value_equal_valueOf(obj) {
  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);
}

function valueEqual(a, b) {
  // Test for strict equality first.
  if (a === b) return true;

  // Otherwise, if either of them == null they are not equal.
  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return (
      Array.isArray(b) &&
      a.length === b.length &&
      a.every(function(item, index) {
        return valueEqual(item, b[index]);
      })
    );
  }

  if (typeof a === 'object' || typeof b === 'object') {
    var aValue = value_equal_valueOf(a);
    var bValue = value_equal_valueOf(b);

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    return Object.keys(Object.assign({}, a, b)).every(function(key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ var value_equal = (valueEqual);

// CONCATENATED MODULE: ./node_modules/tiny-invariant/dist/tiny-invariant.esm.js
var isProduction = process.env.NODE_ENV === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  } else {
    throw new Error(prefix + ": " + (message || ''));
  }
}

/* harmony default export */ var tiny_invariant_esm = (invariant);

// CONCATENATED MODULE: ./node_modules/history/esm/history.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBrowserHistory", function() { return createBrowserHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHashHistory", function() { return createHashHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMemoryHistory", function() { return createMemoryHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLocation", function() { return createLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locationsAreEqual", function() { return locationsAreEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePath", function() { return parsePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPath", function() { return createPath; });






function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = Object(esm_extends["a" /* default */])({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolve_pathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}
function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && value_equal(a.state, b.state);
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
     false ? undefined : void 0;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
           false ? undefined : void 0;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  false ? undefined : tiny_invariant_esm(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
     false ? undefined : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(esm_extends["a" /* default */])(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? undefined : void 0;
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? undefined : void 0;
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

function stripHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}

function pushHashPath(path) {
  window.location.hash = path;
}

function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + '#' + path);
}

function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  false ? undefined : tiny_invariant_esm(false) : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$hashType = _props.hashType,
      hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  function getDOMLocation() {
    var path = decodePath(getHashPath());
     false ? undefined : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(esm_extends["a" /* default */])(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  var forceNextPop = false;
  var ignorePath = null;

  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }

  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  }

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  } // Ensure the hash is encoded properly before doing anything else.


  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)]; // Public interface

  function createHref(location) {
    var baseTag = document.querySelector('base');
    var href = '';

    if (baseTag && baseTag.getAttribute('href')) {
      href = stripHash(window.location.href);
    }

    return href + '#' + encodePath(basename + createPath(location));
  }

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
         false ? undefined : void 0;
        setState();
      }
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
     false ? undefined : void 0;
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */


function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      getUserConfirmation = _props.getUserConfirmation,
      _props$initialEntries = _props.initialEntries,
      initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
      _props$initialIndex = _props.initialIndex,
      initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(esm_extends["a" /* default */])(history, nextState);

    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
  }); // Public interface

  var createHref = createPath;

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);

      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = 'POP';
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    return transitionManager.setPrompt(prompt);
  }

  function listen(listener) {
    return transitionManager.appendListener(listener);
  }

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };
  return history;
}




/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VALIDATE_USER_FAILED = exports.VALIDATE_USER_SUCCESS = exports.VALIDATE_USER = exports.CREATE_USER_ACCOUNT = exports.TOGGLE_LOGIN_MODE = exports.LOGOUT_USER = exports.LOGIN_FAILED = exports.LOGIN_SUCCESSFUL = exports.LOGIN_USER = exports.UPDATE_USER = void 0;
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

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialUserState = void 0;

var _immutable = __webpack_require__(2);

var _types = __webpack_require__(60);

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
  fullName: null
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

    default:
      return state;
  }
};

exports.default = _default;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecurityApi = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(7));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(19));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(5));

var _createClass2 = _interopRequireDefault(__webpack_require__(6));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
    (0, _classCallCheck2.default)(this, SecurityApi);
  }

  (0, _createClass2.default)(SecurityApi, null, [{
    key: "RegisterUser",
    value: function () {
      var _RegisterUser = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(email, password) {
        var body, options;
        return _regenerator.default.wrap(function _callee$(_context) {
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
      var _LogonUser = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(username, password) {
        var body, options;
        return _regenerator.default.wrap(function _callee2$(_context2) {
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
      var _ValidateUser = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(securityToken) {
        var url, bodyToken, options;
        return _regenerator.default.wrap(function _callee3$(_context3) {
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
      var _GetUserInfo = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(securityToken) {
        var _headers;

        var options;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _objectSpread({}, BASE_OPTIONS, {
                  headers: (_headers = {}, (0, _defineProperty2.default)(_headers, 'Content-Type', 'text/plain'), (0, _defineProperty2.default)(_headers, "ContensisCMSUserName", securityToken), _headers)
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
      var _get = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(url) {
        var options,
            responseBody,
            _args5 = arguments;
        return _regenerator.default.wrap(function _callee5$(_context5) {
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
  _api = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(url, options) {
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", fetch(url, options).then(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee6(response) {
                return _regenerator.default.wrap(function _callee6$(_context6) {
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
            }()).catch(function (error) {
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
/* 63 */,
/* 64 */,
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var internalServer = __webpack_require__(67).default;

exports.app = internalServer.app;
exports.start = internalServer.start;

var ReactApp = __webpack_require__(47).default;

var RouteLoader = __webpack_require__(27).default;

exports.ReactApp = ReactApp;
exports.RouteLoader = RouteLoader;

/***/ }),
/* 66 */,
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(28);

var _express = _interopRequireDefault(__webpack_require__(68));

var _reactLoadable = _interopRequireDefault(__webpack_require__(24));

var _displayStartupConfiguration = _interopRequireDefault(__webpack_require__(69));

var _localDns = _interopRequireDefault(__webpack_require__(70));

var _reverseProxies = _interopRequireDefault(__webpack_require__(73));

var _webApp = _interopRequireDefault(__webpack_require__(75));

// import ServerFeatures from './features/configure';
var app = (0, _express.default)();

var start = function start(ReactApp, config, ServerFeatures) {
  app.disable('x-powered-by'); // Output some information about the used build/startup configuration

  (0, _displayStartupConfiguration.default)(config); // Configure DNS to make life easier

  (0, _localDns.default)(); // Set-up local proxy for images from cms, to save doing rewrites and extra code

  (0, _reverseProxies.default)(app, config.reverseProxyPaths);
  ServerFeatures(app);
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
  start: start
};
exports.default = _default;

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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evilDns = _interopRequireDefault(__webpack_require__(71));

var _fetchMyIp = _interopRequireDefault(__webpack_require__(72));

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
/* 71 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__71__;

/***/ }),
/* 72 */
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpProxy = _interopRequireDefault(__webpack_require__(74));

var servers = SERVERS;
/* global SERVERS */

var apiProxy = _httpProxy.default.createProxyServer();

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
/* 74 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__74__;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(8));

var _fs = _interopRequireDefault(__webpack_require__(76));

var _react = _interopRequireDefault(__webpack_require__(3));

var _reactRouterDom = __webpack_require__(10);

var _reactRedux = __webpack_require__(16);

var _reactLoadable = _interopRequireDefault(__webpack_require__(24));

var _server = __webpack_require__(77);

var _webpack = __webpack_require__(78);

var _styledComponents = __webpack_require__(79);

var _reactHelmet = _interopRequireDefault(__webpack_require__(80));

var _serializeJavascript = _interopRequireDefault(__webpack_require__(81));

var _minifyCssString = _interopRequireDefault(__webpack_require__(82));

var _history = __webpack_require__(32);

var _types = __webpack_require__(83);

var _pickProject = _interopRequireDefault(__webpack_require__(33));

var _ContensisDeliveryApi = __webpack_require__(11);

var _routing = __webpack_require__(18);

var _version = __webpack_require__(36);

var _navigation = __webpack_require__(25);

var _routing2 = __webpack_require__(13);

var _store = _interopRequireDefault(__webpack_require__(37));

var _sagas = _interopRequireDefault(__webpack_require__(84));

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
      routes: routes
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
      store.runSaga((0, _sagas.default)(withSagas)).toPromise().then(function () {
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
/* 76 */
/***/ (function(module, exports) {

module.exports = require("fs");

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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__81__;

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__82__;

/***/ }),
/* 83 */
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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(8));

var _sagas = __webpack_require__(85);

// Import feature sagas to be included with application startup
var featureSagas = (0, _toConsumableArray2.default)(_sagas.userSagas);

var _default = (0, _toConsumableArray2.default)(featureSagas);

exports.default = _default;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSagas = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(7));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _effects = __webpack_require__(23);

var _queryString = _interopRequireDefault(__webpack_require__(46));

var _types = __webpack_require__(60);

var _reducers = __webpack_require__(61);

var _selectors = __webpack_require__(86);

var _LoginHelper = __webpack_require__(87);

var _SecurityApi = __webpack_require__(62);

var _marked =
/*#__PURE__*/
_regenerator.default.mark(createUserAccountSaga),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(loginUserSaga),
    _marked3 =
/*#__PURE__*/
_regenerator.default.mark(logoutUserSaga),
    _marked4 =
/*#__PURE__*/
_regenerator.default.mark(validateUserSaga),
    _marked5 =
/*#__PURE__*/
_regenerator.default.mark(validateUserSuccessSaga),
    _marked6 =
/*#__PURE__*/
_regenerator.default.mark(validateUserFailedSaga),
    _marked7 =
/*#__PURE__*/
_regenerator.default.mark(updateUserSaga);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var userSagas = [(0, _effects.takeEvery)(_types.LOGIN_USER, loginUserSaga), (0, _effects.takeEvery)(_types.LOGOUT_USER, logoutUserSaga), (0, _effects.takeEvery)(_types.VALIDATE_USER, validateUserSaga), (0, _effects.takeEvery)(_types.VALIDATE_USER_SUCCESS, validateUserSuccessSaga), (0, _effects.takeEvery)(_types.VALIDATE_USER_FAILED, validateUserFailedSaga), (0, _effects.takeEvery)(_types.CREATE_USER_ACCOUNT, createUserAccountSaga)];
exports.userSagas = userSagas;

function createUserAccountSaga() {
  var userState, registerResponse, securityToken, registrationResult, id, user, _user;

  return _regenerator.default.wrap(function createUserAccountSaga$(_context) {
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
  return _regenerator.default.wrap(function loginUserSaga$(_context2) {
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
            user: user
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
  return _regenerator.default.wrap(function logoutUserSaga$(_context3) {
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
  return _regenerator.default.wrap(function validateUserSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          getGroups = true;
          _context4.next = 3;
          return (0, _effects.select)();

        case 3:
          state = _context4.sent;
          currentQs = _queryString.default.parse(state.getIn(['router', 'location', 'search']));
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
          return (0, _effects.put)({
            type: type,
            user: user
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

function validateUserSuccessSaga(action) {
  return _regenerator.default.wrap(function validateUserSuccessSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.fork)(updateUserSaga, action);

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}

function validateUserFailedSaga(action) {
  return _regenerator.default.wrap(function validateUserFailedSaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          action.user = _reducers.initialUserState;
          _context6.next = 3;
          return (0, _effects.fork)(updateUserSaga, action);

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}

function updateUserSaga(action) {
  var userState;
  return _regenerator.default.wrap(function updateUserSaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.select)(_selectors.selectUser);

        case 2:
          userState = _context7.sent;
          _context7.next = 5;
          return (0, _effects.put)({
            type: _types.UPDATE_USER,
            from: action.type,
            user: _objectSpread({}, userState.toJS(), {}, action.user)
          });

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectUserGroups = exports.selectUserLoggedIn = exports.selectUsername = exports.selectUser = void 0;

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

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginHelper = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(7));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(19));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(5));

var _createClass2 = _interopRequireDefault(__webpack_require__(6));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(4));

var _CookieHelper = __webpack_require__(88);

var _SecurityApi = __webpack_require__(62);

var _reducers = __webpack_require__(61);

var _helpers = __webpack_require__(12);

var LOGIN_COOKIE = 'ContensisCMSUserName';
var LAST_USERNAME_COOKIE = 'ContensisLastUserName';
var DISPLAY_NAME_COOKIE = 'ContensisDisplayName';
var USER_LANGUAGE_COOKIE = 'User_LanguageID';
var AVATAR_COOKIE = 'ContensisAvatar';

var LoginHelper =
/*#__PURE__*/
function () {
  function LoginHelper() {
    (0, _classCallCheck2.default)(this, LoginHelper);
  }

  (0, _createClass2.default)(LoginHelper, null, [{
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
      var _ValidateUser = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var groups,
            cookies,
            cached,
            response,
            user,
            userWithGroups,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
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
      var _LoginUser = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(username, password) {
        var groups,
            loginResponse,
            SecurityToken,
            LogonResult,
            UserID,
            failedLogin,
            user,
            userWithGroups,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
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
                  logonResult: this.LoginErrorChecker(LogonResult)
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
      var _GetGroups = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(user) {
        var userInfoResponse, response;
        return _regenerator.default.wrap(function _callee3$(_context3) {
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
    key: "ClientRedirectToHome",
    value: function ClientRedirectToHome(location) {
      if (typeof window != 'undefined') {
        var url = '/';

        if (location) {
          var _location$toJS = location.toJS(),
              search = _location$toJS.search,
              hash = _location$toJS.hash;

          url = search ? "".concat(url).concat(search) : url;
          url = hash ? "".concat(url).concat(hash) : url;
        }

        window.location.href = url;
      }
    }
  }, {
    key: "ClientRedirectToLogin",
    value: function ClientRedirectToLogin() {
      if (typeof window != 'undefined') {
        window.location.href = this.LoginPageUrl(window.location.toString());
      }
    }
  }, {
    key: "LoginPageUrl",
    value: function LoginPageUrl(currentLocation) {
      var loginPage = LoginHelper.LOGIN_PAGE.replace('{redirect_uri}', encodeURIComponent(currentLocation)).replace('{nonce}', (0, _helpers.randomString)(5));
      return "".concat(LoginHelper.CMS_URL).concat(loginPage);
    }
  }, {
    key: "LoginErrorChecker",
    value: function LoginErrorChecker(n) {
      switch (n) {
        case -2:
          return 'Incorrect username or password';

        case -3:
          return 'Account disabled';

        case -4:
          return 'Account locked';

        case -5:
          return 'Log on from this PC is denied';

        case -6:
          return 'Log on at this time is denied';

        case -7:
          return 'Account already logged in';

        case -9:
          return 'Unspecified error';

        case 2:
          return 'Password change required';

        case 3:
          return 'Insufficient privileges';

        case -10:
          return 'Account expired';

        case -11:
          return 'Maintenance mode';

        case 4:
          return 'Security token expired';

        default:
          return 'An error has occured';
      }
    }
  }]);
  return LoginHelper;
}();

exports.LoginHelper = LoginHelper;
(0, _defineProperty2.default)(LoginHelper, "LOGIN_PAGE", '/authenticate/connect/authorize?client_id=WebsiteAdfsClient&response_type=id_token&scope=openid&redirect_uri={redirect_uri}&nonce={nonce}');
(0, _defineProperty2.default)(LoginHelper, "CMS_URL", SERVERS.cms
/* global SERVERS */
);

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookieHelper = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(5));

var _createClass2 = _interopRequireDefault(__webpack_require__(6));

var _jsCookie = _interopRequireDefault(__webpack_require__(89));

var COOKIE_VALID_DAYS = 1; // 0 = Session cookie
// Override the default js-cookie conversion / encoding
// methods so the written values work with Contensis sites

var _cookie = _jsCookie.default.withConverter({
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
    (0, _classCallCheck2.default)(this, CookieHelper);
  }

  (0, _createClass2.default)(CookieHelper, null, [{
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
/* 89 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__89__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=zengenti-isomorphic-base.js.map