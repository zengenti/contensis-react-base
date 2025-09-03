import React, { useContext, useState, createContext } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { c as cachedSearchWithContext } from './ContensisDeliveryApi-BgfEEyIk.js';
import { C as CookieHelper } from './CookieHelper.class-C6rTRl_1.js';

const SSRContext = /*#__PURE__*/createContext(null);

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
  const dispatch = useDispatch();
  const cookies = new CookieHelper(...useCookies());
  const api = cachedSearchWithContext({
    cookies,
    dispatch,
    request,
    response
  });
  const [context] = useState({
    accessMethod,
    api,
    cookies,
    dispatch,
    request,
    response
  });
  return /*#__PURE__*/React.createElement(SSRContext.Provider, {
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
const useSSRContext = () => useContext(SSRContext);
const useDeliveryApi = () => {
  const {
    api
  } = useSSRContext();
  return api;
};

export { SSRContextProvider as S, useSSRContext as a, useDeliveryApi as u };
//# sourceMappingURL=SSRContext-CXRqYy6B.js.map
