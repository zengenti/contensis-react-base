import { useLocation } from 'react-router-dom';
import { Entry } from 'contensis-delivery-api/lib/models';
import { MatchedRoute, RouteConfig } from 'react-router-config';
import { AppRoutes, SSRContext, WithEvents } from "../../models";
export declare const setNavigationPath: (path: string, location: ReturnType<typeof useLocation>, staticRoute: MatchedRoute<any, RouteConfig> | undefined, withEvents: WithEvents, statePath: string, routes: AppRoutes, ssr: SSRContext) => any;
export declare const setCurrentProject: (project: string, allowedGroups: any, hostname: string) => any;
export declare const setRoute: (path: string, state?: any) => any;
export declare const setRouteEntry: (entry: Entry) => any;
export declare const setSurrogateKeys: (keys: string, url: string, status: number) => any;
