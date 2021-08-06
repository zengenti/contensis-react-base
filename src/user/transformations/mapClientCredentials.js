import { mapJson } from '~/util/json-mapper';

const clientCredentials = {
  bearerToken: 'bearerToken',
  bearerTokenExpiryDate: ({ bearerTokenExpiryDate }) =>
    bearerTokenExpiryDate.toISOString(),
  refreshToken: 'refreshToken',
  refreshTokenExpiryDate: ({ refreshTokenExpiryDate }) =>
    refreshTokenExpiryDate.toISOString(),
  contensisClassicToken: 'contensisClassicToken',
};
export default obj => mapJson(obj, clientCredentials);
