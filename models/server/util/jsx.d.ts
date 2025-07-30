import { ChunkExtractor } from '@loadable/server';
import { Request, Response } from 'express';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Cookies from 'universal-cookie';
import { AppRoutes, SSRAccessMethod, WithEvents } from "../../models";
import { reduxStore } from "../../redux/store/store";
import { HttpContextValues } from "../../routing/httpContext";
/**
 * Produce the JSX wrapped in the necessary Providers
 * to render the app in SSR
 * @param ReactApp the JSX to render
 * @param { providers, props, ssrAssets }
 * @returns the final JSX to render decorated with all Provider and App props
 */
export declare const ssrJsxProducer: (ReactApp: React.ComponentType<any>, { providers, props, ssrAssets, }: {
    /** Providers enrich the JSX */
    providers: {
        loadable: {
            extractor: ChunkExtractor;
        };
        cookies?: Cookies;
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
            request: Request;
            response: Response;
        };
    };
    /** Props are supplied to the ReactApp */
    props: {
        routes: AppRoutes;
        withEvents: WithEvents;
    };
    /**
     * SSR Assets are passed in here when they become available
     * allowing the ReactApp to control the render for the
     * entire HTML document
     */
    ssrAssets?: {
        bundleTags?: string;
        htmlAttributes?: string;
        metadata?: string;
        serializedState?: string;
        styleTags?: string;
        title?: string;
    };
}) => React.JSX.Element;
