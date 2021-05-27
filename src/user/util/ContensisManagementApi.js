// import { Client } from 'contensis-management-api';

export const getManagementApiClient = async ({
  bearerToken,
  bearerTokenExpiryDate,
  refreshToken,
  refreshTokenExpiryDate,
  contensisClassicToken,
  username,
  password,
}) => {
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
  const { Client } = await import('contensis-management-api');

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
    client.contensisClassicToken = contensisClassicToken;

  return client;
};
