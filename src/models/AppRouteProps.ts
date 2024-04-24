import { ContentTypeMapping } from './ContentTypeMapping';
import { StaticRoute } from './StaticRoute';
import { WithEvents } from './WithEvents';

export type AppRoutes = {
  ContentTypeMappings: ContentTypeMapping[];
  StaticRoutes: StaticRoute[];
};

export type AppRootProps = {
  routes: AppRoutes;
  withEvents: WithEvents;
};
