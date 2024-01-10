export const LOGIN_COOKIE = 'ContensisCMSUserName';
export const REFRESH_TOKEN_COOKIE = 'RefreshToken';

export type CookieObject = { [name: string]: any };

export const findLoginCookies = (cookies: CookieObject | string) =>
  typeof cookies === 'object'
    ? Object.fromEntries(
        Object.entries(cookies).filter(([name]) =>
          [LOGIN_COOKIE, REFRESH_TOKEN_COOKIE].includes(name)
        )
      )
    : cookies;
