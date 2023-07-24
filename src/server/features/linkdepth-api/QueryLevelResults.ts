/* eslint-disable no-console */
import { PagedList } from 'contensis-core-api';
import { Query } from 'contensis-delivery-api';
import { Entry } from 'contensis-delivery-api/lib/models';
import { cachedSearch } from '~/util/ContensisDeliveryApi';
import {
  appendSearchQueryFilters,
  makeFilterExpressions,
  searchQuery,
} from './search';
import { LinkDepthApiFilters, LinkFields } from './api.d';
import { Util } from './util';

class QueryLevelResults {
  level: number;
  contentTypeIds: string[];
  linkFieldIds: string[];
  linkFields: LinkFields;
  filters: LinkDepthApiFilters;
  sharedFilters: LinkDepthApiFilters;
  returnEntries: boolean;
  resolveFirstParent: boolean;

  validatedLinks: {
    contentTypeId: string;
    linkFieldId: string;
    entryIds: string[];
  }[] = [];

  parent: QueryLevelResults | undefined;
  children: QueryLevelResults[] = [];
  runFirstQuery: boolean;
  runFinalQuery: boolean;

  private params: { [key: string]: string | undefined } = {};
  private debug: boolean;

  private firstQuery: Query = new Query();
  private firstResults: PagedList<Entry> = {} as PagedList<Entry>;

  private finalQuery: Query = new Query();
  private finalResults: PagedList<Entry> = {} as PagedList<Entry>;

  constructor({
    level,
    contentTypeIds,
    linkFields,
    filters,
    sharedFilters,
    returnEntries,
    resolveFirstParent,
    params = {},
    parent,
    debug = false,
  }: {
    level: number;
    contentTypeIds: string[];
    linkFields: LinkFields;
    filters: LinkDepthApiFilters;
    sharedFilters: LinkDepthApiFilters;
    returnEntries?: boolean;
    resolveFirstParent?: boolean;
    params: { [key: string]: string | undefined };
    parent?: QueryLevelResults;
    debug?: boolean;
  }) {
    this.level = level;
    this.contentTypeIds = contentTypeIds;
    this.linkFields = linkFields;
    this.linkFieldIds = Object.keys(linkFields).map(fId => fId);
    this.filters = filters;
    this.sharedFilters = sharedFilters;
    this.returnEntries =
      typeof returnEntries === 'undefined' ? level === 0 : returnEntries;
    this.resolveFirstParent = resolveFirstParent || false;
    this.params = params;
    this.parent = parent;
    this.debug = debug;

    this.runFirstQuery = Object.keys(params).some(
      p =>
        Object.keys(filters).includes(p) ||
        Object.keys(sharedFilters).includes(p)
    );
    this.runFinalQuery = Object.keys(params).some(
      p =>
        Object.keys(filters).includes(p) ||
        Object.keys(sharedFilters).includes(p)
    );

    this.firstQuery = searchQuery({
      contentTypeIds,
      filters: makeFilterExpressions(filters, params),
      sharedFilters: makeFilterExpressions(sharedFilters, params),
      // idFilters: parent?.validatedLinks
      //   ? makeFilterExpressions(parent.validatedLinks, params)
      //   : [], // these dont exist yet
      fields: ['sys.id', ...this.linkFieldIds],
      pageSize: 2000,
      searchTerm: params.term,
      versionStatus: params.versionStatus as any,
    });

    this.finalQuery = searchQuery({
      contentTypeIds,
      filters: makeFilterExpressions(filters, params),
      sharedFilters: makeFilterExpressions(sharedFilters, params),
      fields: JSON.parse(params.fields || '[]'),
      pageIndex: level === 0 ? Number(params.pageIndex) : 0,
      pageSize: level === 0 ? Number(params.pageSize) : 2000,
      searchTerm: params.term,
      versionStatus: params.versionStatus as any,
    });
  }

  AddChild = ({ child }: { child: QueryLevelResults }) => {
    this.children.push(child);
  };

  RunFirstQuery = async () => {
    const { firstQuery: query, params, parent, runFirstQuery } = this;

    if (parent?.validatedLinks.length) {
      // add any idFilters derived from parent query results
      appendSearchQueryFilters(
        query,
        makeFilterExpressions(
          Object.fromEntries(
            parent.validatedLinks.map(vl => [
              vl.linkFieldId,
              { fieldId: `sys.id` },
            ])
          ),
          Object.fromEntries(
            parent.validatedLinks.map(vl => [
              vl.linkFieldId,
              vl.entryIds.join(',') || `no ids from parent ${parent.level}`,
            ])
          )
        )
      );
    }

    if (runFirstQuery) {
      if (this.debug)
        console.log(
          `\nLevel ${this.level} - First query: \n${JSON.stringify(
            query.toJSON()
          ).substring(0, 1000)}`
        );

      this.firstResults = await cachedSearch.searchUsingPost(
        query,
        0,
        params.projectId
      );

      // mapResultsToValidatedLinks
      for (const linkFieldId of this.linkFieldIds) {
        this.validatedLinks.push({
          contentTypeId: this.linkFields[linkFieldId].contentTypeId || '',
          linkFieldId,
          entryIds: Util.GetIds(this.firstResults.items, linkFieldId),
        });
      }
    }
  };

  RunFinalQuery = async () => {
    const { level, children, finalQuery: query, params, runFinalQuery } = this;

    if (!children.some(c => c.returnEntries)) {
      const firstChild = children?.[0];
      // add any idFilters derived from child query results
      if (firstChild)
        appendSearchQueryFilters(
          query,
          makeFilterExpressions(
            Object.fromEntries(
              firstChild.validatedLinks.map(vl => [
                vl.linkFieldId,
                { fieldId: `${vl.linkFieldId}.sys.id` },
              ])
            ),
            Object.fromEntries(
              firstChild.validatedLinks.map(vl => [
                vl.linkFieldId,
                vl.entryIds.join(',') ||
                  `no ids from child ${firstChild.level}`,
              ])
            )
          )
        );
    }

    if (level === 0 && this.returnEntries) {
      // This is the final query to be run and response returned to the caller
      // Only this bit cares about linkDepth, fields and pagination parameters
      query.fields = JSON.parse(params.fields || '[]') as unknown as string[];
      query.pageSize = params.pageSize as unknown as number;
      query.pageIndex = params.pageIndex as unknown as number;
      // query.orderBy = params.orderBy;
    }

    if (runFinalQuery) {
      if (this.debug)
        console.log(
          `\nLevel ${this.level} - Final query: \n${JSON.stringify(
            query.toJSON()
          ).substring(0, 1000)}`
        );
      this.finalResults = await cachedSearch.searchUsingPost(
        query,
        Number(params.linkDepth) || 0,
        params.projectId
      );
      if (this.parent) this.parent.runFinalQuery = true;

      // mapResultsToValidatedLinks
      for (const linkFieldId of this.parent?.linkFieldIds || []) {
        this.validatedLinks.push({
          contentTypeId:
            this.parent?.linkFields[linkFieldId].contentTypeId || '',
          linkFieldId,
          entryIds: Util.GetIds(this.finalResults.items),
        });
      }
    }
  };

  GetResultsEntries = () => {
    const { finalResults, firstResults } = this;
    return finalResults?.items?.length
      ? finalResults.items
      : firstResults.items;
  };

  GetResults = () => {
    const { finalResults, firstResults } = this;
    return typeof finalResults?.totalCount !== 'undefined'
      ? finalResults
      : firstResults;
  };
}

export default QueryLevelResults;
