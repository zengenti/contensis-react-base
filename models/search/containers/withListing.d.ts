import React from 'react';
import { Mappers } from '../models/Search';
declare const withListing: (mappers: Mappers) => <Props extends Record<keyof Props, any>>(ListingComponent: React.FC<Props>) => import("react-redux").ConnectedComponent<any, import("react-redux").Omit<unknown, never>>;
export default withListing;
