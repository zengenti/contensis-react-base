import React, { PropsWithChildren } from 'react';
import { Route } from 'react-router-dom';

export const Status = ({
  code,
  children,
}: PropsWithChildren<{ code: number }>) => {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.statusCode = code;
        return children;
      }}
    />
  );
};
