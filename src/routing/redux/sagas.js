import to from 'await-to-js';
import * as log from 'loglevel';
import { takeEvery, put, select, call, all } from 'redux-saga/effects';

import {
  SET_ENTRY,
  SET_ANCESTORS,
  SET_NAVIGATION_PATH,
  SET_ROUTE,
  SET_SIBLINGS,
  UPDATE_LOADING_STATE,
} from './types';
import { GET_NODE_TREE } from '~/redux/types/navigation';
import {
  selectCurrentAncestors,
  selectCurrentNode,
  selectCurrentProject,
  selectCurrentSiblings,
  selectMappedEntry,
  selectRouteEntry,
  selectRouteEntryEntryId,
  selectRouteEntryLanguage,
} from './selectors';
import { hasNavigationTree } from '~/redux/selectors/navigation';
import { selectVersionStatus } from '~/redux/selectors/version';
import { handleRequiresLoginSaga } from '~/user/redux/sagas/login';
import { ensureNodeTreeSaga } from '~/redux/sagas/navigation';
import { injectRedux as reduxInjector } from '~/redux/store/injectors';

import { LoginHelper } from '~/user';
import { findContentTypeMapping } from '../util/find-contenttype-mapping';
import { routeEntryByFieldsQuery } from '../util/queries';

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
    type: 'CALL_HISTORY_METHOD',
    payload: {
      method: 'push',
      args: [action.path, action.state],
    },
  });
}

function* getRouteSaga(action) {
  let entry = null;
  try {
    const {
      withEvents,
      routes: { ContentTypeMappings = {} } = {},
      staticRoute,
      // get api instance from ssr context that is connected to the specific request in ssr
      ssr: { api },
    } = action;

    // Inject redux { key, reducer, saga } provided by staticRoute
    if (staticRoute && staticRoute.route.injectRedux)
      yield call(reduxInjectorSaga, staticRoute.route.injectRedux);

    // Variables we will pass to setRouteEntry
    let pathNode = null,
      ancestors = null,
      children = [],
      siblings = null;

    let contentTypeMapping = {};

    // These variables are the return values from
    // calls to withEvents.onRouteLoad and onRouteLoaded
    let appsays,
      requireLogin = false;

    if (withEvents && withEvents.onRouteLoad) {
      appsays = yield withEvents.onRouteLoad(action);
    }

    // We could improve this further with a reusable mapper
    // function to return these params given a static route
    // or matching a content type mapping we could call at various points
    // enabling us to mix and match and prioritise inputs if there are multiple
    let linkDepth = staticRoute?.route?.fetchNode?.linkDepth;
    let fields = staticRoute?.route?.fetchNode?.fields;
    let fieldLinkDepths = staticRoute?.route?.fetchNode?.fieldLinkDepths;
    let entryMapper = staticRoute?.route?.fetchNode?.entryMapper;

    const entryLinkDepth =
      appsays && appsays.entryLinkDepth !== undefined
        ? appsays.entryLinkDepth
        : 2;
    const entryFieldLinkDepths = appsays?.entryFieldLinkDepths;

    const setStaticRouteLimits =
      typeof linkDepth !== 'undefined' || fields || fieldLinkDepths;
    const setContentTypeLimits = !!ContentTypeMappings.find(
      ct => ct.fields || ct.linkDepth || ct.nodeOptions || ct.fieldLinkDepths
    );

    const state = yield select();
    const routeEntry = selectRouteEntry(state, 'js');
    const routeNode = selectCurrentNode(state, 'js');
    const currentPath = action.path; //selectCurrentPath(state);
    const deliveryApiStatus = selectVersionStatus(state);
    const project = selectCurrentProject(state);
    // const isHome = currentPath === '/';
    const isPreview = currentPath && currentPath.startsWith('/preview/');
    const defaultLang = (appsays && appsays.defaultLang) || 'en-GB';

    if (
      !isPreview &&
      (appsays?.customRouting ||
        (staticRoute && !staticRoute.route.fetchNode) ||
        (routeEntry &&
          action.statePath === action.path &&
          appsays?.refetchNode !== true))
    ) {
      // To prevent erroneous 404s and wasted network calls, this covers
      // - appsays customRouting and does SET_ENTRY etc. via the consuming app
      // - all staticRoutes (where custom 'route.fetchNode' attribute is falsey)
      // - standard Contensis SiteView Routing where we already have that entry in state
      if (routeEntry && (!staticRoute || staticRoute?.route?.fetchNode)) {
        pathNode = { ...routeNode, entry: null };
        pathNode.entry = entry = routeEntry;
        //Do nothing, the entry is allready the right one.
        // yield put({
        //   type: SET_ENTRY,
        //   entry,
        //   node: routeNode,
        //   isLoading: false,
        // });
        yield put({
          type: UPDATE_LOADING_STATE,
          isLoading: false,
        });
      } else
        yield call(
          setRouteEntry,
          currentPath,
          routeEntry,
          yield select(selectCurrentNode),
          yield select(selectCurrentAncestors),
          yield select(selectCurrentSiblings)
        );
    } else {
      // Handle preview routes
      if (isPreview) {
        let splitPath = currentPath.split('/');
        let entryGuid = splitPath[2];
        let language = defaultLang;
        if (splitPath.length >= 3) {
          //set lang key if available in the path, else use default lang
          //assumes preview url on content type is: http://preview.ALIAS.contensis.cloud/preview/{GUID}/{LANG}
          if (splitPath.length == 4) language = splitPath[3];
          // According to product dev we cannot use Node API
          // for previewing entries as it gives a response of []
          // -- apparently it is not correct to request latest content
          // with Node API

          let previewEntry = yield api
            .getClient(deliveryApiStatus, project)
            .entries.get({
              id: entryGuid,
              language,
              linkDepth: entryLinkDepth,
            });
          if (previewEntry) {
            pathNode = { entry: previewEntry };
            ({ entry } = pathNode || {});
          }
        }
      } else {
        // Handle all other routes
        let nodeError = undefined;
        // Resolve a stub of route node if we are setting limits in content type mappings
        // Resolve the complete entry with the node if we are setting limits in a static route
        [nodeError, pathNode] = yield to(
          api.getNode(
            {
              depth: 0,
              path: currentPath,
              entryFields: setStaticRouteLimits
                ? fields || '*'
                : setContentTypeLimits
                  ? ['sys.contentTypeId', 'sys.id']
                  : '*',
              entryLinkDepth:
                setStaticRouteLimits && typeof linkDepth !== 'undefined'
                  ? linkDepth
                  : entryLinkDepth || 0,
              entryFieldLinkDepths: setStaticRouteLimits
                ? fieldLinkDepths
                : setContentTypeLimits
                  ? undefined
                  : entryFieldLinkDepths,
              language: defaultLang,
              versionStatus: deliveryApiStatus,
            },
            project
          )
        );
        if (nodeError) {
          if ([401, 403].includes(nodeError.status)) {
            // Capture specific auth errors with the delivery api
            // and fire the user down the handleRequiresLoginSaga
            // If auth was successful via a refreshToken we need to reload the page
            // to run this getRouteSaga again with the security token cookie
            const userLoggedIn = yield call(handleRequiresLoginSaga, {
              ...action,
              requireLogin: true,
            });
            if (userLoggedIn && nodeError.status === 401) {
              // Reload the route so we can re-run the routing request now the
              // authentication cookies are written
              return yield call(setRouteSaga, { path: currentPath });
            } else if (userLoggedIn && nodeError.status === 403) {
              return yield call(setRouteSaga, {
                path: LoginHelper.GetAccessDeniedRoute(currentPath),
              });
            } else {
              return yield call(do500, nodeError);
            }
          } else throw nodeError;
        } else ({ entry } = pathNode || {});

        // Try resolve a content type mapping
        if (pathNode?.entry?.sys?.id && pathNode.entry.sys.contentTypeId) {
          // Get fields[] and linkDepth from ContentTypeMapping to get the entry data
          // and current node's ordinates at a specified depth with specified fields
          contentTypeMapping = findContentTypeMapping(
            ContentTypeMappings,
            pathNode.entry.sys.contentTypeId
          );
        }

        // Run a second search query if we aren't setting limits from a static route
        // but we are setting limits from a content type mapping, now we have a handle
        // on a contentTypeId from the resolve node, we can apply the right limits when
        // fetching the entry
        if (
          !setStaticRouteLimits &&
          setContentTypeLimits &&
          pathNode?.entry?.sys?.id
        ) {
          // Now we have a handle on a content type mapping we can
          // reassign the query limiting variables if we haven't
          // already set them in a static route
          if (!setStaticRouteLimits)
            ({ fieldLinkDepths, fields, linkDepth } = contentTypeMapping || {});

          const query = routeEntryByFieldsQuery(
            pathNode.entry.sys.id,
            pathNode.entry.sys.language,
            pathNode.entry.sys.contentTypeId,
            fields,
            fieldLinkDepths,
            deliveryApiStatus
          );
          const payload = yield api.search(
            query,
            typeof linkDepth !== 'undefined' ? linkDepth : entryLinkDepth || 0,
            project
          );
          if (payload?.items?.length > 0) {
            pathNode.entry = entry = payload.items[0];
          }
        }
      }

      // make calls to fetch node ancestors, children,
      // siblings or entire node tree
      [ancestors, children, siblings] = yield call(
        resolveCurrentNodeOrdinates,
        {
          api,
          appsays,
          contentTypeMapping:
            contentTypeMapping || staticRoute?.route?.fetchNode || {},
          language: defaultLang,
          path: currentPath,
          pathNode,
          project,
          versionStatus: deliveryApiStatus,
        }
      );

      if (children) pathNode.children = children;
    }

    const resolvedContentTypeMapping =
      findContentTypeMapping(
        ContentTypeMappings,
        pathNode?.entry?.sys?.contentTypeId
      ) || {};

    // Inject redux { key, reducer, saga } provided by ContentTypeMapping
    if (resolvedContentTypeMapping.injectRedux)
      yield call(reduxInjectorSaga, resolvedContentTypeMapping.injectRedux);

    if (withEvents && withEvents.onRouteLoaded) {
      // Check if the app has provided a requireLogin boolean flag or groups array
      // in addition to checking if requireLogin is set in the route definition
      ({ requireLogin } =
        (yield withEvents.onRouteLoaded({ ...action, entry })) || {});
    }

    if (requireLogin !== false) {
      // Do not call the login feature saga if requireLogin is false
      yield call(handleRequiresLoginSaga, {
        ...action,
        entry,
        requireLogin,
      });
    }

    if (!appsays || !appsays.preventScrollTop) {
      // Scroll into View
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    }

    if (pathNode?.entry?.sys?.id) {
      entry = pathNode.entry;

      yield call(
        setRouteEntry,
        currentPath,
        entry,
        pathNode,
        ancestors,
        siblings,
        entryMapper || resolvedContentTypeMapping.entryMapper,
        false,
        appsays?.refetchNode
      );
    } else {
      if (staticRoute)
        yield call(
          setRouteEntry,
          currentPath,
          null,
          pathNode,
          ancestors,
          siblings
        );
      else yield call(do404);
    }
  } catch (e) {
    log.error(...['Error running route saga:', e, e.stack]);
    yield call(do500, e);
  }
}

function* resolveCurrentNodeOrdinates(action) {
  const {
    api,
    appsays,
    contentTypeMapping,
    language,
    path,
    pathNode,
    project,
    versionStatus,
  } = action;
  const apiCall = [() => null, () => null, () => null, () => null];

  // if appsays customNavigation: true, we will set doNavigation to false
  // if appsays customNavigation: { ... }, we will set doNavigation to the customNavigation object and check for child elements
  // if appsays nothing we will set doNavigation to true and continue to do navigation calls
  const doNavigation =
    !appsays ||
    (appsays?.customNavigation === true
      ? false
      : appsays?.customNavigation || true);

  const {
    entryLinkDepth = 0,
    fieldLinkDepths,
    fields,
    linkDepth,
    nodeOptions = {},
  } = contentTypeMapping;

  if (pathNode && pathNode.id) {
    if (doNavigation === true || doNavigation.ancestors) {
      apiCall[0] = function* getAncestors() {
        try {
          return yield api.getAncestors(
            {
              id: pathNode.id,
              language,
              versionStatus,
            },
            project
          );
        } catch (ex) {
          log.info('Problem fetching ancestors', ex);
          return [];
        }
      };
    }

    const childrenDepth =
      doNavigation === true || doNavigation.children === true
        ? 1
        : (doNavigation && doNavigation.children) || 0;

    if (
      (typeof nodeOptions?.children === 'undefined' && childrenDepth > 0) ||
      nodeOptions.children
    ) {
      const childrenOptions =
        !nodeOptions.children || typeof nodeOptions.children === 'boolean'
          ? {}
          : nodeOptions.children;
      apiCall[1] = function* getChildren() {
        try {
          return yield api.getNode(
            {
              depth:
                childrenOptions.depth !== undefined
                  ? childrenOptions.depth
                  : childrenDepth,
              path,
              entryFieldLinkDepths:
                childrenOptions.fieldLinkDepths || fieldLinkDepths,
              entryFields: childrenOptions.fields || fields || undefined,
              entryLinkDepth:
                typeof childrenOptions.linkDepth !== 'undefined'
                  ? childrenOptions.linkDepth
                  : typeof linkDepth !== 'undefined'
                    ? linkDepth
                    : entryLinkDepth,
              language,
              versionStatus,
            },
            project
          );
        } catch (ex) {
          log.info('Problem fetching children', ex);
          return [];
        }
      };
    }

    if (
      (typeof nodeOptions?.siblings === 'undefined' && doNavigation.siblings) ||
      nodeOptions.siblings
    ) {
      apiCall[2] = function* getSiblings() {
        try {
          return yield api.getSiblings(
            {
              id: pathNode.id,
              entryFieldLinkDepths:
                nodeOptions?.siblings?.fieldLinkDepths || fieldLinkDepths,
              entryFields: nodeOptions?.siblings?.fields || fields || undefined,
              entryLinkDepth:
                typeof nodeOptions?.siblings?.linkDepth !== 'undefined'
                  ? nodeOptions.siblings.linkDepth
                  : typeof linkDepth !== 'undefined'
                    ? linkDepth
                    : entryLinkDepth,
              includeInMenu: true,
              language,
              versionStatus,
            },
            project
          );
        } catch (ex) {
          log.info('Problem fetching siblings', ex);
          return [];
        }
      };
    }
  }

  const isTreeLoaded = yield select(hasNavigationTree);
  if (!isTreeLoaded && (doNavigation === true || doNavigation.tree))
    apiCall[3] = function* getNodeTree() {
      const treeDepth =
        doNavigation === true ||
        !doNavigation.tree ||
        doNavigation.tree === true
          ? 2
          : doNavigation.tree;

      if (typeof window !== 'undefined') {
        return yield put({
          type: GET_NODE_TREE,
          ...action,
          treeDepth,
        });
      } else {
        return yield call(ensureNodeTreeSaga, { ...action, treeDepth });
      }
    };

  const [loadAncestors, loadChildren, loadSiblings, loadTree] = apiCall;
  const [ancestors, nodeWithChildren, siblings] = yield all([
    loadAncestors(),
    loadChildren(),
    loadSiblings(),
    loadTree(),
  ]);
  return [ancestors, nodeWithChildren?.children, siblings];
}

function* setRouteEntry(
  currentPath,
  entry,
  node,
  ancestors,
  siblings,
  entryMapper,
  notFound = false,
  remapEntry = false
) {
  const entrySys = (entry && entry.sys) || {};

  // Update a window global to provide the preview toolbar
  // an updated entry id in client-side navigation
  if (typeof window !== 'undefined') window.ContensisEntryId = entrySys.id;

  const currentEntryId = yield select(selectRouteEntryEntryId);
  const currentEntryLang = yield select(selectRouteEntryLanguage);
  const mappedEntry = !entryMapper
    ? null
    : currentEntryId === entrySys.id &&
        currentEntryLang === entrySys.language &&
        remapEntry === false
      ? (yield select(selectMappedEntry, 'js')) || {}
      : yield mapRouteEntry(entryMapper, {
          ...node,
          entry,
          ancestors,
          siblings,
        });

  yield all([
    put({
      type: SET_ENTRY,
      id: entrySys.id,
      currentPath,
      entry,
      mappedEntry,
      node,
      notFound,
    }),
    ancestors &&
      put({
        type: SET_ANCESTORS,
        ancestors,
      }),
    siblings &&
      put({
        type: SET_SIBLINGS,
        siblings,
      }),
  ]);
}

function* mapRouteEntry(entryMapper, node) {
  try {
    if (typeof entryMapper === 'function') {
      const state = yield select();
      const mappedEntry = yield call(entryMapper, node, state);
      return mappedEntry;
    }
  } catch (e) {
    log.error(...['Error running entryMapper:', e, e.stack]);
    throw e;
  }
  return;
}

function* do404() {
  yield call(clientReloadHitServer);
  yield put({
    type: SET_ENTRY,
    id: null,
    entry: null,
    notFound: true,
  });
}

function* clientReloadHitServer() {
  const stateEntry = yield select(selectRouteEntry);

  // If in client and there is a stateEntry.sys field reload the page,
  // on the 2nd load stateEntry.sys should be null at this point,
  // we do not wish to reload again and get stuck in an infinite reloading loop
  if (typeof window !== 'undefined' && (stateEntry?.sys || null)) {
    window.location.reload();
  }
}

function* do500(error) {
  yield put({
    type: SET_ENTRY,
    id: null,
    entry: null,
    notFound: true,
    isError: true,
    error,
    statusCode: error && error.status ? error.status : 500,
  });
}

function* reduxInjectorSaga(injectorFn) {
  if (typeof injectorFn === 'function') {
    const { key, reducer, saga } = yield injectorFn();
    reduxInjector({ key, reducer, saga });
  }
}
