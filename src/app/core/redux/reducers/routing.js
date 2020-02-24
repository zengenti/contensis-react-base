import { Map, fromJS, List, Set } from 'immutable';
import {
  SET_ENTRY_ID,
  SET_ENTRY,
  SET_NAVIGATION_PATH,
  SET_NAVIGATION_NOT_FOUND,
  SET_NODE,
  SET_ANCESTORS,
  SET_ROUTE_LOADING,
  SET_TARGET_PROJECT,
  SET_ROUTE,
  SET_SIBLINGS,
} from '~/core/redux/types/routing';
import { GetAllResponseGuids } from '~/core/util/ContensisDeliveryApi';

let initialState = Map({
  currentPath: '/',
  currentNode: [],
  currentProject: 'unknown',
  notFound: false,
  entryID: null,
  entry: null,
  entryDepends: new List(),
  contentTypeId: null,
  currentNodeAncestors: new List(),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ANCESTORS: {
      if (action.ancestors) {
        let ancestorIDs = action.ancestors.map(node => {
          return node.id;
        });

        let currentNodeDepends = state.get('nodeDepends');
        const allNodeDepends = Set.union([
          Set(ancestorIDs),
          currentNodeDepends,
        ]);
        return state
          .set('nodeDepends', allNodeDepends)
          .set('currentNodeAncestors', fromJS(action.ancestors));
      }
      return state.set('currentNodeAncestors', fromJS(action.ancestors));
    }
    case SET_ENTRY: {
      const entryDepends = GetAllResponseGuids(action.entry);
      return state
        .set('entryDepends', fromJS(entryDepends))
        .set('entry', fromJS(action.entry));
    }
    case SET_ENTRY_ID: {
      if (action.id === '') {
        return state;
      }
      return state.set('entryID', action.id);
    }
    case SET_NAVIGATION_PATH: {
      if (action.path) {
        return state
          .set('currentPath', fromJS(action.path))
          .set('location', fromJS(action.location))
          .set('staticRoute', fromJS(action.staticRoute));
      }
      return state;
    }
    case SET_NAVIGATION_NOT_FOUND: {
      return state.set('notFound', fromJS(action.notFound));
    }
    case SET_NODE: {
      // We have the entry stored elsewhere, so lets not keep it twice.
      // On Set Node, we reset all dependants.
      const nodeDepends = Set([action.node.id]);
      if (action.node && action.node.entry) delete action.node.entry;
      return state
        .set('nodeDepends', nodeDepends)
        .set('currentNode', fromJS(action.node));
    }
    case SET_ROUTE: {
      return state.set('nextPath', action.path);
    }
    case SET_ROUTE_LOADING: {
      return state.set('routeLoading', action.loading);
    }
    case SET_SIBLINGS: {
      // Can be null in some cases like the homepage.
      let currentNodeSiblingParent = null;
      let siblingIDs = [];
      if (action.siblings && action.siblings.length > 0) {
        currentNodeSiblingParent = action.siblings[0].parentId;
        siblingIDs = action.siblings.map(node => {
          return node.id;
        });
      }
      let currentNodeDepends = state.get('nodeDepends');
      const allNodeDepends = Set.union([Set(siblingIDs), currentNodeDepends]);
      return state
        .set('nodeDepends', allNodeDepends)
        .set('currentNodeSiblings', fromJS(action.siblings))
        .set('currentNodeSiblingsParent', currentNodeSiblingParent);
    }
    case SET_TARGET_PROJECT: {
      return state
        .set('currentProject', action.project)
        .set('allowedGroups', fromJS(action.allowedGroups));
    }
    default:
      return state;
  }
};
