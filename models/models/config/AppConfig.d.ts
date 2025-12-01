import { AppRoutes } from '../AppRouteProps';
import { WithEvents } from '../WithEvents';
import { I18nAppConfig } from './I18n';
import { StateType } from './StateType';
export type AppConfig = {
    i18n?: I18nAppConfig;
    /** @deprecated Immutable.js library is deprecated and may be removed in future versions. A plain js (and immutable) state is provided by immer package by default */
    stateType?: StateType;
    routes: AppRoutes;
    withReducers: {
        [key: string]: any;
    };
    withSagas: any[];
    withEvents: WithEvents;
};
