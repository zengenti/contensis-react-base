import React from 'react';
import { Mappers } from '../models/Search';
declare const withListing: (mappers: Mappers) => <Props extends Record<string, any>>(ListingComponent: React.FC<Props>) => import("react-redux").ConnectedComponent<any, {
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("../../../node_modules/redux").UnknownAction> | null> | undefined;
    store?: import("../../../node_modules/redux").Store | undefined;
}>;
export default withListing;
