/* eslint-disable require-atomic-updates */
import { Client } from 'contensis-management-api';
import { getManagementAPIClient } from '~/core/util/ContensisManagementApi';
import { to } from 'await-to-js';

import { CookieHelper } from './CookieHelper.class';

import { initialUserState } from '../redux/reducers';
import mapClientCredentials from '../transformations/mapClientCredentials';

export const LOGIN_COOKIE = 'ContensisCMSUserName';
export const REFRESH_TOKEN_COOKIE = 'RefreshToken';

export class LoginHelper {
  static CMS_URL = SERVERS.api || SERVERS.cms /* global SERVERS */;
  static LOGIN_ROUTE = '/account/login';
  static ACCESS_DENIED_ROUTE = '/account/access-denied';

  static SetLoginCookies(apiClientCredentials) {
    if (apiClientCredentials) {
      CookieHelper.SetCookie(
        LOGIN_COOKIE,
        apiClientCredentials.contensisClassicToken
      );
      CookieHelper.SetCookie(
        REFRESH_TOKEN_COOKIE,
        apiClientCredentials.refreshToken
      );
    }
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

  static GetClientForAuthentication = (username, password) => {
    const projectId = PROJECTS[0].id; /* global PROJECTS */
    return Client.create({
      clientType: 'contensis_classic',
      clientDetails: {
        username,
        password,
      },
      projectId: projectId,
      rootUrl: LoginHelper.CMS_URL,
    });
  };

  static async LoginUser(username, password) {
    if (username && password) {
      // Call LogonUser API
      //const loginResponse = await SecurityApi.LogonUser(username, password);
      const transientClient = LoginHelper.GetClientForAuthentication(
        username,
        password
      );

      // any error at this point should be treated like a login error
      let clientErr, clientBearerToken;
      [clientErr, clientBearerToken] = await to(
        transientClient.ensureBearerToken()
      );

      if (clientErr) {
        const authenticationError = clientErr.name.includes(
          'ContensisAuthenticationError'
        );
        return {
          authenticated: false,
          authenticationError: authenticationError,
          error: !authenticationError,
          clientCredentials: null,
        };
      }

      if (clientBearerToken) {
        const clientCredentials = mapClientCredentials(transientClient);
        this.SetLoginCookies(clientCredentials);
        return {
          authenticated: true,
          authenticationError: false,
          error: false,
          clientCredentials,
        };
      }
    } else {
      // Don't call API if username and/or password empty
      return {
        authenticated: false,
        authenticationError: false,
        error: false,
        clientCredentials: null,
      };
    }
  }

  static GetUserDetails = async clientCredentials => {
    const client = getManagementAPIClient(clientCredentials);
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

  static LogoutUser() {
    LoginHelper.ClearCachedCredentials();
    return initialUserState.toJS();
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

  static ClientRedirectToSignInPage(redirectPath) {
    let url = LoginHelper.LOGIN_ROUTE;
    if (typeof redirectPath === 'string')
      url = `${url}?redirect_uri=${redirectPath}`;
    if (
      typeof location !== 'undefined' &&
      redirectPath !== LoginHelper.LOGIN_ROUTE
    )
      location.href = url;
  }

  static ClientRedirectToAccessDeniedPage(originalPath) {
    let url = LoginHelper.ACCESS_DENIED_ROUTE;
    if (typeof originalPath === 'string')
      url = `${url}?original_uri=${originalPath}`;
    if (typeof location !== 'undefined') location.href = url;
  }

  static ClientRedirectToPath(redirectPath) {
    if (typeof redirectPath === 'string') {
      if (typeof location !== 'undefined') window.location.href = redirectPath;
    } else LoginHelper.ClientRedirectToHome();
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
