/// <reference types="react" />
export interface IVersionInfoProps {
    deliveryApi: {
        rootUrl: string;
        accessToken: string;
        projectId: string;
        livePublishingRootUrl: string;
    };
    devEnv: any;
    disableSsrRedux: boolean;
    nodeEnv: string;
    packageDetail: any;
    project: string;
    projects: any;
    proxyDeliveryApi: any;
    publicUri: string;
    reverseProxyPaths: string[];
    servers: {
        alias: string;
        api: string;
        cms: string;
        web: string;
        iis: string;
        previewIis: string;
        previewWeb: string;
    };
    uris: {
        gitRepo: string;
        commit: string;
        pipeline: string;
    };
    version: {
        buildNumber: string;
        commitRef: string;
        contensisVersionStatus: string;
    };
    zenPackageVersions: string[];
}
declare const _default: import("react-redux").ConnectedComponent<({ deliveryApi, devEnv, disableSsrRedux, nodeEnv, packageDetail, project, projects, proxyDeliveryApi, publicUri, reverseProxyPaths, servers, uris, version, zenPackageVersions, }: IVersionInfoProps) => JSX.Element, import("react-redux").Omit<IVersionInfoProps, "version" | "disableSsrRedux" | "reverseProxyPaths" | "proxyDeliveryApi" | "packageDetail" | "uris" | "zenPackageVersions" | "deliveryApi" | "devEnv" | "nodeEnv" | "projects" | "publicUri" | "project" | "servers">>;
export default _default;
