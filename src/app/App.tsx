import React from 'react';
import { hot } from 'react-hot-loader';
import { RouteLoader } from '../routing';

const AppRoot = props => {
  return <RouteLoader {...props} />;
};

export default hot(module)(AppRoot);
