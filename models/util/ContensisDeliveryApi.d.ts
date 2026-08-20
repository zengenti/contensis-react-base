import { VersionStatus } from 'contensis-core-api';
import { Client, Config, Query } from 'contensis-delivery-api';
import { CookieObject } from "../user/util/CookieConstants";
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { SSRContext as SSRContextType } from "../models";
export type SSRContext = Omit<SSRContextType, 'api'>;
export declare const getClientConfig: (project?: string, ssr?: SSRContext) => Config;
export declare class DeliveryApi {
    cookies?: CookieObject;
    ssr?: SSRContext;
    constructor(ssr?: SSRContext);
    getClientSideVersionStatus: () => string | (string | null)[] | null;
    getServerSideVersionStatus: (request: Request) => VersionStatus;
    getVersionStatusFromHeaders: (headers: IncomingHttpHeaders) => string | string[] | null;
    getVersionStatusFromHostname: (currentHostname: string) => "published" | "latest";
    normalizeVersionStatus: (versionStatus: VersionStatus | undefined) => VersionStatus;
    search: (query: Query, linkDepth?: number, project?: string) => Promise<import("contensis-core-api").PagedSearchList<import("contensis-delivery-api").Entry>>;
    getClient: (versionStatus?: VersionStatus, project?: string) => Client;
    getEntry: (id: string, linkDepth?: number, versionStatus?: VersionStatus, project?: string) => Promise<import("contensis-delivery-api").Entry>;
}
export declare const deliveryApi: DeliveryApi;
export declare const deliveryApiWithCookies: (ssr?: SSRContext) => DeliveryApi;
export * from './CachedDeliveryApi';
