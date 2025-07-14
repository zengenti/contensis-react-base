import { FilterExpressionTypes } from '../search/schema';
import mapJson from 'jsonpath-mapper';
import { FilterExpression } from '../models/Queries';
import { Filter } from '../models/SearchState';

const filterExpressionMapper = {
  // Expression type: so we can identify how to build the query
  expressionType: ({ contentTypeId }: Filter) =>
    contentTypeId
      ? FilterExpressionTypes.contentType
      : FilterExpressionTypes.field,
  // Key: so we can target the query to a specific field
  key: 'fieldId',
  // Value: so we can filter a specific field by an array of values
  // e.g. taxonomy key or contentTypeId array
  values: 'selectedValues',
  fieldOperator: 'fieldOperator',
  logicOperator: 'logicOperator',
};

const mapFilterToFilterExpression = (
  filter: Filter & { selectedValues: string[] }
) => mapJson(filter, filterExpressionMapper) as FilterExpression;

export default mapFilterToFilterExpression;
