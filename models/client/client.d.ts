import 'isomorphic-fetch';
import React from 'react';
import { AppConfig } from "../models";
type ReactAppProps = {
    routes: any;
    withEvents: any;
};
declare class ClientApp {
    constructor(ReactApp: React.ComponentType<ReactAppProps>, config: AppConfig);
}
export default ClientApp;
