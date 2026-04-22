'use strict';

var React = require('react');
var reactCookie = require('react-cookie');
var reactRedux = require('react-redux');
var ContensisDeliveryApi = require('./ContensisDeliveryApi-MfcvdfDR.js');
var CookieHelper_class = require('./CookieHelper.class-Det3qfdU.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const isSSR = typeof window === 'undefined';
const ensureLeadingSlash = value => value.startsWith('/') ? value : `/${value}`;
const trimTrailingSlash = value => value.length > 1 && value.endsWith('/') ? value.slice(0, -1) : value;
const normalizeSubsitePath = path => {
  const trimmed = `${path || ''}`.trim();
  if (!trimmed || trimmed === '/') return '';
  return trimTrailingSlash(ensureLeadingSlash(trimmed));
};
const addSubsitePath = (path, subsitePath) => {
  if (!path || path === '/') return subsitePath;
  if (path.startsWith(subsitePath)) return path;
  return `${subsitePath}${path.startsWith('/') ? '' : '/'}${path}`;
};
const trimSubsitePath = (path, subsitePath) => {
  if (!path.startsWith(subsitePath)) return path;
  const stripped = path.slice(subsitePath.length);
  return stripped ? stripped : '/';
};

/**
 * Retrieves a subsite path from the request headers in SSR or the global window object in CSR.
 * @param request The SSR request.
 * @returns The normalized subsite path.
 */
const getSubsitePath = request => {
  var _request$headers;
  return isSSR ? normalizeSubsitePath(request === null || request === void 0 || (_request$headers = request.headers) === null || _request$headers === void 0 ? void 0 : _request$headers['subsite_path']) : window.subsitePath;
};
const transformPathForSubsite = (path, request) => {
  const subsitePath = getSubsitePath(request);
  if (!subsitePath) return {
    clientPath: path,
    contentPath: path
  };
  return {
    clientPath: isSSR ? trimSubsitePath(path, subsitePath) : path,
    contentPath: isSSR ? path : addSubsitePath(path, subsitePath),
    subsitePath
  };
};

const SSRContext = /*#__PURE__*/React.createContext(null);

/**
 * SSRContextProvider allows us to hold and access request-scoped references
 * throughout the component tree
 *
 * adding this in client side allows consumers to write universal code and use
 * the same helpers and request-scoped refs for api, cookies and redux dispatcher
 * as in SSR */
const SSRContextProvider = ({
  accessMethod,
  children,
  request,
  response
}) => {
  // In SSR pass references to things in backing sagas
  // we cannot access in a global scope
  const dispatch = reactRedux.useDispatch();
  const cookies = new CookieHelper_class.CookieHelper(...reactCookie.useCookies());
  const api = ContensisDeliveryApi.cachedSearchWithContext({
    cookies,
    dispatch,
    request,
    response
  });
  const subsitePath = getSubsitePath(request);
  const [context] = React.useState({
    accessMethod,
    api,
    cookies,
    dispatch,
    request,
    response,
    subsitePath
  });
  return /*#__PURE__*/React__default.default.createElement(SSRContext.Provider, {
    value: {
      ...context
    }
  }, children);
};

/**
 * Server side usage provides access to request-scoped references throughout the component tree
 *
 * Client side usage allows consumers to write universal code, using the same
 * helpers and request-scoped refs for api, cookies and redux dispatcher as in SSR
 * @returns SSRContextType
 */
const useSSRContext = () => React.useContext(SSRContext);
const useDeliveryApi = () => {
  const {
    api
  } = useSSRContext();
  return api;
};

exports.SSRContextProvider = SSRContextProvider;
exports.getSubsitePath = getSubsitePath;
exports.transformPathForSubsite = transformPathForSubsite;
exports.useDeliveryApi = useDeliveryApi;
exports.useSSRContext = useSSRContext;
//# sourceMappingURL=SSRContext-tMufQDHY.js.map
