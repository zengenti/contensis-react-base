import { Request, Response } from 'express';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { SSRContext as SSRContextType } from '~/models';
import { cachedSearchWithCookies } from '~/util/CachedDeliveryApi';
import { CookieHelper } from '~/user/util/CookieHelper.class';

const SSRContext = createContext<SSRContextType | null>(null);

/** SSRContextProvider allows us to hold and access request-scoped references
 *  throughout the component tree
 *
 *  adding this in client side allows consumers to write universal code and use
 *  the same helpers and refs as in SSR */
export const SSRContextProvider = ({
  children,
  request,
  response,
}: PropsWithChildren<{ request?: Request; response?: Response }>) => {
  // In SSR pass references to things in backing sagas
  // we cannot access in a global scope
  const dispatch = useDispatch();
  const cookies = new CookieHelper(...useCookies());
  const api = cachedSearchWithCookies({ cookies, dispatch, request, response });

  const [context] = useState<SSRContextType>({
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

export const useSSRContext = () => useContext(SSRContext) as SSRContextType;

export const useDeliveryApi = () => {
  const { api } = useSSRContext();
  return api;
};
