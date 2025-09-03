'use strict';

const BEARER_TOKEN_COOKIE = 'ContensisSecurityBearerToken';
const LOGIN_COOKIE = 'ContensisCMSUserName';
const REFRESH_TOKEN_COOKIE = 'RefreshToken';
const findLoginCookies = cookies => typeof cookies === 'object' ? Object.fromEntries(Object.entries(cookies).filter(([name]) => [LOGIN_COOKIE, REFRESH_TOKEN_COOKIE].includes(name))) : cookies;

exports.BEARER_TOKEN_COOKIE = BEARER_TOKEN_COOKIE;
exports.LOGIN_COOKIE = LOGIN_COOKIE;
exports.REFRESH_TOKEN_COOKIE = REFRESH_TOKEN_COOKIE;
exports.findLoginCookies = findLoginCookies;
//# sourceMappingURL=CookieConstants-DfPiWCRZ.js.map
