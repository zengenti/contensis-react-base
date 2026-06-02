import type { UserManagerSettings } from 'oidc-client';
export declare const userManagerConfig: UserManagerSettings;
export declare const createUserManager: (config: UserManagerSettings) => Promise<import("oidc-client").UserManager | undefined>;
