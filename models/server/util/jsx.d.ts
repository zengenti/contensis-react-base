import { ChunkExtractor } from '@loadable/server';
import { Request, Response } from 'express';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Cookies from 'universal-cookie';
import { AppRoutes, SSRAccessMethod, WithEvents } from "../../models";
import { reduxStore } from "../../redux/store/store";
import { HttpContextValues } from "../../routing/httpContext";
export type SSRJsxProducerProps = {
    /** Providers enrich the JSX */
    providers: {
        loadable: {
            extractor: ChunkExtractor;
        };
        cookies?: Cookies;
        helmet: Record<string, unknown>;
        redux: typeof reduxStore;
        httpContext: HttpContextValues;
        router: {
            url: string;
        };
        styledComponents?: {
            sheet: ServerStyleSheet;
        };
        ssrContext: {
            accessMethod: SSRAccessMethod;
            config: typeof DELIVERY_API_CONFIG;
            request: Request;
            response: Response;
        };
    };
    /** Props are supplied to the ReactApp */
    props: {
        routes: AppRoutes;
        withEvents: WithEvents;
    };
};
/**
 * Produce the JSX wrapped in the necessary Providers
 * to render the app in SSR
 * @param ReactApp the JSX to render
 * @param { providers, props, ssrAssets }
 * @returns the final JSX to render decorated with all Provider and App props
 */
export declare const ssrJsxProducer: (ReactApp: React.ComponentType<any>, { providers, props, }: SSRJsxProducerProps) => React.JSX.Element;
