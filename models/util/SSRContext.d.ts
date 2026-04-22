import { Request, Response } from 'express';
import React, { PropsWithChildren } from 'react';
import { SSRAccessMethod, SSRContext as SSRContextType } from "../models";
/**
 * SSRContextProvider allows us to hold and access request-scoped references
 * throughout the component tree
 *
 * adding this in client side allows consumers to write universal code and use
 * the same helpers and request-scoped refs for api, cookies and redux dispatcher
 * as in SSR */
export declare const SSRContextProvider: ({ accessMethod, children, request, response, }: PropsWithChildren<{
    accessMethod?: SSRAccessMethod;
    request?: Request;
    response?: Response;
}>) => React.JSX.Element;
/**
 * Server side usage provides access to request-scoped references throughout the component tree
 *
 * Client side usage allows consumers to write universal code, using the same
 * helpers and request-scoped refs for api, cookies and redux dispatcher as in SSR
 * @returns SSRContextType
 */
export declare const useSSRContext: () => SSRContextType;
export declare const useDeliveryApi: () => import("./CachedDeliveryApi").CachedSearch;
