/* eslint-disable no-console */
import {
  expressions as exp,
  FieldOperators,
  FilterExpression,
  LogicOperators,
  SearchQueryOptions,
} from '~/search';
import { Op, Query } from 'contensis-core-api';
import { Entry } from 'contensis-delivery-api/lib/models';
import { cachedSearch } from '~/util/ContensisDeliveryApi';
import { LinkDepthApiFilters } from './api.d';
import { mergeResults, Util } from './util';

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type SearchQueryArgs = WithOptional<
  SearchQueryOptions & {
    idFilters?: SearchQueryOptions['filters'];
    sharedFilters?: SearchQueryOptions['filters'];
  },
  | 'assetTypes'
  | 'customWhere'
  | 'dynamicOrderBy'
  | 'excludeIds'
  | 'featuredResults'
  | 'fields'
  | 'includeInSearchFields'
  | 'languages'
  | 'omitDefaultSearchFields'
  | 'orderBy'
  | 'pageIndex'
  | 'searchTerm'
  | 'webpageTemplates'
  | 'weightedSearchFields'
>;
/**
 * Builds our complete Delivery API Query object from a set of provided arguments
 * @param queryParams
 * @returns Delivery API Query
 */
export const searchQuery = ({
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
  weightedSearchFields,
}: SearchQueryArgs) => {
  const expressions = [
    ...exp.defaultExpressions(versionStatus),
    ...exp.contentTypeIdExpression(
      contentTypeIds,
      webpageTemplates,
      assetTypes
    ),
    ...exp.customWhereExpressions(customWhere),
    ...exp.filterExpressions(filters),
    ...exp.filterExpressions(idFilters),
    ...(sharedFilters?.length > 0
      ? [Op.or(...exp.filterExpressions(sharedFilters, true))]
      : []),
    ...exp.termExpressions(searchTerm || '', weightedSearchFields || []),
  ];

  const query = new Query(...expressions);

  query.orderBy = exp.orderByExpression(orderBy || []);

  if (fields && fields.length > 0) {
    (query as any).fields = fields;
  }

  // (query as any).includeArchived = true;
  // (query as any).includeDeleted = true;
  query.pageIndex = pageIndex;
  query.pageSize = pageSize;
  return query;
};

export const appendSearchQueryFilters = (
  query: Query,
  idFilters: FilterExpression[]
) => {
  query.where.addRange(exp.filterExpressions(idFilters));
};

export const finalQuery = (
  {
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
    weightedSearchFields,
  }: SearchQueryArgs,
  children: Omit<SearchQueryArgs, 'pageSize' | 'pageIndex' | 'versionStatus'>[]
) => {
  const expressions = [
    ...exp.defaultExpressions(versionStatus),
    Op.or(
      Op.and(
        ...exp.contentTypeIdExpression(
          contentTypeIds,
          webpageTemplates,
          assetTypes
        ),
        ...exp.filterExpressions(filters),
        ...exp.filterExpressions(idFilters || []),

        ...(sharedFilters?.length
          ? [
              Op.or(
                ...exp.filterExpressions(sharedFilters || [])
                // Op.and(
                //   ...sharedFilters.map(sf =>
                //     Op.not(exp.fieldExpression(sf.key, true, 'exists')[0])
                //   ),
                //   ...exp.filterExpressions(idFilters)
                // )
              ),
            ]
          : [])
      ),
      ...children.map(child =>
        Op.and(
          ...exp.contentTypeIdExpression(
            child.contentTypeIds,
            child.webpageTemplates,
            child.assetTypes
          ),
          ...exp.filterExpressions(child.sharedFilters || []),
          ...exp.filterExpressions(child.idFilters || [])
        )
      )
    ),
    ...exp.termExpressions(searchTerm || '', weightedSearchFields || []),
  ];

  const query = new Query(...expressions);

  query.orderBy = exp.orderByExpression(orderBy || []);

  if (fields && fields.length > 0) {
    (query as any).fields = fields;
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
export const makeFilterExpressions = (
  f: LinkDepthApiFilters,
  params: { [param: string]: string | undefined }
): FilterExpression[] => {
  const expressions: FilterExpression[] = [];
  for (const [paramKey, filterConfig] of Object.entries(f)) {
    const filterValues = params[paramKey]?.split(',');
    if (typeof filterValues !== 'undefined')
      expressions.push({
        key:
          typeof filterConfig === 'object'
            ? filterConfig.fieldId
            : filterConfig,
        values: filterValues,
        fieldOperator:
          typeof filterConfig === 'object' && filterConfig.fieldOperator
            ? (filterConfig.fieldOperator as FieldOperators)
            : 'equalTo',
        logicOperator:
          typeof filterConfig === 'object' && filterConfig.logicOperator
            ? (filterConfig.logicOperator as LogicOperators)
            : 'or',
      });
  }
  return expressions;
};

export const makeDerivedIdsFilterExpression = (
  prevFieldId: string,
  entries: Entry[],
  ownIds = false,
  alwaysApplyFilter = false
) => {
  const previouslyDerivedIdsFilter = [] as FilterExpression[];
  const prevResultIds = Util.GetIds(entries);

  if (prevFieldId && prevResultIds?.length > 0)
    previouslyDerivedIdsFilter.push({
      key: ownIds ? 'sys.id' : `${prevFieldId}.sys.id`,
      values: prevResultIds,
      fieldOperator: 'in',
      logicOperator: 'or',
    });
  else if (alwaysApplyFilter)
    previouslyDerivedIdsFilter.push({
      key: 'intended-dud',
      values: ['1'],
      fieldOperator: 'in',
      logicOperator: 'or',
    });
  return previouslyDerivedIdsFilter;
};

export const resolveParentEntries = async (
  parentContentTypeIds: string[],
  replaceContentTypeIds: string[],
  parentFieldId: string,
  results: Entry[],
  params: any,
  debug: boolean
) => {
  // Build variables from query config to use in our Delivery API Query
  const previousIdsFilter = makeDerivedIdsFilterExpression(
    parentFieldId,
    results
  ) as any;

  const query = searchQuery({
    contentTypeIds: parentContentTypeIds,
    idFilters: previousIdsFilter,
  } as any);
  query.fields = params.fields
    ? [...(JSON.parse(params.fields) as unknown as string[]), parentFieldId]
    : [];

  if (debug)
    console.log(
      `\nResolve parent entries query: \n${JSON.stringify(
        query.toJSON()
      ).substring(0, 1000)}`
    );

  const parentResults = await cachedSearch.searchUsingPost(
    query,
    Number(params.linkDepth || 0),
    params.projectId
  );

  return mergeResults(
    results,
    Util.GetItems(parentResults),
    replaceContentTypeIds,
    parentFieldId
  );
};
