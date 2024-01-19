import React from 'react';
import { AppRootProps } from '../routing/routes';
import { RouteLoader } from '../routing';

const AppRoot = (props: AppRootProps) => {
  return <RouteLoader {...props} />;
};

export default AppRoot;
