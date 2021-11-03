import { FilterExpression } from '../models/Queries';
import { Filters, SelectedFilters } from '../models/SearchState';
export declare const mapFiltersToFilterExpression: (filters: Filters, selectedFilters: SelectedFilters) => FilterExpression[];
