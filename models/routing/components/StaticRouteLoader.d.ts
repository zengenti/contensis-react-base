import React from 'react';
import type { StaticRoute } from "../../models";
export interface StaticRouteLoaderProps {
    staticRoutes: StaticRoute[];
}
export declare const StaticRouteLoader: ({ staticRoutes }: StaticRouteLoaderProps) => React.JSX.Element;
