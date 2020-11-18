/* eslint-disable require-atomic-updates */
import { getManagementApiClient } from '~/core/util/ContensisManagementApi';
import { to } from 'await-to-js';

import { CookieHelper } from './CookieHelper.class';

import mapClientCredentials from '../transformations/mapClientCredentials';
import userManager from './OidcUserManager';

export const LOGIN_COOKIE = 'ContensisCMSUserName';
export const REFRESH_TOKEN_COOKIE = 'RefreshToken';

const context = typeof window != 'undefined' ? window : global;

export class LoginHelper {
  static CMS_URL = SERVERS.cms /* global SERVERS */;
  static WSFED_LOGIN =
    process.env.NODE_ENV === 'development'
      ? WSFED_LOGIN === 'true' /* global WSFED_LOGIN */
      : context.WSFED_LOGIN === 'true';
  static LOGIN_ROUTE = '/account/login';
  static ACCESS_DENIED_ROUTE = '/account/access-denied';

  static SetLoginCookies({ contensisClassicToken, refreshToken }) {
    if (contensisClassicToken)
      CookieHelper.SetCookie(LOGIN_COOKIE, contensisClassicToken);
    if (refreshToken)
      CookieHelper.SetCookie(REFRESH_TOKEN_COOKIE, refreshToken);
  }

  static GetCachedCredentials() {
    return {
      bearerToken: null,
      bearerTokenExpiryDate: null,
      refreshToken: CookieHelper.GetCookie(REFRESH_TOKEN_COOKIE),
      refreshTokenExpiryDate: null,
      contensisClassicToken: CookieHelper.GetCookie(LOGIN_COOKIE),
    };
  }

  static ClearCachedCredentials() {
    CookieHelper.DeleteCookie(LOGIN_COOKIE);
    CookieHelper.DeleteCookie(REFRESH_TOKEN_COOKIE);
  }

  static async LoginUser(username, password) {
    if (!username || !password) {
      // Return a default set of options if no username or password
      return {
        authenticated: false,
        authenticationError: false,
        error: false,
        clientCredentials: null,
      };
    } else {
      // Get a management client with username and password
      const transientClient = getManagementApiClient({
        username,
        password,
      });

      // Ensure the client has requested a bearer token
      const [loginError, clientBearerToken] = await to(
        transientClient.ensureBearerToken()
      );

      // Problem getting token with username and password
      if (loginError) {
        const authenticationError = loginError.name.includes(
          'ContensisAuthenticationError'
        );
        return {
          authenticated: false,
          authenticationError: authenticationError,
          error: !authenticationError,
          clientCredentials: null,
        };
      }

      // Got a token using username and password
      if (clientBearerToken) {
        const clientCredentials = mapClientCredentials(transientClient);
        LoginHelper.SetLoginCookies(clientCredentials);
        return {
          authenticated: true,
          authenticationError: false,
          error: false,
          clientCredentials,
        };
      }
    }
  }

  static GetUserDetails = async clientCredentials => {
    const client = getManagementApiClient(clientCredentials);
    let error,
      user = {},
      groupsResult;

    [error, user] = await to(client.security.users.getCurrent());
    if (user && user.id) {
      [error, groupsResult] = await to(
        client.security.users.getUserGroups({
          userId: user.id,
          includeInherited: true,
        })
      );
      // Set groups attribute in user object to be the items
      // array from the getUserGroups result
      if (groupsResult && groupsResult.items) user.groups = groupsResult.items;
    }
    return {
      error,
      user,
      clientCredentials: mapClientCredentials(client),
    };
  };

  static LogoutUser(redirectPath) {
    LoginHelper.ClearCachedCredentials();
    if (LoginHelper.WSFED_LOGIN) {
      LoginHelper.WsFedLogout(redirectPath);
    } else {
      if (redirectPath) LoginHelper.ClientRedirectToPath(redirectPath);
      else LoginHelper.ClientRedirectToSignInPage();
    }
  }

  static ClientRedirectToHome(location) {
    if (typeof window != 'undefined') {
      let url = '/';
      if (location) {
        const { search, hash } = location.toJS();
        url = search ? `${url}${search}` : url;
        url = hash ? `${url}${hash}` : url;
      }
      window.location.href = url;
    }
  }

  static async ClientRedirectToSignInPage(redirectPath) {
    if (LoginHelper.WSFED_LOGIN) {
      await LoginHelper.WsFedLogout();
      LoginHelper.WsFedLogin();
    } else {
      // Standard Contensis Login
      let url = LoginHelper.LOGIN_ROUTE;
      if (typeof redirectPath === 'string')
        url = `${url}?redirect_uri=${redirectPath}`;
      if (
        typeof location !== 'undefined' &&
        redirectPath !== LoginHelper.LOGIN_ROUTE
      )
        location.href = url;
    }
  }

  static ClientRedirectToAccessDeniedPage(originalPath) {
    let url = LoginHelper.ACCESS_DENIED_ROUTE;
    if (originalPath === url) return;

    if (typeof originalPath === 'string')
      url = `${url}?original_uri=${originalPath}`;
    if (typeof location !== 'undefined') location.href = url;
  }

  static ClientRedirectToPath(redirectPath) {
    if (typeof redirectPath === 'string') {
      if (typeof location !== 'undefined') window.location.href = redirectPath;
    } else LoginHelper.ClientRedirectToHome();
  }

  static WsFedLogin(redirectUri) {
    userManager.signinRedirect({
      scope: 'openid',
      response_type: 'id_token',
      redirect_uri: redirectUri || window.location.toString(),
    });
  }

  static async WsFedLogout(redirectPath) {
    await fetch(
      `${LoginHelper.CMS_URL}/authenticate/logout?jsonResponseRequired=true`,
      {
        credentials: 'include',
      }
    );
    if (redirectPath) {
      window.location = redirectPath;
    }
  }

  static async GetCredentialsForSecurityToken(securityToken) {
    const response = await fetch(
      `${LoginHelper.CMS_URL}/REST/Contensis/Security/IsAuthenticated`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          securityToken: encodeURIComponent(securityToken),
        }),
      }
    );
    if (response.ok) {
      const responseBody = await response.json();
      if (responseBody.LogonResult !== 0) {
        // TODO : security token invalid
      }
      if (
        !!responseBody.ApplicationData &&
        !!responseBody.ApplicationData.length &&
        responseBody.ApplicationData.length > 1 &&
        // eslint-disable-next-line prettier/prettier
        responseBody.ApplicationData[1].Key === 'ContensisSecurityRefreshToken'
      ) {
        const refreshToken = responseBody.ApplicationData[1].Value;
        LoginHelper.SetLoginCookies({
          contensisClassicToken: securityToken,
          refreshToken,
        });
      }
    }
  }

  static isZengentiStaff(email) {
    const emailRefs = ['@zengenti', '@contensis'];

    return emailRefs.some(emailRef => {
      if (email.includes(emailRef)) {
        return true;
      }
    });
  }
}
