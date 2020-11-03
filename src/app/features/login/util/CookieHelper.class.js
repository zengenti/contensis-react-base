import Cookies from 'js-cookie';

const COOKIE_VALID_DAYS = 1; // 0 = Session cookie

// Override the default js-cookie conversion / encoding
// methods so the written values work with Contensis sites
const _cookie = Cookies.withConverter({
  read: value => decodeURIComponent(value),
  write: value => encodeURIComponent(value),
});

export class CookieHelper {
  static GetCookie(name) {
    let cookie = _cookie.get(name);
    if (typeof cookie == 'undefined') {
      return null;
    }
    return cookie;
  }

  static SetCookie(name, value, maxAgeDays = COOKIE_VALID_DAYS) {
    maxAgeDays === 0
      ? _cookie.set(name, value)
      : _cookie.set(name, value, { expires: maxAgeDays });
  }

  static DeleteCookie(name) {
    _cookie.remove(name);
  }
}
