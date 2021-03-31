import React from 'react';
import 'react-redux';
import 'immutable';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { Op, Query } from 'contensis-delivery-api';
import { b as selectVersionStatus, d as cachedSearch, e as deliveryApi, h as hasNavigationTree, f as GET_NODE_TREE, S as SET_NODE_TREE, g as GET_NODE_TREE_ERROR } from './navigation-55ccfe56.js';
import { S as SET_NAVIGATION_PATH, e as SET_ROUTE, C as CALL_HISTORY_METHOD, c as selectRouteEntry, d as selectCurrentProject, U as UPDATE_LOADING_STATE, f as findContentTypeMapping, g as SET_ENTRY, h as SET_ANCESTORS, i as SET_SIBLINGS } from './selectors-5b478abf.js';
import { v as validateUserSaga, u as userSagas } from './sagas-bb225af4.js';
import { takeEvery, put, select, call, all } from '@redux-saga/core/effects';
import { info, error } from 'loglevel';
import 'react-hot-loader';
import { R as RouteLoader } from './RouteLoader-02c01331.js';

const selectedHistory = typeof window !== 'undefined' ? createBrowserHistory : createMemoryHistory;
const history = (options = {}) => selectedHistory(options);
const browserHistory = selectedHistory();

const servers = SERVERS;
/* global SERVERS */

const alias = servers.alias.toLowerCase();
const publicUri = PUBLIC_URI;
/* global PUBLIC_URI */

const projects = PROJECTS;
/* global PROJECTS */
// return a projectId via the request hostname

const pickProject = (hostname, query) => {
  // if localhost we can only infer via a querystring, and take your word for it
  if (hostname == 'localhost') {
    return query && query.p || projects[0].id;
  } // if hostname is the actual public uri we can return the first project from the list


  if (hostname == publicUri) {
    return projects[0].id;
  }

  let project = 'unknown'; // // go through all the defined projects
  // Object.entries(projects).map(([, p]) => {

  const p = projects[0]; // check if we're accessing via the project's public uri

  if (hostname.includes(p.publicUri)) project = p.id; // the url structure is different for website (we don't prefix)

  if (p.id.startsWith('website')) {
    // check for internal and external hostnames
    // we check live and preview distinctly so our rule does not clash with
    // hostnames that use a project prefix
    if (hostname.includes(`live-${alias}.cloud.contensis.com`) || hostname.includes(`live.${alias}.contensis.cloud`) || hostname.includes(`preview-${alias}.cloud.contensis.com`) || hostname.includes(`preview.${alias}.contensis.cloud`)) project = p.id;
  } else {
    // check for internal and external hostnames, prefixed with the projectId
    if (hostname.includes(`${p.id.toLowerCase()}-${alias}.cloud.contensis.com`) || hostname.includes(`${p.id.toLowerCase()}.${alias}.contensis.cloud`)) project = p.id;
  } // });


  return project === 'unknown' ? p.id : project;
};

const sys = {
  contentTypeId: 'sys.contentTypeId',
  dataFormat: 'sys.dataFormat',
  filename: 'sys.properties.filename',
  id: 'sys.id',
  includeInSearch: 'sys.metadata.includeInSearch',
  slug: 'sys.slug',
  uri: 'sys.uri',
  versionStatus: 'sys.versionStatus'
};
const Fields = {
  entryTitle: 'entryTitle',
  entryDescription: 'entryDescription',
  keywords: 'keywords',
  sys,
  contentTypeId: 'sys.contentTypeId',
  wildcard: '*'
};

const fieldExpression = (field, value, operator = 'equalTo', weight = null) => {
  if (!field || !value) return [];
  if (Array.isArray(value)) return equalToOrIn(field, value, operator);else return !weight ? [Op[operator](field, value)] : [Op[operator](field, value).weight(weight)];
};
const defaultExpressions = versionStatus => {
  return [Op.equalTo(Fields.sys.versionStatus, versionStatus)];
};

const equalToOrIn = (field, arr, operator = 'equalTo') => arr.length === 0 ? [] : arr.length === 1 ? [Op[operator](field, arr[0])] : [Op.in(field, ...arr)];

// eslint-disable-next-line import/named
const routeEntryByFieldsQuery = (id, language = 'en-GB', fields = [], versionStatus = 'published') => {
  const query = new Query(...[...fieldExpression('sys.id', id), ...fieldExpression('sys.language', language), ...defaultExpressions(versionStatus)]);
  query.fields = fields;
  return query;
};

// load-entries.js
const routingSagas = [takeEvery(SET_NAVIGATION_PATH, getRouteSaga), takeEvery(SET_ROUTE, setRouteSaga)];
/**
 * To navigate / push a specific route via redux middleware
 * @param {path, state} action
 */

function* setRouteSaga(action) {
  yield put({
    type: CALL_HISTORY_METHOD,
    payload: {
      method: 'push',
      args: [action.path, action.state]
    }
  });
}

function* getRouteSaga(action) {
  let entry = null;

  try {
    const {
      withEvents,
      routes: {
        ContentTypeMappings = {}
      } = {},
      staticRoute
    } = action;
    let appsays;

    if (withEvents && withEvents.onRouteLoad) {
      appsays = yield withEvents.onRouteLoad(action);
    } // if appsays customNavigation: true, we will set doNavigation to false
    // if appsays customNavigation: { ... }, we will set doNavigation to the customNavigation object and check for child elements
    // if appsays nothing we will set doNavigation to true and continue to do navigation calls


    const doNavigation = !appsays || (appsays && appsays.customNavigation === true ? false : appsays && appsays.customNavigation || true);
    const entryLinkDepth = appsays && appsays.entryLinkDepth || 3;
    const setContentTypeLimits = !!ContentTypeMappings.find(ct => ct.fields || ct.linkDepth || ct.nodeOptions);
    const state = yield select();
    const routeEntry = selectRouteEntry(state); // const routeNode = selectCurrentNode(state);

    const currentPath = action.path; //selectCurrentPath(state);

    const deliveryApiStatus = selectVersionStatus(state);
    const project = selectCurrentProject(state);
    const isHome = currentPath === '/';
    const isPreview = currentPath && currentPath.startsWith('/preview/');
    const defaultLang = appsays && appsays.defaultLang || 'en-GB';

    if (!isPreview && (appsays && appsays.customRouting || staticRoute && !staticRoute.route.fetchNode || routeEntry && action.statePath === action.path)) {
      // To prevent erroneous 404s and wasted network calls, this covers
      // - appsays customRouting and does SET_ENTRY etc. via the consuming app
      // - all staticRoutes (where custom 'route.fetchNode' attribute is falsey)
      // - standard Contensis SiteView Routing where we already have that entry in state
      if (routeEntry && (!staticRoute || staticRoute.route && staticRoute.route.fetchNode)) {
        entry = routeEntry.toJS(); //Do nothing, the entry is allready the right one.
        // yield put({
        //   type: SET_ENTRY,
        //   entry,
        //   node: routeNode,
        //   isLoading: false,
        // });

        yield put({
          type: UPDATE_LOADING_STATE,
          isLoading: false
        });
      } else yield call(setRouteEntry);
    } else {
      let pathNode = null,
          ancestors = null,
          siblings = null; // Handle homepage

      if (isHome) {
        pathNode = yield cachedSearch.getRootNode({
          depth: 0,
          entryFields: '*',
          entryLinkDepth,
          language: defaultLang,
          versionStatus: deliveryApiStatus
        }, project);
      } else {
        // Handle preview routes
        if (isPreview) {
          let splitPath = currentPath.split('/');
          let entryGuid = splitPath[2];
          let language = defaultLang;

          if (splitPath.length >= 3) {
            //set lang key if available in the path, else use default lang
            //assumes preview url on content type is: http://preview.ALIAS.contensis.cloud/preview/{GUID}/{LANG}
            if (splitPath.length == 4) language = splitPath[3]; // According to product dev we cannot use Node API
            // for previewing entries as it gives a response of []
            // -- apparently it is not correct to request latest content
            // with Node API

            let previewEntry = yield deliveryApi.getClient(deliveryApiStatus, project).entries.get({
              id: entryGuid,
              language,
              linkDepth: entryLinkDepth
            });

            if (previewEntry) {
              pathNode = {
                entry: previewEntry
              }; // yield call(setRouteEntry, previewEntry);
              // } else {
              // yield call(do404);
            }
          }
        } else {
          // Handle all other routes
          const childrenDepth = doNavigation === true || doNavigation.children === true ? 1 : doNavigation && doNavigation.children || 0;
          pathNode = yield cachedSearch.getNode({
            depth: childrenDepth,
            path: currentPath,
            entryFields: setContentTypeLimits ? ['sys.contentTypeId', 'sys.id'] : '*',
            entryLinkDepth: setContentTypeLimits ? 0 : entryLinkDepth,
            versionStatus: deliveryApiStatus
          }, project);

          if (setContentTypeLimits && pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id) {
            // Get fields[] and linkDepth from ContentTypeMapping to get the entry data
            // at a specified depth with specified fields
            const {
              fields,
              linkDepth,
              nodeOptions = {}
            } = findContentTypeMapping(ContentTypeMappings, pathNode.entry.sys.contentTypeId) || {};
            const query = routeEntryByFieldsQuery(pathNode.entry.sys.id, pathNode.entry.sys.language, fields, deliveryApiStatus);
            const payload = yield cachedSearch.search(query, linkDepth || entryLinkDepth || 0, project);

            if (payload && payload.items && payload.items.length > 0) {
              pathNode.entry = payload.items[0];
            }

            if (childrenDepth > 0 || nodeOptions.children) {
              const childrenOptions = nodeOptions.children || {}; // We need to make a separate call for child nodes if the first node query has been
              // limited by linkDepth or fields[]

              const childNodes = yield cachedSearch.getChildren({
                id: pathNode.id,
                entryFields: childrenOptions.fields || fields || '*',
                entryLinkDepth: childrenOptions.linkDepth || linkDepth || entryLinkDepth || 0,
                versionStatus: deliveryApiStatus
              });

              if (childNodes) {
                pathNode.children = childNodes;
              }
            }
          }
        }

        if (pathNode && pathNode.id) {
          if (doNavigation === true || doNavigation.ancestors) {
            try {
              ancestors = yield cachedSearch.getAncestors({
                id: pathNode.id,
                versionStatus: deliveryApiStatus
              }, project);
            } catch (ex) {
              info('Problem fetching ancestors', ex);
            }
          }

          if (doNavigation === true || doNavigation.siblings) {
            try {
              siblings = yield cachedSearch.getSiblings({
                id: pathNode.id,
                versionStatus: deliveryApiStatus
              }, project);
            } catch (ex) {
              info('Problem fetching siblings', ex);
            }
          }
        }
      }

      if (pathNode && pathNode.entry && pathNode.entry.sys && pathNode.entry.sys.id) {
        entry = pathNode.entry;
        const {
          entryMapper
        } = ContentTypeMappings.find(ct => ct.contentTypeID === entry.sys.contentTypeId) || {};
        yield call(setRouteEntry, entry, pathNode, ancestors, siblings, entryMapper);
      } else {
        if (pathNode) yield call(setRouteEntry, null, pathNode, ancestors, siblings);else yield call(do404);
      }

      if (!appsays || !appsays.preventScrollTop) {
        // Scroll into View
        if (typeof window !== 'undefined') {
          window.scroll({
            top: 0
          });
        }
      }
    }

    if (withEvents && withEvents.onRouteLoaded) {
      yield withEvents.onRouteLoaded({ ...action,
        entry
      });
    }

    if (!hasNavigationTree(state) && (doNavigation === true || doNavigation.tree)) // Load navigation clientside only, a put() should help that work
      yield put({
        type: GET_NODE_TREE,
        treeDepth: doNavigation === true || !doNavigation.tree || doNavigation.tree === true ? 0 : doNavigation.tree
      });
  } catch (e) {
    error(...['Error running route saga:', e, e.stack]);
    yield call(do500, e);
  }
}

function* setRouteEntry(entry, node, ancestors, siblings, entryMapper, notFound = false) {
  const mappedEntry = yield mapRouteEntry(entryMapper, { ...node,
    entry,
    ancestors,
    siblings
  });
  yield all([put({
    type: SET_ENTRY,
    id: entry && entry.sys.id || null,
    entry,
    mappedEntry,
    node,
    notFound
  }), ancestors && put({
    type: SET_ANCESTORS,
    ancestors
  }), siblings && put({
    type: SET_SIBLINGS,
    siblings
  })]);
}

function* mapRouteEntry(entryMapper, node) {
  try {
    if (typeof entryMapper === 'function') {
      const state = yield select();
      const mappedEntry = yield call(entryMapper, node, state);
      return mappedEntry;
    }
  } catch (e) {
    error(...['Error running entryMapper:', e, e.stack]);
  }

  return;
}

function* do404() {
  yield put({
    type: SET_ENTRY,
    id: null,
    entry: null,
    notFound: true
  });
}

function* do500(error) {
  yield put({
    type: SET_ENTRY,
    id: null,
    entry: null,
    notFound: true,
    isError: true,
    error,
    statusCode: error && error.status ? error.status : 500
  });
}

const navigationSagas = [takeEvery(GET_NODE_TREE, ensureNodeTreeSaga)];
function* ensureNodeTreeSaga(action) {
  const state = yield select();

  try {
    if (!hasNavigationTree(state)) {
      const deliveryApiVersionStatus = yield select(selectVersionStatus);
      const project = yield select(selectCurrentProject);
      const nodes = yield deliveryApi.getClient(deliveryApiVersionStatus, project).nodes.getRoot({
        depth: action.treeDepth || 0
      });

      if (nodes) {
        yield put({
          type: SET_NODE_TREE,
          nodes
        });
      } else {
        yield put({
          type: GET_NODE_TREE_ERROR
        });
      }
    }
  } catch (ex) {
    yield put({
      type: GET_NODE_TREE_ERROR,
      error: ex.toString()
    });
  }
}

// index.js
function rootSaga (featureSagas = []) {
  return function* rootSaga() {
    const subSagas = [...routingSagas, ...navigationSagas, ...userSagas];
    yield all([validateUserSaga({}), ...subSagas, ...featureSagas]);
  };
}

const AppRoot = props => {
  return React.createElement(RouteLoader, props);
};

export { AppRoot as A, browserHistory as b, history as h, pickProject as p, rootSaga as r };
//# sourceMappingURL=App-fe4ec95b.js.map
