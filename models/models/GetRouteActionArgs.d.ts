import { useLocation } from 'react-router-dom';
import { AppRoutes } from './AppRouteProps';
import { MatchedRoute } from './MatchedRoute';
import { SSRContext } from './SSRContext';
import { StaticRoute } from './StaticRoute';
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
