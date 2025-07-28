export type ManagementApiClientCredentials = {
    bearerToken?: string;
    bearerTokenExpiryDate?: Date;
    refreshToken?: string;
    refreshTokenExpiryDate?: Date;
    contensisClassicToken?: string;
    username?: string;
    password?: string;
};
export declare const getManagementApiClient: ({ bearerToken, bearerTokenExpiryDate, refreshToken, refreshTokenExpiryDate, contensisClassicToken, username, password, }: ManagementApiClientCredentials) => Promise<import("contensis-management-api").Client>;
