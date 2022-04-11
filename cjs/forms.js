'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var immer = require('immer');
var effects = require('@redux-saga/core/effects');
var reselect = require('reselect');
var mapJson = require('jsonpath-mapper');
var queryString = require('query-string');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors');
var merge = require('deepmerge');
var React = require('react');
var PropTypes = require('prop-types');
var reactRedux = require('react-redux');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var queryString__default = /*#__PURE__*/_interopDefaultLegacy(queryString);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const ACTION_PREFIX$5 = '@FORM2/';
const SET_FORM_DATA$1 = `${ACTION_PREFIX$5}SET_FORM_DATA`;
const SET_FORM_ID$1 = `${ACTION_PREFIX$5}SET_FORM_ID`;
const SET_CURRENT_PAGE$1 = `${ACTION_PREFIX$5}SET_CURRENT_PAGE`;
const PAGE_BACK$1 = `${ACTION_PREFIX$5}PAGE_BACK`;
const PAGE_FORWARD$1 = `${ACTION_PREFIX$5}PAGE_FORWARD`;
const SET_FIELD_VALUE$1 = `${ACTION_PREFIX$5}SET_FIELD_VALUE`;
const SET_DEFAULT_FIELD_VALUE$1 = `${ACTION_PREFIX$5}SET_DEFAULT_FIELD_VALUE`;
const SUBMIT_FORM_FOR_VALIDATION$1 = `${ACTION_PREFIX$5}SUBMIT_FORM_FOR_VALIDATION`;
const SUBMIT_FORM$1 = `${ACTION_PREFIX$5}SUBMIT_FORM`;
const SUBMIT_FORM_SUCCESS$1 = `${ACTION_PREFIX$5}SUBMIT_FORM_SUCCESS`;
const SUBMIT_FORM_ERROR$1 = `${ACTION_PREFIX$5}SUBMIT_FORM_ERROR`;
const SET_SUBMITTING_FORM$1 = `${ACTION_PREFIX$5}SET_SUBMITTING_FORM`;
const SET_ERROR$1 = `${ACTION_PREFIX$5}SET_ERROR`;
const VALIDATE_FIELD$1 = `${ACTION_PREFIX$5}VALIDATE_FIELD`;
const SET_FIELD_ERROR$1 = `${ACTION_PREFIX$5}SET_FIELD_ERROR`;
const SET_DATE_RANGE_VALUES$1 = `${ACTION_PREFIX$5}SET_DATE_RANGE_VALUES`;
const SET_FORM_ENTRIES$1 = `${ACTION_PREFIX$5}SET_FORM_ENTRIES`;
const SET_SUCCESS_MESSAGE$1 = `${ACTION_PREFIX$5}SET_SUCCESS_MESSAGE`;
const SET_CHECKBOX_VALUE$1 = `${ACTION_PREFIX$5}SET_CHECKBOX_VALUE`;

const MakeFieldType$1 = field => {
  if (!field) return null;

  if (field.dataType === 'string' && field.editor && field.editor.id === 'multiline') {
    return 'textarea';
  } else if (field.dataType === 'string' && field.editor && field.editor.id === 'list-dropdown') {
    return 'dropdown';
  } else if (field.editor && field.editor.properties && field.editor.properties.readOnly || field.groupId && field.groupId === 'private') {
    return 'hidden';
  } else if (field.dataType === 'stringArray' || field.dataType === 'boolean') {
    return 'checkbox';
  } else if (field.dataType === 'string' && field.validations && field.validations.allowedValues) {
    return 'radio';
  } else if (field.dataType === 'integer') {
    return 'number';
  } else if (field.dataType === 'dateTime') {
    return 'date';
  } else if (field.dataFormat === 'daterange') {
    return 'dateRange';
  } else if (field.dataFormat === 'entry') {
    return 'entryPicker';
  } else {
    return 'textfield';
  }
};

const initialSettings$1 = {
  recaptcha: {
    siteKey: null
  }
};
const initialStatus$1 = {
  isLoading: false,
  isSubmitting: false,
  hasSuccess: false,
  successMessage: null,
  hasError: false
};
const initialPagingInfo$1 = {
  pageIndex: 0,
  pageCount: 0,
  currentPageId: null
};
const initialFormData$1 = {
  formId: null,
  data: {},
  fields: [],
  entries: [],
  fieldErrors: [],
  groups: [],
  defaultLanguage: null,
  pagingInfo: initialPagingInfo$1,
  status: initialStatus$1
};
let initialState$5 = {
  settings: initialSettings$1
};
var reducer$1 = immer.produce((state, action) => {
  switch (action.type) {
    case SET_FORM_ID$1:
      {
        const {
          formId
        } = action || {};
        state[formId] = initialFormData$1;
        return;
      }

    case SET_FORM_DATA$1:
      {
        const {
          fields,
          formId,
          groups,
          defaultLanguage
        } = action || {};
        fields.map(field => {
          field.type = MakeFieldType$1(field);
        });
        state[formId].fields = fields;
        state[formId].formId = formId;
        state[formId].groups = groups;
        state[formId].defaultLanguage = defaultLanguage;
        state[formId].status.isSubmitting = false;
        state[formId].status.hasSuccess = false;
        state[formId].status.hasError = false;
        return;
      }

    case SET_CURRENT_PAGE$1:
      {
        const {
          formId,
          pageId,
          pageIndex,
          pageCount
        } = action || {};
        state[formId].pagingInfo.currentPageId = pageId;
        state[formId].pagingInfo.pageIndex = pageIndex;
        state[formId].pagingInfo.pageCount = pageCount;
        return;
      }

    case SET_FIELD_VALUE$1:
      {
        const {
          formId,
          id,
          value
        } = action || {};
        state[formId].data[id] = value;
        return;
      }

    case SET_DEFAULT_FIELD_VALUE$1:
      {
        const {
          formId,
          value
        } = action || {};
        state[formId].data = value;
        return;
      }

    case SET_CHECKBOX_VALUE$1:
      {
        const {
          formId,
          id,
          value,
          isChecked
        } = action || {};
        let values = state[formId].data[id] || [];
        if (isChecked) state[formId].data[id] = { ...values,
          value
        };else state[formId].data[id] = values.filter(v => v !== value);
        return;
      }

    case SET_DATE_RANGE_VALUES$1:
      {
        const {
          formId,
          id,
          value,
          dateType
        } = action || {};
        state[formId].data[id][dateType] = value;
        return;
      }

    case SET_FIELD_ERROR$1:
      {
        const {
          formId,
          value
        } = action || {};
        state[formId].fieldErrors = value;
        return;
      }

    case SET_SUBMITTING_FORM$1:
      {
        const {
          formId,
          isSubmitting
        } = action || {};
        state[formId].status.isSubmitting = isSubmitting;
        return;
      }

    case SUBMIT_FORM_SUCCESS$1:
      {
        const {
          formId
        } = action || {};
        state[formId].status.hasError = false;
        state[formId].status.isSubmitting = false;
        state[formId].status.hasSuccess = true;
        return;
      }

    case SET_SUCCESS_MESSAGE$1:
      {
        const {
          formId,
          message
        } = action || {};
        state[formId].status.successMessage = message;
        return;
      }

    case SUBMIT_FORM_ERROR$1:
      {
        const {
          formId
        } = action || {};
        state[formId].status.hasError = true;
        state[formId].status.isSubmitting = false;
        return;
      }

    case SET_FORM_ENTRIES$1:
      {
        const {
          formId,
          entries
        } = action || {};
        const entryObject = {};
        entries.map(entry => {
          if (!entry) return null;
          entryObject[entry.id] = entry.entries;
          return entryObject;
        });
        state[formId].entries = entryObject;
        return;
      }

    case SET_ERROR$1:
      {
        const {
          formId
        } = action || {};
        state[formId].status.hasError = true;
        state[formId].status.isSubmitting = false;
        return;
      }

    default:
      return state;
  }
}, initialState$5);

const action$3 = (type, payload = {}) => ({
  type,
  ...payload
});
const getImmutableOrJS$1 = (state, stateKey, fallbackValue, returnType = globalThis.STATE_TYPE) => {
  var _globalThis$immutable, _globalThis$immutable2;

  // Find a fromJS function from global that is dynamically loaded in createStore
  // or replace with a stub function for non-immutable gets
  const fromJS = returnType === 'immutable' ? ((_globalThis$immutable = globalThis.immutable) === null || _globalThis$immutable === void 0 ? void 0 : _globalThis$immutable.fromJSOrdered) || ((_globalThis$immutable2 = globalThis.immutable) === null || _globalThis$immutable2 === void 0 ? void 0 : _globalThis$immutable2.fromJS) : v => v;

  if (state && 'get' in state && typeof state.get === 'function' && 'getIn' in state && typeof state.getIn === 'function' && 'toJS' in state && typeof state.toJS === 'function') {
    if (Array.isArray(stateKey)) return fromJS(state.getIn(stateKey, fallbackValue));
    return fromJS(state.get(stateKey, fallbackValue));
  }

  if (Array.isArray(stateKey) && state && typeof state === 'object') {
    const result = mapJson.jpath(stateKey.join('.'), state);
    if (typeof result === 'undefined') return fallbackValue;
    return result;
  }

  const result = state && typeof state === 'object' ? state[stateKey] : undefined;
  if (typeof result === 'undefined') return fallbackValue;
  return result;
};

function queryParams$1(search) {
  return queryString__default["default"].parse(typeof window != 'undefined' ? window.location.search : search);
}

const selectRouteEntry$3 = (state, returnType) => getImmutableOrJS$1(state, ['routing', 'entry'], {}, returnType);
const selectMappedEntry$1 = (state, returnType) => getImmutableOrJS$1(state, ['routing', 'mappedEntry'], null, returnType);
const selectSurrogateKeys$1 = state => {
  const keys = getImmutableOrJS$1(state, ['routing', 'surrogateKeys'], [], 'js');
  return keys.join(' ');
};
const selectCurrentHostname$1 = state => getImmutableOrJS$1(state, ['routing', 'currentHostname']);
const selectCurrentTreeID$1 = state => getImmutableOrJS$1(state, ['routing', 'currentHostname']);
const selectRouteEntryEntryId$3 = state => getImmutableOrJS$1(state, ['routing', 'entry', 'sys', 'id'], null);
const selectRouteEntryContentTypeId$3 = state => {
  const entry = selectRouteEntry$3(state);
  return getImmutableOrJS$1(entry, ['sys', 'contentTypeId'], null);
};
const selectRouteEntryLanguage$1 = state => {
  const entry = selectRouteEntry$3(state);
  return getImmutableOrJS$1(entry, ['sys', 'language'], null);
};
const selectRouteEntrySlug$3 = state => {
  const entry = selectRouteEntry$3(state);
  return getImmutableOrJS$1(entry, ['sys', 'slug'], null);
};
const selectRouteEntryID$3 = state => getImmutableOrJS$1(state, ['routing', 'entryID']);
const selectCurrentPath$3 = state => getImmutableOrJS$1(state, ['routing', 'currentPath']);
const selectCurrentLocation$1 = state => getImmutableOrJS$1(state, ['routing', 'location']);
const selectCurrentSearch$3 = state => getImmutableOrJS$1(state, ['routing', 'location', 'search']);
const selectCurrentHash$1 = state => getImmutableOrJS$1(state, ['routing', 'location', 'hash']);
const selectQueryStringAsObject$3 = state => queryParams$1(selectCurrentSearch$3(state));
const selectCurrentProject$3 = state => getImmutableOrJS$1(state, ['routing', 'currentProject']);
const selectIsNotFound$3 = state => getImmutableOrJS$1(state, ['routing', 'notFound']);
const selectCurrentAncestors$3 = state => getImmutableOrJS$1(state, ['routing', 'currentNodeAncestors'], []);
const selectCurrentSiblings$1 = state => getImmutableOrJS$1(state, ['routing', 'currentNodeSiblings'], []);
const selectCurrentNode$1 = (state, returnType) => getImmutableOrJS$1(state, ['routing', 'currentNode'], null, returnType);
const selectCurrentChildren$1 = state => getImmutableOrJS$1(state, ['routing', 'currentNode', 'children'], []);
const selectBreadcrumb$1 = state => {
  return selectCurrentAncestors$3(state).push(selectCurrentNode$1(state));
};
const selectRouteErrorMessage$1 = state => {
  const error = getImmutableOrJS$1(state, ['routing', 'error']);
  return getImmutableOrJS$1(error, ['data', 'message'], getImmutableOrJS$1(error, 'statusText'));
};
const selectRouteIsError$1 = state => getImmutableOrJS$1(state, ['routing', 'isError']);
const selectRouteLoading$3 = state => getImmutableOrJS$1(state, ['routing', 'isLoading']);
const selectRouteStatusCode$1 = state => getImmutableOrJS$1(state, ['routing', 'statusCode']);
const selectStaticRoute$1 = state => getImmutableOrJS$1(state, ['routing', 'staticRoute']);

var routing$6 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectRouteEntry: selectRouteEntry$3,
  selectMappedEntry: selectMappedEntry$1,
  selectSurrogateKeys: selectSurrogateKeys$1,
  selectCurrentHostname: selectCurrentHostname$1,
  selectCurrentTreeID: selectCurrentTreeID$1,
  selectRouteEntryEntryId: selectRouteEntryEntryId$3,
  selectRouteEntryContentTypeId: selectRouteEntryContentTypeId$3,
  selectRouteEntryLanguage: selectRouteEntryLanguage$1,
  selectRouteEntrySlug: selectRouteEntrySlug$3,
  selectRouteEntryID: selectRouteEntryID$3,
  selectCurrentPath: selectCurrentPath$3,
  selectCurrentLocation: selectCurrentLocation$1,
  selectCurrentSearch: selectCurrentSearch$3,
  selectCurrentHash: selectCurrentHash$1,
  selectQueryStringAsObject: selectQueryStringAsObject$3,
  selectCurrentProject: selectCurrentProject$3,
  selectIsNotFound: selectIsNotFound$3,
  selectCurrentAncestors: selectCurrentAncestors$3,
  selectCurrentSiblings: selectCurrentSiblings$1,
  selectCurrentNode: selectCurrentNode$1,
  selectCurrentChildren: selectCurrentChildren$1,
  selectBreadcrumb: selectBreadcrumb$1,
  selectRouteErrorMessage: selectRouteErrorMessage$1,
  selectRouteIsError: selectRouteIsError$1,
  selectRouteLoading: selectRouteLoading$3,
  selectRouteStatusCode: selectRouteStatusCode$1,
  selectStaticRoute: selectStaticRoute$1
});

const ROUTING_PREFIX$1 = '@ROUTING/';
const GET_ENTRY$1 = `${ROUTING_PREFIX$1}_GET_ENTRY`;
const SET_ENTRY$1 = `${ROUTING_PREFIX$1}_SET_ENTRY`;
const SET_NODE$1 = `${ROUTING_PREFIX$1}_SET_NODE`;
const SET_ANCESTORS$1 = `${ROUTING_PREFIX$1}_SET_ANCESTORS`;
const SET_SIBLINGS$1 = `${ROUTING_PREFIX$1}_SET_SIBLINGS`;
const SET_ENTRY_ID$1 = `${ROUTING_PREFIX$1}_SET_ENTRY_ID`;
const SET_SURROGATE_KEYS$1 = `${ROUTING_PREFIX$1}_SET_SURROGATE_KEYS`;
const SET_NAVIGATION_NOT_FOUND$1 = `${ROUTING_PREFIX$1}_SET_NOT_FOUND`;
const SET_NAVIGATION_PATH$1 = `${ROUTING_PREFIX$1}_SET_NAVIGATION_PATH`;
const SET_TARGET_PROJECT$1 = `${ROUTING_PREFIX$1}_SET_TARGET_PROJECT`;
const SET_ROUTE$1 = `${ROUTING_PREFIX$1}_SET_ROUTE`;
const UPDATE_LOADING_STATE$1 = `${ROUTING_PREFIX$1}_UPDATE_LOADING_STATE`;

var routing$1$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_ENTRY: GET_ENTRY$1,
  SET_ENTRY: SET_ENTRY$1,
  SET_NODE: SET_NODE$1,
  SET_ANCESTORS: SET_ANCESTORS$1,
  SET_SIBLINGS: SET_SIBLINGS$1,
  SET_ENTRY_ID: SET_ENTRY_ID$1,
  SET_SURROGATE_KEYS: SET_SURROGATE_KEYS$1,
  SET_NAVIGATION_NOT_FOUND: SET_NAVIGATION_NOT_FOUND$1,
  SET_NAVIGATION_PATH: SET_NAVIGATION_PATH$1,
  SET_TARGET_PROJECT: SET_TARGET_PROJECT$1,
  SET_ROUTE: SET_ROUTE$1,
  UPDATE_LOADING_STATE: UPDATE_LOADING_STATE$1
});

const setNotFound$1 = notFound => action$3(SET_NAVIGATION_NOT_FOUND$1, {
  notFound
});
const setNavigationPath$1 = (path, location, staticRoute, withEvents, statePath, routes) => action$3(SET_NAVIGATION_PATH$1, {
  path,
  location,
  staticRoute,
  withEvents,
  statePath,
  routes
});
const setCurrentProject$1 = (project, allowedGroups, hostname) => action$3(SET_TARGET_PROJECT$1, {
  project,
  allowedGroups,
  hostname
});
const setRoute$1 = (path, state) => action$3(SET_ROUTE$1, {
  path,
  state
});
const setRouteEntry$1 = entry => action$3(SET_ENTRY$1, {
  entry
});
const setSurrogateKeys$1 = (keys, url) => action$3(SET_SURROGATE_KEYS$1, {
  keys,
  url
});

var routing$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setNotFound: setNotFound$1,
  setNavigationPath: setNavigationPath$1,
  setCurrentProject: setCurrentProject$1,
  setRoute: setRoute$1,
  setRouteEntry: setRouteEntry$1,
  setSurrogateKeys: setSurrogateKeys$1
});

const ACTION_PREFIX$4 = '@USER/';
const SET_AUTHENTICATION_STATE$1 = `${ACTION_PREFIX$4}SET_AUTHENTICATION_STATE`;
const LOGIN_USER$1 = `${ACTION_PREFIX$4}LOGIN_USER`;
const LOGOUT_USER$1 = `${ACTION_PREFIX$4}LOGOUT_USER`;
const REGISTER_USER$1 = `${ACTION_PREFIX$4}REGISTER_USER`;
const REGISTER_USER_SUCCESS$1 = `${ACTION_PREFIX$4}REGISTER_USER_SUCCESS`;
const REGISTER_USER_FAILED$1 = `${ACTION_PREFIX$4}REGISTER_USER_FAILED`;
const REQUEST_USER_PASSWORD_RESET_SENDING$1 = `${ACTION_PREFIX$4}REQUEST_USER_PASSWORD_RESET_SENDING`;
const REQUEST_USER_PASSWORD_RESET_SUCCESS$1 = `${ACTION_PREFIX$4}REQUEST_USER_PASSWORD_RESET_SUCCESS`;
const REQUEST_USER_PASSWORD_RESET_ERROR$1 = `${ACTION_PREFIX$4}REQUEST_USER_PASSWORD_RESET_ERROR`;
const RESET_USER_PASSWORD_SENDING$1 = `${ACTION_PREFIX$4}RESET_USER_PASSWORD_SENDING`;
const RESET_USER_PASSWORD_SUCCESS$1 = `${ACTION_PREFIX$4}RESET_USER_PASSWORD_SUCCESS`;
const RESET_USER_PASSWORD_ERROR$1 = `${ACTION_PREFIX$4}RESET_USER_PASSWORD_ERROR`;
const CHANGE_USER_PASSWORD_SENDING$1 = `${ACTION_PREFIX$4}CHANGE_USER_PASSWORD_SENDING`;
const CHANGE_USER_PASSWORD_SUCCESS$1 = `${ACTION_PREFIX$4}CHANGE_USER_PASSWORD_SUCCESS`;
const CHANGE_USER_PASSWORD_ERROR$1 = `${ACTION_PREFIX$4}CHANGE_USER_PASSWORD_ERROR`;

const defaultAuthenticationState$1 = {
  clientCredentials: null,
  errorMessage: null,
  isAuthenticated: false,
  isAuthenticationError: false,
  isError: false,
  isLoading: false
};
const defaultPasswordResetRequestValues$1 = {
  isSending: false,
  sent: false,
  error: null
};
const defaultResetPasswordValues$1 = {
  isSending: false,
  sent: false,
  error: null
};
const defaultChangePasswordValues$1 = {
  isSending: false,
  sent: false,
  error: null
};
const defaultRegistrationValues$1 = {
  isLoading: false,
  success: false,
  error: null
};
const initialUserState$1 = {
  authenticationState: defaultAuthenticationState$1,
  passwordResetRequest: defaultPasswordResetRequestValues$1,
  resetPassword: defaultResetPasswordValues$1,
  changePassword: defaultChangePasswordValues$1,
  groups: []
};
immer.produce((state, action) => {
  switch (action.type) {
    case LOGOUT_USER$1:
      {
        return initialUserState$1;
      }

    case LOGIN_USER$1:
    case SET_AUTHENTICATION_STATE$1:
      {
        var _state, _state$authentication;

        if (!action.authenticationState) {
          action.authenticationState = defaultAuthenticationState$1;
        }

        const {
          authenticationState: {
            clientCredentials = null,
            errorMessage = null,
            isAuthenticated,
            isAuthenticationError = false,
            isError = false,
            isLoading = action.type === LOGIN_USER$1
          },
          user
        } = action;

        if (user) {
          user.name = `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}` || null;
          user.isZengentiStaff = user.email.includes('@zengenti.com');
        }

        state = { ...initialUserState$1,
          ...(user || state),
          authenticationState: {
            clientCredentials,
            errorMessage,
            isAuthenticated: isAuthenticated || ((_state = state) === null || _state === void 0 ? void 0 : (_state$authentication = _state.authenticationState) === null || _state$authentication === void 0 ? void 0 : _state$authentication.isAuthenticated),
            isAuthenticationError,
            isError,
            isLoading
          }
        };
        return state;
      }
    // REGISTER_USER is the trigger to set the user.registration initial state
    // and will set user.registration.isLoading to true
    // REGISTER_USER_FAILED will unset user.registration.isLoading and will set
    // the value in user.registration.error
    // REGISTER_USER_SUCCESS will unset user.registration.isLoading and will
    // set user.registration to the created user from the api response

    case REGISTER_USER$1:
    case REGISTER_USER_FAILED$1:
    case REGISTER_USER_SUCCESS$1:
      {
        const {
          error,
          user
        } = action; // Set registration object from the supplied action.user
        // so we can call these values back later

        state.registration = user || state.registration || defaultRegistrationValues$1; // Set registration flags so the UI can track the status

        state.registration.success = action.type === REGISTER_USER_SUCCESS$1;
        state.registration.error = error || false;
        state.registration.isLoading = action.type === REGISTER_USER$1;
        return;
      }

    case REQUEST_USER_PASSWORD_RESET_SENDING$1:
      state.passwordResetRequest = defaultPasswordResetRequestValues$1;
      state.passwordResetRequest.isSending = true;
      return;

    case REQUEST_USER_PASSWORD_RESET_SUCCESS$1:
      if (state.passwordResetRequest) {
        state.passwordResetRequest.isSending = false;
        state.passwordResetRequest.sent = true;
      }

      return;

    case REQUEST_USER_PASSWORD_RESET_ERROR$1:
      if (state.passwordResetRequest) {
        state.passwordResetRequest.isSending = false;
        state.passwordResetRequest.error = action.error;
      }

      return;

    case RESET_USER_PASSWORD_SENDING$1:
      if (state.resetPassword) {
        state.resetPassword.isSending = true;
      }

      return;

    case RESET_USER_PASSWORD_SUCCESS$1:
      if (state.resetPassword) {
        state.resetPassword.isSending = false;
        state.resetPassword.sent = true;
      }

      return;

    case RESET_USER_PASSWORD_ERROR$1:
      if (state.resetPassword) {
        state.resetPassword.isSending = false;
        state.resetPassword.error = action.error;
      }

      return;

    case CHANGE_USER_PASSWORD_SENDING$1:
      if (state.changePassword) {
        state.changePassword.isSending = true;
      }

      return;

    case CHANGE_USER_PASSWORD_SUCCESS$1:
      if (state.changePassword) {
        state.changePassword.isSending = false;
        state.changePassword.sent = true;
      }

      return;

    case CHANGE_USER_PASSWORD_ERROR$1:
      if (state.changePassword) {
        state.changePassword.isSending = false;
        state.changePassword.error = action.error;
      }

      return;

    default:
      return;
  }
}, initialUserState$1);

const ACTION_PREFIX$3 = '@NAVIGATION/';
const GET_NODE_TREE$1 = `${ACTION_PREFIX$3}_GET_NODE_TREE`;
const SET_NODE_TREE$1 = `${ACTION_PREFIX$3}_SET_NODE_TREE`;
const GET_NODE_TREE_ERROR$1 = `${ACTION_PREFIX$3}_GET_NODE_TREE_ERROR`;

var navigation$1$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_NODE_TREE: GET_NODE_TREE$1,
  SET_NODE_TREE: SET_NODE_TREE$1,
  GET_NODE_TREE_ERROR: GET_NODE_TREE_ERROR$1
});

const initialState$2$1 = {
  root: null,
  isError: false,
  isReady: false
};
immer.produce((state, action) => {
  switch (action.type) {
    case SET_NODE_TREE$1:
      {
        state.root = action.nodes;
        state.isReady = true;
        return;
      }

    case GET_NODE_TREE_ERROR$1:
      {
        state.isError = true;
        return;
      }

    default:
      return;
  }
}, initialState$2$1);

const combineMerge$1 = (target, source, options) => {
  const destination = target.slice();
  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge__default["default"](target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
};

const initialState$1$1 = {
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
  statusCode: 200
};
immer.produce((state, action) => {
  switch (action.type) {
    case SET_ANCESTORS$1:
      {
        state.currentNodeAncestors = action.ancestors;
        return;
      }

    case SET_ENTRY$1:
      {
        const {
          entry,
          error,
          mappedEntry,
          node = {},
          isError = false,
          isLoading = false,
          notFound = false,
          statusCode
        } = action;
        let defaultStatus = 200;
        if (notFound === true && isError === false) defaultStatus = 404;else if (isError === true) defaultStatus = statusCode || 500;

        if (!entry) {
          state.entryID = null;
          state.entry = null;
          state.error = error;
          state.mappedEntry = null;
          state.isError = isError;
          state.isLoading = isLoading;
          state.notFound = notFound;
          state.statusCode = statusCode || defaultStatus;
        } else {
          state.entryID = action.id;
          state.entry = entry;
          state.error = error;
          state.isError = isError;
          state.isLoading = isLoading;
          state.notFound = notFound;
          state.statusCode = statusCode || defaultStatus;

          if (mappedEntry && Object.keys(mappedEntry).length > 0) {
            state.mappedEntry = mappedEntry;
            state.entry = {
              sys: entry.sys
            };
          }
        }

        if (!node) {
          state.currentNode = null;
        } else {
          // On Set Node, we reset all dependants.
          state.currentNode = node; // eslint-disable-next-line @typescript-eslint/no-unused-vars

          const {
            entry,
            ...nodeWithoutEntry
          } = node; // We have the entry stored elsewhere, so lets not keep it twice.

          state.currentNode = nodeWithoutEntry;
        }

        return;
      }

    case UPDATE_LOADING_STATE$1:
      {
        state.isLoading = action.isLoading;
        return;
      }

    case SET_NAVIGATION_PATH$1:
      {
        let staticRoute = {};

        if (action.staticRoute) {
          staticRoute = { ...action.staticRoute
          };
        }

        if (action.path) {
          var _state$entry, _state$entry$sys;

          // Don't run a path update on initial load as we allready should have it in redux
          const entryUri = state === null || state === void 0 ? void 0 : (_state$entry = state.entry) === null || _state$entry === void 0 ? void 0 : (_state$entry$sys = _state$entry.sys) === null || _state$entry$sys === void 0 ? void 0 : _state$entry$sys.uri;

          if (entryUri !== action.path) {
            state.currentPath = action.path;
            state.location = action.location;
            state.staticRoute = { ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            };
            state.isLoading = typeof window !== 'undefined';
          } else {
            state.location = action.location;
            state.staticRoute = { ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            };
          }
        }

        return;
      }

    case SET_ROUTE$1:
      {
        state.nextPath = action.path;
        return;
      }

    case SET_SIBLINGS$1:
      {
        // Can be null in some cases like the homepage.
        let currentNodeSiblingParent = null;

        if (action.siblings && action.siblings.length > 0) {
          currentNodeSiblingParent = action.siblings[0].parentId;
        }

        state.currentNodeSiblings = action.siblings;
        state.currentNodeSiblingsParent = currentNodeSiblingParent;
        return;
      }

    case SET_SURROGATE_KEYS$1:
      {
        // console.info(`SET_SURROGATE_KEYS: '${action.url}' keys: ${action.keys}`);
        state.surrogateKeys = merge__default["default"](state.surrogateKeys, (action.keys || '').split(' '), {
          arrayMerge: combineMerge$1
        });
        return;
      }

    case SET_TARGET_PROJECT$1:
      {
        state.currentProject = action.project;
        state.allowedGroups = action.allowedGroups;
        state.currentHostname = action.hostname;
        return;
      }

    default:
      return state;
  }
}, initialState$1$1);

const VERSION_PREFIX$1 = '@VERSION/';
const SET_VERSION$1 = `${VERSION_PREFIX$1}SET_VERSION`;
const SET_VERSION_STATUS$1 = `${VERSION_PREFIX$1}SET_VERSION_STATUS`;

var version$1$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SET_VERSION: SET_VERSION$1,
  SET_VERSION_STATUS: SET_VERSION_STATUS$1
});

const initialState$4 = {
  commitRef: null,
  buildNo: null,
  contensisVersionStatus: 'published'
};
immer.produce((state, action) => {
  switch (action.type) {
    case SET_VERSION_STATUS$1:
      {
        state.contensisVersionStatus = action.status;
        return;
      }

    case SET_VERSION$1:
      {
        state.commitRef = action.commitRef;
        state.buildNo = action.buildNo;
        return;
      }

    default:
      return;
  }
}, initialState$4);

const hasNavigationTree$1 = state => getImmutableOrJS$1(state, ['navigation', 'isReady']);
const selectNavigationRoot$1 = state => getImmutableOrJS$1(state, ['navigation', 'root']);
const selectNavigationChildren$1 = state => getImmutableOrJS$1(state, ['navigation', 'root', 'children']);
const selectNavigationDepends$1 = () => [];

var navigation$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasNavigationTree: hasNavigationTree$1,
  selectNavigationRoot: selectNavigationRoot$1,
  selectNavigationChildren: selectNavigationChildren$1,
  selectNavigationDepends: selectNavigationDepends$1
});

const setVersion$1 = (commitRef, buildNo) => action$3(SET_VERSION$1, {
  commitRef,
  buildNo
});
const setVersionStatus$1 = status => action$3(SET_VERSION_STATUS$1, {
  status
});

var version$4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setVersion: setVersion$1,
  setVersionStatus: setVersionStatus$1
});

const ACTION_PREFIX$2 = '@FORM2/';
const SET_FORM_DATA = `${ACTION_PREFIX$2}SET_FORM_DATA`;
const SET_FORM_ID = `${ACTION_PREFIX$2}SET_FORM_ID`;
const SET_CURRENT_PAGE = `${ACTION_PREFIX$2}SET_CURRENT_PAGE`;
const PAGE_BACK = `${ACTION_PREFIX$2}PAGE_BACK`;
const PAGE_FORWARD = `${ACTION_PREFIX$2}PAGE_FORWARD`;
const SET_FIELD_VALUE = `${ACTION_PREFIX$2}SET_FIELD_VALUE`;
const SET_DEFAULT_FIELD_VALUE = `${ACTION_PREFIX$2}SET_DEFAULT_FIELD_VALUE`;
const SUBMIT_FORM_FOR_VALIDATION = `${ACTION_PREFIX$2}SUBMIT_FORM_FOR_VALIDATION`;
const SUBMIT_FORM = `${ACTION_PREFIX$2}SUBMIT_FORM`;
const SUBMIT_FORM_SUCCESS = `${ACTION_PREFIX$2}SUBMIT_FORM_SUCCESS`;
const SUBMIT_FORM_ERROR = `${ACTION_PREFIX$2}SUBMIT_FORM_ERROR`;
const SET_SUBMITTING_FORM = `${ACTION_PREFIX$2}SET_SUBMITTING_FORM`;
const SET_ERROR = `${ACTION_PREFIX$2}SET_ERROR`;
const VALIDATE_FIELD = `${ACTION_PREFIX$2}VALIDATE_FIELD`;
const VALIDATE_PAGE = `${ACTION_PREFIX$2}VALIDATE_PAGE`;
const SET_FIELD_ERROR = `${ACTION_PREFIX$2}SET_FIELD_ERROR`;
const SET_DATE_RANGE_VALUES = `${ACTION_PREFIX$2}SET_DATE_RANGE_VALUES`;
const SET_FORM_ENTRIES = `${ACTION_PREFIX$2}SET_FORM_ENTRIES`;
const SET_SUCCESS_MESSAGE = `${ACTION_PREFIX$2}SET_SUCCESS_MESSAGE`;
const SET_CHECKBOX_VALUE = `${ACTION_PREFIX$2}SET_CHECKBOX_VALUE`;

var types$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SET_FORM_DATA: SET_FORM_DATA,
  SET_FORM_ID: SET_FORM_ID,
  SET_CURRENT_PAGE: SET_CURRENT_PAGE,
  PAGE_BACK: PAGE_BACK,
  PAGE_FORWARD: PAGE_FORWARD,
  SET_FIELD_VALUE: SET_FIELD_VALUE,
  SET_DEFAULT_FIELD_VALUE: SET_DEFAULT_FIELD_VALUE,
  SUBMIT_FORM_FOR_VALIDATION: SUBMIT_FORM_FOR_VALIDATION,
  SUBMIT_FORM: SUBMIT_FORM,
  SUBMIT_FORM_SUCCESS: SUBMIT_FORM_SUCCESS,
  SUBMIT_FORM_ERROR: SUBMIT_FORM_ERROR,
  SET_SUBMITTING_FORM: SET_SUBMITTING_FORM,
  SET_ERROR: SET_ERROR,
  VALIDATE_FIELD: VALIDATE_FIELD,
  VALIDATE_PAGE: VALIDATE_PAGE,
  SET_FIELD_ERROR: SET_FIELD_ERROR,
  SET_DATE_RANGE_VALUES: SET_DATE_RANGE_VALUES,
  SET_FORM_ENTRIES: SET_FORM_ENTRIES,
  SET_SUCCESS_MESSAGE: SET_SUCCESS_MESSAGE,
  SET_CHECKBOX_VALUE: SET_CHECKBOX_VALUE
});

const MakeFieldType = field => {
  if (!field) return null;

  if (field.dataType === 'string' && field.editor && field.editor.id === 'multiline') {
    return 'textarea';
  } else if (field.dataType === 'string' && field.editor && field.editor.id === 'list-dropdown') {
    return 'dropdown';
  } else if (field.editor && field.editor.properties && field.editor.properties.readOnly || field.groupId && field.groupId === 'private') {
    return 'hidden';
  } else if (field.dataType === 'stringArray' || field.dataType === 'boolean') {
    return 'checkbox';
  } else if (field.dataType === 'string' && field.validations && field.validations.allowedValues) {
    return 'radio';
  } else if (field.dataType === 'integer') {
    return 'number';
  } else if (field.dataType === 'dateTime') {
    return 'date';
  } else if (field.dataFormat === 'daterange') {
    return 'dateRange';
  } else if (field.dataFormat === 'entry') {
    return 'entryPicker';
  } else {
    return 'textfield';
  }
};

const initialSettings = {
  recaptcha: {
    siteKey: null
  }
};
const initialStatus = {
  isLoading: false,
  isSubmitting: false,
  hasSuccess: false,
  successMessage: null,
  hasError: false
};
const initialPagingInfo = {
  pageIndex: 0,
  pageCount: 0,
  currentPageId: null
};
const initialFormData = {
  formId: null,
  data: {},
  fields: [],
  entries: [],
  fieldErrors: [],
  groups: [],
  defaultLanguage: null,
  pagingInfo: initialPagingInfo,
  status: initialStatus
};
let initialState$3 = {
  settings: initialSettings
};
var reducer = immer.produce((state, action) => {
  switch (action.type) {
    case SET_FORM_ID:
      {
        const {
          formId
        } = action || {};
        state[formId] = initialFormData;
        return;
      }

    case SET_FORM_DATA:
      {
        const {
          fields,
          formId,
          groups,
          defaultLanguage
        } = action || {};
        fields.map(field => {
          field.type = MakeFieldType(field);
        });
        state[formId].fields = fields;
        state[formId].formId = formId;
        state[formId].groups = groups;
        state[formId].defaultLanguage = defaultLanguage;
        state[formId].status.isSubmitting = false;
        state[formId].status.hasSuccess = false;
        state[formId].status.hasError = false;
        return;
      }

    case SET_CURRENT_PAGE:
      {
        const {
          formId,
          pageId,
          pageIndex,
          pageCount
        } = action || {};
        state[formId].pagingInfo.currentPageId = pageId;
        state[formId].pagingInfo.pageIndex = pageIndex;
        state[formId].pagingInfo.pageCount = pageCount;
        return;
      }

    case SET_FIELD_VALUE:
      {
        const {
          formId,
          id,
          value
        } = action || {};
        state[formId].data[id] = value;
        return;
      }

    case SET_DEFAULT_FIELD_VALUE:
      {
        const {
          formId,
          value
        } = action || {};
        state[formId].data = value;
        return;
      }

    case SET_CHECKBOX_VALUE:
      {
        const {
          formId,
          id,
          value,
          isChecked
        } = action || {};
        let values = state[formId].data[id] || [];
        if (isChecked) state[formId].data[id] = { ...values,
          value
        };else state[formId].data[id] = values.filter(v => v !== value);
        return;
      }

    case SET_DATE_RANGE_VALUES:
      {
        const {
          formId,
          id,
          value,
          dateType
        } = action || {};
        state[formId].data[id][dateType] = value;
        return;
      }

    case SET_FIELD_ERROR:
      {
        const {
          formId,
          value
        } = action || {};
        state[formId].fieldErrors = value;
        return;
      }

    case SET_SUBMITTING_FORM:
      {
        const {
          formId,
          isSubmitting
        } = action || {};
        state[formId].status.isSubmitting = isSubmitting;
        return;
      }

    case SUBMIT_FORM_SUCCESS:
      {
        const {
          formId
        } = action || {};
        state[formId].status.hasError = false;
        state[formId].status.isSubmitting = false;
        state[formId].status.hasSuccess = true;
        return;
      }

    case SET_SUCCESS_MESSAGE:
      {
        const {
          formId,
          message
        } = action || {};
        state[formId].status.successMessage = message;
        return;
      }

    case SUBMIT_FORM_ERROR:
      {
        const {
          formId
        } = action || {};
        state[formId].status.hasError = true;
        state[formId].status.isSubmitting = false;
        return;
      }

    case SET_FORM_ENTRIES:
      {
        const {
          formId,
          entries
        } = action || {};
        const entryObject = {};
        entries.map(entry => {
          if (!entry) return null;
          entryObject[entry.id] = entry.entries;
          return entryObject;
        });
        state[formId].entries = entryObject;
        return;
      }

    case SET_ERROR:
      {
        const {
          formId
        } = action || {};
        state[formId].status.hasError = true;
        state[formId].status.isSubmitting = false;
        return;
      }

    default:
      return state;
  }
}, initialState$3);

const action$1 = (type, payload = {}) => ({
  type,
  ...payload
});
const getImmutableOrJS = (state, stateKey, fallbackValue, returnType = globalThis.STATE_TYPE) => {
  var _globalThis$immutable, _globalThis$immutable2;

  // Find a fromJS function from global that is dynamically loaded in createStore
  // or replace with a stub function for non-immutable gets
  const fromJS = returnType === 'immutable' ? ((_globalThis$immutable = globalThis.immutable) === null || _globalThis$immutable === void 0 ? void 0 : _globalThis$immutable.fromJSOrdered) || ((_globalThis$immutable2 = globalThis.immutable) === null || _globalThis$immutable2 === void 0 ? void 0 : _globalThis$immutable2.fromJS) : v => v;

  if (state && 'get' in state && typeof state.get === 'function' && 'getIn' in state && typeof state.getIn === 'function' && 'toJS' in state && typeof state.toJS === 'function') {
    if (Array.isArray(stateKey)) return fromJS(state.getIn(stateKey, fallbackValue));
    return fromJS(state.get(stateKey, fallbackValue));
  }

  if (Array.isArray(stateKey) && state && typeof state === 'object') {
    const result = mapJson.jpath(stateKey.join('.'), state);
    if (typeof result === 'undefined') return fallbackValue;
    return result;
  }

  const result = state && typeof state === 'object' ? state[stateKey] : undefined;
  if (typeof result === 'undefined') return fallbackValue;
  return result;
};

function queryParams(search) {
  return queryString__default["default"].parse(typeof window != 'undefined' ? window.location.search : search);
}

const selectRouteEntry$1 = (state, returnType) => getImmutableOrJS(state, ['routing', 'entry'], {}, returnType);
const selectMappedEntry = (state, returnType) => getImmutableOrJS(state, ['routing', 'mappedEntry'], null, returnType);
const selectSurrogateKeys = state => {
  const keys = getImmutableOrJS(state, ['routing', 'surrogateKeys'], [], 'js');
  return keys.join(' ');
};
const selectCurrentHostname = state => getImmutableOrJS(state, ['routing', 'currentHostname']);
const selectCurrentTreeID = state => getImmutableOrJS(state, ['routing', 'currentHostname']);
const selectRouteEntryEntryId$1 = state => getImmutableOrJS(state, ['routing', 'entry', 'sys', 'id'], null);
const selectRouteEntryContentTypeId$1 = state => {
  const entry = selectRouteEntry$1(state);
  return getImmutableOrJS(entry, ['sys', 'contentTypeId'], null);
};
const selectRouteEntryLanguage = state => {
  const entry = selectRouteEntry$1(state);
  return getImmutableOrJS(entry, ['sys', 'language'], null);
};
const selectRouteEntrySlug$1 = state => {
  const entry = selectRouteEntry$1(state);
  return getImmutableOrJS(entry, ['sys', 'slug'], null);
};
const selectRouteEntryID$1 = state => getImmutableOrJS(state, ['routing', 'entryID']);
const selectCurrentPath$1 = state => getImmutableOrJS(state, ['routing', 'currentPath']);
const selectCurrentLocation = state => getImmutableOrJS(state, ['routing', 'location']);
const selectCurrentSearch$1 = state => getImmutableOrJS(state, ['routing', 'location', 'search']);
const selectCurrentHash = state => getImmutableOrJS(state, ['routing', 'location', 'hash']);
const selectQueryStringAsObject$1 = state => queryParams(selectCurrentSearch$1(state));
const selectCurrentProject$1 = state => getImmutableOrJS(state, ['routing', 'currentProject']);
const selectIsNotFound$1 = state => getImmutableOrJS(state, ['routing', 'notFound']);
const selectCurrentAncestors$1 = state => getImmutableOrJS(state, ['routing', 'currentNodeAncestors'], []);
const selectCurrentSiblings = state => getImmutableOrJS(state, ['routing', 'currentNodeSiblings'], []);
const selectCurrentNode = (state, returnType) => getImmutableOrJS(state, ['routing', 'currentNode'], null, returnType);
const selectCurrentChildren = state => getImmutableOrJS(state, ['routing', 'currentNode', 'children'], []);
const selectBreadcrumb = state => {
  return selectCurrentAncestors$1(state).push(selectCurrentNode(state));
};
const selectRouteErrorMessage = state => {
  const error = getImmutableOrJS(state, ['routing', 'error']);
  return getImmutableOrJS(error, ['data', 'message'], getImmutableOrJS(error, 'statusText'));
};
const selectRouteIsError = state => getImmutableOrJS(state, ['routing', 'isError']);
const selectRouteLoading$1 = state => getImmutableOrJS(state, ['routing', 'isLoading']);
const selectRouteStatusCode = state => getImmutableOrJS(state, ['routing', 'statusCode']);
const selectStaticRoute = state => getImmutableOrJS(state, ['routing', 'staticRoute']);

var routing$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectRouteEntry: selectRouteEntry$1,
  selectMappedEntry: selectMappedEntry,
  selectSurrogateKeys: selectSurrogateKeys,
  selectCurrentHostname: selectCurrentHostname,
  selectCurrentTreeID: selectCurrentTreeID,
  selectRouteEntryEntryId: selectRouteEntryEntryId$1,
  selectRouteEntryContentTypeId: selectRouteEntryContentTypeId$1,
  selectRouteEntryLanguage: selectRouteEntryLanguage,
  selectRouteEntrySlug: selectRouteEntrySlug$1,
  selectRouteEntryID: selectRouteEntryID$1,
  selectCurrentPath: selectCurrentPath$1,
  selectCurrentLocation: selectCurrentLocation,
  selectCurrentSearch: selectCurrentSearch$1,
  selectCurrentHash: selectCurrentHash,
  selectQueryStringAsObject: selectQueryStringAsObject$1,
  selectCurrentProject: selectCurrentProject$1,
  selectIsNotFound: selectIsNotFound$1,
  selectCurrentAncestors: selectCurrentAncestors$1,
  selectCurrentSiblings: selectCurrentSiblings,
  selectCurrentNode: selectCurrentNode,
  selectCurrentChildren: selectCurrentChildren,
  selectBreadcrumb: selectBreadcrumb,
  selectRouteErrorMessage: selectRouteErrorMessage,
  selectRouteIsError: selectRouteIsError,
  selectRouteLoading: selectRouteLoading$1,
  selectRouteStatusCode: selectRouteStatusCode,
  selectStaticRoute: selectStaticRoute
});

const ROUTING_PREFIX = '@ROUTING/';
const GET_ENTRY = `${ROUTING_PREFIX}_GET_ENTRY`;
const SET_ENTRY = `${ROUTING_PREFIX}_SET_ENTRY`;
const SET_NODE = `${ROUTING_PREFIX}_SET_NODE`;
const SET_ANCESTORS = `${ROUTING_PREFIX}_SET_ANCESTORS`;
const SET_SIBLINGS = `${ROUTING_PREFIX}_SET_SIBLINGS`;
const SET_ENTRY_ID = `${ROUTING_PREFIX}_SET_ENTRY_ID`;
const SET_SURROGATE_KEYS = `${ROUTING_PREFIX}_SET_SURROGATE_KEYS`;
const SET_NAVIGATION_NOT_FOUND = `${ROUTING_PREFIX}_SET_NOT_FOUND`;
const SET_NAVIGATION_PATH = `${ROUTING_PREFIX}_SET_NAVIGATION_PATH`;
const SET_TARGET_PROJECT = `${ROUTING_PREFIX}_SET_TARGET_PROJECT`;
const SET_ROUTE = `${ROUTING_PREFIX}_SET_ROUTE`;
const UPDATE_LOADING_STATE = `${ROUTING_PREFIX}_UPDATE_LOADING_STATE`;

var routing$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_ENTRY: GET_ENTRY,
  SET_ENTRY: SET_ENTRY,
  SET_NODE: SET_NODE,
  SET_ANCESTORS: SET_ANCESTORS,
  SET_SIBLINGS: SET_SIBLINGS,
  SET_ENTRY_ID: SET_ENTRY_ID,
  SET_SURROGATE_KEYS: SET_SURROGATE_KEYS,
  SET_NAVIGATION_NOT_FOUND: SET_NAVIGATION_NOT_FOUND,
  SET_NAVIGATION_PATH: SET_NAVIGATION_PATH,
  SET_TARGET_PROJECT: SET_TARGET_PROJECT,
  SET_ROUTE: SET_ROUTE,
  UPDATE_LOADING_STATE: UPDATE_LOADING_STATE
});

const setNotFound = notFound => action$1(SET_NAVIGATION_NOT_FOUND, {
  notFound
});
const setNavigationPath = (path, location, staticRoute, withEvents, statePath, routes) => action$1(SET_NAVIGATION_PATH, {
  path,
  location,
  staticRoute,
  withEvents,
  statePath,
  routes
});
const setCurrentProject = (project, allowedGroups, hostname) => action$1(SET_TARGET_PROJECT, {
  project,
  allowedGroups,
  hostname
});
const setRoute = (path, state) => action$1(SET_ROUTE, {
  path,
  state
});
const setRouteEntry = entry => action$1(SET_ENTRY, {
  entry
});
const setSurrogateKeys = (keys, url) => action$1(SET_SURROGATE_KEYS, {
  keys,
  url
});

var routing$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setNotFound: setNotFound,
  setNavigationPath: setNavigationPath,
  setCurrentProject: setCurrentProject,
  setRoute: setRoute,
  setRouteEntry: setRouteEntry,
  setSurrogateKeys: setSurrogateKeys
});

const ACTION_PREFIX$1 = '@USER/';
const SET_AUTHENTICATION_STATE = `${ACTION_PREFIX$1}SET_AUTHENTICATION_STATE`;
const LOGIN_USER = `${ACTION_PREFIX$1}LOGIN_USER`;
const LOGOUT_USER = `${ACTION_PREFIX$1}LOGOUT_USER`;
const REGISTER_USER = `${ACTION_PREFIX$1}REGISTER_USER`;
const REGISTER_USER_SUCCESS = `${ACTION_PREFIX$1}REGISTER_USER_SUCCESS`;
const REGISTER_USER_FAILED = `${ACTION_PREFIX$1}REGISTER_USER_FAILED`;
const REQUEST_USER_PASSWORD_RESET_SENDING = `${ACTION_PREFIX$1}REQUEST_USER_PASSWORD_RESET_SENDING`;
const REQUEST_USER_PASSWORD_RESET_SUCCESS = `${ACTION_PREFIX$1}REQUEST_USER_PASSWORD_RESET_SUCCESS`;
const REQUEST_USER_PASSWORD_RESET_ERROR = `${ACTION_PREFIX$1}REQUEST_USER_PASSWORD_RESET_ERROR`;
const RESET_USER_PASSWORD_SENDING = `${ACTION_PREFIX$1}RESET_USER_PASSWORD_SENDING`;
const RESET_USER_PASSWORD_SUCCESS = `${ACTION_PREFIX$1}RESET_USER_PASSWORD_SUCCESS`;
const RESET_USER_PASSWORD_ERROR = `${ACTION_PREFIX$1}RESET_USER_PASSWORD_ERROR`;
const CHANGE_USER_PASSWORD_SENDING = `${ACTION_PREFIX$1}CHANGE_USER_PASSWORD_SENDING`;
const CHANGE_USER_PASSWORD_SUCCESS = `${ACTION_PREFIX$1}CHANGE_USER_PASSWORD_SUCCESS`;
const CHANGE_USER_PASSWORD_ERROR = `${ACTION_PREFIX$1}CHANGE_USER_PASSWORD_ERROR`;

const defaultAuthenticationState = {
  clientCredentials: null,
  errorMessage: null,
  isAuthenticated: false,
  isAuthenticationError: false,
  isError: false,
  isLoading: false
};
const defaultPasswordResetRequestValues = {
  isSending: false,
  sent: false,
  error: null
};
const defaultResetPasswordValues = {
  isSending: false,
  sent: false,
  error: null
};
const defaultChangePasswordValues = {
  isSending: false,
  sent: false,
  error: null
};
const defaultRegistrationValues = {
  isLoading: false,
  success: false,
  error: null
};
const initialUserState = {
  authenticationState: defaultAuthenticationState,
  passwordResetRequest: defaultPasswordResetRequestValues,
  resetPassword: defaultResetPasswordValues,
  changePassword: defaultChangePasswordValues,
  groups: []
};
immer.produce((state, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      {
        return initialUserState;
      }

    case LOGIN_USER:
    case SET_AUTHENTICATION_STATE:
      {
        var _state, _state$authentication;

        if (!action.authenticationState) {
          action.authenticationState = defaultAuthenticationState;
        }

        const {
          authenticationState: {
            clientCredentials = null,
            errorMessage = null,
            isAuthenticated,
            isAuthenticationError = false,
            isError = false,
            isLoading = action.type === LOGIN_USER
          },
          user
        } = action;

        if (user) {
          user.name = `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}` || null;
          user.isZengentiStaff = user.email.includes('@zengenti.com');
        }

        state = { ...initialUserState,
          ...(user || state),
          authenticationState: {
            clientCredentials,
            errorMessage,
            isAuthenticated: isAuthenticated || ((_state = state) === null || _state === void 0 ? void 0 : (_state$authentication = _state.authenticationState) === null || _state$authentication === void 0 ? void 0 : _state$authentication.isAuthenticated),
            isAuthenticationError,
            isError,
            isLoading
          }
        };
        return state;
      }
    // REGISTER_USER is the trigger to set the user.registration initial state
    // and will set user.registration.isLoading to true
    // REGISTER_USER_FAILED will unset user.registration.isLoading and will set
    // the value in user.registration.error
    // REGISTER_USER_SUCCESS will unset user.registration.isLoading and will
    // set user.registration to the created user from the api response

    case REGISTER_USER:
    case REGISTER_USER_FAILED:
    case REGISTER_USER_SUCCESS:
      {
        const {
          error,
          user
        } = action; // Set registration object from the supplied action.user
        // so we can call these values back later

        state.registration = user || state.registration || defaultRegistrationValues; // Set registration flags so the UI can track the status

        state.registration.success = action.type === REGISTER_USER_SUCCESS;
        state.registration.error = error || false;
        state.registration.isLoading = action.type === REGISTER_USER;
        return;
      }

    case REQUEST_USER_PASSWORD_RESET_SENDING:
      state.passwordResetRequest = defaultPasswordResetRequestValues;
      state.passwordResetRequest.isSending = true;
      return;

    case REQUEST_USER_PASSWORD_RESET_SUCCESS:
      if (state.passwordResetRequest) {
        state.passwordResetRequest.isSending = false;
        state.passwordResetRequest.sent = true;
      }

      return;

    case REQUEST_USER_PASSWORD_RESET_ERROR:
      if (state.passwordResetRequest) {
        state.passwordResetRequest.isSending = false;
        state.passwordResetRequest.error = action.error;
      }

      return;

    case RESET_USER_PASSWORD_SENDING:
      if (state.resetPassword) {
        state.resetPassword.isSending = true;
      }

      return;

    case RESET_USER_PASSWORD_SUCCESS:
      if (state.resetPassword) {
        state.resetPassword.isSending = false;
        state.resetPassword.sent = true;
      }

      return;

    case RESET_USER_PASSWORD_ERROR:
      if (state.resetPassword) {
        state.resetPassword.isSending = false;
        state.resetPassword.error = action.error;
      }

      return;

    case CHANGE_USER_PASSWORD_SENDING:
      if (state.changePassword) {
        state.changePassword.isSending = true;
      }

      return;

    case CHANGE_USER_PASSWORD_SUCCESS:
      if (state.changePassword) {
        state.changePassword.isSending = false;
        state.changePassword.sent = true;
      }

      return;

    case CHANGE_USER_PASSWORD_ERROR:
      if (state.changePassword) {
        state.changePassword.isSending = false;
        state.changePassword.error = action.error;
      }

      return;

    default:
      return;
  }
}, initialUserState);

const ACTION_PREFIX = '@NAVIGATION/';
const GET_NODE_TREE = `${ACTION_PREFIX}_GET_NODE_TREE`;
const SET_NODE_TREE = `${ACTION_PREFIX}_SET_NODE_TREE`;
const GET_NODE_TREE_ERROR = `${ACTION_PREFIX}_GET_NODE_TREE_ERROR`;

var navigation$1$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GET_NODE_TREE: GET_NODE_TREE,
  SET_NODE_TREE: SET_NODE_TREE,
  GET_NODE_TREE_ERROR: GET_NODE_TREE_ERROR
});

const initialState$2 = {
  root: null,
  isError: false,
  isReady: false
};
immer.produce((state, action) => {
  switch (action.type) {
    case SET_NODE_TREE:
      {
        state.root = action.nodes;
        state.isReady = true;
        return;
      }

    case GET_NODE_TREE_ERROR:
      {
        state.isError = true;
        return;
      }

    default:
      return;
  }
}, initialState$2);

const combineMerge = (target, source, options) => {
  const destination = target.slice();
  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge__default["default"](target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
};

const initialState$1 = {
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
  statusCode: 200
};
immer.produce((state, action) => {
  switch (action.type) {
    case SET_ANCESTORS:
      {
        state.currentNodeAncestors = action.ancestors;
        return;
      }

    case SET_ENTRY:
      {
        const {
          entry,
          error,
          mappedEntry,
          node = {},
          isError = false,
          isLoading = false,
          notFound = false,
          statusCode
        } = action;
        let defaultStatus = 200;
        if (notFound === true && isError === false) defaultStatus = 404;else if (isError === true) defaultStatus = statusCode || 500;

        if (!entry) {
          state.entryID = null;
          state.entry = null;
          state.error = error;
          state.mappedEntry = null;
          state.isError = isError;
          state.isLoading = isLoading;
          state.notFound = notFound;
          state.statusCode = statusCode || defaultStatus;
        } else {
          state.entryID = action.id;
          state.entry = entry;
          state.error = error;
          state.isError = isError;
          state.isLoading = isLoading;
          state.notFound = notFound;
          state.statusCode = statusCode || defaultStatus;

          if (mappedEntry && Object.keys(mappedEntry).length > 0) {
            state.mappedEntry = mappedEntry;
            state.entry = {
              sys: entry.sys
            };
          }
        }

        if (!node) {
          state.currentNode = null;
        } else {
          // On Set Node, we reset all dependants.
          state.currentNode = node; // eslint-disable-next-line @typescript-eslint/no-unused-vars

          const {
            entry,
            ...nodeWithoutEntry
          } = node; // We have the entry stored elsewhere, so lets not keep it twice.

          state.currentNode = nodeWithoutEntry;
        }

        return;
      }

    case UPDATE_LOADING_STATE:
      {
        state.isLoading = action.isLoading;
        return;
      }

    case SET_NAVIGATION_PATH:
      {
        let staticRoute = {};

        if (action.staticRoute) {
          staticRoute = { ...action.staticRoute
          };
        }

        if (action.path) {
          var _state$entry, _state$entry$sys;

          // Don't run a path update on initial load as we allready should have it in redux
          const entryUri = state === null || state === void 0 ? void 0 : (_state$entry = state.entry) === null || _state$entry === void 0 ? void 0 : (_state$entry$sys = _state$entry.sys) === null || _state$entry$sys === void 0 ? void 0 : _state$entry$sys.uri;

          if (entryUri !== action.path) {
            state.currentPath = action.path;
            state.location = action.location;
            state.staticRoute = { ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            };
            state.isLoading = typeof window !== 'undefined';
          } else {
            state.location = action.location;
            state.staticRoute = { ...staticRoute,
              route: { ...staticRoute.route,
                component: null
              }
            };
          }
        }

        return;
      }

    case SET_ROUTE:
      {
        state.nextPath = action.path;
        return;
      }

    case SET_SIBLINGS:
      {
        // Can be null in some cases like the homepage.
        let currentNodeSiblingParent = null;

        if (action.siblings && action.siblings.length > 0) {
          currentNodeSiblingParent = action.siblings[0].parentId;
        }

        state.currentNodeSiblings = action.siblings;
        state.currentNodeSiblingsParent = currentNodeSiblingParent;
        return;
      }

    case SET_SURROGATE_KEYS:
      {
        // console.info(`SET_SURROGATE_KEYS: '${action.url}' keys: ${action.keys}`);
        state.surrogateKeys = merge__default["default"](state.surrogateKeys, (action.keys || '').split(' '), {
          arrayMerge: combineMerge
        });
        return;
      }

    case SET_TARGET_PROJECT:
      {
        state.currentProject = action.project;
        state.allowedGroups = action.allowedGroups;
        state.currentHostname = action.hostname;
        return;
      }

    default:
      return state;
  }
}, initialState$1);

const VERSION_PREFIX = '@VERSION/';
const SET_VERSION = `${VERSION_PREFIX}SET_VERSION`;
const SET_VERSION_STATUS = `${VERSION_PREFIX}SET_VERSION_STATUS`;

var version$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SET_VERSION: SET_VERSION,
  SET_VERSION_STATUS: SET_VERSION_STATUS
});

const initialState = {
  commitRef: null,
  buildNo: null,
  contensisVersionStatus: 'published'
};
immer.produce((state, action) => {
  switch (action.type) {
    case SET_VERSION_STATUS:
      {
        state.contensisVersionStatus = action.status;
        return;
      }

    case SET_VERSION:
      {
        state.commitRef = action.commitRef;
        state.buildNo = action.buildNo;
        return;
      }

    default:
      return;
  }
}, initialState);

const hasNavigationTree = state => getImmutableOrJS(state, ['navigation', 'isReady']);
const selectNavigationRoot = state => getImmutableOrJS(state, ['navigation', 'root']);
const selectNavigationChildren = state => getImmutableOrJS(state, ['navigation', 'root', 'children']);
const selectNavigationDepends = () => [];

var navigation = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasNavigationTree: hasNavigationTree,
  selectNavigationRoot: selectNavigationRoot,
  selectNavigationChildren: selectNavigationChildren,
  selectNavigationDepends: selectNavigationDepends
});

const setVersion = (commitRef, buildNo) => action$1(SET_VERSION, {
  commitRef,
  buildNo
});
const setVersionStatus = status => action$1(SET_VERSION_STATUS, {
  status
});

var version$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setVersion: setVersion,
  setVersionStatus: setVersionStatus
});

const selectCommitRef$1 = state => getImmutableOrJS(state, ['version', 'commitRef']);
const selectBuildNumber$1 = state => getImmutableOrJS(state, ['version', 'buildNo']);
const selectVersionStatus$1 = state => getImmutableOrJS(state, ['version', 'contensisVersionStatus']);

var version$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectCommitRef: selectCommitRef$1,
  selectBuildNumber: selectBuildNumber$1,
  selectVersionStatus: selectVersionStatus$1
});

var types$2 = {
  navigation: navigation$1$1,
  routing: routing$1,
  version: version$1
};

const loadNavigationTree$1 = () => action$1(GET_NODE_TREE);

var navigation$1$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree$1
});

var actions$1 = {
  navigation: navigation$1$2,
  routing: routing$2,
  version: version$2
};

var selectors$1 = {
  navigation: navigation,
  routing: routing$3,
  version: version$3
};
const routing$4 = {
  types: types$2.routing,
  actions: actions$1.routing,
  selectors: selectors$1.routing
};

const selectForms$1 = state => getImmutableOrJS(state, ['forms']);
const selectFormFieldData = (state, formId, field) => getImmutableOrJS(state, ['forms', formId, 'fields', field]);
const selectFieldErrors$1 = (state, formId) => getImmutableOrJS(state, ['forms', formId, 'fieldErrors']);
const selectPostData$1 = (state, formId) => getImmutableOrJS(state, ['forms', formId, 'data']);
const selectFormGroups$1 = (state, formId) => getImmutableOrJS(state, [('groups')]);
const selectPagingInfo$1 = (state, formId) => getImmutableOrJS(state, ['forms', formId, 'pagingInfo']);
const selectFormStatus$1 = (state, formId) => getImmutableOrJS(state, ['forms', formId, 'status']);
const selectFormMessage = (state, formId) => getImmutableOrJS(state, ['forms', formId, 'status', 'successMessage']);
const selectEntries$1 = (state, formId) => getImmutableOrJS(state, ['forms', formId, 'entries']);
const makeSelectHasSuccess = (state, formId) => getImmutableOrJS(state, ['forms', formId, 'status', 'hasSuccess']);
const selectPagedFields$1 = formId => reselect.createSelector([selectForms$1], form => {
  const pagingInfo = getImmutableOrJS(form, [formId, 'pagingInfo']);
  const fields = getImmutableOrJS(form, [formId, 'fields']);

  if (fields && fields.length > 0 && pagingInfo && pagingInfo.pageCount > 1) {
    return fields.filter(f => f.groupId == pagingInfo.currentPageId);
  }

  return fields;
});
const makeSelectIsLoading$1 = formId => reselect.createSelector(selectForms$1, forms => getImmutableOrJS(forms, [formId, 'status', 'isLoading']));
const makeSelectFormFields$1 = formId => reselect.createSelector(selectForms$1, forms => getImmutableOrJS(forms, [formId, 'fields']));
const makeSelectDefaultLang$1 = formId => reselect.createSelector(selectForms$1, forms => getImmutableOrJS(forms, [formId, 'defaultLanguage']));

var selectors$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectForms: selectForms$1,
  selectFormFieldData: selectFormFieldData,
  selectFieldErrors: selectFieldErrors$1,
  selectPostData: selectPostData$1,
  selectFormGroups: selectFormGroups$1,
  selectPagingInfo: selectPagingInfo$1,
  selectFormStatus: selectFormStatus$1,
  selectFormMessage: selectFormMessage,
  selectEntries: selectEntries$1,
  makeSelectHasSuccess: makeSelectHasSuccess,
  selectPagedFields: selectPagedFields$1,
  makeSelectIsLoading: makeSelectIsLoading$1,
  makeSelectFormFields: makeSelectFormFields$1,
  makeSelectDefaultLang: makeSelectDefaultLang$1
});

const URI$1 = '/forms';
const getFormSchema$1 = async formId => {
  var options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const getUrl = `${URI$1}/${formId}`;
  const schema = await request$1(getUrl, options);
  return schema;
};
const getEntries$1 = async (formObj, id) => {
  var options = {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObj)
  };
  const entriesUrl = `${URI$1}/entries`;
  const entries = await request$1(entriesUrl, options);
  return {
    entries,
    id
  };
};
const postForm$1 = async formObj => {
  var options = {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObj)
  };
  const submitted = await request$1(URI$1, options);
  return submitted;
};

const request$1 = async (url, options) => {
  return fetch(url, options).then(response => response.json()).then(result => {
    return result;
  }) // eslint-disable-next-line no-console
  .catch(error => console.log('error', error));
};

const validateInput$1 = (field, value) => {
  const isRequired = field.validations && field.validations.required;
  const minLength = field.validations && field.validations.minLength;
  const maxLength = field.validations && field.validations.maxLength;
  const regex = field.validations && field.validations.regex;
  const integer = field.dataType === 'integer';
  const decimal = field.dataType === 'decimal';

  if (isRequired && !value) {
    const errorMessage = isRequired.message ? isRequired.message['en-GB'] : `${field.id} is required`;
    return {
      fieldId: field.id,
      groupId: field.groupId,
      message: errorMessage
    };
  }

  if (minLength && minLength.value > value.length) {
    const errorMessage = minLength.message ? minLength.message['en-GB'] : `Minimum characters ${minLength.value}`;
    return {
      fieldId: field.id,
      groupId: field.groupId,
      message: errorMessage
    };
  }

  if (maxLength && maxLength.value < value.length) {
    const errorMessage = maxLength.message && maxLength.message['en-GB'] ? maxLength.message['en-GB'] : `Maximum characters ${maxLength.value}`;
    return {
      fieldId: field.id,
      groupId: field.groupId,
      message: errorMessage
    };
  }

  if (regex && value.length > 0) {
    //Had to make the string raw, as a string ususually is wrapped as '' and Regex couldnt use the regex patter as the string variant
    const regexPattern = RegExp(regex.pattern.raw);

    if (!regexPattern.test(value)) {
      const errorMessage = regex.message ? regex.message['en-GB'] : `${field.id} is invalid`;
      return {
        fieldId: field.id,
        groupId: field.groupId,
        message: errorMessage
      };
    }
  }

  if (integer) {
    const isInteger = value % 1 === 0;

    if (!isInteger) {
      const errorMessage = `${value} is not an ${field.dataType}`;
      return {
        fieldId: field.id,
        groupId: field.groupId,
        message: errorMessage
      };
    }
  }

  if (decimal) {
    const isDecimal = value % 1 !== 0;

    if (!isDecimal) {
      const errorMessage = `${value} is not an ${field.dataType}`;
      return {
        fieldId: field.id,
        groupId: field.groupId,
        message: errorMessage
      };
    }
  }
};

const {
  selectCurrentAncestors: selectCurrentAncestors$2,
  selectCurrentPath: selectCurrentPath$2,
  selectCurrentProject: selectCurrentProject$2,
  selectCurrentSearch: selectCurrentSearch$2,
  selectIsNotFound: selectIsNotFound$2,
  selectQueryStringAsObject: selectQueryStringAsObject$2,
  selectRouteEntry: selectRouteEntry$2,
  selectRouteEntryContentTypeId: selectRouteEntryContentTypeId$2,
  selectRouteEntryDepends: selectRouteEntryDepends$1,
  selectRouteEntryEntryId: selectRouteEntryEntryId$2,
  selectRouteEntryID: selectRouteEntryID$2,
  selectRouteEntrySlug: selectRouteEntrySlug$2,
  selectRouteLoading: selectRouteLoading$2
} = routing$4.selectors;

const formV2Sagas$1 = [effects.takeEvery(SUBMIT_FORM_SUCCESS, formSuccess$1), effects.takeEvery(SUBMIT_FORM_FOR_VALIDATION, validateForm$1), effects.takeEvery(SUBMIT_FORM, submitForm$1$1), effects.takeEvery(SET_FORM_ID, fetchForm$1), effects.takeLatest(VALIDATE_FIELD, validateField$1$1), effects.takeEvery(PAGE_FORWARD, togglePage$1), effects.takeEvery(PAGE_BACK, togglePage$1), effects.takeEvery(SET_FORM_DATA, getEntryPickerData$1), effects.takeLatest(SET_FORM_DATA, setDefaultValueFields$1)];

function* validateForm$1(action) {
  const {
    formId
  } = action;
  yield validateAllfields$1(formId);
  yield effects.put({
    type: SUBMIT_FORM,
    formId
  });
}

function* validateField$1$1(action) {
  const {
    formId,
    id,
    value
  } = action;
  yield effects.call(validateSingleField$1, formId, id, value);
}

function* validateGroupfields$1(formId, groupId) {
  const state = yield effects.select();
  const postData = selectPostData$1(state, formId);
  const selectFormFields = makeSelectFormFields$1(formId);
  const fields = selectFormFields(state);
  const groupFields = fields.filter(f => f.groupid == groupId);
  let newErrors = [];
  groupFields.forEach(field => {
    let val = '';

    if (postData[field.id]) {
      val = postData[field.id];
    }

    const err = validateInput$1(field, val);
    if (err) newErrors.push(err);
  });
  yield effects.put({
    type: SET_FIELD_ERROR,
    formId: formId,
    value: newErrors
  });
}

function* validateAllfields$1(formId) {
  const state = yield effects.select();
  const postData = selectPostData$1(state, formId);
  const selectFormFields = makeSelectFormFields$1(formId);
  const fields = selectFormFields(state);
  let newErrors = [];
  fields.forEach(field => {
    let val = '';

    if (postData[field.id]) {
      val = postData[field.id];
    }

    const err = validateInput$1(field, val);
    if (err) newErrors.push(err);
  });
  yield effects.put({
    type: SET_FIELD_ERROR,
    formId: formId,
    value: newErrors
  });
}

function* validateSingleField$1(formId, fieldId, value) {
  const state = yield effects.select();
  const selectFormFields = makeSelectFormFields$1(formId);
  const fields = selectFormFields(state);
  const fieldData = fields.find(f => f.id == fieldId);
  const errors = selectFieldErrors$1(state, formId);
  const newErrors = []; //loop through current errors to remove any of the item we currently edit

  errors.forEach(error => {
    if (error.fieldId !== fieldId) {
      //push any existing errors to new array
      newErrors.push(error);
    }
  });
  const err = validateInput$1(fieldData, value);
  if (err) newErrors.push(err);
  yield effects.put({
    type: SET_FIELD_ERROR,
    formId: formId,
    value: newErrors
  });
}

function* togglePage$1(action) {
  const {
    formId,
    pageIndex
  } = action;
  const state = yield effects.select();
  const formGroups = selectFormGroups$1(state);

  if (action.type === PAGE_FORWARD) {
    yield validateGroupfields$1(formId, formGroups[pageIndex].id);
  }

  yield effects.put({
    type: SET_CURRENT_PAGE,
    formId: formId,
    pageId: formGroups[pageIndex].id,
    pageCount: formGroups.length,
    pageIndex: pageIndex
  });
}

function* fetchForm$1(action) {
  const formId = action.formId;
  const schema = yield getFormSchema$1(formId);
  const groups = schema && schema.groups && schema.groups.length > 0 && schema.groups.filter(group => group.id !== 'private');

  if (formId && schema) {
    if (schema.groups && schema.groups.length > 0) {
      yield effects.put({
        type: SET_CURRENT_PAGE,
        formId: formId,
        pageId: groups[0].id,
        pageIndex: 0,
        pageCount: groups.length
      });
    }

    yield effects.put({
      type: SET_FORM_DATA,
      formId: formId,
      fields: schema.fields,
      groups: groups,
      defaultLanguage: schema.defaultLanguage
    });
  }
}

function* formSuccess$1(action) {
  const state = yield effects.select();
  const selectFormFields = makeSelectFormFields$1(action.formId);
  const fields = selectFormFields(state);
  const redirect = fields.find(f => f.id === 'formSettingsRedirect');
  const message = fields.find(f => f.id === 'formSettingsMessage');

  if (redirect && redirect.default) {
    window.location.href = redirect.default['en-GB'];
  }

  if (message && message.default) {
    yield effects.put({
      type: SET_SUCCESS_MESSAGE,
      message: message.default['en-GB'],
      formId: action.formId
    });
  }
}

function* submitForm$1$1(action) {
  const state = yield effects.select();
  const errors = selectFieldErrors$1(state, action.formId);
  const canSubmit = errors && errors.length == 0;

  if (canSubmit) {
    yield effects.put({
      type: SET_SUBMITTING_FORM,
      isSubmitting: true,
      formId: action.formId
    });
    const forms = yield effects.select(selectForms$1);
    const rawData = forms[action.formId];
    const formObj = {
      contentType: action.formId,
      formPost: rawData.data
    };
    const formResObj = yield postForm$1(formObj);

    if (formResObj && formResObj.sys && formResObj.sys.id) {
      yield effects.put({
        type: SUBMIT_FORM_SUCCESS,
        formId: action.formId
      });
    } else {
      yield effects.put({
        type: SUBMIT_FORM_ERROR,
        formId: action.formId
      });
    }
  }
}

function* setDefaultValueFields$1(action) {
  const {
    formId,
    fields,
    defaultLanguage
  } = action;
  const entryId = yield effects.select(selectRouteEntryEntryId$2);
  let fieldObj = {};
  fields.forEach(field => {
    if (field.dataType == 'string' && field.default) {
      const val = field.default[defaultLanguage];

      if (val) {
        fieldObj[field.id] = val;
      }
    }

    if (field.id == 'sourceEntry') {
      const val = entryId;

      if (val) {
        fieldObj[field.id] = val;
      }
    }
  });
  yield effects.put({
    type: SET_DEFAULT_FIELD_VALUE,
    formId: formId,
    value: fieldObj
  });
}

function* getEntryPickerData$1(action) {
  const {
    formId,
    fields
  } = action;
  const entriesToGet = fields.filter(f => f.dataFormat == 'entry');
  let entriesList = [];

  if (entriesToGet) {
    entriesList = yield effects.all(entriesToGet.map(entry => {
      const entriesObj = {
        contentType: entry.validations.allowedContentTypes.contentTypes,
        versionStatus: 'published',
        language: 'en-GB',
        pageSize: '10'
      };
      return effects.call(getEntries$1, entriesObj, entry.id);
    }));
    yield effects.put({
      type: SET_FORM_ENTRIES,
      formId: formId,
      entries: entriesList
    });
  }
}

function action$2(type, payload = {}) {
  return {
    type,
    ...payload
  };
}

const submitForm$2 = formId => action$2(SUBMIT_FORM_FOR_VALIDATION, {
  formId
});
const setFormId$1 = formId => action$2(SET_FORM_ID, {
  formId
});
const setValue$1 = (formId, id, value) => action$2(SET_FIELD_VALUE, {
  formId,
  id,
  value
});
const setCheckboxValue$1 = (formId, id, value, isChecked) => action$2(SET_CHECKBOX_VALUE, {
  formId,
  id,
  value,
  isChecked
});
const setDateRangeValues$1 = (formId, id, dateType, value) => action$2(SET_DATE_RANGE_VALUES, {
  formId,
  id,
  dateType,
  value
});
const validateField$2 = (formId, id, value) => action$2(VALIDATE_FIELD, {
  formId,
  id,
  value
});
const togglePageForward$1 = (formId, pageIndex) => action$2(PAGE_FORWARD, {
  formId,
  pageIndex
});
const togglePageBack$1 = (formId, pageIndex) => action$2(PAGE_BACK, {
  formId,
  pageIndex
});

var actions$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  submitForm: submitForm$2,
  setFormId: setFormId$1,
  setValue: setValue$1,
  setCheckboxValue: setCheckboxValue$1,
  setDateRangeValues: setDateRangeValues$1,
  validateField: validateField$2,
  togglePageForward: togglePageForward$1,
  togglePageBack: togglePageBack$1
});

//Brand
const open_teal$1 = '#37BFA7'; //Brand dark

const teal_dark$1 = '#00a889'; //Primary

const accent_blue$1 = '#1853AC';
const panel_blue$1 = '#00304D'; //Neutrals

const base_white$1 = '#FFF';
const empress_gray$1 = '#757575';
const colors$1 = {
  brand: open_teal$1,
  brandDark: teal_dark$1,
  primary: accent_blue$1,
  secondary: panel_blue$1,
  label: '#333',
  label_optional: '#666',
  border: '#ccc',
  message_link: '#333',
  success: '#118011',
  warning: '#FFB000',
  error: '#C63D54',
  required: '#C63D54',
  neutrals: {
    base_white: base_white$1,
    empress_gray: empress_gray$1
  }
};

const FormStyled$1 = styled__default["default"].form.withConfig({
  displayName: "Formstyled__FormStyled",
  componentId: "sc-1jn1lk9-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css(["> div:not(:first-child){margin-top:16px;}padding:0 16px;.success-message{font-size:18px;margin:0;}.visuallyHidden{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;}label{display:inline-block;.isRequired{color:", ";}}input,textarea,select{display:block;font-family:inherit;background-color:", ";border-radius:3px;border:1px solid ", ";height:40px;padding:8px;margin-top:4px;max-width:320px;width:100%;}textarea{height:200px;resize:none;}"], colors$1.error, colors$1.neutrals.base_white, colors$1.border));
});

const Label$1 = ({
  className,
  label,
  id,
  isRequired,
  isHidden
}) => {
  return /*#__PURE__*/React__default["default"].createElement("label", {
    className: `${className} ${isHidden ? 'visuallyHidden' : ''}`,
    htmlFor: id
  }, label, isRequired && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "isRequired"
  }, "*"), isRequired && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "visuallyHidden"
  }, " (required)"));
};

Label$1.propTypes = {
  className: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  isRequired: PropTypes__default["default"].bool,
  isHidden: PropTypes__default["default"].bool
};

const CreateMessage$1 = (type, minLength, maxLength, currentLength, defaultLanguage) => {
  if (!type) return null;

  switch (type) {
    case 'min':
      {
        if (!minLength) return;
        const minLengthVal = minLength && minLength.value;
        const errorMessage = minLength && minLength.message && minLength.message[defaultLanguage];
        const minText = `Minimum of ${minLengthVal.toString()} characters`;

        if (errorMessage) {
          return errorMessage;
        } else {
          return minText;
        }
      }

    case 'max':
      {
        if (!maxLength) return;
        const maxLengthVal = maxLength && maxLength.value;
        const errorMessage = maxLength && maxLength.message && maxLength.message[defaultLanguage];
        const maxText = `Maximum of ${maxLengthVal.toString()} characters`;

        if (errorMessage) {
          return errorMessage;
        } else {
          return maxText;
        }
      }

    case 'between':
      {
        if (!maxLength || !minLength) return;
        const minLengthVal = minLength && minLength.value;
        const maxLengthVal = maxLength && maxLength.value;
        const errorMessage = minLength && minLength.message && minLength.message[defaultLanguage];
        const rangeText = `Between ${minLengthVal.toString()}-${maxLengthVal.toString()} characters)`;

        if (errorMessage) {
          return errorMessage;
        } else if (currentLength < minLengthVal) {
          return `${(minLengthVal - currentLength).toString()} character${minLengthVal > 1 ? 's' : ''} required ${rangeText}`;
        } else if (currentLength > maxLengthVal) {
          return `${(currentLength - maxLengthVal).toString()} character${currentLength - maxLengthVal > 1 ? 's' : ''} over ${rangeText}`;
        } else if (currentLength) {
          return `${(maxLengthVal - currentLength).toString()} characters remaining ${rangeText}`;
        } else {
          return rangeText;
        }
      }

    default:
      return null;
  }
};

const CharacterLimitStyled$1 = styled__default["default"].div.withConfig({
  displayName: "CharacterLimit__CharacterLimitStyled",
  componentId: "sc-16zngav-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return styled.css(["display:block;", ""], useDefaultTheme && styled.css(["font-size:14px;color:", ";font-weight:400;line-height:24px;text-align:right;max-width:320px;width:100%;"], theme.colors.neutrals.empress_gray));
});

const CharacterLimit$1 = ({
  className,
  value,
  validations,
  defaultLanguage,
  useDefaultTheme
}) => {
  if (!validations) return null;
  let valueAsString = typeof value === 'number' ? value.toString() : value;
  const currentLength = valueAsString && valueAsString.length ? valueAsString.length : 0;
  const {
    minLength,
    maxLength
  } = validations;
  const hasMaxLength = maxLength && !minLength;
  const hasMinLength = minLength && !maxLength;
  const hasInBetween = minLength && maxLength;
  const type = hasMinLength ? 'min' : hasMaxLength ? 'max' : hasInBetween ? 'between' : null;
  if (!type) return null;
  return /*#__PURE__*/React__default["default"].createElement(CharacterLimitStyled$1, {
    className: className,
    useDefaultTheme: useDefaultTheme
  }, CreateMessage$1(type, minLength, maxLength, currentLength, defaultLanguage));
};

CharacterLimit$1.propTypes = {
  validations: PropTypes__default["default"].object,
  value: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].object]),
  className: PropTypes__default["default"].string,
  defaultLanguage: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool
};

const ErrorMessageStyled$1 = styled__default["default"].div.withConfig({
  displayName: "ErrorMessage__ErrorMessageStyled",
  componentId: "sc-1vewdiu-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css(["display:block;margin-top:8px;color:", ";"], theme.colors.error));
});

const ErrorMessage$1 = ({
  className,
  message,
  useDefaultTheme
}) => {
  return /*#__PURE__*/React__default["default"].createElement(ErrorMessageStyled$1, {
    className: className,
    useDefaultTheme: useDefaultTheme
  }, message);
};

ErrorMessage$1.propTypes = {
  className: PropTypes__default["default"].string,
  message: PropTypes__default["default"].string.isRequired,
  useDefaultTheme: PropTypes__default["default"].bool
};

const TextfieldStyled$1 = styled__default["default"].div.withConfig({
  displayName: "Textfield__TextfieldStyled",
  componentId: "sc-1a1c03n-0"
})(["", ";"], ({
  isHidden
}) => {
  return styled.css(["display:", ";"], isHidden ? 'none' : 'block');
});

const Textfield$1 = ({
  className,
  formId,
  id,
  label,
  type,
  setValue,
  validateField,
  validations,
  defaultValue,
  defaultLanguage,
  placeholder,
  isHidden,
  errors,
  useDefaultTheme
}) => {
  const [showCharLimit, setShowCharLimit] = React.useState(false);
  const isRequired = validations && validations.required ? true : false;
  const placeholderText = placeholder && placeholder.properties && placeholder.properties.placeholderText && placeholder.properties.placeholderText[defaultLanguage];
  const defaultValueText = defaultValue && defaultValue[defaultLanguage] ? defaultValue[defaultLanguage] : defaultValue;

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

  const _handleBlur = (formId, id, value) => {
    validateField(formId, id, value);
    setShowCharLimit(false);
  };

  const _handleFocus = () => {
    setShowCharLimit(true);
  };

  return /*#__PURE__*/React__default["default"].createElement(TextfieldStyled$1, {
    className: "textfield-container",
    isHidden: isHidden
  }, /*#__PURE__*/React__default["default"].createElement(Label$1, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-textfield"
  }), showCharLimit && /*#__PURE__*/React__default["default"].createElement(CharacterLimit$1, {
    value: defaultValue,
    validations: validations,
    defaultLanguage: defaultLanguage,
    useDefaultTheme: useDefaultTheme
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    className: `${className ? className : ''} input-textfield`,
    type: type,
    defaultValue: defaultValueText,
    placeholder: placeholderText,
    id: id,
    name: id,
    onChange: e => _handleChange(formId, id, e.target.value),
    onBlur: e => _handleBlur(formId, id, e.target.value),
    onFocus: () => _handleFocus()
  }), errors && errors.length > 0 && errors.some(x => x.fieldId == id) && /*#__PURE__*/React__default["default"].createElement(ErrorMessage$1, {
    message: errors.find(x => x.fieldId == id).message,
    useDefaultTheme: useDefaultTheme
  }));
};

Textfield$1.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  validateField: PropTypes__default["default"].func,
  validations: PropTypes__default["default"].object,
  defaultValue: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].object]),
  defaultLanguage: PropTypes__default["default"].string,
  placeholder: PropTypes__default["default"].object,
  isHidden: PropTypes__default["default"].bool,
  errors: PropTypes__default["default"].array,
  useDefaultTheme: PropTypes__default["default"].bool
};

const Textarea$1 = ({
  className,
  formId,
  id,
  label,
  type,
  setValue,
  validations,
  defaultValue,
  defaultLanguage,
  placeholder,
  validateField,
  useDefaultTheme,
  errors
}) => {
  const [showCharLimit, setShowCharLimit] = React.useState(false);
  const isRequired = validations && validations.required ? true : false;
  const placeholderText = placeholder && placeholder.properties && placeholder.properties.placeholderText && placeholder.properties.placeholderText[defaultLanguage];
  const defaultValueText = defaultValue ? defaultValue[defaultLanguage] : null;

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

  const _handleBlur = (formId, id, value) => {
    validateField(formId, id, value);
    setShowCharLimit(false);
  };

  const _handleFocus = () => {
    setShowCharLimit(true);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "textarea-container"
  }, /*#__PURE__*/React__default["default"].createElement(Label$1, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-textarea"
  }), showCharLimit && /*#__PURE__*/React__default["default"].createElement(CharacterLimit$1, {
    value: defaultValue,
    validations: validations,
    defaultLanguage: defaultLanguage,
    useDefaultTheme: useDefaultTheme
  }), /*#__PURE__*/React__default["default"].createElement("textarea", {
    className: `${className ? className : ''} input-textarea`,
    type: type,
    id: id,
    defaultValue: defaultValueText,
    placeholder: placeholderText,
    onChange: e => _handleChange(formId, id, e.target.value),
    onBlur: e => _handleBlur(formId, id, e.target.value),
    onFocus: () => _handleFocus()
  }), errors && errors.length > 0 && errors.some(x => x.fieldId == id) && /*#__PURE__*/React__default["default"].createElement(ErrorMessage$1, {
    message: errors.find(x => x.fieldId == id).message,
    useDefaultTheme: useDefaultTheme
  }));
};

Textarea$1.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  validations: PropTypes__default["default"].object,
  defaultValue: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  placeholder: PropTypes__default["default"].object,
  validateField: PropTypes__default["default"].func,
  useDefaultTheme: PropTypes__default["default"].bool,
  errors: PropTypes__default["default"].array
};

const HiddenField$1 = ({
  className,
  id,
  label,
  type,
  defaultValue,
  defaultLanguage,
  placeholder
}) => {
  return /*#__PURE__*/React__default["default"].createElement(Textfield$1, {
    type: type,
    label: label,
    id: id,
    defaultValue: defaultValue,
    defaultLanguage: defaultLanguage,
    placeholder: placeholder,
    className: className,
    isHidden: true
  });
};

HiddenField$1.propTypes = {
  className: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  defaultValue: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  placeholder: PropTypes__default["default"].object
};

const Dropdown$1 = ({
  className,
  formId,
  id,
  validations,
  defaultValue,
  defaultLanguage,
  label,
  setValue
}) => {
  if (!validations) return null;
  const isRequired = validations && validations.required ? true : false;
  const ddValues = validations && validations.allowedValues && validations.allowedValues.values;

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

  if (!ddValues || ddValues.length < 1) return null;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "dropdown-container"
  }, /*#__PURE__*/React__default["default"].createElement(Label$1, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-dropdown"
  }), /*#__PURE__*/React__default["default"].createElement("select", {
    name: id,
    id: id,
    className: `${className ? className : ''} select-dropdown`,
    defaultValue: defaultValue,
    onBlur: e => _handleChange(formId, id, e.target.value)
  }, ddValues.map((val, idx) => {
    return /*#__PURE__*/React__default["default"].createElement("option", {
      key: `${val[defaultLanguage]}-${idx}`,
      value: val[defaultLanguage],
      className: "option-dropdown"
    }, val[defaultLanguage]);
  })));
};

Dropdown$1.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  id: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  defaultValue: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  defaultLanguage: PropTypes__default["default"].string
};

const CheckboxStyled$1 = styled__default["default"].div.withConfig({
  displayName: "Checkbox__CheckboxStyled",
  componentId: "s8ewuf-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".checkbox-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
});

const Checkbox$1 = ({
  className,
  formId,
  setCheckboxValue,
  id,
  type,
  label,
  validations,
  defaultValue,
  name,
  defaultLanguage,
  useDefaultTheme
}) => {
  // NF change rules of hooks
  let isDefaultChecked = defaultValue && defaultValue[defaultLanguage];
  const [isChecked, setIsChecked] = React.useState(isDefaultChecked || '');

  switch (type) {
    case 'multiple':
      {
        if (!validations) return null;
        const isRequired = validations && validations.required ? true : false;
        const cbValues = validations && validations.allowedValues && validations.allowedValues.values;

        const _handleChange = (value, isChecked) => {
          setCheckboxValue(formId, id, value, isChecked);
        };

        if (!cbValues || cbValues.length < 1) return null;
        return /*#__PURE__*/React__default["default"].createElement(CheckboxStyled$1, {
          className: `checkbox-container`,
          useDefaultTheme: useDefaultTheme
        }, /*#__PURE__*/React__default["default"].createElement(Label$1, {
          id: id,
          label: label,
          isRequired: isRequired,
          className: "label-checkbox-container"
        }), cbValues.map((val, idx) => {
          return /*#__PURE__*/React__default["default"].createElement("span", {
            key: idx,
            className: "checkbox-wrapper"
          }, /*#__PURE__*/React__default["default"].createElement("input", {
            type: "checkbox",
            id: `checkbox-${idx}`,
            name: `checkbox-${idx}`,
            value: val[defaultLanguage],
            className: `${className ? className : ''} input-checkbox`,
            onChange: e => _handleChange(e.target.value, e.target.checked)
          }), /*#__PURE__*/React__default["default"].createElement(Label$1, {
            id: `checkbox-${idx}`,
            label: val[defaultLanguage],
            className: "label-checkbox"
          }));
        }));
      }

    case 'single':
      {
        const _handleChange = isChecked => {
          setIsChecked(isChecked);
          setCheckboxValue(formId, id, isChecked);
        };

        return /*#__PURE__*/React__default["default"].createElement(CheckboxStyled$1, {
          className: `checkbox-container`,
          useDefaultTheme: useDefaultTheme
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: "checkbox-wrapper"
        }, /*#__PURE__*/React__default["default"].createElement("input", {
          type: "checkbox",
          id: id,
          name: `checkbox-${id}`,
          value: name[defaultLanguage],
          checked: isChecked,
          className: `${className ? className : ''} input-checkbox`,
          onChange: e => _handleChange(e.target.checked)
        }), /*#__PURE__*/React__default["default"].createElement(Label$1, {
          id: id,
          label: label,
          className: "label-checkbox"
        })));
      }
  }
};

Checkbox$1.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  setCheckboxValue: PropTypes__default["default"].func,
  validations: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  name: PropTypes__default["default"].object,
  default: PropTypes__default["default"].object
};

const RadioButtonStyled$1 = styled__default["default"].div.withConfig({
  displayName: "RadioButton__RadioButtonStyled",
  componentId: "sc-7y8c21-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".radio-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
});

const RadioButton$1 = ({
  className,
  formId,
  setValue,
  id,
  type,
  label,
  validations,
  defaultLanguage,
  useDefaultTheme
}) => {
  if (!validations) return null;
  const isRequired = validations && validations.required ? true : false;
  const cbValues = validations && validations.allowedValues && validations.allowedValues.values;

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

  if (!cbValues || cbValues.length < 1) return null;
  return /*#__PURE__*/React__default["default"].createElement(RadioButtonStyled$1, {
    className: "radio-container",
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React__default["default"].createElement(Label$1, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-radio-container"
  }), cbValues.map((val, idx) => {
    return /*#__PURE__*/React__default["default"].createElement("span", {
      key: idx,
      className: "radio-wrapper"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: type,
      id: val[defaultLanguage],
      name: id,
      value: val[defaultLanguage],
      className: `${className ? className : ''} input-radio`,
      onChange: e => _handleChange(formId, id, e.target.value)
    }), /*#__PURE__*/React__default["default"].createElement(Label$1, {
      id: val[defaultLanguage],
      label: val[defaultLanguage],
      className: "label-radio"
    }));
  }));
};

RadioButton$1.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  id: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool
};

//example date string: 2019-01-02T13:05:00 (expects ISO 8601 Datetime format yyyy-mm-ddThh:mm:ss [this is the format returned from Contensis delivery api])
//yyyy > year long, eg. 2019
//yy > year short, eg. 19
//MMMM > month long, eg. January
//MMM > month short, eg. Jan
//MM > month with leading 0, eg. 01
//M > month, eg. 1
//dddd > day long, eg. Monday
//ddd > day short, eg. Mon
//dd > date with leading 0, eg. 02
//d > date, eg. 2
//HH > 24 hour clock hour parameter with leading 0, eg. ...T03:05:00 = 03
//H > 24 hour clock hour parameter, eg. ...T03:05:00 = 3
//hh > 12 hour clock hour parameter with leading 0, eg. ...T16:05:00 = 04
//h > 12 hour clock hour parameter, eg. ...T16:05:00 = 4
//mm > minutes with leading 0, eg. ...T16:05:00 = 05
//m > minutes, eg ...T16:05:00 = 5
//t > abbreviated AM / PM, e.g. A or P
//tt > AM / PM, e.g. AM or PM
const formatDate$1 = (date, format = 'dd MMMM yyyy') => {
  if (!date) return null;
  const dateObj = new Date(date);
  const dateString = date.toString().split('T');
  const dateArr = dateString[0].split('-');
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  const dayNameInt = dateObj.getDay();
  const timeArr = dateString[1].split(':');
  const hour = timeArr[0];
  const minute = timeArr[1]; //convert to abstract strings to avoid character replacement along the chain, eg. Monday would match 'M' month single parameter

  const YEAR = ['&&', '&'];
  const MONTH = ['££££', '£££', '££', '£'];
  const DAY = ['%%%%', '%%%', '%%', '%'];
  const HOUR24 = ['!!', '!'];
  const HOUR12 = ['^^', '^'];
  const MINUTE = ['**', '*'];
  const TF = ['??', '?'];
  let formattedDate = format.replace('yyyy', YEAR[0]).replace('yy', YEAR[1]).replace('y', '') //'y' && 'yyy' not valid
  .replace('MMMM', MONTH[0]).replace('MMM', MONTH[1]).replace('MM', MONTH[2]).replace('M', MONTH[3]).replace('dddd', DAY[0]).replace('ddd', DAY[1]).replace('dd', DAY[2]).replace('d', DAY[3]).replace('HH', HOUR24[0]).replace('H', HOUR24[1]).replace('hh', HOUR12[0]).replace('h', HOUR12[1]).replace('mm', MINUTE[0]).replace('m', MINUTE[1]).replace('tt', TF[0]).replace('t', TF[1]).replace(YEAR[0], year).replace(YEAR[1], year.slice(-2)).replace(MONTH[0], monthsLong$1[parseInt(month, 10)]).replace(MONTH[1], monthsShort$1[parseInt(month, 10)]).replace(MONTH[2], month).replace(MONTH[3], parseInt(month, 10)).replace(DAY[0], daysLong$1[dayNameInt]).replace(DAY[1], daysShort$1[dayNameInt]).replace(DAY[2], day).replace(DAY[3], parseInt(day, 10)).replace(HOUR24[0], hour).replace(HOUR24[1], parseInt(hour, 10)).replace(HOUR12[0], parseHour$1(hour)).replace(HOUR12[1], parseInt(parseHour$1(hour), 10)).replace(MINUTE[0], minute).replace(MINUTE[1], parseInt(minute, 10)).replace(TF[0], parseTF$1(hour)).replace(TF[1], parseTF$1(hour).slice(0, -1));
  return formattedDate;
};

const monthsShort$1 = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthsLong$1 = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysShort$1 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysLong$1 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const parseHour$1 = hour => {
  return hour > 12 ? hour - 12 : hour;
};

const parseTF$1 = hour => {
  return hour > 11 ? 'PM' : 'AM';
};

const SingleDate$1 = ({
  className,
  type,
  id,
  label,
  validations,
  setValue,
  formId
}) => {
  const isRequired = validations && validations.required ? true : false;
  const onlyPassedDates = validations && validations.pastDateTime;
  const d = new Date();
  const todaysDate = d.toISOString();

  const _handleChange = (formId, id, value) => {
    const d = new Date(value);
    const isoDate = d.toISOString();
    setValue(formId, id, isoDate);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "date-container"
  }, /*#__PURE__*/React__default["default"].createElement(Label$1, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-date"
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    type: type,
    id: id,
    name: id,
    className: `${className ? className : ''} input-date`,
    max: onlyPassedDates ? formatDate$1(todaysDate, 'yyyy-MM-dd') : '',
    onChange: e => _handleChange(formId, id, e.target.value)
  }));
};

SingleDate$1.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  type: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object
};

const DateRangeStyled$1 = styled__default["default"].div.withConfig({
  displayName: "DateRange__DateRangeStyled",
  componentId: "hnzg32-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".daterange-wrapper{display:flex;flex-direction:column;input{&:first-child{margin:0 0 8px 0;}}}"]));
});

const DateRange$1 = ({
  className,
  id,
  label,
  validations,
  setDateRangeValues,
  formId,
  useDefaultTheme
}) => {
  const isRequired = validations && validations.required ? true : false;
  const onlyPassedDates = validations && validations.pastDateTime;
  const d = new Date();
  const todaysDate = d.toISOString();
  const [toDate, setToDate] = React.useState('');
  const [fromDate, setFromDate] = React.useState('');

  const _handleDateChange = (dateType, formId, id, value) => {
    _updateDateProps(dateType, value);

    const d = new Date(value);
    const isoDate = d.toISOString();
    setDateRangeValues(formId, id, dateType, isoDate);
  };

  const _updateDateProps = (type, date) => {
    switch (type) {
      case 'from':
        {
          const d = new Date(date);
          const newDate = d.toISOString();
          setFromDate(newDate);
          break;
        }

      case 'to':
        {
          const d = new Date(date);
          const newDate = d.toISOString();
          setToDate(newDate);
          break;
        }

      default:
        return;
    }
  };

  return /*#__PURE__*/React__default["default"].createElement(DateRangeStyled$1, {
    className: `daterange-container`,
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React__default["default"].createElement(Label$1, {
    id: id,
    label: label,
    isRequired: isRequired
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "daterange-wrapper"
  }, /*#__PURE__*/React__default["default"].createElement(Label$1, {
    id: "date-from",
    label: "Date from",
    isHidden: true,
    className: "label-daterange"
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    type: "date",
    id: "date-from",
    name: id,
    max: onlyPassedDates && !toDate ? formatDate$1(todaysDate, 'yyyy-MM-dd') : onlyPassedDates && toDate ? formatDate$1(toDate, 'yyyy-MM-dd') : toDate ? formatDate$1(toDate, 'yyyy-MM-dd') : '',
    className: `${className ? className : ''} input-daterange`,
    onChange: e => _handleDateChange('from', formId, id, e.target.value)
  }), /*#__PURE__*/React__default["default"].createElement(Label$1, {
    id: "date-to",
    label: "Date to",
    isHidden: true,
    className: "label-daterange"
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    type: "date",
    id: "date-to",
    name: id,
    max: onlyPassedDates ? formatDate$1(todaysDate, 'yyyy-MM-dd') : '',
    min: formatDate$1(fromDate, 'yyyy-MM-dd'),
    className: `${className ? className : ''} input-daterange`,
    onChange: e => _handleDateChange('to', formId, id, e.target.value)
  })));
};

DateRange$1.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setDateRangeValues: PropTypes__default["default"].func,
  type: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  useDefaultTheme: PropTypes__default["default"].bool
};

const EntryPickerStyled$1 = styled__default["default"].div.withConfig({
  displayName: "EntryPicker__EntryPickerStyled",
  componentId: "svnu18-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".radio-wrapper,.checkbox-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
});

const EntryPicker$1 = ({
  className,
  results,
  id,
  label,
  validations,
  type,
  useDefaultTheme,
  setValue,
  formId
}) => {
  if (!results || results.length > 3) return null;
  const isRequired = validations && validations.required ? true : false;
  let valArr = [];

  const _handleChange = (formId, id, value, isChecked) => {
    if (type === 'checkbox') {
      if (isChecked) {
        valArr.push(value);
      } else if (!isChecked) {
        valArr = valArr.filter(valItem => valItem !== value);
      }

      setValue(formId, id, valArr);
    } else {
      setValue(formId, id, value);
    }
  };

  return /*#__PURE__*/React__default["default"].createElement(EntryPickerStyled$1, {
    className: `${type}-container`,
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React__default["default"].createElement(Label$1, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: `label-${type}-container`
  }), results.map((res, idx) => {
    return /*#__PURE__*/React__default["default"].createElement("span", {
      key: idx,
      className: `${type}-wrapper`
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: type,
      id: res.entryTitle,
      value: res.entryTitle,
      name: id,
      className: `${className ? className : ''} input-${type}`,
      onChange: e => _handleChange(formId, id, e.target.value, e.target.checked)
    }), /*#__PURE__*/React__default["default"].createElement(Label$1, {
      id: res.entryTitle,
      label: res.entryTitle,
      className: `label-${type}`
    }));
  }));
};

EntryPicker$1.propTypes = {
  className: PropTypes__default["default"].string,
  results: PropTypes__default["default"].array,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  type: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool,
  setValue: PropTypes__default["default"].func,
  formId: PropTypes__default["default"].string
};

const FormComposer$1 = ({
  fields,
  formData,
  formId,
  setValue,
  setDateRangeValues,
  validateField,
  defaultLanguage,
  errors,
  useDefaultTheme,
  entries,
  setCheckboxValue
}) => {
  if (!fields || fields.length < 1) return null; //const arrayOfFields = Object.entries(fields).map(f => f[1]);

  return fields.map((field, idx) => {
    if (!field) return null;

    switch (field.type) {
      case 'number':
      case 'textfield':
        {
          return /*#__PURE__*/React__default["default"].createElement(Textfield$1, {
            key: `${field.id}-${idx}`,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            formId: formId,
            setValue: setValue,
            validations: field.validations,
            validateField: validateField,
            defaultLanguage: defaultLanguage,
            defaultValue: formData && formData[field.id] || field.default,
            placeholder: field.editor,
            errors: errors,
            useDefaultTheme: useDefaultTheme
          });
        }

      case 'textarea':
        {
          return /*#__PURE__*/React__default["default"].createElement(Textarea$1, {
            key: `${field.id}-${idx}`,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            formId: formId,
            setValue: setValue,
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            defaultValue: field.default,
            placeholder: field.editor,
            validateField: validateField,
            useDefaultTheme: useDefaultTheme,
            errors: errors
          });
        }

      case 'dropdown':
        {
          return /*#__PURE__*/React__default["default"].createElement(Dropdown$1, {
            key: `${field.id}-${idx}`,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            defaultValue: field.default,
            formId: formId,
            setValue: setValue,
            useDefaultTheme: useDefaultTheme
          });
        }

      case 'checkbox':
        {
          return /*#__PURE__*/React__default["default"].createElement(Checkbox$1, {
            key: `${field.id}-${idx}`,
            id: field.id,
            name: field.name,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            setValue: setValue,
            formId: formId,
            defaultValue: formData && formData[field.id] || field.default,
            type: field.dataType === 'boolean' ? 'single' : 'multiple',
            useDefaultTheme: useDefaultTheme,
            setCheckboxValue: setCheckboxValue
          });
        }

      case 'radio':
        {
          return /*#__PURE__*/React__default["default"].createElement(RadioButton$1, {
            key: `${field.id}-${idx}`,
            id: field.id,
            type: field.type,
            formId: formId,
            setValue: setValue,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            useDefaultTheme: useDefaultTheme
          });
        }

      case 'entryPicker':
        {
          const type = field.dataType === 'objectArray' ? 'checkbox' : 'radio';
          const results = entries && entries[field.id] && entries[field.id].items;
          return /*#__PURE__*/React__default["default"].createElement(EntryPicker$1, {
            key: `${field.id}-${idx}`,
            type: type,
            results: results,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            useDefaultTheme: useDefaultTheme,
            setValue: setValue,
            validateField: validateField,
            formId: formId
          });
        }

      case 'date':
        {
          return /*#__PURE__*/React__default["default"].createElement(SingleDate$1, {
            key: `${field.id}-${idx}`,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            formId: formId,
            setValue: setValue,
            useDefaultTheme: useDefaultTheme
          });
        }

      case 'dateRange':
        {
          return /*#__PURE__*/React__default["default"].createElement(DateRange$1, {
            key: `${field.id}-${idx}`,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            formId: formId,
            setDateRangeValues: setDateRangeValues,
            useDefaultTheme: useDefaultTheme
          });
        }

      case 'hidden':
        {
          return /*#__PURE__*/React__default["default"].createElement(HiddenField$1, {
            key: `${field.id}-${idx}`,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            defaultLanguage: defaultLanguage,
            defaultValue: field.default,
            placeholder: field.editor
          });
        }
    }
  });
};

FormComposer$1.propTypes = {
  fields: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formData: PropTypes__default["default"].object,
  entries: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  validateField: PropTypes__default["default"].func,
  setDateRangeValues: PropTypes__default["default"].func,
  defaultLanguage: PropTypes__default["default"].string,
  errors: PropTypes__default["default"].array,
  useDefaultTheme: PropTypes__default["default"].bool,
  setCheckboxValue: PropTypes__default["default"].func
};

const ButtonStyled$1 = styled__default["default"].button.withConfig({
  displayName: "Button__ButtonStyled",
  componentId: "hr2oup-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css(["display:inline-block;cursor:pointer;margin:16px 0 0 0;padding:8px 16px;border-radius:3px;border:1px solid ", ";font-family:inherit;transition:opacity 200ms ease;&:hover{opacity:0.7;}"], theme.colors.border));
});

const Button$1 = ({
  className,
  type,
  text,
  action,
  useDefaultTheme
}) => {
  return /*#__PURE__*/React__default["default"].createElement(ButtonStyled$1, {
    className: `${className ? className : ''} btnSubmit`,
    type: type,
    onClick: () => action(),
    useDefaultTheme: useDefaultTheme
  }, text);
};
Button$1.propTypes = {
  className: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  text: PropTypes__default["default"].string,
  action: PropTypes__default["default"].func,
  useDefaultTheme: PropTypes__default["default"].bool
};

const ThemeContext$1 = React.createContext();

const ThemeProvider$1 = ({
  children,
  theme
}) => {
  return /*#__PURE__*/React__default["default"].createElement(ThemeContext$1.Provider, null, /*#__PURE__*/React__default["default"].createElement(styled.ThemeProvider, {
    theme: theme
  }, children));
};

ThemeProvider$1.propTypes = {
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].arrayOf(PropTypes__default["default"].node), PropTypes__default["default"].node]),
  theme: PropTypes__default["default"].object
};

const mediaQueriesNoUnit$1 = {
  s: 470,
  ms: 640,
  m: 768,
  ml: 880,
  l: 1024,
  xl: 1200,
  xxl: 1366,
  wide: 1600
};
const mediaQueries$1 = {
  small: mediaQueriesNoUnit$1.s + 'px',
  msmall: mediaQueriesNoUnit$1.ms + 'px',
  medium: mediaQueriesNoUnit$1.m + 'px',
  mlarge: mediaQueriesNoUnit$1.ml + 'px',
  large: mediaQueriesNoUnit$1.l + 'px',
  xlarge: mediaQueriesNoUnit$1.xl + 'px',
  xxlarge: mediaQueriesNoUnit$1.xxl + 'px',
  wide: mediaQueriesNoUnit$1.wide + 'px'
};
const layout$1 = {
  mediaQueries: mediaQueries$1
};

const fontFamily$1 = {
  Poppins: `'Poppins', Arial, sans-serif`
}; //use html tag name as object key
//use default object key for base styles
//use media query key that corresponds with keys set on mediaQueries object from ./layout to map to relevant screen sizes
//uses a mobile first approach to rules

const typography$1 = {
  default: {
    color: colors$1.label,
    font_family: fontFamily$1.Poppins,
    font_style: 'normal',
    font_weight: 400,
    font_size: '18px',
    line_height: 1.75
  }
};
const defaultStyles$1 = typography$1.default;
const typographyStyles$1 = {
  defaultStyles: defaultStyles$1
}; // function generateTypeStyles(obj) {
//   return Object.keys(obj)
//     .map(mq => {
//       const props = generateProps(obj[mq]);
//       if (mq === 'default') {
//         return `${props.join(' ')}`;
//       } else {
//         return `@media only screen and (min-width:${
//           mediaQueries[mq]
//         }){${props.join('')}}`;
//       }
//     })
//     .join('');
// }
// function generateProps(objMQ) {
//   let props = [];
//   Object.keys(objMQ).map(prop => {
//     props.push(`${prop.split('_').join('-')}: ${objMQ[prop]};`);
//   });
//   return props;
// }

const defaultTheme$1 = {
  layout: layout$1,
  typographyStyles: typographyStyles$1,
  typography: typography$1,
  colors: colors$1
};

const divStyles$1 = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'Column'
};
const svgStyles$1 = {
  width: '80px',
  height: '80px'
};
const headingStyles$1 = {
  margin: '0',
  fontSize: '16px'
};
const Loading$1 = () => {
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: divStyles$1
  }, /*#__PURE__*/React__default["default"].createElement("h3", {
    style: headingStyles$1
  }, "Loading..."), /*#__PURE__*/React__default["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "lds-spinner",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 100 100",
    style: svgStyles$1
  }, /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.9166666666666666s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(30 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.8333333333333334s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(60 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.75s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(90 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.6666666666666666s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(120 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.5833333333333334s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(150 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.5s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(180 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.4166666666666667s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(210 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.3333333333333333s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(240 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.25s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(270 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.16666666666666666s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(300 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.08333333333333333s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(330 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "0s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  }))));
};
Loading$1.propTypes = {};

const Form$1$1 = ({
  className,
  formId,
  fields,
  formData,
  setFormId,
  setValue,
  validateField,
  defaultLanguage,
  errors,
  pagingInfo,
  togglePageForward,
  togglePageBack,
  submitForm,
  status,
  setDateRangeValues,
  useDefaultTheme,
  entries,
  customSubmit,
  setCheckboxValue
}) => {
  React.useEffect(() => {
    setFormId(formId);
  }, [formId, setFormId]); // NF change rule of hooks

  if (!formId) return null;
  let formRender;

  if (pagingInfo && pagingInfo.pageCount > 1) {
    const isLastPage = pagingInfo.pageCount == pagingInfo.pageIndex + 1;
    formRender = /*#__PURE__*/React__default["default"].createElement(FormStyled$1, {
      className: className,
      id: formId,
      useDefaultTheme: useDefaultTheme
    }, status && status.isLoading || status && status.isSubmitting && /*#__PURE__*/React__default["default"].createElement(Loading$1, {
      className: "loading"
    }), !status || status && !status.isLoading && !status.isSubmitting && !status.hasSuccess && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, pagingInfo.pageIndex > 0 && /*#__PURE__*/React__default["default"].createElement(Button$1, {
      type: "button",
      text: "Go Back",
      action: () => togglePageBack(formId, pagingInfo.pageIndex - 1),
      useDefaultTheme: useDefaultTheme
    }), /*#__PURE__*/React__default["default"].createElement(FormComposer$1, {
      fields: fields,
      formData: formData,
      formId: formId,
      setValue: setValue,
      validateField: validateField,
      defaultLanguage: defaultLanguage,
      errors: errors,
      pagingInfo: pagingInfo,
      useDefaultTheme: useDefaultTheme,
      entries: entries,
      setDateRangeValues: setDateRangeValues,
      setCheckboxValue: setCheckboxValue
    }), !isLastPage && /*#__PURE__*/React__default["default"].createElement(Button$1, {
      type: "button",
      text: "Next",
      action: () => togglePageForward(formId, pagingInfo.pageIndex + 1),
      useDefaultTheme: useDefaultTheme
    }), isLastPage && /*#__PURE__*/React__default["default"].createElement(Button$1, {
      text: "Submit",
      type: "button",
      action: () => {
        submitForm(formId);
        if (customSubmit) customSubmit();
      },
      useDefaultTheme: useDefaultTheme
    })), status && status.hasSuccess && status.successMessage && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "success-message"
    }, status.successMessage));
  } else {
    formRender = /*#__PURE__*/React__default["default"].createElement(FormStyled$1, {
      className: className,
      id: formId,
      useDefaultTheme: useDefaultTheme
    }, status && status.isLoading || status && status.isSubmitting && /*#__PURE__*/React__default["default"].createElement(Loading$1, {
      className: "loading"
    }), !status || status && !status.isLoading && !status.isSubmitting && !status.hasSuccess && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(FormComposer$1, {
      fields: fields,
      formId: formId,
      setValue: setValue,
      setDateRangeValues: setDateRangeValues,
      validateField: validateField,
      defaultLanguage: defaultLanguage,
      errors: errors,
      useDefaultTheme: useDefaultTheme,
      entries: entries,
      setCheckboxValue: setCheckboxValue
    }), /*#__PURE__*/React__default["default"].createElement(Button$1, {
      text: "Submit",
      type: "button",
      action: () => {
        submitForm(formId);
        if (customSubmit) customSubmit();
      },
      useDefaultTheme: useDefaultTheme
    })), status && status.hasSuccess && status.successMessage && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "success-message"
    }, status.successMessage));
  }

  return /*#__PURE__*/React__default["default"].createElement(ThemeProvider$1, {
    theme: defaultTheme$1
  }, formRender);
};

Form$1$1.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  fields: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formData: PropTypes__default["default"].object,
  entries: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  useDefaultTheme: PropTypes__default["default"].bool,
  setFormId: PropTypes__default["default"].func,
  setValue: PropTypes__default["default"].func,
  setDateRangeValues: PropTypes__default["default"].func,
  validateField: PropTypes__default["default"].func,
  defaultLanguage: PropTypes__default["default"].string,
  errors: PropTypes__default["default"].array,
  pagingInfo: PropTypes__default["default"].object,
  togglePageForward: PropTypes__default["default"].func,
  togglePageBack: PropTypes__default["default"].func,
  submitForm: PropTypes__default["default"].func,
  customSubmit: PropTypes__default["default"].func,
  status: PropTypes__default["default"].object,
  setCheckboxValue: PropTypes__default["default"].func
};

const FormContainer$1 = ({
  className,
  formId,
  fields,
  formData,
  setFormId,
  setValue,
  setDateRangeValues,
  validateField,
  defaultLanguage,
  errors,
  pagingInfo,
  togglePageForward,
  togglePageBack,
  submitForm,
  status,
  useDefaultTheme = true,
  entries,
  setCheckboxValue,
  customSubmit
}) => {
  return /*#__PURE__*/React__default["default"].createElement(Form$1$1, {
    className: className,
    formId: formId,
    fields: fields,
    setFormId: setFormId,
    setValue: setValue,
    setDateRangeValues: setDateRangeValues,
    validateField: validateField,
    defaultLanguage: defaultLanguage,
    errors: errors,
    pagingInfo: pagingInfo,
    togglePageForward: togglePageForward,
    togglePageBack: togglePageBack,
    submitForm: submitForm,
    status: status,
    useDefaultTheme: useDefaultTheme,
    entries: entries,
    formData: formData,
    setCheckboxValue: setCheckboxValue,
    customSubmit: customSubmit
  });
};

FormContainer$1.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  fields: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formData: PropTypes__default["default"].object,
  entries: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  setFormId: PropTypes__default["default"].func,
  setDateRangeValues: PropTypes__default["default"].func,
  setValue: PropTypes__default["default"].func,
  useDefaultTheme: PropTypes__default["default"].bool,
  validateField: PropTypes__default["default"].func,
  defaultLanguage: PropTypes__default["default"].string,
  errors: PropTypes__default["default"].array,
  pagingInfo: PropTypes__default["default"].object,
  togglePageForward: PropTypes__default["default"].func,
  togglePageBack: PropTypes__default["default"].func,
  submitForm: PropTypes__default["default"].func,
  status: PropTypes__default["default"].object,
  setCheckboxValue: PropTypes__default["default"].func,
  customSubmit: PropTypes__default["default"].func
};

const mapStateToProps$1 = (state, props) => {
  const {
    formId
  } = props;
  const selectFormFields = selectPagedFields$1(formId);
  const selectIsLoading = makeSelectIsLoading$1(formId);
  const selectDefaultLang = makeSelectDefaultLang$1(formId);
  return state => ({
    fields: selectFormFields(state),
    loading: selectIsLoading(state),
    defaultLanguage: selectDefaultLang(state),
    errors: selectFieldErrors$1(state, formId),
    pagingInfo: selectPagingInfo$1(state, formId),
    status: selectFormStatus$1(state, formId),
    entries: selectEntries$1(state, formId),
    formData: selectPostData$1(state, formId)
  });
};

const mapDispatchToProps$1 = dispatch => {
  return {
    setFormId: formId => dispatch(setFormId$1(formId)),
    setValue: (formId, id, value) => dispatch(setValue$1(formId, id, value)),
    setCheckboxValue: (formId, id, value, isChecked) => dispatch(setCheckboxValue$1(formId, id, value, isChecked)),
    setDateRangeValues: (formId, id, dateType, value) => dispatch(setDateRangeValues$1(formId, id, dateType, value)),
    validateField: (formId, id, value) => dispatch(validateField$2(formId, id, value)),
    togglePageForward: (formId, pageIndex) => dispatch(togglePageForward$1(formId, pageIndex)),
    togglePageBack: (formId, pageIndex) => dispatch(togglePageBack$1(formId, pageIndex)),
    submitForm: formId => dispatch(submitForm$2(formId))
  };
};

var Form$2 = reactRedux.connect(mapStateToProps$1, mapDispatchToProps$1)(FormContainer$1);

var forms = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': Form$2,
  actions: actions$2,
  reducer: reducer,
  sagas: formV2Sagas$1,
  selectors: selectors$2,
  types: types$1
});

const selectCommitRef = state => getImmutableOrJS$1(state, ['version', 'commitRef']);
const selectBuildNumber = state => getImmutableOrJS$1(state, ['version', 'buildNo']);
const selectVersionStatus = state => getImmutableOrJS$1(state, ['version', 'contensisVersionStatus']);

var version = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectCommitRef: selectCommitRef,
  selectBuildNumber: selectBuildNumber,
  selectVersionStatus: selectVersionStatus
});

var types = {
  navigation: navigation$1$3,
  routing: routing$1$1,
  version: version$1$1,
  forms: forms
};

const loadNavigationTree = () => action$3(GET_NODE_TREE$1);

var navigation$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadNavigationTree: loadNavigationTree
});

var actions = {
  navigation: navigation$1,
  routing: routing$5,
  version: version$4,
  forms: forms
};

var selectors = {
  navigation: navigation$2,
  routing: routing$6,
  version: version,
  forms: forms
};
const routing = {
  types: types.routing,
  actions: actions.routing,
  selectors: selectors.routing
};

const selectForms = state => getImmutableOrJS$1(state, ['forms']);
const selectFieldErrors = (state, formId) => getImmutableOrJS$1(state, ['forms', formId, 'fieldErrors']);
const selectPostData = (state, formId) => getImmutableOrJS$1(state, ['forms', formId, 'data']);
const selectFormGroups = (state, formId) => getImmutableOrJS$1(state, [('groups')]);
const selectPagingInfo = (state, formId) => getImmutableOrJS$1(state, ['forms', formId, 'pagingInfo']);
const selectFormStatus = (state, formId) => getImmutableOrJS$1(state, ['forms', formId, 'status']);
const selectEntries = (state, formId) => getImmutableOrJS$1(state, ['forms', formId, 'entries']);
const selectPagedFields = formId => reselect.createSelector([selectForms], form => {
  const pagingInfo = getImmutableOrJS$1(form, [formId, 'pagingInfo']);
  const fields = getImmutableOrJS$1(form, [formId, 'fields']);

  if (fields && fields.length > 0 && pagingInfo && pagingInfo.pageCount > 1) {
    return fields.filter(f => f.groupId == pagingInfo.currentPageId);
  }

  return fields;
});
const makeSelectIsLoading = formId => reselect.createSelector(selectForms, forms => getImmutableOrJS$1(forms, [formId, 'status', 'isLoading']));
const makeSelectFormFields = formId => reselect.createSelector(selectForms, forms => getImmutableOrJS$1(forms, [formId, 'fields']));
const makeSelectDefaultLang = formId => reselect.createSelector(selectForms, forms => getImmutableOrJS$1(forms, [formId, 'defaultLanguage']));

const URI = '/forms';
const getFormSchema = async formId => {
  var options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const getUrl = `${URI}/${formId}`;
  const schema = await request(getUrl, options);
  return schema;
};
const getEntries = async (formObj, id) => {
  var options = {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObj)
  };
  const entriesUrl = `${URI}/entries`;
  const entries = await request(entriesUrl, options);
  return {
    entries,
    id
  };
};
const postForm = async formObj => {
  var options = {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObj)
  };
  const submitted = await request(URI, options);
  return submitted;
};

const request = async (url, options) => {
  return fetch(url, options).then(response => response.json()).then(result => {
    return result;
  }) // eslint-disable-next-line no-console
  .catch(error => console.log('error', error));
};

const validateInput = (field, value) => {
  const isRequired = field.validations && field.validations.required;
  const minLength = field.validations && field.validations.minLength;
  const maxLength = field.validations && field.validations.maxLength;
  const regex = field.validations && field.validations.regex;
  const integer = field.dataType === 'integer';
  const decimal = field.dataType === 'decimal';

  if (isRequired && !value) {
    const errorMessage = isRequired.message ? isRequired.message['en-GB'] : `${field.id} is required`;
    return {
      fieldId: field.id,
      groupId: field.groupId,
      message: errorMessage
    };
  }

  if (minLength && minLength.value > value.length) {
    const errorMessage = minLength.message ? minLength.message['en-GB'] : `Minimum characters ${minLength.value}`;
    return {
      fieldId: field.id,
      groupId: field.groupId,
      message: errorMessage
    };
  }

  if (maxLength && maxLength.value < value.length) {
    const errorMessage = maxLength.message && maxLength.message['en-GB'] ? maxLength.message['en-GB'] : `Maximum characters ${maxLength.value}`;
    return {
      fieldId: field.id,
      groupId: field.groupId,
      message: errorMessage
    };
  }

  if (regex && value.length > 0) {
    //Had to make the string raw, as a string ususually is wrapped as '' and Regex couldnt use the regex patter as the string variant
    const regexPattern = RegExp(regex.pattern.raw);

    if (!regexPattern.test(value)) {
      const errorMessage = regex.message ? regex.message['en-GB'] : `${field.id} is invalid`;
      return {
        fieldId: field.id,
        groupId: field.groupId,
        message: errorMessage
      };
    }
  }

  if (integer) {
    const isInteger = value % 1 === 0;

    if (!isInteger) {
      const errorMessage = `${value} is not an ${field.dataType}`;
      return {
        fieldId: field.id,
        groupId: field.groupId,
        message: errorMessage
      };
    }
  }

  if (decimal) {
    const isDecimal = value % 1 !== 0;

    if (!isDecimal) {
      const errorMessage = `${value} is not an ${field.dataType}`;
      return {
        fieldId: field.id,
        groupId: field.groupId,
        message: errorMessage
      };
    }
  }
};

const {
  selectCurrentAncestors,
  selectCurrentPath,
  selectCurrentProject,
  selectCurrentSearch,
  selectIsNotFound,
  selectQueryStringAsObject,
  selectRouteEntry,
  selectRouteEntryContentTypeId,
  selectRouteEntryDepends,
  selectRouteEntryEntryId,
  selectRouteEntryID,
  selectRouteEntrySlug,
  selectRouteLoading
} = routing.selectors;

const formV2Sagas = [effects.takeEvery(SUBMIT_FORM_SUCCESS$1, formSuccess), effects.takeEvery(SUBMIT_FORM_FOR_VALIDATION$1, validateForm), effects.takeEvery(SUBMIT_FORM$1, submitForm$1), effects.takeEvery(SET_FORM_ID$1, fetchForm), effects.takeLatest(VALIDATE_FIELD$1, validateField$1), effects.takeEvery(PAGE_FORWARD$1, togglePage), effects.takeEvery(PAGE_BACK$1, togglePage), effects.takeEvery(SET_FORM_DATA$1, getEntryPickerData), effects.takeLatest(SET_FORM_DATA$1, setDefaultValueFields)];

function* validateForm(action) {
  const {
    formId
  } = action;
  yield validateAllfields(formId);
  yield effects.put({
    type: SUBMIT_FORM$1,
    formId
  });
}

function* validateField$1(action) {
  const {
    formId,
    id,
    value
  } = action;
  yield effects.call(validateSingleField, formId, id, value);
}

function* validateGroupfields(formId, groupId) {
  const state = yield effects.select();
  const postData = selectPostData(state, formId);
  const selectFormFields = makeSelectFormFields(formId);
  const fields = selectFormFields(state);
  const groupFields = fields.filter(f => f.groupid == groupId);
  let newErrors = [];
  groupFields.forEach(field => {
    let val = '';

    if (postData[field.id]) {
      val = postData[field.id];
    }

    const err = validateInput(field, val);
    if (err) newErrors.push(err);
  });
  yield effects.put({
    type: SET_FIELD_ERROR$1,
    formId: formId,
    value: newErrors
  });
}

function* validateAllfields(formId) {
  const state = yield effects.select();
  const postData = selectPostData(state, formId);
  const selectFormFields = makeSelectFormFields(formId);
  const fields = selectFormFields(state);
  let newErrors = [];
  fields.forEach(field => {
    let val = '';

    if (postData[field.id]) {
      val = postData[field.id];
    }

    const err = validateInput(field, val);
    if (err) newErrors.push(err);
  });
  yield effects.put({
    type: SET_FIELD_ERROR$1,
    formId: formId,
    value: newErrors
  });
}

function* validateSingleField(formId, fieldId, value) {
  const state = yield effects.select();
  const selectFormFields = makeSelectFormFields(formId);
  const fields = selectFormFields(state);
  const fieldData = fields.find(f => f.id == fieldId);
  const errors = selectFieldErrors(state, formId);
  const newErrors = []; //loop through current errors to remove any of the item we currently edit

  errors.forEach(error => {
    if (error.fieldId !== fieldId) {
      //push any existing errors to new array
      newErrors.push(error);
    }
  });
  const err = validateInput(fieldData, value);
  if (err) newErrors.push(err);
  yield effects.put({
    type: SET_FIELD_ERROR$1,
    formId: formId,
    value: newErrors
  });
}

function* togglePage(action) {
  const {
    formId,
    pageIndex
  } = action;
  const state = yield effects.select();
  const formGroups = selectFormGroups(state);

  if (action.type === PAGE_FORWARD$1) {
    yield validateGroupfields(formId, formGroups[pageIndex].id);
  }

  yield effects.put({
    type: SET_CURRENT_PAGE$1,
    formId: formId,
    pageId: formGroups[pageIndex].id,
    pageCount: formGroups.length,
    pageIndex: pageIndex
  });
}

function* fetchForm(action) {
  const formId = action.formId;
  const schema = yield getFormSchema(formId);
  const groups = schema && schema.groups && schema.groups.length > 0 && schema.groups.filter(group => group.id !== 'private');

  if (formId && schema) {
    if (schema.groups && schema.groups.length > 0) {
      yield effects.put({
        type: SET_CURRENT_PAGE$1,
        formId: formId,
        pageId: groups[0].id,
        pageIndex: 0,
        pageCount: groups.length
      });
    }

    yield effects.put({
      type: SET_FORM_DATA$1,
      formId: formId,
      fields: schema.fields,
      groups: groups,
      defaultLanguage: schema.defaultLanguage
    });
  }
}

function* formSuccess(action) {
  const state = yield effects.select();
  const selectFormFields = makeSelectFormFields(action.formId);
  const fields = selectFormFields(state);
  const redirect = fields.find(f => f.id === 'formSettingsRedirect');
  const message = fields.find(f => f.id === 'formSettingsMessage');

  if (redirect && redirect.default) {
    window.location.href = redirect.default['en-GB'];
  }

  if (message && message.default) {
    yield effects.put({
      type: SET_SUCCESS_MESSAGE$1,
      message: message.default['en-GB'],
      formId: action.formId
    });
  }
}

function* submitForm$1(action) {
  const state = yield effects.select();
  const errors = selectFieldErrors(state, action.formId);
  const canSubmit = errors && errors.length == 0;

  if (canSubmit) {
    yield effects.put({
      type: SET_SUBMITTING_FORM$1,
      isSubmitting: true,
      formId: action.formId
    });
    const forms = yield effects.select(selectForms);
    const rawData = forms[action.formId];
    const formObj = {
      contentType: action.formId,
      formPost: rawData.data
    };
    const formResObj = yield postForm(formObj);

    if (formResObj && formResObj.sys && formResObj.sys.id) {
      yield effects.put({
        type: SUBMIT_FORM_SUCCESS$1,
        formId: action.formId
      });
    } else {
      yield effects.put({
        type: SUBMIT_FORM_ERROR$1,
        formId: action.formId
      });
    }
  }
}

function* setDefaultValueFields(action) {
  const {
    formId,
    fields,
    defaultLanguage
  } = action;
  const entryId = yield effects.select(selectRouteEntryEntryId);
  let fieldObj = {};
  fields.forEach(field => {
    if (field.dataType == 'string' && field.default) {
      const val = field.default[defaultLanguage];

      if (val) {
        fieldObj[field.id] = val;
      }
    }

    if (field.id == 'sourceEntry') {
      const val = entryId;

      if (val) {
        fieldObj[field.id] = val;
      }
    }
  });
  yield effects.put({
    type: SET_DEFAULT_FIELD_VALUE$1,
    formId: formId,
    value: fieldObj
  });
}

function* getEntryPickerData(action) {
  const {
    formId,
    fields
  } = action;
  const entriesToGet = fields.filter(f => f.dataFormat == 'entry');
  let entriesList = [];

  if (entriesToGet) {
    entriesList = yield effects.all(entriesToGet.map(entry => {
      const entriesObj = {
        contentType: entry.validations.allowedContentTypes.contentTypes,
        versionStatus: 'published',
        language: 'en-GB',
        pageSize: '10'
      };
      return effects.call(getEntries, entriesObj, entry.id);
    }));
    yield effects.put({
      type: SET_FORM_ENTRIES$1,
      formId: formId,
      entries: entriesList
    });
  }
}

//Brand
const open_teal = '#37BFA7'; //Brand dark

const teal_dark = '#00a889'; //Primary

const accent_blue = '#1853AC';
const panel_blue = '#00304D'; //Neutrals

const base_white = '#FFF';
const empress_gray = '#757575';
const colors = {
  brand: open_teal,
  brandDark: teal_dark,
  primary: accent_blue,
  secondary: panel_blue,
  label: '#333',
  label_optional: '#666',
  border: '#ccc',
  message_link: '#333',
  success: '#118011',
  warning: '#FFB000',
  error: '#C63D54',
  required: '#C63D54',
  neutrals: {
    base_white,
    empress_gray
  }
};

const FormStyled = styled__default["default"].form.withConfig({
  displayName: "Formstyled__FormStyled",
  componentId: "sc-1jn1lk9-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css(["> div:not(:first-child){margin-top:16px;}padding:0 16px;.success-message{font-size:18px;margin:0;}.visuallyHidden{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;}label{display:inline-block;.isRequired{color:", ";}}input,textarea,select{display:block;font-family:inherit;background-color:", ";border-radius:3px;border:1px solid ", ";height:40px;padding:8px;margin-top:4px;max-width:320px;width:100%;}textarea{height:200px;resize:none;}"], colors.error, colors.neutrals.base_white, colors.border));
});

const Label = ({
  className,
  label,
  id,
  isRequired,
  isHidden
}) => {
  return /*#__PURE__*/React__default["default"].createElement("label", {
    className: `${className} ${isHidden ? 'visuallyHidden' : ''}`,
    htmlFor: id
  }, label, isRequired && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "isRequired"
  }, "*"), isRequired && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "visuallyHidden"
  }, " (required)"));
};

Label.propTypes = {
  className: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  isRequired: PropTypes__default["default"].bool,
  isHidden: PropTypes__default["default"].bool
};

const CreateMessage = (type, minLength, maxLength, currentLength, defaultLanguage) => {
  if (!type) return null;

  switch (type) {
    case 'min':
      {
        if (!minLength) return;
        const minLengthVal = minLength && minLength.value;
        const errorMessage = minLength && minLength.message && minLength.message[defaultLanguage];
        const minText = `Minimum of ${minLengthVal.toString()} characters`;

        if (errorMessage) {
          return errorMessage;
        } else {
          return minText;
        }
      }

    case 'max':
      {
        if (!maxLength) return;
        const maxLengthVal = maxLength && maxLength.value;
        const errorMessage = maxLength && maxLength.message && maxLength.message[defaultLanguage];
        const maxText = `Maximum of ${maxLengthVal.toString()} characters`;

        if (errorMessage) {
          return errorMessage;
        } else {
          return maxText;
        }
      }

    case 'between':
      {
        if (!maxLength || !minLength) return;
        const minLengthVal = minLength && minLength.value;
        const maxLengthVal = maxLength && maxLength.value;
        const errorMessage = minLength && minLength.message && minLength.message[defaultLanguage];
        const rangeText = `Between ${minLengthVal.toString()}-${maxLengthVal.toString()} characters)`;

        if (errorMessage) {
          return errorMessage;
        } else if (currentLength < minLengthVal) {
          return `${(minLengthVal - currentLength).toString()} character${minLengthVal > 1 ? 's' : ''} required ${rangeText}`;
        } else if (currentLength > maxLengthVal) {
          return `${(currentLength - maxLengthVal).toString()} character${currentLength - maxLengthVal > 1 ? 's' : ''} over ${rangeText}`;
        } else if (currentLength) {
          return `${(maxLengthVal - currentLength).toString()} characters remaining ${rangeText}`;
        } else {
          return rangeText;
        }
      }

    default:
      return null;
  }
};

const CharacterLimitStyled = styled__default["default"].div.withConfig({
  displayName: "CharacterLimit__CharacterLimitStyled",
  componentId: "sc-16zngav-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return styled.css(["display:block;", ""], useDefaultTheme && styled.css(["font-size:14px;color:", ";font-weight:400;line-height:24px;text-align:right;max-width:320px;width:100%;"], theme.colors.neutrals.empress_gray));
});

const CharacterLimit = ({
  className,
  value,
  validations,
  defaultLanguage,
  useDefaultTheme
}) => {
  if (!validations) return null;
  let valueAsString = typeof value === 'number' ? value.toString() : value;
  const currentLength = valueAsString && valueAsString.length ? valueAsString.length : 0;
  const {
    minLength,
    maxLength
  } = validations;
  const hasMaxLength = maxLength && !minLength;
  const hasMinLength = minLength && !maxLength;
  const hasInBetween = minLength && maxLength;
  const type = hasMinLength ? 'min' : hasMaxLength ? 'max' : hasInBetween ? 'between' : null;
  if (!type) return null;
  return /*#__PURE__*/React__default["default"].createElement(CharacterLimitStyled, {
    className: className,
    useDefaultTheme: useDefaultTheme
  }, CreateMessage(type, minLength, maxLength, currentLength, defaultLanguage));
};

CharacterLimit.propTypes = {
  validations: PropTypes__default["default"].object,
  value: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].object]),
  className: PropTypes__default["default"].string,
  defaultLanguage: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool
};

const ErrorMessageStyled = styled__default["default"].div.withConfig({
  displayName: "ErrorMessage__ErrorMessageStyled",
  componentId: "sc-1vewdiu-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css(["display:block;margin-top:8px;color:", ";"], theme.colors.error));
});

const ErrorMessage = ({
  className,
  message,
  useDefaultTheme
}) => {
  return /*#__PURE__*/React__default["default"].createElement(ErrorMessageStyled, {
    className: className,
    useDefaultTheme: useDefaultTheme
  }, message);
};

ErrorMessage.propTypes = {
  className: PropTypes__default["default"].string,
  message: PropTypes__default["default"].string.isRequired,
  useDefaultTheme: PropTypes__default["default"].bool
};

const TextfieldStyled = styled__default["default"].div.withConfig({
  displayName: "Textfield__TextfieldStyled",
  componentId: "sc-1a1c03n-0"
})(["", ";"], ({
  isHidden
}) => {
  return styled.css(["display:", ";"], isHidden ? 'none' : 'block');
});

const Textfield = ({
  className,
  formId,
  id,
  label,
  type,
  setValue,
  validateField,
  validations,
  defaultValue,
  defaultLanguage,
  placeholder,
  isHidden,
  errors,
  useDefaultTheme
}) => {
  const [showCharLimit, setShowCharLimit] = React.useState(false);
  const isRequired = validations && validations.required ? true : false;
  const placeholderText = placeholder && placeholder.properties && placeholder.properties.placeholderText && placeholder.properties.placeholderText[defaultLanguage];
  const defaultValueText = defaultValue && defaultValue[defaultLanguage] ? defaultValue[defaultLanguage] : defaultValue;

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

  const _handleBlur = (formId, id, value) => {
    validateField(formId, id, value);
    setShowCharLimit(false);
  };

  const _handleFocus = () => {
    setShowCharLimit(true);
  };

  return /*#__PURE__*/React__default["default"].createElement(TextfieldStyled, {
    className: "textfield-container",
    isHidden: isHidden
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-textfield"
  }), showCharLimit && /*#__PURE__*/React__default["default"].createElement(CharacterLimit, {
    value: defaultValue,
    validations: validations,
    defaultLanguage: defaultLanguage,
    useDefaultTheme: useDefaultTheme
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    className: `${className ? className : ''} input-textfield`,
    type: type,
    defaultValue: defaultValueText,
    placeholder: placeholderText,
    id: id,
    name: id,
    onChange: e => _handleChange(formId, id, e.target.value),
    onBlur: e => _handleBlur(formId, id, e.target.value),
    onFocus: () => _handleFocus()
  }), errors && errors.length > 0 && errors.some(x => x.fieldId == id) && /*#__PURE__*/React__default["default"].createElement(ErrorMessage, {
    message: errors.find(x => x.fieldId == id).message,
    useDefaultTheme: useDefaultTheme
  }));
};

Textfield.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  validateField: PropTypes__default["default"].func,
  validations: PropTypes__default["default"].object,
  defaultValue: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].object]),
  defaultLanguage: PropTypes__default["default"].string,
  placeholder: PropTypes__default["default"].object,
  isHidden: PropTypes__default["default"].bool,
  errors: PropTypes__default["default"].array,
  useDefaultTheme: PropTypes__default["default"].bool
};

const Textarea = ({
  className,
  formId,
  id,
  label,
  type,
  setValue,
  validations,
  defaultValue,
  defaultLanguage,
  placeholder,
  validateField,
  useDefaultTheme,
  errors
}) => {
  const [showCharLimit, setShowCharLimit] = React.useState(false);
  const isRequired = validations && validations.required ? true : false;
  const placeholderText = placeholder && placeholder.properties && placeholder.properties.placeholderText && placeholder.properties.placeholderText[defaultLanguage];
  const defaultValueText = defaultValue ? defaultValue[defaultLanguage] : null;

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

  const _handleBlur = (formId, id, value) => {
    validateField(formId, id, value);
    setShowCharLimit(false);
  };

  const _handleFocus = () => {
    setShowCharLimit(true);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "textarea-container"
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-textarea"
  }), showCharLimit && /*#__PURE__*/React__default["default"].createElement(CharacterLimit, {
    value: defaultValue,
    validations: validations,
    defaultLanguage: defaultLanguage,
    useDefaultTheme: useDefaultTheme
  }), /*#__PURE__*/React__default["default"].createElement("textarea", {
    className: `${className ? className : ''} input-textarea`,
    type: type,
    id: id,
    defaultValue: defaultValueText,
    placeholder: placeholderText,
    onChange: e => _handleChange(formId, id, e.target.value),
    onBlur: e => _handleBlur(formId, id, e.target.value),
    onFocus: () => _handleFocus()
  }), errors && errors.length > 0 && errors.some(x => x.fieldId == id) && /*#__PURE__*/React__default["default"].createElement(ErrorMessage, {
    message: errors.find(x => x.fieldId == id).message,
    useDefaultTheme: useDefaultTheme
  }));
};

Textarea.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  validations: PropTypes__default["default"].object,
  defaultValue: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  placeholder: PropTypes__default["default"].object,
  validateField: PropTypes__default["default"].func,
  useDefaultTheme: PropTypes__default["default"].bool,
  errors: PropTypes__default["default"].array
};

const HiddenField = ({
  className,
  id,
  label,
  type,
  defaultValue,
  defaultLanguage,
  placeholder
}) => {
  return /*#__PURE__*/React__default["default"].createElement(Textfield, {
    type: type,
    label: label,
    id: id,
    defaultValue: defaultValue,
    defaultLanguage: defaultLanguage,
    placeholder: placeholder,
    className: className,
    isHidden: true
  });
};

HiddenField.propTypes = {
  className: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  defaultValue: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  placeholder: PropTypes__default["default"].object
};

const Dropdown = ({
  className,
  formId,
  id,
  validations,
  defaultValue,
  defaultLanguage,
  label,
  setValue
}) => {
  if (!validations) return null;
  const isRequired = validations && validations.required ? true : false;
  const ddValues = validations && validations.allowedValues && validations.allowedValues.values;

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

  if (!ddValues || ddValues.length < 1) return null;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "dropdown-container"
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-dropdown"
  }), /*#__PURE__*/React__default["default"].createElement("select", {
    name: id,
    id: id,
    className: `${className ? className : ''} select-dropdown`,
    defaultValue: defaultValue,
    onBlur: e => _handleChange(formId, id, e.target.value)
  }, ddValues.map((val, idx) => {
    return /*#__PURE__*/React__default["default"].createElement("option", {
      key: `${val[defaultLanguage]}-${idx}`,
      value: val[defaultLanguage],
      className: "option-dropdown"
    }, val[defaultLanguage]);
  })));
};

Dropdown.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  id: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  defaultValue: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  defaultLanguage: PropTypes__default["default"].string
};

const CheckboxStyled = styled__default["default"].div.withConfig({
  displayName: "Checkbox__CheckboxStyled",
  componentId: "s8ewuf-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".checkbox-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
});

const Checkbox = ({
  className,
  formId,
  setCheckboxValue,
  id,
  type,
  label,
  validations,
  defaultValue,
  name,
  defaultLanguage,
  useDefaultTheme
}) => {
  // NF change rules of hooks
  let isDefaultChecked = defaultValue && defaultValue[defaultLanguage];
  const [isChecked, setIsChecked] = React.useState(isDefaultChecked || '');

  switch (type) {
    case 'multiple':
      {
        if (!validations) return null;
        const isRequired = validations && validations.required ? true : false;
        const cbValues = validations && validations.allowedValues && validations.allowedValues.values;

        const _handleChange = (value, isChecked) => {
          setCheckboxValue(formId, id, value, isChecked);
        };

        if (!cbValues || cbValues.length < 1) return null;
        return /*#__PURE__*/React__default["default"].createElement(CheckboxStyled, {
          className: `checkbox-container`,
          useDefaultTheme: useDefaultTheme
        }, /*#__PURE__*/React__default["default"].createElement(Label, {
          id: id,
          label: label,
          isRequired: isRequired,
          className: "label-checkbox-container"
        }), cbValues.map((val, idx) => {
          return /*#__PURE__*/React__default["default"].createElement("span", {
            key: idx,
            className: "checkbox-wrapper"
          }, /*#__PURE__*/React__default["default"].createElement("input", {
            type: "checkbox",
            id: `checkbox-${idx}`,
            name: `checkbox-${idx}`,
            value: val[defaultLanguage],
            className: `${className ? className : ''} input-checkbox`,
            onChange: e => _handleChange(e.target.value, e.target.checked)
          }), /*#__PURE__*/React__default["default"].createElement(Label, {
            id: `checkbox-${idx}`,
            label: val[defaultLanguage],
            className: "label-checkbox"
          }));
        }));
      }

    case 'single':
      {
        const _handleChange = isChecked => {
          setIsChecked(isChecked);
          setCheckboxValue(formId, id, isChecked);
        };

        return /*#__PURE__*/React__default["default"].createElement(CheckboxStyled, {
          className: `checkbox-container`,
          useDefaultTheme: useDefaultTheme
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: "checkbox-wrapper"
        }, /*#__PURE__*/React__default["default"].createElement("input", {
          type: "checkbox",
          id: id,
          name: `checkbox-${id}`,
          value: name[defaultLanguage],
          checked: isChecked,
          className: `${className ? className : ''} input-checkbox`,
          onChange: e => _handleChange(e.target.checked)
        }), /*#__PURE__*/React__default["default"].createElement(Label, {
          id: id,
          label: label,
          className: "label-checkbox"
        })));
      }
  }
};

Checkbox.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  setCheckboxValue: PropTypes__default["default"].func,
  validations: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  name: PropTypes__default["default"].object,
  default: PropTypes__default["default"].object
};

const RadioButtonStyled = styled__default["default"].div.withConfig({
  displayName: "RadioButton__RadioButtonStyled",
  componentId: "sc-7y8c21-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".radio-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
});

const RadioButton = ({
  className,
  formId,
  setValue,
  id,
  type,
  label,
  validations,
  defaultLanguage,
  useDefaultTheme
}) => {
  if (!validations) return null;
  const isRequired = validations && validations.required ? true : false;
  const cbValues = validations && validations.allowedValues && validations.allowedValues.values;

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

  if (!cbValues || cbValues.length < 1) return null;
  return /*#__PURE__*/React__default["default"].createElement(RadioButtonStyled, {
    className: "radio-container",
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-radio-container"
  }), cbValues.map((val, idx) => {
    return /*#__PURE__*/React__default["default"].createElement("span", {
      key: idx,
      className: "radio-wrapper"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: type,
      id: val[defaultLanguage],
      name: id,
      value: val[defaultLanguage],
      className: `${className ? className : ''} input-radio`,
      onChange: e => _handleChange(formId, id, e.target.value)
    }), /*#__PURE__*/React__default["default"].createElement(Label, {
      id: val[defaultLanguage],
      label: val[defaultLanguage],
      className: "label-radio"
    }));
  }));
};

RadioButton.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  id: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool
};

//example date string: 2019-01-02T13:05:00 (expects ISO 8601 Datetime format yyyy-mm-ddThh:mm:ss [this is the format returned from Contensis delivery api])
//yyyy > year long, eg. 2019
//yy > year short, eg. 19
//MMMM > month long, eg. January
//MMM > month short, eg. Jan
//MM > month with leading 0, eg. 01
//M > month, eg. 1
//dddd > day long, eg. Monday
//ddd > day short, eg. Mon
//dd > date with leading 0, eg. 02
//d > date, eg. 2
//HH > 24 hour clock hour parameter with leading 0, eg. ...T03:05:00 = 03
//H > 24 hour clock hour parameter, eg. ...T03:05:00 = 3
//hh > 12 hour clock hour parameter with leading 0, eg. ...T16:05:00 = 04
//h > 12 hour clock hour parameter, eg. ...T16:05:00 = 4
//mm > minutes with leading 0, eg. ...T16:05:00 = 05
//m > minutes, eg ...T16:05:00 = 5
//t > abbreviated AM / PM, e.g. A or P
//tt > AM / PM, e.g. AM or PM
const formatDate = (date, format = 'dd MMMM yyyy') => {
  if (!date) return null;
  const dateObj = new Date(date);
  const dateString = date.toString().split('T');
  const dateArr = dateString[0].split('-');
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  const dayNameInt = dateObj.getDay();
  const timeArr = dateString[1].split(':');
  const hour = timeArr[0];
  const minute = timeArr[1]; //convert to abstract strings to avoid character replacement along the chain, eg. Monday would match 'M' month single parameter

  const YEAR = ['&&', '&'];
  const MONTH = ['££££', '£££', '££', '£'];
  const DAY = ['%%%%', '%%%', '%%', '%'];
  const HOUR24 = ['!!', '!'];
  const HOUR12 = ['^^', '^'];
  const MINUTE = ['**', '*'];
  const TF = ['??', '?'];
  let formattedDate = format.replace('yyyy', YEAR[0]).replace('yy', YEAR[1]).replace('y', '') //'y' && 'yyy' not valid
  .replace('MMMM', MONTH[0]).replace('MMM', MONTH[1]).replace('MM', MONTH[2]).replace('M', MONTH[3]).replace('dddd', DAY[0]).replace('ddd', DAY[1]).replace('dd', DAY[2]).replace('d', DAY[3]).replace('HH', HOUR24[0]).replace('H', HOUR24[1]).replace('hh', HOUR12[0]).replace('h', HOUR12[1]).replace('mm', MINUTE[0]).replace('m', MINUTE[1]).replace('tt', TF[0]).replace('t', TF[1]).replace(YEAR[0], year).replace(YEAR[1], year.slice(-2)).replace(MONTH[0], monthsLong[parseInt(month, 10)]).replace(MONTH[1], monthsShort[parseInt(month, 10)]).replace(MONTH[2], month).replace(MONTH[3], parseInt(month, 10)).replace(DAY[0], daysLong[dayNameInt]).replace(DAY[1], daysShort[dayNameInt]).replace(DAY[2], day).replace(DAY[3], parseInt(day, 10)).replace(HOUR24[0], hour).replace(HOUR24[1], parseInt(hour, 10)).replace(HOUR12[0], parseHour(hour)).replace(HOUR12[1], parseInt(parseHour(hour), 10)).replace(MINUTE[0], minute).replace(MINUTE[1], parseInt(minute, 10)).replace(TF[0], parseTF(hour)).replace(TF[1], parseTF(hour).slice(0, -1));
  return formattedDate;
};

const monthsShort = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthsLong = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const parseHour = hour => {
  return hour > 12 ? hour - 12 : hour;
};

const parseTF = hour => {
  return hour > 11 ? 'PM' : 'AM';
};

const SingleDate = ({
  className,
  type,
  id,
  label,
  validations,
  setValue,
  formId
}) => {
  const isRequired = validations && validations.required ? true : false;
  const onlyPassedDates = validations && validations.pastDateTime;
  const d = new Date();
  const todaysDate = d.toISOString();

  const _handleChange = (formId, id, value) => {
    const d = new Date(value);
    const isoDate = d.toISOString();
    setValue(formId, id, isoDate);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "date-container"
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-date"
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    type: type,
    id: id,
    name: id,
    className: `${className ? className : ''} input-date`,
    max: onlyPassedDates ? formatDate(todaysDate, 'yyyy-MM-dd') : '',
    onChange: e => _handleChange(formId, id, e.target.value)
  }));
};

SingleDate.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  type: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object
};

const DateRangeStyled = styled__default["default"].div.withConfig({
  displayName: "DateRange__DateRangeStyled",
  componentId: "hnzg32-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".daterange-wrapper{display:flex;flex-direction:column;input{&:first-child{margin:0 0 8px 0;}}}"]));
});

const DateRange = ({
  className,
  id,
  label,
  validations,
  setDateRangeValues,
  formId,
  useDefaultTheme
}) => {
  const isRequired = validations && validations.required ? true : false;
  const onlyPassedDates = validations && validations.pastDateTime;
  const d = new Date();
  const todaysDate = d.toISOString();
  const [toDate, setToDate] = React.useState('');
  const [fromDate, setFromDate] = React.useState('');

  const _handleDateChange = (dateType, formId, id, value) => {
    _updateDateProps(dateType, value);

    const d = new Date(value);
    const isoDate = d.toISOString();
    setDateRangeValues(formId, id, dateType, isoDate);
  };

  const _updateDateProps = (type, date) => {
    switch (type) {
      case 'from':
        {
          const d = new Date(date);
          const newDate = d.toISOString();
          setFromDate(newDate);
          break;
        }

      case 'to':
        {
          const d = new Date(date);
          const newDate = d.toISOString();
          setToDate(newDate);
          break;
        }

      default:
        return;
    }
  };

  return /*#__PURE__*/React__default["default"].createElement(DateRangeStyled, {
    className: `daterange-container`,
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "daterange-wrapper"
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: "date-from",
    label: "Date from",
    isHidden: true,
    className: "label-daterange"
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    type: "date",
    id: "date-from",
    name: id,
    max: onlyPassedDates && !toDate ? formatDate(todaysDate, 'yyyy-MM-dd') : onlyPassedDates && toDate ? formatDate(toDate, 'yyyy-MM-dd') : toDate ? formatDate(toDate, 'yyyy-MM-dd') : '',
    className: `${className ? className : ''} input-daterange`,
    onChange: e => _handleDateChange('from', formId, id, e.target.value)
  }), /*#__PURE__*/React__default["default"].createElement(Label, {
    id: "date-to",
    label: "Date to",
    isHidden: true,
    className: "label-daterange"
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    type: "date",
    id: "date-to",
    name: id,
    max: onlyPassedDates ? formatDate(todaysDate, 'yyyy-MM-dd') : '',
    min: formatDate(fromDate, 'yyyy-MM-dd'),
    className: `${className ? className : ''} input-daterange`,
    onChange: e => _handleDateChange('to', formId, id, e.target.value)
  })));
};

DateRange.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setDateRangeValues: PropTypes__default["default"].func,
  type: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  useDefaultTheme: PropTypes__default["default"].bool
};

const EntryPickerStyled = styled__default["default"].div.withConfig({
  displayName: "EntryPicker__EntryPickerStyled",
  componentId: "svnu18-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".radio-wrapper,.checkbox-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
});

const EntryPicker = ({
  className,
  results,
  id,
  label,
  validations,
  type,
  useDefaultTheme,
  setValue,
  formId
}) => {
  if (!results || results.length > 3) return null;
  const isRequired = validations && validations.required ? true : false;
  let valArr = [];

  const _handleChange = (formId, id, value, isChecked) => {
    if (type === 'checkbox') {
      if (isChecked) {
        valArr.push(value);
      } else if (!isChecked) {
        valArr = valArr.filter(valItem => valItem !== value);
      }

      setValue(formId, id, valArr);
    } else {
      setValue(formId, id, value);
    }
  };

  return /*#__PURE__*/React__default["default"].createElement(EntryPickerStyled, {
    className: `${type}-container`,
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: `label-${type}-container`
  }), results.map((res, idx) => {
    return /*#__PURE__*/React__default["default"].createElement("span", {
      key: idx,
      className: `${type}-wrapper`
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: type,
      id: res.entryTitle,
      value: res.entryTitle,
      name: id,
      className: `${className ? className : ''} input-${type}`,
      onChange: e => _handleChange(formId, id, e.target.value, e.target.checked)
    }), /*#__PURE__*/React__default["default"].createElement(Label, {
      id: res.entryTitle,
      label: res.entryTitle,
      className: `label-${type}`
    }));
  }));
};

EntryPicker.propTypes = {
  className: PropTypes__default["default"].string,
  results: PropTypes__default["default"].array,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  type: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool,
  setValue: PropTypes__default["default"].func,
  formId: PropTypes__default["default"].string
};

const FormComposer = ({
  fields,
  formData,
  formId,
  setValue,
  setDateRangeValues,
  validateField,
  defaultLanguage,
  errors,
  useDefaultTheme,
  entries,
  setCheckboxValue
}) => {
  if (!fields || fields.length < 1) return null; //const arrayOfFields = Object.entries(fields).map(f => f[1]);

  return fields.map((field, idx) => {
    if (!field) return null;

    switch (field.type) {
      case 'number':
      case 'textfield':
        {
          return /*#__PURE__*/React__default["default"].createElement(Textfield, {
            key: `${field.id}-${idx}`,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            formId: formId,
            setValue: setValue,
            validations: field.validations,
            validateField: validateField,
            defaultLanguage: defaultLanguage,
            defaultValue: formData && formData[field.id] || field.default,
            placeholder: field.editor,
            errors: errors,
            useDefaultTheme: useDefaultTheme
          });
        }

      case 'textarea':
        {
          return /*#__PURE__*/React__default["default"].createElement(Textarea, {
            key: `${field.id}-${idx}`,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            formId: formId,
            setValue: setValue,
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            defaultValue: field.default,
            placeholder: field.editor,
            validateField: validateField,
            useDefaultTheme: useDefaultTheme,
            errors: errors
          });
        }

      case 'dropdown':
        {
          return /*#__PURE__*/React__default["default"].createElement(Dropdown, {
            key: `${field.id}-${idx}`,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            defaultValue: field.default,
            formId: formId,
            setValue: setValue,
            useDefaultTheme: useDefaultTheme
          });
        }

      case 'checkbox':
        {
          return /*#__PURE__*/React__default["default"].createElement(Checkbox, {
            key: `${field.id}-${idx}`,
            id: field.id,
            name: field.name,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            setValue: setValue,
            formId: formId,
            defaultValue: formData && formData[field.id] || field.default,
            type: field.dataType === 'boolean' ? 'single' : 'multiple',
            useDefaultTheme: useDefaultTheme,
            setCheckboxValue: setCheckboxValue
          });
        }

      case 'radio':
        {
          return /*#__PURE__*/React__default["default"].createElement(RadioButton, {
            key: `${field.id}-${idx}`,
            id: field.id,
            type: field.type,
            formId: formId,
            setValue: setValue,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            useDefaultTheme: useDefaultTheme
          });
        }

      case 'entryPicker':
        {
          const type = field.dataType === 'objectArray' ? 'checkbox' : 'radio';
          const results = entries && entries[field.id] && entries[field.id].items;
          return /*#__PURE__*/React__default["default"].createElement(EntryPicker, {
            key: `${field.id}-${idx}`,
            type: type,
            results: results,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            useDefaultTheme: useDefaultTheme,
            setValue: setValue,
            validateField: validateField,
            formId: formId
          });
        }

      case 'date':
        {
          return /*#__PURE__*/React__default["default"].createElement(SingleDate, {
            key: `${field.id}-${idx}`,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            formId: formId,
            setValue: setValue,
            useDefaultTheme: useDefaultTheme
          });
        }

      case 'dateRange':
        {
          return /*#__PURE__*/React__default["default"].createElement(DateRange, {
            key: `${field.id}-${idx}`,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            formId: formId,
            setDateRangeValues: setDateRangeValues,
            useDefaultTheme: useDefaultTheme
          });
        }

      case 'hidden':
        {
          return /*#__PURE__*/React__default["default"].createElement(HiddenField, {
            key: `${field.id}-${idx}`,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            defaultLanguage: defaultLanguage,
            defaultValue: field.default,
            placeholder: field.editor
          });
        }
    }
  });
};

FormComposer.propTypes = {
  fields: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formData: PropTypes__default["default"].object,
  entries: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  validateField: PropTypes__default["default"].func,
  setDateRangeValues: PropTypes__default["default"].func,
  defaultLanguage: PropTypes__default["default"].string,
  errors: PropTypes__default["default"].array,
  useDefaultTheme: PropTypes__default["default"].bool,
  setCheckboxValue: PropTypes__default["default"].func
};

const ButtonStyled = styled__default["default"].button.withConfig({
  displayName: "Button__ButtonStyled",
  componentId: "hr2oup-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css(["display:inline-block;cursor:pointer;margin:16px 0 0 0;padding:8px 16px;border-radius:3px;border:1px solid ", ";font-family:inherit;transition:opacity 200ms ease;&:hover{opacity:0.7;}"], theme.colors.border));
});

const Button = ({
  className,
  type,
  text,
  action,
  useDefaultTheme
}) => {
  return /*#__PURE__*/React__default["default"].createElement(ButtonStyled, {
    className: `${className ? className : ''} btnSubmit`,
    type: type,
    onClick: () => action(),
    useDefaultTheme: useDefaultTheme
  }, text);
};
Button.propTypes = {
  className: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  text: PropTypes__default["default"].string,
  action: PropTypes__default["default"].func,
  useDefaultTheme: PropTypes__default["default"].bool
};

const ThemeContext = React.createContext();

const ThemeProvider = ({
  children,
  theme
}) => {
  return /*#__PURE__*/React__default["default"].createElement(ThemeContext.Provider, null, /*#__PURE__*/React__default["default"].createElement(styled.ThemeProvider, {
    theme: theme
  }, children));
};

ThemeProvider.propTypes = {
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].arrayOf(PropTypes__default["default"].node), PropTypes__default["default"].node]),
  theme: PropTypes__default["default"].object
};

const mediaQueriesNoUnit = {
  s: 470,
  ms: 640,
  m: 768,
  ml: 880,
  l: 1024,
  xl: 1200,
  xxl: 1366,
  wide: 1600
};
const mediaQueries = {
  small: mediaQueriesNoUnit.s + 'px',
  msmall: mediaQueriesNoUnit.ms + 'px',
  medium: mediaQueriesNoUnit.m + 'px',
  mlarge: mediaQueriesNoUnit.ml + 'px',
  large: mediaQueriesNoUnit.l + 'px',
  xlarge: mediaQueriesNoUnit.xl + 'px',
  xxlarge: mediaQueriesNoUnit.xxl + 'px',
  wide: mediaQueriesNoUnit.wide + 'px'
};
const layout = {
  mediaQueries: mediaQueries
};

const fontFamily = {
  Poppins: `'Poppins', Arial, sans-serif`
}; //use html tag name as object key
//use default object key for base styles
//use media query key that corresponds with keys set on mediaQueries object from ./layout to map to relevant screen sizes
//uses a mobile first approach to rules

const typography = {
  default: {
    color: colors.label,
    font_family: fontFamily.Poppins,
    font_style: 'normal',
    font_weight: 400,
    font_size: '18px',
    line_height: 1.75
  }
};
const defaultStyles = typography.default;
const typographyStyles = {
  defaultStyles
}; // function generateTypeStyles(obj) {
//   return Object.keys(obj)
//     .map(mq => {
//       const props = generateProps(obj[mq]);
//       if (mq === 'default') {
//         return `${props.join(' ')}`;
//       } else {
//         return `@media only screen and (min-width:${
//           mediaQueries[mq]
//         }){${props.join('')}}`;
//       }
//     })
//     .join('');
// }
// function generateProps(objMQ) {
//   let props = [];
//   Object.keys(objMQ).map(prop => {
//     props.push(`${prop.split('_').join('-')}: ${objMQ[prop]};`);
//   });
//   return props;
// }

const defaultTheme = {
  layout,
  typographyStyles,
  typography,
  colors
};

const divStyles = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'Column'
};
const svgStyles = {
  width: '80px',
  height: '80px'
};
const headingStyles = {
  margin: '0',
  fontSize: '16px'
};
const Loading = () => {
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: divStyles
  }, /*#__PURE__*/React__default["default"].createElement("h3", {
    style: headingStyles
  }, "Loading..."), /*#__PURE__*/React__default["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "lds-spinner",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 100 100",
    style: svgStyles
  }, /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.9166666666666666s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(30 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.8333333333333334s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(60 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.75s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(90 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.6666666666666666s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(120 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.5833333333333334s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(150 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.5s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(180 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.4166666666666667s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(210 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.3333333333333333s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(240 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.25s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(270 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.16666666666666666s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(300 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "-0.08333333333333333s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React__default["default"].createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(330 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animate", {
    attributeName: "opacity",
    begin: "0s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  }))));
};
Loading.propTypes = {};

const Form$1 = ({
  className,
  formId,
  fields,
  formData,
  setFormId,
  setValue,
  validateField,
  defaultLanguage,
  errors,
  pagingInfo,
  togglePageForward,
  togglePageBack,
  submitForm,
  status,
  setDateRangeValues,
  useDefaultTheme,
  entries,
  customSubmit,
  setCheckboxValue
}) => {
  React.useEffect(() => {
    setFormId(formId);
  }, [formId, setFormId]); // NF change rule of hooks

  if (!formId) return null;
  let formRender;

  if (pagingInfo && pagingInfo.pageCount > 1) {
    const isLastPage = pagingInfo.pageCount == pagingInfo.pageIndex + 1;
    formRender = /*#__PURE__*/React__default["default"].createElement(FormStyled, {
      className: className,
      id: formId,
      useDefaultTheme: useDefaultTheme
    }, status && status.isLoading || status && status.isSubmitting && /*#__PURE__*/React__default["default"].createElement(Loading, {
      className: "loading"
    }), !status || status && !status.isLoading && !status.isSubmitting && !status.hasSuccess && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, pagingInfo.pageIndex > 0 && /*#__PURE__*/React__default["default"].createElement(Button, {
      type: "button",
      text: "Go Back",
      action: () => togglePageBack(formId, pagingInfo.pageIndex - 1),
      useDefaultTheme: useDefaultTheme
    }), /*#__PURE__*/React__default["default"].createElement(FormComposer, {
      fields: fields,
      formData: formData,
      formId: formId,
      setValue: setValue,
      validateField: validateField,
      defaultLanguage: defaultLanguage,
      errors: errors,
      pagingInfo: pagingInfo,
      useDefaultTheme: useDefaultTheme,
      entries: entries,
      setDateRangeValues: setDateRangeValues,
      setCheckboxValue: setCheckboxValue
    }), !isLastPage && /*#__PURE__*/React__default["default"].createElement(Button, {
      type: "button",
      text: "Next",
      action: () => togglePageForward(formId, pagingInfo.pageIndex + 1),
      useDefaultTheme: useDefaultTheme
    }), isLastPage && /*#__PURE__*/React__default["default"].createElement(Button, {
      text: "Submit",
      type: "button",
      action: () => {
        submitForm(formId);
        if (customSubmit) customSubmit();
      },
      useDefaultTheme: useDefaultTheme
    })), status && status.hasSuccess && status.successMessage && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "success-message"
    }, status.successMessage));
  } else {
    formRender = /*#__PURE__*/React__default["default"].createElement(FormStyled, {
      className: className,
      id: formId,
      useDefaultTheme: useDefaultTheme
    }, status && status.isLoading || status && status.isSubmitting && /*#__PURE__*/React__default["default"].createElement(Loading, {
      className: "loading"
    }), !status || status && !status.isLoading && !status.isSubmitting && !status.hasSuccess && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(FormComposer, {
      fields: fields,
      formId: formId,
      setValue: setValue,
      setDateRangeValues: setDateRangeValues,
      validateField: validateField,
      defaultLanguage: defaultLanguage,
      errors: errors,
      useDefaultTheme: useDefaultTheme,
      entries: entries,
      setCheckboxValue: setCheckboxValue
    }), /*#__PURE__*/React__default["default"].createElement(Button, {
      text: "Submit",
      type: "button",
      action: () => {
        submitForm(formId);
        if (customSubmit) customSubmit();
      },
      useDefaultTheme: useDefaultTheme
    })), status && status.hasSuccess && status.successMessage && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "success-message"
    }, status.successMessage));
  }

  return /*#__PURE__*/React__default["default"].createElement(ThemeProvider, {
    theme: defaultTheme
  }, formRender);
};

Form$1.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  fields: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formData: PropTypes__default["default"].object,
  entries: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  useDefaultTheme: PropTypes__default["default"].bool,
  setFormId: PropTypes__default["default"].func,
  setValue: PropTypes__default["default"].func,
  setDateRangeValues: PropTypes__default["default"].func,
  validateField: PropTypes__default["default"].func,
  defaultLanguage: PropTypes__default["default"].string,
  errors: PropTypes__default["default"].array,
  pagingInfo: PropTypes__default["default"].object,
  togglePageForward: PropTypes__default["default"].func,
  togglePageBack: PropTypes__default["default"].func,
  submitForm: PropTypes__default["default"].func,
  customSubmit: PropTypes__default["default"].func,
  status: PropTypes__default["default"].object,
  setCheckboxValue: PropTypes__default["default"].func
};

function action(type, payload = {}) {
  return {
    type,
    ...payload
  };
}

const submitForm = formId => action(SUBMIT_FORM_FOR_VALIDATION$1, {
  formId
});
const setFormId = formId => action(SET_FORM_ID$1, {
  formId
});
const setValue = (formId, id, value) => action(SET_FIELD_VALUE$1, {
  formId,
  id,
  value
});
const setCheckboxValue = (formId, id, value, isChecked) => action(SET_CHECKBOX_VALUE$1, {
  formId,
  id,
  value,
  isChecked
});
const setDateRangeValues = (formId, id, dateType, value) => action(SET_DATE_RANGE_VALUES$1, {
  formId,
  id,
  dateType,
  value
});
const validateField = (formId, id, value) => action(VALIDATE_FIELD$1, {
  formId,
  id,
  value
});
const togglePageForward = (formId, pageIndex) => action(PAGE_FORWARD$1, {
  formId,
  pageIndex
});
const togglePageBack = (formId, pageIndex) => action(PAGE_BACK$1, {
  formId,
  pageIndex
});

const FormContainer = ({
  className,
  formId,
  fields,
  formData,
  setFormId,
  setValue,
  setDateRangeValues,
  validateField,
  defaultLanguage,
  errors,
  pagingInfo,
  togglePageForward,
  togglePageBack,
  submitForm,
  status,
  useDefaultTheme = true,
  entries,
  setCheckboxValue,
  customSubmit
}) => {
  return /*#__PURE__*/React__default["default"].createElement(Form$1, {
    className: className,
    formId: formId,
    fields: fields,
    setFormId: setFormId,
    setValue: setValue,
    setDateRangeValues: setDateRangeValues,
    validateField: validateField,
    defaultLanguage: defaultLanguage,
    errors: errors,
    pagingInfo: pagingInfo,
    togglePageForward: togglePageForward,
    togglePageBack: togglePageBack,
    submitForm: submitForm,
    status: status,
    useDefaultTheme: useDefaultTheme,
    entries: entries,
    formData: formData,
    setCheckboxValue: setCheckboxValue,
    customSubmit: customSubmit
  });
};

FormContainer.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  fields: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formData: PropTypes__default["default"].object,
  entries: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  setFormId: PropTypes__default["default"].func,
  setDateRangeValues: PropTypes__default["default"].func,
  setValue: PropTypes__default["default"].func,
  useDefaultTheme: PropTypes__default["default"].bool,
  validateField: PropTypes__default["default"].func,
  defaultLanguage: PropTypes__default["default"].string,
  errors: PropTypes__default["default"].array,
  pagingInfo: PropTypes__default["default"].object,
  togglePageForward: PropTypes__default["default"].func,
  togglePageBack: PropTypes__default["default"].func,
  submitForm: PropTypes__default["default"].func,
  status: PropTypes__default["default"].object,
  setCheckboxValue: PropTypes__default["default"].func,
  customSubmit: PropTypes__default["default"].func
};

const mapStateToProps = (state, props) => {
  const {
    formId
  } = props;
  const selectFormFields = selectPagedFields(formId);
  const selectIsLoading = makeSelectIsLoading(formId);
  const selectDefaultLang = makeSelectDefaultLang(formId);
  return state => ({
    fields: selectFormFields(state),
    loading: selectIsLoading(state),
    defaultLanguage: selectDefaultLang(state),
    errors: selectFieldErrors(state, formId),
    pagingInfo: selectPagingInfo(state, formId),
    status: selectFormStatus(state, formId),
    entries: selectEntries(state, formId),
    formData: selectPostData(state, formId)
  });
};

const mapDispatchToProps = dispatch => {
  return {
    setFormId: formId => dispatch(setFormId(formId)),
    setValue: (formId, id, value) => dispatch(setValue(formId, id, value)),
    setCheckboxValue: (formId, id, value, isChecked) => dispatch(setCheckboxValue(formId, id, value, isChecked)),
    setDateRangeValues: (formId, id, dateType, value) => dispatch(setDateRangeValues(formId, id, dateType, value)),
    validateField: (formId, id, value) => dispatch(validateField(formId, id, value)),
    togglePageForward: (formId, pageIndex) => dispatch(togglePageForward(formId, pageIndex)),
    togglePageBack: (formId, pageIndex) => dispatch(togglePageBack(formId, pageIndex)),
    submitForm: formId => dispatch(submitForm(formId))
  };
};

var Form = reactRedux.connect(mapStateToProps, mapDispatchToProps)(FormContainer);

exports["default"] = Form;
exports.reducer = reducer$1;
exports.sagas = formV2Sagas;
//# sourceMappingURL=forms.js.map
