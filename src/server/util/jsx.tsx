import {
  ChunkExtractor,
  ChunkExtractorManager,
  ChunkExtractorManagerProps,
} from '@loadable/server';
import { Request, Response } from 'express';
import React, { ClassType, Component, ComponentClass } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Cookies from 'universal-cookie';
import { AppRoutes, ServerConfig, SSRAccessMethod, WithEvents } from '~/models';
import { reduxStore } from '~/redux/store/store';
import { HttpContext, HttpContextValues } from '~/routing/httpContext';
import { SSRContextProvider } from '~/util';

/**
 * Produce the JSX wrapped in the necessary Providers
 * to render the app in SSR
 * @param ReactApp the JSX to render
 * @param { providers, props, ssrAssets }
 * @returns the final JSX to render decorated with all Provider and App props
 */
export const ssrJsxProducer = (
  ReactApp: React.ComponentType<any>,
  {
    providers,
    props,
    // ssrAssets,
  }: {
    /** Providers enrich the JSX */
    providers: {
      loadable: { extractor: ChunkExtractor };
      cookies?: Cookies;
      redux: typeof reduxStore;
      httpContext: HttpContextValues;
      router: {
        url: string;
      };
      styledComponents?: { sheet: ServerStyleSheet };
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
    // /**
    //  * SSR Assets are passed in here when they become available
    //  * allowing the ReactApp to control the render for the
    //  * entire HTML document
    //  */
    // ssrAssets?: {
    //   bundleTags?: string;
    //   htmlAttributes?: string;
    //   metadata?: string;
    //   serializedState?: string;
    //   styleTags?: string;
    //   title?: string;
    // };
  }
) => {
  type ChunkExtractorManagerPropsForReact18 = ChunkExtractorManagerProps & {
    children?: React.ReactNode;
  };
  // Recast ChunkExtractorManager to avoid TS error `Property 'children' does not exist on type...`
  const ChunkExtractor = ChunkExtractorManager as ClassType<
    ChunkExtractorManagerPropsForReact18,
    Component<ChunkExtractorManagerPropsForReact18>,
    ComponentClass<ChunkExtractorManagerPropsForReact18>
  >;

  const jsx = (
    <ChunkExtractor extractor={providers.loadable.extractor}>
      <CookiesProvider cookies={providers.cookies}>
        <ReduxProvider store={providers.redux}>
          <HttpContext.Provider value={providers.httpContext}>
            <StaticRouter
              location={providers.router.url}
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <SSRContextProvider
                accessMethod={providers.ssrContext.accessMethod}
                request={providers.ssrContext.request}
                response={providers.ssrContext.response}
                // ssrAssets={ssrAssets}
              >
                <ReactApp routes={props.routes} withEvents={props.withEvents} />
              </SSRContextProvider>
            </StaticRouter>
          </HttpContext.Provider>
        </ReduxProvider>
      </CookiesProvider>
    </ChunkExtractor>
  );

  // Wrap the JSX in a StyleSheetManager if a ServerStyleSheet is provided
  return !providers.styledComponents?.sheet
    ? jsx
    : providers.styledComponents.sheet.collectStyles(jsx);
};
