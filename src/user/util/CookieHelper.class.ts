import JSCookie from 'js-cookie';

const COOKIE_VALID_DAYS = 1; // 0 = Session cookie

// Override the default js-cookie conversion / encoding
// methods so the written values work with Contensis sites
const Cookies = JSCookie.withConverter({
  read: value => decodeURIComponent(value),
  write: value => encodeURIComponent(value),
});

export class CookieHelper {
  static GetCookie(name) {
    const cookie = Cookies.get(name);
    if (typeof cookie === 'undefined') {
      return null;
    }
    return cookie;
  }

  static SetCookie(name, value, maxAgeDays = COOKIE_VALID_DAYS) {
    if (maxAgeDays === 0) Cookies.set(name, value);
    else Cookies.set(name, value, { expires: maxAgeDays });
  }

  static DeleteCookie(name) {
    Cookies.remove(name);
  }
}
