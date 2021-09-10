import { VersionStatus } from 'contensis-core-api';
import { Entry, Node } from 'contensis-delivery-api/lib/models';
import { Group, User } from 'contensis-management-api/lib/models';
import { MatchedRoute } from 'react-router-config';
import { StaticRoute } from '~/routing/routes';

export type AppState = {
  navigation: {
    root: Node | null;
    treeDepends: string[];
    isError: boolean;
    isReady: boolean;
  };
  routing: {
    currentHostname: null;
    contentTypeId: null;
    currentPath: string;
    currentNode: Node & { children: Node[] };
    currentNodeAncestors: Node[];
    currentNodeSiblings: Node[];
    currentProject: string;
    entryID: string | null;
    entry: Entry | null;
    entryDepends: string[];
    error?: Error | any;
    isError: boolean;
    isLoading: boolean;
    location: { pathname: string; search: string; hash: string; key?: string };
    mappedEntry: Record<string, any> | null;
    nodeDepends: string[];
    notFound: boolean;
    staticRoute: MatchedRoute<Record<string, any>, StaticRoute>;
    statusCode: number;
  };
  user: {
    authenticationState: {
      authenticated: boolean;
      authenticationError: boolean;
      authenticationErrorMessage: string | null;
      clientCredentials: {
        bearerToken: string;
        bearerTokenExpiryDate: Date;
        refreshToken: string;
        refreshTokenExpiryDate: Date;
        contensisClassicToken: string;
      } | null;
      error: boolean;
      errorMessage: string | null;
      loading: boolean;
    };
    groups: Group[];
    isZengentiStaff?: boolean;
    registration?: {
      error: Error | null;
      loading: boolean;
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
