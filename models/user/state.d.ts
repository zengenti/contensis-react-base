import { Group, User } from 'contensis-management-api/lib/models';
import { ManagementApiClientCredentials } from './util/ContensisManagementApi';
export type AuthenticationState = {
    clientCredentials: ManagementApiClientCredentials | null;
    isAuthenticated: boolean;
    isAuthenticationError: boolean;
    isError: boolean;
    errorMessage?: string | null;
};
export type UserWithGroups = User & {
    groups: Group[];
};
