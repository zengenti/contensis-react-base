import { Query } from 'contensis-core-api';
import { VersionStatus } from 'contensis-core-api/lib/models';
import { Operators } from 'contensis-delivery-api/lib/entries/query';
import { CustomWhereClause, FeaturedResults, WeightedSearchField } from './Search';
export declare type FieldOperators = Exclude<keyof Operators, 'and' | 'or' | 'not'>;
export declare type LogicOperators = 'and' | 'or' | 'not';
export declare type FilterExpression = {
    key: string;
    values: string[];
    fieldOperator: FieldOperators;
    logicOperator: LogicOperators;
};
export declare type SearchQueryOptions = {
    assetTypes: string[];
    contentTypeIds: string[];
    customWhere: any;
    dynamicOrderBy: string[];
    excludeIds: string[];
    featuredResults: FeaturedResults;
    fields: string[];
    filters: FilterExpression[];
    includeInSearchFields: string[];
    languages: string[];
    pageSize: number;
    pageIndex: number;
    orderBy: string[];
    searchTerm: string;
    versionStatus: VersionStatus;
    webpageTemplates: string[];
    weightedSearchFields: WeightedSearchField[];
};
export declare type QueryParams = SearchQueryOptions & {
    env: string;
    internalPageIndex: number;
    internalPaging: boolean;
    linkDepth: number;
    loadMorePaging: boolean;
    pagesLoaded: number[];
    prevPageIndex: number;
    projectId: string;
    selectedFilters: {
        [key: string]: string;
    };
};
export declare type SearchQuery = ({ contentTypeIds, customWhere, dynamicOrderBy, excludeIds, featuredResults, fields, filters, languages, pageSize, pageIndex, orderBy, searchTerm, versionStatus, webpageTemplates, weightedSearchFields, }: SearchQueryOptions, isFeatured?: boolean) => Query;
export declare type FilterQuery = (contentTypeIds: string[], versionStatus: VersionStatus, customWhere?: CustomWhereClause) => Query;
