import { mapJson } from '~/core/util/json-mapper';

const clientCredentials = {
  bearerToken: 'bearerToken',
  bearerTokenExpiryDate: 'bearerTokenExpiryDate',
  refreshToken: 'refreshToken',
  refreshTokenExpiryDate: 'refreshTokenExpiryDate',
  contensisClassicToken: 'contensisClassicToken',
};
export default obj => mapJson(obj, clientCredentials);
