import { FieldLinkDepths } from 'contensis-core-api';
import { EntryMapper } from './EntryMapper';
import { ReduxInjector } from './ReduxInjector';
import { RouteComponent } from './RouteComponent';
import { RouteComponentProps } from './RouteComponentProps';
import { RequireLogin } from './RequireLogin';
export type ContentTypeMapping = {
    contentTypeID: string;
    component: RouteComponent<RouteComponentProps>;
    entryMapper?: EntryMapper;
    fields?: string[];
    injectRedux?: ReduxInjector;
    linkDepth?: number;
    fieldLinkDepths?: FieldLinkDepths;
    nodeOptions?: {
        children?: {
            depth: number;
            fields?: string[];
            linkDepth?: number;
            fieldLinkDepths?: FieldLinkDepths;
        } | boolean;
        siblings?: {
            fields?: string[];
            linkDepth?: number;
            fieldLinkDepths?: FieldLinkDepths;
        } | boolean;
    };
    requireLogin?: RequireLogin;
};
