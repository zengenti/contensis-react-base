import { UserManagerSettings } from 'oidc-client';
export declare const userManagerConfig: {
    authority: string;
    client_id: string;
    redirect_uri: string;
    post_logout_redirect_uri: string;
    response_type: string;
    scope: string;
    filterProtocolClaims: boolean;
} | {
    authority?: undefined;
    client_id?: undefined;
    redirect_uri?: undefined;
    post_logout_redirect_uri?: undefined;
    response_type?: undefined;
    scope?: undefined;
    filterProtocolClaims?: undefined;
};
export declare const createUserManager: (config: UserManagerSettings) => Promise<import("oidc-client").UserManager | undefined>;
