// load-entries.js
import * as log from 'loglevel';
import { takeEvery, put, select, call, all } from 'redux-saga/effects';
import {
  SET_ENTRY_ID,
  SET_ENTRY,
  SET_NAVIGATION_NOT_FOUND,
  SET_NODE,
  SET_ANCESTORS,
  SET_NAVIGATION_PATH,
  SET_ROUTE,
  CALL_HISTORY_METHOD,
  SET_SIBLINGS,
} from '~/core/redux/types/routing';
import { cachedSearch, deliveryApi } from '~/core/util/ContensisDeliveryApi';
import { selectVersionStatus } from '~/core/redux/selectors/version';
import {
  selectCurrentPath,
  selectCurrentProject,
  selectRouteEntry,
} from '~/core/redux/selectors/routing';
import { GET_NODE_TREE } from '../types/navigation';
import { hasNavigationTree } from '../selectors/navigation';
import { routeEntryByFields } from './queries';

export const routingSagas = [
  takeEvery(SET_NAVIGATION_PATH, getRouteSaga),
  takeEvery(SET_ROUTE, setRouteSaga),
];

/**
 * To navigate / push a specific route via redux middleware
 * @param {path, state} action
 */
function* setRouteSaga(action) {
  yield put({
    type: CALL_HISTORY_METHOD,
    payload: {
      method: 'push',
      args: [action.path, action.state],
    },
  });
}

function* getRouteSaga(action) {
  let entry = null;
  try {
    const { withEvents, routes, staticRoute } = action;
    let appsays;
    if (withEvents && withEvents.onRouteLoad) {
      appsays = yield withEvents.onRouteLoad(action);
    }
    // if appsays customNavigation: true, we will set doNavigation to false
    // if appsays customNavigation: { ... }, we will set doNavigation to the customNavigation object and check for child elements
    // if appsays nothing we will set doNavigation to true and continue to do navigation calls
    const doNavigation =
      !appsays ||
      (appsays && appsays.customNavigation === true
        ? false
        : (appsays && appsays.customNavigation) || true);

    const entryLinkDepth = (appsays && appsays.entryLinkDepth) || 3;
    const setContentTypeLimits =
      routes &&
      routes.ContentTypeMappings &&
      !!routes.ContentTypeMappings.find(ct => ct.fields || ct.linkDepth);

    const state = yield select();
    const routeEntry = selectRouteEntry(state);
    const currentPath = selectCurrentPath(state);
    const deliveryApiStatus = selectVersionStatus(state);
    const project = selectCurrentProject(state);
    const isHome = currentPath === '/';
    const isPreview = currentPath && currentPath.startsWith('/preview/');
    if (
      !isPreview &&
      ((appsays && appsays.customRouting) ||
        (staticRoute && !staticRoute.route.fetchNode) ||
        (routeEntry && action.statePath === action.path))
    ) {
      // To prevent erroneous 404s and wasted network calls, this covers
      // - appsays customRouting and does SET_ENTRY etc. via the consuming app
      // - all staticRoutes (where custom 'route.fetchNode' attribute is falsey)
      // - standard Contensis SiteView Routing where we already have that entry in state
      if (
        routeEntry &&
        (!staticRoute || (staticRoute.route && staticRoute.route.fetchNode))
      ) {
        // entry = routeEntry.toJS();
        // yield put({
        //   type: SET_ENTRY,
        //   entry,
        //   isLoading: false,
        // });
        //Do nothing, the entry is allready the right one.
      } else yield call(setRouteEntry);
    } else {
      let pathNode = null,
        ancestors = null,
        siblings = null;

      // Handle homepage
      if (isHome) {
        pathNode = yield cachedSearch.getRootNode(
          {
            depth: 0,
            entryFields: '*',
            entryLinkDepth,
            language: 'en-GB',
            versionStatus: deliveryApiStatus,
          },
          project
        );
      } else {
        // Handle preview routes
        if (isPreview) {
          let splitPath = currentPath.split('/');
          let entryGuid = splitPath[2];
          if (splitPath.length == 3) {
            // According to product dev we cannot use Node API
            // for previewing entries as it gives a response of []
            // -- apparently it is not correct to request latest content
            // with Node API
            let previewEntry = yield deliveryApi
              .getClient(deliveryApiStatus, project)
              .entries.get({ id: entryGuid, linkDepth: 3 });
            if (previewEntry) {
              pathNode = { entry: previewEntry };
              // yield call(setRouteEntry, previewEntry);
              // } else {
              // yield call(do404);
            }
          }
        } else {
          // Handle all other routes
          pathNode = yield cachedSearch.getNode(
            {
              depth:
                doNavigation === true || doNavigation.children === true
                  ? 3
                  : (doNavigation && doNavigation.children) || 0,
              path: currentPath,
              entryFields: setContentTypeLimits
                ? ['sys.contentTypeId', 'sys.id']
                : '*',
              entryLinkDepth: setContentTypeLimits ? 0 : entryLinkDepth,
              versionStatus: deliveryApiStatus,
            },
            project
          );
          if (
            setContentTypeLimits &&
            pathNode &&
            pathNode.entry &&
            pathNode.entry.sys &&
            pathNode.entry.sys.id
          ) {
            const contentType =
              routes &&
              routes.ContentTypeMappings &&
              routes.ContentTypeMappings.find(
                ct => ct.contentTypeID === pathNode.entry.sys.contentTypeId
              );
            const query = routeEntryByFields(
              pathNode.entry.sys.id,
              contentType && contentType.fields,
              deliveryApiStatus
            );
            const payload = yield cachedSearch.search(
              query,
              contentType && typeof contentType.linkDepth !== 'undefined'
                ? contentType.linkDepth
                : 3,
              project
            );
            if (payload && payload.items && payload.items.length > 0) {
              pathNode.entry = payload.items[0];
            }
          }
        }

        if (
          pathNode &&
          pathNode.id &&
          (doNavigation === true || doNavigation.ancestors)
        ) {
          ancestors = yield cachedSearch.getAncestors(pathNode.id, project);

          if (doNavigation === true || doNavigation.siblings) {
            siblings = yield cachedSearch.getSiblings(
              {
                id: pathNode.id,
                entryFields: ['sys.contentTypeId', 'url'],
              },
              project
            );
          }
        }
      }

      if (
        pathNode &&
        pathNode.entry &&
        pathNode.entry.sys &&
        pathNode.entry.sys.id
      ) {
        entry = pathNode.entry;
        yield call(setRouteEntry, entry, pathNode, ancestors, siblings);
      } else {
        yield call(do404);
      }
      if (!appsays || !appsays.preventScrollTop) {
        // Scroll into View
        if (typeof window !== 'undefined') {
          window.scroll({
            top: 0,
          });
        }
      }
    }
    if (withEvents && withEvents.onRouteLoaded) {
      yield withEvents.onRouteLoaded({ ...action, entry });
    }

    if (
      !hasNavigationTree(state) &&
      (doNavigation === true || doNavigation.tree)
    )
      // Load navigation clientside only, a put() should help that work
      yield put({
        type: GET_NODE_TREE,
        treeDepth:
          doNavigation === true ||
          !doNavigation.tree ||
          doNavigation.tree === true
            ? 2
            : doNavigation.tree,
      });
  } catch (e) {
    log.error(...['Error running route saga:', e, e.stack]);
    yield call(do404);
  }
}

function* setRouteEntry(entry, node, ancestors, siblings) {
  yield all([
    put({
      type: SET_NAVIGATION_NOT_FOUND,
      notFound: !(entry && entry.sys.id),
    }),
    put({
      type: SET_NODE,
      node,
    }),
    put({
      type: SET_ENTRY,
      entry: entry,
    }),
    put({
      type: SET_ENTRY_ID,
      id: (entry && entry.sys.id) || null,
    }),
    put({
      type: SET_ANCESTORS,
      ancestors,
    }),
    put({
      type: SET_SIBLINGS,
      siblings,
    }),
  ]);
}

function* do404() {
  yield put({
    type: SET_NAVIGATION_NOT_FOUND,
    notFound: true,
  });
  yield put({
    type: SET_ENTRY_ID,
    id: null,
  });
  yield put({
    type: SET_ENTRY,
    entry: null,
  });
}
