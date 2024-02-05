import { Client } from 'contensis-management-api';
import { mapJson } from '~/util/json-mapper';
import { ManagementApiClientCredentials } from '../util/ContensisManagementApi';

const clientCredentials = {
  bearerToken: 'bearerToken',
  bearerTokenExpiryDate: ({ bearerTokenExpiryDate }) =>
    bearerTokenExpiryDate.toISOString(),
  refreshToken: 'refreshToken',
  refreshTokenExpiryDate: ({ refreshTokenExpiryDate }) =>
    refreshTokenExpiryDate.toISOString(),
  contensisClassicToken: 'contensisClassicToken',
};
export default (obj: Client) =>
  mapJson(obj, clientCredentials) as ManagementApiClientCredentials;
