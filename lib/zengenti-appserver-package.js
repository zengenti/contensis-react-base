(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react-loadable"), require("isomorphic-fetch"), require("express"), require("evil-dns"), require("http-proxy"), require("react"), require("react-router-dom"), require("react-redux"), require("react-dom/server"), require("react-loadable/webpack"), require("styled-components"), require("react-helmet"), require("serialize-javascript"), require("minify-css-string"), require("contensis-delivery-api"), require("regenerator-runtime"), require("immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["react-loadable", "isomorphic-fetch", "express", "evil-dns", "http-proxy", "react", "react-router-dom", "react-redux", "react-dom/server", "react-loadable/webpack", "styled-components", "react-helmet", "serialize-javascript", "minify-css-string", "contensis-delivery-api", "regenerator-runtime", "immutable"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react-loadable"), require("isomorphic-fetch"), require("express"), require("evil-dns"), require("http-proxy"), require("react"), require("react-router-dom"), require("react-redux"), require("react-dom/server"), require("react-loadable/webpack"), require("styled-components"), require("react-helmet"), require("serialize-javascript"), require("minify-css-string"), require("contensis-delivery-api"), require("regenerator-runtime"), require("immutable")) : factory(root["react-loadable"], root["isomorphic-fetch"], root["express"], root["evil-dns"], root["http-proxy"], root["react"], root["react-router-dom"], root["react-redux"], root["react-dom/server"], root["react-loadable/webpack"], root["styled-components"], root["react-helmet"], root["serialize-javascript"], root["minify-css-string"], root["contensis-delivery-api"], root["regenerator-runtime"], root["immutable"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__13__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__23__, __WEBPACK_EXTERNAL_MODULE__24__, __WEBPACK_EXTERNAL_MODULE__25__, __WEBPACK_EXTERNAL_MODULE__26__, __WEBPACK_EXTERNAL_MODULE__27__, __WEBPACK_EXTERNAL_MODULE__28__, __WEBPACK_EXTERNAL_MODULE__29__, __WEBPACK_EXTERNAL_MODULE__30__, __WEBPACK_EXTERNAL_MODULE__31__, __WEBPACK_EXTERNAL_MODULE__36__, __WEBPACK_EXTERNAL_MODULE__39__, __WEBPACK_EXTERNAL_MODULE__46__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(19);

var iterableToArray = __webpack_require__(20);

var nonIterableSpread = __webpack_require__(21);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 5 */
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
/* 6 */
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

var _regenerator = _interopRequireDefault(__webpack_require__(38));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(40));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

var _createClass2 = _interopRequireDefault(__webpack_require__(5));

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LIB = __webpack_require__(8).default;

exports.app = LIB.app;
exports.start = LIB.start;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(9);

var _express = _interopRequireDefault(__webpack_require__(10));

var _reactLoadable = _interopRequireDefault(__webpack_require__(1));

var _displayStartupConfiguration = _interopRequireDefault(__webpack_require__(11));

var _localDns = _interopRequireDefault(__webpack_require__(12));

var _reverseProxies = _interopRequireDefault(__webpack_require__(15));

var _webApp = _interopRequireDefault(__webpack_require__(17));

// import ServerFeatures from './features/configure';
var app = (0, _express.default)();

var start = function start(ReactApp, ServerFeatures, config, globals) {
  app.disable('x-powered-by');
  var servers = globals.servers,
      projects = globals.projects,
      reverseProxyPaths = globals.reverseProxyPaths; // Output some information about the used build/startup configuration

  (0, _displayStartupConfiguration.default)(servers, projects, reverseProxyPaths); // Configure DNS to make life easier

  (0, _localDns.default)(); // Set-up local proxy for images from cms, to save doing rewrites and extra code

  (0, _reverseProxies.default)(app, reverseProxyPaths);
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
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

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
exports.default = void 0;

var DisplayStartupConfiguration = function DisplayStartupConfiguration(servers, projects, reverseProxyPaths) {
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _evilDns = _interopRequireDefault(__webpack_require__(13));

var _fetchMyIp = _interopRequireDefault(__webpack_require__(14));

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
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpProxy = _interopRequireDefault(__webpack_require__(16));

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
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__16__;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(18);

var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(2));

var _fs = _interopRequireDefault(__webpack_require__(22));

var _react = _interopRequireDefault(__webpack_require__(23));

var _reactRouterDom = __webpack_require__(24);

var _reactRedux = __webpack_require__(25);

var _reactLoadable = _interopRequireDefault(__webpack_require__(1));

var _server = __webpack_require__(26);

var _webpack = __webpack_require__(27);

var _styledComponents = __webpack_require__(28);

var _reactHelmet = _interopRequireDefault(__webpack_require__(29));

var _serializeJavascript = _interopRequireDefault(__webpack_require__(30));

var _minifyCssString = _interopRequireDefault(__webpack_require__(31));

var _types = __webpack_require__(32);

var _pickProject = _interopRequireWildcard(__webpack_require__(33));

var _ContensisDeliveryApi = __webpack_require__(34);

var _routing = __webpack_require__(37);

var _version = __webpack_require__(42);

var _navigation = __webpack_require__(44);

var _routing2 = __webpack_require__(45);

// import { history } from '~/core/redux/history';
var addStandardHeaders = function addStandardHeaders(state, response, packagejson) {
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
      addVarnishAuthenticationHeaders(state, response);
    } catch (e) {
      console.log('Error Adding headers');
      console.log(e);
    }
  }

  response.setHeader('Surrogate-Control', 'max-age=3600');
};

var addVarnishAuthenticationHeaders = function addVarnishAuthenticationHeaders(state, response) {
  if (state) {
    try {
      var stateEntry = (0, _routing2.selectRouteEntry)(state);
      var project = (0, _routing2.selectCurrentProject)(state);

      if (stateEntry && stateEntry.getIn(['authentication', 'isLoginRequired'])) {
        response.header('x-contensis-viewer-groups', (0, _pickProject.allowedGroups)(project).join('|'));
      }
    } catch (e) {
      console.log('Error adding authentication header');
      console.log(e);
    }
  }
};

var webApp = function webApp(app, ReactApp, config) {
  var store = config.store,
      rootSaga = config.rootSaga,
      packagejson = config.packagejson,
      versionData = config.versionData,
      dynamicPaths = config.dynamicPaths;
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
    var status = 200; // dispatch any global and non-saga related actions before calling our JSX

    var versionStatusFromHostname = (0, _ContensisDeliveryApi.GetDeliveryApiStatusFromHostname)(request.hostname);
    store.dispatch((0, _version.setVersionStatus)(versionStatusFromHostname));
    store.dispatch((0, _version.setVersion)(versionInfo.commitRef, versionInfo.buildNo));
    var project = (0, _pickProject.default)(request.hostname, request.query);
    var groups = (0, _pickProject.allowedGroups)(project);
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
    }, _react.default.createElement(ReactApp, null))));
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
      store.runSaga(rootSaga).toPromise().then(function () {
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
            addStandardHeaders(reduxState, response, packagejson);
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
          addStandardHeaders(reduxState, response, packagejson);
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

        addStandardHeaders(reduxState, response, packagejson);
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
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("fs");

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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__25__;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__26__;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__27__;

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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__30__;

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
exports.AccessMethods = void 0;
var AccessMethods = {
  DYNAMIC: 'dynamic',
  STATIC: 'static',
  FRAGMENT: 'fragment',
  REDUX: 'redux'
};
exports.AccessMethods = AccessMethods;

/***/ }),
/* 33 */
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

/***/ }),
/* 34 */
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

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(4));

var _createClass2 = _interopRequireDefault(__webpack_require__(5));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(2));

var _typeof2 = _interopRequireDefault(__webpack_require__(35));

var _contensisDeliveryApi = __webpack_require__(36);

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
/* 35 */
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
exports.setCurrentProject = exports.setRouteEntryRelatedArticles = exports.setRouteEntry = exports.setNavigationPath = exports.setNotFound = void 0;

var _helpers = __webpack_require__(6);

var _routing = __webpack_require__(41);

var setNotFound = function setNotFound(notFound) {
  return (0, _helpers.action)(_routing.SET_NAVIGATION_NOT_FOUND, {
    notFound: notFound
  });
};

exports.setNotFound = setNotFound;

var setNavigationPath = function setNavigationPath(path) {
  return (0, _helpers.action)(_routing.SET_NAVIGATION_PATH, {
    path: path
  });
};

exports.setNavigationPath = setNavigationPath;

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(39);


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__39__;

/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_TARGET_PROJECT = exports.SET_ROUTE_LOADING = exports.SET_NAVIGATION_PATH = exports.SET_NAVIGATION_NOT_FOUND = exports.SET_ENTRY_RELATED_ARTICLES = exports.SET_ENTRY_ID = exports.SET_ANCESTORS = exports.SET_NODE = exports.SET_ENTRY = exports.GET_ENTRY = void 0;
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

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setVersionStatus = exports.setVersion = void 0;

var _helpers = __webpack_require__(6);

var _version = __webpack_require__(43);

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
/* 43 */
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
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRouteEntryRelatedArticles = exports.selectRouteLoading = exports.selectCurrentAncestors = exports.selectIsNotFound = exports.selectCurrentProject = exports.selectCurrentPath = exports.selectRouteEntryID = exports.selectRouteEntrySlug = exports.selectRouteEntryContentTypeId = exports.selectRouteEntryEntryId = exports.selectRouteEntryDepends = exports.selectRouteEntry = void 0;

var _immutable = __webpack_require__(46);

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
/* 46 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__46__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=zengenti-appserver-package.js.map