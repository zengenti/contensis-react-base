'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SSRContext = require('./SSRContext-DpnwQ2te.js');
var contensisDeliveryApi = require('contensis-delivery-api');
var React = require('react');
var reactRedux = require('react-redux');
var mapJson = require('jsonpath-mapper');
require('reselect');
require('deepmerge');
require('query-string');
var sagas = require('./sagas-DFdRjqSX.js');
require('immer');
require('deep-equal');
var contensisCoreApi = require('contensis-core-api');
var urls = require('./urls-DVIwGZmd.js');
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
var _commonjsHelpers = require('./_commonjsHelpers-BJu3ubxk.js');
var lodashClean = require('lodash-clean');
var reactCookie = require('react-cookie');
var CookieHelper_class = require('./CookieHelper.class-CxeVo9EP.js');
var cookiesMiddleware = require('universal-cookie-express');
var store = require('./store-BihH67lI.js');
var App = require('./App-B9Sxnrpa.js');
var version = require('./version-Cg79mdPg.js');
var selectors = require('./selectors-wCs5fHD4.js');
var chalk = require('chalk');
require('loglevel');
require('@redux-saga/core/effects');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
require('history');
require('await-to-js');
require('./version-CM-bJ62L.js');
require('./ChangePassword.container-Dup9_na7.js');
require('./ToJs-C9jwV7YB.js');
require('react-hot-loader');
require('./RouteLoader-zFf-UX6s.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var mapJson__default = /*#__PURE__*/_interopDefault(mapJson);
var express__default = /*#__PURE__*/_interopDefault(express);
var http__default = /*#__PURE__*/_interopDefault(http);
var httpProxy__default = /*#__PURE__*/_interopDefault(httpProxy);
var fs__default = /*#__PURE__*/_interopDefault(fs);
var path__default = /*#__PURE__*/_interopDefault(path);
var serialize__default = /*#__PURE__*/_interopDefault(serialize);
var minifyCssString__default = /*#__PURE__*/_interopDefault(minifyCssString);
var cookiesMiddleware__default = /*#__PURE__*/_interopDefault(cookiesMiddleware);
var chalk__default = /*#__PURE__*/_interopDefault(chalk);

/**
 * Util class holds our search results helper boilerplate methods
 */
class Util {
  static GetIds(entries, fieldId) {
    if (fieldId) {
      return entries === null || entries === void 0 ? void 0 : entries.map(e => {
        var _e$fieldId, _e$fieldId2;
        return Array.isArray(e === null || e === void 0 ? void 0 : e[fieldId]) ? e === null || e === void 0 || (_e$fieldId = e[fieldId]) === null || _e$fieldId === void 0 ? void 0 : _e$fieldId.map(f => {
          var _f$sys;
          return f === null || f === void 0 || (_f$sys = f.sys) === null || _f$sys === void 0 ? void 0 : _f$sys.id;
        }) : (e === null || e === void 0 || (_e$fieldId2 = e[fieldId]) === null || _e$fieldId2 === void 0 || (_e$fieldId2 = _e$fieldId2.sys) === null || _e$fieldId2 === void 0 ? void 0 : _e$fieldId2.id) || '';
      }).flat();
    }
    return entries === null || entries === void 0 ? void 0 : entries.map(e => {
      var _e$sys;
      return (e === null || e === void 0 || (_e$sys = e.sys) === null || _e$sys === void 0 ? void 0 : _e$sys.id) || '';
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
  const parentResults = await SSRContext.cachedSearch.searchUsingPost(query, Number(params.linkDepth || 0), params.projectId);
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
    this.validatedLinks = [];
    this.children = [];
    this.params = {};
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
        this.firstResults = await SSRContext.cachedSearch.searchUsingPost(query, 0, params.projectId);

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
        this.finalResults = await SSRContext.cachedSearch.searchUsingPost(query, Number(params.linkDepth) || 0, params.projectId);
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
        const finalQueryResult = await SSRContext.cachedSearch.searchUsingPost(query, Number(params.linkDepth) || 0, params.projectId);

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
const assetProxy = httpProxy__default.default.createProxyServer();
const deliveryProxy = httpProxy__default.default.createProxyServer();
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
  app.all(['/api/delivery/*', '/api/forms/*', '/api/image/*', '/authenticate/*'], (req, res) => {
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
  if (status >= 400) return CacheDuration[404];
  return CacheDuration[200];
};
const alias = ALIAS; /* global ALIAS */

const anyUpdateHeader = `${alias}_any-update`;

const replaceStaticPath = (str, staticFolderPath = 'static') => str.replace(/static\//g, `${staticFolderPath}/`);

const bundleManipulationMiddleware = ({
  appRootPath,
  maxage,
  staticFolderPath,
  staticRoutePath
}) => (req, res, next) => {
  const filename = path__default.default.basename(encodeURI(req.path));
  const modernBundle = filename.endsWith('.mjs');
  const legacyBundle = filename.endsWith('.js');
  if ((legacyBundle || modernBundle) && filename.startsWith('runtime.')) {
    const jsRuntimeLocation = path__default.default.resolve(appRootPath, `dist/${staticFolderPath}/${modernBundle ? 'modern/js' : 'legacy/js'}/${filename}`);
    try {
      const jsRuntimeBundle = fs__default.default.readFileSync(jsRuntimeLocation, 'utf8');
      const modifiedBundle = replaceStaticPath(jsRuntimeBundle, staticRoutePath);
      if (maxage) res.set('Cache-Control', `public, max-age=${maxage}`);
      res.type('.js').send(modifiedBundle);
      return;
    } catch (readError) {
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
          fs__default.default.accessSync(testPath);
          startupFilePath = testPath;
        } catch (ex) {
          // Do nothing
        }
      });
      startupFileLocation = path__default.default.resolve(appRootPath, startupFilePath);
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
  express__default.default.static(`dist/${staticFolderPath}`, {
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

var _listCacheClear;
var hasRequired_listCacheClear;

function require_listCacheClear () {
	if (hasRequired_listCacheClear) return _listCacheClear;
	hasRequired_listCacheClear = 1;
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	_listCacheClear = listCacheClear;
	return _listCacheClear;
}

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

var eq_1;
var hasRequiredEq;

function requireEq () {
	if (hasRequiredEq) return eq_1;
	hasRequiredEq = 1;
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	eq_1 = eq;
	return eq_1;
}

var _assocIndexOf;
var hasRequired_assocIndexOf;

function require_assocIndexOf () {
	if (hasRequired_assocIndexOf) return _assocIndexOf;
	hasRequired_assocIndexOf = 1;
	var eq = requireEq();

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	_assocIndexOf = assocIndexOf;
	return _assocIndexOf;
}

var _listCacheDelete;
var hasRequired_listCacheDelete;

function require_listCacheDelete () {
	if (hasRequired_listCacheDelete) return _listCacheDelete;
	hasRequired_listCacheDelete = 1;
	var assocIndexOf = require_assocIndexOf();

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
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

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

	_listCacheDelete = listCacheDelete;
	return _listCacheDelete;
}

var _listCacheGet;
var hasRequired_listCacheGet;

function require_listCacheGet () {
	if (hasRequired_listCacheGet) return _listCacheGet;
	hasRequired_listCacheGet = 1;
	var assocIndexOf = require_assocIndexOf();

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	_listCacheGet = listCacheGet;
	return _listCacheGet;
}

var _listCacheHas;
var hasRequired_listCacheHas;

function require_listCacheHas () {
	if (hasRequired_listCacheHas) return _listCacheHas;
	hasRequired_listCacheHas = 1;
	var assocIndexOf = require_assocIndexOf();

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	_listCacheHas = listCacheHas;
	return _listCacheHas;
}

var _listCacheSet;
var hasRequired_listCacheSet;

function require_listCacheSet () {
	if (hasRequired_listCacheSet) return _listCacheSet;
	hasRequired_listCacheSet = 1;
	var assocIndexOf = require_assocIndexOf();

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
	function listCacheSet(key, value) {
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

	_listCacheSet = listCacheSet;
	return _listCacheSet;
}

var _ListCache;
var hasRequired_ListCache;

function require_ListCache () {
	if (hasRequired_ListCache) return _ListCache;
	hasRequired_ListCache = 1;
	var listCacheClear = require_listCacheClear(),
	    listCacheDelete = require_listCacheDelete(),
	    listCacheGet = require_listCacheGet(),
	    listCacheHas = require_listCacheHas(),
	    listCacheSet = require_listCacheSet();

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	_ListCache = ListCache;
	return _ListCache;
}

var _stackClear;
var hasRequired_stackClear;

function require_stackClear () {
	if (hasRequired_stackClear) return _stackClear;
	hasRequired_stackClear = 1;
	var ListCache = require_ListCache();

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	_stackClear = stackClear;
	return _stackClear;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

var _stackDelete;
var hasRequired_stackDelete;

function require_stackDelete () {
	if (hasRequired_stackDelete) return _stackDelete;
	hasRequired_stackDelete = 1;
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	_stackDelete = stackDelete;
	return _stackDelete;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

var _stackGet;
var hasRequired_stackGet;

function require_stackGet () {
	if (hasRequired_stackGet) return _stackGet;
	hasRequired_stackGet = 1;
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	_stackGet = stackGet;
	return _stackGet;
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

var _stackHas;
var hasRequired_stackHas;

function require_stackHas () {
	if (hasRequired_stackHas) return _stackHas;
	hasRequired_stackHas = 1;
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	_stackHas = stackHas;
	return _stackHas;
}

/** Detect free variable `global` from Node.js. */

var _freeGlobal;
var hasRequired_freeGlobal;

function require_freeGlobal () {
	if (hasRequired_freeGlobal) return _freeGlobal;
	hasRequired_freeGlobal = 1;
	var freeGlobal = typeof _commonjsHelpers.commonjsGlobal == 'object' && _commonjsHelpers.commonjsGlobal && _commonjsHelpers.commonjsGlobal.Object === Object && _commonjsHelpers.commonjsGlobal;

	_freeGlobal = freeGlobal;
	return _freeGlobal;
}

var _root;
var hasRequired_root;

function require_root () {
	if (hasRequired_root) return _root;
	hasRequired_root = 1;
	var freeGlobal = require_freeGlobal();

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	_root = root;
	return _root;
}

var _Symbol;
var hasRequired_Symbol;

function require_Symbol () {
	if (hasRequired_Symbol) return _Symbol;
	hasRequired_Symbol = 1;
	var root = require_root();

	/** Built-in value references. */
	var Symbol = root.Symbol;

	_Symbol = Symbol;
	return _Symbol;
}

var _getRawTag;
var hasRequired_getRawTag;

function require_getRawTag () {
	if (hasRequired_getRawTag) return _getRawTag;
	hasRequired_getRawTag = 1;
	var Symbol = require_Symbol();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	_getRawTag = getRawTag;
	return _getRawTag;
}

/** Used for built-in method references. */

var _objectToString;
var hasRequired_objectToString;

function require_objectToString () {
	if (hasRequired_objectToString) return _objectToString;
	hasRequired_objectToString = 1;
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	_objectToString = objectToString;
	return _objectToString;
}

var _baseGetTag;
var hasRequired_baseGetTag;

function require_baseGetTag () {
	if (hasRequired_baseGetTag) return _baseGetTag;
	hasRequired_baseGetTag = 1;
	var Symbol = require_Symbol(),
	    getRawTag = require_getRawTag(),
	    objectToString = require_objectToString();

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	_baseGetTag = baseGetTag;
	return _baseGetTag;
}

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

var isObject_1;
var hasRequiredIsObject;

function requireIsObject () {
	if (hasRequiredIsObject) return isObject_1;
	hasRequiredIsObject = 1;
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	isObject_1 = isObject;
	return isObject_1;
}

var isFunction_1;
var hasRequiredIsFunction;

function requireIsFunction () {
	if (hasRequiredIsFunction) return isFunction_1;
	hasRequiredIsFunction = 1;
	var baseGetTag = require_baseGetTag(),
	    isObject = requireIsObject();

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
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
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	isFunction_1 = isFunction;
	return isFunction_1;
}

var _coreJsData;
var hasRequired_coreJsData;

function require_coreJsData () {
	if (hasRequired_coreJsData) return _coreJsData;
	hasRequired_coreJsData = 1;
	var root = require_root();

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	_coreJsData = coreJsData;
	return _coreJsData;
}

var _isMasked;
var hasRequired_isMasked;

function require_isMasked () {
	if (hasRequired_isMasked) return _isMasked;
	hasRequired_isMasked = 1;
	var coreJsData = require_coreJsData();

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
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	_isMasked = isMasked;
	return _isMasked;
}

/** Used for built-in method references. */

var _toSource;
var hasRequired_toSource;

function require_toSource () {
	if (hasRequired_toSource) return _toSource;
	hasRequired_toSource = 1;
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	_toSource = toSource;
	return _toSource;
}

var _baseIsNative;
var hasRequired_baseIsNative;

function require_baseIsNative () {
	if (hasRequired_baseIsNative) return _baseIsNative;
	hasRequired_baseIsNative = 1;
	var isFunction = requireIsFunction(),
	    isMasked = require_isMasked(),
	    isObject = requireIsObject(),
	    toSource = require_toSource();

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
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
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	_baseIsNative = baseIsNative;
	return _baseIsNative;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

var _getValue;
var hasRequired_getValue;

function require_getValue () {
	if (hasRequired_getValue) return _getValue;
	hasRequired_getValue = 1;
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	_getValue = getValue;
	return _getValue;
}

var _getNative;
var hasRequired_getNative;

function require_getNative () {
	if (hasRequired_getNative) return _getNative;
	hasRequired_getNative = 1;
	var baseIsNative = require_baseIsNative(),
	    getValue = require_getValue();

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	_getNative = getNative;
	return _getNative;
}

var _Map;
var hasRequired_Map;

function require_Map () {
	if (hasRequired_Map) return _Map;
	hasRequired_Map = 1;
	var getNative = require_getNative(),
	    root = require_root();

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	_Map = Map;
	return _Map;
}

var _nativeCreate;
var hasRequired_nativeCreate;

function require_nativeCreate () {
	if (hasRequired_nativeCreate) return _nativeCreate;
	hasRequired_nativeCreate = 1;
	var getNative = require_getNative();

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	_nativeCreate = nativeCreate;
	return _nativeCreate;
}

var _hashClear;
var hasRequired_hashClear;

function require_hashClear () {
	if (hasRequired_hashClear) return _hashClear;
	hasRequired_hashClear = 1;
	var nativeCreate = require_nativeCreate();

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	_hashClear = hashClear;
	return _hashClear;
}

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

var _hashDelete;
var hasRequired_hashDelete;

function require_hashDelete () {
	if (hasRequired_hashDelete) return _hashDelete;
	hasRequired_hashDelete = 1;
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	_hashDelete = hashDelete;
	return _hashDelete;
}

var _hashGet;
var hasRequired_hashGet;

function require_hashGet () {
	if (hasRequired_hashGet) return _hashGet;
	hasRequired_hashGet = 1;
	var nativeCreate = require_nativeCreate();

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	_hashGet = hashGet;
	return _hashGet;
}

var _hashHas;
var hasRequired_hashHas;

function require_hashHas () {
	if (hasRequired_hashHas) return _hashHas;
	hasRequired_hashHas = 1;
	var nativeCreate = require_nativeCreate();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	_hashHas = hashHas;
	return _hashHas;
}

var _hashSet;
var hasRequired_hashSet;

function require_hashSet () {
	if (hasRequired_hashSet) return _hashSet;
	hasRequired_hashSet = 1;
	var nativeCreate = require_nativeCreate();

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
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	_hashSet = hashSet;
	return _hashSet;
}

var _Hash;
var hasRequired_Hash;

function require_Hash () {
	if (hasRequired_Hash) return _Hash;
	hasRequired_Hash = 1;
	var hashClear = require_hashClear(),
	    hashDelete = require_hashDelete(),
	    hashGet = require_hashGet(),
	    hashHas = require_hashHas(),
	    hashSet = require_hashSet();

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	_Hash = Hash;
	return _Hash;
}

var _mapCacheClear;
var hasRequired_mapCacheClear;

function require_mapCacheClear () {
	if (hasRequired_mapCacheClear) return _mapCacheClear;
	hasRequired_mapCacheClear = 1;
	var Hash = require_Hash(),
	    ListCache = require_ListCache(),
	    Map = require_Map();

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	_mapCacheClear = mapCacheClear;
	return _mapCacheClear;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

var _isKeyable;
var hasRequired_isKeyable;

function require_isKeyable () {
	if (hasRequired_isKeyable) return _isKeyable;
	hasRequired_isKeyable = 1;
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	_isKeyable = isKeyable;
	return _isKeyable;
}

var _getMapData;
var hasRequired_getMapData;

function require_getMapData () {
	if (hasRequired_getMapData) return _getMapData;
	hasRequired_getMapData = 1;
	var isKeyable = require_isKeyable();

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	_getMapData = getMapData;
	return _getMapData;
}

var _mapCacheDelete;
var hasRequired_mapCacheDelete;

function require_mapCacheDelete () {
	if (hasRequired_mapCacheDelete) return _mapCacheDelete;
	hasRequired_mapCacheDelete = 1;
	var getMapData = require_getMapData();

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	_mapCacheDelete = mapCacheDelete;
	return _mapCacheDelete;
}

var _mapCacheGet;
var hasRequired_mapCacheGet;

function require_mapCacheGet () {
	if (hasRequired_mapCacheGet) return _mapCacheGet;
	hasRequired_mapCacheGet = 1;
	var getMapData = require_getMapData();

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	_mapCacheGet = mapCacheGet;
	return _mapCacheGet;
}

var _mapCacheHas;
var hasRequired_mapCacheHas;

function require_mapCacheHas () {
	if (hasRequired_mapCacheHas) return _mapCacheHas;
	hasRequired_mapCacheHas = 1;
	var getMapData = require_getMapData();

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	_mapCacheHas = mapCacheHas;
	return _mapCacheHas;
}

var _mapCacheSet;
var hasRequired_mapCacheSet;

function require_mapCacheSet () {
	if (hasRequired_mapCacheSet) return _mapCacheSet;
	hasRequired_mapCacheSet = 1;
	var getMapData = require_getMapData();

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
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	_mapCacheSet = mapCacheSet;
	return _mapCacheSet;
}

var _MapCache;
var hasRequired_MapCache;

function require_MapCache () {
	if (hasRequired_MapCache) return _MapCache;
	hasRequired_MapCache = 1;
	var mapCacheClear = require_mapCacheClear(),
	    mapCacheDelete = require_mapCacheDelete(),
	    mapCacheGet = require_mapCacheGet(),
	    mapCacheHas = require_mapCacheHas(),
	    mapCacheSet = require_mapCacheSet();

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	_MapCache = MapCache;
	return _MapCache;
}

var _stackSet;
var hasRequired_stackSet;

function require_stackSet () {
	if (hasRequired_stackSet) return _stackSet;
	hasRequired_stackSet = 1;
	var ListCache = require_ListCache(),
	    Map = require_Map(),
	    MapCache = require_MapCache();

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
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
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

	_stackSet = stackSet;
	return _stackSet;
}

var _Stack;
var hasRequired_Stack;

function require_Stack () {
	if (hasRequired_Stack) return _Stack;
	hasRequired_Stack = 1;
	var ListCache = require_ListCache(),
	    stackClear = require_stackClear(),
	    stackDelete = require_stackDelete(),
	    stackGet = require_stackGet(),
	    stackHas = require_stackHas(),
	    stackSet = require_stackSet();

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	_Stack = Stack;
	return _Stack;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */

var _arrayEach;
var hasRequired_arrayEach;

function require_arrayEach () {
	if (hasRequired_arrayEach) return _arrayEach;
	hasRequired_arrayEach = 1;
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	_arrayEach = arrayEach;
	return _arrayEach;
}

var _defineProperty;
var hasRequired_defineProperty;

function require_defineProperty () {
	if (hasRequired_defineProperty) return _defineProperty;
	hasRequired_defineProperty = 1;
	var getNative = require_getNative();

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	_defineProperty = defineProperty;
	return _defineProperty;
}

var _baseAssignValue;
var hasRequired_baseAssignValue;

function require_baseAssignValue () {
	if (hasRequired_baseAssignValue) return _baseAssignValue;
	hasRequired_baseAssignValue = 1;
	var defineProperty = require_defineProperty();

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
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

	_baseAssignValue = baseAssignValue;
	return _baseAssignValue;
}

var _assignValue;
var hasRequired_assignValue;

function require_assignValue () {
	if (hasRequired_assignValue) return _assignValue;
	hasRequired_assignValue = 1;
	var baseAssignValue = require_baseAssignValue(),
	    eq = requireEq();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

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
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	_assignValue = assignValue;
	return _assignValue;
}

var _copyObject;
var hasRequired_copyObject;

function require_copyObject () {
	if (hasRequired_copyObject) return _copyObject;
	hasRequired_copyObject = 1;
	var assignValue = require_assignValue(),
	    baseAssignValue = require_baseAssignValue();

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
	function copyObject(source, props, object, customizer) {
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
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	_copyObject = copyObject;
	return _copyObject;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

var _baseTimes;
var hasRequired_baseTimes;

function require_baseTimes () {
	if (hasRequired_baseTimes) return _baseTimes;
	hasRequired_baseTimes = 1;
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	_baseTimes = baseTimes;
	return _baseTimes;
}

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

var isObjectLike_1;
var hasRequiredIsObjectLike;

function requireIsObjectLike () {
	if (hasRequiredIsObjectLike) return isObjectLike_1;
	hasRequiredIsObjectLike = 1;
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	isObjectLike_1 = isObjectLike;
	return isObjectLike_1;
}

var _baseIsArguments;
var hasRequired_baseIsArguments;

function require_baseIsArguments () {
	if (hasRequired_baseIsArguments) return _baseIsArguments;
	hasRequired_baseIsArguments = 1;
	var baseGetTag = require_baseGetTag(),
	    isObjectLike = requireIsObjectLike();

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	_baseIsArguments = baseIsArguments;
	return _baseIsArguments;
}

var isArguments_1;
var hasRequiredIsArguments;

function requireIsArguments () {
	if (hasRequiredIsArguments) return isArguments_1;
	hasRequiredIsArguments = 1;
	var baseIsArguments = require_baseIsArguments(),
	    isObjectLike = requireIsObjectLike();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

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
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	isArguments_1 = isArguments;
	return isArguments_1;
}

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

var isArray_1;
var hasRequiredIsArray;

function requireIsArray () {
	if (hasRequiredIsArray) return isArray_1;
	hasRequiredIsArray = 1;
	var isArray = Array.isArray;

	isArray_1 = isArray;
	return isArray_1;
}

var isBuffer = {exports: {}};

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

var stubFalse_1;
var hasRequiredStubFalse;

function requireStubFalse () {
	if (hasRequiredStubFalse) return stubFalse_1;
	hasRequiredStubFalse = 1;
	function stubFalse() {
	  return false;
	}

	stubFalse_1 = stubFalse;
	return stubFalse_1;
}

isBuffer.exports;

var hasRequiredIsBuffer;

function requireIsBuffer () {
	if (hasRequiredIsBuffer) return isBuffer.exports;
	hasRequiredIsBuffer = 1;
	(function (module, exports) {
		var root = require_root(),
		    stubFalse = requireStubFalse();

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
	} (isBuffer, isBuffer.exports));
	return isBuffer.exports;
}

/** Used as references for various `Number` constants. */

var _isIndex;
var hasRequired_isIndex;

function require_isIndex () {
	if (hasRequired_isIndex) return _isIndex;
	hasRequired_isIndex = 1;
	var MAX_SAFE_INTEGER = 9007199254740991;

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
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	_isIndex = isIndex;
	return _isIndex;
}

/** Used as references for various `Number` constants. */

var isLength_1;
var hasRequiredIsLength;

function requireIsLength () {
	if (hasRequiredIsLength) return isLength_1;
	hasRequiredIsLength = 1;
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
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	isLength_1 = isLength;
	return isLength_1;
}

var _baseIsTypedArray;
var hasRequired_baseIsTypedArray;

function require_baseIsTypedArray () {
	if (hasRequired_baseIsTypedArray) return _baseIsTypedArray;
	hasRequired_baseIsTypedArray = 1;
	var baseGetTag = require_baseGetTag(),
	    isLength = requireIsLength(),
	    isObjectLike = requireIsObjectLike();

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
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

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	_baseIsTypedArray = baseIsTypedArray;
	return _baseIsTypedArray;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

var _baseUnary;
var hasRequired_baseUnary;

function require_baseUnary () {
	if (hasRequired_baseUnary) return _baseUnary;
	hasRequired_baseUnary = 1;
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	_baseUnary = baseUnary;
	return _baseUnary;
}

var _nodeUtil = {exports: {}};

_nodeUtil.exports;

var hasRequired_nodeUtil;

function require_nodeUtil () {
	if (hasRequired_nodeUtil) return _nodeUtil.exports;
	hasRequired_nodeUtil = 1;
	(function (module, exports) {
		var freeGlobal = require_freeGlobal();

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
	} (_nodeUtil, _nodeUtil.exports));
	return _nodeUtil.exports;
}

var isTypedArray_1;
var hasRequiredIsTypedArray;

function requireIsTypedArray () {
	if (hasRequiredIsTypedArray) return isTypedArray_1;
	hasRequiredIsTypedArray = 1;
	var baseIsTypedArray = require_baseIsTypedArray(),
	    baseUnary = require_baseUnary(),
	    nodeUtil = require_nodeUtil();

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

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
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	isTypedArray_1 = isTypedArray;
	return isTypedArray_1;
}

var _arrayLikeKeys;
var hasRequired_arrayLikeKeys;

function require_arrayLikeKeys () {
	if (hasRequired_arrayLikeKeys) return _arrayLikeKeys;
	hasRequired_arrayLikeKeys = 1;
	var baseTimes = require_baseTimes(),
	    isArguments = requireIsArguments(),
	    isArray = requireIsArray(),
	    isBuffer = requireIsBuffer(),
	    isIndex = require_isIndex(),
	    isTypedArray = requireIsTypedArray();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
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

	_arrayLikeKeys = arrayLikeKeys;
	return _arrayLikeKeys;
}

/** Used for built-in method references. */

var _isPrototype;
var hasRequired_isPrototype;

function require_isPrototype () {
	if (hasRequired_isPrototype) return _isPrototype;
	hasRequired_isPrototype = 1;
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	_isPrototype = isPrototype;
	return _isPrototype;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */

var _overArg;
var hasRequired_overArg;

function require_overArg () {
	if (hasRequired_overArg) return _overArg;
	hasRequired_overArg = 1;
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	_overArg = overArg;
	return _overArg;
}

var _nativeKeys;
var hasRequired_nativeKeys;

function require_nativeKeys () {
	if (hasRequired_nativeKeys) return _nativeKeys;
	hasRequired_nativeKeys = 1;
	var overArg = require_overArg();

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	_nativeKeys = nativeKeys;
	return _nativeKeys;
}

var _baseKeys;
var hasRequired_baseKeys;

function require_baseKeys () {
	if (hasRequired_baseKeys) return _baseKeys;
	hasRequired_baseKeys = 1;
	var isPrototype = require_isPrototype(),
	    nativeKeys = require_nativeKeys();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	_baseKeys = baseKeys;
	return _baseKeys;
}

var isArrayLike_1;
var hasRequiredIsArrayLike;

function requireIsArrayLike () {
	if (hasRequiredIsArrayLike) return isArrayLike_1;
	hasRequiredIsArrayLike = 1;
	var isFunction = requireIsFunction(),
	    isLength = requireIsLength();

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
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	isArrayLike_1 = isArrayLike;
	return isArrayLike_1;
}

var keys_1;
var hasRequiredKeys;

function requireKeys () {
	if (hasRequiredKeys) return keys_1;
	hasRequiredKeys = 1;
	var arrayLikeKeys = require_arrayLikeKeys(),
	    baseKeys = require_baseKeys(),
	    isArrayLike = requireIsArrayLike();

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
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	keys_1 = keys;
	return keys_1;
}

var _baseAssign;
var hasRequired_baseAssign;

function require_baseAssign () {
	if (hasRequired_baseAssign) return _baseAssign;
	hasRequired_baseAssign = 1;
	var copyObject = require_copyObject(),
	    keys = requireKeys();

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	_baseAssign = baseAssign;
	return _baseAssign;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

var _nativeKeysIn;
var hasRequired_nativeKeysIn;

function require_nativeKeysIn () {
	if (hasRequired_nativeKeysIn) return _nativeKeysIn;
	hasRequired_nativeKeysIn = 1;
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	_nativeKeysIn = nativeKeysIn;
	return _nativeKeysIn;
}

var _baseKeysIn;
var hasRequired_baseKeysIn;

function require_baseKeysIn () {
	if (hasRequired_baseKeysIn) return _baseKeysIn;
	hasRequired_baseKeysIn = 1;
	var isObject = requireIsObject(),
	    isPrototype = require_isPrototype(),
	    nativeKeysIn = require_nativeKeysIn();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	_baseKeysIn = baseKeysIn;
	return _baseKeysIn;
}

var keysIn_1;
var hasRequiredKeysIn;

function requireKeysIn () {
	if (hasRequiredKeysIn) return keysIn_1;
	hasRequiredKeysIn = 1;
	var arrayLikeKeys = require_arrayLikeKeys(),
	    baseKeysIn = require_baseKeysIn(),
	    isArrayLike = requireIsArrayLike();

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
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	keysIn_1 = keysIn;
	return keysIn_1;
}

var _baseAssignIn;
var hasRequired_baseAssignIn;

function require_baseAssignIn () {
	if (hasRequired_baseAssignIn) return _baseAssignIn;
	hasRequired_baseAssignIn = 1;
	var copyObject = require_copyObject(),
	    keysIn = requireKeysIn();

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && copyObject(source, keysIn(source), object);
	}

	_baseAssignIn = baseAssignIn;
	return _baseAssignIn;
}

var _cloneBuffer = {exports: {}};

_cloneBuffer.exports;

var hasRequired_cloneBuffer;

function require_cloneBuffer () {
	if (hasRequired_cloneBuffer) return _cloneBuffer.exports;
	hasRequired_cloneBuffer = 1;
	(function (module, exports) {
		var root = require_root();

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
	} (_cloneBuffer, _cloneBuffer.exports));
	return _cloneBuffer.exports;
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */

var _copyArray;
var hasRequired_copyArray;

function require_copyArray () {
	if (hasRequired_copyArray) return _copyArray;
	hasRequired_copyArray = 1;
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	_copyArray = copyArray;
	return _copyArray;
}

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

var _arrayFilter;
var hasRequired_arrayFilter;

function require_arrayFilter () {
	if (hasRequired_arrayFilter) return _arrayFilter;
	hasRequired_arrayFilter = 1;
	function arrayFilter(array, predicate) {
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

	_arrayFilter = arrayFilter;
	return _arrayFilter;
}

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

var stubArray_1;
var hasRequiredStubArray;

function requireStubArray () {
	if (hasRequiredStubArray) return stubArray_1;
	hasRequiredStubArray = 1;
	function stubArray() {
	  return [];
	}

	stubArray_1 = stubArray;
	return stubArray_1;
}

var _getSymbols;
var hasRequired_getSymbols;

function require_getSymbols () {
	if (hasRequired_getSymbols) return _getSymbols;
	hasRequired_getSymbols = 1;
	var arrayFilter = require_arrayFilter(),
	    stubArray = requireStubArray();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	_getSymbols = getSymbols;
	return _getSymbols;
}

var _copySymbols;
var hasRequired_copySymbols;

function require_copySymbols () {
	if (hasRequired_copySymbols) return _copySymbols;
	hasRequired_copySymbols = 1;
	var copyObject = require_copyObject(),
	    getSymbols = require_getSymbols();

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	_copySymbols = copySymbols;
	return _copySymbols;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */

var _arrayPush;
var hasRequired_arrayPush;

function require_arrayPush () {
	if (hasRequired_arrayPush) return _arrayPush;
	hasRequired_arrayPush = 1;
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	_arrayPush = arrayPush;
	return _arrayPush;
}

var _getPrototype;
var hasRequired_getPrototype;

function require_getPrototype () {
	if (hasRequired_getPrototype) return _getPrototype;
	hasRequired_getPrototype = 1;
	var overArg = require_overArg();

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	_getPrototype = getPrototype;
	return _getPrototype;
}

var _getSymbolsIn;
var hasRequired_getSymbolsIn;

function require_getSymbolsIn () {
	if (hasRequired_getSymbolsIn) return _getSymbolsIn;
	hasRequired_getSymbolsIn = 1;
	var arrayPush = require_arrayPush(),
	    getPrototype = require_getPrototype(),
	    getSymbols = require_getSymbols(),
	    stubArray = requireStubArray();

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};

	_getSymbolsIn = getSymbolsIn;
	return _getSymbolsIn;
}

var _copySymbolsIn;
var hasRequired_copySymbolsIn;

function require_copySymbolsIn () {
	if (hasRequired_copySymbolsIn) return _copySymbolsIn;
	hasRequired_copySymbolsIn = 1;
	var copyObject = require_copyObject(),
	    getSymbolsIn = require_getSymbolsIn();

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}

	_copySymbolsIn = copySymbolsIn;
	return _copySymbolsIn;
}

var _baseGetAllKeys;
var hasRequired_baseGetAllKeys;

function require_baseGetAllKeys () {
	if (hasRequired_baseGetAllKeys) return _baseGetAllKeys;
	hasRequired_baseGetAllKeys = 1;
	var arrayPush = require_arrayPush(),
	    isArray = requireIsArray();

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
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	_baseGetAllKeys = baseGetAllKeys;
	return _baseGetAllKeys;
}

var _getAllKeys;
var hasRequired_getAllKeys;

function require_getAllKeys () {
	if (hasRequired_getAllKeys) return _getAllKeys;
	hasRequired_getAllKeys = 1;
	var baseGetAllKeys = require_baseGetAllKeys(),
	    getSymbols = require_getSymbols(),
	    keys = requireKeys();

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	_getAllKeys = getAllKeys;
	return _getAllKeys;
}

var _getAllKeysIn;
var hasRequired_getAllKeysIn;

function require_getAllKeysIn () {
	if (hasRequired_getAllKeysIn) return _getAllKeysIn;
	hasRequired_getAllKeysIn = 1;
	var baseGetAllKeys = require_baseGetAllKeys(),
	    getSymbolsIn = require_getSymbolsIn(),
	    keysIn = requireKeysIn();

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}

	_getAllKeysIn = getAllKeysIn;
	return _getAllKeysIn;
}

var _DataView;
var hasRequired_DataView;

function require_DataView () {
	if (hasRequired_DataView) return _DataView;
	hasRequired_DataView = 1;
	var getNative = require_getNative(),
	    root = require_root();

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	_DataView = DataView;
	return _DataView;
}

var _Promise;
var hasRequired_Promise;

function require_Promise () {
	if (hasRequired_Promise) return _Promise;
	hasRequired_Promise = 1;
	var getNative = require_getNative(),
	    root = require_root();

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	_Promise = Promise;
	return _Promise;
}

var _Set;
var hasRequired_Set;

function require_Set () {
	if (hasRequired_Set) return _Set;
	hasRequired_Set = 1;
	var getNative = require_getNative(),
	    root = require_root();

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	_Set = Set;
	return _Set;
}

var _WeakMap;
var hasRequired_WeakMap;

function require_WeakMap () {
	if (hasRequired_WeakMap) return _WeakMap;
	hasRequired_WeakMap = 1;
	var getNative = require_getNative(),
	    root = require_root();

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	_WeakMap = WeakMap;
	return _WeakMap;
}

var _getTag;
var hasRequired_getTag;

function require_getTag () {
	if (hasRequired_getTag) return _getTag;
	hasRequired_getTag = 1;
	var DataView = require_DataView(),
	    Map = require_Map(),
	    Promise = require_Promise(),
	    Set = require_Set(),
	    WeakMap = require_WeakMap(),
	    baseGetTag = require_baseGetTag(),
	    toSource = require_toSource();

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	_getTag = getTag;
	return _getTag;
}

/** Used for built-in method references. */

var _initCloneArray;
var hasRequired_initCloneArray;

function require_initCloneArray () {
	if (hasRequired_initCloneArray) return _initCloneArray;
	hasRequired_initCloneArray = 1;
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
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	_initCloneArray = initCloneArray;
	return _initCloneArray;
}

var _Uint8Array;
var hasRequired_Uint8Array;

function require_Uint8Array () {
	if (hasRequired_Uint8Array) return _Uint8Array;
	hasRequired_Uint8Array = 1;
	var root = require_root();

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	_Uint8Array = Uint8Array;
	return _Uint8Array;
}

var _cloneArrayBuffer;
var hasRequired_cloneArrayBuffer;

function require_cloneArrayBuffer () {
	if (hasRequired_cloneArrayBuffer) return _cloneArrayBuffer;
	hasRequired_cloneArrayBuffer = 1;
	var Uint8Array = require_Uint8Array();

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	_cloneArrayBuffer = cloneArrayBuffer;
	return _cloneArrayBuffer;
}

var _cloneDataView;
var hasRequired_cloneDataView;

function require_cloneDataView () {
	if (hasRequired_cloneDataView) return _cloneDataView;
	hasRequired_cloneDataView = 1;
	var cloneArrayBuffer = require_cloneArrayBuffer();

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	_cloneDataView = cloneDataView;
	return _cloneDataView;
}

/** Used to match `RegExp` flags from their coerced string values. */

var _cloneRegExp;
var hasRequired_cloneRegExp;

function require_cloneRegExp () {
	if (hasRequired_cloneRegExp) return _cloneRegExp;
	hasRequired_cloneRegExp = 1;
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	_cloneRegExp = cloneRegExp;
	return _cloneRegExp;
}

var _cloneSymbol;
var hasRequired_cloneSymbol;

function require_cloneSymbol () {
	if (hasRequired_cloneSymbol) return _cloneSymbol;
	hasRequired_cloneSymbol = 1;
	var Symbol = require_Symbol();

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
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	_cloneSymbol = cloneSymbol;
	return _cloneSymbol;
}

var _cloneTypedArray;
var hasRequired_cloneTypedArray;

function require_cloneTypedArray () {
	if (hasRequired_cloneTypedArray) return _cloneTypedArray;
	hasRequired_cloneTypedArray = 1;
	var cloneArrayBuffer = require_cloneArrayBuffer();

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	_cloneTypedArray = cloneTypedArray;
	return _cloneTypedArray;
}

var _initCloneByTag;
var hasRequired_initCloneByTag;

function require_initCloneByTag () {
	if (hasRequired_initCloneByTag) return _initCloneByTag;
	hasRequired_initCloneByTag = 1;
	var cloneArrayBuffer = require_cloneArrayBuffer(),
	    cloneDataView = require_cloneDataView(),
	    cloneRegExp = require_cloneRegExp(),
	    cloneSymbol = require_cloneSymbol(),
	    cloneTypedArray = require_cloneTypedArray();

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

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
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return new Ctor;

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return new Ctor;

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	_initCloneByTag = initCloneByTag;
	return _initCloneByTag;
}

var _baseCreate;
var hasRequired_baseCreate;

function require_baseCreate () {
	if (hasRequired_baseCreate) return _baseCreate;
	hasRequired_baseCreate = 1;
	var isObject = requireIsObject();

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
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
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

	_baseCreate = baseCreate;
	return _baseCreate;
}

var _initCloneObject;
var hasRequired_initCloneObject;

function require_initCloneObject () {
	if (hasRequired_initCloneObject) return _initCloneObject;
	hasRequired_initCloneObject = 1;
	var baseCreate = require_baseCreate(),
	    getPrototype = require_getPrototype(),
	    isPrototype = require_isPrototype();

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	_initCloneObject = initCloneObject;
	return _initCloneObject;
}

var _baseIsMap;
var hasRequired_baseIsMap;

function require_baseIsMap () {
	if (hasRequired_baseIsMap) return _baseIsMap;
	hasRequired_baseIsMap = 1;
	var getTag = require_getTag(),
	    isObjectLike = requireIsObjectLike();

	/** `Object#toString` result references. */
	var mapTag = '[object Map]';

	/**
	 * The base implementation of `_.isMap` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 */
	function baseIsMap(value) {
	  return isObjectLike(value) && getTag(value) == mapTag;
	}

	_baseIsMap = baseIsMap;
	return _baseIsMap;
}

var isMap_1;
var hasRequiredIsMap;

function requireIsMap () {
	if (hasRequiredIsMap) return isMap_1;
	hasRequiredIsMap = 1;
	var baseIsMap = require_baseIsMap(),
	    baseUnary = require_baseUnary(),
	    nodeUtil = require_nodeUtil();

	/* Node.js helper references. */
	var nodeIsMap = nodeUtil && nodeUtil.isMap;

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
	var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

	isMap_1 = isMap;
	return isMap_1;
}

var _baseIsSet;
var hasRequired_baseIsSet;

function require_baseIsSet () {
	if (hasRequired_baseIsSet) return _baseIsSet;
	hasRequired_baseIsSet = 1;
	var getTag = require_getTag(),
	    isObjectLike = requireIsObjectLike();

	/** `Object#toString` result references. */
	var setTag = '[object Set]';

	/**
	 * The base implementation of `_.isSet` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 */
	function baseIsSet(value) {
	  return isObjectLike(value) && getTag(value) == setTag;
	}

	_baseIsSet = baseIsSet;
	return _baseIsSet;
}

var isSet_1;
var hasRequiredIsSet;

function requireIsSet () {
	if (hasRequiredIsSet) return isSet_1;
	hasRequiredIsSet = 1;
	var baseIsSet = require_baseIsSet(),
	    baseUnary = require_baseUnary(),
	    nodeUtil = require_nodeUtil();

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
	var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

	isSet_1 = isSet;
	return isSet_1;
}

var _baseClone;
var hasRequired_baseClone;

function require_baseClone () {
	if (hasRequired_baseClone) return _baseClone;
	hasRequired_baseClone = 1;
	var Stack = require_Stack(),
	    arrayEach = require_arrayEach(),
	    assignValue = require_assignValue(),
	    baseAssign = require_baseAssign(),
	    baseAssignIn = require_baseAssignIn(),
	    cloneBuffer = require_cloneBuffer(),
	    copyArray = require_copyArray(),
	    copySymbols = require_copySymbols(),
	    copySymbolsIn = require_copySymbolsIn(),
	    getAllKeys = require_getAllKeys(),
	    getAllKeysIn = require_getAllKeysIn(),
	    getTag = require_getTag(),
	    initCloneArray = require_initCloneArray(),
	    initCloneByTag = require_initCloneByTag(),
	    initCloneObject = require_initCloneObject(),
	    isArray = requireIsArray(),
	    isBuffer = requireIsBuffer(),
	    isMap = requireIsMap(),
	    isObject = requireIsObject(),
	    isSet = requireIsSet(),
	    keys = requireKeys(),
	    keysIn = requireKeysIn();

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

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
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;

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
	      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	    });
	  } else if (isMap(value)) {
	    value.forEach(function(subValue, key) {
	      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
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
	    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	_baseClone = baseClone;
	return _baseClone;
}

var cloneDeep_1;
var hasRequiredCloneDeep;

function requireCloneDeep () {
	if (hasRequiredCloneDeep) return cloneDeep_1;
	hasRequiredCloneDeep = 1;
	var baseClone = require_baseClone();

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

	cloneDeep_1 = cloneDeep;
	return cloneDeep_1;
}

var cloneDeepExports = requireCloneDeep();
var cloneDeep = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(cloneDeepExports);

var stringifyAttributes = (attributes = {}) => Object.entries(attributes).map(([key, value], idx) => `${idx !== 0 ? ' ' : ''}${key}${value ? `="${value}"` : ''}`).join(' ');

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

const readFileSync = path => fs__default.default.readFileSync(path, 'utf8');
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
        statsFile: path__default.default.resolve('dist/modern/loadable-stats.json')
      });
    } catch (e) {
      console.info('@loadable/server modern ChunkExtractor not available');
    }
    try {
      legacy = new server$1.ChunkExtractor({
        entrypoints: ['app'],
        namespace: 'legacy',
        statsFile: path__default.default.resolve('dist/legacy/loadable-stats.json')
      });
    } catch (e) {
      console.info('@loadable/server legacy ChunkExtractor not available');
    }
    commonLoadableExtractor.addChunk = chunk => {
      var _modern, _legacy, _legacy2;
      (_modern = modern) === null || _modern === void 0 || _modern.addChunk(chunk);
      if (typeof ((_legacy = legacy) === null || _legacy === void 0 ? void 0 : _legacy.stats.assetsByChunkName[chunk]) !== 'undefined') (_legacy2 = legacy) === null || _legacy2 === void 0 || _legacy2.addChunk(chunk);
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

const addStandardHeaders = (state, response, packagejson, groups) => {
  if (state) {
    try {
      const routingSurrogateKeys = selectors.selectSurrogateKeys(state);
      const apiCalls = selectors.selectSsrApiCalls(state);
      const anyApiError = !!apiCalls.find(([status]) => status >= 400);

      // Check length of surrogate keys and prevent potential header overflow errors in prod
      // Check for any error set in the page response
      // And check if we have seen any error in any of the Delivery API calls
      // - add `any-update` header that will indiscriminately
      //   invalidate the SSR page cache when any content is updated
      const addAnyUpdateHeader = routingSurrogateKeys.length >= 2000 || response.statusCode >= 400 || anyApiError;
      console.info(`[addStandardHeaders] ${addAnyUpdateHeader ? anyUpdateHeader : routingSurrogateKeys.length} surrogate keys for ${response.req.url}`);
      const surrogateKeys = addAnyUpdateHeader ? anyUpdateHeader : routingSurrogateKeys.join(' ');
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
    const versionData = fs__default.default.readFileSync(`dist/${staticFolderPath}/version.json`, 'utf8');
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
        console.log(`${`[contensis-react-base] ❌ ${chalk__default.default.red.bold(`${type} - ${err.message}`)}`}`);
        console.log(chalk__default.default.gray` - you are seeing this because we have tried to prevent the app from completely crashing - you should not ignore this problem`);
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
  app.get('/*', cookiesMiddleware__default.default(), async (request, response) => {
    const url = encodeURI(request.url);
    const matchedStaticRoute = () => reactRouterConfig.matchRoutes(routes.StaticRoutes, request.path);
    const isStaticRoute = () => matchedStaticRoute().length > 0;
    const staticRoute = isStaticRoute() && matchedStaticRoute()[0];

    // Allow certain routes to avoid SSR
    const onlyDynamic = staticRoute && staticRoute.route.ssr === false;
    const onlySSR = staticRoute && staticRoute.route.ssrOnly === true;
    const normaliseQs = q => q && q.toLowerCase() === 'true' ? true : false;

    // Determine functional params from QueryString and set access methods
    const accessMethod = mapJson__default.default(request.query, {
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
    const store$1 = await store.createStore(withReducers, {}, App.history({
      initialEntries: [url]
    }), stateType);

    // dispatch any global and non-saga related actions before calling our JSX
    const versionStatus = SSRContext.deliveryApi.getServerSideVersionStatus(request);

    // In server-side blocks world, the hostname requested by the client resides in the x-orig-host header
    // Because of this, we prioritize x-orig-host when setting our hostname
    const hostname = request.headers['x-orig-host'] || request.hostname;
    console.info(`Request for ${request.path} hostname: ${hostname} versionStatus: ${versionStatus}`);
    store$1.dispatch(version.setVersionStatus(versionStatus));
    store$1.dispatch(version.setVersion(versionInfo.commitRef, versionInfo.buildNo));
    const project = App.pickProject(hostname, request.query);
    const groups = allowedGroups && allowedGroups[project];
    store$1.dispatch(selectors.setCurrentProject(project, groups, hostname));
    const loadableExtractor = loadableChunkExtractors();
    const ssrCookies = enableSsrCookies ?
    // these cookies are managed by the cookiesMiddleware and contain listeners
    // when cookies are read or written in ssr can be added to the `set-cookie` response header
    request.universalCookies :
    // this is a stub cookie collection so cookie methods can be used in code
    new CookieHelper_class.Cookies();
    const jsx = /*#__PURE__*/React__default.default.createElement(server$1.ChunkExtractorManager, {
      extractor: loadableExtractor.commonLoadableExtractor
    }, /*#__PURE__*/React__default.default.createElement(reactCookie.CookiesProvider, {
      cookies: ssrCookies
    }, /*#__PURE__*/React__default.default.createElement(reactRedux.Provider, {
      store: store$1
    }, /*#__PURE__*/React__default.default.createElement(reactRouterDom.StaticRouter, {
      context: context,
      location: url
    }, /*#__PURE__*/React__default.default.createElement(SSRContext.SSRContextProvider, {
      request: request,
      response: response
    }, /*#__PURE__*/React__default.default.createElement(ReactApp, {
      routes: routes,
      withEvents: withEvents
    }))))));
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
      store$1.runSaga(App.rootSaga(withSagas)).toPromise().then(() => {
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
        const reduxState = store$1.getState();
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
        })(cloneDeep(reduxState));
        // These keys are used for preparing server-side response headers only
        // and are not required in the client at all except for debugging ssr
        if (!((_selectCurrentSearch = selectors.selectCurrentSearch(reduxState)) !== null && _selectCurrentSearch !== void 0 && _selectCurrentSearch.includes('includeApiCalls'))) {
          if (stateType === 'immutable') clonedState = clonedState.deleteIn(['routing', 'apiCalls']).deleteIn(['routing', 'surrogateKeys']);else {
            delete clonedState.routing.apiCalls;
            delete clonedState.routing.surrogateKeys;
          }
        }
        // Reset user state to prevent user details from being cached in SSR
        if (stateType === 'immutable') {
          clonedState = clonedState.delete('user');
        } else delete clonedState.user;
        let serialisedReduxData = serialize__default.default(clonedState);
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
          responseHTML = minifyCssString__default.default(styleTags) + html;
        }

        // Page fragment served with client scripts and redux data that hydrate the app client side
        if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
          responseHTML = templateHTMLFragment.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString__default.default(styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', bundleTags).replace('{{REDUX_DATA}}', serialisedReduxData);
        }

        // Full HTML page served statically
        if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
          responseHTML = templateHTMLStatic.replace('{{TITLE}}', title).replace('{{SEO_CRITICAL_METADATA}}', metadata).replace('{{CRITICAL_CSS}}', minifyCssString__default.default(styleTags)).replace('{{APP}}', html).replace('{{LOADABLE_CHUNKS}}', '');
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
      store$1.close();
    }
  });
};

const app = express__default.default();
const server = http__default.default.createServer(app);
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
exports.default = internalServer;
exports.linkDepthApi = makeLinkDepthApi;
//# sourceMappingURL=contensis-react-base.js.map
