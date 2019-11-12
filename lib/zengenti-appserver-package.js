(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("isomorphic-fetch"), require("express"), require("react-loadable"), require("evil-dns"), require("http-proxy"), require("react"), require("styled-components"), require("react-helmet"), require("serialize-javascript"), require("minify-css-string"));
	else if(typeof define === 'function' && define.amd)
		define(["isomorphic-fetch", "express", "react-loadable", "evil-dns", "http-proxy", "react", "styled-components", "react-helmet", "serialize-javascript", "minify-css-string"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("isomorphic-fetch"), require("express"), require("react-loadable"), require("evil-dns"), require("http-proxy"), require("react"), require("styled-components"), require("react-helmet"), require("serialize-javascript"), require("minify-css-string")) : factory(root["isomorphic-fetch"], root["express"], root["react-loadable"], root["evil-dns"], root["http-proxy"], root["react"], root["styled-components"], root["react-helmet"], root["serialize-javascript"], root["minify-css-string"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__22__, __WEBPACK_EXTERNAL_MODULE__29__, __WEBPACK_EXTERNAL_MODULE__30__, __WEBPACK_EXTERNAL_MODULE__31__, __WEBPACK_EXTERNAL_MODULE__32__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIB = __webpack_require__(2).default;

exports.app = LIB.app;
exports.start = LIB.start;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(3);

var _express = _interopRequireDefault(__webpack_require__(4));

var _reactLoadable = _interopRequireDefault(__webpack_require__(5));

var _displayStartupConfiguration = _interopRequireDefault(__webpack_require__(6));

var _localDns = _interopRequireDefault(__webpack_require__(7));

var _reverseProxies = _interopRequireDefault(__webpack_require__(10));

var _webApp = _interopRequireDefault(__webpack_require__(12));

// import ConfigureFeatures from './features/configure';
var app = (0, _express.default)();

var start = function start(options) {
  app.disable('x-powered-by'); // Output some information about the used build/startup configuration

  (0, _displayStartupConfiguration.default)(options); // Configure DNS to make life easier

  (0, _localDns.default)(); // Set-up local proxy for images from cms, to save doing rewrites and extra code

  (0, _reverseProxies.default)(app, options.reverseProxyPaths);
  options.ConfigureFeatures(app);
  (0, _webApp.default)(app, options);
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
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var DisplayStartupConfiguration = function DisplayStartupConfiguration(_ref) {
  var servers = _ref.servers,
      projects = _ref.projects,
      reverseProxyPaths = _ref.reverseProxyPaths;

  /* eslint-disable no-console */
  console.log();
  console.log("Configured servers:\n", JSON.stringify(servers, null, 2));
  console.log();
  console.log("Configured projects:\n", JSON.stringify(projects, null, 2));
  console.log();
  console.log('Reverse proxy paths: ', JSON.stringify(reverseProxyPaths, null, 2));
  console.log();
  /* eslint-enable no-console */
};

var _default = DisplayStartupConfiguration;
exports.default = _default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evilDns = _interopRequireDefault(__webpack_require__(8));

var _fetchMyIp = _interopRequireDefault(__webpack_require__(9));

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
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpProxy = _interopRequireDefault(__webpack_require__(11));

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
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(13);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(14));

var _server = __webpack_require__(18);

var _webpack = __webpack_require__(24);

var _styledComponents = __webpack_require__(29);

var _reactHelmet = _interopRequireDefault(__webpack_require__(30));

var _serializeJavascript = _interopRequireDefault(__webpack_require__(31));

var _minifyCssString = _interopRequireDefault(__webpack_require__(32));

var _types = __webpack_require__(33);

var _pickProject = _interopRequireWildcard(__webpack_require__(34));

// import { history } from '~/core/redux/history';
var addStandardHeaders = function addStandardHeaders(state, response, selectors, packagejson) {
  if (state) {
    /* eslint-disable no-console */
    try {
      console.log('About to add header');
      var navDepends = selectors.selectNavigationDepends(state);
      var recordDepends = selectors.selectRouteEntryDepends(state);
      navDepends = navDepends.toJS();
      recordDepends = recordDepends.toJS();
      console.log("navDepends count: ".concat(navDepends.length));
      console.log("recordDepends count: ".concat(recordDepends.length));
      var allDepends = [].concat((0, _toConsumableArray2.default)(navDepends), (0, _toConsumableArray2.default)(recordDepends));
      var allDependsHeaderValue = allDepends.join(' ');
      allDependsHeaderValue = " ".concat(packagejson.name, "-app ").concat(allDependsHeaderValue, " ").concat(packagejson.name, "-app");
      response.header('surrogate-key', allDependsHeaderValue);
      addVarnishAuthenticationHeaders(state, response, selectors);
    } catch (e) {
      console.log('Error Adding headers');
      console.log(e);
    }
  }

  response.setHeader('Surrogate-Control', 'max-age=3600');
};

var addVarnishAuthenticationHeaders = function addVarnishAuthenticationHeaders(state, response, selectors) {
  if (state) {
    try {
      var stateEntry = selectors.selectRouteEntry(state);
      var project = selectors.selectCurrentProject(state);

      if (stateEntry && stateEntry.getIn(['authentication', 'isLoginRequired'])) {
        response.header('x-contensis-viewer-groups', (0, _pickProject.allowedGroups)(project).join('|'));
      }
    } catch (e) {
      console.log('Error adding authentication header');
      console.log(e);
    }
  }
};

var webApp = function webApp(app, options) {
  app.get('/*', function (request, response, next) {
    if (request.originalUrl.startsWith('/static/')) return next();
    var url = request.url; // Determine functional params and set access methods

    var accessMethod = {};
    var isDynamicNormalised = request.query.dynamic ? request.query.dynamic.toLowerCase() : 'false'; // Hack for certain pages to avoid SSR

    var onlyDynamic = options.dynamicPaths.includes(request.path);
    var isReduxRequestNormalised = request.query.redux ? request.query.redux.toLowerCase() : 'false';
    var isFragmentNormalised = request.query.fragment ? request.query.fragment.toLowerCase() : 'false';
    var isStaticNormalised = request.query.static ? request.query.static.toLowerCase() : 'false';
    if (onlyDynamic || isDynamicNormalised === 'true') accessMethod.DYNAMIC = _types.AccessMethods.DYNAMIC;
    if (isReduxRequestNormalised === 'true') accessMethod.REDUX = _types.AccessMethods.REDUX;
    if (isFragmentNormalised === 'true') accessMethod.FRAGMENT = _types.AccessMethods.FRAGMENT;
    if (isStaticNormalised === 'true') accessMethod.STATIC = _types.AccessMethods.STATIC;
    var context = options.context; //{};

    var store = options.createStore();
    var status = 200; // dispatch any global and non-saga related actions before calling our JSX

    var versionStatusFromHostname = options.helpers.GetDeliveryApiStatusFromHostname(request.hostname);
    var versionInfo = options.version.versionInfo;
    store.dispatch(options.actions.setVersionStatus(versionStatusFromHostname));
    store.dispatch(options.actions.setVersion(versionInfo.commitRef, versionInfo.buildNo));
    var project = (0, _pickProject.default)(request.hostname, request.query);
    var groups = (0, _pickProject.allowedGroups)(project);
    store.dispatch(options.actions.setCurrentProject(project, groups));
    var modules = [];
    var jsx = options.jsx({
      store: store,
      modules: modules,
      url: url,
      context: context
    });
    /* eslint-disable no-console */

    console.log("Request for ".concat(request.path, " hostname: ").concat(request.hostname, " versionStatus: ").concat(versionStatusFromHostname));
    /* eslint-enable no-console */

    var _options$templates = options.templates,
        templateHTML = _options$templates.templateHTML,
        templateHTMLFragment = _options$templates.templateHTMLFragment,
        templateHTMLStatic = _options$templates.templateHTMLStatic; // Serve a blank HTML page with client scripts to load the app in the browser

    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      (0, _server.renderToString)(jsx);
      var isDynamicHint = "<script>window.isDynamic = true;</script>";
      var dynamicBundles = (0, _webpack.getBundles)(options.stats, modules);
      var dynamicBundleScripts = dynamicBundles.map(function (bundle) {
        return "<script src=\"".concat(bundle.publicPath, "\"></script>");
      }).join('');
      var responseHtmlDynamic = templateHTML.replace('{{TITLE}}', '').replace('{{SEO_CRITICAL_METADATA}}', '').replace('{{CRITICAL_CSS}}', '').replace('{{APP}}', '').replace('{{LOADABLE_CHUNKS}}', dynamicBundleScripts).replace('{{REDUX_DATA}}', isDynamicHint);
      response.setHeader('Surrogate-Control', 'max-age=3600');
      response.status(status).send(responseHtmlDynamic);
    } // Render the JSX server side and send response as per access method options


    if (!accessMethod.DYNAMIC) {
      store.runSaga(options.rootSaga).toPromise().then(function () {
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
        var bundles = (0, _webpack.getBundles)(options.stats, modules);
        var bundleScripts = bundles.map(function (bundle) {
          return "<script src=\"".concat(bundle.publicPath, "\"></script>");
        }).join('');
        var serialisedReduxData = '';

        if (context.status !== 404) {
          if (accessMethod.REDUX) {
            serialisedReduxData = (0, _serializeJavascript.default)(reduxState);
            addStandardHeaders(reduxState, response, options.selectors, options.packagejson);
            response.status(status).json(serialisedReduxData);
            return true;
          }

          if (!DISABLE_SSR_REDUX) {
            serialisedReduxData = (0, _serializeJavascript.default)(reduxState);
            serialisedReduxData = "<script>window.REDUX_DATA = ".concat(serialisedReduxData, "</script>");
          }
          /* global DISABLE_SSR_REDUX */

        }

        if (context.status === 404) {
          accessMethod.STATIC = _types.AccessMethods.STATIC;
        } // Responses


        var responseHTML = ''; // Static page served as a fragment

        if (accessMethod.FRAGMENT && accessMethod.STATIC) {
          addStandardHeaders(reduxState, response, options.selectors, options.packagejson);
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

        addStandardHeaders(reduxState, response, options.selectors, options.packagejson);
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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(15);

var iterableToArray = __webpack_require__(16);

var nonIterableSpread = __webpack_require__(17);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(19);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(20);
} else {}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-dom-server.node.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var p=__webpack_require__(21),q=__webpack_require__(22),aa=__webpack_require__(23);function ba(a,b,d,c,f,e,h,g){if(!a){a=void 0;if(void 0===b)a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var D=[d,c,f,e,h,g],B=0;a=Error(b.replace(/%s/g,function(){return D[B++]}));a.name="Invariant Violation"}a.framesToPop=1;throw a;}}
function r(a){for(var b=arguments.length-1,d="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=0;c<b;c++)d+="&args[]="+encodeURIComponent(arguments[c+1]);ba(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",d)}
var v="function"===typeof Symbol&&Symbol.for,ca=v?Symbol.for("react.portal"):60106,x=v?Symbol.for("react.fragment"):60107,da=v?Symbol.for("react.strict_mode"):60108,ea=v?Symbol.for("react.profiler"):60114,z=v?Symbol.for("react.provider"):60109,fa=v?Symbol.for("react.context"):60110,ha=v?Symbol.for("react.concurrent_mode"):60111,ia=v?Symbol.for("react.forward_ref"):60112,A=v?Symbol.for("react.suspense"):60113,ja=v?Symbol.for("react.memo"):60115,ka=v?Symbol.for("react.lazy"):60116;
function C(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ha:return"ConcurrentMode";case x:return"Fragment";case ca:return"Portal";case ea:return"Profiler";case da:return"StrictMode";case A:return"Suspense"}if("object"===typeof a)switch(a.$$typeof){case fa:return"Context.Consumer";case z:return"Context.Provider";case ia:var b=a.render;b=b.displayName||b.name||"";return a.displayName||(""!==b?"ForwardRef("+b+")":
"ForwardRef");case ja:return C(a.type);case ka:if(a=1===a._status?a._result:null)return C(a)}return null}var E=q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;E.hasOwnProperty("ReactCurrentDispatcher")||(E.ReactCurrentDispatcher={current:null});var la={};function F(a,b){for(var d=a._threadCount|0;d<=b;d++)a[d]=a._currentValue2,a._threadCount=d+1}
function ma(a,b,d){var c=a.contextType;if("object"===typeof c&&null!==c)return F(c,d),c[d];if(a=a.contextTypes){d={};for(var f in a)d[f]=b[f];b=d}else b=la;return b}for(var G=new Uint16Array(16),H=0;15>H;H++)G[H]=H+1;G[15]=0;
var na=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,oa=Object.prototype.hasOwnProperty,pa={},qa={};
function ra(a){if(oa.call(qa,a))return!0;if(oa.call(pa,a))return!1;if(na.test(a))return qa[a]=!0;pa[a]=!0;return!1}function sa(a,b,d,c){if(null!==d&&0===d.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(c)return!1;if(null!==d)return!d.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function ta(a,b,d,c){if(null===b||"undefined"===typeof b||sa(a,b,d,c))return!0;if(c)return!1;if(null!==d)switch(d.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function I(a,b,d,c,f){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=c;this.attributeNamespace=f;this.mustUseProperty=d;this.propertyName=a;this.type=b}var J={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){J[a]=new I(a,0,!1,a,null)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];J[b]=new I(b,1,!1,a[1],null)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){J[a]=new I(a,2,!1,a.toLowerCase(),null)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){J[a]=new I(a,2,!1,a,null)});"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){J[a]=new I(a,3,!1,a.toLowerCase(),null)});["checked","multiple","muted","selected"].forEach(function(a){J[a]=new I(a,3,!0,a,null)});
["capture","download"].forEach(function(a){J[a]=new I(a,4,!1,a,null)});["cols","rows","size","span"].forEach(function(a){J[a]=new I(a,6,!1,a,null)});["rowSpan","start"].forEach(function(a){J[a]=new I(a,5,!1,a.toLowerCase(),null)});var K=/[\-:]([a-z])/g;function L(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(K,
L);J[b]=new I(b,1,!1,a,null)});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(K,L);J[b]=new I(b,1,!1,a,"http://www.w3.org/1999/xlink")});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(K,L);J[b]=new I(b,1,!1,a,"http://www.w3.org/XML/1998/namespace")});["tabIndex","crossOrigin"].forEach(function(a){J[a]=new I(a,1,!1,a.toLowerCase(),null)});var ua=/["'&<>]/;
function M(a){if("boolean"===typeof a||"number"===typeof a)return""+a;a=""+a;var b=ua.exec(a);if(b){var d="",c,f=0;for(c=b.index;c<a.length;c++){switch(a.charCodeAt(c)){case 34:b="&quot;";break;case 38:b="&amp;";break;case 39:b="&#x27;";break;case 60:b="&lt;";break;case 62:b="&gt;";break;default:continue}f!==c&&(d+=a.substring(f,c));f=c+1;d+=b}a=f!==c?d+a.substring(f,c):d}return a}var N=null,O=null,P=null,Q=!1,S=!1,T=null,U=0;function V(){null===N?r("321"):void 0;return N}
function va(){0<U&&r("312");return{memoizedState:null,queue:null,next:null}}function W(){null===P?null===O?(Q=!1,O=P=va()):(Q=!0,P=O):null===P.next?(Q=!1,P=P.next=va()):(Q=!0,P=P.next);return P}function wa(a,b,d,c){for(;S;)S=!1,U+=1,P=null,d=a(b,c);O=N=null;U=0;P=T=null;return d}function xa(a,b){return"function"===typeof b?b(a):b}
function ya(a,b,d){N=V();P=W();if(Q){var c=P.queue;b=c.dispatch;if(null!==T&&(d=T.get(c),void 0!==d)){T.delete(c);c=P.memoizedState;do c=a(c,d.action),d=d.next;while(null!==d);P.memoizedState=c;return[c,b]}return[P.memoizedState,b]}a=a===xa?"function"===typeof b?b():b:void 0!==d?d(b):b;P.memoizedState=a;a=P.queue={last:null,dispatch:null};a=a.dispatch=za.bind(null,N,a);return[P.memoizedState,a]}
function za(a,b,d){25>U?void 0:r("301");if(a===N)if(S=!0,a={action:d,next:null},null===T&&(T=new Map),d=T.get(b),void 0===d)T.set(b,a);else{for(b=d;null!==b.next;)b=b.next;b.next=a}}function Aa(){}
var X=0,Ba={readContext:function(a){var b=X;F(a,b);return a[b]},useContext:function(a){V();var b=X;F(a,b);return a[b]},useMemo:function(a,b){N=V();P=W();b=void 0===b?null:b;if(null!==P){var d=P.memoizedState;if(null!==d&&null!==b){a:{var c=d[1];if(null===c)c=!1;else{for(var f=0;f<c.length&&f<b.length;f++){var e=b[f],h=c[f];if((e!==h||0===e&&1/e!==1/h)&&(e===e||h===h)){c=!1;break a}}c=!0}}if(c)return d[0]}}a=a();P.memoizedState=[a,b];return a},useReducer:ya,useRef:function(a){N=V();P=W();var b=P.memoizedState;
return null===b?(a={current:a},P.memoizedState=a):b},useState:function(a){return ya(xa,a)},useLayoutEffect:function(){},useCallback:function(a){return a},useImperativeHandle:Aa,useEffect:Aa,useDebugValue:Aa},Ca={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};function Da(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
var Ea={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},Fa=p({menuitem:!0},Ea),Y={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,
gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ga=["Webkit","ms","Moz","O"];Object.keys(Y).forEach(function(a){Ga.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Y[b]=Y[a]})});
var Ha=/([A-Z])/g,Ia=/^ms-/,Z=q.Children.toArray,Ja=E.ReactCurrentDispatcher,Ka={listing:!0,pre:!0,textarea:!0},La=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,Ma={},Na={};function Oa(a){if(void 0===a||null===a)return a;var b="";q.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}var Pa=Object.prototype.hasOwnProperty,Qa={children:null,dangerouslySetInnerHTML:null,suppressContentEditableWarning:null,suppressHydrationWarning:null};function Ra(a,b){void 0===a&&r("152",C(b)||"Component")}
function Sa(a,b,d){function c(c,f){var e=ma(f,b,d),g=[],h=!1,l={isMounted:function(){return!1},enqueueForceUpdate:function(){if(null===g)return null},enqueueReplaceState:function(a,b){h=!0;g=[b]},enqueueSetState:function(a,b){if(null===g)return null;g.push(b)}},k=void 0;if(f.prototype&&f.prototype.isReactComponent){if(k=new f(c.props,e,l),"function"===typeof f.getDerivedStateFromProps){var t=f.getDerivedStateFromProps.call(null,c.props,k.state);null!=t&&(k.state=p({},k.state,t))}}else if(N={},k=f(c.props,
e,l),k=wa(f,c.props,k,e),null==k||null==k.render){a=k;Ra(a,f);return}k.props=c.props;k.context=e;k.updater=l;l=k.state;void 0===l&&(k.state=l=null);if("function"===typeof k.UNSAFE_componentWillMount||"function"===typeof k.componentWillMount)if("function"===typeof k.componentWillMount&&"function"!==typeof f.getDerivedStateFromProps&&k.componentWillMount(),"function"===typeof k.UNSAFE_componentWillMount&&"function"!==typeof f.getDerivedStateFromProps&&k.UNSAFE_componentWillMount(),g.length){l=g;var m=
h;g=null;h=!1;if(m&&1===l.length)k.state=l[0];else{t=m?l[0]:k.state;var u=!0;for(m=m?1:0;m<l.length;m++){var w=l[m];w="function"===typeof w?w.call(k,t,c.props,e):w;null!=w&&(u?(u=!1,t=p({},t,w)):p(t,w))}k.state=t}}else g=null;a=k.render();Ra(a,f);c=void 0;if("function"===typeof k.getChildContext&&(e=f.childContextTypes,"object"===typeof e)){c=k.getChildContext();for(var R in c)R in e?void 0:r("108",C(f)||"Unknown",R)}c&&(b=p({},b,c))}for(;q.isValidElement(a);){var f=a,e=f.type;if("function"!==typeof e)break;
c(f,e)}return{child:a,context:b}}
var Ta=function(){function a(b,d){if(!(this instanceof a))throw new TypeError("Cannot call a class as a function");q.isValidElement(b)?b.type!==x?b=[b]:(b=b.props.children,b=q.isValidElement(b)?[b]:Z(b)):b=Z(b);b={type:null,domNamespace:Ca.html,children:b,childIndex:0,context:la,footer:""};var c=G[0];if(0===c){var f=G;c=f.length;var e=2*c;65536>=e?void 0:r("304");var h=new Uint16Array(e);h.set(f);G=h;G[0]=c+1;for(f=c;f<e-1;f++)G[f]=f+1;G[e-1]=0}else G[0]=G[c];this.threadID=c;this.stack=[b];this.exhausted=
!1;this.currentSelectValue=null;this.previousWasTextNode=!1;this.makeStaticMarkup=d;this.suspenseDepth=0;this.contextIndex=-1;this.contextStack=[];this.contextValueStack=[]}a.prototype.destroy=function(){if(!this.exhausted){this.exhausted=!0;this.clearProviders();var a=this.threadID;G[a]=G[0];G[0]=a}};a.prototype.pushProvider=function(a){var b=++this.contextIndex,c=a.type._context,f=this.threadID;F(c,f);var e=c[f];this.contextStack[b]=c;this.contextValueStack[b]=e;c[f]=a.props.value};a.prototype.popProvider=
function(){var a=this.contextIndex,d=this.contextStack[a],c=this.contextValueStack[a];this.contextStack[a]=null;this.contextValueStack[a]=null;this.contextIndex--;d[this.threadID]=c};a.prototype.clearProviders=function(){for(var a=this.contextIndex;0<=a;a--)this.contextStack[a][this.threadID]=this.contextValueStack[a]};a.prototype.read=function(a){if(this.exhausted)return null;var b=X;X=this.threadID;var c=Ja.current;Ja.current=Ba;try{for(var f=[""],e=!1;f[0].length<a;){if(0===this.stack.length){this.exhausted=
!0;var h=this.threadID;G[h]=G[0];G[0]=h;break}var g=this.stack[this.stack.length-1];if(e||g.childIndex>=g.children.length){var D=g.footer;""!==D&&(this.previousWasTextNode=!1);this.stack.pop();if("select"===g.type)this.currentSelectValue=null;else if(null!=g.type&&null!=g.type.type&&g.type.type.$$typeof===z)this.popProvider(g.type);else if(g.type===A){this.suspenseDepth--;var B=f.pop();if(e){e=!1;var n=g.fallbackFrame;n?void 0:r("303");this.stack.push(n);continue}else f[this.suspenseDepth]+=B}f[this.suspenseDepth]+=
D}else{var l=g.children[g.childIndex++],k="";try{k+=this.render(l,g.context,g.domNamespace)}catch(t){throw t;}finally{}f.length<=this.suspenseDepth&&f.push("");f[this.suspenseDepth]+=k}}return f[0]}finally{Ja.current=c,X=b}};a.prototype.render=function(a,d,c){if("string"===typeof a||"number"===typeof a){c=""+a;if(""===c)return"";if(this.makeStaticMarkup)return M(c);if(this.previousWasTextNode)return"\x3c!-- --\x3e"+M(c);this.previousWasTextNode=!0;return M(c)}d=Sa(a,d,this.threadID);a=d.child;d=d.context;
if(null===a||!1===a)return"";if(!q.isValidElement(a)){if(null!=a&&null!=a.$$typeof){var b=a.$$typeof;b===ca?r("257"):void 0;r("258",b.toString())}a=Z(a);this.stack.push({type:null,domNamespace:c,children:a,childIndex:0,context:d,footer:""});return""}b=a.type;if("string"===typeof b)return this.renderDOM(a,d,c);switch(b){case da:case ha:case ea:case x:return a=Z(a.props.children),this.stack.push({type:null,domNamespace:c,children:a,childIndex:0,context:d,footer:""}),"";case A:r("294")}if("object"===
typeof b&&null!==b)switch(b.$$typeof){case ia:N={};var e=b.render(a.props,a.ref);e=wa(b.render,a.props,e,a.ref);e=Z(e);this.stack.push({type:null,domNamespace:c,children:e,childIndex:0,context:d,footer:""});return"";case ja:return a=[q.createElement(b.type,p({ref:a.ref},a.props))],this.stack.push({type:null,domNamespace:c,children:a,childIndex:0,context:d,footer:""}),"";case z:return b=Z(a.props.children),c={type:a,domNamespace:c,children:b,childIndex:0,context:d,footer:""},this.pushProvider(a),this.stack.push(c),
"";case fa:b=a.type;e=a.props;var h=this.threadID;F(b,h);b=Z(e.children(b[h]));this.stack.push({type:a,domNamespace:c,children:b,childIndex:0,context:d,footer:""});return"";case ka:r("295")}r("130",null==b?b:typeof b,"")};a.prototype.renderDOM=function(a,d,c){var b=a.type.toLowerCase();c===Ca.html&&Da(b);Ma.hasOwnProperty(b)||(La.test(b)?void 0:r("65",b),Ma[b]=!0);var e=a.props;if("input"===b)e=p({type:void 0},e,{defaultChecked:void 0,defaultValue:void 0,value:null!=e.value?e.value:e.defaultValue,
checked:null!=e.checked?e.checked:e.defaultChecked});else if("textarea"===b){var h=e.value;if(null==h){h=e.defaultValue;var g=e.children;null!=g&&(null!=h?r("92"):void 0,Array.isArray(g)&&(1>=g.length?void 0:r("93"),g=g[0]),h=""+g);null==h&&(h="")}e=p({},e,{value:void 0,children:""+h})}else if("select"===b)this.currentSelectValue=null!=e.value?e.value:e.defaultValue,e=p({},e,{value:void 0});else if("option"===b){g=this.currentSelectValue;var D=Oa(e.children);if(null!=g){var B=null!=e.value?e.value+
"":D;h=!1;if(Array.isArray(g))for(var n=0;n<g.length;n++){if(""+g[n]===B){h=!0;break}}else h=""+g===B;e=p({selected:void 0,children:void 0},e,{selected:h,children:D})}}if(h=e)Fa[b]&&(null!=h.children||null!=h.dangerouslySetInnerHTML?r("137",b,""):void 0),null!=h.dangerouslySetInnerHTML&&(null!=h.children?r("60"):void 0,"object"===typeof h.dangerouslySetInnerHTML&&"__html"in h.dangerouslySetInnerHTML?void 0:r("61")),null!=h.style&&"object"!==typeof h.style?r("62",""):void 0;h=e;g=this.makeStaticMarkup;
D=1===this.stack.length;B="<"+a.type;for(y in h)if(Pa.call(h,y)){var l=h[y];if(null!=l){if("style"===y){n=void 0;var k="",t="";for(n in l)if(l.hasOwnProperty(n)){var m=0===n.indexOf("--"),u=l[n];if(null!=u){var w=n;if(Na.hasOwnProperty(w))w=Na[w];else{var R=w.replace(Ha,"-$1").toLowerCase().replace(Ia,"-ms-");w=Na[w]=R}k+=t+w+":";t=n;m=null==u||"boolean"===typeof u||""===u?"":m||"number"!==typeof u||0===u||Y.hasOwnProperty(t)&&Y[t]?(""+u).trim():u+"px";k+=m;t=";"}}l=k||null}n=null;b:if(m=b,u=h,-1===
m.indexOf("-"))m="string"===typeof u.is;else switch(m){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":m=!1;break b;default:m=!0}if(m)Qa.hasOwnProperty(y)||(n=y,n=ra(n)&&null!=l?n+"="+('"'+M(l)+'"'):"");else{m=y;n=l;l=J.hasOwnProperty(m)?J[m]:null;if(u="style"!==m)u=null!==l?0===l.type:!(2<m.length)||"o"!==m[0]&&"O"!==m[0]||"n"!==m[1]&&"N"!==m[1]?!1:!0;u||ta(m,n,l,!1)?n="":null!==
l?(m=l.attributeName,l=l.type,n=3===l||4===l&&!0===n?m+'=""':m+"="+('"'+M(n)+'"')):n=ra(m)?m+"="+('"'+M(n)+'"'):""}n&&(B+=" "+n)}}g||D&&(B+=' data-reactroot=""');var y=B;h="";Ea.hasOwnProperty(b)?y+="/>":(y+=">",h="</"+a.type+">");a:{g=e.dangerouslySetInnerHTML;if(null!=g){if(null!=g.__html){g=g.__html;break a}}else if(g=e.children,"string"===typeof g||"number"===typeof g){g=M(g);break a}g=null}null!=g?(e=[],Ka[b]&&"\n"===g.charAt(0)&&(y+="\n"),y+=g):e=Z(e.children);a=a.type;c=null==c||"http://www.w3.org/1999/xhtml"===
c?Da(a):"http://www.w3.org/2000/svg"===c&&"foreignObject"===a?"http://www.w3.org/1999/xhtml":c;this.stack.push({domNamespace:c,type:b,children:e,childIndex:0,context:d,footer:h});this.previousWasTextNode=!1;return y};return a}();
function Ua(a,b){if("function"!==typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}});b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}
var Va=function(a){function b(d,c){if(!(this instanceof b))throw new TypeError("Cannot call a class as a function");var f=a.call(this,{});if(!this)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");f=!f||"object"!==typeof f&&"function"!==typeof f?this:f;f.partialRenderer=new Ta(d,c);return f}Ua(b,a);b.prototype._destroy=function(a,b){this.partialRenderer.destroy();b(a)};b.prototype._read=function(a){try{this.push(this.partialRenderer.read(a))}catch(c){this.destroy(c)}};
return b}(aa.Readable),Wa={renderToString:function(a){a=new Ta(a,!1);try{return a.read(Infinity)}finally{a.destroy()}},renderToStaticMarkup:function(a){a=new Ta(a,!0);try{return a.read(Infinity)}finally{a.destroy()}},renderToNodeStream:function(a){return new Va(a,!1)},renderToStaticNodeStream:function(a){return new Va(a,!0)},version:"16.8.6"},Xa={default:Wa},Ya=Xa&&Wa||Xa;module.exports=Ya.default||Ya;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__22__;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = __webpack_require__(26);
var path = __webpack_require__(27);
var url = __webpack_require__(28);

function buildManifest(compiler, compilation) {
  var context = compiler.options.context;
  var manifest = {};

  compilation.chunks.forEach(function (chunk) {
    chunk.files.forEach(function (file) {
      chunk.forEachModule(function (module) {
        var id = module.id;
        var name = typeof module.libIdent === 'function' ? module.libIdent({ context: context }) : null;
        var publicPath = url.resolve(compilation.outputOptions.publicPath || '', file);

        var currentModule = module;
        if (module.constructor.name === 'ConcatenatedModule') {
          currentModule = module.rootModule;
        }
        if (!manifest[currentModule.rawRequest]) {
          manifest[currentModule.rawRequest] = [];
        }

        manifest[currentModule.rawRequest].push({ id: id, name: name, file: file, publicPath: publicPath });
      });
    });
  });

  return manifest;
}

class ReactLoadablePlugin {
  constructor(opts = {}) {
    this.filename = opts.filename;
  }

  apply(compiler) {
    const emit = (compilation, callback) => {
      const manifest = buildManifest(compiler, compilation);
      var json = JSON.stringify(manifest, null, 2);
      const outputDirectory = path.dirname(this.filename);
      try {
        fs.mkdirSync(outputDirectory);
      } catch (err) {
        if (err.code !== 'EEXIST') {
          throw err;
        }
      }
      fs.writeFileSync(this.filename, json);
      callback();
    };
    if (compiler.hooks) {
      const plugin = { name: 'ReactLoadablePlugin' };
      compiler.hooks.emit.tapAsync(plugin, emit);
    } else {
      compiler.plugin('emit', emit);
    }
  }
}


function getBundles(manifest, moduleIds) {
  return moduleIds.reduce(function (bundles, moduleId) {
    return bundles.concat(manifest[moduleId]);
  }, []);
}

exports.ReactLoadablePlugin = ReactLoadablePlugin;
exports.getBundles = getBundles;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__29__;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__30__;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__31__;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__32__;

/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.allowedGroups = void 0;
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

var allowedGroups = function allowedGroups(project) {
  return ALLOWED_GROUPS[project]
  /* global ALLOWED_GROUPS */
  ;
};

exports.allowedGroups = allowedGroups;
var _default = pickProject;
exports.default = _default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=zengenti-appserver-package.js.map