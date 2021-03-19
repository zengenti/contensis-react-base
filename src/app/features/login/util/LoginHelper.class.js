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

  static async LoginUser({ username, password, clientCredentials }) {
    let credentials = clientCredentials;
    let authenticationState = {
      authenticated: false,
      authenticationError: false,
      error: false,
      clientCredentials: null,
    };
    let transientClient;
    let user;

    if (username && password) {
      // Get a management client with username and password
      transientClient = await getManagementApiClient({
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
        authenticationState = {
          authenticated: false,
          authenticationError: authenticationError,
          error: !authenticationError,
          clientCredentials: null,
        };
        LoginHelper.ClearCachedCredentials();
      }

      // Got a token using username and password
      if (clientBearerToken) {
        // Set credentials so we can continue to GetUserDetails
        credentials = mapClientCredentials(transientClient);
        LoginHelper.SetLoginCookies(credentials);
        authenticationState = {
          authenticated: true,
          authenticationError: false,
          error: false,
          clientCredentials: credentials,
        };
      }
    }

    // If we have credentials supplied by a successful username and password login
    // or clientCredentials supplied in the options argument we can continue to
    // fetch the user's details
    if (credentials) {
      const client =
        transientClient || (await getManagementApiClient(credentials));
      const [error, userDetails] = await LoginHelper.GetUserDetails(client);

      if (error) {
        authenticationState = {
          authenticated: false,
          authenticationError: false,
          error: { message: error.message, stack: error.stack },
          clientCredentials: null,
        };
        LoginHelper.ClearCachedCredentials();
      } else {
        user = userDetails;
        authenticationState = {
          authenticated: true,
          authenticationError: false,
          error: false,
          clientCredentials: credentials,
        };
      }
    }

    return { authenticationState, user };
  }

  static GetUserDetails = async client => {
    let userError,
      groupsError,
      user = {},
      groupsResult;

    [userError, user] = await to(client.security.users.getCurrent());
    if (user && user.id) {
      [groupsError, groupsResult] = await to(
        client.security.users.getUserGroups({
          userId: user.id,
          includeInherited: true,
        })
      );
      // Set groups attribute in user object to be the items
      // array from the getUserGroups result
      if (groupsResult && groupsResult.items) user.groups = groupsResult.items;

      //If groups call fails then log the error but allow the user to login still
      // eslint-disable-next-line no-console
      if (groupsError) console.log(groupsError);
    }
    return [userError, user];
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
        location.replace(url);
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
    const [error, response] = await to(
      fetch(`${LoginHelper.CMS_URL}/REST/Contensis/Security/IsAuthenticated`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          securityToken: encodeURIComponent(securityToken),
        }),
      })
    );
    if (error) return [{ message: 'Failed to fetch credentials' }];
    if (response.ok) {
      const [parseError, body] = await to(response.json());
      if (parseError) return [parseError];

      const { LogonResult, ApplicationData = [] } = body;
      if (LogonResult !== 0) {
        return [
          { message: 'Security token is invalid', data: ApplicationData },
        ];
      }
      if (ApplicationData.length > 0) {
        let refreshToken;
        ApplicationData.forEach(item => {
          if (item.Key === 'ContensisSecurityRefreshToken')
            refreshToken = item.Value;
        });
        if (!refreshToken) {
          return [
            {
              message:
                'Fetch credentials: Unable to find ContensisSecurityRefreshToken',
            },
          ];
        }
        return [undefined, refreshToken];
      } else {
        return [
          {
            message:
              'Fetch credentials: Unable to find ContensisSecurityRefreshToken',
          },
        ];
      }
    } else {
      return [
        {
          message: `Fetch credentials error: ${response.status} ${response.statusText}`,
        },
      ];
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
