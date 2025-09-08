'use strict';

var VersionInfo = require('./VersionInfo-D0mF1vkY.js');
var ContensisDeliveryApi = require('./ContensisDeliveryApi-CvT9MxKb.js');
var SSRContext = require('./SSRContext-Nqc9Re-h.js');
var React = require('react');
var mapJson = require('jsonpath-mapper');
var reactRouterDom = require('react-router-dom');
require('./_commonjsHelpers-BJu3ubxk.js');
require('react-redux');
require('./selectors-Bp_TrwG5.js');
require('immer');
require('reselect');
require('query-string');
require('./version-BolvQdgT.js');
require('styled-components');
require('contensis-delivery-api');
require('./store-Bm0URUih.js');
require('redux');
require('redux-thunk');
require('redux-saga');
require('redux-injectors-19');
require('./CookieConstants-DfPiWCRZ.js');
require('react-cookie');
require('./CookieHelper.class-Det3qfdU.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var mapJson__default = /*#__PURE__*/_interopDefault(mapJson);

/**
 *
 * @param {object} json The source object we wish to transform
 * @param {object} template The mapping template we wish to apply to the source
 * object to generate the intended target object
 */
const useMapper = (json, template) => {
  return template ? mapJson__default.default(json || {}, template) : json;
};
const chooseMapperByFieldValue = (entry, mappers, field = 'sys.contentTypeId') => {
  const fieldValue = mapJson.jpath(field, entry || {});
  return mappers[fieldValue] || mappers.default || {};
};

/**
 * useEntriesMapper hook to take a list of entries from Delivery API along
 * with mappers for each contentTypeId and return an array of mapped objects
 * @param {any} entry The source entry we wish to transform
 * @param {object} mappers Object with keys containing mapper templates,
 * the key name matching sys.contentTypeId
 * @param {string} field Only include if we need to match content based on
 * a field other than sys.contentTypeId in the source data
 * @returns {object} Object transformed using a matched content type or
 * a default mapper template, returns an empty object if no mapper template
 * couild be applied.
 */
const useEntriesMapper = (entry, mappers, field = 'sys.contentTypeId') => {
  const mapper = chooseMapperByFieldValue(entry, mappers, field);
  return useMapper(entry, mapper);
};

/**
 * Deprecated: due to misleading name, use the hook useEntriesMapper instead
 */
const useEntryMapper = useEntriesMapper;

/**
 * mapEntries mapping function to take a list of entries from Delivery API along
 * with mappers for each contentTypeId and return an array of mapped objects
 * @param {any} entry The source entry we wish to transform
 * @param {object} mappers Object with keys containing mapper templates,
 * the key name matching sys.contentTypeId
 * @param {string} field Only include if we need to match content based on
 * a field other than sys.contentTypeId in the source data
 * @returns {object} Object transformed using a matched content type or
 * a default mapper template, returns an empty object if no mapper template
 * couild be applied.
 */
const mapEntries = (entries, mappers, field = 'sys.contentTypeId') => entries.map(entry => {
  const mapper = chooseMapperByFieldValue(entry, mappers, field);
  return mapper ? mapJson__default.default(entry || {}, mapper) : entry;
});

/**
 * mapComposer mapping function to take a composer field from Delivery API along
 * with mappers for each Composer Item "type" and return an array of mapped components
 * @param {array} composer Composer field array of Composer Items
 * @param {object} mappers A keyed object with each key matching the Composer Item "type"
 * @returns {array} Array of mapped objects transformed using a matched Composer Item "type" mapping
 * or null. Injects a "_type" property into each transformed object in the array to indicate
 * where the mapping originated and for what component the mapped object is representing
 */
const mapComposer = (composer, mappers) => Array.isArray(composer) ? composer.map((composerItem, index) => {
  const itemValue = composerItem.value;
  const mapper = mappers[composerItem.type] || mappers.default;
  if (mapper) {
    // Add some fields into the composer item mapper and return object
    const addedFields = {
      _type: composerItem.type,
      _index: index
    };

    // Add fields and $root item into the composer item source object
    // for use inside each item mapping, for arrays we inject the added fields
    // into the first array item. This is useful if we require any of
    // composerItem.type, composerItem index/position and composer $root
    // in scope to influence any composer item's mapping logic
    const sourceObject = itemValue && Array.isArray(itemValue) ? itemValue.map((iv, idx) => idx !== 0 ? iv : typeof iv === 'object' ? {
      ...addedFields,
      ...iv,
      $root: composer
    } : iv) : typeof itemValue === 'object' ? {
      ...addedFields,
      ...itemValue,
      $root: composer
    } : itemValue || {};

    // Apply the composer item mapping
    const mappedFields = mapJson__default.default(sourceObject, mapper);

    // Add the extra fields in with the return object
    return mappedFields && typeof mappedFields === 'object' ? {
      ...mappedFields,
      ...addedFields
    } : mappedFields;
  } else return {};
}) : composer || [];

/**
 * useComposerMapper hook to take a composer field from Delivery API along
 * with mappers for each Composer Item "type" and return an array of mapped components
 * @param {array} composer Composer field array of Composer Items
 * @param {object} mappers A keyed object with each key matching the Composer Item "type"
 * @returns {array} Array of mapped objects transformed using a matched Composer Item "type" mapping
 * or null. Injects a "_type" property into each transformed object in the array to indicate
 * where the mapping originated and for what component the mapped object is representing
 */
const useComposerMapper = (composer = [], mappers) => mapComposer(composer, mappers);

/**
 * entryMapper will return a function to satisfy an entryMapper when defining app route
 * this is essentially a shorthand function to prevent boilerplate repetition inside your routes file
 * you do not need to use this function should you wish to map your entry via raw JS functions
 * @param mapping the jsonpath-mapper mapping template to apply when the route is resolved
 * @returns {mappedEntry}
 */
const entryMapper = mapping => (node, state) => mapJson__default.default({
  ...node,
  ...(node.entry || {}),
  state
}, mapping);

// hooks/useIsClient.ts
/**
 * A hook that returns true only when the component has mounted in the browser client
 * Used to prevent SSR render and defer rendering to client-side to safely refernce
 * browser-only apis or avoid React Hydration errors
 */
const useIsClient = () => {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => setIsClient(true), []);
  return isClient;
};

/**
 * NoSSR component to prevent children from rendering on the server.
 * Renders children only after component has mounted in the browser.
 */
const NoSSR = ({
  children
}) => {
  const isClient = useIsClient();
  if (!isClient) return null;
  return /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, children);
};

/** @deprecated ponyfill for useHistory hook in react-router v5 removed in v6 */
const useHistory = () => {
  const navigate = reactRouterDom.useNavigate();
  const location = reactRouterDom.useLocation();
  return {
    push: navigate,
    replace: navigate,
    location
  };
};

exports.VersionInfo = VersionInfo.VersionInfo;
exports.setCachingHeaders = VersionInfo.setCachingHeaders;
exports.stringifyStrings = VersionInfo.stringifyStrings;
exports.urls = VersionInfo.url;
exports.cachedSearch = ContensisDeliveryApi.cachedSearch;
exports.cachedSearchWithContext = ContensisDeliveryApi.cachedSearchWithContext;
exports.cachedSearchWithCookies = ContensisDeliveryApi.cachedSearchWithCookies;
exports.deliveryApi = ContensisDeliveryApi.deliveryApi;
exports.deliveryApiWithCookies = ContensisDeliveryApi.deliveryApiWithCookies;
exports.getClientConfig = ContensisDeliveryApi.getClientConfig;
exports.SSRContextProvider = SSRContext.SSRContextProvider;
exports.useDeliveryApi = SSRContext.useDeliveryApi;
exports.useSSRContext = SSRContext.useSSRContext;
Object.defineProperty(exports, "jpath", {
  enumerable: true,
  get: function () { return mapJson.jpath; }
});
Object.defineProperty(exports, "mapJson", {
  enumerable: true,
  get: function () { return mapJson__default.default; }
});
exports.NoSSR = NoSSR;
exports.entryMapper = entryMapper;
exports.mapComposer = mapComposer;
exports.mapEntries = mapEntries;
exports.useComposerMapper = useComposerMapper;
exports.useEntriesMapper = useEntriesMapper;
exports.useEntryMapper = useEntryMapper;
exports.useHistory = useHistory;
exports.useIsClient = useIsClient;
exports.useMapper = useMapper;
//# sourceMappingURL=util.js.map
