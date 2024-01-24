import { useLocation } from 'react-router-dom';
import { Entry } from 'contensis-delivery-api/lib/models';
import { AppRoutes, MatchedRoute, StaticRoute, WithEvents } from '../routes';
import { CookieHelper } from "../../user/util/CookieHelper.class";
export declare const setNavigationPath: (path: string, location: ReturnType<typeof useLocation>, staticRoute: MatchedRoute<string, StaticRoute> | undefined, withEvents: WithEvents, statePath: string, routes: AppRoutes, cookies: CookieHelper) => any;
export declare const setCurrentProject: (project: string, allowedGroups: any, hostname: string) => any;
export declare const setRoute: (path: string, state?: any) => any;
export declare const setRouteEntry: (entry: Entry) => any;
export declare const setSurrogateKeys: (keys: string, url: string) => any;
