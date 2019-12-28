(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("immutable"), require("react-router-dom"), require("react-hot-loader"), require("react-redux"), require("@redux-saga/core/effects"), require("react-loadable"), require("isomorphic-fetch"), require("contensis-delivery-api"), require("regenerator-runtime"), require("redux"), require("redux-immutable"), require("redux-thunk"), require("redux-saga"), require("loglevel"), require("react-router-config"), require("react-dom"), require("query-string"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "immutable", "react-router-dom", "react-hot-loader", "react-redux", "@redux-saga/core/effects", "react-loadable", "isomorphic-fetch", "contensis-delivery-api", "regenerator-runtime", "redux", "redux-immutable", "redux-thunk", "redux-saga", "loglevel", "react-router-config", "react-dom", "query-string"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("immutable"), require("react-router-dom"), require("react-hot-loader"), require("react-redux"), require("@redux-saga/core/effects"), require("react-loadable"), require("isomorphic-fetch"), require("contensis-delivery-api"), require("regenerator-runtime"), require("redux"), require("redux-immutable"), require("redux-thunk"), require("redux-saga"), require("loglevel"), require("react-router-config"), require("react-dom"), require("query-string")) : factory(root["react"], root["immutable"], root["react-router-dom"], root["react-hot-loader"], root["react-redux"], root["@redux-saga/core/effects"], root["react-loadable"], root["isomorphic-fetch"], root["contensis-delivery-api"], root["regenerator-runtime"], root["redux"], root["redux-immutable"], root["redux-thunk"], root["redux-saga"], root["loglevel"], root["react-router-config"], root["react-dom"], root["query-string"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__15__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__21__, __WEBPACK_EXTERNAL_MODULE__24__, __WEBPACK_EXTERNAL_MODULE__26__, __WEBPACK_EXTERNAL_MODULE__33__, __WEBPACK_EXTERNAL_MODULE__34__, __WEBPACK_EXTERNAL_MODULE__38__, __WEBPACK_EXTERNAL_MODULE__39__, __WEBPACK_EXTERNAL_MODULE__40__, __WEBPACK_EXTERNAL_MODULE__41__, __WEBPACK_EXTERNAL_MODULE__48__, __WEBPACK_EXTERNAL_MODULE__54__, __WEBPACK_EXTERNAL_MODULE__80__, __WEBPACK_EXTERNAL_MODULE__81__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 78);
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

var _typeof2 = _interopRequireDefault(__webpack_require__(32));

var _contensisDeliveryApi = __webpack_require__(33);

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

module.exports = __webpack_require__(34);


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

var setNavigationPath = function setNavigationPath(path, routeParams, withEvents, isStatic) {
  return (0, _helpers.action)(_routing.SET_NAVIGATION_PATH, {
    path: path,
    routeParams: routeParams,
    withEvents: withEvents,
    isStatic: isStatic
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

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(35));

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
  module.exports = __webpack_require__(52)();
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

var _reactRouterConfig = __webpack_require__(54);

var _routing = __webpack_require__(9);

var _routing2 = __webpack_require__(18);

var _NotFound = _interopRequireDefault(__webpack_require__(55));

var _Status = __webpack_require__(56);

var _ToJs = __webpack_require__(57);

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
  var projectId = _ref.projectId,
      contentTypeId = _ref.contentTypeId,
      entry = _ref.entry,
      isNotFound = _ref.isNotFound,
      setNavigationPath = _ref.setNavigationPath,
      routes = _ref.routes,
      location = _ref.location,
      withEvents = _ref.withEvents;

  var matchedStaticRoute = function matchedStaticRoute(pathname) {
    return (0, _reactRouterConfig.matchRoutes)(routes.StaticRoutes, typeof window != 'undefined' ? window.location.pathname : pathname);
  };

  var isStaticRoute = function isStaticRoute(pathname) {
    return matchedStaticRoute(pathname).length > 0;
  };

  var currentPath = location.pathname;
  var trimmedPath = getTrimmedPath(location.pathname);

  var setPath = function setPath() {
    var routeParams = isStaticRoute(trimmedPath) ? matchedStaticRoute(trimmedPath)[0].match.params : {};
    setNavigationPath(trimmedPath, routeParams, withEvents, isStaticRoute(trimmedPath));
  };

  if (typeof window == 'undefined') setPath();
  (0, _react.useEffect)(function () {
    setPath();
  }, [location]); // Match Any Static Routes a developer has defined

  if (isStaticRoute(currentPath)) {
    return (0, _reactRouterConfig.renderRoutes)(routes.StaticRoutes, {
      projectId: projectId,
      contentTypeId: contentTypeId,
      entry: entry
    });
  } // Need to redirect when url endswith a /


  if (currentPath.length > trimmedPath.length) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: trimmedPath
    });
  } // Match Any Defined Content Type Mappings


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
  projectId: _propTypes.default.string,
  contentTypeId: _propTypes.default.string,
  entry: _propTypes.default.object,
  isNotFound: _propTypes.default.bool,
  setNavigationPath: _propTypes.default.func
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    projectId: (0, _routing.selectCurrentProject)(state),
    entry: (0, _routing.selectRouteEntry)(state),
    contentTypeId: (0, _routing.selectRouteEntryContentTypeId)(state),
    isNotFound: (0, _routing.selectIsNotFound)(state)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setNavigationPath: function setNavigationPath(path, routeParams, withEvents, isStatic) {
      return dispatch((0, _routing2.setNavigationPath)(path, routeParams, withEvents, isStatic));
    }
  };
}

var _default = (0, _reactHotLoader.hot)(module)((0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _ToJs.toJS)(RouteLoader))));

exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(51)(module)))

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

var _history = __webpack_require__(58);

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
/* 32 */
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
/* 36 */
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(7);

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
          return state.set('currentPath', (0, _immutable.fromJS)(action.path)).set('routeParams', (0, _immutable.fromJS)(action.routeParams)).set('isStatic', action.isStatic);
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
/* 45 */
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
/* 46 */
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

var _routing = __webpack_require__(47);

var _navigation = __webpack_require__(49);

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
/* 47 */
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

var log = _interopRequireWildcard(__webpack_require__(48));

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
          _context.next = 4;
          return (0, _effects.put)({
            type: _routing.SET_NAVIGATION_PATH,
            path: action.path,
            withEvents: action.withEvents,
            isStatic: action.isStatic
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function getRouteSaga(action) {
  var entry, withEvents, state, currentPath, deliveryApiStatus, project, pathNode, ancestors, splitPath, entryGuid;
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

          if (!action.isStatic) {
            _context2.next = 12;
            break;
          }

          _context2.next = 47;
          break;

        case 12:
          currentPath = (0, _routing2.selectCurrentPath)(state);
          deliveryApiStatus = (0, _version.selectVersionStatus)(state);
          project = (0, _routing2.selectCurrentProject)(state);
          pathNode = null;
          ancestors = null; // Scroll into View

          if (typeof window !== 'undefined') {
            window.scroll({
              top: 0
            });
          }

          if (!(currentPath === '/')) {
            _context2.next = 24;
            break;
          }

          _context2.next = 21;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.getRoot({
            entryFields: '*',
            entryLinkDepth: 4,
            language: 'en-GB'
          });

        case 21:
          pathNode = _context2.sent;
          _context2.next = 39;
          break;

        case 24:
          if (!currentPath.startsWith('/preview/')) {
            _context2.next = 33;
            break;
          }

          splitPath = currentPath.split('/');
          entryGuid = splitPath[2];
          _context2.next = 29;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.getByEntry({
            entryId: entryGuid,
            entryFields: '*',
            entryLinkDepth: 4
          });

        case 29:
          pathNode = _context2.sent;
          pathNode = pathNode[0];
          _context2.next = 36;
          break;

        case 33:
          _context2.next = 35;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.get({
            path: currentPath,
            entryFields: '*',
            entryLinkDepth: 4
          });

        case 35:
          pathNode = _context2.sent;

        case 36:
          _context2.next = 38;
          return _ContensisDeliveryApi.deliveryApi.getClient(deliveryApiStatus, project).nodes.getAncestors(pathNode.id);

        case 38:
          ancestors = _context2.sent;

        case 39:
          if (!(pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id)) {
            _context2.next = 45;
            break;
          }

          entry = pathNode.entry;
          _context2.next = 43;
          return (0, _effects.call)(setRouteEntry, entry, pathNode, ancestors);

        case 43:
          _context2.next = 47;
          break;

        case 45:
          _context2.next = 47;
          return (0, _effects.call)(do404);

        case 47:
          if (!(withEvents && withEvents.onRouteLoaded)) {
            _context2.next = 50;
            break;
          }

          _context2.next = 50;
          return withEvents.onRouteLoaded(_objectSpread({}, action, {
            entry: entry
          }));

        case 50:
          if ((0, _navigation2.hasNavigationTree)(state)) {
            _context2.next = 53;
            break;
          }

          _context2.next = 53;
          return (0, _effects.put)({
            type: _navigation.GET_NODE_TREE
          });

        case 53:
          _context2.next = 60;
          break;

        case 55:
          _context2.prev = 55;
          _context2.t0 = _context2["catch"](1);
          log.error.apply(log, ['Error running route saga:', _context2.t0, _context2.t0.stack]);
          _context2.next = 60;
          return (0, _effects.call)(do404);

        case 60:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[1, 55]]);
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
/* 48 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__48__;

/***/ }),
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(53);

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
/* 53 */
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
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var NotFound = function NotFound() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("header", null, _react.default.createElement("h1", null, "404 Page Not Found")));
};

var _default = NotFound;
exports.default = _default;

/***/ }),
/* 56 */
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
/* 57 */
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
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
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
    location = _extends({}, path);
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
    _extends(history, nextState);

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
    _extends(history, nextState);

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
    _extends(history, nextState);

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
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ReactApp = void 0;

var client = __webpack_require__(79).default;

var ReactApp = __webpack_require__(50).default;

exports.ReactApp = ReactApp;
var _default = client;
exports.default = _default;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(13));

__webpack_require__(26);

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactDom = __webpack_require__(80);

var _reactRouterDom = __webpack_require__(10);

var _reactLoadable = __webpack_require__(24);

var _reactHotLoader = __webpack_require__(15);

var _reactRedux = __webpack_require__(16);

var _queryString = _interopRequireDefault(__webpack_require__(81));

var _immutable = __webpack_require__(2);

var _store = _interopRequireDefault(__webpack_require__(37));

var _index = _interopRequireDefault(__webpack_require__(46));

var _version = __webpack_require__(36);

var _ContensisDeliveryApi = __webpack_require__(3);

var _routing = __webpack_require__(18);

var _pickProject = _interopRequireDefault(__webpack_require__(31));

var _history = __webpack_require__(30);

var ClientApp = function ClientApp(ReactApp, config) {
  (0, _classCallCheck2.default)(this, ClientApp);
  var documentRoot = document.getElementById('root');
  var routes = config.routes,
      withReducers = config.withReducers,
      withSagas = config.withSagas,
      withEvents = config.withEvents;

  var GetClientJSX = function GetClientJSX(store) {
    var ClientJsx = _react.default.createElement(_reactHotLoader.AppContainer, null, _react.default.createElement(_reactRedux.Provider, {
      store: store
    }, _react.default.createElement(_reactRouterDom.Router, {
      history: _history.browserHistory
    }, _react.default.createElement(ReactApp, {
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
  var versionStatusFromHostname = (0, _ContensisDeliveryApi.GetClientSideDeliveryApiStatus)();

  if (window.isDynamic || window.REDUX_DATA || process.env.NODE_ENV !== 'production') {
    store = (0, _store.default)(withReducers, (0, _immutable.fromJS)(window.REDUX_DATA), _history.browserHistory);
    store.dispatch((0, _version.setVersionStatus)(versionStatusFromHostname));
    /* eslint-disable no-console */

    console.log('Hydrating from inline Redux');
    /* eslint-enable no-console */

    store.runSaga((0, _index.default)(withSagas));
    store.dispatch((0, _routing.setCurrentProject)((0, _pickProject.default)(window.location.hostname, _queryString.default.parse(window.location.search))));
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
      store = (0, _store.default)(withReducers, (0, _immutable.fromJS)(ssRedux), _history.browserHistory); // store.dispatch(setVersionStatus(versionStatusFromHostname));

      store.runSaga((0, _index.default)(withSagas));
      store.dispatch((0, _routing.setCurrentProject)((0, _pickProject.default)(window.location.hostname, _queryString.default.parse(window.location.search)))); // if (typeof window != 'undefined') {
      //   store.dispatch(checkUserLoggedIn());
      // }

      HMRRenderer(GetClientJSX(store));
    });
  } // webpack Hot Module Replacement API


  if (false) {}
};

var _default = ClientApp;
exports.default = _default;

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__80__;

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__81__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=client.js.map