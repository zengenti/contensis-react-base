import {
  SET_KEYWORD,
  SET_ENTRIES,
  SET_FACET,
  Facets,
  ContentTypes,
  FacetNames,
  Levels,
  StudyModes,
  StartMonths,
  SubjectAreas,
  TOGGLE_SEARCH_FILTER,
  TOGGLE_TAXONOMY_SELECTION_LIST,
  SET_SINGLE_FACET_MODE,
} from 'app/redux/types/search';
import { List, Map, fromJS } from 'immutable';

const searchFacet = Map({
  entries: new List([]),
  queryDuration: 0,
  pagingInfo: {
    pageIndex: 0,
    pageCount: 0,
    totalCount: 0,
    pageSize: 0,
  },
});

const CourseFiltering = Map({
  levels: new List(fromJS(Levels)),
  studyModes: new List(fromJS(StudyModes)),
  startMonths: new List(fromJS(StartMonths)),
  subjectAreas: new List(fromJS(SubjectAreas)),
  jointHonours: false,
  distanceLearning: false,
  clearing: false,
});

let initialState = Map({
  currentFacet: Facets.all,
  singleFacetMode: false,
  currentKeyword: null,
  latestKeyword: null,
  facets: new Map(),
  facetContentTypes: ContentTypes,
  facetNames: FacetNames,
  courseFilters: CourseFiltering,
});

// Load in Each of the Factet states

Object.keys(Facets)
  .map(key => Facets[key])
  .forEach(type => {
    initialState = initialState.setIn(
      ['facets', type],
      searchFacet.set('type', type)
    );
  });

// Add the search Promo State
initialState = initialState.setIn(
  ['facets', 'searchPromo'],
  searchFacet.set('type', 'searchPromo')
);

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SEARCH_FILTER: {
      return state.setIn(
        ['courseFilters', action.key],
        !state.getIn(['courseFilters', action.key])
      );
    }
    case TOGGLE_TAXONOMY_SELECTION_LIST: {
      let currentItems = state.getIn(['courseFilters', action.list]);
      let newItems = currentItems.toJS().map(item => {
        if (item.key == action.key) {
          item.selected = !item.selected;
        }
        return item;
      });
      return state.setIn(['courseFilters', action.list], fromJS(newItems));
    }
    case SET_KEYWORD: {
      if (action.keyword === '') {
        return state;
      }
      return state.set('currentKeyword', action.keyword);
    }
    case SET_FACET: {
      if (action.facet === '') {
        return state;
      }
      return state.set('currentFacet', action.facet);
    }
    case SET_SINGLE_FACET_MODE: {
      return state.set('singleFacetMode', true);
    }
    case SET_ENTRIES: {
      // debugger;
      return state
        .setIn(
          ['facets', action.facet, 'entries'],
          fromJS(action.payload.items)
        )
        .setIn(['facets', action.facet, 'queryDuration'], action.duration)
        .setIn(
          ['facets', action.facet, 'pagingInfo', 'pageCount'],
          action.payload.pageCount
        )
        .setIn(
          ['facets', action.facet, 'pagingInfo', 'totalCount'],
          action.payload.totalCount
        )
        .setIn(
          ['facets', action.facet, 'pagingInfo', 'pageSize'],
          action.payload.pageSize
        )
        .setIn(
          ['facets', action.facet, 'pagingInfo', 'pageIndex'],
          action.payload.pageIndex
        );
    }
    default:
      return state;
  }
};
