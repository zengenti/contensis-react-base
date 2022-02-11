import React from 'react';
import { Mappers } from '../models/Search';
declare const withSearch: (mappers: Mappers) => <Props extends Record<string, any>>(SearchComponent: React.ComponentType<Props>) => import("react-redux").ConnectedComponent<any, import("react-redux").Omit<unknown, never>>;
export default withSearch;
