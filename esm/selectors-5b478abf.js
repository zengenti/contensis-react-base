import { Map, List } from 'immutable';
import queryString from 'query-string';

function action(type, payload = {}) {
  return {
    type,
    ...payload
  };
}
const findContentTypeMapping = (ContentTypeMappings, contentTypeId) => ContentTypeMappings.find(ct => ct.contentTypeID === contentTypeId);

const ROUTING_PREFIX = '@ROUTING/';
const GET_ENTRY = `${ROUTING_PREFIX}_GET_ENTRY`;
const SET_ENTRY = `${ROUTING_PREFIX}_SET_ENTRY`;
const SET_NODE = `${ROUTING_PREFIX}_SET_NODE`;
const SET_ANCESTORS = `${ROUTING_PREFIX}_SET_ANCESTORS`;
const SET_SIBLINGS = `${ROUTING_PREFIX}_SET_SIBLINGS`;
const SET_ENTRY_ID = `${ROUTING_PREFIX}_SET_ENTRY_ID`;
const SET_ENTRY_RELATED_ARTICLES = `${ROUTING_PREFIX}_SET_ENTRY_RELATED_ARTICLES`;
const SET_NAVIGATION_NOT_FOUND = `${ROUTING_PREFIX}_SET_NOT_FOUND`;
const SET_NAVIGATION_PATH = `${ROUTING_PREFIX}_SET_NAVIGATION_PATH`;
const SET_TARGET_PROJECT = `${ROUTING_PREFIX}_SET_TARGET_PROJECT`;
const SET_ROUTE = `${ROUTING_PREFIX}_SET_ROUTE`;
const CALL_HISTORY_METHOD = `${ROUTING_PREFIX}_CALL_HISTORY_METHOD`;
const UPDATE_LOADING_STATE = `${ROUTING_PREFIX}_UPDATE_LOADING_STATE`;

var routing = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_ENTRY: GET_ENTRY,
  SET_ENTRY: SET_ENTRY,
  SET_NODE: SET_NODE,
  SET_ANCESTORS: SET_ANCESTORS,
  SET_SIBLINGS: SET_SIBLINGS,
  SET_ENTRY_ID: SET_ENTRY_ID,
  SET_ENTRY_RELATED_ARTICLES: SET_ENTRY_RELATED_ARTICLES,
  SET_NAVIGATION_NOT_FOUND: SET_NAVIGATION_NOT_FOUND,
  SET_NAVIGATION_PATH: SET_NAVIGATION_PATH,
  SET_TARGET_PROJECT: SET_TARGET_PROJECT,
  SET_ROUTE: SET_ROUTE,
  CALL_HISTORY_METHOD: CALL_HISTORY_METHOD,
  UPDATE_LOADING_STATE: UPDATE_LOADING_STATE
});

function queryParams(search) {
  return queryString.parse(typeof window != 'undefined' ? window.location.search : search);
}
const clientHostname = () => `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const addHostname = typeof window == 'undefined' || window.location.host == 'localhost:3000' ? `https://${PUBLIC_URI
/* global PUBLIC_URI */
}` : clientHostname();

const selectRouteEntry = state => {
  return state.getIn(['routing', 'entry'], Map());
};
const selectMappedEntry = state => {
  return state.getIn(['routing', 'mappedEntry'], null);
};
const selectNodeDepends = state => {
  return state.getIn(['routing', 'nodeDepends'], List());
};
const selectCurrentTreeID = state => {
  return state.getIn(['routing', 'currentTreeId']);
};
const selectEntryDepends = state => {
  return state.getIn(['routing', 'entryDepends']);
};
const selectRouteEntryEntryId = state => {
  return state.getIn(['routing', 'entry', 'sys', 'id'], null);
};
const selectRouteEntryContentTypeId = state => {
  const entry = selectRouteEntry(state);
  return entry && entry.getIn(['sys', 'contentTypeId'], null);
};
const selectRouteEntrySlug = state => {
  return state.getIn(['routing', 'entry', 'sys', 'slug'], null);
};
const selectRouteEntryID = state => {
  return state.getIn(['routing', 'entryID']);
};
const selectCurrentPath = state => {
  return state.getIn(['routing', 'currentPath']);
};
const selectCurrentSearch = state => {
  return state.getIn(['routing', 'location', 'search']);
};
const selectCurrentHash = state => {
  return state.getIn(['routing', 'location', 'hash']);
};
const selectQueryStringAsObject = state => queryParams(selectCurrentSearch(state));
const selectCurrentProject = state => {
  return state.getIn(['routing', 'currentProject']);
};
const selectIsNotFound = state => {
  return state.getIn(['routing', 'notFound']);
};
const selectCurrentAncestors = state => {
  return state.getIn(['routing', 'currentNodeAncestors'], List());
};
const selectCurrentNode = state => {
  return state.getIn(['routing', 'currentNode']);
};
const selectBreadcrumb = state => {
  return (selectCurrentAncestors(state) || List()).push(selectCurrentNode(state));
};
const selectRouteErrorMessage = state => {
  const error = state.getIn(['routing', 'error']);

  if (error && 'toJS' in error) {
    return error.getIn(['data', 'message']) || error.get('statusText');
  }
};
const selectRouteIsError = state => {
  return state.getIn(['routing', 'isError']);
};
const selectRouteLoading = state => {
  return state.getIn(['routing', 'isLoading']);
};
const selectRouteStatusCode = state => {
  return state.getIn(['routing', 'statusCode']);
};

var routing$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectRouteEntry: selectRouteEntry,
  selectMappedEntry: selectMappedEntry,
  selectNodeDepends: selectNodeDepends,
  selectCurrentTreeID: selectCurrentTreeID,
  selectEntryDepends: selectEntryDepends,
  selectRouteEntryEntryId: selectRouteEntryEntryId,
  selectRouteEntryContentTypeId: selectRouteEntryContentTypeId,
  selectRouteEntrySlug: selectRouteEntrySlug,
  selectRouteEntryID: selectRouteEntryID,
  selectCurrentPath: selectCurrentPath,
  selectCurrentSearch: selectCurrentSearch,
  selectCurrentHash: selectCurrentHash,
  selectQueryStringAsObject: selectQueryStringAsObject,
  selectCurrentProject: selectCurrentProject,
  selectIsNotFound: selectIsNotFound,
  selectCurrentAncestors: selectCurrentAncestors,
  selectCurrentNode: selectCurrentNode,
  selectBreadcrumb: selectBreadcrumb,
  selectRouteErrorMessage: selectRouteErrorMessage,
  selectRouteIsError: selectRouteIsError,
  selectRouteLoading: selectRouteLoading,
  selectRouteStatusCode: selectRouteStatusCode
});

const selectUser = state => {
  return state.get('user');
};
const selectUsername = state => {
  return state.getIn(['user', 'username']);
};
const selectUserLoggedIn = state => {
  return state.getIn(['user', 'loggedIn']);
};
const selectUserGroups = state => {
  return state.getIn(['user', 'groups']);
};
const selectUserMessage = state => {
  return state.getIn(['user', 'logonResult']);
};
const selectLoginScreenMode = state => {
  return state.getIn(['user', 'loginScreenMode']);
};
const selectPasswordMessage = state => {
  return state.getIn(['user', 'passwordResetMessage']);
};
const selectChangePasswordMessage = state => {
  return state.getIn(['user', 'changePasswordMessage']);
};
const selectCaptchaSiteKey = state => {
  return state.getIn(['user', 'recaptcha', 'key']);
};
const selectCaptchaData = state => {
  return state.getIn(['user', 'recaptcha', 'response']);
};
const selectCaptchaResponse = state => {
  return state.getIn(['user', 'recaptcha', 'response', 'isHuman']);
};
const selectCaptchaToken = state => {
  return state.getIn(['user', 'recaptcha', 'response', 'token']);
};

var user = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectUser: selectUser,
  selectUsername: selectUsername,
  selectUserLoggedIn: selectUserLoggedIn,
  selectUserGroups: selectUserGroups,
  selectUserMessage: selectUserMessage,
  selectLoginScreenMode: selectLoginScreenMode,
  selectPasswordMessage: selectPasswordMessage,
  selectChangePasswordMessage: selectChangePasswordMessage,
  selectCaptchaSiteKey: selectCaptchaSiteKey,
  selectCaptchaData: selectCaptchaData,
  selectCaptchaResponse: selectCaptchaResponse,
  selectCaptchaToken: selectCaptchaToken
});

export { routing$1 as A, user as B, CALL_HISTORY_METHOD as C, selectUserMessage as D, selectLoginScreenMode as E, selectPasswordMessage as F, selectChangePasswordMessage as G, selectCaptchaSiteKey as H, selectCaptchaResponse as I, selectQueryStringAsObject as J, SET_NAVIGATION_PATH as S, UPDATE_LOADING_STATE as U, selectNodeDepends as a, selectCurrentTreeID as b, selectRouteEntry as c, selectCurrentProject as d, SET_ROUTE as e, findContentTypeMapping as f, SET_ENTRY as g, SET_ANCESTORS as h, SET_SIBLINGS as i, selectRouteEntryContentTypeId as j, selectRouteIsError as k, selectIsNotFound as l, selectUserLoggedIn as m, selectRouteLoading as n, selectMappedEntry as o, selectCurrentPath as p, selectRouteStatusCode as q, selectRouteErrorMessage as r, selectEntryDepends as s, action as t, SET_TARGET_PROJECT as u, SET_NAVIGATION_NOT_FOUND as v, selectUser as w, selectCurrentSearch as x, selectUsername as y, routing as z };
//# sourceMappingURL=selectors-5b478abf.js.map
