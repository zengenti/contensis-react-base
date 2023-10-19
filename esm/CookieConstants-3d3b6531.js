const LOGIN_COOKIE = 'ContensisCMSUserName';
const REFRESH_TOKEN_COOKIE = 'RefreshToken';
const findLoginCookies = cookies => typeof cookies === 'object' ? Object.fromEntries(Object.entries(cookies).filter(([name]) => [LOGIN_COOKIE, REFRESH_TOKEN_COOKIE].includes(name))) : cookies;

export { LOGIN_COOKIE as L, REFRESH_TOKEN_COOKIE as R, findLoginCookies as f };
//# sourceMappingURL=CookieConstants-3d3b6531.js.map
