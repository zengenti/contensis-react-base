import { createContext, useContext } from 'react';

export type HttpContextValues = {
  statusCode?: number;
  url?: string;
};

export const HttpContext = createContext<HttpContextValues>({});
export const useHttpContext = () => {
  return useContext(HttpContext);
};
