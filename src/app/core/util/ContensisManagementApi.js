import { Client } from 'contensis-management-api';

export const getManagementAPIClient = ({
  bearerToken,
  bearerTokenExpiryDate,
  refreshToken,
  refreshTokenExpiryDate,
  contensisClassicToken,
}) => {
  const CMS_URL = SERVERS.api; /* global SERVERS */
  const projectId = PROJECTS[0].id; /* global PROJECTS */

  const managementApiClient = Client.create({
    clientType: 'contensis_classic_refresh_token',
    clientDetails: {
      refreshToken,
    },
    projectId: projectId,
    rootUrl: CMS_URL,
  });

  if (bearerToken) managementApiClient.bearerToken = bearerToken;
  if (bearerTokenExpiryDate)
    managementApiClient.bearerTokenExpiryDate = bearerTokenExpiryDate;
  if (refreshToken) managementApiClient.refreshToken = refreshToken;
  if (refreshTokenExpiryDate)
    managementApiClient.refreshTokenExpiryDate = refreshTokenExpiryDate;
  if (contensisClassicToken)
    managementApiClient.contensisClassicToken = contensisClassicToken;

  return managementApiClient;
};
