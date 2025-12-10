'use strict';

var React = require('react');
var reactCookie = require('react-cookie');
var reactRedux = require('react-redux');
var ContensisDeliveryApi = require('./ContensisDeliveryApi-DBaziPG9.js');
var CookieHelper_class = require('./CookieHelper.class-Det3qfdU.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

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
  const [context] = React.useState({
    accessMethod,
    api,
    cookies,
    dispatch,
    request,
    response
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
exports.useDeliveryApi = useDeliveryApi;
exports.useSSRContext = useSSRContext;
//# sourceMappingURL=SSRContext-Cayonmg4.js.map
