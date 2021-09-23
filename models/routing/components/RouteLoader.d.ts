import React from 'react';
import { setNavigationPath } from '../redux/actions';
import { Entry } from 'contensis-delivery-api/lib/models';
import { AppRootProps, RouteLoaderProps } from '../routes';
interface IReduxProps {
    contentTypeId: string | null;
    entry: Entry | null;
    isError: boolean;
    isNotFound: boolean;
    isLoading: boolean;
    isLoggedIn: boolean;
    mappedEntry: any;
    projectId: string;
    setNavigationPath: typeof setNavigationPath;
    statePath: string;
    statusCode: any;
    statusText: string;
    userGroups: any;
}
declare const _default: import("react-redux").ConnectedComponent<React.ComponentType<AppRootProps & RouteLoaderProps & IReduxProps>, import("react-redux").Omit<AppRootProps & RouteLoaderProps & IReduxProps, "projectId" | "contentTypeId" | "entry" | "mappedEntry" | "isLoggedIn" | "isError" | "isLoading" | "statusCode" | "statusText" | "isNotFound" | "setNavigationPath" | "statePath" | "userGroups"> | import("react-redux").Omit<React.ClassAttributes<React.Component<AppRootProps & RouteLoaderProps & IReduxProps, any, any>> & AppRootProps & RouteLoaderProps & IReduxProps, "projectId" | "contentTypeId" | "entry" | "mappedEntry" | "isLoggedIn" | "isError" | "isLoading" | "statusCode" | "statusText" | "isNotFound" | "setNavigationPath" | "statePath" | "userGroups">>;
export default _default;
