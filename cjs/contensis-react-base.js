'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ContensisDeliveryApi = require('./ContensisDeliveryApi-d63b3d39.js');
var contensisDeliveryApi = require('contensis-delivery-api');
var React = require('react');
var reactRedux = require('react-redux');
var mapJson = require('jsonpath-mapper');
require('reselect');
require('deepmerge');
require('query-string');
var sagas = require('./sagas-4e8b68f0.js');
require('immer');
require('deep-equal');
var contensisCoreApi = require('contensis-core-api');
var urls = require('./urls-6fcaf4c6.js');
require('isomorphic-fetch');
var express = require('express');
var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');
var path = require('path');
var appRootPath = require('app-root-path');
var server$2 = require('react-dom/server');
var reactRouterDom = require('react-router-dom');
var reactRouterConfig = require('react-router-config');
var reactHelmet = require('react-helmet');
var styled = require('styled-components');
var serialize = require('serialize-javascript');
var minifyCssString = require('minify-css-string');
var server$1 = require('@loadable/server');
var lodash = require('lodash');
var _commonjsHelpers = require('./_commonjsHelpers-b3309d7b.js');
var lodashClean = require('lodash-clean');
var reactCookie = require('react-cookie');
var ToJs = require('./ToJs-374a7fbd.js');
var cookiesMiddleware = require('universal-cookie-express');
var version = require('./version-bb4a3418.js');
var App = require('./App-118b2729.js');
var version$1 = require('./version-c2a37225.js');
var selectors = require('./selectors-8e56cc34.js');
var chalk = require('chalk');
require('./CookieConstants-000427db.js');
require('loglevel');
require('@redux-saga/core/effects');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
require('./reducers-ea1b2dc0.js');
require('history');
require('await-to-js');
require('./ChangePassword.container-15acbce2.js');
require('react-hot-loader');
require('./RouteLoader-190ac009.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var mapJson__default = /*#__PURE__*/_interopDefaultLegacy(mapJson);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var httpProxy__default = /*#__PURE__*/_interopDefaultLegacy(httpProxy);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var serialize__default = /*#__PURE__*/_interopDefaultLegacy(serialize);
var minifyCssString__default = /*#__PURE__*/_interopDefaultLegacy(minifyCssString);
var cookiesMiddleware__default = /*#__PURE__*/_interopDefaultLegacy(cookiesMiddleware);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);

/**
 * Util class holds our search results helper boilerplate methods
 */
class Util {
  static GetIds(entries, fieldId) {
    if (fieldId) {
      return entries === null || entries === void 0 ? void 0 : entries.map(e => {
        var _e$fieldId, _e$fieldId2, _e$fieldId2$sys;
        return Array.isArray(e === null || e === void 0 ? void 0 : e[fieldId]) ? e === null || e === void 0 ? void 0 : (_e$fieldId = e[fieldId]) === null || _e$fieldId === void 0 ? void 0 : _e$fieldId.map(f => {
          var _f$sys;
          return f === null || f === void 0 ? void 0 : (_f$sys = f.sys) === null || _f$sys === void 0 ? void 0 : _f$sys.id;
        }) : (e === null || e === void 0 ? void 0 : (_e$fieldId2 = e[fieldId]) === null || _e$fieldId2 === void 0 ? void 0 : (_e$fieldId2$sys = _e$fieldId2.sys) === null || _e$fieldId2$sys === void 0 ? void 0 : _e$fieldId2$sys.id) || '';
      }).flat();
    }
    return entries === null || entries === void 0 ? void 0 : entries.map(e => {
      var _e$sys;
      return (e === null || e === void 0 ? void 0 : (_e$sys = e.sys) === null || _e$sys === void 0 ? void 0 : _e$sys.id) || '';
    });
  }
  static GetItems(result) {
    return this.GetResults(result) ? result.items : [];
  }
  static GetResults(result) {
    if (result !== null && result !== void 0 && result.items) {
      return result;
    } else {
      return null;
    }
  }
}
const mergeResults = (results, parentResults, replaceContentTypeIds, linkFieldId) => results.map(r => {
  if (replaceContentTypeIds.some(c => c === r.sys.contentTypeId)) {
    const resolvedParent = parentResults === null || parentResults === void 0 ? void 0 : parentResults.find(e => {
      var _e$linkFieldId;
      return (_e$linkFieldId = e[linkFieldId]) === null || _e$linkFieldId === void 0 ? void 0 : _e$linkFieldId.some(l => {
        var _l$sys;
        return ((_l$sys = l.sys) === null || _l$sys === void 0 ? void 0 : _l$sys.id) === r.sys.id;
      });
    });
    if (resolvedParent) return {
      ...resolvedParent,
      ...r,
      entryTitle: resolvedParent.entryTitle,
      entryDescription: resolvedParent.entryDescription,
      sys: resolvedParent.sys,
      originalSys: r.sys
    };else return r;
  }
  return r;
}).filter(r => r);

/* eslint-disable no-console */
/**
 * Builds our complete Delivery API Query object from a set of provided arguments
 * @param queryParams
 * @returns Delivery API Query
 */
const searchQuery = ({
  assetTypes,
  contentTypeIds,
  customWhere,
  fields,
  filters,
  idFilters = [],
  sharedFilters = [],
  pageSize,
  pageIndex = 0,
  orderBy,
  searchTerm,
  versionStatus = 'published',
  webpageTemplates,
  weightedSearchFields
}) => {
  const expressions$1 = [...sagas.defaultExpressions(versionStatus), ...sagas.contentTypeIdExpression(contentTypeIds, webpageTemplates, assetTypes), ...sagas.customWhereExpressions(customWhere), ...sagas.filterExpressions(filters), ...sagas.filterExpressions(idFilters), ...((sharedFilters === null || sharedFilters === void 0 ? void 0 : sharedFilters.length) > 0 ? [contensisCoreApi.Op.or(...sagas.filterExpressions(sharedFilters, true))] : []), ...sagas.termExpressions(searchTerm || '', weightedSearchFields || [])];
  const query = new contensisCoreApi.Query(...expressions$1);
  query.orderBy = sagas.orderByExpression(orderBy || []);
  if (fields && fields.length > 0) {
    query.fields = fields;
  }

  // (query as any).includeArchived = true;
  // (query as any).includeDeleted = true;
  query.pageIndex = pageIndex;
  query.pageSize = pageSize;
  return query;
};
const appendSearchQueryFilters = (query, idFilters) => {
  query.where.addRange(sagas.filterExpressions(idFilters));
};
const finalQuery = ({
  assetTypes,
  contentTypeIds,
  fields,
  filters,
  idFilters,
  sharedFilters,
  pageSize,
  pageIndex,
  orderBy,
  searchTerm,
  versionStatus = 'published',
  webpageTemplates,
  weightedSearchFields
}, children) => {
  const expressions$1 = [...sagas.defaultExpressions(versionStatus), contensisCoreApi.Op.or(contensisCoreApi.Op.and(...sagas.contentTypeIdExpression(contentTypeIds, webpageTemplates, assetTypes), ...sagas.filterExpressions(filters), ...sagas.filterExpressions(idFilters || []), ...(sharedFilters !== null && sharedFilters !== void 0 && sharedFilters.length ? [contensisCoreApi.Op.or(...sagas.filterExpressions(sharedFilters || [])
  // Op.and(
  //   ...sharedFilters.map(sf =>
  //     Op.not(exp.fieldExpression(sf.key, true, 'exists')[0])
  //   ),
  //   ...exp.filterExpressions(idFilters)
  // )
  )] : [])), ...children.map(child => contensisCoreApi.Op.and(...sagas.contentTypeIdExpression(child.contentTypeIds, child.webpageTemplates, child.assetTypes), ...sagas.filterExpressions(child.sharedFilters || []), ...sagas.filterExpressions(child.idFilters || [])))), ...sagas.termExpressions(searchTerm || '', weightedSearchFields || [])];
  const query = new contensisCoreApi.Query(...expressions$1);
  query.orderBy = sagas.orderByExpression(orderBy || []);
  if (fields && fields.length > 0) {
    query.fields = fields;
  }

  // (query as any).includeArchived = true;
  // (query as any).includeDeleted = true;
  query.pageIndex = pageIndex || 0;
  query.pageSize = pageSize;
  return query;
};

/**
 * Create a filter expression from a provided filters configuration object
 * and populate them based on the presence of that key in params, filter
 * out any filter keys that do not have a value set in params
 * @param f filters configuration from any level
 * @param params request.query object from Express middleware
 * @returns FilterExpression[] we can use to use with searchQuery function
 */
const makeFilterExpressions = (f, params) => {
  const expressions = [];
  for (const [paramKey, filterConfig] of Object.entries(f)) {
    var _params$paramKey;
    const filterValues = (_params$paramKey = params[paramKey]) === null || _params$paramKey === void 0 ? void 0 : _params$paramKey.split(',');
    if (typeof filterValues !== 'undefined') expressions.push({
      key: typeof filterConfig === 'object' ? filterConfig.fieldId : filterConfig,
      values: filterValues,
      fieldOperator: typeof filterConfig === 'object' && filterConfig.fieldOperator ? filterConfig.fieldOperator : 'equalTo',
      logicOperator: typeof filterConfig === 'object' && filterConfig.logicOperator ? filterConfig.logicOperator : 'or'
    });
  }
  return expressions;
};
const makeDerivedIdsFilterExpression = (prevFieldId, entries, ownIds = false, alwaysApplyFilter = false) => {
  const previouslyDerivedIdsFilter = [];
  const prevResultIds = Util.GetIds(entries);
  if (prevFieldId && (prevResultIds === null || prevResultIds === void 0 ? void 0 : prevResultIds.length) > 0) previouslyDerivedIdsFilter.push({
    key: ownIds ? 'sys.id' : `${prevFieldId}.sys.id`,
    values: prevResultIds,
    fieldOperator: 'in',
    logicOperator: 'or'
  });else if (alwaysApplyFilter) previouslyDerivedIdsFilter.push({
    key: 'intended-dud',
    values: ['1'],
    fieldOperator: 'in',
    logicOperator: 'or'
  });
  return previouslyDerivedIdsFilter;
};
const resolveParentEntries = async (parentContentTypeIds, replaceContentTypeIds, parentFieldId, results, params, debug) => {
  // Build variables from query config to use in our Delivery API Query
  const previousIdsFilter = makeDerivedIdsFilterExpression(parentFieldId, results);
  const query = searchQuery({
    contentTypeIds: parentContentTypeIds,
    idFilters: previousIdsFilter
  });
  query.fields = params.fields ? [...JSON.parse(params.fields), parentFieldId] : [];
  if (debug) console.log(`\nResolve parent entries query: \n${JSON.stringify(query.toJSON()).substring(0, 1000)}`);
  const parentResults = await ContensisDeliveryApi.cachedSearch.searchUsingPost(query, Number(params.linkDepth || 0), params.projectId);
  return mergeResults(results, Util.GetItems(parentResults), replaceContentTypeIds, parentFieldId);
};

/* eslint-disable no-console */
class QueryLevelResults {
  constructor({
    level: _level,
    contentTypeIds,
    linkFields,
    filters,
    sharedFilters,
    returnEntries,
    resolveFirstParent,
    params: _params = {},
    parent: _parent,
    debug = false
  }) {
    this.level = void 0;
    this.contentTypeIds = void 0;
    this.linkFieldIds = void 0;
    this.linkFields = void 0;
    this.filters = void 0;
    this.sharedFilters = void 0;
    this.returnEntries = void 0;
    this.resolveFirstParent = void 0;
    this.validatedLinks = [];
    this.parent = void 0;
    this.children = [];
    this.runFirstQuery = void 0;
    this.runFinalQuery = void 0;
    this.params = {};
    this.debug = void 0;
    this.firstQuery = new contensisDeliveryApi.Query();
    this.firstResults = {};
    this.finalQuery = new contensisDeliveryApi.Query();
    this.finalResults = {};
    this.AddChild = ({
      child
    }) => {
      this.children.push(child);
    };
    this.RunFirstQuery = async () => {
      const {
        firstQuery: query,
        params,
        parent,
        runFirstQuery
      } = this;
      if (parent !== null && parent !== void 0 && parent.validatedLinks.length) {
        // add any idFilters derived from parent query results
        appendSearchQueryFilters(query, makeFilterExpressions(Object.fromEntries(parent.validatedLinks.map(vl => [vl.linkFieldId, {
          fieldId: `sys.id`
        }])), Object.fromEntries(parent.validatedLinks.map(vl => [vl.linkFieldId, vl.entryIds.join(',') || `no ids from parent ${parent.level}`]))));
      }
      if (runFirstQuery) {
        if (this.debug) console.log(`\nLevel ${this.level} - First query: \n${JSON.stringify(query.toJSON()).substring(0, 1000)}`);
        this.firstResults = await ContensisDeliveryApi.cachedSearch.searchUsingPost(query, 0, params.projectId);

        // mapResultsToValidatedLinks
        for (const linkFieldId of this.linkFieldIds) {
          this.validatedLinks.push({
            contentTypeId: this.linkFields[linkFieldId].contentTypeId || '',
            linkFieldId,
            entryIds: Util.GetIds(this.firstResults.items, linkFieldId)
          });
        }
      }
    };
    this.RunFinalQuery = async () => {
      const {
        level,
        children,
        finalQuery: query,
        params,
        runFinalQuery
      } = this;
      if (!children.some(c => c.returnEntries)) {
        const firstChild = children === null || children === void 0 ? void 0 : children[0];
        // add any idFilters derived from child query results
        if (firstChild) appendSearchQueryFilters(query, makeFilterExpressions(Object.fromEntries(firstChild.validatedLinks.map(vl => [vl.linkFieldId, {
          fieldId: `${vl.linkFieldId}.sys.id`
        }])), Object.fromEntries(firstChild.validatedLinks.map(vl => [vl.linkFieldId, vl.entryIds.join(',') || `no ids from child ${firstChild.level}`]))));
      }
      if (level === 0 && this.returnEntries) {
        // This is the final query to be run and response returned to the caller
        // Only this bit cares about linkDepth, fields and pagination parameters
        query.fields = JSON.parse(params.fields || '[]');
        query.pageSize = params.pageSize;
        query.pageIndex = params.pageIndex;
        // query.orderBy = params.orderBy;
      }

      if (runFinalQuery) {
        if (this.debug) console.log(`\nLevel ${this.level} - Final query: \n${JSON.stringify(query.toJSON()).substring(0, 1000)}`);
        this.finalResults = await ContensisDeliveryApi.cachedSearch.searchUsingPost(query, Number(params.linkDepth) || 0, params.projectId);
        if (this.parent) this.parent.runFinalQuery = true;

        // mapResultsToValidatedLinks
        for (const linkFieldId of ((_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.linkFieldIds) || []) {
          var _this$parent, _this$parent2;
          this.validatedLinks.push({
            contentTypeId: ((_this$parent2 = this.parent) === null || _this$parent2 === void 0 ? void 0 : _this$parent2.linkFields[linkFieldId].contentTypeId) || '',
            linkFieldId,
            entryIds: Util.GetIds(this.finalResults.items)
          });
        }
      }
    };
    this.GetResultsEntries = () => {
      var _finalResults$items;
      const {
        finalResults,
        firstResults
      } = this;
      return finalResults !== null && finalResults !== void 0 && (_finalResults$items = finalResults.items) !== null && _finalResults$items !== void 0 && _finalResults$items.length ? finalResults.items : firstResults.items;
    };
    this.GetResults = () => {
      const {
        finalResults,
        firstResults
      } = this;
      return typeof (finalResults === null || finalResults === void 0 ? void 0 : finalResults.totalCount) !== 'undefined' ? finalResults : firstResults;
    };
    this.level = _level;
    this.contentTypeIds = contentTypeIds;
    this.linkFields = linkFields;
    this.linkFieldIds = Object.keys(linkFields).map(fId => fId);
    this.filters = filters;
    this.sharedFilters = sharedFilters;
    this.returnEntries = typeof returnEntries === 'undefined' ? _level === 0 : returnEntries;
    this.resolveFirstParent = resolveFirstParent || false;
    this.params = _params;
    this.parent = _parent;
    this.debug = debug;
    this.runFirstQuery = Object.keys(_params).some(p => Object.keys(filters).includes(p) || Object.keys(sharedFilters).includes(p));
    this.runFinalQuery = Object.keys(_params).some(p => Object.keys(filters).includes(p) || Object.keys(sharedFilters).includes(p));
    this.firstQuery = searchQuery({
      contentTypeIds,
      filters: makeFilterExpressions(filters, _params),
      sharedFilters: makeFilterExpressions(sharedFilters, _params),
      // idFilters: parent?.validatedLinks
      //   ? makeFilterExpressions(parent.validatedLinks, params)
      //   : [], // these dont exist yet
      fields: ['sys.id', ...this.linkFieldIds],
      pageSize: 2000,
      searchTerm: _params.term,
      versionStatus: _params.versionStatus
    });
    this.finalQuery = searchQuery({
      contentTypeIds,
      filters: makeFilterExpressions(filters, _params),
      sharedFilters: makeFilterExpressions(sharedFilters, _params),
      fields: JSON.parse(_params.fields || '[]'),
      pageIndex: _level === 0 ? Number(_params.pageIndex) : 0,
      pageSize: _level === 0 ? Number(_params.pageSize) : 2000,
      searchTerm: _params.term,
      versionStatus: _params.versionStatus
    });
  }
}

/* eslint-disable no-console */
class LinkDepthSearchService {
  constructor({
    contentTypeId: _contentTypeId = '',
    filters: _filters = {},
    sharedFilters: _sharedFilters = {},
    linkFields: _linkFields = {},
    params: _params,
    debug = false
  }) {
    this.contentTypeIds = void 0;
    this.filters = void 0;
    this.sharedFilters = void 0;
    this.linkFields = void 0;
    this.params = void 0;
    this.debug = void 0;
    this.queryLevels = void 0;
    this.DoSearch = async () => {
      // Run queries "top-down" through each level of `linkField`
      for (const queryLevel of this.queryLevels) {
        await queryLevel.RunFirstQuery();
      }

      // Run queries "bottom-up" through each level of `linkField`
      for (const queryLevel of [...this.queryLevels].reverse()) {
        await queryLevel.RunFinalQuery();
      }

      // Run a final query that will aggregate the results from all levels
      // adding all levels to the query that have `returnEntries` set true
      return await this.RunFinalQueries();
    };
    this.RunFinalQueries = async () => {
      const finalQueryLevels = this.queryLevels.filter(ql => ql.level > 0 && ql.returnEntries || ql.level === 0 && ql.returnEntries !== false);

      // Decide if we need a further final query if any child level(s) have had `returnEntries` set to true
      if (finalQueryLevels.length > 1 || finalQueryLevels.length === 1 && finalQueryLevels[0].level !== 0) {
        var _params$orderBy;
        // Build final query
        const {
          contentTypeIds,
          filters,
          sharedFilters,
          params
        } = this;
        const derivedIds = finalQueryLevels[0].children.filter(ql => !ql.returnEntries).map(ql => ql.validatedLinks).flat() || [];
        const derivedIdFilters = derivedIds.map(vl => makeFilterExpressions({
          [vl.linkFieldId]: {
            fieldId: `${vl.linkFieldId}.sys.id`
          }
        }, {
          [vl.linkFieldId]: vl.entryIds.join(',') || 'no results for filter'
        })).flat() || [];
        // This is the final query to be run and response returned to the caller
        // Only this bit cares about linkDepth, fields and pagination parameters
        const query = finalQuery({
          contentTypeIds,
          filters: makeFilterExpressions(filters, params),
          sharedFilters: makeFilterExpressions(sharedFilters, params),
          idFilters: derivedIdFilters,
          fields: params.fields ? [...JSON.parse(params.fields), ...finalQueryLevels.map(l => {
            var _l$parent;
            return ((_l$parent = l.parent) === null || _l$parent === void 0 ? void 0 : _l$parent.linkFieldIds) || [];
          }).flat()] : [],
          orderBy: (_params$orderBy = params.orderBy) === null || _params$orderBy === void 0 ? void 0 : _params$orderBy.split(','),
          pageIndex: Number(params.pageIndex) || 0,
          pageSize: typeof Number(params.pageSize) === 'number' ? Number(params.pageSize) : 25,
          searchTerm: params.term,
          versionStatus: params.versionStatus
        }, (finalQueryLevels === null || finalQueryLevels === void 0 ? void 0 : finalQueryLevels[0].children.filter(ql => ql.returnEntries).map(ql => {
          var _ql$parent, _ql$parent2;
          const entriesAtLevel = ql.GetResultsEntries() || ((_ql$parent = ql.parent) === null || _ql$parent === void 0 ? void 0 : _ql$parent.GetResultsEntries());
          const previousIdsFilter = ql.returnEntries || !!ql.children.some(qc => qc.returnEntries) ? (_ql$parent2 = ql.parent) === null || _ql$parent2 === void 0 ? void 0 : _ql$parent2.linkFieldIds.map(fieldId => makeDerivedIdsFilterExpression(fieldId, entriesAtLevel, true, ql.runFinalQuery)).flat() : [];
          return {
            contentTypeIds: ql.contentTypeIds,
            filters: makeFilterExpressions(ql.filters, params),
            sharedFilters: makeFilterExpressions(ql.sharedFilters, params),
            idFilters: previousIdsFilter
          };
        })) || []);
        if (this.debug) console.log(`\nFinal query: ${derivedIds.reduce((accumulator, object) => accumulator + object.entryIds.length, 0)} derived ids \n${JSON.stringify(query.toJSON()).substring(0, 1000)}`);
        const finalQueryResult = await ContensisDeliveryApi.cachedSearch.searchUsingPost(query, Number(params.linkDepth) || 0, params.projectId);

        // Resolve any parent entries

        const resolveParentLevels = finalQueryLevels.filter(ql => ql.resolveFirstParent);
        let entries = finalQueryResult.items;
        for (const resolveParents of resolveParentLevels) {
          var _resolveParents$paren, _resolveParents$paren2;
          entries = await resolveParentEntries(((_resolveParents$paren = resolveParents.parent) === null || _resolveParents$paren === void 0 ? void 0 : _resolveParents$paren.contentTypeIds) || [], resolveParents.contentTypeIds, ((_resolveParents$paren2 = resolveParents.parent) === null || _resolveParents$paren2 === void 0 ? void 0 : _resolveParents$paren2.linkFieldIds[0]) || 'unknown', finalQueryResult.items,
          // or entries?
          this.params, this.debug);
        }
        return {
          ...finalQueryResult,
          items: entries
        };
      } else {
        var _this$queryLevels$fin;
        if (this.debug) console.log(`\nNo further queries required\n`);
        return (_this$queryLevels$fin = this.queryLevels.find(ql => ql.level === 0)) === null || _this$queryLevels$fin === void 0 ? void 0 : _this$queryLevels$fin.GetResults();
      }
    };
    this.InitQueryLevels = () => {
      const createChildQueryLevels = (linkFields, parentQueryLevel, level = 1) => {
        return Object.entries(linkFields).map(([, {
          contentTypeId = '',
          filters = {},
          linkFields = {},
          resolveFirstParent,
          returnEntries,
          sharedFilters = {}
        }]) => {
          const thisLevel = new QueryLevelResults({
            level,
            contentTypeIds: Array.isArray(contentTypeId) ? contentTypeId : [contentTypeId],
            filters: Object.fromEntries(Object.entries(filters).map(([fKey, fVal]) => [fKey, typeof fVal === 'string' ? {
              fieldId: fVal
            } : fVal])),
            sharedFilters: Object.fromEntries(Object.entries(sharedFilters).map(([fKey, fVal]) => [fKey, typeof fVal === 'string' ? {
              fieldId: fVal
            } : fVal])),
            linkFields,
            parent: parentQueryLevel,
            params,
            resolveFirstParent,
            returnEntries,
            debug: this.debug
          });
          parentQueryLevel.AddChild({
            child: thisLevel
          });
          return [thisLevel, ...createChildQueryLevels(linkFields, thisLevel, level + 1)];
        }).flat();
      };
      const {
        contentTypeIds,
        filters,
        sharedFilters,
        linkFields,
        params
      } = this;
      const firstLevel = new QueryLevelResults({
        level: 0,
        contentTypeIds,
        filters: Object.fromEntries(Object.entries(filters).map(([fKey, fVal]) => [fKey, typeof fVal === 'string' ? {
          fieldId: fVal
        } : fVal])),
        sharedFilters: Object.fromEntries(Object.entries(sharedFilters).map(([fKey, fVal]) => [fKey, typeof fVal === 'string' ? {
          fieldId: fVal
        } : fVal])),
        linkFields,
        params,
        debug: this.debug
      });
      const queryLevels = [firstLevel, ...createChildQueryLevels(linkFields, firstLevel)];
      // return queryLevels;

      // If we are only returning entries from level 0
      // we can skip running the first query and finalQuery will suffice
      if (queryLevels.find(ql => ql.returnEntries && ql.level !== 0)) return queryLevels;else return queryLevels.map(ql => {
        ql.runFirstQuery = false;
        // ql.runFinalQuery = false;
        return ql;
      });
    };
    this.contentTypeIds = Array.isArray(_contentTypeId) ? _contentTypeId : [_contentTypeId];
    this.filters = _filters;
    this.sharedFilters = _sharedFilters;
    this.linkFields = _linkFields;
    this.params = _params;
    this.debug = debug;
    this.queryLevels = this.InitQueryLevels();
  }
}

/**
 * Make a LinkDepth api at the uri specified in middlewareConfig.
 * The api supports a GET request and specified filters are supplied as query-string parameters.
 * The response should be a normal Delivery API response.
 * @param app Express app instance
 * @param middlewareConfig Middleware configuration that represents the content types we want to search within, any filters that are required and any linkFields we wish to search within to derive a set of search results from the entries that contain the linkFields. Each key inside of linkFields represents another "linkDepth" of entries and we can specify all the same contentTypeId, filters, and linkFields of their own. There is no currently no limit on how deep these linkFields can go
 * @returns Returns nothing if uri, contentTypeId or linkFields is not set in middlewareConfig
 */
const makeLinkDepthApi = (app, middlewareConfig) => {
  const {
    uri,
    contentTypeId,
    linkFields
  } = middlewareConfig;
  if (!contentTypeId || !linkFields || !uri) return;
  app.get(uri, makeLinkDepthMiddleware(middlewareConfig));
};

/** Create a content type hierarchy from supplied config and produces
 * a RequestHandler function to serve our Express middleware */
const makeLinkDepthMiddleware = ({
  contentTypeId,
  filters = {},
  sharedFilters = {},
  linkFields,
  debug
}) => {
  try {
    // The runtime express request handler
    const linkDepthMiddleware = async (req, res) => {
      try {
        // Short cache duration copied from canterbury project
        urls.setCachingHeaders(res, {
          cacheControl: 'private',
          surrogateControl: '10'
        });

        // Gather all params from the request, we will use them at the right query levels later
        const params = Object.fromEntries([...Object.entries(req.params), ...Object.entries(req.query)].map(([k, v]) => [k, v === null || v === void 0 ? void 0 : v.toString()]));
        const result = await new LinkDepthSearchService({
          contentTypeId,
          linkFields,
          filters,
          sharedFilters,
          params,
          debug
        }).DoSearch();
        res.json(result);
      } catch (error) {
        // This is a runtime error encountered when processing a given request
        console.error(error);
        res.statusCode = 500;
        res.json(error);
      }
    };
    return linkDepthMiddleware;
  } catch (error) {
    // This will be an error building the middleware
    // we can only serve what the error was as the request handler instead
    console.error(error);
    const errorMiddleware = async (req, res) => {
      res.statusCode = 500;
      res.json(JSON.stringify(error));
    };
    return errorMiddleware;
  }
};

const servers$1 = SERVERS; /* global SERVERS */
const project = PROJECT; /* global PROJECT */
const alias$1 = ALIAS; /* global ALIAS */
const deliveryApiHostname = urls.url(alias$1, project).api;
const assetProxy = httpProxy__default["default"].createProxyServer();
const deliveryProxy = httpProxy__default["default"].createProxyServer();
const reverseProxies = (app, reverseProxyPaths = []) => {
  deliveryApiProxy(deliveryProxy, app);
  app.all(reverseProxyPaths, (req, res) => {
    const target = req.hostname.indexOf('preview-') || req.hostname.indexOf('preview.') || req.hostname === 'localhost' ? servers$1.previewIis || servers$1.iis : servers$1.iis;
    assetProxy.web(req, res, {
      target,
      changeOrigin: true
    });
    assetProxy.on('error', e => {
      /* eslint-disable no-console */
      console.log(`Proxy Request for ${req.path} HostName:${req.hostname} failed with ${e}`);
      /* eslint-enable no-console */
    });
  });
};

const deliveryApiProxy = (apiProxy, app) => {
  // This is just here to stop cors requests on localhost. In Production this is mapped using varnish.
  app.all(['/api/delivery/*', '/api/image/*'], (req, res) => {
    /* eslint-disable no-console */
    console.log(`Proxying api request to ${servers$1.alias}`);
    apiProxy.web(req, res, {
      target: deliveryApiHostname,
      changeOrigin: true
    });
    apiProxy.on('error', e => {
      /* eslint-disable no-console */
      console.log(`Proxy request for ${req.path} HostName:${req.hostname} failed with ${e}`);
      /* eslint-enable no-console */
    });
  });
};

const CacheDuration = {
  200: '3600',
  404: '5',
  static: '31536000',
  // Believe it or not these two max ages are the same in runtime
  expressStatic: '31557600h' // Believe it or not these two max ages are the same in runtime
};

const getCacheDuration = (status = 200) => {
  if (status > 400) return CacheDuration[404];
  return CacheDuration[200];
};

const replaceStaticPath = (str, staticFolderPath = 'static') => str.replace(/static\//g, `${staticFolderPath}/`);

const bundleManipulationMiddleware = ({
  appRootPath,
  maxage,
  staticFolderPath,
  staticRoutePath
}) => (req, res, next) => {
  const filename = path__default["default"].basename(req.path);
  const modernBundle = filename.endsWith('.mjs');
  const legacyBundle = filename.endsWith('.js');
  if ((legacyBundle || modernBundle) && filename.startsWith('runtime.')) {
    const jsRuntimeLocation = path__default["default"].resolve(appRootPath, `dist/${staticFolderPath}/${modernBundle ? 'modern/js' : 'legacy/js'}/${filename}`);
    try {
      const jsRuntimeBundle = fs__default["default"].readFileSync(jsRuntimeLocation, 'utf8');
      const modifiedBundle = replaceStaticPath(jsRuntimeBundle, staticRoutePath);
      if (maxage) res.set('Cache-Control', `public, max-age=${maxage}`);
      res.type('.js').send(modifiedBundle);
      return;
    } catch (readError) {
      // eslint-disable-next-line no-console
      console.log(`Unable to find js runtime bundle at '${jsRuntimeLocation}'`, readError);
      next();
    }
  } else {
    next();
  }
};

/**
 *
 * @param { appRootPath: string; maxage: number; staticFolderPath: string, startupScriptFilename: string } args
 * @returns Response | next()
 * A middleware function to resolve /dist/static/startup.js under a supplied startupScriptFilename variable
 */
const resolveStartupMiddleware = ({
  appRootPath,
  maxage,
  staticFolderPath,
  startupScriptFilename
}) => async (req, res, next) => {
  if (startupScriptFilename !== 'startup.js' && req.path === `/${startupScriptFilename}`) {
    let startupFileLocation = '';
    try {
      const startupFilePaths = [`dist/static/startup.js`, `dist/${staticFolderPath}/startup.js`];
      let startupFilePath = '';
      startupFilePaths.forEach(async testPath => {
        try {
          fs__default["default"].accessSync(testPath);
          startupFilePath = testPath;
        } catch (ex) {
          // Do nothing
        }
      });
      startupFileLocation = path__default["default"].resolve(appRootPath, startupFilePath);
      if (maxage) res.set('Cache-Control', `public, max-age=${maxage}`);
      res.sendFile(startupFileLocation);
    } catch (sendFileError) {
      // eslint-disable-next-line no-console
      console.log(`Unable to send file startup.js at '${startupFileLocation}'`, sendFileError);
      next();
    }
  } else {
    next();
  }
};

// Serving static assets
const staticAssets = (app, {
  appRootPath: appRootPath$1 = appRootPath.path,
  scripts = {},
  startupScriptFilename = 'startup.js',
  staticFolderPath = 'static',
  staticRoutePath = 'static',
  staticRoutePaths = []
}) => {
  app.use([`/${staticRoutePath}`, ...staticRoutePaths.map(p => `/${p}`), `/${staticFolderPath}`], bundleManipulationMiddleware({
    appRootPath: appRootPath$1,
    // these maxage values are different in config but the same in runtime,
    // this one is the true value in seconds
    maxage: CacheDuration.static,
    staticFolderPath,
    staticRoutePath
  }), resolveStartupMiddleware({
    appRootPath: appRootPath$1,
    maxage: CacheDuration.static,
    startupScriptFilename: scripts.startup || startupScriptFilename,
    staticFolderPath
  }),
  // eslint-disable-next-line import/no-named-as-default-member
  express__default["default"].static(`dist/${staticFolderPath}`, {
    // these maxage values are different in config but the same in runtime,
    // this one is somehow converted and should end up being the same as CacheDuration.static
    maxAge: CacheDuration.expressStatic
  }));
};

const servers = SERVERS; /* global SERVERS */
const projects = PROJECTS; /* global PROJECTS */

const DisplayStartupConfiguration = config => {
  /* eslint-disable no-console */
  console.log();
  console.log(`Configured servers:
`, JSON.stringify(servers, null, 2));
  console.log();
  console.log(`Configured projects:
`, JSON.stringify(projects, null, 2));
  console.log();
  console.log('Reverse proxy paths: ', JSON.stringify(config.reverseProxyPaths, null, 2));
  console.log();
  if (config.staticFolderPath) console.log(`Serving static assets from: "/dist/${config.staticFolderPath}/"`);
  /* eslint-enable no-console */
};

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear$1;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq$2(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq$2;

var eq$1 = eq_1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf$4;

var assocIndexOf$3 = _assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf$3(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete$1;

var assocIndexOf$2 = _assocIndexOf;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet$1;

var assocIndexOf$1 = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas$1;

var assocIndexOf = _assocIndexOf;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet$1;

var listCacheClear = _listCacheClear,
    listCacheDelete = _listCacheDelete,
    listCacheGet = _listCacheGet,
    listCacheHas = _listCacheHas,
    listCacheSet = _listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$4(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype['delete'] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;

var _ListCache = ListCache$4;

var ListCache$3 = _ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear$1() {
  this.__data__ = new ListCache$3;
  this.size = 0;
}

var _stackClear = stackClear$1;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function stackDelete$1(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete$1;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function stackGet$1(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet$1;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function stackHas$1(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas$1;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof _commonjsHelpers.commonjsGlobal == 'object' && _commonjsHelpers.commonjsGlobal && _commonjsHelpers.commonjsGlobal.Object === Object && _commonjsHelpers.commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$8 = freeGlobal || freeSelf || Function('return this')();

var _root = root$8;

var root$7 = _root;

/** Built-in value references. */
var Symbol$3 = root$7.Symbol;

var _Symbol = Symbol$3;

var Symbol$2 = _Symbol;

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$c.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto$b = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$b.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol$1 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$4(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$4;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$5(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$5;

var baseGetTag$3 = _baseGetTag,
    isObject$4 = isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$2(value) {
  if (!isObject$4(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$3(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$2;

var root$6 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$6['__core-js_shared__'];

var _coreJsData = coreJsData$1;

var coreJsData = _coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked$1;

/** Used for built-in method references. */

var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource$2;

var isFunction$1 = isFunction_1,
    isMasked = _isMasked,
    isObject$3 = isObject_1,
    toSource$1 = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$a = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$8).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$3(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}

var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

var baseIsNative = _baseIsNative,
    getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$7;

var getNative$6 = _getNative,
    root$5 = _root;

/* Built-in method references that are verified to be native. */
var Map$3 = getNative$6(root$5, 'Map');

var _Map = Map$3;

var getNative$5 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$4 = getNative$5(Object, 'create');

var _nativeCreate = nativeCreate$4;

var nativeCreate$3 = _nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}

var _hashClear = hashClear$1;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete$1;

var nativeCreate$2 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$7.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

var nativeCreate$1 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$6.call(data, key);
}

var _hashHas = hashHas$1;

var nativeCreate = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

var _hashSet = hashSet$1;

var hashClear = _hashClear,
    hashDelete = _hashDelete,
    hashGet = _hashGet,
    hashHas = _hashHas,
    hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear;
Hash$1.prototype['delete'] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;

var _Hash = Hash$1;

var Hash = _Hash,
    ListCache$2 = _ListCache,
    Map$2 = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$2 || ListCache$2),
    'string': new Hash
  };
}

var _mapCacheClear = mapCacheClear$1;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable$1;

var isKeyable = _isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData$4;

var getMapData$3 = _getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete$1;

var getMapData$2 = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}

var _mapCacheGet = mapCacheGet$1;

var getMapData$1 = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}

var _mapCacheHas = mapCacheHas$1;

var getMapData = _getMapData;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet$1;

var mapCacheClear = _mapCacheClear,
    mapCacheDelete = _mapCacheDelete,
    mapCacheGet = _mapCacheGet,
    mapCacheHas = _mapCacheHas,
    mapCacheSet = _mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype['delete'] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;

var _MapCache = MapCache$1;

var ListCache$1 = _ListCache,
    Map$1 = _Map,
    MapCache = _MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet$1;

var ListCache = _ListCache,
    stackClear = _stackClear,
    stackDelete = _stackDelete,
    stackGet = _stackGet,
    stackHas = _stackHas,
    stackSet = _stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack$1(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack$1.prototype.clear = stackClear;
Stack$1.prototype['delete'] = stackDelete;
Stack$1.prototype.get = stackGet;
Stack$1.prototype.has = stackHas;
Stack$1.prototype.set = stackSet;

var _Stack = Stack$1;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */

function arrayEach$1(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach$1;

var getNative$4 = _getNative;

var defineProperty$1 = (function() {
  try {
    var func = getNative$4(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty$1;

var defineProperty = _defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue$2(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue$2;

var baseAssignValue$1 = _baseAssignValue,
    eq = eq_1;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue$2(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$5.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue$1(object, key, value);
  }
}

var _assignValue = assignValue$2;

var assignValue$1 = _assignValue,
    baseAssignValue = _baseAssignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject$4(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue$1(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject$4;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

function baseTimes$1(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes$1;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$5(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$5;

var baseGetTag$2 = _baseGetTag,
    isObjectLike$4 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments$1(value) {
  return isObjectLike$4(value) && baseGetTag$2(value) == argsTag$2;
}

var _baseIsArguments = baseIsArguments$1;

var baseIsArguments = _baseIsArguments,
    isObjectLike$3 = isObjectLike_1;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments$1 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$3(value) && hasOwnProperty$4.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments_1 = isArguments$1;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray$3 = Array.isArray;

var isArray_1 = isArray$3;

var isBuffer$2 = {exports: {}};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */

function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

(function (module, exports) {
var root = _root,
    stubFalse = stubFalse_1;

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;
}(isBuffer$2, isBuffer$2.exports));

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$1(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex$1;

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength$2(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength$2;

var baseGetTag$1 = _baseGetTag,
    isLength$1 = isLength_1,
    isObjectLike$2 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] =
typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] =
typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] =
typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] =
typedArrayTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray$1(value) {
  return isObjectLike$2(value) &&
    isLength$1(value.length) && !!typedArrayTags[baseGetTag$1(value)];
}

var _baseIsTypedArray = baseIsTypedArray$1;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

function baseUnary$3(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary$3;

var _nodeUtil = {exports: {}};

(function (module, exports) {
var freeGlobal = _freeGlobal;

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
}(_nodeUtil, _nodeUtil.exports));

var baseIsTypedArray = _baseIsTypedArray,
    baseUnary$2 = _baseUnary,
    nodeUtil$2 = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray$1 = nodeIsTypedArray ? baseUnary$2(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray_1 = isTypedArray$1;

var baseTimes = _baseTimes,
    isArguments = isArguments_1,
    isArray$2 = isArray_1,
    isBuffer$1 = isBuffer$2.exports,
    isIndex = _isIndex,
    isTypedArray = isTypedArray_1;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$2(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer$1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$3.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys$2;

/** Used for built-in method references. */

var objectProto$4 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype$3(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

  return value === proto;
}

var _isPrototype = isPrototype$3;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */

function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg$2;

var overArg$1 = _overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys$1 = overArg$1(Object.keys, Object);

var _nativeKeys = nativeKeys$1;

var isPrototype$2 = _isPrototype,
    nativeKeys = _nativeKeys;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys$1(object) {
  if (!isPrototype$2(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$2.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys$1;

var isFunction = isFunction_1,
    isLength = isLength_1;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike$2(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

var isArrayLike_1 = isArrayLike$2;

var arrayLikeKeys$1 = _arrayLikeKeys,
    baseKeys = _baseKeys,
    isArrayLike$1 = isArrayLike_1;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$3(object) {
  return isArrayLike$1(object) ? arrayLikeKeys$1(object) : baseKeys(object);
}

var keys_1 = keys$3;

var copyObject$3 = _copyObject,
    keys$2 = keys_1;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign$1(object, source) {
  return object && copyObject$3(source, keys$2(source), object);
}

var _baseAssign = baseAssign$1;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn$1;

var isObject$2 = isObject_1,
    isPrototype$1 = _isPrototype,
    nativeKeysIn = _nativeKeysIn;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn$1(object) {
  if (!isObject$2(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$1(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$1.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn$1;

var arrayLikeKeys = _arrayLikeKeys,
    baseKeysIn = _baseKeysIn,
    isArrayLike = isArrayLike_1;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn$3(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

var keysIn_1 = keysIn$3;

var copyObject$2 = _copyObject,
    keysIn$2 = keysIn_1;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn$1(object, source) {
  return object && copyObject$2(source, keysIn$2(source), object);
}

var _baseAssignIn = baseAssignIn$1;

var _cloneBuffer = {exports: {}};

(function (module, exports) {
var root = _root;

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
}(_cloneBuffer, _cloneBuffer.exports));

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */

function copyArray$1(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray$1;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

function arrayFilter$1(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter$1;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */

function stubArray$2() {
  return [];
}

var stubArray_1 = stubArray$2;

var arrayFilter = _arrayFilter,
    stubArray$1 = stubArray_1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var _getSymbols = getSymbols$3;

var copyObject$1 = _copyObject,
    getSymbols$2 = _getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols$1(source, object) {
  return copyObject$1(source, getSymbols$2(source), object);
}

var _copySymbols = copySymbols$1;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */

function arrayPush$2(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush$2;

var overArg = _overArg;

/** Built-in value references. */
var getPrototype$2 = overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype$2;

var arrayPush$1 = _arrayPush,
    getPrototype$1 = _getPrototype,
    getSymbols$1 = _getSymbols,
    stubArray = stubArray_1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush$1(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};

var _getSymbolsIn = getSymbolsIn$2;

var copyObject = _copyObject,
    getSymbolsIn$1 = _getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn$1(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}

var _copySymbolsIn = copySymbolsIn$1;

var arrayPush = _arrayPush,
    isArray$1 = isArray_1;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys$2;

var baseGetAllKeys$1 = _baseGetAllKeys,
    getSymbols = _getSymbols,
    keys$1 = keys_1;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys$1(object) {
  return baseGetAllKeys$1(object, keys$1, getSymbols);
}

var _getAllKeys = getAllKeys$1;

var baseGetAllKeys = _baseGetAllKeys,
    getSymbolsIn = _getSymbolsIn,
    keysIn$1 = keysIn_1;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn$1(object) {
  return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn$1;

var getNative$3 = _getNative,
    root$4 = _root;

/* Built-in method references that are verified to be native. */
var DataView$1 = getNative$3(root$4, 'DataView');

var _DataView = DataView$1;

var getNative$2 = _getNative,
    root$3 = _root;

/* Built-in method references that are verified to be native. */
var Promise$2 = getNative$2(root$3, 'Promise');

var _Promise = Promise$2;

var getNative$1 = _getNative,
    root$2 = _root;

/* Built-in method references that are verified to be native. */
var Set$1 = getNative$1(root$2, 'Set');

var _Set = Set$1;

var getNative = _getNative,
    root$1 = _root;

/* Built-in method references that are verified to be native. */
var WeakMap$1 = getNative(root$1, 'WeakMap');

var _WeakMap = WeakMap$1;

var DataView = _DataView,
    Map = _Map,
    Promise$1 = _Promise,
    Set = _Set,
    WeakMap = _WeakMap,
    baseGetTag = _baseGetTag,
    toSource = _toSource;

/** `Object#toString` result references. */
var mapTag$3 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$3 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag$3 = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag$3(new DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (Map && getTag$3(new Map) != mapTag$3) ||
    (Promise$1 && getTag$3(Promise$1.resolve()) != promiseTag) ||
    (Set && getTag$3(new Set) != setTag$3) ||
    (WeakMap && getTag$3(new WeakMap) != weakMapTag$1)) {
  getTag$3 = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$3;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$3;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag$3;

/** Used for built-in method references. */

var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray$1(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

var _initCloneArray = initCloneArray$1;

var root = _root;

/** Built-in value references. */
var Uint8Array$1 = root.Uint8Array;

var _Uint8Array = Uint8Array$1;

var Uint8Array = _Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer$3(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer$3;

var cloneArrayBuffer$2 = _cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView$1;

/** Used to match `RegExp` flags from their coerced string values. */

var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp$1;

var Symbol = _Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol$1;

var cloneArrayBuffer$1 = _cloneArrayBuffer;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray$1;

var cloneArrayBuffer = _cloneArrayBuffer,
    cloneDataView = _cloneDataView,
    cloneRegExp = _cloneRegExp,
    cloneSymbol = _cloneSymbol,
    cloneTypedArray = _cloneTypedArray;

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$1 = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$1:
      return cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return cloneTypedArray(object, isDeep);

    case mapTag$2:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$2:
      return new Ctor;

    case symbolTag$1:
      return cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag$1;

var isObject$1 = isObject_1;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate$1 = (function() {
  function object() {}
  return function(proto) {
    if (!isObject$1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate$1;

var baseCreate = _baseCreate,
    getPrototype = _getPrototype,
    isPrototype = _isPrototype;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject$1(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

var _initCloneObject = initCloneObject$1;

var getTag$2 = _getTag,
    isObjectLike$1 = isObjectLike_1;

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap$1(value) {
  return isObjectLike$1(value) && getTag$2(value) == mapTag$1;
}

var _baseIsMap = baseIsMap$1;

var baseIsMap = _baseIsMap,
    baseUnary$1 = _baseUnary,
    nodeUtil$1 = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap$1 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;

var isMap_1 = isMap$1;

var getTag$1 = _getTag,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var setTag$1 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet$1(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}

var _baseIsSet = baseIsSet$1;

var baseIsSet = _baseIsSet,
    baseUnary = _baseUnary,
    nodeUtil = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

var isSet_1 = isSet$1;

var Stack = _Stack,
    arrayEach = _arrayEach,
    assignValue = _assignValue,
    baseAssign = _baseAssign,
    baseAssignIn = _baseAssignIn,
    cloneBuffer = _cloneBuffer.exports,
    copyArray = _copyArray,
    copySymbols = _copySymbols,
    copySymbolsIn = _copySymbolsIn,
    getAllKeys = _getAllKeys,
    getAllKeysIn = _getAllKeysIn,
    getTag = _getTag,
    initCloneArray = _initCloneArray,
    initCloneByTag = _initCloneByTag,
    initCloneObject = _initCloneObject,
    isArray = isArray_1,
    isBuffer = isBuffer$2.exports,
    isMap = isMap_1,
    isObject = isObject_1,
    isSet = isSet_1,
    keys = keys_1,
    keysIn = keysIn_1;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG$1 = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone$1(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG$1,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone$1;

var baseClone = _baseClone;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

var cloneDeep_1 = cloneDeep;

var stringifyAttributes = ((attributes = {}) => Object.entries(attributes).map(([key, value], idx) => `${idx !== 0 ? ' ' : ''}${key}${value ? `="${value}"` : ''}`).join(' '));

/* eslint-disable no-console */

/**
 * Web Application Response handler, sends a prepared express js response
 * with the supplied content sending in the specified manner
 * @param {response} request express js request object
 * @param {response} response express js response object
 * @param {string | object} content the content to send in the response body
 * @param {"send" | "json" | "end"} send the response function to call e.g res.send() res.json() res.end()
 */
const handleResponse = (request, response, content, send = 'send') => {
  // console.log('---', response.statusCode, '---');
  response[send](content);
};

const readFileSync = path => fs__default["default"].readFileSync(path, 'utf8');
const loadableBundleData = ({
  stats,
  templates
}, staticRoutePath, build) => {
  const bundle = {};
  try {
    bundle.stats = stats ? JSON.parse(readFileSync(stats.replace('/target', build ? `/${build}` : ''))) : null;
  } catch (ex) {
    // console.info(ex);
    bundle.stats = null;
  }
  try {
    bundle.templates = {
      templateHTML: replaceStaticPath(readFileSync(templates.html.replace('/target', build ? `/${build}` : '')), staticRoutePath),
      templateHTMLStatic: replaceStaticPath(readFileSync(templates.static.replace('/target', build ? `/${build}` : '')), staticRoutePath),
      templateHTMLFragment: replaceStaticPath(readFileSync(templates.fragment.replace('/target', build ? `/${build}` : '')), staticRoutePath)
    };
  } catch (ex) {
    // console.info(ex);
    bundle.templates = null;
  }
  return bundle;
};
const loadableChunkExtractors = () => {
  const commonLoadableExtractor = new server$1.ChunkExtractor({
    stats: {}
  });
  try {
    let modern;
    let legacy;
    try {
      modern = new server$1.ChunkExtractor({
        entrypoints: ['app'],
        namespace: 'modern',
        statsFile: path__default["default"].resolve('dist/modern/loadable-stats.json')
      });
    } catch (e) {
      console.info('@loadable/server modern ChunkExtractor not available');
    }
    try {
      legacy = new server$1.ChunkExtractor({
        entrypoints: ['app'],
        namespace: 'legacy',
        statsFile: path__default["default"].resolve('dist/legacy/loadable-stats.json')
      });
    } catch (e) {
      console.info('@loadable/server legacy ChunkExtractor not available');
    }
    commonLoadableExtractor.addChunk = chunk => {
      var _modern, _legacy, _legacy2;
      (_modern = modern) === null || _modern === void 0 ? void 0 : _modern.addChunk(chunk);
      if (typeof ((_legacy = legacy) === null || _legacy === void 0 ? void 0 : _legacy.stats.assetsByChunkName[chunk]) !== 'undefined') (_legacy2 = legacy) === null || _legacy2 === void 0 ? void 0 : _legacy2.addChunk(chunk);
    };
    return {
      commonLoadableExtractor,
      modern,
      legacy
    };
  } catch (e) {
    console.info('@loadable/server no ChunkExtractor available');
    return {
      commonLoadableExtractor
    };
  }
};
const getBundleData = (config, staticRoutePath) => {
  const bundleData = {
    default: loadableBundleData(config, staticRoutePath),
    legacy: loadableBundleData(config, staticRoutePath, 'legacy'),
    modern: loadableBundleData(config, staticRoutePath, 'modern')
  };
  if (!bundleData.default || Object.keys(bundleData.default || {}).length === 0) bundleData.default = bundleData.legacy || bundleData.modern;
  return bundleData;
};

// export const buildBundleTags = (
//   bundles,
//   differentialBundles = false,
//   staticRoutePath = 'static',
//   attributes = ''
// ) => {
//   // Take the bundles returned from Loadable.Capture
//   const bundleTags = bundles
//     .filter(b => b)
//     .map(bundle => {
//       if (bundle.publicPath.includes('/modern/'))
//         return differentialBundles
//           ? `<script ${attributes} type="module" src="${replaceStaticPath(
//               bundle.publicPath,
//               staticRoutePath
//             )}"></script>`
//           : null;
//       return `<script ${attributes}${
//         differentialBundles ? ' nomodule' : ''
//       } src="${replaceStaticPath(
//         bundle.publicPath,
//         staticRoutePath
//       )}"></script>`;
//     })
//     .filter(f => f);

//   return bundleTags;
// };

const getBundleTags = (loadableExtractor, scripts, staticRoutePath = 'static') => {
  let startupTag = '';
  // Add the static startup script to the bundleTags
  if (scripts !== null && scripts !== void 0 && scripts.startup) startupTag = `<script ${stringifyAttributes(scripts.attributes)} src="/${staticRoutePath}/${scripts.startup}"></script>`;

  // Get the script tags from their respective extractor instances
  if (loadableExtractor) {
    var _loadableExtractor$le, _loadableExtractor$mo;
    const legacyScriptTags = (_loadableExtractor$le = loadableExtractor.legacy) === null || _loadableExtractor$le === void 0 ? void 0 : _loadableExtractor$le.getScriptTags({
      nomodule: 'nomodule'
    });
    const modernScriptTags = (_loadableExtractor$mo = loadableExtractor.modern) === null || _loadableExtractor$mo === void 0 ? void 0 : _loadableExtractor$mo.getScriptTags({
      type: 'module'
    });
    const scriptTags = `${startupTag}${legacyScriptTags || ''}${modernScriptTags || ''}`.replace(/"\/static\//g, `"/${staticRoutePath}/`);
    return scriptTags;
  }
  return startupTag;
};

const alias = ALIAS; /* global ALIAS */

const addStandardHeaders = (state, response, packagejson, groups) => {
  if (state) {
    try {
      const routingSurrogateKeys = selectors.selectSurrogateKeys(state);
      console.info(`[addStandardHeaders] ${routingSurrogateKeys.length} surrogate keys for ${response.req.url}`);
      // Check length of surrogate keys and prevent potential header overflow
      // errors in prod by replacing with `any-update` header that will indiscriminately
      // invalidate the SSR page cache when any content is updated
      const surrogateKeys = routingSurrogateKeys.length >= 2000 ? `${alias}_any-update` : routingSurrogateKeys.join(' ');
      const surrogateKeyHeader = `${packagejson.name}-app ${surrogateKeys}`;
      response.setHeader('surrogate-key', surrogateKeyHeader);
      addVarnishAuthenticationHeaders(state, response, groups);
      response.setHeader('surrogate-control', `max-age=${getCacheDuration(response.statusCode)}`);
    } catch (e) {
      console.info('[addStandardHeaders] Error adding headers', e.message);
    }
  }
};
const addVarnishAuthenticationHeaders = (state, response, groups = {}) => {
  if (state) {
    try {
      const stateEntry = selectors.selectRouteEntry(state);
      const project = selectors.selectCurrentProject(state);
      const {
        globalGroups,
        allowedGroups
      } = groups;
      // console.info(globalGroups, allowedGroups);
      let allGroups = Array.from(globalGroups && globalGroups[project] || {});
      if (stateEntry && selectors.getImmutableOrJS(stateEntry, ['authentication', 'isLoginRequired']) && allowedGroups && allowedGroups[project]) {
        allGroups = [...allGroups, ...allowedGroups[project]];
      }
      response.header('x-contensis-viewer-groups', allGroups.join('|'));
    } catch (e) {
      console.info('Error adding authentication header', e);
    }
  }
};

const getVersionInfo = staticFolderPath => {
  try {
    const versionData = fs__default["default"].readFileSync(`dist/${staticFolderPath}/version.json`, 'utf8');
    const versionInfo = JSON.parse(versionData);
    return versionInfo;
  } catch (ex) {
    console.error(`Unable to read from "version.json"`, ex);
    return {};
  }
};

/* eslint-disable no-console */

// Default exception types to add event listeners for
const handleDefaultEvents = ['uncaughtException', 'unhandledRejection'];
const unhandledExceptionHandler = (handleExceptions = handleDefaultEvents) => {
  const exceptionTypes = Array.isArray(handleExceptions) ? handleExceptions : handleExceptions === false ? [] : handleDefaultEvents;
  for (const type of exceptionTypes) {
    process.on(type, err => {
      if (err && err instanceof Error) {
        // Print a message to inform admins and developers the error should not be ignored
        console.log(`${`[contensis-react-base] ❌ ${chalk__default["default"].red.bold(`${type} - ${err.message}`)}`}`);
        console.log(chalk__default["default"].gray` - you are seeing this because we have tried to prevent the app from completely crashing - you should not ignore this problem`);
        // Log the error to server console
        console.error(err);
      }
    });
  }
};

const webApp = (app, ReactApp, config) => {
  const {
    stateType = 'immutable',
    routes,
    withReducers,
    withSagas,
    withEvents,
    packagejson,
    scripts = {},
    staticFolderPath = 'static',
    startupScriptFilename,
    allowedGroups,
    globalGroups,
    disableSsrRedux,
    enableSsrCookies,
    handleResponses,
    handleExceptions = true
  } = config;
  const staticRoutePath = config.staticRoutePath || staticFolderPath;
  const bundleData = getBundleData(config, staticRoutePath);
  const attributes = stringifyAttributes(scripts.attributes);
  scripts.startup = scripts.startup || startupScriptFilename;
  const responseHandler = typeof handleResponses === 'function' ? handleResponses : handleResponse;
  if (handleExceptions !== false) unhandledExceptionHandler(handleExceptions); // Create `process.on` event handlers for unhandled exceptions (Node v15+)

  const versionInfo = getVersionInfo(staticFolderPath);
  app.get('/*', cookiesMiddleware__default["default"](), async (request, response) => {
    const {
      url
    } = request;
    const matchedStaticRoute = () => reactRouterConfig.matchRoutes(routes.StaticRoutes, request.path);
    const isStaticRoute = () => matchedStaticRoute().length > 0;
    const staticRoute = isStaticRoute() && matchedStaticRoute()[0];

    // Allow certain routes to avoid SSR
    const onlyDynamic = staticRoute && staticRoute.route.ssr === false;
    const onlySSR = staticRoute && staticRoute.route.ssrOnly === true;
    const normaliseQs = q => q && q.toLowerCase() === 'true' ? true : false;

    // Determine functional params from QueryString and set access methods
    const accessMethod = mapJson__default["default"](request.query, {
      DYNAMIC: ({
        dynamic
      }) => normaliseQs(dynamic) || onlyDynamic,
      REDUX: ({
        redux
      }) => normaliseQs(redux),
      FRAGMENT: ({
        fragment
      }) => normaliseQs(fragment),
      STATIC: ({
        static: value
      }) => normaliseQs(value) || onlySSR
    });
    const context = {};
    // Track the current statusCode via the response object
    response.status(200);

    // Create a store (with a memory history) from our current url
    const store = await version.createStore(withReducers, {}, App.history({
      initialEntries: [url]
    }), stateType);

    // dispatch any global and non-saga related actions before calling our JSX
    const versionStatus = ContensisDeliveryApi.deliveryApi.getServerSideVersionStatus(request);

    // In server-side blocks world, the hostname requested by the client resides in the x-orig-host header
    // Because of this, we prioritize x-orig-host when setting our hostname
    const hostname = request.headers['x-orig-host'] || request.hostname;
    console.info(`Request for ${request.path} hostname: ${hostname} versionStatus: ${versionStatus}`);
    store.dispatch(version$1.setVersionStatus(versionStatus));
    store.dispatch(version$1.setVersion(versionInfo.commitRef, versionInfo.buildNo));
    const project = App.pickProject(hostname, request.query);
    const groups = allowedGroups && allowedGroups[project];
    store.dispatch(selectors.setCurrentProject(project, groups, hostname));
    const loadableExtractor = loadableChunkExtractors();
    const ssrCookies = enableSsrCookies ?
    // these cookies are managed by the cookiesMiddleware and contain listeners
    // when cookies are read or written in ssr can be added to the `set-cookie` response header
    request.universalCookies :
    // this is a stub cookie collection so cookie methods can be used in code
    new ToJs.Cookies();
    const jsx = /*#__PURE__*/React__default["default"].createElement(server$1.ChunkExtractorManager, {
      extractor: loadableExtractor.commonLoadableExtractor
    }, /*#__PURE__*/React__default["default"].createElement(reactCookie.CookiesProvider, {
      cookies: ssrCookies
    }, /*#__PURE__*/React__default["default"].createElement(reactRedux.Provider, {
      store: store
    }, /*#__PURE__*/React__default["default"].createElement(reactRouterDom.StaticRouter, {
      context: context,
      location: url
    }, /*#__PURE__*/React__default["default"].createElement(ReactApp, {
      routes: routes,
      withEvents: withEvents
    })))));
    const {
      templateHTML = '',
      templateHTMLFragment = '',
      templateHTMLStatic = ''
    } = bundleData.default.templates || bundleData.legacy.templates || {};

    // Serve a blank HTML page with client scripts to load the app in the browser
    if (accessMethod.DYNAMIC) {
      // Dynamic doesn't need sagas
      server$2.renderToString(jsx);

      // Dynamic page render has only the necessary bundles to start up the app
      // and does not include any react-loadable code-split bundles
      const bundleTags = getBundleTags(loadableExtractor, scripts, staticRoutePath);
      const isDynamicHints = `<script ${attributes}>window.versionStatus = "${versionStatus}"; window.isDynamic = true;</script>`;
      const responseHtmlDynamic = templateHTML.replace('{{TITLE}}', '').replace('{{SEO_CRITICAL_METADATA}}', '').replace('{{CRITICAL_CSS}}', '').replace('{{APP}}', '').replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', isDynamicHints);
      // Dynamic pages always return a 200 so we can run
      // the app and serve up all errors inside the client
      response.setHeader('Surrogate-Control', `max-age=${getCacheDuration(200)}`);
      responseHandler(request, response, responseHtmlDynamic);
    }

    // Render the JSX server side and send response as per access method options
    if (!accessMethod.DYNAMIC) {
      store.runSaga(App.rootSaga(withSagas)).toPromise().then(() => {
        var _selectCurrentSearch;
        const sheet = new styled.ServerStyleSheet();
        const html = server$2.renderToString(sheet.collectStyles(jsx));
        const helmet = reactHelmet.Helmet.renderStatic();
        reactHelmet.Helmet.rewind();
        const htmlAttributes = helmet.htmlAttributes.toString();
        let title = helmet.title.toString();
        const metadata = helmet.meta.toString().concat(helmet.base.toString()).concat(helmet.link.toString()).concat(helmet.script.toString()).concat(helmet.noscript.toString());
        if (context.url) {
          return response.redirect(context.statusCode || 302, context.url);
        }
        const reduxState = store.getState();
        const styleTags = sheet.getStyleTags();

        // After running rootSaga there should be an additional react-loadable
        // code-split bundles for any page components as well as core app bundles
        const bundleTags = getBundleTags(loadableExtractor, scripts, staticRoutePath);
        let clonedState = lodashClean.buildCleaner({
          isArray: lodash.identity,
          isBoolean: lodash.identity,
          isDate: lodash.identity,
          isFunction: lodash.noop,
          isNull: lodash.identity,
          isPlainObject: lodash.identity,
          isString: lodash.identity,
          isUndefined: lodash.noop
        })(cloneDeep_1(reduxState));
        // These keys are used for preparing server-side response headers only
        // and are not required in the client at all except for debugging ssr
        if (!((_selectCurrentSearch = selectors.selectCurrentSearch(reduxState)) !== null && _selectCurrentSearch !== void 0 && _selectCurrentSearch.includes('includeApiCalls'))) {
          if (stateType === 'immutable') clonedState = clonedState.deleteIn(['routing'], 'apiCalls').deleteIn(['routing'], 'surrogateKeys');else {
            delete clonedState.routing.apiCalls;
            delete clonedState.routing.surrogateKeys;
          }
        }
        // Reset user state to prevent user details from being cached in SSR
        if (stateType === 'immutable') {
          clonedState = clonedState.delete('user');
        } else delete clonedState.user;
        let serialisedReduxData = serialize__default["default"](clonedState);
        if (context.statusCode !== 404) {
          // For a request that returns a redux state object as a response
          if (accessMethod.REDUX) {
            addStandardHeaders(reduxState, response, packagejson, {
              allowedGroups,
              globalGroups
            });
            responseHandler(request, response, serialisedReduxData, 'json');
            return true;
          }
          if (!disableSsrRedux) {
            // window.versionStatus is not strictly required here and is added to support cases
            // where a consumer may not be using the contensisVersionStatus in redux and calling
            // the `getClientSideVersionStatus()` method directly
            serialisedReduxData = `<script ${attributes}>window.versionStatus = "${versionStatus}"; window.REDUX_DATA = ${serialisedReduxData}</script>`;
          }
        }
        if ((context.statusCode || 200) >= 404) {
          accessMethod.STATIC = true;
        }

        // Responses
        let responseHTML = '';
        if (context.statusCode === 404) title = '<title>404 page not found</title>';

        // Static page served as a fragment
        if (accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = minifyCssString__default["default"](styleTags) + html;
        }

        // Page fragment served with client scripts and redux data that hydrate the app client side
        if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTMLFragment.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString__default["default"](styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', serialisedReduxData);
        }

        // Full HTML page served statically
        if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = templateHTMLStatic.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString__default["default"](styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', '');
        }

        // Full HTML page served with client scripts and redux data that hydrate the app client side
        if (!accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTML.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', styleTags).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', serialisedReduxData);
        }

        // Set response.status from React StaticRouter
        if (typeof context.statusCode === 'number') response.status(context.statusCode);
        addStandardHeaders(reduxState, response, packagejson, {
          allowedGroups,
          globalGroups
        });
        try {
          // If react-helmet htmlAttributes are being used,
          // replace the html tag with those attributes sepcified
          // e.g. (lang, dir etc.)
          if (htmlAttributes) {
            responseHTML = responseHTML.replace(/<html?.+?>/, `<html ${htmlAttributes}>`);
          }
          responseHandler(request, response, responseHTML);
        } catch (err) {
          console.info(err.message);
        }
      }).catch(err => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
        console.info(err);
        response.status(500);
        responseHandler(request, response, `Error occurred: <br />${err.stack} <br />${JSON.stringify(err)}`);
      });
      server$2.renderToString(jsx);
      store.close();
    }
  });
};

const app = express__default["default"]();
const server = http__default["default"].createServer(app);
const start = (ReactApp, config, ServerFeatures) => {
  global.PACKAGE_JSON = config.packagejson;
  global.DISABLE_SSR_REDUX = config.disableSsrRedux;
  global.PROXY_DELIVERY_API = config.proxyDeliveryApi;
  global.REVERSE_PROXY_PATHS = Object(config.reverseProxyPaths);
  app.disable('x-powered-by');
  // Output some information about the used build/startup configuration
  DisplayStartupConfiguration(config);
  ServerFeatures(app);
  // Set-up local proxy for images from cms, and delivery api requests
  // to save doing rewrites and extra code
  reverseProxies(app, config.reverseProxyPaths);
  staticAssets(app, config);
  webApp(app, ReactApp, config);
  app.on('ready', async () => {
    server.listen(3001, () => {
      console.info(`HTTP server is listening @ port 3001`);
      setTimeout(function () {
        app.emit('app_started');
      }, 500);
    });
    app.on('stop', () => {
      server.close(function () {
        console.info('GoodBye :(');
        process.exit();
      });
    });
  });
};
var internalServer = {
  app,
  apiProxy: deliveryProxy,
  server,
  start
};

exports.ReactApp = App.AppRoot;
exports["default"] = internalServer;
exports.linkDepthApi = makeLinkDepthApi;
//# sourceMappingURL=contensis-react-base.js.map
