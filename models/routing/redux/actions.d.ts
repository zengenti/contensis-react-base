import { useLocation } from 'react-router-dom';
import { Entry } from 'contensis-delivery-api/lib/models';
import { AppRoutes, MatchedRoute, StaticRoute, SSRContext, WithEvents } from "../../models";
export declare const setNavigationPath: (path: string, contentPath: string, location: ReturnType<typeof useLocation>, staticRoute: MatchedRoute<string, StaticRoute> | undefined, withEvents: WithEvents, statePath: string, routes: AppRoutes, ssr: SSRContext) => any;
export declare const setCurrentProject: (project: string, allowedGroups: any, hostname: string) => any;
export declare const setRoute: (path: string, state?: any) => any;
export declare const setRouteEntry: (entry: Entry) => any;
export declare const setSurrogateKeys: (keys: string, url: string, status: number) => any;
