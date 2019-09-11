import { Map, fromJS, List } from 'immutable';
import {
  SET_ENTRY_ID,
  SET_ENTRY,
  SET_NAVIGATION_PATH,
  SET_NAVIGATION_NOT_FOUND,
  SET_NODE,
  SET_ANCESTORS,
  SET_ROUTE_LOADING,
  SET_ENTRY_RELATED_ARTICLES,
} from 'app/redux/types/routing';
import {
  GetAllResponseGuids,
  // fixImageUri,
} from 'app/util/ContensisDeliveryApi';

let initialState = Map({
  currentPath: [],
  currentNode: [],
  notFound: false,
  entryID: null,
  entry: null,
  entryDepends: new List(),
  contentTypeId: null,
  currentNodeAncestors: new List(),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENTRY_ID: {
      if (action.id === '') {
        return state;
      }
      return state.set('entryID', action.id);
    }
    case SET_ANCESTORS: {
      return state.set('currentNodeAncestors', fromJS(action.ancestors));
    }
    case SET_NODE: {
      // We have the entry stored elsewhere, so lets not keep it twice.
      if (action.node && action.node.entry) delete action.node.entry;
      return state.set('currentNode', fromJS(action.node));
    }
    case SET_ENTRY: {
      // Get Depends for entry
      var depends = GetAllResponseGuids(action.entry);
      // if (action.entry) {
      //   fixImageUri(action.entry);
      // }
      return state
        .set('entryDepends', fromJS(depends))
        .set('entry', fromJS(action.entry));
    }
    case SET_NAVIGATION_PATH: {
      if (action.path) {
        return state.set('currentPath', fromJS(action.path));
      }
      return state;
    }
    case SET_NAVIGATION_NOT_FOUND: {
      return state.set('notFound', fromJS(action.notFound));
    }
    case SET_ROUTE_LOADING: {
      return state.set('routeLoading', action.loading);
    }
    case SET_ENTRY_RELATED_ARTICLES: {
      return state.set('relatedArticles', fromJS(action.relatedArticles));
    }
    default:
      return state;
  }
};
