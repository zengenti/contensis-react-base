import { CustomWhereClause } from '../models/Search';
import { Filter, FilterItem, SearchState } from '../models/SearchState';

export const entries = {
  isLoading: false,
  isError: false,
  items: [],
};

export const pagingInfo = {
  isLoading: false,
  pageCount: 0,
  pageIndex: 0,
  pageSize: 0,
  pagesLoaded: [],
  prevPageIndex: 0,
  totalCount: 0,
};

export const searchFacet = {
  title: null,
  featuredEntries: entries,
  featuredResults: [],
  entries,
  results: [],
  queryParams: {},
  filters: {},
  queryDuration: 0,
  pagingInfo,
  projectId: '',
};

export const searchTab = {
  currentFacet: undefined,
  facets: {},
  id: 0,
  label: undefined,
  totalCount: '',
};

export const filtering = {
  isLoading: false,
  isError: false,
  isGrouped: false,
  title: undefined,
  contentTypeId: undefined,
  customWhere: [],
  fieldId: undefined,
  items: [],
} as Omit<Filter, 'customWhere' | 'items'> & {
  customWhere?: CustomWhereClause[];
  items?: FilterItem[];
};

export const filterItem = {
  key: '',
  type: undefined,
  title: undefined,
  path: undefined,
  isSelected: false,
} as FilterItem;

const config = {
  isLoaded: false,
  isError: false,
};

const searchState: SearchState = {
  context: 'facets',
  currentFacet: '',
  currentListing: '',
  facets: {},
  listings: {},
  minilist: {},
  term: '',
  tabs: [],
  config,
};

export const initialState = searchState;
