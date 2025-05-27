import merge from 'deepmerge';
import { parse, stringify } from 'query-string';
import mapJson from 'jsonpath-mapper';

import getIn from '../redux/getIn';
import {
  getSelectedFilters,
  getSearchTerm,
  getCurrentFacet,
  getSearchContext,
  selectCurrentPath,
} from '../redux/selectors';
import { removeEmptyAttributes } from '../search/util';

import { NavigateMapper, SearchUriMapping } from '../models/Search';

const searchUriTemplate: SearchUriMapping = {
  path: ({ state, facet }) => {
    const context = getSearchContext(state);
    const currentPath = selectCurrentPath(state) || '/search';

    if (context !== 'listings') {
      const currentFacet = facet || getCurrentFacet(state);

      const filters = getSelectedFilters(state, facet, context);
      const currentFilter = filters.contentTypeId;

      // Check if we have a filter first
      const newPath =
        currentFilter?.length > 0 && currentFacet
          ? `${currentPath}/${currentFacet}/${currentFilter}`
          : currentFacet
            ? `${currentPath}/${currentFacet}`
            : currentPath;

      return newPath;
    } else {
      return currentPath;
    }
  },
  search: ({ state, facet, orderBy, term, pageIndex, pageSize }) => {
    const searchContext = getSearchContext(state);
    // Lose stateFilters and currentSearch if a new
    // term is passed via an argument
    const stateFilters = term
      ? {}
      : Object.fromEntries(
          Object.entries(
            getSelectedFilters(state, facet, searchContext, 'js')
          ).map(([k, f]: [string, any]) => [k, f?.join(',')])
        );

    const currentSearch =
      !term && getIn(state, ['routing', 'location', 'search']);

    const currentQs = removeEmptyAttributes(parse(currentSearch));

    if (orderBy) currentQs.orderBy = orderBy;

    const searchTerm = getSearchTerm(state);
    // Use Immutable's merge to merge the stateFilters with any current Qs
    // to build the new Qs.
    const mergedSearch = removeEmptyAttributes(merge(currentQs, stateFilters));

    // We must handle term === '' separately, because this means the user has cleared the search term
    // If this is true, we don't want to fall back to the existing search term. We only want to do that if the
    // incoming term is explicitly undefined.
    if (typeof term != 'undefined') {
      if (term) mergedSearch.term = term;
      else if (term === '') delete mergedSearch.term;
    } else {
      if (searchTerm) mergedSearch.term = searchTerm;
    }

    if (pageIndex) mergedSearch.pageIndex = pageIndex + 1;
    if (pageIndex === 0) mergedSearch.pageIndex = undefined;
    if (pageSize) mergedSearch.pageSize = pageSize;

    // We don't want these as search params in the url, we just need the search package to see them
    return stringify(mergedSearch);
  },
  hash: ({ state }) =>
    getIn(state, ['routing', 'location', 'hash'], '').replace('#', ''),
};

const mapStateToSearchUri: NavigateMapper = state =>
  mapJson(state, searchUriTemplate);

export default mapStateToSearchUri;
