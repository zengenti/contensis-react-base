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
var sagas = require('./sagas-Ekfrk7xA.js');
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
var lodashClean = require('lodash-clean');
var reactCookie = require('react-cookie');
var CookieHelper_class = require('./CookieHelper.class-CxeVo9EP.js');
var cookiesMiddleware = require('universal-cookie-express');
var store = require('./store-BihH67lI.js');
var App = require('./App-B2ohFzUt.js');
var version = require('./version-Cg79mdPg.js');
var selectors = require('./selectors-wCs5fHD4.js');
var chalk = require('chalk');
require('loglevel');
require('@redux-saga/core/effects');
require('./_commonjsHelpers-BJu3ubxk.js');
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
require('./RouteLoader-De-dhkg-.js');

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
        })(sagas.cloneDeep(reduxState));
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
