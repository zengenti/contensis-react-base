import {
  ContensisQueryAggregations,
  FieldLinkDepths,
  Operators,
  Query,
  VersionStatus,
} from 'contensis-core-api';
import {
  CustomWhereClause,
  FeaturedResults,
  WeightedSearchField,
} from './Search';

export type FieldOperators = Exclude<keyof Operators, 'and' | 'or' | 'not'>;
export type LogicOperators = 'and' | 'or' | 'not';

export type FilterExpression = {
  key: string;
  values: string[];
  fieldOperator: FieldOperators;
  logicOperator: LogicOperators;
};

export type SearchQueryOptions = {
  aggregations: ContensisQueryAggregations;
  assetTypes: string[];
  contentTypeIds: string[];
  customWhere: any;
  dynamicOrderBy: string[];
  excludeIds: string[];
  featuredResults: FeaturedResults;
  fieldLinkDepths: FieldLinkDepths;
  fields: string[];
  filters: FilterExpression[];
  fuzzySearch?: boolean;
  includeInSearchFields: string[];
  languages: string[];
  pageSize: number;
  pageIndex: number;
  omitDefaultSearchFields: string[];
  orderBy: string[];
  searchTerm: string;
  versionStatus: VersionStatus;
  webpageTemplates: string[];
  weightedSearchFields: WeightedSearchField[];
};

export type QueryParams = SearchQueryOptions & {
  env: string;
  internalPageIndex: number;
  internalPaging: boolean;
  linkDepth: number;
  loadMorePaging: boolean;
  pagesLoaded: number[];
  prevPageIndex: number;
  projectId: string;
  selectedFilters: { [key: string]: string };
};

export type SearchQuery = (
  {
    aggregations,
    contentTypeIds,
    customWhere,
    dynamicOrderBy,
    excludeIds,
    featuredResults,
    fields,
    filters,
    fuzzySearch,
    languages,
    pageSize,
    pageIndex,
    omitDefaultSearchFields,
    orderBy,
    searchTerm,
    versionStatus,
    webpageTemplates,
    weightedSearchFields,
  }: SearchQueryOptions,
  isFeatured?: boolean
) => Query;

export type FilterQuery = (
  contentTypeIds: string[],
  versionStatus: VersionStatus,
  customWhere?: CustomWhereClause
) => Query;
