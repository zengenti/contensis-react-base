import React from 'react';
import { Express } from 'express';
import { ServerConfig } from "../config";
declare const webApp: (app: Express, ReactApp: React.ComponentType<any>, config: ServerConfig & {
    allowedGroups?: string[];
    globalGroups?: string[];
    startupScriptFilename?: string;
}) => void;
export default webApp;
