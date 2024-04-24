import React from 'react';

export type RouteLoaderProps = {
  loadingComponent?: React.ComponentType;
  notFoundComponent?: React.ComponentType;
  trailingSlashRedirectCode?: 301 | 302;
};
