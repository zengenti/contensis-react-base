const CMS_URL = SERVERS.cms; /* global SERVERS */

const config = {
  REGISTER_USER_URI: 'Security/RegisterUser',
  LOGON_USER_URI: 'REST/Contensis/Security/AuthenticateApplication',
  VALIDATE_USER_URI: 'REST/Contensis/Security/IsAuthenticated',
  USER_INFO_URI: 'REST/Contensis/Security/GetUserInfo',
  FORGOT_PASSWORD_URI: 'Security/ResetPasswordEmail',
  CHANGE_PASSWORD_URI: 'Security/ChangePassword',
  CHANGE_PASSWORD_TOKEN_URI: 'Security/ChangePasswordWithToken',
  AUTH_CAPTCHA_URI: 'Security/AuthenticateCaptcha',
  LOGIN_URL: '/business-government/partner',
};

const REGISTER_USER_URL = `${CMS_URL}/${config.REGISTER_USER_URI}`;
const LOGON_USER_URL = `${CMS_URL}/${config.LOGON_USER_URI}`;
const VALIDATE_USER_URL = `${CMS_URL}/${config.VALIDATE_USER_URI}`;
const USER_INFO_URL = `${CMS_URL}/${config.USER_INFO_URI}`;
const FORGOT_PASSWORD_URI = `/${config.FORGOT_PASSWORD_URI}`;
const CHANGE_PASSWORD_URI = `/${config.CHANGE_PASSWORD_URI}`;
const AUTH_CAPTCHA_URI = `/${config.AUTH_CAPTCHA_URI}`;
const CHANGE_PASSWORD_TOKEN_URI = `/${config.CHANGE_PASSWORD_TOKEN_URI}`;

const BASE_OPTIONS = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export class SecurityApi {
  static async AuthoriseRecaptcha(token) {
    const url = `${AUTH_CAPTCHA_URI}?captchaToken=${encodeURIComponent(token)}`;
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };
    return await SecurityApi.get(url, options);
  }

  static async LogonUser(username, password) {
    const body = {
      username,
      password,
      ip: '127.0.0.1',
      applicationName: 'DesktopTool',
    };
    const options = {
      ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body),
    };
    return await SecurityApi.get(LOGON_USER_URL, options);
  }

  static async ValidateUser(securityToken) {
    const url = `${VALIDATE_USER_URL}?token=${encodeURIComponent(
      securityToken
    )}`;
    const bodyToken = encodeURIComponent(
      decodeURIComponent(decodeURIComponent(securityToken))
    );
    const options = {
      ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify({ securityToken: bodyToken }),
    };
    return await SecurityApi.get(url, options);
  }

  static async GetUserInfo(securityToken) {
    const options = {
      ...BASE_OPTIONS,
      headers: {
        ['Content-Type']: 'text/plain',
        ContensisCMSUserName: securityToken,
      },
    };
    return await SecurityApi.get(USER_INFO_URL, options);
  }

  static async RegisterUser(email, password) {
    const body = { email, password };
    const options = {
      ...BASE_OPTIONS,
      method: 'POST',
      body: JSON.stringify(body),
    };
    return await SecurityApi.get(REGISTER_USER_URL, options);
  }

  static async ChangePassword(
    username,
    oldPassword,
    newPassword,
    newPasswordConfirm
  ) {
    const url = `${CHANGE_PASSWORD_URI}?username=${encodeURIComponent(
      username
    )}&oldPassword=${encodeURIComponent(
      oldPassword
    )}&newPassword=${encodeURIComponent(
      newPassword
    )}&newPasswordConfirm=${encodeURIComponent(newPasswordConfirm)}`;
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };
    return await SecurityApi.get(url, options);
  }

  static async ChangePasswordWithToken(token, newPassword, newPasswordConfirm) {
    const url = `${CHANGE_PASSWORD_TOKEN_URI}?token=${token}&newPassword=${encodeURIComponent(
      newPassword
    )}&confirmPassword=${encodeURIComponent(newPasswordConfirm)}`;
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };
    return await SecurityApi.get(url, options);
  }

  static async ForgotPassword(username, currentUrl) {
    const url = `${FORGOT_PASSWORD_URI}?username=${encodeURIComponent(
      username
    )}&currentUrl=${encodeURIComponent(currentUrl)}`;
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };
    return await SecurityApi.get(url, options);
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

async function api(url, options) {
  return fetch(url, options)
    .then(async response => {
      setTimeout(() => null, 0);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json().then(data => data);
    })
    .catch(error => {
      //console.log(error);
      throw error;
    });
}
