const PAP_URL = 'https://pap.zengenti.com';

const USER_ENVS_URI = 'my-environments';
const USER_RESEND_VERIFICATION_URI = 'account/verify/resend';
const USER_REQUEST_PASSWORD_RESET_URI = 'account/reset';
const USER_RESET_PASSWORD_URI = 'account/reset/password';

const USER_ENVS_URL = `${PAP_URL}/${USER_ENVS_URI}`;

const BASE_OPTIONS = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

export class UserHelper {
  static async GetUsersEnvironments(securityToken) {
    const options = {
      ...BASE_OPTIONS,
      headers: {
        'x-security-token': securityToken,
      },
    };
    return await UserHelper.get(USER_ENVS_URL, options);
  }
  static async ResendUserVerification(userEmail) {
    const options = {
      ...BASE_OPTIONS,
    };
    return await UserHelper.get(
      `/${USER_RESEND_VERIFICATION_URI}?user=${userEmail}`,
      options
    );
  }
  static async RequestPasswordReset(userEmailObject) {
    const options = {
      ...BASE_OPTIONS,
      body: JSON.stringify(userEmailObject),
    };
    options.method = 'POST';

    return await UserHelper.get(`/${USER_REQUEST_PASSWORD_RESET_URI}`, options);
  }
  static async ResetPassword(resetPasswordObject) {
    const options = {
      ...BASE_OPTIONS,
      body: JSON.stringify(resetPasswordObject),
    };
    options.method = 'POST';

    return await UserHelper.get(`/${USER_RESET_PASSWORD_URI}`, options);
  }

  static async get(url, options = BASE_OPTIONS) {
    try {
      const responseBody = await api(url, options);
      return responseBody;
    } catch (err) {
      return { error: { message: err.message } };
    }
  }
}

async function api(url, options) {
  return fetch(url, options)
    .then(async response => {
      return response.json().then(data => data);
    })
    .catch(error => {
      throw error;
    });
}
