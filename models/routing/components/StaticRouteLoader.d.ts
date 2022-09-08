/// <reference types="react" />
import type { StaticRoute } from '../routes';
export interface StaticRouteLoaderProps {
    staticRoutes: StaticRoute[];
}
export declare const StaticRouteLoader: ({ staticRoutes }: StaticRouteLoaderProps) => JSX.Element;
