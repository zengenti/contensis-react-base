import { FieldLinkDepths } from 'contensis-core-api';
import { RouteComponentProps } from 'react-router-dom';
import { RouteComponent } from './RouteComponent';
import { EntryMapper } from './EntryMapper';
import { ReduxInjector } from './ReduxInjector';
import { RequireLogin } from './RequireLogin';
import { RouteConfig } from 'react-router-config';

export type StaticRoute = Omit<RouteConfig, 'component'> & {
  component: RouteComponent<RouteComponentProps>;
  fetchNode?:
    | boolean
    | {
        /**
         * Params[] allows you pass parameters into the site view query on your static node fetch
         * If your route is `/authors/:author` and your params[] array has author
         * `{ params: [ 'author' ] }`, this will grab the route params and replace it with it's value
         * e.g `{` author: 'jane-doe' }`, your path would become `/authors/jane-doe`
         */
        params?: string[];
        linkDepth?: number;
        fieldLinkDepths?: FieldLinkDepths;
        fields?: string[];
        entryMapper?: EntryMapper;
      };
  fetchNodeLevel?: number;
  injectRedux?: ReduxInjector;
  requireLogin?: RequireLogin;
  ssr?: boolean;
  ssrOnly?: boolean;
};
