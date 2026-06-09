import { useLocation } from 'react-router-dom';
import { Entry } from 'contensis-delivery-api/lib/models';
import { AppRoutes, MatchedRoute, StaticRoute, SSRContext, WithEvents } from "../../models";
export declare const setNavigationPath: (path: string, contentPath: string, location: ReturnType<typeof useLocation>, staticRoute: MatchedRoute<string, StaticRoute> | undefined, withEvents: WithEvents, statePath: string, routes: AppRoutes, ssr: SSRContext) => any;
export declare const setCurrentProject: (project: string, allowedGroups: any, hostname: string) => any;
export declare const setRoute: (path: string, state?: any) => any;
export declare const setRouteEntry: (entry: Entry) => any;
/**
 * Represents a single API call record stored in Redux state.
 * Used for SSR surrogate key tracking and performance metrics.
 */
export interface ApiMetrics {
    context: 'ssr' | 'client';
    statusCode: number;
    contentLength?: number;
    duration?: number;
    url: string;
    /** Only populated during SSR — meaningless client-side. */
    surrogateKeys?: string[];
}
/**
 * Record API call metrics. Surrogate keys are only included during SSR.
 */
export declare const setApiMetrics: (metrics: ApiMetrics) => any;
