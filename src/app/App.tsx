import React from 'react';
import { RouteLoader } from '../routing';
import { AppRootProps } from '~/models';

const AppRoot = (props: AppRootProps) => {
  return <RouteLoader {...props} />;
};

export default AppRoot;
