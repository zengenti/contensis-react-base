import React, { PropsWithChildren } from 'react';
import { useHttpContext } from '../httpContext';

export const Status = ({
  code,
  children,
}: PropsWithChildren<{ code: number }>) => {
  const httpContext = useHttpContext();
  if (httpContext) {
    httpContext.statusCode = code;
  }
  return <>{children}</>;
};
