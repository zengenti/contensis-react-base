import { Query, OrderBy } from 'contensis-core-api';
// import { Query, OrderBy } from 'contensis-delivery-api';
import {
  contentTypeIdExpression,
  customWhereExpressions,
  defaultExpressions,
  excludeIdsExpression,
  featuredResultsExpression,
  filterExpressions,
  includeInSearchExpressions,
  languagesExpression,
  orderByExpression,
  termExpressions,
} from './expressions';
import { Fields } from './schema';
import { FilterQuery, SearchQuery } from '../models/Queries';

export const filterQuery: FilterQuery = (
  contentTypeIds,
  versionStatus,
  customWhere
) => {
  const query = new Query(
    ...[
      ...contentTypeIdExpression(contentTypeIds),
      ...defaultExpressions(versionStatus),
      ...customWhereExpressions(customWhere),
    ]
  );
  query.orderBy = OrderBy.asc(Fields.entryTitle);
  query.pageSize = 100;

  return query;
};

export const searchQuery: SearchQuery = (
  {
    assetTypes,
    contentTypeIds,
    customWhere,
    dynamicOrderBy,
    excludeIds,
    featuredResults,
    fieldLinkDepths,
    fields,
    filters,
    fuzzySearch,
    includeInSearchFields,
    languages,
    pageSize,
    pageIndex,
    omitDefaultSearchFields,
    orderBy,
    searchTerm,
    versionStatus,
    webpageTemplates,
    weightedSearchFields,
  },
  isFeatured = false
) => {
  let expressions = [
    ...termExpressions(
      searchTerm,
      weightedSearchFields,
      fuzzySearch,
      omitDefaultSearchFields
    ),
    ...defaultExpressions(versionStatus),
    ...includeInSearchExpressions(webpageTemplates, includeInSearchFields),
    ...languagesExpression(languages),
    ...customWhereExpressions(customWhere),
    ...excludeIdsExpression(excludeIds),
  ];
  if (isFeatured)
    expressions = [
      ...expressions,
      ...featuredResultsExpression(featuredResults),
    ];

  if (!isFeatured || (featuredResults && !featuredResults.contentTypeId))
    expressions = [
      ...expressions,
      ...filterExpressions(filters),
      ...contentTypeIdExpression(contentTypeIds, webpageTemplates, assetTypes),
    ];

  const query = new Query(...expressions);

  if (!searchTerm) query.orderBy = orderByExpression(orderBy);
  if (dynamicOrderBy && dynamicOrderBy.length)
    query.orderBy = orderByExpression(dynamicOrderBy);

  if (Object.keys(fieldLinkDepths || {}).length && !isFeatured)
    query.fieldLinkDepths = fieldLinkDepths;
  if (fields?.length && !isFeatured) query.fields = fields;

  query.pageIndex = isFeatured ? 0 : pageIndex;
  query.pageSize =
    isFeatured && typeof featuredResults.count === 'number'
      ? featuredResults.count
      : pageSize;
  return query;
};
