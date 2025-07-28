import React from 'react';

export type RouteLoaderProps = {
  loadingComponent?: React.ComponentType;
  notFoundComponent?: React.ComponentType<{
    statusCode: number;
    statusText: string;
  }>;
  trailingSlashRedirectCode?: 301 | 302;
};
