import { Response } from 'express';
export declare const addStandardHeaders: (state: any, response: Response, packagejson: any, groups: {
    globalGroups?: any[];
    allowedGroups?: any[];
}) => void;
export declare const addVarnishAuthenticationHeaders: (state: any, response: Response, groups?: {
    globalGroups?: any[];
    allowedGroups?: any[];
}) => void;
