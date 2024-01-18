import { useCookies } from 'react-cookie';

const COOKIE_VALID_DAYS = 1; // 0 = Session cookie

type CookieHook = ReturnType<typeof useCookies>;
type Cookies = { [k: string]: string };
type SetCookie = CookieHook[1];
type RemoveCookie = CookieHook[2];

// CookieHelper is a class that takes in and lets us pass around the methods provided
// by `useCookie` react hook in backend code that is connected to the universal-cookies
// instance created in SSR middleware (and provides browser cookies)
export class CookieHelper {
  private cookies: Cookies;
  private setCookie: SetCookie;
  private removeCookie: RemoveCookie;

  get raw() {
    return this.cookies;
  }

  constructor(
    cookies: { [k: string]: string },
    setCookie: CookieHelper['setCookie'],
    removeCookie: CookieHelper['removeCookie']
  ) {
    this.cookies = cookies;
    this.setCookie = setCookie;
    this.removeCookie = removeCookie;
  }

  GetCookie(name: string) {
    const cookie = this.cookies[name];
    if (typeof cookie === 'undefined') {
      return null;
    }
    return cookie;
  }

  SetCookie(name: string, value: string, maxAgeDays = COOKIE_VALID_DAYS) {
    // update local cookies object as this is provided as a clone of `req.universalCookies`
    this.cookies[name] = value;

    // call the passed setCookie method so we can update the `universal-cookie` instance
    // with the change listener attached so the cookies can be set in SSR response
    if (maxAgeDays === 0) this.setCookie(name, value);
    else
      this.setCookie(name, value, {
        expires: addDays(new Date(), maxAgeDays),
      });
  }

  DeleteCookie(name: string) {
    // update local cookies object as this is provided as a clone of `req.universalCookies`
    delete this.cookies[name];

    this.removeCookie(name);
  }
}
const addDays = (date = new Date(), days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const mapCookieHeader = cookies =>
  typeof cookies === 'object'
    ? Object.entries(cookies)
        .map(([name, value]) => `${name}=${value}`)
        .join('; ')
    : cookies;
