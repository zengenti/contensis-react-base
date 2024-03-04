import { FieldLinkDepths, VersionStatus } from 'contensis-core-api';
import { Query } from 'contensis-delivery-api';
export declare const routeEntryByFieldsQuery: (id: string, language: string | undefined, fields: string[] | undefined, fieldLinkDepths: FieldLinkDepths, versionStatus?: VersionStatus) => Query;
