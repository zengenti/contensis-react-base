import mapFilterToFilterExpression from './filter-to-filterexpression.mapper';

import { FilterExpression } from '../models/Queries';
import { Filters, SelectedFilters } from '../models/SearchState';

export const mapFiltersToFilterExpression = (
  filters: Filters,
  selectedFilters: SelectedFilters
) => {
  if (!selectedFilters || Object.keys(selectedFilters).length === 0) return [];
  const filterExpressions: FilterExpression[] = [];

  // Iterate through the keys in selectedFilters and locate
  // the items that are selected and queryable
  Object.entries(selectedFilters).map(([fkey, selectedValues]) => {
    const filter = filters[fkey];
    if (selectedValues && filter) {
      // Where we have a value for a selectedFilter
      // and a filter is found for the current key
      // map the filter to a filterExpression object
      const expr = mapFilterToFilterExpression({
        ...filter,
        selectedValues,
      });
      filterExpressions.push(expr);
    }
  });
  return filterExpressions;
};
