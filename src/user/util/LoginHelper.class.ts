import { to } from 'await-to-js';

import {
  ManagementApiClientCredentials,
  getManagementApiClient,
} from './ContensisManagementApi';

import mapClientCredentials from '../transformations/mapClientCredentials';
import { createUserManager, userManagerConfig } from './OidcUserManager';
import {
  BEARER_TOKEN_COOKIE,
  LOGIN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from './CookieConstants';
import { AuthenticationState, UserWithGroups } from '../state';
import { Client } from 'contensis-management-api';
import { CookieHelper } from './CookieHelper.class';

const context = (
  typeof window != 'undefined' ? window : global
) as typeof globalThis & {
  WSFED_LOGIN: any;
};

export class LoginHelper {
  static CMS_URL = SERVERS.cms /* global SERVERS */;
  static WSFED_LOGIN =
    process.env.NODE_ENV === 'development'
      ? WSFED_LOGIN === 'true' /* global WSFED_LOGIN */
      : context.WSFED_LOGIN === 'true';
  static LOGIN_ROUTE = '/account/login';
  static ACCESS_DENIED_ROUTE = '/account/access-denied';

  cookies: CookieHelper;

  constructor(cookies?: CookieHelper) {
    this.cookies = cookies || new CookieHelper();
  }

  static withCookies = (cookieHelper: CookieHelper) =>
    new LoginHelper(cookieHelper);

  static GetUserDetails = async (
    client: Client
  ): Promise<[Error | null, UserWithGroups | undefined]> => {
    const [userError, user] = await to(client.security.users.getCurrent());
    if (user && user.id) {
      const [groupsError, groupsResult] = await to(
        client.security.users.getUserGroups({
          userId: user.id,
          includeInherited: true,
          pageOptions: { pageSize: 100 },
        })
      );
      // Set groups attribute in user object to be the items
      // array from the getUserGroups result
      if (groupsResult && groupsResult.items)
        (user as UserWithGroups).groups = groupsResult.items;

      // If groups call fails then log the error but allow the user to login still

      if (groupsError) console.log(groupsError);
    }
    return [userError, user as UserWithGroups];
  };

  static ClientRedirectToHome(location?: Location) {
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

  static async ClientRedirectToSignInPage(redirectPath?: string) {
    if (typeof location === 'undefined') return;
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

  static GetAccessDeniedRoute(originalPath) {
    let url = LoginHelper.ACCESS_DENIED_ROUTE;
    if (originalPath !== url && typeof originalPath === 'string')
      url = `${url}?original_uri=${originalPath}`;
    return url;
  }

  static ClientRedirectToAccessDeniedPage(originalPath) {
    if (typeof location !== 'undefined')
      location.href = LoginHelper.GetAccessDeniedRoute(originalPath);
  }

  static ClientRedirectToPath(redirectPath) {
    if (typeof redirectPath === 'string') {
      if (typeof location !== 'undefined') window.location.href = redirectPath;
    } else LoginHelper.ClientRedirectToHome();
  }

  static async WsFedLogin(redirectUri?: string) {
    const userManager = await createUserManager(userManagerConfig);
    userManager?.signinRedirect({
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
      window.location.href = `${window.location.pathname}${
        params.toString() ? `?${params}` : ''
      }`;
    }
  }

  static async WsFedLogout(redirectPath?: string) {
    await fetch(
      `${LoginHelper.CMS_URL}/authenticate/logout?jsonResponseRequired=true`,
      {
        credentials: 'include',
      }
    );
    if (redirectPath) {
      window.location.href = redirectPath;
    } else {
      // Explicitly check and remove any stale
      // security token that may be in the query string
      LoginHelper.RemoveSecurityTokenQuery();
    }
  }

  static async GetCredentialsForSecurityToken(securityToken: string) {
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
        console.info(`Security token is invalid - LogonResult: ${LogonResult}`);
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

  SetLoginCookies({
    bearerToken,
    contensisClassicToken,
    refreshToken,
  }: ManagementApiClientCredentials) {
    if (bearerToken) this.cookies.SetCookie(BEARER_TOKEN_COOKIE, bearerToken);

    if (contensisClassicToken)
      this.cookies.SetCookie(LOGIN_COOKIE, contensisClassicToken);

    if (refreshToken)
      this.cookies.SetCookie(REFRESH_TOKEN_COOKIE, refreshToken);
  }

  GetCachedCredentials() {
    return {
      bearerToken: null,
      bearerTokenExpiryDate: null,
      refreshToken: this.cookies.GetCookie(REFRESH_TOKEN_COOKIE),
      refreshTokenExpiryDate: null,
      contensisClassicToken: this.cookies.GetCookie(LOGIN_COOKIE),
      securityToken: null,
    };
  }

  ClearCachedCredentials() {
    this.cookies.DeleteCookie(LOGIN_COOKIE);
    this.cookies.DeleteCookie(REFRESH_TOKEN_COOKIE);
    this.cookies.DeleteCookie(BEARER_TOKEN_COOKIE); // additional cookie used by @contensis/forms package

    if (LoginHelper.WSFED_LOGIN && typeof window !== 'undefined') {
      // remove any oidc keys left over in localStorage
      const { localStorage } = window;
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (typeof key === 'string' && key.startsWith('oidc.')) keys.push(key);
      }
      keys.forEach(key => localStorage.removeItem(key));
    }
  }

  async LoginUser({
    username,
    password,
    clientCredentials,
  }: {
    username?: string;
    password?: string;
    clientCredentials?: ManagementApiClientCredentials;
  }) {
    let credentials = clientCredentials;
    let authenticationState: AuthenticationState = {
      clientCredentials: null,
      isAuthenticated: false,
      isAuthenticationError: false,
      isError: false,
    };
    let transientClient: Client | null = null;
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
        this.ClearCachedCredentials();
      }

      // Got a token using username and password
      if (clientBearerToken) {
        // Set credentials so we can continue to GetUserDetails
        const clientCredentials = mapClientCredentials(transientClient);
        this.SetLoginCookies(clientCredentials);
        authenticationState = {
          clientCredentials,
          isAuthenticated: true,
          isAuthenticationError: false,
          isError: false,
        };
        credentials = clientCredentials;
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
        this.ClearCachedCredentials();
      } else {
        // Ensure we get latest refreshToken and contensisClassicToken from the latest client
        const latestCredentials = mapClientCredentials(client);
        this.SetLoginCookies(latestCredentials);

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

  LogoutUser(redirectPath?: string) {
    this.ClearCachedCredentials();
    if (LoginHelper.WSFED_LOGIN) {
      LoginHelper.WsFedLogout(redirectPath);
    } else {
      if (redirectPath) LoginHelper.ClientRedirectToPath(redirectPath);
      else LoginHelper.ClientRedirectToSignInPage();
    }
  }
}
