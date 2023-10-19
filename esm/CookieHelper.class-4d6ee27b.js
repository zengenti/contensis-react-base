const COOKIE_VALID_DAYS = 1; // 0 = Session cookie

// CookieHelper is a class that takes in and lets us pass around the methods provided
// by `useCookie` react hook in backend code that is connected to the universal-cookies
// instance created in SSR middleware (and provides browser cookies)
class CookieHelper {
  get raw() {
    return this.cookies;
  }
  constructor(cookies, setCookie, removeCookie) {
    this.cookies = void 0;
    this.setCookie = void 0;
    this.removeCookie = void 0;
    this.cookies = cookies;
    this.setCookie = setCookie;
    this.removeCookie = removeCookie;
  }
  GetCookie(name) {
    const cookie = this.cookies[name];
    if (typeof cookie === 'undefined') {
      return null;
    }
    return cookie;
  }
  SetCookie(name, value, maxAgeDays = COOKIE_VALID_DAYS) {
    // update local cookies object as this is provided as a clone of `req.universalCookies`
    this.cookies[name] = value;

    // call the passed setCookie method so we can update the `universal-cookie` instance
    // with the change listener attached so the cookies can be set in SSR response
    if (maxAgeDays === 0) this.setCookie(name, value);else this.setCookie(name, value, {
      expires: addDays(new Date(), maxAgeDays)
    });
  }
  DeleteCookie(name) {
    // update local cookies object as this is provided as a clone of `req.universalCookies`
    delete this.cookies[name];
    this.removeCookie(name);
  }
}
const addDays = (date = new Date(), days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
const mapCookieHeader = cookies => typeof cookies === 'object' ? Object.entries(cookies).map(([name, value]) => `${name}=${value}`).join('; ') : cookies;

export { CookieHelper as C, mapCookieHeader as m };
//# sourceMappingURL=CookieHelper.class-4d6ee27b.js.map
