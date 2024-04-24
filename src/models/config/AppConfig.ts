import { AppRoutes } from '../AppRouteProps';
import { WithEvents } from '../WithEvents';
import { StateType } from './StateType';

export type AppConfig = {
  stateType?: StateType;
  routes: AppRoutes;
  withReducers: { [key: string]: any };
  withSagas: any[];
  withEvents: WithEvents;
};
