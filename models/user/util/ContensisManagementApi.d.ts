export function getManagementApiClient({ bearerToken, bearerTokenExpiryDate, refreshToken, refreshTokenExpiryDate, contensisClassicToken, username, password, }: {
    bearerToken: any;
    bearerTokenExpiryDate: any;
    refreshToken: any;
    refreshTokenExpiryDate: any;
    contensisClassicToken: any;
    username: any;
    password: any;
}): Promise<import("contensis-management-api").Client>;
