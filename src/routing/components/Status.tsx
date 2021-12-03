// Todo: Remove below disable once implemented properly.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PropsWithChildren } from 'react';
// import { Route } from 'react-router-dom';

export const Status = ({
  code,
  children,
}: PropsWithChildren<{ code: number }>) => {
  // Todo: Use our custom context to set a status code.
  return null;
  // return (
  //   <Route
  //     render={({ staticContext }) => {
  //       if (staticContext) staticContext.statusCode = code;
  //       return children;
  //     }}
  //   />
  // );
};
