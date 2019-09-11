import { Map, fromJS } from 'immutable';
import { courseNav } from 'app/redux/types/routing';
import {
  NAVIGATION_SET_TREE_ROOT,
  NAVIGATION_INITIALISE_TREES_ERROR,
  NAVIGATION_SET_LAST_SELECTED_MENU_ITEM,
  NAVIGATION_SET_TREE_ENTRIES,
  NAVIGATION_SET_TREE_ENTRIES_ERROR,
  NAVIGATION_SET_PATH_DICTIONARY_ENTRY,
  NAVIGATION_CLEAR_MENU_ITEMS,
  NAVIGATION_SET_WAYPOINT,
} from 'app/redux/types/navigation';
import { NAVIGATION_SET_PATH_DICTIONARY } from 'app/redux/types/navigation';
import {
  NAVIGATION_SET_IS_ACCORDIAN_MODE,
  NAVIGATION_ADD_SELECTED_MENU_ITEM_FOR_ACCORDIAN,
  NAVIGATION_REMOVE_SELECTED_MENU_ITEM_FOR_ACCORDIAN,
  CLEAR_MENU_SELECTIONS_FOR_TREE,
} from '../types/navigation';

const emptyTree = {
  lastSelectedMenuItem: null,
  selectedAccordianMenuItems: [],
  isAccordianMode: false,
  menuItems: null,
};

const initialState = Map({
  trees: fromJS({}),
  treesError: false,
  treeDepends: [],
  pathDictionary: fromJS({}),
  selectedWaypoint: 'overview',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATION_SET_TREE_ROOT: {
      const tree = fromJS({ ...emptyTree, menuItems: action.menuItems });
      return state.setIn(['trees', action.treeKey], tree);
    }
    case NAVIGATION_SET_WAYPOINT: {
      if (action.name === '') {
        return state;
      }
      if (action.scrollingUp) {
        if (!action.leave) {
          // Bump it up by one, unless it is the first, in which case we need to set it to the first nav item
          const askedForIndex = courseNav.findIndex(
            navItem => navItem.link == action.name
          );
          if (askedForIndex == 0) {
            return state.set('selectedWaypoint', action.name);
          }
        }

        const currentWaypoint = state.get('selectedWaypoint');
        const currentIndex = courseNav.findIndex(
          navItem => navItem.link == currentWaypoint
        );
        if (currentIndex == 0) {
          return state;
        }
        const LeaveIndex = courseNav.findIndex(
          navItem => navItem.link == action.name
        );
        if (action.leave) {
          if (LeaveIndex == currentIndex) {
            const nextWaypoint = courseNav[currentIndex - 1];
            return state.set('selectedWaypoint', nextWaypoint.link);
          } else {
            return state;
          }
        } else {
          const nextWaypoint = courseNav[currentIndex - 1];
          return state.set('selectedWaypoint', nextWaypoint.link);
        }
      }
      return state.set('selectedWaypoint', action.name);
    }
    case NAVIGATION_SET_LAST_SELECTED_MENU_ITEM: {
      return state.setIn(
        ['trees', action.treeKey, 'lastSelectedMenuItem'],
        action.lastSelectedMenuItemKey
      );
    }
    case NAVIGATION_CLEAR_MENU_ITEMS: {
      return state.setIn(
        ['trees', action.treeKey, 'lastSelectedMenuItem'],
        null
      );
    }
    case NAVIGATION_SET_TREE_ENTRIES: {
      return state
        .setIn(
          ['trees', action.treeKey, 'menuItems', action.menuItemKey, 'entries'],
          fromJS(action.entries)
        )
        .setIn(
          [
            'trees',
            action.treeKey,
            'menuItems',
            action.menuItemKey,
            'entriesLoadedSuccess',
          ],
          true
        );
    }
    case NAVIGATION_SET_TREE_ENTRIES_ERROR: {
      return state.setIn(
        [
          'trees',
          action.treeKey,
          'menuItems',
          action.menuItemKey,
          'entriesLoadedSuccess',
        ],
        action.loaded
      );
    }
    case NAVIGATION_INITIALISE_TREES_ERROR: {
      return state.set('treesError', true);
    }
    case NAVIGATION_SET_IS_ACCORDIAN_MODE: {
      return state.setIn(
        ['trees', action.treeKey, 'isAccordianMode'],
        action.isAccordianMode
      );
    }
    case NAVIGATION_ADD_SELECTED_MENU_ITEM_FOR_ACCORDIAN: {
      return state.updateIn(
        ['trees', action.treeKey, 'selectedAccordianMenuItems'],
        array => array.concat([action.menuItemKey])
      );
    }
    case NAVIGATION_REMOVE_SELECTED_MENU_ITEM_FOR_ACCORDIAN: {
      return state.updateIn(
        ['trees', action.treeKey, 'selectedAccordianMenuItems'],
        array => array.filter(item => item !== action.menuItemKey)
      );
    }
    case NAVIGATION_SET_PATH_DICTIONARY_ENTRY: {
      return state.setIn(
        ['pathDictionary', action.details.path],
        fromJS(action.details)
      );
    }
    case NAVIGATION_SET_PATH_DICTIONARY: {
      return state.set('pathDictionary', fromJS(action.dictionary));
    }
    case CLEAR_MENU_SELECTIONS_FOR_TREE: {
      return state
        .setIn(['trees', action.treeKey, 'lastSelectedMenuItem'], null)
        .setIn(
          ['trees', action.treeKey, 'selectedAccordianMenuItems'],
          fromJS([])
        );
    }
    default:
      return state;
  }
};
