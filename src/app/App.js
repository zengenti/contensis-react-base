import React from 'react';
import { hot } from 'react-hot-loader';
import RouteLoader from '~/core/routes/RouteLoader';

const AppRoot = () => {
  return <RouteLoader />;
};

export default hot(module)(AppRoot);
