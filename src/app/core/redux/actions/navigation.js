import { action } from '~/core/util/helpers';
import {
  NAVIGATION_SET_LAST_SELECTED_MENU_ITEM,
  NAVIGATION_ENSURE_ENTRY_IN_PATH_DICTIONARY,
  NAVIGATION_SET_WAYPOINT,
} from '~/core/redux/types/navigation';
import {
  NAVIGATION_SET_IS_ACCORDIAN_MODE,
  NAVIGATION_ADD_SELECTED_MENU_ITEM_FOR_ACCORDIAN,
  NAVIGATION_REMOVE_SELECTED_MENU_ITEM_FOR_ACCORDIAN,
  NAVIGATION_CLEAR_MENU_ITEMS,
  GET_NAVIGATION_TREE,
} from '../types/navigation';

export const setLastSelectedMenuItem = (treeKey, lastSelectedMenuItemKey) =>
  action(NAVIGATION_SET_LAST_SELECTED_MENU_ITEM, {
    treeKey,
    lastSelectedMenuItemKey,
  });

export const clearMenuItems = (treeKey, menuItemKey) =>
  action(NAVIGATION_CLEAR_MENU_ITEMS, {
    treeKey,
    menuItemKey,
  });
export const addMenuItemForAccordian = (treeKey, menuItemKey) =>
  action(NAVIGATION_ADD_SELECTED_MENU_ITEM_FOR_ACCORDIAN, {
    treeKey,
    menuItemKey,
  });
export const removeMenuItemForAccordian = (treeKey, menuItemKey) =>
  action(NAVIGATION_REMOVE_SELECTED_MENU_ITEM_FOR_ACCORDIAN, {
    treeKey,
    menuItemKey,
  });
export const setIsAccordianMode = (treeKey, isAccordianMode) =>
  action(NAVIGATION_SET_IS_ACCORDIAN_MODE, {
    treeKey,
    isAccordianMode,
  });

export const ensureEntryInPathDictionary = id =>
  action(NAVIGATION_ENSURE_ENTRY_IN_PATH_DICTIONARY, { id });

export const setWaypoint = (name, scrollingUp, leave) =>
  action(NAVIGATION_SET_WAYPOINT, { name, scrollingUp, leave });

export const loadNavigationTree = () => action(GET_NAVIGATION_TREE, {});
