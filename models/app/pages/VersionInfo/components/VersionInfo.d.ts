import React from 'react';
export interface IVersionInfoProps {
    deliveryApi: {
        rootUrl: string;
        accessToken: string;
        projectId: string;
        livePublishingRootUrl: string;
    };
    devEnv: {
        [k: string]: string;
    };
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
declare const _default: import("react-redux").ConnectedComponent<({ deliveryApi, devEnv, disableSsrRedux, nodeEnv, packageDetail, project, projects, proxyDeliveryApi, publicUri, reverseProxyPaths, servers, uris, version, zenPackageVersions, }: IVersionInfoProps) => React.JSX.Element, {
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("../../../../../node_modules/redux").UnknownAction> | null> | undefined;
    store?: import("../../../../../node_modules/redux").Store<any, import("../../../../../node_modules/redux").UnknownAction, unknown> | undefined;
}>;
export default _default;
