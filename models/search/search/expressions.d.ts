import { IExpression, ILogicalExpression, VersionStatus } from 'contensis-core-api';
import { CustomWhereClause, WeightedSearchField } from '../models/Search';
import { FieldOperators } from '../models/Queries';
export declare const fieldExpression: (field: string | string[], value: any, operator?: FieldOperators, weight?: number | undefined) => IExpression[];
export declare const contentTypeIdExpression: (contentTypeIds: string[], webpageTemplates?: string[] | undefined, assetTypes?: string[] | undefined) => ILogicalExpression[];
export declare const filterExpressions: (filters: {
    key: string;
    value: string;
    operator: FieldOperators;
}[]) => IExpression[];
export declare const dataFormatExpression: (contentTypeIds: string[], dataFormat?: string) => ILogicalExpression[];
export declare const featuredResultsExpression: ({ contentTypeId, fieldId, fieldValue, }?: {
    contentTypeId?: string | string[] | undefined;
    fieldId?: string | string[] | undefined;
    fieldValue?: boolean | undefined;
}) => IExpression[];
export declare const languagesExpression: (languages: string[]) => IExpression[];
export declare const includeInSearchExpressions: (webpageTemplates: string[], includeInSearchFields: string[]) => IExpression[];
export declare const defaultExpressions: (versionStatus: VersionStatus) => IExpression[];
export declare const excludeIdsExpression: (excludeIds: string[]) => ILogicalExpression[];
export declare const orderByExpression: (orderBy: string[]) => import("contensis-core-api").ContensisQueryOrderBy;
/**
 * Accept HTTP style objects and map them to
 * their equivalent JS client "Op" expressions
 * @param {array} where the where array as you'd provide it to the HTTP API
 * @returns {array} array of constructed Delivery API Operators
 */
export declare const customWhereExpressions: (where?: CustomWhereClause | undefined) => IExpression[];
export declare const termExpressions: (searchTerm: string, weightedSearchFields: WeightedSearchField[]) => any[];
