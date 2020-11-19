import React from 'react';
import require$$9 from 'react-router-dom';
import require$$4 from 'react-redux';
import require$$0 from 'immutable';
import require$$2 from 'contensis-delivery-api';
import queryString from 'query-string';
import log from 'loglevel';
import mapJson from 'jsonpath-mapper';
import require$$12 from 'js-cookie';
import require$$11 from 'react-router-config';
import require$$10 from 'react-hot-loader';
import PropTypes from 'prop-types';
import require$$8 from '@redux-saga/core/effects';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var zengentiSearchPackage = createCommonjsModule(function (module, exports) {
(function webpackUniversalModuleDefinition(root, factory) {
	var a, i; module.exports = factory(require$$0, PropTypes, require$$2, React, require$$4, queryString, mapJson, log, require$$8, require$$9, require$$10, require$$11, require$$12);
})(commonjsGlobal, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__14__, __WEBPACK_EXTERNAL_MODULE__17__, __WEBPACK_EXTERNAL_MODULE__20__, __WEBPACK_EXTERNAL_MODULE__24__, __WEBPACK_EXTERNAL_MODULE__25__, __WEBPACK_EXTERNAL_MODULE__26__, __WEBPACK_EXTERNAL_MODULE__28__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchContext", function() { return getSearchContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrent", function() { return getCurrent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentFacet", function() { return getCurrentFacet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentListing", function() { return getCurrentListing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentTab", function() { return getCurrentTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFacets", function() { return getFacets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTabFacets", function() { return getTabFacets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFacetTitles", function() { return getFacetTitles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFacet", function() { return getFacet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListing", function() { return getListing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFilters", function() { return getFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRenderableFilters", function() { return getRenderableFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFiltersToLoad", function() { return getFiltersToLoad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedFilters", function() { return getSelectedFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResults", function() { return getResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIsInternalPaging", function() { return getIsInternalPaging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIsLoaded", function() { return getIsLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIsLoading", function() { return getIsLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIsSsr", function() { return getIsSsr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFeaturedResults", function() { return getFeaturedResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPaging", function() { return getPaging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageIndex", function() { return getPageIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPrevPageIndex", function() { return getPrevPageIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageIsLoading", function() { return getPageIsLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPagesLoaded", function() { return getPagesLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTotalCount", function() { return getTotalCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFacetAuthentication", function() { return getFacetAuthentication; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFeaturedEntryIds", function() { return getFeaturedEntryIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchTerm", function() { return getSearchTerm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchTabs", function() { return getSearchTabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryParams", function() { return getQueryParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryParameter", function() { return getQueryParameter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCustomApi", function() { return getCustomApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCustomEnv", function() { return getCustomEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTabsAndFacets", function() { return getTabsAndFacets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchTotalCount", function() { return getSearchTotalCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFacetsTotalCount", function() { return getFacetsTotalCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectFacets", function() { return selectFacets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectListing", function() { return selectListing; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


const getSearchContext = state => state.getIn(['search', 'context'], _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets);
const getCurrent = (state, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => context == _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets ? getCurrentFacet(state) : getCurrentListing(state);
const getCurrentFacet = state => state.getIn(['search', 'currentFacet']);
const getCurrentListing = state => state.getIn(['search', 'currentListing']);
const getCurrentTab = state => state.getIn(['search', _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets, getCurrentFacet(state), 'tabId'], 0);
const getFacets = state => state.getIn(['search', _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets]);
const getTabFacets = state => getFacets(state).filter((v, key) => getFacets(state).getIn([key, 'tabId'], 0) === getCurrentTab(state));
const getFacetTitles = state => getFacets(state).map((facet, key) => ({
  key,
  title: facet.get('title'),
  totalCount: facet.getIn(['pagingInfo', 'totalCount'])
})).toIndexedSeq().toArray();
const getFacet = (state, facetName, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  const currentFacet = facetName || getCurrentFacet(state);
  return state.getIn(['search', context, currentFacet], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])());
};
const getListing = (state, listing) => {
  const currentListing = listing || getCurrentListing(state);
  return state.getIn(['search', _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings, currentListing], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])());
};
const getFilters = (state, facet, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, facet || getCurrent(state, context), 'filters'], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])());
};
const getRenderableFilters = (state, facet, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => getFilters(state, facet, context).filter(f => f.get('renderable', true));
const getFiltersToLoad = (state, facet, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  const filters = getFilters(state, facet, context);
  const loadedFilters = filters.map(f => f.get('items', Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])()).filter(i => {
    const title = i.get('title');
    return title !== null && title;
  }).size > 0 && f.get('isError', false) === false);
  return loadedFilters.map((isLoaded, filterKey) => !isLoaded ? filterKey : null).toList().filter(f => f);
}; // We lowercase the filter key unless it's an ISO date string where the T must be uppercase

const getSelectedFilters = (state, facet, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  const filters = getFilters(state, facet, context);
  const isoDateRegex = RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d/);
  const selectedFilters = filters.map(value => value.get('items', Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])()).filter(item => item.get('isSelected', false)).map(item => {
    const key = item.get('key', '');
    const isIsoDate = isoDateRegex.test(key);
    return isIsoDate ? key : key.toLowerCase();
  }));
  return selectedFilters;
};
const getResults = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'results'], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])());
};
const getIsInternalPaging = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'queryParams', 'internalPaging'], false);
};
const getIsLoaded = (state, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return !!state.getIn(['search', context, getCurrent(state, context), 'queryDuration'], 0);
};
const getIsLoading = (state, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets, facet) => {
  return state.getIn(['search', context, facet || getCurrent(state, context), 'entries', 'isLoading']);
};
const getIsSsr = state => {
  return state.getIn(['search', 'config', 'ssr'], false);
};
const getFeaturedResults = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'featuredResults'], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])());
};
const getPaging = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo'], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])());
};
const getPageIndex = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo', 'pageIndex']);
};
const getPrevPageIndex = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo', 'prevPageIndex']);
};
const getPageIsLoading = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo', 'isLoading']);
};
const getPagesLoaded = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo', 'pagesLoaded'], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])());
};
const getTotalCount = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'pagingInfo', 'totalCount']);
};
const getFacetAuthentication = (state, facet) => state.getIn(['search', _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets, facet, 'authentication']);
const getFeaturedEntryIds = state => {
  const currentFacet = getCurrentFacet(state);
  const entryIds = state.getIn(['search', _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets, currentFacet, 'featuredEntries', 'items']).map(entry => entry.getIn(['sys', 'id']));
  return entryIds;
};
const getSearchTerm = state => state.getIn(['search', 'term']);
const getSearchTabs = state => state.getIn(['search', 'tabs']);
const getQueryParams = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'queryParams'], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])());
};
const getQueryParameter = ({
  state,
  facet,
  context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets
}, key, ifnull = null) => {
  return getQueryParams(state, facet, context).get(key, ifnull);
};
const getCustomApi = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'customApi']);
};
const getCustomEnv = (state, current, context = _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets) => {
  return state.getIn(['search', context, current || getCurrent(state, context), 'env']);
};
const getTabsAndFacets = state => {
  const tabs = getSearchTabs(state);
  const facets = getFacets(state);
  return tabs.map(tab => {
    let countFields = tab.get('totalCount');
    if (typeof countFields === 'string') countFields = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])([Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])([countFields])]);
    const thisTabFacets = facets.filter((v, key) => facets.getIn([key, 'tabId'], 0) === tab.get('id'));
    const thisTabTotal = thisTabFacets.map((facet, facetName) => {
      if (!countFields || countFields.find(f => f.first() === facetName)) return facet.getIn(['pagingInfo', 'totalCount']);
      return 0;
    }).reduce((a, b) => a + b, 0);
    return tab.set(_schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets, thisTabFacets).set('totalCount', thisTabTotal);
  });
};
const getSearchTotalCount = state => {
  const tabsAndFacets = getTabsAndFacets(state);
  const wholeSearchTotal = tabsAndFacets.map(t => t.get('totalCount')).reduce((a, b) => a + b, 0);
  return wholeSearchTotal;
};
const getFacetsTotalCount = state => {
  const facets = getFacets(state);
  const wholeSearchTotal = facets.map(t => t.getIn(['pagingInfo', 'totalCount'])).reduce((a, b) => a + b, 0);
  return wholeSearchTotal;
}; // An exported copy of the relevant selectors scoped by default to a facets context

const selectFacets = {
  getCurrent: getCurrentFacet,
  getCurrentTab: getCurrentTab,
  getCustomApi,
  getCustomEnv,
  getFacet,
  getFacetTitles,
  getFacets,
  getFacetsTotalCount,
  getFeaturedResults,
  getFilters,
  getFiltersToLoad,
  getIsLoaded,
  getIsLoading,
  getPageIndex,
  getPageIsLoading,
  getPagesLoaded,
  getPaging,
  getQueryParams: (state, facet) => getQueryParams(state, facet, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets),
  getQueryParameter: ({
    state,
    facet
  }, key, ifnull) => getQueryParameter({
    state,
    facet,
    context: _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets
  }, key, ifnull),
  getRenderableFilters,
  getResults,
  getTabFacets,
  getTabsAndFacets,
  getTotalCount,
  getSearchTabs,
  getSearchTerm,
  getSearchTotalCount,
  getSelectedFilters
}; // An exported copy of the relevant selectors pre-scoped to a listing context

const selectListing = {
  getCurrent: getCurrentListing,
  getFeaturedResults: (state, listing) => getFeaturedResults(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getFilters: (state, listing) => getFilters(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getFiltersToLoad: (state, listing) => getFiltersToLoad(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getListing,
  getIsLoaded: state => getIsLoaded(state, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getIsLoading: state => getIsLoading(state, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getPageIndex: (state, listing) => getPageIndex(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getPaging: (state, listing) => getPaging(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getPageIsLoading: (state, listing) => getPageIsLoading(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getPagesLoaded: (state, listing) => getPagesLoaded(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getQueryParams: (state, listing) => getQueryParams(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getQueryParameter: ({
    state,
    facet
  }, key, ifnull) => getQueryParameter({
    state,
    facet,
    context: _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings
  }, key, ifnull),
  getRenderableFilters: (state, listing) => getRenderableFilters(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getResults: (state, listing) => getResults(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getSearchTerm,
  getTotalCount: (state, listing) => getTotalCount(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings),
  getSelectedFilters: (state, listing) => getSelectedFilters(state, listing, _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings)
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Context", function() { return Context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entries", function() { return entries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pagingInfo", function() { return pagingInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchFacet", function() { return searchFacet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filtering", function() { return filtering; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterItem", function() { return filterItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

const Context = {
  facets: 'facets',
  listings: 'listings',
  minilist: 'minilist'
};
const entries = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])({
  isLoading: false,
  isError: false,
  items: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])()
});
const pagingInfo = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])({
  isLoading: false,
  pageCount: 0,
  pageIndex: 0,
  pageSize: 0,
  pagesLoaded: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])(),
  prevPageIndex: 0,
  totalCount: 0
});
const searchFacet = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedMap"])({
  title: null,
  featuredEntries: entries,
  featuredResults: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])(),
  entries,
  results: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])(),
  queryParams: null,
  filters: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])(),
  queryDuration: 0,
  pagingInfo
});
const filtering = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])({
  isLoading: false,
  isError: false,
  isGrouped: false,
  title: null,
  contentTypeId: null,
  customWhere: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])(),
  fieldId: null,
  items: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])()
});
const filterItem = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])({
  key: null,
  type: null,
  title: null,
  path: null,
  isSelected: false
});
const initialState = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedMap"])({
  currentFacet: null,
  term: '',
  facets: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedMap"])(),
  tabs: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])(),
  config: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])({
    isLoaded: false,
    isError: false
  })
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_FILTERS", function() { return CLEAR_FILTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DO_SEARCH", function() { return DO_SEARCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXECUTE_FEATURED_SEARCH", function() { return EXECUTE_FEATURED_SEARCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXECUTE_SEARCH", function() { return EXECUTE_SEARCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXECUTE_SEARCH_DENIED", function() { return EXECUTE_SEARCH_DENIED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXECUTE_SEARCH_ERROR", function() { return EXECUTE_SEARCH_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXECUTE_SEARCH_PRELOAD", function() { return EXECUTE_SEARCH_PRELOAD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOAD_FILTERS", function() { return LOAD_FILTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOAD_FILTERS_COMPLETE", function() { return LOAD_FILTERS_COMPLETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOAD_FILTERS_ERROR", function() { return LOAD_FILTERS_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_FEATURED_ENTRIES", function() { return SET_FEATURED_ENTRIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ROUTE_FILTERS", function() { return SET_ROUTE_FILTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SEARCH_ENTRIES", function() { return SET_SEARCH_ENTRIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_SELECTED_FILTER", function() { return SET_SELECTED_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_CURRENT_FACET", function() { return UPDATE_CURRENT_FACET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_CURRENT_TAB", function() { return UPDATE_CURRENT_TAB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_SORT_ORDER", function() { return UPDATE_SORT_ORDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_PAGE_INDEX", function() { return UPDATE_PAGE_INDEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_SEARCH_TERM", function() { return UPDATE_SEARCH_TERM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_SELECTED_FILTERS", function() { return UPDATE_SELECTED_FILTERS; });
const ACTION_PREFIX = '@SEARCH/';
const CLEAR_FILTERS = `${ACTION_PREFIX}CLEAR_FILTERS`;
const DO_SEARCH = `${ACTION_PREFIX}DO_SEARCH`;
const EXECUTE_FEATURED_SEARCH = `${ACTION_PREFIX}EXECUTE_FEATURED_SEARCH`;
const EXECUTE_SEARCH = `${ACTION_PREFIX}EXECUTE_SEARCH`;
const EXECUTE_SEARCH_DENIED = `${ACTION_PREFIX}EXECUTE_SEARCH_DENIED`;
const EXECUTE_SEARCH_ERROR = `${ACTION_PREFIX}EXECUTE_SEARCH_ERROR`;
const EXECUTE_SEARCH_PRELOAD = `${ACTION_PREFIX}EXECUTE_SEARCH_PRELOAD`;
const LOAD_FILTERS = `${ACTION_PREFIX}LOAD_FILTERS`;
const LOAD_FILTERS_COMPLETE = `${ACTION_PREFIX}LOAD_FILTERS_COMPLETE`;
const LOAD_FILTERS_ERROR = `${ACTION_PREFIX}LOAD_FILTERS_ERROR`;
const SET_FEATURED_ENTRIES = `${ACTION_PREFIX}SET_FEATURED_ENTRIES`;
const SET_ROUTE_FILTERS = `${ACTION_PREFIX}SET_ROUTE_FILTERS`;
const SET_SEARCH_ENTRIES = `${ACTION_PREFIX}SET_SEARCH_ENTRIES`;
const SET_SELECTED_FILTER = `${ACTION_PREFIX}SET_SELECTED_FILTER`;
const UPDATE_CURRENT_FACET = `${ACTION_PREFIX}UPDATE_CURRENT_FACET`;
const UPDATE_CURRENT_TAB = `${ACTION_PREFIX}UPDATE_CURRENT_TAB`;
const UPDATE_SORT_ORDER = `${ACTION_PREFIX}UPDATE_SORT_ORDER`;
const UPDATE_PAGE_INDEX = `${ACTION_PREFIX}UPDATE_PAGE_INDEX`;
const UPDATE_SEARCH_TERM = `${ACTION_PREFIX}UPDATE_SEARCH_TERM`;
const UPDATE_SELECTED_FILTERS = `${ACTION_PREFIX}UPDATE_SELECTED_FILTERS`;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withMappers", function() { return withMappers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withMappers2", function() { return withMappers2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerSearch", function() { return triggerSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initListing", function() { return initListing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigate", function() { return navigate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearFilters", function() { return clearFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePageIndex", function() { return updatePageIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCurrentFacet", function() { return updateCurrentFacet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCurrentTab", function() { return updateCurrentTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSearchTerm", function() { return updateSearchTerm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectedFilters", function() { return updateSelectedFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSortOrder", function() { return updateSortOrder; });
/* harmony import */ var _zengenti_contensis_react_base_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


const withMappers = (action, mappers) => {
  return { ...action,
    mappers
  };
};
const withMappers2 = (actionFunc, args, mappers) => {
  return () => ({ ...actionFunc(args),
    mappers
  });
};
const triggerSearch = ({
  context,
  facet,
  mapper,
  params,
  excludeIds,
  debug
}) => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["DO_SEARCH"],
    context,
    facet,
    mapper,
    params,
    excludeIds,
    debug
  };
};
const initListing = ({
  context,
  facet,
  mapper,
  params
}) => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["SET_ROUTE_FILTERS"],
    context,
    facet,
    mapper,
    params
  };
};
const navigate = _zengenti_contensis_react_base_routing__WEBPACK_IMPORTED_MODULE_0__["actions"].setRoute;
const clearFilters = () => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["CLEAR_FILTERS"]
  };
};
const updatePageIndex = pageIndex => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_PAGE_INDEX"],
    pageIndex
  };
};
const updateCurrentFacet = facet => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_CURRENT_FACET"],
    facet
  };
};
const updateCurrentTab = id => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_CURRENT_TAB"],
    id
  };
};
const updateSearchTerm = term => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_SEARCH_TERM"],
    term
  };
};
const updateSelectedFilters = (filter, key) => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_SELECTED_FILTERS"],
    filter,
    key
  };
};
const updateSortOrder = (orderBy, facet) => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__["UPDATE_SORT_ORDER"],
    orderBy,
    facet
  };
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
/* harmony import */ var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony reexport (checked) */ if(__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "all")) __webpack_require__.d(__webpack_exports__, "all", function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["all"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "call")) __webpack_require__.d(__webpack_exports__, "call", function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["call"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "put")) __webpack_require__.d(__webpack_exports__, "put", function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["put"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "select")) __webpack_require__.d(__webpack_exports__, "select", function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["select"]; });

/* harmony reexport (checked) */ if(__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "takeEvery")) __webpack_require__.d(__webpack_exports__, "takeEvery", function() { return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"]; });




/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
/* unused harmony export CardTypes */
/* unused harmony export CleanseTitles */
/* unused harmony export ContentTypes */
/* unused harmony export WebpageFormats */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataFormats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FilterExpressionTypes; });
/* unused harmony export CourseTypes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Fields; });
const DataFormats = {
  entry: 'entry',
  webpage: 'webpage'
};
const FilterExpressionTypes = {
  contentType: 'contentType',
  field: 'field'
};
const sys = {
  contentTypeId: 'sys.contentTypeId',
  dataFormat: 'sys.dataFormat',
  filename: 'sys.properties.filename',
  id: 'sys.id',
  includeInSearch: 'sys.metadata.includeInSearch',
  uri: 'sys.uri',
  versionStatus: 'sys.versionStatus'
};
const Fields = {
  clusters: 'clusters.sys.id',
  courseModeDetails: 'courseModeDetails.sys.id',
  entryTitle: 'entryTitle',
  entryYear: 'entryYear.sys.id',
  entryYears: 'entryYears.sys.id',
  keywords: 'keywords',
  locations: 'locations.sys.id',
  modeOfStudy: 'modeOfStudy.sys.id',
  publishedDate: 'publishedDate',
  sys,
  contentTypeId: 'sys.contentTypeId',
  wildcard: '*'
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

// CONCATENATED MODULE: ./src/app/core/util/performance.js
const now = () => {
  if (typeof window == 'undefined') {
    return Date.now();
  }

  return window.performance.now();
};
// EXTERNAL MODULE: ./src/app/core/util/ContensisDeliveryApi.js
var ContensisDeliveryApi = __webpack_require__(15);

// EXTERNAL MODULE: external "query-string"
var external_query_string_ = __webpack_require__(12);
var external_query_string_default = /*#__PURE__*/__webpack_require__.n(external_query_string_);
const buildUrl = (route, params) => {
  const qs = external_query_string_default.a.stringify(params);
  const path = qs ? `${route}?${qs}` : route;
  return path;
};
const clientHostname = () => `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const addHostname = typeof window == 'undefined' || window.location.host == 'localhost:3000' ? `https://${PUBLIC_URI
/* global PUBLIC_URI */
}` : clientHostname();
// CONCATENATED MODULE: ./src/app/core/search/util.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fixFreeTextForElastic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return timedSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getItemsFromResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return extractQuotedPhrases; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return callCustomApi; });



function fixFreeTextForElastic(s) {
  let illegalChars = ['>', '<'];
  let encodedChars = ['+', '-', '=', '&', '|', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '\\', '/'];
  let illegalRegEx = new RegExp(illegalChars.map(c => '\\' + c).join('|'), 'g');
  let encodedRegEx = new RegExp(encodedChars.map(c => '\\' + c).join('|'), 'g');
  s = s.replace(illegalRegEx, '');
  s = s.replace(encodedRegEx, ''); // (m) => '\\\\' + m);

  return s;
}
const timedSearch = async (query, linkDepth, projectId, env) => {
  if (!query) return null;
  let duration = 0;
  const start = now();
  const payload = await ContensisDeliveryApi["cachedSearch"].search(query, linkDepth, projectId, env);
  const end = now();
  duration = end - start;
  return {
    duration,
    payload
  };
};
const getItemsFromResult = result => result && result.payload && Array.isArray(result.payload.items) && result.payload.items || [];
const extractQuotedPhrases = searchTerm => {
  const pattern = new RegExp(/(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/gm);
  return (searchTerm.match(pattern) || []).map(match => match.replace(/"/g, ''));
};
const callCustomApi = async (customApi, filters) => {
  let uri = buildUrl(customApi.get('uri'), filters);
  if (!uri) return null;
  if (typeof window == 'undefined' && uri.startsWith('/')) uri = `http://localhost:3001${uri}`;
  const response = await fetch(uri);
  return await response.json();
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
/* unused harmony export action */
/* unused harmony export getWebPImageUri */
/* unused harmony export resizeImage */
/* unused harmony export resizeImageUri */
/* unused harmony export flattenArray */
/* unused harmony export api */
/* unused harmony export dynamicSort */
/* unused harmony export randomString */
/* unused harmony export camelize */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return removeEmptyAttributes; });
/* unused harmony export findWithAttr */
/* unused harmony export shuffle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return toArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return areArraysEqualSets; });
const removeEmptyAttributes = obj => {
  Object.entries(obj).forEach(([key, val]) => val && typeof val === 'object' && removeEmptyAttributes(val) || (typeof val === 'undefined' || val === null || val === '') && delete obj[key]);
  return obj;
}; //Returns index position from array with matching property
const toArray = (obj, seperator = ',') => typeof obj === 'undefined' || obj === null ? obj : Array.isArray(obj) ? obj : obj.split(seperator); // assumes array elements are primitive types

const areArraysEqualSets = (a1, a2) => {
  let superSet = {};

  for (let i = 0; i < a1.length; i++) {
    const e = a1[i] + typeof a1[i];
    superSet[e] = 1;
  }

  for (let i = 0; i < a2.length; i++) {
    const e = a2[i] + typeof a2[i];

    if (!superSet[e]) {
      return false;
    }

    superSet[e] = 2;
  }

  for (let e in superSet) {
    if (superSet[e] === 1) {
      return false;
    }
  }

  return true;
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__14__;

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
/* unused harmony export GetClientSideDeliveryApiStatus */
/* unused harmony export GetDeliveryApiStatusFromHostname */
/* unused harmony export fixImageUri */
/* unused harmony export GetResponseGuids */
/* unused harmony export GetAllResponseGuids */
/* unused harmony export deliveryApi */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cachedSearch", function() { return cachedSearch; });
/* harmony import */ var contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


const getClientConfig = (project, env) => {
  let config = DELIVERY_API_CONFIG;
  /* global DELIVERY_API_CONFIG */

  if (project) {
    config.projectId = project;
  }

  if (typeof window != 'undefined' && PROXY_DELIVERY_API
  /* global PROXY_DELIVERY_API */
  ) {
      // ensure a relative url is used to bypass the need for CORS (separate OPTIONS calls)
      config.rootUrl = env || '';
      config.responseHandler = {
        404: () => null
      };
    }

  return config;
};

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

  getTaxonomyNodeByPath(path, project, env) {
    const client = contensis_delivery_api__WEBPACK_IMPORTED_MODULE_0__["Client"].create(getClientConfig(project, env));
    return this.request(`[TAXONOMY NODE] ${path}`, () => client.taxonomy.getNodeByPath({
      path: path,
      order: 'defined',
      childDepth: 2
    }).then(node => this.extendTaxonomyNode(node)));
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "contensis-delivery-api"
var external_contensis_delivery_api_ = __webpack_require__(7);

// EXTERNAL MODULE: ./src/app/core/schema.js
var schema = __webpack_require__(8);

// EXTERNAL MODULE: ./src/app/core/search/util.js + 2 modules
var util = __webpack_require__(9);

// CONCATENATED MODULE: ./src/app/core/search/expressions.js



const fieldExpression = (field, value, operator = 'equalTo', weight = null) => {
  if (!field || !value) return [];
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? [external_contensis_delivery_api_["Op"][operator](field, value)] : [external_contensis_delivery_api_["Op"][operator](field, value).weight(weight)];
};
const contentTypeIdExpression = (contentTypeIds, webpageTemplates) => {
  const expressions = [];
  if (!contentTypeIds && !webpageTemplates) return expressions;

  if (contentTypeIds && contentTypeIds.length > 0) {
    expressions.push(...dataFormatExpression(contentTypeIds, schema["a" /* DataFormats */].entry));
  }

  if (webpageTemplates && webpageTemplates.length > 0) {
    expressions.push(...dataFormatExpression(webpageTemplates, schema["a" /* DataFormats */].webpage));
  }

  if (expressions.length > 1) return [external_contensis_delivery_api_["Op"].or(...expressions)];
  return expressions;
};
const filterExpressions = filters => {
  if (!filters) return [];
  const expressions = [];
  filters.map(param => {
    expressions.push(...fieldExpression(param.key, param.value, param.operator || 'in'));
  });
  return expressions;
};
const dataFormatExpression = (contentTypeIds, dataFormat = schema["a" /* DataFormats */].entry) => {
  if (contentTypeIds && contentTypeIds.length > 0) {
    /**
     * We have an array of contentTypeIds some may be prefixed with a "!"
     * to indicate this is a "not" expression
     */
    const withContentTypeIds = contentTypeIds.filter(c => !c.startsWith('!'));
    const notContentTypeIds = contentTypeIds.filter(c => c.startsWith('!')).map(id => id.substring(1));
    const andExpr = external_contensis_delivery_api_["Op"].and();
    const dataFormatExpr = fieldExpression(schema["b" /* Fields */].sys.dataFormat, dataFormat);
    const withExpr = fieldExpression(schema["b" /* Fields */].sys.contentTypeId, withContentTypeIds);
    const notExpr = [external_contensis_delivery_api_["Op"].not(...fieldExpression(schema["b" /* Fields */].sys.contentTypeId, notContentTypeIds))];
    andExpr.add(...dataFormatExpr);
    if (withContentTypeIds.length > 0) andExpr.add(...withExpr);
    if (notContentTypeIds.length > 0) andExpr.add(...notExpr);
    return [andExpr];
  }

  return [];
};
const featuredResultsExpression = ({
  contentTypeId,
  fieldId,
  fieldValue = true
} = {}) => {
  if (contentTypeId) {
    return fieldExpression(schema["b" /* Fields */].sys.contentTypeId, contentTypeId);
  }

  if (fieldId) {
    return fieldExpression(fieldId, fieldValue);
  }
};
const defaultExpressions = versionStatus => {
  return [external_contensis_delivery_api_["Op"].equalTo(schema["b" /* Fields */].sys.versionStatus, versionStatus), external_contensis_delivery_api_["Op"].or(external_contensis_delivery_api_["Op"].and(external_contensis_delivery_api_["Op"].exists(schema["b" /* Fields */].sys.includeInSearch, true), external_contensis_delivery_api_["Op"].equalTo(schema["b" /* Fields */].sys.includeInSearch, true)), external_contensis_delivery_api_["Op"].exists(schema["b" /* Fields */].sys.includeInSearch, false))];
};
const excludeIdsExpression = excludeIds => Array.isArray(excludeIds) && excludeIds.length > 0 ? [external_contensis_delivery_api_["Op"].not(...fieldExpression(schema["b" /* Fields */].sys.id, excludeIds))] : [];
const orderByExpression = orderBy => {
  let expression = external_contensis_delivery_api_["OrderBy"];

  if (orderBy && orderBy.length > 0) {
    orderBy.map(ob => expression = ob.startsWith('-') ? expression.desc(ob.substring(1)) : expression.asc(ob));
  }

  return expression;
};

const equalToOrIn = (field, arr, operator = 'equalTo') => arr.length === 0 ? [] : arr.length === 1 ? [external_contensis_delivery_api_["Op"][operator](field, arr[0])] : [external_contensis_delivery_api_["Op"].in(field, ...arr)];
/**
 * Accept HTTP style objects and map them to
 * their equivalent JS client "Op" expressions
 * @param {array} where the where array as you'd provide it to the HTTP API
 * @returns {array} array of constructed Delivery API Operators
 */


const customWhereExpressions = where => {
  if (!where || !Array.isArray(where)) return []; // Map each clause inside the where array

  return where.map(clause => {
    let expression; // Map through each property in the clause so we can
    // capture the values required and reconstruct them as
    // a Delivery API expression

    Object.keys(clause).map((key, idx) => {
      const operator = key;
      const field = clause.field;
      const value = clause[key];
      const weight = clause.weight;

      if (['and', 'or'].includes(operator)) {
        // These are array expressions so we can call ourself recursively
        // to map these inner values to expressions
        expression = external_contensis_delivery_api_["Op"][operator](...customWhereExpressions(value));
      }

      if (['not'].includes(operator)) {
        // A 'not' expression is an object with only one inner field and inner operator
        Object.keys(value).map((key, idx) => {
          const innerOperator = key;
          const innerValue = value[key];
          const innerField = value.field; // Map the expression when we've looped and scoped to
          // the second property inside the clause

          if (idx === 1) {
            expression = external_contensis_delivery_api_["Op"][operator](external_contensis_delivery_api_["Op"][innerOperator](innerField, innerValue));
          }
        });
      } // Map the expression when we've looped and scoped to
      // the second property inside the clause


      if (idx === 1) {
        expression = external_contensis_delivery_api_["Op"][operator](field, value, weight);
      }
    });
    return expression;
  });
};
const termExpressions = (searchTerm, weightedSearchFields) => {
  if (searchTerm && weightedSearchFields && weightedSearchFields.length > 0) {
    // Extract any phrases in quotes to array
    const quotedPhrases = Object(util["b" /* extractQuotedPhrases */])(searchTerm); // Modify the search term to remove any quoted phrases to leave any remaining terms

    let modifiedSearchTerm = searchTerm;
    quotedPhrases.forEach(qp => modifiedSearchTerm = modifiedSearchTerm.replace(qp, '').replace('""', '').trim()); // Push to the operators array to include in the query

    const operators = []; // Helper functions to generate Op expressions

    const containsOp = (f, term) => fieldExpression(f.fieldId, Object(util["c" /* fixFreeTextForElastic */])(term), 'contains', f.weight);

    const freeTextOp = (f, term) => fieldExpression(f.fieldId, Object(util["c" /* fixFreeTextForElastic */])(term), 'freeText', f.weight); // For each weighted search field


    weightedSearchFields.forEach(f => {
      // Push to field operators
      const fieldOperators = []; // Add operator expressions for modified search term

      if (modifiedSearchTerm) {
        if ([schema["b" /* Fields */].keywords, schema["b" /* Fields */].sys.filename, schema["b" /* Fields */].sys.uri].includes(f.fieldId)) {
          fieldOperators.push(...containsOp(f, modifiedSearchTerm));
        } else {
          if ([schema["b" /* Fields */].entryTitle].includes(f.fieldId)) {
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
    return [external_contensis_delivery_api_["Op"].contains(schema["b" /* Fields */].wildcard, searchTerm)];
  } else {
    return [];
  }
};
// CONCATENATED MODULE: ./src/app/zengenti-search-package/redux/queries.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterQuery", function() { return filterQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchQuery", function() { return searchQuery; });



const filterQuery = (contentTypeIds, versionStatus, customWhere) => {
  const query = new external_contensis_delivery_api_["Query"](...[...contentTypeIdExpression(contentTypeIds), ...defaultExpressions(versionStatus), ...customWhereExpressions(customWhere)]);
  query.orderBy = external_contensis_delivery_api_["OrderBy"].asc(schema["b" /* Fields */].entryTitle);
  query.pageSize = 100;
  return query;
};
const searchQuery = ({
  contentTypeIds,
  customWhere,
  dynamicOrderBy,
  excludeIds,
  featuredResults,
  fields,
  filters,
  pageSize,
  pageIndex,
  orderBy,
  searchTerm,
  versionStatus,
  webpageTemplates,
  weightedSearchFields
}, isFeatured) => {
  let expressions = [...termExpressions(searchTerm, weightedSearchFields), ...defaultExpressions(versionStatus), ...customWhereExpressions(customWhere), ...excludeIdsExpression(excludeIds)];
  if (isFeatured) expressions = [...expressions, ...featuredResultsExpression(featuredResults)];
  if (!isFeatured || featuredResults && featuredResults.fieldId) expressions = [...expressions, ...filterExpressions(filters), ...contentTypeIdExpression(contentTypeIds, webpageTemplates)];
  const query = new external_contensis_delivery_api_["Query"](...expressions);
  if (!searchTerm) query.orderBy = orderByExpression(orderBy);
  if (dynamicOrderBy && dynamicOrderBy.length) query.orderBy = orderByExpression(dynamicOrderBy);

  if (fields && fields.length > 0 && !isFeatured) {
    query.fields = fields;
  }

  query.pageIndex = isFeatured ? 0 : pageIndex;
  query.pageSize = isFeatured && typeof featuredResults.count === 'number' ? featuredResults.count : pageSize;
  return query;
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__17__;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
  var i, a; module.exports = factory(__webpack_require__(2), __webpack_require__(10), __webpack_require__(12), __webpack_require__(11), __webpack_require__(20), __webpack_require__(28));
})(commonjsGlobal, function (__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__26__, __WEBPACK_EXTERNAL_MODULE__27__) {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "/";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 66);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony import */

      var _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
      /* harmony reexport (checked) */


      if (__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "all")) __webpack_require__.d(__webpack_exports__, "all", function () {
        return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["all"];
      });
      /* harmony reexport (checked) */

      if (__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "call")) __webpack_require__.d(__webpack_exports__, "call", function () {
        return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["call"];
      });
      /* harmony reexport (checked) */

      if (__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "fork")) __webpack_require__.d(__webpack_exports__, "fork", function () {
        return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["fork"];
      });
      /* harmony reexport (checked) */

      if (__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "put")) __webpack_require__.d(__webpack_exports__, "put", function () {
        return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["put"];
      });
      /* harmony reexport (checked) */

      if (__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "select")) __webpack_require__.d(__webpack_exports__, "select", function () {
        return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["select"];
      });
      /* harmony reexport (checked) */

      if (__webpack_require__.o(_redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__, "takeEvery")) __webpack_require__.d(__webpack_exports__, "takeEvery", function () {
        return _redux_saga_core_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"];
      });
      /***/
    },
    /* 1 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UPDATE_USER", function () {
        return UPDATE_USER;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LOGIN_USER", function () {
        return LOGIN_USER;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LOGIN_SUCCESSFUL", function () {
        return LOGIN_SUCCESSFUL;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LOGIN_FAILED", function () {
        return LOGIN_FAILED;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LOGOUT_USER", function () {
        return LOGOUT_USER;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TOGGLE_LOGIN_MODE", function () {
        return TOGGLE_LOGIN_MODE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CREATE_USER_ACCOUNT", function () {
        return CREATE_USER_ACCOUNT;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "VALIDATE_USER", function () {
        return VALIDATE_USER;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "VALIDATE_USER_SUCCESS", function () {
        return VALIDATE_USER_SUCCESS;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "VALIDATE_USER_FAILED", function () {
        return VALIDATE_USER_FAILED;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FORGOT_USER_PASSWORD", function () {
        return FORGOT_USER_PASSWORD;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FORGOT_USER_PASSWORD_COMPLETE", function () {
        return FORGOT_USER_PASSWORD_COMPLETE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CHANGE_USER_PASSWORD", function () {
        return CHANGE_USER_PASSWORD;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CHANGE_USER_PASSWORD_FAILED", function () {
        return CHANGE_USER_PASSWORD_FAILED;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CHANGE_USER_PASSWORD_COMPLETE", function () {
        return CHANGE_USER_PASSWORD_COMPLETE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_RECAPTCHA_KEY", function () {
        return SET_RECAPTCHA_KEY;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_RECAPTCHA_RESPONSE", function () {
        return SET_RECAPTCHA_RESPONSE;
      });

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
      /***/
    },
    /* 2 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__2__;
      /***/
    },
    /* 3 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "GET_ENTRY", function () {
        return GET_ENTRY;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_ENTRY", function () {
        return SET_ENTRY;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_NODE", function () {
        return SET_NODE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_ANCESTORS", function () {
        return SET_ANCESTORS;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_SIBLINGS", function () {
        return SET_SIBLINGS;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_ENTRY_ID", function () {
        return SET_ENTRY_ID;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_ENTRY_RELATED_ARTICLES", function () {
        return SET_ENTRY_RELATED_ARTICLES;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_NAVIGATION_NOT_FOUND", function () {
        return SET_NAVIGATION_NOT_FOUND;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_NAVIGATION_PATH", function () {
        return SET_NAVIGATION_PATH;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_TARGET_PROJECT", function () {
        return SET_TARGET_PROJECT;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_ROUTE", function () {
        return SET_ROUTE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CALL_HISTORY_METHOD", function () {
        return CALL_HISTORY_METHOD;
      });

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
      /***/
    },
    /* 4 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return action;
      });
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
      /***/

    },
    /* 5 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__5__;
      /***/
    },,
    /* 6 */

    /* 7 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectUser", function () {
        return selectUser;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectUsername", function () {
        return selectUsername;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectUserLoggedIn", function () {
        return selectUserLoggedIn;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectUserGroups", function () {
        return selectUserGroups;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectUserMessage", function () {
        return selectUserMessage;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectLoginScreenMode", function () {
        return selectLoginScreenMode;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectPasswordMessage", function () {
        return selectPasswordMessage;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectChangePasswordMessage", function () {
        return selectChangePasswordMessage;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCaptchaSiteKey", function () {
        return selectCaptchaSiteKey;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCaptchaData", function () {
        return selectCaptchaData;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCaptchaResponse", function () {
        return selectCaptchaResponse;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCaptchaToken", function () {
        return selectCaptchaToken;
      });

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
      /***/

    },
    /* 8 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteEntry", function () {
        return selectRouteEntry;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectNodeDepends", function () {
        return selectNodeDepends;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentTreeID", function () {
        return selectCurrentTreeID;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectEntryDepends", function () {
        return selectEntryDepends;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteEntryEntryId", function () {
        return selectRouteEntryEntryId;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteEntryContentTypeId", function () {
        return selectRouteEntryContentTypeId;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteEntrySlug", function () {
        return selectRouteEntrySlug;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteEntryID", function () {
        return selectRouteEntryID;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentPath", function () {
        return selectCurrentPath;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentSearch", function () {
        return selectCurrentSearch;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectQueryStringAsObject", function () {
        return selectQueryStringAsObject;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentProject", function () {
        return selectCurrentProject;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectIsNotFound", function () {
        return selectIsNotFound;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentAncestors", function () {
        return selectCurrentAncestors;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentNode", function () {
        return selectCurrentNode;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectBreadcrumb", function () {
        return selectBreadcrumb;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteLoading", function () {
        return selectRouteLoading;
      });
      /* harmony import */


      var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
      /* harmony import */


      var _util_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);

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

      const selectQueryStringAsObject = state => Object(_util_navigation__WEBPACK_IMPORTED_MODULE_1__[
      /* queryParams */
      "b"])(selectCurrentSearch(state));

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
      /***/

    },,
    /* 9 */

    /* 10 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__); // EXTERNAL MODULE: external "js-cookie"


      var external_js_cookie_ = __webpack_require__(27);

      var external_js_cookie_default =
      /*#__PURE__*/
      __webpack_require__.n(external_js_cookie_); // CONCATENATED MODULE: ./src/app/features/login/util/CookieHelper.class.js


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

      } // EXTERNAL MODULE: ./src/app/features/login/util/SecurityApi.class.js


      var SecurityApi_class = __webpack_require__(11); // EXTERNAL MODULE: ./src/app/features/login/redux/reducers.js


      var reducers = __webpack_require__(14); // CONCATENATED MODULE: ./src/app/features/login/util/LoginHelper.class.js

      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LoginHelper", function () {
        return LoginHelper_class_LoginHelper;
      }); // import { ajax } from 'jquery';
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
            const response = await SecurityApi_class["a"
            /* SecurityApi */
            ].ValidateUser(cached.securityToken);
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
            const loginResponse = await SecurityApi_class["a"
            /* SecurityApi */
            ].LogonUser(username, password);

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

          const userInfoResponse = await SecurityApi_class["a"
          /* SecurityApi */
          ].GetUserInfo(user.securityToken);

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
          return reducers["b"
          /* initialUserState */
          ].toJS();
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
            const passwordResponse = await SecurityApi_class["a"
            /* SecurityApi */
            ].ForgotPassword(username, currentUrl);

            if (passwordResponse) {
              // Extract the elements we need from the response
              return passwordResponse;
            }
          }
        }

        static async ChangePassword(username, oldPassword, newPassword, newPasswordConfirm) {
          if (newPassword && newPasswordConfirm) {
            if (this.ValidatePassword(newPassword)) {
              const passwordResponse = await SecurityApi_class["a"
              /* SecurityApi */
              ].ChangePassword(username, oldPassword, newPassword, newPasswordConfirm); //const passwordResponse = await SecurityApi.ChangePassword(btoa(username), btoa(oldPassword), btoa(newPassword), btoa(newPasswordConfirm));

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
              const passwordResponse = await SecurityApi_class["a"
              /* SecurityApi */
              ].ChangePasswordWithToken(token, btoa(newPassword), btoa(newPasswordConfirm)); //const passwordResponse = await SecurityApi.ChangePassword(btoa(username), btoa(oldPassword), btoa(newPassword), btoa(newPasswordConfirm));

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
      /***/

    },
    /* 11 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return SecurityApi;
      });

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
      /***/

    },
    /* 12 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__12__;
      /***/
    },,
    /* 13 */

    /* 14 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "b", function () {
        return initialUserState;
      });
      /* harmony import */


      var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
      /* harmony import */


      var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);

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
      /* harmony default export */

      __webpack_exports__["a"] = (state = initialUserState, action) => {
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
      };
      /***/

    },
    /* 15 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "GET_NODE_TREE", function () {
        return GET_NODE_TREE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_NODE_TREE", function () {
        return SET_NODE_TREE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "GET_NODE_TREE_ERROR", function () {
        return GET_NODE_TREE_ERROR;
      });

      const ACTION_PREFIX = '@NAVIGATION/';
      const GET_NODE_TREE = `${ACTION_PREFIX}_GET_NODE_TREE`;
      const SET_NODE_TREE = `${ACTION_PREFIX}_SET_NODE_TREE`;
      const GET_NODE_TREE_ERROR = `${ACTION_PREFIX}_GET_NODE_TREE_ERROR`;
      /***/
    },
    /* 16 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__16__;
      /***/
    },,
    /* 17 */

    /* 18 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);

      var actions_namespaceObject = {};

      __webpack_require__.r(actions_namespaceObject);

      __webpack_require__.d(actions_namespaceObject, "loginUser", function () {
        return loginUser;
      });

      __webpack_require__.d(actions_namespaceObject, "validateUser", function () {
        return validateUser;
      });

      __webpack_require__.d(actions_namespaceObject, "logoutUser", function () {
        return logoutUser;
      });

      __webpack_require__.d(actions_namespaceObject, "toggleLoginMode", function () {
        return toggleLoginMode;
      });

      __webpack_require__.d(actions_namespaceObject, "createUserAccount", function () {
        return createUserAccount;
      });

      __webpack_require__.d(actions_namespaceObject, "forgotPassword", function () {
        return forgotPassword;
      });

      __webpack_require__.d(actions_namespaceObject, "changePassword", function () {
        return changePassword;
      });

      __webpack_require__.d(actions_namespaceObject, "changePasswordWithToken", function () {
        return changePasswordWithToken;
      });

      __webpack_require__.d(actions_namespaceObject, "setRecaptchaKey", function () {
        return setRecaptchaKey;
      });

      __webpack_require__.d(actions_namespaceObject, "setRecaptchaResponse", function () {
        return setRecaptchaResponse;
      }); // EXTERNAL MODULE: ./src/app/core/util/helpers.js


      var helpers = __webpack_require__(4); // EXTERNAL MODULE: ./src/app/features/login/redux/types.js


      var types = __webpack_require__(1); // CONCATENATED MODULE: ./src/app/features/login/redux/actions.js


      const loginUser = (username, password) => Object(helpers["a"
      /* action */
      ])(types["LOGIN_USER"], {
        username,
        password
      });

      const validateUser = cookies => Object(helpers["a"
      /* action */
      ])(types["VALIDATE_USER"], {
        cookies
      });

      const logoutUser = () => Object(helpers["a"
      /* action */
      ])(types["LOGOUT_USER"]);

      const toggleLoginMode = loginMode => Object(helpers["a"
      /* action */
      ])(types["TOGGLE_LOGIN_MODE"], {
        loginMode
      });

      const createUserAccount = () => Object(helpers["a"
      /* action */
      ])(types["CREATE_USER_ACCOUNT"]);

      const forgotPassword = username => Object(helpers["a"
      /* action */
      ])(types["FORGOT_USER_PASSWORD"], {
        username
      });

      const changePassword = (oldPassword, newPassword, newPasswordConfirm) => Object(helpers["a"
      /* action */
      ])(types["CHANGE_USER_PASSWORD"], {
        oldPassword,
        newPassword,
        newPasswordConfirm
      });

      const changePasswordWithToken = (token, newPassword, newPasswordConfirm) => Object(helpers["a"
      /* action */
      ])(types["CHANGE_USER_PASSWORD"], {
        token,
        newPassword,
        newPasswordConfirm
      });

      const setRecaptchaKey = key => Object(helpers["a"
      /* action */
      ])(types["SET_RECAPTCHA_KEY"], {
        key
      });

      const setRecaptchaResponse = (isHuman, token) => Object(helpers["a"
      /* action */
      ])(types["SET_RECAPTCHA_RESPONSE"], {
        isHuman,
        token
      }); // EXTERNAL MODULE: ./src/app/features/login/redux/selectors.js


      var selectors = __webpack_require__(7); // EXTERNAL MODULE: ./src/app/features/login/redux/reducers.js


      var reducers = __webpack_require__(14); // EXTERNAL MODULE: ./src/app/features/login/redux/sagas.js


      var sagas = __webpack_require__(23); // EXTERNAL MODULE: external "react-redux"


      var external_react_redux_ = __webpack_require__(16); // EXTERNAL MODULE: ./src/app/core/util/ToJs.js


      var ToJs = __webpack_require__(21); // EXTERNAL MODULE: ./src/app/core/redux/selectors/routing.js


      var routing = __webpack_require__(8); // CONCATENATED MODULE: ./src/app/features/login/components/withLogin.js


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
        const ConnectedComponent = Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(Object(ToJs["a"
        /* toJS */
        ])(WrappedComponent));
        ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
        return ConnectedComponent;
      };
      /* harmony default export */


      var components_withLogin = withLogin; // CONCATENATED MODULE: ./src/app/features/login/index.js

      /* concated harmony reexport actions */

      __webpack_require__.d(__webpack_exports__, "actions", function () {
        return actions_namespaceObject;
      });
      /* concated harmony reexport selectors */


      __webpack_require__.d(__webpack_exports__, "selectors", function () {
        return selectors;
      });
      /* concated harmony reexport types */


      __webpack_require__.d(__webpack_exports__, "types", function () {
        return types;
      });
      /* concated harmony reexport reducer */


      __webpack_require__.d(__webpack_exports__, "reducer", function () {
        return reducers["a"
        /* default */
        ];
      });
      /* concated harmony reexport sagas */


      __webpack_require__.d(__webpack_exports__, "sagas", function () {
        return sagas["a"
        /* userSagas */
        ];
      });
      /* concated harmony reexport withLogin */


      __webpack_require__.d(__webpack_exports__, "withLogin", function () {
        return components_withLogin;
      });
      /***/

    },
    /* 19 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_VERSION", function () {
        return SET_VERSION;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_VERSION_STATUS", function () {
        return SET_VERSION_STATUS;
      });

      const VERSION_PREFIX = '@VERSION/';
      const SET_VERSION = `${VERSION_PREFIX}SET_VERSION`;
      const SET_VERSION_STATUS = `${VERSION_PREFIX}SET_VERSION_STATUS`;
      /***/
    },
    /* 20 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "b", function () {
        return queryParams;
      });
      /* unused harmony export routeParams */

      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "a", function () {
        return buildUrl;
      });
      /* unused harmony export clientHostname */

      /* unused harmony export addHostname */

      /* harmony import */


      var query_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
      /* harmony import */


      var query_string__WEBPACK_IMPORTED_MODULE_0___default =
      /*#__PURE__*/
      __webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_0__);

      function queryParams(search) {
        return query_string__WEBPACK_IMPORTED_MODULE_0___default.a.parse(typeof window != 'undefined' ? window.location.search : search);
      }

      const buildUrl = (route, params) => {
        const qs = query_string__WEBPACK_IMPORTED_MODULE_0___default.a.stringify(params);
        const path = qs ? `${route}?${qs}` : route;
        return path;
      };

      const clientHostname = () => `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

      const addHostname = typeof window == 'undefined' || window.location.host == 'localhost:3000' ? `https://${PUBLIC_URI
      /* global PUBLIC_URI */
      }` : clientHostname();
      /***/
    },
    /* 21 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return toJS;
      });
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0___default =
      /*#__PURE__*/
      __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);

      const toJS = WrappedComponent => wrappedComponentProps => {
        const KEY = 0;
        const VALUE = 1;
        const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
          newProps[wrappedComponentProp[KEY]] = immutable__WEBPACK_IMPORTED_MODULE_1__["Iterable"].isIterable(wrappedComponentProp[VALUE]) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
          return newProps;
        }, {});
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedComponent, propsJS);
      };
      /***/

    },
    /* 22 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setNotFound", function () {
        return setNotFound;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setNavigationPath", function () {
        return setNavigationPath;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setCurrentProject", function () {
        return setCurrentProject;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setRoute", function () {
        return setRoute;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setRouteEntry", function () {
        return setRouteEntry;
      });
      /* harmony import */


      var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
      /* harmony import */


      var _types_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

      const setNotFound = notFound => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_NAVIGATION_NOT_FOUND"], {
        notFound
      });

      const setNavigationPath = (path, location, staticRoute, withEvents, statePath, routes) => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_NAVIGATION_PATH"], {
        path,
        location,
        staticRoute,
        withEvents,
        statePath,
        routes
      });

      const setCurrentProject = (project, allowedGroups) => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_TARGET_PROJECT"], {
        project,
        allowedGroups
      });

      const setRoute = (path, state) => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_ROUTE"], {
        path,
        state
      });

      const setRouteEntry = entry => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_ENTRY"], {
        entry
      });
      /***/

    },
    /* 23 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return userSagas;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "b", function () {
        return validateUserSaga;
      });
      /* harmony import */


      var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
      /* harmony import */


      var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
      /* harmony import */


      var query_string__WEBPACK_IMPORTED_MODULE_1___default =
      /*#__PURE__*/
      __webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
      /* harmony import */


      var _reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
      /* harmony import */


      var _core_redux_types_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
      /* harmony import */


      var _core_redux_selectors_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
      /* harmony import */


      var _selectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
      /* harmony import */


      var _util_LoginHelper_class__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
      /* harmony import */


      var _util_SecurityApi_class__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11);

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
          user: user && !user.loggedIn ? _reducers__WEBPACK_IMPORTED_MODULE_3__[
          /* initialUserState */
          "b"] : user
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
          const registerResponse = yield _util_SecurityApi_class__WEBPACK_IMPORTED_MODULE_8__[
          /* SecurityApi */
          "a"].RegisterUser(userState.username, userState.password);

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
      /***/

    },,,
    /* 24 */

    /* 25 */

    /* 26 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__26__;
      /***/
    },
    /* 27 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__27__;
      /***/
    },
    /* 28 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCommitRef", function () {
        return selectCommitRef;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectBuildNumber", function () {
        return selectBuildNumber;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectVersionStatus", function () {
        return selectVersionStatus;
      });

      const selectCommitRef = state => {
        return state.getIn(['version', 'commitRef']);
      };

      const selectBuildNumber = state => {
        return state.getIn(['version', 'buildNo']);
      };

      const selectVersionStatus = state => {
        return state.getIn(['version', 'contensisVersionStatus']);
      };
      /***/

    },
    /* 29 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "hasNavigationTree", function () {
        return hasNavigationTree;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectNavigationRoot", function () {
        return selectNavigationRoot;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectNavigationDepends", function () {
        return selectNavigationDepends;
      });

      const hasNavigationTree = state => {
        return state.getIn(['navigation', 'isReady']);
      };

      const selectNavigationRoot = state => {
        return state.getIn(['navigation', 'root']);
      };

      const selectNavigationDepends = state => {
        return state.getIn(['navigation', 'treeDepends']);
      };
      /***/

    },,,
    /* 30 */

    /* 31 */

    /* 32 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setVersion", function () {
        return setVersion;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setVersionStatus", function () {
        return setVersionStatus;
      });
      /* harmony import */


      var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
      /* harmony import */


      var _types_version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);

      const setVersion = (commitRef, buildNo) => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_version__WEBPACK_IMPORTED_MODULE_1__["SET_VERSION"], {
        commitRef,
        buildNo
      });

      const setVersionStatus = status => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_version__WEBPACK_IMPORTED_MODULE_1__["SET_VERSION_STATUS"], {
        status
      });
      /***/

    },,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    /* 33 */

    /* 34 */

    /* 35 */

    /* 36 */

    /* 37 */

    /* 38 */

    /* 39 */

    /* 40 */

    /* 41 */

    /* 42 */

    /* 43 */

    /* 44 */

    /* 45 */

    /* 46 */

    /* 47 */

    /* 48 */

    /* 49 */

    /* 50 */

    /* 51 */

    /* 52 */

    /* 53 */

    /* 54 */

    /* 55 */

    /* 56 */

    /* 57 */

    /* 58 */

    /* 59 */

    /* 60 */

    /* 61 */

    /* 62 */

    /* 63 */

    /* 64 */

    /* 65 */

    /* 66 */

    /***/
    function (module, exports, __webpack_require__) {
      const types = __webpack_require__(67).default;

      const actions = __webpack_require__(78).default;

      const selectors = __webpack_require__(68).default; // Remap the objects so they are presented in "feature" hierarchy
      // e.g. { routing: { types, actions }, navigation: { types, actions } }
      // instead of { types: { routing, navigation }, actions: { routing, navigation } }


      Object.entries(types).map(([key, v]) => {
        exports[key] = {
          types: v,
          actions: actions[key],
          selectors: selectors[key]
        };
      });
      /***/
    },
    /* 67 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
      /* harmony import */


      var _routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
      /* harmony import */


      var _features_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
      /* harmony import */


      var _version__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
      /* harmony default export */


      __webpack_exports__["default"] = {
        navigation: _navigation__WEBPACK_IMPORTED_MODULE_0__,
        routing: _routing__WEBPACK_IMPORTED_MODULE_1__,
        user: _features_login__WEBPACK_IMPORTED_MODULE_2__["types"],
        version: _version__WEBPACK_IMPORTED_MODULE_3__
      };
      /***/
    },
    /* 68 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
      /* harmony import */


      var _routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
      /* harmony import */


      var _features_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
      /* harmony import */


      var _version__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
      /* harmony default export */


      __webpack_exports__["default"] = {
        navigation: _navigation__WEBPACK_IMPORTED_MODULE_0__,
        routing: _routing__WEBPACK_IMPORTED_MODULE_1__,
        user: _features_login__WEBPACK_IMPORTED_MODULE_2__["selectors"],
        version: _version__WEBPACK_IMPORTED_MODULE_3__
      };
      /***/
    },,,,,,,,,,
    /* 69 */

    /* 70 */

    /* 71 */

    /* 72 */

    /* 73 */

    /* 74 */

    /* 75 */

    /* 76 */

    /* 77 */

    /* 78 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);

      var navigation_namespaceObject = {};

      __webpack_require__.r(navigation_namespaceObject);

      __webpack_require__.d(navigation_namespaceObject, "loadNavigationTree", function () {
        return loadNavigationTree;
      }); // EXTERNAL MODULE: ./src/app/features/login/index.js + 2 modules


      var login = __webpack_require__(18); // EXTERNAL MODULE: ./src/app/core/util/helpers.js


      var helpers = __webpack_require__(4); // EXTERNAL MODULE: ./src/app/core/redux/types/navigation.js


      var navigation = __webpack_require__(15); // CONCATENATED MODULE: ./src/app/core/redux/actions/navigation.js


      const loadNavigationTree = () => Object(helpers["a"
      /* action */
      ])(navigation["GET_NODE_TREE"]); // EXTERNAL MODULE: ./src/app/core/redux/actions/routing.js


      var routing = __webpack_require__(22); // EXTERNAL MODULE: ./src/app/core/redux/actions/version.js


      var version = __webpack_require__(32); // CONCATENATED MODULE: ./src/app/core/redux/actions/index.js

      /* harmony default export */


      var actions = __webpack_exports__["default"] = {
        navigation: navigation_namespaceObject,
        routing: routing,
        user: login["actions"],
        version: version
      };
      /***/
    }
    /******/
    ])
  );
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toJS; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


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
/* 20 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__20__;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
  var i, a; module.exports = factory(__webpack_require__(2), __webpack_require__(10), __webpack_require__(4), __webpack_require__(12), __webpack_require__(11), __webpack_require__(24), __webpack_require__(25), __webpack_require__(26));
})(commonjsGlobal, function (__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__17__, __WEBPACK_EXTERNAL_MODULE__24__, __WEBPACK_EXTERNAL_MODULE__25__) {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "/";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 69);
      /******/
    }(
    /************************************************************************/

    /******/
    [,,
    /* 0 */

    /* 1 */

    /* 2 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__2__;
      /***/
    },
    /* 3 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "GET_ENTRY", function () {
        return GET_ENTRY;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_ENTRY", function () {
        return SET_ENTRY;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_NODE", function () {
        return SET_NODE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_ANCESTORS", function () {
        return SET_ANCESTORS;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_SIBLINGS", function () {
        return SET_SIBLINGS;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_ENTRY_ID", function () {
        return SET_ENTRY_ID;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_ENTRY_RELATED_ARTICLES", function () {
        return SET_ENTRY_RELATED_ARTICLES;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_NAVIGATION_NOT_FOUND", function () {
        return SET_NAVIGATION_NOT_FOUND;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_NAVIGATION_PATH", function () {
        return SET_NAVIGATION_PATH;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_TARGET_PROJECT", function () {
        return SET_TARGET_PROJECT;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SET_ROUTE", function () {
        return SET_ROUTE;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CALL_HISTORY_METHOD", function () {
        return CALL_HISTORY_METHOD;
      });

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
      /***/
    },
    /* 4 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return action;
      });
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
      /***/

    },
    /* 5 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__5__;
      /***/
    },,
    /* 6 */

    /* 7 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectUser", function () {
        return selectUser;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectUsername", function () {
        return selectUsername;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectUserLoggedIn", function () {
        return selectUserLoggedIn;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectUserGroups", function () {
        return selectUserGroups;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectUserMessage", function () {
        return selectUserMessage;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectLoginScreenMode", function () {
        return selectLoginScreenMode;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectPasswordMessage", function () {
        return selectPasswordMessage;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectChangePasswordMessage", function () {
        return selectChangePasswordMessage;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCaptchaSiteKey", function () {
        return selectCaptchaSiteKey;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCaptchaData", function () {
        return selectCaptchaData;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCaptchaResponse", function () {
        return selectCaptchaResponse;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCaptchaToken", function () {
        return selectCaptchaToken;
      });

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
      /***/

    },
    /* 8 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteEntry", function () {
        return selectRouteEntry;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectNodeDepends", function () {
        return selectNodeDepends;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentTreeID", function () {
        return selectCurrentTreeID;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectEntryDepends", function () {
        return selectEntryDepends;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteEntryEntryId", function () {
        return selectRouteEntryEntryId;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteEntryContentTypeId", function () {
        return selectRouteEntryContentTypeId;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteEntrySlug", function () {
        return selectRouteEntrySlug;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteEntryID", function () {
        return selectRouteEntryID;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentPath", function () {
        return selectCurrentPath;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentSearch", function () {
        return selectCurrentSearch;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectQueryStringAsObject", function () {
        return selectQueryStringAsObject;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentProject", function () {
        return selectCurrentProject;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectIsNotFound", function () {
        return selectIsNotFound;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentAncestors", function () {
        return selectCurrentAncestors;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectCurrentNode", function () {
        return selectCurrentNode;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectBreadcrumb", function () {
        return selectBreadcrumb;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "selectRouteLoading", function () {
        return selectRouteLoading;
      });
      /* harmony import */


      var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
      /* harmony import */


      var _util_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);

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

      const selectQueryStringAsObject = state => Object(_util_navigation__WEBPACK_IMPORTED_MODULE_1__[
      /* queryParams */
      "b"])(selectCurrentSearch(state));

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
      /***/

    },
    /* 9 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__9__;
      /***/
    },,,
    /* 10 */

    /* 11 */

    /* 12 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__12__;
      /***/
    },,,,
    /* 13 */

    /* 14 */

    /* 15 */

    /* 16 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__16__;
      /***/
    },
    /* 17 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__17__;
      /***/
    },,,
    /* 18 */

    /* 19 */

    /* 20 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "b", function () {
        return queryParams;
      });
      /* unused harmony export routeParams */

      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "a", function () {
        return buildUrl;
      });
      /* unused harmony export clientHostname */

      /* unused harmony export addHostname */

      /* harmony import */


      var query_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
      /* harmony import */


      var query_string__WEBPACK_IMPORTED_MODULE_0___default =
      /*#__PURE__*/
      __webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_0__);

      function queryParams(search) {
        return query_string__WEBPACK_IMPORTED_MODULE_0___default.a.parse(typeof window != 'undefined' ? window.location.search : search);
      }

      const buildUrl = (route, params) => {
        const qs = query_string__WEBPACK_IMPORTED_MODULE_0___default.a.stringify(params);
        const path = qs ? `${route}?${qs}` : route;
        return path;
      };

      const clientHostname = () => `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

      const addHostname = typeof window == 'undefined' || window.location.host == 'localhost:3000' ? `https://${PUBLIC_URI
      /* global PUBLIC_URI */
      }` : clientHostname();
      /***/
    },
    /* 21 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return toJS;
      });
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0___default =
      /*#__PURE__*/
      __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var immutable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);

      const toJS = WrappedComponent => wrappedComponentProps => {
        const KEY = 0;
        const VALUE = 1;
        const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
          newProps[wrappedComponentProp[KEY]] = immutable__WEBPACK_IMPORTED_MODULE_1__["Iterable"].isIterable(wrappedComponentProp[VALUE]) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
          return newProps;
        }, {});
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedComponent, propsJS);
      };
      /***/

    },
    /* 22 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setNotFound", function () {
        return setNotFound;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setNavigationPath", function () {
        return setNavigationPath;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setCurrentProject", function () {
        return setCurrentProject;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setRoute", function () {
        return setRoute;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "setRouteEntry", function () {
        return setRouteEntry;
      });
      /* harmony import */


      var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
      /* harmony import */


      var _types_routing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

      const setNotFound = notFound => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_NAVIGATION_NOT_FOUND"], {
        notFound
      });

      const setNavigationPath = (path, location, staticRoute, withEvents, statePath, routes) => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_NAVIGATION_PATH"], {
        path,
        location,
        staticRoute,
        withEvents,
        statePath,
        routes
      });

      const setCurrentProject = (project, allowedGroups) => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_TARGET_PROJECT"], {
        project,
        allowedGroups
      });

      const setRoute = (path, state) => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_ROUTE"], {
        path,
        state
      });

      const setRouteEntry = entry => Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__[
      /* action */
      "a"])(_types_routing__WEBPACK_IMPORTED_MODULE_1__["SET_ENTRY"], {
        entry
      });
      /***/

    },,
    /* 23 */

    /* 24 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__24__;
      /***/
    },
    /* 25 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE__25__;
      /***/
    },,,,,,
    /* 26 */

    /* 27 */

    /* 28 */

    /* 29 */

    /* 30 */

    /* 31 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* WEBPACK VAR INJECTION */


      (function (module) {
        /* harmony import */
        var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
        /* harmony import */


        var react__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
        /* harmony import */


        var prop_types__WEBPACK_IMPORTED_MODULE_1___default =
        /*#__PURE__*/
        __webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
        /* harmony import */


        var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
        /* harmony import */


        var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
        /* harmony import */


        var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
        /* harmony import */


        var react_router_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);
        /* harmony import */


        var _redux_selectors_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
        /* harmony import */


        var _redux_actions_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);
        /* harmony import */


        var _pages_NotFound__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(35);
        /* harmony import */


        var _Status__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(36);
        /* harmony import */


        var _util_ToJs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(21);
        /* harmony import */


        var _features_login_redux_selectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7);

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
          isLoading,
          isLoggedIn,
          isNotFound,
          loadingComponent,
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


          if (isStaticRoute()) {
            return Object(react_router_config__WEBPACK_IMPORTED_MODULE_5__["renderRoutes"])(routes.StaticRoutes, {
              projectId,
              contentTypeId,
              entry,
              isLoggedIn
            });
          } // Render a supplied Loading component if the route
          // is not a static route and is in a loading state


          if (isLoading && !isNotFound && loadingComponent) {
            const LoadingComponent = loadingComponent;
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LoadingComponent, null);
          } // Match any defined Content Type Mappings


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

          const NotFoundComponent = notFoundComponent ? notFoundComponent : _pages_NotFound__WEBPACK_IMPORTED_MODULE_8__[
          /* default */
          "a"];

          if (isNotFound) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Status__WEBPACK_IMPORTED_MODULE_9__[
            /* Status */
            "a"], {
              code: 404
            }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NotFoundComponent, null));
          }

          return null;
        };

        RouteLoader.propTypes = {
          contentTypeId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
          entry: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
          isLoading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
          isLoggedIn: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
          isNotFound: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
          loadingComponent: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
          notFoundComponent: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
          projectId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
          routes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array),
          setNavigationPath: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
          statePath: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
          withEvents: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
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
        /* harmony default export */

        __webpack_exports__["default"] = Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Object(_util_ToJs__WEBPACK_IMPORTED_MODULE_10__[
        /* toJS */
        "a"])(RouteLoader)));
        /* WEBPACK VAR INJECTION */
      }).call(this, __webpack_require__(46)(module));
      /***/
    },,,,
    /* 32 */

    /* 33 */

    /* 34 */

    /* 35 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony import */

      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0___default =
      /*#__PURE__*/
      __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

      const NotFound = () => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "404 Page Not Found")));
      /* harmony default export */


      __webpack_exports__["a"] = NotFound;
      /***/
    },
    /* 36 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "a", function () {
        return Status;
      });
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0___default =
      /*#__PURE__*/
      __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
      /* harmony import */


      var prop_types__WEBPACK_IMPORTED_MODULE_1___default =
      /*#__PURE__*/
      __webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);

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
      /***/
    },,,,,,,,,
    /* 37 */

    /* 38 */

    /* 39 */

    /* 40 */

    /* 41 */

    /* 42 */

    /* 43 */

    /* 44 */

    /* 45 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0___default =
      /*#__PURE__*/
      __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
      /* harmony import */


      var _core_routes_RouteLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31);

      const AppRoot = props => {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_routes_RouteLoader__WEBPACK_IMPORTED_MODULE_2__["default"], props);
      };
      /* harmony default export */


      __webpack_exports__["default"] = AppRoot;
      /***/
    },
    /* 46 */

    /***/
    function (module, exports) {
      module.exports = function (originalModule) {
        if (!originalModule.webpackPolyfill) {
          var module = Object.create(originalModule); // module.parent = undefined by default

          if (!module.children) module.children = [];
          Object.defineProperty(module, "loaded", {
            enumerable: true,
            get: function () {
              return module.l;
            }
          });
          Object.defineProperty(module, "id", {
            enumerable: true,
            get: function () {
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
      /***/

    },,,,,,,,,,,,,,,,,,,,,,,
    /* 47 */

    /* 48 */

    /* 49 */

    /* 50 */

    /* 51 */

    /* 52 */

    /* 53 */

    /* 54 */

    /* 55 */

    /* 56 */

    /* 57 */

    /* 58 */

    /* 59 */

    /* 60 */

    /* 61 */

    /* 62 */

    /* 63 */

    /* 64 */

    /* 65 */

    /* 66 */

    /* 67 */

    /* 68 */

    /* 69 */

    /***/
    function (module, exports, __webpack_require__) {
      exports.types = __webpack_require__(3);
      exports.actions = __webpack_require__(22);
      exports.selectors = __webpack_require__(8);

      const ReactApp = __webpack_require__(45).default;

      const RouteLoader = __webpack_require__(31).default;

      exports.ReactApp = ReactApp;
      exports.RouteLoader = RouteLoader;
      /***/
    }
    /******/
    ])
  );
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const withSearch = __webpack_require__(23).default;

const withListing = __webpack_require__(27).default;

const {
  searchSagas,
  setRouteFilters
} = __webpack_require__(31);

exports.withSearch = withSearch;
exports.withListing = withListing;
exports.setRouteFilters = setRouteFilters;
exports.useMinilist = __webpack_require__(29).default;
exports.actions = __webpack_require__(5);
exports.queries = __webpack_require__(16);
exports.reducer = __webpack_require__(30).default;
exports.sagas = searchSagas;
exports.schema = __webpack_require__(1);
exports.selectors = __webpack_require__(0);
exports.types = __webpack_require__(3);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_util_ToJs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _redux_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);







const withSearch = mappers => SearchComponent => {
  const Wrapper = props => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SearchComponent, props);
  };

  Wrapper.displayName = `withSearch(${SearchComponent.displayName || SearchComponent.name})`;
  Wrapper.propTypes = {
    className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    clearFilters: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    currentFacet: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    currentPageIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    currentTabIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    entry: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    facet: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    facets: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    featuredResults: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
    filters: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    isLoading: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
    results: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
    resultsInfo: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    paging: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    pageIsLoading: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
    searchTerm: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    sortOrder: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
    tabsAndFacets: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
    updateCurrentFacet: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    updateCurrentTab: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    updateSearchTerm: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    updateSelectedFilters: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    updateSortOrder: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
  };

  const mapStateToProps = state => {
    return {
      currentFacet: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getCurrentFacet"])(state),
      currentPageIndex: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getPageIndex"])(state),
      currentTabIndex: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getCurrentTab"])(state),
      facet: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getFacet"])(state),
      facets: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getTabFacets"])(state),
      facetsTotalCount: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getFacetsTotalCount"])(state),
      facetTitles: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getFacetTitles"])(state),
      featuredResults: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getFeaturedResults"])(state),
      filters: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getRenderableFilters"])(state),
      isLoading: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getIsLoading"])(state),
      paging: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getPaging"])(state),
      pageIsLoading: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getPageIsLoading"])(state),
      results: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getResults"])(state),
      resultsInfo: mappers.resultsInfo(state),
      searchTerm: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getSearchTerm"])(state),
      searchTotalCount: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getSearchTotalCount"])(state),
      sortOrder: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getQueryParameter"])({
        state
      }, 'dynamicOrderBy', []),
      tabsAndFacets: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getTabsAndFacets"])(state),
      totalCount: Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_5__["getTotalCount"])(state)
    };
  };

  const mapDispatchToProps = {
    clearFilters: () => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["clearFilters"])(), mappers),
    updateCurrentFacet: facet => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updateCurrentFacet"])(facet), mappers),
    updateCurrentTab: id => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updateCurrentTab"])(id), mappers),
    updatePageIndex: pageIndex => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updatePageIndex"])(pageIndex), mappers),
    updateSearchTerm: term => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updateSearchTerm"])(term), mappers),
    updateSelectedFilters: (filter, key) => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updateSelectedFilters"])(filter, key), mappers),
    updateSortOrder: orderBy => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updateSortOrder"])(orderBy), mappers)
  };
  return Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Object(_core_util_ToJs__WEBPACK_IMPORTED_MODULE_3__[/* toJS */ "a"])(Wrapper));
};

/* harmony default export */ __webpack_exports__["default"] = (withSearch);

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_util_ToJs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _redux_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);







const withListing = mappers => ListingComponent => {
  const Wrapper = props => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ListingComponent, props);
  };

  Wrapper.displayName = `withListing(${ListingComponent.displayName || ListingComponent.name})`;
  Wrapper.propTypes = {
    className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    clearFilters: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    currentListing: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    currentPageIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    entry: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    featured: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
    filters: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    isLoading: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
    listing: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    paging: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    pagesLoaded: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
    results: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
    resultsInfo: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    searchTerm: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    sortOrder: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
    updatePageIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    updateSearchTerm: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    updateSelectedFilters: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    updateSortOrder: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
  };
  const {
    getCurrent,
    getFeaturedResults,
    getIsLoading,
    getListing,
    getPageIndex,
    getPaging,
    getQueryParameter,
    getRenderableFilters,
    getResults,
    getSearchTerm
  } = _redux_selectors__WEBPACK_IMPORTED_MODULE_5__["selectListing"];

  const mapStateToProps = state => {
    return {
      currentListing: getCurrent(state),
      currentPageIndex: getPageIndex(state),
      listing: getListing(state),
      featured: getFeaturedResults(state),
      filters: getRenderableFilters(state),
      isLoading: getIsLoading(state),
      paging: getPaging(state),
      results: getResults(state),
      resultsInfo: mappers && typeof mappers.resultsInfo === 'function' && mappers.resultsInfo(state),
      searchTerm: getSearchTerm(state),
      sortOrder: getQueryParameter({
        state
      }, 'dynamicOrderBy', [])
    };
  };

  const mapDispatchToProps = {
    clearFilters: () => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["clearFilters"])(), mappers),
    updateCurrentFacet: facet => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updateCurrentFacet"])(facet), mappers),
    updatePageIndex: pageIndex => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updatePageIndex"])(pageIndex), mappers),
    updateSearchTerm: term => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updateSearchTerm"])(term), mappers),
    updateSelectedFilters: (filter, key) => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updateSelectedFilters"])(filter, key), mappers),
    updateSortOrder: orderBy => Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["withMappers"])(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_4__["updateSortOrder"])(orderBy), mappers)
  };
  return Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Object(_core_util_ToJs__WEBPACK_IMPORTED_MODULE_3__[/* toJS */ "a"])(Wrapper));
};

/* harmony default export */ __webpack_exports__["default"] = (withListing);

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__28__;

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _redux_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var _redux_schema__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);






const useMinilist = ({
  id,
  excludeIds,
  mapper,
  params,
  debug
} = {}) => {
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const results = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_3__["getResults"])(state, id, _redux_schema__WEBPACK_IMPORTED_MODULE_4__["Context"].minilist).toJS());
  const isLoading = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => Object(_redux_selectors__WEBPACK_IMPORTED_MODULE_3__["getIsLoading"])(state, _redux_schema__WEBPACK_IMPORTED_MODULE_4__["Context"].minilist, id));
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (id && mapper) {
      dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_2__["triggerSearch"])({
        context: _redux_schema__WEBPACK_IMPORTED_MODULE_4__["Context"].minilist,
        facet: id,
        mapper,
        params,
        excludeIds,
        debug
      }));
    }
  }, [dispatch, excludeIds, id, params]);
  return {
    isLoading,
    results
  };
};

/* harmony default export */ __webpack_exports__["default"] = (useMinilist);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _core_util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* eslint-disable no-console */





const generateSearchFacets = (context, config) => {
  let facets = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedMap"])({});

  if (config) {
    if (config[context]) {
      Object.entries(config[context]).map(([facetName, facet]) => {
        const newFacet = _schema__WEBPACK_IMPORTED_MODULE_1__["searchFacet"].merge(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(facet));
        if (!facet.isDisabled) facets = facets.set(facetName, newFacet);
      });
    }
  }

  return facets;
};

const generateFiltersState = ({
  facet,
  params,
  context,
  isCurrentFacet
}, state) => {
  // Remove filters we know about from params
  const filterParams = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])({ ...params,
    facet: undefined,
    orderBy: undefined,
    pageIndex: undefined,
    term: undefined
  }); // Get any existing filters and normalise the items[]
  // so we can start off with isSelected is false

  let filters = state.getIn([context, facet, 'filters'], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])({})).map(filter => isCurrentFacet || filter.get('isGrouped') ? filter.set('items', filter.get('items').map(item => item.set('isSelected', false))) : filter);

  const addFilterItem = (filters, paramKey, paramValue) => // Iterate through all filters within the facet,
  // if the paramKey matches the filter key
  // get the existing items list, and see if that filter
  // already exists, if so set isSelected to true,
  // if not create a new filterItem, setting the key only
  // so we can match this key later on when we load the filters
  filters.map((filter, key) => {
    if (paramKey !== key || !isCurrentFacet && !filter.get('isGrouped')) {
      return filter;
    } else {
      const items = filter.get('items', Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])([]));
      const itemIndex = items.findIndex(item => item.get('key') === paramValue);
      if (items.size > 0 && itemIndex !== -1) return filter.setIn(['items', itemIndex, 'isSelected'], true);
      return filter.set('items', filter.get('items', Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])([])).push(_schema__WEBPACK_IMPORTED_MODULE_1__["filterItem"].set('key', paramValue).set('isSelected', true)));
    }
  }); // For each value found in filterParams
  // we are looking to split that value into multiple by any comma
  // and then either set isSelected for an existing filterItem
  // or push an item to the filters.{ key }.items[] array
  // giving it only the key (entry guid) that can be taken to filter
  // the search results during SSR without needing to fetch the filters first


  filterParams.map((paramValue, paramName) => paramValue && paramValue.split(',').map(pVal => filters = addFilterItem(filters, paramName, pVal)));
  return filters;
};

const resetFacets = (state, context) => Object(immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedMap"])(state.get(context).map(resetFacet));

const resetFacet = facet => facet.setIn(['pagingInfo', 'pagesLoaded'], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])([])).setIn(['pagingInfo', 'pageIndex'], 0).setIn(['queryDuration'], 0);

/* harmony default export */ __webpack_exports__["default"] = (config => {
  // Add facets from SearchConfig to initialState
  const initState = _schema__WEBPACK_IMPORTED_MODULE_1__["initialState"].set('tabs', Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(config.tabs)).set(_schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets, generateSearchFacets(_schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets, config)).set(_schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings, generateSearchFacets(_schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings, config)).set(_schema__WEBPACK_IMPORTED_MODULE_1__["Context"].minilist, generateSearchFacets(_schema__WEBPACK_IMPORTED_MODULE_1__["Context"].minilist, config));
  return (state = initState, action) => {
    const context = state.get('context');
    const current = state.get(context !== _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].listings ? 'currentFacet' : 'currentListing');

    switch (action.type) {
      case _types__WEBPACK_IMPORTED_MODULE_2__["CLEAR_FILTERS"]:
        {
          const currentFilters = state.getIn([context, current, 'filters']);
          return state.setIn([context, current, 'filters'], currentFilters.map(filter => {
            const filterItems = filter && filter.get('items') || [];
            return filter.set('items', filterItems.map(item => item.set('isSelected', false)));
          })).setIn([context, current, 'queryDuration'], 0).setIn([context, current, 'pagingInfo', 'pagesLoaded'], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])([]));
        }

      case _types__WEBPACK_IMPORTED_MODULE_2__["DO_SEARCH"]:
        {
          // DO SEARCH is used when we cannot use SET_ROUTE_FILTERS
          // for example in a minilist scenario where the route filters
          // are used for the primary page / listing navigation
          const filters = generateFiltersState(action, state);
          return state.setIn([action.context || _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].minilist, action.facet, 'filters'], filters);
        }

      case _types__WEBPACK_IMPORTED_MODULE_2__["EXECUTE_SEARCH"]:
        {
          return state.setIn([action.context, action.facet, 'entries', 'isLoading'], true);
        }

      case _types__WEBPACK_IMPORTED_MODULE_2__["EXECUTE_SEARCH_ERROR"]:
        {
          return state.setIn([action.context, action.facet, 'entries'], _schema__WEBPACK_IMPORTED_MODULE_1__["entries"].set('isError', true).set('error', Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(action.error)));
        }

      case _types__WEBPACK_IMPORTED_MODULE_2__["LOAD_FILTERS"]:
        {
          const {
            facetKey,
            filtersToLoad
          } = action;
          const filters = state.getIn([action.context, facetKey, 'filters']);
          return state.setIn([action.context, facetKey, 'filters'], filters.map((filter, filterKey) => filtersToLoad.find(f => f === filterKey) ? filter.set('isLoading', true) : filter));
        }

      case _types__WEBPACK_IMPORTED_MODULE_2__["LOAD_FILTERS_ERROR"]:
      case _types__WEBPACK_IMPORTED_MODULE_2__["LOAD_FILTERS_COMPLETE"]:
        {
          const {
            facetKey,
            filterKey,
            nextFilter
          } = action;
          const filter = state.getIn([action.context, facetKey, 'filters', filterKey]);
          if (!(nextFilter.items && nextFilter.items.length > 0) && filter.get('items').size >= nextFilter.items.length) // Preserve items already in state
            return state.setIn([action.context, facetKey, 'filters', filterKey], filter.set('isLoading', false).set('isError', nextFilter.isError));
          return state.setIn([action.context, facetKey, 'filters', filterKey], filter.merge(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(nextFilter)));
        }

      case _types__WEBPACK_IMPORTED_MODULE_2__["SET_ROUTE_FILTERS"]:
        {
          const {
            facet,
            params,
            context
          } = action;
          const {
            term = '',
            pageIndex,
            orderBy
          } = params;
          const nextFacets = state.get(context).map((stateFacet, facetName) => {
            return stateFacet.set('filters', generateFiltersState({
              facet: facetName,
              params,
              context,
              isCurrentFacet: facetName === facet
            }, state)).setIn(['queryParams', 'dynamicOrderBy'], Object(_core_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* toArray */ "c"])(orderBy));
          });
          const tabId = state.getIn([context, facet, 'tabId'], 0);
          const stateTerm = state.get('term');
          const nextState = state.set('context', context).set(context, nextFacets).set(action.context === _schema__WEBPACK_IMPORTED_MODULE_1__["Context"].facets ? 'currentFacet' : 'currentListing', facet).set('term', term).setIn(['tabs', tabId, 'currentFacet'], facet).setIn([context, facet, 'pagingInfo', 'pageIndex'], Number(pageIndex) && Number(pageIndex) - 1 || state.getIn([context, facet, 'pagingInfo', 'pageIndex']) || 0).setIn(['config', 'isLoaded'], true).setIn(['config', 'ssr'], typeof window === 'undefined');
          return term !== stateTerm ? nextState.set(context, resetFacets(nextState, context)) : nextState;
        }

      case _types__WEBPACK_IMPORTED_MODULE_2__["SET_SEARCH_ENTRIES"]:
        {
          const thisContext = action.context || context;
          const currentFacet = state.getIn([thisContext, action.facet]);
          return state.setIn([thisContext, action.facet], currentFacet.merge(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(action.nextFacet)));
        }

      case _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_PAGE_INDEX"]:
        {
          const {
            pageIndex
          } = action;
          const internalPaging = state.getIn([context, current, 'queryParams', 'internalPaging'], false);
          const currentPageIndex = state.getIn([context, current, 'pagingInfo', 'pageIndex'], 0);
          const nextState = state.setIn([context, current, 'pagingInfo', 'pageIndex'], Number(pageIndex) || 0).setIn([context, current, 'pagingInfo', 'prevPageIndex'], currentPageIndex).setIn([context, current, 'pagingInfo', 'isLoading'], true);
          if (internalPaging) return nextState;
          return nextState.setIn([context, current, 'queryDuration'], 0);
        }

      case _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_SEARCH_TERM"]:
        {
          return state.set('term', action.term).set(context, resetFacets(state, context));
        }

      case _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_SELECTED_FILTERS"]:
        {
          const {
            filter,
            key
          } = action;
          const isSingleSelect = state.getIn([context, current, 'filters', filter, 'isSingleSelect'], false);
          const isGrouped = state.getIn([context, current, 'filters', filter, 'isGrouped'], false);
          const currentItems = state.getIn([context, current, 'filters', filter, 'items']);
          return state.set(context, isGrouped ? resetFacets(state, context) : state.get(context)).setIn([context, current], resetFacet(state.getIn([context, current]))).setIn([context, current, 'filters', filter, 'items'], currentItems.map(item => {
            if (item.get('key') == key) {
              return item.set('isSelected', !item.get('isSelected'));
            }

            return isSingleSelect ? item.set('isSelected', false) : item;
          }));
        }

      case _types__WEBPACK_IMPORTED_MODULE_2__["UPDATE_SORT_ORDER"]:
        {
          const {
            orderBy,
            facet
          } = action;
          return state.set(context, resetFacets(state, context)).setIn([context, facet || current, 'queryParams', 'dynamicOrderBy'], orderBy ? Object(immutable__WEBPACK_IMPORTED_MODULE_0__["fromJS"])(Object(_core_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* toArray */ "c"])(orderBy)) : '');
        }

      default:
        return state;
    }
  };
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "loglevel"
var external_loglevel_ = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js
var redux_saga_effects_npm_proxy_esm = __webpack_require__(6);

// EXTERNAL MODULE: external "immutable"
var external_immutable_ = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@zengenti/contensis-react-base/redux.js
var redux = __webpack_require__(18);

// CONCATENATED MODULE: ./src/app/core/redux/selectors/index.js

const {
  hasNavigationTree,
  selectNavigationRoot,
  selectNavigationDepends
} = redux["navigation"].selectors;
const {
  selectBreadcrumb,
  selectCurrentAncestors,
  selectCurrentNode,
  selectCurrentPath,
  selectCurrentProject,
  selectCurrentSearch,
  selectIsNotFound,
  selectQueryStringAsObject,
  selectRouteEntry,
  selectRouteEntryContentTypeId,
  selectRouteEntryDepends,
  selectRouteEntryEntryId,
  selectRouteEntryID,
  selectRouteEntrySlug,
  selectRouteLoading
} = redux["routing"].selectors;
const {
  selectUser,
  selectUsername,
  selectUserLoggedIn,
  selectUserGroups,
  selectUserMessage,
  selectLoginScreenMode,
  selectPasswordMessage,
  selectChangePasswordMessage,
  selectCaptchaResponse,
  selectCaptchaData,
  selectCaptchaToken,
  selectCaptchaSiteKey
} = redux["user"].selectors;
const {
  selectCommitRef,
  selectBuildNumber,
  selectVersionStatus
} = redux["version"].selectors;
// EXTERNAL MODULE: ./src/app/core/util/ContensisDeliveryApi.js
var ContensisDeliveryApi = __webpack_require__(15);

// EXTERNAL MODULE: ./src/app/core/search/util.js + 2 modules
var util = __webpack_require__(9);

// EXTERNAL MODULE: ./src/app/zengenti-search-package/redux/types.js
var types = __webpack_require__(3);

// EXTERNAL MODULE: ./src/app/zengenti-search-package/redux/actions.js
var actions = __webpack_require__(5);

// EXTERNAL MODULE: ./src/app/zengenti-search-package/redux/selectors.js
var selectors = __webpack_require__(0);

// EXTERNAL MODULE: ./src/app/zengenti-search-package/redux/queries.js + 1 modules
var queries = __webpack_require__(16);

// EXTERNAL MODULE: external "query-string"
var external_query_string_ = __webpack_require__(12);
var external_query_string_default = /*#__PURE__*/__webpack_require__.n(external_query_string_);

// EXTERNAL MODULE: external "jsonpath-mapper"
var external_jsonpath_mapper_ = __webpack_require__(14);
var external_jsonpath_mapper_default = /*#__PURE__*/__webpack_require__.n(external_jsonpath_mapper_);
/* harmony default export */ var json_mapper = (external_jsonpath_mapper_default.a);
// EXTERNAL MODULE: ./src/app/core/util/helpers.js
var helpers = __webpack_require__(13);

// EXTERNAL MODULE: ./src/app/zengenti-search-package/redux/schema.js
var schema = __webpack_require__(1);

// CONCATENATED MODULE: ./src/app/zengenti-search-package/transformations/state-to-searchuri.js







const searchUriTemplate = {
  path: ({
    state,
    facet,
    pageIndex
  }) => {
    const currentFacet = Object(selectors["getSearchContext"])(state) !== schema["Context"].listings && (facet || Object(selectors["getCurrentFacet"])(state));
    const currentPath = selectCurrentPath(state) || '/search';
    const newPath = currentFacet ? `${currentPath}/${currentFacet}` : currentPath;
    if (pageIndex) return `${newPath}/${pageIndex + 1}`;
    return newPath;
  },
  search: ({
    state,
    facet,
    orderBy,
    term
  }) => {
    const searchContext = Object(selectors["getSearchContext"])(state); // Lose stateFilters and currentSearch if a new
    // term is passed via an argument

    const stateFilters = term ? new external_immutable_["List"]([]) : Object(selectors["getSelectedFilters"])(state, facet, searchContext).map(f => f.join(','));
    const currentSearch = !term && state.getIn(['routing', 'location', 'search']);
    const currentQs = Object(helpers["b" /* removeEmptyAttributes */])(external_query_string_default.a.parse(currentSearch));
    if (orderBy) currentQs.orderBy = orderBy;
    const searchTerm = Object(selectors["getSearchTerm"])(state); // Use Immutable's merge to merge the stateFilters with any current Qs
    // to build the new Qs.

    const mergedSearch = Object(helpers["b" /* removeEmptyAttributes */])(Object(external_immutable_["fromJS"])(currentQs).merge(stateFilters).set('term', searchTerm).toJS());
    return external_query_string_default.a.stringify(mergedSearch);
  },
  hash: {
    $path: 'state',
    $formatting: state => state.getIn(['routing', 'location', 'hash'], '').replace('#', '')
  }
};

const mapStateToSearchUri = state => json_mapper(state, searchUriTemplate);

/* harmony default export */ var state_to_searchuri = (mapStateToSearchUri);
// CONCATENATED MODULE: ./src/app/zengenti-search-package/transformations/searchresult-to-state.mapper.js
/* eslint-disable no-console */





const mapEntriesToSearchResults = ({
  mappers,
  mapper,
  context,
  facet
}, items) => {
  const mapperFunc = mapper || mappers.results;
  return items && typeof mapperFunc === 'function' ? mapperFunc(items, facet, context) : [];
};

const facetTemplate = {
  type: () => types["SET_SEARCH_ENTRIES"],
  context: 'action.context',
  facet: 'action.facet',
  mappers: 'action.mappers',
  nextFacet: {
    entries: {
      isLoading: () => false,
      isError: () => false
    },
    featuredEntries: {
      isLoading: () => false,
      isError: () => false
    },
    featuredResults: ({
      action,
      featuredResult
    }) => mapEntriesToSearchResults(action, Object(util["d" /* getItemsFromResult */])(featuredResult)),
    queryDuration: 'result.duration',
    pagingInfo: {
      isLoading: () => false,
      pageCount: {
        $path: 'result.payload.pageCount',
        $default: 0
      },
      totalCount: {
        $path: 'result.payload.totalCount',
        $default: 0
      },
      pageSize: {
        $path: 'result.payload.pageSize',
        $default: 0
      },
      pageIndex: 'pageIndex',
      pagesLoaded: {
        $path: 'action.queryParams',
        $formatting: ({
          pageIndex,
          pagesLoaded
        }) => {
          const loaded = new external_immutable_["List"](pagesLoaded || []);
          const pages = isNaN(loaded.find(l => l == pageIndex)) ? loaded.push(pageIndex) : loaded;
          return pages.toList().sort((a, b) => a - b);
        }
      },
      prevPageIndex: 'action.queryParams.prevPageIndex'
    },
    preloaded: {
      $path: 'preload',
      $default: false
    },
    results: ({
      action,
      pageIndex,
      result,
      prevResults
    }) => {
      const {
        loadMorePaging,
        pagesLoaded,
        prevPageIndex
      } = action.queryParams;
      const results = mapEntriesToSearchResults(action, Object(util["d" /* getItemsFromResult */])(result));
      if (!loadMorePaging) return results; // add a _pageIndex property to the returned results to help us later

      const nextResults = results.map((r, idx) => ({
        _pageIndex: pageIndex,
        _pagePosition: idx,
        ...r
      }));
      const loadedPages = new external_immutable_["List"](pagesLoaded); // if pageIndex is found in loadedPages, we have already loaded this page

      if (!isNaN(loadedPages.find(l => l == pageIndex))) return prevResults; // Determine where we put the results depending on if we
      // are paging forwards, backwards, or doing a new search

      const firstResultSet = pageIndex > prevPageIndex ? prevResults || [] : nextResults;
      const secondResultSet = pageIndex > prevPageIndex ? nextResults : prevResults || [];
      const onlyResultSet = loadedPages.size === 0 ? nextResults : false;
      return onlyResultSet || [...firstResultSet, ...secondResultSet];
    }
  },
  preload: 'action.preload',
  ogState: 'action.ogState',
  debug: 'action.debug'
};
const filterTemplate = {
  type: ({
    type
  }) => type || types["LOAD_FILTERS_COMPLETE"],
  context: 'context',
  facetKey: 'facetKey',
  filterKey: 'filterKey',
  nextFilter: {
    isLoading: () => false,
    isError: ({
      type
    }) => type === types["LOAD_FILTERS_ERROR"],
    items: ({
      payload,
      selectedKeys,
      mapper
    }) => {
      if (payload && (payload.items || payload.children)) {
        const items = (payload.items || payload.children).map(item => {
          item.isSelected = selectedKeys && selectedKeys.includes(item.sys && item.sys.id || item.key);
          return item;
        });
        return mapper(items);
      }

      return [];
    }
  },
  error: {
    $path: 'error',
    $disable: e => !e
  }
};
/* harmony default export */ var searchresult_to_state_mapper = (json_mapper);
// EXTERNAL MODULE: ./src/app/core/schema.js
var core_schema = __webpack_require__(8);

// CONCATENATED MODULE: ./src/app/zengenti-search-package/transformations/filters-to-filterexpression.mapper.js


const filterExpressionMapper = {
  // Expression type: so we can identify how to build the query
  expressionType: ({
    filter
  }) => filter.contentTypeId ? core_schema["c" /* FilterExpressionTypes */].contentType : core_schema["c" /* FilterExpressionTypes */].field,
  // Key: so we can target the query to a specific field
  key: 'filter.fieldId',
  // Value: so we can filter a specific field by an array of values
  // e.g. taxonomy key or contentTypeId array
  value: 'selectedValue',
  operator: 'filter.fieldOperator'
};

const mapFilterToFilterExpression = filter => json_mapper(filter, filterExpressionMapper);

/* harmony default export */ var filters_to_filterexpression_mapper = (mapFilterToFilterExpression);
// CONCATENATED MODULE: ./src/app/zengenti-search-package/transformations/filters-to-filterexpression.js

const mapFiltersToFilterExpression = (filters, selectedFilters) => {
  if (!selectedFilters || Object.keys(selectedFilters).length === 0) return [];
  const filterExpressions = []; // Iterate through the keys in selectedFilters and locate
  // the items that are selected and queryable

  Object.entries(selectedFilters).map(([fkey, selectedValue]) => {
    const filter = filters[fkey];

    if (selectedValue && filter) {
      const selectedItems = filter.items && filter.items.filter(itm => itm.isSelected) || []; // Where we have a value for a selectedFilter
      // and a filter is found for the current key
      // map the filter to a filterExpression object

      const expr = filters_to_filterexpression_mapper({
        filter,
        selectedItems,
        selectedValue
      });
      filterExpressions.push(expr);
    }
  });
  return filterExpressions;
};
// CONCATENATED MODULE: ./src/app/zengenti-search-package/transformations/state-to-queryparams.mapper.js







const queryParamsTemplate = {
  contentTypeIds: root => Object(selectors["getQueryParameter"])(root, 'contentTypeIds', new external_immutable_["List"]([])),
  customWhere: root => Object(selectors["getQueryParameter"])(root, 'customWhere', new external_immutable_["List"]([])),
  dynamicOrderBy: root => Object(selectors["getQueryParameter"])(root, 'dynamicOrderBy', new external_immutable_["List"]([])),
  env: ({
    state,
    facet,
    context
  }) => Object(selectors["getCustomEnv"])(state, facet, context),
  excludeIds: ({
    action: {
      excludeIds
    },
    context,
    state
  }) => {
    // Exclude current route entry id from minilist searches or any supplied ids
    if (excludeIds) return Array.isArray(excludeIds) ? excludeIds : excludeIds.split(',').map(id => id.trim());else if (context === schema["Context"].minilist) {
      const currentEntryId = selectRouteEntryEntryId(state);
      return currentEntryId ? [currentEntryId] : null;
    }
    return null;
  },
  featuredResults: root => Object(selectors["getQueryParameter"])(root, 'featuredResults', null),
  fields: root => Object(selectors["getQueryParameter"])(root, 'fields', new external_immutable_["List"]([])),
  filters: ({
    state,
    facet,
    context
  }) => {
    const stateFilters = Object(selectors["getFilters"])(state, facet, context).toJS();
    const selectedFilters = Object(selectors["getSelectedFilters"])(state, facet, context).toJS(); // Use another mapping function to map the filter parameters for the query

    const filterParams = mapFiltersToFilterExpression(stateFilters, selectedFilters);
    return filterParams;
  },
  internalPageIndex: ({
    action,
    state
  }) => Object(selectors["getPageIndex"])(state, null, action.context),
  internalPaging: root => Object(selectors["getQueryParameter"])(root, 'internalPaging', false),
  linkDepth: root => Object(selectors["getQueryParameter"])(root, 'linkDepth', 0),
  loadMorePaging: root => Object(selectors["getQueryParameter"])(root, 'loadMorePaging', false),
  orderBy: root => Object(selectors["getQueryParameter"])(root, 'orderBy', new external_immutable_["List"]([])),
  pageIndex: root => {
    const {
      action,
      state
    } = root;
    if (Object(selectors["getQueryParameter"])(root, 'internalPaging', false)) return 0;
    if (action.type === types["UPDATE_PAGE_INDEX"]) return action.params.pageIndex;
    return !action.preload ? Object(selectors["getPageIndex"])(state, null, action.context) : 0;
  },
  pageSize: root => Object(selectors["getQueryParameter"])(root, 'pageSize'),
  pagesLoaded: ({
    state,
    facet,
    context
  }) => Object(selectors["getPagesLoaded"])(state, facet, context),
  prevPageIndex: ({
    state,
    facet,
    context
  }) => Object(selectors["getPrevPageIndex"])(state, facet, context),
  projectId: ({
    state,
    facet
  }) => Object(selectors["getFacet"])(state, facet).get('projectId'),
  searchTerm: ({
    state
  }) => Object(selectors["getSearchTerm"])(state),
  selectedFilters: ({
    state,
    facet,
    context
  }) => Object(selectors["getSelectedFilters"])(state, facet, context).map(f => f.join(',')),
  versionStatus: ({
    state
  }) => selectVersionStatus(state),
  weightedSearchFields: root => {
    const wsf = Object(selectors["getQueryParameter"])(root, 'weightedSearchFields', new external_immutable_["List"]([]));
    const deduped = wsf.groupBy(v => v.get('fieldId')).map(v => v.first()).toList();
    return deduped; // return wsf;
  },
  webpageTemplates: root => Object(selectors["getQueryParameter"])(root, 'webpageTemplates', new external_immutable_["List"]([]))
};

const mapStateToQueryParams = sourceJson => Object(external_immutable_["fromJS"])(json_mapper(sourceJson, queryParamsTemplate)).toJS();

/* harmony default export */ var state_to_queryparams_mapper = (mapStateToQueryParams);
// CONCATENATED MODULE: ./src/app/zengenti-search-package/redux/util.js




/**
 * 1, Generates all the parameters required to run the search query.
 * 2, Tells us if we should run the search.
 * @param {object} action
 * @param {ImmutableMap} state
 * @returns [queryParams, runSearch]
 */

const generateQueryParams = (action, state) => {
  const {
    context,
    facet
  } = action; // Map parameters using state and some additional
  // inputs from the action

  const queryParams = state_to_queryparams_mapper({
    context,
    facet,
    action,
    state
  });
  return [queryParams, util_runSearch(action, state, queryParams)];
};
/**
 * Checks if we have already loaded everything we're asking for and tells us to run the search or not
 * @param action
 * @param state
 */

const util_runSearch = (action, state, queryParams) => {
  const {
    context,
    facet,
    ogState = state,
    preload,
    ssr
  } = action;
  let willRun = false;
  const facetIsLoaded = Object(selectors["getIsLoaded"])(state, context);
  const stateParams = Object(selectors["getQueryParams"])(ogState, facet, context).toJS();
  stateParams.pageIndex = Object(selectors["getPageIndex"])(ogState, facet, context);
  stateParams.searchTerm = Object(selectors["getSearchTerm"])(ogState);
  if (context === schema["Context"].facets && ssr || context === schema["Context"].minilist || preload || !facetIsLoaded || filterParamsChanged(action)) willRun = true;else {
    // Don't execute the search if the inbound query params
    // are the same as what we already have in state
    Object.entries(stateParams).forEach(([param, value]) => {
      // console.log(value, queryParams[param]);
      if (JSON.stringify(value) != JSON.stringify(queryParams[param])) {
        //console.log(param, 'setting runSearch to true');
        willRun = true;
      }
    });
  }
  const internalPaging = Object(selectors["getIsInternalPaging"])(ogState, facet, context);

  if (internalPaging && facetIsLoaded) {
    willRun = false;
  }

  return willRun;
};
/**
 * This will tell us if filter parameters have been
 * changed by some external event such as a route change
 * @param action
 * @returns true or false
 */

const filterParamsChanged = (action, state) => {
  const {
    context,
    facet,
    params,
    ogState = state
  } = action;
  const selectedFilters = Object(selectors["getSelectedFilters"])(ogState, facet, context).toJS();
  const paramsChanged = Object.entries(selectedFilters).map(([filterKey, selectedValues]) => {
    const inboundValues = params && params[filterKey] && params[filterKey].split(',') || [];
    if (!Object(helpers["a" /* areArraysEqualSets */])(selectedValues, inboundValues)) return true;
  });
  return paramsChanged.filter(f => f === true).length > 0;
};
/* eslint-disable no-console */

const debugExecuteSearch = (action, state) => {
  const [queryParams, runSearch] = generateQueryParams(action, state);
  console.log('runSearch', runSearch, 'action', action, 'filterParamsChanged', filterParamsChanged(action, state), 'getIsLoaded(state, context)', Object(selectors["getIsLoaded"])(state, action.context));
  const stateParams = Object(selectors["getQueryParams"])(action.ogState || state, action.facet, action.context).toJS();
  stateParams.pageIndex = Object(selectors["getPageIndex"])(action.ogState || state, action.facet, action.context);
  stateParams.searchTerm = Object(selectors["getSearchTerm"])(action.ogState || state);
  console.log(stateParams, queryParams);
  console.log('getSelectedFilters', Object(selectors["getSelectedFilters"])(action.ogState || state, action.facet, action.context).toJS(), 'params', action.params);
};
// CONCATENATED MODULE: ./src/app/zengenti-search-package/transformations/entry-to-filteritem.mapper.js

 // *** FILTER ITEM MAPPING ***
// Base mapping, fields that are the same across all mappings
// to save repeating these elements in every mapper, spread this
// into your discrete mappings

const base = {
  contentTypeId: core_schema["b" /* Fields */].sys.contentTypeId,
  title: 'entryTitle',
  key: 'sys.id',
  path: 'sys.slug',
  isSelected: 'isSelected'
};

const mapEntriesToFilterItems = entries => {
  if (!entries) return [];
  return entries.map(entry => {
    const template = base;

    if (template) {
      return json_mapper(entry, template);
    }

    return entry;
  });
};

/* harmony default export */ var entry_to_filteritem_mapper = (mapEntriesToFilterItems);
// CONCATENATED MODULE: ./src/app/zengenti-search-package/redux/sagas.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchSagas", function() { return searchSagas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRouteFilters", function() { return setRouteFilters; });















const searchSagas = [Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(types["CLEAR_FILTERS"], clearFilters), Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(types["DO_SEARCH"], ensureSearch), Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(types["SET_ROUTE_FILTERS"], loadFilters), Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(types["SET_SEARCH_ENTRIES"], preloadOtherFacets), Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(types["UPDATE_CURRENT_FACET"], updateCurrentFacet), Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(types["UPDATE_CURRENT_TAB"], updateCurrentTab), Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(types["UPDATE_PAGE_INDEX"], updatePageIndex), Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(types["UPDATE_SEARCH_TERM"], updateSearchTerm), Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(types["UPDATE_SORT_ORDER"], updateSortOrder), Object(redux_saga_effects_npm_proxy_esm["takeEvery"])(types["UPDATE_SELECTED_FILTERS"], applySearchFilter)];
/* eslint-disable no-console */

function* setRouteFilters(action) {
  const {
    mappers,
    params,
    listingType,
    debug
  } = action;
  const context = listingType ? schema["Context"].listings : schema["Context"].facets;
  const state = yield Object(redux_saga_effects_npm_proxy_esm["select"])();
  const ssr = Object(selectors["getIsSsr"])(state); // Get current facet from params or state

  let currentFacet = params && params.facet || listingType; // Pick the default facet from initialState

  if (!currentFacet) {
    const tabs = Object(selectors["getSearchTabs"])(state);
    currentFacet = tabs.getIn([0, 'defaultFacet'], new external_immutable_["List"]()).first() || Object(selectors["getFacets"])(state).keySeq().first();
  }

  const nextAction = {
    type: types["SET_ROUTE_FILTERS"],
    context,
    facet: currentFacet,
    mappers,
    params,
    ssr,
    debug
  };
  yield Object(redux_saga_effects_npm_proxy_esm["put"])(nextAction); // Using call instead of triggering from the put
  // to allow this exported saga to continue during SSR

  yield Object(redux_saga_effects_npm_proxy_esm["call"])(ensureSearch, { ...nextAction,
    ogState: state
  });
}

function* loadFilters(action) {
  const {
    facet: facetKey,
    context,
    mappers = {}
  } = action;
  const filtersToLoad = yield Object(redux_saga_effects_npm_proxy_esm["select"])(selectors["getFiltersToLoad"], facetKey, context);

  if (filtersToLoad.size > 0) {
    yield Object(redux_saga_effects_npm_proxy_esm["put"])({
      type: types["LOAD_FILTERS"],
      filtersToLoad,
      facetKey,
      context
    });
    const selectedKeys = yield Object(redux_saga_effects_npm_proxy_esm["select"])(selectors["getSelectedFilters"], facetKey, context);
    const facet = yield Object(redux_saga_effects_npm_proxy_esm["select"])(selectors["getFacet"], facetKey, context);
    const filters = facet.get('filters');
    const projectId = facet.get('projectId');
    const filtersToLoadSagas = filters && filtersToLoad.map(filterKey => {
      return Object(redux_saga_effects_npm_proxy_esm["call"])(loadFilter, {
        facetKey,
        filterKey,
        filter: filters.get(filterKey),
        projectId,
        selectedKeys: selectedKeys.get(filterKey),
        context,
        mapper: mappers.filterItems || entry_to_filteritem_mapper
      });
    }).toJS();
    if (filtersToLoadSagas) yield Object(redux_saga_effects_npm_proxy_esm["all"])(filtersToLoadSagas);
  }
}

function* loadFilter(action) {
  const {
    facetKey,
    filterKey,
    filter,
    projectId,
    selectedKeys,
    context,
    mapper
  } = action;
  const {
    contentTypeId,
    customWhere,
    path
  } = filter;
  const createStateFrom = {
    type: types["LOAD_FILTERS_COMPLETE"],
    context,
    facetKey,
    filterKey,
    selectedKeys,
    mapper
  };

  try {
    if (contentTypeId) {
      const versionStatus = yield Object(redux_saga_effects_npm_proxy_esm["select"])(selectVersionStatus);
      const query = Object(queries["filterQuery"])(Array.isArray(contentTypeId) ? contentTypeId : [contentTypeId], versionStatus, customWhere);
      const payload = yield ContensisDeliveryApi["cachedSearch"].search(query, 0, projectId);
      if (!payload) throw new Error('No payload returned by search');
      if (payload.type == 'error') throw payload;
      createStateFrom.payload = payload;
    }

    if (path) {
      const payload = yield ContensisDeliveryApi["cachedSearch"].getTaxonomyNodeByPath(path, projectId);
      if (!payload) throw new Error(`No payload returned for taxonomy path: '${path}'`);
      if (payload.type == 'error') throw payload;
      createStateFrom.payload = payload;
    }
  } catch (error) {
    createStateFrom.type = types["LOAD_FILTERS_ERROR"];
    createStateFrom.error = error;
  }

  const nextAction = searchresult_to_state_mapper(createStateFrom, filterTemplate);
  yield Object(redux_saga_effects_npm_proxy_esm["put"])(nextAction);
}

function* ensureSearch(action) {
  const {
    context,
    facet,
    debug
  } = action;

  try {
    const state = yield Object(redux_saga_effects_npm_proxy_esm["select"])();
    const [queryParams, runSearch] = generateQueryParams(action, state);
    debug && (debug === true || debug.executeSearch) && debugExecuteSearch(action, state);

    if (runSearch) {
      yield Object(redux_saga_effects_npm_proxy_esm["put"])({
        type: types["EXECUTE_SEARCH"],
        facet,
        context
      });
      yield Object(redux_saga_effects_npm_proxy_esm["call"])(executeSearch, { ...action,
        context,
        facet,
        queryParams,
        debug
      });
    }
  } catch (error) {
    external_loglevel_["error"](...['Error running search saga:', error, error.stack]);
  }
}

function* executeSearch(action) {
  const {
    facet,
    queryParams,
    mappers
  } = action;

  try {
    const state = yield Object(redux_saga_effects_npm_proxy_esm["select"])();
    let result, featuredResult, featuredQuery;
    const customApi = Object(selectors["getCustomApi"])(state, facet);

    if (customApi && mappers.customApi) {
      const apiParams = mappers.customApi(queryParams);
      result.payload = yield Object(util["a" /* callCustomApi */])(customApi, apiParams);
      result.duration = 1;
    } else {
      if (queryParams.featuredResults) {
        featuredQuery = Object(queries["searchQuery"])(queryParams, true);
        featuredResult = yield Object(util["e" /* timedSearch */])(featuredQuery, queryParams.linkDepth, queryParams.projectId, queryParams.env); // eslint-disable-next-line require-atomic-updates

        queryParams.excludeIds = Object(util["d" /* getItemsFromResult */])(featuredResult).map(fi => fi && fi.sys && fi.sys.id);
      }

      const query = Object(queries["searchQuery"])(queryParams);
      result = yield Object(util["e" /* timedSearch */])(query, queryParams.linkDepth, queryParams.projectId, queryParams.env);
    }

    const createStateFrom = {
      action,
      featuredResult,
      pageIndex: queryParams.internalPaging && queryParams.internalPageIndex || queryParams.pageIndex,
      prevResults: Object(selectors["getResults"])(state, facet, action.context),
      result
    };
    const nextAction = searchresult_to_state_mapper(createStateFrom, facetTemplate);
    yield Object(redux_saga_effects_npm_proxy_esm["put"])(nextAction);
    if (!result.payload || result.payload.type == 'error') external_loglevel_["warn"](`Error executing query`);else external_loglevel_["info"](`${types["EXECUTE_SEARCH"]} Got Results payload`);
  } catch (error) {
    external_loglevel_["error"](...['Error running search saga:', error, error.stack]);
  }
}

function* preloadOtherFacets(action) {
  const {
    preload,
    context,
    facet,
    debug
  } = action;
  const state = yield Object(redux_saga_effects_npm_proxy_esm["select"])();
  const currentFacet = Object(selectors["getCurrentFacet"])(state);

  if (!preload && facet == currentFacet && context != schema["Context"].listings) {
    const otherFacets = [...Object(selectors["getFacets"])(state).keys()].filter(f => f != currentFacet);
    yield Object(redux_saga_effects_npm_proxy_esm["all"])(otherFacets.map(preloadFacet => {
      const preloadAction = { ...action,
        facet: preloadFacet,
        preload: true
      };
      const [queryParams, runSearch] = generateQueryParams(preloadAction, state);
      debug && (debug === true || debug.preloadOtherFacets) && debugExecuteSearch(preloadAction, state);
      return runSearch && Object(redux_saga_effects_npm_proxy_esm["call"])(executeSearch, { ...action,
        type: types["EXECUTE_SEARCH_PRELOAD"],
        preload: true,
        facet: preloadFacet,
        queryParams
      });
    }));
  }
}

function* updateCurrentTab(action) {
  const {
    id,
    mappers
  } = action;
  const state = yield Object(redux_saga_effects_npm_proxy_esm["select"])();
  const facets = Object(selectors["getFacets"])(state);
  const tabs = Object(selectors["getSearchTabs"])(state);
  let nextFacet = tabs.getIn([id, 'currentFacet']);
  !nextFacet && facets.map((facet, facetName) => {
    if (facet.get('tabId') === id && tabs.getIn([id, 'defaultFacet']) === facetName) nextFacet = facetName;
  }); // If the next Tab does not have a defaultFacet,
  // take the first facet for that tab

  if (!nextFacet) nextFacet = facets.filter(f => f.get('tabId') === id).keySeq().first();
  yield Object(redux_saga_effects_npm_proxy_esm["put"])(Object(actions["withMappers"])(Object(actions["updateCurrentFacet"])(nextFacet), mappers));
}

function* clearFilters(action) {
  const {
    mappers
  } = action;
  const uri = yield buildUri({}, mappers);
  yield Object(redux_saga_effects_npm_proxy_esm["put"])(Object(actions["navigate"])(uri));
}

function* updateCurrentFacet(action) {
  const {
    facet,
    mappers
  } = action;
  const pageIndex = yield Object(redux_saga_effects_npm_proxy_esm["select"])(selectors["getPageIndex"], facet);
  const uri = yield buildUri({
    facet,
    pageIndex
  }, mappers);
  yield Object(redux_saga_effects_npm_proxy_esm["put"])(Object(actions["navigate"])(uri));
}

function* updateSearchTerm(action) {
  const {
    term,
    mappers
  } = action;
  const uri = yield buildUri({
    term
  }, mappers);
  yield Object(redux_saga_effects_npm_proxy_esm["put"])(Object(actions["navigate"])(uri));
}

function* updateSortOrder(action) {
  const {
    orderBy,
    facet,
    mappers
  } = action;
  const uri = yield buildUri({
    orderBy,
    facet
  }, mappers);
  yield Object(redux_saga_effects_npm_proxy_esm["put"])(Object(actions["navigate"])(uri));
}

function* updatePageIndex(action) {
  const {
    pageIndex,
    mappers
  } = action;
  const uri = yield buildUri({
    pageIndex
  }, mappers);
  yield Object(redux_saga_effects_npm_proxy_esm["put"])(Object(actions["navigate"])(uri));
}

function* applySearchFilter(action) {
  const {
    mappers
  } = action;
  const uri = yield buildUri({}, mappers);
  yield Object(redux_saga_effects_npm_proxy_esm["put"])(Object(actions["navigate"])(uri));
}

function* buildUri({
  facet,
  orderBy,
  pageIndex = 0,
  term
}, mappers) {
  const state = yield Object(redux_saga_effects_npm_proxy_esm["select"])();
  const mapUri = mappers && mappers.navigate || state_to_searchuri;
  const uri = mapUri({
    state,
    facet,
    orderBy,
    pageIndex,
    term
  }); // return uri;

  return `${uri.path}${uri.search && `?${uri.search}` || ''}${uri.hash && `#${uri.hash}` || ''}`;
}

/***/ })
/******/ ]);
});

});

var zengentiSearchPackage$1 = /*@__PURE__*/getDefaultExportFromCjs(zengentiSearchPackage);

export default zengentiSearchPackage$1;
//# sourceMappingURL=search.js.map
