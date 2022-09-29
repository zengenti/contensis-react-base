import { VersionStatus } from 'contensis-core-api';
import { Entry, Node } from 'contensis-delivery-api/lib/models';
import { Group, User } from 'contensis-management-api/lib/models';
import { MatchedRoute } from 'react-router-config';
import { StaticRoute } from "../routing/routes";
export declare type AppState = {
    navigation: {
        root: Node | null;
        isError: boolean;
        isReady: boolean;
    };
    routing: {
        currentHostname: null;
        currentPath: string;
        currentNode: Node & {
            children: Node[];
        };
        currentNodeAncestors: Node[];
        currentNodeSiblings: Node[];
        currentProject: string;
        entryID: string | null;
        entry: Entry | null;
        error?: Error | any;
        isError: boolean;
        isLoading: boolean;
        location: {
            pathname: string;
            search: string;
            hash: string;
            key?: string;
        };
        mappedEntry: Record<string, any> | null;
        notFound: boolean;
        staticRoute: MatchedRoute<Record<string, any>, StaticRoute>;
        statusCode: number;
    };
    user: {
        authenticationState: {
            clientCredentials: {
                bearerToken: string;
                bearerTokenExpiryDate: Date;
                refreshToken: string;
                refreshTokenExpiryDate: Date;
                contensisClassicToken: string;
            } | null;
            errorMessage: string | null;
            isAuthenticated: boolean;
            isAuthenticationError: boolean;
            isError: boolean;
            isLoading: boolean;
        };
        groups: Group[];
        isZengentiStaff?: boolean;
        registration?: {
            error: Error | null;
            isLoading: boolean;
            success: boolean;
        };
        passwordResetRequest?: {
            isSending: boolean;
            sent: boolean;
            error: Error | null;
        };
        resetPassword?: {
            isSending: boolean;
            sent: boolean;
            error: Error | null;
        };
        changePassword?: {
            isSending: boolean;
            sent: boolean;
            error: Error | null;
        };
    } & User;
    version: {
        commitRef: string | null;
        buildNo: string | null;
        contensisVersionStatus: VersionStatus;
    };
};
