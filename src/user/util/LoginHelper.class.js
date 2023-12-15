/* eslint-disable require-atomic-updates */
import { getManagementApiClient } from './ContensisManagementApi';
import { to } from 'await-to-js';

import { CookieHelper } from './CookieHelper.class';

import mapClientCredentials from '../transformations/mapClientCredentials';
import { createUserManager, userManagerConfig } from './OidcUserManager';

const LOGIN_COOKIE = 'ContensisCMSUserName';
const REFRESH_TOKEN_COOKIE = 'RefreshToken';

const context = typeof window != 'undefined' ? window : global;

export class LoginHelper {
  static CMS_URL = SERVERS.cms /* global SERVERS */;
  static WSFED_LOGIN =
    process.env.NODE_ENV === 'development'
      ? WSFED_LOGIN === 'true' /* global WSFED_LOGIN */
      : context.WSFED_LOGIN === 'true';
  static LOGIN_ROUTE = '/account/login';
  static ACCESS_DENIED_ROUTE = '/account/access-denied';
  static IS_TWO_FA = TWO_FACTOR_AUTH; /* global TWO_FACTOR_AUTH */

  static SetLoginCookies({ contensisClassicToken, refreshToken }) {
    console.info(
      'SetLoginCookies:',
      LOGIN_COOKIE,
      contensisClassicToken,
      REFRESH_TOKEN_COOKIE,
      refreshToken
    );
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

    if (LoginHelper.WSFED_LOGIN && typeof window !== 'undefined') {
      // remove any oidc keys left over in localStorage
      const { localStorage } = window;
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (typeof key === 'string' && key.startsWith('oidc.'))
          keys.push(localStorage.key(i));
      }
      keys.forEach(key => localStorage.removeItem(key));
    }
  }

  static RequestTwoFaAuthToken = async username => {
    const [error, res] = await to(
      fetch(`/account/authenticate`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
        }),
      })
    );

    return [error, res];
  };

  static async LoginUserTwoFactorAuth({
    username,
    password,
    clientCredentials,
    userIn,
    twoFaToken,
  }) {
    let authenticationState = {
      clientCredentials: null,
      isAuthenticated: false,
      isAuthenticationError: false,
      isError: false,
    };
    let transientClient;
    let user = userIn;
    let credentials = clientCredentials;

    if (user && credentials && twoFaToken) {
      const tokenExpiryString = userIn.custom.authTokenExpiryDate;
      const tokenExpiryDate = tokenExpiryString
        ? new Date(tokenExpiryString)
        : undefined;
      const isAuthTokenExpired =
        tokenExpiryDate && tokenExpiryDate < new Date();

      if (isAuthTokenExpired) {
        authenticationState = {
          clientCredentials: clientCredentials,
          errorMessage:
            'Auth token is expired, please restart the login process',
          isAuthenticated: false,
          isAuthenticationError: false,
          isError: true,
        };
        LoginHelper.ClearCachedCredentials();
      }

      const authToken = userIn.custom.authToken;
      const isAuthTokenWrong = authToken !== twoFaToken;

      if (isAuthTokenWrong) {
        authenticationState = {
          requiresTwoFa: true,
          clientCredentials: clientCredentials,
          errorMessage: 'Auth token is incorrect',
          isAuthenticated: false,
          isAuthenticationError: false,
          isError: true,
        };
        LoginHelper.ClearCachedCredentials();
      }

      if (!isAuthTokenWrong && !isAuthTokenExpired) {
        LoginHelper.SetLoginCookies(clientCredentials);
        authenticationState = {
          clientCredentials: clientCredentials,
          isAuthenticated: true,
          isAuthenticationError: false,
          isError: false,
        };
      }
    } else if (username && password) {
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
        authenticationState = {
          clientCredentials: null,
          errorMessage: loginError.message || null,
          isAuthenticated: false,
          isAuthenticationError: loginError.name.includes(
            'ContensisAuthenticationError'
          ),
          isError: true,
        };
        LoginHelper.ClearCachedCredentials();
      }

      // Got a token using username and password
      if (clientBearerToken) {
        // Next, we need to request the 2fa token
        const [tokenError] = await LoginHelper.RequestTwoFaAuthToken(username);
        if (tokenError) {
          // eslint-disable-next-line no-console
          console.log(`Error requesting two-factor auth token: ${tokenError}`);
          authenticationState = {
            clientCredentials: null,
            errorMessage: tokenError || null,
            isAuthenticated: false,
            isAuthenticationError: false,
            isError: true,
          };
          LoginHelper.ClearCachedCredentials();
        } else {
          // If we have successfully obtained a 2fa token, get the user details next
          const [userDetailsError, userDetails] =
            await LoginHelper.GetUserDetails(transientClient);

          if (userDetailsError) {
            authenticationState = {
              clientCredentials: null,
              errorMessage: userDetailsError.message,
              isAuthenticated: false,
              isAuthenticationError: false,
              isError: true,
            };
            LoginHelper.ClearCachedCredentials();
          } else {
            user = userDetails;
            const credentials = mapClientCredentials(transientClient);

            authenticationState = {
              requiresTwoFa: true,
              clientCredentials: credentials,
              errorMessage: null,
              isAuthenticated: false,
              isAuthenticationError: false,
              isError: false,
            };
          }
        }
      }
    } else if (credentials) {
      const client =
        transientClient || (await getManagementApiClient(credentials));
      const [error, userDetails] = await LoginHelper.GetUserDetails(client);

      if (error) {
        authenticationState = {
          clientCredentials: null,
          errorMessage: error.message,
          isAuthenticated: false,
          isAuthenticationError: false,
          isError: true,
        };
        LoginHelper.ClearCachedCredentials();
      } else {
        // Ensure we get latest refreshToken and contensisClassicToken from the latest client
        const latestCredentials = mapClientCredentials(client);
        LoginHelper.SetLoginCookies(latestCredentials);

        user = userDetails;
        authenticationState = {
          clientCredentials: latestCredentials,
          isAuthenticated: true,
          isAuthenticationError: false,
          isError: false,
        };
      }
    }

    return { authenticationState, user };
  }

  static async LoginUserRegular({ username, password, clientCredentials }) {
    let credentials = clientCredentials;
    let authenticationState = {
      clientCredentials: null,
      isAuthenticated: false,
      isAuthenticationError: false,
      isError: false,
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
        authenticationState = {
          clientCredentials: null,
          errorMessage: loginError.message || null,
          isAuthenticated: false,
          isAuthenticationError: loginError.name.includes(
            'ContensisAuthenticationError'
          ),
          isError: true,
        };
        LoginHelper.ClearCachedCredentials();
      }

      // Got a token using username and password
      if (clientBearerToken) {
        // Set credentials so we can continue to GetUserDetails
        credentials = mapClientCredentials(transientClient);
        LoginHelper.SetLoginCookies(credentials);
        authenticationState = {
          clientCredentials: credentials,
          isAuthenticated: true,
          isAuthenticationError: false,
          isError: false,
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
          clientCredentials: null,
          errorMessage: error.message,
          isAuthenticated: false,
          isAuthenticationError: false,
          isError: true,
        };
        LoginHelper.ClearCachedCredentials();
      } else {
        // Ensure we get latest refreshToken and contensisClassicToken from the latest client
        const latestCredentials = mapClientCredentials(client);
        LoginHelper.SetLoginCookies(latestCredentials);

        user = userDetails;
        authenticationState = {
          clientCredentials: latestCredentials,
          isAuthenticated: true,
          isAuthenticationError: false,
          isError: false,
        };
      }
    }

    return { authenticationState, user };
  }

  static async LoginUser({
    username,
    password,
    clientCredentials,
    userIn,
    twoFaToken,
  }) {
    return LoginHelper.IS_TWO_FA
      ? LoginHelper.LoginUserTwoFactorAuth({
          username,
          password,
          clientCredentials,
          userIn,
          twoFaToken,
        })
      : LoginHelper.LoginUserRegular({
          username,
          password,
          clientCredentials,
        });
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
          pageOptions: { pageSize: 100 },
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
        const { search, hash } = location;
        url = search ? `${url}${search}` : url;
        url = hash ? `${url}${hash}` : url;
      }
      window.location.href = url;
    }
  }

  static async ClientRedirectToSignInPage(redirectPath) {
    if (LoginHelper.WSFED_LOGIN) {
      await LoginHelper.WsFedLogout();
      await LoginHelper.WsFedLogin();
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

  static async WsFedLogin(redirectUri) {
    const userManager = await createUserManager(userManagerConfig);
    userManager.signinRedirect({
      scope: 'openid',
      response_type: 'id_token',
      redirect_uri: redirectUri || window.location.toString(),
    });
  }

  static RemoveSecurityTokenQuery() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('securitytoken') || params.has('securityToken')) {
      params.delete('securitytoken');
      params.delete('securityToken');
      window.location = `${window.location.pathname}${
        params.toString() ? `?${params}` : ''
      }`;
    }
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
    } else {
      // Explicitly check and remove any stale
      // security token that may be in the query string
      LoginHelper.RemoveSecurityTokenQuery();
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

  // static isZengentiStaff(email) {
  //   const emailRefs = ['@zengenti', '@contensis'];

  //   return emailRefs.some(emailRef => {
  //     if (email.includes(emailRef)) {
  //       return true;
  //     }
  //   });
  // }
}
