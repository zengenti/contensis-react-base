import { api } from '../helpers';
const config = CONTENSIS; /* global CONTENSIS */

const REGISTER_USER_URL = `${config.URL}/${config.REGISTER_USER_URI}`;
const LOGON_USER_URL = `${config.URL}/${config.LOGON_USER_URI}`;
const VALIDATE_USER_URL = `${config.URL}/${config.VALIDATE_USER_URI}`;
const USER_INFO_URL = `${config.URL}/${config.USER_INFO_URI}`;

const BASE_OPTIONS = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export class SecurityApi {
  static async RegisterUser(email, password) {
    const body = { email, password };
    const options = {
      ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body),
    };
    return await SecurityApi.get(REGISTER_USER_URL, options);
  }

  static async LogonUser(username, password) {
    const body = {
      username,
      password,
    };
    const options = {
      ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body),
    };
    return await SecurityApi.get(LOGON_USER_URL, options);
  }

  static async ValidateUser(securityToken) {
    const url = `${VALIDATE_USER_URL}`;
    // Decode First, We can't decode too many times!
    securityToken = decodeURIComponent(securityToken);
    securityToken = decodeURIComponent(securityToken);
    securityToken = encodeURIComponent(securityToken);
    const options = {
      ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify({ securityToken }),
    };
    return await SecurityApi.get(url, options);
  }

  static async GetUserInfo(securityToken) {
    // Decode First, We can't decode too many times!
    securityToken = decodeURIComponent(securityToken);
    securityToken = decodeURIComponent(securityToken);
    securityToken = encodeURIComponent(securityToken);

    const options = {
      ...BASE_OPTIONS,
      headers: {
        ['Content-Type']: 'text/plain',
        ContensisCMSUserName: securityToken,
      },
    };
    return await SecurityApi.get(USER_INFO_URL, options);
  }

  static async get(url, options = BASE_OPTIONS) {
    try {
      const responseBody = await api(url, options);
      if (responseBody) return responseBody;
      return false;
    } catch (error) {
      return false;
    }
  }
}
