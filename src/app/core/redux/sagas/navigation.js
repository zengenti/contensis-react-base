import {
  put,
  all,
  call,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { deliveryApi } from 'app/util/ContensisDeliveryApi';
// import { getFullPathFromEntryId } from 'app/util/navHelper';

import {
  getNavigationTreeQuery,
  getNavigationTreeEntriesQuery,
} from 'app/util/queries';
import {
  NAVIGATION_SET_TREE_ROOT,
  // NAVIGATION_INITIALISE_TREES,
  NAVIGATION_INITIALISE_TREES_ERROR,
} from 'app/redux/types/navigation';
import {
  NAVIGATION_SET_TREE_ENTRIES,
  NAVIGATION_SET_TREE_ENTRIES_ERROR,
  NAVIGATION_SET_PATH_DICTIONARY_ENTRY,
} from 'app/redux/types/navigation';
import {
  selectNavigationTrees,
  selectPathDictionary,
} from 'app/redux/selectors/navigation';
import { getPathDictionary, getPathFromEntry } from 'app/util/navHelper';
import {
  NAVIGATION_SET_PATH_DICTIONARY,
  CLEAR_MENU_SELECTIONS,
  CLEAR_MENU_SELECTIONS_FOR_TREE,
} from 'app/redux/types/navigation';
import { selectVersionStatus } from '../selectors/version';

export const navigationSagas = [
  takeEvery(
    NAVIGATION_SET_PATH_DICTIONARY_ENTRY,
    ensureEntryInPathDictionarySaga
  ),
  takeLatest(CLEAR_MENU_SELECTIONS, clearMenuSelectionsSaga),
];

export function* initialiseNavigationSaga() {
  yield call(getNavigationTreeRootsSaga);
  yield call(ensurePathDictionarySaga);
}

function* getNavigationTreeRootsSaga() {
  const query = yield getNavigationTreeQuery();
  const navItemsResult = yield deliveryApi.search(query, 2);
  if (
    navItemsResult &&
    navItemsResult.items &&
    navItemsResult.items.length > 0
  ) {
    yield all(
      navItemsResult.items.map(navTree => {
        const menuItemsArray = navTree.menu.map((menuItem, i) => {
          return {
            title: menuItem.entryTitle,
            slug: menuItem.sys.slug,
            link: `/${menuItem.sys.slug}`,
            order: i,
            entries: null,
            id: menuItem.sys.id,
            entriesLoadedSuccess: null,
            menuContentType: menuItem.sys.contentTypeId,
            cards: menuItem.card,
          };
        });
        const menuItems = menuItemsArray.reduce((dictionary, item) => {
          dictionary[item.slug] = item;
          return dictionary;
        }, {});
        return put({
          type: NAVIGATION_SET_TREE_ROOT,
          treeKey: navTree.sys.slug,
          menuItems: menuItems,
          selected: null,
        });
      })
    );
    yield all(
      navItemsResult.items.map(navTree =>
        call(ensureNavigationEntriesSaga, navTree.sys.slug)
      )
    );
  } else {
    yield put({ type: NAVIGATION_INITIALISE_TREES_ERROR, isError: true });
  }
}

function* ensureNavigationEntriesSaga(treeKey) {
  const navTrees = yield select(selectNavigationTrees);
  const navTreeMenuItemsAsMap =
    navTrees && navTrees.getIn([treeKey, 'menuItems']);
  const navTreeMenuItems =
    navTreeMenuItemsAsMap &&
    navTreeMenuItemsAsMap.toJS &&
    navTreeMenuItemsAsMap.toJS();
  yield all(
    Object.keys(navTreeMenuItems).map(menuItemKey =>
      call(ensureNavigationEntriesForMenuItemSaga, treeKey, menuItemKey)
    )
  );
}

function* ensureNavigationEntriesForMenuItemSaga(treeKey, menuItemKey) {
  const navTrees = yield select(selectNavigationTrees);
  const deliveryApiVersionStatus = yield select(selectVersionStatus);
  const treeNodeId = navTrees.getIn([treeKey, 'menuItems', menuItemKey, 'id']);
  const menuContentType = navTrees.getIn([
    treeKey,
    'menuItems',
    menuItemKey,
    'menuContentType',
  ]);
  let hasLoaded = false;

  let rawEntries;
  switch (menuContentType) {
    case 'linkCollection': {
      const result = yield deliveryApi.getEntry(
        treeNodeId,
        2,
        deliveryApiVersionStatus
      );
      rawEntries = result && result.linkPicker ? result.linkPicker : [];
      break;
    }
    default: {
      const query = yield getNavigationTreeEntriesQuery(treeNodeId);
      const result = yield deliveryApi.search(query, 3);
      rawEntries =
        result && result.items && result.items.length > 0 ? result.items : [];
    }
  }

  if (rawEntries) {
    const entries = rawEntries.map((entry, i) => {
      return {
        title: entry.entryTitle,
        slug: entry.sys.slug,
        categories: entry.category
          ? entry.category.map(({ name }) => name)
          : null,
        link: getPathFromEntry(entry),
        order: i,
        id: entry.sys.id,
      };
    });
    yield put({
      type: NAVIGATION_SET_TREE_ENTRIES,
      treeKey,
      menuItemKey,
      entries,
    });
    hasLoaded = true;
  }
  if (!hasLoaded) {
    yield put({
      type: NAVIGATION_SET_TREE_ENTRIES_ERROR,
      treeKey: treeKey,
      menuItemKey,
      loaded: hasLoaded,
    });
  }
}

function* ensureEntryInPathDictionarySaga(action) {
  const pathDictionary = yield select(selectPathDictionary);
  if (!pathDictionary.get(action.id)) {
    // const details = yield getFullPathFromEntryId(action.id);
    yield put({
      type: NAVIGATION_SET_PATH_DICTIONARY_ENTRY,
      details: { id: 'blah', path: '/boo/blah', contentTypeId: 'contentPage' },
    });
  }
}

function* ensurePathDictionarySaga() {
  const pathDictionary = yield select(selectPathDictionary);
  if (!pathDictionary || !pathDictionary.size) {
    const versionStatus = yield select(selectVersionStatus);
    const dictionary = yield getPathDictionary(versionStatus);
    yield put({ type: NAVIGATION_SET_PATH_DICTIONARY, dictionary });
  }
}

function* clearMenuSelectionsSaga() {
  const treesAsMap = yield select(selectNavigationTrees);
  if (treesAsMap && treesAsMap.size && treesAsMap.toJS) {
    const trees = treesAsMap.toJS();
    yield all(
      Object.keys(trees).map(treeKey =>
        put({ type: CLEAR_MENU_SELECTIONS_FOR_TREE, treeKey })
      )
    );
  }
}
