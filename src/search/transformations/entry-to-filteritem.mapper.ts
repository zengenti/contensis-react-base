import { default as mapEntry } from 'jsonpath-mapper';
import { FilterItemsMapper } from '../models/Search';
import { Fields } from '../search/schema';

// *** FILTER ITEM MAPPING ***

// Base mapping, fields that are the same across all mappings
// to save repeating these elements in every mapper, spread this
// into your discrete mappings
const base = {
  contentTypeId: Fields.sys.contentTypeId,
  title: 'entryTitle',
  key: 'sys.id',
  path: 'sys.slug',
  isSelected: 'isSelected',
  aggregate: 'aggregate',
};

const mapEntriesToFilterItems: FilterItemsMapper = entries => {
  if (!entries) return [];
  return entries.map(entry => {
    const template = base;
    if (template) {
      return mapEntry(entry, template);
    }
    return entry as any;
  });
};

export default mapEntriesToFilterItems;
