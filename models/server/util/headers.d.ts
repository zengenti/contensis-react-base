import { Response } from 'express';
import { AppState } from '~/redux/appstate';
export declare const addStandardHeaders: (state: AppState, response: Response, packagejson: any, groups: {
    globalGroups?: any[];
    allowedGroups?: any[];
}) => void;
export declare const addVarnishAuthenticationHeaders: (state: AppState, response: Response, groups?: {
    globalGroups?: any[];
    allowedGroups?: any[];
}) => void;
