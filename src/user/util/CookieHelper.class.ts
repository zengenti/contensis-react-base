import { useCookies } from 'react-cookie';
import FallbackCookies from 'universal-cookie';

const COOKIE_VALID_DAYS = 1; // 0 = Session cookie

type CookieHook = ReturnType<typeof useCookies>;
type Cookies = { [k: string]: string };
type SetCookie = CookieHook[1];
type RemoveCookie = CookieHook[2];
type UpdateCookie = CookieHook[3];

// CookieHelper is a class that takes in and lets us pass around the methods provided
// by `useCookie` react hook in backend code that is connected to the universal-cookies
// instance created in SSR middleware (and provides browser cookies)
export class CookieHelper {
  private cookies: Cookies;
  private set?: SetCookie;
  private remove?: RemoveCookie;
  private update?: UpdateCookie;
  private fallback!: FallbackCookies;

  get raw() {
    return this.cookies;
  }

  get cookie(): FallbackCookies {
    return (this.set ? this : this.fallback) as FallbackCookies;
  }

  constructor(
    cookies?: { [k: string]: string },
    setCookie?: CookieHelper['set'],
    removeCookie?: CookieHelper['remove'],
    updateCookies?: CookieHelper['update']
  ) {
    // Add fallback methods if global cookies not supplied
    if (!cookies || !setCookie || !removeCookie)
      this.fallback = new FallbackCookies();

    this.cookies = cookies || this.fallback.getAll();
    if (setCookie) this.set = setCookie;
    if (removeCookie) this.remove = removeCookie;
    if (updateCookies) this.update = updateCookies;
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
    if (maxAgeDays === 0) this.cookie.set(name, value);
    else
      this.cookie.set(name, value, {
        expires: addDays(new Date(), maxAgeDays),
        path: '/',
      });
  }

  DeleteCookie(name: string) {
    // update local cookies object as this is provided as a clone of `req.universalCookies`
    delete this.cookies[name];

    this.cookie.remove(name, {
      path: '/',
    });
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
