import { useLocation } from 'react-router-dom';
import { MatchedRoute } from 'react-router-config';
import { SSRContext } from './SSRContext';
import { StaticRoute } from './StaticRoute';
import { AppRoutes } from './AppRouteProps';
import { WithEvents } from './WithEvents';
export type GetRouteActionArgs = {
    location: ReturnType<typeof useLocation>;
    path: string;
    routes: AppRoutes;
    ssr: SSRContext;
    staticRoute?: MatchedRoute<any, StaticRoute>;
    statePath: string;
    withEvents: WithEvents;
};
