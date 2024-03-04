/// <reference types="qs" />
import { VersionStatus } from 'contensis-core-api';
import { Client, Query } from 'contensis-delivery-api';
import { Config } from 'contensis-delivery-api/lib/models';
import { CookieObject } from "../user/util/CookieConstants";
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
export declare const getClientConfig: (project?: string, cookies?: CookieObject) => Config;
export declare class DeliveryApi {
    cookies?: CookieObject;
    constructor(cookies?: CookieObject);
    getClientSideVersionStatus: () => any;
    getServerSideVersionStatus: (request: Request) => string | string[] | import("qs").ParsedQs | import("qs").ParsedQs[];
    getVersionStatusFromHeaders: (headers: IncomingHttpHeaders) => string | string[] | null;
    getVersionStatusFromHostname: (currentHostname: string) => "published" | "latest";
    search: (query: Query, linkDepth?: number, project?: string) => Promise<import("contensis-core-api").PagedList<import("contensis-delivery-api").Entry>>;
    getClient: (versionStatus: VersionStatus | undefined, project: any) => Client;
    getEntry: (id: string, linkDepth?: number, versionStatus?: VersionStatus, project?: string) => Promise<import("contensis-delivery-api").Entry>;
}
export declare const deliveryApi: DeliveryApi;
export declare const deliveryApiWithCookies: (cookies?: CookieObject) => DeliveryApi;
export * from './CachedDeliveryApi';
