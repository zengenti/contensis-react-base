import { createSelector } from 'reselect';
import { MainNavigationSlug } from '../types/navigation';

export const getRecordWaypoint = state => {
  return state.getIn(['navigation', 'selectedWaypoint']);
};

export const selectNavigationTrees = state => {
  return state.getIn(['navigation', 'trees']);
};

export const makeSelectNavigationTreeEntries = treeKey =>
  createSelector(
    [selectNavigationTrees],
    trees => {
      const lastSelectedMenuItem =
        trees && trees.getIn([treeKey, 'lastSelectedMenuItem']);
      const entriesAsMap =
        trees &&
        trees.getIn([treeKey, 'menuItems', lastSelectedMenuItem, 'entries']);
      if (entriesAsMap) {
        const entries = entriesAsMap.toJS();
        return entries.sort((a, b) => a.order - b.order);
      }
      return null;
    }
  );
export const makeSelectNavigationTreeSelectedMenuItem = treeKey =>
  createSelector(
    [selectNavigationTrees],
    trees => {
      return trees && trees.getIn([treeKey, 'lastSelectedMenuItem']);
    }
  );
export const makeSelectNavigationTreeMenuItems = treeKey =>
  createSelector(
    [selectNavigationTrees],
    trees => {
      const menuItemsMap = trees && trees.getIn([treeKey, 'menuItems']);
      if (menuItemsMap && menuItemsMap.toJS) {
        const menuItemDictionary = menuItemsMap.toJS();
        return Object.keys(menuItemDictionary)
          .map(itemKey => menuItemDictionary[itemKey])
          .sort((a, b) => a.order - b.order);
      }
    }
  );

export const selectPathDictionary = state => {
  return state.getIn(['navigation', 'pathDictionary']);
};

export const selectNavigationDepends = state => {
  return state.getIn(['navigation', 'treeDepends']);
};

export const hasNavigationTree = state => {
  const treeEntries = state.getIn(['navigation', 'trees', MainNavigationSlug]);
  return treeEntries.size > 0;
};

export const makeSelectMenuItems = treeKey =>
  createSelector(
    [selectNavigationTrees],
    trees => {
      const navTreeMap = trees && trees.get(treeKey);
      if (navTreeMap && navTreeMap.toJS) {
        const navTree = navTreeMap.toJS();
        const {
          isAccordianMode,
          selectedAccordianMenuItems,
          lastSelectedMenuItem,
          menuItems,
        } = navTree;
        const selectedItems = isAccordianMode
          ? selectedAccordianMenuItems
          : lastSelectedMenuItem
          ? [lastSelectedMenuItem]
          : [];
        return menuItems
          ? Object.keys(menuItems)
              .map(menuKey => {
                const menuDetails = menuItems[menuKey];
                menuDetails.isSelected = selectedItems.indexOf(menuKey) > -1;
                return menuDetails;
              })
              .sort((a, b) => a.order - b.order)
          : [];
      }
    }
  );

export const makeSelectMenuIsAccordianMode = treeKey =>
  createSelector(
    [selectNavigationTrees],
    trees => {
      if (trees && trees.size) return trees.getIn([treeKey, 'isAccordianMode']);
    }
  );
