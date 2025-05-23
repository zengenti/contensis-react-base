import { QueryAggregations } from 'contensis-core-api';
import mapJson from 'jsonpath-mapper';

import {
  getFacet,
  getSelectedFilters,
  getQueryParameter,
  getSearchTerm,
  getPageIndex,
  getFilters,
  getCustomEnv,
  getPrevPageIndex,
  getPagesLoaded,
  selectCurrentProject,
  selectVersionStatus,
  getPageSize,
} from '../redux/selectors';
import { mapFiltersToFilterExpression } from './filters-to-filterexpressions.mapper';
import { UPDATE_PAGE_INDEX } from '../redux/types';
import { QueryParams } from '../models/Queries';
import { AppState } from '../models/SearchState';
import { Context } from '../models/Enums';
import {
  EnsureSearchAction,
  SetSearchEntriesAction,
} from '../models/SearchActions';
import { WeightedSearchField } from '../models/Search';
import { convertFieldIdForAggregation, convertKeyForAggregation } from '../search/util';

type QueryParamsMapperParams = {
  context: Context;
  facet: string;
  action: EnsureSearchAction | SetSearchEntriesAction;
  state: AppState;
};

const queryParamsTemplate = {
  aggregations: (root: QueryParamsMapperParams) => {
    const { context, facet, state } = root;
    const stateFilters = getFilters(state, facet, context, 'js');
    const aggregations: QueryAggregations = {};
    for (const [filterKey, filter] of Object.entries(stateFilters)) {
      if (filter.fieldId && !Array.isArray(filter.fieldId)) {
        aggregations[convertKeyForAggregation(filterKey)] = {
          field: convertFieldIdForAggregation(filter.fieldId),
          size: 100,
        };
      }
    }

    return {
      ...aggregations,
      ...getQueryParameter(root, 'customAggregations', {}),
    };
  },
  assetTypes: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'assetTypes', []),
  contentTypeIds: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'contentTypeIds', []),
  customWhere: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'customWhere', []),
  dynamicOrderBy: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'dynamicOrderBy', []),
  env: ({ state, facet, context }: QueryParamsMapperParams) =>
    getCustomEnv(state, facet, context),
  excludeIds: ({
    action: { excludeIds },
  }: {
    action: { excludeIds: string | string[] };
  }) => {
    // Exclude current route entry id from minilist searches or any supplied ids
    if (excludeIds)
      return Array.isArray(excludeIds)
        ? excludeIds
        : excludeIds.split(',').map(id => id.trim());
    return null;
  },
  featuredResults: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'featuredResults', null),
  fieldLinkDepths: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'fieldLinkDepths', []),
  fields: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'fields', []),
  filters: ({ state, facet, context }: QueryParamsMapperParams) => {
    const stateFilters = getFilters(state, facet, context, 'js');
    const selectedFilters = getSelectedFilters(state, facet, context, 'js');
    // Use another mapping function to map the filter parameters for the query
    const filterParams = mapFiltersToFilterExpression(
      stateFilters,
      selectedFilters
    );
    return filterParams;
  },
  fuzzySearch: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'fuzzySearch', false),
  includeInSearchFields: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'includeInSearch', []),
  internalPageIndex: ({ action, state }: QueryParamsMapperParams) =>
    getPageIndex(state, '', action.context),
  internalPaging: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'internalPaging', false),
  languages: ({ action }: QueryParamsMapperParams) =>
    action.defaultLang ? [action.defaultLang] : [],
  linkDepth: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'linkDepth', 0),
  loadMorePaging: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'loadMorePaging', false),
  omitDefaultSearchFields: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'omitDefaultSearchFields', []),
  orderBy: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'orderBy', []),
  pageIndex: (root: QueryParamsMapperParams) => {
    const { action, state } = root;
    if (getQueryParameter(root, 'internalPaging', false)) return 0;
    if (action.type === UPDATE_PAGE_INDEX) return action.params.pageIndex;
    return !action.preload
      ? getPageIndex(state, action.facet, action.context)
      : 0;
  },
  pageSize: (root: QueryParamsMapperParams) => {
    const { action, state } = root;
    return (
      getPageSize(state, action.facet, action.context) ||
      getQueryParameter(root, 'pageSize')
    );
  },
  pagesLoaded: ({ state, facet, context }: QueryParamsMapperParams) =>
    getPagesLoaded(state, facet, context),
  prevPageIndex: ({ state, facet, context }: QueryParamsMapperParams) =>
    getPrevPageIndex(state, facet, context),
  projectId: ({ state, facet, context }: QueryParamsMapperParams) =>
    getFacet(state, facet, context, 'js')?.projectId ||
    selectCurrentProject(state),
  searchTerm: (root: QueryParamsMapperParams) =>
    root.context !== Context.minilist ||
    getQueryParameter(root, 'useSearchTerm', false)
      ? getSearchTerm(root.state)
      : '',
  selectedFilters: ({ state, facet, context }: QueryParamsMapperParams) =>
    Object.fromEntries(
      Object.entries(getSelectedFilters(state, facet, context, 'js')).map(
        ([key, f]) => [key, f?.join(',')]
      )
    ),
  versionStatus: ({ state }: QueryParamsMapperParams) =>
    selectVersionStatus(state),
  weightedSearchFields: (root: QueryParamsMapperParams) => {
    const wsf = getQueryParameter(
      root,
      'weightedSearchFields',
      []
    ) as WeightedSearchField[];
    const deduped = wsf.filter(
      (v, i, a) => a.findIndex(t => t.fieldId === v.fieldId) === i
    );
    return deduped;
    // return wsf;
  },
  webpageTemplates: (root: QueryParamsMapperParams) =>
    getQueryParameter(root, 'webpageTemplates', []),
};

const mapStateToQueryParams = (sourceJson: QueryParamsMapperParams) =>
  mapJson(sourceJson, queryParamsTemplate) as QueryParams;

export default mapStateToQueryParams;
