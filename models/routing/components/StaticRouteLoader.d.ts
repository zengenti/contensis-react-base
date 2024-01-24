import React from 'react';
import type { StaticRoute } from '../routes';
export interface StaticRouteLoaderProps {
    staticRoutes: StaticRoute[];
}
export declare const StaticRouteLoader: ({ staticRoutes }: StaticRouteLoaderProps) => React.JSX.Element;
