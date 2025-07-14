import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { StaticRoute } from '~/models';

export interface StaticRouteLoaderProps {
  staticRoutes: StaticRoute[];
}

export const StaticRouteLoader = ({ staticRoutes }: StaticRouteLoaderProps) => {
  const staticRouteElement = useRoutes(staticRoutes as RouteObject[]);
  return <>{staticRouteElement}</>;
};
