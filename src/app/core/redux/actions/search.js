import { action } from '~/core/util/helpers';
import {
  EXECUTE_SEARCH,
  SET_KEYWORD,
  SET_FACET,
  CHANGE_PAGE,
  TOGGLE_LEVEL,
  TOGGLE_STUDY_MODE,
  TOGGLE_SEARCH_FILTER,
  TOGGLE_TAXONOMY_SELECTION_LIST,
  SET_SINGLE_FACET_MODE,
} from '~/core/redux/types/search';

export const setSingleFacetMode = () => action(SET_SINGLE_FACET_MODE);
export const executeSearch = () => action(EXECUTE_SEARCH);
export const setKeyWord = keyword => action(SET_KEYWORD, { keyword });
export const setFacet = facet => action(SET_FACET, { facet });
export const changePage = index => action(CHANGE_PAGE, { index });
export const toggleLevel = (selected, key) =>
  action(TOGGLE_LEVEL, { selected, key });
export const toggleStudyMode = (selected, key) =>
  action(TOGGLE_STUDY_MODE, { selected, key });
export const toggleSearchFilter = key => action(TOGGLE_SEARCH_FILTER, { key });

export const toggleTaxonomySelectionList = (list, key) =>
  action(TOGGLE_TAXONOMY_SELECTION_LIST, { list, key });
