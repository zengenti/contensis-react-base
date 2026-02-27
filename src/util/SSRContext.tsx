import { Request, Response } from 'express';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { SSRAccessMethod, SSRContext as SSRContextType } from '~/models';
import { cachedSearchWithContext } from '~/util/CachedDeliveryApi';
import { CookieHelper } from '~/user/util/CookieHelper.class';

const SSRContext = createContext<SSRContextType | null>(null);

/**
 * SSRContextProvider allows us to hold and access request-scoped references
 * throughout the component tree
 *
 * adding this in client side allows consumers to write universal code and use
 * the same helpers and request-scoped refs for api, cookies and redux dispatcher
 * as in SSR */
export const SSRContextProvider = ({
  accessMethod,
  children,
  request,
  response,
}: PropsWithChildren<{
  accessMethod?: SSRAccessMethod;
  request?: Request;
  response?: Response;
}>) => {
  // In SSR pass references to things in backing sagas
  // we cannot access in a global scope
  const dispatch = useDispatch();
  const cookies = new CookieHelper(...useCookies());
  const api = cachedSearchWithContext({ cookies, dispatch, request, response });

  const [context] = useState<SSRContextType>({
    accessMethod,
    api,
    cookies,
    dispatch,
    request,
    response,
  });

  return (
    <SSRContext.Provider value={{ ...context }}>{children}</SSRContext.Provider>
  );
};

/**
 * Server side usage provides access to request-scoped references throughout the component tree
 *
 * Client side usage allows consumers to write universal code, using the same
 * helpers and request-scoped refs for api, cookies and redux dispatcher as in SSR
 * @returns SSRContextType
 */
export const useSSRContext = () => useContext(SSRContext) as SSRContextType;

export const useDeliveryApi = () => {
  const { api } = useSSRContext();
  return api;
};
