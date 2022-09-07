import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useHttpContext } from '../httpContext';

export const Redirect = ({
  code,
  to,
}: PropsWithChildren<{ code: 301 | 302; to: string }>) => {
  const httpContext = useHttpContext();
  if (httpContext) {
    httpContext.statusCode = code;
    httpContext.url = to;
  }
  return <Navigate to={to} />;
};
