import { Draft, original, produce } from 'immer';

import {
  SET_ENTRY,
  SET_NAVIGATION_PATH,
  SET_ANCESTORS,
  SET_TARGET_PROJECT,
  SET_ROUTE,
  SET_SIBLINGS,
  SET_SURROGATE_KEYS,
  UPDATE_LOADING_STATE,
} from './types';

const initialState = {
  canonicalPath: null,
  currentHostname: null,
  currentPath: '/',
  currentNode: {},
  currentNodeAncestors: [],
  currentProject: 'unknown',
  entryID: null,
  entry: null,
  error: undefined,
  isError: false,
  isLoading: false,
  location: {},
  mappedEntry: null,
  notFound: false,
  staticRoute: null,
  statusCode: 200,
};

export default produce((state: Draft<any>, action) => {
  switch (action.type) {
    case SET_ANCESTORS: {
      state.currentNodeAncestors = action.ancestors;
      return;
    }
    case SET_ENTRY: {
      const {
        entry,
        error,
        mappedEntry,
        node = {},
        isError = false,
        isLoading = false,
        notFound = false,
        statusCode,
        currentPath,
      } = action;

      let defaultStatus = 200;
      if (notFound === true && isError === false) defaultStatus = 404;
      else if (isError === true) defaultStatus = statusCode || 500;

      if (!entry) {
        state.entryID = null;
        state.entry = null;
        state.error = error;
        state.mappedEntry = null;
        state.isError = isError;
        state.isLoading = isLoading;
        state.notFound = notFound;
        state.statusCode = statusCode || defaultStatus;
        state.canonicalPath = currentPath;
      } else {
        state.entryID = action.id;
        state.entry = entry;
        state.error = error;
        state.isError = isError;
        state.isLoading = isLoading;
        state.notFound = notFound;
        state.statusCode = statusCode || defaultStatus;
        state.canonicalPath = entry.sys.uri || currentPath;

        if (mappedEntry && Object.keys(mappedEntry).length > 0) {
          state.mappedEntry = mappedEntry;
          state.entry = { sys: entry.sys };
        }
      }

      if (!node) {
        state.currentNode = null;
      } else {
        // On Set Node, we reset all dependants.
        state.currentNode = node;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { entry, ...nodeWithoutEntry } = node; // We have the entry stored elsewhere, so lets not keep it twice.
        state.currentNode = nodeWithoutEntry;
      }

      return;
    }
    case UPDATE_LOADING_STATE: {
      state.isLoading = action.isLoading;
      return;
    }
    case SET_NAVIGATION_PATH: {
      let staticRoute = {} as any;
      if (action.staticRoute) {
        staticRoute = { ...action.staticRoute };
      }
      if (action.path) {
        // Don't run a path update on initial load as we allready should have it in redux
        const entryUri = state?.entry?.sys?.uri;
        if (entryUri !== action.path) {
          state.currentPath = action.path;
          state.location = action.location;
          state.staticRoute = {
            ...staticRoute,
            route: { ...staticRoute.route, component: null },
          };
          state.isLoading = typeof window !== 'undefined';
        } else {
          state.location = action.location;
          state.staticRoute = {
            ...staticRoute,
            route: { ...staticRoute.route, component: null },
          };
        }
      }
      return;
    }
    case SET_ROUTE: {
      state.nextPath = action.path;
      return;
    }
    case SET_SIBLINGS: {
      // Can be null in some cases like the homepage.
      let currentNodeSiblingParent = null;
      if (action.siblings && action.siblings.length > 0) {
        currentNodeSiblingParent = action.siblings[0].parentId;
      }

      state.currentNodeSiblings = action.siblings;
      state.currentNodeSiblingsParent = currentNodeSiblingParent;
      return;
    }
    case SET_SURROGATE_KEYS: {
      const newKeys = (action.keys || '').split(' ');
      const stateKeys = state.surrogateKeys
        ? original(state.surrogateKeys)
        : [];
      const allKeys = [...stateKeys, ...newKeys];
      const uniqueKeys = [...new Set(allKeys)];
      state.surrogateKeys = uniqueKeys;
      return;
    }
    case SET_TARGET_PROJECT: {
      state.currentProject = action.project;
      state.allowedGroups = action.allowedGroups;
      state.currentHostname = action.hostname;
      return;
    }
    default:
      return state;
  }
}, initialState);
