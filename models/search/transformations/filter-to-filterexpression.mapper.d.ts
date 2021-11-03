import { FilterExpression } from '../models/Queries';
import { Filter } from '../models/SearchState';
declare const mapFilterToFilterExpression: (filter: Filter & {
    selectedValues: string[];
}) => FilterExpression;
export default mapFilterToFilterExpression;
