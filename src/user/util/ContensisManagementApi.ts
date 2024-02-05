export type ManagementApiClientCredentials = {
  bearerToken?: string;
  bearerTokenExpiryDate?: Date;
  refreshToken?: string;
  refreshTokenExpiryDate?: Date;
  contensisClassicToken?: string;
  username?: string;
  password?: string;
};

export const getManagementApiClient = async ({
  bearerToken,
  bearerTokenExpiryDate,
  refreshToken,
  refreshTokenExpiryDate,
  contensisClassicToken,
  username,
  password,
}: ManagementApiClientCredentials) => {
  const rootUrl = SERVERS.api || SERVERS.cms; /* global SERVERS */
  const projectId = PROJECTS[0].id; /* global PROJECTS */

  let config = {};
  if (refreshToken) {
    config = {
      clientType: 'contensis_classic_refresh_token',
      clientDetails: {
        refreshToken,
      },
    };
  } else {
    config = {
      clientType: 'contensis_classic',
      clientDetails: {
        username,
        password,
      },
    };
  }

  let { Client } = await import('contensis-management-api');

  if (typeof window === 'undefined') {
    const { UniversalClient } = await import('contensis-management-api');
    Client = UniversalClient;
  }

  const client = Client.create({
    ...config,
    projectId,
    rootUrl,
  });

  if (bearerToken) client.bearerToken = bearerToken;
  if (bearerTokenExpiryDate)
    client.bearerTokenExpiryDate = bearerTokenExpiryDate;
  if (refreshToken) client.refreshToken = refreshToken;
  if (refreshTokenExpiryDate)
    client.refreshTokenExpiryDate = refreshTokenExpiryDate;
  if (contensisClassicToken)
    (client as any).contensisClassicToken = contensisClassicToken;

  return client;
};
