/// <reference types="react" />
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
declare const _default: import("react-redux").ConnectedComponent<({ contentTypeId, entry, isError, isLoading, isLoggedIn, isNotFound, loadingComponent, mappedEntry, notFoundComponent, projectId, routes, setNavigationPath, statePath, statusCode, statusText, userGroups, withEvents, }: AppRootProps & RouteLoaderProps & IReduxProps) => JSX.Element | null, import("react-redux").Omit<AppRootProps & RouteLoaderProps & IReduxProps, "isError" | "contentTypeId" | "entry" | "isLoading" | "mappedEntry" | "statusCode" | "projectId" | "statusText" | "isLoggedIn" | "isNotFound" | "setNavigationPath" | "statePath" | "userGroups">>;
export default _default;
